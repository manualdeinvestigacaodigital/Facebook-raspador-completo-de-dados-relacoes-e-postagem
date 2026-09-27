/*
 * FB_B35A1 V44R21R5 — capturador MAIN-world dedicado às listas de reações.
 *
 * Finalidade: observar somente respostas GraphQL relacionadas a reações durante
 * uma coleta explicitamente iniciada pelo usuário. O hook não exporta cookies,
 * headers, tokens, corpos de requisição ou respostas brutas. Ele envia ao mundo
 * isolado apenas perfis de reatores já retornados ao navegador e metadados
 * mínimos de auditoria da consulta.
 */
(function(){
  'use strict';
  if(window.__FB_B35_POST_REACTION_MAIN_HOOK_V44R21R5__)return;

  var CONTROL='FB_B35_POST_REACTION_CONTROL_V44R21R5';
  var MAIN='FB_B35_POST_REACTION_MAIN_V44R21R5';
  var nativeFetch=typeof window.fetch==='function'?window.fetch.bind(window):null;
  var NativeXHR=window.XMLHttpRequest||null;
  var xhrOpen=NativeXHR&&NativeXHR.prototype&&NativeXHR.prototype.open;
  var xhrSend=NativeXHR&&NativeXHR.prototype&&NativeXHR.prototype.send;
  var patchedFetch=null,patchedOpen=null,patchedSend=null;
  var state={active:false,sessionId:'',startedAt:'',seq:0,captured:0,relevant:0,actors:0,maxBytes:14*1024*1024,installed:false};

  function post(type,payload){
    try{window.postMessage(Object.assign({channel:MAIN,type:type,sessionId:state.sessionId,at:new Date().toISOString()},payload||{}),location.origin);}catch(_){}
  }
  function str(v){return String(v==null?'':v);}
  function cleanText(v){return str(v).replace(/[\u200B-\u200D\uFEFF]/g,'').replace(/\s+/g,' ').trim();}
  function bodyText(body){if(typeof body==='string')return body;try{if(body instanceof URLSearchParams)return body.toString();}catch(_){}return '';}
  function isGraphQL(url){return /\/api\/graphql\/?(?:\?|$)|graphql/i.test(str(url));}
  function requestMeta(body){
    var out={friendlyName:'',docId:'',variablesHint:'',reactionNamed:false,reactionType:'REACTION'};
    try{
      var p=new URLSearchParams(str(body||''));
      out.friendlyName=cleanText(p.get('fb_api_req_friendly_name')||'');
      out.docId=cleanText(p.get('doc_id')||'');
      var raw=p.get('variables')||'';
      out.variablesHint=raw.slice(0,900);
      out.reactionNamed=/reaction|reactor|ufi.{0,24}react|feedback.{0,24}react/i.test(out.friendlyName+' '+raw);
      try{var vr=JSON.parse(raw||'{}'),stack=[vr],seen=0;while(stack.length&&seen++<3000){var cur=stack.pop();if(!cur||typeof cur!=='object')continue;Object.keys(cur).forEach(function(k){var v=cur[k];if(/reaction(?:_|)type|reaction_key|reactionkey/i.test(k)&&typeof v==='string'&&out.reactionType==='REACTION')out.reactionType=normalizeReaction(v);if(v&&typeof v==='object')stack.push(v);});}}catch(_){var mm=raw.match(/(?:reactionType|reaction_type|reaction_key)\?"?\s*[:=]\s*\?"([A-Za-z_]+)/i);if(mm)out.reactionType=normalizeReaction(mm[1]);}
    }catch(_){}
    return out;
  }
  function normalizeReaction(raw){
    var s=cleanText(raw).toUpperCase();
    if(!s)return 'REACTION';
    if(/(?:^|[^A-Z])LIKE(?:[^A-Z]|$)|CURTIR|CURTIU|👍/.test(s))return 'LIKE';
    if(/LOVE|AMEI|AMOR|HEART|❤|❤️/.test(s))return 'LOVE';
    if(/CARE|FOR[CÇ]A|SOLIDARIEDADE|🥰/.test(s))return 'CARE';
    if(/HAHA|RISADA|RISO|😂|😆/.test(s))return 'HAHA';
    if(/WOW|UAU|😮|😯/.test(s))return 'WOW';
    if(/SAD|TRISTE|😢/.test(s))return 'SAD';
    if(/ANGRY|GRR|RAIVA|😡/.test(s))return 'ANGRY';
    return 'REACTION';
  }
  function parseJsonPieces(text){
    var raw=str(text||'').replace(/^\s*for\s*\(;;\);\s*/,'').trim(),out=[];
    if(!raw)return out;
    function add(piece){piece=str(piece).trim();if(!piece)return;try{out.push(JSON.parse(piece));}catch(_){}}
    add(raw);
    if(!out.length){raw.split(/\r?\n/).forEach(function(line){line=line.replace(/^\s*for\s*\(;;\);\s*/,'').trim();add(line);});}
    return out;
  }
  function firstString(obj,keys){
    if(!obj||typeof obj!=='object')return '';
    for(var i=0;i<keys.length;i++){var v=obj[keys[i]];if(typeof v==='string'&&cleanText(v))return cleanText(v);}
    return '';
  }
  function nestedUri(obj){
    if(!obj||typeof obj!=='object')return '';
    /* Nunca usar obj.url diretamente: em objetos User esse campo é o perfil,
       não o avatar. Só aceitamos URLs que estejam sob chaves semânticas de imagem. */
    var keys=['profile_picture','profilePicture','picture','image','avatar','square_image','squareImage','profile_pic','profilePic'];
    for(var i=0;i<keys.length;i++){
      var x=obj[keys[i]];
      if(typeof x==='string'&&/^https?:/i.test(x))return x;
      if(x&&typeof x==='object'){
        var u=firstString(x,['uri','url','src']);if(u&&/^https?:/i.test(u))return u;
        var nested=firstString(x,['image_uri','imageUrl','image_url']);if(nested&&/^https?:/i.test(nested))return nested;
      }
    }
    return '';
  }
  function facebookProfileUrl(raw,id){
    var u=cleanText(raw||'');
    try{
      if(u){var x=new URL(u,location.href);if(!/(^|\.)facebook\.com$/i.test(x.hostname))u='';else{if(/\/profile\.php$/i.test(x.pathname)){var q=x.searchParams.get('id');u=q?'https://www.facebook.com/profile.php?id='+encodeURIComponent(q):'';}else{var parts=x.pathname.split('/').filter(Boolean),reserved={reel:1,reels:1,photo:1,photos:1,posts:1,videos:1,watch:1,groups:1,events:1,pages:1,marketplace:1,permalink:1,'permalink.php':1,profile:1};if(parts[0]==='people'&&parts.length>=3&&/^\d+$/.test(parts[parts.length-1]))u='https://www.facebook.com/profile.php?id='+encodeURIComponent(parts[parts.length-1]);else if(!parts.length||reserved[String(parts[0]||'').toLowerCase()]||String(parts[0]||'').toLowerCase()==='people')u='';else u='https://www.facebook.com/'+encodeURIComponent(parts[0]);}}}
    }catch(_){u='';}
    if(!u&&/^\d{5,}$/.test(str(id)))u='https://www.facebook.com/profile.php?id='+encodeURIComponent(str(id));
    return u;
  }
  function looksUser(obj){
    if(!obj||typeof obj!=='object'||Array.isArray(obj))return false;
    var typ=cleanText(obj.__typename||obj.typename||obj.type||'');
    if(typ&&/(?:User|Profile|Actor|Person|CometUser)/i.test(typ))return true;
    var name=firstString(obj,['name','display_name','displayName','short_name','shortName']);
    var id=firstString(obj,['id','profile_id','profileId','actor_id','actorId']);
    var url=firstString(obj,['url','profile_url','profileUrl','uri']);
    return !!(name&&(id||url)&&(nestedUri(obj)||typ));
  }
  function candidateFrom(obj,reaction,sourcePath){
    if(!looksUser(obj))return null;
    var name=firstString(obj,['name','display_name','displayName','short_name','shortName']);
    if(!name||name.length<2||name.length>160)return null;
    var id=firstString(obj,['id','profile_id','profileId','actor_id','actorId']);
    var url=facebookProfileUrl(firstString(obj,['url','profile_url','profileUrl','uri']),id);
    if(!url)return null;
    var avatar=nestedUri(obj);
    if(avatar&&!/^https?:/i.test(avatar))avatar='';
    return {id:/^\d{5,}$/.test(id)?id:'',name:name,profileUrl:url,avatarUrl:avatar,reactionType:normalizeReaction(reaction),sourcePath:sourcePath||''};
  }
  function reactionFromObject(obj,fallback){
    if(!obj||typeof obj!=='object')return normalizeReaction(fallback);
    var keys=['reaction_type','reactionType','feedback_reaction','feedbackReaction','reaction','reaction_key','reactionKey','type'];
    for(var i=0;i<keys.length;i++){
      var v=obj[keys[i]];
      if(typeof v==='string'){var n=normalizeReaction(v);if(n!=='REACTION')return n;}
      if(v&&typeof v==='object'){var s=firstString(v,['key','name','type','reaction_type','reactionType']);var n2=normalizeReaction(s);if(n2!=='REACTION')return n2;}
    }
    return normalizeReaction(fallback);
  }
  function extractPayload(roots){
    var map=new Map(),pageInfos=[],signals=new Set(),visited=0,MAX=260000;
    function addCandidate(c){if(!c)return;var key=c.id?('id:'+c.id):c.profileUrl.toLowerCase(),old=map.get(key);if(!old){map.set(key,c);return;}if(!old.avatarUrl&&c.avatarUrl)old.avatarUrl=c.avatarUrl;if((!old.reactionType||old.reactionType==='REACTION')&&c.reactionType!=='REACTION')old.reactionType=c.reactionType;if(c.name&&c.name.length>old.name.length)old.name=c.name;}
    function walk(value,ctx,path,depth){
      if(visited++>MAX||depth>32||value==null)return;
      if(Array.isArray(value)){for(var i=0;i<value.length;i++)walk(value[i],ctx,path+'['+i+']',depth+1);return;}
      if(typeof value!=='object')return;
      var keys=Object.keys(value),localReaction=reactionFromObject(value,ctx.reaction),branch=ctx.branch;
      for(var k=0;k<keys.length;k++){
        var low=keys[k].toLowerCase();
        if(/reactor|reaction|feedback_reaction|top_reaction|ufi.*react/.test(low)){branch=true;signals.add(keys[k]);}
      }
      var pi=value.page_info||value.pageInfo;
      if(pi&&typeof pi==='object')pageInfos.push({hasNext:pi.has_next_page===true||pi.hasNextPage===true,endCursor:cleanText(pi.end_cursor||pi.endCursor||''),path:path});
      if(branch){
        addCandidate(candidateFrom(value,localReaction,path));
        var actorKeys=['reactor','actor','user','profile','person'];
        for(var a=0;a<actorKeys.length;a++){var actor=value[actorKeys[a]];if(actor&&typeof actor==='object')addCandidate(candidateFrom(actor,localReaction,path+'.'+actorKeys[a]));}
        if(value.node&&typeof value.node==='object')addCandidate(candidateFrom(value.node,localReaction,path+'.node'));
      }
      for(var j=0;j<keys.length;j++){
        var key=keys[j],child=value[key],childBranch=branch||/reactor|reaction|feedback_reaction|top_reaction|ufi.*react/i.test(key);
        walk(child,{reaction:localReaction,branch:childBranch},path+'.'+key,depth+1);
      }
    }
    (roots||[]).forEach(function(root,i){walk(root,{reaction:'REACTION',branch:false},'$['+i+']',0);});
    return {candidates:Array.from(map.values()),pageInfos:pageInfos.slice(0,80),signalKeys:Array.from(signals).slice(0,80),visited:visited,hasReactionEvidence:signals.size>0||map.size>0};
  }
  function eligibleResponse(meta,extracted){return !!(meta&&meta.reactionNamed||extracted&&extracted.hasReactionEvidence);}
  function emitResponse(info,responseText){
    if(!state.active)return;
    var text=str(responseText||'');if(!text||text.length>state.maxBytes)return;
    var roots=parseJsonPieces(text),extracted=extractPayload(roots),meta=info.meta||{};
    if(meta.reactionType&&meta.reactionType!=='REACTION')extracted.candidates.forEach(function(c){if(!c.reactionType||c.reactionType==='REACTION')c.reactionType=meta.reactionType;});
    state.captured++;
    if(!eligibleResponse(meta,extracted))return;
    state.relevant++;state.actors+=extracted.candidates.length;
    post('REACTION_GRAPHQL_BATCH',{requestId:info.requestId||'',origin:info.origin||'',status:Number(info.status||0),ok:info.ok===true,friendlyName:meta.friendlyName||'',docId:meta.docId||'',reactionNamed:meta.reactionNamed===true,requestReactionType:meta.reactionType||'REACTION',candidates:extracted.candidates.slice(0,2500),pageInfos:extracted.pageInfos,signalKeys:extracted.signalKeys,actorCount:extracted.candidates.length,visitedNodes:extracted.visited});
  }
  function makeId(){state.seq++;return 'prx-'+Date.now().toString(36)+'-'+state.seq.toString(36);}
  function install(){
    if(state.installed)return true;
    try{
      if(nativeFetch){
        patchedFetch=async function(input,init){
          var url=typeof input==='string'?input:(input&&input.url)||'',method=str((init&&init.method)||(input&&input.method)||'GET').toUpperCase(),body=bodyText(init&&init.body),requestId=makeId(),bodyPromise=Promise.resolve(body);
          if(!body&&input&&typeof input.clone==='function'&&method==='POST'){try{bodyPromise=input.clone().text().catch(function(){return '';});}catch(_){}}
          var response=await nativeFetch(input,init);
          if(state.active&&method==='POST'&&isGraphQL(url)){Promise.resolve(bodyPromise).then(async function(bodyResolved){try{var meta=requestMeta(bodyResolved||body),len=Number(response.headers&&response.headers.get&&response.headers.get('content-length')||0);if(len>state.maxBytes)return;var text=await response.clone().text();emitResponse({requestId:requestId,origin:'fetch',status:response.status,ok:response.ok,meta:meta},text);}catch(_){}});}
          return response;
        };
        window.fetch=patchedFetch;
      }
      if(NativeXHR&&xhrOpen&&xhrSend){
        patchedOpen=function(method,url){this.__b35PostReaction={method:str(method||'GET').toUpperCase(),url:str(url||''),requestId:makeId(),body:'',meta:null};return xhrOpen.apply(this,arguments);};
        patchedSend=function(body){var rec=this.__b35PostReaction||{};rec.body=bodyText(body);rec.meta=requestMeta(rec.body);if(state.active&&rec.method==='POST'&&isGraphQL(rec.url)){this.addEventListener('load',function(){try{if(!state.active||typeof this.responseText!=='string'||this.responseText.length>state.maxBytes)return;emitResponse({requestId:rec.requestId,origin:'xhr',status:Number(this.status||0),ok:Number(this.status||0)>=200&&Number(this.status||0)<400,meta:rec.meta||{}},this.responseText);}catch(_){}},{once:true});}return xhrSend.apply(this,arguments);};
        NativeXHR.prototype.open=patchedOpen;NativeXHR.prototype.send=patchedSend;
      }
      state.installed=true;return true;
    }catch(_){return false;}
  }
  function stop(reason){
    var summary={reason:reason||'stop',captured:state.captured,relevant:state.relevant,actors:state.actors,startedAt:state.startedAt,finishedAt:new Date().toISOString()};
    post('REACTION_CAPTURE_STOPPED',summary);state.active=false;state.sessionId='';state.startedAt='';state.captured=0;state.relevant=0;state.actors=0;
  }

  window.addEventListener('message',function(event){
    if(event.source!==window)return;var d=event.data;if(!d||d.channel!==CONTROL)return;
    if(d.type==='START_REACTION_CAPTURE'){
      state.active=true;state.sessionId=str(d.sessionId||'');state.startedAt=new Date().toISOString();state.captured=0;state.relevant=0;state.actors=0;install();post('REACTION_CAPTURE_STARTED',{installed:state.installed===true,declaredTotal:Number(d.declaredTotal||0),sourceUrl:str(d.sourceUrl||location.href)});
    }else if(d.type==='STOP_REACTION_CAPTURE'&&(!d.sessionId||str(d.sessionId)===state.sessionId))stop(str(d.reason||'isolated_stop'));
  });

  install();
  var marker=Object.freeze({version:'V44R21R5',installed:true,trust:'HOST_CONTEXT_UNTRUSTED',apiExposed:false});
  window.__FB_B35_POST_REACTION_MAIN_HOOK_V44R21R5__=marker;
})();
