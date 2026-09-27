/*
Raspador de dados de relações e postagens do Facebook — controlador unificado V44R21R33 META/BIO BOOTSTRAP FIX
Duas ações principais e opção opt-in de interações; Amigos abre e inicia automaticamente; postagem usa HTML vertical padrão;
Reels confirmado por URL + mídia + autor; estado de navegação mantido por aba em chrome.storage.session;
núcleo relacional V43 preservado byte a byte.
*/
(function(){
'use strict';
var CONTROLLER_VERSION_V44R21R8='44.21.34';
if(window.__FB_B35_UNIFIED_CONTROLLER_V44__){
  if(String(window.__FB_B35_UNIFIED_CONTROLLER_V44__.version||'')===CONTROLLER_VERSION_V44R21R8){try{window.__FB_B35_UNIFIED_CONTROLLER_V44__.show();}catch(_){}return;}
  try{if(window.__FB_B35_UNIFIED_CONTROLLER_V44__.destroy)window.__FB_B35_UNIFIED_CONTROLLER_V44__.destroy();}catch(_){}
  try{delete window.__FB_B35_UNIFIED_CONTROLLER_V44__;}catch(_){}
}
var PANEL_ID='fb-b35-unified-v44-panel';
var LEGACY_PANEL_ID='fb-b35a1-raspador-amigos-v29-panel';
var STORAGE_KEY='FB_B35_PENDING_RELATION_V44';
var state={
  mode:'',
  activeRun:'',
  relation:'friends',
  status:'Escolha uma das duas ações.',
  error:'',
  postProgress:0,
  postL1:0,
  postL2:0,
  postTarget:0,
  postContentPct:0,
  postRunning:false,
  postExportReady:false,
  exportRunning:false,
  exportChooserOpen:false,
  exportFormats:{html:false,pdf:false,json:false,xlsx:false,csv:false},
  relationNavRunning:false,
  relationAutoRunning:false,
  lastUrl:String(location.href||''),
  closed:false,
  interactionUntil:0,
  stopDispatchedAt:0,
  relationPhysicalPct:0,
  minimized:false,
  postRunKey:'',
  scrapeInteractions:false,
  relationSelection:'',
  relationSelectionUserSet:false,
  relationDetected:'',
  relationDetectedSource:'',
  relationMismatchBlocked:false,
  relationMismatchRequested:'',
  relationMismatchActive:'',
  relationMismatchDeclared:0,
  relationExportReady:false,
  relationExportRelation:'',
  relationStartAck:false,
  relationStartDiagnostic:null,
  relationCoreRecovery:null,
  relationSuiteResults:{},
  relationSuiteCompleted:false,
  relationSuiteTarget:''
};
var routeTimer=null,observer=null,statusTimer=null,domTimer=null;
var postCtxCache={url:'',at:0,value:null};

function t(s){return String(s||'').replace(/[\u200B-\u200D\uFEFF]/g,'').replace(/\s+/g,' ').trim();}
function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
function visible(el){
  if(!el)return false;
  try{var cs=getComputedStyle(el),r=el.getBoundingClientRect();return cs.display!=='none'&&cs.visibility!=='hidden'&&r.width>0&&r.height>0;}catch(_){return false;}
}
function wait(ms){return new Promise(function(resolve){setTimeout(resolve,ms);});}
function core(){return window.__FB_B35A1_V43_V42_CORE_EXCEL_UI_FINAL__||null;}
function post(){return window.__FB_POST_SCRAPER_V44__||null;}
/* V44R20 — identidade estável da superfície para permitir coletas sequenciais sem herdar o resultado anterior. */
function postKeyFromHrefV44R20(href){
  try{
    var u=new URL(String(href||''),location.href),p=decodeURIComponent(u.pathname||'').replace(/\/+$/,'');
    var m=p.match(/\/(?:posts|reel|reels|videos|stories)\/([^/?#]+)/i);if(m)return String(u.hostname).toLowerCase()+'|'+m[0].toLowerCase();
    if(/\/photo(?:\.php)?$/i.test(p)&&u.searchParams.get('fbid'))return String(u.hostname).toLowerCase()+'|photo:'+u.searchParams.get('fbid');
    if(/\/permalink\.php$/i.test(p)&&u.searchParams.get('story_fbid'))return String(u.hostname).toLowerCase()+'|story:'+u.searchParams.get('story_fbid');
  }catch(_){ }
  return '';
}
function currentPostKeyV44R20(){return postKeyFromHrefV44R20(location.href);}
function clearPreparedPostV44R20(){
  try{var p=post();if(p&&p.clearPreparedExport)p.clearPreparedExport();}catch(_){ }
}
function resetPostSessionV44R20(message){
  clearPreparedPostV44R20();
  state.postProgress=0;state.postL1=0;state.postL2=0;state.postTarget=0;state.postContentPct=0;
  state.postRunning=false;state.postExportReady=false;state.postRunKey='';state.exportChooserOpen=false;
  resetExportFormatsV44R5();state.error='';state.status=message||'Nova postagem detectada. Pronta para raspar.';
}
function postContext(force){
  var now=Date.now(),url=String(location.href||'');
  if(!force&&postCtxCache.value&&postCtxCache.url===url&&now-postCtxCache.at<800)return postCtxCache.value;
  var p=post(),value=p&&p.detectContext?p.detectContext():{ready:false,type:'',reason:'Módulo de postagem indisponível.'};
  postCtxCache={url:url,at:now,value:value};return value;
}
function currentRelation(){
  var u=String(location.pathname+location.search);
  if(/(?:\/|[?&]sk=)friends(?:\/|$|&)/i.test(u))return 'friends';
  if(/(?:\/|[?&]sk=)followers(?:\/|$|&)/i.test(u))return 'followers';
  if(/(?:\/|[?&]sk=)following(?:\/|$|&)/i.test(u))return 'following';
  return '';
}
function relationLabel(r){return r==='friends'?'Amigos':r==='followers'?'Seguidores':r==='following'?'Seguindo':'Relação';}
function runtimeMessage(message){
  return new Promise(function(resolve){
    try{chrome.runtime.sendMessage(message,function(response){if(chrome.runtime.lastError){resolve(null);return;}resolve(response||null);});}
    catch(_){resolve(null);}
  });
}
function hideLegacyPanel(){
  var old=document.getElementById(LEGACY_PANEL_ID);
  if(old){old.style.setProperty('display','none','important');old.setAttribute('aria-hidden','true');}
  if(!document.getElementById('fb-b35-v44-hide-legacy')){
    var s=document.createElement('style');s.id='fb-b35-v44-hide-legacy';
    s.textContent='#'+LEGACY_PANEL_ID+'{display:none!important;visibility:hidden!important;pointer-events:none!important}';
    (document.head||document.documentElement).appendChild(s);
  }
}
function profileRootFromHref(href){
  try{
    var x=new URL(String(href||location.href),location.href);
    if(!/(^|\.)facebook\.com$/i.test(x.hostname))return '';
    if(/\/profile\.php$/i.test(x.pathname)){
      var id=x.searchParams.get('id');return id?'https://www.facebook.com/profile.php?id='+encodeURIComponent(id):'';
    }
    var parts=x.pathname.split('/').filter(Boolean);
    if(!parts.length)return '';
    var reserved={home:1,watch:1,reel:1,reels:1,photo:1,photos:1,videos:1,groups:1,friends:1,followers:1,following:1,marketplace:1,gaming:1,messages:1,notifications:1,settings:1,help:1,privacy:1,ads:1,login:1,share:1,search:1,people:1,hashtag:1,permalink:1,plugins:1,business:1,profile:1,pages:1,events:1,memories:1,saved:1,bookmarks:1,stories:1,'story.php':1,'profile.php':1,checkpoint:1,recover:1,reg:1,legal:1,policies:1,terms:1,adsmanager:1,commerce:1,jobs:1,fundraisers:1};
    var first=decodeURIComponent(parts[0]||'');
    if(first&&!reserved[first.toLowerCase()])return 'https://www.facebook.com/'+encodeURIComponent(first);
  }catch(_){}
  return '';
}
function profileRootFromPostAuthor(){
  try{
    var p=post();if(!p||!p.authorSnapshot)return '';
    var snap=p.authorSnapshot();return profileRootFromHref(snap&&snap.authorURL||'');
  }catch(_){return '';}
}
function profileRootFromVisibleAuthor(){
  var selectors='div[role="article"] h1 a[href],div[role="article"] h2 a[href],div[role="article"] h3 a[href],[role="dialog"] h1 a[href],[role="dialog"] h2 a[href],[role="dialog"] h3 a[href],main h1 a[href],main h2 a[href],main h3 a[href],strong a[href]';
  var links=Array.prototype.slice.call(document.querySelectorAll(selectors)).filter(visible),best='',score=-999;
  links.slice(0,400).forEach(function(a,i){
    var tx=t(a.innerText||a.textContent||a.getAttribute('aria-label')||''),href=String(a.href||'');
    var root=profileRootFromHref(href);if(!root||!tx)return;
    var s=30-i*0.001;if(a.closest('h1,h2,h3,strong'))s+=45;
    if(/comment_id=|\/posts\/|\/reel\/|photo\.php|\/stories\//i.test(href))s-=180;
    if(/Facebook|Home|Início|Reels|Friends|Amigos|Seguidores|Seguindo|See more|Ver mais/i.test(tx))s-=180;
    if(s>score){score=s;best=root;}
  });
  return best;
}
function resolveProfileRoot(){
  var fromUrl=profileRootFromHref(location.href);
  if(fromUrl)return fromUrl;
  return profileRootFromPostAuthor()||profileRootFromVisibleAuthor()||'';
}
function normalizeBase(u){
  try{var x=new URL(u);x.hash='';x.searchParams.delete('sk');return x.href.replace(/\/$/,'');}
  catch(_){return String(u||'').replace(/\/$/,'');}
}
function profileIdentity(u){
  try{
    var x=new URL(String(u||''),location.href);
    if(/\/profile\.php$/i.test(x.pathname)){var id=x.searchParams.get('id');return id?'id:'+id:'';}
    var first=decodeURIComponent((x.pathname.split('/').filter(Boolean)[0]||'')).toLowerCase();
    return first?'user:'+first:'';
  }catch(_){return '';}
}
function hrefBelongsToRoot(href,root){var a=profileIdentity(href),b=profileIdentity(root);return !!(a&&b&&a===b);}
function relationUrl(root,relation){
  try{
    var x=new URL(root);
    if(/\/profile\.php$/i.test(x.pathname)){x.searchParams.set('sk',relation);return x.href;}
    return x.origin+x.pathname.replace(/\/$/,'')+'/'+relation;
  }catch(_){return '';}
}
async function savePending(obj){
  var response=await runtimeMessage({type:'B35_PENDING_RELATION_SET',value:obj});
  if(response&&response.ok)return true;
  try{sessionStorage.setItem(STORAGE_KEY,JSON.stringify(obj));return true;}catch(_){return false;}
}
async function loadPending(){
  var response=await runtimeMessage({type:'B35_PENDING_RELATION_GET'});
  if(response&&response.ok&&response.value)return response.value;
  try{return JSON.parse(sessionStorage.getItem(STORAGE_KEY)||'null');}catch(_){return null;}
}
async function clearPending(){
  await runtimeMessage({type:'B35_PENDING_RELATION_CLEAR'});
  try{sessionStorage.removeItem(STORAGE_KEY);}catch(_){}
}
function textMatchesFriends(raw){
  var s=t(raw).toLowerCase().replace(/[0-9.,]+\s*(mil|k|m)?/g,'').replace(/[·•|()]/g,' ').replace(/\s+/g,' ').trim();
  return s==='amigos'||s==='friends'||s.indexOf('todos os amigos')===0||s.indexOf('all friends')===0;
}
function hrefMatchesFriends(href){
  try{
    var x=new URL(String(href||''),location.href),u=x.pathname+x.search;
    return /(?:\/friends(?:\/|$)|[?&]sk=friends(?:&|$))/i.test(u)&&!/friends\/requests|[?&]sk=following|[?&]sk=followers/i.test(u);
  }catch(_){return false;}
}
function candidateFriendsLink(root){
  var rootNorm=normalizeBase(root),arr=Array.prototype.slice.call(document.querySelectorAll('a[href],[role="tab"][href]')).filter(visible),ranked=[];
  arr.slice(0,1400).forEach(function(a,i){
    var txt=t(a.innerText||a.textContent||a.getAttribute('aria-label')||a.getAttribute('title')||''),href=String(a.href||a.getAttribute('href')||'');
    if(!textMatchesFriends(txt)&&!hrefMatchesFriends(href))return;
    if(rootNorm&&!hrefBelongsToRoot(href,root))return;
    var score=0;if(textMatchesFriends(txt))score+=90;if(hrefMatchesFriends(href))score+=130;
    if(rootNorm&&normalizeBase(href).indexOf(rootNorm)===0)score+=50;
    if(a.getAttribute('role')==='tab'||a.getAttribute('aria-current'))score+=15;
    score-=i*0.001;ranked.push({a:a,score:score,href:href,txt:txt});
  });
  ranked.sort(function(a,b){return b.score-a.score;});return ranked[0]||null;
}
function relationFromVisibleLabelV44R10(raw){var x=t(raw).toLowerCase().replace(/[0-9.,]+\s*(mil|k|m)?/g,'').replace(/[·•|()]/g,' ').replace(/\s+/g,' ').trim();if(x==='amigos'||x==='friends')return 'friends';if(x==='seguidores'||x==='followers')return 'followers';if(x==='seguindo'||x==='following')return 'following';return '';}
function selectedRelationV44R10(){var nodes=Array.prototype.slice.call(document.querySelectorAll('[role="tab"][aria-selected="true"],a[aria-current="page"],[aria-selected="true"][href]')).filter(visible),best=null;nodes.forEach(function(el,i){var label=t(el.getAttribute('aria-label')||el.innerText||el.textContent||''),rel=relationFromVisibleLabelV44R10(label),href=String(el.href||el.getAttribute('href')||'');if(!rel){if(/\/followers(?:\/|$|[?#])|[?&]sk=followers/i.test(href))rel='followers';else if(/\/following(?:\/|$|[?#])|[?&]sk=following/i.test(href))rel='following';else if(/\/friends(?:\/|$|[?#])|[?&]sk=friends/i.test(href))rel='friends';}if(!rel)return;var score=(el.getAttribute('aria-selected')==='true'?300:0)+(el.getAttribute('aria-current')==='page'?180:0)+(el.getAttribute('role')==='tab'?70:0)-i*.001;if(!best||score>best.score)best={relation:rel,score:score,element:el,href:href,label:label};});return best;}
function materializedRelationV44R10(api){var x=selectedRelationV44R10();if(x)return x;try{var d=api&&api.detectActiveRelationSurface?api.detectActiveRelationSurface():null;if(d&&d.trusted===true&&d.relation)return {relation:String(d.relation),diagnostic:d};}catch(_){}var r=currentRelation(),bare=/\/friends\/?(?:[?#].*)?$/i.test(String(location.href||''));if(r&&!(r==='friends'&&bare))return {relation:r};return null;}
/* GITHUB_PRINCIPAL_RELATION_GUARD_442129
   Regra: URL /friends é container; autoridade primária é a subcoleção materializada.
   Seleção de painel nunca materializa/navega. Mismatch não herda métricas nem exportação. */
function isRelationPageV442129(){
  try{
    var p=String(location.pathname||''),q=String(location.search||''),u=p+q;
    return /\/(?:friends_all|friends|followers|following)(?:\/|$|[?#])/i.test(u) ||
      (/\/profile\.php$/i.test(p)&&/(?:^|[?&])sk=(?:friends_all|friends|followers|following)(?:&|$)/i.test(q));
  }catch(_){return false;}
}
function detectedRelationV442129(api){
  try{
    var d=api&&api.detectExactMaterializedRelation?api.detectExactMaterializedRelation():null;
    if(d&&d.relation)return {relation:String(d.relation),source:'exact_relation_collector',detail:d};
  }catch(_){}
  try{
    var a=api&&api.detectActiveRelationSurface?api.detectActiveRelationSurface():null;
    if(a&&a.trusted===true&&a.relation)return {relation:String(a.relation),source:'active_surface',detail:a};
  }catch(_){}
  var x=selectedRelationV44R10();
  if(x&&x.relation)return {relation:String(x.relation),source:'selected_control',detail:x};
  return null;
}
function declaredCountForRelationV442129(api,relation){
  try{
    var a=api&&api.detectRelationCountsFromDom?api.detectRelationCountsFromDom():null;
    return Math.max(0,Number(a&&a.counts&&a.counts[relation]||0));
  }catch(_){return 0;}
}
function clearRelationMismatchV442129(){
  state.relationMismatchBlocked=false;
  state.relationMismatchRequested='';
  state.relationMismatchActive='';
  state.relationMismatchDeclared=0;
}
function setRelationMismatchV442129(api,requested,active){
  state.relationMismatchBlocked=true;
  state.relationMismatchRequested=String(requested||'');
  state.relationMismatchActive=String(active||'');
  state.relationMismatchDeclared=declaredCountForRelationV442129(api,requested);
  state.relationExportReady=false;
  state.relationExportRelation='';
  state.exportChooserOpen=false;
  resetExportFormatsV44R5();
}
function relationMismatchV442129(){
  var active=String(state.relationDetected||state.relation||''),selected=String(state.relationSelection||'');
  return !!(active&&selected&&selected!=='all'&&selected!==active);
}
function useActiveRelationV442129(){
  var active=String(state.relationDetected||state.relation||'');
  if(!/^(friends|following|followers)$/.test(active))return false;
  state.relationSelection=active;
  state.relationSelectionUserSet=false;
  clearRelationMismatchV442129();
  state.relationExportReady=false;
  state.relationExportRelation='';
  state.relationSuiteCompleted=false;
  state.status='Escopo alinhado à relação ativa: '+relationLabel(active)+'. Pronto para coletar sem alterar o Facebook.';
  return true;
}
function syncRelationPanelV442129(options){
  options=options||{};
  if(!isRelationPageV442129()||state.postRunning||state.relationAutoRunning||state.relationNavRunning)return null;
  var api=core(),d=detectedRelationV442129(api);
  if(!d||!/^(friends|following|followers)$/.test(d.relation||''))return null;
  state.relationDetected=d.relation;
  state.relationDetectedSource=d.source||'';
  state.relation=d.relation;
  state.mode='relation';
  state.activeRun='relation';

  if(state.relationSelectionUserSet!==true||!state.relationSelection){
    state.relationSelection=d.relation;
    clearRelationMismatchV442129();
  }else if(state.relationSelection!=='all'&&state.relationSelection!==d.relation){
    setRelationMismatchV442129(api,state.relationSelection,d.relation);
  }else{
    clearRelationMismatchV442129();
  }

  if(options.updateStatus!==false&&!state.relationAutoRunning){
    if(state.relationMismatchBlocked){
      var dec=state.relationMismatchDeclared>0?' O Facebook declara '+state.relationMismatchDeclared.toLocaleString('pt-BR')+' '+relationLabel(state.relationMismatchRequested).toLowerCase()+', mas as identidades dessa relação não estão materializadas nesta superfície.':'';
      state.status='Escopo solicitado: '+relationLabel(state.relationMismatchRequested)+'. Relação ativa: '+relationLabel(d.relation)+'.'+dec+' Nenhum perfil será atribuído ao escopo solicitado.';
    }else{
      state.status='Relação ativa detectada: '+relationLabel(d.relation)+'. Pronto para coleta.';
    }
  }
  return d;
}
function relationDisplaySnapshotV442129(raw){
  raw=raw||{};
  if(state.relationMismatchBlocked||relationMismatchV442129()){
    return {...raw,collected:0,enriched:0,target:0,targetConfirmed:false,listPct:0,physicalPct:0,metaPct:0,busy:false,quarantined:true};
  }
  return {...raw,quarantined:false};
}

/* RC3 44.21.31 — stale-busy recovery + explicit start ACK */
function relationCoreBusyDiagnosticV4431(api){
  var st=api&&api.state||{},ctx=st.relationRunContext||{},meta=st.metaRun||{},gen=st.generalRun||{},photo=st.photoRecoveryRun||{},rec=st.relationRecovery||{},net=st.networkRelation||{};
  var exactActive=ctx.active===true&&String(ctx.source||'').indexOf('exact_selected_relation_corridor_442127')>=0;
  var reasons=[];
  if(st.runningScroll===true)reasons.push('runningScroll');
  if(st.runningMeta===true)reasons.push('runningMeta');
  if(meta.active===true)reasons.push('metaRun.active');
  if(gen.active===true)reasons.push('generalRun.active');
  if(photo.active===true)reasons.push('photoRecoveryRun.active');
  if(rec.active===true)reasons.push('relationRecovery.active');
  if(net.drainActive===true)reasons.push('networkRelation.drainActive');
  return {busy:reasons.length>0,exactActive:exactActive,reasons:reasons,stopRequested:st.stopRequested===true,relation:String(st.relation||''),ctx:{active:ctx.active===true,source:String(ctx.source||''),relation:String(ctx.relation||'')}};
}
function unifiedRelationBusyV4431(api){
  var d=relationCoreBusyDiagnosticV4431(api);
  return state.relationAutoRunning===true||state.relationNavRunning===true||d.exactActive===true;
}
function resetCoreStopControlV4431(api){
  var st=api&&api.state;if(!st)return;
  st.stopRequested=false;st.stopReason='';st.stopAt='';
  try{
    if(st.runController&&st.runController.signal&&st.runController.signal.aborted){
      st.runGeneration=Number(st.runGeneration||0)+1;
      st.runController=new AbortController();
    }
  }catch(_){}
}
async function prepareRelationCoreForExactRunV4431(api){
  var before=relationCoreBusyDiagnosticV4431(api);
  state.relationCoreRecovery={at:new Date().toISOString(),before:before,recovered:false,after:null};
  if(before.exactActive)return {ok:false,reason:'EXACT_RELATION_RUN_ALREADY_ACTIVE',diagnostic:before};
  if(!before.busy){
    resetCoreStopControlV4431(api);
    state.relationCoreRecovery.after=relationCoreBusyDiagnosticV4431(api);
    return {ok:true,recovered:false,diagnostic:state.relationCoreRecovery};
  }

  state.status='Preparando o núcleo relacional: encerrando estado operacional anterior…';render(true);
  try{if(api&&typeof api.requestStop==='function')api.requestStop('unified_controller_4431_new_exact_relation_run');}catch(_){}
  var deadline=Date.now()+3500;
  while(Date.now()<deadline){
    var d=relationCoreBusyDiagnosticV4431(api);
    if(!d.busy||d.exactActive)break;
    await wait(125);
  }

  var st=api&&api.state||{},after=relationCoreBusyDiagnosticV4431(api);
  if(after.busy&&!after.exactActive&&st.stopRequested===true){
    /* Normaliza somente flags operacionais após stop explícito; rows/evidência não são apagados. */
    st.runningScroll=false;st.runningMeta=false;
    if(st.metaRun){st.metaRun.active=false;st.metaRun.stopRequested=true;}
    if(st.generalRun){st.generalRun.active=false;st.generalRun.stopRequested=true;}
    if(st.relationRecovery)st.relationRecovery.active=false;
    if(st.photoRecoveryRun)st.photoRecoveryRun.active=false;
    if(st.networkRelation)st.networkRelation.drainActive=false;
    after=relationCoreBusyDiagnosticV4431(api);
  }
  resetCoreStopControlV4431(api);
  state.relationCoreRecovery.recovered=before.busy===true;
  state.relationCoreRecovery.after=after;
  return {ok:!after.busy&&!after.exactActive,recovered:before.busy===true,diagnostic:state.relationCoreRecovery};
}

function bindRelationBeforeRunV44R10(api,rel){if(!api||!api.state)return;var now=new Date().toISOString(),st=api.state;st.relation=rel;st.relationSurfaceBlocked=false;st.relationUiHint={relation:rel,label:'materialized_'+rel,href:String(location.href||''),source:'user_click_capture',confidence:500,at:now,targetUser:String(st.pageTargetKey||'')};st.relationIntent={relation:rel,source:'user_click_capture',confidence:500,explicitUser:true,at:now,targetUser:String(st.pageTargetKey||'')};st.relationRunContext={locked:false,active:false,relation:'',target:0,rawTarget:0,targetConfirmed:false,source:'',confidence:0,startedAt:'',completedAt:''};try{if(api.refreshRelationTargetFromDom)api.refreshRelationTargetFromDom('unified_v44r10_materialized',true);}catch(_){}}

function relationSnapshot(){
  var api=core(),routeRel=currentRelation();
  if(!api)return {available:false,relation:state.relationDetected||routeRel,busy:false,collected:0,enriched:0,target:0,targetConfirmed:false,listPct:0,physicalPct:0,metaPct:0,coreBusy:null};
  try{
    var rs=api.relationProgressSnapshot?api.relationProgressSnapshot():{},st=api.state||{},diag=relationCoreBusyDiagnosticV4431(api);
    var busy=unifiedRelationBusyV4431(api);
    var physicalPct=0;
    try{if(api.v37ObservedScrollProgressPct){var vp=api.v37ObservedScrollProgressPct();if(vp!=null&&Number.isFinite(Number(vp)))physicalPct=Math.max(physicalPct,Number(vp));}}catch(_){}
    try{
      var cs=api.relationScrollCandidates?api.relationScrollCandidates():[];
      (cs||[]).forEach(function(candidate){var el=candidate&&candidate.el?candidate.el:candidate,m=api.relationScrollMetrics?api.relationScrollMetrics(el):null;if(m&&Number(m.maxTop||0)>0)physicalPct=Math.max(physicalPct,Math.max(0,Math.min(100,Number(m.top||0)/Number(m.maxTop||1)*100)));});
    }catch(_){}
    if(busy)state.relationPhysicalPct=Math.max(Number(state.relationPhysicalPct||0),physicalPct);
    else if(state.relationExportReady!==true)state.relationPhysicalPct=0;
    var displayRelation=busy?(rs.relation||st.relation||state.relationDetected||routeRel):(state.relationDetected||rs.relation||st.relation||routeRel||'');
    var collected=Number(rs.collected||0),enriched=Number(rs.enriched||0);
    if(!busy&&state.relationExportReady!==true){collected=0;enriched=0;}
    return {available:true,relation:displayRelation,busy:busy,collected:collected,enriched:enriched,target:Number(rs.target||0),targetConfirmed:rs.targetConfirmed===true,listPct:Number(rs.listPct||0),physicalPct:Math.max(0,Math.min(100,Number(state.relationPhysicalPct||0))),metaPct:Number(rs.metaPct||0),stopRequested:st.stopRequested===true,coreBusy:diag};
  }catch(_){return {available:true,relation:state.relationDetected||routeRel,busy:state.relationAutoRunning===true,collected:0,enriched:0,target:0,targetConfirmed:false,listPct:0,physicalPct:0,metaPct:0,coreBusy:null};}
}
async function waitForRelationCore(ms){var deadline=Date.now()+(ms||25000);while(Date.now()<deadline){var api=core();if(api&&typeof api.autoScrollCollectAndEnrich==='function')return api;await wait(250);}return null;}
function unavailableRelationResultV44R27(api,relation,materialized,reason){
  if(api&&api.makeUnavailableRelationSnapshot)return api.makeUnavailableRelationSnapshot(relation,materialized,reason);
  return {schema:'b35a1_relation_snapshot_442127',release:'44.21.27',relation:relation,materializedRelation:materialized||'',rows:[],unavailable:true,closureReason:reason||'relation_not_materialized_current_document'};
}
function suiteCountsV44R27(){
  var out={friends:0,following:0,followers:0,unique:0,unavailable:[]},api=core();
  ['friends','following','followers'].forEach(function(r){var x=state.relationSuiteResults&&state.relationSuiteResults[r];out[r]=x&&x.rows?x.rows.length:0;if(!x||x.unavailable)out.unavailable.push(r);});
  try{var sm=api&&api.relationSuiteSummary?api.relationSuiteSummary(state.relationSuiteResults||{}):null;if(sm){out.unique=Number(sm.uniqueProfiles||0);out.unavailable=sm.unavailable||out.unavailable;}}catch(_){}
  if(!out.unique)out.unique=out.friends+out.following+out.followers;return out;
}
async function autoStartFriends(pending){
  if(state.relationAutoRunning)return;
  state.relationAutoRunning=true;state.relationNavRunning=false;state.relationSuiteCompleted=false;state.relationExportReady=false;state.relationExportRelation='';
  state.activeRun='relation';state.mode='relation';state.error='';state.status='Confirmando a relação realmente materializada…';render(true);

  var api=await waitForRelationCore(25000);
  if(!api||typeof api.runExactRelation!=='function'){
    state.relationAutoRunning=false;state.error='O coletor relacional exato 44.21.27 não ficou pronto.';render(true);return;
  }

  var suiteTarget=String(api.state&&api.state.pageTargetKey||profileIdentity(resolveProfileRoot())||'current_document');
  if(state.relationSuiteTarget&&state.relationSuiteTarget!==suiteTarget){
    state.relationSuiteResults={};state.relationSelectionUserSet=false;state.relationSelection='';
  }
  state.relationSuiteTarget=suiteTarget;

  var det=detectedRelationV442129(api),materialized=det&&det.relation||'';
  state.relationDetected=materialized;
  state.relationDetectedSource=det&&det.source||'';

  if(!materialized){
    state.relationAutoRunning=false;
    state.relationSuiteCompleted=false;
    state.relationExportReady=false;
    state.status='Nenhuma subcoleção nominal está materializada. Abra manualmente Amigos, Seguindo ou Seguidores no Facebook e tente novamente. Nenhum resultado anterior será atribuído à tentativa atual.';
    render(true);return;
  }

  if(!state.relationSelection)state.relationSelection=materialized;
  var selection=state.relationSelection||materialized,requested=selection==='all'?materialized:selection;

  if(selection!=='all'&&requested!==materialized){
    setRelationMismatchV442129(api,requested,materialized);
    state.relationAutoRunning=false;
    state.relationSuiteCompleted=false;
    var declared=state.relationMismatchDeclared;
    state.status=relationLabel(requested)+' foi solicitado, mas a relação materializada é '+relationLabel(materialized)+'.'+
      (declared>0?' O Facebook declara '+declared.toLocaleString('pt-BR')+' '+relationLabel(requested).toLowerCase()+', porém as identidades não estão materializadas nesta superfície.':'')+
      ' Coleta não executada; zero registros atribuídos; exportação bloqueada. Mude a subguia manualmente no Facebook ou use a relação ativa.';
    render(true);return;
  }

  clearRelationMismatchV442129();
  state.relation=materialized;state.relationStartAck=true;
  bindRelationBeforeRunV44R10(api,materialized);
  state.status='Coletando '+relationLabel(materialized)+' na superfície realmente materializada, sem alterar URL ou subguia…';render(true);

  try{
    var result=await api.runExactRelation(materialized,{enrich:true,maxMs:60000,maxRounds:100});
    state.relationSuiteResults[materialized]=api.snapshotRelation?api.snapshotRelation(materialized):{relation:materialized,rows:[]};

    if(result&&result.unavailable===true){
      var declaredUnavailable=declaredCountForRelationV442129(api,materialized);
      state.relationSuiteCompleted=false;
      state.relationExportReady=false;
      state.relationExportRelation='';
      state.status=declaredUnavailable>0
        ?('VISIBILITY_LIMITED: o Facebook declara '+declaredUnavailable.toLocaleString('pt-BR')+' '+relationLabel(materialized).toLowerCase()+', mas nenhuma identidade dessa relação está materializada nesta superfície. Isto NÃO significa 0 '+relationLabel(materialized).toLowerCase()+'. Exportação normal bloqueada para evitar falso terminal.')
        :('A relação '+relationLabel(materialized)+' não disponibilizou identidades materializadas nesta superfície. Nenhuma conclusão de cardinalidade zero foi feita; exportação normal bloqueada.');
    }else{
      if(selection==='all'){
        ['friends','following','followers'].forEach(function(r){
          if(!state.relationSuiteResults[r])state.relationSuiteResults[r]=unavailableRelationResultV44R27(api,r,materialized,'relation_not_materialized_current_document_no_navigation');
        });
        if(api.restoreRelationSuite)api.restoreRelationSuite(state.relationSuiteResults);
        state.relationExportRelation='all';
      }else{
        state.relationExportRelation=materialized;
      }

      state.relationSuiteCompleted=true;
      state.relationExportReady=true;

      var counts=suiteCountsV44R27(),suffix=result&&result.complete===false?' — snapshot parcial seguro':' — terminal estrutural confirmado';
      state.status=(selection==='all'
        ?'Rodada concluída sobre a relação materializada: '+relationLabel(materialized)+'. Agregado preservado: Amigos '+counts.friends+' · Seguindo '+counts.following+' · Seguidores '+counts.followers+' · '+counts.unique+' perfis únicos'
        :relationLabel(materialized)+' concluído: '+Number(counts[materialized]||0)+' perfis')+suffix+'.';
    }
  }catch(e){
    state.relationExportReady=false;state.relationExportRelation='';
    state.error='Falha relacional auditável: '+String(e&&e.message||e);
    state.status='Os registros confirmados internamente foram preservados, mas a tentativa atual não foi liberada para exportação.';
  }

  state.relationAutoRunning=false;
  await clearPending();
  render(true);
}
async function arriveAtFriends(pending){await clearPending();return autoStartFriends(pending||{});}
async function clickFriendsFromProfile(pending){
  state.relationNavRunning=false;await clearPending();state.activeRun='relation';state.mode='relation';state.error='Abra manualmente a área de relações do perfil. A versão 44.21.27 não clica em links, não troca a URL e não atualiza a página.';state.status='Navegação automática bloqueada pela política de não regressão.';render(true);
}
async function beginFriendsDownload(){
  if(state.relationNavRunning||state.relationAutoRunning){
    state.status='Já existe uma coleta relacional controlada em execução.';render(true);return;
  }
  state.interactionUntil=Date.now()+900;
  state.activeRun='relation';state.mode='relation';state.relationPhysicalPct=0;state.error='';
  state.relationStartAck=false;state.relationStartDiagnostic=null;
  state.status='Comando recebido. Confirmando a subcoleção ativa e preparando o núcleo…';render(true);

  var api=await waitForRelationCore(25000);
  if(!api){state.error='Núcleo de relações indisponível.';render(true);return;}

  var prep=await prepareRelationCoreForExactRunV4431(api);
  state.relationStartDiagnostic={at:new Date().toISOString(),prep:prep};
  if(!prep.ok){
    state.error='O núcleo relacional permaneceu ocupado e a nova coleta não foi iniciada.';
    state.status='START_BLOCKED: '+String(prep.reason||'CORE_BUSY')+'. Nenhuma coleta foi iniciada.';
    render(true);return;
  }

  var det=syncRelationPanelV442129({updateStatus:false})||detectedRelationV442129(api);
  var materialized=det&&det.relation||'';
  var root=resolveProfileRoot()||'current_document_exact_relation';

  if(!materialized){
    state.error='Nenhuma subcoleção nominal está materializada.';
    state.relationExportReady=false;render(true);return;
  }

  if(!state.relationSelection)state.relationSelection=materialized;
  if(state.relationSelection!=='all'&&state.relationSelection!==materialized){
    setRelationMismatchV442129(api,state.relationSelection,materialized);
    state.status=relationLabel(state.relationSelection)+' está selecionada, mas o Facebook exibe '+relationLabel(materialized)+'. Coleta/exportação bloqueadas.';
    render(true);return;
  }

  state.relationStartAck=true;
  state.status='START_ACK: iniciando coleta exata de '+relationLabel(materialized)+'…';
  render(true);
  return autoStartFriends({relation:materialized,root:root,autoStart:true});
}
async function resumePending(){await clearPending();return false;}
function startPost(){
  var p=post(),ctx=postContext(true);
  if(!p||!ctx.ready){state.error=ctx.reason||'Postagem não confirmada.';render(true);return;}
  /* V44R20: cada clique inicia uma sessão limpa, inclusive após outra postagem na mesma aba. */
  resetPostSessionV44R20('Preparando uma nova raspagem de postagem…');
  state.interactionUntil=Date.now()+300;
  state.activeRun='post';state.mode='post';state.relationNavRunning=false;state.relationAutoRunning=false;
  state.postRunKey=currentPostKeyV44R20();state.postProgress=1;state.postRunning=true;
  state.status=state.scrapeInteractions?'Comando recebido. Iniciando postagem, comentários e interações…':'Comando recebido. Iniciando o scroll agora…';render(true);
  /* Remove apenas intenção relacional pendente; não toca no núcleo estável. */
  clearPending().catch(function(){});
  var result;
  try{result=p.start({layoutMode:'vertical',collectInteractions:state.scrapeInteractions===true});}catch(e){result={ok:false,reason:String(e&&e.message||e)};}
  if(!result||!result.ok){state.postRunning=false;state.error='Não foi possível iniciar: '+String(result&&result.reason||'erro desconhecido');}
  else state.status=state.scrapeInteractions?'Scroll iniciado; as interações serão coletadas depois dos comentários.':'Scroll iniciado com o motor estável V44R5.';
  render(true);
}
function stopCurrent(){
  var now=Date.now();if(now-state.stopDispatchedAt<300)return;state.stopDispatchedAt=now;state.interactionUntil=now+1200;
  state.status='Parada recebida. Interrompendo imediatamente…';render(true);
  Promise.resolve().then(function(){
    if(state.postRunning||(post()&&post().running)){var p=post();if(p&&p.stop)p.stop();}
    else{var api=core();if(api&&api.requestStop)api.requestStop('botao_painel_unificado_v44r13');}
    state.status='Parada solicitada. A saída parcial segura será concluída quando aplicável.';render(true);
  });
}
function exportBytesV44R5(data){
  if(data instanceof Uint8Array)return data;if(data instanceof ArrayBuffer)return new Uint8Array(data);if(ArrayBuffer.isView(data))return new Uint8Array(data.buffer,data.byteOffset,data.byteLength);return new TextEncoder().encode(String(data==null?'':data));
}
async function exportHashV44R5(algo,data){var b=exportBytesV44R5(data),buf=await crypto.subtle.digest(algo,b);return Array.from(new Uint8Array(buf)).map(function(x){return x.toString(16).padStart(2,'0');}).join('');}
function exportDownloadV44R5(name,data,mime){return new Promise(function(resolve,reject){try{var blob=new Blob([data],{type:mime||'application/octet-stream'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;a.rel='noopener';document.body.appendChild(a);a.click();a.remove();setTimeout(function(){try{URL.revokeObjectURL(url);}catch(_){}resolve();},500);}catch(e){reject(e);}});}
async function exportRelationFormatsV44R5(kinds,api){
  var selected=(kinds||[]).slice(),nonPdf=selected.filter(function(k){return k!=='pdf';});
  var out=[];if(nonPdf.length)out=await api.exportSelectedFormats(nonPdf);
  if(selected.indexOf('pdf')>=0){
    if(!api.makeDataPdf||!api.makeIntegrityPdf)throw new Error('PDF_RELACIONAL_DETERMINISTICO_INDISPONIVEL');
    var pdf=api.makeDataPdf(),stamp=new Date().toISOString().replace(/[:.]/g,'-'),name='fb_relacoes_relatorio_'+stamp+'.pdf',artifact={name:name,mime:'application/pdf',data:pdf};
    var sha256=await exportHashV44R5('SHA-256',pdf),sha512=await exportHashV44R5('SHA-512',pdf),laudo=api.makeIntegrityPdf(artifact,sha256,sha512),laudoName=name.replace(/\.pdf$/i,'_laudo_integridade.pdf');
    await exportDownloadV44R5(name,pdf,'application/pdf');await wait(180);await exportDownloadV44R5(laudoName,laudo,'application/pdf');
    out.push({name:name,integrityPdf:laudoName,sha256:sha256,sha512:sha512});
  }
  return out;
}

function selectedExportKindsV44R5(){
  return ['html','pdf','json','xlsx','csv'].filter(function(k){return !!(state.exportFormats&&state.exportFormats[k]);});
}
function resetExportFormatsV44R5(){state.exportFormats={html:false,pdf:false,json:false,xlsx:false,csv:false};}
function exportChooserHtmlV44R5(){
  if(!state.exportChooserOpen)return '';
  function row(k,label){return '<label><input type="checkbox" data-format="'+k+'" value="'+k+'" '+(state.exportFormats[k]?'checked':'')+'> <span>'+label+'</span></label>';}
  return '<div id="fb-b35-v44-export-box" class="v44Export" role="group" aria-label="Escolha de formatos para download">'+
    '<b>Baixar formatos — '+(state.mode==='post'?'postagem':'relações')+'</b>'+
    '<div class="v44ExportGrid"><div class="v44ExportFormats">'+
      row('html','HTML')+row('pdf','PDF')+row('json','JSON')+row('xlsx','Excel XLSX')+row('csv','CSV')+
    '</div><div class="v44IntegrityNote"><span class="v44InfoIcon" aria-hidden="true">i</span><span>Cada formato selecionado será baixado somente após seu clique e virá acompanhado de um laudo de integridade em PDF.<br><br>O laudo identifica o arquivo, tamanho, SHA-256 e SHA-512.</span></div></div>'+
    '<div class="v44ExportBtns"><button type="button" data-all>Marcar todos</button><button type="button" data-clear>Limpar</button><button type="button" data-go>⬇ Baixar selecionados</button><button type="button" data-cancel>Cancelar</button></div></div>';
}
function exportFormatChooser(ev){
  if(ev&&ev.preventDefault)ev.preventDefault();if(ev&&ev.stopPropagation)ev.stopPropagation();
  var pmod=post(),api=core(),isPost=state.mode==='post'&&pmod&&pmod.hasPreparedExport&&pmod.hasPreparedExport();
  var isRelation=!isPost&&state.mode==='relation'&&state.relationExportReady===true&&!state.relationMismatchBlocked;
  if(isPost&&(!pmod.exportSelectedFormats)){state.error='Módulo de exportação da postagem indisponível.';render();return;}
  if(isRelation&&!api){state.error='Núcleo de relações indisponível.';render();return;}
  if(!isPost&&!isRelation){state.error='Não há uma coleta preparada para exportação.';render();return;}
  /* V44R14: o clique já ativa interactionUntil. Um render comum seria
     descartado por render(), e o statusTimer também fica suspenso quando
     exportChooserOpen=true. Forçar a primeira renderização evita o impasse
     em que o seletor nunca aparece. */
  state.error='';state.exportChooserOpen=true;render(true);
  setTimeout(function(){try{var box=document.getElementById('fb-b35-v44-export-box'),panel=document.getElementById(PANEL_ID),first=box&&box.querySelector('input[data-format]');if(panel)panel.scrollTop=panel.scrollHeight;if(first)first.focus({preventScroll:true});}catch(_){}},0);
}
async function runSelectedExportsV44R5(){
  var pmod=post(),api=core(),isPost=state.mode==='post'&&pmod&&pmod.hasPreparedExport&&pmod.hasPreparedExport();
  var isRelation=!isPost&&state.mode==='relation'&&state.relationExportReady===true&&!state.relationMismatchBlocked,kinds=selectedExportKindsV44R5();
  if(!kinds.length){state.error='Selecione ao menos um formato.';render();return;}
  if(isPost&&(!pmod||!pmod.exportSelectedFormats)){state.error='Módulo de exportação da postagem indisponível.';render();return;}
  if(isRelation&&!api){state.error='Núcleo de relações indisponível.';render();return;}
  state.error='';state.exportRunning=true;state.status='Preparando os arquivos selecionados e seus laudos de integridade…';render(true);
  try{
    if(isPost)await pmod.exportSelectedFormats(kinds);
    else await exportRelationFormatsV44R5(kinds,api);
    state.status='Downloads concluídos. Cada arquivo foi acompanhado do respectivo laudo de integridade em PDF.';
    state.exportChooserOpen=false;resetExportFormatsV44R5();
  }catch(e){state.error='Falha de exportação: '+String(e&&e.message||e);}
  state.exportRunning=false;render(true);
}
function onPostProgress(ev){
  var d=ev&&ev.detail||{},incoming=Number(d.progress),terminal=d.type==='done'||d.type==='error';
  /* V44R18: qualquer evento do motor fixa o painel no modo postagem. */
  state.activeRun='post';state.mode='post';state.relationNavRunning=false;state.relationAutoRunning=false;
  if(!terminal)state.postRunning=true;
  if(Number.isFinite(incoming))state.postProgress=Math.max(state.postProgress,Math.max(0,Math.min(100,incoming)));
  state.postL1=Number(d.L1||0);state.postL2=Number(d.L2||0);
  state.postTarget=Math.max(0,Number(d.target||state.postTarget||0));
  if(d.contentProgress!=null&&Number.isFinite(Number(d.contentProgress)))state.postContentPct=Math.max(0,Math.min(100,Number(d.contentProgress)));
  else if(state.postTarget>0)state.postContentPct=Math.max(0,Math.min(100,((state.postL1+state.postL2)/state.postTarget)*100));
  if(d.message)state.status=String(d.message);
  if(d.type==='started')state.postExportReady=false;
  if(d.exportReady===true)state.postExportReady=true;
  if(terminal){
    state.postRunning=false;state.postExportReady=d.exportReady===true||(post()&&post().hasPreparedExport&&post().hasPreparedExport());
    if(d.type==='done'){
      var observedDone=state.postL1+state.postL2,partial=/PARTIAL/i.test(String(d.status||''))||(state.postTarget>0&&observedDone<state.postTarget);
      state.status=partial?'Raspagem concluída com sucesso, com resultado parcial seguro. Escolha os formatos para baixar.':'Raspagem concluída com sucesso! Escolha os formatos para baixar.';
    }
  }
  render(true);
}
function statusBody(){
  var ctx=postContext(),snap=relationDisplaySnapshotV442129(relationSnapshot());
  var postActive=state.activeRun==='post'||state.mode==='post'||state.postRunning||state.postExportReady||(post()&&post().running);
  if(postActive){
    var observed=state.postL1+state.postL2,target=state.postTarget,pct=target>0?Math.max(0,Math.min(100,observed/target*100)):state.postContentPct;
    var proc=Math.max(0,Math.min(100,state.postExportReady?100:state.postProgress));
    var total=observed.toLocaleString('pt-BR')+(target>0?' / '+target.toLocaleString('pt-BR')+' · '+pct.toFixed(2).replace('.',',')+'%':' · alvo não confirmado');
    return '<div class="v44Status"><b>'+esc(state.status)+'</b><div class="v44Line"><span>Progresso da raspagem da postagem</span><strong>'+proc.toFixed(0)+'%</strong></div><div class="v44Bar stage"><i style="width:'+proc+'%"></i></div><div class="v44Line"><span>Conteúdo efetivamente observado</span><strong>'+esc(total)+'</strong></div><div class="v44Bar"><i style="width:'+pct+'%"></i></div><div class="v44Line"><span>Detalhamento</span><strong>'+state.postL1.toLocaleString('pt-BR')+' comentários · '+state.postL2.toLocaleString('pt-BR')+' respostas</strong></div><div class="v44Line"><span>Exportação</span><strong class="'+(state.postExportReady?'ok':'')+'">'+(state.postExportReady?'pronta para seleção':'aguardando término da coleta')+'</strong></div></div>';
  }
  var rel=snap.relation||state.relation||currentRelation();
  if(state.relationMismatchBlocked||relationMismatchV442129()){
    var rq=state.relationMismatchRequested||state.relationSelection||'',ac=state.relationMismatchActive||state.relationDetected||state.relation||'',dc=Number(state.relationMismatchDeclared||0);
    return '<div class="v44Status"><b>'+esc(state.status)+'</b>'+
      '<div class="v44Line"><span>Escopo solicitado</span><strong class="bad">'+esc(rq?relationLabel(rq):'não definido')+'</strong></div>'+
      '<div class="v44Line"><span>Relação materializada</span><strong class="ok">'+esc(ac?relationLabel(ac):'não confirmada')+'</strong></div>'+
      '<div class="v44Line"><span>Cardinalidade declarada do escopo</span><strong>'+esc(dc>0?dc.toLocaleString('pt-BR'):'não confirmada')+'</strong></div>'+
      '<div class="v44Line"><span>Identidades atribuídas nesta tentativa</span><strong>0 — QUARENTENA SEMÂNTICA</strong></div>'+
      '<div class="v44Line"><span>Exportação</span><strong class="bad">bloqueada</strong></div></div>';
  }
  if(state.activeRun==='relation'||state.mode==='relation'||state.relationNavRunning||state.relationAutoRunning){
    var lp=snap.targetConfirmed?Math.max(0,Math.min(100,snap.listPct)):Math.max(0,Math.min(100,snap.physicalPct||0));
    var lt=snap.collected.toLocaleString('pt-BR')+(snap.targetConfirmed?' / '+snap.target.toLocaleString('pt-BR')+' · '+lp.toFixed(2).replace('.',',')+'%':' coletados · alvo não confirmado · avanço visual '+lp.toFixed(0)+'%');
    var listLabel=snap.targetConfirmed?relationLabel(rel)+' coletados':relationLabel(rel)+' coletados / avanço da superfície';
    return '<div class="v44Status"><b>'+esc(state.status)+'</b><div class="v44Line"><span>'+esc(listLabel)+'</span><strong>'+esc(lt)+'</strong></div><div class="v44Bar"><i style="width:'+lp+'%"></i></div><div class="v44Line"><span>Perfis enriquecidos</span><strong>'+snap.enriched.toLocaleString('pt-BR')+' · '+snap.metaPct.toFixed(2).replace('.',',')+'%</strong></div><div class="v44Bar green"><i style="width:'+Math.max(0,Math.min(100,snap.metaPct))+'%"></i></div></div>';
  }
  return '<div class="v44Status"><b>Escolha uma das duas ações.</b><div class="v44Line"><span>Postagem atual</span><strong class="'+(ctx.ready?'ok':'bad')+'">'+esc(ctx.ready?ctx.type:ctx.reason)+'</strong></div><div class="v44Line"><span>Raspar interações</span><strong class="'+(state.scrapeInteractions?'ok':'')+'">'+(state.scrapeInteractions?'marcado':'não marcado')+'</strong></div></div>';
}
function panelHtml(){
  var ctx=postContext(),snap=relationDisplaySnapshotV442129(relationSnapshot()),pmod=post();
  var postBusy=!!(state.postRunning||(pmod&&pmod.running));
  var relationBusy=!!(state.relationNavRunning||state.relationAutoRunning||snap.busy);
  var busy=!!(state.exportRunning||postBusy||relationBusy);
  var topControls='<button type="button" class="v44MinimizeX" data-minimize aria-label="'+(state.minimized?'Restaurar painel':'Minimizar painel')+'" title="'+(state.minimized?'Restaurar painel':'Minimizar painel')+'">'+(state.minimized?'+':'−')+'</button><button type="button" class="v44CloseX" data-close aria-label="Fechar painel" title="Fechar painel">×</button>';
  if(state.minimized)return topControls+'<div class="v44Title v44TitleMini">Raspador de dados de relações e postagens do Facebook</div><div class="v44MiniState">'+esc(state.status)+'</div>';
  var secondary='<div class="v44Actions">';
  if(state.relationMismatchBlocked&&state.relationDetected)secondary+='<button data-use-active-rel>Usar '+esc(relationLabel(state.relationDetected))+'</button>';
  if(busy)secondary+='<button data-stop class="stop">Parar</button>';
  if((state.activeRun==='relation'&&state.relationExportReady===true&&!state.relationMismatchBlocked)||(state.activeRun==='post'&&state.postExportReady))secondary+='<button data-export>Baixar formatos…</button>';
  secondary+='<button data-close>Fechar</button></div>';
  return topControls+'<div class="v44Title">Raspador de dados de relações e postagens do Facebook</div>'+ 
    '<div class="v44Credit">Desenvolvido por <a href="https://www.instagram.com/guilhermecaselli/" target="_blank">Guilherme Caselli</a> · versão ativa <b>'+CONTROLLER_VERSION_V44R21R8+'</b></div>'+ 
    '<div class="v44ModeLabel">O que deseja raspar?</div>'+ 
    '<div class="v44Modes"><button data-download-rel '+(busy?'disabled':'')+' class="'+(state.activeRun==='relation'?'active':'')+'"><b>Coletar relações selecionadas</b></button><button data-start-post '+((!ctx.ready||busy)?'disabled':'')+' class="'+(state.activeRun==='post'?'active':'')+'"><b>Postagem aberta</b></button></div>'+
    '<div class="v44RelationScope"><b>Relações do perfil</b><div><button type="button" data-rel-scope="all" class="'+(state.relationSelection==='all'?'selected':'')+'" '+(busy?'disabled':'')+'>Todas</button><button type="button" data-rel-scope="friends" class="'+(state.relationSelection==='friends'?'selected':'')+'" '+(busy?'disabled':'')+'>Amigos</button><button type="button" data-rel-scope="following" class="'+(state.relationSelection==='following'?'selected':'')+'" '+(busy?'disabled':'')+'>Seguindo</button><button type="button" data-rel-scope="followers" class="'+(state.relationSelection==='followers'?'selected':'')+'" '+(busy?'disabled':'')+'>Seguidores</button></div><small>'+(state.relationDetected?('Ativa no Facebook: <b>'+esc(relationLabel(state.relationDetected))+'</b>. '):'')+'A seleção do painel NÃO troca subguias. Para coletar outra relação, materialize-a manualmente no Facebook. “Todas” agrega apenas relações realmente coletadas em superfícies materializadas.</small></div>'+ 
    (isRelationPageV442129()?'':'<label class="v44InteractionChoice'+(state.scrapeInteractions?' checked':'')+(busy?' disabled':'')+'"><input type="checkbox" data-scrape-interactions '+(state.scrapeInteractions?'checked':'')+' '+(busy?'disabled':'')+'><span class="v44InteractionChoiceText"><b>Raspar interações</b><small>Incluir Curtir, Amei, Força, Haha, Uau, Triste e Grr na mesma coleta da postagem.</small></span></label>')+
    statusBody()+secondary+exportChooserHtmlV44R5()+'<div id="fb-b35-v44-error" class="v44Error"></div>';
}
function makePanel(force){
  hideLegacyPanel();var p=document.getElementById(PANEL_ID);
  if(!p){
    var style=document.createElement('style');style.id='fb-b35-unified-v44-style';
    style.textContent='#'+PANEL_ID+'{position:fixed;z-index:2147483647;top:18px;right:18px;width:470px;max-width:calc(100vw - 24px);max-height:92vh;overflow:auto;background:#fff;color:#111;border:2px solid #111;border-radius:16px;padding:15px;font:13px Arial;box-shadow:0 14px 42px rgba(0,0,0,.36)}#'+PANEL_ID+' *{box-sizing:border-box}#'+PANEL_ID+' button{font:inherit;cursor:pointer}#'+PANEL_ID+' button:disabled{cursor:not-allowed;opacity:.46}.v44CloseX,.v44MinimizeX{position:absolute;top:8px;width:31px;height:31px;border:0!important;border-radius:50%!important;background:#eef2f7!important;color:#111!important;font:900 23px/30px Arial!important;padding:0!important;z-index:4}.v44CloseX{right:9px}.v44MinimizeX{right:45px}.v44CloseX:hover,.v44MinimizeX:hover{background:#dbe3ee!important}.v44Title{padding-right:72px;font-size:20px;font-weight:900;line-height:1.15}.v44Credit{font-size:12px;color:#666;margin:4px 0 13px}.v44Credit a{color:#1877f2;font-weight:800;text-decoration:none}.v44ModeLabel{font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:#64748b;font-weight:900;margin-bottom:7px}.v44Modes{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:10px}.v44Modes button{border:1px solid #cbd5e1;border-radius:12px;padding:14px 10px;text-align:center;background:#f8fafc;min-height:54px}.v44Modes button.active{border:2px solid #1877f2;background:#eff6ff;padding:13px 9px}.v44Modes b{display:block;font-size:13px}.v44RelationScope{border:1px solid #cbd5e1;border-radius:12px;padding:9px 10px;margin:-2px 0 10px;background:#f8fafc}.v44RelationScope>b{display:block;font-size:11px;text-transform:uppercase;letter-spacing:.05em;color:#475569;margin-bottom:6px}.v44RelationScope>div{display:grid;grid-template-columns:repeat(4,1fr);gap:5px}.v44RelationScope button{border:1px solid #cbd5e1;border-radius:8px;padding:7px 4px;background:#fff}.v44RelationScope button.selected{border:2px solid #1877f2;background:#eff6ff;padding:6px 3px;color:#0756b8}.v44RelationScope small{display:block;font-size:9px;line-height:1.3;color:#64748b;margin-top:6px}.v44InteractionChoice{display:flex;align-items:center;gap:10px;border:1px solid #cbd5e1;border-radius:12px;padding:10px 12px;background:#f8fafc;margin:-2px 0 10px;cursor:pointer}.v44InteractionChoice:hover{background:#f1f5f9}.v44InteractionChoice.checked{border:2px solid #1877f2;background:#eff6ff;padding:9px 11px}.v44InteractionChoice.disabled{cursor:not-allowed;opacity:.55}.v44InteractionChoice input{width:18px;height:18px;accent-color:#1877f2;flex:0 0 auto;margin:0}.v44InteractionChoiceText{display:block;min-width:0}.v44InteractionChoiceText b{display:block;font-size:13px}.v44InteractionChoiceText small{display:block;color:#64748b;font-size:10px;line-height:1.35;margin-top:2px}.v44Status{background:#f6f7f9;border:1px solid #d7dce3;border-radius:11px;padding:11px;margin-bottom:10px}.v44Status>b{display:block;margin-bottom:8px}.v44Line{display:flex;justify-content:space-between;gap:12px;font-size:11px;color:#526071;margin:5px 0 3px}.v44Line strong{color:#111;text-align:right;max-width:68%}.v44Line strong.bad{color:#991b1b}.v44Line strong.ok{color:#166534}.v44Bar{height:9px;background:#d9dde3;border-radius:99px;overflow:hidden}.v44Bar i{display:block;height:100%;background:#1877f2;transition:width .2s}.v44Bar.stage i{background:#7c3aed}.v44Bar.green i{background:#16a34a}.v44Actions{display:flex;gap:7px;flex-wrap:wrap}.v44Actions button{border:1px solid #9ca3af;border-radius:5px;padding:7px 10px;background:#f3f4f6;font-weight:800}.v44Actions .stop{background:#fee2e2;color:#991b1b;border-color:#fca5a5}.v44Error{display:none;margin-top:8px;padding:8px;border-radius:8px;background:#fef2f2;color:#991b1b;font-size:11px}.v44Error.show{display:block}.v44Export{margin-top:9px;border:2px solid #0ea5e9;border-radius:10px;padding:9px;background:#f0f9ff}.v44Export>b{display:block;margin:0 0 7px}.v44ExportGrid{display:grid;grid-template-columns:minmax(125px,.78fr) minmax(220px,1.45fr);gap:10px;align-items:stretch}.v44ExportFormats{display:flex;flex-direction:column;justify-content:center;gap:3px}.v44ExportFormats label{display:flex;align-items:center;gap:4px;margin:0;min-height:21px;font-weight:700}.v44ExportFormats input{margin:0}.v44IntegrityNote{font-size:10px;line-height:1.35;color:#0f172a;background:#e0f2fe;border:1px solid #93c5fd;border-radius:8px;padding:9px;display:flex;align-items:flex-start;gap:8px;margin:0}.v44InfoIcon{display:inline-grid;place-items:center;flex:0 0 18px;width:18px;height:18px;border-radius:50%;background:#1877f2;color:#fff;font-weight:900;font-size:12px}.v44ExportBtns{display:grid;grid-template-columns:1.08fr .72fr 1.55fr .82fr;gap:7px;margin-top:9px}.v44ExportBtns button{font-weight:800;min-width:0;padding:7px 6px;white-space:nowrap;font-size:11px}.v44ExportBtns button[data-go]{background:#1877f2;color:#fff;border-color:#1877f2}.v44ExportBtns button[data-go]:hover{background:#0b5ed7}.v44ExportBtns button[data-go]:disabled{background:#93c5fd;border-color:#93c5fd}@media(max-width:520px){.v44ExportGrid{grid-template-columns:1fr}.v44IntegrityNote{font-size:9px;padding:7px}.v44ExportBtns{grid-template-columns:1fr 1fr}.v44ExportBtns button{font-size:10px}}#'+PANEL_ID+'.v44Minimized{width:380px;max-height:86px;overflow:hidden;padding:12px 82px 10px 14px}.v44TitleMini{font-size:15px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;padding-right:0}.v44MiniState{font-size:10px;color:#64748b;margin-top:5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}';
    (document.head||document.documentElement).appendChild(style);p=document.createElement('div');p.id=PANEL_ID;document.documentElement.appendChild(p);bindPanel(p);
  }
  p.classList.toggle('v44Minimized',!!state.minimized);var html=panelHtml();if(force||p.__v44Html!==html){p.__v44Html=html;p.innerHTML=html;syncPanelErrorV44R13(p);}return p;
}
function syncPanelErrorV44R13(p){var er=p&&p.querySelector('#fb-b35-v44-error');if(er){er.textContent=state.error||'';er.className='v44Error'+(state.error?' show':'');}}
function bindPanel(p){
  if(!p||p.__v44Bound)return;p.__v44Bound=true;
  p.addEventListener('pointerdown',function(ev){var b=ev.target&&ev.target.closest&&ev.target.closest('[data-stop]');if(b){ev.preventDefault();ev.stopPropagation();stopCurrent();}} ,true);
  p.addEventListener('change',function(ev){var interaction=ev.target&&ev.target.closest&&ev.target.closest('[data-scrape-interactions]');if(interaction){state.scrapeInteractions=!!interaction.checked;state.status=state.scrapeInteractions?'Raspar interações marcado. A opção será aplicada ao iniciar a postagem.':'Raspar interações desmarcado. A postagem será coletada sem abrir a lista de reações.';render(true);return;}var cb=ev.target&&ev.target.closest&&ev.target.closest('[data-format]');if(cb)state.exportFormats[cb.value]=!!cb.checked;});
  p.addEventListener('click',function(ev){var b=ev.target&&ev.target.closest&&ev.target.closest('button');if(!b||b.disabled)return;ev.preventDefault();ev.stopPropagation();state.interactionUntil=Date.now()+700;
    if(b.hasAttribute('data-stop'))return;
    if(b.hasAttribute('data-rel-scope')){state.relationSelection=String(b.getAttribute('data-rel-scope')||'all');state.relationSelectionUserSet=true;state.relationSuiteCompleted=false;state.relationExportReady=false;state.relationExportRelation='';state.exportChooserOpen=false;resetExportFormatsV44R5();var api=core(),active=state.relationDetected||state.relation||'',requested=state.relationSelection;if(active&&requested!=='all'&&requested!==active){setRelationMismatchV442129(api,requested,active);var dec=state.relationMismatchDeclared>0?' O Facebook declara '+state.relationMismatchDeclared.toLocaleString('pt-BR')+' '+relationLabel(requested).toLowerCase()+', mas essa lista de identidades não está materializada agora.':'';state.status='Escopo selecionado: '+relationLabel(requested)+'. A página exibe '+relationLabel(active)+'.'+dec+' Nenhuma métrica ou exportação será atribuída ao escopo solicitado.';}else{clearRelationMismatchV442129();state.status='Escopo selecionado: '+(requested==='all'?'Todas — somente a relação atualmente materializada será coletada nesta rodada':relationLabel(requested))+'.';}return render(true);}
    if(b.hasAttribute('data-use-active-rel')){if(useActiveRelationV442129())return render(true);state.error='Não foi possível confirmar uma relação ativa.';return render(true);}
    if(b.hasAttribute('data-minimize')){state.minimized=!state.minimized;return render(true);}
    if(b.hasAttribute('data-download-rel'))return beginFriendsDownload();if(b.hasAttribute('data-start-post'))return startPost();if(b.hasAttribute('data-export'))return exportFormatChooser();if(b.hasAttribute('data-close'))return closePanel();
    if(b.hasAttribute('data-all')){['html','pdf','json','xlsx','csv'].forEach(function(k){state.exportFormats[k]=true;});render(true);setTimeout(function(){try{var panel=document.getElementById(PANEL_ID);if(panel)panel.scrollTop=panel.scrollHeight;}catch(_){}},0);return;}if(b.hasAttribute('data-clear')){resetExportFormatsV44R5();render(true);setTimeout(function(){try{var panel=document.getElementById(PANEL_ID);if(panel)panel.scrollTop=panel.scrollHeight;}catch(_){}},0);return;}if(b.hasAttribute('data-go'))return runSelectedExportsV44R5();if(b.hasAttribute('data-cancel')){state.exportChooserOpen=false;resetExportFormatsV44R5();return render(true);}
  },true);
}
function render(force){if(state.closed)return;if(!force&&Date.now()<state.interactionUntil)return;hideLegacyPanel();makePanel(!!force);}
function closePanel(){var p=document.getElementById(PANEL_ID);if(p)p.style.display='none';state.closed=true;}
function showPanel(){state.closed=false;makePanel();var p=document.getElementById(PANEL_ID);if(p)p.style.display='block';render();}
function routeChanged(url){
  var now=String(url||location.href||'');if(now===state.lastUrl)return;
  var nextPostKey=postKeyFromHrefV44R20(now),previousRunKey=state.postRunKey;
  state.lastUrl=now;state.error='';state.exportChooserOpen=false;resetExportFormatsV44R5();state.relationExportReady=false;state.relationExportRelation='';state.relationSelectionUserSet=false;state.relationSelection='';clearRelationMismatchV442129();postCtxCache.at=0;
  var postApi=post();
  if(state.activeRun==='post'&&(state.postRunning||(postApi&&postApi.running))){state.mode='post';render(true);return;}
  if(previousRunKey&&nextPostKey&&previousRunKey!==nextPostKey)resetPostSessionV44R20('Nova postagem detectada. Pronta para raspar.');
  if(isRelationPageV442129()){
    state.activeRun='relation';state.mode='relation';state.status='Página de relações detectada. Confirmando a subcoleção realmente ativa…';
    syncRelationPanelV442129({updateStatus:true});
    setTimeout(function(){syncRelationPanelV442129({updateStatus:true});render(true);},220);
  }
  else if(postContext(true).ready){state.activeRun='post';state.mode='post';if(!state.postRunning&&!state.postExportReady)state.status='Postagem confirmada. Pronta para raspar.';}
  else {state.activeRun='';state.mode='';}
  render(true);
  if(state.activeRun!=='post')resumePending().catch(function(e){state.error='Falha ao limpar estado relacional transitório: '+String(e&&e.message||e);render(true);});
}
function installRouteWatch(){
  window.addEventListener('popstate',function(){setTimeout(function(){routeChanged(location.href);},0);});
  window.addEventListener('hashchange',function(){routeChanged(location.href);});
  if(typeof MutationObserver!=='undefined'){
    observer=new MutationObserver(function(mutations){
      hideLegacyPanel();
      if(String(location.href)!==state.lastUrl){routeChanged(location.href);return;}
      var panel=document.getElementById(PANEL_ID);
      var onlyOwn=!!(panel&&mutations&&mutations.length&&Array.prototype.every.call(mutations,function(m){return panel===m.target||panel.contains(m.target); }));
      if(onlyOwn||state.exportChooserOpen||state.exportRunning)return;
      if(!state.postRunning){if(domTimer)clearTimeout(domTimer);domTimer=setTimeout(function(){postCtxCache.at=0;if(isRelationPageV442129())syncRelationPanelV442129({updateStatus:true});render();},250);}
    });
    observer.observe(document.documentElement,{subtree:true,childList:true});
  }
  routeTimer=setInterval(function(){if(String(location.href)!==state.lastUrl)routeChanged(location.href);hideLegacyPanel();},400);
}
function destroy(){
  if(routeTimer)clearInterval(routeTimer);if(statusTimer)clearInterval(statusTimer);if(domTimer)clearTimeout(domTimer);if(observer)observer.disconnect();
  document.removeEventListener('FB_B35_POST_PROGRESS_V44',onPostProgress);
  var p=document.getElementById(PANEL_ID);if(p)p.remove();delete window.__FB_B35_UNIFIED_CONTROLLER_V44__;
}
document.addEventListener('FB_B35_POST_PROGRESS_V44',onPostProgress);
try{chrome.runtime.onMessage.addListener(function(msg){if(msg&&msg.type==='B35_UNIFIED_OPEN_PANEL')showPanel();if(msg&&msg.type==='B35_UNIFIED_ROUTE_UPDATE')routeChanged(msg.url||location.href);});}catch(_){}
makePanel();installRouteWatch();
if(isRelationPageV442129()){
  syncRelationPanelV442129({updateStatus:true});
  setTimeout(function(){syncRelationPanelV442129({updateStatus:true});render(true);},250);
}
resumePending().catch(function(e){state.error='Falha ao limpar estado relacional transitório: '+String(e&&e.message||e);render();});
statusTimer=setInterval(function(){if(!state.closed&&!state.exportChooserOpen&&!state.exportRunning&&Date.now()>=state.interactionUntil){if(isRelationPageV442129())syncRelationPanelV442129({updateStatus:false});render(false);}},400);
window.__FB_B35_UNIFIED_CONTROLLER_V44__={version:CONTROLLER_VERSION_V44R21R8,state:state,show:showPanel,hide:closePanel,render:render,beginFriendsDownload:beginFriendsDownload,resolveProfileRoot:resolveProfileRoot,candidateFriendsLink:candidateFriendsLink,syncActiveRelation:function(){return syncRelationPanelV442129({updateStatus:true});},inspectRelation:function(){var api=core(),d=detectedRelationV442129(api);return {version:CONTROLLER_VERSION_V44R21R8,href:String(location.href||''),relationPage:isRelationPageV442129(),detected:d?{relation:d.relation,source:d.source}:null,selection:state.relationSelection,userSet:state.relationSelectionUserSet===true,mismatchBlocked:state.relationMismatchBlocked===true,mismatchRequested:state.relationMismatchRequested,mismatchActive:state.relationMismatchActive,mismatchDeclared:Number(state.relationMismatchDeclared||0),exportReady:state.relationExportReady===true,exportRelation:state.relationExportRelation,startAck:state.relationStartAck===true,startDiagnostic:state.relationStartDiagnostic,coreRecovery:state.relationCoreRecovery,coreBusy:relationCoreBusyDiagnosticV4431(api),status:state.status};},destroy:destroy};
})();
