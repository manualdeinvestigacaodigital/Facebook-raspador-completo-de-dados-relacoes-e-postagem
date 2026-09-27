/* FB_B35A1 V44R21R5 — ponte isolada para a captura GraphQL de reações. */
(function(){
  'use strict';
  if(window.__FB_POST_REACTION_NETWORK_V44R21R5__)return;
  var CONTROL='FB_B35_POST_REACTION_CONTROL_V44R21R5',MAIN='FB_B35_POST_REACTION_MAIN_V44R21R5';
  var active=null;
  function now(){return new Date().toISOString();}
  function text(v){return String(v==null?'':v).replace(/[\u200B-\u200D\uFEFF]/g,'').replace(/\s+/g,' ').trim();}
  function sessionId(){return 'post-react-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,10);}
  function normalizeReaction(raw){var s=text(raw).toUpperCase();if(/LIKE|CURTIR|👍/.test(s))return 'LIKE';if(/LOVE|AMEI|❤|❤️/.test(s))return 'LOVE';if(/CARE|FOR[CÇ]A|🥰/.test(s))return 'CARE';if(/HAHA|😂|😆/.test(s))return 'HAHA';if(/WOW|UAU|😮|😯/.test(s))return 'WOW';if(/SAD|TRISTE|😢/.test(s))return 'SAD';if(/ANGRY|GRR|RAIVA|😡/.test(s))return 'ANGRY';return 'REACTION';}
  function safeProfile(raw,id){
    try{var x=new URL(String(raw||''),location.href);if(!/(^|\.)facebook\.com$/i.test(x.hostname))throw 0;if(/\/profile\.php$/i.test(x.pathname)){var q=x.searchParams.get('id');return q?'https://www.facebook.com/profile.php?id='+encodeURIComponent(q):'';}var parts=x.pathname.split('/').filter(Boolean),p=parts[0]||'';if(p==='people'&&parts.length>=3&&/^\d+$/.test(parts[parts.length-1]))return 'https://www.facebook.com/profile.php?id='+encodeURIComponent(parts[parts.length-1]);if(!p||/^(?:people|reel|reels|photo|photos|posts|videos|watch|groups|events|pages|marketplace|permalink|profile)$/i.test(p))throw 0;return 'https://www.facebook.com/'+encodeURIComponent(p);}catch(_){return /^\d{5,}$/.test(String(id||''))?'https://www.facebook.com/profile.php?id='+encodeURIComponent(String(id)):'';}
  }
  function mergeCandidate(raw){
    if(!active||!raw)return;var name=text(raw.name||'');if(name.length<2||name.length>160)return;var id=/^\d{5,}$/.test(String(raw.id||''))?String(raw.id):'',url=safeProfile(raw.profileUrl||'',id);if(!url)return;var avatar=/^https?:/i.test(String(raw.avatarUrl||''))?String(raw.avatarUrl):'',reaction=normalizeReaction(raw.reactionType||''),key=id?('id:'+id):url.toLowerCase(),old=active.items.get(key);
    if(!old){active.items.set(key,{id:id,name:name,profileUrl:url,avatarObserved:avatar,avatarHighResUrl:avatar,reactionType:reaction,reactionLabel:reaction,reactionEmoji:'',avatar:'',avatarWidth:0,avatarHeight:0,avatarEmbedded:false,source:'reaction_graphql_v44r21r5',networkSourcePath:text(raw.sourcePath||'')});active.audit.networkProfilesCreated++;return;}
    if(!old.avatarObserved&&avatar){old.avatarObserved=avatar;old.avatarHighResUrl=avatar;}if((!old.reactionType||old.reactionType==='REACTION')&&reaction!=='REACTION')old.reactionType=reaction;if(name.length>old.name.length)old.name=name;active.audit.networkProfilesUpdated++;
  }
  function begin(meta){
    if(active)end('replaced_by_new_session');var id=sessionId();active={sessionId:id,startedAt:now(),endedAt:'',items:new Map(),lastBatchAt:0,audit:{version:'REACTION_GRAPHQL_BRIDGE_V44R21R5',sessionId:id,declaredTotal:Number(meta&&meta.declaredTotal||0),sourceUrl:String(meta&&meta.sourceUrl||location.href),startedAt:now(),captureStarted:false,captureInstalled:false,relevantPayloads:0,zeroActorPayloads:0,totalActorRowsInBatches:0,networkProfilesCreated:0,networkProfilesUpdated:0,friendlyNames:[],docIds:[],signalKeys:[],pageInfos:[],batches:[],serverReturnedNoActorIdentities:false,status:'RUNNING'}};
    try{window.postMessage({channel:CONTROL,type:'START_REACTION_CAPTURE',sessionId:id,declaredTotal:active.audit.declaredTotal,sourceUrl:active.audit.sourceUrl},location.origin);}catch(_){}
    return id;
  }
  function end(reason){
    if(!active)return null;active.endedAt=now();active.audit.finishedAt=active.endedAt;active.audit.status=reason||'STOPPED';active.audit.serverReturnedNoActorIdentities=active.audit.relevantPayloads>0&&active.items.size===0;try{window.postMessage({channel:CONTROL,type:'STOP_REACTION_CAPTURE',sessionId:active.sessionId,reason:reason||'isolated_stop'},location.origin);}catch(_){}return snapshot();
  }
  function snapshot(){if(!active)return {items:[],audit:{version:'REACTION_GRAPHQL_BRIDGE_V44R21R5',status:'NOT_STARTED'}};var a=JSON.parse(JSON.stringify(active.audit));a.observedProfiles=active.items.size;a.lastBatchAt=active.lastBatchAt?new Date(active.lastBatchAt).toISOString():'';a.serverReturnedNoActorIdentities=a.relevantPayloads>0&&active.items.size===0;return {items:Array.from(active.items.values()).map(function(x){return Object.assign({},x);}),audit:a};}
  function waitForQuiet(quietMs,maxMs){quietMs=Math.max(300,Number(quietMs||1000));maxMs=Math.max(quietMs,Number(maxMs||4000));var start=Date.now();return new Promise(function(resolve){(function poll(){if(!active){resolve(snapshot());return;}var last=Number(active.lastBatchAt||0);if(last&&Date.now()-last>=quietMs){resolve(snapshot());return;}if(Date.now()-start>=maxMs){resolve(snapshot());return;}setTimeout(poll,120);})();});}
  window.addEventListener('message',function(event){
    if(event.source!==window)return;var d=event.data;if(!d||d.channel!==MAIN||!active||String(d.sessionId||'')!==active.sessionId)return;
    if(d.type==='REACTION_CAPTURE_STARTED'){active.audit.captureStarted=true;active.audit.captureInstalled=d.installed===true;return;}
    if(d.type==='REACTION_GRAPHQL_BATCH'){
      active.lastBatchAt=Date.now();active.audit.relevantPayloads++;var n=Number(d.actorCount||0);active.audit.totalActorRowsInBatches+=n;if(n===0)active.audit.zeroActorPayloads++;
      var fn=text(d.friendlyName||''),doc=text(d.docId||'');if(fn&&active.audit.friendlyNames.indexOf(fn)<0)active.audit.friendlyNames.push(fn);if(doc&&active.audit.docIds.indexOf(doc)<0)active.audit.docIds.push(doc);
      (Array.isArray(d.signalKeys)?d.signalKeys:[]).forEach(function(k){k=text(k);if(k&&active.audit.signalKeys.indexOf(k)<0&&active.audit.signalKeys.length<120)active.audit.signalKeys.push(k);});
      (Array.isArray(d.pageInfos)?d.pageInfos:[]).slice(0,30).forEach(function(pi){if(active.audit.pageInfos.length<120)active.audit.pageInfos.push(pi);});
      active.audit.batches.push({requestId:text(d.requestId||''),origin:text(d.origin||''),status:Number(d.status||0),ok:d.ok===true,friendlyName:fn,docId:doc,actorCount:n,visitedNodes:Number(d.visitedNodes||0),at:text(d.at||now())});if(active.audit.batches.length>160)active.audit.batches=active.audit.batches.slice(-160);
      (Array.isArray(d.candidates)?d.candidates:[]).forEach(mergeCandidate);
    }else if(d.type==='REACTION_CAPTURE_STOPPED'){active.audit.mainSummary={reason:text(d.reason||''),captured:Number(d.captured||0),relevant:Number(d.relevant||0),actors:Number(d.actors||0),startedAt:text(d.startedAt||''),finishedAt:text(d.finishedAt||'')};}
  });
  window.__FB_POST_REACTION_NETWORK_V44R21R5__={version:'V44R21R5',begin:begin,end:end,snapshot:snapshot,waitForQuiet:waitForQuiet,isActive:function(){return !!active;},activeSession:function(){return active&&active.sessionId||'';}};
})();
