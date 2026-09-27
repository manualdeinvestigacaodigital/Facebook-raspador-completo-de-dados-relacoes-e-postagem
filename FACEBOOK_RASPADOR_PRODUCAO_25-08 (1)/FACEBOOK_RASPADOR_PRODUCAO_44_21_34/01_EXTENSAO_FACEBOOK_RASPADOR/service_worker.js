/*
Raspador de dados de relações e postagens do Facebook — service worker V44R16R1 — base V44R5
Injeção pós-reload, reabertura pelo ícone, aviso de navegação SPA e estado transitório por aba.
O núcleo relacional só é acionado nas rotas de relação; o controlador unificado
e o módulo de postagem ficam disponíveis nas páginas Facebook autorizadas.
*/
const FB_RE = /^https:\/\/(?:www|web)\.facebook\.com\//i;
const REL_RE = /^https:\/\/(?:www|web)\.facebook\.com\/[^/?#]+\/(?:friends_all|friends|followers|following)(?:[/?#]|$)/i;
const PROFILE_PHP_RE = /^https:\/\/(?:www|web)\.facebook\.com\/profile\.php\?(?=[^#]*\bsk=(?:friends_all|friends|followers|following)(?:&|#|$))[^#]*/i;
const FALLBACK_OPS = Object.freeze({
  ProfileCometHeaderQuery: '26916983467972978',
  ProfileCometAboutAppSectionQuery: '26885786877765593',
  ProfileCometTopAppSectionQuery: '27618050364552818'
});

function pendingStorageKey(tabId){return 'b35_pending_relation_v44_tab_'+String(tabId||0);}
async function pendingSet(tabId,value){
  if(!tabId||!value)return {ok:false,reason:'missing_tab_or_value'};
  if(String(value.relation||'')!=='friends')return {ok:false,reason:'invalid_relation'};
  try{
    const x=new URL(String(value.root||''));
    if(x.protocol!=='https:'||!/(^|\.)facebook\.com$/i.test(x.hostname))return {ok:false,reason:'invalid_profile_root'};
  }catch(_){return {ok:false,reason:'invalid_profile_root'};}
  const key=pendingStorageKey(tabId);
  await chrome.storage.session.set({[key]:value});
  return {ok:true};
}
async function pendingGet(tabId){
  if(!tabId)return {ok:false,reason:'missing_tab'};
  const key=pendingStorageKey(tabId),data=await chrome.storage.session.get(key);
  return {ok:true,value:data[key]||null};
}
async function pendingClear(tabId){
  if(!tabId)return {ok:false,reason:'missing_tab'};
  await chrome.storage.session.remove(pendingStorageKey(tabId));
  return {ok:true};
}

function facebookUrl(url=''){return FB_RE.test(String(url||''));}
function relationUrl(url=''){return REL_RE.test(String(url||''))||PROFILE_PHP_RE.test(String(url||''));}
async function executeFiles(tabId,world,files){
  await chrome.scripting.executeScript({target:{tabId},world,files});
}
async function inject(tabId,url=''){
  if(!tabId||!facebookUrl(url))return {ok:false,reason:'not_facebook_page'};
  try{
    /* RC5: reinjecao manual deve espelhar o manifest. Antes, reload/update em aba
       ja aberta injetava somente parte do runtime e podia deixar o core antigo ativo. */
    await executeFiles(tabId,'MAIN',['main_world_hook.js','post_reaction_main_hook.js','post_comment_main_hook.js','reel_evidence_main_hook.js']);
    await executeFiles(tabId,'ISOLATED',['unified_preflight.js','content.js','exact_relation_collector_442127.js','post_reaction_bridge.js','post_comment_bridge.js','reel_evidence_bridge.js','post_scraper_module.js','unified_controller.js']);
    return {ok:true,relation:relationUrl(url),runtime:'manifest_parity_44.21.34'};
  }catch(e){return {ok:false,reason:String(e&&e.message||e)};}
}
async function injectAllOpen(){
  const tabs=await chrome.tabs.query({url:['https://www.facebook.com/*','https://web.facebook.com/*']});
  for(const t of tabs){if(t.id&&facebookUrl(t.url||''))await inject(t.id,t.url||'');}
}
chrome.action.onClicked.addListener(async tab=>{
  const r=await inject(tab.id,tab.url||'');
  if(r.ok){
    try{await chrome.tabs.sendMessage(tab.id,{type:'B35_UNIFIED_OPEN_PANEL'});}catch(_){}
  }
  try{
    await chrome.action.setBadgeText({tabId:tab.id,text:r.ok?'ON':'!'});
    await chrome.action.setBadgeBackgroundColor({tabId:tab.id,color:r.ok?'#137333':'#b3261e'});
  }catch(_){}
});
chrome.runtime.onInstalled.addListener(()=>{injectAllOpen().catch(()=>{});});
chrome.runtime.onStartup.addListener(()=>{injectAllOpen().catch(()=>{});});
chrome.tabs.onUpdated.addListener((tabId,info,tab)=>{
  const url=String(info.url||tab.url||'');
  if((info.status==='complete'||!!info.url)&&facebookUrl(url))inject(tabId,url);
});
chrome.tabs.onRemoved.addListener(tabId=>{pendingClear(tabId).catch(()=>{});});
if(chrome.webNavigation&&chrome.webNavigation.onHistoryStateUpdated){
  chrome.webNavigation.onHistoryStateUpdated.addListener(details=>{
    if(details.frameId!==0||!facebookUrl(details.url||''))return;
    if(relationUrl(details.url||''))inject(details.tabId,details.url||'').catch(()=>{});
    chrome.tabs.sendMessage(details.tabId,{type:'B35_UNIFIED_ROUTE_UPDATE',url:details.url}).catch(()=>{});
  },{url:[{hostSuffix:'facebook.com'}]});
}

function validBundleUrl(u=''){
  try{const x=new URL(u);return x.protocol==='https:'&&(/(^|\.)fbcdn\.net$/i.test(x.hostname)||/(^|\.)facebook\.com$/i.test(x.hostname))&&/(?:\.js(?:\?|$)|\/rsrc\.php\/)/i.test(x.pathname+x.search);}catch(_){return false;}
}
function extractOps(text=''){
  const out={};
  for(const name of Object.keys(FALLBACK_OPS)){
    const re=new RegExp(name+'_facebookRelayOperation[\\s\\S]{0,1200}?exports\\s*=\\s*["\\\']?(\\d+)["\\\']?','i');
    const m=String(text).match(re);if(m)out[name]=m[1];
  }
  return out;
}
async function discoverOps(resources=[]){
  const OPS_CACHE_TTL_MS=24*60*60*1000;
  const cache=await chrome.storage.local.get(['b35a1_ops_v2','b35a1_ops_v2_updated_at']);
  const updatedAt=Number(cache.b35a1_ops_v2_updated_at||0),cacheFresh=updatedAt>0&&(Date.now()-updatedAt)<=OPS_CACHE_TTL_MS;
  const cached=cacheFresh?(cache.b35a1_ops_v2||{}):{},found={};
  const urls=Array.from(new Set((resources||[]).filter(validBundleUrl))).slice(0,120);
  let next=0;
  async function worker(){
    while(next<urls.length&&(!found.ProfileCometHeaderQuery||!found.ProfileCometAboutAppSectionQuery||!found.ProfileCometTopAppSectionQuery)){
      const u=urls[next++];
      try{const r=await fetch(u,{credentials:'omit',cache:'force-cache'});if(!r.ok)continue;Object.assign(found,extractOps(await r.text()));}catch(_){}
    }
  }
  await Promise.all(Array.from({length:6},()=>worker()));
  const result={...FALLBACK_OPS,...cached,...found};
  await chrome.storage.local.set({b35a1_ops_v2:result,b35a1_ops_v2_updated_at:Date.now()});
  return {ops:result,freshOps:{...found},cachePolicy:{ttlMs:OPS_CACHE_TTL_MS,cacheFresh:cacheFresh,previousUpdatedAt:updatedAt}};
}

function htmlEntityDecodeV44R3(s=''){
  return String(s||'')
    .replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#39;|&#x27;/g,"'")
    .replace(/&lt;/g,'<').replace(/&gt;/g,'>')
    .replace(/\\u0025/g,'%').replace(/\\u002F/g,'/').replace(/\\u003A/g,':')
    .replace(/\\u0026/g,'&').replace(/\\\//g,'/');
}
function canonicalProfileUrlV44R3(raw=''){
  try{
    const x=new URL(String(raw||''));
    if(x.protocol!=='https:'||!/(^|\.)facebook\.com$/i.test(x.hostname))return '';
    x.hash='';
    if(/\/profile\.php$/i.test(x.pathname)){
      const id=x.searchParams.get('id');
      return id?`https://www.facebook.com/profile.php?id=${encodeURIComponent(id)}`:'';
    }
    const parts=x.pathname.split('/').filter(Boolean);
    const first=decodeURIComponent(parts[0]||'');
    const reserved=new Set(['home','watch','reel','reels','photo','photos','videos','groups','friends','followers','following','marketplace','gaming','messages','notifications','settings','help','privacy','ads','login','share','search','people','hashtag','permalink','plugins','business','profile','profile.php']);
    if(!first||reserved.has(first.toLowerCase()))return '';
    return `https://www.facebook.com/${encodeURIComponent(first)}`;
  }catch(_){return '';}
}
function extractMetaContentV44R3(html,key){
  const esc=key.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
  const patterns=[
    new RegExp(`<meta[^>]+(?:property|name)=["']${esc}["'][^>]+content=["']([^"']+)["'][^>]*>`,'i'),
    new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+(?:property|name)=["']${esc}["'][^>]*>`,'i')
  ];
  for(const re of patterns){const m=String(html||'').match(re);if(m&&m[1])return htmlEntityDecodeV44R3(m[1]);}
  return '';
}
function decodeJsonUrlV44R11(raw=''){
  let s=htmlEntityDecodeV44R3(String(raw||''));
  try{return JSON.parse('"'+s.replace(/"/g,'\\"')+'"');}
  catch(_){return s.split('\\u0025').join('%').split('\\u0026').join('&').split('\\u003d').join('=').split('\\/').join('/');}
}
function validProfileAvatarUrlV44R3(raw=''){
  try{
    const x=new URL(htmlEntityDecodeV44R3(raw));
    if(x.protocol!=='https:')return '';
    if(!/(^|\.)fbcdn\.net$/i.test(x.hostname)&&!/(^|\.)facebook\.com$/i.test(x.hostname))return '';
    if(/\/(?:reel|watch|photo|posts)\b/i.test(x.pathname))return '';
    return x.href;
  }catch(_){return '';}
}
async function fetchProfileAvatarV44R3(profileUrl,authorName='',profileIdentity=''){
  const canonical=canonicalProfileUrlV44R3(profileUrl);
  if(!canonical)return {ok:false,reason:'invalid_profile_url'};
  try{
    const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),10000);let r;
    try{r=await fetch(canonical,{credentials:'include',cache:'no-store',redirect:'follow',signal:controller.signal,headers:{Accept:'text/html,application/xhtml+xml'}});}finally{clearTimeout(timer);}
    if(!r.ok)return {ok:false,reason:`profile_http_${r.status}`};
    const html=await r.text(),title=extractMetaContentV44R3(html,'og:title')||extractMetaContentV44R3(html,'twitter:title')||authorName||'';
    const needles=[String(authorName||'').toLowerCase(),String(profileIdentity||'').replace(/^(?:user|id):/,'').toLowerCase(),canonical.toLowerCase()].filter(x=>x&&x.length>2);
    const candidates=[];
    function add(raw,base,at){const u=validProfileAvatarUrlV44R3(decodeJsonUrlV44R11(raw));if(!u)return;const context=html.slice(Math.max(0,(at||0)-2600),Math.min(html.length,(at||0)+2600)).toLowerCase();let score=base;needles.forEach(n=>{if(context.includes(n))score+=180;});const dm=urlDimensionHintV44R13(u);score+=Math.min(300,Math.max(dm.width,dm.height));candidates.push({url:u,score});}
    const og=extractMetaContentV44R3(html,'og:image');if(og)add(og,120,html.toLowerCase().indexOf('og:image'));
    const regs=[
      [/"profilePicLarge"\s*:\s*\{[\s\S]{0,1800}?"uri"\s*:\s*"([^"]+)"/ig,500],
      [/"profilePicture"\s*:\s*\{[\s\S]{0,1800}?"uri"\s*:\s*"([^"]+)"/ig,450],
      [/"profile_picture"\s*:\s*\{[\s\S]{0,1800}?"uri"\s*:\s*"([^"]+)"/ig,400],
      [/"profile_pic_uri"\s*:\s*"([^"]+)"/ig,380],
      [/"profile_picture"\s*:\s*"([^"]+)"/ig,430],
      [/"profilePictureUri"\s*:\s*"([^"]+)"/ig,430],
      [/"image"\s*:\s*\{[\s\S]{0,600}?"uri"\s*:\s*"([^"]+)"/ig,220],
      [/\\"profilePicLarge\\"[\s\S]{0,2000}?\\"uri\\"\s*:\s*\\"([^"\\]+(?:\\.[^"\\]*)*)\\"/ig,480]
    ];
    regs.forEach(([re,base])=>{let m,count=0;while((m=re.exec(html))&&count++<60)add(m[1],base,m.index);});
    const uniq=[];const seen=new Set();candidates.sort((a,b)=>b.score-a.score).forEach(c=>{if(!seen.has(c.url)){seen.add(c.url);uniq.push(c);}});
    let best=null;
    for(const c of uniq.slice(0,14)){
      const img=await fetchImageDataV44R11(c.url,true);
      if(!img||!img.ok)continue;const px=Math.max(Number(img.width||0),Number(img.height||0));const value=c.score+Math.min(1200,px);
      if(!best||value>best.value)best={...img,value,avatarUrl:img.highResUrl||img.sourceUrl||c.url};
      if(px>=720&&c.score>=500)break;
    }
    if(!best)return {ok:false,reason:'profile_avatar_not_found',profileTitle:title,canonicalUrl:canonical};
    return {ok:true,avatarUrl:best.avatarUrl,highResUrl:best.highResUrl||best.sourceUrl||best.avatarUrl,dataUrl:best.dataUrl,width:best.width||0,height:best.height||0,mime:best.mime||'',bytes:best.bytes||0,sha256:best.sha256||'',profileTitle:title,canonicalUrl:canonical,identityMatched:needles.some(n=>html.toLowerCase().includes(n)),source:'profile_page_exact_identity_best_resolution'};
  }catch(e){return {ok:false,reason:'profile_fetch_error',error:String(e&&e.message||e)};}
}

function validImageUrlV44R11(raw=''){
  try{const x=new URL(String(raw||''));if(x.protocol!=='https:')return '';if(!/(^|\.)fbcdn\.net$/i.test(x.hostname)&&!/(^|\.)facebook\.com$/i.test(x.hostname))return '';return x.href;}catch(_){return '';}
}
function bytesBase64V44R11(bytes){let out='';const step=0x8000;for(let i=0;i<bytes.length;i+=step)out+=String.fromCharCode.apply(null,bytes.subarray(i,Math.min(bytes.length,i+step)));return btoa(out);}
function imageDimensionsV44R13(bytes,mime=''){
  try{
    if(bytes.length>=24&&bytes[0]===0x89&&bytes[1]===0x50)return {width:(bytes[16]<<24|bytes[17]<<16|bytes[18]<<8|bytes[19])>>>0,height:(bytes[20]<<24|bytes[21]<<16|bytes[22]<<8|bytes[23])>>>0};
    if(bytes.length>=12&&String.fromCharCode(...bytes.slice(0,4))==='RIFF'&&String.fromCharCode(...bytes.slice(8,12))==='WEBP'){
      const type=String.fromCharCode(...bytes.slice(12,16));if(type==='VP8X'&&bytes.length>=30)return {width:1+bytes[24]+(bytes[25]<<8)+(bytes[26]<<16),height:1+bytes[27]+(bytes[28]<<8)+(bytes[29]<<16)};
    }
    if(bytes[0]===0xff&&bytes[1]===0xd8){let i=2;while(i+9<bytes.length){if(bytes[i]!==0xff){i++;continue;}const marker=bytes[i+1],len=(bytes[i+2]<<8)+bytes[i+3];if([0xc0,0xc1,0xc2,0xc3,0xc5,0xc6,0xc7,0xc9,0xca,0xcb,0xcd,0xce,0xcf].includes(marker))return {height:(bytes[i+5]<<8)+bytes[i+6],width:(bytes[i+7]<<8)+bytes[i+8]};if(!len)break;i+=2+len;}
    }
  }catch(_){}return {width:0,height:0};
}
function urlDimensionHintV44R13(raw=''){
  const s=String(raw||'');let m=s.match(/(?:^|[?&_])(?:c?stp|ctp)=(?:[^&]*?)(?:s|p|mx)(\d{2,4})x(\d{2,4})/i)||s.match(/(?:s|p|mx)(\d{2,4})x(\d{2,4})/i);return m?{width:Number(m[1]),height:Number(m[2])}:{width:0,height:0};
}
function highResCandidatesV44R13(raw=''){
  const u=validImageUrlV44R11(raw);if(!u)return [];const out=[];function add(v){v=validImageUrlV44R11(v);if(v&&!out.includes(v))out.push(v);}
  try{
    const original=new URL(u);
    /* Primeiro remova apenas o redutor final (ctp=s32x32/s40x40), preservando
       o limite superior assinado já fornecido pelo Facebook. */
    const keepMax=new URL(original.href);keepMax.searchParams.delete('ctp');add(keepMax.href);
    const max2048=new URL(keepMax.href);max2048.searchParams.set('cstp','mx2048x2048');add(max2048.href);
    const max1440=new URL(keepMax.href);max1440.searchParams.set('cstp','mx1440x1440');add(max1440.href);
    const max960=new URL(keepMax.href);max960.searchParams.set('cstp','mx960x960');add(max960.href);
    const clean=new URL(keepMax.href);let stp=clean.searchParams.get('stp')||'';
    stp=stp.replace(/(?:^|_)cp\d+(?:_|$)/ig,'_').replace(/(?:^|_)(?:s|p|mx)\d+x\d+(?:_|$)/ig,'_').replace(/_+/g,'_').replace(/^_|_$/g,'');
    if(stp)clean.searchParams.set('stp',stp);else clean.searchParams.delete('stp');add(clean.href);
    ['dst-jpg_p2048x2048','dst-jpg_s2048x2048','dst-jpg_p960x960','dst-jpg_s960x960'].forEach(v=>{const x=new URL(clean.href);x.searchParams.set('stp',v);x.searchParams.delete('ctp');add(x.href);});
    const noSize=new URL(clean.href);noSize.searchParams.delete('stp');noSize.searchParams.delete('cstp');add(noSize.href);
  }catch(_){}
  add(u);return out;
}
async function fetchOneImageV44R13(url){
  const ctl=new AbortController(),timer=setTimeout(()=>ctl.abort(),15000);let r;try{r=await fetch(url,{credentials:'include',cache:'no-store',redirect:'follow',signal:ctl.signal,headers:{Accept:'image/avif,image/webp,image/apng,image/*,*/*;q=0.8'}});}finally{clearTimeout(timer);}if(!r.ok)return {ok:false,reason:'image_http_'+r.status};const mime=String(r.headers.get('content-type')||'').split(';')[0].toLowerCase();if(!/^image\/(?:png|jpe?g|webp|gif)$/i.test(mime))return {ok:false,reason:'invalid_image_mime',mime};const bytes=new Uint8Array(await r.arrayBuffer());if(!bytes.length||bytes.length>12*1024*1024)return {ok:false,reason:bytes.length?'image_too_large':'image_empty',bytes:bytes.length};const dm=imageDimensionsV44R13(bytes,mime),dig=await crypto.subtle.digest('SHA-256',bytes),sha256=Array.from(new Uint8Array(dig)).map(x=>x.toString(16).padStart(2,'0')).join('');return {ok:true,dataUrl:`data:${mime};base64,${bytesBase64V44R11(bytes)}`,mime,bytes:bytes.length,sha256,width:dm.width,height:dm.height,sourceUrl:url,highResUrl:url};
}
async function fetchImageDataV44R11(raw,preferHighRes=true){
  const urls=preferHighRes?highResCandidatesV44R13(raw):[validImageUrlV44R11(raw)].filter(Boolean);if(!urls.length)return {ok:false,reason:'invalid_image_url'};
  let best=null,last=null,next=0;const maxWorkers=Math.min(6,urls.length);
  async function worker(){while(next<urls.length){const url=urls[next++];try{const r=await fetchOneImageV44R13(url);last=r;if(r.ok&&(!best||Math.max(r.width,r.height)>Math.max(best.width,best.height)||(Math.max(r.width,r.height)===Math.max(best.width,best.height)&&r.bytes>best.bytes)))best=r;}catch(e){last={ok:false,reason:'image_fetch_failed',error:String(e&&e.message||e)};}}}
  await Promise.all(Array.from({length:maxWorkers},()=>worker()));return best||last||{ok:false,reason:'image_fetch_failed'};
}
function avatarCacheKeyV44R13(identity='',profileUrl=''){let key=String(identity||'').trim().toLowerCase();if(!key){try{const x=new URL(profileUrl);key=/profile\.php$/i.test(x.pathname)?'id:'+String(x.searchParams.get('id')||''):'user:'+decodeURIComponent(x.pathname.split('/').filter(Boolean)[0]||'').toLowerCase();}catch(_){}}return key?'FB_B35_AVATAR_V44R13_'+key:'';}
async function resolveProfileAvatarLiveV44R11(profileUrl,authorName=''){
  /* V44R11: compatibilidade do nome da mensagem, mas sem chrome.tabs.create.
     A resolução usa apenas fetch privilegiado do service worker. */
  const r=await fetchProfileAvatarV44R3(profileUrl,authorName,'');
  if(!r||!r.ok)return r||{ok:false,reason:'profile_avatar_not_found_no_tab'};
  return {...r,source:'profile_fetch_no_tab'};
}

chrome.runtime.onMessage.addListener((msg,sender,sendResponse)=>{
  const tabId=sender&&sender.tab&&sender.tab.id;
  if(msg&&(msg.type==='B35_FETCH_IMAGE_DATA_V44R11'||msg.type==='B35_FETCH_IMAGE_DATA_V44R10')){fetchImageDataV44R11(msg.url||'',msg.preferHighRes!==false).then(sendResponse).catch(e=>sendResponse({ok:false,error:String(e)}));return true;}
  if(msg&&(msg.type==='B35_RESOLVE_PROFILE_AVATAR_LIVE_V44R11'||msg.type==='B35_RESOLVE_PROFILE_AVATAR_LIVE_V44R10')){resolveProfileAvatarLiveV44R11(msg.profileUrl||'',msg.authorName||'').then(sendResponse).catch(e=>sendResponse({ok:false,error:String(e)}));return true;}
  if(msg&&msg.type==='B35_FETCH_PROFILE_AVATAR_V44R3'){
    fetchProfileAvatarV44R3(msg.profileUrl||'',msg.authorName||'',msg.profileIdentity||'').then(sendResponse).catch(e=>sendResponse({ok:false,error:String(e)}));return true;
  }
  if(msg&&msg.type==='B35_PENDING_RELATION_SET'){
    pendingSet(tabId,msg.value).then(sendResponse).catch(e=>sendResponse({ok:false,error:String(e)}));return true;
  }
  if(msg&&msg.type==='B35_PENDING_RELATION_GET'){
    pendingGet(tabId).then(sendResponse).catch(e=>sendResponse({ok:false,error:String(e)}));return true;
  }
  if(msg&&msg.type==='B35_PENDING_RELATION_CLEAR'){
    pendingClear(tabId).then(sendResponse).catch(e=>sendResponse({ok:false,error:String(e)}));return true;
  }
  if(msg&&msg.type==='B35A1_DISCOVER_OPS_V2'){
    discoverOps(msg.resources||[]).then(bundle=>sendResponse({ok:true,ops:bundle.ops,freshOps:bundle.freshOps})).catch(e=>sendResponse({ok:false,error:String(e)}));
    return true;
  }
  if(msg&&msg.type==='B35A1_FORCE_INJECT_V2'){
    inject(sender.tab&&sender.tab.id,sender.tab&&sender.tab.url||'').then(sendResponse);return true;
  }
});
