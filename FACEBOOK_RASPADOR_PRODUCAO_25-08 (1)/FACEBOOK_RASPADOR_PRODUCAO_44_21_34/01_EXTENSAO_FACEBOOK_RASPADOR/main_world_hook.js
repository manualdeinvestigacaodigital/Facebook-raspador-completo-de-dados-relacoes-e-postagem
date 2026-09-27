/* FB_B35A1 V36 MAIN-world relation GraphQL logical-connection capture/replay hook.
   No secrets are posted to the isolated content script: only friendly name, doc id,
   variables, status and response text. Full request templates stay inside MAIN world.
*/
(() => {
  'use strict';
  if (window.__FB_B35A1_V35_MAIN_RELATION_HOOK__) return;

  const CHANNEL_CONTROL = 'FB_B35A1_V29_CONTROL';
  const CHANNEL_MAIN = 'FB_B35A1_V29_MAIN';
  let armedOriginalFetch = null, armedNativeFetch = null, ArmedXHR = null;
  const state = {
    active: false,
    sessionId: '',
    activeRelation: '',
    runStartedAt: '',
    uiRelationHint: { relation: '', label: '', href: '', at: '' },
    seq: 0,
    templates: new Map(),
    interceptorsInstalled: false,
    maxTemplates: 220,
    maxPayloadBytes: 10 * 1024 * 1024,
  };

  function isGraphQL(url = '') {
    return /\/api\/graphql\/?(?:\?|$)|graphql/i.test(String(url || ''));
  }

  function relationRouteContext() {
    try {
      const path=String(location.pathname||''), search=String(location.search||''), route=path+search;
      if(/\/friends_all(?:\/|$|[?#])/i.test(route)||/(?:^|[?&])sk=friends_all(?:&|$)/i.test(search))return {kind:'explicit_friends_all',relation:'friends',container:false};
      if(/\/followers(?:\/|$|[?#])/i.test(route)||/(?:^|[?&])sk=followers(?:&|$)/i.test(search))return {kind:'explicit_followers',relation:'followers',container:false};
      if(/\/following(?:\/|$|[?#])/i.test(route)||/(?:^|[?&])sk=following(?:&|$)/i.test(search))return {kind:'explicit_following',relation:'following',container:false};
      if(/\/friends(?:\/|$|[?#])/i.test(route)||/(?:^|[?&])sk=friends(?:&|$)/i.test(search))return {kind:'friends_container',relation:'',container:true};
    } catch (_) {}
    return {kind:'other',relation:'',container:false};
  }
  function isRelationLocation() {
    const r=relationRouteContext();return r.kind!=='other';
  }


  function normalizeHeaders(headers) {
    const out = {};
    try {
      if (headers instanceof Headers) headers.forEach((v, k) => { out[k] = v; });
      else if (Array.isArray(headers)) for (const [k, v] of headers) out[String(k)] = String(v);
      else if (headers && typeof headers === 'object') for (const [k, v] of Object.entries(headers)) out[String(k)] = String(v);
    } catch (_) {}
    return out;
  }

  function bodyString(body) {
    if (typeof body === 'string') return body;
    if (body instanceof URLSearchParams) return body.toString();
    return '';
  }

  const CURSOR_KEYS = new Set(['cursor', 'after', 'aftercursor', 'end_cursor', 'endcursor']);
  const TRANSIENT_VAR_KEYS = new Set(['__req', '__spin_r', '__spin_b', '__spin_t', '__a', '__user']);
  function normalizedConnectionValue(value) {
    if (Array.isArray(value)) return value.map(normalizedConnectionValue);
    if (!value || typeof value !== 'object') return value;
    const out = {};
    for (const key of Object.keys(value).sort()) {
      const low = String(key).toLowerCase();
      if (TRANSIENT_VAR_KEYS.has(low)) continue;
      if (CURSOR_KEYS.has(low)) { out[key] = '__CURSOR__'; continue; }
      out[key] = normalizedConnectionValue(value[key]);
    }
    return out;
  }
  function stableStringify(value) {
    try { return JSON.stringify(normalizedConnectionValue(value)); } catch (_) { return ''; }
  }
  function fnv1a32Hex(text) {
    let h = 0x811c9dc5;
    const s = String(text || '');
    for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; }
    return h.toString(16).padStart(8, '0');
  }
  function connectionFingerprint(meta) {
    const friendly = String(meta && meta.friendlyName || '');
    const docId = String(meta && meta.docId || '');
    const vars = meta && meta.variableObject;
    const canonical = stableStringify(vars || {});
    if (!friendly && !docId && !canonical) return '';
    return fnv1a32Hex(friendly + '\u001f' + docId + '\u001f' + canonical);
  }
  function elementVisible(el) {
    try {
      if (!el || !el.getBoundingClientRect) return false;
      const r = el.getBoundingClientRect(), cs = getComputedStyle(el);
      return r.width > 2 && r.height > 2 && r.bottom > 0 && r.top < innerHeight + 900 && cs.display !== 'none' && cs.visibility !== 'hidden' && Number(cs.opacity || 1) > 0.05;
    } catch (_) { return false; }
  }
  function relationLabelOnly(value='') {
    const t=normalizeRelationText(value).replace(/\s*(?:[·|:]\s*)?\(?\d[\d.,\s]*[kmb]?\)?\s*$/i,'').trim();
    if(/^(?:friends?|amigos?|amizades?|all friends|see all friends|todos os amigos|ver todos os amigos)$/.test(t))return 'friends';
    if(/^(?:followers?|seguidores?)$/.test(t))return 'followers';
    if(/^(?:following|seguindo)$/.test(t))return 'following';
    return '';
  }
  function isFacebookBlue(value='') {
    const s=String(value||'').replace(/\s+/g,'').toLowerCase();
    return /rgb\((?:24,119,242|8,102,255|0,100,224)\)/.test(s)||/#1877f2|#0866ff|#0064e0/.test(s);
  }
  function relationCluster(el) {
    let cur=el;
    for(let depth=0;depth<6&&cur;depth++,cur=cur.parentElement){
      let nodes=[];try{nodes=Array.from(cur.querySelectorAll('[role="tab"],a,[aria-selected],[aria-current]')).slice(0,80);}catch(_){}
      const rels=new Set();
      for(const n of nodes){
        if(!elementVisible(n))continue;
        let label='';try{label=String(n.getAttribute&&n.getAttribute('aria-label')||n.innerText||n.textContent||'').trim();}catch(_){}
        const r=relationLabelOnly(label);if(r)rels.add(r);
      }
      if(rels.size>=2)return {relations:[...rels],depth};
    }
    return {relations:[],depth:99};
  }
  function relationVisualActive(el) {
    try {
      const cs=getComputedStyle(el),ariaSelected=el.getAttribute&&el.getAttribute('aria-selected')==='true',ariaCurrent=el.getAttribute&&el.getAttribute('aria-current')==='page';
      let blue=isFacebookBlue(cs.color)||isFacebookBlue(cs.borderBottomColor)||isFacebookBlue(cs.backgroundColor),underline=false;
      for(const pseudo of ['::before','::after']){try{const ps=getComputedStyle(el,pseudo);if(ps&&ps.content!=='none'&&ps.content!=='normal'){const h=parseFloat(ps.height)||0;if(h>=2&&(isFacebookBlue(ps.backgroundColor)||isFacebookBlue(ps.borderBottomColor)))underline=true;}}catch(_){}}
      if((parseFloat(cs.borderBottomWidth)||0)>=2&&isFacebookBlue(cs.borderBottomColor))underline=true;
      return {active:ariaSelected||ariaCurrent||(blue&&underline),ariaSelected,ariaCurrent,blue,underline};
    } catch (_) { return {active:false,ariaSelected:false,ariaCurrent:false,blue:false,underline:false}; }
  }
  function detectActiveUiRelationHint() {
    const route=relationRouteContext();
    const selectors=['[role="tab"][aria-selected="true"]','[aria-selected="true"]','[aria-current="page"]','[role="tab"]','a[href]'];
    const seen=new Set(),out=[];
    for(const sel of selectors){
      let nodes=[];try{nodes=Array.from(document.querySelectorAll(sel));}catch(_){}
      for(const el of nodes){
        if(seen.has(el)||!elementVisible(el))continue;seen.add(el);
        let label='',href='';try{label=String(el.getAttribute&&el.getAttribute('aria-label')||el.innerText||el.textContent||'').trim();}catch(_){}
        try{href=String(el.getAttribute&&el.getAttribute('href')||'');}catch(_){}
        if(!label||label.length>120)continue;
        const relation=relationLabelOnly(label)||relationFromUiValue(href);if(!relation)continue;
        const visual=relationVisualActive(el);if(!visual.active)continue;
        const cluster=relationCluster(el),r=el.getBoundingClientRect();
        const hrefLow=String(href||'').toLowerCase();
        const outerFriendsContainer=route.kind==='friends_container'&&relation==='friends'&&cluster.relations.length<2&&(/\/friends(?:\/|$|[?#])/.test(hrefLow)||relationLabelOnly(label)==='friends');
        if(outerFriendsContainer)continue;
        let score=0;if(visual.ariaSelected)score+=120;if(visual.ariaCurrent)score+=110;if(visual.blue)score+=30;if(visual.underline)score+=50;
        if(cluster.relations.length>=2)score+=140;
        if(route.relation&&relation===route.relation)score+=100;
        if(/\/friends_all(?:\/|$|[?#])/.test(hrefLow)||/[?&]sk=friends_all(?:&|$)/.test(hrefLow))score+=150;
        score+=Math.max(0,Math.min(45,Number(r.top||0)/20));
        out.push({relation,label:label.slice(0,120),href,score,top:Number(r.top||0),clusterRelations:cluster.relations,source:'active_dom_request'});
      }
    }
    out.sort((a,b)=>b.score-a.score||b.top-a.top);
    if(out[0])return out[0];
    if(route.relation)return {relation:route.relation,label:route.kind,href:String(location.href||''),score:220,top:0,clusterRelations:[],source:'explicit_relation_route'};
    return null;
  }
    function refreshUiRelationHintFromDom() {
    const h=detectActiveUiRelationHint();if(!h)return null;
    const prev=state.uiRelationHint||{},now=new Date().toISOString();
    state.uiRelationHint={relation:h.relation,label:h.label||'',href:h.href||'',at:now,source:h.source||'active_dom_request'};
    if(prev.relation!==h.relation||Date.now()-(Date.parse(prev.at||'')||0)>3000)post('RELATION_UI_HINT',state.uiRelationHint);
    return state.uiRelationHint;
  }
  function requestMeta(body = '') {
    const route=relationRouteContext();
    const autoHint=refreshUiRelationHintFromDom()||state.uiRelationHint||{};
    const routeHint=route.relation||'';
    const chosenHint=autoHint.relation||routeHint||'';
    const out = { friendlyName: '', docId: '', variables: '', variableObject: null, connectionFingerprint: '', uiRelationHint: chosenHint, uiRelationHintAt: autoHint.at || (routeHint?new Date().toISOString():''), uiRelationHintSource: autoHint.relation?(autoHint.source||'active_dom_request'):(routeHint?'explicit_relation_route':''), requestStartedAt: new Date().toISOString() };
    try {
      const p = new URLSearchParams(String(body || ''));
      out.friendlyName = p.get('fb_api_req_friendly_name') || '';
      out.docId = p.get('doc_id') || '';
      out.variables = p.get('variables') || '';
      if (out.variables) {
        try { out.variableObject = JSON.parse(out.variables); } catch (_) {}
      }
      out.connectionFingerprint = connectionFingerprint(out);
    } catch (_) {}
    return out;
  }


  function normalizeRelationText(value='') {
    return String(value || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/\s+/g,' ').trim();
  }
  function relationFromUiValue(value='') {
    const raw=String(value||''), t=normalizeRelationText(raw);
    const label=t.replace(/\s*(?:[·|:]\s*)?\(?\d[\d.,\s]*[kmb]?\)?\s*$/i,'').trim();
    if(/^(?:friends?|amigos?|amizades?|all friends|see all friends|todos os amigos|ver todos os amigos)$/.test(label))return 'friends';
    if(/^(?:followers?|seguidores?)$/.test(label))return 'followers';
    if(/^(?:following|seguindo)$/.test(label))return 'following';
    const low=raw.toLowerCase();
    if(/\/friends_all(?:\/|$|[?#])/.test(low)||/[?&]sk=friends_all(?:&|$)/.test(low))return 'friends';
    if(/\/followers(?:\/|$|[?#])/.test(low))return 'followers';
    if(/\/following(?:\/|$|[?#])/.test(low))return 'following';
    // Bare /friends is a profile container, not proof that a generic collection request is Friends.
    return '';
  }
  function relationHintFromEventTarget(target) {
    let el=target&&target.nodeType===1?target:target&&target.parentElement;
    for(let i=0;i<9&&el;i++,el=el.parentElement){
      let label='',href='';
      try{label=String(el.getAttribute&&el.getAttribute('aria-label')||el.innerText||el.textContent||'').trim();}catch(_){}
      try{href=String(el.getAttribute&&el.getAttribute('href')||'');}catch(_){}
      const relation=relationFromUiValue(label)||relationFromUiValue(href);
      if(relation&&label.length<=120)return {relation,label:label.slice(0,120),href};
    }
    return null;
  }
  function rememberUiRelationHint(hint,source='pointer') {
    if(!hint||!hint.relation)return;
    const next={relation:hint.relation,label:String(hint.label||''),href:String(hint.href||''),at:new Date().toISOString(),source};
    state.uiRelationHint=next;
    post('RELATION_UI_HINT', next);
  }
  try{
    document.addEventListener('pointerdown',e=>{const h=relationHintFromEventTarget(e.target);if(h)rememberUiRelationHint(h,'pointerdown_capture');},true);
    document.addEventListener('click',e=>{const h=relationHintFromEventTarget(e.target);if(h)rememberUiRelationHint(h,'click_capture');},true);
  }catch(_){}
  function makeRequestId() {
    state.seq += 1;
    return `${Date.now().toString(36)}-${state.seq.toString(36)}`;
  }

  function trimTemplates() {
    while (state.templates.size > state.maxTemplates) {
      const first = state.templates.keys().next().value;
      state.templates.delete(first);
    }
  }

  function post(type, payload = {}) {
    try {
      window.postMessage({ channel: CHANNEL_MAIN, type, sessionId: state.sessionId, ...payload },location.origin);
    } catch (_) {}
  }

  async function emitResponse({ requestId, parentRequestId = '', rootRequestId = '', url, method, body, response, origin = 'page_fetch', requestMetaSnapshot = null }) {
    // V35 idle-safe: jamais clona/lê resposta da página fora de uma execução explicitamente iniciada.
    if (!state.active || !response) return;
    try {
      const len = Number(response.headers && response.headers.get && response.headers.get('content-length') || 0);
      if (len > state.maxPayloadBytes) return;
      const text = await response.clone().text();
      if (text.length > state.maxPayloadBytes) return;
      const payload = {
        requestId,
        parentRequestId: String(parentRequestId || ''),
        rootRequestId: String(rootRequestId || requestId || ''),
        origin,
        url: String(url || ''),
        method: String(method || 'POST'),
        status: Number(response.status || 0),
        ok: !!response.ok,
        request: requestMetaSnapshot || requestMeta(body),
        responseText: text,
        capturedAt: new Date().toISOString(),
        passiveBeforeStart: false,
      };
      if (state.sessionId) post('GRAPHQL_RESPONSE', payload);
    } catch (_) {}
  }

  function collectCursorPaths(value, path = [], out = []) {
    if (!value || typeof value !== 'object') return out;
    if (Array.isArray(value)) { value.forEach((x, i) => collectCursorPaths(x, path.concat(i), out)); return out; }
    for (const key of Object.keys(value)) {
      const low = key.toLowerCase();
      if (['cursor', 'after', 'aftercursor', 'end_cursor', 'endcursor'].includes(low) && (typeof value[key] === 'string' || value[key] == null)) out.push(path.concat(key));
      else if (value[key] && typeof value[key] === 'object') collectCursorPaths(value[key], path.concat(key), out);
    }
    return out;
  }
  function setAtPath(root, path, value) {
    let cur = root; for (let i = 0; i < path.length - 1; i++) { if (cur == null) return false; cur = cur[path[i]]; }
    if (cur == null) return false; cur[path[path.length - 1]] = value; return true;
  }
  function replayBody(templateBody, cursor) {
    try {
      const p = new URLSearchParams(String(templateBody || ''));
      const raw = p.get('variables'); if (!raw) return '';
      const vars = JSON.parse(raw), paths = collectCursorPaths(vars);
      if (!paths.length) return '';
      const minDepth = Math.min(...paths.map(x => x.length));
      const selected = paths.filter(x => x.length === minDepth).slice(0, 2);
      let changed = false; for (const path of selected) changed = setAtPath(vars, path, cursor) || changed;
      if (!changed) return '';
      p.set('variables', JSON.stringify(vars)); p.set('__req', Math.random().toString(36).slice(2, 6));
      return p.toString();
    } catch (_) { return ''; }
  }

  async function replay(requestId, cursor) {
    const tpl = state.templates.get(String(requestId || ''));
    if (!state.active || !tpl || !cursor) return;
    const body = replayBody(tpl.body, cursor);
    if (!body) { post('REPLAY_RESULT', { requestId: '', parentRequestId: requestId, cursor, ok: false, reason: 'cursor_not_replaceable' }); return; }
    const replayId = makeRequestId(), rootRequestId = String(tpl.connectionFingerprint ? ('conn:' + tpl.connectionFingerprint) : (tpl.rootRequestId || requestId || replayId));
    try {
      const headers = { ...tpl.headers };
      if (!Object.keys(headers).some(k => k.toLowerCase() === 'content-type')) headers['content-type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
      if (!armedNativeFetch) throw new Error('interceptors_not_armed');
      const response = await armedNativeFetch(tpl.url, { method: tpl.method || 'POST', credentials: 'include', headers, body });
      const replayMeta={...requestMeta(body),uiRelationHint:tpl.requestMeta&&tpl.requestMeta.uiRelationHint||state.activeRelation||'',uiRelationHintAt:tpl.requestMeta&&tpl.requestMeta.uiRelationHintAt||state.runStartedAt||''};
      state.templates.set(replayId, { ...tpl, body, parentRequestId: requestId, rootRequestId, requestMeta: replayMeta }); trimTemplates();
      await emitResponse({ requestId: replayId, parentRequestId: requestId, rootRequestId, url: tpl.url, method: tpl.method, body, response, origin: 'controlled_replay', requestMetaSnapshot: replayMeta });
      post('REPLAY_RESULT', { requestId: replayId, parentRequestId: requestId, rootRequestId, cursor, ok: response.ok, status: response.status });
    } catch (e) {
      post('REPLAY_RESULT', { requestId: replayId, parentRequestId: requestId, rootRequestId, cursor, ok: false, reason: String(e && e.message || e) });
    }
  }

  // V35 idle-safe: os interceptadores só existem enquanto a raspagem está ativa.
  let armedXhrOpen = null, armedXhrSend = null, armedXhrSetHeader = null;
  let patchedFetchRef = null, patchedOpenRef = null, patchedSendRef = null, patchedHeaderRef = null;

  function installInterceptors() {
    if (state.interceptorsInstalled) return true;
    try {
      // Late-arm real: preserva exatamente as funções correntes da página no instante do clique.
      armedOriginalFetch = window.fetch;
      if (typeof armedOriginalFetch !== 'function') throw new Error('fetch_unavailable');
      armedNativeFetch = armedOriginalFetch.bind(window);
      ArmedXHR = window.XMLHttpRequest || null;
      armedXhrOpen = ArmedXHR && ArmedXHR.prototype && ArmedXHR.prototype.open;
      armedXhrSend = ArmedXHR && ArmedXHR.prototype && ArmedXHR.prototype.send;
      armedXhrSetHeader = ArmedXHR && ArmedXHR.prototype && ArmedXHR.prototype.setRequestHeader;
      patchedFetchRef = async function patchedFetch(input, init = undefined) {
        const url = typeof input === 'string' ? input : (input && input.url || '');
        const method = String((init && init.method) || (input && input.method) || 'GET').toUpperCase();
        const body = bodyString(init && init.body);
        const eligible = state.active && isGraphQL(url) && method === 'POST';
        const requestId = eligible ? makeRequestId() : '', headers = eligible ? normalizeHeaders((init && init.headers) || (input && input.headers)) : {}, reqMeta = eligible ? requestMeta(body) : null;
        if (eligible && body) {
          state.templates.set(requestId, { url:String(url), method, headers, body, rootRequestId:requestId, parentRequestId:'', connectionFingerprint:reqMeta && reqMeta.connectionFingerprint || '', requestMeta:reqMeta });
          trimTemplates();
        }
        const response = await armedNativeFetch(input, init);
        if (eligible) Promise.resolve().then(() => emitResponse({ requestId, url, method, body, response, origin:'page_fetch', requestMetaSnapshot:reqMeta }));
        return response;
      };
      window.fetch = patchedFetchRef;

      if (ArmedXHR && ArmedXHR.prototype && armedXhrOpen && armedXhrSend && armedXhrSetHeader) {
        patchedOpenRef = function patchedOpen(method, url, ...rest) {
          this.__b35v35 = { method:String(method || 'GET').toUpperCase(), url:String(url || ''), headers:{} };
          return armedXhrOpen.call(this, method, url, ...rest);
        };
        patchedHeaderRef = function patchedHeader(k, v) {
          try { if (this.__b35v35) this.__b35v35.headers[String(k)] = String(v); } catch (_) {}
          return armedXhrSetHeader.call(this, k, v);
        };
        patchedSendRef = function patchedSend(body) {
          const meta = this.__b35v35 || {};
          const bodyText = bodyString(body);
          if (state.active && isGraphQL(meta.url) && meta.method === 'POST') {
            const requestId = makeRequestId(), reqMeta = requestMeta(bodyText);
            if (bodyText) {
              state.templates.set(requestId, { url:meta.url, method:meta.method, headers:meta.headers || {}, body:bodyText, rootRequestId:requestId, parentRequestId:'', connectionFingerprint:reqMeta.connectionFingerprint || '', requestMeta:reqMeta });
              trimTemplates();
            }
            this.addEventListener('load', () => {
              try {
                if (!state.active || typeof this.responseText !== 'string' || this.responseText.length > state.maxPayloadBytes) return;
                const payload = {
                  requestId, parentRequestId:'', rootRequestId:requestId, origin:'page_xhr', url:meta.url, method:meta.method,
                  status:Number(this.status || 0), ok:Number(this.status || 0) >= 200 && Number(this.status || 0) < 400,
                  request:reqMeta, responseText:this.responseText, capturedAt:new Date().toISOString(), passiveBeforeStart:false,
                };
                if (state.sessionId) post('GRAPHQL_RESPONSE', payload);
              } catch (_) {}
            }, { once:true });
          }
          return armedXhrSend.call(this, body);
        };
        ArmedXHR.prototype.open = patchedOpenRef;
        ArmedXHR.prototype.setRequestHeader = patchedHeaderRef;
        ArmedXHR.prototype.send = patchedSendRef;
      }
      state.interceptorsInstalled = true;
      return true;
    } catch (_) {
      uninstallInterceptors();
      return false;
    }
  }

  function uninstallInterceptors() {
    try { if (patchedFetchRef && armedOriginalFetch && window.fetch === patchedFetchRef) window.fetch = armedOriginalFetch; } catch (_) {}
    try { if (patchedOpenRef && ArmedXHR && ArmedXHR.prototype.open === patchedOpenRef) ArmedXHR.prototype.open = armedXhrOpen; } catch (_) {}
    try { if (patchedSendRef && ArmedXHR && ArmedXHR.prototype.send === patchedSendRef) ArmedXHR.prototype.send = armedXhrSend; } catch (_) {}
    try { if (patchedHeaderRef && ArmedXHR && ArmedXHR.prototype.setRequestHeader === patchedHeaderRef) ArmedXHR.prototype.setRequestHeader = armedXhrSetHeader; } catch (_) {}
    patchedFetchRef = patchedOpenRef = patchedSendRef = patchedHeaderRef = null;
    armedOriginalFetch = armedNativeFetch = ArmedXHR = null;
    armedXhrOpen = armedXhrSend = armedXhrSetHeader = null;
    state.interceptorsInstalled = false;
  }

  window.addEventListener('message', event => {
    if (event.source !== window) return;
    const d = event.data;
    if (!d || d.channel !== CHANNEL_CONTROL) return;
    if (d.type === 'CAPTURE_CONTROL') {
      const activating = d.active === true;
      state.active = activating;
      state.sessionId = activating ? String(d.sessionId || '') : '';
      state.activeRelation = activating ? String(d.relation || '') : '';
      state.runStartedAt = activating ? String(d.runStartedAt || new Date().toISOString()) : '';
      if (activating) {
        installInterceptors();
      } else {
        state.templates.clear();
        uninstallInterceptors();
      }
      post('CONTROL_ACK', { active: state.active, relation: state.activeRelation, runStartedAt: state.runStartedAt, interceptorsInstalled: state.interceptorsInstalled === true });
    } else if (d.type === 'REPLAY_NEXT' && state.active && String(d.sessionId || '') === state.sessionId) {
      replay(String(d.requestId || ''), String(d.cursor || ''));
    }
  });

  // RC2: não expor state/funções mutáveis no contexto da página. Canal MAIN continua observacional/não confiável e deve ser validado no ISOLATED.
  const marker = Object.freeze({version:'35.0.0',installed:true,trust:'HOST_CONTEXT_UNTRUSTED',apiExposed:false});
  window.__FB_B35A1_V35_MAIN_RELATION_HOOK__ = marker;
  window.__FB_B35A1_V34_MAIN_RELATION_HOOK__ = marker;
  window.__FB_B35A1_V33_MAIN_RELATION_HOOK__ = marker;
  window.__FB_B35A1_V32_MAIN_RELATION_HOOK__ = marker;
  window.__FB_B35A1_V31_MAIN_RELATION_HOOK__ = marker;
  window.__FB_B35A1_V29_MAIN_RELATION_HOOK__ = marker;
})();
