/* V44R5 — pré-voo visual. Oculta apenas o painel legado antes de o controlador unificado assumir. */
(function(){
  'use strict';
  if(document.getElementById('fb-b35-v44-preflight-style'))return;
  var style=document.createElement('style');
  style.id='fb-b35-v44-preflight-style';
  style.textContent='#fb-b35a1-raspador-amigos-v29-panel{display:none!important;visibility:hidden!important;pointer-events:none!important}';
  (document.head||document.documentElement).appendChild(style);
})();
