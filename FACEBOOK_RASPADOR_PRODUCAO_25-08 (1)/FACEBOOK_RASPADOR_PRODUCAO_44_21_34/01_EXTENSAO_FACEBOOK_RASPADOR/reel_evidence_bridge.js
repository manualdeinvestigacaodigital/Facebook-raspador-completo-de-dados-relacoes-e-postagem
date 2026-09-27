/* FB_B35A1 V44R21R14 — ponte isolada de evidência sanitizada de REEL. */
(function(){
  'use strict';
  if(window.__FB_REEL_EVIDENCE_V44R21R14__)return;
  var MAIN='FB_B35_REEL_EVIDENCE_MAIN_V44R21R14',CONTROL='FB_B35_REEL_EVIDENCE_CONTROL_V44R21R14';
  var last={version:'REEL_EVIDENCE_V44R21R14',reelId:'',media:[],posters:[],comments:[],audit:{status:'WAITING'}};
  var updated=0;
  function clone(v){try{return JSON.parse(JSON.stringify(v));}catch(_){return v;}}
  function request(){try{window.postMessage({channel:CONTROL,type:'GET_REEL_EVIDENCE'},location.origin);}catch(_){}return snapshot();}
  function snapshot(){return clone(last);}
  function waitForEvidence(maxMs){maxMs=Math.max(250,Number(maxMs||2500));var start=Date.now(),seen=updated;request();return new Promise(function(resolve){(function poll(){if(updated>seen||(last.media&&last.media.length)||(last.posters&&last.posters.length)||(last.comments&&last.comments.length)){resolve(snapshot());return;}if(Date.now()-start>=maxMs){resolve(snapshot());return;}setTimeout(poll,100);})();});}
  window.addEventListener('message',function(ev){if(ev.source!==window)return;var d=ev.data;if(!d||d.channel!==MAIN||d.type!=='REEL_EVIDENCE_SNAPSHOT'||!d.payload||!d.payload.snapshot)return;last=d.payload.snapshot;updated=Date.now();});
  window.__FB_REEL_EVIDENCE_V44R21R14__={version:'V44R21R14',snapshot:snapshot,request:request,waitForEvidence:waitForEvidence,updatedAt:function(){return updated;}};
  request();setTimeout(request,500);setTimeout(request,1800);
})();
