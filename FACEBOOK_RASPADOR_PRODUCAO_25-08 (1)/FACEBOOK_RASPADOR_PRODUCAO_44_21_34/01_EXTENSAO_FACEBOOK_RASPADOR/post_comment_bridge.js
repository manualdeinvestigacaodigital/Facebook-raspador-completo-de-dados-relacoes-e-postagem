/* FB_B35A1 V44R21R18 — ponte sanitizada de comentários de POST. */
(function(){
  'use strict';
  if(window.__FB_POST_COMMENT_NETWORK_V44R21R18__)return;
  var CHANNEL='FB_B35_POST_COMMENT_MAIN_V44R21R18';
  var CONTROL='FB_B35_POST_COMMENT_CONTROL_V44R21R18';
  var last={version:'POST_COMMENT_NETWORK_V44R21R18',routeKey:'',armed:false,declaredTarget:0,comments:[],hasNext:false,audit:{status:'WAITING'}};
  function routeKey(){var s=String(location.href||''),m=s.match(/\/posts\/(pfbid[\w-]+)/i);if(m&&m[1])return m[1];m=s.match(/\/posts\/(\d+)/i);return m&&m[1]||'';}
  function send(type,payload){try{window.postMessage({channel:CONTROL,type:type,payload:payload||{}},location.origin);}catch(_){}}
  window.addEventListener('message',function(ev){if(ev.source!==window)return;var d=ev.data;if(!d||d.channel!==CHANNEL||d.type!=='POST_COMMENT_SNAPSHOT')return;var snap=d.payload&&d.payload.snapshot;if(!snap||String(snap.routeKey||'')!==String(routeKey()||''))return;last=snap;try{document.dispatchEvent(new CustomEvent('FB_B35_POST_COMMENT_NETWORK_UPDATE_V44R21R18',{detail:{count:Array.isArray(last.comments)?last.comments.length:0,hasNext:!!last.hasNext,audit:last.audit||{}}}));}catch(_){} });
  var api={version:'V44R21R18',arm:function(opts){send('ARM_POST_COMMENTS',{declaredTarget:Number(opts&&opts.declaredTarget||0),routeKey:routeKey()});send('GET_POST_COMMENTS');},request:function(){send('GET_POST_COMMENTS');},requestNext:function(){send('REQUEST_POST_COMMENT_NEXT');},reset:function(){send('RESET_POST_COMMENTS');},snapshot:function(){send('GET_POST_COMMENTS');try{return JSON.parse(JSON.stringify(last));}catch(_){return last;}}};
  window.__FB_POST_COMMENT_NETWORK_V44R21R18__=api;
  window.__FB_POST_COMMENT_NETWORK_V44R21R18_TEST__=api;
  send('GET_POST_COMMENTS');
})();
