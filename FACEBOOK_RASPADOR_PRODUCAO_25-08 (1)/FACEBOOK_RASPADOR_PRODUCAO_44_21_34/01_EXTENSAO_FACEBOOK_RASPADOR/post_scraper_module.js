/*
Raspador de dados de relações e postagens do Facebook — módulo de postagem V44R21R28 — UI/exportação de vídeo somente
Origem preservada: BOOKMARKLET_FACEBOOK_v1.1.1_ALL_COMMENTS_GATE.js
Integração: execução sob demanda, HTML vertical padrão, scroll terminal de foto/post, gate estrito de Todos os comentários e avatar do perfil target-bound.
*/
(function(){
'use strict';
var POST_MODULE_VERSION='1.1.1-ALL-COMMENTS-GATE-2026-07-12+V44R21R28-UI-VIDEO-HTML';
if(window.__FB_POST_SCRAPER_V44__){
  if(String(window.__FB_POST_SCRAPER_V44__.version||'')===POST_MODULE_VERSION)return;
  try{if(window.__FB_POST_SCRAPER_V44__.stop)window.__FB_POST_SCRAPER_V44__.stop();}catch(_){}
  try{delete window.__FB_POST_SCRAPER_V44__;delete window.__FB_HARVEST12__;delete window.__HUDH__;}catch(_){}
}
window.__FB_BOOKMARKLET_TEST_MODE__=POST_MODULE_VERSION;

var RESERVED = {
  home:1, watch:1, reel:1, reels:1, photo:1, photos:1, videos:1, groups:1,
  friends:1, followers:1, following:1, marketplace:1, gaming:1, messages:1,
  notifications:1, settings:1, help:1, privacy:1, ads:1, login:1, share:1,
  search:1, people:1, hashtag:1, permalink:1, plugins:1, business:1,
  profile:1, "profile.php":1
};

function t(s){return String(s||'').replace(/[\u200B-\u200D\uFEFF]/g,'').replace(/\s+/g,' ').trim();}
function fbIsPhotoContextV44R21R13(){
  try{return /(?:^|\/)photo(?:\.php)?(?:\/|$)/i.test(String(location.pathname||''))||/\/photo(?:\.php)?\?fbid=/i.test(String(location.href||''));}catch(_){return false;}
}
function fbEscapeHtmlV44R21R13(s){return String(s||'').replace(/[&<>"']/g,function(m){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m];});}
function buildStoryHtmlV44R21R13(payload){
  payload=payload||{};var meta=payload.meta||{},media=payload.media||null;
  var mediaHtml='';
  if(media&&media.type==='video'&&media.url)mediaHtml='<video controls src="'+fbEscapeHtmlV44R21R13(media.url)+'" style="max-width:100%;border-radius:12px"></video>';
  else if(media&&media.type==='photos'&&media.photos&&media.photos[0]&&media.photos[0].url)mediaHtml='<img src="'+fbEscapeHtmlV44R21R13(media.photos[0].url)+'" alt="" style="max-width:100%;border-radius:12px">';
  else mediaHtml='<div style="padding:18px;background:#f1f5f9;border-radius:10px">Mídia não materializada.</div>';
  return '<!doctype html><html lang="pt-br"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Story Facebook</title><style>body{font-family:Arial,sans-serif;background:#f7f7f8;color:#111;max-width:1100px;margin:0 auto;padding:20px}.hero{background:#e5e7eb;border:1px solid #cbd5e1;border-radius:16px;padding:20px;margin-bottom:14px}.name{font-size:25px;font-weight:900}.meta{color:#475569;font-size:13px;margin-top:7px}.caption{white-space:pre-wrap;margin-top:12px;font-weight:700}.media{background:#fff;border:1px solid #ddd;border-radius:12px;padding:12px}</style></head><body><h1>Raspador de dados de relações e postagens do Facebook</h1><section class="hero"><div class="name">'+fbEscapeHtmlV44R21R13(meta.author||'')+'</div><div class="meta">'+fbEscapeHtmlV44R21R13(meta.postURL||'')+'</div><div class="caption">'+fbEscapeHtmlV44R21R13(meta.caption||'')+'</div></section><section class="media">'+mediaHtml+'</section></body></html>';
}
function visible(el){
  if(!el) return false;
  try{
    var cs=getComputedStyle(el),r=el.getBoundingClientRect();
    return cs.display!=='none'&&cs.visibility!=='hidden'&&r.width>0&&r.height>0;
  }catch(_){return false;}
}
function cleanUrl(u){
  try{
    var x=new URL(String(u||''),location.href);
    if(!/(^|\.)facebook\.com$/i.test(x.hostname)) return '';
    x.hash='';
    return x.href;
  }catch(_){return '';}
}
function postTypeFromUrl(url){
  var u=String(url||location.href);
  if(/\/stories\/[^/?#]+/i.test(u)||/\/story\.php(?:[?#]|$)/i.test(u)) return 'STORY';
  if(/\/reels?\/\d+/i.test(u)) return 'REEL';
  if(/(?:\/photo(?:\.php)?(?:[/?#]|$)|photo(?:\.php)?\?fbid=)/i.test(u)) return 'PHOTO';
  if(/\/(?:posts\/pfbid|posts\/\d+|videos\/\d+)|\/watch\/\?v=\d+/i.test(u)) return 'POST';
  return '';
}
function mediaVisible(el){
  if(!el)return false;
  try{
    var r=el.getBoundingClientRect(),cs=getComputedStyle(el);
    return cs.display!=='none'&&cs.visibility!=='hidden'&&r.width>=180&&r.height>=120;
  }catch(_){return false;}
}
function profileIdentityFromUrl(href){
  try{
    var x=new URL(String(href||''),location.href);
    if(!/(^|\.)facebook\.com$/i.test(x.hostname))return '';
    if(/\/profile\.php$/i.test(x.pathname)){
      var id=x.searchParams.get('id');return id?'id:'+id:'';
    }
    var parts=x.pathname.split('/').filter(Boolean);
    if(parts[0]==='people'&&parts.length>=3&&/^\d+$/.test(parts[parts.length-1]))return 'id:'+parts[parts.length-1];
    var first=decodeURIComponent(parts[0]||'');
    if(first&&!RESERVED[first.toLowerCase()])return 'user:'+first.toLowerCase();
  }catch(_){}
  return '';
}
function authorUrlScore(href){
  var u=cleanUrl(href),identity=profileIdentityFromUrl(u);
  if(!u||!identity)return -999;
  if(/comment_id=|\/posts\/|\/reel\/|photo\.php|\/stories\/|\/share\/|\/hashtag\//i.test(u))return -500;
  return 20;
}
function findAuthorCandidate(surface){
  surface=surface||document.body;
  var links=Array.prototype.slice.call(surface.querySelectorAll('h1 a[href],h2 a[href],h3 a[href],strong a[href],a[role="link"][href]')).filter(visible);
  var best=null,bestScore=-999;
  links.slice(0,500).forEach(function(a,idx){
    var name=t(a.innerText||a.textContent||a.getAttribute('aria-label')||'');
    var href=cleanUrl(a.href||a.getAttribute('href')||'');
    var identity=profileIdentityFromUrl(href);
    if(!identity||!name||name.length<2||name.length>120)return;
    var score=authorUrlScore(href)-idx*0.001;
    if(name.length<=70)score+=25;
    if(a.closest('h1,h2,h3,strong'))score+=45;
    if(a.closest('[role="article"],[role="dialog"],main'))score+=15;
    if(/Facebook|Home|Início|Reels|Friends|Amigos|Followers|Seguidores|Following|Seguindo|See more|Ver mais|Like|Curtir|Comment|Comentar|Share|Compartilhar/i.test(name))score-=180;
    if(score>bestScore){bestScore=score;best={a:a,name:name,href:href,identity:identity,score:score};}
  });
  return best;
}
function addUniqueRoot(arr,el){
  if(el&&arr.indexOf(el)===-1&&visible(el))arr.push(el);
}
function postSurfaceRoleV44R16R2(el){
  if(!el||!el.getAttribute)return '';
  var role=String(el.getAttribute('role')||'').toLowerCase();
  if(role==='dialog'||role==='article'||role==='main')return role;
  return String(el.tagName||'').toLowerCase()==='main'?'main':'';
}
function postTitleEvidenceV44R16R2(tx){
  return /(?:'s\s+Post\b|\bPostagem\s+de\b|\bPublica(?:ç|c)ão\s+de\b|\bPost\s+de\b|\bReel\s+de\b|\bVídeo\s+de\b|\bVideo\s+de\b)/i.test(String(tx||''));
}
function postEngagementEvidenceV44R16R2(tx){
  return /All comments|Todos os comentários|Most relevant|Mais relevantes|Write a comment|Escreva um comentário|Curtir|Like|Responder|Reply|Comentar|Comment|Compartilhar|Share/i.test(String(tx||''));
}
function visualMediaEvidenceV44R17(root){
  var out={video:false,canvas:false,largeImage:false,background:false,largeVisual:false};
  if(!root||!root.querySelectorAll)return out;
  try{out.video=Array.prototype.slice.call(root.querySelectorAll('video')).some(mediaVisible);}catch(_){}
  try{out.canvas=Array.prototype.slice.call(root.querySelectorAll('canvas')).some(function(el){return mediaVisible(el);});}catch(_){}
  try{out.largeImage=Array.prototype.slice.call(root.querySelectorAll('img')).some(function(im){try{var r=im.getBoundingClientRect();return visible(im)&&r.width>=260&&r.height>=180;}catch(_){return false;}});}catch(_){}
  try{
    var bgNodes=[root].concat(Array.prototype.slice.call(root.querySelectorAll('[style]')).slice(0,500));
    out.background=bgNodes.some(function(el){try{var r=el.getBoundingClientRect(),bg=String(getComputedStyle(el).backgroundImage||'');return visible(el)&&r.width>=260&&r.height>=180&&bg&&bg!=='none'&&/url\(/i.test(bg);}catch(_){return false;}});
  }catch(_){}
  out.largeVisual=!!(out.video||out.canvas||out.largeImage||out.background);
  return out;
}
function reelEngagementEvidenceV44R17(root){
  if(!root)return false;
  var tx=t(root.innerText||root.textContent||'').slice(0,12000);
  if(/\b(?:Like|Curtir|Comment|Comentários|Comentar|Share|Compartilhar|Reply|Responder)\b/i.test(tx))return true;
  try{return !!root.querySelector('[aria-label*="Like" i],[aria-label*="Curtir" i],[aria-label*="Comment" i],[aria-label*="Coment" i],[aria-label*="Share" i],[aria-label*="Compart" i]');}catch(_){return false;}
}

/* V44R21R16 — POST target-bound: em páginas com diálogo aberto, o Facebook
   mantém o feed subjacente materializado. A versão anterior podia escolher o
   <main> de fundo e importar métricas de outra publicação (ex.: 4,7 mil /
   3,1 mil) em vez do trio 1,2 mil / 66 / 54 do diálogo corrente. */
var __POST_TARGET_DIALOG_V44R21R16__ = null;
var __POST_TARGET_ROUTE_V44R21R16__ = '';
function currentPostRouteKeyV44R21R16(){
  var s=String(location.href||''),m=s.match(/\/posts\/(pfbid[\w-]+)/i);
  if(m&&m[1])return m[1];
  m=s.match(/\/posts\/(\d+)/i);return m&&m[1]||'';
}
function postOwnedUiV44R21R16(el){
  try{
    if(!el)return true;
    if(el.id==='fb-b35-unified-v44-panel'||el.closest&&el.closest('#fb-b35-unified-v44-panel'))return true;
    var tx=t(el.innerText||el.textContent||'').slice(0,1200);
    return /Raspador de dados de rela[cç][oõ]es e postagens do Facebook/i.test(tx)&&/Baixar rela[cç][oõ]es do perfil|Postagem aberta/i.test(tx);
  }catch(_){return false;}
}
function postDialogHasRouteV44R21R16(el,key){
  if(!el||!key)return false;
  try{
    var links=Array.prototype.slice.call(el.querySelectorAll('a[href]')).slice(0,1200);
    for(var i=0;i<links.length;i++){
      var h=String(links[i].href||links[i].getAttribute('href')||'');
      if(h.indexOf('/posts/'+key)!==-1)return true;
    }
  }catch(_){}
  return false;
}
function postDialogScoreV44R21R16(el,key){
  if(!el||!visible(el)||postOwnedUiV44R21R16(el))return -99999;
  try{
    var r=el.getBoundingClientRect(),vw=Math.max(1,Number(innerWidth||document.documentElement.clientWidth||1)),vh=Math.max(1,Number(innerHeight||document.documentElement.clientHeight||1));
    if(r.width<420||r.height<280||r.width>vw*.96||r.height>vh*1.5)return -99999;
    var role=String(el.getAttribute&&el.getAttribute('role')||'').toLowerCase(),modal=String(el.getAttribute&&el.getAttribute('aria-modal')||'').toLowerCase()==='true';
    if(role!=='dialog'&&!modal)return -99999;
    var tx=t(el.innerText||el.textContent||'').slice(0,15000),score=5000;
    if(modal)score+=900;
    if(postTitleEvidenceV44R16R2(tx))score+=2400;
    if(postEngagementEvidenceV44R16R2(tx))score+=1800;
    if(/All comments|Todos os coment[aá]rios|Most relevant|Mais relevantes/i.test(tx))score+=900;
    if(/Write a comment|Comment as|Escreva um coment[aá]rio|Comentar como/i.test(tx))score+=1100;
    if(postDialogHasRouteV44R21R16(el,key))score+=5000;
    var author=findAuthorCandidate(el);if(author)score+=900;
    var visual=visualMediaEvidenceV44R17(el);if(visual.largeVisual)score+=700;
    var rows=0;try{rows=el.querySelectorAll('div[role="article"],li[aria-posinset],a[href*="comment_id="],[aria-label^="Comment by" i],[aria-label^="Reply by" i]').length;}catch(_){}
    score+=Math.min(1800,rows*90);
    if(/People who reacted|Pessoas que reagiram|Reactions? details|Detalhes das rea[cç][oõ]es/i.test(tx)&&!/All comments|Todos os coment[aá]rios|Write a comment|Escreva um coment[aá]rio/i.test(tx))score-=7000;
    if(r.left<vw*.02||r.right>vw*.99)score-=250;
    return score;
  }catch(_){return -99999;}
}
function findPostTargetDialogV44R21R16(){
  if(postTypeFromUrl(location.href)!=='POST')return null;
  var key=currentPostRouteKeyV44R21R16();
  if(__POST_TARGET_DIALOG_V44R21R16__&&__POST_TARGET_ROUTE_V44R21R16__===key){
    try{if(document.documentElement.contains(__POST_TARGET_DIALOG_V44R21R16__)&&visible(__POST_TARGET_DIALOG_V44R21R16__)&&!postOwnedUiV44R21R16(__POST_TARGET_DIALOG_V44R21R16__))return __POST_TARGET_DIALOG_V44R21R16__;}catch(_){}
  }
  var cands=[],best=null,bestScore=-99999;
  try{cands=Array.prototype.slice.call(document.querySelectorAll('[role="dialog"],div[aria-modal="true"]')).slice(0,300);}catch(_){}
  cands.forEach(function(el){var s=postDialogScoreV44R21R16(el,key);if(s>bestScore){bestScore=s;best=el;}});
  if(best&&bestScore>=6500){__POST_TARGET_DIALOG_V44R21R16__=best;__POST_TARGET_ROUTE_V44R21R16__=key;try{best.__FB_POST_TARGET_DIALOG_SCORE_V44R21R16__=bestScore;}catch(_){}return best;}
  return null;
}

function findPostSurface(type){
  type=type||postTypeFromUrl(location.href);
  if(type==='POST'){var dlg16=findPostTargetDialogV44R21R16();if(dlg16)return dlg16;}
  var roots=[];
  Array.prototype.slice.call(document.querySelectorAll('[role="dialog"],div[aria-modal="true"],div[role="article"],div[role="main"],main')).forEach(function(el){addUniqueRoot(roots,el);});
  Array.prototype.slice.call(document.querySelectorAll('video,canvas')).filter(mediaVisible).forEach(function(v){
    var cur=v;
    for(var depth=0;depth<14&&cur&&cur!==document.body;depth++,cur=cur.parentElement){
      var role=postSurfaceRoleV44R16R2(cur);
      if(role){addUniqueRoot(roots,cur);break;}
    }
    addUniqueRoot(roots,v.parentElement);
  });
  Array.prototype.slice.call(document.querySelectorAll('img')).filter(function(im){
    try{var r=im.getBoundingClientRect();return visible(im)&&r.width>=260&&r.height>=180;}catch(_){return false;}
  }).slice(0,100).forEach(function(im){
    var cur=im;
    for(var depth=0;depth<12&&cur&&cur!==document.body;depth++,cur=cur.parentElement){if(postSurfaceRoleV44R16R2(cur)){addUniqueRoot(roots,cur);break;}}
  });
  /* Reels em web.facebook.com frequentemente usam div[role=main] + canvas/background,
     sem <video> materializado no mundo isolado. A rota direta ainda exige evidência
     visual ou controles de engajamento; não basta apenas a URL. */
  if(type==='REEL'||type==='STORY'){
    var main=document.querySelector('div[role="main"],main');if(main)addUniqueRoot(roots,main);
  }
  var directType=postTypeFromUrl(location.href),best=null,bestScore=-999,bestEvidence=null;
  roots.slice(0,450).forEach(function(el){
    var tx=t(el.innerText||el.textContent||'').slice(0,12000),score=0;
    var visual=visualMediaEvidenceV44R17(el);
    var permalink=el.querySelector&&el.querySelector('a[href*="/posts/"],a[href*="/reel/"],a[href*="/reels/"],a[href*="photo.php?fbid"],a[href*="/videos/"]');
    var author=findAuthorCandidate(el),role=postSurfaceRoleV44R16R2(el);
    var comments=postEngagementEvidenceV44R16R2(tx)||reelEngagementEvidenceV44R17(el),title=postTitleEvidenceV44R16R2(tx);
    if(role==='dialog')score+=45;else if(role==='article')score+=35;else if(role==='main')score+=55;
    if(comments)score+=75;if(permalink)score+=90;if(author)score+=55;if(title)score+=70;
    if(visual.video)score+=(type==='REEL'?220:(type==='STORY'?260:110));
    if(visual.canvas)score+=(type==='REEL'?190:(type==='STORY'?220:80));
    if(visual.largeImage)score+=(type==='PHOTO'?125:(type==='REEL'?120:(type==='STORY'?240:95)));
    if(visual.background)score+=(type==='REEL'?130:(type==='STORY'?210:60));
    if(directType===type)score+=55;
    if(type==='REEL'&&directType==='REEL'&&role==='main'&&(visual.largeVisual||comments))score+=130;
    if(type==='STORY'&&directType==='STORY'&&visual.largeVisual)score+=220;
    if(/Sponsored|Patrocinado|Marketplace|Contacts|Contatos|Meta AI/i.test(tx))score-=70;
    var strongMedia=(type==='REEL'||type==='STORY')?visual.largeVisual:(type==='PHOTO'?visual.largeImage:visual.largeVisual);
    var structural=!!(role||permalink||comments||title);
    var evidence={video:visual.video,canvas:visual.canvas,largeImage:visual.largeImage,background:visual.background,largeVisual:visual.largeVisual,permalink:!!permalink,author:!!author,comments:comments,title:title,role:role,strongMedia:strongMedia,structural:structural,score:score};
    if(score>bestScore){bestScore=score;best=el;bestEvidence=evidence;}
  });
  var threshold=type==='REEL'?115:(type==='STORY'?70:80);
  if(best&&bestScore>=threshold){try{best.__FB_POST_SURFACE_EVIDENCE_V44R17__=bestEvidence;}catch(_){}return best;}
  return null;
}
function detectContextForUrl(url){
  var type=postTypeFromUrl(url);
  if(!type)return {ready:false,type:'',reason:'URL não identifica post, foto, vídeo, Reels ou Story.'};
  var surface=findPostSurface(type);
  if(!surface)return {ready:false,type:type,reason:'URL compatível, mas a superfície visual do conteúdo ainda não foi materializada.'};
  var author=findAuthorCandidate(surface),tx=t(surface.innerText||surface.textContent||'');
  var permalink=!!surface.querySelector('a[href*="/posts/"],a[href*="/reel/"],a[href*="/reels/"],a[href*="photo.php?fbid"],a[href*="/videos/"],a[href*="/stories/"]');
  var comments=postEngagementEvidenceV44R16R2(tx)||reelEngagementEvidenceV44R17(surface);
  var visual=visualMediaEvidenceV44R17(surface);
  var title=postTitleEvidenceV44R16R2(tx),role=postSurfaceRoleV44R16R2(surface);
  var evidence=type==='STORY'?visual.largeVisual:(type==='REEL'?(visual.largeVisual||comments):(type==='PHOTO'?(visual.largeImage||permalink):(visual.largeVisual||permalink||comments||title)));
  var structural=type==='STORY'?!!(role||author||permalink||visual.largeVisual):!!(role||permalink||comments||title);
  var ready=!!(evidence&&structural);
  var reason='';
  if(ready)reason=type==='STORY'?'Story confirmado pela rota direta e pela mídia visível.':(type==='REEL'?'Reels confirmado por rota direta, superfície principal e mídia/controles visíveis.':'Postagem confirmada por URL, mídia/controles visíveis e superfície estrutural.');
  else if(!evidence)reason='A mídia ou os controles do conteúdo ainda não foram confirmados.';
  else reason='A superfície estrutural do conteúdo ainda não foi confirmada.';
  return {ready:ready,type:type,reason:reason,authorObserved:!!author,evidence:{video:visual.video,canvas:visual.canvas,largeImage:visual.largeImage,background:visual.background,largeVisual:visual.largeVisual,permalink:permalink,comments:comments,title:title,role:role}};
}
function detectContext(){return detectContextForUrl(location.href);}
function usernameFromUrl(href){
  try{
    var x=new URL(String(href||''),location.href);
    var id=x.searchParams.get('id');
    if(/\/profile\.php$/i.test(x.pathname)&&id)return 'id:'+id;
    var parts=x.pathname.split('/').filter(Boolean);
    if(parts[0]==='people'&&parts.length>=3)return 'id:'+parts[parts.length-1];
    var first=decodeURIComponent(parts[0]||'');
    if(first&&!RESERVED[first.toLowerCase()])return first;
  }catch(_){}
  return '';
}
function sameProfileIdentity(a,b){var x=profileIdentityFromUrl(a),y=profileIdentityFromUrl(b);return !!(x&&y&&x===y);}
function visualAssetUrlV44R12(el){
  if(!el)return '';
  try{
    var tag=String(el.tagName||'').toLowerCase(),raw=String(el.currentSrc||el.src||'');
    if(!raw&&tag==='img')raw=String(el.getAttribute('src')||'');
    else if(!raw&&tag==='image')raw=String(el.getAttribute('href')||el.getAttributeNS&&el.getAttributeNS('http://www.w3.org/1999/xlink','href')||el.href&&el.href.baseVal||'');
    if(!raw){
      var bg=String((getComputedStyle(el).backgroundImage||el.style&&el.style.backgroundImage||''));
      var m=bg.match(/url\(["']?([^"')]+)["']?\)/i);if(m)raw=m[1];
    }
    return safeMediaUrl(raw);
  }catch(_){return '';}
}
function visualAssetNodesV44R12(root){
  if(!root||!root.querySelectorAll)return [];
  var out=[],seen=new Set();
  function add(el){if(!el||seen.has(el)||!visible(el))return;var u=visualAssetUrlV44R12(el);if(!u)return;seen.add(el);out.push(el);}
  ['img','svg image','[style*="background-image"]'].forEach(function(sel){
    try{Array.prototype.slice.call(root.querySelectorAll(sel)).slice(0,500).forEach(add);}catch(_){}
  });
  /* Facebook also uses computed background-image without an inline style. Restrict
     this fallback to small header scopes to avoid a document-wide style sweep. */
  try{
    var rr=root.getBoundingClientRect?root.getBoundingClientRect():null;
    if(rr&&rr.height<=320){
      Array.prototype.slice.call(root.querySelectorAll('a,div,span')).slice(0,300).forEach(function(el){
        try{if(String(getComputedStyle(el).backgroundImage||'')!=='none')add(el);}catch(_){}
      });
    }
  }catch(_){}
  return out;
}
function boundAuthorAvatar(surface,best){
  if(!surface||!best||!best.href)return {url:'',bound:false,reason:'author_not_confirmed',width:0,height:0};
  var candidates=[],authorRect=null,surfaceRect=null;
  try{authorRect=best.a&&best.a.getBoundingClientRect?best.a.getBoundingClientRect():null;}catch(_){}
  try{surfaceRect=surface.getBoundingClientRect?surface.getBoundingClientRect():null;}catch(_){}
  function add(im,reason,identityBonus){
    try{
      var src=visualAssetUrlV44R12(im),r=im.getBoundingClientRect(),alt=t(im.alt||im.getAttribute&&im.getAttribute('aria-label')||''),score=0;
      if(!src||r.width<20||r.height<20||r.width>240||r.height>240)return;
      var ratio=r.height?r.width/r.height:0;if(ratio<0.70||ratio>1.42)return;
      var bad=(alt+' '+src).toLowerCase();
      if(/emoji|sticker|reaction|tenor|emg1\/v\/t13|static_map|cover|comment as|comentar como|avatar_placeholder/i.test(bad))return;
      if(surfaceRect){
        var y=(r.top+r.height/2)-surfaceRect.top;
        if(y>Math.min(surfaceRect.height*0.58,520))score-=500;
        else if(y<Math.min(surfaceRect.height*0.32,300))score+=100;
      }
      if(authorRect){
        var dy=Math.abs((r.top+r.height/2)-(authorRect.top+authorRect.height/2));
        var dx=authorRect.left-(r.left+r.width);
        if(dy<=28)score+=220;else if(dy<=55)score+=100;else score-=180;
        if(dx>=-20&&dx<=135)score+=210;else if(Math.abs(dx)<=210)score+=45;else score-=180;
      }
      if(Math.abs(r.width-r.height)<=12)score+=55;
      if(r.width>=32&&r.height>=32)score+=35;
      if(r.width>=72&&r.height>=72)score+=25;
      if(best.name&&alt&&normalizeProfileNameV44R3(alt).indexOf(normalizeProfileNameV44R3(best.name))!==-1)score+=180;
      score+=Number(identityBonus||0);
      var article=im.closest&&im.closest('[role="article"]'),authorArticle=best.a&&best.a.closest&&best.a.closest('[role="article"]');
      if(article&&authorArticle&&article===authorArticle)score+=90;
      var dialog=im.closest&&im.closest('[role="dialog"]'),authorDialog=best.a&&best.a.closest&&best.a.closest('[role="dialog"]');
      if(dialog&&authorDialog&&dialog===authorDialog)score+=45;
      candidates.push({url:src,score:score,reason:reason,width:Math.round(r.width),height:Math.round(r.height)});
    }catch(_){}
  }
  try{
    Array.prototype.slice.call(surface.querySelectorAll('a[href]')).forEach(function(link){
      var href=cleanUrl(link.href||link.getAttribute('href')||'');
      if(!sameProfileIdentity(href,best.href))return;
      visualAssetNodesV44R12(link).forEach(function(im){add(im,'same_profile_link_identity',320);});
    });
  }catch(_){}
  try{
    var scope=best.a;
    for(var up=0;up<8&&scope&&scope!==document.body&&scope!==document.documentElement;up++,scope=scope.parentElement){
      var cr=scope.getBoundingClientRect&&scope.getBoundingClientRect();
      if(!cr||cr.height>340)continue;
      visualAssetNodesV44R12(scope).forEach(function(im){add(im,'author_header_geometric_binding',0);});
    }
  }catch(_){}
  candidates.sort(function(a,b){return b.score-a.score;});
  if(candidates[0]&&candidates[0].score>=300)return {url:candidates[0].url,bound:true,reason:candidates[0].reason,width:candidates[0].width,height:candidates[0].height};
  return {url:'',bound:false,reason:'no_profile_bound_avatar',width:0,height:0};
}
function authorSnapshot(){
  var type=postTypeFromUrl(location.href),surface=findPostSurface(type)||document.body;
  var best=findAuthorCandidate(surface),avatar={url:'',bound:false,reason:'author_not_confirmed'};
  if(best){
    avatar=boundAuthorAvatar(surface,best);
    if(!avatar.bound&&document.body&&surface!==document.body){
      var docAvatar=boundAuthorAvatar(document.body,best);
      if(docAvatar&&docAvatar.bound)avatar={url:docAvatar.url,bound:true,reason:'same_profile_link_document'};
    }
  }
  return {
    author:best?best.name:'',
    authorURL:best?best.href:'',
    authorAvatar:avatar.url,
    authorAvatarBound:avatar.bound===true,
    authorAvatarBindingReason:avatar.reason,
    authorAvatarObservedWidth:Number(avatar.width||0),
    authorAvatarObservedHeight:Number(avatar.height||0),
    authorAvatarSourceUrl:avatar.url||'',
    authorProfileIdentity:best?best.identity:'',
    authorUsername:usernameFromUrl(best&&best.href||''),
    capturedAt:new Date().toISOString()
  };
}
function cleanCaption(s){
  var out=t(s);
  var stripHook=window.__FB_STRIP_OPAQUE_CAPTION_V44R21R13__;out=(typeof stripHook==='function')?stripHook(out):out;
  var rx=/(?:\s*)(?:Hide translation|Ocultar tradução|See translation|Ver tradução|See original|Ver original|Rate this translation|Avaliar esta tradução|See more|Ver mais)\s*$/i;
  for(var i=0;i<4&&rx.test(out);i++)out=out.replace(rx,'').trim();
  return out;
}
window.__FB_MERGE_POST_META_V44__=function(meta,snap){
  var out=meta&&typeof meta==='object'?meta:{};
  snap=snap&&typeof snap==='object'?snap:{};
  if(!out.author&&snap.author)out.author=snap.author;
  if(!out.authorURL&&snap.authorURL)out.authorURL=snap.authorURL;
  var outIdentity=profileIdentityFromUrl(out.authorURL||''),snapIdentity=snap.authorProfileIdentity||profileIdentityFromUrl(snap.authorURL||'');
  var identityCompatible=!outIdentity||!snapIdentity||outIdentity===snapIdentity;
  var existingAvatar=safeMediaUrl(out.authorAvatar||out.authorAvatarHighResUrl||out.authorAvatarSourceUrl||'');
  var existingBound=out.authorAvatarBound===true&&!!existingAvatar;
  var snapAvatar=safeMediaUrl(snap.authorAvatar||snap.authorAvatarHighResUrl||snap.authorAvatarSourceUrl||'');
  if(fbIsPhotoContextV44R21R13()&&!identityCompatible){
    snapAvatar='';
    snap.authorAvatarBound=false;
  }
  if(snap.authorAvatarBound===true&&snapAvatar&&identityCompatible){
    out.authorAvatar=snap.authorAvatar||snapAvatar;
    out.authorAvatarBound=true;
    out.authorAvatarBindingReason=snap.authorAvatarBindingReason||'resolved_author_snapshot';
    out.authorAvatarSourceUrl=snap.authorAvatarSourceUrl||snapAvatar;
    out.authorAvatarHighResUrl=snap.authorAvatarHighResUrl||snap.authorAvatarSourceUrl||snapAvatar;
    out.authorAvatarWidth=Number(snap.authorAvatarWidth||snap.authorAvatarObservedWidth||out.authorAvatarWidth||0);
    out.authorAvatarHeight=Number(snap.authorAvatarHeight||snap.authorAvatarObservedHeight||out.authorAvatarHeight||0);
  }else if(existingBound){
    out.authorAvatar=out.authorAvatar||existingAvatar;
    out.authorAvatarBound=true;
    out.authorAvatarBindingReason=out.authorAvatarBindingReason||'existing_exact_header_avatar_preserved';
    out.authorAvatarSourceUrl=out.authorAvatarSourceUrl||existingAvatar;
    out.authorAvatarHighResUrl=out.authorAvatarHighResUrl||out.authorAvatarSourceUrl||existingAvatar;
  }else{
    out.authorAvatar='';out.authorAvatarBound=false;
    out.authorAvatarBindingReason=identityCompatible?(snap.authorAvatarBindingReason||out.authorAvatarBindingReason||'not_observed'):'PHOTO_AUTHOR_IDENTITY_MISMATCH_REJECTED';
    out.authorAvatarSourceUrl='';out.authorAvatarHighResUrl='';out.authorAvatarWidth=0;out.authorAvatarHeight=0;
  }
  out.authorProfileIdentity=profileIdentityFromUrl(out.authorURL||'')||outIdentity||'';
  out.authorUsername=usernameFromUrl(out.authorURL||'')||out.authorUsername||snap.authorUsername||'';
  out.caption=cleanCaption(out.caption||'');
  out.authorSnapshotAt=identityCompatible?(snap.capturedAt||out.authorSnapshotAt||''):(out.authorSnapshotAt||'');
  return out;
};
function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
function safeMediaUrl(u){
  var raw=String(u==null?'':u).trim();
  if(!raw)return '';
  try{
    var x=new URL(raw,location.href);
    if(x.protocol==='https:'||x.protocol==='data:') return x.href;
  }catch(_){}
  return '';
}
function safeLinkUrl(u){
  var raw=String(u==null?'':u).trim();
  if(!raw)return '';
  try{
    var x=new URL(raw,location.href);
    if(x.protocol==='https:'&&/(^|\.)facebook\.com$/i.test(x.hostname)) return x.href;
  }catch(_){}
  return '';
}
function initials(name){
  var p=t(name).split(' ').filter(Boolean).slice(0,2);
  return (p.map(function(x){return x.charAt(0).toUpperCase();}).join('')||'AP').slice(0,2);
}
function formatDateTimeV44R13(raw){var d=new Date(String(raw||''));if(!isFinite(d.getTime()))return 'não registrado';try{return d.toLocaleString('pt-BR',{day:'2-digit',month:'2-digit',year:'numeric',hour:'2-digit',minute:'2-digit',second:'2-digit'});}catch(_){return d.toLocaleString('pt-BR');}}

/* V44R16R3 — linkificação usada pelo renderizador externo.
   A versão completa do motor possui uma função homônima em escopo privado;
   esta variante evita referência cruzada entre escopos e preserva apenas URLs
   observadas ou hashtags presentes no texto. */
function safeAnyHttpUrlOuterV44R16R3(raw){
  try{var x=new URL(String(raw||''),location.href);return (x.protocol==='http:'||x.protocol==='https:')?x.href:'';}catch(_){return '';}
}
function linkifyObservedTextHtmlOuterV44R16R3(raw,entities){
  raw=String(raw||'');if(!raw)return '';
  var matches=[];
  function add(start,end,href,priority){href=safeAnyHttpUrlOuterV44R16R3(href);if(start>=0&&end>start&&href)matches.push({start:start,end:end,href:href,priority:priority||0});}
  (entities||[]).forEach(function(e){var name=String(e&&e.text||''),href=e&&e.url||'';if(!name||name.length<2||!href)return;var from=0,at;while((at=raw.indexOf(name,from))>=0){add(at,at+name.length,href,80);from=at+name.length;}});
  var re=/#([\p{L}\p{N}_-]+)/gu,m;while((m=re.exec(raw)))add(m.index,m.index+m[0].length,'https://www.facebook.com/hashtag/'+encodeURIComponent(m[1]),40);
  var ru=/https?:\/\/[^\s<>()]+/gi;while((m=ru.exec(raw)))add(m.index,m.index+m[0].length,m[0],30);
  matches.sort(function(a,b){return a.start-b.start||(b.end-b.start)-(a.end-a.start)||b.priority-a.priority;});
  var picked=[],cursor=-1;matches.forEach(function(x){if(x.start>=cursor){picked.push(x);cursor=x.end;}});
  var out='',pos=0;picked.forEach(function(x){out+=esc(raw.slice(pos,x.start));out+='<a target="_blank" rel="noopener noreferrer" href="'+esc(x.href)+'">'+esc(raw.slice(x.start,x.end))+'</a>';pos=x.end;});
  return out+esc(raw.slice(pos));
}

function element(doc,tag,cls,html){
  var el=doc.createElement(tag);
  if(cls) el.className=cls;
  if(html!=null) el.innerHTML=html;
  return el;
}

function interactionCatalogOuterV44R21R3(){return [{code:'LIKE',label:'Curtir',emoji:'👍'},{code:'LOVE',label:'Amei',emoji:'❤️'},{code:'CARE',label:'Força',emoji:'🥰'},{code:'HAHA',label:'Haha',emoji:'😂'},{code:'WOW',label:'Uau',emoji:'😮'},{code:'SAD',label:'Triste',emoji:'😢'},{code:'ANGRY',label:'Grr',emoji:'😡'}];}
function interactionDeclaredOuterV44R21R3(bundle){var out={},audit=bundle&&bundle.audit||{},src=[];if(Array.isArray(audit.tabs))src=src.concat(audit.tabs);if(Array.isArray(audit.triggers))src=src.concat(audit.triggers);src.forEach(function(x){var code=String(x&&x.type||'').toUpperCase(),count=Number(x&&x.count||0);if(code&&code!=='ALL'&&code!=='REACTION'&&count>0)out[code]=Math.max(Number(out[code]||0),count);});return out;}
function interactionGroupsOuterV44R21R3(items,bundle){items=Array.isArray(items)?items:[];bundle=bundle&&typeof bundle==='object'?bundle:{};var declared=bundle.declaredByType&&typeof bundle.declaredByType==='object'?bundle.declaredByType:interactionDeclaredOuterV44R21R3(bundle),known={};var groups=interactionCatalogOuterV44R21R3().map(function(meta){known[meta.code]=1;var rows=items.filter(function(it){return String(it&&it.reactionType||'').toUpperCase()===meta.code;});return {code:meta.code,label:meta.label,emoji:meta.emoji,declaredCount:Number(declared[meta.code]||0),observedCount:rows.length,items:rows};});var unknown=items.filter(function(it){return !known[String(it&&it.reactionType||'').toUpperCase()];});if(unknown.length)groups.push({code:'REACTION',label:'Reação não individualizada',emoji:'•',declaredCount:0,observedCount:unknown.length,items:unknown});return groups;}
window.__FB_APPLY_UNIFIED_POST_HTML_V44__=function(html,payload,options){
  if(typeof DOMParser==='undefined') return html;
  var doc=new DOMParser().parseFromString(String(html||''),'text/html');
  var body=doc.body, p=payload||{}, m=p.meta||{}, c=p.counts||{}, a=p.audit||{}, interactionBundle=p.interactions||{}, interactionItems=Array.isArray(interactionBundle.items)?interactionBundle.items:[];
  var layout='vertical';
  doc.title='Raspador de dados de relações e postagens do Facebook — Postagem';
  var style=doc.createElement('style');
  style.id='fb-b35-post-v44-style';
  style.textContent='*{box-sizing:border-box}body{max-width:1500px;margin:0 auto!important;padding:20px 20px 90px!important;background:#f7f7f8!important;color:#111}.v44ToolTitle{font:900 28px Arial,sans-serif;margin:0 0 14px}.v44Hero{background:#e5e7eb!important;color:#111827!important;border:1px solid #cbd5e1!important;border-radius:18px;padding:24px 28px;margin:0 0 14px;display:flex;gap:24px;align-items:center;box-shadow:0 8px 24px rgba(0,0,0,.12)}.v44AvatarLink{display:block;flex:0 0 auto;line-height:0}.v44Avatar,.v44AvatarFallback{width:150px;height:150px;border-radius:50%;object-fit:cover;background:#1877f2;border:4px solid #94a3b8;flex:0 0 auto}.v44AvatarFallback{display:grid;place-items:center;font:900 38px Arial}.v44HeroInfo{min-width:0;flex:1}.v44Name{font:900 28px Arial;line-height:1.1}.v44User{font:500 17px Arial;color:#475569;margin-left:8px}.v44Counts{display:flex;gap:18px;flex-wrap:wrap;margin:11px 0 14px;font:16px Arial}.v44Counts b{font-size:20px;margin-right:4px}.v44Actions{display:flex;gap:8px;flex-wrap:wrap}.v44Pill{display:inline-block;border-radius:999px;padding:9px 18px;background:#1877f2;color:#fff!important;font:900 13px Arial;text-decoration:none}.v44Pill.gray{background:#222}.v44CaptionLabel{font:800 11px Arial;color:#475569;text-transform:uppercase;letter-spacing:.04em;margin-top:13px;margin-bottom:4px}.v44Caption{font:700 14px Arial;color:#111827;white-space:pre-wrap}.v44MetadataTitle{font:900 12px Arial;text-transform:uppercase;letter-spacing:.06em;color:#334155;margin:0 0 8px}.v44HeaderFacts{margin-top:12px;background:#f8fafc;border:1px solid #cbd5e1;border-radius:10px;padding:9px 11px;font:12px Arial;color:#334155}.v44HeaderStory{font-weight:700;margin-bottom:7px;line-height:1.4}.v44FactRow{display:flex;gap:7px;flex-wrap:wrap;margin:3px 0}.v44FactLabel{font-weight:800;color:#475569}.v44HeaderFacts a{color:#0b5ed7;text-decoration:none}.v44HeaderFacts a:hover{text-decoration:underline}.avatar{width:56px!important;height:56px!important}.reply .avatar{width:48px!important;height:48px!important}.v44Chips{display:flex;gap:7px;flex-wrap:wrap;margin-top:11px}.v44Chips span{background:#334155;border-radius:999px;padding:5px 8px;font:600 10px Arial;color:#cbd5e1}.v44Audit{display:grid;grid-template-columns:repeat(5,minmax(130px,1fr));gap:8px;margin:0 0 14px}.v44Audit div{background:#fff;border:1px solid #dbe1ea;border-radius:10px;padding:10px}.v44Audit b{display:block;font:900 9px Arial;text-transform:uppercase;color:#64748b}.v44Audit span{display:block;font:900 15px Arial;margin-top:3px}.v44Content{display:grid;gap:14px;align-items:start}.v44Content.side{grid-template-columns:minmax(320px,42%) minmax(0,58%)}.v44Content.vertical{grid-template-columns:1fr}.v44Media,.v44Comments{min-width:0}.v44Media .mediaBox{margin:0!important;padding:14px!important}.v44Comments>.item{margin:0 0 10px!important}.v44CommentsTitle{font:900 18px Arial;margin:0 0 10px}.v44LayoutNote{background:#eff6ff;border:1px solid #93c5fd;border-radius:10px;padding:8px 10px;margin:0 0 12px;font:700 11px Arial;color:#1e3a8a}.metaTop,h1,body>hr{display:none!important}.plaquinha{top:auto!important;bottom:30px!important;padding:4px 7px!important;font-size:10px!important;line-height:1.15!important;white-space:normal!important;max-width:310px!important}.plaquinha .credit{display:inline!important;margin:0!important;font-size:10px!important}.plaquinha .credit:before{content:" · ";color:#94a3b8}.item{box-shadow:0 1px 3px rgba(0,0,0,.08)!important}.v44NoMedia{background:#fff;border:1px solid #ddd;border-radius:10px;padding:18px;color:#64748b}.v44Footer{font:11px Arial;color:#64748b;margin-top:12px}@media(max-width:980px){.v44Content.side{grid-template-columns:1fr}.v44Hero{align-items:flex-start;padding:16px;gap:14px}.v44Avatar,.v44AvatarFallback{width:92px;height:92px}.v44Name{font-size:21px}.v44User{display:block;margin:3px 0 0}.v44Audit{grid-template-columns:repeat(2,minmax(120px,1fr))}}@media print{.plaquinha{position:static!important;margin:12px 0}.v44Content.side{grid-template-columns:1fr}}';
  doc.head.appendChild(style);
  var interactionStyle=doc.createElement('style');
  interactionStyle.id='fb-b35-post-v44-interactions-style';
  interactionStyle.textContent='#v44InteractionsToggle{position:absolute;opacity:0;pointer-events:none;width:1px;height:1px}.v44InteractionsButton{cursor:pointer;border:0}.v44InteractionsPanel{display:none;background:#fff;border:1px solid #cbd5e1;border-radius:14px;padding:14px;margin:0 0 14px}.v44InteractionsPanel h2{font:900 18px Arial;margin:0 0 4px}.v44InteractionsSummary{font:12px Arial;color:#64748b;margin-bottom:10px}.v44InteractionLimitNotice{font:700 11px Arial;color:#7c2d12;background:#fff7ed;border:1px solid #fdba74;border-radius:9px;padding:8px 10px;margin:0 0 11px}.v44ReactionSummaryBar{display:flex;flex-wrap:wrap;gap:6px;margin:0 0 12px}.v44ReactionSummaryChip{font:800 10px Arial;background:#eef2ff;border:1px solid #c7d2fe;border-radius:999px;padding:5px 8px;color:#312e81}.v44ReactionGroup{border-top:1px solid #e2e8f0;padding-top:12px;margin-top:12px}.v44ReactionGroupHeader{display:flex;justify-content:space-between;gap:12px;align-items:center;margin-bottom:8px}.v44ReactionGroupTitle{font:900 14px Arial}.v44ReactionGroupCount{font:11px Arial;color:#64748b;text-align:right}.v44InteractionsGrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:9px}.v44InteractionCard{display:flex;align-items:center;gap:10px;padding:9px;border:1px solid #e2e8f0;border-radius:11px;background:#f8fafc;min-width:0}.v44InteractionAvatar{width:58px;height:58px;border-radius:50%;object-fit:cover;border:2px solid #cbd5e1;background:#e2e8f0;flex:0 0 auto}.v44InteractionAvatarFallback{width:58px;height:58px;border-radius:50%;display:grid;place-items:center;background:#1877f2;color:#fff;font:900 18px Arial;flex:0 0 auto}.v44InteractionInfo{min-width:0;flex:1}.v44InteractionName{font:800 13px Arial;display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.v44InteractionReaction{font:11px Arial;color:#475569;margin-top:4px}.v44InteractionHd{font:10px Arial;color:#64748b;margin-top:3px}#v44InteractionsToggle:checked~.v44InteractionsPanel{display:block}@media(max-width:720px){.v44InteractionsGrid{grid-template-columns:1fr}}';
  doc.head.appendChild(interactionStyle);

  var plaque=doc.querySelector('.plaquinha');
  if(plaque){
    var pd=(String(plaque.textContent||'').match(/\d{2}\/\d{2}\/\d{4},?\s*\d{2}:\d{2}:\d{2}/)||[])[0]||formatDateTimeV44R13(a.collectedAt||a.finishedAt||new Date().toISOString());
    plaque.innerHTML='<span>Status do Export — '+esc(pd)+'</span><br><span class="credit">Script de raspagem desenvolvido por <a target="_blank" href="https://www.instagram.com/guilhermecaselli/">Guilherme Caselli</a></span>';
  }
  var oldMeta=doc.querySelector('.metaTop');
  var media=doc.querySelector('.metaTop .mediaBox')||doc.querySelector('body > .mediaBox');
  var items=Array.prototype.slice.call(doc.querySelectorAll('body > .item'));
  if(media&&media.parentNode) media.parentNode.removeChild(media);
  items.forEach(function(x){if(x.parentNode)x.parentNode.removeChild(x);});
  Array.prototype.slice.call(doc.querySelectorAll('body > h1,body > hr,body > .metaTop')).forEach(function(x){x.remove();});

  var title=element(doc,'div','v44ToolTitle','Raspador de dados de relações e postagens do Facebook');
  var hero=element(doc,'section','v44Hero');
  hero.setAttribute('data-report-kind','post');
  hero.style.setProperty('background','#e5e7eb','important');
  hero.style.setProperty('color','#111827','important');
  hero.style.setProperty('border','1px solid #cbd5e1','important');
  var authorLink=safeLinkUrl(m.authorURL||'');
  var avatar=safeMediaUrl(m.authorAvatar||'');
  if(avatar){
    var avatarHref=safeMediaUrl(m.authorAvatarHighResUrl||m.authorAvatarSourceUrl||'')||authorLink||avatar;
    var avatarA=doc.createElement('a');avatarA.className='v44AvatarLink';avatarA.href=avatarHref;avatarA.target='_blank';avatarA.rel='noopener noreferrer';avatarA.title='Abrir avatar em alta resolução';
    var im=doc.createElement('img');im.className='v44Avatar';im.src=avatar;im.alt=m.author||'Autor da postagem';avatarA.appendChild(im);hero.appendChild(avatarA);
  }else{
    hero.appendChild(element(doc,'div','v44AvatarFallback',esc(initials(m.author||''))));
  }
  var info=element(doc,'div','v44HeroInfo');
  var name=esc(m.author||'Autor não observado');
  var user=esc(m.authorUsername||'');
  info.appendChild(element(doc,'div','', '<span class="v44Name">'+name+'</span>'+(user?'<span class="v44User">| '+user+'</span>':'')));
  info.appendChild(element(doc,'div','v44Counts',
    '<span><b>'+esc(c.like==null?'—':c.like)+'</b>reações</span>'+
    '<span><b>'+esc(c.comment==null?'—':c.comment)+'</b>comentários declarados</span>'+
    '<span><b>'+esc(p.L1==null?0:p.L1)+'</b>comentários carregados</span>'+
    '<span><b>'+esc(p.L2==null?0:p.L2)+'</b>respostas</span>'+
    '<span><b>'+esc(c.share==null?'—':c.share)+'</b>compartilhamentos</span>'+
    (c.view!=null?'<span><b>'+esc(c.view)+'</b>visualizações</span>':'')
  ));
  var acts=element(doc,'div','v44Actions');
  var postLink=safeLinkUrl(m.postURL||'');
  if(authorLink) acts.appendChild(element(doc,'a','v44Pill','Perfil no Facebook'));
  if(authorLink){acts.lastChild.href=authorLink;acts.lastChild.target='_blank';acts.lastChild.rel='noopener noreferrer';}
  if(postLink){var ap=element(doc,'a','v44Pill gray','Abrir postagem original');ap.href=postLink;ap.target='_blank';ap.rel='noopener noreferrer';acts.appendChild(ap);}
  var mediaUrl=(p.media&&p.media.url)||'';
  var safeOriginalMedia=safeMediaUrl(mediaUrl);
  if(safeOriginalMedia){var am=element(doc,'a','v44Pill gray','Mídia original');am.href=safeOriginalMedia;am.target='_blank';am.rel='noopener noreferrer';acts.appendChild(am);}
  if(interactionItems.length||Number(c.like||0)>0){var buttonDeclared=Number(interactionBundle.declaredTotal||c.like||0),buttonObserved=Number(interactionItems.length||0),buttonCountText=(buttonDeclared&&buttonObserved<buttonDeclared)?(buttonObserved+' visíveis / '+buttonDeclared+' declaradas'):(buttonDeclared||buttonObserved);var il=element(doc,'label','v44Pill gray v44InteractionsButton','Interações ('+esc(buttonCountText)+')');il.setAttribute('for','v44InteractionsToggle');il.setAttribute('role','button');il.setAttribute('tabindex','0');acts.appendChild(il);}
  info.appendChild(acts);
  info.appendChild(element(doc,'div','v44CaptionLabel','Texto da postagem'));
  info.appendChild(element(doc,'div','v44Caption',linkifyObservedTextHtmlOuterV44R16R3(m.caption||'Texto não observado.',m.captionEntities||[])));

  var facts=element(doc,'div','v44HeaderFacts');
  facts.appendChild(element(doc,'div','v44MetadataTitle','Metadados da postagem'));
  var exactDate=m.postDateExactText||(m.postDateISO?formatDateTimeV44R13(m.postDateISO):'');
  function fact(label,html){if(!html)return;facts.appendChild(element(doc,'div','v44FactRow','<span class="v44FactLabel">'+esc(label)+'</span><span>'+html+'</span>'));}
  if(m.headerStoryText){fact('Atividade:',linkifyObservedTextHtmlOuterV44R16R3(m.headerStoryText,m.headerEntities||[]));}
  if(exactDate){var du=safeLinkUrl(m.postDateURL||m.postURL||'');fact('Data da postagem:',du?'<a target="_blank" rel="noopener noreferrer" href="'+esc(du)+'">'+esc(exactDate)+'</a>':esc(exactDate));}
  if(m.photoId)fact('ID da foto:',esc(m.photoId));if(m.albumSetId)fact('Conjunto/álbum observado:',esc(m.albumSetId));if(p.media&&p.media.type==='photos'&&p.media.photos&&p.media.photos.length){var mph=p.media.photos[0]||{},mdesc=esc(p.media.photos.length)+' foto(s) materializada(s)';if(mph.naturalWidth||mph.width)mdesc+=' · '+esc(mph.naturalWidth||mph.width)+' × '+esc(mph.naturalHeight||mph.height)+' px';fact('Mídia observada:',mdesc);}
  if(m.locationText){var lu=safeLinkUrl(m.locationURL||'');fact('Localidade:',lu?'<a target="_blank" rel="noopener noreferrer" href="'+esc(lu)+'">'+esc(m.locationText)+'</a>':esc(m.locationText));}
  if((m.taggedPeople||[]).length||m.taggedPeopleOtherCount){var peopleHtml=(m.taggedPeople||[]).map(function(x){var u=safeLinkUrl(x.url||'');return u?'<a target="_blank" rel="noopener noreferrer" href="'+esc(u)+'">'+esc(x.text||'')+'</a>':esc(x.text||'');}).join(', ');if(m.taggedPeopleOtherCount)peopleHtml+=(peopleHtml?', ':'')+esc(m.taggedPeopleOtherCount)+' pessoa(s) não materializada(s)';fact('Pessoas marcadas:',peopleHtml);}
  if((m.places||[]).length){fact('Lugares relacionados:',(m.places||[]).map(function(x){var u=safeLinkUrl(x.url||'');return u?'<a target="_blank" rel="noopener noreferrer" href="'+esc(u)+'">'+esc(x.text||'')+'</a>':esc(x.text||'');}).join(', '));}
  if(m.privacyText)fact('Visibilidade:',esc(m.privacyText));
  var metricParts=[];if(c.like!=null)metricParts.push(esc(c.like)+' reações');if(c.comment!=null)metricParts.push(esc(c.comment)+' comentários');if(c.share!=null)metricParts.push(esc(c.share)+' compartilhamentos');if(c.view!=null)metricParts.push(esc(c.view)+' visualizações');if(metricParts.length)fact('Métricas observadas:',metricParts.join(' · '));
  info.appendChild(facts);
  hero.appendChild(info);

  var terminal=a.collectionTerminal||{},observed=Number(p.L1||0)+Number(p.L2||0),declared=Number(c.comment||terminal.declaredTarget||0);
  var audit=element(doc,'div','v44Audit',
    '<div><b>Reações</b><span>'+esc(c.like==null?'—':c.like)+'</span></div>'+ 
    '<div><b>Registros de comentários</b><span>'+esc(observed)+(declared?(' / '+esc(declared)):'')+'</span></div>'+ 
    '<div><b>Respostas</b><span>'+esc(p.L2||0)+'</span></div>'+ 
    '<div><b>Compartilhamentos</b><span>'+esc(c.share==null?'—':c.share)+'</span></div>'+ 
    '<div><b>Visualizações</b><span>'+esc(c.view==null?'—':c.view)+'</span></div>'
  );
  var interactionToggle=doc.createElement('input');interactionToggle.type='checkbox';interactionToggle.id='v44InteractionsToggle';interactionToggle.setAttribute('aria-hidden','true');
  var interactionsPanel=element(doc,'section','v44InteractionsPanel');interactionsPanel.id='v44InteractionsPanel';
  interactionsPanel.appendChild(element(doc,'h2','', 'Interações com a postagem'));
  var declaredInteractions=Number(interactionBundle.declaredTotal||c.like||0),statusInteractions=String(interactionBundle.status||'não registrado');
  var limitationText=interactionBundle.accessLimited?' · limitação do Facebook: somente identidades disponibilizadas à sessão foram materializadas':'';interactionsPanel.appendChild(element(doc,'div','v44InteractionsSummary',esc(interactionItems.length)+' perfil(is) materializado(s)'+(declaredInteractions?' de '+esc(declaredInteractions)+' reação(ões) declarada(s)':'')+' · status: '+esc(statusInteractions)+limitationText));if(interactionBundle.accessLimited){interactionsPanel.appendChild(element(doc,'div','v44InteractionLimitNotice','O Facebook informou que o total de reações pode ser exibido, mas restringiu os nomes materializados nesta sessão. A ferramenta registra a contagem declarada e somente os perfis efetivamente disponibilizados, sem preencher identidades ausentes.'));}var netAudit=interactionBundle.networkCapture||interactionBundle.audit&&interactionBundle.audit.networkCapture||null;if(netAudit&&Number(netAudit.relevantPayloads||0)>0){var netMsg='Diagnóstico interno: '+esc(netAudit.relevantPayloads)+' resposta(s) GraphQL de reações observada(s)';if(Number(netAudit.observedProfiles||0)>0)netMsg+=' · '+esc(netAudit.observedProfiles)+' perfil(is) retornado(s) ao navegador';else if(netAudit.serverReturnedNoActorIdentities===true)netMsg+=' · nenhuma identidade de reator foi devolvida ao navegador';interactionsPanel.appendChild(element(doc,'div','v44InteractionLimitNotice',netMsg+'.'));}
  function appendInteractionCardOuterV44R21R3(grid,it){var card=element(doc,'article','v44InteractionCard'),profile=safeLinkUrl(it.profileUrl||''),avatarSrc=safeMediaUrl(it.avatar||it.avatarObserved||''),avatarHref=safeMediaUrl(it.avatarHighResUrl||it.avatarObserved||'')||profile||avatarSrc;if(avatarSrc){var ia=doc.createElement('a');ia.href=avatarHref;ia.target='_blank';ia.rel='noopener noreferrer';ia.title='Abrir foto em alta resolução';var ii=doc.createElement('img');ii.className='v44InteractionAvatar';ii.src=avatarSrc;ii.alt=it.name||'Perfil que interagiu';ia.appendChild(ii);card.appendChild(ia);}else card.appendChild(element(doc,'div','v44InteractionAvatarFallback',esc(initials(it.name||''))));var inf=element(doc,'div','v44InteractionInfo');if(profile){var nl=element(doc,'a','v44InteractionName',esc(it.name||'Perfil não identificado'));nl.href=profile;nl.target='_blank';nl.rel='noopener noreferrer';inf.appendChild(nl);}else inf.appendChild(element(doc,'span','v44InteractionName',esc(it.name||'Perfil não identificado')));inf.appendChild(element(doc,'div','v44InteractionReaction',esc(it.reactionEmoji||'•')+' '+esc(it.reactionLabel||it.reactionType||'Reação')));if(it.avatarWidth||it.avatarHeight)inf.appendChild(element(doc,'div','v44InteractionHd',esc(it.avatarWidth||0)+' × '+esc(it.avatarHeight||0)+' px'));card.appendChild(inf);grid.appendChild(card);}
  var reactionGroups=interactionGroupsOuterV44R21R3(interactionItems,interactionBundle),summaryBar=element(doc,'div','v44ReactionSummaryBar');
  reactionGroups.forEach(function(g){var dc=Number(g.declaredCount||0);summaryBar.appendChild(element(doc,'span','v44ReactionSummaryChip',esc(g.emoji||'•')+' '+esc(g.label||g.code||'Reação')+': '+esc(g.observedCount||0)+(dc?' / '+esc(dc):'')));});
  if(reactionGroups.length)interactionsPanel.appendChild(summaryBar);
  reactionGroups.forEach(function(g){var section=element(doc,'section','v44ReactionGroup'),header=element(doc,'div','v44ReactionGroupHeader'),dc=Number(g.declaredCount||0);header.appendChild(element(doc,'div','v44ReactionGroupTitle',esc(g.emoji||'•')+' '+esc(g.label||g.code||'Reação')));header.appendChild(element(doc,'div','v44ReactionGroupCount',esc(g.observedCount||0)+' perfil(is)'+(dc?' de '+esc(dc)+' declarado(s)':'')));section.appendChild(header);var grid=element(doc,'div','v44InteractionsGrid');(g.items||[]).forEach(function(it){appendInteractionCardOuterV44R21R3(grid,it);});if(!(g.items||[]).length)grid.appendChild(element(doc,'div','v44NoMedia','Nenhum perfil materializado para este tipo de reação.'));section.appendChild(grid);interactionsPanel.appendChild(section);});
  if(!reactionGroups.length)interactionsPanel.appendChild(element(doc,'div','v44NoMedia','Nenhum perfil de interação foi materializado no DOM.'));
  var content=element(doc,'div','v44Content '+layout);
  var mediaWrap=element(doc,'section','v44Media');
  if(media) mediaWrap.appendChild(media); else mediaWrap.appendChild(element(doc,'div','v44NoMedia','Nenhuma mídia foi materializada para esta postagem.'));
  var commentsWrap=element(doc,'section','v44Comments');
  commentsWrap.appendChild(element(doc,'div','v44CommentsTitle','Comentários e respostas'));
  if(items.length) items.forEach(function(x){commentsWrap.appendChild(x);});
  else commentsWrap.appendChild(element(doc,'div','v44NoMedia','Nenhum comentário foi materializado.'));
  content.appendChild(mediaWrap);content.appendChild(commentsWrap);
  var footer=element(doc,'div','v44Footer','Origem, horário, versão, status e hashes dos bytes exportados permanecem registrados no JSON e no laudo de integridade.');

  var frag=doc.createDocumentFragment();
  frag.appendChild(interactionToggle);frag.appendChild(title);frag.appendChild(hero);frag.appendChild(audit);frag.appendChild(interactionsPanel);frag.appendChild(content);frag.appendChild(footer);
  if(plaque&&plaque.nextSibling) body.insertBefore(frag,plaque.nextSibling); else body.insertBefore(frag,body.firstChild);
  return '<!DOCTYPE html>'+doc.documentElement.outerHTML;
};

window.__FB_POST_SCRAPER_V44_TEST__={
  postTypeFromUrl:postTypeFromUrl,
  profileIdentityFromUrl:profileIdentityFromUrl,
  findPostSurface:findPostSurface,
  findAuthorCandidate:findAuthorCandidate,
  boundAuthorAvatar:boundAuthorAvatar,
  visualAssetUrlV44R12:visualAssetUrlV44R12,
  visualAssetNodesV44R12:visualAssetNodesV44R12,
  detectContextForUrl:detectContextForUrl,
  visualMediaEvidenceV44R17:visualMediaEvidenceV44R17,
  reelEngagementEvidenceV44R17:reelEngagementEvidenceV44R17,
  canonicalProfilePageV44R3:canonicalProfilePageV44R3,
  profileTitleMatchesV44R3:profileTitleMatchesV44R3,
  safeMediaUrl:safeMediaUrl,
  prepareAuthorSnapshotParallelV44R10:prepareAuthorSnapshotParallelV44R10,
  embedAuthorAvatarV44R10:embedAuthorAvatarV44R10,
  /* As três funções abaixo pertencem ao escopo do motor original e não podem
     ser referenciadas durante a inicialização do módulo externo. A V44R16R1
     lançava ReferenceError aqui e interrompia toda a extensão. */
  postHeaderMetadataV44R16:null,
  mergePostHeaderMetadataV44R16:null,
  linkifyObservedTextHtmlV44R16:null
};


function canonicalProfilePageV44R3(href){
  try{
    var x=new URL(String(href||''),location.href);
    if(!/(^|\.)facebook\.com$/i.test(x.hostname)||x.protocol!=='https:')return '';
    x.hash='';
    if(/\/profile\.php$/i.test(x.pathname)){
      var id=x.searchParams.get('id');
      return id?'https://www.facebook.com/profile.php?id='+encodeURIComponent(id):'';
    }
    var parts=x.pathname.split('/').filter(Boolean);
    var first=decodeURIComponent(parts[0]||'');
    if(!first||RESERVED[first.toLowerCase()])return '';
    return 'https://www.facebook.com/'+encodeURIComponent(first);
  }catch(_){return '';}
}
function normalizeProfileNameV44R3(s){
  var raw=t(s).toLowerCase();
  try{raw=raw.normalize('NFD').replace(/[\u0300-\u036f]/g,'');}catch(_){}
  return raw.replace(/[^a-z0-9]/g,'');
}
function profileTitleMatchesV44R3(expected,observed){
  var a=normalizeProfileNameV44R3(expected),b=normalizeProfileNameV44R3(observed);
  if(!a||!b)return true;
  return a===b||a.indexOf(b)!==-1||b.indexOf(a)!==-1;
}
function runtimeMessageV44R3(message){
  return new Promise(function(resolve){
    try{
      chrome.runtime.sendMessage(message,function(response){
        if(chrome.runtime.lastError){resolve(null);return;}
        resolve(response||null);
      });
    }catch(_){resolve(null);}
  });
}
function validateAvatarImageV44R3(url){
  var raw=safeMediaUrl(url);
  if(!raw||/facebook\.com\/(?:reel|watch|photo|[^/?#]+\/posts)\b/i.test(raw))return Promise.resolve(false);
  return new Promise(function(resolve){
    var done=false,timer=setTimeout(function(){if(!done){done=true;resolve(false);}},6500);
    try{
      var im=new Image();
      im.onload=function(){
        if(done)return;done=true;clearTimeout(timer);
        var w=Number(im.naturalWidth||im.width||0),h=Number(im.naturalHeight||im.height||0);
        var ratio=h?w/h:0;
        resolve(w>=40&&h>=40&&ratio>=0.70&&ratio<=1.43);
      };
      im.onerror=function(){if(!done){done=true;clearTimeout(timer);resolve(false);}};
      im.src=raw;
    }catch(_){if(!done){done=true;clearTimeout(timer);resolve(false);}}
  });
}
function prepareAuthorSnapshotAsyncV44R3(snap){
  snap=snap&&typeof snap==='object'?snap:{};
  if(snap.authorAvatarBound===true&&safeMediaUrl(snap.authorAvatar||''))return Promise.resolve(snap);
  var profileUrl=canonicalProfilePageV44R3(snap.authorURL||'');
  if(!profileUrl)return Promise.resolve(snap);
  return runtimeMessageV44R3({type:'B35_FETCH_PROFILE_AVATAR_V44R3',profileUrl:profileUrl,authorName:snap.author||''})
    .then(function(response){
      if(!response||!response.ok||!response.avatarUrl)return snap;
      if(!profileTitleMatchesV44R3(snap.author||'',response.profileTitle||'')){
        snap.authorAvatarBindingReason='profile_page_title_mismatch';
        return snap;
      }
      return validateAvatarImageV44R3(response.avatarUrl).then(function(valid){
        if(!valid){
          snap.authorAvatarBindingReason='profile_page_avatar_invalid';
          return snap;
        }
        snap.authorAvatar=safeMediaUrl(response.avatarUrl);
        snap.authorAvatarBound=true;
        snap.authorAvatarBindingReason='profile_page_og_image_exact_identity';
        snap.authorProfileCanonicalUrl=profileUrl;
        snap.authorAvatarResolvedAt=new Date().toISOString();
        return snap;
      });
    })
    .catch(function(){return snap;});
}


/* V44R5 — exportação manual multiformato preservada; correções restritas ao menu e ao motor de coleta. */
var __POST_PREPARED_EXPORT_V44R4__=null;
function postExportSafeNameV44R4(s){
  return String(s||'postagem').normalize?String(s||'postagem').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-zA-Z0-9._-]+/g,'_').replace(/^_+|_+$/g,'').slice(0,70)||'postagem':String(s||'postagem').replace(/[^a-zA-Z0-9._-]+/g,'_').slice(0,70)||'postagem';
}
function postExportStampV44R4(){return new Date().toISOString().replace(/[:.]/g,'-');}
function postExportBaseV44R4(payload){
  var m=payload&&payload.meta||{},id=m.authorUsername||m.author||m.authorID||'postagem';
  return 'fb_postagem_'+postExportSafeNameV44R4(id)+'_'+postExportStampV44R4();
}
function postBytesV44R4(data){
  if(data instanceof Uint8Array)return data;
  if(data instanceof ArrayBuffer)return new Uint8Array(data);
  if(ArrayBuffer.isView(data))return new Uint8Array(data.buffer,data.byteOffset,data.byteLength);
  return new TextEncoder().encode(String(data==null?'':data));
}
async function postHashV44R4(algo,data){
  var bytes=postBytesV44R4(data),buf=await crypto.subtle.digest(algo,bytes);
  return Array.from(new Uint8Array(buf)).map(function(b){return b.toString(16).padStart(2,'0');}).join('');
}
function postDownloadV44R4(name,data,mime){
  return new Promise(function(resolve,reject){
    try{
      var blob=new Blob([data],{type:mime||'application/octet-stream'}),url=URL.createObjectURL(blob),a=document.createElement('a');
      a.href=url;a.download=name;a.rel='noopener';document.body.appendChild(a);a.click();a.remove();
      setTimeout(function(){try{URL.revokeObjectURL(url);}catch(_){}resolve({name:name,bytes:blob.size,mime:mime||'application/octet-stream'});},500);
    }catch(e){reject(e);}
  });
}
function postWinAnsiV44R4(str){
  var map={8364:128,8218:130,402:131,8222:132,8230:133,8224:134,8225:135,710:136,8240:137,352:138,8249:139,338:140,381:142,8216:145,8217:146,8220:147,8221:148,8226:149,8211:150,8212:151,732:152,8482:153,353:154,8250:155,339:156,382:158,376:159},out='';
  String(str||'').split('').forEach(function(ch){var c=ch.charCodeAt(0);out+=String.fromCharCode(c<=255?c:(map[c]!=null?map[c]:63));});return out;
}
function postPdfEscapeV44R4(s){return postWinAnsiV44R4(s).replace(/\\/g,'\\\\').replace(/\(/g,'\\(').replace(/\)/g,'\\)').replace(/[\r\n]+/g,' ');}
function postWrapV44R4(text,max){
  var words=String(text||'').replace(/\s+/g,' ').trim().split(' '),out=[],line='';max=max||96;
  words.forEach(function(w){if(!w)return;var n=line?line+' '+w:w;if(n.length<=max)line=n;else{if(line)out.push(line);line=w;}});if(line)out.push(line);return out.length?out:[''];
}
function postPagedPdfV44R4(lines,title){
  var all=[];postWrapV44R4(title||'Relatório',92).forEach(function(x){all.push(x);});all.push('');
  (lines||[]).forEach(function(line){postWrapV44R4(line,96).forEach(function(x){all.push(x);});});
  var per=48,pages=[];for(var i=0;i<all.length;i+=per)pages.push(all.slice(i,i+per));if(!pages.length)pages=[['']];
  var objs=[],pageObjs=[],contentObjs=[];for(i=0;i<pages.length;i++){pageObjs.push(4+i*2);contentObjs.push(5+i*2);}
  objs[1]='<< /Type /Catalog /Pages 2 0 R >>';
  objs[2]='<< /Type /Pages /Kids ['+pageObjs.map(function(n){return n+' 0 R';}).join(' ')+'] /Count '+pages.length+' >>';
  objs[3]='<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>';
  pages.forEach(function(page,idx){
    var stream='BT /F1 9 Tf 36 806 Td 13.5 TL ';
    page.forEach(function(line,j){if(j)stream+='T* ';stream+='('+postPdfEscapeV44R4(line)+') Tj ';});stream+='ET';
    objs[pageObjs[idx]]='<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 3 0 R >> >> /Contents '+contentObjs[idx]+' 0 R >>';
    objs[contentObjs[idx]]='<< /Length '+stream.length+' >>\nstream\n'+stream+'\nendstream';
  });
  var out='%PDF-1.4\n',offs=[0],maxObj=contentObjs[contentObjs.length-1];
  for(i=1;i<=maxObj;i++){offs[i]=out.length;out+=i+' 0 obj\n'+(objs[i]||'<<>>')+'\nendobj\n';}
  var xref=out.length;out+='xref\n0 '+(maxObj+1)+'\n0000000000 65535 f \n';
  for(i=1;i<=maxObj;i++)out+=String(offs[i]).padStart(10,'0')+' 00000 n \n';
  out+='trailer << /Size '+(maxObj+1)+' /Root 1 0 R >>\nstartxref\n'+xref+'\n%%EOF';
  var bytes=new Uint8Array(out.length);for(i=0;i<out.length;i++)bytes[i]=out.charCodeAt(i)&255;return bytes;
}
function postFlattenRowsV44R4(payload){
  var out=[];
  function walk(rows,level,parent){(rows||[]).forEach(function(r){
    var rec={level:level,parent:parent||'',num:r.num||'',author:r.author||'',authorHref:r.authorHref||'',text:r.text||'',date:r.date||'',dateISO:r.dateISO||'',likes:r.likes==null?'':r.likes,reactions:r.reacts&&r.reacts.total!=null?r.reacts.total:'',media:(r.media||[]).map(function(m){return m&&m.url||'';}).filter(Boolean).join(' | ')};
    out.push(rec);walk(r.replies||[],level+1,r.sourceId||r.num||parent||'');
  });}
  walk(payload&&payload.rows||[],1,'');return out;
}
function postCsvCellV44R4(v){var s=String(v==null?'':v).replace(/[\r\n]+/g,' ');if(/^[\t ]*[=+\-@]/.test(s))s="'"+s;return '"'+s.replace(/"/g,'""')+'"';}
function postEntitiesTextV44R16(list){return (list||[]).map(function(x){return (x.text||'')+(x.url?' <'+x.url+'>':'');}).filter(Boolean).join(' | ');}
function postMetaColumnsV44R16(payload){var m=payload&&payload.meta||{},c=payload&&payload.counts||{};return [m.author||'',m.authorURL||'',m.postDateExactText||m.postDateText||m.postDateISO||'',m.locationText||'',m.locationURL||'',m.headerStoryText||'',postEntitiesTextV44R16(m.taggedPeople),postEntitiesTextV44R16(m.places),m.privacyText||'',c.like==null?'':c.like,c.comment==null?'':c.comment,c.share==null?'':c.share,c.view==null?'':c.view];}
function postMakeCsvV44R4(payload){
  var head=['Autor da postagem','Perfil da postagem','Data da postagem','Localidade','URL da localidade','Cabeçalho/atividade','Pessoas marcadas','Lugares relacionados','Visibilidade','Reações da postagem','Comentários declarados','Compartilhamentos','Visualizações','Nível','Pai','Número','Autor/Perfil','Link do perfil','Texto','Data','Data ISO','Curtidas','Reações','Mídias','Tipo de registro','Tipo de reação','Avatar HD'];
  var pm=postMetaColumnsV44R16(payload),rows=postFlattenRowsV44R4(payload).map(function(r){return pm.concat([r.level,r.parent,r.num,r.author,r.authorHref,r.text,r.date,r.dateISO,r.likes,r.reactions,r.media,'COMENTARIO','','']);});
  ((payload&&payload.interactions&&payload.interactions.items)||[]).forEach(function(it){rows.push(pm.concat(['','','',it.name||'',it.profileUrl||'','','','','','','','INTERACAO',it.reactionLabel||it.reactionType||'',it.avatarHighResUrl||it.avatarObserved||'']));});
  return '\ufeff'+[head].concat(rows).map(function(row){return row.map(postCsvCellV44R4).join(';');}).join('\r\n');
}
function postXmlV44R4(s){return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&apos;');}
function postColV44R4(n){var s='';while(n>0){var m=(n-1)%26;s=String.fromCharCode(65+m)+s;n=Math.floor((n-1)/26);}return s;}
function postCrcTableV44R4(){var t=[];for(var n=0;n<256;n++){var c=n;for(var k=0;k<8;k++)c=(c&1)?(0xedb88320^(c>>>1)):(c>>>1);t[n]=c>>>0;}return t;}
var __POST_CRC_V44R4__=postCrcTableV44R4();
function postCrcV44R4(bytes){var c=0xffffffff;for(var i=0;i<bytes.length;i++)c=__POST_CRC_V44R4__[(c^bytes[i])&255]^(c>>>8);return (c^0xffffffff)>>>0;}
function postU16V44R4(n){return [n&255,(n>>>8)&255];}function postU32V44R4(n){return [n&255,(n>>>8)&255,(n>>>16)&255,(n>>>24)&255];}
function postZipV44R4(entries){
  var enc=new TextEncoder(),locals=[],centrals=[],offset=0;
  entries.forEach(function(e){var name=enc.encode(e.name),data=e.data instanceof Uint8Array?e.data:enc.encode(String(e.data||'')),crc=postCrcV44R4(data),size=data.length,p=0;
    var local=new Uint8Array(30+name.length+size);local.set([80,75,3,4],p);p+=4;local.set(postU16V44R4(20),p);p+=2;local.set(postU16V44R4(0x0800),p);p+=2;local.set(postU16V44R4(0),p);p+=2;local.set(postU16V44R4(0),p);p+=2;local.set(postU16V44R4(0),p);p+=2;local.set(postU32V44R4(crc),p);p+=4;local.set(postU32V44R4(size),p);p+=4;local.set(postU32V44R4(size),p);p+=4;local.set(postU16V44R4(name.length),p);p+=2;local.set(postU16V44R4(0),p);p+=2;local.set(name,p);p+=name.length;local.set(data,p);locals.push(local);
    var central=new Uint8Array(46+name.length);p=0;central.set([80,75,1,2],p);p+=4;central.set(postU16V44R4(20),p);p+=2;central.set(postU16V44R4(20),p);p+=2;central.set(postU16V44R4(0x0800),p);p+=2;central.set(postU16V44R4(0),p);p+=2;central.set(postU16V44R4(0),p);p+=2;central.set(postU16V44R4(0),p);p+=2;central.set(postU32V44R4(crc),p);p+=4;central.set(postU32V44R4(size),p);p+=4;central.set(postU32V44R4(size),p);p+=4;central.set(postU16V44R4(name.length),p);p+=2;central.set(postU16V44R4(0),p);p+=2;central.set(postU16V44R4(0),p);p+=2;central.set(postU16V44R4(0),p);p+=2;central.set(postU16V44R4(0),p);p+=2;central.set(postU32V44R4(0),p);p+=4;central.set(postU32V44R4(offset),p);p+=4;central.set(name,p);centrals.push(central);offset+=local.length;
  });
  var centralSize=centrals.reduce(function(a,b){return a+b.length;},0),end=new Uint8Array(22),p=0;end.set([80,75,5,6],p);p+=4;end.set(postU16V44R4(0),p);p+=2;end.set(postU16V44R4(0),p);p+=2;end.set(postU16V44R4(entries.length),p);p+=2;end.set(postU16V44R4(entries.length),p);p+=2;end.set(postU32V44R4(centralSize),p);p+=4;end.set(postU32V44R4(offset),p);p+=4;end.set(postU16V44R4(0),p);
  var total=offset+centralSize+end.length,out=new Uint8Array(total),at=0;locals.forEach(function(x){out.set(x,at);at+=x.length;});centrals.forEach(function(x){out.set(x,at);at+=x.length;});out.set(end,at);return out;
}
function postSheetV44R4(rows,widths){
  var maxRow=Math.max(1,rows.length),maxCol=Math.max(1,(rows[0]||[]).length),ref='A1:'+postColV44R4(maxCol)+maxRow;
  var cols=(widths||[]).map(function(w,i){return '<col min="'+(i+1)+'" max="'+(i+1)+'" width="'+w+'" customWidth="1"/>';}).join('');
  var data=rows.map(function(row,ri){return '<row r="'+(ri+1)+'">'+row.map(function(v,ci){return '<c r="'+postColV44R4(ci+1)+(ri+1)+'" t="inlineStr" s="'+(ri===0?1:2)+'"><is><t xml:space="preserve">'+postXmlV44R4(String(v==null?'':v).replace(/[\u0000-\u001f]/g,' ').replace(/\s+/g,' ').trim())+'</t></is></c>';}).join('')+'</row>';}).join('');
  return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><dimension ref="'+ref+'"/><sheetViews><sheetView workbookViewId="0"><pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/></sheetView></sheetViews><cols>'+cols+'</cols><sheetData>'+data+'</sheetData><autoFilter ref="'+ref+'"/><pageMargins left="0.4" right="0.4" top="0.6" bottom="0.6" header="0.2" footer="0.2"/></worksheet>';
}
function postMakeXlsxV44R4(payload){
  var m=payload&&payload.meta||{},a=payload&&payload.audit||{},c=payload&&payload.counts||{},summary=[['Campo','Valor'],['Autor',m.author||''],['Perfil',m.authorURL||''],['Postagem',m.postURL||a.sourceUrlAtExport||''],['Data da postagem',m.postDateExactText||m.postDateText||m.postDateISO||''],['Localidade',m.locationText||''],['URL da localidade',m.locationURL||''],['Cabeçalho/atividade',m.headerStoryText||''],['Pessoas marcadas',postEntitiesTextV44R16(m.taggedPeople)],['Lugares relacionados',postEntitiesTextV44R16(m.places)],['Visibilidade',m.privacyText||''],['Reações',c.like==null?'':String(c.like)],['Comentários declarados',c.comment==null?'':String(c.comment)],['Compartilhamentos',c.share==null?'':String(c.share)],['Visualizações',c.view==null?'':String(c.view)],['Contexto',a.context||''],['Status',a.status||''],['Comentários nível 1',String(payload&&payload.L1||0)],['Respostas',String(payload&&payload.L2||0)],['Perfis nas interações',String(payload&&payload.interactions&&payload.interactions.count||0)],['Status das interações',String(payload&&payload.interactions&&payload.interactions.status||'')],['Gerado em',a.finishedAt||new Date().toISOString()]];
  var head=['Nível','Pai','Número','Autor','Perfil','Texto','Data','Data ISO','Curtidas','Reações','Mídias'];
  var comments=[head].concat(postFlattenRowsV44R4(payload).map(function(r){return [r.level,r.parent,r.num,r.author,r.authorHref,r.text,r.date,r.dateISO,r.likes,r.reactions,r.media];}));
  var interactions=[['Nome','Perfil','Reação','Código','Avatar em alta resolução','Largura','Altura','Avatar incorporado']].concat(((payload&&payload.interactions&&payload.interactions.items)||[]).map(function(it){return [it.name||'',it.profileUrl||'',it.reactionLabel||'',it.reactionType||'',it.avatarHighResUrl||it.avatarObserved||'',it.avatarWidth||'',it.avatarHeight||'',it.avatarEmbedded?'sim':'não'];}));
  var entries=[
    {name:'[Content_Types].xml',data:'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/><Override PartName="/xl/worksheets/sheet2.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/><Override PartName="/xl/worksheets/sheet3.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/></Types>'},
    {name:'_rels/.rels',data:'<?xml version="1.0" encoding="UTF-8"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>'},
    {name:'xl/workbook.xml',data:'<?xml version="1.0" encoding="UTF-8"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets><sheet name="Resumo" sheetId="1" r:id="rId1"/><sheet name="Comentarios" sheetId="2" r:id="rId2"/><sheet name="Interacoes" sheetId="3" r:id="rId3"/></sheets></workbook>'},
    {name:'xl/_rels/workbook.xml.rels',data:'<?xml version="1.0" encoding="UTF-8"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet2.xml"/><Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet3.xml"/><Relationship Id="rId4" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>'},
    {name:'xl/styles.xml',data:'<?xml version="1.0" encoding="UTF-8"?><styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><fonts count="2"><font><sz val="10"/><name val="Aptos"/></font><font><b/><color rgb="FFFFFFFF"/><sz val="10"/><name val="Aptos"/></font></fonts><fills count="3"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill><fill><patternFill patternType="solid"><fgColor rgb="FF111111"/></patternFill></fill></fills><borders count="2"><border/><border><left style="thin"/><right style="thin"/><top style="thin"/><bottom style="thin"/></border></borders><cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs><cellXfs count="3"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/><xf fontId="1" fillId="2" borderId="1" applyFont="1" applyFill="1" applyBorder="1"><alignment horizontal="center" wrapText="1"/></xf><xf borderId="1" applyBorder="1"><alignment vertical="top" wrapText="1"/></xf></cellXfs><cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles></styleSheet>'},
    {name:'xl/worksheets/sheet1.xml',data:postSheetV44R4(summary,[28,95])},
    {name:'xl/worksheets/sheet2.xml',data:postSheetV44R4(comments,[8,25,9,24,42,85,18,24,10,10,55])},
    {name:'xl/worksheets/sheet3.xml',data:postSheetV44R4(interactions,[28,48,16,12,65,10,10,16])}
  ];return postZipV44R4(entries);
}
function postReportPdfV44R4(payload){
  var m=payload&&payload.meta||{},a=payload&&payload.audit||{},c=payload&&payload.counts||{},lines=['Autor: '+(m.author||''),'Perfil: '+(m.authorURL||''),'Postagem: '+(m.postURL||a.sourceUrlAtExport||''),'Data da postagem: '+(m.postDateExactText||m.postDateText||m.postDateISO||''),'Localidade: '+(m.locationText||''),'URL da localidade: '+(m.locationURL||''),'Cabeçalho/atividade: '+(m.headerStoryText||''),'Pessoas marcadas: '+postEntitiesTextV44R16(m.taggedPeople),'Lugares relacionados: '+postEntitiesTextV44R16(m.places),'Visibilidade: '+(m.privacyText||''),'Reações: '+(c.like==null?'':c.like)+' | Comentários declarados: '+(c.comment==null?'':c.comment)+' | Compartilhamentos: '+(c.share==null?'':c.share)+' | Visualizações: '+(c.view==null?'':c.view),'Contexto: '+(a.context||''),'Status: '+(a.status||''),'Comentários nível 1: '+Number(payload&&payload.L1||0),'Respostas: '+Number(payload&&payload.L2||0),''];
  postFlattenRowsV44R4(payload).forEach(function(r,i){lines.push('#'+(i+1)+' | Nível '+r.level+' | '+r.author);if(r.authorHref)lines.push('Perfil: '+r.authorHref);lines.push('Texto: '+r.text);if(r.date||r.likes||r.reactions)lines.push('Data: '+r.date+' | Curtidas: '+r.likes+' | Reações: '+r.reactions);if(r.media)lines.push('Mídias: '+r.media);lines.push('------------------------------------------------------------');});
  var interactionItems=(payload&&payload.interactions&&payload.interactions.items)||[];lines.push('');lines.push('INTERAÇÕES COM A POSTAGEM: '+interactionItems.length);interactionItems.forEach(function(it,i){lines.push('I'+(i+1)+' | '+(it.name||'')+' | '+(it.reactionLabel||it.reactionType||'Reação'));if(it.profileUrl)lines.push('Perfil: '+it.profileUrl);if(it.avatarHighResUrl||it.avatarObserved)lines.push('Avatar HD: '+(it.avatarHighResUrl||it.avatarObserved));lines.push('------------------------------------------------------------');});
  return postPagedPdfV44R4(lines,'Raspador de dados de relações e postagens do Facebook — Relatório da postagem');
}
function postIntegrityPdfV44R4(payload,artifact,sha256,sha512){
  var m=payload&&payload.meta||{},a=payload&&payload.audit||{},bytes=postBytesV44R4(artifact.data).byteLength;
  var lines=['LAUDO DE INTEGRIDADE — ARQUIVO EXPORTADO','', 'Ferramenta: '+(a.toolVersion||'V44R5'),'Gerado em UTC: '+new Date().toISOString(),'Início da coleta UTC: '+(a.runStartedAt||'N/A'),'Fim da coleta UTC: '+(a.finishedAt||'N/A'),'Status da coleta: '+(a.status||'N/A'),'Contexto: '+(a.context||'N/A'),'Autor: '+(m.author||'N/A'),'Perfil: '+(m.authorURL||'N/A'),'Postagem: '+(m.postURL||a.sourceUrlAtExport||'N/A'),'Data da postagem: '+(m.postDateExactText||m.postDateText||m.postDateISO||'N/A'),'Localidade: '+(m.locationText||'N/A'),'Cabeçalho/atividade: '+(m.headerStoryText||'N/A'),'Pessoas marcadas: '+postEntitiesTextV44R16(m.taggedPeople),'Perfis materializados nas interações: '+String(payload&&payload.interactions&&payload.interactions.count||0),'Status das interações: '+String(payload&&payload.interactions&&payload.interactions.status||'N/A'),'','Arquivo: '+artifact.name,'Tipo MIME: '+artifact.mime,'Tamanho: '+bytes+' bytes','SHA-256: '+sha256,'SHA-512: '+sha512,'','Os hashes acima correspondem aos bytes exatos do arquivo baixado em conjunto com este laudo.','Dados ausentes não foram presumidos.','', 'Desenvolvido por Guilherme Caselli'];
  return postPagedPdfV44R4(lines,'Laudo de Integridade — Coleta Facebook');
}

/* V44R21R9 - laudo de integridade no mesmo padrão tipográfico do módulo de relações:
   Courier 10 pt, A4, margens de 40 pt e quebra explícita de linhas longas. */
function postIntegrityNowBrV44R21R9(){try{return new Date().toLocaleString('pt-BR',{day:'2-digit',month:'2-digit',year:'numeric',hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false});}catch(_){return new Date().toISOString();}}
function postIntegritySplitV44R21R9(value,max){var raw=String(value==null?'':value),out=[];max=Math.max(12,Number(max||58));while(raw.length>max){var cut=raw.lastIndexOf(' ',max);if(cut<Math.floor(max*.55))cut=max;out.push(raw.slice(0,cut));raw=raw.slice(cut).replace(/^\s+/,'');}out.push(raw);return out;}
function postIntegrityTextV44R21R9(payload,artifact,sha256,sha512){
  var a=payload&&payload.audit||{},m=payload&&payload.meta||{},now=postIntegrityNowBrV44R21R9(),status=String(a.status||'N/A'),ok=status==='COMPLETED'?'OK':'PARCIAL - '+status,rows=[['Data/Hora',now],['URL',m.postURL||a.sourceUrlAtExport||a.sourceUrlAtStart||'N/A'],['Arquivo',artifact.name],['Formato',artifact.mime],['Tamanho',postBytesV44R4(artifact.data).byteLength+' bytes'],['Hash SHA-256',sha256],['Hash SHA-512',sha512],['Status do Export',ok+' em '+now]],lines=['Laudo de Integridade - Raspador de dados de postagens Facebook','Campo Valor','------------------ --------------------------------------------------------------'];
  rows.forEach(function(row){var label=(String(row[0])+'                  ').slice(0,18),parts=postIntegritySplitV44R21R9(row[1],58);parts.forEach(function(part,i){lines.push((i?new Array(20).join(' '):label+' ')+part);});});
  lines.push('-------------------------------------------------------------------------------');lines.push('Script de raspagem desenvolvido por Guilherme Caselli');lines.push('https://www.instagram.com/guilhermecaselli/');return lines.join('\n');
}
function postCourierIntegrityPdfV44R21R9(text){
  var lines=String(text||'').replace(/\r/g,'').split('\n'),per=54,pages=[];for(var i=0;i<lines.length;i+=per)pages.push(lines.slice(i,i+per));if(!pages.length)pages=[['']];var objs=[],pageObjs=[],contentObjs=[];for(i=0;i<pages.length;i++){pageObjs.push(4+i*2);contentObjs.push(5+i*2);}objs[1]='<< /Type /Catalog /Pages 2 0 R >>';objs[2]='<< /Type /Pages /Kids ['+pageObjs.map(function(n){return n+' 0 R';}).join(' ')+'] /Count '+pages.length+' >>';objs[3]='<< /Type /Font /Subtype /Type1 /BaseFont /Courier >>';
  pages.forEach(function(page,idx){var stream='BT /F1 10 Tf 40 790 Td 14 TL ';page.forEach(function(line,j){if(j)stream+='T* ';stream+='('+postPdfEscapeV44R4(line)+') Tj ';});stream+='ET';objs[pageObjs[idx]]='<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 3 0 R >> >> /Contents '+contentObjs[idx]+' 0 R >>';objs[contentObjs[idx]]='<< /Length '+stream.length+' >>\nstream\n'+stream+'\nendstream';});
  var out='%PDF-1.4\n',offs=[0],maxObj=contentObjs[contentObjs.length-1];for(i=1;i<=maxObj;i++){offs[i]=out.length;out+=i+' 0 obj\n'+(objs[i]||'<<>>')+'\nendobj\n';}var xref=out.length;out+='xref\n0 '+(maxObj+1)+'\n0000000000 65535 f \n';for(i=1;i<=maxObj;i++)out+=String(offs[i]).padStart(10,'0')+' 00000 n \n';out+='trailer << /Size '+(maxObj+1)+' /Root 1 0 R >>\nstartxref\n'+xref+'\n%%EOF';var bytes=new Uint8Array(out.length);for(i=0;i<out.length;i++)bytes[i]=out.charCodeAt(i)&255;return bytes;
}
postIntegrityPdfV44R4=function(payload,artifact,sha256,sha512){return postCourierIntegrityPdfV44R21R9(postIntegrityTextV44R21R9(payload,artifact,sha256,sha512));};

function postSetPreparedExportV44R4(payload,html){
  __POST_PREPARED_EXPORT_V44R4__={payload:payload,html:String(html||''),preparedAt:new Date().toISOString(),sourceUrl:String(location.href||'')};
  if(window.__FB_POST_SCRAPER_V44__)window.__FB_POST_SCRAPER_V44__.exportReady=true;
}
function postClearPreparedExportV44R4(){__POST_PREPARED_EXPORT_V44R4__=null;if(window.__FB_POST_SCRAPER_V44__)window.__FB_POST_SCRAPER_V44__.exportReady=false;}
function postHasPreparedExportV44R4(){return !!(__POST_PREPARED_EXPORT_V44R4__&&__POST_PREPARED_EXPORT_V44R4__.payload);}
function postBuildArtifactV44R4(kind,base,prepared){
  var p=prepared.payload,k=String(kind||'').toLowerCase();
  if(k==='html')return {kind:k,name:base+'.html',mime:'text/html;charset=utf-8',data:prepared.html};
  if(k==='json')return {kind:k,name:base+'.json',mime:'application/json;charset=utf-8',data:JSON.stringify(p,null,2)};
  if(k==='csv')return {kind:k,name:base+'.csv',mime:'text/csv;charset=utf-8',data:postMakeCsvV44R4(p)};
  if(k==='xlsx')return {kind:k,name:base+'.xlsx',mime:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',data:postMakeXlsxV44R4(p)};
  if(k==='pdf')return {kind:k,name:base+'.pdf',mime:'application/pdf',data:postReportPdfV44R4(p)};
  throw new Error('FORMATO_POST_NAO_SUPORTADO: '+k);
}
async function postExportSelectedFormatsV44R4(kinds){
  if(!postHasPreparedExportV44R4())throw new Error('POST_EXPORT_NAO_PREPARADO');
  var selected=[];(kinds||[]).forEach(function(k){k=String(k||'').toLowerCase();if(['html','pdf','json','xlsx','csv'].indexOf(k)>=0&&selected.indexOf(k)<0)selected.push(k);});
  if(!selected.length)throw new Error('SELECIONE_AO_MENOS_UM_FORMATO');
  var prepared=__POST_PREPARED_EXPORT_V44R4__,base=postExportBaseV44R4(prepared.payload),results=[];
  for(var i=0;i<selected.length;i++){
    var artifact=postBuildArtifactV44R4(selected[i],base,prepared),sha256=await postHashV44R4('SHA-256',artifact.data),sha512=await postHashV44R4('SHA-512',artifact.data);
    await postDownloadV44R4(artifact.name,artifact.data,artifact.mime);
    await new Promise(function(r){setTimeout(r,180);});
    var laudoName=artifact.name.replace(/\.[^.]+$/,'')+'_laudo_integridade.pdf',laudo=postIntegrityPdfV44R4(prepared.payload,artifact,sha256,sha512);
    await postDownloadV44R4(laudoName,laudo,'application/pdf');
    results.push({artifact:artifact.name,integrityPdf:laudoName,sha256:sha256,sha512:sha512,bytes:postBytesV44R4(artifact.data).byteLength});
    await new Promise(function(r){setTimeout(r,220);});
  }
  return results;
}


function postRuntimeMessageV44R10(message){
  return new Promise(function(resolve){
    try{chrome.runtime.sendMessage(message,function(response){if(chrome.runtime.lastError){resolve(null);return;}resolve(response||null);});}
    catch(_){resolve(null);}
  });
}
function embedAuthorAvatarV44R10(snap){
  snap=snap&&typeof snap==='object'?snap:{};
  var raw=safeMediaUrl(snap.authorAvatarSourceUrl||snap.authorAvatarHighResUrl||snap.authorAvatar||'');
  if(!raw)return Promise.resolve(snap);
  if(/^data:image\//i.test(raw)){snap.authorAvatarEmbedded=true;return Promise.resolve(snap);}
  return postRuntimeMessageV44R10({type:'B35_FETCH_IMAGE_DATA_V44R11',url:raw,preferHighRes:true}).then(function(r){
    if(r&&r.ok&&/^data:image\//i.test(String(r.dataUrl||''))){
      snap.authorAvatarSourceUrl=String(r.sourceUrl||raw);snap.authorAvatarHighResUrl=String(r.highResUrl||r.sourceUrl||raw);snap.authorAvatar=String(r.dataUrl);snap.authorAvatarEmbedded=true;
      snap.authorAvatarMime=String(r.mime||'');snap.authorAvatarBytes=Number(r.bytes||0);snap.authorAvatarSha256=String(r.sha256||'');snap.authorAvatarWidth=Number(r.width||0);snap.authorAvatarHeight=Number(r.height||0);
    }
    return snap;
  }).catch(function(){return snap;});
}
function avatarQualityScoreV44R13(x){return Math.max(Number(x&&x.authorAvatarWidth||x&&x.authorAvatarObservedWidth||0),Number(x&&x.authorAvatarHeight||x&&x.authorAvatarObservedHeight||0));}
function applyResolvedAvatarV44R13(snap,r,reason){
  if(!r||!r.ok)return snap;
  var source=safeMediaUrl(r.avatarUrl||r.highResUrl||r.sourceUrl||''),data=String(r.dataUrl||'');
  if(!source&&!/^data:image\//i.test(data))return snap;
  snap.authorAvatarSourceUrl=source||snap.authorAvatarSourceUrl||'';snap.authorAvatarHighResUrl=safeMediaUrl(r.highResUrl||r.sourceUrl||r.avatarUrl||'')||source||'';
  snap.authorAvatar=/^data:image\//i.test(data)?data:(snap.authorAvatarHighResUrl||snap.authorAvatarSourceUrl);snap.authorAvatarEmbedded=/^data:image\//i.test(data);snap.authorAvatarBound=true;snap.authorAvatarBindingReason=reason||String(r.source||'profile_exact_identity_hd');
  snap.authorAvatarWidth=Number(r.width||0);snap.authorAvatarHeight=Number(r.height||0);snap.authorAvatarMime=String(r.mime||snap.authorAvatarMime||'');snap.authorAvatarBytes=Number(r.bytes||snap.authorAvatarBytes||0);snap.authorAvatarSha256=String(r.sha256||snap.authorAvatarSha256||'');snap.authorProfileCanonicalUrl=String(r.canonicalUrl||'');snap.authorAvatarResolvedAt=new Date().toISOString();
  return snap;
}
function prepareAuthorSnapshotParallelV44R10(snap){
  snap=snap&&typeof snap==='object'?snap:{};
  var profile=canonicalProfilePageV44R3(snap.authorURL||'');
  var direct=Object.assign({},snap),identity=snap.authorProfileIdentity||profileIdentityFromUrl(snap.authorURL||'');
  // V44.21.30 RC2: evidência current-run somente. Cache persistente não compete com bytes observados nesta execução.
  var profilePromise=profile?postRuntimeMessageV44R10({type:'B35_FETCH_PROFILE_AVATAR_V44R3',profileUrl:profile,authorName:snap.author||'',profileIdentity:identity}):Promise.resolve(null);
  return Promise.resolve(profilePromise).then(function(r){
    var best=r&&r.ok?r:null;
    if(best&&(best.identityMatched===true||profileTitleMatchesV44R3(snap.author||'',best.profileTitle||snap.author||''))&&Math.max(Number(best.width||0),Number(best.height||0))>=Math.max(avatarQualityScoreV44R13(direct),96))applyResolvedAvatarV44R13(snap,best,String(best.source||'profile_exact_identity_current_run'));
    else if(direct.authorAvatarBound===true&&safeMediaUrl(direct.authorAvatar||direct.authorAvatarSourceUrl||''))snap=direct;
    else {snap.authorAvatar='';snap.authorAvatarBound=false;snap.authorAvatarBindingReason=String(best&&best.reason||'profile_avatar_not_proven_current_run');}
    return embedAuthorAvatarV44R10(snap).then(function(done){
      return done;
    });
  }).catch(function(){return direct.authorAvatarBound?embedAuthorAvatarV44R10(direct):snap;});
}
function mergeAuthorSnapshotV44R12(base,fresh){
  base=base&&typeof base==='object'?base:{};fresh=fresh&&typeof fresh==='object'?fresh:{};
  ['author','authorURL','authorProfileIdentity','authorUsername'].forEach(function(k){if(!base[k]&&fresh[k])base[k]=fresh[k];});
  if(fresh.authorAvatarBound===true&&safeMediaUrl(fresh.authorAvatar||'')){
    base.authorAvatar=fresh.authorAvatar;base.authorAvatarBound=true;
    base.authorAvatarBindingReason=fresh.authorAvatarBindingReason||'live_header_recapture';
    base.authorAvatarSourceUrl=fresh.authorAvatarSourceUrl||base.authorAvatarSourceUrl||'';base.authorAvatarHighResUrl=fresh.authorAvatarHighResUrl||base.authorAvatarHighResUrl||base.authorAvatarSourceUrl||'';base.authorAvatarWidth=Number(fresh.authorAvatarWidth||fresh.authorAvatarObservedWidth||base.authorAvatarWidth||0);base.authorAvatarHeight=Number(fresh.authorAvatarHeight||fresh.authorAvatarObservedHeight||base.authorAvatarHeight||0);
    base.capturedAt=fresh.capturedAt||base.capturedAt||new Date().toISOString();
  }
  return base;
}
function resolvedAuthorSnapshotV44R10(){
  var opts=window.__FB_POST_SCRAPER_OPTIONS__||{};
  if(fbIsPhotoContextV44R21R13()){
    var contractHook=window.__FB_PHOTO_HEADER_CONTRACT_V44R21R13__;
    var exact=(typeof contractHook==='function'?contractHook():{})||{},identity=profileIdentityFromUrl(exact.authorURL||'');
    var base={author:exact.author||'',authorURL:exact.authorURL||'',authorUsername:exact.authorUsername||usernameFromUrl(exact.authorURL||''),authorProfileIdentity:identity,authorAvatar:exact.authorAvatar||'',authorAvatarSourceUrl:exact.authorAvatarSourceUrl||'',authorAvatarHighResUrl:exact.authorAvatarHighResUrl||'',authorAvatarWidth:Number(exact.authorAvatarWidth||0),authorAvatarHeight:Number(exact.authorAvatarHeight||0),authorAvatarBound:exact.authorAvatarBound===true,authorAvatarBindingReason:exact.authorAvatarBindingReason||'PHOTO_EXACT_HEADER',capturedAt:new Date().toISOString()};
    return prepareAuthorSnapshotParallelV44R10(base).then(function(done){
      done=done||base;done.author=base.author;done.authorURL=base.authorURL;done.authorUsername=base.authorUsername;done.authorProfileIdentity=identity;
      return done;
    });
  }
  return Promise.resolve(opts.authorSnapshotPromise||opts.authorSnapshot||{}).catch(function(){return opts.authorSnapshot||{};}).then(function(resolved){
    var merged=mergeAuthorSnapshotV44R12(resolved||opts.authorSnapshot||{},authorSnapshot());
    return prepareAuthorSnapshotParallelV44R10(merged);
  });
}

/* V44R21R6 — STORY é uma superfície distinta de POST/PHOTO/REEL.
   Em Stories de terceiros, o Facebook não expõe a lista de espectadores ou
   identidades de reações ao espectador comum. A ferramenta registra a mídia e
   os metadados visíveis e termina com limitação explícita, sem simular dados. */
function isStoryContextV44R21R6(){return postTypeFromUrl(location.href)==='STORY';}
function storyVisibleMediaV44R21R6(){
  var candidates=[];
  try{Array.prototype.slice.call(document.querySelectorAll('video')).forEach(function(v){if(!mediaVisible(v))return;var r=v.getBoundingClientRect(),u=safeMediaUrl(v.currentSrc||v.src||v.querySelector&&v.querySelector('source[src]')&&v.querySelector('source[src]').src||'');if(u)candidates.push({type:'video',url:u,area:r.width*r.height,center:Math.abs((r.left+r.width/2)-innerWidth/2)});});}catch(_){}
  try{Array.prototype.slice.call(document.querySelectorAll('img')).forEach(function(im){if(!visible(im))return;var r=im.getBoundingClientRect();if(r.width<220||r.height<260)return;var u=safeMediaUrl(im.currentSrc||im.src||'');if(u)candidates.push({type:'photo',url:u,area:r.width*r.height,center:Math.abs((r.left+r.width/2)-innerWidth/2)});});}catch(_){}
  candidates.sort(function(a,b){return b.area-a.area||a.center-b.center;});var best=candidates[0]||null;if(!best)return null;if(best.type==='video')return {type:'video',url:best.url,story:true};return {type:'photos',photos:[{url:best.url,index:1}],story:true};
}
function storyCaptionV44R21R6(surface,author){
  var vals=[];try{Array.prototype.slice.call((surface||document.body).querySelectorAll('[dir="auto"],h1,h2,h3')).slice(0,300).forEach(function(x){if(!visible(x))return;var z=t(x.innerText||x.textContent||'');if(!z||z===author||z.length>900)return;if(/^(?:Reply|Responder|Send message|Enviar mensagem|Pause|Pausar|Play|Reproduzir|More|Mais)$/i.test(z))return;vals.push(z);});}catch(_){}vals.sort(function(a,b){return b.length-a.length;});return vals[0]||'';
}
function storyInteractionResultV44R21R6(requested){
  var msg='Em Story de terceiro, as identidades de espectadores e reações não são disponibilizadas ao espectador comum. Somente o proprietário da Story pode abrir a lista de visualizadores/reagentes quando o Facebook a oferece.';
  return {items:[],count:0,declaredTotal:0,requested:requested===true,status:requested?'STORY_REACTION_IDENTITIES_NOT_VISIBLE_TO_VIEWER':'NOT_REQUESTED',accessLimited:requested===true,limitationCode:requested?'STORY_OWNER_ONLY_VIEWER_LIST':'',limitationMessage:requested?msg:'',declaredByType:{},byReaction:interactionCatalogOuterV44R21R3().map(function(m){return {code:m.code,label:m.label,emoji:m.emoji,declaredCount:0,observedCount:0};}),audit:{version:'STORY_SNAPSHOT_V44R21R6',requested:requested===true,status:requested?'STORY_REACTION_IDENTITIES_NOT_VISIBLE_TO_VIEWER':'NOT_REQUESTED',accessLimited:requested===true,limitationCode:requested?'STORY_OWNER_ONLY_VIEWER_LIST':'',limitationMessage:requested?msg:'',finishedAt:new Date().toISOString()}};
}
function startStoryCaptureV44R21R6(opts){
  var started=new Date(),surface=findPostSurface('STORY')||document.body,base=authorSnapshot(),author=findAuthorCandidate(surface),requested=opts&&opts.collectInteractions===true;
  try{document.dispatchEvent(new CustomEvent('FB_B35_POST_PROGRESS_V44',{detail:{type:'started',progress:10,L1:0,L2:0,target:0,contentProgress:0,message:'Story confirmada; coletando mídia e metadados visíveis.'}}));}catch(_){}
  return Promise.resolve(opts&&opts.authorSnapshotPromise||base).catch(function(){return base;}).then(function(snap){snap=mergeAuthorSnapshotV44R12(snap||base,base);var name=t(snap.author||snap.name||author&&author.name||''),href=cleanUrl(snap.authorURL||snap.profileUrl||author&&author.href||''),media=storyVisibleMediaV44R21R6(),meta={author:name,authorURL:href,authorUsername:usernameFromUrl(href),caption:storyCaptionV44R21R6(surface,name),postURL:String(location.href||''),postDateText:'',postDateISO:null,privacyText:'',headerStoryText:name,taggedPeople:[],places:[],metadataSchemaVersion:'STORY_VISIBLE_SNAPSHOT_V44R21R6',metadataCapturedAt:new Date().toISOString(),metadataCapturedBeforeScroll:true,authorAvatar:snap.authorAvatar||snap.avatar||'',authorAvatarObserved:snap.authorAvatarObserved||snap.authorAvatarSourceUrl||'',authorAvatarHighResUrl:snap.authorAvatarHighResUrl||snap.authorAvatarSourceUrl||'',authorAvatarWidth:Number(snap.authorAvatarWidth||0),authorAvatarHeight:Number(snap.authorAvatarHeight||0),authorAvatarBound:!!snap.authorAvatarBound,authorAvatarBindingReason:snap.authorAvatarBindingReason||'story_visible_author'};var payload={L1:0,L2:0,rows:[],meta:meta,counts:{like:0,comment:0,share:0,view:null},media:media,audit:{schemaVersion:1,toolVersion:POST_MODULE_VERSION,runStartedAt:started.toISOString(),collectedAt:new Date().toISOString(),sourceUrlAtStart:String(location.href||''),sourceUrlAtExport:String(location.href||''),context:'STORY',status:'COMPLETED_VISIBLE_STORY_SNAPSHOT',collectionBasis:'Story: somente mídia e metadados materializados na sessão; identidades privadas não são presumidas.',collectionTerminal:{mode:'STORY_VISIBLE_SNAPSHOT_V44R21R6',declaredTarget:0,collectedTotal:0,targetReached:true,waves:0,terminalReason:'VISIBLE_STORY_SNAPSHOT_COMPLETE',elapsedMs:Date.now()-started.getTime(),surfaceObserved:!!surface}}};payload.interactions=storyInteractionResultV44R21R6(requested);payload.audit.interactionsRequested=requested;payload.audit.interactions=payload.interactions.audit;payload.audit.finishedAt=new Date().toISOString();payload.audit.gates={noAssumedMetrics:true,hashesCoverExactExportBytes:true,sourceIdentityRecorded:true,allCommentsConfirmed:true,declaredCommentTargetReached:true};payload.audit.exportPolicy='manual_user_selected_no_automatic_download';payload.audit.availableFormats=['html','pdf','json','xlsx','csv'];payload.audit.integrityPolicy='one_integrity_pdf_per_downloaded_artifact_exact_bytes';payload.audit.primaryHtmlLayout='vertical';var html=buildStoryHtmlV44R21R13(payload);try{if(window.__FB_APPLY_UNIFIED_POST_HTML_V44__)html=window.__FB_APPLY_UNIFIED_POST_HTML_V44__(html,payload,{layoutMode:'vertical'});}catch(e){console.warn('Layout unificado indisponível para Story; HTML estável preservado.',e);}postSetPreparedExportV44R4(payload,html);window.__FB_POST_SCRAPER_V44__.running=false;try{document.dispatchEvent(new CustomEvent('FB_B35_POST_PROGRESS_V44',{detail:{type:'done',done:true,progress:100,L1:0,L2:0,target:0,contentProgress:100,exportReady:true,message:requested?'Story coletada; interações de terceiros não são expostas ao espectador.':'Story coletada com os dados visíveis.',status:payload.audit.status}}));}catch(_){}return payload;}).catch(function(e){window.__FB_POST_SCRAPER_V44__.running=false;try{document.dispatchEvent(new CustomEvent('FB_B35_POST_PROGRESS_V44',{detail:{type:'error',done:true,progress:100,exportReady:false,message:String(e&&e.message||e)}}));}catch(_){}return null;});
}

function start(options){
  postClearPreparedExportV44R4();
  var ctx=detectContext();
  if(!ctx.ready)return {ok:false,reason:ctx.reason,context:ctx};
  if(window.__FB_HARVEST12__||window.__FB_POST_SCRAPER_V44__.running)return {ok:false,reason:'POST_SCRAPER_ALREADY_RUNNING',context:ctx};
  var opts=options&&typeof options==='object'?options:{};
  opts.layoutMode='vertical';
  opts.collectInteractions=opts.collectInteractions===true;
  opts.authorSnapshot=authorSnapshot();
  /* V44R16R3: o coletor completo de cabeçalho pertence ao escopo do motor
     original e será executado por resolvePostHeaderMetadataV44R16 após o
     scroll. Não o invoque no escopo externo. */
  opts.headerSnapshot={};
  opts.headerSnapshotDeferred=true;
  /* V44R10: a busca do avatar corre em paralelo. O scroll não aguarda rede, perfil ou conversão base64. */
  opts.authorSnapshotPromise=prepareAuthorSnapshotParallelV44R10(opts.authorSnapshot);window.__FB_POST_SCRAPER_OPTIONS__=opts;
  window.__FB_POST_SCRAPER_V44__.running=true;
  try{document.dispatchEvent(new CustomEvent('FB_B35_POST_PROGRESS_V44',{detail:{type:'started',progress:1,L1:0,L2:0,target:0,contentProgress:0,message:'Scroll iniciado imediatamente com o motor estável v1.1.1.'}}));}catch(_){}
  try{if(ctx.type==='STORY')startStoryCaptureV44R21R6(opts);else __runOriginalPostScraperV111();}
  catch(e){window.__FB_POST_SCRAPER_V44__.running=false;try{document.dispatchEvent(new CustomEvent('FB_B35_POST_PROGRESS_V44',{detail:{type:'error',progress:0,done:true,message:String(e&&e.message||e)}}));}catch(_){}}
  return {ok:true,context:ctx,layoutMode:'vertical'};
}
function stop(){
  if(window.__HUDH__&&typeof window.__HUDH__.requestStop==='function'){window.__HUDH__.requestStop('Parada solicitada pelo painel unificado.');return true;}
  return false;
}
window.__FB_POST_SCRAPER_V44__={
  version:POST_MODULE_VERSION,
  running:false,
  exportReady:false,
  detectContext:detectContext,
  authorSnapshot:authorSnapshot,
  start:start,
  stop:stop,
  hasPreparedExport:postHasPreparedExportV44R4,
  exportSelectedFormats:postExportSelectedFormatsV44R4,
  clearPreparedExport:postClearPreparedExportV44R4,
  preparedExport:function(){return __POST_PREPARED_EXPORT_V44R4__;}
};

function __runOriginalPostScraperV111(){
var isPhotoContext=fbIsPhotoContextV44R21R13; /* V44R21R13: alias lexical explícito; elimina dependência cruzada de escopo. */
/* AUDIT PATCH 12-07-2026 v1.1.1: gate robusto All comments para POST/PHOTO, sem alterar scroll, coleta, mídia ou exportação estáveis. */
var FB_TOOL_VERSION = POST_MODULE_VERSION;
var FB_RUN_STARTED_AT = new Date();
var FB_SOURCE_URL_AT_START = String(location.href || '');

if (window.__FB_HARVEST12__) return;
window.__FB_HARVEST12__ = true;

/* ========= utils (ES5) ========= */
var U = {
  T: function (s) {
    return String(s || '')
      .replace(/[\u200B-\u200D\uFEFF]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  },
  qa: function (sel, root) {
    try {
      return Array.prototype.slice.call((root || document).querySelectorAll(sel));
    } catch (_) {
      return [];
    }
  },
  q1: function (sel, root) {
    try {
      return (root || document).querySelector(sel);
    } catch (_) {
      return null;
    }
  },
  vis: function (el) {
    if (!el) return false;
    var cs = getComputedStyle(el);
    if (cs.visibility === 'hidden' || cs.display === 'none') return false;
    var r = el.getClientRects();
    return !!(r && r.length && r[0].width > 0 && r[0].height > 0);
  },
  left: function (el) {
    try { return Math.round(el.getBoundingClientRect().left || 0); } catch (_) { return 0; }
  },
  top: function (el) {
    try { return Math.round(el.getBoundingClientRect().top || 0); } catch (_) { return 0; }
  },
  sleep: function (ms) {
    return new Promise(function (resolve) { setTimeout(resolve, ms || 0); });
  },
  waitMut: function (root, ms) {
    ms = ms || 900;
    return new Promise(function (res) {
      var d = false;
      var mo = new MutationObserver(function () {
        if (!d) {
          d = true;
          try { mo.disconnect(); } catch (_) { }
          res(true);
        }
      });
      try {
        mo.observe(root || document.body, { childList: true, subtree: true });
      } catch (_) {
        res(false);
        return;
      }
      setTimeout(function () {
        if (!d) {
          d = true;
          try { mo.disconnect(); } catch (_) { }
          res(false);
        }
      }, ms);
    });
  },
  each: function (arr, fn) {
    for (var i = 0; i < arr.length; i++) fn(arr[i], i);
  },
  map: function (arr, fn) {
    var out = [];
    U.each(arr, function (x, i) { out.push(fn(x, i)); });
    return out;
  },
  filter: function (arr, fn) {
    var out = [];
    U.each(arr, function (x, i) { if (fn(arr[i], i)) out.push(arr[i]); });
    return out;
  },
  first: function (arr, fn) {
    for (var i = 0; i < arr.length; i++) {
      if (fn(arr[i], i)) return arr[i];
    }
    return null;
  }
};

/* ========= helper de contexto ========= */
function isReelContext() {
  return /\/reel\//.test(location.href);
}

function isPhotoContext() {
  return /(?:^|\/)photo(?:\.php)?(?:\/|$)/i.test(location.pathname || '') || /\/photo(?:\.php)?\?fbid=/i.test(location.href || '');
}
function isPhotoHeaderOrJunkRow(author, text, href, aria) {
  if (!isPhotoContext()) return false;
  var a = U.T(author || ''), t = U.T(text || ''), h = String(href || ''), ar = U.T(aria || '');
  var all = a + ' ' + t + ' ' + h + ' ' + ar;
  if (/Verified account/i.test(all)) return true;
  if (/Shared with Public|Verified account|photo\.php\?__tn__|comment_id=|__cft__/i.test(all)) return true;
  if (a.length > 90 || /See more$/.test(a)) return true;
  if (/^https?:\/\//i.test(t)) return false;
  if (/^[A-Za-z0-9]{16,}$/.test(t)) return true;
  return false;
}
function fbIsScrambledMetaNoise(s) {
  var t = U.T(s || '');
  if (!t || t.length < 25) return false;
  var parts = t.split(' '), short = 0, digits = 0, longWords = 0;
  for (var i = 0; i < parts.length; i++) {
    var p = parts[i].replace(/[·•.,:;!?()\[\]{}'"“”]/g, '');
    if (!p) continue;
    if (p.length <= 2) short++;
    if (p.length >= 4) longWords++;
    if (/\d/.test(p)) digits++;
  }
  if (parts.length >= 18 && short / parts.length >= 0.72 && digits >= 4 && longWords <= 3) return true;
  if (/^(?:[A-Za-z0-9]\s+){12,}[A-Za-z0-9]?(?:\s*[·•])?$/.test(t)) return true;
  if (/^(?:[A-Za-z0-9]{1,2}\s+){14,}/.test(t) && digits >= 3) return true;
  return false;
}
function fbLooksLikeNaturalCaptionStartV44R20R3(s) {
  var text = U.T(s || '');
  if (!text) return false;
  var tokens = text.split(/\s+/).filter(Boolean);
  if (!tokens.length) return false;

  /* O limite lexical impede que um token numérico residual (por exemplo "33")
     seja aceito como início da legenda apenas porque as palavras seguintes são naturais. */
  var firstLexical = '';
  for (var fi = 0; fi < Math.min(tokens.length, 3); fi++) {
    var probe = String(tokens[fi] || '')
      .replace(/^["'“”‘’([{<]+|[.,!?;:'"“”‘’)\]}>]+$/g, '')
      .trim();
    if (!probe) continue;
    if (/^[\p{Extended_Pictographic}\uFE0F\u200D]+$/u.test(probe)) continue;
    firstLexical = probe;
    break;
  }
  if (!firstLexical) return false;
  if (/^\d+(?:[.,:/-]\d+)*$/.test(firstLexical)) return false;
  if (!/^(?:[#@])?[\p{L}][\p{L}'’\-]*$/u.test(firstLexical)) return false;

  var words = tokens.slice(0, 9);
  var natural = 0, vowelWords = 0, letterTotal = 0;
  for (var i = 0; i < words.length; i++) {
    var w = String(words[i] || '')
      .replace(/^[#@"'“”‘’([{<]+|[.,!?;:'"“”‘’)\]}>]+$/g, '')
      .trim();
    if (!w) continue;
    if (/^[\p{L}][\p{L}'’\-]{1,}$/u.test(w)) {
      natural++;
      letterTotal += w.replace(/[^\p{L}]/gu, '').length;
      if (/[aeiouáéíóúàâêôãõü]/i.test(w)) vowelWords++;
    }
  }
  return natural >= 4 && vowelWords >= 3 && letterTotal >= 18;
}
function fbOpaqueCaptionTokenStatsV44R20R3(token) {
  var x = String(token || '').replace(/^[^A-Za-z0-9]+|[^A-Za-z0-9]+$/g, '');
  if (!x || !/^[A-Za-z0-9]+$/.test(x)) return null;
  var digits = (x.match(/\d/g) || []).length;
  var letters = (x.match(/[A-Za-z]/g) || []).length;
  var lowers = (x.match(/[a-z]/g) || []).length;
  var uppers = (x.match(/[A-Z]/g) || []).length;
  var digitGroups = (x.match(/\d+/g) || []).length;
  var classTransitions = 0;
  for (var i = 1; i < x.length; i++) {
    var a = /\d/.test(x.charAt(i - 1)) ? 'd' : 'l';
    var b = /\d/.test(x.charAt(i)) ? 'd' : 'l';
    if (a !== b) classTransitions++;
  }
  return {raw:x,length:x.length,digits:digits,letters:letters,lowers:lowers,uppers:uppers,digitGroups:digitGroups,classTransitions:classTransitions};
}
function fbIsOpaqueCaptionPrefixSequenceV44R20R3(tokens, endExclusive) {
  if (!Array.isArray(tokens) || endExclusive < 1) return false;
  var chars = 0, digits = 0, letters = 0, digitGroups = 0, transitions = 0;
  var mixed = 0, opaqueTokens = 0, shortContinuations = 0;
  for (var i = 0; i < endExclusive; i++) {
    var st = fbOpaqueCaptionTokenStatsV44R20R3(tokens[i]);
    if (!st) return false;
    chars += st.length; digits += st.digits; letters += st.letters;
    digitGroups += st.digitGroups; transitions += st.classTransitions;
    if (st.digits > 0 && st.letters > 0) {
      mixed++;
      if (st.length >= 10 && st.digits >= 2 && st.letters >= 6) opaqueTokens++;
    } else if ((st.digits === st.length && st.length <= 6) || (st.letters === st.length && st.length <= 3 && st.raw === st.raw.toLowerCase())) {
      shortContinuations++;
    } else {
      return false;
    }
  }
  /* Critério conjunto: suporta um token grande ou vários tokens menores, como o
     padrão real "oper... 0o35...", sem remover códigos curtos legítimos. */
  if (opaqueTokens < 1 || mixed < 1) return false;
  if (chars < 28 || digits < 6 || letters < 16) return false;
  if (digitGroups < 4 || transitions < 7) return false;
  if (endExclusive > 1 && opaqueTokens + shortContinuations !== endExclusive) return false;
  return true;
}
function fbStripOpaqueCaptionPrefixV44R20R3(s) {
  var text = U.T(s || '');
  if (!text) return '';
  var tokens = text.split(/\s+/).filter(Boolean);
  if (tokens.length < 5) return text;

  var maxCut = Math.min(6, tokens.length - 4);
  for (var cut = maxCut; cut >= 1; cut--) {
    var remainder = U.T(tokens.slice(cut).join(' '));
    if (!fbLooksLikeNaturalCaptionStartV44R20R3(remainder)) continue;
    if (fbIsOpaqueCaptionPrefixSequenceV44R20R3(tokens, cut)) return remainder;
  }
  return text;
}
function fbIsProtectedNaturalLeadTokenV44R20R4(raw) {
  var x = String(raw || '').toLowerCase();
  return /^(?:hoje|parabens|parabéns|feliz|querido|querida|queridos|queridas|promocao|promoção|promotion|pedido|order|codigo|código|code|cupom|coupon|produto|product|sorteio|giveaway|novidade|lancamento|lançamento|new|iphone|samsung|galaxy|black|friday|familia|família|amigo|amiga|amigos|amigas|minha|meu|nos|nós|este|esta|um|uma)$/.test(x);
}
function fbIsStrongOpaqueMixedTokenV44R20R4(st) {
  return !!st && st.digits >= 4 && st.letters >= 8 && st.length >= 14 && st.digitGroups >= 3 && st.classTransitions >= 5;
}
function fbIsWeakOpaqueMixedTokenV44R20R4(st) {
  return !!st && st.digits >= 2 && st.letters >= 6 && st.length >= 10 && st.digitGroups >= 1 && st.classTransitions >= 2;
}
function fbIsOpaqueCaptionPrefixSequenceV44R20R4(tokens, endExclusive) {
  if (!Array.isArray(tokens) || endExclusive < 1) return false;
  /* Prefixos de um único token continuam submetidos exatamente ao critério R3,
     evitando remover nomes de produto ou códigos legítimos como iPhone15... */
  if (endExclusive === 1) return fbIsOpaqueCaptionPrefixSequenceV44R20R3(tokens, endExclusive);
  var stats = [], chars = 0, digits = 0, letters = 0, digitGroups = 0, transitions = 0;
  var strong = 0, weak = 0, alphabeticCompanions = 0, shortContinuations = 0;
  for (var i = 0; i < endExclusive; i++) {
    var st = fbOpaqueCaptionTokenStatsV44R20R3(tokens[i]);
    if (!st) return false;
    stats.push(st);
    chars += st.length; digits += st.digits; letters += st.letters;
    digitGroups += st.digitGroups; transitions += st.classTransitions;
    if (st.digits > 0 && st.letters > 0) {
      if (fbIsStrongOpaqueMixedTokenV44R20R4(st)) strong++;
      else if (fbIsWeakOpaqueMixedTokenV44R20R4(st)) weak++;
      else return false;
    } else if (st.letters === st.length) {
      if (st.length <= 3 && st.raw === st.raw.toLowerCase()) shortContinuations++;
      else if (st.length >= 8 && st.length <= 32 && !fbIsProtectedNaturalLeadTokenV44R20R4(st.raw)) alphabeticCompanions++;
      else return false;
    } else if (st.digits === st.length && st.length <= 6) {
      shortContinuations++;
    } else {
      return false;
    }
  }
  /* V44R20R4: o ruído real também pode começar por um token apenas alfabético
     e sem significado, seguido por um identificador alfanumérico de alta entropia.
     Esse token alfabético só é aceito como ruído quando está imediatamente ao lado
     de um token misto e existe ao menos um token misto forte na mesma sequência. */
  if (strong < 1) return false;
  if (chars < 28 || digits < 4 || letters < 16) return false;
  if (digitGroups < 3 || transitions < 5) return false;
  if (alphabeticCompanions > 0) {
    for (var ai = 0; ai < stats.length; ai++) {
      var ast = stats[ai];
      if (!(ast.letters === ast.length && ast.length >= 8)) continue;
      var prevMixed = ai > 0 && stats[ai - 1].digits > 0 && stats[ai - 1].letters > 0;
      var nextMixed = ai + 1 < stats.length && stats[ai + 1].digits > 0 && stats[ai + 1].letters > 0;
      if (!prevMixed && !nextMixed) return false;
    }
  }
  return strong + weak + alphabeticCompanions + shortContinuations === endExclusive;
}
function fbStripOpaqueCaptionPrefixV44R20R4(s) {
  var text = U.T(s || '');
  if (!text) return '';
  var tokens = text.split(/\s+/).filter(Boolean);
  if (tokens.length < 5) return text;
  var maxCut = Math.min(8, tokens.length - 4);
  for (var cut = maxCut; cut >= 1; cut--) {
    var remainder = U.T(tokens.slice(cut).join(' '));
    if (!fbLooksLikeNaturalCaptionStartV44R20R3(remainder)) continue;
    if (fbIsOpaqueCaptionPrefixSequenceV44R20R4(tokens, cut)) return remainder;
  }
  /* Mantém a heurística R3 como fallback para os padrões anteriormente validados. */
  return fbStripOpaqueCaptionPrefixV44R20R3(text);
}
try{window.__FB_STRIP_OPAQUE_CAPTION_V44R21R13__=fbStripOpaqueCaptionPrefixV44R20R4;}catch(_){}
function fbStripScrambledMetaNoise(s) {
  var t = U.T(s || '');
  if (!t) return '';
  t = fbStripOpaqueCaptionPrefixV44R20R4(t);
  if (fbIsScrambledMetaNoise(t)) return '';
  t = t.replace(/^(?:(?:[A-Za-z0-9]{1,2}\s+){14,}[A-Za-z0-9]{0,2}\s*[·•]?\s*)+/, '').trim();
  t = fbStripOpaqueCaptionPrefixV44R20R4(t);
  if (fbIsScrambledMetaNoise(t)) return '';
  return t;
}

/* PATCH 29-04-2026 PHOTO-CAPTION-ONLY:
   Correção isolada da legenda no formato PHOTO.
   Não altera POST, REEL/VÍDEO, mídia, comentários, replies, contagens ou coleta L1/L2. */
function fbPhotoNormalizeCaptionText(s) {
  var t = U.T(s || '');
  if (!t) return '';
  t = t
    .replace(/\s*Shared with Public\s*/ig, ' ')
    .replace(/\s*See more\s*/ig, ' ')
    .replace(/\s*Ver mais\s*/ig, ' ')
    .replace(/\s*Hide translation\s*/ig, ' ')
    .replace(/\s*Ocultar tradução\s*/ig, ' ')
    .replace(/\s*See original\s*/ig, ' ')
    .replace(/\s*Ver original\s*/ig, ' ')
    .replace(/\s*Rate this translation\s*/ig, ' ')
    .replace(/\s*Avaliar esta tradução\s*/ig, ' ')
    .replace(/\s*See translation\s*/ig, ' ')
    .replace(/\s*Ver tradução\s*/ig, ' ')
    .replace(/\s*Verified account\s*/ig, ' ')
    .replace(/\s*Follow\s*/ig, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  t = fbStripScrambledMetaNoise(t);
  if (!t) return '';

  // Remove caudas de ações/contagens que entram coladas na legenda.
  t = t.replace(/\s+\d+\s+(?:rea(?:ç|c)[oõ]es?|coment[aá]rios?|compartilhamentos?|comments?|shares?|likes?)\b.*$/ig, '').trim();
  t = t.replace(/\s+(?:Like|Reply|Curtir|Responder)\b.*$/ig, '').trim();

  return U.T(t);
}
function fbPhotoRejectCaptionCandidate(s) {
  var t = U.T(s || '');
  if (!t) return true;
  if (t.length < 35) return true;
  if (fbIsScrambledMetaNoise(t)) return true;
  if (/^[A-Za-z0-9]{16,}(?:\s*[·•]\s*Shared with Public)?$/i.test(t)) return true;
  if (/^[A-Za-z0-9]{8,}\s*[·•]\s*Shared with Public$/i.test(t)) return true;
  if (/Facebook Menu|Number of unread|Verified account|Shared with Public|Home|Reels|Friends|Marketplace|Gaming|See all|Unread/i.test(t)) return true;
  if (/^(?:Like|Reply|Curtir|Responder|Comentar|Comment|Share|Compartilhar)\b/i.test(t)) return true;
  if (/comment_id=|__tn__=|__cft__|profile\.php|photo\.php\?__tn__/i.test(t)) return true;
  if (/^\d+\s*(?:K|M|mil)?$/i.test(t)) return true;
  return false;
}
function fbPhotoCaptionScore(s, pos) {
  var t = fbPhotoNormalizeCaptionText(s);
  if (fbPhotoRejectCaptionCandidate(t)) return -999999;
  var score = 0;
  score += Math.min(220, t.length);
  if (/[.!?…]/.test(t)) score += 25;
  if (/[ÁÉÍÓÚÃÕÇáéíóúãõç]/.test(t)) score += 20;
  if (/\b[\p{L}]{4,}\s+[\p{L}]{4,}\b/iu.test(t)) score += 35;
  if (/\b(See original|Rate this translation|Hide translation)\b/i.test(s)) score -= 40;
  if (/^[a-z0-9]{10,}\b/i.test(t)) score -= 200;
  if (/\b(Like|Reply|Curtir|Responder)\b/i.test(t)) score -= 160;
  if (pos && typeof pos.top === 'number') {
    if (pos.top < 0) score -= 20;
    if (pos.top > 900) score -= 70;
  }
  return score;
}
function fbPhotoGetFirstCommentTop() {
  var firstTop = Infinity;
  try {
    var arts = U.qa('div[role="article"]', document.body);
    for (var i = 0; i < arts.length; i++) {
      var raw = U.T(arts[i].innerText || arts[i].textContent || '');
      var aria = U.T(arts[i].getAttribute('aria-label') || '');
      if (/^(Comment|Reply) by /i.test(aria) || /\b(Like|Reply|Curtir|Responder)\b/i.test(raw)) {
        var rr = arts[i].getBoundingClientRect();
        if (rr.top > 0 && rr.top < firstTop) firstTop = Math.round(rr.top);
      }
    }
  } catch (_) {}
  return firstTop;
}
function fbPhotoExtractBestCaption(existingCaption) {
  if (!isPhotoContext()) return existingCaption || '';

  var cands = [];
  function addCand(text, source, el) {
    var clean = fbPhotoNormalizeCaptionText(text);
    if (!clean) return;
    var pos = { top: 0, left: 0, width: 0, height: 0 };
    try {
      if (el && el.getBoundingClientRect) {
        var r = el.getBoundingClientRect();
        pos = { top: Math.round(r.top || 0), left: Math.round(r.left || 0), width: Math.round(r.width || 0), height: Math.round(r.height || 0) };
      }
    } catch (_) {}
    var sc = fbPhotoCaptionScore(text, pos);
    if (sc > -999999) cands.push({ text: clean, raw: U.T(text || ''), source: source, score: sc, pos: pos });
  }

  addCand(existingCaption, 'existing', null);

  try {
    var selectors = [
      '[data-ad-preview="message"]',
      '[data-ad-comet-preview="message"]',
      '[data-testid="post_message"]',
      '[role="dialog"] div[dir="auto"]',
      '[role="dialog"] span[dir="auto"]',
      'div[dir="auto"]',
      'span[dir="auto"]',
      'p'
    ];
    var firstTop = fbPhotoGetFirstCommentTop();
    var seen = Object.create(null);
    for (var si = 0; si < selectors.length; si++) {
      var list = U.qa(selectors[si], document.body);
      for (var i = 0; i < list.length; i++) {
        var el = list[i];
        if (!U.vis(el)) continue;
        var text = U.T(el.innerText || el.textContent || '');
        if (!text || seen[text]) continue;
        seen[text] = true;
        var r = el.getBoundingClientRect();
        // No PHOTO, evita capturar comentários já abaixo do início da seção de comentários.
        if (isFinite(firstTop) && r.top > firstTop + 4) continue;
        addCand(text, selectors[si], el);
      }
    }
  } catch (_) {}

  try {
    var metas = U.qa('meta[property="og:description"],meta[name="description"],meta[property="twitter:description"]', document);
    for (var mi = 0; mi < metas.length; mi++) addCand(metas[mi].getAttribute('content') || '', 'meta', null);
  } catch (_) {}


  cands.sort(function (a, b) {
    return b.score - a.score || b.text.length - a.text.length;
  });

  return cands.length ? cands[0].text : fbPhotoNormalizeCaptionText(existingCaption || '');
}
function isHarvestableNodeForContext(n, au, tx) {
  if (!isPhotoContext()) return true;
  var aria = U.T((n && n.getAttribute && n.getAttribute('aria-label')) || '');
  var href = au && au.href || '';
  if (isPhotoHeaderOrJunkRow(au && au.name, tx, href, aria)) return false;
  if (/^(Comment|Reply) by |^(Comentário|Resposta) de /i.test(aria)) return true;
  var raw = U.T((n && (n.innerText || n.textContent)) || ''), desc = '';
  try { desc = U.T(Array.prototype.slice.call(n.querySelectorAll('[aria-label],[title]')).slice(0,80).map(function(x){return x.getAttribute('aria-label')||x.getAttribute('title')||'';}).join(' ')); } catch (_) {}
  var hasCommentLink=false;try{hasCommentLink=!!n.querySelector('a[href*="comment_id="],a[href*="reply_comment_id="]');}catch(_){}
  if ((/\b(Like|Reply|Curtir|Responder)\b/i.test(raw+' '+desc)||hasCommentLink) && !/Shared with Public|Verified account/i.test(raw)) return true;
  return false;
}

/* ========= HUD bridge unificado (V44) ========= */
(function () {
  var p = 0, rounds = 0, stopped = false, done = false, L1 = 0, L2 = 0;
  function emit(type, extra) {
    var target=Math.max(0,Number(typeof __DECLARED_COMMENT_TARGET_V44R3__!=='undefined'?__DECLARED_COMMENT_TARGET_V44R3__:0),Number(typeof __POST_COUNTS_SNAPSHOT__!=='undefined'&&__POST_COUNTS_SNAPSHOT__?__POST_COUNTS_SNAPSHOT__.comment:0),Number(typeof __REEL_COUNTS_SNAPSHOT__!=='undefined'&&__REEL_COUNTS_SNAPSHOT__?__REEL_COUNTS_SNAPSHOT__.comment:0));
    var observed=L1+L2,contentProgress=target>0?Math.max(0,Math.min(100,(observed/target)*100)):0;
    var detail = {
      type: type,
      progress: p,
      rounds: rounds,
      L1: L1,
      L2: L2,
      target: target,
      contentProgress: contentProgress,
      stopped: stopped,
      done: done,
      message: ''
    };
    if (extra) {
      for (var k in extra) if (Object.prototype.hasOwnProperty.call(extra, k)) detail[k] = extra[k];
    }
    try {
      document.dispatchEvent(new CustomEvent('FB_B35_POST_PROGRESS_V44', { detail: detail }));
    } catch (_) {}
  }
  window.__HUDH__ = {
    set: function (np, msg) {
      np = Math.max(0, Math.min(100, Math.round(Number(np || 0))));
      if (np < p) np = p;
      p = np;
      emit('progress', { message: String(msg || '') });
    },
    inc: function () {
      rounds++;
      /* V44R11: progresso procedimental monotônico também em REEL, sem fingir novos comentários. */
      p = Math.max(p, Math.min(68, 8 + Math.round(rounds * 0.85)));
      emit('progress', { message: 'Carregando comentários em ondas…' });
    },
    setStats: function (a, b) {
      L1 = Number(a || 0);
      L2 = Number(b || 0);
      var target=Math.max(0,Number(typeof __DECLARED_COMMENT_TARGET_V44R3__!=='undefined'?__DECLARED_COMMENT_TARGET_V44R3__:0),Number(typeof __POST_COUNTS_SNAPSHOT__!=='undefined'&&__POST_COUNTS_SNAPSHOT__?__POST_COUNTS_SNAPSHOT__.comment:0),Number(typeof __REEL_COUNTS_SNAPSHOT__!=='undefined'&&__REEL_COUNTS_SNAPSHOT__?__REEL_COUNTS_SNAPSHOT__.comment:0));var observed=L1+L2,pct=target>0?Math.max(0,Math.min(100,(observed/target)*100)):0;emit('progress',{target:target,contentProgress:pct,message:'Comentários observados: '+L1+' · respostas: '+L2+(target>0?' · '+observed+'/'+target+' · '+pct.toFixed(2).replace('.',',')+'%':'')});
    },
    stop: function () { return stopped; },
    requestStop: function (reason) {
      stopped = true;
      emit('stopping', { message: String(reason || 'Parada solicitada pelo usuário.') });
    },
    done: function (msg) {
      if (done) return;
      done = true;
      p = 100;
      if (window.__FB_POST_SCRAPER_V44__) window.__FB_POST_SCRAPER_V44__.running = false;
      emit(/erro/i.test(String(msg || '')) ? 'error' : 'done', { message: String(msg || 'concluído') });
    }
  };
  emit('started', { message: 'Preparando coleta da postagem…' });
})();

/* ========= modal / scroll ========= */
var __REEL_COMMENT_PANEL_V44R21R3__=null;

var __PHOTO_COMMENT_PANEL_V44R21R4__=null;
function photoCommentEvidenceCountV44R21R4(el){
  if(!el||!el.querySelectorAll)return 0;var n=0;
  try{n+=el.querySelectorAll('a[href*="comment_id="],a[href*="reply_comment_id="],[aria-label^="Comment by" i],[aria-label^="Reply by" i],[aria-label^="Comentário de" i],[aria-label^="Resposta de" i]').length*4;}catch(_){}
  try{Array.prototype.slice.call(el.querySelectorAll('[role="button"],button,a,span')).slice(0,900).forEach(function(x){var z=U.T(x.getAttribute&&x.getAttribute('aria-label')||x.innerText||x.textContent||'');if(/^(?:Reply|Responder|Like|Curtir|See translation|Ver tradu[cç][aã]o)$/i.test(z))n++;});}catch(_){}
  return n;
}
function photoCommentSurfaceScoreV44R21R4(el){
  if(!el||!U.vis(el))return -9999;var r,score=0;
  try{r=el.getBoundingClientRect();if(r.width<260||r.height<220)return -9999;}catch(_){return -9999;}
  var tx=U.T(el.innerText||el.textContent||'').slice(0,5000),evidence=photoCommentEvidenceCountV44R21R4(el),editor=/write a comment|comment as|escreva um coment[aá]rio|comentar como/i.test(tx),filter=/all comments|most relevant|todos os coment[aá]rios|mais relevantes/i.test(tx);
  if(evidence<2&&!editor&&!filter)return -9999;
  score+=Math.min(2600,evidence*90)+(editor?720:0)+(filter?420:0);
  try{var vw=Math.max(1,Number(innerWidth||document.documentElement.clientWidth||1)),range=Math.max(0,Number(el.scrollHeight||0)-Number(el.clientHeight||0)),cs=getComputedStyle(el);if(r.left>vw*.42)score+=520;if(r.width>vw*.78)score-=700;if(r.width<vw*.60)score+=180;if(range>40)score+=Math.min(700,range/2);if(/auto|scroll|overlay/i.test(String(cs.overflowY||'')))score+=260;if(el.querySelector('img,video,canvas')&&r.width>vw*.62)score-=260;}catch(_){}
  return score;
}
function findPhotoCommentSurfaceV44R21R4(){
  var nodes=[];try{nodes=Array.prototype.slice.call(document.querySelectorAll('[role="dialog"],div[aria-modal="true"],aside,section,main,div')).slice(0,6500);}catch(_){}
  var best=null,bestScore=-9999;nodes.forEach(function(el){var sc=photoCommentSurfaceScoreV44R21R4(el);if(sc>bestScore){bestScore=sc;best=el;}});
  if(best&&bestScore>=900){__PHOTO_COMMENT_PANEL_V44R21R4__=best;return best;}
  if(__PHOTO_COMMENT_PANEL_V44R21R4__&&document.documentElement.contains(__PHOTO_COMMENT_PANEL_V44R21R4__)&&U.vis(__PHOTO_COMMENT_PANEL_V44R21R4__))return __PHOTO_COMMENT_PANEL_V44R21R4__;
  return null;
}
function nearestPhotoCommentCardV44R21R4(seed,panel){
  var cur=seed,best=null;for(var i=0;i<10&&cur&&cur!==panel&&cur!==document.body;i++,cur=cur.parentElement){try{var tx=U.T(cur.innerText||cur.textContent||''),links=cur.querySelectorAll('a[href*="comment_id="],a[href*="reply_comment_id="]').length,actions=cur.querySelectorAll('[aria-label*="Reply" i],[aria-label*="Responder" i],[aria-label*="Like" i],[aria-label*="Curtir" i]').length,r=cur.getBoundingClientRect();if(tx.length>=3&&tx.length<=1800&&r.width>=180&&(links||actions||/\b(?:Reply|Responder|Like|Curtir)\b/i.test(tx)))best=cur;if(best&&links&&actions)break;}catch(_){} }
  return best||seed;
}
function photoCommentCardsV44R21R4(panel){
  var out=[],seen=new Set();function add(x){if(!x||seen.has(x)||!U.vis(x))return;seen.add(x);out.push(x);}var seeds=[];
  try{seeds=seeds.concat(Array.prototype.slice.call(panel.querySelectorAll('[aria-label^="Comment by" i],[aria-label^="Reply by" i],[aria-label^="Comentário de" i],[aria-label^="Resposta de" i],a[href*="comment_id="],a[href*="reply_comment_id="]')).slice(0,2500));}catch(_){}
  seeds.forEach(function(x){add(nearestPhotoCommentCardV44R21R4(x,panel));});
  try{Array.prototype.slice.call(panel.querySelectorAll('div[role="article"],li[aria-posinset]')).forEach(add);}catch(_){}
  out=out.filter(function(x){return !out.some(function(y){return y!==x&&x.contains&&x.contains(y)&&U.T(y.innerText||y.textContent||'').length>=3;});});
  out.sort(function(a,b){return (a.compareDocumentPosition(b)&Node.DOCUMENT_POSITION_FOLLOWING)?-1:1;});return out;
}

/* O parser PHOTO V44R21R6 defeituoso foi removido desta candidata.
   A implementação ativa começa no bloco V44R21R7 abaixo. */

function reelCommentSurfaceScoreV44R21R3(el){if(!el||!U.vis(el))return -9999;var label=U.T(el.getAttribute&&el.getAttribute('aria-label')||''),txt=U.T((el.innerText||el.textContent||'')).slice(0,2400),joined=label+' '+txt,editor=/write a comment|comment as|escreva um coment[aá]rio|comentar como|escribe un comentario/i.test(joined),filter=/all comments|most relevant|todos os coment[aá]rios|mais relevantes|todos los comentarios|m[aá]s relevantes/i.test(joined),rows=0;try{rows=el.querySelectorAll('div[role="article"],li[aria-posinset],[aria-label^="Comment by" i],[aria-label^="Reply by" i],[aria-label^="Comentário de" i],[aria-label^="Resposta de" i]').length;}catch(_){}if(!editor&&!filter&&rows<1)return -9999;var score=(editor?1050:0)+(filter?520:0)+Math.min(1200,rows*120);try{var r=el.getBoundingClientRect(),vw=Math.max(1,Number(innerWidth||document.documentElement.clientWidth||1)),range=Math.max(0,Number(el.scrollHeight||0)-Number(el.clientHeight||0)),cs=getComputedStyle(el),role=String(el.getAttribute&&el.getAttribute('role')||'').toLowerCase();if(r.width<230||r.height<210)return -9999;if(r.left>vw*.38&&r.width<vw*.68)score+=460;if(r.width>vw*.82)score-=900;if(range>60)score+=Math.min(520,range/3);if(/auto|scroll|overlay/i.test(String(cs.overflowY||'')))score+=220;if(role==='dialog'||role==='complementary'||String(el.getAttribute&&el.getAttribute('aria-modal')||'')==='true')score+=300;if(/comment|coment/i.test(label))score+=260;if(String(el.tagName||'').toLowerCase()==='main'&&!editor&&rows<2)score-=1200;}catch(_){return -9999;}return score;}
function findReelCommentSurfaceV44R21R3(){var nodes=[];try{nodes=Array.prototype.slice.call(document.querySelectorAll('[role="dialog"],div[aria-modal="true"],[role="complementary"],[aria-label*="comment" i],[aria-label*="coment" i],aside,section,div,main')).slice(0,5000);}catch(_){}var best=null,bestScore=-9999;nodes.forEach(function(el){var sc=reelCommentSurfaceScoreV44R21R3(el);if(sc>bestScore){bestScore=sc;best=el;}});return bestScore>=900?best:null;}

/* V44R21R7 — parser PHOTO substituto baseado no DOM real observado.
   Corrige a rejeição indevida de links de perfil que carregam comment_id na
   query string e forma cartões pela união autor + texto + ações, mesmo sem
   role=article, aria-posinset ou data-comment-id. */
function photoActionSeedsV44R21R7(root){
  var out=[],seen=new Set(),nodes=[];
  try{nodes=Array.prototype.slice.call((root||document).querySelectorAll('button,[role="button"],a,span,[tabindex]')).slice(0,12000);}catch(_){}
  nodes.forEach(function(x){
    if(!U.vis(x)||x.closest&&x.closest('#fb-b35-unified-v44-panel'))return;
    var z=U.T(x.getAttribute&&x.getAttribute('aria-label')||x.getAttribute&&x.getAttribute('title')||x.innerText||x.textContent||'');
    if(!z||z.length>120)return;
    if(!/^(?:Reply|Responder|Like|Curtir|See translation|Ver tradu[cç][aã]o|See Original|Ver original)(?:\b|\s|$)/i.test(z))return;
    if(seen.has(x))return;seen.add(x);out.push(x);
  });
  return out;
}
function photoProfileLinksV44R21R7(root){
  var out=[],seen=new Set();
  try{Array.prototype.slice.call((root||document).querySelectorAll('a[href],[role="link"][href]')).slice(0,12000).forEach(function(a){
    if(!U.vis(a)||a.closest&&a.closest('#fb-b35-unified-v44-panel'))return;
    var href=String(a.href||a.getAttribute('href')||''),name=U.T(a.innerText||a.textContent||a.getAttribute('aria-label')||'');
    if(!name||name.length<2||name.length>120||isActionLabel(name)||isLikelyTimestamp(name))return;
    var ident=profileIdentityFromUrl(href);if(!ident)return;
    try{var u=new URL(href,location.href),p=(u.pathname||'').toLowerCase();if(/\/(?:posts|reel|reels|photo|photos|videos|stories)(?:\/|$)/i.test(p))return;}catch(_){}
    /* comment_id/reply_comment_id são contexto do comentário, não prova de que
       o href deixou de ser um perfil. A V44R21R6 eliminava justamente esses autores. */
    if(seen.has(ident))return;seen.add(ident);out.push(a);
  });}catch(_){}
  return out;
}
function photoVisualCardFromSeedV44R21R7(seed,boundary){
  var cur=seed,best=null,bestScore=-99999;
  for(var i=0;i<13&&cur&&cur!==boundary&&cur!==document.body;i++,cur=cur.parentElement){
    try{
      if(cur.closest&&cur.closest('#fb-b35-unified-v44-panel'))continue;
      var r=cur.getBoundingClientRect(),tx=U.T(cur.innerText||cur.textContent||''),profiles=photoProfileLinksV44R21R7(cur),actions=photoActionSeedsV44R21R7(cur);
      if(r.width<170||r.width>820||r.height<34||r.height>720||tx.length<3||tx.length>2600||profiles.length<1||actions.length<1)continue;
      var distinct={};profiles.forEach(function(a){var id=profileIdentityFromUrl(a.href||'');if(id)distinct[id]=1;});var pc=Object.keys(distinct).length;
      var score=1200+(pc===1?900:Math.max(-900,500-pc*300))+Math.min(700,actions.length*120)-Math.max(0,r.height-300)*1.5;
      if(r.left>innerWidth*.43)score+=700;if(r.right>innerWidth*.96)score+=100;
      if(actions.length>10)score-=900;if(pc>3)score-=900;if(r.width>innerWidth*.56)score-=650;
      if(/\b(?:Reply|Responder|Like|Curtir)\b/i.test(tx))score+=220;
      if(score>bestScore){bestScore=score;best=cur;}
      /* O menor ancestral com um único autor e ações próprias é preferível. */
      if(pc===1&&actions.length>=2&&r.height<=360)break;
    }catch(_){}
  }
  return best;
}
function photoCommentCardsV44R21R7(panel){
  var root=panel||document,out=[],seen=new Set();
  function add(x){
    if(!x||seen.has(x)||!U.vis(x)||x.closest&&x.closest('#fb-b35-unified-v44-panel'))return;
    try{var r=x.getBoundingClientRect();if(r.right<innerWidth*.42||r.width<160||r.height<30)return;}catch(_){}
    seen.add(x);out.push(x);
  }
  try{photoCommentCardsV44R21R4(root).forEach(add);}catch(_){}
  photoActionSeedsV44R21R7(root).forEach(function(x){add(photoVisualCardFromSeedV44R21R7(x,root));});
  photoProfileLinksV44R21R7(root).forEach(function(x){add(photoVisualCardFromSeedV44R21R7(x,root));});
  out=out.filter(function(x){return x&&!out.some(function(y){
    if(y===x||!x.contains||!x.contains(y))return false;
    var xp=photoProfileLinksV44R21R7(x).length,yp=photoProfileLinksV44R21R7(y).length;
    return yp>=1&&yp<=xp&&U.T(y.innerText||y.textContent||'').length>=3;
  });});
  out.sort(function(a,b){return (a.compareDocumentPosition(b)&Node.DOCUMENT_POSITION_FOLLOWING)?-1:1;});
  return out;
}
function photoSurfaceDiagnosticsV44R21R7(root){
  root=root||document;var actions=photoActionSeedsV44R21R7(root).length,profiles=photoProfileLinksV44R21R7(root).length,cards=0;
  try{cards=photoCommentCardsV44R21R7(root).length;}catch(_){}
  return {version:'PHOTO_DOM_REAL_V44R21R7',actionSeeds:actions,profileLinks:profiles,visualCards:cards};
}
function findPhotoCommentSurfaceV44R21R7(){
  var seeds=photoActionSeedsV44R21R7(document).concat(photoProfileLinksV44R21R7(document)),candidates=[],seen=new Set();
  seeds.slice(0,1200).forEach(function(seed){var cur=seed;for(var i=0;i<14&&cur&&cur!==document.body;i++,cur=cur.parentElement){if(seen.has(cur))continue;seen.add(cur);candidates.push(cur);}});
  try{Array.prototype.slice.call(document.querySelectorAll('aside,[role="dialog"],div[aria-modal="true"],section,main')).slice(0,1500).forEach(function(x){if(!seen.has(x)){seen.add(x);candidates.push(x);}});}catch(_){}
  var legacy=findPhotoCommentSurfaceV44R21R4();if(legacy&&!seen.has(legacy))candidates.push(legacy);
  var best=null,bestScore=-99999;
  candidates.forEach(function(el){
    try{
      if(!U.vis(el)||el.closest&&el.closest('#fb-b35-unified-v44-panel'))return;
      var r=el.getBoundingClientRect();if(r.width<240||r.height<180||r.width>innerWidth*.72)return;
      var d=photoSurfaceDiagnosticsV44R21R7(el),range=Math.max(0,Number(el.scrollHeight||0)-Number(el.clientHeight||0)),tx=U.T(el.innerText||el.textContent||'').slice(0,5000);
      var score=d.visualCards*1500+d.actionSeeds*70+d.profileLinks*110+Math.min(900,range/2);
      if(r.left>innerWidth*.42)score+=900;if(r.right>innerWidth*.92)score+=180;
      if(/comment as|write a comment|reply to|comentar como|escreva um coment[aá]rio|responder a/i.test(tx))score+=650;
      if(d.visualCards===0&&d.profileLinks<1)score-=1800;
      if(score>bestScore){bestScore=score;best=el;}
    }catch(_){}
  });
  if(best&&bestScore>=1150){__PHOTO_COMMENT_PANEL_V44R21R4__=best;try{best.__FB_PHOTO_DIAGNOSTIC_V44R21R7__=photoSurfaceDiagnosticsV44R21R7(best);}catch(_){}return best;}
  if(legacy)return legacy;
  return null;
}



/* V44R21R8 — PHOTO por identidade de comentário e REEL por trilho métrico.
   Fundamento: os diagnósticos autenticados V2 mostraram que PHOTO não possui
   scroller lateral dedicado e que o autor real é o link de perfil que carrega
   comment_id/reply_comment_id. No REEL, os números de reação/comentário/
   compartilhamento são controles compactos irmãos do cartão data-video-id,
   sem aria-label útil. */
function photoRouteIdV44R21R8(){try{return new URL(location.href).searchParams.get('fbid')||'';}catch(_){return '';}}
function photoRouteLockedV44R21R8(id){return !id||photoRouteIdV44R21R8()===String(id);}
function photoCommentIdInfoV44R21R8(href){
  try{var u=new URL(String(href||''),location.href),rid=u.searchParams.get('reply_comment_id')||'',cid=u.searchParams.get('comment_id')||'';return {id:rid||cid||'',rootId:cid||'',isReply:!!rid};}catch(_){return {id:'',rootId:'',isReply:false};}
}
function photoCommentAuthorAnchorsV44R21R8(root){
  var out=[],seen=new Set(),nodes=[];root=root||document;
  try{nodes=Array.prototype.slice.call(root.querySelectorAll('a[href*="comment_id="],a[href*="reply_comment_id="]')).slice(0,6000);}catch(_){}
  nodes.forEach(function(a){
    if(!a||seen.has(a)||!U.vis(a)||a.closest&&a.closest('#fb-b35-unified-v44-panel'))return;
    var href=String(a.href||a.getAttribute('href')||''),info=photoCommentIdInfoV44R21R8(href),name=U.T(a.innerText||a.textContent||a.getAttribute('aria-label')||'');
    if(!info.id||!name||name.length<2||name.length>120||isActionLabel(name)||isLikelyTimestamp(name))return;
    if(!profileIdentityFromUrl(href))return;
    try{var u=new URL(href,location.href),p=String(u.pathname||'').toLowerCase();if(/\/(?:photo(?:\.php)?|posts|reel|reels|videos|stories)(?:\/|$)/i.test(p))return;var r=a.getBoundingClientRect();if(r.right<innerWidth*.40||r.width<8||r.height<8)return;}catch(_){}
    seen.add(a);out.push(a);
  });
  return out;
}
function photoAuthorAnchorScoreV44R21R8(a){
  var score=0;try{var r=a.getBoundingClientRect();score+=Math.max(0,600-r.top*.02);if(a.closest('h1,h2,h3,h4,h5,strong,b'))score+=700;var fw=parseInt(getComputedStyle(a).fontWeight,10)||0;if(fw>=600)score+=350;var auto=a.closest('div[dir="auto"],span[dir="auto"],p');if(auto){var z=U.T(auto.innerText||auto.textContent||'');if(z.length>U.T(a.innerText||a.textContent||'').length+8)score-=550;}if(r.left>innerWidth*.55)score+=220;}catch(_){}return score;
}
function photoCardFromAuthorV44R21R8(a,boundary){
  if(!a)return null;var article=null;try{article=a.closest('[role="article"],li[aria-posinset]');}catch(_){}
  if(article&&U.vis(article)){try{var ar=article.getBoundingClientRect();if(ar.width>=180&&ar.width<=760&&ar.height>=35&&ar.height<=900)return article;}catch(_){} }
  var cur=a,best=null,bestScore=-99999;
  for(var i=0;i<13&&cur&&cur!==boundary&&cur!==document.body;i++,cur=cur.parentElement){try{
    var r=cur.getBoundingClientRect(),tx=U.T(cur.innerText||cur.textContent||''),actions=photoActionSeedsV44R21R7(cur).length,ids=cur.querySelectorAll('a[href*="comment_id="],a[href*="reply_comment_id="]').length;
    if(r.width<180||r.width>760||r.height<35||r.height>800||tx.length<3||tx.length>2400||!actions||!ids)continue;
    var score=actions*180+ids*120-Math.max(0,r.height-320)*2;if(r.left>innerWidth*.42)score+=650;if(/\b(?:Reply|Responder|Like|Curtir)\b/i.test(tx))score+=300;if(ids>8||actions>14)score-=1000;
    if(score>bestScore){bestScore=score;best=cur;}if(ids<=3&&actions>=2&&r.height<=420)break;
  }catch(_){} }
  return best;
}

/* V44R21R11 - assets de comentário PHOTO: avatar deve estar ligado ao autor;
   stickers/GIFs são mídia do comentário e nunca avatar. */
function photoIsStickerAssetV44R21R11(raw){return /(?:t39\.1997-6|\/emg1\/v\/t13|giphy|tenor|sticker|emoji|reaction|\.gif(?:\?|$)|dst-gif)/i.test(String(raw||''));}
function photoCommentAvatarV44R21R11(card,authorAnchor){
  if(!card||!authorAnchor)return '';var ar=null;try{ar=authorAnchor.getBoundingClientRect();}catch(_){}var candidates=[];
  function add(el,bonus){try{if(!el||!U.vis(el))return;var src=visualAssetUrlV44R12(el);if(!src||!/fbcdn\.net/i.test(src)||photoIsStickerAssetV44R21R11(src))return;var r=el.getBoundingClientRect(),w=Number(r.width||0),h=Number(r.height||0);if(w<18||h<18||w>90||h>90)return;var ratio=Math.min(w,h)/Math.max(w,h);if(ratio<.72)return;var inside=authorAnchor.contains&&authorAnchor.contains(el),dy=ar?Math.abs((r.top+r.height/2)-(ar.top+ar.height/2)):0,dx=ar?ar.left-(r.left+r.width):0;if(ar&&!inside&&(dy>58||dx<-90||dx>150))return;var score=Number(bonus||0)+(inside?1800:0)+(ar?700-Math.round(dy*8)-Math.round(Math.abs(dx-16)*2):0)+Math.min(120,w*h/20);candidates.push({url:src,score:score});}catch(_){} }
  try{visualAssetNodesV44R12(authorAnchor).forEach(function(x){add(x,1800);});}catch(_){}
  var cur=authorAnchor;for(var i=0;i<5&&cur&&cur!==card.parentElement;i++,cur=cur.parentElement){try{visualAssetNodesV44R12(cur).forEach(function(x){add(x,500-i*80);});}catch(_){} }
  candidates.sort(function(a,b){return b.score-a.score;});return candidates[0]&&candidates[0].score>=650?candidates[0].url:'';
}
function photoCommentMediaV44R21R11(card,avatarUrl){
  var out=[],seen={};if(!card)return out;var nodes=[];try{nodes=visualAssetNodesV44R12(card).slice(0,300);}catch(_){}
  nodes.forEach(function(el){try{if(!U.vis(el))return;var src=visualAssetUrlV44R12(el);if(!src||src===avatarUrl||seen[src])return;var r=el.getBoundingClientRect(),w=Number(r.width||0),h=Number(r.height||0),sticker=photoIsStickerAssetV44R21R11(src);if(!sticker&&(w<72||h<48))return;if(!sticker&&w<=90&&h<=90&&Math.min(w,h)/Math.max(w,h)>.72)return;if(/static\.xx\.fbcdn\.net.*rsrc\.php/i.test(src)&&w<80&&h<80)return;seen[src]=1;out.push({type:'image',url:src,alt:U.T(el.getAttribute&&el.getAttribute('alt')||''),kind:sticker?'sticker':'comment_image',width:Math.round(w),height:Math.round(h)});}catch(_){} });return out;
}
function photoTextNoiseV44R21R11(s){return /^(?:by Author|pelo autor|por el autor|Most relevant|All comments|Comments|Like|Curtir|Reply|Responder|See translation|Ver tradu[cç][aã]o|View \d+ repl(?:y|ies)|Ver \d+ respostas?|Follow|Seguir)$/i.test(U.T(s||''));}
function photoCommentTextV44R21R8(card,authorAnchor){
  var author=U.T(authorAnchor&&authorAnchor.innerText||authorAnchor&&authorAnchor.textContent||''),blocks=[];
  try{Array.prototype.slice.call(card.querySelectorAll('div[dir="auto"],span[dir="auto"],p')).slice(0,700).forEach(function(x){
    if(!U.vis(x)||authorAnchor&&x.contains&&x.contains(authorAnchor))return;var s=U.T(textWithEmoji(x));if(!s||s===author||s.length>2200||isLikelyTimestamp(s)||isActionLabel(s)||isJunk(s)||photoTextNoiseV44R21R11(s))return;
    if(/^(?:Like|Curtir|Reply|Responder|See translation|Ver tradu[cç][aã]o|View \d+ repl|Ver \d+ respostas?|by Author|pelo autor)\b/i.test(s))return;
    var score=Math.min(1200,s.length*5);if(x.querySelector&&x.querySelector('a[href*="comment_id="],a[href*="reply_comment_id="]'))score-=350;if(/\b(?:Like|Curtir|Reply|Responder|See translation|Ver tradu[cç][aã]o|by Author)\b/i.test(s))score-=300;if(s.indexOf(author)>=0&&s.length<=author.length+12)score-=600;blocks.push({text:s,score:score});
  });}catch(_){}
  blocks.sort(function(a,b){return b.score-a.score||b.text.length-a.text.length;});if(blocks.length&&blocks[0].score>0)return blocks[0].text;
  var raw=U.T(mainTextWithoutAuthor(card,{name:author,_el:authorAnchor})||'');raw=raw.replace(/by\s*Author/ig,'').replace(/\b(?:Like|Curtir|Reply|Responder|See translation|Ver tradu[cç][aã]o)\b.*$/i,'').trim();return raw===author||photoTextNoiseV44R21R11(raw)?'':raw;
}
function photoCommentRecordsV44R21R8(root){
  root=root||photoContractPanelV44R21R10()||document;var anchors=photoCommentAuthorAnchorsV44R21R8(root),byCard=new Map();
  anchors.forEach(function(a){var card=photoCardFromAuthorV44R21R8(a,root);if(!card)return;var role=photoCommentRoleV44R21R10(card);if(!role)return;var prev=byCard.get(card),score=photoAuthorAnchorScoreV44R21R8(a);if(!prev||score>prev.score)byCard.set(card,{a:a,score:score,role:role});});
  var recs=[],sourceSeen={};byCard.forEach(function(v,card){try{
    var a=v.a,href=String(a.href||a.getAttribute('href')||''),info=photoCommentIdInfoV44R21R8(href),name=U.T(a.innerText||a.textContent||''),av=photoCommentAvatarV44R21R11(card,a),media=photoCommentMediaV44R21R11(card,av),tx=photoCommentTextV44R21R8(card,a);if(!name||(!tx&&!media.length)||!info.id)return;
    var isReply=v.role==='reply'||info.isReply,rootId=isReply?photoReplyParentIdV44R21R10(card):(info.id||info.rootId),ts=timestampOf(card),reacts=extractReactions(card),r=card.getBoundingClientRect();
    var sid='comment:'+info.id;if(sourceSeen[sid])sid+=':'+encodeURIComponent(U.T(name+'|'+tx+'|'+(media[0]&&media[0].url||''))).slice(0,180);sourceSeen['comment:'+info.id]=1;
    recs.push({el:card,sourceId:sid,id:info.id,rootId:rootId||info.rootId||'',isReply:isReply,left:Number(r.left||0),top:Number(r.top||0),author:name,authorHref:canonicalProfilePageV44R3(href)||href,text:tx,tstamp:ts,av:av,reacts:reacts,media:media,contentKind:tx?(media.length?'text_and_media':'text'):'media_only',ariaLabel:U.T(card.getAttribute('aria-label')||'')});
  }catch(_){} });recs.sort(function(a,b){return a.top-b.top||a.left-b.left;});return recs;
}
function photoCollectSliceV44R21R8(root){
  var recs=photoCommentRecordsV44R21R8(root||photoContractPanelV44R21R10()||document);if(!recs.length)return {L1:0,L2:0,rows:[],diagnostics:{version:'PHOTO_TARGET_BOUND_ALL_COMMENTS_V44R21R13',records:0}};
  var rows=[],roots={},replyQueue=[];function nodeOf(it){return {type:it.isReply?'reply':'comment',sourceId:it.sourceId,author:it.author,authorHref:it.authorHref||'#',text:it.text,contentKind:it.contentKind||'text',likes:(it.reacts&&it.reacts.total!=null?it.reacts.total:''),date:it.tstamp&&it.tstamp.text||'',dateISO:it.tstamp&&it.tstamp.iso||null,avatarUrl:it.av||null,avatar:null,avatarBindingReason:it.av?'PHOTO_COMMENT_AUTHOR_GEOMETRIC_V44R21R11':'PHOTO_COMMENT_AVATAR_PROFILE_FALLBACK_PENDING',replies:[],reacts:it.reacts,media:it.media||[]};}
  recs.forEach(function(it){if(!it.isReply){var n=nodeOf(it);rows.push(n);roots[it.id||it.rootId||it.sourceId]=n;}else replyQueue.push(it);});
  replyQueue.forEach(function(it){var n=nodeOf(it),parent=it.rootId&&roots[it.rootId];if(!parent){for(var i=rows.length-1;i>=0;i--){var rr=recs.filter(function(r){return !r.isReply&&r.sourceId===rows[i].sourceId;})[0];if(rr&&rr.top<=it.top){parent=rows[i];break;}}}if(parent)parent.replies.push(n);else rows.push(n);});
  var L1=rows.filter(function(x){return x.type!=='reply';}).length,L2=0;rows.forEach(function(x,idx){x.num=String(idx+1);(x.replies||[]).forEach(function(r,j){r.num=String(idx+1)+'.'+String(j+1);L2++;});});
  return {L1:L1,L2:L2,rows:rows,diagnostics:{version:'PHOTO_TARGET_BOUND_ALL_COMMENTS_V44R21R13',records:recs.length,authorAnchors:photoCommentAuthorAnchorsV44R21R8(root||document).length,totalObserved:L1+L2,mainComments:L1,replies:L2,rolesFromAriaLabel:true}};
}
function photoCommentCardsV44R21R8(root){return photoCommentRecordsV44R21R8(root||document).map(function(x){return x.el;});}
function photoSurfaceDiagnosticsV44R21R8(root){var recs=photoCommentRecordsV44R21R8(root||document);return {version:'PHOTO_TARGET_BOUND_ALL_COMMENTS_V44R21R13',authorAnchors:photoCommentAuthorAnchorsV44R21R8(root||document).length,records:recs.length,visualCards:recs.length,actionSeeds:photoActionSeedsV44R21R7(root||document).length};}
function findPhotoCommentSurfaceV44R21R8(){
  var recs=photoCommentRecordsV44R21R8(document),cands=[],seen=new Set();recs.forEach(function(rec){var cur=rec.el;for(var i=0;i<10&&cur&&cur!==document.body;i++,cur=cur.parentElement){if(!seen.has(cur)){seen.add(cur);cands.push(cur);}}});
  var best=null,bestScore=-99999;cands.forEach(function(el){try{if(!U.vis(el)||el.closest&&el.closest('#fb-b35-unified-v44-panel'))return;var r=el.getBoundingClientRect(),vw=Math.max(1,innerWidth||1),vh=Math.max(1,innerHeight||1);if(r.width<220||r.width>Math.min(780,vw*.55)||r.height<90||r.height>vh*1.4||r.left<vw*.38)return;var count=recs.filter(function(x){return el.contains(x.el);}).length,range=Math.max(0,Number(el.scrollHeight||0)-Number(el.clientHeight||0)),tx=U.T(el.innerText||el.textContent||'').slice(0,3000),score=count*2200+Math.min(700,range)+(r.left>vw*.62?500:0);if(/comment as|write a comment|reply to|comentar como|responder a/i.test(tx))score+=600;if(r.width>vw*.48)score-=400;if(score>bestScore){bestScore=score;best=el;}}catch(_){} });
  if(best){__PHOTO_COMMENT_PANEL_V44R21R4__=best;return best;}if(recs[0])return recs[0].el.parentElement||recs[0].el;return null;
}
function photoScrollCandidatesV44R21R8(){
  var recs=photoCommentRecordsV44R21R8(document),out=[],seen=new Set();
  function add(cur,score,kind){if(!cur||seen.has(cur))return;seen.add(cur);try{var range=Math.max(0,Number(cur.scrollHeight||0)-Number(cur.clientHeight||0));if(range<=24)return;var r=cur===document.scrollingElement?{left:0,width:innerWidth,height:innerHeight}:cur.getBoundingClientRect();if(cur!==document.scrollingElement&&(r.width<220||r.height<150))return;out.push({el:cur,score:Number(score||0)+range,kind:kind||'ancestor'});}catch(_){} }
  recs.forEach(function(rec){var cur=rec.el;for(var i=0;i<14&&cur&&cur!==document.documentElement;i++,cur=cur.parentElement){try{var r=cur.getBoundingClientRect(),range=Math.max(0,Number(cur.scrollHeight||0)-Number(cur.clientHeight||0)),cs=getComputedStyle(cur);if(range>24&&r.left>innerWidth*.34&&r.width>=220&&r.width<=900&&r.height>=150)add(cur,5000-i*120+(/auto|scroll|overlay/i.test(String(cs.overflowY||''))?1600:0),'right_panel');}catch(_){} }});
  var root=document.scrollingElement||document.documentElement;try{if(root&&Number(root.scrollHeight||0)>Number(root.clientHeight||0)+24)add(root,3500+(recs.length?1200:0),'document_root');}catch(_){}
  var panel=findPhotoCommentSurfaceV44R21R8();if(panel)add(panel,6500,'classified_surface');
  out.sort(function(a,b){return b.score-a.score;});return out.slice(0,5).map(function(x){try{x.el.__FB_PHOTO_SCROLL_KIND_V44R21R11=x.kind;}catch(_){}return x.el;});
}
function clickPhotoReplyControlsV44R21R8(){
  var clicked=0,nodes=[];try{nodes=Array.prototype.slice.call(document.querySelectorAll('button,[role="button"],a,span,div')).slice(0,14000);}catch(_){}
  nodes.forEach(function(el){if(clicked>=10||!U.vis(el)||el.closest&&el.closest('#fb-b35-unified-v44-panel'))return;var z=U.T(el.getAttribute&&el.getAttribute('aria-label')||el.innerText||el.textContent||'');
    var replies=/^(?:View|See|Show|Ver|Mostrar)\s+(?:\d+\s+)?(?:more\s+)?(?:repl(?:y|ies)|respostas?)(?:\b|$)/i.test(z);
    var comments=/^(?:View|See|Show|Load|Ver|Mostrar|Carregar)\s+(?:(?:all|todos?)\s+)?(?:(?:\d+|more|mais|previous|anteriores?)\s+)?(?:comments?|coment[aá]rios?)(?:\b|$)/i.test(z);
    if(!replies&&!comments)return;if(/Most relevant|Mais relevantes|All comments$|Todos os coment[aá]rios$/i.test(z))return;
    try{clickObservedControlV44R17(el);clicked++;}catch(_){}
  });return clicked;
}
function currentReelIdV44R21R8(){var m=String(location.pathname||'').match(/\/reel\/(\d+)/i);return m&&m[1]||'';}
function activeReelCardV44R21R8(){var id=currentReelIdV44R21R8(),card=null;try{if(id)card=document.querySelector('[data-video-id="'+id.replace(/"/g,'')+'"]');if(!card){var all=Array.prototype.slice.call(document.querySelectorAll('[data-video-id]')).filter(U.vis);all.sort(function(a,b){var ar=a.getBoundingClientRect(),br=b.getBoundingClientRect(),acy=Math.abs((ar.top+ar.bottom)/2-innerHeight/2),bcy=Math.abs((br.top+br.bottom)/2-innerHeight/2);return acy-bcy;});card=all[0]||null;}}catch(_){}return card;}
function reelExactCountV44R21R8(el){var raw=U.T(el&&((el.innerText||el.textContent)||(el.getAttribute&&el.getAttribute('aria-label')))||'');if(!raw||raw.length>24||!/^[\d.,]+\s*(?:[KkMmBb]|mil|mi|bi)?$/i.test(raw))return null;var n=Number(parseFacebookCount(raw));return isFinite(n)?n:null;}
function reelMetricNumericNodesV44R21R8(expectedValues){
  var card=activeReelCardV44R21R8(),out=[],seen={},vals={};(expectedValues||[]).forEach(function(n){if(Number(n)>=0)vals[Number(n)]=1;});if(!card)return out;var cr=card.getBoundingClientRect(),nodes=[];try{nodes=Array.prototype.slice.call(document.querySelectorAll('span,div,a,[role="button"],button')).slice(0,12000);}catch(_){}
  nodes.forEach(function(el){if(!U.vis(el)||el.closest&&el.closest('#fb-b35-unified-v44-panel'))return;var n=reelExactCountV44R21R8(el);if(n==null||!vals[n])return;try{var r=el.getBoundingClientRect();if(r.width<4||r.height<4||r.width>150||r.height>70)return;if(r.left<cr.right-90||r.left>Math.min(innerWidth,cr.right+560)||r.top<cr.top+180||r.bottom>cr.bottom+130)return;if(el.contains(card)||card.contains(el))return;var multi=el.querySelectorAll?el.querySelectorAll('[data-video-id]').length:0;if(multi>0)return;var key=Math.round(r.left)+'|'+Math.round(r.top)+'|'+Math.round(r.width)+'|'+Math.round(r.height)+'|'+n,area=r.width*r.height,prev=seen[key];if(!prev||area<prev.area){seen[key]={el:el,count:n,top:r.top,left:r.left,area:area,rect:r};}}catch(_){} });Object.keys(seen).forEach(function(k){out.push(seen[k]);});out.sort(function(a,b){return a.top-b.top||a.left-b.left||a.area-b.area;});return out;
}
function reelMetricClickableV44R21R8(node,kind){
  var cur=node&&node.el,best=cur,card=activeReelCardV44R21R8();for(var i=0;i<7&&cur&&cur!==document.body;i++,cur=cur.parentElement){try{var r=cur.getBoundingClientRect(),role=String(cur.getAttribute&&cur.getAttribute('role')||'').toLowerCase(),tag=String(cur.tagName||'').toLowerCase(),label=U.T(cur.getAttribute&&cur.getAttribute('aria-label')||cur.getAttribute&&cur.getAttribute('title')||'');if(r.width>220||r.height>125||r.width<4||r.height<4)continue;if(card&&(cur.contains(card)||card.contains(cur)))continue;if(cur.querySelectorAll&&cur.querySelectorAll('[data-video-id]').length)continue;if(kind==='REACTION'&&/^(?:Like|Curtir|Unlike|Descurtir)$/i.test(label))continue;if(tag==='button'||tag==='a'||role==='button'||cur.hasAttribute&&cur.hasAttribute('tabindex')){best=cur;break;}}catch(_){} }return best;
}
function reelMetricRailV44R21R8(){
  var c=__REEL_COUNTS_SNAPSHOT__||{},like=Number(c.like||0),comment=Number(c.comment||0),share=Number(c.share||0),nodes=reelMetricNumericNodesV44R21R8([like,comment,share]),used=new Set(),reaction=null,commentNode=null,shareNode=null;
  function take(value,minTop){for(var i=0;i<nodes.length;i++){var x=nodes[i];if(used.has(x.el)||x.count!==value||x.top<Number(minTop||-1))continue;used.add(x.el);return x;}return null;}
  reaction=take(like,-1);var afterReaction=reaction?reaction.top+3:-1;commentNode=take(comment,afterReaction);shareNode=take(share,commentNode?commentNode.top+3:afterReaction);if(!commentNode)commentNode=take(comment,-1);if(!shareNode)shareNode=take(share,commentNode?commentNode.top+3:-1);
  function desc(kind,x){return x?{kind:kind,count:x.count,el:x.el,clickTarget:reelMetricClickableV44R21R8(x,kind),top:x.top,left:x.left}:null;}
  var result={version:'REEL_METRIC_RAIL_V44R21R8',reelId:currentReelIdV44R21R8(),reaction:desc('REACTION',reaction),comment:desc('COMMENT',commentNode),share:desc('SHARE',shareNode),candidates:nodes.map(function(x){return {count:x.count,top:x.top,left:x.left};})};window.__FB_REEL_METRIC_RAIL_LAST_V44R21R8__=result;return result;
}
function reelRouteLockedV44R21R8(id){return !id||currentReelIdV44R21R8()===String(id);}
function photoTypedReactionTriggersV44R21R8(declaredTotal){
  if(!isPhotoContext())return [];var found=[],seen=new Set(),nodes=[];try{nodes=Array.prototype.slice.call(document.querySelectorAll('[role="toolbar"][aria-label*="react" i] [role="button"][aria-label]')).slice(0,500);}catch(_){}
  nodes.forEach(function(el){if(seen.has(el)||!U.vis(el))return;var toolbar=el.closest&&el.closest('[role="toolbar"][aria-label*="react" i]');if(!toolbar)return;var info=reactionTriggerInfoV44R21R4(el);if(!info||info.mode!=='typed')return;seen.add(el);var sc=reactionTriggerScoreV44R21R4(el,info,declaredTotal,findPostSurface('PHOTO')||document.body)+6000;found.push({el:el,clickTargets:[el],info:{label:info.label,type:info.type,reactionLabel:info.reactionLabel,emoji:info.emoji,count:info.count,mode:'photo_typed_exact'},score:sc});});
  var uniq={};found=found.filter(function(x){if(uniq[x.info.type])return false;uniq[x.info.type]=1;return true;});found.sort(function(a,b){return b.score-a.score||Number(b.info.count||0)-Number(a.info.count||0);});return found;
}
try{window.__FB_R21R8_DIAGNOSTIC__={photoRecords:function(){return photoCommentRecordsV44R21R8(document).map(function(x){return {sourceId:x.sourceId,author:x.author,text:x.text,isReply:x.isReply,left:x.left,top:x.top};});},photoSurface:findPhotoCommentSurfaceV44R21R8,photoTriggers:function(){return photoTypedReactionTriggersV44R21R8(Number(__POST_COUNTS_SNAPSHOT__&&__POST_COUNTS_SNAPSHOT__.like||0)).map(function(x){return x.info;});},reelMetricRail:reelMetricRailV44R21R8};}catch(_){}


function panelRoot() {
  if(isReelContext()){
    var reel=findReelCommentSurfaceV44R21R3();if(reel){__REEL_COMMENT_PANEL_V44R21R3__=reel;return reel;}
    if(__REEL_COMMENT_PANEL_V44R21R3__&&document.documentElement.contains(__REEL_COMMENT_PANEL_V44R21R3__)&&U.vis(__REEL_COMMENT_PANEL_V44R21R3__))return __REEL_COMMENT_PANEL_V44R21R3__;
  }
  if(isPhotoContext()){
    var photo=findPhotoCommentSurfaceV44R21R8();if(photo)return photo;
  }
  if(postTypeFromUrl(location.href)==='POST'){var post16=findPostTargetDialogV44R21R16();if(post16)return post16;}
  var dlg = U.first(U.qa('[role="dialog"],div[aria-modal="true"]'), function(el){return U.vis(el)&&!postOwnedUiV44R21R16(el);});
  return dlg || document.body;
}
function reelCommentControlCandidatesV44R21R3(){
  var out=[],seen=[];function add(el,score,why){if(!el||seen.indexOf(el)>=0||!U.vis(el))return;seen.push(el);out.push({el:el,score:score,why:why});}
  var rail=reelMetricRailV44R21R8();if(rail.comment&&rail.comment.clickTarget)add(rail.comment.clickTarget,5200,'metric_rail_v44r21r8');
  var nodes=[];try{nodes=Array.prototype.slice.call(document.querySelectorAll('button,[role="button"],[aria-label],[title],a[role="link"]')).slice(0,3500);}catch(_){}
  nodes.forEach(function(el,i){var label=U.T((el.getAttribute&&el.getAttribute('aria-label')||'')+' '+(el.getAttribute&&el.getAttribute('title')||'')+' '+(el.innerText||el.textContent||''));if(!label)return;var score=0;if(/^(?:comments?|coment[aá]rios?|comment|comentar)(?:\s+\d[\d.,KkMm]*)?$/i.test(label))score+=900;if(/open\s+(?:the\s+)?comments?|abrir\s+coment[aá]rios?|view\s+comments?|ver\s+coment[aá]rios?/i.test(label))score+=1100;if(/comment|coment/i.test(label)&&/\d/.test(label))score+=350;if(/write a comment|comment as|escreva um coment[aá]rio|comentar como/i.test(label))score-=900;try{var r=el.getBoundingClientRect();if(r.left>innerWidth*.55&&r.top>40&&r.bottom<innerHeight+120)score+=180;if(r.width>=20&&r.height>=20&&r.width<=180&&r.height<=120)score+=80;}catch(_){}if(score>350)add(el,score-i*.001,'accessible');});
  var PATH_SNIP='M12 .5C18.351.5 23.5 5.649 23.5 12c0 1.922-.472 3.736-1.308 5.33';try{Array.prototype.slice.call(document.querySelectorAll('svg path')).forEach(function(path){var d=path.getAttribute('d')||'';if(d.indexOf(PATH_SNIP)<0)return;var el=path;while(el&&el!==document.body){if(el.tagName==='BUTTON'||el.getAttribute('role')==='button'||el.hasAttribute('tabindex')){add(el,700,'legacy_svg');break;}el=el.parentElement;}});}catch(_){}
  out.sort(function(a,b){return b.score-a.score;});return out;
}
function clickReelCommentButtonOnce() {
  var id=currentReelIdV44R21R8(),candidates=reelCommentControlCandidatesV44R21R3();if(!candidates.length){window.__FB_REEL_COMMENT_OPEN_DIAGNOSTIC_V44R21R8__={status:'COMMENT_CONTROL_NOT_FOUND',rail:window.__FB_REEL_METRIC_RAIL_LAST_V44R21R8__||null};return false;}
  var target=candidates[0].el;try{clickObservedControlV44R17(target);}catch(_){try{target.click();}catch(__){}}
  window.__FB_REEL_COMMENT_OPEN_DIAGNOSTIC_V44R21R8__={status:reelRouteLockedV44R21R8(id)?'CLICKED':'ROUTE_CHANGED',why:candidates[0].why,reelId:id};return reelRouteLockedV44R21R8(id);
}
function openReelCommentsSurfaceV44R21R3(){
  var lockedId=currentReelIdV44R21R8(),existing=findReelCommentSurfaceV44R21R3();if(existing){__REEL_COMMENT_PANEL_V44R21R3__=existing;return Promise.resolve(existing);}var attempts=0;
  return new Promise(function(resolve){function attempt(){if(!reelRouteLockedV44R21R8(lockedId)){window.__FB_REEL_COMMENT_OPEN_DIAGNOSTIC_V44R21R8__={status:'ROUTE_LOCK_VIOLATION',expected:lockedId,actual:currentReelIdV44R21R8()};resolve(null);return;}var surface=findReelCommentSurfaceV44R21R3();if(surface){__REEL_COMMENT_PANEL_V44R21R3__=surface;resolve(surface);return;}if(attempts>=4){resolve(null);return;}attempts++;if(!clickReelCommentButtonOnce()){setTimeout(attempt,250);return;}var until=Date.now()+3200;(function poll(){if(!reelRouteLockedV44R21R8(lockedId)){window.__FB_REEL_COMMENT_OPEN_DIAGNOSTIC_V44R21R8__={status:'ROUTE_LOCK_VIOLATION',expected:lockedId,actual:currentReelIdV44R21R8()};resolve(null);return;}var found=findReelCommentSurfaceV44R21R3();if(found){__REEL_COMMENT_PANEL_V44R21R3__=found;resolve(found);return;}if(Date.now()>=until){setTimeout(attempt,220);return;}setTimeout(poll,120);})();}attempt();});
}

/* ========= Seleção automática "All comments / Todos os comentários" — v1.1.1 ========= */
function allComments_text(el) {
  if (!el) return '';
  var aria = '';
  try { aria = U.T(el.getAttribute('aria-label') || ''); } catch (_) { aria = ''; }
  if (aria && /^(Most relevant|Mais relevantes|Principais comentários|Principais comentarios|Top comments|All comments|Todos os comentários|Todos os comentarios|Todos los comentarios)\b/i.test(aria)) return aria;
  return U.T(el.innerText || el.textContent || aria || '');
}
function allComments_isAll(text) {
  return /^(All comments|Todos os comentários|Todos os comentarios|Todos los comentarios)(?:\b|$)/i.test(U.T(text || ''));
}
function allComments_isRelevant(text) {
  return /^(Most relevant|Mais relevantes|Principais comentários|Principais comentarios|Top comments|Más relevantes)(?:\b|$)/i.test(U.T(text || ''));
}
function allComments_nearestAction(el, kind) {
  var cur = el, depth = 0;
  while (cur && cur !== document.body && depth < 8) {
    var tag = String(cur.tagName || '').toLowerCase();
    var role = '';
    try { role = String(cur.getAttribute('role') || '').toLowerCase(); } catch (_) { role = ''; }
    if (kind === 'filter') {
      if (tag === 'button' || role === 'button' || role === 'combobox' ||
          cur.getAttribute('aria-haspopup') === 'menu' || cur.getAttribute('aria-haspopup') === 'listbox' ||
          cur.hasAttribute('aria-expanded')) return cur;
    } else {
      if (/^(menuitem|menuitemradio|option|radio)$/.test(role) || cur.hasAttribute('aria-checked') || cur.hasAttribute('aria-selected')) return cur;
    }
    cur = cur.parentElement;
    depth++;
  }
  return el;
}
function allComments_findFilterButton() {
  var root=isPhotoContext()?photoContractPanelV44R21R10():panelRoot();
  if(!root||!root.querySelectorAll)root=document.body;
  var nodes=U.qa('[role="button"],button,[role="combobox"],[aria-haspopup="menu"],[aria-haspopup="listbox"],[aria-expanded],span,div',root);
  var cand=[],seen=[],rootRect=null;
  try{rootRect=root.getBoundingClientRect?root.getBoundingClientRect():null;}catch(_){rootRect=null;}
  U.each(nodes,function(raw){
    if(!U.vis(raw))return;var rawText=allComments_text(raw);if(!allComments_isRelevant(rawText)&&!allComments_isAll(rawText))return;
    var el=allComments_nearestAction(raw,'filter');if(!el||(!U.vis(el)&&!U.vis(raw))||seen.indexOf(el)>=0)return;
    if(isPhotoContext()&&root!==document.body&&!root.contains(el))return;seen.push(el);
    var r;try{r=el.getBoundingClientRect();}catch(_){return;}var w=Math.round(r.width||0),h=Math.round(r.height||0);if(w<35||w>460||h<8||h>110)return;
    var role=String(el.getAttribute('role')||'').toLowerCase(),score=0;
    if(root!==document.body&&root.contains(el))score+=7000;if(String(el.tagName||'').toLowerCase()==='button'||role==='button')score+=900;
    if(el.hasAttribute('aria-haspopup'))score+=500;if(el.hasAttribute('aria-expanded'))score+=250;if(allComments_isRelevant(rawText))score+=350;
    if(rootRect&&r.left>=rootRect.left-4&&r.right<=rootRect.right+4&&r.top>=rootRect.top-4&&r.bottom<=rootRect.bottom+4)score+=1000;
    if(isPhotoContext()&&r.left<innerWidth*.45)score-=8000;
    score-=Math.round((w*h)/1500);cand.push({el:el,text:rawText,top:Math.round(r.top||0),left:Math.round(r.left||0),score:score,rootBound:root!==document.body&&root.contains(el)});
  });
  cand.sort(function(a,b){return b.score-a.score||b.top-a.top;});var best=cand.length?cand[0]:null;
  if(best&&isPhotoContext()){try{var rr=best.el.getBoundingClientRect();window.__FB_PHOTO_ALL_COMMENTS_FILTER_RECT_V44R21R13__={left:rr.left,top:rr.top,right:rr.right,bottom:rr.bottom,cx:rr.left+rr.width/2,cy:rr.top+rr.height/2};}catch(_){}}
  return best;
}
function allComments_findMenuItem() {
  var items=U.qa('[role="menuitem"],[role="menuitemradio"],[role="option"],[role="radio"],[aria-checked],[aria-selected],div,span',document.body),cand=[],seen=[],fr=window.__FB_PHOTO_ALL_COMMENTS_FILTER_RECT_V44R21R13__||null;
  U.each(items,function(raw){
    if(!U.vis(raw))return;var rawText=allComments_text(raw);if(!allComments_isAll(rawText))return;
    var el=allComments_nearestAction(raw,'menu');if(!el||(!U.vis(el)&&!U.vis(raw))||seen.indexOf(el)>=0)return;seen.push(el);
    var role=String(el.getAttribute('role')||'').toLowerCase(),inMenu=false,p=el,depth=0;
    while(p&&depth<8){var pr=String((p.getAttribute&&p.getAttribute('role'))||'').toLowerCase();if(pr==='menu'||pr==='listbox'){inMenu=true;break;}p=p.parentElement;depth++;}
    if(!/^(menuitem|menuitemradio|option|radio)$/.test(role)&&!inMenu&&!el.hasAttribute('aria-checked')&&!el.hasAttribute('aria-selected'))return;
    var r;try{r=el.getBoundingClientRect();}catch(_){return;}var w=Math.round(r.width||0),h=Math.round(r.height||0);if(w<70||w>900||h<18||h>240)return;
    var score=0;if(/^(menuitem|menuitemradio|option|radio)$/.test(role))score+=1400;if(inMenu)score+=900;if(el.hasAttribute('aria-checked')||el.hasAttribute('aria-selected'))score+=300;
    if(/^(All comments|Todos os comentários|Todos os comentarios|Todos los comentarios)$/i.test(rawText))score+=350;
    if(isPhotoContext()&&fr){var cx=r.left+r.width/2,cy=r.top+r.height/2,dx=Math.abs(cx-fr.cx),dy=Math.abs(cy-fr.cy);if(dx<=480&&dy<=520)score+=4000;else score-=5000;if(r.left<innerWidth*.35)score-=4000;}
    score-=Math.round((w*h)/2500);cand.push({el:el,text:rawText,top:Math.round(r.top||0),score:score});
  });
  cand.sort(function(a,b){return b.score-a.score||a.top-b.top;});return cand.length?cand[0]:null;
}
function allComments_safeClick(el) {
  if (!el) return false;
  var r = null, x = 0, y = 0;
  try {
    r = el.getBoundingClientRect();
    if (r.bottom < 0 || r.top > window.innerHeight || r.right < 0 || r.left > window.innerWidth) {
      try { el.scrollIntoView({ block: 'center', inline: 'nearest' }); } catch (_) { try { el.scrollIntoView(); } catch (_e) {} }
      r = el.getBoundingClientRect();
    }
    x = Math.round((r.left || 0) + (r.width || 0) / 2);
    y = Math.round((r.top || 0) + (r.height || 0) / 2);
  } catch (_) { }
  try { el.focus({ preventScroll: true }); } catch (_) { try { el.focus(); } catch (_e) {} }
  function fire(type) {
    try {
      if (window.PointerEvent && /^pointer/.test(type)) {
        el.dispatchEvent(new PointerEvent(type, {
          bubbles: true, cancelable: true, view: window,
          clientX: x, clientY: y, pointerId: 1, pointerType: 'mouse', isPrimary: true
        }));
      } else {
        el.dispatchEvent(new MouseEvent(type, {
          bubbles: true, cancelable: true, view: window, clientX: x, clientY: y
        }));
      }
    } catch (_) { }
  }
  /* Um único evento click. A versão anterior emitia click sintético e depois el.click(),
     o que podia abrir e fechar o menu imediatamente em controles do tipo toggle. */
  ['pointerover','mouseover','pointermove','mousemove','pointerdown','mousedown','pointerup','mouseup'].forEach(fire);
  try {
    if (window.HTMLElement && HTMLElement.prototype && typeof HTMLElement.prototype.click === 'function') {
      HTMLElement.prototype.click.call(el);
    } else {
      el.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window, clientX: x, clientY: y }));
    }
    return true;
  } catch (_) {
    try {
      el.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window, clientX: x, clientY: y }));
      return true;
    } catch (_e) { return false; }
  }
}
/* RC2 FORENSIC: declaração antiga removida; V44R21R13 abaixo é a única autoridade. */
/* ========= scroll helpers ========= */
/* ========= scroll helpers ========= */
function reelCommentScroller(panel) {
  var cand = U.first(
    U.qa(
      'div[role="textbox"][aria-label*="oment"],' +
      'div[role="textbox"][data-lexical-editor="true"],' +
      'textarea[aria-label*="oment"],' +
      'textarea[placeholder*="oment"],' +
      'div[aria-label*="comment"]',
      panel
    ),
    U.vis
  );
  if (!cand) return null;
  var cur = cand, best = null;
  while (cur && cur !== panel && cur !== document.body) {
    try {
      var cs = getComputedStyle(cur);
      var h = cur.clientHeight, sh = cur.scrollHeight;
      if (h > 140 && sh > h + 20 && /(auto|scroll)/.test(cs.overflowY)) { best = cur; }
    } catch (_) { }
    cur = cur.parentElement;
  }
  return best;
}
function getScrollers(panel) {
  if (isReelContext()) {
    var sc = reelCommentScroller(panel);
    if (sc) return [sc];
    var arr = [], all = [panel].concat(U.qa('*', panel));
    U.each(all, function (el) {
      try {
        if (!U.vis(el)) return;
        if (el === document.body || el === document.documentElement) return;
        var cs = getComputedStyle(el);
        var h = el.clientHeight, sh = el.scrollHeight;
        if (h > 140 && sh > h + 20 && /(auto|scroll)/.test(cs.overflowY)) arr.push(el);
      } catch (_) { }
    });
    arr.sort(function (a, b) { return (b.clientHeight * b.clientWidth) - (a.clientHeight * a.clientWidth); });
    if (!arr.length) {
      var doc = document.scrollingElement || document.documentElement || document.body;
      if (doc !== document.body && doc !== document.documentElement) arr.push(doc);
    }
    return arr.slice(0, 3);
  }
  var arr2 = [], all2 = [panel].concat(U.qa('*', panel));
  U.each(all2, function (el) {
    try {
      if (!U.vis(el)) return;
      var cs = getComputedStyle(el);
      var h = el.clientHeight, sh = el.scrollHeight;
      if (h > 140 && sh > h + 20 && /(auto|scroll)/.test(cs.overflowY)) arr2.push(el);
    } catch (_) { }
  });
  arr2.sort(function (a, b) { return (b.clientHeight * b.clientWidth) - (a.clientHeight * a.clientWidth); });
  if (!arr2.length) {
    var doc2 = document.scrollingElement || document.documentElement || document.body;
    arr2.push(doc2);
  }
  return arr2.slice(0, 3);
}

/* ========= expansão (botões “ver mais comentários”, etc) ========= */
var RX = {
  moreComments: /(ver|mostrar)\s+(mais|outros)\s+coment|see\s+more\s+comments|view\s+more\s+comments/i,
  prevComments: /(ver|mostrar)\s+coment[aá]rios\s+(anteriores|previous)/i,
  moreReplies: /(ver|mostrar)\s+(?:\s*as\s*|todas\s+as\s+|as\s+|mais\s+|outras\s+)?\d+\s+respostas?/i,
  prevReplies: /(ver|mostrar)\s+(?:\d+\s+)?respostas?\s+(anteriores|previous)/i,
  moreRepliesEn: /(see|view)\s+(?:all\s+)?\d+\s+repl|see\s+previous\s+repl|view\s+previous\s+repl|see\s+more\s+repl(?:ies)?|view\s+more\s+repl(?:ies)?/i,
  oneReplyPT: /^ver\s*1\s*resposta$/i,
  skip: /ver\s+menos|see\s+less|hide|ocult|translate|tradu/i,
  drop: /(Mais relevantes|Principais comentários|Most relevant|Top comments|Más relevantes)/i,
  all: /(Todos os comentários|All comments|Todos los comentarios)/i,
  recent: /(Mais recentes|Most recent|Más recientes)/i
};
function textOf(el) {
  try {
    return U.T((el.innerText || el.textContent || el.getAttribute('aria-label') || el.getAttribute('title') || ''));
  } catch (_) { return ''; }
}
function safeClick(el) {
  try { el.scrollIntoView({ block: 'center' }); } catch (_) { }
  try {
    el.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
  } catch (_) {
    try { el.click(); } catch (__){ }
  }
}
function findButtons(panel) {
  return U.filter(U.qa('button,[role="button"],a', panel), function (el) {
    if (!U.vis(el)) return false;
    var t = textOf(el);
    if (RX.skip.test(t)) return false;
    return RX.oneReplyPT.test(t) ||
      RX.moreComments.test(t) ||
      RX.prevComments.test(t) ||
      RX.moreReplies.test(t) ||
      RX.prevReplies.test(t) ||
      RX.moreRepliesEn.test(t);
  });
}
function clickAllOnce(panel) {
  return new Promise(function (resolve) {
    var btns = findButtons(panel); var i = 0;
    function step() {
      if (i >= btns.length || window.__HUDH__.stop()) { resolve(btns.length); return; }
      var b = btns[i++]; safeClick(b);
      U.waitMut(panel, 900).then(function () { return U.sleep(60); }).then(step);
    }
    step();
  });
}
function clickAllUntilExhausted(panel, maxLoops) {
  maxLoops = maxLoops || 40;
  return new Promise(function (resolve) {
    var loops = 0;
    function run() {
      if (loops >= maxLoops) { resolve(loops); return; }
      clickAllOnce(panel).then(function (n) {
        loops++;
        if (!n) { resolve(loops); } else { run(); }
      });
    }
    run();
  });
}
function resort(panel) {
  return new Promise(function (resolve) {
    var drop = U.first(U.qa('div,span,button,a', panel), function (el) { return U.vis(el) && RX.drop.test(textOf(el)); });
    if (!drop) { resolve(false); return; }
    safeClick(drop);
    function pick(rx) {
      var o = U.first(U.qa('[role="menuitem"],[role="option"],div,span', document.body), function (el) { return U.vis(el) && rx.test(textOf(el)); });
      if (o) { safeClick(o); return true; }
      return false;
    }
    U.sleep(120)
      .then(function () { pick(RX.all); return U.sleep(120); })
      .then(function () { pick(RX.recent); return U.sleep(120); })
      .then(function () { pick(RX.all); return U.sleep(120); })
      .then(function () { resolve(true); });
  });
}

/* ========= helpers de conteúdo ========= */
function isActionLabel(s) { return /^(curtir|like|responder|reply|seguir|follow)$/i.test(U.T(s || '')); }
function isJunk(s) { s = U.T(s); return !s || /^comentar$/i.test(s) || /^reply$/i.test(s) || s.length < 2; }
function isLikelyTimestamp(s) {
  s = U.T(s || ''); if (!s) return false;
  if (/^\d+\s*(min|m|h|d|sem|w|s)\b/i.test(s)) return true;
  if (/^há\s+\d+/.test(s.toLowerCase())) return true;
  if (/^\d{1,2}:\d{2}$/.test(s)) return true;
  if (/\b(jan|fev|mar|abr|mai|jun|jul|ago|set|out|nov|dez|jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\b/i.test(s)) return true;
  if (/\b(?:at|às)\b/i.test(s) && /\d/.test(s)) return true;
  return false;
}
function timestampOf(node) {
  var t1 = U.first(U.qa('time', node), U.vis);
  if (t1) {
    var iso = t1.getAttribute('datetime') || '';
    var txt = U.T(t1.getAttribute('aria-label') || t1.getAttribute('title') || t1.textContent || '');
    return { text: txt || iso || '', iso: iso || null };
  }
  var a = U.first(U.qa('a[aria-label],a[title]', node), function (el) { return U.vis(el) && isLikelyTimestamp(U.T(el.getAttribute('aria-label') || el.getAttribute('title') || '')); });
  if (a) {
    var s = U.T(a.getAttribute('aria-label') || a.getAttribute('title') || '');
    return { text: s, iso: null };
  }
  var any = U.first(U.qa('a,span,div', node), function (el) { return U.vis(el) && isLikelyTimestamp(U.T(el.textContent || '')); });
  if (any) return { text: U.T(any.textContent || ''), iso: null };
  return { text: '', iso: null };
}

/* ========= AVATAR ========= */
function cssURL(el) {
  try {
    var cs = getComputedStyle(el);
    var bg = cs.backgroundImage || '';
    var m = bg.match(/url\(["']?([^"')]+)["']?\)/i);
    return (m && m[1]) ? m[1] : null;
  } catch (_) { return null; }
}
function candidateImages(scope) {
  var out = [];
  var nodes = U.qa('img,image,[role="img"],svg image', scope);
  for (var i = 0; i < nodes.length; i++) {
    var el = nodes[i];
    if (!U.vis(el)) { } else {
      var src = null;
      if (el.tagName === 'IMG') { src = el.currentSrc || el.src || null; }
      else if (el.tagName && el.tagName.toLowerCase() === 'image') { src = el.getAttribute('xlink:href') || el.getAttribute('href') || null; }
      else { src = cssURL(el); }
      if (src) {
        var srcLower = String(src).toLowerCase();
        // evita ícones/badges (super fã, emojis, etc.)
        if (srcLower.indexOf('/rsrc.php/') !== -1 || srcLower.indexOf('emoji.php') !== -1) {
          continue;
        }
        var r = el.getBoundingClientRect();
        var w = Math.max(12, Math.round(r.width || 0)), h = Math.max(12, Math.round(r.height || 0));
        if (w > 10 && w < 120 && h > 10 && h < 120) { out.push({ src: src, left: r.left, top: r.top }); }
      }
    }
  }
  return out;
}
function avatarURLStrong(anchorNode, fallbackNode) {
  var scopes = [], cur = anchorNode || fallbackNode || null, hops = 0;
  while (cur && hops < 4) { scopes.push(cur); cur = cur.parentElement; hops++; }
  if (fallbackNode && scopes.indexOf(fallbackNode) < 0) scopes.push(fallbackNode);
  var cands = [];
  for (var s = 0; s < scopes.length; s++) {
    var sc = scopes[s];
    var candHere = candidateImages(sc);
    for (var a = 0; a < candHere.length; a++) { cands.push(candHere[a]); }
    var sib = sc.previousElementSibling, k = 0;
    while (sib && k < 8) {
      var more = candidateImages(sib);
      for (var b = 0; b < more.length; b++) { cands.push(more[b]); }
      sib = sib.previousElementSibling; k++;
    }
  }
  if (!cands.length && fallbackNode) {
    var more2 = candidateImages(fallbackNode);
    for (var c = 0; c < more2.length; c++) { cands.push(more2[c]); }
  }
  if (!cands.length) return null;
  var ref = (anchorNode || fallbackNode);
  var refRect = ref && ref.getBoundingClientRect ? ref.getBoundingClientRect() : { top: 0, left: 0 };
  cands.sort(function (a, b) {
    var da = Math.abs(a.top - (refRect.top || 0)) + Math.abs((a.left || 0) - (refRect.left || 0)) * 0.5;
    var db = Math.abs(b.top - (refRect.top || 0)) + Math.abs((b.left || 0) - (refRect.left || 0)) * 0.5;
    return da - db;
  });
  return cands[0].src || null;
}
function imgToDataURL(src, max) {
  if (max == null) max = 56;
  return new Promise(function (resolve) {
    if (!src) { resolve(null); return; }
    var settled = false;
    function finish(value) {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      resolve(value || src);
    }
    var timer = setTimeout(function () { finish(src); }, 6000);
    try {
      var im = new Image();
      im.crossOrigin = 'anonymous';
      im.referrerPolicy = 'no-referrer';
      im.onload = function () {
        try {
          var w = im.naturalWidth || im.width, h = im.naturalHeight || im.height;
          var sc = Math.min(1, max / Math.max(w, h));
          var cw = Math.max(16, Math.round(w * sc)), ch = Math.max(16, Math.round(h * sc));
          var c = document.createElement('canvas');
          c.width = cw; c.height = ch;
          c.getContext('2d').drawImage(im, 0, 0, cw, ch);
          finish(c.toDataURL('image/png'));
        } catch (_) { finish(src); }
      };
      im.onerror = function () { finish(src); };
      im.src = src;
    } catch (_) { finish(src); }
  });
}

function cleanPayloadRows(payload) {
  if (!payload || !payload.rows) return;

  function onlyNum(x) {
    x = String(x || '').trim();
    return /^\d+(?:[\.,]\d+)?(?:\s*[KkMm])?$/.test(x);
  }
  function hasRealData(it) {
    return !!(
      (it.date || it.dateISO) ||
      (it.avatarUrl || it.avatar) ||
      (it.authorHref && it.authorHref !== '#') ||
      (it.authorURL && it.authorURL !== '#') ||
      (it.media && it.media.length) ||
      (it.replies && it.replies.length)
    );
  }
  function isNumericPhantom(it) {
    if (!it) return true;
    var a = String(it.author || '').trim();
    var t = String(it.text || '').trim();
    if (onlyNum(a) && (!t || onlyNum(t) || t === a) && !hasRealData(it)) return true;
    if (/^(comment|comentário|comentario)$/i.test(a) && /^(comment|comentário|comentario)$/i.test(t) && !hasRealData(it)) return true;
    return false;
  }
  function cleanList(list) {
    if (!list) return [];
    var out = [];
    for (var i = 0; i < list.length; i++) {
      var it = list[i];
      if (!it) continue;
      if (it.replies && it.replies.length) it.replies = cleanList(it.replies);
      if (isNumericPhantom(it)) continue;
      out.push(it);
    }
    return out;
  }

  payload.rows = cleanList(payload.rows);

  var L1 = payload.rows.length, L2 = 0, n = 0;
  function walk(list) {
    for (var i = 0; i < list.length; i++) {
      n++;
      list[i].num = String(n) + (list[i].type === 'reply' ? '.' : '');
      if (list[i].replies && list[i].replies.length) {
        L2 += list[i].replies.length;
        walk(list[i].replies);
      }
    }
  }
  walk(payload.rows);
  payload.L1 = L1;
  payload.L2 = L2;
}

function enrichAvatars(payload, limit) {
  /* V44R15: o avatar já observado continua sendo a fonte de identidade, mas os
     bytes exportados são obtidos da melhor variante do mesmo CDN. Não há troca
     de perfil nem abertura de aba. */
  limit = limit || 300;
  var queue = [], stack = [].concat((payload && payload.rows) || []);
  while (stack.length && queue.length < limit) {
    var it = stack.shift();
    if (it && it.avatarUrl) queue.push(it);
    if (it && it.replies && it.replies.length) for (var i = 0; i < it.replies.length; i++) stack.push(it.replies[i]);
  }
  if (!queue.length) return Promise.resolve();
  var cursor = 0, cache = Object.create(null);
  function resolveOne(item){
    var raw=String(item.avatarUrl||'');if(!raw)return Promise.resolve();
    if(cache[raw])return cache[raw].then(function(r){if(r&&r.ok){item.avatar=r.dataUrl;item.avatarHighResUrl=r.highResUrl||r.sourceUrl||raw;item.avatarWidth=Number(r.width||0);item.avatarHeight=Number(r.height||0);}});
    cache[raw]=postRuntimeMessageV44R10({type:'B35_FETCH_IMAGE_DATA_V44R11',url:raw,preferHighRes:true});
    return cache[raw].then(function(r){
      if(r&&r.ok&&/^data:image\//i.test(String(r.dataUrl||''))){item.avatar=r.dataUrl;item.avatarHighResUrl=r.highResUrl||r.sourceUrl||raw;item.avatarWidth=Number(r.width||0);item.avatarHeight=Number(r.height||0);item.avatarMime=String(r.mime||'');item.avatarSha256=String(r.sha256||'');}
      else return imgToDataURL(raw).then(function(data){if(data)item.avatar=data;});
    }).catch(function(){return imgToDataURL(raw).then(function(data){if(data)item.avatar=data;});});
  }
  function worker(){if(cursor>=queue.length)return Promise.resolve();var item=queue[cursor++];return resolveOne(item).then(worker);}
  var workers=[],concurrency=Math.min(8,queue.length);for(var w=0;w<concurrency;w++)workers.push(worker());
  return Promise.all(workers).then(function(){});
}

/* ========= REAÇÕES (por comentário) ========= */
function extractVisualEmojis(scope) {
  var imgs = Array.prototype.slice.call(scope.querySelectorAll('img[role="presentation"][src^="data:image/svg+xml"]'));
  if (!imgs.length) return [];
  var map = Object.create(null);
  imgs.forEach(function (img) {
    var count = 1;
    try {
      var txt = '';
      var parent = img.closest('span,div');
      if (parent) {
        var siblings = parent.parentElement ? Array.prototype.slice.call(parent.parentElement.childNodes) : [];
        siblings.forEach(function (n) {
          if (n !== parent) {
            if (n.nodeType === 3) txt += n.textContent;
            if (n.nodeType === 1 && n.innerText) txt += ' ' + n.innerText;
          }
        });
      }
      var m = (txt || '').match(/\d+/);
      if (m) { count = parseInt(m[0], 10); if (isNaN(count)) count = 1; }
    } catch (_) { }
    var key = img.src;
    if (!map[key]) map[key] = { src: key, count: 0 };
    map[key].count += count;
  });
  return Object.keys(map).map(function (k) { return { src: k, count: map[k].count }; });
}
var REACT_MAP = [
  { rx: /\b(amei|love)\b/i, emoji: '❤️', key: 'love' },
  { rx: /\b(haha)\b/i, emoji: '😂', key: 'haha' },
  { rx: /\b(uau|wow)\b/i, emoji: '😮', key: 'wow' },
  { rx: /\b(triste|sad)\b/i, emoji: '😢', key: 'sad' },
  { rx: /\b(grr|angry)\b/i, emoji: '😡', key: 'angry' },
  { rx: /\b(curtir|like)\b/i, emoji: '👍', key: 'like' },
  { rx: /\b(care)\b/i, emoji: '🤗', key: 'care' }
];
function parseFacebookCount(input) {
  var raw = U.T(input || '');
  if (!raw) return null;
  var m = raw.match(/([0-9]+(?:[.,][0-9]+)*)\s*(milhões|milhoes|milhão|milhao|mil|mi|bi|K|M|B)?/i);
  if (!m) return null;
  var token = m[1];
  var suffix = U.T(m[2] || '').toLowerCase();
  var multiplier = 1;
  if (suffix === 'k' || suffix === 'mil') multiplier = 1e3;
  else if (suffix === 'm' || suffix === 'mi' || /^milh/.test(suffix)) multiplier = 1e6;
  else if (suffix === 'b' || suffix === 'bi') multiplier = 1e9;

  var normalized;
  if (multiplier > 1) {
    var lastDot = token.lastIndexOf('.');
    var lastComma = token.lastIndexOf(',');
    var lastSep = Math.max(lastDot, lastComma);
    if (lastSep >= 0 && token.length - lastSep - 1 <= 2) {
      normalized = token.slice(0, lastSep).replace(/[.,]/g, '') + '.' + token.slice(lastSep + 1).replace(/[.,]/g, '');
    } else {
      normalized = token.replace(/[.,]/g, '');
    }
  } else {
    normalized = token.replace(/[.,]/g, '');
  }
  var value = parseFloat(normalized);
  if (!isFinite(value)) return null;
  return Math.round(value * multiplier);
}

function numberFromText(s) {
  return parseFacebookCount(s);
}
function extractReactions(scope) {
  var els = U.qa('[aria-label],[title],span,div,a', scope).slice(0, 600);
  var perType = Object.create(null), total = null, sawAny = false;
  for (var i = 0; i < els.length; i++) {
    var el = els[i];
    if (!U.vis(el)) continue;
    var lab = ((el.getAttribute && el.getAttribute('aria-label')) || '') + ' ' +
      ((el.getAttribute && el.getAttribute('title')) || '');
    var txt = U.T(lab + ' ' + (el.textContent || ''));
    if (!txt) continue;
    for (var r = 0; r < REACT_MAP.length; r++) {
      if (REACT_MAP[r].rx.test(txt)) {
        var v = numberFromText(txt);
        if (v != null) {
          var k = REACT_MAP[r].key;
          perType[k] = (perType[k] || 0) + v;
          sawAny = true;
        }
      }
    }
    if (/\b(reac|\bcurtid|\blikes?\b|reactions?)\b/i.test(txt)) {
      var vt = numberFromText(txt);
      if (vt != null) { total = Math.max(total == null ? 0 : total, vt); }
    }
  }
  var svgVisual = extractVisualEmojis(scope);
  var outArr = [];
  var sum = 0, hasTypes = false;
  for (var k in perType) {
    if (Object.prototype.hasOwnProperty.call(perType, k)) { hasTypes = true; sum += perType[k]; }
  }
  var finalTotal = total != null ? total : (hasTypes ? sum : null);
  if (hasTypes) {
    for (var r2 = 0; r2 < REACT_MAP.length; r2++) {
      var key = REACT_MAP[r2].key;
      var cnt = perType[key] || 0;
      if (cnt > 0) { outArr.push({ name: key, emoji: REACT_MAP[r2].emoji, count: cnt }); }
    }
  }
  if (svgVisual.length && !hasTypes) {
    var svgTotal = 0;
    for (var i2 = 0; i2 < svgVisual.length; i2++) {
      outArr.push({
        name: 'svg',
        emoji: '<img src="' + svgVisual[i2].src + '" width="14" height="14">',
        count: svgVisual[i2].count
      });
      svgTotal += Number(svgVisual[i2].count || 0);
    }
    if (finalTotal == null) finalTotal = svgTotal;
  }
  return { total: finalTotal, breakdown: outArr, saw: sawAny || hasTypes || svgVisual.length > 0 || finalTotal != null };
}

  /* ========= coleta de mídias em comentários / respostas ========= */
  function baseSrc(u) {
    if (!u) return '';
    var q = u.indexOf('?');
    return q >= 0 ? u.slice(0, q) : u;
  }
  function collectNodeMedia(node, avatarUrl) {
    try {
      var imgs = U.qa('img', node);
      var out = [];
      var seen = Object.create(null);
      var avBase = baseSrc(avatarUrl || '');

      U.each(imgs, function (img) {
        if (!U.vis(img)) return;
        var r;
        try {
          r = img.getBoundingClientRect();
        } catch (_) {
          return;
        }
        if (!r || r.width < 40 || r.height < 40) return;

        var src = img.currentSrc || img.src || '';
        if (!src) return;

        var sbase = baseSrc(src);
        if (avBase && sbase === avBase) return;

        if (/emoji|sticker|reaction|spritemap|sprite|transparent/i.test(src)) return;
        if (/profile|_p32x32|_p40x40|_p48x48/i.test(src)) return;

        if (seen[sbase]) return;
        seen[sbase] = true;
        out.push({ url: src, w: Math.round(r.width || 0), h: Math.round(r.height || 0) });
      });

      /* vídeos embutidos em comentários (ex.: Munn Munna) */
      var videos = U.qa('video', node);
      U.each(videos, function (vid) {
        if (!U.vis(vid)) return;
        var r;
        try {
          r = vid.getBoundingClientRect();
        } catch (_) {
          return;
        }
        if (!r || r.width < 80 || r.height < 80) return;

        var src = vid.currentSrc || vid.src || '';
        if (!src) {
          var s = vid.querySelector('source[src]');
          if (s && s.src) src = s.src;
        }
        if (!src && vid.poster) {
          src = vid.poster;
        }
        if (!src) return;

        var sbase = baseSrc(src);
        if (avBase && sbase === avBase) return;
        if (seen[sbase]) return;
        seen[sbase] = true;
        out.push({ url: src, w: Math.round(r.width || 0), h: Math.round(r.height || 0) });
      });

      return out;
    } catch (e) {
      console.warn('Erro em collectNodeMedia:', e);
      return [];
    }
  }


/* ========= coleta de uma “fatia” + árvore completa de replies ========= */
function authorOf(n) {
  var as = U.filter(U.qa('a[role="link"],a[href]', n), function (a) {
    var nm = U.T(a.textContent || '');
    return U.vis(a) && nm.length > 1 && !isActionLabel(nm) && !isLikelyTimestamp(nm);
  });
  if (as.length) {
    var a = as[0];
    return { name: U.T(a.textContent || ''), href: a.href || '#', _el: a };
  }
  var s = U.q1('strong', n);
  if (s && U.vis(s) && U.T(s.textContent || '').length > 1)
    return { name: U.T(s.textContent || ''), href: '#', _el: s };
  var sp = U.filter(U.qa('span', n), function (x) {
    var t = U.T(x.textContent || '');
    return U.vis(x) && t.length > 1 && !isActionLabel(t) && !isLikelyTimestamp(t);
  });
  if (sp[0]) return { name: U.T(sp[0].textContent || ''), href: '#', _el: sp[0] };
  return { name: '', href: '#', _el: null };
}

function textWithEmoji(root) {
  if (!root) return '';
  var out = [];
  function walk(node) {
    if (!node) return;
    if (node.nodeType === 3) {
      out.push(node.nodeValue);
      return;
    }
    if (node.nodeType === 1) {
      if (node.tagName === 'IMG') {
        var alt = node.getAttribute('alt');
        if (alt) {
          out.push(alt);
          return;
        }
      }
      for (var c = node.firstChild; c; c = c.nextSibling) {
        walk(c);
      }
    }
  }
  walk(root);
  return out.join(' ');
}

function mainText(n) {
  var blocks = U.map(U.qa('div[dir="auto"],span[dir="auto"],p', n), function (x) {
    return U.T(textWithEmoji(x));
  });
  blocks = U.filter(blocks, function (s) {
    return !!s && !/^(curtir|like|responder|reply|seguir|follow)$/i.test(s) && !isLikelyTimestamp(s);
  });
  if (blocks.length) {
    blocks.sort(function (a, b) { return b.length - a.length; });
    if (!isJunk(blocks[0])) return blocks[0];
  }
  var raw = U.T(textWithEmoji(n));
  raw = raw.replace(/\b(Curtir|Like|Responder|Reply|Seguir|Follow)\b.*$/i, '').trim();
  if (isLikelyTimestamp(raw) || isJunk(raw)) return '';
  return raw;
}


function mainTextWithoutAuthor(n, au) {
  if (!au) au = { name: '', _el: null };
  var name = U.T(au.name || '');
  var blocks = U.map(U.qa('div[dir="auto"],span[dir="auto"],p', n), function (x) {
    if (au._el && x.contains && x.contains(au._el)) return '';
    return U.T(textWithEmoji(x));
  });
  blocks = U.filter(blocks, function (s) {
    return !!s &&
      s !== name &&
      !/^(curtir|like|responder|reply|seguir|follow)$/i.test(s) &&
      !isLikelyTimestamp(s);
  });
  if (blocks.length) {
    blocks.sort(function (a, b) { return b.length - a.length; });
    if (!isJunk(blocks[0])) return blocks[0];
  }
  var raw = mainText(n);
  if (raw === name) return '';
  return raw;
}
function computeLevelModel(items) {
  var lefts = U.filter(U.map(items, function (x) { return x.left; }), function (x) { return x > 0; })
    .sort(function (a, b) { return a - b; });
  if (!lefts.length) return { base: 0, step: 18, levelOf: function () { return 0; } };
  var uniq = [];
  for (var i = 0; i < lefts.length; i++) { if (uniq.indexOf(lefts[i]) < 0) uniq.push(lefts[i]); }
  var step = 18;
  if (uniq.length >= 2) {
    var diffs = [];
    for (var j = 1; j < uniq.length; j++) { diffs.push(uniq[j] - uniq[j - 1]); }
    diffs.sort(function (a, b) { return a - b; });
    step = Math.max(10, Math.round(diffs[Math.floor(diffs.length / 2)] * 0.7));
  }
  var base = Math.min.apply(null, lefts);
  function levelOf(lx) {
    var d = Math.max(0, lx - base);
    var lvl = Math.round(d / step);
    if (lvl < 0) lvl = 0;
    if (lvl > 8) lvl = 8;
    return lvl;
  }
  return { base: base, step: step, levelOf: levelOf };
}
function buildReplyTree(list, parentNode) {
  var items = [];
  U.each(list, function (rc) {
    var au = authorOf(rc), tx = mainText(rc);
    if (!au.name || !tx) return;
    if (!isHarvestableNodeForContext(rc, au, tx)) return;
    var tstamp = timestampOf(rc);
    var av = avatarURLStrong(au._el, rc) || null;
    var reacts = extractReactions(rc);
    var media = collectNodeMedia(rc, av);
    items.push({ el: rc, left: U.left(rc), au: au, tx: tx, tstamp: tstamp, av: av, reacts: reacts, media: media });
  });
  if (!items.length) return;
  var LM = computeLevelModel(items);
  var stack = [parentNode];
  var seen = Object.create(null);
  function pushNodeAt(level, node) {
    if (level < 1) level = 1;
    if (level > stack.length) level = stack.length;
    stack = stack.slice(0, level);
    var p = stack[level - 1] || parentNode;
    (p.replies || (p.replies = [])).push(node);
    stack[level] = node;
  }
  U.each(items, function (it) {
    var sourceId = stableNodeId(it.el);
    var key = sourceId ? ('id:' + sourceId) : (it.au.name + '|' + it.tx + '|' + it.tstamp.text).toLowerCase();
    if (seen[key]) return;
    seen[key] = 1;
    var lvl = LM.levelOf(it.left) + 1;
    var node = {
      type: 'reply',
      sourceId: sourceId || null,
      author: it.au.name,
      authorHref: it.au.href || '#',
      text: it.tx,
      likes: (it.reacts && it.reacts.total != null ? it.reacts.total : ''),
      date: it.tstamp.text || '',
      dateISO: it.tstamp.iso || null,
      avatarUrl: it.av || null,
      avatar: null,
      replies: [],
      reacts: it.reacts,
      media: it.media || []
    };
    pushNodeAt(lvl, node);
  });
}
function stableNodeId(n) {
  if (!n) return '';
  try {
    var attrs = ['data-commentid', 'data-comment-id', 'data-reply-id'];
    for (var i = 0; i < attrs.length; i++) {
      var v = n.getAttribute && n.getAttribute(attrs[i]);
      if (v && String(v).length >= 6) return attrs[i] + ':' + String(v);
    }
    var links = U.qa('a[href*="comment_id="],a[href*="reply_comment_id="],a[href*="comment_tracking"]', n);
    for (var j = 0; j < links.length; j++) {
      var href = String(links[j].href || links[j].getAttribute('href') || '');
      var cm = href.match(/[?&](?:comment_id|reply_comment_id)=([^&#]+)/i);
      if (cm && cm[1]) return 'comment:' + decodeURIComponent(cm[1]);
    }
    var pos = n.getAttribute && n.getAttribute('aria-posinset');
    var setSize = n.getAttribute && n.getAttribute('aria-setsize');
    var aria = U.T((n.getAttribute && n.getAttribute('aria-label')) || '');
    if (pos && (/^(Comment|Reply) by /i.test(aria) || setSize)) return 'aria:' + String(pos) + ':' + String(setSize || '') + ':' + aria.slice(0, 120);
  } catch (_) {}
  return '';
}

function collectSlice(panel) {
  if(isPhotoContext())return photoCollectSliceV44R21R8(document);
  var cards = U.filter(U.qa('li[aria-posinset],div[role="article"]', panel), U.vis);
  if (!cards.length) cards = U.filter(U.qa('[aria-label*="oment"],[aria-label*="omment"],[aria-label*="espost"],[aria-label*="repl"]', panel), U.vis);
  if (!cards.length) cards = U.filter(U.qa('div,li', panel), function (el) { return U.vis(el) && U.T(el.textContent).length > 4; });
  cards.sort(function (a, b) { return (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING) ? -1 : 1; });
  var processed = [];
  U.each(cards, function (n) {var au = authorOf(n), tx = mainText(n);if (au.name && tx === au.name) {var altTx = mainTextWithoutAuthor(n, au);if (altTx && altTx !== au.name) tx = altTx;}var mediaCheck = collectNodeMedia(n, null);if (!au.name || (!tx && (!mediaCheck || !mediaCheck.length))) return;if (!isHarvestableNodeForContext(n, au, tx)) return;var tstamp = timestampOf(n),av = avatarURLStrong(au._el, n) || null,reacts = extractReactions(n),media = collectNodeMedia(n, av),z = U.first(U.qa('[aria-label*="repl"],[aria-label*="espost"],[aria-label*="reply"]', n), U.vis) || null;processed.push({ el: n, sourceId: stableNodeId(n), left: U.left(n), au: au, tx: tx, tstamp: tstamp, av: av, reacts: reacts, media: media, zones: z });});
  if (!processed.length) return { L1: 0, L2: 0, rows: [] };
  var LM = computeLevelModel(processed),rows = [], stack = [];
  function pushNode(lvl, node) {if (lvl <= 0 || !stack.length) { rows.push(node); stack = [node]; return; }if (lvl > stack.length) lvl = stack.length;stack = stack.slice(0, lvl);var parent = stack[lvl - 1] || stack[stack.length - 1];(parent.replies || (parent.replies = [])).push(node);stack[lvl] = node;}
  U.each(processed, function (it) {var lvl = it.zones ? 0 : LM.levelOf(it.left);if (rows.length === 0) lvl = 0;var node = {type: 'comment',sourceId: it.sourceId || null,author: it.au.name,authorHref: it.au.href || '#',text: it.tx,likes: (it.reacts && it.reacts.total != null ? it.reacts.total : ''),date: it.tstamp.text || '',dateISO: it.tstamp.iso || null,avatarUrl: it.av || null,avatar: null,replies: [],reacts: it.reacts,media: it.media || []};pushNode(lvl, node);if (it.zones) {var list = U.filter(U.qa('div,li', it.zones), function (el) { return U.vis(el) && U.T(el.textContent).length > 1; });if (list.length) buildReplyTree(list, node);}});
  var counter = 0, L1 = 0, L2 = 0;function walkReplies(children) {for (var i = 0; i < children.length; i++) {var ch = children[i]; counter++; ch.num = counter + '.'; L2++;if (ch.replies && ch.replies.length) walkReplies(ch.replies);}}for (var i2 = 0; i2 < rows.length; i2++) {counter++; rows[i2].num = counter + '.'; L1++;if (rows[i2].replies && rows[i2].replies.length) walkReplies(rows[i2].replies);}
  return { L1: L1, L2: L2, rows: rows };
}

/* ========= merge/harvest ========= */
function keyC(r) { return r && r.sourceId ? ('id:' + String(r.sourceId)) : ((r.author + '|' + r.text + '|' + r.date).toLowerCase()); }
function mergeMedia(dst, src) {
  if (!src || !src.length) return;
  if (!dst.media) dst.media = [];
  var seen = Object.create(null);
  for (var i = 0; i < dst.media.length; i++) {
    var u = baseSrc(dst.media[i].url || '');
    if (u) seen[u] = true;
  }
  for (var j = 0; j < src.length; j++) {
    var m = src[j];
    var u2 = baseSrc(m.url || '');
    if (!u2) continue;
    if (seen[u2]) continue;
    seen[u2] = true;
    dst.media.push({
      url: m.url,
      type: m.type || null,
      alt: m.alt || '',
      loc: m.loc || null,
      avatarUrl: m.avatarUrl || null
    });
  }
}
function mergeReplies(dstNode, srcList) {
  dstNode.replies = dstNode.replies || [];
  for (var i = 0; i < srcList.length; i++) {
    var s = srcList[i], idx = -1;
    for (var j = 0; j < dstNode.replies.length; j++) {
      var d = dstNode.replies[j];
      var sameId = d.sourceId && s.sourceId && String(d.sourceId) === String(s.sourceId);
      var sameFallback = (!d.sourceId || !s.sourceId) &&
        (d.author || '') === (s.author || '') &&
        (d.text || '') === (s.text || '') &&
        (d.date || '') === (s.date || '');
      if (sameId || sameFallback) { idx = j; break; }
    }
    if (idx < 0) {
      var clone = {
        type: s.type,
        sourceId: s.sourceId || null,
        author: s.author,
        authorHref: s.authorHref,
        text: s.text,
        likes: s.likes,
        date: s.date,
        dateISO: s.dateISO,
        avatarUrl: s.avatarUrl,
        avatar: s.avatar,
        replies: [],
        reacts: s.reacts || null,
        media: (s.media && s.media.slice()) || []
      };
      if (s.replies && s.replies.length) mergeReplies(clone, s.replies);
      dstNode.replies.push(clone);
    } else {
      var d2 = dstNode.replies[idx];
      if (!d2.avatar && s.avatar) d2.avatar = s.avatar;
      if (!d2.avatarUrl && s.avatarUrl) d2.avatarUrl = s.avatarUrl;
      if (!d2.likes && s.likes) d2.likes = s.likes;
      if (!d2.reacts && s.reacts) d2.reacts = s.reacts;
      mergeMedia(d2, s.media || []);
      if (s.replies && s.replies.length) mergeReplies(d2, s.replies);
    }
  }
}
function mergeInto(bag, slice) {
  U.each(slice.rows || [], function (r) {
    var kc = keyC(r);
    if (!bag.has(kc)) bag.set(kc, {
      type: r.type,
      sourceId: r.sourceId || null,
      author: r.author,
      authorHref: r.authorHref,
      text: r.text,
      likes: r.likes,
      date: r.date,
      dateISO: r.dateISO,
      avatarUrl: r.avatarUrl,
      avatar: r.avatar,
      replies: [],
      reacts: r.reacts || null,
      media: (r.media && r.media.slice()) || []
    });
    var dst = bag.get(kc);
    if (!dst.avatar && r.avatar) dst.avatar = r.avatar;
    if (!dst.avatarUrl && r.avatarUrl) dst.avatarUrl = r.avatarUrl;
    if (!dst.likes && r.likes) dst.likes = r.likes;
    if (!dst.reacts && r.reacts) dst.reacts = r.reacts;
    mergeMedia(dst, r.media || []);
    if (r.replies && r.replies.length) mergeReplies(dst, r.replies);
  });
}
function summarize(bag) {
  var rows = Array.from(bag.values());
  var counter = 0, L1 = 0, L2 = 0;
  function walk(children) {
    for (var i = 0; i < children.length; i++) {
      counter++; children[i].num = counter + '.'; L2++;
      if (children[i].replies && children[i].replies.length) walk(children[i].replies);
    }
  }
  for (var i2 = 0; i2 < rows.length; i2++) {
    counter++; rows[i2].num = counter + '.'; L1++;
    if (rows[i2].replies && rows[i2].replies.length) walk(rows[i2].replies);
  }
  return { L1: L1, L2: L2, rows: rows };
}

/* ========= colheita progressiva – POST CLÁSSICO ========= */
function progressiveHarvest(panel) {
  return new Promise(function (resolve) {
    var bag = new Map(), waves = 0, lastTotal = 0, stable = 0, lastTop = -1;
    var MAX_WAVES = 140;
    var MAX_STABLE = 14;

    function findMainVirtualScroller() {
      var nodes = U.qa('*', document.body);
      var cand = [];
      U.each(nodes, function (el) {
        try {
          if (!U.vis(el)) return;
          var r = el.getBoundingClientRect();
          var cs = getComputedStyle(el);
          var w = Math.round(r.width || 0), h = Math.round(r.height || 0);
          var ch = el.clientHeight || 0, sh = el.scrollHeight || 0;
          if (w <= 500 || h <= 100) return;
          if (sh <= ch + 100) return;
          if (!/(auto|scroll|overlay)/i.test(cs.overflowY || '')) return;
          var text = U.T(el.innerText || el.textContent || '').slice(0, 250);
          var score = (sh - ch);
          if (/Most relevant|All comments|Todos os comentários|Write a comment|Comment by|Like Reply|Curtir Responder/i.test(text)) score += 5000;
          cand.push({ el: el, score: score, sh: sh, ch: ch, top: el.scrollTop || 0, text: text });
        } catch (_) { }
      });
      cand.sort(function (a, b) { return b.score - a.score; });
      return cand.length ? cand[0].el : null;
    }

    function addCurrentSlice() {
      var slice = collectSlice(panel);
      mergeInto(bag, slice);
      var snap = summarize(bag);
      if (window.__HUDH__ && window.__HUDH__.setStats) window.__HUDH__.setStats(snap.L1, snap.L2);
      return snap;
    }

    function step() {
      if (window.__HUDH__ && window.__HUDH__.stop && window.__HUDH__.stop()) { resolve(summarize(bag)); return; }
      if (waves >= MAX_WAVES) { resolve(summarize(bag)); return; }

      waves++;
      if (window.__HUDH__ && window.__HUDH__.inc) window.__HUDH__.inc();
      if (window.__HUDH__ && window.__HUDH__.set) window.__HUDH__.set(Math.min(68, 8 + Math.round(waves * 0.7)), 'Carregando comentários em ondas…');

      clickAllUntilExhausted(panel, 10)
        .then(function () {
          addCurrentSlice();
          var sc = findMainVirtualScroller();
          if (!sc) {
            stable++;
            return U.sleep(500).then(function () { return { moved: false, top: -1, maxTop: -1 }; });
          }
          var beforeTop = sc.scrollTop || 0;
          var maxTop = Math.max(0, (sc.scrollHeight || 0) - (sc.clientHeight || 0));
          try {
            sc.scrollTop = Math.min(beforeTop + Math.floor((sc.clientHeight || 600) * 0.65), maxTop);
          } catch (_) { }
          try {
            sc.dispatchEvent(new WheelEvent('wheel', {
              bubbles: true,
              cancelable: true,
              deltaY: 700,
              deltaMode: 0
            }));
          } catch (_) { }
          return U.sleep(850).then(function () {
            return { moved: Math.abs((sc.scrollTop || 0) - beforeTop) > 2, top: sc.scrollTop || 0, maxTop: Math.max(0, (sc.scrollHeight || 0) - (sc.clientHeight || 0)) };
          });
        })
        .then(function (mv) {
          var snap = addCurrentSlice();
          var total = snap.L1 + snap.L2;
          if (total > lastTotal) {
            lastTotal = total;
            stable = 0;
          } else {
            if (mv && mv.moved) stable = Math.max(0, stable - 1);
            else stable++;
          }
          if (mv && mv.top !== lastTop) {
            lastTop = mv.top;
          }
          if (mv && mv.maxTop >= 0 && mv.top >= mv.maxTop - 5 && total <= lastTotal) stable++;
          if (stable >= MAX_STABLE) { resolve(summarize(bag)); return; }
          step();
        })
        .catch(function(e){
          console.warn('Erro em progressiveHarvest virtualizado (post clássico):', e);
          resolve(summarize(bag));
        });
    }

    addCurrentSlice();
    U.sleep(400).then(step);
  });
}

/* ========= colheita progressiva – REEL ========= */
/* ========= colheita progressiva – REEL ========= */
function reelScrollCandidatesV44R21R3(panel){
  var all=[panel],out=[],card=activeReelCardV44R21R8();try{all=all.concat(Array.prototype.slice.call((panel||document).querySelectorAll('*')).slice(0,4000));}catch(_){}
  all.forEach(function(el){try{if(!el||!U.vis(el)||el===document.body||el===document.documentElement)return;var range=Math.max(0,Number(el.scrollHeight||0)-Number(el.clientHeight||0));if(range<35)return;var r=el.getBoundingClientRect(),videos=el.querySelectorAll?el.querySelectorAll('[data-video-id]').length:0;if(videos>0)return;if(r.width>innerWidth*.72&&r.height>innerHeight*.65)return;if(card&&(el.contains(card)||card.contains(el)))return;var cs=getComputedStyle(el),txt=U.T(el.innerText||el.textContent||'').slice(0,1200),editor=/write a comment|comment as|escreva um coment[aá]rio|comentar como/i.test(txt),rows=0;try{rows=el.querySelectorAll('div[role="article"],li[aria-posinset],a[href*="comment_id="]').length;}catch(_){}if(!editor&&rows<1&&!/all comments|most relevant|todos os coment[aá]rios|mais relevantes/i.test(txt))return;var score=range+(/auto|scroll|overlay/i.test(String(cs.overflowY||''))?1500:0)+(r.left>innerWidth*.45?900:0)+rows*120+(editor?1500:0);out.push({el:el,score:score});}catch(_){} });out.sort(function(a,b){return b.score-a.score;});return out.slice(0,4).map(function(x){return x.el;});
}
function scrollReelCommentWaveV44R21R3(panel,scrollers){var moved=false,atBottom=true;(scrollers||[]).forEach(function(sc){try{var before=Number(sc.scrollTop||0),max=Math.max(0,Number(sc.scrollHeight||0)-Number(sc.clientHeight||0)),step=Math.max(420,Math.floor(Number(sc.clientHeight||500)*.78)),next=Math.min(max,before+step);if(typeof sc.scrollTo==='function')sc.scrollTo({top:next,behavior:'auto'});else sc.scrollTop=next;try{sc.dispatchEvent(new WheelEvent('wheel',{bubbles:true,cancelable:true,deltaY:850,deltaMode:0}));}catch(_){}if(Math.abs(Number(sc.scrollTop||0)-before)>2)moved=true;if(Number(sc.scrollTop||0)<Math.max(0,max-8))atBottom=false;}catch(_){atBottom=false;}});return {moved:moved,atBottom:atBottom};}
function progressiveHarvestReel(panel) {
  return new Promise(function (resolve) {
    panel=findReelCommentSurfaceV44R21R3()||panel||panelRoot();
    var bag = new Map(),waves = 0,last = 0,stable = 0,bottomStable=0,scrollers=[];
    var target=Number(__REEL_COUNTS_SNAPSHOT__&&__REEL_COUNTS_SNAPSHOT__.comment||0),MAX_WAVES=120,MAX_STABLE=16,MAX_BOTTOM=8,MAX_MS=120000,startTime=Date.now();
    function snapshot(){panel=findReelCommentSurfaceV44R21R3()||panel||panelRoot();mergeInto(bag,collectSlice(panel));var snap=summarize(bag);if(window.__HUDH__&&window.__HUDH__.setStats)window.__HUDH__.setStats(snap.L1,snap.L2);return snap;}
    function finish(reason){var snap=snapshot(),total=snap.L1+snap.L2;snap.collectionAudit={mode:'REEL_COMMENT_PANEL_SCROLL_V44R21R3',declaredTarget:target,collectedTotal:total,targetReached:target>0?total>=target:true,waves:waves,stableCycles:stable,bottomStableCycles:bottomStable,terminalReason:reason,elapsedMs:Date.now()-startTime,panelObserved:panel!==document.body};resolve(snap);}
    function loop(){if(!window.__HUDH__||typeof window.__HUDH__.stop!=='function'){finish('HUD_UNAVAILABLE');return;}if(window.__HUDH__.stop()){finish('USER_STOP');return;}if(waves>=MAX_WAVES){finish('MAX_WAVES');return;}if(Date.now()-startTime>=MAX_MS){finish('MAX_TIME');return;}waves++;if(window.__HUDH__.inc)window.__HUDH__.inc();if(window.__HUDH__.set)window.__HUDH__.set(Math.min(68,8+Math.round(waves*.45)),'Reel: carregando comentários e respostas…');clickAllUntilExhausted(panel,24).then(function(){var before=snapshot(),beforeTotal=before.L1+before.L2;if(!scrollers.length||waves===1||waves%5===0)scrollers=reelScrollCandidatesV44R21R3(panel);var mv=scrollReelCommentWaveV44R21R3(panel,scrollers);return U.waitMut(panel,1000).then(function(){return U.sleep(220);}).then(function(){var after=snapshot(),cur=after.L1+after.L2,more=findButtons(panel).length;if(cur>last||cur>beforeTotal){last=cur;stable=0;bottomStable=0;}else{stable++;if(mv.atBottom&&!more)bottomStable++;else bottomStable=0;}if(target>0&&cur>=target){finish('DECLARED_TARGET_REACHED');return true;}if(bottomStable>=MAX_BOTTOM){finish('STABLE_BOTTOM_NO_MORE_CONTROLS');return true;}if(stable>=MAX_STABLE&&mv.atBottom){finish('STABLE_NO_GROWTH');return true;}return false;});}).then(function(done){if(!done)loop();}).catch(function(e){console.warn('Erro em progressiveHarvestReel V44R21R3:',e);finish('ERROR_SAFE_PARTIAL');});}
    snapshot();U.sleep(350).then(loop);
  });
}

/* ========= metadados ========= */


/* V44R16 — fotografia completa do cabeçalho da postagem.
   O mesmo coletor é usado em POST, PHOTO, VIDEO e REEL. Ele preserva somente
   texto, links e contagens efetivamente materializados no DOM. */
function postHeaderRootV44R16(surface,author){
  surface=surface||findPostSurface(postTypeFromUrl(location.href))||panelRoot()||document.body;
  var a=author&&author.a?author.a:null,best=null;
  if(a){
    var n=a;
    for(var i=0;i<11&&n&&n!==document.body&&n!==document.documentElement;i++,n=n.parentElement){
      try{
        var r=n.getBoundingClientRect&&n.getBoundingClientRect(),tx=t(n.innerText||n.textContent||''),links=n.querySelectorAll?n.querySelectorAll('a[href]').length:0;
        if(!r||r.width<120||r.height<16||r.height>360||tx.length<2||tx.length>900)continue;
        var score=(links*35)+(tx.indexOf(author.name||'')>=0?120:0);
        if(/\b(?:with|com|at|em|is|está|estava|sentindo|celebrating|comemorando|junto com|marcou|tagged)\b/i.test(tx))score+=220;
        if(/\b\d+\s+(?:others?|outras? pessoas?)\b/i.test(tx))score+=130;
        if(n.querySelector&&n.querySelector('time[datetime],abbr[data-utime],[aria-label*="Shared with"],[aria-label*="Público"]'))score+=80;
        if(!best||score>best.score)best={node:n,score:score};
      }catch(_){}
    }
  }
  if(best&&best.score>=150)return best.node;
  var heads=Array.prototype.slice.call(surface.querySelectorAll('h1,h2,h3,[data-ad-rendering-role="profile_name"]')).filter(visible);
  return heads.find(function(x){return !!findAuthorCandidate(x);})||heads[0]||null;
}
function postHeaderScopesV44R16(surface,author){
  var out=[],head=postHeaderRootV44R16(surface,author);function add(x){if(x&&out.indexOf(x)<0)out.push(x);}
  add(head);var n=head;for(var i=0;i<7&&n&&n!==document.body;i++,n=n.parentElement){try{var r=n.getBoundingClientRect();if(r.width>180&&r.height<520)add(n);}catch(_){add(n);}}
  add(surface);return out;
}
function cleanObservedFacebookUrlV44R16(raw){
  try{var x=new URL(String(raw||''),location.href);if(x.protocol!=='https:'||!/(^|\.)facebook\.com$/i.test(x.hostname))return '';['__cft__','__tn__','comment_id','reply_comment_id'].forEach(function(k){x.searchParams.delete(k);});x.hash='';return x.href;}catch(_){return '';}
}
function uniqueEntityV44R16(list,item){
  if(!item||!item.text)return;var key=String(item.type||'')+'|'+String(item.url||'')+'|'+t(item.text).toLowerCase();
  if(!list.some(function(x){return (String(x.type||'')+'|'+String(x.url||'')+'|'+t(x.text).toLowerCase())===key;}))list.push(item);
}
function isExactPostDateV44R16(text,iso){
  text=t(text);if(iso&&/^\d{4}-\d{2}-\d{2}T/.test(String(iso)))return true;
  return /\b(?:19|20)\d{2}\b/.test(text)&&(/\b(?:January|February|March|April|May|June|July|August|September|October|November|December|janeiro|fevereiro|março|abril|maio|junho|julho|agosto|setembro|outubro|novembro|dezembro)\b/i.test(text)||/\b\d{1,2}[\/.-]\d{1,2}[\/.-](?:19|20)\d{2}\b/.test(text));
}
function postCaptionEntitiesV44R16(surface,caption){
  var out=[];caption=t(caption);if(!surface||!caption)return out;
  var nodes=Array.prototype.slice.call(surface.querySelectorAll('div[dir="auto"],span[dir="auto"],p')).filter(visible).filter(function(el){var tx=t(el.innerText||el.textContent||'');return tx&&caption.length>20&&(tx===caption||tx.indexOf(caption.slice(0,Math.min(80,caption.length)))>=0);});
  nodes.slice(0,5).forEach(function(node){Array.prototype.slice.call(node.querySelectorAll('a[href]')).forEach(function(a){var tx=t(a.textContent||a.getAttribute('aria-label')||''),url=cleanObservedFacebookUrlV44R16(a.href||a.getAttribute('href')||'');if(tx&&url)uniqueEntityV44R16(out,{type:/\/hashtag\//i.test(url)?'hashtag':(profileIdentityFromUrl(url)?'person':'link'),text:tx,url:url});});});
  return out;
}
function postHeaderMetadataV44R16(captionHint){
  var out={postDateText:'',postDateExactText:'',postDateRelativeText:'',postDateISO:null,postDateURL:'',locationText:'',locationURL:'',privacyText:'',headerStoryText:'',headerEntities:[],taggedPeople:[],taggedPeopleOtherCount:0,places:[],captionEntities:[]};
  try{
    var type=postTypeFromUrl(location.href),surface=findPostSurface(type)||panelRoot()||document.body,author=findAuthorCandidate(surface),head=postHeaderRootV44R16(surface,author),scopes=postHeaderScopesV44R16(surface,author);
    if(head){
      out.headerStoryText=t(head.innerText||head.textContent||'');
      Array.prototype.slice.call(head.querySelectorAll('a[href]')).forEach(function(a){
        var tx=t(a.textContent||a.getAttribute('aria-label')||''),url=cleanObservedFacebookUrlV44R16(a.href||a.getAttribute('href')||'');if(!tx||!url)return;
        var type='link',same=author&&sameProfileIdentity(url,author.href),before=t((a.previousSibling&&a.previousSibling.textContent)||'').toLowerCase(),story=t(head.innerText||head.textContent||''),storyAt=story.indexOf(tx),storyBefore=storyAt>=0?story.slice(Math.max(0,storyAt-40),storyAt).toLowerCase():'';
        if(same)type='author';else if(/\/hashtag\//i.test(url))type='hashtag';else if(/(?:\/pages\/|\/places\/)/i.test(url)||/(?:\bat\s*$|\bem\s*$)/i.test(before)||/(?:\bat|\bem)\s*$/.test(storyBefore))type='place';else if(profileIdentityFromUrl(url))type='person';
        var item={type:type,text:tx,url:url};uniqueEntityV44R16(out.headerEntities,item);
        if(type==='person')uniqueEntityV44R16(out.taggedPeople,item);if(type==='place')uniqueEntityV44R16(out.places,item);
      });
      Array.prototype.slice.call(head.querySelectorAll('[role="button"],button')).forEach(function(b){var tx=t(b.innerText||b.textContent||b.getAttribute('aria-label')||''),m=tx.match(/^(\d+)\s+(?:others?|outras? pessoas?)$/i);if(m)out.taggedPeopleOtherCount=Math.max(out.taggedPeopleOtherCount,Number(m[1]||0));});
    }
    var dates=[];
    function dateAdd(el){var text=t(el.getAttribute&&((el.getAttribute('aria-label')||el.getAttribute('title')||el.getAttribute('data-tooltip-content')))||el.textContent||''),iso=el.getAttribute&&el.getAttribute('datetime')||'',ut=el.getAttribute&&el.getAttribute('data-utime')||'',url='';
      if(ut&&/^\d{9,13}$/.test(ut)){var num=Number(ut);if(String(ut).length===10)num*=1000;var d=new Date(num);if(isFinite(d.getTime()))iso=d.toISOString();}
      if(el.closest){var aa=el.closest('a[href]');if(aa)url=cleanObservedFacebookUrlV44R16(aa.href||'');}
      var exact=isExactPostDateV44R16(text,iso),relative=/^\d+\s*(?:min|h|d|w|m|y|minuto|hora|dia|semana|mês|ano)s?$/i.test(text),score=(exact?500:0)+(iso?220:0)+(relative?20:0)+(url&&/\/posts\/|\/reel\/|photo\.php|\/videos\//i.test(url)?160:0);
      if(text&&(exact||relative||iso))dates.push({text:text,iso:iso,url:url,exact:exact,relative:relative,score:score});
    }
    scopes.forEach(function(scope){Array.prototype.slice.call(scope.querySelectorAll('time[datetime],abbr[data-utime],[aria-label],[title],[data-tooltip-content],a[href*="/posts/"],a[href*="/reel/"],a[href*="photo.php"],a[href*="/videos/"]')).slice(0,800).forEach(dateAdd);});
    /* Tooltips de data podem ser materializados fora do modal. Aceite apenas datas exatas. */
    Array.prototype.slice.call(document.querySelectorAll('[role="tooltip"],[data-tooltip-content],span,div')).slice(0,5000).forEach(function(el){var tx=t(el.getAttribute&&((el.getAttribute('aria-label')||el.getAttribute('title')||el.getAttribute('data-tooltip-content')))||el.textContent||'');if(tx.length<=80&&isExactPostDateV44R16(tx,''))dateAdd(el);});
    dates.sort(function(a,b){return b.score-a.score;});if(dates[0]){out.postDateText=dates[0].text||'';out.postDateISO=dates[0].iso||null;out.postDateURL=dates[0].url||'';if(dates[0].exact)out.postDateExactText=dates[0].text;else out.postDateRelativeText=dates[0].text;}
    var locations=[];
    scopes.forEach(function(scope){
      Array.prototype.slice.call(scope.querySelectorAll('a[href]')).forEach(function(a){var tx=t(a.textContent||a.getAttribute('aria-label')||''),url=cleanObservedFacebookUrlV44R16(a.href||'');if(!tx||!url||tx.length>140)return;if(author&&sameProfileIdentity(url,author.href))return;if(/comment_id=|\/posts\/|\/reel\/|photo\.php|\/hashtag\/|\/friends|\/followers|\/following|\/share/i.test(url))return;
        var before=t((a.previousSibling&&a.previousSibling.textContent)||'').toLowerCase(),placeish=/(?:\/pages\/|\/places\/)/i.test(url)||/(?:\bat\s*$|\bem\s*$)/i.test(before)||/[A-Za-zÀ-ÿ]{2,}.+(?:,|\s-\s).+[A-Za-zÀ-ÿ]{2,}/.test(tx);
        if(placeish)locations.push({text:tx,url:url,score:(/(?:\/pages\/|\/places\/)/i.test(url)?200:0)+(/,/.test(tx)?100:0)+tx.length});
      });
      Array.prototype.slice.call(scope.querySelectorAll('[aria-label],[title]')).forEach(function(el){var tx=t(el.getAttribute('aria-label')||el.getAttribute('title')||'');if(/Shared with Public|Público|Amigos|Friends|Somente eu|Only me/i.test(tx)&&tx.length<80)out.privacyText=tx;});
    });
    locations.sort(function(a,b){return b.score-a.score;});if(locations[0]){out.locationText=locations[0].text;out.locationURL=locations[0].url;}
    if(!out.locationText&&out.places[0]){out.locationText=out.places[0].text;out.locationURL=out.places[0].url;}
    var placeKeys=new Set((out.places||[]).map(function(x){return (String(x.url||'')+'|'+t(x.text).toLowerCase());}));
    out.taggedPeople=(out.taggedPeople||[]).filter(function(x){return !placeKeys.has(String(x.url||'')+'|'+t(x.text).toLowerCase());});
    out.captionEntities=postCaptionEntitiesV44R16(surface,captionHint||'');
  }catch(_){}
  return out;
}
function mergePostHeaderMetadataV44R16(a,b){
  a=a&&typeof a==='object'?a:{};b=b&&typeof b==='object'?b:{};var out=Object.assign({},a);
  ['postDateText','postDateExactText','postDateRelativeText','postDateISO','postDateURL','locationText','locationURL','privacyText','headerStoryText'].forEach(function(k){if(!out[k]&&b[k])out[k]=b[k];});
  ['headerEntities','taggedPeople','places','captionEntities'].forEach(function(k){out[k]=Array.isArray(out[k])?out[k].slice():[];(b[k]||[]).forEach(function(x){uniqueEntityV44R16(out[k],x);});});
  out.taggedPeopleOtherCount=Math.max(Number(out.taggedPeopleOtherCount||0),Number(b.taggedPeopleOtherCount||0));
  if(b.metadataSchemaVersion==='POST_METADATA_V44R19_V1'){
    if(b.postDateExactText){out.postDateText=b.postDateText||b.postDateExactText;out.postDateExactText=b.postDateExactText;out.postDateRelativeText='';out.postDateURL=b.postDateURL||out.postDateURL||'';}
    out.privacyText=b.privacyText||'';out.metadataSchemaVersion=b.metadataSchemaVersion;out.metadataCapturedAt=b.metadataCapturedAt||out.metadataCapturedAt||'';out.metadataCapturedBeforeScroll=!!(b.metadataCapturedBeforeScroll||out.metadataCapturedBeforeScroll);
    out=sanitizePostMetadataV44R19(out);
  }
  return out;
}
function clickObservedControlV44R17(el){
  if(!el)return false;try{el.scrollIntoView({block:'center',inline:'nearest',behavior:'auto'});}catch(_){}
  /* O clique nativo já era funcional na base estável e continua sendo a primeira opção. */
  try{if(typeof el.click==='function'){el.click();return true;}}catch(_){}
  try{['pointerdown','mousedown','pointerup','mouseup','click'].forEach(function(type){el.dispatchEvent(new MouseEvent(type,{bubbles:true,cancelable:true,view:window}));});return true;}catch(_){return false;}
}
function peopleDialogScoreV44R17(dlg,before){
  if(!dlg||!visible(dlg))return -999;var tx=t(dlg.innerText||dlg.textContent||''),score=0;
  if(/^(?:People|Pessoas)\b/i.test(tx)||/\b(?:People|Pessoas)\b/i.test(tx.slice(0,120)))score+=500;
  if(before&&!before.has(dlg))score+=180;
  var names=Array.prototype.slice.call(dlg.querySelectorAll('a[href],[role="button"],[role="listitem"],[role="option"]')).filter(visible).filter(function(el){var x=t(el.innerText||el.textContent||el.getAttribute('aria-label')||'');return x.length>=2&&x.length<=120&&!/^(?:People|Pessoas|Close|Fechar|Cancel|Cancelar)$/i.test(x);}).length;
  score+=Math.min(20,names)*15;
  try{var r=dlg.getBoundingClientRect();if(r.width>=300&&r.height>=180)score+=30;}catch(_){}
  return score;
}
function waitPeopleDialogV44R17(before,timeoutMs){
  var end=Date.now()+Math.max(1200,Number(timeoutMs||5000));
  return new Promise(function(resolve){(function poll(){var all=Array.prototype.slice.call(document.querySelectorAll('[role="dialog"],div[aria-modal="true"]')).filter(visible),best=null,bestScore=-999;all.forEach(function(d){var sc=peopleDialogScoreV44R17(d,before);if(sc>bestScore){bestScore=sc;best=d;}});if(best&&bestScore>=350){resolve(best);return;}if(Date.now()>=end){resolve(null);return;}setTimeout(poll,120);})();});
}
function personNameCandidateV44R17(raw){
  var x=t(raw);if(!x||x.length<2||x.length>120)return '';
  if(/^(?:People|Pessoas|Close|Fechar|Cancel|Cancelar|See all|Ver todos|Search|Pesquisar)$/i.test(x))return '';
  if(/\b(?:Like|Curtir|Reply|Responder|Comment|Comentar|Share|Compartilhar|Follow|Seguir)\b/i.test(x))return '';
  if(/^\d+\s+(?:others?|outras? pessoas?)$/i.test(x))return '';
  if(/[.!?]{2,}|https?:\/\//i.test(x))return '';
  var lines=x.split(/\n+/).map(t).filter(Boolean);if(lines.length>1)x=lines[0];
  if(x.split(/\s+/).length>8)return '';
  return x;
}
function profileHrefNearV44R17(el){
  var a=null;try{a=el.matches&&el.matches('a[href]')?el:el.querySelector&&el.querySelector('a[href]');if(!a&&el.closest)a=el.closest('a[href]');}catch(_){}
  var u=a?cleanObservedFacebookUrlV44R16(a.href||a.getAttribute('href')||''):'';return u&&profileIdentityFromUrl(u)?u:'';
}
function collectPeopleDialogV44R17(dlg,meta){
  var before=(meta.taggedPeople||[]).length,known=new Set((meta.taggedPeople||[]).map(function(x){return t(x.text).toLowerCase();}));
  var nodes=[];try{nodes=Array.prototype.slice.call(dlg.querySelectorAll('a[href],[role="listitem"],[role="option"],[role="button"],li,div[tabindex="0"]')).filter(visible);}catch(_){}
  nodes.forEach(function(el){
    var raw=t(el.innerText||el.textContent||el.getAttribute('aria-label')||''),name=personNameCandidateV44R17(raw);if(!name)return;
    /* Evita pais de múltiplas linhas: o row de pessoa deve ser compacto ou possuir imagem. */
    var hasVisual=false;try{hasVisual=!!el.querySelector('img,svg image,svg[role="img"]');}catch(_){}
    var href=profileHrefNearV44R17(el);var role=String(el.getAttribute&&el.getAttribute('role')||'');if(!href&&!hasVisual&&role!=='listitem'&&role!=='option'&&role!=='button')return;
    var key=name.toLowerCase();if(known.has(key))return;known.add(key);uniqueEntityV44R16(meta.taggedPeople||(meta.taggedPeople=[]),{type:'person',text:name,url:href});
  });
  /* Fallback para o diálogo People atual: alguns nomes são spans sem role/href,
     mas pertencem a uma linha compacta que contém o avatar. */
  try{Array.prototype.slice.call(dlg.querySelectorAll('span,div')).filter(visible).slice(0,1200).forEach(function(el){
    var name=personNameCandidateV44R17(el.innerText||el.textContent||'');if(!name)return;
    if(el.children&&el.children.length>2)return;
    var row=el,hasVisual=false,href='';for(var depth=0;depth<5&&row&&row!==dlg;depth++,row=row.parentElement){try{hasVisual=!!row.querySelector('img,svg image,svg[role="img"]');href=href||profileHrefNearV44R17(row);}catch(_){}if(hasVisual||href)break;}
    if(!hasVisual&&!href)return;var key=name.toLowerCase();if(known.has(key))return;known.add(key);uniqueEntityV44R16(meta.taggedPeople||(meta.taggedPeople=[]),{type:'person',text:name,url:href});
  });}catch(_){}
  return Math.max(0,(meta.taggedPeople||[]).length-before);
}
function peopleDialogScrollerV44R17(dlg){
  var best=null,bestRange=0;try{Array.prototype.slice.call(dlg.querySelectorAll('div,section,ul')).forEach(function(el){var range=Math.max(0,Number(el.scrollHeight||0)-Number(el.clientHeight||0));if(range>bestRange){bestRange=range;best=el;}});}catch(_){}return best;
}
function closePeopleDialogV44R17(dlg){
  if(!dlg)return;var close=null;try{close=Array.prototype.slice.call(dlg.querySelectorAll('[aria-label],[title],[role="button"],button')).find(function(x){return /^(?:Close|Fechar)(?:\s|$)/i.test(t(x.getAttribute('aria-label')||x.getAttribute('title')||x.textContent||''));});}catch(_){}
  if(!close){try{var r=dlg.getBoundingClientRect(),buttons=Array.prototype.slice.call(dlg.querySelectorAll('[role="button"],button')).filter(visible);buttons.sort(function(a,b){var ar=a.getBoundingClientRect(),br=b.getBoundingClientRect(),as=(ar.top-r.top)+(r.right-ar.right),bs=(br.top-r.top)+(r.right-br.right);return as-bs;});close=buttons[0]||null;}catch(_){} }
  if(close)clickObservedControlV44R17(close);else try{dlg.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',code:'Escape',bubbles:true}));}catch(_){}
}
function expandTaggedPeopleV44R16(meta){
  meta=meta&&typeof meta==='object'?meta:{};
  var declared=Math.max(0,Number(meta.taggedPeopleOtherDeclaredCount||meta.taggedPeopleOtherCount||0));
  meta.taggedPeopleOtherDeclaredCount=declared;
  if(!declared){meta.taggedPeopleExpansionComplete=true;meta.taggedPeopleExpandedCount=0;return Promise.resolve(meta);}
  try{
    var surface=findPostSurface(postTypeFromUrl(location.href))||panelRoot()||document.body;
    var btn=Array.prototype.slice.call(surface.querySelectorAll('[role="button"],button')).find(function(b){return /^(\d+)\s+(?:others?|outras? pessoas?)$/i.test(t(b.innerText||b.textContent||b.getAttribute('aria-label')||''))&&visible(b);});
    if(!btn){meta.taggedPeopleExpansionComplete=false;return Promise.resolve(meta);}
    var beforeDialogs=new Set(Array.prototype.slice.call(document.querySelectorAll('[role="dialog"],div[aria-modal="true"]')).filter(visible));
    if(!clickObservedControlV44R17(btn)){meta.taggedPeopleExpansionComplete=false;return Promise.resolve(meta);}
    return waitPeopleDialogV44R17(beforeDialogs,5500).then(function(dlg){
      if(!dlg){meta.taggedPeopleExpansionComplete=false;return meta;}
      var initial=(meta.taggedPeople||[]).length,sc=peopleDialogScrollerV44R17(dlg),round=0,stable=0,last=-1;
      return new Promise(function(resolve){(function harvest(){
        collectPeopleDialogV44R17(dlg,meta);var added=Math.max(0,(meta.taggedPeople||[]).length-initial);
        if(added===last)stable++;else{last=added;stable=0;}
        if(added>=declared||stable>=3||round>=12){
          meta.taggedPeopleExpandedCount=added;meta.taggedPeopleOtherCount=Math.max(0,declared-added);meta.taggedPeopleExpansionComplete=added>=declared;
          closePeopleDialogV44R17(dlg);setTimeout(function(){closePeopleDialogV44R17(dlg);},180);resolve(meta);return;
        }
        round++;if(sc){try{sc.scrollTop=Math.min(Number(sc.scrollHeight||0),Number(sc.scrollTop||0)+Math.max(180,Number(sc.clientHeight||0)*0.8));}catch(_){}}
        setTimeout(harvest,220);
      })();});
    });
  }catch(_){meta.taggedPeopleExpansionComplete=false;return Promise.resolve(meta);}
}
function resolvePostHeaderMetadataV44R16(initial,caption){var merged=mergePostHeaderMetadataV44R16(initial||{},postHeaderMetadataV44R16(caption||''));return expandTaggedPeopleV44R16(merged).catch(function(){return merged;});}

/* V44R19 — metadados instituídos.
   Captura o cabeçalho antes do scroll, vincula data exata por aria-labelledby,
   lê a privacidade no título do ícone e higieniza pessoas marcadas. */
function labelledReferenceTextV44R19(el){
  var ids=[];try{var nodes=[el].concat(Array.prototype.slice.call(el.querySelectorAll('[aria-labelledby],[aria-describedby]')));nodes.forEach(function(n){['aria-labelledby','aria-describedby'].forEach(function(a){String(n.getAttribute&&n.getAttribute(a)||'').split(/\s+/).filter(Boolean).forEach(function(id){if(ids.indexOf(id)<0)ids.push(id);});});});}catch(_){}
  var out=[];ids.forEach(function(id){try{var ref=document.getElementById(id),tx=t(ref&&ref.textContent||'');if(tx&&out.indexOf(tx)<0)out.push(tx);}catch(_){}});return out;
}
function exactBoundPostDateV44R19(scopes){
  var best=null;function add(text,url,score){text=t(text);if(!isExactPostDateV44R16(text,''))return;var x={text:text,url:cleanObservedFacebookUrlV44R16(url||''),score:score||0};if(!best||x.score>best.score)best=x;}
  (scopes||[]).forEach(function(scope){try{Array.prototype.slice.call(scope.querySelectorAll('a[href*="/posts/"],a[href*="/reel/"],a[href*="photo.php"],a[href*="/videos/"]')).slice(0,80).forEach(function(a){labelledReferenceTextV44R19(a).forEach(function(tx){add(tx,a.href,1000);});var direct=t(a.getAttribute('aria-label')||a.getAttribute('title')||'');add(direct,a.href,700);});}catch(_){}});return best;
}
function exactPrivacyTextV44R19(scopes){
  var vals=[];function add(x){x=t(x);if(x&&x.length<100&&vals.indexOf(x)<0)vals.push(x);}
  (scopes||[]).forEach(function(scope){try{Array.prototype.slice.call(scope.querySelectorAll('[aria-label],[title],svg[role="img"],svg title')).slice(0,1200).forEach(function(el){add(el.getAttribute&&el.getAttribute('aria-label'));add(el.getAttribute&&el.getAttribute('title'));if(String(el.tagName||'').toLowerCase()==='title')add(el.textContent);else{var tt=el.querySelector&&el.querySelector('title');if(tt)add(tt.textContent);}});}catch(_){}});
  for(var i=0;i<vals.length;i++){var v=vals[i];if(/^(?:Shared with\s+|Compartilhado com\s+)?(?:Public|Público|Friends|Amigos|Only me|Somente eu|Custom|Personalizado)(?:\b|$)/i.test(v))return v;}
  return '';
}
function cleanTaggedPersonNameV44R19(raw){
  var name=t(raw).replace(/^(?:Profile picture of|Foto do perfil de)\s+/i,'');
  if(!name||name.length<2||name.length>100)return '';
  if(/^(?:People|Pessoas)(?:\s|$)/i.test(name))return '';
  if(/^\d+\s+(?:others?|outras? pessoas?)$/i.test(name))return '';
  if(/^(?:Close|Fechar|See all|Ver todos)$/i.test(name))return '';
  return name;
}

function sanitizeHeaderStoryTextV44R21R4(raw,authorName){
  var s=t(raw).replace(/[\u2060\u2061\u2062\u2063\u2064\u2066-\u2069]/g,' ');if(!s)return '';
  s=s.replace(/(?:^|\s)((?:[A-Za-z0-9]\s+){10,}[A-Za-z0-9])(?=\s|[·•]|$)/g,' ');
  s=s.replace(/\b(?=[A-Za-z0-9]{15,}\b)(?=[A-Za-z0-9]*[A-Za-z])(?=[A-Za-z0-9]*\d)[A-Za-z0-9]+\b/g,' ');
  s=t(s).replace(/\s*[·•]\s*(?:[·•]\s*)+/g,' · ');
  var author=t(authorName||'');if(author){var escA=author.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');s=s.replace(new RegExp('^('+escA+')(?:\\s+|\\s*[·•]\\s*)+', 'i'),author+' · ');}
  var semantic=s;if(author){var rest=t(s.replace(new RegExp('^'+author.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),'i'),'').replace(/^[·•\s]+/,'')).replace(/^(?:Follow|Seguir)(?:\s*[·•])?$/i,'');if(!rest)return '';}
  if(fbIsScrambledMetaNoise(semantic))return '';
  return semantic;
}

function sanitizePostMetadataV44R19(meta){
  meta=meta&&typeof meta==='object'?meta:{};
  var input=Array.isArray(meta.taggedPeople)?meta.taggedPeople:[],chosen=[],byKey=Object.create(null);
  input.forEach(function(x){var name=cleanTaggedPersonNameV44R19(x&&x.text||''),url=cleanObservedFacebookUrlV44R16(x&&x.url||'');if(!name)return;var identity=profileIdentityFromUrl(url),key=identity||name.toLowerCase();var item={type:'person',text:name,url:url};if(!byKey[key]){byKey[key]=item;chosen.push(item);}else if(!byKey[key].url&&url){byKey[key].url=url;}});
  // Elimina linhas agregadas que apenas concatenam duas ou mais pessoas já individualizadas.
  chosen=chosen.filter(function(x){var low=x.text.toLowerCase(),contained=0;chosen.forEach(function(y){if(y!==x&&y.text.length<x.text.length&&low.indexOf(y.text.toLowerCase())>=0)contained++;});return contained<2;});
  var authorId=profileIdentityFromUrl(meta.authorURL||'');chosen=chosen.filter(function(x){return !(authorId&&profileIdentityFromUrl(x.url||'')===authorId);});
  meta.taggedPeople=chosen;
  var declared=Math.max(0,Number(meta.taggedPeopleOtherDeclaredCount||meta.taggedPeopleOtherCount||0));
  var headerNamed=(meta.headerEntities||[]).filter(function(x){return x&&x.type==='person';}).map(function(x){return profileIdentityFromUrl(x.url||'')||t(x.text).toLowerCase();});
  var added=chosen.filter(function(x){var k=profileIdentityFromUrl(x.url||'')||t(x.text).toLowerCase();return headerNamed.indexOf(k)<0;}).length;
  if(meta.taggedPeopleExpansionComplete||Number(meta.taggedPeopleExpandedCount||0)>=declared||added>=declared)meta.taggedPeopleOtherCount=0;else meta.taggedPeopleOtherCount=Math.max(0,declared-added);
  meta.headerStoryText=sanitizeHeaderStoryTextV44R21R4(meta.headerStoryText||'',meta.author||'');
  meta.metadataSchemaVersion='POST_METADATA_V44R21R4_V1';
  return meta;
}
function postHeaderMetadataV44R19(captionHint){
  var base=postHeaderMetadataV44R16(captionHint||'');
  try{var type=postTypeFromUrl(location.href),surface=findPostSurface(type)||panelRoot()||document.body,author=findAuthorCandidate(surface),scopes=postHeaderScopesV44R16(surface,author),bound=exactBoundPostDateV44R19(scopes),privacy=exactPrivacyTextV44R19(scopes);
    if(bound){base.postDateText=bound.text;base.postDateExactText=bound.text;base.postDateRelativeText='';base.postDateURL=bound.url||base.postDateURL||'';}
    // Nunca aceite texto incidental contendo apenas a palavra Friends/Amigos.
    base.privacyText=privacy||'';
    base.metadataCapturedAt=new Date().toISOString();base.metadataCapturedBeforeScroll=true;
  }catch(_){}
  return sanitizePostMetadataV44R19(base);
}
function resolvePostHeaderMetadataV44R19(initial,caption){
  var merged=mergePostHeaderMetadataV44R16(initial||{},postHeaderMetadataV44R19(caption||''));
  return expandTaggedPeopleV44R16(merged).then(function(x){return sanitizePostMetadataV44R19(x);}).catch(function(){return sanitizePostMetadataV44R19(merged);});
}

/* V44R19 bridge: mantém startHarvest idêntico e fortalece apenas a resolução de metadados. */
resolvePostHeaderMetadataV44R16=function(initial,caption){
  var seed=mergePostHeaderMetadataV44R16(__POST_METADATA_SNAPSHOT_V44R19__||{},initial||{});
  return resolvePostHeaderMetadataV44R19(seed,caption||'');
};
function safeAnyHttpUrlV44R16(raw){try{var x=new URL(String(raw||''),location.href);return (x.protocol==='http:'||x.protocol==='https:')?x.href:'';}catch(_){return '';}}
function linkifyObservedTextHtmlV44R16(raw,entities){
  raw=String(raw||'');if(!raw)return '';var matches=[];function add(start,end,href,priority){href=safeAnyHttpUrlV44R16(href);if(start>=0&&end>start&&href)matches.push({start:start,end:end,href:href,priority:priority||0});}
  (entities||[]).forEach(function(e){var name=String(e&&e.text||''),href=e&&e.url||'';if(!name||name.length<2||!href)return;var from=0,at;while((at=raw.indexOf(name,from))>=0){add(at,at+name.length,href,80);from=at+name.length;}});
  var re=/#([\p{L}\p{N}_-]+)/gu,m;while((m=re.exec(raw)))add(m.index,m.index+m[0].length,'https://www.facebook.com/hashtag/'+encodeURIComponent(m[1]),40);
  var ru=/https?:\/\/[^\s<>()]+/gi;while((m=ru.exec(raw)))add(m.index,m.index+m[0].length,m[0],30);
  matches.sort(function(a,b){return a.start-b.start||(b.end-b.start)-(a.end-a.start)||b.priority-a.priority;});var picked=[],cursor=-1;matches.forEach(function(x){if(x.start>=cursor){picked.push(x);cursor=x.end;}});
  var out='',pos=0;picked.forEach(function(x){out+=esc(raw.slice(pos,x.start));out+='<a target="_blank" rel="noopener noreferrer" href="'+esc(x.href)+'">'+esc(raw.slice(x.start,x.end))+'</a>';pos=x.end;});return out+esc(raw.slice(pos));
}

/* V44R15 — data/hora e localidade do cabeçalho da postagem.
   A captura permanece estritamente observacional: nenhum valor é presumido. */
function postHeaderMetadataV44R15(){
  var out={postDateText:'',postDateISO:null,locationText:'',locationURL:''};
  try{
    var type=postTypeFromUrl(location.href),surface=findPostSurface(type)||panelRoot()||document.body;
    var author=findAuthorCandidate(surface),scopes=[];
    function addScope(x){if(x&&scopes.indexOf(x)<0)scopes.push(x);}
    if(author&&author.a){var n=author.a;for(var i=0;i<7&&n&&n!==document.body;i++,n=n.parentElement){var r=n.getBoundingClientRect&&n.getBoundingClientRect();if(r&&r.width>180&&r.height<420)addScope(n);}}
    addScope(surface);
    var dateCandidates=[];
    scopes.forEach(function(scope){
      Array.prototype.slice.call(scope.querySelectorAll('time[datetime],abbr[data-utime],a[aria-label],span[aria-label],a[href*="/posts/"],a[href*="/reel/"]')).forEach(function(el){
        var text=t(el.getAttribute('aria-label')||el.textContent||''),iso=el.getAttribute('datetime')||'',ut=el.getAttribute('data-utime')||'';
        if(ut&&/^\d{9,13}$/.test(ut)){var num=Number(ut);if(String(ut).length===10)num*=1000;var d=new Date(num);if(isFinite(d.getTime()))iso=d.toISOString();}
        var dateLike=/\b(?:January|February|March|April|May|June|July|August|September|October|November|December|janeiro|fevereiro|março|abril|maio|junho|julho|agosto|setembro|outubro|novembro|dezembro)\b/i.test(text)||/\b\d{1,2}[\/.-]\d{1,2}[\/.-]\d{2,4}\b/.test(text)||/^\d+\s*(?:min|h|d|w|m|y|minuto|hora|dia|semana|mês|ano)s?$/i.test(text);
        if(iso||dateLike)dateCandidates.push({text:text,iso:iso,score:(iso?100:0)+(text?20:0)});
      });
    });
    dateCandidates.sort(function(a,b){return b.score-a.score;});
    if(dateCandidates[0]){out.postDateText=dateCandidates[0].text||'';out.postDateISO=dateCandidates[0].iso||null;}
    // Localidade: link textual no mesmo cabeçalho, distinto do autor e dos controles.
    var best=null;
    scopes.forEach(function(scope){
      Array.prototype.slice.call(scope.querySelectorAll('a[href]')).forEach(function(a){
        var tx=t(a.textContent||''),href=String(a.href||'');if(!tx||tx.length<2||tx.length>120)return;
        if(author&&sameProfileIdentity(href,author.href))return;
        if(/comment_id=|\/posts\/|\/reel\/|photo\.php|hashtag|\/friends|\/followers|\/following|\/share|\/likes/i.test(href))return;
        if(/^(Like|Reply|Curtir|Responder|See translation|Ver tradução|Public|Público|Follow|Seguir)$/i.test(tx))return;
        var placeish=/[A-Za-zÀ-ÿ]{2,}.+(?:,|\s-\s).+[A-Za-zÀ-ÿ]{2,}/.test(tx)||/facebook\.com\/(?:pages|places)\//i.test(href);
        if(!placeish)return;var score=(/facebook\.com\/(?:pages|places)\//i.test(href)?100:0)+Math.min(50,tx.length);
        if(!best||score>best.score)best={text:tx,href:href,score:score};
      });
    });
    if(best){out.locationText=best.text;out.locationURL=safeLinkUrl(best.href)||best.href;}
    // Fallback: linha do cabeçalho como "data · local · privacidade".
    if(!out.locationText){
      scopes.some(function(scope){var raw=t(scope.innerText||scope.textContent||'');var parts=raw.split(/\s*[·•]\s*/).map(t).filter(Boolean);if(parts.length<2)return false;for(var i=0;i<parts.length;i++){var x=parts[i];if(x===out.postDateText||/Public|Público|Friends|Amigos/i.test(x))continue;if(/[A-Za-zÀ-ÿ]{2,}.+(?:,|\s-\s).+[A-Za-zÀ-ÿ]{2,}/.test(x)){out.locationText=x;return true;}}return false;});
    }
  }catch(_){}
  return out;
}

function collectMeta() {
  try {
    var panel = panelRoot(), qa = U.qa, q1 = U.q1, vis = U.vis, T = U.T;

    function decodeDeep(s) {
      var out = String(s || '');
      for (var i = 0; i < 5; i++) {
        out = out
          .replace(/\\\//g, '/')
          .replace(/\\u002F/g, '/')
          .replace(/\\u003A/g, ':')
          .replace(/\\u0026/g, '&')
          .replace(/\\u003D/g, '=')
          .replace(/\\u003F/g, '?')
          .replace(/&amp;/g, '&')
          .replace(/&quot;/g, '"');
        try { out = decodeURIComponent(out); } catch (e) {}
      }
      return out;
    }
    function abs(u) {
      if (!u) return '';
      u = String(u);
      if (u.indexOf('https://') === 0 || u.indexOf('http://') === 0) return u;
      if (u.indexOf('/') === 0) return 'https://www.facebook.com' + u;
      return u;
    }
    function cleanFB(u) {
      u = decodeDeep(abs(u || ''));
      if (!u) return '';
      var m;
      m = u.match(/https?:\/\/(?:www\.)?facebook\.com\/reel\/(\d{5,})/i);
      if (m && m[1]) return 'https://www.facebook.com/reel/' + m[1];
      m = u.match(/https?:\/\/(?:www\.)?facebook\.com\/[^\s"'<>]+\/posts\/(pfbid[\w-]+)/i);
      if (m && m[1]) return u.split('?')[0];
      if (/facebook\.com\/photo\.php\?fbid=\d+/i.test(u)) return u.split('&__')[0].replace(/&amp;/g,'&');
      if (/facebook\.com\/(?:watch\/\?v=|[^\s"'<>]+\/videos\/\d+)/i.test(u)) return u.split('&__')[0].replace(/&amp;/g,'&');
      return '';
    }
    function scoreURL(u) {
      if (!u) return -999;
      if (/\/reel\/\d{5,}/i.test(u)) return 100;
      if (/\/posts\/pfbid/i.test(u)) return 90;
      if (/photo\.php\?fbid=/i.test(u)) return 80;
      if (/\/videos\/\d+|watch\/\?v=\d+/i.test(u)) return 70;
      if (/\/reel\/\?s=tab/i.test(u)) return -1000;
      return 0;
    }
    function currentPfbid() {
      var m = location.href.match(/\/posts\/(pfbid[\w-]+)/i);
      return m && m[1] ? m[1] : '';
    }
    function currentReelId() {
      var m = location.href.match(/\/reel\/(\d{5,})/i);
      return m && m[1] ? m[1] : '';
    }

    var pid = currentPfbid();
    var rid = currentReelId();
    var postURL = '';
    if (rid) postURL = 'https://www.facebook.com/reel/' + rid;
    else if (pid) postURL = cleanFB(location.href) || location.href.split('?')[0];
    else postURL = cleanFB(location.href) || location.href;

    try {
      var ogu = document.querySelector('meta[property="og:url"], link[rel="canonical"]');
      var ogc = ogu && (ogu.getAttribute('content') || ogu.getAttribute('href'));
      var cu = cleanFB(ogc);
      if (scoreURL(cu) > scoreURL(postURL)) postURL = cu;
    } catch (e) {}

    try {
      var rawHtml = document.documentElement.outerHTML || document.documentElement.innerHTML || '';
      var txt = decodeDeep(rawHtml);
      var cands = [], re, m;
      re = /https?:\/\/(?:www\.)?facebook\.com\/reel\/(\d{5,})/gi;
      while ((m = re.exec(txt)) !== null) cands.push('https://www.facebook.com/reel/' + m[1]);
      re = /\/reel\/(\d{5,})/gi;
      while ((m = re.exec(txt)) !== null) cands.push('https://www.facebook.com/reel/' + m[1]);
      re = /https?:\/\/(?:www\.)?facebook\.com\/[^\s"'<>]+\/posts\/pfbid[\w-]+/gi;
      while ((m = re.exec(txt)) !== null) cands.push(cleanFB(m[0]));
      re = /https?:\/\/(?:www\.)?facebook\.com\/photo\.php\?fbid=\d+[^\s"'<>]*/gi;
      while ((m = re.exec(txt)) !== null) cands.push(cleanFB(m[0]));
      for (var ci = 0; ci < cands.length; ci++) {
        var cc = cleanFB(cands[ci]);
        if (pid && cc.indexOf('/posts/' + pid) === -1 && !/photo\.php\?fbid=/i.test(cc)) continue;
        if (scoreURL(cc) > scoreURL(postURL)) postURL = cc;
      }
    } catch (e) {}

    try {
      var linksForURL = qa('a[href*="/posts/"], a[href*="/videos/"], a[href*="/photo.php"], a[href*="/reel/"], a[href*="watch/?v="]', panel);
      for (var li = 0; li < linksForURL.length; li++) {
        if (!vis(linksForURL[li])) continue;
        var lu = cleanFB(linksForURL[li].href || linksForURL[li].getAttribute('href') || '');
        if (pid && lu.indexOf('/posts/' + pid) === -1 && !/photo\.php\?fbid=/i.test(lu)) continue;
        if (scoreURL(lu) > scoreURL(postURL)) postURL = lu;
      }
    } catch (e) {}

    function findPostRootForMeta() {
      if (!pid) return panel;
      var nodes = qa('div[role="article"], div, main', document.body);
      var best = null, bestScore = -9999;
      for (var i = 0; i < nodes.length; i++) {
        var el = nodes[i];
        if (!vis(el)) continue;
        var r = el.getBoundingClientRect();
        if (r.width < 300 || r.height < 100) continue;
        var text = T(el.innerText || el.textContent || '');
        var links = qa('a[href]', el);
        var hasPost = false, hasAuthor = false, hasComment = false;
        for (var j = 0; j < links.length; j++) {
          var tx = T(links[j].innerText || links[j].textContent || '');
          var href = links[j].href || '';
          if (href.indexOf('/posts/' + pid) !== -1) hasPost = true;
          if (tx && href && href.indexOf('/posts/' + pid) === -1 && /facebook\.com\/[^\/\?\#]+/i.test(href) && !/comment_id=|photo\.php|\/stories\/|\/reel\//i.test(href)) hasAuthor = true;
        }
        hasComment = /All comments|Todos os comentários|Most relevant|Mais relevantes|Comment by|Reply by|Curtir|Like|Reply|Responder/i.test(text);
        var score = (hasPost ? 100 : 0) + (hasAuthor ? 40 : 0) + (hasComment ? 20 : 0);
        if (/Sponsored|Patrocinado|Ads Manager|Marketplace|Contacts|Meta AI/i.test(text)) score -= 50;
        score -= Math.min(80, Math.round((r.width * r.height) / 100000));
        if (score > bestScore) { bestScore = score; best = el; }
      }
      return best || panel;
    }

    var metaRoot = findPostRootForMeta();

    function firstCommentTop(root) {
      var arts = qa('div[role="article"]', root).map(function (el) {
        var rr = el.getBoundingClientRect();
        return { top: Math.round(rr.top), text: T(el.innerText || el.textContent || ''), aria: T(el.getAttribute('aria-label') || '') };
      }).filter(function (x) {
        return /^(Comment|Reply) by /i.test(x.aria) || /\b(Like|Reply|Curtir|Responder)\b/i.test(x.text);
      }).sort(function (a,b) { return a.top - b.top; });
      return arts[0] ? arts[0].top - 8 : Infinity;
    }

    var author = '', authorURL = '';
    if (pid) {
      var authorLinks = qa('a[role="link"], strong a, h2 a, h3 a', metaRoot);
      for (var ai = 0; ai < authorLinks.length; ai++) {
        var al = authorLinks[ai];
        var at = T(al.innerText || al.textContent || '');
        var ah = al.href || '';
        if (!at || !ah) continue;
        if (/comment_id=|^\d+$|^4y$|tenor|giphy|photos from|snop|s\s*n\s*o\s*p|facebook|see more|ver mais/i.test(at + ' ' + ah)) continue;
        author = at; authorURL = ah; break;
      }
      // PATCH v5: fallback robusto para post/foto quando o cabeçalho sai do metaRoot após o scroll.
      if (!author) {
        try {
          var slugM = (postURL || location.href || '').match(/facebook\.com\/([^\/\?\#]+)\/posts\/pfbid/i);
          var slug = slugM && slugM[1] ? slugM[1] : '';
          if (slug && !/^(reel|watch|photo\.php)$/i.test(slug)) {
            var allAuthorLinks = qa('a[href]', document.body);
            for (var afi = 0; afi < allAuthorLinks.length; afi++) {
              var fa = allAuthorLinks[afi];
              var ft = T(fa.innerText || fa.textContent || '');
              var fh = fa.href || '';
              if (!ft || !fh) continue;
              if (fh.indexOf('facebook.com/' + slug) === -1) continue;
              if (/\/posts\/|comment_id=|\/stories\/|photo\.php|^\d+$|^4y$|tenor|giphy|photos from|snop|s\s*n\s*o\s*p|facebook|see more|ver mais/i.test(ft + ' ' + fh)) continue;
              author = ft; authorURL = fh; break;
            }
          }
        } catch (e) {}
      }
    } else {
      var cand = U.first(qa('h2 a[role="link"], h3 a[role="link"], a[role="link"][href*="/people/"], strong a[role="link"]', panel), vis) ||
        U.first(qa('a[role="link"]', panel), function (el) { return vis(el) && T(el.textContent).length > 1; });
      if (cand) { author = T(cand.textContent); authorURL = cand.href || ''; }
    }

    var caption = '';
    if (pid) {
      var lim = firstCommentTop(metaRoot);
      var nodes = qa('div[dir="auto"], span[dir="auto"]', metaRoot).map(function (el, idx) {
        var rr = el.getBoundingClientRect();
        return { text: T(el.innerText || el.textContent || ''), top: Math.round(rr.top), left: Math.round(rr.left), w: Math.round(rr.width), h: Math.round(rr.height) };
      }).filter(function (x) {
        return x.top < lim && x.text.length > 25 &&
          !fbIsScrambledMetaNoise(x.text) &&
          !/\b(?:\d+ others?|Photos from|See original|Rate this translation|No photo description)\b/i.test(x.text) &&
          !/Like|Reply|Curtir|Responder|comment|comentário/i.test(x.text) &&
          !/s\s*n\s*o\s*p|snopSrd|Sponsored/i.test(x.text) &&
          !/^[A-Za-z0-9]{16,}$/.test(x.text);
      }).sort(function (a,b) { return a.top - b.top || b.text.length - a.text.length; });
      var parts = [];
      for (var ni = 0; ni < nodes.length; ni++) {
        var t = fbStripScrambledMetaNoise(nodes[ni].text).replace(/\s*See more\s*/gi, '').trim();
        if (!t) continue;
        var inside = false;
        for (var pi = 0; pi < parts.length; pi++) {
          if (parts[pi].indexOf(t) !== -1 || t.indexOf(parts[pi]) !== -1) { inside = true; break; }
        }
        if (!inside) parts.push(t);
      }
      caption = parts.join(' ').trim();
    }
    if (!caption) {
      var c1 = q1('[data-ad-preview="message"]', panel); if (c1) caption = T(c1.textContent);
    }
    if (!caption) {
      var c2 = U.first(qa('div[dir="auto"], span[dir="auto"], p', panel),
        function (el) { return vis(el) && T(el.textContent).length > 40; });
      if (c2) caption = T(c2.textContent);
    }
    if (!caption) {
      var og = q1('meta[property="og:description"], meta[name="description"], meta[property="twitter:description"]');
      caption = (og && og.getAttribute('content')) || '';
    }


    // PATCH v9-photo: metadados específicos do viewer photo.php, sem alterar post/reel.
    try {
      if (isPhotoContext()) {
        if (!postURL || !/photo/i.test(postURL)) postURL = cleanFB(location.href) || location.href;
        if (!author || /Verified account/i.test(author)) {
          var _photoLinks = qa('a[href]', document.body);
          for (var _pa = 0; _pa < _photoLinks.length; _pa++) {
            var _pl = _photoLinks[_pa];
            if (!vis(_pl)) continue;
            var _pt = T(_pl.innerText || _pl.textContent || '');
            var _ph = _pl.href || '';
            if (!_pt || !_ph) continue;
            if (/comment_id=|stories|followers|following|photos|photo\.php|hashtag|facebook\.com\/$|reel\/\?s=tab/i.test(_ph)) continue;
            if (/Facebook|Home|Reels|Friends|Marketplace|Gaming|See all|Unread|Verified account/i.test(_pt)) continue;
            author = _pt.replace(/\s*Verified account\s*/i, '').trim();
            authorURL = _ph.split('?')[0];
            break;
          }
        }
        if (true) {
          var _firstTop = Infinity;
          var _arts = qa('div[role="article"]', document.body);
          for (var _ai2 = 0; _ai2 < _arts.length; _ai2++) {
            var _atxt = T(_arts[_ai2].innerText || _arts[_ai2].textContent || '');
            var _aar = T(_arts[_ai2].getAttribute('aria-label') || '');
            if (/^(Comment|Reply) by /i.test(_aar) || /\b(Like|Reply|Curtir|Responder)\b/i.test(_atxt)) {
              var _rr2 = _arts[_ai2].getBoundingClientRect();
              if (_rr2.top < _firstTop) _firstTop = Math.round(_rr2.top);
            }
          }
          var _nodes2 = qa('div[dir="auto"], span[dir="auto"], p', document.body).map(function(el){
            var _r = el.getBoundingClientRect();
            return { text: T(el.innerText || el.textContent || ''), top: Math.round(_r.top), left: Math.round(_r.left), w: Math.round(_r.width), h: Math.round(_r.height) };
          }).filter(function(x){
            return x.top < _firstTop - 8 && x.text.length > 35 &&
              !fbIsScrambledMetaNoise(x.text) &&
              !/Facebook Menu|Number of unread|Verified account|Shared with Public|See all|followers|following|Photos|Home|Reels|Friends|Marketplace|Gaming/i.test(x.text) &&
              !/p\s*n\s*r\s*o\s*o\s*S|pnrooS|^[A-Za-z0-9]{16,}$/i.test(x.text);
          }).sort(function(a,b){ return a.top - b.top || b.text.length - a.text.length; });
          var _parts2 = [];
          for (var _ni2 = 0; _ni2 < _nodes2.length; _ni2++) {
            var _tt2 = fbStripScrambledMetaNoise(_nodes2[_ni2].text).replace(/\s*See more\s*/gi, '').trim();
            if (!_tt2) continue;
            var _inside2 = false;
            for (var _pi2 = 0; _pi2 < _parts2.length; _pi2++) {
              if (_parts2[_pi2].indexOf(_tt2) !== -1 || _tt2.indexOf(_parts2[_pi2]) !== -1) { _inside2 = true; break; }
            }
            if (!_inside2) _parts2.push(_tt2);
          }
          if (_parts2.length) { var _newCap2 = _parts2.join(' ').trim(); if (!caption || _newCap2.length > caption.length || /su…|See more/i.test(caption)) caption = _newCap2; }
        }

        // PATCH 29-04-2026 PHOTO-CAPTION-ONLY:
        // aplica seleção estrita apenas no PHOTO, sem alterar POST/REEL.
        caption = fbPhotoExtractBestCaption(caption);
      }
    } catch (e) {}

    // PATCH v8: fallback generico de autor para post/foto, SEM mexer em Reel/video.
    // Motivo: em alguns posts o root mantem legenda/contagens, mas o link textual do perfil desaparece apos scroll;
    // nesses casos o autor pode ser recuperado do título do modal e/ou do slug da URL.
    try {
      if (pid && postURL && /facebook\.com\/([^\/\?\#]+)\/posts\/pfbid/i.test(postURL)) {
        var _am = postURL.match(/facebook\.com\/([^\/\?\#]+)\/posts\/pfbid/i);
        var _slug = _am && _am[1] ? decodeURIComponent(_am[1]) : '';
        if (_slug && !/^(reel|watch|photo\.php|groups|profile\.php)$/i.test(_slug)) {
          var _modalTitle = '';
          try {
            var _titleNodes = qa('[role="dialog"] h1, [role="dialog"] h2, [role="dialog"] [aria-level="1"], [role="dialog"] [aria-level="2"]', document.body);
            for (var _ti = 0; _ti < _titleNodes.length; _ti++) {
              var _tt = T(_titleNodes[_ti].innerText || _titleNodes[_ti].textContent || '');
              if (/\bPost\b|Publica/i.test(_tt)) { _modalTitle = _tt; break; }
            }
          } catch (_) {}
          var _titleAuthor = '';
          var _tm = _modalTitle.match(/^(.+?)\s*(?:'s|’s)\s+Post\b/i) || _modalTitle.match(/^Publica(?:ção|cao)\s+de\s+(.+?)$/i);
          if (_tm && _tm[1]) _titleAuthor = T(_tm[1]);
          if (!author) author = _titleAuthor || _slug;
          if (!authorURL) authorURL = 'https://www.facebook.com/' + _slug;
        }
      }
    } catch (e) {}
    var _cleanCaptionV44R16=T(isPhotoContext() ? fbPhotoExtractBestCaption(caption) : fbStripScrambledMetaNoise(caption)),_headerMetaV44R16=postHeaderMetadataV44R16(_cleanCaptionV44R16); return Object.assign({ author: author, authorURL: authorURL, caption: _cleanCaptionV44R16, postURL: postURL },_headerMetaV44R16);
  } catch (_) {
    return { author: '', authorURL: '', caption: '', postURL: location.href };
  }
}

function collectCountsReelByClasses() {
  var outerSelector =
    'span.x193iq5w.xeuugli.x13faqbe.x1vvkbs.x1xmvt09.x1lliihq.x1s928wv.xhkezso.x1gmr53x.x1cpjm7i.x1fgarty.x1943h6x.x4zkp8e.x3x7a5m.x1nxh6w3.x1sibtaa.x1s688f.x17z8epw';

  var innerSelector =
    'span.x1lliihq.x6ikm8r.x10wlt62.x1n2onr6.xlyipyv.xuxw1ft.x1j85h84';

  function parseNum(str) { return parseFacebookCount(str); }

  var outers = Array.prototype.slice.call(document.querySelectorAll(outerSelector));

  var candidatos = outers.map(function (el, idx) {
    var inner = el.querySelector(innerSelector);
    var txt = inner ? inner.textContent.trim() : el.textContent.trim();
    var rect = el.getBoundingClientRect();
    return {
      index: idx,
      text: txt,
      num: parseNum(txt),
      top: rect.top,
      left: rect.left
    };
  });

  console.log('=== REELS – candidatos por classes EXATAS ===');
  console.log('Candidatos encontrados:', candidatos);

  var like = null, comment = null, share = null;

  if (candidatos.length >= 3) {
    like = candidatos[0].num;
    comment = candidatos[1].num;
    share = candidatos[2].num;
  }

  return { like: like, comment: comment, share: share, candidatos: candidatos };
}

/* ===== snapshot global das contagens de Reel (antes de abrir comentários) ===== */
var __REEL_COUNTS_SNAPSHOT__ = null;
/* ===== snapshot global das contagens de POST/PFBID antes da expansão/scroll ===== */
var __POST_COUNTS_SNAPSHOT__ = null;
/* V44R19: fotografia dos metadados antes de qualquer scroll/expansão. */
var __POST_METADATA_SNAPSHOT_V44R19__ = null;
var __POST_METRICS_SNAPSHOT_V44R19__ = null;
/* V44R21R9: snapshots imutáveis capturados antes de qualquer diálogo/scroll. */
var __POST_METADATA_SNAPSHOT_V44R21R9__ = null;
var __POST_MEDIA_SNAPSHOT_V44R21R9__ = null;
/* ===== alvo declarado de comentários observado antes do scroll ===== */
var __DECLARED_COMMENT_TARGET_V44R3__ = 0;

/* V44R18R1 — correção cirúrgica de metadado para foto/post.
   O Facebook rotula o contador fotográfico como "See who reacted to this" /
   "Veja quem reagiu", em vez de "reactions". Não altera scroll, coleta,
   comentários, vídeos, Reels, relações, exportação ou layout. */
function isPostReactionMetricLabelV44R18R1(label) {
  return /\b(?:Like|Likes|Curtir|Curtidas?|reactions?|reacted|people\s+reacted|rea[cç][oõ]es?|reagiu|reagiram)\b/i.test(String(label || ''));
}

function numericControlValueV44R19(el){
  function parseExact(x){x=t(x);return /^\d+(?:[.,]\d+)?\s*(?:[KkMmBb]|mil|mi|bi)?$/i.test(x)?parseFacebookCount(x):null;}
  var direct=parseExact(el&&el.innerText||el&&el.textContent||'');if(direct!=null)return direct;
  try{var nodes=Array.prototype.slice.call(el.querySelectorAll('span,div')).slice(0,80),vals=[];nodes.forEach(function(n){var v=parseExact(n.innerText||n.textContent||'');if(v!=null)vals.push(v);});if(vals.length)return Math.max.apply(Math,vals);}catch(_){}
  var lab=t((el&&el.getAttribute&&el.getAttribute('aria-label')||'')+' '+(el&&el.getAttribute&&el.getAttribute('title')||''));return parseFacebookCount(lab);
}

/* V44R21R16 — métricas estritamente vinculadas ao diálogo POST ativo. */
function postMetricLabelKindV44R21R16(label){
  label=t(label);
  if(/(?:See who reacted|Veja quem reagiu|All reactions|Todas as rea[cç][oõ]es|\bLikes?\b|\bCurtir\b|\bCurtidas?\b)/i.test(label))return 'like';
  if(/(?:Leave a comment|\bComments?\b|\bComentar\b|\bComent[aá]rios?\b)/i.test(label))return 'comment';
  if(/(?:\bShares?\b|\bCompartilhar\b|\bCompartilhamentos?\b|send this to friends|post it on your profile)/i.test(label))return 'share';
  return '';
}
function postExactNumericTextV44R21R16(el){
  var x=t(el&&((el.innerText||el.textContent)||'')||'');
  if(!/^\d+(?:[.,]\d+)?\s*(?:[KkMmBb]|mil|mi|bi)?$/i.test(x))return null;
  var n=Number(parseFacebookCount(x));return isFinite(n)?n:null;
}
function collectPostTargetMetricsV44R21R16(){
  var out={like:null,comment:null,share:null,view:null,evidence:{},surfaceBound:false},surface=findPostTargetDialogV44R21R16();
  if(!surface)return out;out.surfaceBound=true;
  var sr;try{sr=surface.getBoundingClientRect();}catch(_){return out;}
  var numeric=[],seen={};
  try{
    var nodes=Array.prototype.slice.call(surface.querySelectorAll('span,a,button,[role="button"],div')).slice(0,7000);
    nodes.forEach(function(el){
      if(!visible(el))return;var value=postExactNumericTextV44R21R16(el);if(value==null)return;
      try{
        var r=el.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2;
        if(r.width<2||r.height<2||r.width>150||r.height>80||cx<sr.left-2||cx>sr.right+2||cy<sr.top-2||cy>sr.bottom+2)return;
        var label=t((el.getAttribute&&el.getAttribute('aria-label')||'')+' '+(el.getAttribute&&el.getAttribute('title')||'')),cur=el;
        for(var i=0;i<6&&cur&&cur!==surface;i++,cur=cur.parentElement)label+=' '+t((cur.getAttribute&&cur.getAttribute('aria-label')||'')+' '+(cur.getAttribute&&cur.getAttribute('title')||''));
        label=t(label);var kind=postMetricLabelKindV44R21R16(label),key=Math.round(r.left/3)+'|'+Math.round(r.top/3)+'|'+value;
        var item={el:el,value:value,left:r.left,top:r.top,width:r.width,height:r.height,area:r.width*r.height,label:label,kind:kind};
        if(!seen[key]||item.area<seen[key].area)seen[key]=item;
      }catch(_){}
    });
  }catch(_){}
  Object.keys(seen).forEach(function(k){numeric.push(seen[k]);});
  numeric.sort(function(a,b){return a.top-b.top||a.left-b.left||a.area-b.area;});
  numeric.forEach(function(x){if(x.kind&&out[x.kind]==null){out[x.kind]=x.value;out.evidence[x.kind]={label:x.label,value:x.value,source:'post_target_dialog_labeled_metric'};}});
  if(out.like==null||out.comment==null||out.share==null){
    var groups=[];
    numeric.forEach(function(x){
      var g=null;for(var i=0;i<groups.length;i++){if(Math.abs(groups[i].top-x.top)<=10){g=groups[i];break;}}
      if(!g){g={top:x.top,items:[]};groups.push(g);}if(!g.items.some(function(y){return Math.abs(y.left-x.left)<=5&&y.value===x.value;}))g.items.push(x);
    });
    var best=null,bestScore=-99999;
    groups.forEach(function(g){
      g.items.sort(function(a,b){return a.left-b.left;});
      if(g.items.length<3)return;
      for(var i=0;i<=g.items.length-3;i++){
        var tri=g.items.slice(i,i+3),spread=tri[2].left-tri[0].left;
        if(spread<90||spread>900)return;
        var score=1200-(Math.abs((g.top-sr.top)-sr.height*.67)*.25);
        tri.forEach(function(x){if(x.kind)score+=500;});
        if(score>bestScore){bestScore=score;best=tri;}
      }
    });
    if(best){
      if(out.like==null){out.like=best[0].value;out.evidence.like={label:'horizontal metric trio',value:best[0].value,source:'post_target_dialog_visual_trio'};}
      if(out.comment==null){out.comment=best[1].value;out.evidence.comment={label:'horizontal metric trio',value:best[1].value,source:'post_target_dialog_visual_trio'};}
      if(out.share==null){out.share=best[2].value;out.evidence.share={label:'horizontal metric trio',value:best[2].value,source:'post_target_dialog_visual_trio'};}
    }
  }
  return out;
}
function postDeclaredCommentTargetV44R21R16(panel,snapshot){
  var exact=collectPostTargetMetricsV44R21R16();
  if(exact&&Number(exact.comment||0)>0)return Number(exact.comment);
  var local=Number(captureDeclaredCommentTargetV44R3(panel||findPostTargetDialogV44R21R16()||panelRoot())||0);
  if(local>0)return local;
  return Number(snapshot&&snapshot.comment||0);
}

function collectPostSurfaceMetricsV44R19(){
  var out={like:null,comment:null,share:null,view:null,evidence:{}};if(isReelContext())return out;
  try{var type=postTypeFromUrl(location.href),surface=findPostSurface(type)||panelRoot()||document.body;
    var controls=Array.prototype.slice.call(surface.querySelectorAll('[aria-label],[title],[role="button"],button')).slice(0,5000);
    controls.forEach(function(el){if(!visible(el))return;var label=t((el.getAttribute&&el.getAttribute('aria-label')||'')+' '+(el.getAttribute&&el.getAttribute('title')||'')),value=numericControlValueV44R19(el);if(value==null)return;
      function set(k){if(out[k]==null||value>out[k]){out[k]=value;out.evidence[k]={label:label,value:value,source:'post_surface_control'};}}
      if(/^(?:Like|Curtir|See who reacted to this|Veja quem reagiu(?: a isto)?|All reactions|Todas as rea[cç][oõ]es?)(?:\b|:|$)/i.test(label))set('like');
      if(/^(?:Leave a comment|Comment|Comments?|Comentar|Coment[aá]rios?)(?:\b|:|$)/i.test(label))set('comment');
      if(/^(?:Share|Shares?|Compartilhar|Compartilhamentos?)(?:\b|:|$)/i.test(label))set('share');
      if(/^(?:Views?|Visualiza[cç][oõ]es)(?:\b|:|$)/i.test(label))set('view');
    });
  }catch(_){}
  return out;
}

/* === contagens gerais (posts + reels) === */
function collectCounts() {
  var qa = U.qa, T = U.T, vis = U.vis;
  var out = { like: null, comment: null, share: null, view: null };

  var lockLike = false, lockComment = false, lockShare = false;

  try {
    if (isReelContext()) {
      if (__REEL_COUNTS_SNAPSHOT__) {
        if (__REEL_COUNTS_SNAPSHOT__.like != null)   { out.like    = __REEL_COUNTS_SNAPSHOT__.like;    lockLike    = true; }
        if (__REEL_COUNTS_SNAPSHOT__.comment != null){ out.comment = __REEL_COUNTS_SNAPSHOT__.comment; lockComment = true; }
        if (__REEL_COUNTS_SNAPSHOT__.share != null)  { out.share   = __REEL_COUNTS_SNAPSHOT__.share;   lockShare   = true; }
      } else {
        var rc = collectCountsReelByClasses();
        if (rc) {
          if (rc.like != null)   { out.like   = rc.like;   lockLike   = true; }
          if (rc.comment != null){ out.comment= rc.comment;lockComment= true; }
          if (rc.share != null)  { out.share  = rc.share;  lockShare  = true; }
        }
      }
    }

    function num(s) { return parseFacebookCount(s); }
    var rxReactEn = /all reactions/i;
    var rxReactPt = /todas as rea[cç][oõ]es?/i;
    var rxCom = /\bcomments?\b|\bcoment[aá]rios?\b/i;
    var rxShare = /\bshares?\b|\bcompartilhamentos?\b/i;

    var btns = qa('div[role="button"]', document.body);
    U.each(btns, function (el) {
      if (!vis(el)) return;
      var txt = T(el.textContent || '');
      var v = num(txt);
      if (v == null) return;
      if (!lockLike && (rxReactEn.test(txt) || rxReactPt.test(txt))) {
        if (out.like == null || v > out.like) out.like = v;
      }
      if (!lockComment && rxCom.test(txt)) {
        if (out.comment == null || v > out.comment) out.comment = v;
      }
      if (!lockShare && rxShare.test(txt)) {
        if (out.share == null || v > out.share) out.share = v;
      }
    });

    var els = qa('[aria-label], [title], span, div, a, button').slice(0, 4000);
    var R_VIEW = /visualiza[cç][oõ]es|views?/i,
      R_NOW = /(assistindo|vendo)\s+agora|watching\s+now|ao\s+vivo/i;
    function nView(s) { return parseFacebookCount(s); }
    var bestView = null;
    U.each(els, function (el) {
      if (!vis(el)) return;
      var lab = ((el.getAttribute && el.getAttribute('aria-label')) || '') + ' ' +
        ((el.getAttribute && el.getAttribute('title')) || '');
      var text = T(lab + ' ' + (el.textContent || ''));
      var v = nView(text);
      if (v == null) return;
      if (R_VIEW.test(text) && !R_NOW.test(text)) {
        if (bestView == null || v > bestView) bestView = v;
      }
    });
    out.view = bestView;

    // PATCH v5: contagens de post/foto não devem usar "view" incidental de mídia.
    // Para /posts/pfbid, extrai somente números do cabeçalho do post: Like/Comment/Share.
    (function patchPostCounts() {
      try {
        if (isReelContext()) return;
        var pm = String(location.href || '').match(/\/posts\/(pfbid[\w-]+)/i);
        if (!pm || !pm[1]) return;
        var pidLocal = pm[1];

        function findPostRootForCounts() {
          var nodes = qa('div[role="article"], div, main', document.body);
          var best = null, bestScore = -9999;
          for (var i = 0; i < nodes.length; i++) {
            var el = nodes[i];
            if (!vis(el)) continue;
            var r = el.getBoundingClientRect();
            if (r.width < 300 || r.height < 100) continue;
            var text = T(el.innerText || el.textContent || '');
            var links = qa('a[href]', el);
            var hasPost = false, hasAuthor = false, hasComment = false;
            for (var j = 0; j < links.length; j++) {
              var tx = T(links[j].innerText || links[j].textContent || '');
              var href = links[j].href || '';
              if (href.indexOf('/posts/' + pidLocal) !== -1) hasPost = true;
              if (tx && href && href.indexOf('/posts/' + pidLocal) === -1 && /facebook\.com\/[^\/\?\#]+/i.test(href) && !/comment_id=|photo\.php|\/stories\//i.test(href)) hasAuthor = true;
            }
            hasComment = /All comments|Todos os comentários|Most relevant|Mais relevantes|Comment by|Reply by|Curtir|Like|Reply|Responder/i.test(text);
            var score = (hasPost ? 100 : 0) + (hasAuthor ? 40 : 0) + (hasComment ? 20 : 0);
            if (/Sponsored|Patrocinado|Ads Manager|Marketplace|Contacts|Meta AI/i.test(text)) score -= 50;
            score -= Math.min(80, Math.round((r.width * r.height) / 100000));
            if (score > bestScore) { bestScore = score; best = el; }
          }
          return best || document.body;
        }

        function firstCommentTopForCounts(root) {
          var arr = qa('div[role="article"]', root).map(function (el) {
            var rr = el.getBoundingClientRect();
            return { top: Math.round(rr.top), text: T(el.innerText || el.textContent || ''), aria: T(el.getAttribute('aria-label') || '') };
          }).filter(function (x) {
            return /^(Comment|Reply) by /i.test(x.aria) || /\b(Like|Reply|Curtir|Responder)\b/i.test(x.text);
          }).sort(function (a,b) { return a.top - b.top; });
          return arr[0] ? arr[0].top - 8 : Infinity;
        }

        var rootC = findPostRootForCounts();
        var limTop = firstCommentTopForCounts(rootC);
        var cc = { like: null, comment: null, share: null };
        var cand = qa('[aria-label], [role="button"], button, span, a, div', rootC).slice(0, 2500);
        U.each(cand, function (el) {
          try {
            if (!vis(el)) return;
            var rr = el.getBoundingClientRect();
            if (Math.round(rr.top) >= limTop) return;
            if (rr.width > 260 || rr.height > 80) return;
            var tx = T(el.innerText || el.textContent || '');
            var ar = T((el.getAttribute && el.getAttribute('aria-label')) || '');
            var ti = T((el.getAttribute && el.getAttribute('title')) || '');
            var label = ar + ' ' + ti;
            var val = num(tx) != null ? num(tx) : num(label);
            if (val == null) return;
            if (/^\d+(?:[\.,]\d+)?\s*(?:[KkMmBb]|mil|mi|bi)?$/i.test(tx) || /^\d+(?:[\.,]\d+)?\s*(?:[KkMmBb]|mil|mi|bi)?$/i.test(label)) {
              if (isPostReactionMetricLabelV44R18R1(label) && cc.like == null) cc.like = val;
              if (/\b(Comment|Coment[aá]rios?)\b/i.test(label) && cc.comment == null) cc.comment = val;
              if (/(\bShare\b|\bCompartilhamentos?\b|send this to friends|post it on your profile)/i.test(label) && cc.share == null) cc.share = val;
            }
          } catch (e) {}
        });
        // PATCH v7: fallback visual estritamente para /posts/pfbid; captura trio horizontal do cabeçalho (ex.: 33/8/6).
        if (cc.share == null || cc.like == null || cc.comment == null) {
          try {
            var nums2 = [];
            U.each(cand, function (el) {
              if (!vis(el)) return;
              var rr2 = el.getBoundingClientRect();
              if (Math.round(rr2.top) >= limTop) return;
              if (rr2.width > 120 || rr2.height > 60) return;
              var tx2 = T(el.innerText || el.textContent || '');
              if (!/^\d+(?:[\.,]\d+)?\s*(?:[KkMmBb]|mil|mi|bi)?$/i.test(tx2)) return;
              var vv2 = num(tx2);
              if (vv2 == null) return;
              nums2.push({ val: vv2, top: Math.round(rr2.top), left: Math.round(rr2.left) });
            });
            nums2 = nums2.sort(function (a,b) { return a.top - b.top || a.left - b.left; });
            for (var n2 = 0; n2 < nums2.length - 2; n2++) {
              var a2 = nums2[n2], b2 = nums2[n2+1], c2 = nums2[n2+2];
              if (Math.abs(a2.top - b2.top) <= 8 && Math.abs(b2.top - c2.top) <= 8 && a2.left < b2.left && b2.left < c2.left) {
                if (cc.like == null) cc.like = a2.val;
                if (cc.comment == null) cc.comment = b2.val;
                if (cc.share == null) cc.share = c2.val;
                break;
              }
            }
          } catch (e7) {}
        }
        if (cc.like != null) out.like = cc.like;
        if (cc.comment != null) out.comment = cc.comment;
        if (cc.share != null) out.share = cc.share;
        out.view = null;
      } catch (e) { }
    })();

    // PATCH v10-photo: contagens específicas do viewer photo.php.
    // Usa somente o trio visual horizontal do cabeçalho (reações / comentários / compartilhamentos)
    // e remove "view" incidental gerado por outros elementos do Facebook.
    (function patchPhotoCounts() {
      try {
        if (!isPhotoContext()) return;
        var pc = { like: null, comment: null, share: null };
        var nums = [];
        var els2 = qa('[aria-label], [role="button"], button, span, a, div', document.body).slice(0, 5000);
        U.each(els2, function (el) {
          try {
            if (!vis(el)) return;
            var rr = el.getBoundingClientRect();
            if (rr.width > 180 || rr.height > 70) return;
            var tx = T(el.innerText || el.textContent || '');
            var ar = T((el.getAttribute && el.getAttribute('aria-label')) || '');
            var ti = T((el.getAttribute && el.getAttribute('title')) || '');
            if (!/^\d+(?:[\.,]\d+)?\s*(?:[KkMmBb]|mil|mi|bi)?$/i.test(tx)) return;
            var vv = num(tx);
            if (vv == null) return;
            nums.push({ val: vv, top: Math.round(rr.top), left: Math.round(rr.left), aria: ar, title: ti });
            var label = ar + ' ' + ti;
            if (isPostReactionMetricLabelV44R18R1(label) && pc.like == null) pc.like = vv;
            if (/\b(Comment|Leave a comment|Coment[aá]rios?)\b/i.test(label) && pc.comment == null) pc.comment = vv;
            if (/(\bShare\b|\bCompartilhamentos?\b|send this to friends|post it on your profile)/i.test(label) && pc.share == null) pc.share = vv;
          } catch (_e) {}
        });
        nums = nums.sort(function (a,b) { return a.top - b.top || a.left - b.left; });
        if (pc.like == null || pc.comment == null || pc.share == null) {
          for (var i3 = 0; i3 < nums.length - 2; i3++) {
            var a3 = nums[i3], b3 = nums[i3+1], c3 = nums[i3+2];
            if (Math.abs(a3.top - b3.top) <= 8 && Math.abs(b3.top - c3.top) <= 8 && a3.left < b3.left && b3.left < c3.left) {
              if (pc.like == null) pc.like = a3.val;
              if (pc.comment == null) pc.comment = b3.val;
              if (pc.share == null) pc.share = c3.val;
              break;
            }
          }
        }
        if (pc.like != null) out.like = pc.like;
        if (pc.comment != null) out.comment = pc.comment;
        if (pc.share != null) out.share = pc.share;
        out.view = null;
      } catch (_epc) {}
    })();
  } catch (e) {
    console.warn('Erro em collectCounts:', e);
  }


  /* PATCH POST METADATA SNAPSHOT:
     Para /posts/pfbid, preserva as contagens captadas no topo antes da expansão/scroll.
     Não altera PHOTO nem REEL. Só preenche campos que ficarem nulos ao final. */
  try {
    if (!isReelContext() && /\/posts\/pfbid/i.test(String(location.href || '')) && __POST_COUNTS_SNAPSHOT__) {
      if (out.like == null && __POST_COUNTS_SNAPSHOT__.like != null) out.like = __POST_COUNTS_SNAPSHOT__.like;
      if (out.comment == null && __POST_COUNTS_SNAPSHOT__.comment != null) out.comment = __POST_COUNTS_SNAPSHOT__.comment;
      if (out.share == null && __POST_COUNTS_SNAPSHOT__.share != null) out.share = __POST_COUNTS_SNAPSHOT__.share;
      out.view = null;
    }
  } catch (_postSnapFallback) {}

  /* V44R19: a métrica observada no próprio controle do post prevalece e o
     snapshot anterior ao scroll impede perda do cabeçalho após virtualização. */
  try {
    if (!isReelContext()) {
      var live19=collectPostSurfaceMetricsV44R19(),snap19=__POST_METRICS_SNAPSHOT_V44R19__||{};
      ['like','comment','share','view'].forEach(function(k){var v=live19[k]!=null?live19[k]:snap19[k];if(v!=null)out[k]=v;});
      out._observedEvidence=Object.assign({},snap19.evidence||{},live19.evidence||{});
      if(postTypeFromUrl(location.href)==='POST'){
        var exact16=collectPostTargetMetricsV44R21R16();
        ['like','comment','share'].forEach(function(k){if(exact16[k]!=null)out[k]=exact16[k];});
        out.view=null;out._observedEvidence=Object.assign({},out._observedEvidence||{},exact16.evidence||{});
      }
    }
  } catch (_metrics19) {}

  return out;
}


/* PATCH 29-04-2026 POST-PFBID-METADATA-FINAL-STABLE-ONLY
   Escopo estrito: apenas /posts/pfbid.
   Finalidade: impedir que o formato POST/PFBID exporte contagens nulas quando o Facebook
   remove/oculta o cabeçalho de métricas após expansão e scroll de comentários.
   Não altera PHOTO, REEL, mídia, comentários, replies, avatares, layout ou coleta L1/L2. */
function fbPostPfbidStableContext() {
  return !isReelContext() && /\/posts\/pfbid/i.test(String(location.href || ''));
}
function fbPostPfbidKeyFromUrl(u) {
  var m = String(u || location.href || '').match(/\/posts\/(pfbid[\w-]+)/i);
  return m && m[1] ? m[1] : '';
}
function fbPostApplyMetadataFallbackToPayload(payload) {
  try {
    if (!payload) return payload;
    payload.counts = payload.counts || { like:null, comment:null, share:null, view:null };
    if (/\/posts\/pfbid/i.test(String((payload.meta && payload.meta.postURL) || location.href || '')) &&
        (payload.counts.like == null || payload.counts.comment == null || payload.counts.share == null)) {
      payload.counts._evidenceGap = 'Uma ou mais métricas não estavam observáveis no DOM no momento da coleta; nenhum valor foi presumido ou preenchido.';
    }
  } catch (_) {}
  return payload;
}


function safeExportUrl(value, allowDataImage) {
  var raw = String(value || '').trim();
  if (!raw) return '';
  if (allowDataImage && /^data:image\/(?:png|jpe?g|gif|webp);base64,[a-z0-9+\/=\s]+$/i.test(raw)) return raw;
  try {
    var u = new URL(raw, 'https://www.facebook.com/');
    if (u.protocol === 'http:' || u.protocol === 'https:') return u.href;
  } catch (_) {}
  return '';
}

/* ========= HTML ========= */
/* inclui link de menções e hashtags */
function buildHTML(p) {
  function esc(s) { return String(s || '').replace(/[&<>"']/g, function (m) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]; }); }
  function escA(s) { return esc(s).replace(/"/g, '&quot;'); }
  function reactLine(obj) {
    if (!obj || (!obj.breakdown || !obj.breakdown.length) && !(obj.total != null)) return '';
    var segs = [];
    if (obj.breakdown && obj.breakdown.length) {
      for (var i = 0; i < obj.breakdown.length; i++) {
        var r = obj.breakdown[i];
        var emojiHtml = '';
        if (r.emoji && r.emoji.indexOf('<img') === 0) {
          var em = String(r.emoji).match(/src="([^"]+)"/i);
          var eu = em && em[1] ? safeExportUrl(em[1], true) : '';
          emojiHtml = eu ? ('<img src="' + escA(eu) + '" width="14" height="14" alt="">') : '';
        } else {
          emojiHtml = esc(r.emoji || '') + ' ';
        }
        segs.push(emojiHtml + esc(String(r.count == null ? '' : r.count)));
      }
      if (obj.total != null) { segs.push('(total ' + obj.total + ')'); }
      return ' • ' + segs.join(' ');
    } else {
      return ' • ❤️ ' + String(obj.total);
    }
  }

  function buildAuthorMap(rows) {
    var map = Object.create(null);
    function walk(list) {
      for (var i = 0; i < list.length; i++) {
        var r = list[i];
        if (r && r.author) {
          try { map[r.author] = (r.authorHref && r.authorHref !== '#') ? r.authorHref : map[r.author] || null; } catch(_) {}
        }
        if (r && r.replies && r.replies.length) walk(r.replies);
      }
    }
    if (rows && rows.length) walk(rows);
    return map;
  }
  function escapeForRegex(s) {
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  }
  function linkifyText(text, authorMap) {
    var raw = String(text || '');
    if (!raw) return '';
    var matches = [];
    function add(start, end, label, href, priority) {
      if (start < 0 || end <= start || !href) return;
      matches.push({ start: start, end: end, label: label, href: href, priority: priority || 0 });
    }

    var reHash = /#([A-Za-z0-9_\-çáéíóúàèìòùãõâêîôûÁÉÍÓÚÇÃÕÊÔÛ]+)/gi, mh;
    while ((mh = reHash.exec(raw)) !== null) {
      add(mh.index, mh.index + mh[0].length, mh[0], 'https://www.facebook.com/hashtag/' + encodeURIComponent(mh[1]), 20);
    }
    var reUser = /@([A-Za-z0-9.\-_]+)/g, mu;
    while ((mu = reUser.exec(raw)) !== null) {
      add(mu.index, mu.index + mu[0].length, mu[0], 'https://www.facebook.com/' + encodeURIComponent(mu[1]), 15);
    }

    for (var nm in authorMap) {
      if (!Object.prototype.hasOwnProperty.call(authorMap, nm) || !nm || nm.length < 2) continue;
      var href = safeExportUrl(authorMap[nm], false);
      if (!href) continue;
      var from = 0, at;
      while ((at = raw.indexOf(nm, from)) !== -1) {
        var before = at > 0 ? raw.charAt(at - 1) : '';
        var after = at + nm.length < raw.length ? raw.charAt(at + nm.length) : '';
        var wordish = /[A-Za-z0-9_\-\u00C0-\u017F]/;
        if ((!before || !wordish.test(before)) && (!after || !wordish.test(after))) add(at, at + nm.length, nm, href, 30);
        from = at + Math.max(1, nm.length);
      }
    }

    matches.sort(function (a, b) {
      return a.start - b.start || (b.end - b.start) - (a.end - a.start) || b.priority - a.priority;
    });
    var chosen = [], cursor = -1;
    for (var i = 0; i < matches.length; i++) {
      if (matches[i].start < cursor) continue;
      chosen.push(matches[i]);
      cursor = matches[i].end;
    }

    var out = '', pos = 0;
    for (var j = 0; j < chosen.length; j++) {
      var c = chosen[j];
      out += esc(raw.slice(pos, c.start));
      out += '<a target="_blank" rel="noopener noreferrer" href="' + escA(c.href) + '">' + esc(raw.slice(c.start, c.end)) + '</a>';
      pos = c.end;
    }
    out += esc(raw.slice(pos));
    return out;
  }

  var created = new Date().toLocaleString('pt-BR', {
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
  });
  var head = '<!DOCTYPE html><html lang="pt-br"><head><meta charset="UTF-8"><meta http-equiv="Content-Security-Policy" content="default-src &#39;none&#39;; img-src https: data:; media-src https:; style-src &#39;unsafe-inline&#39;; base-uri &#39;none&#39;; form-action &#39;none&#39;; object-src &#39;none&#39;"><title>Comentários Facebook — Export</title><meta name="viewport" content="width=device-width, initial-scale=1">\
  <style>body{font-family:system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,sans-serif;background:#f6f7f9;color:#111;padding:20px}h1{margin:0 0 8px}.warn{background:#fff3cd;color:#7a5b00;border:1px solid #ffe69c;padding:8px 10px;border-radius:8px;margin:8px 0}.metaTop{margin:8px 0 14px;color:#333}.item{margin:12px 0;padding:12px;background:#fff;border-radius:10px;box-shadow:0 1px 2px rgba(0,0,0,.05)}.head{display:flex;gap:10px;align-items:flex-start;margin-bottom:6px}.avatar{width:36px;height:36px;border-radius:50%;object-fit:cover;border:1px solid #e6e6e6;background:#fafafa}.who{font-weight:700;color:#333}.metaLine{font-size:12px;color:#666}.replies{margin-top:8px;margin-left:28px;border-left:3px solid #eee;padding-left:12px}.reply{background:#fafafa;border-radius:8px;padding:8px;margin:6px 0}.likes,.date{font-size:12px;color:#666;margin-left:6px}.num{font-weight:700;color:#444;margin-right:6px}a{color:#0b5ed7;text-decoration:none}a:hover{text-decoration:underline}.plaquinha{position:fixed;top:12px;right:12px;background:#0b1324;color:#e6edf6;border:1px solid #22314e;border-radius:10px;padding:8px 10px;font-size:12px;box-shadow:0 10px 30px rgba(0,0,0,.25);white-space:pre-line;z-index:9}.credit{margin-top:10px;font-size:12px;color:#cfe0f5}.mediaBox{margin:8px 0 18px 0;padding:10px 12px;background:#fff;border-radius:10px;box-shadow:0 1px 2px rgba(0,0,0,.05)}.mediaBox h2{margin:0 0 8px;font-size:15px}.mediaBox img,.mediaBox video{max-width:100%;border-radius:10px;border:1px solid #e6e6e6}\
  .fbpc{margin-top:6px}.fbpc-main{margin-bottom:8px}.fbpc-slides{white-space:nowrap;overflow-x:auto}.fbpc-slide{display:inline-block;vertical-align:top;width:340px;max-width:100%;margin-right:8px}.fbpc-slide img{display:block;width:100%;height:auto;border-radius:10px;border:1px solid #e6e6e6}.fbpc-thumbs{display:flex;flex-wrap:wrap;gap:6px;margin-top:4px}.fbpc-thumb{border:1px solid #e0e0e0;border-radius:6px;padding:2px;background:#f7f7f7;cursor:pointer;font-size:11px;display:flex;align-items:center;gap:4px}.fbpc-thumb img{width:34px;height:34px;object-fit:cover;border-radius:4px;border:1px solid #ddd}.fbpc-thumb span{white-space:nowrap}.fbpc-downloads{margin-top:8px;display:flex;flex-wrap:wrap;gap:6px}.fbpc-downloads a{display:inline-block;padding:4px 8px;border-radius:6px;background:#198754;color:#fff;font-size:12px;text-decoration:none}.fbpc-downloads a:hover{background:#157347}\
  .fbpc-has-js .fbpc-slides{white-space:normal;overflow-x:hidden}.fbpc-has-js .fbpc-slide{display:none;margin-right:0}.fbpc-has-js .fbpc-slide-active{display:block}\
  .cmedia{margin-top:6px;display:flex;flex-wrap:wrap;gap:6px}.cmedia img{max-width:240px;border-radius:8px;border:1px solid #e6e6e6;display:block}.reply{background:#fafafa;border-radius:8px;padding:8px;margin:6px 0}.likes,.date{font-size:12px;color:#666;margin-left:6px}.num{font-weight:700;color:#444;margin-right:6px}a{color:#0b5ed7;text-decoration:none}a:hover{text-decoration:underline}.plaquinha{position:fixed;top:12px;right:12px;background:#0b1324;color:#e6edf6;border:1px solid #22314e;border-radius:10px;padding:8px 10px;font-size:12px;box-shadow:0 10px 30px rgba(0,0,0,.25);white-space:pre-line;z-index:9}.credit{margin-top:10px;font-size:12px;color:#cfe0f5}.mediaBox{margin:8px 0 12px 0}.mediaBox img,.mediaBox video{max-width:100%;border-radius:10px;border:1px solid #e6e6e6}</style></head><body>';
  var m = p.meta || {}, ct = p.counts || {};
var mediaHtml = '';

  /* ==== vídeo de Reels ==== */
  if (p.media && p.media.type === 'video' && (p.media.url || p.media.poster)) {
    var reelUrlV44R21R14 = safeExportUrl(p.media.url || '', false);
    var reelPosterV44R21R14 = safeExportUrl(p.media.poster || '', false);
    var isReelReportV44R28 = !!(p.media.reelId || p.audit && p.audit.context === 'REEL');
    var videoTitleV44R28 = isReelReportV44R28 ? '🎬 Mídia do Reels' : '🎬 Mídia do vídeo';
    var videoFileV44R28 = isReelReportV44R28 ? 'facebook_reels_video.mp4' : 'facebook_video.mp4';
    mediaHtml += '<div class="mediaBox"><h2>' + videoTitleV44R28 + '</h2>';
    if (reelUrlV44R21R14) {
      mediaHtml += '<video src="' + escA(reelUrlV44R21R14) + '"' + (reelPosterV44R21R14 ? ' poster="' + escA(reelPosterV44R21R14) + '"' : '') + ' controls playsinline preload="metadata" style="width:480px;max-width:100%;border-radius:10px;border:1px solid #e6e6e6"></video>' +
        '<div class="v44VideoDownloads"><a href="' + escA(reelUrlV44R21R14) + '" target="_blank" rel="noopener noreferrer" download="' + videoFileV44R28 + '" style="display:inline-block;margin-top:8px;padding:7px 12px;border-radius:6px;background:#198754;color:#fff;font-weight:bold;text-decoration:none;font-size:13px;">⬇️ Baixar ou abrir vídeo completo</a></div>' +
        '<div style="margin-top:6px;font-size:11px;color:#64748b;">Se o navegador abrir o vídeo em uma nova guia, use “Salvar vídeo como…”. A URL assinada foi preservada exatamente como observada na sessão.</div>';
    } else if (reelPosterV44R21R14) {
      mediaHtml += '<img src="' + escA(reelPosterV44R21R14) + '" alt="Poster do vídeo" style="width:480px;max-width:100%;border-radius:10px;border:1px solid #e6e6e6">' +
        '<div class="warn">O Facebook materializou o poster, mas não expôs uma URL de vídeo reutilizável nesta sessão. O relatório preserva a evidência visual sem inventar o arquivo.</div>';
    }
    mediaHtml += '</div>';
  }

  /* ==== fotos (1 ou várias) com carrossel + fallback ==== */
  var photos = [];
  if (p.media && (p.media.type === 'photos' || p.media.type === 'photo' || !p.media.type)) {
    if (p.media.photos && p.media.photos.length) {
      photos = p.media.photos;
    } else if (Array.isArray(p.media)) {
      photos = p.media;
    }
  }

  photos = photos.map(function (ph, idx) {
    if (typeof ph === 'string') {
      return { url: ph, index: (idx + 1) };
    }
    return {
      url: ph.url || ph.src || '',
      index: ph.index || (idx + 1)
    };
  }).filter(function (ph) { return !!ph.url; });

  if (photos.length) {
    mediaHtml += '<div class="mediaBox">';
    mediaHtml += '<h2>🖼 Mídia do post (' + photos.length + ' foto' + (photos.length > 1 ? 's' : '') + ')</h2>';
    mediaHtml += '<div class="fbpc">';
    mediaHtml += '<div class="fbpc-main"><div class="fbpc-slides">';

    for (var pi = 0; pi < photos.length; pi++) {
      var ph = photos[pi];
      var cls = 'fbpc-slide' + (pi === 0 ? ' fbpc-slide-active' : '');
      mediaHtml += '<div id="fbpc-slide-' + pi + '" class="' + cls + '" data-fbpc-idx="' + pi + '">';
      mediaHtml += '<img src="' + escA(safeExportUrl(ph.url, true)) + '" alt="Foto ' + (ph.index || (pi + 1)) + '">';
      mediaHtml += '</div>';
    }

    mediaHtml += '</div></div>';

    mediaHtml += '<div class="fbpc-thumbs">';
    for (var ti = 0; ti < photos.length; ti++) {
      var tph = photos[ti];
      mediaHtml += '<a class="fbpc-thumb" href="#fbpc-slide-' + ti + '" data-fbpc-idx="' + ti + '">';
      mediaHtml += '<img src="' + escA(safeExportUrl(tph.url, true)) + '" alt="Foto ' + (tph.index || (ti + 1)) + '">';
      mediaHtml += '<span>Foto ' + (tph.index || (ti + 1)) + '</span>';
      mediaHtml += '</a>';
    }
    mediaHtml += '</div>';

    mediaHtml += '<div class="fbpc-downloads">';
    for (var di = 0; di < photos.length; di++) {
      var dph = photos[di];
      var idxLabel = (dph.index || (di + 1));
      var fname = 'facebook_foto_' + (idxLabel < 10 ? '0' + idxLabel : idxLabel) + '.jpg';
      mediaHtml += '<a href="' + escA(safeExportUrl(dph.url, false)) + '" download="' + escA(fname) + '">⬇️ Foto ' + idxLabel + '</a>';
    }
    mediaHtml += '</div>';

    mediaHtml += '</div>';
    mediaHtml += '</div>';
  }

  // ... resto da função buildHTML (topo, comentários, replies, etc.)


  var top = '<div class="plaquinha">Status do Export\n' + esc(created) +
    '<div class="credit">Script de raspagem desenvolvido por <a target="_blank" href="https://www.instagram.com/guilhermecaselli/" style="color:#86e1ff;text-decoration:underline">Guilherme Caselli</a></div></div><h1>📌 Comentários Facebook</h1><div class="metaTop">';
  if (m.author)
    top += '<div><strong>👤 Autor:</strong> ' +
      (m.authorURL ? ('<a target="_blank" rel="noopener noreferrer" href="' + escA(safeExportUrl(m.authorURL, false)) + '">' + esc(m.author) + '</a>') : esc(m.author)) +
      '</div>';
  if (m.caption) top += '<div><strong>📝 Legenda:</strong> ' + esc(m.caption) + '</div>';
  
  if (ct && (ct.view || ct.like != null || ct.comment != null || ct.share != null)) {
    top += '<div><strong>📊 Contagens:</strong></div>';
    top += '<div style="margin:4px 0 6px 0;">';
    if (ct.view) {
      top += '<span style="display:inline-block;margin-right:16px;text-align:center;min-width:90px;">' +
        '▶️ ' + ct.view +
        '<div style="font-size:11px;color:#555;margin-top:2px;">visualizações do vídeo/post</div>' +
        '</span>';
    }
    if (ct.like != null) {
      top += '<span style="display:inline-block;margin-right:16px;text-align:center;min-width:90px;">' +
        '<span style="position:relative;display:inline-block;margin-right:4px;width:26px;height:18px;vertical-align:middle;">' +
          '<span style="position:absolute;left:0;top:0;font-size:15px;">👍</span>' +
          '<span style="position:absolute;left:10px;top:0;font-size:15px;">❤️</span>' +
        '</span>' +
        ct.like +
        '<div style="font-size:11px;color:#555;margin-top:2px;">reações (likes)</div>' +
        '</span>';
    }
    if (ct.comment != null) {
      top += '<span style="display:inline-block;margin-right:16px;text-align:center;min-width:90px;">' +
        '💬 ' + ct.comment +
        '<div style="font-size:11px;color:#555;margin-top:2px;">comentários</div>' +
        '</span>';
    }
    if (ct.share != null) {
      top += '<span style="display:inline-block;margin-right:16px;text-align:center;min-width:90px;">' +
        '🔁 ' + ct.share +
        '<div style="font-size:11px;color:#555;margin-top:2px;">compartilhamentos</div>' +
        '</span>';
    }
    top += '</div>';
  }
top += '<div><strong>💬 Carregados:</strong> ' + Number(p.L1 || 0) +
    ' (respostas em todos os níveis: ' + Number(p.L2 || 0) + ')</div>';
  if (m.postURL) {
    top += '<div><strong>📌 Post:</strong> <a target="_blank" rel="noopener noreferrer" href="' + escA(safeExportUrl(m.postURL, false)) + '">' + esc(m.postURL) + '</a></div>';
  } else {
    top += '<div><strong>📌 Post:</strong> ' + esc(location.href) + '</div>';
  }
  if (mediaHtml) top += mediaHtml;
  top += '</div><hr>';

  var authorMap = buildAuthorMap(p.rows || []);

  function renderMediaBlock(list) {
    if (!list || !list.length) return '';
    var html = '<div class="cmedia">';
    for (var i = 0; i < list.length; i++) {
      var m = list[i];
      html += '<div><img src="' + escA(safeExportUrl(m.url, true)) + '" alt=""></div>';
    }
    html += '</div>';
    return html;
  }

  function renderReply(rep) {
    var av2 = rep.avatar || rep.avatarUrl || '', av2Link=rep.avatarHighResUrl||rep.avatarUrl||'';
    var who2 = rep.authorHref ? ('<a target="_blank" rel="noopener noreferrer" href="' + escA(safeExportUrl(rep.authorHref, false)) + '">' + esc(rep.author || '') + '</a>') : esc(rep.author || '');
    var rline = rep.reacts ? reactLine(rep.reacts) :
      (rep.likes ? (' • ❤️ ' + esc(String(rep.likes))) : '');
    var h = '<div class="reply"><div class="head">' +
      (av2 ? ('<a target="_blank" rel="noopener noreferrer" href="'+escA(safeExportUrl(av2Link,true))+'"><img class="avatar" src="' + escA(safeExportUrl(av2, true)) + '"></a>') : '') +
      '<div><div class="who"><span class="num">' + esc(rep.num || '') +
      '</span> ' + who2 + '</div><div class="metaLine">' +
      (rep.date ? ('🕒 ' + esc(rep.date) + ' ') : '') + rline + '</div></div></div><div>' +
      (linkifyText(rep.text || '', authorMap)) + '</div>' + (rep.media && rep.media.length ? renderMediaBlock(rep.media) : '');
    if (rep.replies && rep.replies.length) {
      h += '<div class="replies">';
      for (var i = 0; i < rep.replies.length; i++) h += renderReply(rep.replies[i]);
      h += '</div>';
    }
    h += '</div>';
    return h;
  }
  function renderNode(r) {
    var av = r.avatar || r.avatarUrl || '', avLink=r.avatarHighResUrl||r.avatarUrl||'';
    var who = r.authorHref ? ('<a target="_blank" rel="noopener noreferrer" href="' + escA(safeExportUrl(r.authorHref, false)) + '">' + esc(r.author || '') + '</a>') : esc(r.author || '');
    var rline = r.reacts ? reactLine(r.reacts) :
      (r.likes ? (' • ❤️ ' + esc(String(r.likes))) : '');
    var html = '<div class="item"><div class="head">' +
      (av ? ('<a target="_blank" rel="noopener noreferrer" href="'+escA(safeExportUrl(avLink,true))+'"><img class="avatar" src="' + escA(safeExportUrl(av, true)) + '"></a>') : '') +
      '<div><div class="who"><span class="num">' + esc(r.num || '') +
      '</span> ' + who + '</div><div class="metaLine">' +
      (r.date ? ('🕒 ' + esc(r.date) + ' ') : '') + rline +
      '</div></div></div><div class="content">' + (linkifyText(r.text || '', authorMap)) + '</div>' + (r.media && r.media.length ? renderMediaBlock(r.media) : '');
    if (r.replies && r.replies.length) {
      html += '<div class="replies">';
      for (var j = 0; j < r.replies.length; j++) html += renderReply(r.replies[j]);
      html += '</div>';
    }
    html += '</div>';
    return html;
  }
  var items = '';
  for (var i2 = 0; i2 < (p.rows || []).length; i2++) items += renderNode(p.rows[i2]);
  var footer = '<hr><div style="font-size:12px;color:#666">Relatório gerado por bookmarklet — <strong>Script de raspagem desenvolvido por <a target="_blank" href="https://www.instagram.com/guilhermecaselli/">Guilherme Caselli</a></strong></div>';
  return head + top + items + footer + '</body></html>';
}

/* ========= SAVE (HTML/JSON/PDF) ========= */
function save(fn, txt, isHTML) {
  var mime = isHTML ? 'text/html;charset=utf-8' : 'application/json;charset=utf-8';
  return saveBin(fn, txt, mime);
}
function saveBin(fn, data, mime) {
  return new Promise(function (resolve) {
    var a = document.createElement('a');
    var blob = new Blob([data], { type: mime || 'application/octet-stream' });
    var objectUrl = URL.createObjectURL(blob);
    a.download = fn;
    a.href = objectUrl;
    a.rel = 'noopener';
    document.body.appendChild(a);
    try { a.click(); } finally { a.remove(); }
    setTimeout(function () {
      try { URL.revokeObjectURL(objectUrl); } catch (_) {}
      resolve({ name: fn, bytes: blob.size, mime: mime || 'application/octet-stream' });
    }, 450);
  });
}

/* ========= HASHES ========= */
function utf8Bytes(str) {
  if (window.TextEncoder) return new TextEncoder().encode(String(str || ''));
  var s = unescape(encodeURIComponent(String(str || '')));
  var data = new Uint8Array(s.length);
  for (var i = 0; i < s.length; i++) data[i] = s.charCodeAt(i);
  return data;
}
function byteLengthUtf8(str) { return utf8Bytes(str).byteLength; }
function digestHex(algorithm, str) {
  try {
    if (window.crypto && window.crypto.subtle) {
      return window.crypto.subtle.digest(algorithm, utf8Bytes(str)).then(function (buf) {
        var arr = new Uint8Array(buf), out = '';
        for (var i = 0; i < arr.length; i++) out += ('00' + arr[i].toString(16)).slice(-2);
        return out;
      }).catch(function () { return 'N/A'; });
    }
  } catch (_) {}
  return Promise.resolve('N/A');
}
function sha256Hex(str) { return digestHex('SHA-256', str); }
function sha512Hex(str) { return digestHex('SHA-512', str); }

/* ========= PDF DE INTEGRIDADE ========= */
function buildIntegrityText(payload, files) {
  var meta = payload.meta || {};
  var audit = payload.audit || {};
  var nowIso = new Date().toISOString();
  var lines = [];
  lines.push('LAUDO DE INTEGRIDADE - COLETA FACEBOOK');
  lines.push('');
  lines.push('Ferramenta: ' + String(audit.toolVersion || FB_TOOL_VERSION));
  lines.push('Gerado em UTC: ' + nowIso);
  lines.push('Inicio da coleta UTC: ' + String(audit.runStartedAt || 'N/A'));
  lines.push('Fim da coleta UTC: ' + String(audit.finishedAt || audit.collectedAt || 'N/A'));
  lines.push('Status: ' + String(audit.status || 'N/A'));
  lines.push('Contexto: ' + String(audit.context || 'N/A'));
  lines.push('URL inicial: ' + String(audit.sourceUrlAtStart || 'N/A'));
  lines.push('URL canônica observada: ' + String(meta.postURL || audit.sourceUrlAtExport || location.href || 'N/A'));
  lines.push('Comentários de nível 1: ' + Number(payload.L1 || 0));
  lines.push('Respostas em todos os níveis: ' + Number(payload.L2 || 0));
  lines.push('');
  lines.push('ARQUIVOS E HASHES');
  lines.push('');
  for (var i = 0; i < (files || []).length; i++) {
    var f = files[i] || {};
    lines.push('Arquivo: ' + String(f.name || 'N/A'));
    lines.push('Tipo: ' + String(f.mime || 'N/A'));
    lines.push('Tamanho: ' + Number(f.bytes || 0) + ' bytes');
    lines.push('SHA-256: ' + String(f.sha256 || 'N/A'));
    lines.push('SHA-512: ' + String(f.sha512 || 'N/A'));
    lines.push('');
  }
  lines.push('OBSERVAÇÃO METODOLÓGICA');
  lines.push('Os hashes demonstram integridade dos bytes exportados. Não constituem, isoladamente, prova de autoria ou autenticidade da fonte.');
  lines.push('Valores não observáveis no DOM não foram presumidos nem preenchidos por constantes.');
  lines.push('');
  lines.push('Desenvolvido por Guilherme Caselli');
  lines.push('https://www.instagram.com/guilhermecaselli/');
  return lines.join('\n');
}
function buildIntegrityPdf(text) {
  function winAnsi(str) {
    var specials = {
      0x20AC:0x80, 0x201A:0x82, 0x0192:0x83, 0x201E:0x84, 0x2026:0x85,
      0x2020:0x86, 0x2021:0x87, 0x02C6:0x88, 0x2030:0x89, 0x0160:0x8A,
      0x2039:0x8B, 0x0152:0x8C, 0x017D:0x8E, 0x2018:0x91, 0x2019:0x92,
      0x201C:0x93, 0x201D:0x94, 0x2022:0x95, 0x2013:0x96, 0x2014:0x97,
      0x02DC:0x98, 0x2122:0x99, 0x0161:0x9A, 0x203A:0x9B, 0x0153:0x9C,
      0x017E:0x9E, 0x0178:0x9F
    };
    var out = '';
    str = String(str || '');
    for (var i = 0; i < str.length; i++) {
      var cp = str.charCodeAt(i);
      if (cp <= 255) out += String.fromCharCode(cp);
      else if (specials[cp] != null) out += String.fromCharCode(specials[cp]);
      else out += '?';
    }
    return out;
  }
  function escPdfLiteral(str) {
    return winAnsi(str).replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
  }
  function wrapLine(line, width) {
    line = String(line || '');
    if (!line) return [''];
    var out = [];
    while (line.length > width) {
      var cut = line.lastIndexOf(' ', width);
      if (cut < Math.floor(width * 0.55)) cut = width;
      out.push(line.slice(0, cut));
      line = line.slice(cut).replace(/^\s+/, '');
    }
    out.push(line);
    return out;
  }
  var sourceLines = String(text || '').split(/\r?\n/), lines = [];
  for (var i = 0; i < sourceLines.length; i++) {
    var wrapped = wrapLine(sourceLines[i], 88);
    for (var j = 0; j < wrapped.length; j++) lines.push(wrapped[j]);
  }
  var leading = 11;
  var content = 'BT\n/F1 9 Tf\n' + leading + ' TL\n42 806 Td\n';
  for (var k = 0; k < lines.length; k++) {
    if (k > 0) content += 'T*\n';
    content += '(' + escPdfLiteral(lines[k]) + ') Tj\n';
  }
  content += 'ET\n';
  content = winAnsi(content);

  var objects = [];
  objects[1] = '<< /Type /Catalog /Pages 2 0 R >>';
  objects[2] = '<< /Type /Pages /Kids [3 0 R] /Count 1 >>';
  objects[3] = '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>';
  objects[4] = '<< /Length ' + content.length + ' >>\nstream\n' + content + 'endstream';
  objects[5] = '<< /Type /Font /Subtype /Type1 /BaseFont /Courier /Encoding /WinAnsiEncoding >>';

  var pdf = '%PDF-1.4\n%' + String.fromCharCode(0xE2,0xE3,0xCF,0xD3) + '\n';
  var offsets = [0];
  for (var n = 1; n <= 5; n++) {
    offsets[n] = pdf.length;
    pdf += n + ' 0 obj\n' + objects[n] + '\nendobj\n';
  }
  var xrefPos = pdf.length;
  pdf += 'xref\n0 6\n0000000000 65535 f \n';
  for (var x = 1; x <= 5; x++) pdf += ('0000000000' + offsets[x]).slice(-10) + ' 00000 n \n';
  pdf += 'trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n' + xrefPos + '\n%%EOF\n';

  var bytes = new Uint8Array(pdf.length);
  for (var b = 0; b < pdf.length; b++) bytes[b] = pdf.charCodeAt(b) & 0xFF;
  return bytes;
}
function createHashPdf(filename, payload, files) {
  var txt = buildIntegrityText(payload, files);
  var pdfBytes = buildIntegrityPdf(txt);
  return saveBin(filename, pdfBytes, 'application/pdf');
}

try{window.__FB_MEDIA_DIAGNOSTIC_V44R21R7__={canonicalize:reelMediaCandidateV44R21R7,select:reelSelectMediaCandidateV44R21R7,last:function(){return window.__FB_REEL_MEDIA_LAST_DIAGNOSTIC_V44R21R7__||null;}};}catch(_){}

/* ========= RUN ========= */



/* V44R21R7 — normalização de mídia de Reel.
   URLs do mesmo arquivo CDN variam por _nc_gid, oh, oe e outros parâmetros
   voláteis. A V44R21R5 contava cada variação como outro candidato. */
function reelDecodeEfgV44R21R7(raw){
  try{var s=decodeURIComponent(String(raw||'')).replace(/-/g,'+').replace(/_/g,'/');while(s.length%4)s+='=';var bin=atob(s),bytes=[];for(var i=0;i<bin.length;i++)bytes.push(bin.charCodeAt(i));var txt='';try{txt=new TextDecoder('utf-8').decode(new Uint8Array(bytes));}catch(_){txt=bin;}try{return JSON.parse(txt);}catch(__){return {};}}catch(_){return {};}
}
function reelMediaCandidateV44R21R7(raw){
  var original=String(raw||'').replace(/\\u0025/gi,'%').replace(/\\u0026/gi,'&').replace(/\\\//g,'/').replace(/&amp;/gi,'&');if(!original||!/\.mp4(?:[?#]|$)/i.test(original))return null;
  try{
    var u=new URL(original,location.href),efg=reelDecodeEfgV44R21R7(u.searchParams.get('efg')||''),asset=String(efg.video_id||efg.xpv_asset_id||efg.asset_id||''),bitrate=Number(efg.bitrate||u.searchParams.get('bitrate')||0),tag=String(u.searchParams.get('tag')||efg.vencode_tag||efg.tag||'').toLowerCase();
    var path=(u.hostname||'').toLowerCase()+(u.pathname||'');
    var key=asset?'asset:'+asset+'|path:'+path:'path:'+path+'|tag:'+tag.replace(/\s+/g,'');
    return {url:u.href,key:key,assetId:asset,videoId:String(efg.video_id||''),bitrate:bitrate,tag:tag,path:path};
  }catch(_){return null;}
}
function reelSelectMediaCandidateV44R21R7(rawList,reelId){
  var groups={},order=[];(rawList||[]).forEach(function(raw){var c=reelMediaCandidateV44R21R7(raw);if(!c)return;if(!groups[c.key]){groups[c.key]=[];order.push(c.key);}if(!groups[c.key].some(function(x){return x.url===c.url;}))groups[c.key].push(c);});
  if(!order.length)return {url:null,reason:'NO_MP4_CANDIDATE',groups:0,candidates:0};
  function bestOf(list){return list.slice().sort(function(a,b){var aq=/hd|high|1080|720/i.test(a.tag)?1:0,bq=/hd|high|1080|720/i.test(b.tag)?1:0;return bq-aq||Number(b.bitrate||0)-Number(a.bitrate||0)||a.url.length-b.url.length;})[0];}
  var ranked=order.map(function(k){var b=bestOf(groups[k]),score=groups[k].length*3+Math.min(5000,Number(b.bitrate||0)/1000);if(reelId&&b.videoId&&String(b.videoId)===String(reelId))score+=100000;if(reelId&&b.assetId&&String(b.assetId)===String(reelId))score+=80000;if(reelId&&b.url.indexOf(String(reelId))>=0)score+=50000;return {key:k,best:b,score:score,count:groups[k].length};}).sort(function(a,b){return b.score-a.score;});
  if(ranked.length===1)return {url:ranked[0].best.url,reason:'ONE_CANONICAL_ASSET',groups:1,candidates:ranked[0].count,key:ranked[0].key};
  if(ranked[0].score-ranked[1].score>=30000)return {url:ranked[0].best.url,reason:'REEL_ID_BOUND_ASSET',groups:ranked.length,candidates:ranked.reduce(function(n,x){return n+x.count;},0),key:ranked[0].key};
  return {url:null,reason:'MULTIPLE_DISTINCT_ASSETS',groups:ranked.length,candidates:ranked.reduce(function(n,x){return n+x.count;},0),keys:ranked.map(function(x){return x.key;})};
}


function detectReelMediaURL(){
  try{
    function mediaVisible(el){if(!el)return false;try{var cs=getComputedStyle(el),r=el.getBoundingClientRect();return cs.display!=='none'&&cs.visibility!=='hidden'&&r.width>50&&r.height>50&&r.top<innerHeight&&r.bottom>0;}catch(_){return false;}}
    function reelId(){var m=String(location.pathname||'').match(/\/reel\/(\d+)/);return m&&m[1]||'';}
    var id=reelId(),vids=[];try{vids=Array.prototype.slice.call(document.querySelectorAll('video')).filter(mediaVisible);}catch(_){}
    vids.sort(function(a,b){var ar=a.getBoundingClientRect(),br=b.getBoundingClientRect();return br.width*br.height-ar.width*ar.height;});
    for(var i=0;i<vids.length;i++){
      var direct=String(vids[i].currentSrc||vids[i].src||'');if(/\.mp4(?:[?#]|$)/i.test(direct)){window.__FB_REEL_MEDIA_LAST_DIAGNOSTIC_V44R21R7__={source:'visible_video',reason:'DIRECT_MP4'};return direct;}
      try{var so=vids[i].querySelector('source[src*=".mp4"]');if(so&&so.src){window.__FB_REEL_MEDIA_LAST_DIAGNOSTIC_V44R21R7__={source:'visible_source',reason:'DIRECT_SOURCE_MP4'};return so.src;}}catch(_){}
    }
    var raw='',cands=[];try{raw=(document.documentElement.outerHTML||'').replace(/\\u0025/gi,'%').replace(/\\u0026/gi,'&').replace(/\\\//g,'/').replace(/&amp;/gi,'&');}catch(_){}
    if(raw){
      var re=/https?:\/\/[^\s"'<>]+?\.mp4[^\s"'<>]*/gi,m;while((m=re.exec(raw))!==null&&cands.length<12000)cands.push(m[0]);
      var htmlSel=reelSelectMediaCandidateV44R21R7(cands,id);if(htmlSel.url){window.__FB_REEL_MEDIA_LAST_DIAGNOSTIC_V44R21R7__={source:'html',reason:htmlSel.reason,groups:htmlSel.groups,candidates:htmlSel.candidates,key:htmlSel.key};return htmlSel.url;}
    }
    cands=[];try{(performance.getEntriesByType('resource')||[]).forEach(function(e){var n=e&&e.name;if(n&&/\.mp4(?:[?#]|$)/i.test(n)&&!/[?&](?:bytestart|range)=|init\.mp4|frag/i.test(n)&&!/ads|story|preview|thumbnail|carousel/i.test(n))cands.push(n);});}catch(_){}
    var perfSel=reelSelectMediaCandidateV44R21R7(cands,id);window.__FB_REEL_MEDIA_LAST_DIAGNOSTIC_V44R21R7__={source:'performance',reason:perfSel.reason,groups:perfSel.groups,candidates:perfSel.candidates,key:perfSel.key||'',keys:perfSel.keys||[]};
    /* Ambiguidade real não é erro da extensão e não deve poluir chrome://extensions. */
    return perfSel.url||null;
  }catch(e){window.__FB_REEL_MEDIA_LAST_DIAGNOSTIC_V44R21R7__={source:'exception',reason:String(e&&e.message||e)};return null;}
}


function collectPhotoMedia(panel) {
  try {
    var imgsRaw = U.qa('img', panel);
    var big = [];

    U.each(imgsRaw, function (img) {
      if (!U.vis(img)) return;
      var r;
      try { r = img.getBoundingClientRect(); } catch (_) { return; }
      if (!r || r.width < 120 || r.height < 120) return;

      var src = img.currentSrc || img.src || '';
      if (!src) return;

      if (/\.gif(\?|$)/i.test(src)) return;
      if (/emoji|sticker|reaction|spritemap|sprite|transparent/i.test(src)) return;
      if (/profile|_p32x32|_p40x40|_p48x48/i.test(src)) return;

      big.push({ img: img, src: src, top: r.top });
    });

    if (!big.length) return null;

    big.sort(function (a, b) { return a.top - b.top; });
    var anchor = big[0].img;

    var root = anchor;
    var depth = 0;
    while (root && depth < 6) {
      var imgsHere = root.querySelectorAll && root.querySelectorAll('img');
      if (imgsHere && imgsHere.length > 1 && root !== panel) {
        break;
      }
      root = root.parentElement;
      depth++;
    }
    if (!root) root = panel;

    var final = [];
    var seen = Object.create(null);
    var imgs = root.querySelectorAll ? root.querySelectorAll('img') : [];

    Array.prototype.forEach.call(imgs, function (img) {
      if (!U.vis(img)) return;
      var r;
      try { r = img.getBoundingClientRect(); } catch (_) { return; }
      if (!r || r.width < 120 || r.height < 120) return;

      var src = img.currentSrc || img.src || '';
      if (!src) return;
      if (/\.gif(\?|$)/i.test(src)) return;
      if (/emoji|sticker|reaction|spritemap|sprite|transparent/i.test(src)) return;
      if (/profile|_p32x32|_p40x40|_p48x48/i.test(src)) return;

      if (seen[src]) return;
      seen[src] = true;
      final.push(src);
    });

    if (!final.length) return null;

    return {
      type: 'photos',
      photos: final.map(function (u, idx) {
        return { url: u, index: idx + 1 };
      })
    };
  } catch (e) {
    console.warn('Erro em collectPhotoMedia:', e);
    return null;
  }
}

/* V44R21R28 — captura visual cirúrgica de vídeo. Não altera comentários,
   relações, navegação, scroll, métricas ou qualquer fluxo estável. */
function visiblePostVideoSnapshotV44R21R28(panel){
  try{
    var directVideoRoute=/\/(?:videos)\/\d+|\/watch\/?\?v=\d+/i.test(String(location.href||'')),scope=panel&&panel.querySelectorAll?panel:null,list=[];
    if(scope)list=Array.prototype.slice.call(scope.querySelectorAll('video'));
    if(!list.length&&directVideoRoute)list=Array.prototype.slice.call(document.querySelectorAll('video'));
    list=list.filter(function(v){try{return v&&!v.closest('#fb-b35-unified-v44-panel')&&U.vis(v)&&v.getBoundingClientRect().width>=220&&v.getBoundingClientRect().height>=150;}catch(_){return false;}});
    var best=null;
    list.forEach(function(v){try{
      var r=v.getBoundingClientRect(),source=v.querySelector&&v.querySelector('source[src]'),url=String(v.currentSrc||v.src||source&&source.src||''),poster=String(v.poster||''),score=r.width*r.height-Math.abs((r.left+r.width/2)-innerWidth/2)*40;
      if(!/^https?:/i.test(url))url='';if(!/^https?:/i.test(poster))poster='';
      if(!url&&!poster)return;
      if(!best||score>best.score)best={type:'video',url:url,poster:poster,source:'VISIBLE_VIDEO_EXACT_POST_SURFACE_V44R21R28',score:score,mediaBinding:{status:'VISIBLE_EXACT_POST_SURFACE',reason:scope&&scope.contains(v)?'VIDEO_INSIDE_SELECTED_POST_SURFACE':'UNIQUE_VISIBLE_VIDEO_ON_DIRECT_VIDEO_ROUTE'}};
    }catch(_){} });
    return best;
  }catch(_){return null;}
}


/* V44R21R9 - contrato PHOTO sem regressão.
   1) o contador relativo "9y" pertence à idade do comentário e nunca pode ser
      convertido em alvo de 9 comentários;
   2) os metadados e a mídia principal são congelados antes de abrir reações;
   3) dados não observados permanecem vazios, sem inferência. */
function photoExplicitDeclaredCountV44R21R9(root){
  root=root||document;var best=0,nodes=[];try{nodes=Array.prototype.slice.call(root.querySelectorAll('[aria-label],[title]')).slice(0,5000);}catch(_){}
  nodes.forEach(function(el){try{
    if(!U.vis(el)||el.closest&&el.closest('#fb-b35-unified-v44-panel'))return;
    if(el.closest&&el.closest('a[href*="comment_id="],a[href*="reply_comment_id="],div[role="article"],li[aria-posinset]'))return;
    var label=U.T((el.getAttribute('aria-label')||'')+' '+(el.getAttribute('title')||'')),m=label.match(/(?:^|\b)(\d[\d.,]*\s*(?:mil|[kKmMbB])?)\s+(?:comments?|coment[aá]rios?)\b/i)||label.match(/(?:comments?|coment[aá]rios?)\s*[:·-]?\s*(\d[\d.,]*\s*(?:mil|[kKmMbB])?)/i);
    if(!m)return;var n=Number(parseFacebookCount(m[1]));if(isFinite(n)&&n>best&&n<10000000)best=n;
  }catch(_){}});return best;
}
function photoStrictDeclaredTargetV44R21R9(snapshot){
  var observed=Number(snapshot&&snapshot.comment||0);if(observed>0)return observed;
  try{var metrics=collectPostSurfaceMetricsV44R19();observed=Number(metrics&&metrics.comment||0);if(observed>0)return observed;}catch(_){}
  return Number(photoExplicitDeclaredCountV44R21R9(document.body)||0);
}
function photoCurrentIdentityV44R21R9(){try{var u=new URL(location.href),fbid=u.searchParams.get('fbid')||'',set=u.searchParams.get('set')||'';return {photoId:fbid,albumSetId:set,postURL:u.origin+u.pathname+(u.search?'?'+u.searchParams.toString():'')};}catch(_){return {photoId:'',albumSetId:'',postURL:String(location.href||'')};}}
function photoMainMediaSnapshotV44R21R9(){
  if(!isPhotoContext())return null;var cand=[],seen={};try{Array.prototype.slice.call(document.querySelectorAll('img')).slice(0,8000).forEach(function(img){
    if(!U.vis(img)||img.closest&&img.closest('#fb-b35-unified-v44-panel'))return;var src=String(img.currentSrc||img.src||'');if(!/^https?:\/\//i.test(src)||!/fbcdn\.net/i.test(src)||/emoji|sticker|reaction|sprite|profile|_p(?:32|40|48|64)x/i.test(src))return;
    var r=img.getBoundingClientRect(),area=Number(r.width||0)*Number(r.height||0);if(r.width<280||r.height<220||area<90000||r.top>innerHeight*.95||r.bottom<0)return;
    var key='';try{var u=new URL(src);key=u.origin+u.pathname;}catch(_){key=src.split('?')[0];}if(seen[key])return;seen[key]=1;
    var score=area;if(img.getAttribute('data-visualcompletion')==='media-vc-image')score+=1500000;if(r.left<innerWidth*.72)score+=500000;if(r.right<innerWidth*.82)score+=250000;if(r.width>r.height*.65)score+=80000;var alt=U.T(img.alt||'');if(/photo|foto|image|imagem|description/i.test(alt))score+=70000;
    cand.push({url:src,index:1,width:Math.round(r.width),height:Math.round(r.height),naturalWidth:Number(img.naturalWidth||0),naturalHeight:Number(img.naturalHeight||0),alt:alt,score:score,source:'PHOTO_MAIN_MEDIA_BOUND_V44R21R9'});
  });}catch(_){}cand.sort(function(a,b){return b.score-a.score;});if(!cand.length)return null;var p=cand[0];delete p.score;return {type:'photos',photos:[p],snapshotVersion:'PHOTO_MAIN_MEDIA_V44R21R9',capturedAt:new Date().toISOString()};
}
function photoExactPostDateV44R21R9(){
  var id=photoRouteIdV44R21R8(),out='';if(!id)return out;try{Array.prototype.slice.call(document.querySelectorAll('a[aria-label][href]')).slice(0,6000).some(function(a){
    var href=String(a.href||''),label=U.T(a.getAttribute('aria-label')||'');if(href.indexOf('fbid='+id)<0||/comment_id=|reply_comment_id=/i.test(href))return false;
    if(/\b(?:January|February|March|April|May|June|July|August|September|October|November|December|janeiro|fevereiro|mar[cç]o|abril|maio|junho|julho|agosto|setembro|outubro|novembro|dezembro)\b/i.test(label)){out=label;return true;}return false;
  });}catch(_){}return out;
}

/* V44R21R10 - contrato PHOTO derivado do arquivo offline real enviado pelo usuário.
   O cabeçalho usa SVG <image xlink:href>, a data usa aria-labelledby e as respostas
   usam aria-label="Reply by ..." embora a URL ainda contenha comment_id. */
function photoDateLikeV44R21R10(raw){var z=U.T(raw||'');return /\b(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2}(?:,)?\s+\d{4}\b/i.test(z)||/\b\d{1,2}\s+de\s+(?:janeiro|fevereiro|mar[cç]o|abril|maio|junho|julho|agosto|setembro|outubro|novembro|dezembro)\s+de\s+\d{4}\b/i.test(z)||/\b\d{1,2}\s+(?:janeiro|fevereiro|mar[cç]o|abril|maio|junho|julho|agosto|setembro|outubro|novembro|dezembro)\s+\d{4}\b/i.test(z);}
function photoCanonicalProfileV44R21R10(raw){return canonicalProfilePageV44R3(raw)||'';}
function photoContractPanelV44R21R10(){
  var nodes=[],best=null,bestScore=-99999;try{nodes=Array.prototype.slice.call(document.querySelectorAll('[role="complementary"],[role="dialog"]')).slice(0,80);}catch(_){}
  nodes.forEach(function(el){try{if(!U.vis(el)||el.closest&&el.closest('#fb-b35-unified-v44-panel'))return;var r=el.getBoundingClientRect(),tx=U.T(el.innerText||el.textContent||''),score=0;if(el.getAttribute('role')==='complementary')score+=2800;if(el.querySelector('h1 a[href],h2 a[href],[role="heading"] a[href]'))score+=2200;if(el.querySelector('[role="article"][aria-label]'))score+=2400;if(/All comments|Comments|Todos os coment[aá]rios|Coment[aá]rios/i.test(tx))score+=1200;if(r.left>innerWidth*.45)score+=500;if(r.width>=280&&r.width<=Math.min(760,innerWidth*.58))score+=400;if(score>bestScore){bestScore=score;best=el;}}catch(_){}});
  return best||findPostSurface('PHOTO')||panelRoot()||document.body;
}
function photoResolveLabelledTextV44R21R10(el){var out=[];try{String(el&&el.getAttribute('aria-labelledby')||'').split(/\s+/).forEach(function(id){if(!id)return;var n=document.getElementById(id);if(n){var z=U.T(n.innerText||n.textContent||'');if(z)out.push(z);}});}catch(_){}return U.T(out.join(' '));}
function photoHeaderContractV44R21R10(){
  if(!isPhotoContext())return {};
  var root=photoContractPanelV44R21R10(),first=null,firstTop=Infinity;
  try{first=root.querySelector('[role="article"][aria-label]');if(first)firstTop=first.getBoundingClientRect().top;}catch(_){}
  var candidates=[];
  try{Array.prototype.slice.call(root.querySelectorAll('h1 a[href],h2 a[href],[role="heading"] a[href]')).slice(0,400).forEach(function(a){
    var href=String(a.href||a.getAttribute('href')||''),name=U.T(a.innerText||a.textContent||''),identity=profileIdentityFromUrl(href);
    if(!name||!identity||/comment_id=|reply_comment_id=/i.test(href))return;
    var r=a.getBoundingClientRect();if(r.top>firstTop+2)return;
    var score=1000;if(a.closest&&a.closest('h1,h2,[role="heading"]'))score+=700;if(r.left>innerWidth*.45)score+=300;if(name.length>=3&&name.length<=120)score+=100;
    candidates.push({a:a,score:score});
  });}catch(_){}
  candidates.sort(function(a,b){return b.score-a.score;});var authorLink=candidates[0]&&candidates[0].a;if(!authorLink)return {};
  var canon=photoCanonicalProfileV44R21R10(authorLink.href||''),authorName=U.T(authorLink.innerText||authorLink.textContent||''),authorRect=null;
  try{authorRect=authorLink.getBoundingClientRect();}catch(_){}
  var headerScope=authorLink.parentElement||root,cur=authorLink;
  for(var up=0;up<10&&cur&&cur!==document.body;up++,cur=cur.parentElement){try{var cr=cur.getBoundingClientRect(),containsArticle=!!cur.querySelector('[role="article"][aria-label]');if(cr.height<=260&&!containsArticle){headerScope=cur;}if(cur.querySelector('[aria-labelledby],svg[title],svg[aria-label]')&&cr.height<=320&&!containsArticle){headerScope=cur;break;}}catch(_){} }
  var avatar=null,assets=[];
  try{assets=Array.prototype.slice.call(root.querySelectorAll('svg image,image,img,[style*="background-image"]')).slice(0,1000);}catch(_){}
  assets.forEach(function(el){try{
    if(!U.vis(el)||el.closest&&el.closest('[role="article"][aria-label]'))return;
    var src=visualAssetUrlV44R12(el);if(!src||!/fbcdn\.net/i.test(src)||photoIsStickerAssetV44R21R11(src))return;
    var r=el.getBoundingClientRect(),w=Number(r.width||0),h=Number(r.height||0);if(w<20||h<20||w>120||h>120)return;
    if(firstTop<Infinity&&r.top>=firstTop-4)return;var ratio=Math.min(w,h)/Math.max(w,h);if(ratio<.74)return;
    var owner=el.closest&&el.closest('a[href]'),ownerId=owner&&profileIdentityFromUrl(owner.href||''),exactOwner=!!(ownerId&&ownerId===profileIdentityFromUrl(canon));var score=0;if(authorRect){var dy=Math.abs((r.top+r.height/2)-(authorRect.top+authorRect.height/2)),dx=authorRect.left-(r.left+r.width);if(!exactOwner&&(dy>72||dx<-90||dx>220))return;score+=900-Math.round(dy*8)-Math.round(Math.abs(Math.max(0,dx-90))*2);}
    if(exactOwner)score+=1800;
    if(el.closest&&el.closest('a[aria-label*="story" i],a[href*="/stories/"]'))score+=700;
    score+=Math.min(200,w*h/20);if(!avatar||score>avatar.score)avatar={url:src,width:Math.round(w),height:Math.round(h),score:score};
  }catch(_){} });
  var dateText='',dateURL='',privacy='';
  try{Array.prototype.slice.call(root.querySelectorAll('[aria-labelledby]')).some(function(el){var r=el.getBoundingClientRect();if(r.top>firstTop+2)return false;var z=photoResolveLabelledTextV44R21R10(el);if(!photoDateLikeV44R21R10(z))return false;dateText=z;var a=el.closest&&el.closest('a[href]');dateURL=a?String(a.href||''):'';return true;});}catch(_){}
  if(!dateText){try{Array.prototype.slice.call(root.querySelectorAll('[aria-label],[title]')).some(function(el){var r=el.getBoundingClientRect();if(r.top>firstTop+2)return false;var z=U.T((el.getAttribute('aria-label')||'')+' '+(el.getAttribute('title')||''));if(!photoDateLikeV44R21R10(z))return false;dateText=z;var a=el.closest&&el.closest('a[href]');dateURL=a?String(a.href||''):'';return true;});}catch(_){} }
  try{Array.prototype.slice.call(root.querySelectorAll('svg[title],svg[aria-label],[title],[aria-label]')).some(function(el){var r=el.getBoundingClientRect();if(r.top>firstTop+2)return false;var z=U.T(el.getAttribute('title')||el.getAttribute('aria-label')||(el.querySelector&&el.querySelector('title')&&el.querySelector('title').textContent)||'');if(!/^(?:Shared with Public|Public|Friends|Only me|P[uú]blico|Amigos|Somente eu)$/i.test(z))return false;privacy=z;return true;});}catch(_){}
  var locations=[],seenLoc={};
  try{Array.prototype.slice.call(root.querySelectorAll('a[href],span,div')).slice(0,5000).forEach(function(el){if(!U.vis(el))return;var r=el.getBoundingClientRect();if(r.top>firstTop+2||r.top<(authorRect?authorRect.top-30:0))return;var z=U.T(el.innerText||el.textContent||'');if(!z||z.length<3||z.length>120||z===authorName||photoDateLikeV44R21R10(z)||isActionLabel(z)||isLikelyTimestamp(z)||/^\d+$/.test(z))return;if(!/(?:,\s*[A-Z]{2}\b|\bat\s+|\bem\s+)/i.test(z)&&!(el.tagName==='A'&&/place|location|pages/i.test(String(el.href||''))))return;var key=z.toLowerCase();if(seenLoc[key])return;seenLoc[key]=1;var score=0;if(/,\s*[A-Z]{2}\b/.test(z))score+=1400;if(el.tagName==='A')score+=400;if(/\bat\s+|\bem\s+/i.test(z))score+=150;score+=Math.max(0,300-z.length);locations.push({text:z,url:el.tagName==='A'?cleanUrl(el.href||''):'',score:score});});}catch(_){}
  locations.sort(function(a,b){return b.score-a.score||a.text.length-b.text.length;});var loc=locations[0]||null;
  return {author:authorName,authorURL:canon,authorUsername:usernameFromUrl(canon),authorProfileIdentity:profileIdentityFromUrl(canon),authorAvatar:avatar&&avatar.url||'',authorAvatarSourceUrl:avatar&&avatar.url||'',authorAvatarHighResUrl:avatar&&avatar.url||'',authorAvatarWidth:Number(avatar&&avatar.width||0),authorAvatarHeight:Number(avatar&&avatar.height||0),authorAvatarBound:!!(avatar&&avatar.url),authorAvatarBindingReason:avatar&&avatar.url?'PHOTO_HEADER_IDENTITY_GEOMETRIC_V44R21R11':'PHOTO_HEADER_AVATAR_NOT_PROVEN',postDateText:dateText,postDateExactText:dateText,postDateRelativeText:'',postDateURL:dateURL,privacyText:privacy,locationText:loc&&loc.text||'',locationURL:loc&&loc.url||'',headerStoryText:'',taggedPeople:[],places:locations.map(function(x){return {type:'place',text:x.text,url:x.url||''};}),headerContractVersion:'PHOTO_TARGET_BOUND_ALL_COMMENTS_V44R21R13'};
}
try{window.__FB_PHOTO_HEADER_CONTRACT_V44R21R13__=photoHeaderContractV44R21R10;}catch(_){}
function photoCommentRoleV44R21R10(card){var z=U.T(card&&card.getAttribute&&card.getAttribute('aria-label')||'');if(/^(?:Reply by|Resposta de|Respuesta de|R[eé]ponse de|Antwort von)\b/i.test(z))return 'reply';if(/^(?:Comment by|Coment[aá]rio de|Comentario de)\b/i.test(z))return 'comment';return '';}
function photoCardOwnIdV44R21R10(card){try{var links=Array.prototype.slice.call(card.querySelectorAll('a[href*="comment_id="],a[href*="reply_comment_id="]')).slice(0,80);for(var i=0;i<links.length;i++){var a=links[i],name=U.T(a.innerText||a.textContent||'');if(!name||!profileIdentityFromUrl(a.href||''))continue;var info=photoCommentIdInfoV44R21R8(a.href||'');if(info.id)return {a:a,info:info};}}catch(_){}return null;}
function photoReplyParentIdV44R21R10(card){
  if(!card)return '';var rr=null;try{rr=card.getBoundingClientRect();}catch(_){}var cur=card.parentElement;for(var up=0;up<13&&cur&&cur!==document.body;up++,cur=cur.parentElement){try{
    var mains=Array.prototype.slice.call(cur.querySelectorAll('[role="article"][aria-label^="Comment by"],[role="article"][aria-label^="Comentário de"],[role="article"][aria-label^="Comentario de"]')).filter(function(x){return x!==card;});if(!mains.length)continue;mains.sort(function(a,b){return a.getBoundingClientRect().top-b.getBoundingClientRect().top;});for(var i=mains.length-1;i>=0;i--){var mr=mains[i].getBoundingClientRect();if(!rr||mr.top<=rr.top+2){var own=photoCardOwnIdV44R21R10(mains[i]);if(own&&own.info.id)return own.info.id;}}
  }catch(_){}}return '';
}

function photoAuthorAvatarV44R21R9(meta){
  var target=profileIdentityFromUrl(meta&&meta.authorURL||'');if(!target)return null;var best=null;try{Array.prototype.slice.call(document.querySelectorAll('a[href]')).slice(0,7000).forEach(function(a){
    if(!U.vis(a)||profileIdentityFromUrl(a.href||'')!==target)return;var scopes=[a,a.parentElement,a.parentElement&&a.parentElement.parentElement];scopes.forEach(function(sc){if(!sc||!sc.querySelectorAll)return;Array.prototype.slice.call(sc.querySelectorAll('img')).forEach(function(img){if(!U.vis(img))return;var r=img.getBoundingClientRect(),src=String(img.currentSrc||img.src||'');if(!/^https?:\/\//i.test(src)||r.width<24||r.height<24||r.width>220||r.height>220)return;var ratio=Math.min(r.width,r.height)/Math.max(r.width,r.height);if(ratio<.72)return;var score=r.width*r.height+(r.left>innerWidth*.45?10000:0);if(!best||score>best.score)best={url:src,width:Math.round(r.width),height:Math.round(r.height),score:score};});});
  });}catch(_){}return best;
}
function mergePhotoMetadataV44R21R9(live){
  if(!isPhotoContext())return live||{};var snap=__POST_METADATA_SNAPSHOT_V44R21R9__||__POST_METADATA_SNAPSHOT_V44R19__||{},out=mergePostHeaderMetadataV44R16(snap,live||{}),id=photoCurrentIdentityV44R21R9(),exact=photoHeaderContractV44R21R10();
  ['caption'].forEach(function(k){if(!out[k]&&snap[k])out[k]=snap[k];});
  if(exact.author)out.author=exact.author;if(exact.authorURL)out.authorURL=exact.authorURL;if(exact.authorUsername)out.authorUsername=exact.authorUsername;
  var exactIdentity=profileIdentityFromUrl(out.authorURL||'');
  if(exact.authorAvatarBound){out.authorAvatar=exact.authorAvatar;out.authorAvatarSourceUrl=exact.authorAvatarSourceUrl;out.authorAvatarHighResUrl=exact.authorAvatarHighResUrl;out.authorAvatarWidth=exact.authorAvatarWidth;out.authorAvatarHeight=exact.authorAvatarHeight;out.authorAvatarBound=true;out.authorAvatarBindingReason=exact.authorAvatarBindingReason;}
  else if(out.authorProfileIdentity&&out.authorProfileIdentity!==exactIdentity){out.authorAvatar='';out.authorAvatarSourceUrl='';out.authorAvatarHighResUrl='';out.authorAvatarBound=false;out.authorAvatarBindingReason='PHOTO_STALE_CROSS_IDENTITY_AVATAR_REJECTED';out.authorAvatarWidth=0;out.authorAvatarHeight=0;}
  if(exact.postDateText){out.postDateText=exact.postDateText;out.postDateExactText=exact.postDateExactText||exact.postDateText;out.postDateRelativeText='';out.postDateURL=exact.postDateURL||out.postDateURL||String(location.href||'');}
  if(exact.privacyText)out.privacyText=exact.privacyText;
  if(exact.locationText){out.locationText=exact.locationText;out.locationURL=exact.locationURL||'';}
  out.taggedPeople=Array.isArray(exact.taggedPeople)?exact.taggedPeople:[];out.places=Array.isArray(exact.places)?exact.places:[];out.headerStoryText=exact.headerStoryText||'';
  out.postURL=String(location.href||out.postURL||'');out.photoId=id.photoId||out.photoId||'';out.albumSetId=id.albumSetId||out.albumSetId||'';
  out.authorProfileIdentity=exactIdentity;out.authorUsername=usernameFromUrl(out.authorURL||'')||out.authorUsername||'';out.metadataSchemaVersion='POST_METADATA_V44R21R13_PHOTO_TARGET_BOUND_AVATAR_IDENTITY';out.metadataSourceContract=exact.headerContractVersion||'PHOTO_TARGET_BOUND_ALL_COMMENTS_V44R21R13';out.metadataCapturedBeforeInteractions=true;out.metadataCapturedAt=out.metadataCapturedAt||new Date().toISOString();return out;
}
function photoObservedTotalV44R21R9(h){return Number(h&&h.L1||0)+Number(h&&h.L2||0);}

function expandSeeMoreForPhoto() {
  if (!isPhotoContext()) return Promise.resolve(0);
  try {
    var btns = U.qa('[role="button"], span, div, a', document.body).map(function (el) {
      return { el: el, text: U.T(el.innerText || el.textContent || el.getAttribute('aria-label') || '') };
    }).filter(function (x) {
      return /^(See more|Ver mais)$/i.test(x.text) && U.vis(x.el);
    });
    var p = Promise.resolve();
    var clicked = 0;
    U.each(btns.slice(0, 8), function (x) {
      p = p.then(function () {
        try { x.el.scrollIntoView({ block: 'center' }); } catch (_) {}
        try {
          ['pointerdown','mousedown','pointerup','mouseup','click'].forEach(function(type){
            try { x.el.dispatchEvent(new MouseEvent(type, { bubbles:true, cancelable:true, view:window })); } catch(_e) {}
          });
          clicked++;
        } catch (_) {}
        return U.sleep(450);
      });
    });
    return p.then(function () { return U.sleep(700); }).then(function(){ return clicked; });
  } catch (e) {
    return Promise.resolve(0);
  }
}



/* ===== V44R5: fallback dos seletores da versão antiga estável ===== */
function allComments_findFilterButtonStableV44R5() {
  var root=isPhotoContext()?photoContractPanelV44R21R10():document.body;if(!root||!root.querySelectorAll)root=document.body;
  var nodes=U.qa('[role="button"],button,span,div',root),cand=[];
  U.each(nodes,function(el){if(!U.vis(el))return;var text=U.T(el.innerText||el.textContent||el.getAttribute('aria-label')||'');if(!/^(Most relevant|Mais relevantes|Principais comentários|Principais comentarios|Top comments|All comments|Todos os comentários|Todos os comentarios)$/i.test(text))return;
    if(isPhotoContext()&&root!==document.body&&!root.contains(el))return;var r;try{r=el.getBoundingClientRect();}catch(_){return;}var w=Math.round(r.width||0),h=Math.round(r.height||0);if(w<40||w>300||h<8||h>80)return;if(isPhotoContext()&&r.left<innerWidth*.45)return;cand.push({el:el,text:text,top:Math.round(r.top||0),score:(root!==document.body&&root.contains(el)?5000:0)+Math.round(r.left)});});
  cand.sort(function(a,b){return b.score-a.score||b.top-a.top;});return cand.length?cand[0]:null;
}
function allComments_findMenuItemStableV44R5() {
  var items=U.qa('[role="menuitem"],[role="option"],div,span',document.body),cand=[],fr=window.__FB_PHOTO_ALL_COMMENTS_FILTER_RECT_V44R21R13__||null;
  U.each(items,function(it){if(!U.vis(it))return;var text=U.T(it.innerText||it.textContent||it.getAttribute('aria-label')||'');if(!(/^All comments\b/i.test(text)||/^Todos os comentários\b/i.test(text)||/^Todos os comentarios\b/i.test(text)))return;
    var r;try{r=it.getBoundingClientRect();}catch(_){return;}var w=Math.round(r.width||0),h=Math.round(r.height||0);if(w<80||h<20)return;var score=0;if(isPhotoContext()&&fr){var cx=r.left+r.width/2,cy=r.top+r.height/2;if(Math.abs(cx-fr.cx)<=480&&Math.abs(cy-fr.cy)<=520)score+=4000;else score-=5000;if(r.left<innerWidth*.35)score-=4000;}cand.push({el:it,text:text,top:Math.round(r.top||0),score:score});});
  cand.sort(function(a,b){return b.score-a.score||a.top-b.top;});return cand.length?cand[0]:null;
}
/* ===== V44R3: PHOTO/POST COM MÍDIA — gate estrito e scroll terminal ===== */
function isPhotoLikePostV44R3(panel){
  if(isPhotoContext())return true;
  if(isReelContext())return false;
  panel=panel||panelRoot();
  if(!panel||!panel.querySelectorAll)return false;
  var videos=U.filter(U.qa('video',panel),U.vis);
  if(videos.length)return false;
  var large=0;
  U.each(U.qa('img,[role="img"]',panel),function(el){
    if(!U.vis(el))return;
    try{
      var r=el.getBoundingClientRect();
      if(r.width>=260&&r.height>=180)large++;
    }catch(_){}
  });
  var tx=U.T(panel.innerText||panel.textContent||'').slice(0,5000);
  var commentSurface=/All comments|Todos os comentários|Most relevant|Mais relevantes|Write a comment|Escreva um comentário|Reply|Responder|Comment|Comentar/i.test(tx);
  return large>0&&commentSurface;
}
function captureDeclaredCommentTargetV44R3(panel){
  if(isReelContext()&&__REEL_COUNTS_SNAPSHOT__&&Number(__REEL_COUNTS_SNAPSHOT__.comment||0)>=0)return Number(__REEL_COUNTS_SNAPSHOT__.comment||0);
  panel=panel||panelRoot();
  var best=0;
  function accept(v){
    v=Number(v||0);
    if(v>best&&v<10000000)best=v;
  }
  var nodes=U.qa('[aria-label],[title],a,button,span,div',panel||document.body);
  U.each(nodes.slice(0,4500),function(el){
    if(!U.vis(el))return;
    var aria=U.T((el.getAttribute&&el.getAttribute('aria-label'))||'');
    var title=U.T((el.getAttribute&&el.getAttribute('title'))||'');
    var txt=U.T(el.innerText||el.textContent||'');
    var combined=(aria+' '+title+' '+txt).slice(0,500);
    var m=combined.match(/(\d[\d.,]*\s*(?:mil|k|m)?)\s*(?:comentários|comentarios|comments)\b/i);
    if(m)accept(parseFacebookCount(m[1]));
    if(/comment|coment/i.test(aria+' '+title)){
      var n=(aria+' '+title).match(/(\d[\d.,]*\s*(?:mil|k|m)?)/i);
      if(n)accept(parseFacebookCount(n[1]));
      if(txt&&txt.length<24){
        var n2=txt.match(/^(\d[\d.,]*\s*(?:mil|k|m)?)$/i);
        if(n2)accept(parseFacebookCount(n2[1]));
      }
    }
  });
  return best;
}
function strictAllCommentsGateV44R3(){
  return isPhotoLikePostV44R3(panelRoot())||isPhotoContext();
}
function ensureAllCommentsSelected(){
  return new Promise(function(resolve){
    var filterPolls=0,maxFilterPolls=44,cycles=0,maxCycles=6,finished=false,strictPhoto=strictAllCommentsGateV44R3(),targetRoot=isPhotoContext()?photoContractPanelV44R21R10():panelRoot(),initialId=isPhotoContext()?photoRouteIdV44R21R8():'';
    function targetStillValid(){return !isPhotoContext()||photoRouteLockedV44R21R8(initialId);}
    function current(){var x=allComments_findFilterButton()||allComments_findFilterButtonStableV44R5();if(isPhotoContext()&&x&&targetRoot!==document.body&&!targetRoot.contains(x.el))return null;return x;}
    function finish(ok,reason){if(finished)return;finished=true;var now=current();window.__FB_ALL_COMMENTS_GATE__={ok:!!ok,reason:String(reason||''),cycles:cycles,strictPhoto:strictPhoto,targetBound:!!(isPhotoContext()?now&&now.rootBound!==false:true),photoRouteId:initialId,declaredTarget:Number(__DECLARED_COMMENT_TARGET_V44R3__||captureDeclaredCommentTargetV44R3(targetRoot)||0),finalText:(now&&now.text)||'',filterPath:(now&&now.el&&String(now.el.tagName||''))||''};if(ok)console.log('Gate All comments V44R21R13 aprovado:',window.__FB_ALL_COMMENTS_GATE__);else console.error('Gate All comments V44R21R13 reprovado:',window.__FB_ALL_COMMENTS_GATE__);resolve(!!ok);}
    function stopped(){return !!(window.__HUDH__&&window.__HUDH__.stop&&window.__HUDH__.stop());}
    function verifySelection(left){if(stopped()){finish(false,'USER_STOP');return;}if(!targetStillValid()){finish(false,'PHOTO_ROUTE_LOCK_VIOLATION');return;}var now=current();if(now&&allComments_isAll(now.text)){U.sleep(700).then(function(){var confirmed=current();if(confirmed&&allComments_isAll(confirmed.text))finish(true,'ALL_COMMENTS_TARGET_PANEL_CONFIRMED');else if(left>0)setTimeout(function(){verifySelection(left-1);},180);else finish(false,'ALL_COMMENTS_TARGET_PANEL_NOT_STABLE');});return;}if(left<=0){if(cycles>=maxCycles){finish(false,'ALL_COMMENTS_NOT_CONFIRMED_ON_TARGET');return;}setTimeout(waitFilter,320);return;}setTimeout(function(){verifySelection(left-1);},180);}
    function waitMenu(left){if(stopped()){finish(false,'USER_STOP');return;}if(!targetStillValid()){finish(false,'PHOTO_ROUTE_LOCK_VIOLATION');return;}var opt=allComments_findMenuItem()||allComments_findMenuItemStableV44R5();if(opt){allComments_safeClick(opt.el);verifySelection(28);return;}if(left<=0){if(cycles>=maxCycles){finish(false,'ALL_COMMENTS_MENU_NOT_FOUND_NEAR_TARGET');return;}setTimeout(waitFilter,320);return;}setTimeout(function(){waitMenu(left-1);},170);}
    function selectFilter(info){cycles++;if(window.__HUDH__&&window.__HUDH__.set)window.__HUDH__.set(4,'Selecionando Todos os comentários no painel da foto…');try{var r=info.el.getBoundingClientRect();window.__FB_PHOTO_ALL_COMMENTS_FILTER_RECT_V44R21R13__={left:r.left,top:r.top,right:r.right,bottom:r.bottom,cx:r.left+r.width/2,cy:r.top+r.height/2};}catch(_){}if(!allComments_safeClick(info.el)){if(cycles>=maxCycles){finish(false,'TARGET_FILTER_CLICK_FAILED');return;}setTimeout(waitFilter,320);return;}U.waitMut(document.body,900).then(function(){waitMenu(28);});}
    function waitFilter(){if(stopped()){finish(false,'USER_STOP');return;}if(!targetStillValid()){finish(false,'PHOTO_ROUTE_LOCK_VIOLATION');return;}targetRoot=isPhotoContext()?photoContractPanelV44R21R10():panelRoot();var info=current();if(info&&allComments_isAll(info.text)){finish(true,'ALREADY_ALL_COMMENTS_ON_TARGET_PANEL');return;}if(info&&allComments_isRelevant(info.text)){selectFilter(info);return;}filterPolls++;if(filterPolls>=maxFilterPolls){var target=Number(__DECLARED_COMMENT_TARGET_V44R3__||captureDeclaredCommentTargetV44R3(targetRoot)||0);if(strictPhoto&&target>0){finish(false,'PHOTO_TARGET_FILTER_NOT_CONFIRMED');return;}finish(true,'FILTER_NOT_EXPOSED_SMALL_OR_UNFILTERED');return;}setTimeout(waitFilter,250);}
    waitFilter();
  });
}
function photoScrollCandidatesV44R3(panel){
  var out=[],seen=[];
  function add(el,boost){
    if(!el||seen.indexOf(el)!==-1)return;seen.push(el);
    try{
      if(!U.vis(el))return;
      var ch=Number(el.clientHeight||0),sh=Number(el.scrollHeight||0);
      if(ch<120||sh<=ch+30)return;
      var cs=getComputedStyle(el),overflow=String(cs.overflowY||'');
      var score=(sh-ch)+Number(boost||0);
      if(/auto|scroll|overlay/i.test(overflow))score+=3000;
      else score+=500;
      var tx=U.T(el.innerText||el.textContent||'').slice(0,900);
      if(/All comments|Todos os comentários|Most relevant|Mais relevantes|Write a comment|Escreva um comentário|Reply|Responder/i.test(tx))score+=4500;
      if(panel&&panel!==document.body&&panel.contains&&panel.contains(el))score+=2500;
      out.push({el:el,score:score});
    }catch(_){}
  }
  var anchor=allComments_findFilterButton();
  var cur=anchor&&anchor.el?anchor.el:null,depth=0;
  while(cur&&depth<12){add(cur,6000-depth*100);if(cur===panel)break;cur=cur.parentElement;depth++;}
  var textbox=U.first(U.qa('[role="textbox"][aria-label*="oment" i],textarea[placeholder*="oment" i]',panel),U.vis);
  cur=textbox;depth=0;
  while(cur&&depth<12){add(cur,5500-depth*100);if(cur===panel)break;cur=cur.parentElement;depth++;}
  U.each([panel].concat(U.qa('*',panel)),function(el){add(el,0);});
  out.sort(function(a,b){return b.score-a.score;});
  return out.slice(0,4).map(function(x){return x.el;});
}
function scrollPhotoWaveV44R3(panel,scrollers){
  var moved=false,atBottom=true;
  U.each(scrollers,function(sc){
    try{
      var before=Number(sc.scrollTop||0),max=Math.max(0,Number(sc.scrollHeight||0)-Number(sc.clientHeight||0));
      var step=Math.max(520,Math.floor(Number(sc.clientHeight||650)*0.82));
      var next=Math.min(max,before+step);
      if(max-before<Math.max(900,step*1.5))next=max;
      if(typeof sc.scrollTo==='function')sc.scrollTo({top:next,behavior:'auto'});else sc.scrollTop=next;
      try{sc.dispatchEvent(new WheelEvent('wheel',{bubbles:true,cancelable:true,deltaY:1000,deltaMode:0}));}catch(_){}
      if(Math.abs(Number(sc.scrollTop||0)-before)>2)moved=true;
      if(Number(sc.scrollTop||0)<Math.max(0,max-8))atBottom=false;
    }catch(_){atBottom=false;}
  });
  var rows=U.qa('div[role="article"],li[aria-posinset]',panel);
  if(rows.length){
    var last=rows[rows.length-1];
    try{last.scrollIntoView({block:'end',inline:'nearest'});moved=true;}catch(_){}
  }
  return {moved:moved,atBottom:atBottom};
}
function progressiveHarvestPhotoV44R3(panel){
  return new Promise(function(resolve){
    var bag=new Map(),waves=0,lastTotal=0,stable=0,scrollersCache=[];
    var start=Date.now(),target=Number(__DECLARED_COMMENT_TARGET_V44R3__||captureDeclaredCommentTargetV44R3(panel)||0);
    var MAX_WAVES=220,MAX_STABLE=24,MAX_MS=180000;
    function snapshot(){
      mergeInto(bag,collectSlice(panel));
      var s=summarize(bag);
      if(window.__HUDH__&&window.__HUDH__.setStats)window.__HUDH__.setStats(s.L1,s.L2);
      return s;
    }
    function finish(reason){
      var s=snapshot(),total=s.L1+s.L2;
      s.collectionAudit={
        mode:'PHOTO_DIALOG_TERMINAL_V44R3',
        declaredTarget:target,
        collectedTotal:total,
        targetReached:target>0?total>=target:true,
        waves:waves,
        stableCycles:stable,
        terminalReason:reason,
        elapsedMs:Date.now()-start
      };
      resolve(s);
    }
    function step(){
      if(window.__HUDH__&&window.__HUDH__.stop&&window.__HUDH__.stop()){finish('USER_STOP');return;}
      if(waves>=MAX_WAVES){finish('MAX_WAVES');return;}
      if(Date.now()-start>=MAX_MS){finish('MAX_TIME');return;}
      waves++;
      if(window.__HUDH__&&window.__HUDH__.inc)window.__HUDH__.inc();
      if(window.__HUDH__&&window.__HUDH__.set)window.__HUDH__.set(Math.min(68,8+Math.round(waves*.25)),'Foto/post: carregando todos os comentários…');
      clickAllUntilExhausted(panel,24).then(function(){
        var before=snapshot(),beforeTotal=before.L1+before.L2;
        if(!scrollersCache.length||waves===1||waves%6===0)scrollersCache=photoScrollCandidatesV44R3(panel);
        var mv=scrollPhotoWaveV44R3(panel,scrollersCache);
        return U.waitMut(panel,1200).then(function(){return U.sleep(260);}).then(function(){
          var after=snapshot(),total=after.L1+after.L2;
          if(total>lastTotal||total>beforeTotal){lastTotal=total;stable=0;}else stable++;
          var more=findButtons(panel).length;
          if(target>0&&total>=target){finish('DECLARED_TARGET_REACHED');return true;}
          if(stable>=MAX_STABLE&&mv.atBottom&&!more){finish('STABLE_BOTTOM_NO_MORE_CONTROLS');return true;}
          return false;
        });
      }).then(function(done){if(!done)step();}).catch(function(e){
        console.warn('Erro no scroll terminal de foto V44R3:',e);finish('ERROR_SAFE_PARTIAL');
      });
    }
    snapshot();U.sleep(350).then(step);
  });
}



/* V44R21R4 — terminal PHOTO com rebinding da superfície virtualizada. */
function progressiveHarvestPhotoV44R21R4(initialPanel){
  return new Promise(function(resolve){
    var bag=new Map(),waves=0,lastTotal=-1,stable=0,noRowsWaves=0,noMove=0,started=Date.now(),routeId=photoRouteIdV44R21R8(),target=photoStrictDeclaredTargetV44R21R9(__POST_COUNTS_SNAPSHOT__),MAX_WAVES=90,MAX_STABLE_BOTTOM=9,MAX_NO_MOVE=16,MAX_MS=95000,lastMove={moved:false,atBottom:false,kind:'none',before:0,after:0,max:0};
    function snapshot(){var slice=photoCollectSliceV44R21R8(document);mergeInto(bag,slice);var s=summarize(bag);if(window.__HUDH__&&window.__HUDH__.setStats)window.__HUDH__.setStats(s.L1,s.L2);return s;}
    function surfaceDiag(){var d=photoSurfaceDiagnosticsV44R21R8(document);d.lastMove=lastMove;d.scrollCandidates=photoScrollCandidatesV44R21R8().map(function(el){try{return {kind:String(el.__FB_PHOTO_SCROLL_KIND_V44R21R11||''),scrollTop:Number(el.scrollTop||0),scrollHeight:Number(el.scrollHeight||0),clientHeight:Number(el.clientHeight||0)};}catch(_){return {};}});return d;}
    function finish(reason){var s=snapshot(),total=s.L1+s.L2;s.collectionAudit={mode:'PHOTO_TARGET_BOUND_EXHAUSTIVE_TERMINAL_V44R21R13',declaredTarget:target,collectedTotal:total,targetReached:target>0?total>=target:true,waves:waves,stableCycles:stable,noRowsWaves:noRowsWaves,noMoveCycles:noMove,terminalReason:reason,elapsedMs:Date.now()-started,routeLocked:photoRouteLockedV44R21R8(routeId),targetBasis:'POST_METRIC_NOT_RELATIVE_AGE',surfaceObserved:!!findPhotoCommentSurfaceV44R21R8(),surfaceDiagnostics:surfaceDiag()};resolve(s);}
    function move(){var sc=photoScrollCandidatesV44R21R8(),moved=false,allBottom=true,best=null;
      for(var i=0;i<sc.length;i++){var el=sc[i];try{var before=Number(el.scrollTop||0),max=Math.max(0,Number(el.scrollHeight||0)-Number(el.clientHeight||0));if(before<max-6){best=el;allBottom=false;break;}}catch(_){}}
      if(!best&&sc.length)best=sc[0];
      if(best){try{var before=Number(best.scrollTop||0),max=Math.max(0,Number(best.scrollHeight||0)-Number(best.clientHeight||0)),step=Math.max(360,Math.floor(Number(best.clientHeight||600)*.72)),next=Math.min(max,before+step);if(best===document.scrollingElement||best===document.documentElement){window.scrollTo(0,next);}else if(best.scrollTo)best.scrollTo({top:next,behavior:'auto'});else best.scrollTop=next;var after=Number(best.scrollTop||0);moved=Math.abs(after-before)>2;allBottom=after>=max-6;lastMove={moved:moved,atBottom:allBottom,kind:String(best.__FB_PHOTO_SCROLL_KIND_V44R21R11||''),before:before,after:after,max:max};}catch(_){allBottom=false;}}
      if(!moved){var cards=photoCommentCardsV44R21R8(document);if(cards.length){try{var prevY=window.scrollY;cards[cards.length-1].scrollIntoView({block:'end',inline:'nearest',behavior:'auto'});window.scrollBy(0,Math.max(160,Math.floor(innerHeight*.28)));moved=Math.abs(window.scrollY-prevY)>2;lastMove={moved:moved,atBottom:false,kind:'last_card_plus_window',before:prevY,after:window.scrollY,max:Number((document.scrollingElement&&document.scrollingElement.scrollHeight)||0)-innerHeight};}catch(_){}}}
      return {moved:moved,atBottom:allBottom};
    }
    function step(){
      if(window.__HUDH__&&window.__HUDH__.stop&&window.__HUDH__.stop()){finish('USER_STOP');return;}
      if(!photoRouteLockedV44R21R8(routeId)){finish('PHOTO_ROUTE_LOCK_VIOLATION');return;}
      if(waves>=MAX_WAVES){finish('MAX_WAVES_SAFE_PARTIAL');return;}
      if(Date.now()-started>=MAX_MS){finish('MAX_TIME_SAFE_PARTIAL');return;}
      waves++;var clicks=clickPhotoReplyControlsV44R21R8(),before=snapshot(),beforeTotal=before.L1+before.L2;
      if(window.__HUDH__&&window.__HUDH__.inc)window.__HUDH__.inc();if(window.__HUDH__&&window.__HUDH__.set)window.__HUDH__.set(Math.min(69,22+Math.round(waves*.52)),'Foto: '+beforeTotal+'/'+(target||'?')+' registros; carregando comentários e respostas…');
      if(target>0&&beforeTotal>=target){finish('DECLARED_TARGET_REACHED');return;}
      var mv=move();if(mv.moved)noMove=0;else noMove++;
      U.waitMut(document.body,1250).then(function(){return U.sleep(clicks?850:500);}).then(function(){var after=snapshot(),total=after.L1+after.L2;if(total>lastTotal||total>beforeTotal){lastTotal=total;stable=0;noRowsWaves=0;}else{stable++;if(total===0)noRowsWaves++;}
        if(target>0&&total>=target){finish('DECLARED_TARGET_REACHED');return;}
        var moreControls=0;try{moreControls=Array.prototype.slice.call(document.querySelectorAll('button,[role="button"],a')).filter(function(el){if(!U.vis(el))return false;var z=U.T(el.getAttribute('aria-label')||el.innerText||el.textContent||'');return /(?:View|See|Show|Load|Ver|Mostrar|Carregar).*(?:comments?|coment[aá]rios?|repl(?:y|ies)|respostas?)/i.test(z);}).length;}catch(_){}
        if(total===0&&noRowsWaves>=8&&Date.now()-started>=12000){finish(photoCommentAuthorAnchorsV44R21R8(document).length?'PHOTO_AUTHOR_LINKS_WITHOUT_CONTENT':'PHOTO_COMMENT_IDENTITIES_NOT_MATERIALIZED');return;}
        if(mv.atBottom&&stable>=MAX_STABLE_BOTTOM&&!moreControls){finish('STABLE_AT_REAL_BOTTOM_NO_MORE_CONTROLS');return;}
        if(noMove>=MAX_NO_MOVE&&stable>=MAX_NO_MOVE&&Date.now()-started>=22000){finish('NO_SCROLL_PROGRESS_SAFE_PARTIAL');return;}
        setTimeout(step,180);
      }).catch(function(e){console.warn('Erro no terminal PHOTO V44R21R11:',e);finish('ERROR_SAFE_PARTIAL');});
    }
    var first=snapshot(),firstTotal=first.L1+first.L2;if(target>0&&firstTotal>=target){finish('DECLARED_TARGET_REACHED_INITIAL');return;}U.sleep(300).then(step);
  });
}


/* V44R21R16 — terminal exclusivo de POST.
   Corrige dois falsos positivos da V44R21R15:
   (1) ausência de scroller era tratada como "fim";
   (2) o coletor não reabria o diálogo alvo após remount do React.
   PHOTO e REEL não passam por este motor. */
function postRouteLockedV44R21R16(key){return !key||currentPostRouteKeyV44R21R16()===String(key);}
function postCommentEvidenceV44R21R16(el){
  if(!el||!el.querySelectorAll)return 0;var n=0;
  try{n+=el.querySelectorAll('div[role="article"],li[aria-posinset],[aria-label^="Comment by" i],[aria-label^="Reply by" i],a[href*="comment_id="],a[href*="reply_comment_id="]').length*5;}catch(_){}
  try{var tx=t(el.innerText||el.textContent||'').slice(0,6000);if(/Write a comment|Comment as|Escreva um coment[aá]rio|Comentar como/i.test(tx))n+=20;if(/All comments|Todos os coment[aá]rios|Most relevant|Mais relevantes/i.test(tx))n+=12;}catch(_){}
  return n;
}
function postScrollCandidatesV44R21R16(panel){
  panel=findPostTargetDialogV44R21R16()||panel;var out=[],seen=[];
  function add(el,base,kind){
    if(!el||seen.indexOf(el)>=0||!visible(el)||postOwnedUiV44R21R16(el))return;seen.push(el);
    try{
      var r=el.getBoundingClientRect(),range=Math.max(0,Number(el.scrollHeight||0)-Number(el.clientHeight||0)),cs=getComputedStyle(el),score=Number(base||0)+Math.min(5000,range),ev=postCommentEvidenceV44R21R16(el);
      if(r.width<260||r.height<180)return;
      if(panel){
        var pr=panel.getBoundingClientRect();
        if(el===panel)score+=5000;
        else if(panel.contains&&panel.contains(el))score+=3500;
        else if(el.contains&&el.contains(panel)){
          if(r.width<=pr.width*1.45&&r.height<=Math.max(pr.height*1.55,innerHeight*1.35))score+=2600;
          else score-=2400;
        }else return;
      }
      if(/auto|scroll|overlay/i.test(String(cs.overflowY||'')))score+=2300;
      if(ev>0)score+=Math.min(4200,ev*55);
      if(range<=20&&el!==panel)return;
      out.push({el:el,score:score,kind:kind||'candidate',range:range});
    }catch(_){}
  }
  if(panel){
    add(panel,7000,'target_dialog');
    var cur=panel;for(var a=0;a<9&&cur&&cur!==document.body;a++,cur=cur.parentElement)add(cur,5200-a*280,'dialog_ancestor');
    try{
      var seeds=Array.prototype.slice.call(panel.querySelectorAll('div[role="article"],li[aria-posinset],[aria-label^="Comment by" i],[aria-label^="Reply by" i],div[role="textbox"],textarea')).slice(0,1800);
      seeds.forEach(function(seed){var x=seed;for(var i=0;i<10&&x&&x!==panel.parentElement;i++,x=x.parentElement)add(x,6200-i*260,'comment_chain');});
      Array.prototype.slice.call(panel.querySelectorAll('*')).slice(0,7000).forEach(function(el){try{var range=Math.max(0,Number(el.scrollHeight||0)-Number(el.clientHeight||0));if(range>30)add(el,1600,'dialog_descendant');}catch(_){}});
    }catch(_){}
  }
  out.sort(function(a,b){return b.score-a.score;});
  return out.slice(0,6);
}
function postMoreControlsV44R21R16(panel,click){
  var found=[],seen=[];if(!panel)return found;
  try{
    Array.prototype.slice.call(panel.querySelectorAll('button,[role="button"],a,[tabindex]')).slice(0,5000).forEach(function(el){
      if(!visible(el)||seen.indexOf(el)>=0)return;var z=t((el.getAttribute&&el.getAttribute('aria-label')||'')+' '+(el.getAttribute&&el.getAttribute('title')||'')+' '+(el.innerText||el.textContent||''));
      if(!/(?:View|See|Show|Load|Ver|Mostrar|Carregar).{0,55}(?:comments?|coment[aá]rios?|repl(?:y|ies)|respostas?)/i.test(z))return;
      if(/All comments|Todos os coment[aá]rios|Most relevant|Mais relevantes|See translation|Ver tradu[cç][aã]o/i.test(z))return;
      seen.push(el);found.push(el);
    });
  }catch(_){}
  if(click)found.slice(0,30).forEach(function(el){try{safeClick(el);}catch(_){}});
  return found;
}
function postMoveWaveV44R21R16(panel,candidates,wave){
  var moved=false,scrollableSeen=false,allBottom=true,fullProbe=false,diag=[];
  (candidates||[]).slice(0,4).forEach(function(x){
    var sc=x.el||x;try{
      var before=Number(sc.scrollTop||0),max=Math.max(0,Number(sc.scrollHeight||0)-Number(sc.clientHeight||0)),client=Math.max(300,Number(sc.clientHeight||600));
      if(max<=0){diag.push({kind:x.kind||'',before:before,after:before,max:max});return;}
      scrollableSeen=true;var next;
      if(wave%6===0||max-before<client*.95){next=max;fullProbe=true;}else next=Math.min(max,before+Math.max(520,Math.floor(client*.78)));
      if(wave%12===0&&before>=max-8){try{sc.scrollTop=Math.max(0,max-Math.floor(client*.38));sc.dispatchEvent(new Event('scroll',{bubbles:true}));}catch(_){}}
      if(typeof sc.scrollTo==='function')sc.scrollTo({top:next,behavior:'auto'});else sc.scrollTop=next;
      try{sc.dispatchEvent(new Event('scroll',{bubbles:true}));sc.dispatchEvent(new WheelEvent('wheel',{bubbles:true,cancelable:true,deltaY:1200,deltaMode:0}));}catch(_){}
      var after=Number(sc.scrollTop||0);if(Math.abs(after-before)>2)moved=true;if(after<max-8)allBottom=false;
      diag.push({kind:x.kind||'',before:before,after:after,max:max});
    }catch(_){allBottom=false;}
  });
  try{
    var rows=panel?Array.prototype.slice.call(panel.querySelectorAll('div[role="article"],li[aria-posinset],[aria-label^="Comment by" i],[aria-label^="Reply by" i]')):[];
    if(rows.length){
      var last=rows[rows.length-1],br=last.getBoundingClientRect();last.scrollIntoView({block:'end',inline:'nearest',behavior:'auto'});
      try{last.dispatchEvent(new WheelEvent('wheel',{bubbles:true,cancelable:true,deltaY:1200,deltaMode:0}));}catch(_){}
      var ar=last.getBoundingClientRect();if(Math.abs(Number(ar.bottom||0)-Number(br.bottom||0))>2)moved=true;
    }
    if(panel){try{panel.dispatchEvent(new WheelEvent('wheel',{bubbles:true,cancelable:true,deltaY:1200,deltaMode:0}));}catch(_){}}
  }catch(_){}
  return {moved:moved,atBottom:scrollableSeen&&allBottom,scrollableSeen:scrollableSeen,fullProbe:fullProbe,diagnostics:diag};
}
function progressiveHarvestPostV44R21R16(initialPanel){
  return new Promise(function(resolve){
    var routeKey=currentPostRouteKeyV44R21R16(),panel=findPostTargetDialogV44R21R16()||initialPanel||panelRoot(),bag=new Map(),waves=0,lastTotal=-1,stable=0,bottomStable=0,noScroller=0,fullProbes=0,started=Date.now(),target=postDeclaredCommentTargetV44R21R16(panel,__POST_COUNTS_SNAPSHOT__),lastGrowthAt=Date.now(),lastMove=null;
    var MAX_WAVES=220,MAX_MS=180000,MIN_BOTTOM_MS=60000,MAX_BOTTOM_STABLE=24,MAX_STABLE=34;
    function reacquire(){var p=findPostTargetDialogV44R21R16();if(p)panel=p;return panel;}
    function snapshot(){var p=reacquire();if(p)mergeInto(bag,collectSlice(p));var s=summarize(bag);if(window.__HUDH__&&window.__HUDH__.setStats)window.__HUDH__.setStats(s.L1,s.L2);return s;}
    function finish(reason){var s=snapshot(),total=s.L1+s.L2;s.collectionAudit={mode:'POST_TARGET_DIALOG_EXHAUSTIVE_V44R21R16',declaredTarget:target,collectedTotal:total,targetReached:target>0?total>=target:true,waves:waves,stableCycles:stable,bottomStableCycles:bottomStable,noScrollerCycles:noScroller,fullBottomProbes:fullProbes,terminalReason:reason,elapsedMs:Date.now()-started,routeLocked:postRouteLockedV44R21R16(routeKey),targetDialogObserved:!!findPostTargetDialogV44R21R16(),targetDialogScore:Number(panel&&panel.__FB_POST_TARGET_DIALOG_SCORE_V44R21R16__||0),lastMove:lastMove};resolve(s);}
    function step(){
      if(window.__HUDH__&&window.__HUDH__.stop&&window.__HUDH__.stop()){finish('USER_STOP');return;}
      if(!postRouteLockedV44R21R16(routeKey)){finish('POST_ROUTE_LOCK_VIOLATION');return;}
      if(waves>=MAX_WAVES){finish('MAX_WAVES_SAFE_PARTIAL');return;}
      if(Date.now()-started>=MAX_MS){finish('MAX_TIME_SAFE_PARTIAL');return;}
      waves++;var p=reacquire();
      if(!p){setTimeout(step,450);return;}
      if(window.__HUDH__&&window.__HUDH__.inc)window.__HUDH__.inc();
      var before=snapshot(),beforeTotal=before.L1+before.L2;
      if(window.__HUDH__&&window.__HUDH__.set)window.__HUDH__.set(Math.min(92,22+Math.round(waves*.31)),'Post: '+beforeTotal+'/'+(target||'?')+' comentários e respostas; percorrendo o diálogo correto…');
      if(target>0&&beforeTotal>=target){finish('DECLARED_TARGET_REACHED_INITIAL');return;}
      var custom=postMoreControlsV44R21R16(p,true);
      clickAllUntilExhausted(p,60).then(function(){
        var cands=postScrollCandidatesV44R21R16(p),mv=postMoveWaveV44R21R16(p,cands,waves);lastMove=mv;if(mv.fullProbe)fullProbes++;if(!mv.scrollableSeen)noScroller++;else noScroller=0;
        return U.waitMut(p,1450).then(function(){return U.sleep(custom.length?800:420);}).then(function(){
          var after=snapshot(),total=after.L1+after.L2,more=postMoreControlsV44R21R16(p,false).length+findButtons(p).length,grew=total>lastTotal||total>beforeTotal;
          if(grew){lastTotal=total;lastGrowthAt=Date.now();stable=0;bottomStable=0;}else{stable++;if(mv.atBottom&&!more)bottomStable++;else bottomStable=0;}
          if(target>0&&total>=target){finish('DECLARED_TARGET_REACHED');return true;}
          var elapsed=Date.now()-started,strongBottom=mv.scrollableSeen&&bottomStable>=MAX_BOTTOM_STABLE&&stable>=MAX_BOTTOM_STABLE&&fullProbes>=3&&elapsed>=MIN_BOTTOM_MS;
          if(strongBottom){finish('CONFIRMED_TARGET_DIALOG_BOTTOM_NO_MORE_CONTROLS');return true;}
          if(stable>=MAX_STABLE&&elapsed>=90000&&Date.now()-lastGrowthAt>=45000&&fullProbes>=4){finish('NO_GROWTH_AFTER_EXHAUSTIVE_POST_PROBES');return true;}
          return false;
        });
      }).then(function(done){if(!done)setTimeout(step,160);}).catch(function(e){console.warn('POST V44R21R16:',e);if(Date.now()-started>90000)finish('ERROR_SAFE_PARTIAL');else setTimeout(step,500);});
    }
    snapshot();U.sleep(300).then(step);
  });
}


/* ===== V44R5: motor antigo estável como primeira passagem, com verificação terminal aditiva ===== */
function progressiveHarvestStableVerifiedV44R5(panel){
  var startedAt=Date.now();
  var target=Math.max(
    Number(__DECLARED_COMMENT_TARGET_V44R3__||0),
    Number(captureDeclaredCommentTargetV44R3(panel)||0),
    Number(__POST_COUNTS_SNAPSHOT__&&__POST_COUNTS_SNAPSHOT__.comment||0)
  );
  return progressiveHarvest(panel).then(function(stableResult){
    var bag=new Map();mergeInto(bag,stableResult||{rows:[]});
    var stableSnap=summarize(bag),stableTotal=stableSnap.L1+stableSnap.L2;
    function attach(s,reason,recoveryWaves,stableCycles){
      var total=s.L1+s.L2;
      s.collectionAudit={
        mode:'STABLE_V111_PROGRESSIVE_HARVEST_PLUS_VERIFICATION_V44R5',
        primaryEngine:'progressiveHarvest_v1.1.1_exact',
        stableEngineInitialTotal:stableTotal,
        declaredTarget:target,
        collectedTotal:total,
        targetReached:target>0?total>=target:true,
        recoveryWaves:Number(recoveryWaves||0),
        stableCycles:Number(stableCycles||0),
        terminalReason:String(reason||''),
        elapsedMs:Date.now()-startedAt
      };
      return s;
    }
    if(target<=0)return attach(stableSnap,'STABLE_ENGINE_NO_DECLARED_TARGET',0,0);
    if(stableTotal>=target)return attach(stableSnap,'STABLE_ENGINE_DECLARED_TARGET_REACHED',0,0);
    return new Promise(function(resolve){
      var waves=0,stable=0,bottomStable=0,lastTotal=stableTotal,lastGrowthAt=Date.now();
      var MAX_WAVES=120,MAX_STABLE=18,MAX_BOTTOM_STABLE=8,MAX_MS=150000,MAX_NO_GROWTH_MS=28000,scrollers=[];
      function refreshScrollers(){
        var all=[];
        function add(x){if(x&&all.indexOf(x)<0)all.push(x);}
        U.each(getScrollers(panel)||[],add);
        U.each(photoScrollCandidatesV44R3(panel)||[],add);
        var doc=document.scrollingElement||document.documentElement||document.body;
        if(!all.length||panel===document.body)add(doc);
        scrollers=all;
      }
      function snapshot(){mergeInto(bag,collectSlice(panel));var x=summarize(bag);if(window.__HUDH__&&window.__HUDH__.setStats)window.__HUDH__.setStats(x.L1,x.L2);return x;}
      function finish(reason){
        var out=attach(snapshot(),reason,waves,stable);
        if(out&&out.collectionAudit)out.collectionAudit.bottomStableCycles=bottomStable;
        resolve(out);
      }
      function step(){
        if(window.__HUDH__&&window.__HUDH__.stop&&window.__HUDH__.stop()){finish('USER_STOP');return;}
        if(waves>=MAX_WAVES){finish('RECOVERY_MAX_WAVES');return;}
        if(Date.now()-startedAt>=MAX_MS){finish('RECOVERY_MAX_TIME');return;}
        waves++;
        if(!scrollers.length||waves===1||waves%5===0)refreshScrollers();
        if(window.__HUDH__&&window.__HUDH__.set)window.__HUDH__.set(Math.min(92,68+Math.round(waves*.12)),'Complementando comentários com o motor estável…');
        clickAllUntilExhausted(panel,40).then(function(){
          var before=snapshot(),beforeTotal=before.L1+before.L2,atBottom=true,moved=false,scrollableSeen=false,bottomSeen=false;
          U.each(scrollers,function(sc){
            try{
              var beforeTop=Number(sc.scrollTop||0),max=Math.max(0,Number(sc.scrollHeight||0)-Number(sc.clientHeight||0));
              if(max<=0)return;
              scrollableSeen=true;
              var stepPx=Math.max(600,Math.floor(Number(sc.clientHeight||650)*.72));
              var next=Math.min(max,beforeTop+stepPx);
              if(max-beforeTop<stepPx*1.4)next=max;
              if(typeof sc.scrollTo==='function')sc.scrollTo({top:next,behavior:'auto'});else sc.scrollTop=next;
              try{sc.dispatchEvent(new WheelEvent('wheel',{bubbles:true,cancelable:true,deltaY:900,deltaMode:0}));}catch(_){}
              var afterTop=Number(sc.scrollTop||0);
              if(Math.abs(afterTop-beforeTop)>2)moved=true;
              if(afterTop>=max-8)bottomSeen=true;
            }catch(_){atBottom=false;}
          });
          atBottom=!scrollableSeen||bottomSeen;
          var rows=U.qa('div[role="article"],li[aria-posinset]',panel);
          if(rows.length){
            try{
              var lastRow=rows[rows.length-1],beforeRect=lastRow.getBoundingClientRect?lastRow.getBoundingClientRect():null;
              lastRow.scrollIntoView({block:'end',inline:'nearest'});
              var afterRect=lastRow.getBoundingClientRect?lastRow.getBoundingClientRect():null;
              if(beforeRect&&afterRect&&Math.abs(Number(afterRect.bottom||0)-Number(beforeRect.bottom||0))>2)moved=true;
            }catch(_){}
          }
          return U.waitMut(panel,1200).then(function(){return U.sleep(260);}).then(function(){
            var after=snapshot(),total=after.L1+after.L2,more=findButtons(panel).length,gap=Math.max(0,target-total);
            var grew=total>lastTotal||total>beforeTotal;
            if(grew){
              lastTotal=total;lastGrowthAt=Date.now();stable=0;bottomStable=0;
            }else{
              stable++;
              if(atBottom&&!more)bottomStable++;else bottomStable=0;
            }
            if(total>=target){finish('RECOVERY_DECLARED_TARGET_REACHED');return true;}
            if(gap<=1&&bottomStable>=5){finish('RECOVERY_DECLARED_GAP_STABLE_BOTTOM_NO_MORE_CONTROLS');return true;}
            if(bottomStable>=MAX_BOTTOM_STABLE){finish('RECOVERY_STABLE_BOTTOM_NO_MORE_CONTROLS');return true;}
            if(stable>=MAX_STABLE&&atBottom&&!more){finish('RECOVERY_STABLE_BOTTOM_NO_MORE_CONTROLS');return true;}
            if(atBottom&&!more&&Date.now()-lastGrowthAt>=MAX_NO_GROWTH_MS){finish('RECOVERY_NO_GROWTH_BOTTOM_NO_MORE_CONTROLS');return true;}
            return false;
          });
        }).then(function(done){if(!done)step();}).catch(function(e){console.warn('Recuperação V44R5:',e);finish('RECOVERY_ERROR_SAFE_PARTIAL');});
      }
      step();
    });
  });
}



/* V44R21R4 — REACTION ENGINE V2.
   Motor substitutivo, context-bound e auditável. Ele distingue o gatilho da
   postagem dos gatilhos de reações em comentários, revalida cada troca de aba,
   evita reaproveitar linhas obsoletas da aba anterior e identifica limitações
   de visibilidade impostas pelo próprio Facebook. */
var __POST_INTERACTIONS_SNAPSHOT_V44R21R4__=null;
function reactionKindV44R21R4(raw){
  var s=t(raw).toLowerCase();try{s=s.normalize('NFD').replace(/[\u0300-\u036f]/g,'');}catch(_){}
  if(/(?:^|\b)(?:like|curtir|curtiu)(?:\b|$)|👍/i.test(s))return {code:'LIKE',label:'Curtir',emoji:'👍'};
  if(/(?:^|\b)(?:love|amei|amor)(?:\b|$)|❤|❤️/i.test(s))return {code:'LOVE',label:'Amei',emoji:'❤️'};
  if(/(?:^|\b)(?:care|forca|solidariedade)(?:\b|$)|🥰/i.test(s))return {code:'CARE',label:'Força',emoji:'🥰'};
  if(/(?:^|\b)(?:haha|risada|riso)(?:\b|$)|😂|😆/i.test(s))return {code:'HAHA',label:'Haha',emoji:'😂'};
  if(/(?:^|\b)(?:wow|uau)(?:\b|$)|😮|😯/i.test(s))return {code:'WOW',label:'Uau',emoji:'😮'};
  if(/(?:^|\b)(?:sad|triste)(?:\b|$)|😢/i.test(s))return {code:'SAD',label:'Triste',emoji:'😢'};
  if(/(?:^|\b)(?:angry|grr|raiva)(?:\b|$)|😡/i.test(s))return {code:'ANGRY',label:'Grr',emoji:'😡'};
  return {code:'REACTION',label:t(raw)||'Reação',emoji:'•'};
}
function reactionTriggerInfoV44R21R4(el){
  if(!el)return null;var vals=[];try{vals=[el.getAttribute('aria-label'),el.getAttribute('title'),el.innerText,el.textContent];Array.prototype.slice.call(el.querySelectorAll('[aria-label],[title],img[alt],span')).slice(0,30).forEach(function(x){vals.push(x.getAttribute&&x.getAttribute('aria-label'));vals.push(x.getAttribute&&x.getAttribute('title'));vals.push(x.getAttribute&&x.getAttribute('alt'));});}catch(_){}
  var label=t(vals.filter(Boolean).join(' '));if(!label||label.length>400)return null;if(/^(?:like|curtir|unlike|descurtir)$/i.test(label))return null;
  var typed=label.match(/(?:show\s+)?([\d.,]+\s*(?:[KkMmBb]|mil|mi|bi)?)\s*(?:people|person|pessoas?)?.{0,45}(?:reacted\s+with\s+)?(Like|Love|Care|Haha|Wow|Sad|Angry|Curtir|Amei|Força|Forca|Uau|Triste|Grr)/i)||label.match(/(Like|Love|Care|Haha|Wow|Sad|Angry|Curtir|Amei|Força|Forca|Uau|Triste|Grr)\s*:\s*([\d.,]+\s*(?:[KkMmBb]|mil|mi|bi)?)/i);
  if(typed){var first=/^\d/.test(typed[1]),rawType=first?typed[2]:typed[1],rawCount=first?typed[1]:typed[2],rk=reactionKindV44R21R4(rawType);return {label:label,type:rk.code,reactionLabel:rk.label,emoji:rk.emoji,count:Number(parseFacebookCount(rawCount)||0),mode:'typed'};}
  if(/(?:see|view|show).{0,35}(?:who|people).{0,35}react|people\s+reacted|reactions?|rea[cç][oõ]es?|quem\s+reagiu|pessoas\s+que\s+reagiram/i.test(label)){
    var m=label.match(/([\d.,]+\s*(?:[KkMmBb]|mil|mi|bi)?)/i);return {label:label,type:'ALL',reactionLabel:'Todas',emoji:'•',count:m?Number(parseFacebookCount(m[1])||0):0,mode:'all'};
  }
  return null;
}
function interactionReservedRouteV44R21R4(pathname){var p=String(pathname||'').replace(/^\/+|\/+$/g,'').split('/')[0].toLowerCase();return !!({stories:1,story:1,'story.php':1,watch:1,reel:1,reels:1,photo:1,photos:1,videos:1,posts:1,groups:1,events:1,pages:1,marketplace:1,gaming:1,messages:1,notifications:1,settings:1,help:1,privacy:1,ads:1,login:1,share:1,search:1,people:1,hashtag:1,permalink:1,'permalink.php':1,plugins:1,business:1,home:1,friends:1,followers:1,following:1}[p]);}
function interactionProfileUrlV44R21R4(raw){try{var x=new URL(String(raw||''),location.href);if(x.protocol!=='https:'||!/(^|\.)facebook\.com$/i.test(x.hostname))return '';if(/\/profile\.php$/i.test(x.pathname)){var id=x.searchParams.get('id');return id?'https://www.facebook.com/profile.php?id='+encodeURIComponent(id):'';}var parts=x.pathname.split('/').filter(Boolean);if(parts[0]==='people'&&parts.length>=3&&/^\d+$/.test(parts[parts.length-1]))return 'https://www.facebook.com/profile.php?id='+encodeURIComponent(parts[parts.length-1]);if(interactionReservedRouteV44R21R4(x.pathname))return '';return canonicalProfilePageV44R3(x.href);}catch(_){return '';}}
function interactionCommentAncestorV44R21R4(el,surface){
  var cur=el;for(var i=0;i<10&&cur&&cur!==document.body&&cur!==surface;i++,cur=cur.parentElement){try{
    var aria=t(cur.getAttribute&&cur.getAttribute('aria-label')||''),ownId=String(cur.getAttribute&& (cur.getAttribute('data-commentid')||cur.getAttribute('data-comment-id')||cur.getAttribute('data-reply-id'))||''),hasId=!!cur.querySelector('a[href*="comment_id="],a[href*="reply_comment_id="]'),tx=t(cur.innerText||cur.textContent||'').slice(0,900),r=cur.getBoundingClientRect(),compact=Number(r.height||0)>0&&Number(r.height||0)<=520&&Number(r.width||0)<=900;
    if(/^(?:Comment|Reply) by |^(?:Comentário|Resposta) de /i.test(aria)||ownId)return cur;
    if(compact&&hasId&&tx.length<=850&&/\b(?:Reply|Responder|Like|Curtir)\b/i.test(tx))return cur;
  }catch(_){} }
  return null;
}
function reactionTriggerScoreV44R21R4(el,info,declaredTotal,surface){
  if(!el||!info||!visible(el))return -99999;if(interactionCommentAncestorV44R21R4(el,surface))return -50000;var score=info.mode==='typed'?600:520,r;try{r=el.getBoundingClientRect();}catch(_){r={width:0,height:0,top:0};}
  if(String(el.getAttribute&&el.getAttribute('role')||'').toLowerCase()==='button')score+=180;if(el.tagName&&/^(BUTTON|A)$/i.test(el.tagName))score+=90;if(r.width>=12&&r.height>=12&&r.width<=420&&r.height<=110)score+=60;
  var declared=Number(declaredTotal||0),count=Number(info.count||0);if(declared>0&&count>0){var gap=Math.abs(declared-count);if(gap===0)score+=9000;else score+=Math.max(-4500,2400-gap*35);if(count<declared*.15)score-=2200;}if(surface&&surface.contains&&surface.contains(el))score+=700;
  try{var p=el;for(var i=0;i<8&&p&&p!==document.body;i++,p=p.parentElement){if(p===surface){score+=400;break;}var tx=t(p.innerText||p.textContent||'').slice(0,700);if(/\b(?:Comment|Comentar|Share|Compartilhar)\b/i.test(tx)&&/\d/.test(tx)){score+=220;break;}}}catch(_){}
  return score;
}
/* V44R21R6 — em Reels, o número de reações costuma ser irmão do botão
   Like e não pertence ao mesmo elemento aria-label. O V2 antigo só analisava
   um elemento por vez e, por isso, devolvia TRIGGER_NOT_OBSERVED. */
function reelReactionCountNodesV44R21R6(declaredTotal){var rail=reelMetricRailV44R21R8(),x=rail.reaction;if(x&&Number(x.count||0)===Number(declaredTotal||0))return [x.el];return reelMetricNumericNodesV44R21R8([Number(declaredTotal||0)]).map(function(y){return y.el;});}
function reelCompositeReactionTriggerV44R21R6(declaredTotal){var rail=reelMetricRailV44R21R8(),x=rail.reaction;if(!x||Number(x.count||0)!==Number(declaredTotal||0))return null;return {el:x.el,clickTargets:[x.clickTarget||x.el],info:{label:'Contagem global de reações do Reel: '+declaredTotal,type:'ALL',reactionLabel:'Todas',emoji:'•',count:Number(declaredTotal||0),mode:'reel_metric_rail'},score:12000};}
function findReactionTriggersV44R21R4(declaredTotal){
  if(isReelContext()){var composite=reelCompositeReactionTriggerV44R21R6(declaredTotal);if(composite)return [composite];}
  if(isPhotoContext()){var exact=photoTypedReactionTriggersV44R21R8(declaredTotal);if(exact.length)return exact;}
  var surface=null,panel=null;try{surface=findPostSurface(postTypeFromUrl(location.href));}catch(_){}try{panel=panelRoot();}catch(_){}var roots=[];[surface,panel,document.body].forEach(function(x){if(x&&roots.indexOf(x)<0)roots.push(x);});var found=[],seen=new Set();
  roots.forEach(function(root){var nodes=[];try{nodes=Array.prototype.slice.call(root.querySelectorAll('[aria-label],[title],[role="button"],button,a')).slice(0,5000);}catch(_){}nodes.forEach(function(el){if(seen.has(el))return;seen.add(el);if(String(el.getAttribute&&el.getAttribute('role')||'').toLowerCase()==='toolbar')return;var info=reactionTriggerInfoV44R21R4(el);if(!info)return;var sc=reactionTriggerScoreV44R21R4(el,info,declaredTotal,surface);if(sc<300)return;found.push({el:el,info:info,score:sc});});});
  var typed=found.filter(function(x){return x.info.mode==='typed';}),declared=Number(declaredTotal||0);if(typed.length){var parents=[];typed.forEach(function(x){var g=x.el.parentElement||x.el;for(var i=0;i<6&&g&&g!==document.body;i++,g=g.parentElement){var cnt=0;try{Array.prototype.slice.call(g.querySelectorAll('[aria-label],[title]')).slice(0,90).forEach(function(z){var ii=reactionTriggerInfoV44R21R4(z);if(ii&&ii.mode==='typed')cnt++;});}catch(_){}if(cnt>=2)break;}var rec=parents.find(function(y){return y.el===g;});if(!rec){rec={el:g,items:[],sum:0,score:0};parents.push(rec);}if(!rec.items.some(function(y){return y.info.type===x.info.type;})){rec.items.push(x);rec.sum+=Number(x.info.count||0);}});parents.forEach(function(g){g.score=g.items.reduce(function(n,x){return n+x.score;},0)+(declared>0?Math.max(-5000,7000-Math.abs(g.sum-declared)*50):g.sum*10);});parents.sort(function(a,b){return b.score-a.score;});if(parents[0]&&parents[0].score>1000)return parents[0].items.sort(function(a,b){return b.score-a.score;}).slice(0,7);}
  var generic=found.filter(function(x){return x.info.mode==='all';}).sort(function(a,b){return b.score-a.score;}).slice(0,1);return generic;
}
function reactionDialogLimitationV44R21R4(dlg){var tx=t(dlg&&((dlg.innerText||dlg.textContent)||'')||'');if(/only\s+the\s+names?\s+of\s+(?:your\s+)?friends?.{0,80}(?:reacted|shown)|somente\s+os\s+nomes?\s+(?:dos\s+)?amigos?.{0,80}(?:reagiram|mostrados)|apenas\s+os\s+nomes?\s+(?:dos\s+)?amigos?/i.test(tx))return {limited:true,code:'FRIENDS_ONLY_NAMES_MATERIALIZED',message:tx.slice(0,500)};return {limited:false,code:'',message:''};}
function reactionDialogScoreV44R21R4(dlg,before){if(!dlg||!visible(dlg))return -9999;var score=0,tx=t(dlg.innerText||dlg.textContent||'').toLowerCase();if(before&&before.has(dlg))score-=300;if(/people who reacted|people who liked|reactions|pessoas que reagiram|pessoas que curtiram|rea[cç][oõ]es|only the names of friends|somente os nomes/i.test(tx.slice(0,900)))score+=750;try{score+=Math.min(900,dlg.querySelectorAll('[role="tab"],[role="tablist"] [role="button"],[aria-selected]').length*120);}catch(_){}var profiles=0;try{Array.prototype.slice.call(dlg.querySelectorAll('a[href]')).slice(0,700).forEach(function(a){if(interactionProfileUrlV44R21R4(a.href||a.getAttribute('href')||''))profiles++;});}catch(_){}score+=Math.min(500,profiles*40);return score;}
function waitReactionDialogV44R21R4(before,timeoutMs){var end=Date.now()+Number(timeoutMs||8000);return new Promise(function(resolve){(function poll(){var all=[];try{all=Array.prototype.slice.call(document.querySelectorAll('[role="dialog"],div[aria-modal="true"]'));}catch(_){}var best=null,bestScore=-9999;all.forEach(function(d){var sc=reactionDialogScoreV44R21R4(d,before);if(sc>bestScore){bestScore=sc;best=d;}});if(best&&bestScore>=500){resolve(best);return;}if(Date.now()>=end){resolve(null);return;}setTimeout(poll,140);})();});}
function cleanInteractionNameV44R21R4(raw){var s=t(raw).replace(/^profile picture of\s+/i,'').replace(/^foto do perfil de\s+/i,'').replace(/\s+(?:profile picture|foto do perfil)$/i,'');if(!s||s.length<2||s.length>120)return '';if(/^(?:add friend|adicionar|follow|seguir|message|mensagem|friends?|amigos?|close|fechar|see options|ver op[cç][oõ]es)$/i.test(s))return '';if(/people who reacted|pessoas que reagiram|reactions|rea[cç][oõ]es/i.test(s))return '';return s;}
function interactionRowV44R21R4(link,dlg){var row=link;for(var i=0;i<9&&row&&row!==dlg;i++,row=row.parentElement){var role=String(row.getAttribute&&row.getAttribute('role')||'');if(role==='listitem'||role==='row'||role==='option')return row;try{var im=row.querySelectorAll('img,svg image').length,pl=row.querySelectorAll('a[href],[role="link"]').length,tx=t(row.innerText||row.textContent||'');if(im>=1&&pl>=1&&tx.length<=500)return row;}catch(_){}}return link.parentElement||link;}
function interactionNameV44R21R4(link,row){var vals=[link&&link.innerText,link&&link.textContent,link&&link.getAttribute&&link.getAttribute('aria-label'),link&&link.getAttribute&&link.getAttribute('title')];try{Array.prototype.slice.call(row.querySelectorAll('span[dir="auto"],strong,h3,h4')).slice(0,30).forEach(function(x){vals.push(x.innerText||x.textContent||x.getAttribute('aria-label')||'');});}catch(_){}var names=vals.map(cleanInteractionNameV44R21R4).filter(Boolean).filter(function(x){return !/\b(?:like|love|care|haha|wow|sad|angry|curtir|amei|uau|triste|grr)\b/i.test(x);});names.sort(function(a,b){return a.length-b.length;});return names[0]||'';}
function interactionAvatarV44R21R4(link,row,name){var nodes=[];function addRoot(root){if(!root||!root.querySelectorAll)return;try{nodes=nodes.concat(Array.prototype.slice.call(root.querySelectorAll('img,svg image,[style*="background-image"]')).slice(0,80));}catch(_){}}addRoot(link);addRoot(row);var best=null,bestScore=-9999,nn=normalizeProfileNameV44R3(name||'');nodes.forEach(function(im){var url=visualAssetUrlV44R12(im);if(!url||/^data:image\/svg/i.test(url))return;var r;try{r=im.getBoundingClientRect();}catch(_){r={width:0,height:0};}if(r.width<20||r.height<20||r.width>260||r.height>260)return;var alt=t(im.alt||im.getAttribute&&im.getAttribute('aria-label')||im.getAttribute&&im.getAttribute('title')||''),low=(alt+' '+url).toLowerCase();if(/reaction|emoji|sticker|static_map|cover|sprite/i.test(low))return;var score=0;if(Math.abs(r.width-r.height)<=12)score+=80;if(r.width>=32&&r.height>=32)score+=80;if(r.width>=56&&r.height>=56)score+=35;if(nn&&normalizeProfileNameV44R3(alt).indexOf(nn)!==-1)score+=160;if(link&&link.contains&&link.contains(im))score+=120;if(/fbcdn\.net|facebook\.com/i.test(url))score+=40;if(score>bestScore){bestScore=score;best={url:url,width:Number(r.width||0),height:Number(r.height||0),alt:alt};}});return best||{url:'',width:0,height:0,alt:''};}
function reactionTypeFromRowV44R21R4(row,fallback){var vals=[];try{Array.prototype.slice.call(row.querySelectorAll('[aria-label],[title],img[alt]')).slice(0,100).forEach(function(x){vals.push(x.getAttribute('aria-label')||x.getAttribute('title')||x.getAttribute('alt')||'');});}catch(_){}for(var i=0;i<vals.length;i++){var rk=reactionKindV44R21R4(vals[i]);if(rk.code!=='REACTION')return rk;}return fallback&&fallback.code?fallback:reactionKindV44R21R4('Reação');}
function collectInteractionRowsV44R21R4(dlg,descriptor,store,tabSeen){var links=[];try{links=Array.prototype.slice.call(dlg.querySelectorAll('a[href],[role="link"][href]'));}catch(_){}var accepted=[];links.slice(0,5000).forEach(function(link){var url=interactionProfileUrlV44R21R4(link.href||link.getAttribute&&link.getAttribute('href')||'');if(!url)return;var row=interactionRowV44R21R4(link,dlg),name=interactionNameV44R21R4(link,row);if(!name)return;var fallback=descriptor.type==='ALL'?reactionKindV44R21R4('Reação'):{code:descriptor.type,label:descriptor.reactionLabel||descriptor.type,emoji:descriptor.emoji||'•'},detected=reactionTypeFromRowV44R21R4(row,fallback);if(descriptor.type!=='ALL'&&detected.code!=='REACTION'&&detected.code!==descriptor.type)return;if(descriptor.type!=='ALL'&&detected.code==='REACTION')detected=fallback;var key=profileIdentityFromUrl(url)||url.toLowerCase(),av=interactionAvatarV44R21R4(link,row,name),rec=store.get(key);if(!rec)rec={name:name,profileUrl:url,reactionType:detected.code,reactionLabel:detected.label,reactionEmoji:detected.emoji,avatarObserved:av.url||'',avatar:'',avatarHighResUrl:av.url||'',avatarWidth:Number(av.width||0),avatarHeight:Number(av.height||0),avatarEmbedded:false,source:'reaction_dialog_dom_v2'};else{if(!rec.avatarObserved&&av.url)rec.avatarObserved=av.url;if(descriptor.type!=='ALL'){rec.reactionType=fallback.code;rec.reactionLabel=fallback.label;rec.reactionEmoji=fallback.emoji;}else if((!rec.reactionType||rec.reactionType==='REACTION')&&detected.code!=='REACTION'){rec.reactionType=detected.code;rec.reactionLabel=detected.label;rec.reactionEmoji=detected.emoji;}if((!rec.name||rec.name.length<name.length)&&name)rec.name=name;}store.set(key,rec);accepted.push(key);if(tabSeen)tabSeen.add(key);});return accepted;}
function reactionTabLabelV44R21R4(el){var vals=[el&&el.getAttribute&&el.getAttribute('aria-label'),el&&el.getAttribute&&el.getAttribute('title'),el&&el.innerText,el&&el.textContent];try{Array.prototype.slice.call(el.querySelectorAll('[aria-label],[title],img[alt],span')).slice(0,50).forEach(function(x){vals.push(x.getAttribute&&x.getAttribute('aria-label'));vals.push(x.getAttribute&&x.getAttribute('title'));vals.push(x.getAttribute&&x.getAttribute('alt'));vals.push(x.innerText||x.textContent);});}catch(_){}return t(vals.filter(Boolean).join(' '));}
function reactionTabInfoV44R21R4(el){if(!el||!visible(el))return null;var role=String(el.getAttribute&&el.getAttribute('role')||'').toLowerCase(),tabList=null;try{tabList=el.closest&&el.closest('[role="tablist"]');}catch(_){}var selectedAttr=el.getAttribute&&el.getAttribute('aria-selected'),eligible=role==='tab'||!!tabList||selectedAttr!==null&&selectedAttr!==undefined;if(!eligible)return null;var label=reactionTabLabelV44R21R4(el);if(!label)return null;var low=label.toLowerCase();try{low=low.normalize('NFD').replace(/[\u0300-\u036f]/g,'');}catch(_){}var type='';if(/(?:^|\b)(?:all|todas?|all reactions|todas as reacoes)(?:\b|$)/i.test(low))type='ALL';else{var rk=reactionKindV44R21R4(label);if(rk.code!=='REACTION')type=rk.code;}if(!type)return null;var countMatch=label.match(/([\d.,]+\s*(?:[KkMmBb]|mil|mi|bi)?)/i),count=countMatch?Number(parseFacebookCount(countMatch[1])||0):0,rk2=type==='ALL'?{label:'Todas',emoji:'•'}:reactionKindV44R21R4(type);return {el:el,type:type,label:label,reactionLabel:rk2.label,emoji:rk2.emoji,count:count,selected:String(selectedAttr||'').toLowerCase()==='true',score:(role==='tab'?500:0)+(tabList?300:0)+(count>0?100:0)};}
function findReactionTabsV44R21R4(dlg,declaredTotal){var nodes=[];try{nodes=Array.prototype.slice.call(dlg.querySelectorAll('[role="tab"],[role="tablist"] [role="button"],[role="tablist"] button,[aria-selected]'));}catch(_){}var byType={};nodes.slice(0,700).forEach(function(el){var info=reactionTabInfoV44R21R4(el);if(!info)return;var old=byType[info.type];if(!old||info.score>old.score)byType[info.type]=info;});if(byType.ALL&&!byType.ALL.count)byType.ALL.count=Number(declaredTotal||0);var order={LIKE:1,LOVE:2,CARE:3,HAHA:4,WOW:5,SAD:6,ANGRY:7,ALL:8};return Object.keys(byType).map(function(k){return byType[k];}).sort(function(a,b){return (order[a.type]||99)-(order[b.type]||99);});}
function interactionListSignatureV44R21R4(dlg){var keys=[];try{Array.prototype.slice.call(dlg.querySelectorAll('a[href],[role="link"][href]')).slice(0,800).forEach(function(a){var u=interactionProfileUrlV44R21R4(a.href||a.getAttribute&&a.getAttribute('href')||'');if(u)keys.push(profileIdentityFromUrl(u)||u.toLowerCase());});}catch(_){}return keys.slice(0,5).join('|')+'~'+keys.slice(-5).join('|')+'#'+keys.length;}
function interactionScrollerCandidatesV44R21R4(dlg){var all=[dlg];try{all=all.concat(Array.prototype.slice.call(dlg.querySelectorAll('*')).slice(0,5000));}catch(_){}var out=[];all.forEach(function(el){try{if(!visible(el))return;var range=Math.max(0,Number(el.scrollHeight||0)-Number(el.clientHeight||0)),r=el.getBoundingClientRect(),cs=getComputedStyle(el),overflow=String(cs.overflowY||'');if(range<25||r.height<100||r.width<220)return;if(!/(auto|scroll|overlay)/i.test(overflow)&&el!==dlg)return;var profiles=0;Array.prototype.slice.call(el.querySelectorAll('a[href],[role="link"][href]')).slice(0,500).forEach(function(a){if(interactionProfileUrlV44R21R4(a.href||a.getAttribute&&a.getAttribute('href')||''))profiles++;});var score=Math.min(7000,range)+Math.min(3500,profiles*90)+Math.min(700,r.height)+(/auto|scroll|overlay/i.test(overflow)?350:0);out.push({el:el,score:score});}catch(_){}});out.sort(function(a,b){return b.score-a.score;});return out;}
function interactionScrollerV44R21R4(dlg){var x=interactionScrollerCandidatesV44R21R4(dlg);return x[0]&&x[0].el||null;}
function interactionSpinnerVisibleV44R21R4(dlg){var nodes=[];try{nodes=Array.prototype.slice.call(dlg.querySelectorAll('[role="progressbar"],[aria-busy="true"],svg[aria-label*="Loading" i],svg[aria-label*="Carregando" i]'));}catch(_){}return nodes.some(function(x){return visible(x);});}
function activateReactionTabV44R21R4(dlg,descriptor,declaredTotal){
  var tabs=findReactionTabsV44R21R4(dlg,declaredTotal),target=tabs.find(function(x){return x.type===descriptor.type;});if(!target)return Promise.resolve({ok:false,reason:'TAB_NOT_FOUND',tab:null});
  var before=interactionListSignatureV44R21R4(dlg),wasSelected=!!target.selected,clickedAt=Date.now();
  if(!wasSelected){try{target.el.scrollIntoView({block:'nearest',inline:'center'});}catch(_){}try{clickObservedControlV44R17(target.el);}catch(_){try{target.el.click();}catch(__){}}}
  var end=Date.now()+9000,selectedSince=0,lastSig=before,changedAt=0;
  return new Promise(function(resolve){(function poll(){
    var now=findReactionTabsV44R21R4(dlg,declaredTotal).find(function(x){return x.type===descriptor.type;}),sig=interactionListSignatureV44R21R4(dlg),sel=!!(now&&now.selected),elapsed=Date.now()-clickedAt;
    if(sig!==lastSig){lastSig=sig;changedAt=Date.now();}if(sel&&!selectedSince)selectedSince=Date.now();
    var settledAfterChange=changedAt&&Date.now()-changedAt>=300,selectedQuiet=selectedSince&&Date.now()-selectedSince>=900;
    var canAccept=wasSelected?(sel&&selectedQuiet):(sel&&((sig!==before&&settledAfterChange)||(elapsed>=2200&&selectedQuiet)));
    if(canAccept){var sc=interactionScrollerV44R21R4(dlg);if(sc){try{sc.scrollTop=0;sc.dispatchEvent(new Event('scroll',{bubbles:true}));}catch(_){}}setTimeout(function(){resolve({ok:true,reason:sig!==before?'TAB_SELECTED_LIST_CHANGED':'TAB_SELECTED_SETTLED',tab:now||target,before:before,after:sig,elapsedMs:elapsed});},260);return;}
    if(Date.now()>=end){resolve({ok:sel,reason:sel?'TAB_SELECTED_TIMEOUT_SETTLED':'TAB_ACTIVATION_TIMEOUT',tab:now||target,before:before,after:sig,elapsedMs:elapsed});return;}setTimeout(poll,140);
  })();});
}
function clickInteractionLoadMoreV44R21R4(dlg){var nodes=[];try{nodes=Array.prototype.slice.call(dlg.querySelectorAll('button,[role="button"],[aria-label]'));}catch(_){}var clicked=0;nodes.slice(0,700).forEach(function(b){if(clicked>=3||!visible(b))return;var label=t(b.getAttribute&&b.getAttribute('aria-label')||b.innerText||b.textContent||'');if(!/^(?:see|view|show|load|ver|mostrar|carregar)\s+(?:more|mais)(?:\s+(?:people|pessoas|results|resultados))?$/i.test(label))return;try{clickObservedControlV44R17(b);clicked++;}catch(_){}});return clicked;}
function scrollInteractionSurfaceV44R21R4(dlg,wave,stable){var sc=interactionScrollerV44R21R4(dlg);if(!sc)return {moved:false,atBottom:true};var max=0,top=0,client=0;try{max=Math.max(0,Number(sc.scrollHeight||0)-Number(sc.clientHeight||0));top=Number(sc.scrollTop||0);client=Number(sc.clientHeight||0);}catch(_){}var step=Math.max(420,Math.floor(client*.82)),target=Math.min(max,top+step);if(stable>=2||wave%8===0)target=max;try{if(sc.scrollTo)sc.scrollTo({top:target,behavior:'auto'});else sc.scrollTop=target;sc.dispatchEvent(new Event('scroll',{bubbles:true}));sc.dispatchEvent(new WheelEvent('wheel',{deltaY:Math.max(650,step),bubbles:true,cancelable:true}));}catch(_){}var after=top;try{after=Number(sc.scrollTop||0);}catch(_){}return {moved:Math.abs(after-top)>1||target>top,atBottom:max<=0||after>=max-8,max:max,top:after};}
function scrapeReactionTabV44R21R4(dlg,descriptor,store,accessLimited){var waves=0,stable=0,lastSize=0,lastSig='',started=Date.now(),maxMs=accessLimited?18000:150000,tabSeen=new Set(),expected=Number(descriptor.count||0),overall=Number(descriptor.overallDeclared||0);return new Promise(function(resolve){function finish(reason){resolve({waves:waves,stable:stable,reason:reason,observedInTab:tabSeen.size,expectedInTab:expected});}function step(){if(window.__HUDH__&&window.__HUDH__.stop&&window.__HUDH__.stop()){finish('USER_STOP');return;}waves++;collectInteractionRowsV44R21R4(dlg,descriptor,store,tabSeen);var sig=interactionListSignatureV44R21R4(dlg),grew=tabSeen.size>lastSize||sig!==lastSig;if(grew){lastSize=tabSeen.size;lastSig=sig;stable=0;}else stable++;var pct=overall>0?Math.min(100,Math.round(store.size/overall*100)):0;try{window.__HUDH__.set(90+Math.min(5,Math.floor(pct/20)),'Interações — '+(descriptor.reactionLabel||descriptor.type)+': '+tabSeen.size+(expected?'/'+expected:'')+' · total único '+store.size+(overall?'/'+overall:''));}catch(_){}if(!accessLimited&&expected>0&&tabSeen.size>=expected){finish('TAB_DECLARED_TARGET_REACHED');return;}if(Date.now()-started>=maxMs||waves>=280){finish('TAB_TIME_OR_WAVE_LIMIT');return;}var more=clickInteractionLoadMoreV44R21R4(dlg);if(more){stable=0;setTimeout(step,560);return;}var metrics=scrollInteractionSurfaceV44R21R4(dlg,waves,stable),spinner=interactionSpinnerVisibleV44R21R4(dlg);if(metrics.atBottom&&stable>=(accessLimited?3:9)&&!spinner){finish(accessLimited?'FACEBOOK_VISIBILITY_LIMIT_STABLE':'TAB_BOTTOM_STABLE');return;}if(!metrics.moved&&stable>=(accessLimited?3:9)&&!spinner){finish(accessLimited?'FACEBOOK_VISIBILITY_LIMIT_NO_SCROLLER':'TAB_NO_GROWTH');return;}setTimeout(step,580);}step();});}
function clickReactionTriggerV44R21R4(item){
  var before=new Set();try{Array.prototype.slice.call(document.querySelectorAll('[role="dialog"],div[aria-modal="true"]')).forEach(function(x){before.add(x);});}catch(_){}var targets=item&&Array.isArray(item.clickTargets)&&item.clickTargets.length?item.clickTargets:[item&&item.el],i=0,mode=item&&item.info&&item.info.mode||'';
  function attempt(){if(i>=targets.length)return waitReactionDialogV44R21R4(before,1800);var target=targets[i++];if(!target)return attempt();if(mode!=='reel_metric_rail'){try{target.scrollIntoView({block:'center',inline:'center'});}catch(_){}}var locked=currentReelIdV44R21R8();try{clickObservedControlV44R17(target);}catch(_){try{target.click();}catch(__){}}if(mode==='reel_metric_rail'&&!reelRouteLockedV44R21R8(locked))return Promise.resolve(null);return waitReactionDialogV44R21R4(before,mode==='reel_metric_rail'?3600:8500).then(function(dlg){return dlg||attempt();});}
  return attempt();
}
function closeReactionDialogV44R21R4(dlg){var buttons=[];try{buttons=Array.prototype.slice.call(dlg.querySelectorAll('[aria-label="Close"],[aria-label="Fechar"],button,[role="button"]'));}catch(_){}var close=buttons.find(function(b){return /^(?:close|fechar)$/i.test(t(b.getAttribute&&b.getAttribute('aria-label')||b.innerText||b.textContent||''));});if(close){try{clickObservedControlV44R17(close);return;}catch(_){}}try{document.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',code:'Escape',bubbles:true}));}catch(_){} }
function enrichInteractionAvatarsV44R21R4(result){var items=result&&result.items||[],next=0,completed=0,maxWorkers=Math.min(4,items.length);if(!items.length)return Promise.resolve(result);function one(rec){var first=rec.avatarObserved?runtimeMessageV44R3({type:'B35_FETCH_IMAGE_DATA_V44R11',url:rec.avatarObserved,preferHighRes:true}):Promise.resolve(null);return first.then(function(r){if(r&&r.ok&&String(r.dataUrl||'').indexOf('data:image/')===0){rec.avatar=r.dataUrl;rec.avatarHighResUrl=r.highResUrl||r.sourceUrl||rec.avatarObserved;rec.avatarWidth=Number(r.width||0);rec.avatarHeight=Number(r.height||0);rec.avatarEmbedded=true;rec.avatarSha256=r.sha256||'';return rec;}if(rec.profileUrl)return runtimeMessageV44R3({type:'B35_FETCH_PROFILE_AVATAR_V44R3',profileUrl:rec.profileUrl,authorName:rec.name,profileIdentity:profileIdentityFromUrl(rec.profileUrl)}).then(function(pr){if(pr&&pr.ok&&String(pr.dataUrl||'').indexOf('data:image/')===0){rec.avatar=pr.dataUrl;rec.avatarHighResUrl=pr.highResUrl||pr.avatarUrl||rec.profileUrl;rec.avatarWidth=Number(pr.width||0);rec.avatarHeight=Number(pr.height||0);rec.avatarEmbedded=true;rec.avatarSha256=pr.sha256||'';}return rec;});return rec;}).catch(function(){return rec;});}function worker(){if(next>=items.length||(window.__HUDH__&&window.__HUDH__.stop&&window.__HUDH__.stop()))return Promise.resolve();var rec=items[next++];return Promise.resolve(one(rec)).then(function(){completed++;try{window.__HUDH__.set(95+Math.min(3,Math.floor(completed/items.length*3)),'Avatares HD das interações: '+completed+'/'+items.length);}catch(_){}return worker();});}return Promise.all(Array.from({length:maxWorkers},worker)).then(function(){return result;});}
function collectPostInteractionsV44R21R4(declaredTotal){
  var triggerItems=findReactionTriggersV44R21R4(declaredTotal),audit={version:'REACTION_ENGINE_V2_V44R21R8',startedAt:new Date().toISOString(),postDeclaredTotal:Number(declaredTotal||0),triggers:triggerItems.map(function(x){return {label:x.info.label,type:x.info.type,count:x.info.count,mode:x.info.mode,score:x.score};}),tabs:[],dialogs:[],accessLimited:false,limitationCode:'',limitationMessage:'',status:'NOT_STARTED'},store=new Map();
  if(!triggerItems.length){audit.status='POST_REACTION_TRIGGER_NOT_OBSERVED';audit.finishedAt=new Date().toISOString();return Promise.resolve({items:[],count:0,declaredTotal:Number(declaredTotal||0),status:audit.status,accessLimited:false,audit:audit});}
  var opener=triggerItems.find(function(x){return x.info.mode==='all';})||triggerItems[0];return clickReactionTriggerV44R21R4(opener).then(function(dlg){if(!dlg){audit.status='REACTION_DIALOG_NOT_FOUND';return null;}var limitation=reactionDialogLimitationV44R21R4(dlg);audit.accessLimited=limitation.limited;audit.limitationCode=limitation.code;audit.limitationMessage=limitation.message;var tabs=findReactionTabsV44R21R4(dlg,declaredTotal);audit.tabs=tabs.map(function(x){return {type:x.type,label:x.label,count:x.count};});var all=tabs.find(function(x){return x.type==='ALL';}),dialogDeclared=all&&Number(all.count||0)||tabs.filter(function(x){return x.type!=='ALL';}).reduce(function(n,x){return n+Number(x.count||0);},0);audit.dialogDeclaredTotal=dialogDeclared;var plan=tabs.filter(function(x){return x.type!=='ALL';}),typedDeclared=plan.reduce(function(n,x){return n+Number(x.count||0);},0);if(!plan.length&&all)plan=[all];else if(all&&dialogDeclared>0&&typedDeclared<dialogDeclared)plan.push(all);if(!plan.length){audit.status='REACTION_TABS_NOT_OBSERVED';closeReactionDialogV44R21R4(dlg);return null;}var i=0;function next(){if(i>=plan.length)return Promise.resolve();var desc=plan[i++];desc.overallDeclared=Number(declaredTotal||dialogDeclared||0);return activateReactionTabV44R21R4(dlg,desc,declaredTotal).then(function(active){if(!active.ok){audit.dialogs.push({tab:desc.type,status:'TAB_ACTIVATION_FAILED',reason:active.reason});return;}return scrapeReactionTabV44R21R4(dlg,desc,store,audit.accessLimited).then(function(r){audit.dialogs.push({tab:desc.type,status:'COLLECTED',activationReason:active.reason,waves:r.waves,stableCycles:r.stable,terminalReason:r.reason,observedInTab:r.observedInTab,expectedInTab:r.expectedInTab,observedUniqueAfter:store.size});});}).catch(function(e){audit.dialogs.push({tab:desc.type,status:'ERROR',error:String(e&&e.message||e)});}).then(next);}return next().then(function(){closeReactionDialogV44R21R4(dlg);});}).then(function(){var items=Array.from(store.values()),declared=Number(declaredTotal||audit.dialogDeclaredTotal||0);audit.observed=items.length;audit.declaredTotal=declared;audit.finishedAt=new Date().toISOString();if(audit.accessLimited)audit.status='ACCESS_LIMITED_BY_FACEBOOK';else if(items.length&&(!declared||items.length>=declared))audit.status='COMPLETED';else if(items.length)audit.status='PARTIAL_DECLARED_GAP';else if(audit.status==='NOT_STARTED')audit.status='NO_PROFILES_MATERIALIZED';var result={items:items,count:items.length,declaredTotal:declared,status:audit.status,accessLimited:audit.accessLimited,limitationCode:audit.limitationCode,limitationMessage:audit.limitationMessage,audit:audit};return enrichInteractionAvatarsV44R21R4(result);}).catch(function(e){audit.status='ERROR_SAFE_EMPTY';audit.error=String(e&&e.message||e);audit.finishedAt=new Date().toISOString();return {items:[],count:0,declaredTotal:Number(declaredTotal||0),status:audit.status,accessLimited:false,audit:audit};});
}

/* V44R21R5 — fusão da lista DOM com perfis de reatores já retornados em
   respostas GraphQL ao navegador. A captura não faz replay, não extrai tokens
   e não presume identidades ausentes. */
function reactionMetaV44R21R5(code){var map={LIKE:{label:'Curtir',emoji:'👍'},LOVE:{label:'Amei',emoji:'❤️'},CARE:{label:'Força',emoji:'🥰'},HAHA:{label:'Haha',emoji:'😂'},WOW:{label:'Uau',emoji:'😮'},SAD:{label:'Triste',emoji:'😢'},ANGRY:{label:'Grr',emoji:'😡'},REACTION:{label:'Reação',emoji:'•'}};return map[String(code||'REACTION').toUpperCase()]||map.REACTION;}
function mergeNetworkInteractionsV44R21R5(domResult,networkSnapshot){
  domResult=domResult&&typeof domResult==='object'?domResult:{items:[],count:0,declaredTotal:0,status:'ERROR_SAFE_EMPTY',audit:{}};
  networkSnapshot=networkSnapshot&&typeof networkSnapshot==='object'?networkSnapshot:{items:[],audit:{version:'REACTION_GRAPHQL_BRIDGE_V44R21R5',status:'NOT_AVAILABLE'}};
  var items=Array.isArray(domResult.items)?domResult.items:[],networkItems=Array.isArray(networkSnapshot.items)?networkSnapshot.items:[],map=new Map(),added=[];
  function keyFor(x){var u=String(x&&x.profileUrl||'');return profileIdentityFromUrl(u)||u.toLowerCase()||('name:'+normalizeProfileNameV44R3(x&&x.name||''));}
  items.forEach(function(x){var k=keyFor(x);if(k)map.set(k,x);});
  networkItems.forEach(function(n){var k=keyFor(n);if(!k)return;var code=String(n.reactionType||'REACTION').toUpperCase(),meta=reactionMetaV44R21R5(code),old=map.get(k);if(!old){var rec={id:n.id||'',name:n.name||'',profileUrl:n.profileUrl||'',reactionType:code,reactionLabel:meta.label,reactionEmoji:meta.emoji,avatarObserved:n.avatarObserved||n.avatarHighResUrl||'',avatar:n.avatar||'',avatarHighResUrl:n.avatarHighResUrl||n.avatarObserved||'',avatarWidth:Number(n.avatarWidth||0),avatarHeight:Number(n.avatarHeight||0),avatarEmbedded:n.avatarEmbedded===true,source:'reaction_graphql_v44r21r5',networkSourcePath:n.networkSourcePath||''};map.set(k,rec);items.push(rec);added.push(rec);return;}if(!old.avatarObserved&&n.avatarObserved)old.avatarObserved=n.avatarObserved;if(!old.avatarHighResUrl&&(n.avatarHighResUrl||n.avatarObserved))old.avatarHighResUrl=n.avatarHighResUrl||n.avatarObserved;if((!old.reactionType||old.reactionType==='REACTION')&&code!=='REACTION'){old.reactionType=code;old.reactionLabel=meta.label;old.reactionEmoji=meta.emoji;}if((!old.name||old.name.length<String(n.name||'').length)&&n.name)old.name=n.name;old.networkCorroborated=true;});
  domResult.items=items;domResult.count=items.length;domResult.audit=domResult.audit||{};domResult.audit.networkCapture=networkSnapshot.audit||{};domResult.audit.networkProfilesAdded=added.length;domResult.audit.networkProfilesObserved=networkItems.length;domResult.networkCapture=networkSnapshot.audit||{};
  var declared=Number(domResult.declaredTotal||domResult.audit.dialogDeclaredTotal||0),netAudit=networkSnapshot.audit||{},limited=domResult.accessLimited===true||domResult.audit.accessLimited===true;
  if(items.length&&declared>0&&items.length>=declared)domResult.status='COMPLETED';
  else if(added.length>0)domResult.status=limited?'ACCESS_LIMITED_NETWORK_IDENTITIES_MATERIALIZED':'PARTIAL_NETWORK_AUGMENTED';
  else if(Number(netAudit.relevantPayloads||0)>0&&items.length===0&&netAudit.serverReturnedNoActorIdentities===true)domResult.status=limited?'ACCESS_LIMITED_SERVER_RETURNED_NO_IDENTITIES':'REACTION_QUERY_RETURNED_NO_IDENTITIES';
  else if(limited)domResult.status='ACCESS_LIMITED_BY_FACEBOOK';
  if(added.length){return enrichInteractionAvatarsV44R21R4({items:added}).then(function(){return domResult;}).catch(function(){return domResult;});}
  return Promise.resolve(domResult);
}
function collectPostInteractionsV44R21R5(declaredTotal){
  var api=window.__FB_POST_REACTION_NETWORK_V44R21R5__||null,started=false;
  try{if(api&&typeof api.begin==='function'){api.begin({declaredTotal:Number(declaredTotal||0),sourceUrl:String(location.href||'')});started=true;}}catch(_){}
  return Promise.resolve(collectPostInteractionsV44R21R4(declaredTotal)).then(function(domResult){
    if(!started||!api)return domResult;
    return Promise.resolve(api.waitForQuiet(1100,4800)).catch(function(){return api.snapshot();}).then(function(){var finalSnap=null;try{finalSnap=api.end('reaction_dialog_completed');}catch(_){try{finalSnap=api.snapshot();}catch(__){finalSnap=null;}}return mergeNetworkInteractionsV44R21R5(domResult,finalSnap);});
  }).catch(function(e){try{if(started&&api)api.end('reaction_collection_error');}catch(_){}throw e;});
}

function normalizeInteractionsV44R21R4(bundle,requested){bundle=bundle&&typeof bundle==='object'?bundle:{items:[],count:0,declaredTotal:0,status:'ERROR_SAFE_EMPTY',audit:{}};bundle.items=Array.isArray(bundle.items)?bundle.items:[];bundle.requested=requested===true;var declared={},tabs=bundle.audit&&Array.isArray(bundle.audit.tabs)?bundle.audit.tabs:[];tabs.forEach(function(x){var code=String(x&&x.type||'').toUpperCase(),count=Number(x&&x.count||0);if(code&&code!=='ALL'&&count>0)declared[code]=Math.max(Number(declared[code]||0),count);});bundle.declaredByType=declared;var order={LIKE:0,LOVE:1,CARE:2,HAHA:3,WOW:4,SAD:5,ANGRY:6,REACTION:7};bundle.items.sort(function(a,b){var ao=order[String(a&&a.reactionType||'REACTION').toUpperCase()],bo=order[String(b&&b.reactionType||'REACTION').toUpperCase()];return Number(ao==null?99:ao)-Number(bo==null?99:bo)||String(a&&a.name||'').localeCompare(String(b&&b.name||''),'pt-BR',{sensitivity:'base'});});bundle.byReaction=interactionCatalogOuterV44R21R3().map(function(meta){var n=bundle.items.filter(function(it){return String(it&&it.reactionType||'').toUpperCase()===meta.code;}).length;return {code:meta.code,label:meta.label,emoji:meta.emoji,declaredCount:Number(declared[meta.code]||0),observedCount:n};});bundle.count=bundle.items.length;bundle.audit=bundle.audit||{};bundle.audit.normalizationVersion='V44R21R5';bundle.audit.requested=bundle.requested;bundle.audit.declaredByType=declared;bundle.audit.byReaction=bundle.byReaction;bundle.accessLimited=!!(bundle.accessLimited||bundle.audit.accessLimited);bundle.limitationCode=bundle.limitationCode||bundle.audit.limitationCode||'';bundle.limitationMessage=bundle.limitationMessage||bundle.audit.limitationMessage||'';return bundle;}


try{window.__FB_REACTION_ENGINE_DIAGNOSTIC_V44R21R4__={version:'REACTION_ENGINE_V2_V44R21R8',findTriggers:function(total){return findReactionTriggersV44R21R4(total).map(function(x){return {label:x.info.label,type:x.info.type,count:x.info.count,mode:x.info.mode,score:x.score};});},findTabs:function(dlg,total){return findReactionTabsV44R21R4(dlg,total).map(function(x){return {type:x.type,label:x.label,count:x.count,selected:x.selected};});},limitation:reactionDialogLimitationV44R21R4,sanitizeHeader:sanitizeHeaderStoryTextV44R21R4,photoSurface:findPhotoCommentSurfaceV44R21R7,reelCompositeTrigger:reelCompositeReactionTriggerV44R21R6,photoDiagnostics:photoSurfaceDiagnosticsV44R21R7};}catch(_){}

try{window.__FB_POST_SCRAPER_V44_TEST__.V44R21R9={photoStrictDeclaredTarget:photoStrictDeclaredTargetV44R21R9,photoExplicitDeclaredCount:photoExplicitDeclaredCountV44R21R9,photoMediaSnapshot:photoMainMediaSnapshotV44R21R9,photoMergeMetadata:mergePhotoMetadataV44R21R9,integrityText:postIntegrityTextV44R21R9};}catch(_){}

try{window.__FB_POST_SCRAPER_V44_TEST__.V44R21R10={photoPanel:photoContractPanelV44R21R10,photoHeader:photoHeaderContractV44R21R10,photoRecords:photoCommentRecordsV44R21R8,photoSlice:photoCollectSliceV44R21R8,photoMergeMetadata:mergePhotoMetadataV44R21R9};}catch(_){}


function enrichPhotoCommentAvatarsV44R21R11(payload){
  var items=[],stack=[].concat(payload&&payload.rows||[]);while(stack.length){var x=stack.shift();if(x){items.push(x);if(x.replies&&x.replies.length)stack=stack.concat(x.replies);}}
  var cache={},next=0,workers=Math.min(4,items.length);function one(it){var raw=String(it.avatarUrl||'');if(raw&&!photoIsStickerAssetV44R21R11(raw))return Promise.resolve(it);var href=canonicalProfilePageV44R3(it.authorHref||'');if(!href)return Promise.resolve(it);var ident=profileIdentityFromUrl(href),key=ident||href;if(!cache[key])cache[key]=postRuntimeMessageV44R10({type:'B35_FETCH_PROFILE_AVATAR_V44R3',profileUrl:href,authorName:it.author||'',profileIdentity:ident});return cache[key].then(function(r){if(!r||!r.ok||!/^data:image\//i.test(String(r.dataUrl||'')))return it;var matched=r.identityMatched===true||profileTitleMatchesV44R3(it.author||'',r.profileTitle||'');if(!matched)return it;it.avatarUrl=r.highResUrl||r.avatarUrl||r.sourceUrl||'';it.avatarHighResUrl=it.avatarUrl;it.avatar=r.dataUrl;it.avatarWidth=Number(r.width||0);it.avatarHeight=Number(r.height||0);it.avatarMime=String(r.mime||'');it.avatarSha256=String(r.sha256||'');it.avatarBindingReason='PHOTO_COMMENT_PROFILE_EXACT_IDENTITY_V44R21R11';return it;}).catch(function(){return it;});}
  function worker(){if(next>=items.length)return Promise.resolve();return one(items[next++]).then(worker);}var ps=[];for(var i=0;i<workers;i++)ps.push(worker());return Promise.all(ps).then(function(){return payload;});
}

try{window.__FB_POST_SCRAPER_V44_TEST__.V44R21R11={photoHeader:photoHeaderContractV44R21R10,photoRecords:photoCommentRecordsV44R21R8,photoSlice:photoCollectSliceV44R21R8,photoScrollCandidates:photoScrollCandidatesV44R21R8,isStickerAsset:photoIsStickerAssetV44R21R11,commentAvatar:photoCommentAvatarV44R21R11,commentMedia:photoCommentMediaV44R21R11};}catch(_){}

/* V44R21R4: o motor de comentários permanece primeiro; a lista de reações só é aberta por opção explícita. */
var __BASE_ENRICH_AVATARS_V44R21__=enrichAvatars;
enrichAvatars=function(payload,limit){
  return Promise.resolve(__BASE_ENRICH_AVATARS_V44R21__(payload,limit)).then(function(){return isPhotoContext()?enrichPhotoCommentAvatarsV44R21R11(payload):payload;}).then(function(){
    var opts=window.__FB_POST_SCRAPER_OPTIONS__||{},requested=opts.collectInteractions===true;payload.audit=payload.audit||{};payload.audit.interactionsRequested=requested;
    if(!requested){payload.interactions=normalizeInteractionsV44R21R4({items:[],count:0,declaredTotal:Number(payload&&payload.counts&&payload.counts.like||0),status:'NOT_REQUESTED',audit:{version:'V44R21R5',status:'NOT_REQUESTED',finishedAt:new Date().toISOString()}},false);payload.audit.interactions=payload.interactions.audit;try{window.__HUDH__.set(94,'Interações não solicitadas; finalizando a postagem…');}catch(_){}return payload;}
    try{window.__HUDH__.set(90,'Coletando perfis que interagiram com a postagem…');}catch(_){}
    return collectPostInteractionsV44R21R5(payload&&payload.counts&&payload.counts.like).then(function(interactions){payload.interactions=normalizeInteractionsV44R21R4(interactions,true);payload.audit.interactions=payload.interactions.audit;return payload;}).catch(function(e){payload.interactions=normalizeInteractionsV44R21R4({items:[],count:0,declaredTotal:Number(payload&&payload.counts&&payload.counts.like||0),status:'ERROR_SAFE_EMPTY',audit:{version:'V44R21R5',status:'ERROR_SAFE_EMPTY',error:String(e&&e.message||e)}},true);payload.audit.interactions=payload.interactions.audit;return payload;});
  });
};

function scopePreflightV44R21R13(){
  var missing=[];
  if(typeof fbIsPhotoContextV44R21R13!=='function')missing.push('fbIsPhotoContextV44R21R13');
  if(typeof isPhotoContext!=='function')missing.push('isPhotoContext_alias');
  if(fbIsPhotoContextV44R21R13()&&typeof window.__FB_PHOTO_HEADER_CONTRACT_V44R21R13__!=='function')missing.push('photoHeaderContract_hook');
  if(typeof window.__FB_STRIP_OPAQUE_CAPTION_V44R21R13__!=='function')missing.push('captionStrip_hook');
  window.__FB_SCOPE_PREFLIGHT_V44R21R13__={ok:missing.length===0,missing:missing,context:fbIsPhotoContextV44R21R13()?'PHOTO':(isReelContext()?'REEL':'POST'),at:new Date().toISOString()};
  if(missing.length)throw new Error('SCOPE_PREFLIGHT_FAILED: '+missing.join(', '));
  return true;
}
/* V44R21R14 — motor REEL isolado. PHOTO e POST permanecem congelados. */
function reelEvidenceSnapshotV44R21R14(){try{var api=window.__FB_REEL_EVIDENCE_V44R21R14__;if(api&&typeof api.request==='function')api.request();if(api&&typeof api.snapshot==='function')return api.snapshot()||{};}catch(_){}return {media:[],posters:[],comments:[],audit:{status:'UNAVAILABLE'}};}
function reelVisibleVideoV44R21R14(){
  var id=currentReelIdV44R21R8(),list=[],best=null;
  try{list=Array.prototype.slice.call(document.querySelectorAll('video')).filter(function(v){if(!U.vis(v))return false;var r=v.getBoundingClientRect();return r.width>=240&&r.height>=180&&r.bottom>0&&r.top<innerHeight;});}catch(_){}
  list.forEach(function(v){try{
    var r=v.getBoundingClientRect(),area=r.width*r.height,center=Math.abs((r.left+r.width/2)-innerWidth/2)+Math.abs((r.top+r.height/2)-innerHeight/2),score=area-center*50;
    var owner=v.closest&&v.closest('[data-video-id]'),ownerId=owner&&String(owner.getAttribute('data-video-id')||''),routeLink=null,scope=owner||v.parentElement;
    try{routeLink=scope&&scope.querySelector&&scope.querySelector('a[href*="/reel/'+id+'"]');}catch(_){}
    var exactOwner=!!(id&&ownerId&&ownerId===id),foreignOwner=!!(ownerId&&id&&ownerId!==id),routeBound=exactOwner||!!routeLink||(!foreignOwner&&list.length===1);
    if(foreignOwner)return;
    if(exactOwner)score+=1000000000;else if(routeLink)score+=500000000;else if(routeBound)score+=100000;
    var item={el:v,rect:r,score:score,url:/^https?:/i.test(String(v.currentSrc||v.src||''))?String(v.currentSrc||v.src||''):'',poster:/^https?:/i.test(String(v.poster||''))?String(v.poster||''):'',routeBound:routeBound,routeId:id,ownerVideoId:ownerId,bindingReason:exactOwner?'VISIBLE_VIDEO_DATA_ID_MATCH':(routeLink?'VISIBLE_VIDEO_ROUTE_LINK_MATCH':(routeBound?'UNIQUE_VISIBLE_VIDEO_ON_LOCKED_ROUTE':'VISIBLE_VIDEO_NOT_BOUND'))};
    if(!best||score>best.score)best=item;
  }catch(_){} });return best;
}
function reelCountsSnapshotV44R21R14(){
  var out={like:null,comment:null,share:null,candidatos:[],source:'REEL_METRIC_RAIL_V44R21R14'},old=null;
  try{old=collectCountsReelByClasses();}catch(_){}
  if(old&&old.like!=null&&old.comment!=null&&old.share!=null)return old;
  function accept(kind,val,el,source){val=Number(val);if(!isFinite(val)||val<0)return;if(out[kind]==null){out[kind]=val;out.candidatos.push({kind:kind,num:val,source:source||'',text:U.T(el&&el.innerText||el&&el.textContent||'')});}}
  try{Array.prototype.slice.call(document.querySelectorAll('button,[role="button"],a,[aria-label],[title]')).slice(0,12000).forEach(function(el){
    if(!U.vis(el)||el.closest&&el.closest('#fb-b35-unified-v44-panel'))return;var lab=U.T((el.getAttribute('aria-label')||'')+' '+(el.getAttribute('title')||'')),n=numericControlValueV44R19(el);if(n==null)n=parseFacebookCount(lab);
    if(/(?:Like|Likes|Curtir|Curtidas?|reactions?|rea[cç][oõ]es?)/i.test(lab))accept('like',n,el,'accessible_label');
    else if(/(?:Comments?|Coment[aá]rios?)/i.test(lab))accept('comment',n,el,'accessible_label');
    else if(/(?:Shares?|Compartilhamentos?)/i.test(lab))accept('share',n,el,'accessible_label');
  });}catch(_){}
  var vis=reelVisibleVideoV44R21R14();if(vis){var vr=vis.rect,nodes=[],seen={};try{nodes=Array.prototype.slice.call(document.querySelectorAll('span,div,a,button,[role="button"]')).slice(0,18000);}catch(_){}
    nodes.forEach(function(el){if(!U.vis(el)||el.closest&&el.closest('#fb-b35-unified-v44-panel'))return;var raw=U.T(el.innerText||el.textContent||'');if(!/^\d+(?:[.,]\d+)?\s*(?:[KkMmBb]|mil|mi|bi)?$/.test(raw))return;var n=parseFacebookCount(raw);if(n==null)return;try{var r=el.getBoundingClientRect();if(r.width<3||r.height<3||r.width>180||r.height>80||r.left<vr.right-140||r.left>Math.min(innerWidth,vr.right+560)||r.top<vr.top+90||r.bottom>Math.max(vr.bottom+150,innerHeight+100))return;var key=Math.round(r.top)+'|'+n;if(!seen[key]||r.width*r.height<seen[key].area)seen[key]={el:el,num:n,top:r.top,left:r.left,area:r.width*r.height};}catch(_){}});
    var rail=Object.keys(seen).map(function(k){return seen[k];}).sort(function(a,b){return a.top-b.top||a.left-b.left||a.area-b.area;});
    if(out.like==null&&rail[0])accept('like',rail[0].num,rail[0].el,'visual_metric_rail');
    if(out.comment==null&&rail[1])accept('comment',rail[1].num,rail[1].el,'visual_metric_rail');
    if(out.share==null&&rail[2])accept('share',rail[2].num,rail[2].el,'visual_metric_rail');
  }
  return out;
}
function reelMediaSnapshotV44R21R14(){
  var evidence=reelEvidenceSnapshotV44R21R14(),visible=reelVisibleVideoV44R21R14(),id=currentReelIdV44R21R8(),sameRoute=String(evidence&&evidence.reelId||'')===String(id||'');
  var allMedia=(evidence.media||[]).slice(),allPosters=(evidence.posters||[]).slice();
  var media=allMedia.filter(function(x){return sameRoute&&x&&x.bound===true&&(!x.routeId||String(x.routeId)===String(id));}).sort(function(a,b){return Number(b.score||0)-Number(a.score||0);});
  var posters=allPosters.filter(function(x){return sameRoute&&x&&x.bound===true&&(!x.routeId||String(x.routeId)===String(id));}).sort(function(a,b){return Number(b.score||0)-Number(a.score||0);});
  var url='',poster='',source='',binding='';
  for(var i=0;i<media.length;i++){if(/^https?:/i.test(String(media[i].url||''))){url=String(media[i].url);binding=String(media[i].bindingReason||'GRAPHQL_OBJECT_CONTAINS_ACTIVE_REEL_ID');source=/REQUEST_CONTAINS_ACTIVE_REEL_ID/i.test(binding)?'REEL_GRAPHQL_REQUEST_BOUND_MEDIA_V44R21R28':'REEL_GRAPHQL_EXACT_BOUND_MEDIA_V44R21R15';break;}}
  if(!url&&visible&&visible.routeBound&&visible.url){url=visible.url;source='REEL_VISIBLE_EXACT_BOUND_MEDIA_V44R21R15';binding=visible.bindingReason||'VISIBLE_VIDEO_BOUND';}
  for(var j=0;j<posters.length;j++){if(/^https?:/i.test(String(posters[j].url||''))){poster=String(posters[j].url);if(!binding)binding=String(posters[j].bindingReason||'GRAPHQL_OBJECT_CONTAINS_ACTIVE_REEL_ID');break;}}
  if(!poster&&visible&&visible.routeBound&&visible.poster)poster=visible.poster;
  /* Proibição deliberada: não usar detectReelMediaURL()/performance/HTML global. Esses pools incluem Reels adjacentes e causaram a mídia errada na V44R21R14. */
  if(!url&&!poster)return null;
  if(!source)source='REEL_POSTER_ONLY_EXACT_VISIBLE_V44R21R15';
  return {type:'video',url:url||'',poster:poster||'',source:source,reelId:id,mediaBinding:{status:'EXACT_OR_VISIBLE_ROUTE_BOUND',reason:binding||'VISIBLE_POSTER_ON_LOCKED_ROUTE',evidenceReelId:String(evidence&&evidence.reelId||''),acceptedMediaCandidates:media.length,acceptedPosterCandidates:posters.length,rejectedUnboundMedia:Math.max(0,allMedia.length-media.length),rejectedUnboundPosters:Math.max(0,allPosters.length-posters.length)},networkAudit:evidence.audit||{}};
}
function reelPaneSeedNodesV44R21R14(){var out=[],seen=new Set();function add(x){if(!x||seen.has(x)||!U.vis(x)||x.closest&&x.closest('#fb-b35-unified-v44-panel'))return;seen.add(x);out.push(x);}var sels=['[role="textbox"][aria-label*="comment" i]','[role="textbox"][aria-label*="coment" i]','textarea[placeholder*="comment" i]','textarea[placeholder*="coment" i]','[role="article"]','[aria-label^="Comment by" i]','[aria-label^="Reply by" i]','[aria-label^="Comentário de" i]','[aria-label^="Resposta de" i]'];try{sels.forEach(function(s){Array.prototype.slice.call(document.querySelectorAll(s)).slice(0,1200).forEach(add);});Array.prototype.slice.call(document.querySelectorAll('button,[role="button"],a,span,div')).slice(0,12000).forEach(function(el){if(!U.vis(el))return;var z=U.T(el.getAttribute&&el.getAttribute('aria-label')||el.innerText||el.textContent||'');if(/^(?:Reply|Responder|See translation|Ver tradu[cç][aã]o|See Original|Ver original)(?:\b|$)/i.test(z))add(el);});Array.prototype.slice.call(document.querySelectorAll('a[href]')).slice(0,8000).forEach(function(a){if(!U.vis(a)||!profileIdentityFromUrl(a.href||''))return;var r=a.getBoundingClientRect();if(r.left>innerWidth*.48)add(a);});}catch(_){}return out;}
function reelPaneScoreV44R21R14(el){if(!el||!U.vis(el)||el===document.body||el===document.documentElement)return -99999;try{var r=el.getBoundingClientRect(),vw=Math.max(1,innerWidth||1),vh=Math.max(1,innerHeight||1);if(r.width<250||r.width>Math.min(760,vw*.58)||r.height<220||r.height>vh*1.35||r.left<vw*.38)return -99999;if(el.querySelectorAll&&el.querySelectorAll('[data-video-id],video').length)return -99999;var tx=U.T(el.innerText||el.textContent||'').slice(0,5000),editor=/write a comment|comment as|leave a comment|escreva um coment[aá]rio|comentar como/i.test(tx),filter=/all comments|most relevant|todos os coment[aá]rios|mais relevantes/i.test(tx),actions=0,articles=0,profiles=0;Array.prototype.slice.call(el.querySelectorAll('button,[role="button"],a,span')).slice(0,1500).forEach(function(x){var z=U.T(x.getAttribute&&x.getAttribute('aria-label')||x.innerText||x.textContent||'');if(/^(?:Reply|Responder|See translation|Ver tradu[cç][aã]o|Like|Curtir)(?:\b|$)/i.test(z))actions++;});articles=el.querySelectorAll('[role="article"],[aria-label^="Comment by" i],[aria-label^="Reply by" i],[aria-label^="Comentário de" i],[aria-label^="Resposta de" i]').length;Array.prototype.slice.call(el.querySelectorAll('a[href]')).slice(0,1000).forEach(function(a){if(profileIdentityFromUrl(a.href||''))profiles++;});if(!editor&&!filter&&articles<1&&actions<2&&profiles<2)return -99999;var range=Math.max(0,Number(el.scrollHeight||0)-Number(el.clientHeight||0)),cs=getComputedStyle(el),score=(editor?2400:0)+(filter?900:0)+Math.min(2600,articles*450)+Math.min(1800,actions*90)+Math.min(1800,profiles*120)+(r.left>vw*.62?900:0)+(range>40?Math.min(1200,range/2):0)+(/auto|scroll|overlay/i.test(String(cs.overflowY||''))?700:0);if(r.width>vw*.50)score-=500;return score;}catch(_){return -99999;}}
function findReelCommentSurfaceV44R21R14(){var seeds=reelPaneSeedNodesV44R21R14(),cands=[],seen=new Set();seeds.forEach(function(seed){var cur=seed;for(var i=0;i<12&&cur&&cur!==document.body;i++,cur=cur.parentElement){if(!seen.has(cur)){seen.add(cur);cands.push(cur);}}});try{Array.prototype.slice.call(document.querySelectorAll('[role="complementary"],[role="dialog"],aside')).slice(0,100).forEach(function(x){if(!seen.has(x)){seen.add(x);cands.push(x);}});}catch(_){}var best=null,bestScore=-99999;cands.forEach(function(el){var s=reelPaneScoreV44R21R14(el);if(s>bestScore){bestScore=s;best=el;}});if(best&&bestScore>=900){__REEL_COMMENT_PANEL_V44R21R3__=best;return best;}return null;}
function reelMetricNodesV44R21R14(){var vis=reelVisibleVideoV44R21R14(),c=__REEL_COUNTS_SNAPSHOT__||{},vals=[Number(c.like||0),Number(c.comment||0),Number(c.share||0)],out=[],seen={};if(!vis)return out;var vr=vis.rect,nodes=[];try{nodes=Array.prototype.slice.call(document.querySelectorAll('span,div,a,button,[role="button"]')).slice(0,16000);}catch(_){}nodes.forEach(function(el){if(!U.vis(el)||el.closest&&el.closest('#fb-b35-unified-v44-panel'))return;var n=reelExactCountV44R21R8(el);if(n==null||vals.indexOf(n)<0)return;try{var r=el.getBoundingClientRect();if(r.width<4||r.height<4||r.width>180||r.height>80)return;if(r.left<vr.right-120||r.left>Math.min(innerWidth,vr.right+520)||r.top<vr.top+100||r.bottom>Math.max(vr.bottom+130,innerHeight+80))return;var key=Math.round(r.left)+'|'+Math.round(r.top)+'|'+n,area=r.width*r.height;if(!seen[key]||area<seen[key].area)seen[key]={el:el,count:n,top:r.top,left:r.left,area:area};}catch(_){} });Object.keys(seen).forEach(function(k){out.push(seen[k]);});out.sort(function(a,b){return a.top-b.top||a.left-b.left||a.area-b.area;});return out;}
function reelCommentClickTargetV44R21R14(){var accessible=[],nodes=[];try{nodes=Array.prototype.slice.call(document.querySelectorAll('button,[role="button"],[aria-label],[title],a')).slice(0,10000);}catch(_){}nodes.forEach(function(el){if(!U.vis(el)||el.closest&&el.closest('#fb-b35-unified-v44-panel'))return;var z=U.T((el.getAttribute&&el.getAttribute('aria-label')||'')+' '+(el.getAttribute&&el.getAttribute('title')||'')+' '+(el.innerText||el.textContent||''));var s=0;if(/open\s+(?:the\s+)?comments?|abrir\s+coment[aá]rios?|view\s+comments?|ver\s+coment[aá]rios?/i.test(z))s+=3000;if(/^(?:comments?|coment[aá]rios?|comment|comentar)(?:\s+[\d.,KkMm]+)?$/i.test(z))s+=2200;if(/write a comment|comment as|leave a comment|escreva um coment[aá]rio/i.test(z))s-=4000;if(s>0)accessible.push({el:el,score:s});});accessible.sort(function(a,b){return b.score-a.score;});if(accessible[0])return {el:accessible[0].el,why:'accessible'};var rail=reelMetricRailV44R21R8();if(rail&&rail.comment&&rail.comment.clickTarget)return {el:rail.comment.clickTarget,why:'legacy_metric_rail'};var nums=reelMetricNodesV44R21R14(),comment=Number(__REEL_COUNTS_SNAPSHOT__&&__REEL_COUNTS_SNAPSHOT__.comment||0),like=Number(__REEL_COUNTS_SNAPSHOT__&&__REEL_COUNTS_SNAPSHOT__.like||0),used=false;for(var i=0;i<nums.length;i++){if(nums[i].count===like&&!used){used=true;continue;}if(nums[i].count===comment){var cur=nums[i].el,best=cur;for(var j=0;j<7&&cur&&cur!==document.body;j++,cur=cur.parentElement){try{var r=cur.getBoundingClientRect(),tag=String(cur.tagName||'').toLowerCase(),role=String(cur.getAttribute&&cur.getAttribute('role')||'').toLowerCase();if(r.width>220||r.height>140)continue;if(tag==='button'||tag==='a'||role==='button'||cur.hasAttribute&&cur.hasAttribute('tabindex')){best=cur;break;}}catch(_){} }return {el:best,why:'video_rect_metric_rail'};}}return null;}
function openReelCommentsSurfaceV44R21R14(){var id=currentReelIdV44R21R8(),existing=findReelCommentSurfaceV44R21R14();if(existing)return Promise.resolve(existing);var attempts=0,start=Date.now();return new Promise(function(resolve){function loop(){if(!reelRouteLockedV44R21R8(id)){resolve(null);return;}var pane=findReelCommentSurfaceV44R21R14();if(pane){resolve(pane);return;}if(attempts>=8||Date.now()-start>22000){resolve(null);return;}attempts++;var t=reelCommentClickTargetV44R21R14();if(t){try{clickObservedControlV44R17(t.el);}catch(_){try{t.el.click();}catch(__){}}}setTimeout(loop,t?1500:700);}loop();});}
function reelFallbackCardsV44R21R14(root){var out=[],seen=new Set();function add(card){if(!card||seen.has(card)||!U.vis(card))return;seen.add(card);out.push(card);}try{Array.prototype.slice.call(root.querySelectorAll('[role="article"],[aria-label^="Comment by" i],[aria-label^="Reply by" i],[aria-label^="Comentário de" i],[aria-label^="Resposta de" i]')).forEach(add);if(!out.length)Array.prototype.slice.call(root.querySelectorAll('button,[role="button"],a,span')).slice(0,8000).forEach(function(seed){var z=U.T(seed.getAttribute&&seed.getAttribute('aria-label')||seed.innerText||seed.textContent||'');if(!/^(?:Reply|Responder|See translation|Ver tradu[cç][aã]o)(?:\b|$)/i.test(z))return;var cur=seed,best=null;for(var i=0;i<9&&cur&&cur!==root;i++,cur=cur.parentElement){var links=cur.querySelectorAll?cur.querySelectorAll('a[href]').length:0,tx=U.T(cur.innerText||cur.textContent||'');if(links&&tx.length>=3&&tx.length<2400)best=cur;}add(best);});}catch(_){}out.sort(function(a,b){return (a.compareDocumentPosition(b)&Node.DOCUMENT_POSITION_FOLLOWING)?-1:1;});return out;}
function reelCollectSliceV44R21R14(root){root=root||findReelCommentSurfaceV44R21R14()||document.body;var base=collectSlice(root);if(base&&Number(base.L1||0)+Number(base.L2||0)>0)return base;var cards=reelFallbackCardsV44R21R14(root),processed=[];cards.forEach(function(n){var au=authorOf(n),tx=mainText(n);if(au.name&&tx===au.name){var alt=mainTextWithoutAuthor(n,au);if(alt)tx=alt;}var mediaCheck=collectNodeMedia(n,null);if(!au.name||(!tx&&(!mediaCheck||!mediaCheck.length)))return;if(/^(?:Reply|Responder|Like|Curtir|See translation|Ver tradu[cç][aã]o)$/i.test(tx))tx='';var aria=U.T(n.getAttribute&&n.getAttribute('aria-label')||''),reply=/^(?:Reply by|Resposta de|Respuesta de)/i.test(aria),stamp=timestampOf(n),av=avatarURLStrong(au._el,n)||null,reacts=extractReactions(n),media=collectNodeMedia(n,av);processed.push({el:n,sourceId:stableNodeId(n),author:au.name,href:au.href||'#',text:tx,date:stamp.text||'',dateISO:stamp.iso||null,av:av,reacts:reacts,media:media||[],reply:reply,left:U.left(n)});});if(!processed.length)return {L1:0,L2:0,rows:[]};var minLeft=Math.min.apply(null,processed.map(function(x){return x.left;})),rows=[],lastMain=null,L2=0;processed.forEach(function(it){var isReply=it.reply||it.left>minLeft+24,node={type:isReply?'reply':'comment',sourceId:it.sourceId||null,author:it.author,authorHref:it.href,text:it.text,likes:it.reacts&&it.reacts.total!=null?it.reacts.total:'',date:it.date,dateISO:it.dateISO,avatarUrl:it.av,avatar:null,replies:[],reacts:it.reacts,media:it.media};if(isReply&&lastMain){lastMain.replies.push(node);L2++;}else{rows.push(node);lastMain=node;}});return {L1:rows.length,L2:L2,rows:rows};}
function reelNetworkSliceV44R21R14(){var ev=reelEvidenceSnapshotV44R21R14(),items=Array.isArray(ev.comments)?ev.comments:[],roots=[],byId={},pending=[];function node(it){var date=String(it.date||''),iso=null;if(/^\d{9,13}$/.test(date)){var n=Number(date);if(date.length===10)n*=1000;var d=new Date(n);if(isFinite(d.getTime()))iso=d.toISOString();}return {type:it.parentId?'reply':'comment',sourceId:it.sourceId||null,author:it.author||'',authorHref:it.authorHref||'#',text:it.text||'',likes:Number(it.likes||0)||'',date:iso||date,dateISO:iso,avatarUrl:it.avatarUrl||null,avatar:null,replies:[],reacts:null,media:Array.isArray(it.media)?it.media:[]};}items.forEach(function(it){var n=node(it);if(it.parentId)pending.push({it:it,node:n});else{roots.push(n);if(it.sourceId)byId[String(it.sourceId)]=n;}});pending.forEach(function(x){var p=byId[String(x.it.parentId||'')];if(p)p.replies.push(x.node);else roots.push(x.node);});var L2=0;roots.forEach(function(r){L2+=(r.replies||[]).length;});return {L1:roots.length,L2:L2,rows:roots,networkAudit:ev.audit||{}};}
function reelScrollCandidatesV44R21R14(pane){var out=[],seen=new Set();function add(el,score){if(!el||seen.has(el)||!U.vis(el))return;seen.add(el);try{var r=el.getBoundingClientRect(),range=Math.max(0,Number(el.scrollHeight||0)-Number(el.clientHeight||0));if(range<30||r.width<220||r.height<180||r.width>800||r.left<innerWidth*.38)return;if(el.querySelectorAll&&el.querySelectorAll('video,[data-video-id]').length)return;var cs=getComputedStyle(el);out.push({el:el,score:score+range+(/auto|scroll|overlay/i.test(String(cs.overflowY||''))?1500:0)});}catch(_){} }var cur=pane;for(var i=0;i<10&&cur&&cur!==document.body;i++,cur=cur.parentElement)add(cur,6000-i*200);try{Array.prototype.slice.call(pane.querySelectorAll('*')).slice(0,5000).forEach(function(el){add(el,0);});}catch(_){}out.sort(function(a,b){return b.score-a.score;});return out.slice(0,4).map(function(x){return x.el;});}
function progressiveHarvestReelV44R21R14(initialPanel){return new Promise(function(resolve){var id=currentReelIdV44R21R8(),bag=new Map(),pane=findReelCommentSurfaceV44R21R14()||null,scrollers=[],waves=0,last=0,stable=0,bottomStable=0,start=Date.now(),target=Number(__REEL_COUNTS_SNAPSHOT__&&__REEL_COUNTS_SNAPSHOT__.comment||0),MAX_MS=120000;function mergeNow(){if(pane)mergeInto(bag,reelCollectSliceV44R21R14(pane));mergeInto(bag,reelNetworkSliceV44R21R14());var s=summarize(bag);if(window.__HUDH__&&window.__HUDH__.setStats)window.__HUDH__.setStats(s.L1,s.L2);return s;}function finish(reason){var s=mergeNow(),total=s.L1+s.L2,ev=reelEvidenceSnapshotV44R21R14();s.collectionAudit={mode:'REEL_DOM_NETWORK_TARGET_BOUND_V44R21R14',declaredTarget:target,collectedTotal:total,targetReached:target>0?total>=target:true,waves:waves,stableCycles:stable,bottomStableCycles:bottomStable,terminalReason:reason,elapsedMs:Date.now()-start,panelObserved:!!pane,routeLocked:reelRouteLockedV44R21R8(id),networkAudit:ev.audit||{},mediaEvidence:{mediaCandidates:(ev.media||[]).length,posterCandidates:(ev.posters||[]).length}};resolve(s);}function step(){if(!reelRouteLockedV44R21R8(id)){finish('ROUTE_LOCK_VIOLATION');return;}if(window.__HUDH__&&window.__HUDH__.stop&&window.__HUDH__.stop()){finish('USER_STOP');return;}if(Date.now()-start>=MAX_MS){finish('MAX_TIME');return;}waves++;if(window.__HUDH__&&window.__HUDH__.set)window.__HUDH__.set(Math.min(68,12+Math.round(waves*.5)),'Reel: abrindo e percorrendo o painel de comentários…');var open= pane?Promise.resolve(pane):openReelCommentsSurfaceV44R21R14();open.then(function(found){pane=found||findReelCommentSurfaceV44R21R14()||pane;if(pane){__REEL_COMMENT_PANEL_V44R21R3__=pane;return clickAllUntilExhausted(pane,30);}return Promise.resolve(0);}).then(function(){var before=mergeNow(),beforeTotal=before.L1+before.L2,mv={moved:false,atBottom:false};if(pane){if(!scrollers.length||waves%4===1)scrollers=reelScrollCandidatesV44R21R14(pane);mv=scrollReelCommentWaveV44R21R3(pane,scrollers);}return U.sleep(pane?850:600).then(function(){var after=mergeNow(),cur=after.L1+after.L2,more=pane?findButtons(pane).length:0;if(cur>last||cur>beforeTotal){last=cur;stable=0;bottomStable=0;}else{stable++;if(pane&&mv.atBottom&&!more)bottomStable++;else bottomStable=0;}if(target>0&&cur>=target){finish('DECLARED_TARGET_REACHED');return true;}if(pane&&bottomStable>=12&&stable>=12){finish('CONFIRMED_BOTTOM_NO_MORE_CONTROLS');return true;}if(!pane&&Date.now()-start>24000&&cur===0){finish('COMMENT_PANE_NOT_MATERIALIZED');return true;}if(!pane&&Date.now()-start>30000&&cur>0&&stable>=10){finish('NETWORK_ONLY_STABLE_PARTIAL');return true;}return false;});}).then(function(done){if(!done)setTimeout(step,120);}).catch(function(e){console.warn('Reel V44R21R14:',e);if(Date.now()-start>30000)finish('ERROR_SAFE_PARTIAL');else setTimeout(step,400);});}mergeNow();step();});}
try{window.__FB_REEL_V44R21R14_TEST__={findPane:findReelCommentSurfaceV44R21R14,openPane:openReelCommentsSurfaceV44R21R14,collect:function(){return reelCollectSliceV44R21R14(findReelCommentSurfaceV44R21R14()||document.body);},network:reelNetworkSliceV44R21R14,media:reelMediaSnapshotV44R21R14,metricNodes:reelMetricNodesV44R21R14,clickTarget:reelCommentClickTargetV44R21R14};}catch(_){}



/* V44R21R17 — correção isolada de POST.
   1) rejeita timestamps de comentários (ex.: "Comment by ... 19 minutes ago")
      como métricas; 2) saneia ruído ofuscado do cabeçalho e rótulos de
      compartilhamento confundidos com privacidade; 3) executa varredura
      bidirecional adicional quando o primeiro percurso termina abaixo do alvo.
   PHOTO e REEL não entram em nenhuma destas rotas. */
function postIsTargetContextV44R21R17(payload){
  try{var c=payload&&payload.audit&&String(payload.audit.context||'').toUpperCase();if(c)return c==='POST';return postTypeFromUrl(location.href)==='POST'&&!isPhotoContext()&&!isReelContext();}catch(_){return false;}
}
function postFoldTextV44R21R17(raw){
  var s=t(raw).toLowerCase();try{s=s.normalize('NFD').replace(/[\u0300-\u036f]/g,'');}catch(_){}return s;
}
function postMetricTemporalNoiseV44R21R17(label){
  var s=postFoldTextV44R21R17(label);if(!s)return false;
  if(/(?:^|\b)(?:comment|reply)\s+by\b/.test(s)||/(?:^|\b)(?:comentario|resposta)\s+(?:de|por)\b/.test(s))return true;
  if(/\b\d+(?:[.,]\d+)?\s*(?:seconds?|secs?|minutes?|mins?|hours?|days?|weeks?|months?|years?|segundos?|minutos?|horas?|dias?|semanas?|meses?|anos?|s|min|h|d|w|mo|y)\s+(?:ago|atras)\b/.test(s))return true;
  if(/\b(?:ha|faz)\s+\d+(?:[.,]\d+)?\s*(?:segundos?|minutos?|horas?|dias?|semanas?|meses?|anos?)\b/.test(s))return true;
  return false;
}
function postOpaqueHeaderTokenV44R21R17(raw){
  var s=t(raw);if(!s)return false;
  if(/(?:^|\s)(?:[A-Za-z0-9]\s+){8,}[A-Za-z0-9](?:\s|$|[·•])/.test(s))return true;
  var compact=s.replace(/\s+/g,'');
  if(/^pfbid[\w-]{12,}$/i.test(compact))return true;
  if(compact.length>=18&&/^[A-Za-z0-9_-]+$/.test(compact)&&/[A-Za-z]/.test(compact)&&/\d/.test(compact))return true;
  return false;
}
function postSanitizeHeaderStoryV44R21R17(raw,author){
  var s=t(raw).replace(/[\u2060\u2061\u2062\u2063\u2064\u2066-\u2069]/g,' ');if(!s)return '';
  s=s.replace(/(?:^|\s)((?:[A-Za-z0-9]\s+){8,}[A-Za-z0-9])(?=\s|[·•]|$)/g,' ');
  s=s.replace(/\b(?=[A-Za-z0-9_-]{18,}\b)(?=[A-Za-z0-9_-]*[A-Za-z])(?=[A-Za-z0-9_-]*\d)[A-Za-z0-9_-]+\b/g,' ');
  s=t(s).replace(/\s*[·•]\s*(?:[·•]\s*)+/g,' · ');
  var a=t(author||'');if(a){var ae=a.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),rest=t(s.replace(new RegExp('^'+ae,'i'),'').replace(/^[·•\s]+/,'')).replace(/^(?:Follow|Seguir)(?:\s*[·•])?$/i,'');if(!rest)return '';}
  if(postOpaqueHeaderTokenV44R21R17(s)||fbIsScrambledMetaNoise(s))return '';
  return s;
}
function postValidPrivacyV44R21R17(raw){
  var s=t(raw),f=postFoldTextV44R21R17(s);if(!s)return '';
  if(/send this to friends|post it on your profile|share|compartilh/.test(f))return '';
  if(/^(?:public|shared with public|publico|friends|shared with friends|amigos|only me|somente eu|custom|personalizado|specific friends|amigos especificos|friends except|amigos exceto)(?:[ .·•-].*)?$/.test(f))return s;
  return '';
}
function sanitizePostMetadataV44R21R17(meta){
  meta=meta&&typeof meta==='object'?meta:{};var author=t(meta.author||'');
  meta.headerStoryText=postSanitizeHeaderStoryV44R21R17(meta.headerStoryText||'',author);
  var authorLow=postFoldTextV44R21R17(author),seen={};
  meta.headerEntities=(Array.isArray(meta.headerEntities)?meta.headerEntities:[]).filter(function(x){
    var tx=t(x&&x.text||''),low=postFoldTextV44R21R17(tx),url=String(x&&x.url||''),type=String(x&&x.type||'');
    if(!tx||postOpaqueHeaderTokenV44R21R17(tx)||fbIsScrambledMetaNoise(tx))return false;
    if(/\/posts\/(?:pfbid|\d+)/i.test(url)&&low!==authorLow)return false;
    if(type==='author'&&authorLow&&low!==authorLow)return false;
    var k=type+'|'+low+'|'+url;if(seen[k])return false;seen[k]=1;return true;
  });
  if(!meta.headerStoryText)meta.headerEntities=meta.headerEntities.filter(function(x){return String(x&&x.type||'')==='author'&&postFoldTextV44R21R17(x&&x.text||'')===authorLow;});
  meta.privacyText=postValidPrivacyV44R21R17(meta.privacyText||'');
  meta.metadataSchemaVersion='POST_METADATA_V44R21R17_SEMANTIC_GUARD';
  return meta;
}
function postTrustedDeclaredTargetV44R21R17(payload){
  var a=payload&&payload.audit||{},vals=[a.collectionTerminal&&a.collectionTerminal.declaredTarget,a.allCommentsGate&&a.allCommentsGate.declaredTarget],out=0;
  vals.forEach(function(v){v=Number(v||0);if(isFinite(v)&&v>0&&v<=5000000&&!out)out=Math.round(v);});return out;
}
function postCommentCountInvalidV44R21R17(counts,target){
  counts=counts||{};var v=Number(counts.comment),ev=counts._observedEvidence&&counts._observedEvidence.comment||{},label=t(ev.label||'');
  if(postMetricTemporalNoiseV44R21R17(label))return true;
  if(!isFinite(v)||v<=0)return true;
  if(target>0&&v>Math.max(target*20,target+5000))return true;
  return false;
}
function sanitizePostCountsV44R21R17(counts,target,audit){
  counts=counts&&typeof counts==='object'?counts:{like:null,comment:null,share:null,view:null};target=Number(target||0);
  var before=counts.comment,invalid=postCommentCountInvalidV44R21R17(counts,target);
  if(invalid){counts.comment=target>0?target:null;counts._observedEvidence=counts._observedEvidence||{};counts._observedEvidence.comment=target>0?{label:'Alvo declarado confirmado no diálogo da postagem',value:target,source:'post_declared_target_semantic_guard_v44r21r17'}:{label:'Métrica de comentários rejeitada por ruído temporal',value:null,source:'post_metric_rejected_v44r21r17'};}
  else if((counts.comment==null||Number(counts.comment)<=0)&&target>0)counts.comment=target;
  if(audit&&before!==counts.comment){audit.metricCorrections=audit.metricCorrections||[];audit.metricCorrections.push({field:'counts.comment',before:before,after:counts.comment,reason:'COMMENT_TIMESTAMP_OR_IMPLAUSIBLE_RATIO_REJECTED_V44R21R17'});}
  return counts;
}
function sanitizePostPayloadV44R21R17(payload){
  if(!postIsTargetContextV44R21R17(payload))return payload;
  payload=payload||{};payload.audit=payload.audit||{};payload.meta=sanitizePostMetadataV44R21R17(payload.meta||{});
  var target=postTrustedDeclaredTargetV44R21R17(payload);payload.counts=sanitizePostCountsV44R21R17(payload.counts||{},target,payload.audit);
  payload.audit.postSemanticGuard={version:'V44R21R17',target:target,commentEvidence:payload.counts&&payload.counts._observedEvidence&&payload.counts._observedEvidence.comment||null,headerStoryAccepted:!!(payload.meta&&payload.meta.headerStoryText),privacyAccepted:!!(payload.meta&&payload.meta.privacyText)};
  return payload;
}
function postFixReportHtmlV44R21R17(html,payload){
  if(!postIsTargetContextV44R21R17(payload))return html;
  return String(html||'').replace(/<\/b>(rea[cç][oõ]es|coment[aá]rios declarados|coment[aá]rios carregados|respostas|compartilhamentos|visualiza[cç][oõ]es)/gi,'</b>&nbsp;$1');
}
var __BASE_POST_METRIC_KIND_V44R21R17__=postMetricLabelKindV44R21R16;
postMetricLabelKindV44R21R16=function(label){if(postMetricTemporalNoiseV44R21R17(label))return '';return __BASE_POST_METRIC_KIND_V44R21R17__(label);};
var __BASE_POST_SURFACE_METRICS_V44R21R17__=collectPostSurfaceMetricsV44R19;
collectPostSurfaceMetricsV44R19=function(){var out=__BASE_POST_SURFACE_METRICS_V44R21R17__();if(!postIsTargetContextV44R21R17())return out;['like','comment','share','view'].forEach(function(k){var ev=out&&out.evidence&&out.evidence[k];if(ev&&postMetricTemporalNoiseV44R21R17(ev.label||'')){out[k]=null;delete out.evidence[k];}});return out;};
var __BASE_COLLECT_COUNTS_V44R21R17__=collectCounts;
collectCounts=function(){var out=__BASE_COLLECT_COUNTS_V44R21R17__();if(!postIsTargetContextV44R21R17())return out;var target=0;try{target=postDeclaredCommentTargetV44R21R16(findPostTargetDialogV44R21R16()||panelRoot(),out);}catch(_){}return sanitizePostCountsV44R21R17(out,target,null);};
var __BASE_POST_PAYLOAD_FALLBACK_V44R21R17__=fbPostApplyMetadataFallbackToPayload;
fbPostApplyMetadataFallbackToPayload=function(payload){return sanitizePostPayloadV44R21R17(__BASE_POST_PAYLOAD_FALLBACK_V44R21R17__(payload));};
var __BASE_BUILD_HTML_V44R21R17__=buildHTML;
buildHTML=function(payload){return postFixReportHtmlV44R21R17(__BASE_BUILD_HTML_V44R21R17__(payload),payload);};

function postResetRecoveryTopV44R21R17(panel){
  var cands=postScrollCandidatesV44R21R16(panel),moved=false,diag=[];
  cands.slice(0,5).forEach(function(x){var sc=x.el||x;try{var before=Number(sc.scrollTop||0);if(typeof sc.scrollTo==='function')sc.scrollTo({top:0,behavior:'auto'});else sc.scrollTop=0;sc.dispatchEvent(new Event('scroll',{bubbles:true}));try{sc.dispatchEvent(new WheelEvent('wheel',{bubbles:true,cancelable:true,deltaY:-1600,deltaMode:0}));}catch(_){}var after=Number(sc.scrollTop||0);if(Math.abs(after-before)>2)moved=true;diag.push({kind:x.kind||'',before:before,after:after});}catch(_){}});
  try{var rows=panel?panel.querySelectorAll('div[role="article"],li[aria-posinset],[aria-label^="Comment by" i],[aria-label^="Reply by" i]'):[];if(rows&&rows[0])rows[0].scrollIntoView({block:'start',inline:'nearest',behavior:'auto'});}catch(_){}
  return {moved:moved,diagnostics:diag};
}
function progressiveHarvestPostV44R21R17(initialPanel){
  return progressiveHarvestPostV44R21R16(initialPanel).then(function(first){
    var firstTotal=Number(first&&first.L1||0)+Number(first&&first.L2||0),target=Number(first&&first.collectionAudit&&first.collectionAudit.declaredTarget||0);
    if(!target||firstTotal>=target)return first;
    return new Promise(function(resolve){
      var routeKey=currentPostRouteKeyV44R21R16(),panel=findPostTargetDialogV44R21R16()||initialPanel||panelRoot(),bag=new Map(),sweeps=0,waves=0,stable=0,last=firstTotal,started=Date.now(),lastMove=null,resetDiag=null,MAX_SWEEPS=3,MAX_WAVES=75,MAX_MS=90000;
      mergeInto(bag,first||{rows:[]});
      function reacquire(){var p=findPostTargetDialogV44R21R16();if(p)panel=p;return panel;}
      function snapshot(){var p=reacquire();if(p)mergeInto(bag,collectSlice(p));var s=summarize(bag);if(window.__HUDH__&&window.__HUDH__.setStats)window.__HUDH__.setStats(s.L1,s.L2);return s;}
      function finish(reason){var s=snapshot(),total=s.L1+s.L2;s.collectionAudit={mode:'POST_TARGET_DIALOG_BIDIRECTIONAL_RECOVERY_V44R21R17',declaredTarget:target,collectedTotal:total,targetReached:total>=target,waves:Number(first.collectionAudit&&first.collectionAudit.waves||0)+waves,recoveryWaves:waves,recoverySweeps:sweeps,stableCycles:stable,terminalReason:reason,elapsedMs:Number(first.collectionAudit&&first.collectionAudit.elapsedMs||0)+(Date.now()-started),routeLocked:postRouteLockedV44R21R16(routeKey),targetDialogObserved:!!findPostTargetDialogV44R21R16(),previousTerminal:first.collectionAudit||null,lastMove:lastMove,topReset:resetDiag};resolve(s);}
      function beginSweep(){if(sweeps>=MAX_SWEEPS){finish('BIDIRECTIONAL_SWEEPS_EXHAUSTED_SAFE_PARTIAL');return;}sweeps++;stable=0;var p=reacquire();if(!p){setTimeout(beginSweep,500);return;}resetDiag=postResetRecoveryTopV44R21R17(p);Promise.resolve(ensureAllCommentsSelected()).catch(function(){return false;}).then(function(){return U.sleep(1100);}).then(step);}
      function step(){
        if(window.__HUDH__&&window.__HUDH__.stop&&window.__HUDH__.stop()){finish('USER_STOP');return;}
        if(!postRouteLockedV44R21R16(routeKey)){finish('POST_ROUTE_LOCK_VIOLATION');return;}
        if(Date.now()-started>=MAX_MS||waves>=MAX_WAVES){finish('BIDIRECTIONAL_RECOVERY_LIMIT_SAFE_PARTIAL');return;}
        var p=reacquire();if(!p){setTimeout(step,450);return;}waves++;var before=snapshot(),beforeTotal=before.L1+before.L2;
        if(window.__HUDH__&&window.__HUDH__.set)window.__HUDH__.set(Math.min(94,78+Math.round(waves*.18)),'Post: varredura bidirecional '+sweeps+'/'+MAX_SWEEPS+' · '+beforeTotal+'/'+target+' registros…');
        postMoreControlsV44R21R16(p,true);clickAllUntilExhausted(p,80).then(function(){var cands=postScrollCandidatesV44R21R16(p),mv=postMoveWaveV44R21R16(p,cands,waves);lastMove=mv;return U.waitMut(p,1700).then(function(){return U.sleep(650);}).then(function(){var after=snapshot(),total=after.L1+after.L2,more=postMoreControlsV44R21R16(p,false).length+findButtons(p).length;if(total>last||total>beforeTotal){last=total;stable=0;}else stable++;if(total>=target){finish('DECLARED_TARGET_REACHED_AFTER_BIDIRECTIONAL_RECOVERY');return true;}if(mv.atBottom&&!more&&stable>=8){beginSweep();return true;}return false;});}).then(function(done){if(!done)setTimeout(step,180);}).catch(function(e){console.warn('POST V44R21R17 recovery:',e);if(Date.now()-started>45000)finish('BIDIRECTIONAL_RECOVERY_ERROR_SAFE_PARTIAL');else setTimeout(step,500);});
      }
      beginSweep();
    });
  });
}
try{window.__FB_POST_V44R21R17_TEST__={metricNoise:postMetricTemporalNoiseV44R21R17,opaqueHeader:postOpaqueHeaderTokenV44R21R17,sanitizeHeader:postSanitizeHeaderStoryV44R21R17,sanitizeMetadata:sanitizePostMetadataV44R21R17,sanitizeCounts:sanitizePostCountsV44R21R17,sanitizePayload:sanitizePostPayloadV44R21R17,fixHtml:postFixReportHtmlV44R21R17};}catch(_){}


/* V44R21R18 — correção exclusiva de POST para estagnação em 10/11 registros.
   Combina três vias sem alterar PHOTO ou REEL: (1) acumulador DOM durante
   virtualização; (2) rolagem incremental adaptativa no scroller real; e
   (3) continuação GraphQL sanitizada a partir das requisições que o próprio
   Facebook já fez na sessão. */
function postCommentNetworkApiV44R21R18(){try{return window.__FB_POST_COMMENT_NETWORK_V44R21R18__||null;}catch(_){return null;}}
function postCommentNetworkSnapshotV44R21R18(){var api=postCommentNetworkApiV44R21R18();try{if(api&&typeof api.request==='function')api.request();if(api&&typeof api.snapshot==='function')return api.snapshot()||{};}catch(_){}return {comments:[],hasNext:false,audit:{status:'UNAVAILABLE'}};}
function postCommentNetworkSliceV44R21R18(){var ev=postCommentNetworkSnapshotV44R21R18(),items=Array.isArray(ev.comments)?ev.comments:[],roots=[],byId={},pending=[];function node(it){var date=String(it.date||''),iso=null;if(/^\d{9,13}$/.test(date)){var n=Number(date);if(date.length===10)n*=1000;var d=new Date(n);if(isFinite(d.getTime()))iso=d.toISOString();}return {type:it.parentId?'reply':'comment',sourceId:it.sourceId||null,author:it.author||'',authorHref:it.authorHref||'#',text:it.text||'',likes:Number(it.likes||0)||'',date:iso||date,dateISO:iso,avatarUrl:it.avatarUrl||null,avatar:null,replies:[],reacts:null,media:Array.isArray(it.media)?it.media:[]};}items.forEach(function(it){var n=node(it);if(it.parentId)pending.push({it:it,node:n});else{roots.push(n);if(it.sourceId)byId[String(it.sourceId)]=n;}});pending.forEach(function(x){var p=byId[String(x.it.parentId||'')];if(p)p.replies.push(x.node);else roots.push(x.node);});var L2=0;roots.forEach(function(r){L2+=(r.replies||[]).length;});return {L1:roots.length,L2:L2,rows:roots,networkAudit:ev.audit||{},hasNext:!!ev.hasNext};}
function postArmCommentNetworkV44R21R18(target){var api=postCommentNetworkApiV44R21R18();try{if(api&&typeof api.arm==='function')api.arm({declaredTarget:Number(target||0)});}catch(_){} }
function postRequestCommentNextV44R21R18(){var api=postCommentNetworkApiV44R21R18();try{if(api&&typeof api.requestNext==='function')api.requestNext();}catch(_){} }
function postLayoutVisibleV44R21R18(el){if(!el)return false;try{var cs=getComputedStyle(el),r=el.getBoundingClientRect();return cs.display!=='none'&&cs.visibility!=='hidden'&&r.width>0&&r.height>0;}catch(_){return false;}}
function postLoadControlTextV44R21R18(el){try{return t((el.getAttribute&&el.getAttribute('aria-label')||'')+' '+(el.getAttribute&&el.getAttribute('title')||'')+' '+(el.innerText||el.textContent||''));}catch(_){return '';}}
function postLoadControlsV44R21R18(panel){var out=[],seen=[];if(!panel)return out;try{Array.prototype.slice.call(panel.querySelectorAll('button,[role="button"],a,[tabindex]')).slice(0,8000).forEach(function(el){if(!postLayoutVisibleV44R21R18(el)||seen.indexOf(el)>=0)return;var z=postLoadControlTextV44R21R18(el);if(!z||z.length>300)return;if(/All comments|Todos os coment[aá]rios|Most relevant|Mais relevantes|See translation|Ver tradu[cç][aã]o|Write a comment|Comment as|Escreva um coment[aá]rio|Comentar como/i.test(z))return;var ok=/(?:View|See|Show|Load|More|Previous|Older|Ver|Mostrar|Carregar|Mais|Anteriores?).{0,80}(?:comments?|coment[aá]rios?|repl(?:y|ies)|respostas?)/i.test(z)||/(?:comments?|coment[aá]rios?|repl(?:y|ies)|respostas?).{0,80}(?:View|See|Show|Load|More|Previous|Older|Ver|Mostrar|Carregar|Mais|Anteriores?)/i.test(z);if(!ok)return;seen.push(el);out.push(el);});}catch(_){}return out;}
function postClickLoadControlsV44R21R18(panel,limit){var btns=postLoadControlsV44R21R18(panel).slice(0,Math.max(1,Number(limit||12))),i=0;return new Promise(function(resolve){function one(){if(i>=btns.length||window.__HUDH__&&window.__HUDH__.stop&&window.__HUDH__.stop()){resolve(btns.length);return;}var el=btns[i++];try{el.scrollIntoView({block:'center',inline:'nearest',behavior:'auto'});}catch(_){}U.sleep(100).then(function(){try{if(typeof el.click==='function')el.click();else safeClick(el);}catch(_){try{safeClick(el);}catch(__){}}return U.waitMut(panel,1300);}).then(function(){return U.sleep(180);}).then(one);}one();});}
function postPrimaryScrollerV44R21R18(panel){var cands=postScrollCandidatesV44R21R16(panel),best=null,bestScore=-1;cands.forEach(function(x){var el=x.el||x;try{var range=Math.max(0,Number(el.scrollHeight||0)-Number(el.clientHeight||0));if(range<30)return;var ev=postCommentEvidenceV44R21R16(el),r=el.getBoundingClientRect(),score=Number(x.score||0)+Math.min(8000,range*2)+Math.min(9000,ev*140);if(panel&&panel.contains&&panel.contains(el))score+=3500;if(r.height>=300)score+=1200;if(score>bestScore){bestScore=score;best={el:el,score:score,range:range,kind:x.kind||'candidate'};}}catch(_){} });return best;}
function postScrollPulseV44R21R18(panel,wave){var pick=postPrimaryScrollerV44R21R18(panel);if(!pick)return Promise.resolve({moved:false,atBottom:false,scrollableSeen:false,kind:'none',before:0,after:0,max:0,height:0});var sc=pick.el,before=Number(sc.scrollTop||0),max=Math.max(0,Number(sc.scrollHeight||0)-Number(sc.clientHeight||0)),height=Math.max(260,Number(sc.clientHeight||600)),near=max-before<=Math.max(80,height*.22),target=near?Math.max(0,max-height*.42):Math.min(max,before+Math.max(280,height*.52)),steps=near?2:6,i=0;return new Promise(function(resolve){function set(v){try{if(typeof sc.scrollTo==='function')sc.scrollTo({top:v,behavior:'auto'});else sc.scrollTop=v;}catch(_){try{sc.scrollTop=v;}catch(__){}}}function tick(){i++;var v=before+(target-before)*(i/steps);set(v);if(i<steps){(window.requestAnimationFrame||function(fn){setTimeout(fn,16);})(tick);return;}if(near){setTimeout(function(){set(max);setTimeout(done,180);},140);}else setTimeout(done,140);}function done(){try{var rows=panel.querySelectorAll('div[role="article"],li[aria-posinset],[aria-label^="Comment by" i],[aria-label^="Reply by" i],[aria-label^="Comentário de" i],[aria-label^="Resposta de" i]');if(rows&&rows.length)rows[rows.length-1].scrollIntoView({block:'end',inline:'nearest',behavior:'auto'});}catch(_){}setTimeout(function(){var after=Number(sc.scrollTop||0),newMax=Math.max(0,Number(sc.scrollHeight||0)-Number(sc.clientHeight||0));resolve({moved:Math.abs(after-before)>2,atBottom:after>=newMax-8,scrollableSeen:true,kind:pick.kind,before:before,after:after,max:newMax,height:height,rangeGrew:newMax>max+4});},120);}tick();});}
function postResetTopV44R21R18(panel){var pick=postPrimaryScrollerV44R21R18(panel);if(!pick)return {moved:false,kind:'none'};var sc=pick.el,before=Number(sc.scrollTop||0);try{if(typeof sc.scrollTo==='function')sc.scrollTo({top:0,behavior:'auto'});else sc.scrollTop=0;}catch(_){}return {moved:Math.abs(Number(sc.scrollTop||0)-before)>2,kind:pick.kind,before:before,after:Number(sc.scrollTop||0)};}
function postStripOpaqueCaptionTailV44R21R18(raw){var s=String(raw||'').replace(/[\u2060\u2061\u2062\u2063\u2064\u2066-\u2069]/g,' '),parts=s.trim().split(/\s+/),take=[],i=parts.length-1;for(;i>=0&&take.length<3;i--){var w=parts[i];if(!/^[A-Za-z0-9_-]{12,}$/.test(w))break;take.unshift(w);}var compact=take.join('');if(compact.length>=34&&/[A-Za-z]/.test(compact)&&/(?:.*\d){6,}/.test(compact)){parts.splice(i+1,take.length);s=parts.join(' ');}return t(s);}
var __BASE_SANITIZE_POST_METADATA_V44R21R18__=sanitizePostMetadataV44R21R17;
sanitizePostMetadataV44R21R17=function(meta){meta=__BASE_SANITIZE_POST_METADATA_V44R21R18__(meta);if(postIsTargetContextV44R21R17())meta.caption=postStripOpaqueCaptionTailV44R21R18(meta.caption||'');meta.metadataSchemaVersion='POST_METADATA_V44R21R18_SEMANTIC_AND_CAPTION_GUARD';return meta;};
function progressiveHarvestPostV44R21R18(initialPanel){return new Promise(function(resolve){var routeKey=currentPostRouteKeyV44R21R16(),panel=findPostTargetDialogV44R21R16()||initialPanel||panelRoot(),bag=new Map(),target=postDeclaredCommentTargetV44R21R16(panel,__POST_COUNTS_SNAPSHOT__),waves=0,stable=0,bottomStable=0,sweeps=0,last=0,lastGrowthAt=Date.now(),started=Date.now(),lastMove=null,lastNetwork={},MAX_MS=240000,MAX_WAVES=220,MIN_EXHAUST_MS=90000;postArmCommentNetworkV44R21R18(target);function reacquire(){var p=findPostTargetDialogV44R21R16();if(p)panel=p;return panel;}function snapshot(){var p=reacquire();if(p)mergeInto(bag,collectSlice(p));var net=postCommentNetworkSliceV44R21R18();mergeInto(bag,net);lastNetwork=net.networkAudit||{};var s=summarize(bag);if(window.__HUDH__&&window.__HUDH__.setStats)window.__HUDH__.setStats(s.L1,s.L2);return s;}function finish(reason){var s=snapshot(),total=s.L1+s.L2,net=postCommentNetworkSnapshotV44R21R18();s.collectionAudit={mode:'POST_DOM_NETWORK_CURSOR_ADAPTIVE_PUMP_V44R21R18',declaredTarget:target,collectedTotal:total,targetReached:target>0?total>=target:true,waves:waves,stableCycles:stable,bottomStableCycles:bottomStable,recoverySweeps:sweeps,terminalReason:reason,elapsedMs:Date.now()-started,routeLocked:postRouteLockedV44R21R16(routeKey),targetDialogObserved:!!findPostTargetDialogV44R21R16(),lastMove:lastMove,networkAudit:net.audit||lastNetwork||{},networkHasNext:!!net.hasNext};resolve(s);}function step(){if(window.__HUDH__&&window.__HUDH__.stop&&window.__HUDH__.stop()){finish('USER_STOP');return;}if(!postRouteLockedV44R21R16(routeKey)){finish('POST_ROUTE_LOCK_VIOLATION');return;}if(Date.now()-started>=MAX_MS||waves>=MAX_WAVES){finish('ADAPTIVE_PUMP_LIMIT_SAFE_PARTIAL');return;}var p=reacquire();if(!p){setTimeout(step,500);return;}waves++;var before=snapshot(),beforeTotal=before.L1+before.L2;if(target>0&&beforeTotal>=target){finish('DECLARED_TARGET_REACHED');return;}var pct=target>0?Math.min(90,18+Math.round((beforeTotal/target)*68)):Math.min(90,18+Math.round(waves*.25));if(window.__HUDH__&&window.__HUDH__.set)window.__HUDH__.set(pct,'Post: '+beforeTotal+'/'+(target||'?')+' registros · DOM + paginação GraphQL · onda '+waves+'…');if(waves===1||waves%2===0)postRequestCommentNextV44R21R18();postClickLoadControlsV44R21R18(p,14).then(function(){return clickAllUntilExhausted(p,24);}).then(function(){return postScrollPulseV44R21R18(p,waves);}).then(function(mv){lastMove=mv;var wait=mv.atBottom?2600:1500;return U.waitMut(p,wait).then(function(){return U.sleep(mv.atBottom?750:350);}).then(function(){var after=snapshot(),total=after.L1+after.L2,grew=total>last||total>beforeTotal||mv.rangeGrew,net=postCommentNetworkSnapshotV44R21R18(),controls=postLoadControlsV44R21R18(p).length;if(grew){last=total;lastGrowthAt=Date.now();stable=0;bottomStable=0;}else{stable++;if(mv.atBottom&&!controls)bottomStable++;else bottomStable=0;}if(target>0&&total>=target){finish('DECLARED_TARGET_REACHED_DOM_OR_NETWORK');return true;}if(bottomStable>=7&&sweeps<3){sweeps++;postResetTopV44R21R18(p);try{ensureAllCommentsSelected();}catch(_){}postRequestCommentNextV44R21R18();stable=0;bottomStable=0;return U.sleep(1300).then(function(){return false;});}var elapsed=Date.now()-started,noGrowth=Date.now()-lastGrowthAt;if(elapsed>=MIN_EXHAUST_MS&&stable>=28&&bottomStable>=14&&!net.hasNext&&controls===0&&noGrowth>=60000){finish('CONFIRMED_POST_EXPOSED_DATA_EXHAUSTED_SAFE_PARTIAL');return true;}return false;});}).then(function(done){if(done===true)return;if(done&&typeof done.then==='function')return done.then(function(){setTimeout(step,180);});setTimeout(step,180);}).catch(function(e){console.warn('POST V44R21R18:',e);if(Date.now()-started>120000)finish('ADAPTIVE_PUMP_ERROR_SAFE_PARTIAL');else setTimeout(step,650);});}snapshot();U.sleep(350).then(step);});}
try{window.__FB_POST_V44R21R18_TEST__={networkSnapshot:postCommentNetworkSnapshotV44R21R18,networkSlice:postCommentNetworkSliceV44R21R18,loadControls:postLoadControlsV44R21R18,primaryScroller:postPrimaryScrollerV44R21R18,stripCaption:postStripOpaqueCaptionTailV44R21R18};}catch(_){}


/* V44R21R19 — canonicalização cirúrgica de IDs e terminal por registros únicos.
   O observador/paginador GraphQL V44R21R18 permanece intacto. Esta camada:
   (1) normaliza os aliases DOM `comment:<base64>` e GraphQL `<base64>`;
   (2) funde campos complementares sem duplicar registros;
   (3) reconstrói a árvore usando o pai observado quando o mesmo ID apareceu
       como raiz e resposta; e
   (4) calcula progresso, terminal e exportação somente após deduplicação.
   PHOTO não passa por esta camada. O coletor e a mídia de REEL permanecem
   byte a byte; apenas o resultado de comentários do REEL recebe a mesma
   normalização final para não exportar aliases duplicados. */
function postSafeUriDecodeV44R21R19(value){var s=String(value==null?'':value).trim();try{return decodeURIComponent(s);}catch(_){return s;}}
function postBase64DecodeV44R21R19(value){var s=String(value||'').replace(/\s+/g,'').replace(/-/g,'+').replace(/_/g,'/');if(!s||!/^[A-Za-z0-9+/]*={0,2}$/.test(s))return '';while(s.length%4)s+='=';try{if(typeof atob==='function')return atob(s);if(typeof Buffer!=='undefined')return Buffer.from(s,'base64').toString('binary');}catch(_){}return '';}
function postCanonicalCommentSourceIdV44R21R19(value){var original=postSafeUriDecodeV44R21R19(value);if(!original)return '';var s=original.replace(/^id:/i,'').replace(/^data-(?:commentid|comment-id|reply-id):/i,'').trim(),direct=s.match(/^comment:(\d{5,})_(\d{5,})$/i);if(direct)return 'comment:'+direct[1]+'_'+direct[2];var payload=s.replace(/^comment:/i,''),decoded=postBase64DecodeV44R21R19(payload),probe=decoded||s,m=String(probe).match(/(?:^|\b)comment:(\d{5,})_(\d{5,})(?:\b|$)/i);if(!m)m=String(probe).match(/(?:^|\D)(\d{5,})_(\d{5,})(?:\D|$)/);if(m)return 'comment:'+m[1]+'_'+m[2];if(/^\d{6,}$/.test(payload))return 'comment-id:'+payload;return '';}
function postCommentSourceKindV44R21R19(value){var s=postSafeUriDecodeV44R21R19(value);if(/^data-(?:commentid|comment-id|reply-id):/i.test(s))return 'dom';if(/^comment:[A-Za-z0-9+/_-]+=*$/i.test(s)&&!/^comment:\d+_\d+$/i.test(s))return 'dom';if(/^[A-Za-z0-9+/_-]{16,}=*$/.test(s))return 'network';if(/^comment:\d+_\d+$/i.test(s))return 'canonical';return 'unknown';}
function postCanonicalProfileForKeyV44R21R19(value){var s=String(value||'').trim();if(!s||s==='#')return '';try{var u=new URL(s,String(location&&location.href||'https://www.facebook.com/'));u.hash='';['comment_id','reply_comment_id','__cft__','__tn__','ref','refid'].forEach(function(k){u.searchParams.delete(k);});return (u.origin+u.pathname+(u.searchParams.toString()?'?'+u.searchParams.toString():'')).replace(/\/$/,'').toLowerCase();}catch(_){return s.split('#')[0].replace(/[?&](?:comment_id|reply_comment_id)=[^&#]*/ig,'').replace(/[?&]$/,'').toLowerCase();}}
function postCanonicalFallbackKeyV44R21R19(node){node=node||{};var a=t(node.author||'').toLowerCase(),h=postCanonicalProfileForKeyV44R21R19(node.authorHref||node.authorURL||''),x=t(node.text||'').toLowerCase().slice(0,700),d=t(node.dateISO||node.date||'').toLowerCase();return 'fallback:'+h+'|'+a+'|'+x+'|'+d;}
function postCanonicalNodeKeyV44R21R19(node){return postCanonicalCommentSourceIdV44R21R19(node&&node.sourceId)||postCanonicalFallbackKeyV44R21R19(node);}
function postTextNoiseV44R21R19(value){var s=t(value||'');return !s||/^(?:by Author|GIPHY|GIF|See Original(?: \(.*\))?|See translation|Ver original|Ver tradu[cç][aã]o|Reply|Responder|Like|Curtir)$/i.test(s);}
function postChooseTextV44R21R19(current,incoming,currentKind,incomingKind){var a=t(current||''),b=t(incoming||'');if(!b)return a;if(!a)return b;if(a===b)return a;var aj=postTextNoiseV44R21R19(a),bj=postTextNoiseV44R21R19(b);if(aj&&!bj)return b;if(bj&&!aj)return a;if(incomingKind==='network'&&currentKind!=='network')return b;if(currentKind==='network'&&incomingKind!=='network')return a;if(/(?:…|\.\.\.)\s*See more$/i.test(a)&&b.length>=Math.max(1,a.length-16))return b;if(/(?:…|\.\.\.)\s*See more$/i.test(b)&&a.length>=Math.max(1,b.length-16))return a;return b.length>a.length?b:a;}
function postIsIsoDateV44R21R19(value){return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z$/i.test(String(value||''));}
function postChooseDisplayDateV44R21R19(a,b){a=t(a||'');b=t(b||'');if(!a)return b;if(!b)return a;if(postIsIsoDateV44R21R19(a)&&!postIsIsoDateV44R21R19(b))return b;if(!postIsIsoDateV44R21R19(a)&&postIsIsoDateV44R21R19(b))return a;return a.length>=b.length?a:b;}
function postProfileHrefScoreV44R21R19(value){var s=String(value||'');if(!s||s==='#')return -1000;var score=1000-s.length;if(/comment_id|reply_comment_id|__cft__|__tn__/i.test(s))score-=600;if(/^https:\/\/(?:www\.)?facebook\.com\/(?:profile\.php\?id=|[A-Za-z0-9.]+)/i.test(s))score+=300;return score;}
function postChooseHrefV44R21R19(a,b){return postProfileHrefScoreV44R21R19(b)>postProfileHrefScoreV44R21R19(a)?b:a;}
function postNumericMaxV44R21R19(a,b){var na=Number(a),nb=Number(b);if(isFinite(nb)&&nb>0&&(!isFinite(na)||nb>na))return b;return a||b||'';}
function postCloneCommentNodeV44R21R19(src,canonical){src=src||{};var out={};Object.keys(src).forEach(function(k){if(k==='replies'||k==='num'||k.charAt(0)==='_')return;if(k==='media')out.media=Array.isArray(src.media)?src.media.slice():[];else out[k]=src[k];});out.replies=[];if(canonical&&/^comment(?:-id)?:/.test(canonical))out.sourceId=canonical;return out;}
function postMergeReactsV44R21R19(a,b){if(!a)return b||null;if(!b)return a;var at=Number(a.total||0),bt=Number(b.total||0);return bt>at?b:a;}
function postMergeCanonicalEntryV44R21R19(entry,src){var dst=entry.node,kind=postCommentSourceKindV44R21R19(src&&src.sourceId);var chosen=postChooseTextV44R21R19(dst.text,src&&src.text,entry.textKind,kind);if(chosen!==dst.text){dst.text=chosen;entry.textKind=kind;}dst.author=dst.author||src.author||'';dst.authorHref=postChooseHrefV44R21R19(dst.authorHref||'',src.authorHref||src.authorURL||'');dst.date=postChooseDisplayDateV44R21R19(dst.date,src.date);if(!dst.dateISO&&src.dateISO)dst.dateISO=src.dateISO;if(!dst.dateISO&&postIsIsoDateV44R21R19(src.date))dst.dateISO=src.date;dst.likes=postNumericMaxV44R21R19(dst.likes,src.likes);if(!dst.avatar&&src.avatar)dst.avatar=src.avatar;if(!dst.avatarUrl&&src.avatarUrl)dst.avatarUrl=src.avatarUrl;if(!dst.avatarHighResUrl&&src.avatarHighResUrl)dst.avatarHighResUrl=src.avatarHighResUrl;['avatarWidth','avatarHeight','avatarMime','avatarSha256','avatarBindingReason','contentKind'].forEach(function(k){if((dst[k]==null||dst[k]==='')&&src[k]!=null&&src[k]!=='')dst[k]=src[k];});dst.reacts=postMergeReactsV44R21R19(dst.reacts,src.reacts);mergeMedia(dst,src.media||[]);Object.keys(src).forEach(function(k){if(k==='replies'||k==='num'||k==='sourceId'||k.charAt(0)==='_')return;if(dst[k]==null||dst[k]==='')dst[k]=src[k];});}
function postCountTreeV44R21R19(rows){var total=0,L2=0;function walk(list,depth){(list||[]).forEach(function(n){total++;if(depth>0)L2++;walk(n.replies||[],depth+1);});}walk(rows||[],0);return {L1:(rows||[]).length,L2:L2,total:total};}
function postCanonicalizeHarvestedV44R21R19(harvested,context){harvested=harvested||{L1:0,L2:0,rows:[]};var entries=new Map(),order=[],seq=0,occurrences=0;function walk(node,parentKey,depth){if(!node||depth>30)return;occurrences++;var key=postCanonicalNodeKeyV44R21R19(node),canonical=postCanonicalCommentSourceIdV44R21R19(node.sourceId),entry=entries.get(key),alias=String(node.sourceId||'');if(!entry){entry={key:key,node:postCloneCommentNodeV44R21R19(node,canonical),first:seq++,seen:0,aliases:Object.create(null),parentVotes:Object.create(null),textKind:postCommentSourceKindV44R21R19(node.sourceId)};entries.set(key,entry);order.push(entry);}else postMergeCanonicalEntryV44R21R19(entry,node);entry.seen++;if(alias)entry.aliases[alias]=1;if(parentKey&&parentKey!==key)entry.parentVotes[parentKey]=(entry.parentVotes[parentKey]||0)+1;(node.replies||[]).forEach(function(ch){walk(ch,key,depth+1);});}var before=postCountTreeV44R21R19(harvested.rows||[]);(harvested.rows||[]).forEach(function(r){walk(r,'',0);});var parentChoice=Object.create(null);order.forEach(function(e){var best='',score=0;Object.keys(e.parentVotes).forEach(function(k){if(entries.has(k)&&e.parentVotes[k]>score){best=k;score=e.parentVotes[k];}});parentChoice[e.key]=best;});function cycles(child,parent){var seen=Object.create(null),p=parent;while(p&&entries.has(p)){if(p===child||seen[p])return true;seen[p]=1;p=parentChoice[p]||'';}return false;}order.forEach(function(e){e.node.replies=[];});var roots=[];order.forEach(function(e){var p=parentChoice[e.key];if(p&&entries.has(p)&&!cycles(e.key,p)){e.node.type='reply';entries.get(p).node.replies.push(e.node);}else{e.node.type='comment';roots.push(e.node);}});var n=0,L2=0;function number(list,depth){list.forEach(function(x){n++;x.num=String(n)+(depth>0?'.':'');if(depth>0)L2++;number(x.replies||[],depth+1);});}number(roots,0);var duplicateGroups=0,aliasesCollapsed=0,canonicalIds=0,fallbackKeys=0,examples=[];order.forEach(function(e){if(e.seen>1){duplicateGroups++;aliasesCollapsed+=e.seen-1;if(examples.length<20)examples.push({canonicalId:e.key,aliases:Object.keys(e.aliases).slice(0,6),occurrences:e.seen});}if(/^comment(?:-id)?:/.test(e.key))canonicalIds++;else fallbackKeys++;});harvested.rows=roots;harvested.L1=roots.length;harvested.L2=L2;harvested.canonicalizationAudit={version:'COMMENT_ID_CANONICAL_MERGE_V44R21R19',context:String(context||''),rootsBefore:before.L1,repliesBefore:before.L2,totalBefore:before.total,rootsAfter:roots.length,repliesAfter:L2,totalAfter:roots.length+L2,occurrences:occurrences,uniqueKeys:entries.size,duplicateGroups:duplicateGroups,aliasesCollapsed:aliasesCollapsed,canonicalIds:canonicalIds,fallbackKeys:fallbackKeys,aliasExamples:examples};if(harvested.collectionAudit){var term=harvested.collectionAudit,target=Number(term.declaredTarget||0),total=roots.length+L2;if(term.rawCollectedTotal==null)term.rawCollectedTotal=Number(term.collectedTotal||before.total);term.collectedTotal=total;term.canonicalUniqueTotal=total;term.canonicalUniqueL1=roots.length;term.canonicalUniqueL2=L2;term.targetReached=target>0?total>=target:!!term.targetReached;term.canonicalization=harvested.canonicalizationAudit;if(!term.targetReached&&/DECLARED_TARGET_REACHED/i.test(String(term.terminalReason||'')))term.terminalReason='CANONICAL_TARGET_GAP_SAFE_PARTIAL_V44R21R19';}return harvested;}
function postRefreshPayloadTerminalV44R21R19(payload){if(!payload||!payload.audit||!payload.audit.collectionTerminal)return payload;var term=payload.audit.collectionTerminal,total=Number(payload.L1||0)+Number(payload.L2||0),target=Number(term.declaredTarget||payload.counts&&payload.counts.comment||0);if(term.rawCollectedTotal==null)term.rawCollectedTotal=Number(term.collectedTotal||total);term.collectedTotal=total;term.canonicalUniqueTotal=total;term.canonicalUniqueL1=Number(payload.L1||0);term.canonicalUniqueL2=Number(payload.L2||0);term.targetReached=target>0?total>=target:!!term.targetReached;if(payload.canonicalizationAudit)term.canonicalization=payload.canonicalizationAudit;payload.audit.canonicalization=term.canonicalization||payload.canonicalizationAudit||null;var stopped=window.__HUDH__&&window.__HUDH__.stop&&window.__HUDH__.stop();payload.audit.status=stopped?'PARTIAL_USER_STOP':(target>0&&total<target?'PARTIAL_DECLARED_GAP':'COMPLETED');if(!term.targetReached&&/DECLARED_TARGET_REACHED/i.test(String(term.terminalReason||'')))term.terminalReason='CANONICAL_TARGET_GAP_SAFE_PARTIAL_V44R21R19';return payload;}
function progressiveHarvestPostV44R21R19(initialPanel){return new Promise(function(resolve){var routeKey=currentPostRouteKeyV44R21R16(),panel=findPostTargetDialogV44R21R16()||initialPanel||panelRoot(),bag=new Map(),target=postDeclaredCommentTargetV44R21R16(panel,__POST_COUNTS_SNAPSHOT__),waves=0,stable=0,bottomStable=0,sweeps=0,last=0,lastGrowthAt=Date.now(),started=Date.now(),lastMove=null,lastNetwork={},lastCanonical={},targetConfirm=0,MAX_MS=240000,MAX_WAVES=220,MIN_EXHAUST_MS=90000;postArmCommentNetworkV44R21R18(target);function reacquire(){var p=findPostTargetDialogV44R21R16();if(p)panel=p;return panel;}function snapshot(){var p=reacquire();if(p)mergeInto(bag,collectSlice(p));var net=postCommentNetworkSliceV44R21R18();mergeInto(bag,net);lastNetwork=net.networkAudit||{};var s=postCanonicalizeHarvestedV44R21R19(summarize(bag),'POST');lastCanonical=s.canonicalizationAudit||{};if(window.__HUDH__&&window.__HUDH__.setStats)window.__HUDH__.setStats(s.L1,s.L2);return s;}function finish(reason){var s=snapshot(),total=s.L1+s.L2,net=postCommentNetworkSnapshotV44R21R18();s.collectionAudit={mode:'POST_DOM_NETWORK_CANONICAL_CURSOR_PUMP_V44R21R19',declaredTarget:target,collectedTotal:total,rawCollectedTotal:Number(lastCanonical.totalBefore||total),canonicalUniqueTotal:total,canonicalUniqueL1:s.L1,canonicalUniqueL2:s.L2,targetReached:target>0?total>=target:true,waves:waves,stableCycles:stable,bottomStableCycles:bottomStable,recoverySweeps:sweeps,targetConfirmCycles:targetConfirm,terminalReason:reason,elapsedMs:Date.now()-started,routeLocked:postRouteLockedV44R21R16(routeKey),targetDialogObserved:!!findPostTargetDialogV44R21R16(),lastMove:lastMove,networkAudit:net.audit||lastNetwork||{},networkHasNext:!!net.hasNext,canonicalization:lastCanonical};resolve(s);}function step(){if(window.__HUDH__&&window.__HUDH__.stop&&window.__HUDH__.stop()){finish('USER_STOP');return;}if(!postRouteLockedV44R21R16(routeKey)){finish('POST_ROUTE_LOCK_VIOLATION');return;}if(Date.now()-started>=MAX_MS||waves>=MAX_WAVES){finish('CANONICAL_PUMP_LIMIT_SAFE_PARTIAL');return;}var p=reacquire();if(!p){setTimeout(step,500);return;}waves++;var before=snapshot(),beforeTotal=before.L1+before.L2;if(target>0&&beforeTotal>=target){targetConfirm++;if(targetConfirm>=2){finish('DECLARED_TARGET_REACHED_CANONICAL');return;}}else targetConfirm=0;var pct=target>0?Math.min(90,18+Math.round((beforeTotal/target)*68)):Math.min(90,18+Math.round(waves*.25));if(window.__HUDH__&&window.__HUDH__.set)window.__HUDH__.set(pct,'Post: '+beforeTotal+'/'+(target||'?')+' registros únicos · DOM + GraphQL · onda '+waves+'…');if(waves===1||waves%2===0)postRequestCommentNextV44R21R18();postClickLoadControlsV44R21R18(p,14).then(function(){return clickAllUntilExhausted(p,24);}).then(function(){return postScrollPulseV44R21R18(p,waves);}).then(function(mv){lastMove=mv;var wait=mv.atBottom?2600:1500;return U.waitMut(p,wait).then(function(){return U.sleep(mv.atBottom?750:350);}).then(function(){var after=snapshot(),total=after.L1+after.L2,grew=total>last||total>beforeTotal||mv.rangeGrew,net=postCommentNetworkSnapshotV44R21R18(),controls=postLoadControlsV44R21R18(p).length;if(grew){last=total;lastGrowthAt=Date.now();stable=0;bottomStable=0;}else{stable++;if(mv.atBottom&&!controls)bottomStable++;else bottomStable=0;}if(target>0&&total>=target){targetConfirm++;if(targetConfirm>=2){finish('DECLARED_TARGET_REACHED_CANONICAL_DOM_OR_NETWORK');return true;}}else targetConfirm=0;if(bottomStable>=7&&sweeps<3){sweeps++;postResetTopV44R21R18(p);try{ensureAllCommentsSelected();}catch(_){}postRequestCommentNextV44R21R18();stable=0;bottomStable=0;return U.sleep(1300).then(function(){return false;});}var elapsed=Date.now()-started,noGrowth=Date.now()-lastGrowthAt;if(elapsed>=MIN_EXHAUST_MS&&stable>=28&&bottomStable>=14&&!net.hasNext&&controls===0&&noGrowth>=60000){finish('CONFIRMED_CANONICAL_POST_EXPOSED_DATA_EXHAUSTED_SAFE_PARTIAL');return true;}return false;});}).then(function(done){if(done===true)return;if(done&&typeof done.then==='function')return done.then(function(){setTimeout(step,180);});setTimeout(step,180);}).catch(function(e){console.warn('POST V44R21R19:',e);if(Date.now()-started>120000)finish('CANONICAL_PUMP_ERROR_SAFE_PARTIAL');else setTimeout(step,650);});}snapshot();U.sleep(350).then(step);});}
try{window.__FB_POST_V44R21R19_TEST__={canonicalSourceId:postCanonicalCommentSourceIdV44R21R19,canonicalize:postCanonicalizeHarvestedV44R21R19,refreshTerminal:postRefreshPayloadTerminalV44R21R19};}catch(_){}

function startHarvest(){
  scopePreflightV44R21R13();
  var panel=panelRoot();
  var target=isReelContext()?Number(__REEL_COUNTS_SNAPSHOT__&&__REEL_COUNTS_SNAPSHOT__.comment||0):Math.max(Number(__DECLARED_COMMENT_TARGET_V44R3__||0),Number(__POST_COUNTS_SNAPSHOT__&&__POST_COUNTS_SNAPSHOT__.comment||0));
  var gatePromise=window.__FB_ALL_COMMENTS_PROMISE_V44R10__||Promise.resolve(true);
  var watchdog=setTimeout(function(){try{if(window.__FB_HARVEST12__&&window.__HUDH__&&!window.__HUDH__.stop())window.__HUDH__.requestStop('Limite de segurança atingido; finalizando com os dados observados.');}catch(_){}},360000);
  window.__HUDH__.set(8,'Expansão inicial de comentários…');
  var pass=1;
  function prepasses(){
    if(pass>3||window.__HUDH__.stop())return Promise.resolve();
    return clickAllUntilExhausted(panel,30)
      .then(function(){return resort(panel);})
      .then(function(){window.__HUDH__.set(8+pass*4,'Preparando a superfície de comentários…');window.__HUDH__.inc();pass++;return prepasses();});
  }
  prepasses()
    .then(function(){
      return Promise.race([Promise.resolve(gatePromise).catch(function(){return false;}),U.sleep(4500).then(function(){return false;})]);
    })
    .then(function(){
      window.__HUDH__.set(22,'Colheita progressiva com o motor estável V44R5…');
      if(isReelContext())return progressiveHarvestReelV44R21R14(panel);
      if(isPhotoContext())return progressiveHarvestPhotoV44R21R4(panelRoot());
      return progressiveHarvestPostV44R21R19(panel);
    })
    .then(function(harvested){
      if(isReelContext())harvested=postCanonicalizeHarvestedV44R21R19(harvested,'REEL');
      window.__HUDH__.setStats(harvested.L1,harvested.L2);window.__HUDH__.set(70,'Metadados, avatar e contagens…');
      var optsNow=window.__FB_POST_SCRAPER_OPTIONS__||{};
      return Promise.all([expandSeeMoreForPhoto(),resolvedAuthorSnapshotV44R10(),resolvePostHeaderMetadataV44R16(optsNow.headerSnapshot||{},(collectMeta()||{}).caption||'')]).then(function(pair){
        var authorSnap=pair[1]||{},meta=mergePostHeaderMetadataV44R16(collectMeta(),pair[2]||{}),counts=collectCounts();if(isPhotoContext())meta=mergePhotoMetadataV44R21R9(meta);
        if((counts.comment==null||counts.comment===0)&&target>0)counts.comment=target;
        try{if(window.__FB_MERGE_POST_META_V44__)meta=window.__FB_MERGE_POST_META_V44__(meta,authorSnap);}catch(_){}
        var media=null;try{if(isReelContext())media=reelMediaSnapshotV44R21R14();else if(isPhotoContext())media=__POST_MEDIA_SNAPSHOT_V44R21R9__||photoMainMediaSnapshotV44R21R9()||collectPhotoMedia(document.body)||collectPhotoMedia(panel);else media=visiblePostVideoSnapshotV44R21R28(panel)||collectPhotoMedia(panel);}catch(_){media=isPhotoContext()?__POST_MEDIA_SNAPSHOT_V44R21R9__:(isReelContext()?reelMediaSnapshotV44R21R14():null);}
        var terminal=harvested.collectionAudit||null,total=Number(harvested.L1||0)+Number(harvested.L2||0);
        var payload={L1:harvested.L1,L2:harvested.L2,rows:harvested.rows,meta:meta,counts:counts,media:media,audit:{schemaVersion:1,toolVersion:FB_TOOL_VERSION,runStartedAt:FB_RUN_STARTED_AT.toISOString(),collectedAt:new Date().toISOString(),sourceUrlAtStart:FB_SOURCE_URL_AT_START,sourceUrlAtExport:String(location.href||''),context:isReelContext()?'REEL':(isPhotoContext()?'PHOTO':'POST'),userAgent:String((navigator&&navigator.userAgent)||''),status:(window.__HUDH__&&window.__HUDH__.stop&&window.__HUDH__.stop())?'PARTIAL_USER_STOP':(((terminal&&Number(terminal.declaredTarget||0)>0?Number(terminal.declaredTarget||0):target)>0&&total<(terminal&&Number(terminal.declaredTarget||0)>0?Number(terminal.declaredTarget||0):target))?'PARTIAL_DECLARED_GAP':'COMPLETED'),collectionBasis:isPhotoContext()?'PHOTO: filtro Todos os comentários confirmado no painel da foto antes da colheita; cabeçalho e avatares vinculados à identidade exata; comentários e respostas coletados até o alvo ou fim real. Dados ausentes não são presumidos.':(isReelContext()?'REEL: painel target-bound com trava de rota, fusão DOM + respostas GraphQL sanitizadas e mídia/poster vinculados ao ID do Reel. Dados ausentes não são presumidos.':'POST: diálogo modal vinculado à rota ativa, paginação DOM + GraphQL, IDs canônicos e terminal calculado somente por registros únicos; dados ausentes não são presumidos.'),allCommentsGate:window.__FB_ALL_COMMENTS_GATE__?JSON.parse(JSON.stringify(window.__FB_ALL_COMMENTS_GATE__)):null,collectionTerminal:terminal}};
        cleanPayloadRows(payload);if(!isPhotoContext())postRefreshPayloadTerminalV44R21R19(payload);window.__HUDH__.set(86,'Processando avatares dos comentários…');
        return enrichAvatars(payload,300).then(function(){return embedAuthorAvatarV44R10(payload.meta||{});}).then(function(metaDone){payload.meta=metaDone||payload.meta;return payload;});
      });
    })
    .then(function(payload){
      window.__HUDH__.set(96,'Preparando opções de exportação…');payload=fbPostApplyMetadataFallbackToPayload(payload);payload.audit=payload.audit||{};payload.audit.finishedAt=new Date().toISOString();
      payload.audit.gates={noAssumedMetrics:true,hashesCoverExactExportBytes:true,sourceIdentityRecorded:true,allCommentsConfirmed:!(payload.audit.allCommentsGate&&payload.audit.allCommentsGate.ok===false),declaredCommentTargetReached:!(payload.audit.collectionTerminal&&payload.audit.collectionTerminal.declaredTarget>0&&!payload.audit.collectionTerminal.targetReached)};
      payload.audit.exportPolicy='manual_user_selected_no_automatic_download';payload.audit.availableFormats=['html','pdf','json','xlsx','csv'];payload.audit.integrityPolicy='one_integrity_pdf_per_downloaded_artifact_exact_bytes';payload.audit.primaryHtmlLayout='vertical';payload.audit.authorAvatarBound=!!(payload.meta&&payload.meta.authorAvatarBound);payload.audit.authorAvatarBindingReason=payload.meta&&payload.meta.authorAvatarBindingReason||'not_observed';
      var html=buildHTML(payload);try{if(window.__FB_APPLY_UNIFIED_POST_HTML_V44__)html=window.__FB_APPLY_UNIFIED_POST_HTML_V44__(html,payload,{layoutMode:'vertical'});}catch(e){console.warn('Layout unificado indisponível; HTML estável preservado.',e);}
      postSetPreparedExportV44R4(payload,html);if(window.__FB_POST_SCRAPER_V44__)window.__FB_POST_SCRAPER_V44__.running=false;
      var completed=payload.audit.status==='COMPLETED',obsTotal=Number(payload.L1||0)+Number(payload.L2||0),msg=completed?(isPhotoContext()?'Coleta concluída: '+Number(payload.L1||0)+' comentário(s) principal(is) + '+Number(payload.L2||0)+' resposta(s) = '+obsTotal+' registro(s). Escolha os formatos para baixar.':'Coleta concluída. Escolha os formatos para baixar.'):'Coleta parcial: '+Number(payload.L1||0)+' comentários e '+Number(payload.L2||0)+' respostas. Status '+payload.audit.status+'.';
      try{var tgt=Number(payload.counts&&payload.counts.comment||target||0),obs=Number(payload.L1||0)+Number(payload.L2||0);document.dispatchEvent(new CustomEvent('FB_B35_POST_PROGRESS_V44',{detail:{type:'done',done:true,progress:100,L1:Number(payload.L1||0),L2:Number(payload.L2||0),target:tgt,contentProgress:tgt>0?Math.min(100,obs/tgt*100):0,exportReady:true,message:msg,status:payload.audit.status}}));}catch(_){}
      window.__HUDH__.done(completed?'coleta concluída — escolha os formatos':'coleta parcial identificada — escolha os formatos');delete window.__FB_HARVEST12__;clearTimeout(watchdog);return payload;
    })
    .catch(function(e){clearTimeout(watchdog);console.warn('HARVEST erro:',e);if(window.__FB_POST_SCRAPER_V44__)window.__FB_POST_SCRAPER_V44__.running=false;if(window.__HUDH__)window.__HUDH__.done('erro — veja o console');delete window.__FB_HARVEST12__;try{document.dispatchEvent(new CustomEvent('FB_B35_POST_PROGRESS_V44',{detail:{type:'error',done:true,progress:100,exportReady:false,message:String(e&&e.message||e)}}));}catch(_){}});
}

/* V44R10: POST/PHOTO inicia o motor estável imediatamente; o gate Todos os comentários roda em paralelo. */
(function orchestrate(){
  try{var initialCollectedV44R19=collectMeta()||{};__POST_METADATA_SNAPSHOT_V44R19__=sanitizePostMetadataV44R19(mergePostHeaderMetadataV44R16(initialCollectedV44R19,postHeaderMetadataV44R19(initialCollectedV44R19.caption||'')));if(isPhotoContext()){__POST_METADATA_SNAPSHOT_V44R21R9__=mergePhotoMetadataV44R21R9(__POST_METADATA_SNAPSHOT_V44R19__);__POST_MEDIA_SNAPSHOT_V44R21R9__=photoMainMediaSnapshotV44R21R9()||collectPhotoMedia(document.body);}}catch(_meta19){__POST_METADATA_SNAPSHOT_V44R19__=null;__POST_METADATA_SNAPSHOT_V44R21R9__=null;__POST_MEDIA_SNAPSHOT_V44R21R9__=null;}
  try{__POST_METRICS_SNAPSHOT_V44R19__=collectPostSurfaceMetricsV44R19();}catch(_metric19){__POST_METRICS_SNAPSHOT_V44R19__=null;}
  try{var opts19=window.__FB_POST_SCRAPER_OPTIONS__||{};opts19.headerSnapshot=__POST_METADATA_SNAPSHOT_V44R19__||opts19.headerSnapshot||{};window.__FB_POST_SCRAPER_OPTIONS__=opts19;}catch(_opts19){}
  if(!isReelContext()){
    try{__POST_COUNTS_SNAPSHOT__=collectCounts();__DECLARED_COMMENT_TARGET_V44R3__=isPhotoContext()?photoStrictDeclaredTargetV44R21R9(__POST_COUNTS_SNAPSHOT__):(isReelContext()?Math.max(Number(__POST_COUNTS_SNAPSHOT__&&__POST_COUNTS_SNAPSHOT__.comment||0),Number(captureDeclaredCommentTargetV44R3(panelRoot())||0)):postDeclaredCommentTargetV44R21R16(panelRoot(),__POST_COUNTS_SNAPSHOT__));if(__POST_COUNTS_SNAPSHOT__&&(!__POST_COUNTS_SNAPSHOT__.comment)&&__DECLARED_COMMENT_TARGET_V44R3__>0)__POST_COUNTS_SNAPSHOT__.comment=__DECLARED_COMMENT_TARGET_V44R3__;}catch(_){__POST_COUNTS_SNAPSHOT__=null;__DECLARED_COMMENT_TARGET_V44R3__=0;}
    if(!isPhotoContext()){try{postArmCommentNetworkV44R21R18(__DECLARED_COMMENT_TARGET_V44R3__||0);}catch(_pc18){}}
    window.__FB_ALL_COMMENTS_PROMISE_V44R10__=ensureAllCommentsSelected().catch(function(){return false;});
    if(isPhotoContext()){
      Promise.resolve(window.__FB_ALL_COMMENTS_PROMISE_V44R10__).then(function(ok){
        if(ok)return true;
        return U.sleep(900).then(function(){window.__FB_ALL_COMMENTS_PROMISE_V44R10__=ensureAllCommentsSelected().catch(function(){return false;});return window.__FB_ALL_COMMENTS_PROMISE_V44R10__;});
      }).then(function(){return U.sleep(850);}).then(startHarvest);
      return;
    }
    startHarvest();return;
  }
  try{__REEL_COUNTS_SNAPSHOT__=reelCountsSnapshotV44R21R14();__DECLARED_COMMENT_TARGET_V44R3__=Number(__REEL_COUNTS_SNAPSHOT__&&__REEL_COUNTS_SNAPSHOT__.comment||0);}catch(_){__REEL_COUNTS_SNAPSHOT__=null;__DECLARED_COMMENT_TARGET_V44R3__=0;}
  openReelCommentsSurfaceV44R21R14().then(function(panel){if(panel)__REEL_COMMENT_PANEL_V44R21R3__=panel;return U.sleep(350);}).then(function(){window.__FB_ALL_COMMENTS_PROMISE_V44R10__=ensureAllCommentsSelected().catch(function(){return false;});startHarvest();});
})();

}
})();
