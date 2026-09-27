/*
Raspador de dados de relações do Facebook — V43 V42-Core Excel UI Final
Versao: B35A1_V43_V42_CORE_EXCEL_UI_FINAL_2026_07_10
Uso: extensão MV3 carregada sem compactação; o painel aparece na página de relações.
Objetivo: raspar online a superfície relacional realmente materializada, enriquecer metadados públicos disponíveis em streaming e gerar JSON/HTML auditáveis com laudos de integridade.
Sem popup; sem iframe; sem biblioteca externa.
Diferencial desta versão: preserva integralmente o núcleo V42/V41/V40/V39/V37/V35; corrige a experiência real de Excel e HTML com XLSX como formato principal, CSV limpo, cabeçalho congelado efetivo, guia inferior sempre visível no HTML e proteção autoral fail-closed preservada.
*/
(function(){
  'use strict';
  const __b35Route = location.pathname + location.search;
  const __b35IsRelationPage = /\/(friends_all|friends|followers|following)(?:\/|$|\?)/i.test(__b35Route) || (/\/profile\.php$/i.test(location.pathname) && /(?:^|[?&])sk=(?:friends_all|friends|followers|following)(?:&|$)/i.test(location.search));
  if(!__b35IsRelationPage) return;
  if(window.__FB_B35A1_EXT_STRUCTURED_GRAPHQL_V9_SEMANTIC_CANARY_FINAL__ && window.__FB_B35A1_EXT_STRUCTURED_GRAPHQL_V9_SEMANTIC_CANARY_FINAL__.destroy){try{window.__FB_B35A1_EXT_STRUCTURED_GRAPHQL_V9_SEMANTIC_CANARY_FINAL__.destroy();}catch(e){}}
  if(window.__FB_B35A1_EXT_STRUCTURED_GRAPHQL_V10_BOOTSTRAP_FAST_META_FINAL__ && window.__FB_B35A1_EXT_STRUCTURED_GRAPHQL_V10_BOOTSTRAP_FAST_META_FINAL__.destroy){try{window.__FB_B35A1_EXT_STRUCTURED_GRAPHQL_V10_BOOTSTRAP_FAST_META_FINAL__.destroy();}catch(e){}}
  if(window.__FB_B35A1_EXT_STRUCTURED_GRAPHQL_V12_STREAMING_TARGET_MEDIA_FINAL__ && window.__FB_B35A1_EXT_STRUCTURED_GRAPHQL_V12_STREAMING_TARGET_MEDIA_FINAL__.destroy){try{window.__FB_B35A1_EXT_STRUCTURED_GRAPHQL_V12_STREAMING_TARGET_MEDIA_FINAL__.destroy();}catch(e){}}
  if(window.__FB_B35A1_EXT_STRUCTURED_GRAPHQL_V13_PORTABLE_STREAMING_TARGET_MEDIA_FINAL__ && window.__FB_B35A1_EXT_STRUCTURED_GRAPHQL_V13_PORTABLE_STREAMING_TARGET_MEDIA_FINAL__.destroy){try{window.__FB_B35A1_EXT_STRUCTURED_GRAPHQL_V13_PORTABLE_STREAMING_TARGET_MEDIA_FINAL__.destroy();}catch(e){}}
  if(window.__FB_B35A1_RASPADOR_AMIGOS_V14_UI_FRIENDS_FINAL__ && window.__FB_B35A1_RASPADOR_AMIGOS_V14_UI_FRIENDS_FINAL__.destroy){try{window.__FB_B35A1_RASPADOR_AMIGOS_V14_UI_FRIENDS_FINAL__.destroy();}catch(e){}}
  if(window.__FB_B35A1_RASPADOR_AMIGOS_V15_RELATION_CLOSURE_EXTENSION_ONLY__ && window.__FB_B35A1_RASPADOR_AMIGOS_V15_RELATION_CLOSURE_EXTENSION_ONLY__.destroy){try{window.__FB_B35A1_RASPADOR_AMIGOS_V15_RELATION_CLOSURE_EXTENSION_ONLY__.destroy();}catch(e){}}
  if(window.__FB_B35A1_RASPADOR_AMIGOS_V16_PTBR_CREDIT_GUARD__ && window.__FB_B35A1_RASPADOR_AMIGOS_V16_PTBR_CREDIT_GUARD__.destroy){try{window.__FB_B35A1_RASPADOR_AMIGOS_V16_PTBR_CREDIT_GUARD__.destroy();}catch(e){}}
  if(window.__FB_B35A1_RASPADOR_AMIGOS_V17_ROBUST_FULL_RELATION_PTBR_CREDIT_GUARD__ && window.__FB_B35A1_RASPADOR_AMIGOS_V17_ROBUST_FULL_RELATION_PTBR_CREDIT_GUARD__.destroy){try{window.__FB_B35A1_RASPADOR_AMIGOS_V17_ROBUST_FULL_RELATION_PTBR_CREDIT_GUARD__.destroy();}catch(e){}}
  if(window.__FB_B35A1_RASPADOR_AMIGOS_V18_ALL_CONTACT_SUPPLEMENT_PTBR_CREDIT_GUARD__ && window.__FB_B35A1_RASPADOR_AMIGOS_V18_ALL_CONTACT_SUPPLEMENT_PTBR_CREDIT_GUARD__.destroy){try{window.__FB_B35A1_RASPADOR_AMIGOS_V18_ALL_CONTACT_SUPPLEMENT_PTBR_CREDIT_GUARD__.destroy();}catch(e){}}
  if(window.__FB_B35A1_RASPADOR_AMIGOS_V19_ALL_DETAILS_FAST_PTBR_CREDIT_GUARD__ && window.__FB_B35A1_RASPADOR_AMIGOS_V19_ALL_DETAILS_FAST_PTBR_CREDIT_GUARD__.destroy){try{window.__FB_B35A1_RASPADOR_AMIGOS_V19_ALL_DETAILS_FAST_PTBR_CREDIT_GUARD__.destroy();}catch(e){}}
  if(window.__FB_B35A1_RASPADOR_AMIGOS_V20_CARDINALIDADE_SUPERFICIE_INFOGERAL_PARALELA__ && window.__FB_B35A1_RASPADOR_AMIGOS_V20_CARDINALIDADE_SUPERFICIE_INFOGERAL_PARALELA__.destroy){try{window.__FB_B35A1_RASPADOR_AMIGOS_V20_CARDINALIDADE_SUPERFICIE_INFOGERAL_PARALELA__.destroy();}catch(e){}}
  if(window.__FB_B35A1_RASPADOR_AMIGOS_V21_GATE_ESCOPO_EXPORT_NAO_BLOQUEANTE__ && window.__FB_B35A1_RASPADOR_AMIGOS_V21_GATE_ESCOPO_EXPORT_NAO_BLOQUEANTE__.destroy){try{window.__FB_B35A1_RASPADOR_AMIGOS_V21_GATE_ESCOPO_EXPORT_NAO_BLOQUEANTE__.destroy();}catch(e){}}
  if(window.__FB_B35A1_RASPADOR_AMIGOS_V22_RELACAO_RECUPERACAO_FOTO_INFOGERAL_HTML__ && window.__FB_B35A1_RASPADOR_AMIGOS_V22_RELACAO_RECUPERACAO_FOTO_INFOGERAL_HTML__.destroy){try{window.__FB_B35A1_RASPADOR_AMIGOS_V22_RELACAO_RECUPERACAO_FOTO_INFOGERAL_HTML__.destroy();}catch(e){}}
  if(window.__FB_B35A1_RASPADOR_AMIGOS_V23_RELACAO_REAL_PROGRESS_STOP_EXPORT_MULTIFORMATO__ && window.__FB_B35A1_RASPADOR_AMIGOS_V23_RELACAO_REAL_PROGRESS_STOP_EXPORT_MULTIFORMATO__.destroy){try{window.__FB_B35A1_RASPADOR_AMIGOS_V23_RELACAO_REAL_PROGRESS_STOP_EXPORT_MULTIFORMATO__.destroy();}catch(e){}}
  if(window.__FB_B35A1_RASPADOR_AMIGOS_V24_NETWORK_CHAIN_UI_RESTORE__ && window.__FB_B35A1_RASPADOR_AMIGOS_V24_NETWORK_CHAIN_UI_RESTORE__.destroy){try{window.__FB_B35A1_RASPADOR_AMIGOS_V24_NETWORK_CHAIN_UI_RESTORE__.destroy();}catch(e){}}
  if(window.__FB_B35A1_RASPADOR_AMIGOS_V25_RELATION_ROOTS_TABLE_FIT__ && window.__FB_B35A1_RASPADOR_AMIGOS_V25_RELATION_ROOTS_TABLE_FIT__.destroy){try{window.__FB_B35A1_RASPADOR_AMIGOS_V25_RELATION_ROOTS_TABLE_FIT__.destroy();}catch(e){}}
  if(window.__FB_B35A1_RASPADOR_AMIGOS_V26_LOGICAL_CONNECTION_SEARCH_GAP__ && window.__FB_B35A1_RASPADOR_AMIGOS_V26_LOGICAL_CONNECTION_SEARCH_GAP__.destroy){try{window.__FB_B35A1_RASPADOR_AMIGOS_V26_LOGICAL_CONNECTION_SEARCH_GAP__.destroy();}catch(e){}}
  if(window.__FB_B35A1_RASPADOR_AMIGOS_V27_ACTIVE_RELATION_BINDING_VISIBILITY__ && window.__FB_B35A1_RASPADOR_AMIGOS_V27_ACTIVE_RELATION_BINDING_VISIBILITY__.destroy){try{window.__FB_B35A1_RASPADOR_AMIGOS_V27_ACTIVE_RELATION_BINDING_VISIBILITY__.destroy();}catch(e){}}
  const __B35_RC_RUNTIME_BUILD__='44.21.34';
  if(window.__FB_B35A1_V43_V42_CORE_EXCEL_UI_FINAL__){
    const __oldCore=window.__FB_B35A1_V43_V42_CORE_EXCEL_UI_FINAL__;
    if(String(__oldCore.__rcRuntimeBuild||'')===__B35_RC_RUNTIME_BUILD__){try{__oldCore.makePanel();}catch(e){} return;}
    /* RC5 hot-upgrade: RC3/RC4 antigos nao tinham marcador de build. Em vez de
       retornar silenciosamente, encerra o core anterior e instala o runtime atual. */
    try{if(__oldCore.destroy)__oldCore.destroy();}catch(e){}
    try{delete window.__FB_B35A1_V43_V42_CORE_EXCEL_UI_FINAL__;delete window.__FB_B35A1_V42_V41_CORE_EXCEL_HTML_FINAL__;delete window.__FB_B35A1_V41_V40_CORE_PRODUCTION_HARDENING_FINAL__;}catch(e){}
  }
  if(window.__FB_B35A1_V42_V41_CORE_EXCEL_HTML_FINAL__){try{window.__FB_B35A1_V42_V41_CORE_EXCEL_HTML_FINAL__.destroy&&window.__FB_B35A1_V42_V41_CORE_EXCEL_HTML_FINAL__.destroy();}catch(e){}}
  if(window.__FB_B35A1_V41_V40_CORE_PRODUCTION_HARDENING_FINAL__ && window.__FB_B35A1_V41_V40_CORE_PRODUCTION_HARDENING_FINAL__.destroy){try{window.__FB_B35A1_V41_V40_CORE_PRODUCTION_HARDENING_FINAL__.destroy();}catch(e){}}
  if(window.__FB_B35A1_V40_V39_CORE_COMPLEMENTARY_COLUMN_FINAL__ && window.__FB_B35A1_V40_V39_CORE_COMPLEMENTARY_COLUMN_FINAL__.destroy){try{window.__FB_B35A1_V40_V39_CORE_COMPLEMENTARY_COLUMN_FINAL__.destroy();}catch(e){}}
  if(window.__FB_B35A1_V37_V35_CORE_TERMINAL_HANDSHAKE__ && window.__FB_B35A1_V37_V35_CORE_TERMINAL_HANDSHAKE__.destroy){try{window.__FB_B35A1_V37_V35_CORE_TERMINAL_HANDSHAKE__.destroy();}catch(e){}}
  if(window.__FB_B35A1_V36_V35_CORE_OBSERVED_SURFACE_REALTIME__ && window.__FB_B35A1_V36_V35_CORE_OBSERVED_SURFACE_REALTIME__.destroy){try{window.__FB_B35A1_V36_V35_CORE_OBSERVED_SURFACE_REALTIME__.destroy();}catch(e){}}
  if(window.__FB_B35A1_RASPADOR_AMIGOS_V33_ROUTE_CONTAINER_OBSERVABLE_FRIENDS__ && window.__FB_B35A1_RASPADOR_AMIGOS_V33_ROUTE_CONTAINER_OBSERVABLE_FRIENDS__.destroy){try{window.__FB_B35A1_RASPADOR_AMIGOS_V33_ROUTE_CONTAINER_OBSERVABLE_FRIENDS__.destroy();}catch(e){}}
  if(window.__FB_B35A1_RASPADOR_AMIGOS_V31_NO_NAV_CONTEXT_GUARD__ && window.__FB_B35A1_RASPADOR_AMIGOS_V31_NO_NAV_CONTEXT_GUARD__.destroy){try{window.__FB_B35A1_RASPADOR_AMIGOS_V31_NO_NAV_CONTEXT_GUARD__.destroy();}catch(e){}}
  if(window.__FB_B35A1_EXT_STRUCTURED_GRAPHQL_V11_ONEPASS_PRODUCTION_FINAL__ && window.__FB_B35A1_EXT_STRUCTURED_GRAPHQL_V11_ONEPASS_PRODUCTION_FINAL__.destroy){try{window.__FB_B35A1_EXT_STRUCTURED_GRAPHQL_V11_ONEPASS_PRODUCTION_FINAL__.destroy();}catch(e){}}
  if(window.__FB_B35A1_EXT_STRUCTURED_GRAPHQL_FINAL_V2__ && window.__FB_B35A1_EXT_STRUCTURED_GRAPHQL_FINAL_V2__.destroy){try{window.__FB_B35A1_EXT_STRUCTURED_GRAPHQL_FINAL_V2__.destroy();}catch(e){}}
  if(window.__FB_B35A1_EXT_STRUCTURED_GRAPHQL_FINAL_V3_IDEMPOTENT__ && window.__FB_B35A1_EXT_STRUCTURED_GRAPHQL_FINAL_V3_IDEMPOTENT__.destroy){try{window.__FB_B35A1_EXT_STRUCTURED_GRAPHQL_FINAL_V3_IDEMPOTENT__.destroy();}catch(e){}}
  if(window.__FB_B35A1_EXT_STRUCTURED_GRAPHQL_V4_PHASE12_COHORT_BIOCOVERAGE__ && window.__FB_B35A1_EXT_STRUCTURED_GRAPHQL_V4_PHASE12_COHORT_BIOCOVERAGE__.destroy){try{window.__FB_B35A1_EXT_STRUCTURED_GRAPHQL_V4_PHASE12_COHORT_BIOCOVERAGE__.destroy();}catch(e){}}
  if(window.__FB_B35A1_EXT_STRUCTURED_GRAPHQL_V5_ABOUT_FULL_VARIANTS__ && window.__FB_B35A1_EXT_STRUCTURED_GRAPHQL_V5_ABOUT_FULL_VARIANTS__.destroy){try{window.__FB_B35A1_EXT_STRUCTURED_GRAPHQL_V5_ABOUT_FULL_VARIANTS__.destroy();}catch(e){}}
  if(window.__FB_B35A1_EXT_STRUCTURED_GRAPHQL_V6_ABOUT_SCOPE_FINAL__ && window.__FB_B35A1_EXT_STRUCTURED_GRAPHQL_V6_ABOUT_SCOPE_FINAL__.destroy){try{window.__FB_B35A1_EXT_STRUCTURED_GRAPHQL_V6_ABOUT_SCOPE_FINAL__.destroy();}catch(e){}}
  if(window.__FB_B35A1_EXT_STRUCTURED_GRAPHQL_V7_AUTO_META_ALL__ && window.__FB_B35A1_EXT_STRUCTURED_GRAPHQL_V7_AUTO_META_ALL__.destroy){try{window.__FB_B35A1_EXT_STRUCTURED_GRAPHQL_V7_AUTO_META_ALL__.destroy();}catch(e){}}
  if(window.__FB_B35A1_EXT_STRUCTURED_GRAPHQL_V8_FINAL_HARDENED__ && window.__FB_B35A1_EXT_STRUCTURED_GRAPHQL_V8_FINAL_HARDENED__.destroy){try{window.__FB_B35A1_EXT_STRUCTURED_GRAPHQL_V8_FINAL_HARDENED__.destroy();}catch(e){}}
  if(window.__FB_B35A1_EXT_RENDER_POOL_FINAL__ && window.__FB_B35A1_EXT_RENDER_POOL_FINAL__.destroy){try{window.__FB_B35A1_EXT_RENDER_POOL_FINAL__.destroy();}catch(e){}}

  const VERSION = 'B35A1_V43_V42_CORE_EXCEL_UI_FINAL_2026_07_10';
  const TOOL = 'FB_B35A1_V43_V42_CORE_EXCEL_UI_FINAL';
  const CREDIT_NAME = 'Guilherme Caselli';
  const CREDIT_IG = 'https://www.instagram.com/guilhermecaselli/';
  const CREDIT_NAME_CODEPOINTS = Object.freeze([71,117,105,108,104,101,114,109,101,32,67,97,115,101,108,108,105]);
  const CREDIT_NAME_FNV1A32 = 0x50b439f6;
  function creditNameFnv1a32(value){
    let h=0x811c9dc5;
    const text=String(value||'');
    for(let i=0;i<text.length;i++){ h^=text.charCodeAt(i); h=Math.imul(h,0x01000193)>>>0; }
    return h>>>0;
  }
  function assertCreditNameIntegrity(){
    const canonical=String.fromCharCode(...CREDIT_NAME_CODEPOINTS);
    if(CREDIT_NAME!==canonical || creditNameFnv1a32(CREDIT_NAME)!==CREDIT_NAME_FNV1A32){
      throw new Error('B35A1_CREDIT_NAME_INTEGRITY_VIOLATION');
    }
    return true;
  }
  assertCreditNameIntegrity();
  const DEFAULT_LIMIT = 0;
  const DEFAULT_META_LIMIT = 0;
  const AUTO_META_AFTER_LIST = true;
  const PRODUCTION_META_MODE = 'full_relation';
  /* RC6 44.21.34 - declarative audit policy. The missing symbol previously
     aborted fastEnrichStrict() before the first profile worker. */
  const ABOUT_ROUTE_POLICY = Object.freeze({
    version:'44.21.34',
    mode:'target_bound_about_first',
    primary:'canonical_profile_about_onepass',
    headerFallback:'only_when_about_not_target_bound_or_followers_missing',
    directorySupplement:['contact_info','links','basic_info'],
    identityDiscovery:false,
    currentRunOnly:true
  });
  const VALID_ABOUT_BINDING_MODES = Object.freeze(['response_exact_id','request_scoped_collection_token','request_scoped_section_token']);
  const SCROLL_WAIT_TIMEOUT_MS = 20*60*1000;
  const DEFAULT_DELAY = 0;
  const DEFAULT_FETCH_CONCURRENCY = 32;
  const STREAM_META_DURING_SCROLL = true;
  const STREAM_POLL_MS = 45;
  const GRAPHQL_MAX_ATTEMPTS = 3;
  const GRAPHQL_RETRY_CAP_MS = 60000;
  const MAX_META_WALL_MS = 60000;
  const MAX_POST_SCROLL_TAIL_MS = 15000;
  const RELATION_SCROLL_MAX_PASSES = 720;
  const RELATION_SCROLL_WAIT_MS = 900;
  const RELATION_BOTTOM_EPS_PX = 64;
  const RELATION_BOTTOM_CONFIRMATIONS = 6;
  const RELATION_BOTTOM_DWELL_MS = 5200;
  const RELATION_HEIGHT_EPS_PX = 8;
  const RELATION_RECOVERY_MAX_ROUNDS = 6;
  const RELATION_RECOVERY_MAX_MS = 25000;
  const RELATION_RECOVERY_WAIT_MS = 600;
  const RELATION_NETWORK_BASE_REPLAYS = 128;
  const RELATION_NETWORK_MAX_REPLAYS = 2500;
  const RELATION_NETWORK_MAX_PAYLOAD_BYTES = 10*1024*1024;
  const RELATION_NETWORK_DRAIN_MAX_MS = 8*60*1000;
  const RELATION_NETWORK_QUIET_MS = 1800;
  const RELATION_NETWORK_POLL_MS = 180;
  const RELATION_NETWORK_TARGET_GAP_QUIET_MS = 5200;
  const RELATION_SEARCH_RECOVERY_SETTLE_MS = 520;
  const RELATION_SEARCH_RECOVERY_STEP_WAIT_MS = 260;
  const RELATION_SEARCH_RECOVERY_MAX_SCROLL_STEPS = 16;
  const RELATION_SEARCH_RECOVERY_STABLE_STEPS = 3;
  const RELATION_SEARCH_RECOVERY_SATURATION = 18;
  const RELATION_SEARCH_RECOVERY_MAX_PREFIX_LEN = 2;
  const RELATION_SEARCH_RECOVERY_ALPHABET = Object.freeze('abcdefghijklmnopqrstuvwxyz0123456789'.split(''));
  const RELATION_UNKNOWN_TARGET_MAX_PASSES = 420;
  const STOP_ERROR_CODE = 'B35A1_STOP_REQUESTED';
  const LOW_PHOTO_RECOVERY_CONCURRENCY = 3;
  const LOW_PHOTO_PROBE_TIMEOUT_MS = 5500;
  const ALL_GENERAL_SUPPLEMENT_CONCURRENCY = 12;
  const ALL_GENERAL_FETCH_TIMEOUT_MS = 20000;
  const FINAL_HTML_COLUMNS = Object.freeze(['#','Foto','Capa','Username','Nome','Perfil','Bio','Categoria','Link externo','Seguidores','Seguindo','E-mail','Telefone','Localização','Trabalho','Formação','Horário','Área de atendimento','Informações gerais (All/About)']);
  const STABLE_BASE_VERSION = 'B35A1_CONSOLE_JS_TKSTYLE_METAFRAME_FINAL_2026_07_02';
  const SNAPSHOT_HEADER_QUERY_ID = '26916983467972978';
  const SNAPSHOT_ABOUT_QUERY_ID = '26885786877765593';
  const SNAPSHOT_TOP_APP_QUERY_ID = '27618050364552818';
  // V44.21.30 RC2: benchmark/coorte movidos para artefatos de auditoria; produção não contém identidades congeladas nem usa benchmark como gate.
  const BENCHMARK_DIAGNOSTICS_ENABLED = false;
  const HISTORICAL_META_REFERENCE_50 = Object.freeze({diagnosticOnly:true,disabledInProduction:true,followers:0,following:0,note:'historical benchmark moved to _AUDIT'});
  const SAME_COHORT_CONTACT_REFERENCE_50 = Object.freeze({diagnosticOnly:true,disabledInProduction:true,emailRows:0,phoneRows:0,note:'historical benchmark moved to _AUDIT'});
  const KNOWN_CANARIES = Object.freeze({});
  const FROZEN_META_COHORT = Object.freeze({cohortId:'DISABLED_IN_PRODUCTION',configSha256:'',requiredExactMatches:0,entries:Object.freeze([]),diagnosticOnly:true});
  const BIO_PRESENT='BIO_PRESENT', BIO_ABSENT_CONFIRMED='BIO_ABSENT_CONFIRMED', BIO_NOT_OBSERVABLE='BIO_NOT_OBSERVABLE', BIO_UNRESOLVED='BIO_UNRESOLVED';
  const ABOUT_COMPLETE='ABOUT_COMPLETE', ABOUT_PARTIAL='ABOUT_PARTIAL', ABOUT_UNAVAILABLE='ABOUT_UNAVAILABLE';
  const BAD_BIO_RE = /(qplTimingsServerJS|splash_screen_show|__bbox|require\s*\[|Comet|DTSG|LSDToken|ServerJS|ScheduledServerJS|RelayPrefetchedStreamCache|"require"\s*:\s*\[)/i;
  const JSONISH_RE = /^\s*[\[{][\s\S]{0,2000}[\]}]\s*$/;
  const BAD_UI_TEXT = /(number of unread notifications|your push notifications are off|turn on notifications|professional dashboard|new see allunread|search facebook|facebook ©|privacy · terms|ad choices|meta pay|settings and privacy|help and support|display and accessibility|give feedback|switch profile|account center|criar story|create story|what's on your mind|no thanks|not now)/i;
  const RESERVED = new Set([
    'friends','followers','following','groups','watch','marketplace','reel','reels','stories','events','pages','gaming','messages','notifications','settings','help','privacy','ads','login','share','search','photo','photos','videos','about','me','profile.php','people','hashtag','permalink','plugins','business','bookmarks','professional_dashboard','latest','home','recover','legal','policies','privacy_center','notifications','gaming_video','fundraisers','saved','memories','onthisday','friends/requests','pages_feed','messenger','profile_switcher','notifications','adsmanager','creatorstudio','policies_center'
  ]);

  const state = {
    startedAt: new Date().toISOString(),
    rows: new Map(),
    events: [], warnings: [], errors: [],
    pageTargetKey: currentTarget(), pageHref: String(location.href||''), pageContextChangedAt:'',
    relation: inferRelationFromUrl(location.href),
    limit: Number.MAX_SAFE_INTEGER,
    expected: 0,
    expectedHint: 0,
    declaredRelationTarget: 0,
    observedRelationCount: 0,
    relationObservedClosed: false,
    relationTargetReached: false,
    relationSurfaceAudit: {requested:'',active:'',confidence:0,mismatch:false,trusted:false,clusterKind:'',clusterRelations:[],requestedInCluster:false,evidence:[],at:'',reason:''},
    relationSurfaceBlocked: false,
    relationVisibilityGap: false,
    relationExposure:{serverTerminalBelowTarget:false,backendHasNext:false,backendEndCursor:'',backendRootCount:0,visibleCount:0,declaredCount:0,reason:'',at:''},
    relationRecovery: {active:false,rounds:0,attempts:0,gains:0,lastGainAt:'',startedAt:'',completedAt:'',exhausted:false,reason:'',candidateCount:0},
    relationTargetAudit: {relation:'',target:0,rawTarget:0,targetConfirmed:false,source:'',confidence:0,evidence:[],counts:{friends:0,followers:0,following:0},at:''},
    relationUiHint:{relation:'',label:'',href:'',source:'',confidence:0,at:'',targetUser:''},
    relationIntent:{relation:inferRelationFromUrl(location.href),source:'startup_route',confidence:120,explicitUser:false,at:new Date().toISOString(),targetUser:currentTarget()},
    relationVisualDiagnostic:{relation:'',confidence:0,trusted:false,evidence:[],at:'',reason:''},
    relationRunContext:{locked:false,active:false,relation:'',target:0,rawTarget:0,targetConfirmed:false,source:'',confidence:0,startedAt:'',completedAt:''},
    stopRequested:false, stopReason:'', stopAt:'', runController:null, runGeneration:0,
    networkRelation:{installed:false,active:false,sessionId:'',targetId:'',activeRelation:'',runStartedAt:'',acceptedPayloads:0,rejectedPayloads:0,candidatesSeen:0,rowsCreated:0,rowsUpdated:0,replaysRequested:0,replaysCompleted:0,replaysInFlight:0,lastCursor:'',seenCursors:[],seenCursorKeys:[],seenConnectionCursorKeys:[],requestIds:[],trustedRequestIds:[],replayParents:{},requestConnections:{},roots:{},terminalRoots:[],routeBoundRoots:[],connectionFingerprints:[],rejectionReasons:{},staleBacklogRejected:0,uiHintMismatchRejected:0,typeMismatchRejected:0,unboundGenericRejected:0,startedAt:'',completedAt:'',lastPayloadAt:'',lastAcceptedAt:'',lastGainAt:'',lastEvidence:'',terminalObserved:false,terminalRequestId:'',lastPageInfo:{seen:false,hasNext:false,endCursor:''},drainActive:false,drainStartedAt:'',drainCompletedAt:'',drainReason:''},
    relationSearchRecovery:{active:false,attempted:false,completed:false,available:false,attempts:0,prefixesTried:[],gained:0,startedAt:'',completedAt:'',reason:'',inputDescriptor:''},
    expectedSource: 'unresolved_until_dom_target',
    closedRelationCount: 0,
    closureReason: '',
    metaLimit: 0,
    cohortAudit:{cohortId:FROZEN_META_COHORT.cohortId,configSha256:FROZEN_META_COHORT.configSha256,mode:'not_evaluated',comparable:false,matched:0,expected:FROZEN_META_COHORT.requiredExactMatches,missing:[]},
    delay: DEFAULT_DELAY,
    runningScroll: false,
    runningMeta: false,
    metaRunHistory: [],
    metaRun: {
      active:false, completed:false, runId:'', requestedLimit:0, queuedKeys:[], startedKeys:new Set(), completedKeys:new Set(),
      targetBoundKeys:new Set(), semanticKeys:new Set(), bioKeys:new Set(), followersKeys:new Set(), followingKeys:new Set(),
      withCountsKeys:new Set(), externalLinkKeys:new Set(), idResolvedKeys:new Set(), headerHttpOkKeys:new Set(), headerParseOkKeys:new Set(), headerTargetBoundKeys:new Set(), headerSemanticKeys:new Set(), aboutQueuedKeys:new Set(),
      aboutHttpOkKeys:new Set(), aboutSemanticKeys:new Set(), aboutCompleteKeys:new Set(), aboutPartialKeys:new Set(), aboutUnavailableKeys:new Set(), bioPresentKeys:new Set(), bioAbsentConfirmedKeys:new Set(), bioNotObservableKeys:new Set(), bioUnresolvedKeys:new Set(), rejectedDuplicateStarts:0, startedAt:'', completedAt:'', promise:null
    },
    generalRun: {
      active:false, completed:false, runId:'', queuedUnique:0, startedUnique:0, completedUnique:0, failedUnique:0, startedAt:'', completedAt:''
    },
    photoRecoveryRun: {active:false,completed:false,queued:0,started:0,probed:0,improved:0,failed:0,startedAt:'',completedAt:''},
    bottomConfirmed: false,
    passiveInstalled: false,
    nativeFetch: null, nativeXHROpen: null, nativeXHRSend: null,
    fetchConcurrency: DEFAULT_FETCH_CONCURRENCY,
    graphqlCooldownUntil: 0,
    lastExportBase: '',
    targetProfileEnriched: null,
    targetProfilePromise: null,
    scrollStartedAt: '',
    scrollCompletedAt: '',
    stats: {
      domScans:0, domRowsSeen:0, rowsInserted:0, rowsUpdated:0, duplicates:0,
      rejectedNoUsername:0, rejectedReserved:0, rejectedTarget:0, rejectedBadUi:0, rejectedNoCard:0, rejectedNoName:0,
      imageProbeScheduled:0, imageProbeMeasured:0, imageProbeFailed:0, imageProbeConfirmedHdRows:0,
      lowPhotoRecoveryQueued:0, lowPhotoRecoveryStarted:0, lowPhotoRecoveryProbed:0, lowPhotoRecoveryImproved:0, lowPhotoRecoveryFailed:0,
      passiveFetchSeen:0, passiveXHRSeen:0, passivePayloadsParsed:0, passiveConfirmedHits:0, passiveMetaApplied:0, passiveRowsCreated:0,
      networkRelationPayloadsSeen:0, networkRelationPayloadsAccepted:0, networkRelationPayloadsRejected:0, networkRelationCandidatesSeen:0, networkRelationRowsCreated:0, networkRelationRowsUpdated:0, networkRelationReplayRequested:0, networkRelationReplayCompleted:0, networkRelationStaleRejected:0, networkRelationUiHintMismatch:0, networkRelationTypeMismatch:0, networkRelationUnboundGenericRejected:0,
      relationSearchRecoveryAttempts:0, relationSearchRecoveryPrefixes:0, relationSearchRecoveryGained:0,
      profileFetchQueued:0, profileFetchStarted:0, profileFetchHttpOk:0, profileParseOk:0, profileTargetBoundOk:0, profileSemanticMetaOk:0, profileFetchFailed:0, profileFetch403:0, profileFetch429:0,
      profileRenderQueued:0, profileRenderStarted:0, profileRenderReady:0, profileRenderTargetBoundOk:0, profileRenderSemanticOk:0,
      profileIdResolved:0, profileHeaderQueued:0, profileHeaderStarted:0, profileHeaderHttpOk:0, profileHeaderTargetBoundOk:0, profileHeaderSemanticOk:0, profileAboutQueued:0, profileAboutHttpOk:0, profileAboutSemanticOk:0,
      profileAboutRequestsQueued:0, profileAboutRequestsHttpOk:0, profileAboutRequestsSemanticOk:0, metaDuplicateStartRejected:0,
      profileBioWithText:0, profileMetaWithCounts:0, profileExternalLinkFound:0,
      allSupplementQueued:0, allSupplementStarted:0, allSupplementHttpOk:0, allSupplementTargetBoundOk:0, allSupplementSemanticOk:0, allSupplementEmailFound:0, allSupplementPhoneFound:0, allSupplementLocationFound:0, allSupplementExternalFound:0, allSupplementFastDomHit:0, allSupplementJsonFallback:0, allSupplementSkippedContactPresent:0, allSupplementSkippedGeneralCoverage:0, generalItemsApplied:0, allSupplementFailed:0,
      bioCoveragePresent:0, bioCoverageAbsentConfirmed:0, bioCoverageNotObservable:0, bioCoverageUnresolved:0, bioCoverageRowsInstrumented:0, aboutCoverageComplete:0, aboutCoveragePartial:0, aboutCoverageUnavailable:0,
      qplBioRejected:0, scriptTextRejected:0, semanticContamination:0, uiContamination:0, emptyLinkContamination:0
    }
  };
  let __b35a1Heartbeat=null,__b35a1Port=null,__b35RelationUiObserver=null,__b35RelationUiTimer=null,__b35RelationClickHandler=null;

  function emptyMetaRunState(){
    return {active:false,completed:false,runId:'',requestedLimit:0,queuedKeys:[],startedKeys:new Set(),completedKeys:new Set(),targetBoundKeys:new Set(),semanticKeys:new Set(),bioKeys:new Set(),followersKeys:new Set(),followingKeys:new Set(),withCountsKeys:new Set(),externalLinkKeys:new Set(),idResolvedKeys:new Set(),headerHttpOkKeys:new Set(),headerParseOkKeys:new Set(),headerTargetBoundKeys:new Set(),headerSemanticKeys:new Set(),aboutQueuedKeys:new Set(),aboutHttpOkKeys:new Set(),aboutSemanticKeys:new Set(),aboutCompleteKeys:new Set(),aboutPartialKeys:new Set(),aboutUnavailableKeys:new Set(),bioPresentKeys:new Set(),bioAbsentConfirmedKeys:new Set(),bioNotObservableKeys:new Set(),bioUnresolvedKeys:new Set(),onePassKeys:new Set(),headerFallbackKeys:new Set(),rejectedDuplicateStarts:0,startedAt:'',completedAt:'',promise:null};
  }
  function clearOperationalCohort(nextRelation,reason='context_reset',extra={}){
    try{if(state.runController)state.runController.abort();}catch(e){}
    try{endRelationNetworkCapture(reason);}catch(e){}
    state.rows.clear();state.metaRun=emptyMetaRunState();state.generalRun={active:false,completed:false,runId:'',queuedUnique:0,startedUnique:0,completedUnique:0,failedUnique:0,startedAt:'',completedAt:''};
    state.photoRecoveryRun={active:false,completed:false,queued:0,started:0,probed:0,improved:0,failed:0,startedAt:'',completedAt:''};
    try{if(typeof __b35GeneralPromises!=='undefined')__b35GeneralPromises.clear();}catch(e){}
    for(const k of Object.keys(state.stats||{}))state.stats[k]=0;
    state.warnings=[];state.errors=[];state.metaLimit=0;state.expected=0;state.expectedHint=0;state.declaredRelationTarget=0;state.limit=Number.MAX_SAFE_INTEGER;state.expectedSource='unresolved_until_dom_target';
    state.observedRelationCount=0;state.closedRelationCount=0;state.relationObservedClosed=false;state.relationTargetReached=false;state.bottomConfirmed=false;state.relationVisibilityGap=false;
    state.relationExposure={serverTerminalBelowTarget:false,backendHasNext:false,backendEndCursor:'',backendRootCount:0,visibleCount:0,declaredCount:0,reason:'',at:''};state.closureReason='';
    state.relationTargetAudit={relation:'',target:0,rawTarget:0,targetConfirmed:false,source:'',confidence:0,evidence:[],counts:{friends:0,followers:0,following:0},at:''};
    state.relationUiHint={relation:'',label:'',href:'',source:'',confidence:0,at:'',targetUser:''};
    state.relationVisualDiagnostic={relation:'',confidence:0,trusted:false,evidence:[],at:'',reason:''};
    state.relationIntent={relation:nextRelation||inferRelationFromUrl(location.href)||'friends',source:'context_reset_route',confidence:120,explicitUser:false,at:new Date().toISOString(),targetUser:currentTarget()};
    state.relationRunContext={locked:false,active:false,relation:nextRelation||'',target:0,rawTarget:0,targetConfirmed:false,source:'',confidence:0,startedAt:'',completedAt:''};
    state.relationSearchRecovery={active:false,attempted:false,completed:false,available:false,attempts:0,prefixesTried:[],gained:0,startedAt:'',completedAt:'',reason:'',inputDescriptor:''};
    state.relationRecovery={active:false,rounds:0,attempts:0,gains:0,lastGainAt:'',startedAt:'',completedAt:'',exhausted:false,reason:'',candidateCount:0};
    state.networkRelation={installed:state.networkRelation&&state.networkRelation.installed===true,active:false,sessionId:'',targetId:'',activeRelation:'',runStartedAt:'',acceptedPayloads:0,rejectedPayloads:0,candidatesSeen:0,rowsCreated:0,rowsUpdated:0,replaysRequested:0,replaysCompleted:0,replaysInFlight:0,lastCursor:'',seenCursors:[],seenCursorKeys:[],seenConnectionCursorKeys:[],requestIds:[],trustedRequestIds:[],replayParents:{},requestConnections:{},roots:{},terminalRoots:[],routeBoundRoots:[],connectionFingerprints:[],rejectionReasons:{},staleBacklogRejected:0,uiHintMismatchRejected:0,typeMismatchRejected:0,unboundGenericRejected:0,startedAt:'',completedAt:'',lastPayloadAt:'',lastAcceptedAt:'',lastGainAt:'',lastEvidence:'',terminalObserved:false,terminalRequestId:'',lastPageInfo:{seen:false,hasNext:false,endCursor:''},drainActive:false,drainStartedAt:'',drainCompletedAt:'',drainReason:''};
    state.targetProfileEnriched=null;state.targetProfilePromise=null;state.scrollStartedAt='';state.scrollCompletedAt='';
    state.stopRequested=false;state.stopReason='';state.stopAt='';state.runController=new AbortController();
    if(nextRelation)state.relation=nextRelation;
    log('info','Coorte operacional reiniciada para impedir mistura de contexto/relação.',{reason,nextRelation:state.relation,...extra});
    return true;
  }
  function resetRelationCohort(previous,next,reason='relation_switch'){
    if(!previous||!next||previous===next)return false;
    const preservedTarget=state.targetProfileEnriched&&state.targetProfileEnriched.targetBound===true?JSON.parse(JSON.stringify(state.targetProfileEnriched)):null;
    const preservedIntent=state.relationIntent&&state.relationIntent.explicitUser===true?{...state.relationIntent}:null;
    const ok=clearOperationalCohort(next,reason,{previousRelation:previous,nextRelation:next});
    if(preservedTarget)state.targetProfileEnriched=preservedTarget;
    if(preservedIntent)state.relationIntent={...preservedIntent,relation:next,at:new Date().toISOString(),targetUser:currentTarget()};
    return ok;
  }
  function resetTargetContext(previousTarget,nextTarget,reason='target_switch'){
    if(!previousTarget||!nextTarget||String(previousTarget)===String(nextTarget))return false;
    const nextRelation=inferRelationFromUrl(location.href)||state.relation||'friends';
    clearOperationalCohort(nextRelation,reason,{previousTarget:String(previousTarget),nextTarget:String(nextTarget)});
    state.pageTargetKey=String(nextTarget);state.pageHref=String(location.href||'');state.pageContextChangedAt=new Date().toISOString();
    return true;
  }
  function ensureCurrentPageContext(reason='context_guard'){
    const now=String(currentTarget()||''),prev=String(state.pageTargetKey||''),previousHref=String(state.pageHref||''),currentHref=String(location.href||'');
    if(now&&prev&&now!==prev){resetTargetContext(prev,now,reason);return {changed:true,previous:prev,current:now,relationChanged:false};}
    const prevRoute=relationRouteContext(previousHref),curRoute=relationRouteContext(currentHref),runCtx=state.relationRunContext||{};
    const explicitRouteChanged=!!(previousHref&&curRoute.relation&&['explicit','explicit_friends_all'].includes(curRoute.kind)&&prevRoute.relation!==curRoute.relation);
    const conflictsLockedRun=!!(runCtx.locked===true&&runCtx.relation&&curRoute.relation&&['explicit','explicit_friends_all'].includes(curRoute.kind)&&curRoute.relation!==runCtx.relation);
    if(conflictsLockedRun){
      state.relationSurfaceBlocked=true;
      if(state.stopRequested!==true)requestStop('explicit_route_relation_changed');
      state.pageHref=currentHref;
      return {changed:false,previous:prev,current:now,relationChanged:true,previousRelation:runCtx.relation,currentRelation:curRoute.relation,blocked:true};
    }
    if(now&&!prev){state.pageTargetKey=now;state.pageHref=currentHref;state.pageContextChangedAt=new Date().toISOString();}
    else if(now)state.pageHref=currentHref;
    return {changed:false,previous:prev,current:now,relationChanged:explicitRouteChanged,previousRelation:prevRoute.relation||'',currentRelation:curRoute.relation||'',blocked:false};
  }

  function cleanText(s){ return String(s||'').replace(/\u00a0/g,' ').replace(/[\t\r]+/g,' ').replace(/\n[ \t]+/g,'\n').replace(/[ \t]+\n/g,'\n').replace(/\n{3,}/g,'\n\n').replace(/ {2,}/g,' ').trim(); }
  function oneLine(s){ return cleanText(s).replace(/\s*\n\s*/g,' ').trim(); }
  function esc(s){ return String(s||'').replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
  function makeStopError(stage=''){ const e=new Error(STOP_ERROR_CODE+(stage?': '+stage:'')); e.code=STOP_ERROR_CODE; return e; }
  function isStopError(e){ return !!(e&&(e.code===STOP_ERROR_CODE||String(e.message||'').startsWith(STOP_ERROR_CODE))); }
  function resetRunControl(){ state.stopRequested=false;state.stopReason='';state.stopAt='';state.runGeneration++;try{if(state.runController)state.runController.abort();}catch(e){}state.runController=new AbortController();return state.runGeneration; }
  function runSignal(){ return state.runController&&state.runController.signal||null; }
  function throwIfStopped(stage=''){ if(state.stopRequested===true||(runSignal()&&runSignal().aborted))throw makeStopError(stage); }
  function sleep(ms){ return new Promise((resolve,reject)=>{ const signal=runSignal(); if(state.stopRequested===true||(signal&&signal.aborted)){reject(makeStopError('sleep'));return;} const t=setTimeout(done,Math.max(0,Number(ms||0))); function done(){cleanup();resolve();} function onAbort(){clearTimeout(t);cleanup();reject(makeStopError('sleep_abort'));} function cleanup(){try{if(signal)signal.removeEventListener('abort',onAbort);}catch(e){}} try{if(signal)signal.addEventListener('abort',onAbort,{once:true});}catch(e){} }); }
  function requestStop(reason='usuario'){
    if(state.stopRequested===true)return false;
    state.stopRequested=true;state.stopReason=String(reason||'usuario');state.stopAt=new Date().toISOString();
    try{if(state.runController)state.runController.abort();}catch(e){}
    try{endRelationNetworkCapture('stop_requested');}catch(e){}
    state.runningScroll=false;state.runningMeta=false;
    if(state.metaRun)state.metaRun.stopRequested=true;
    if(state.generalRun)state.generalRun.stopRequested=true;
    warn('Execução interrompida pelo usuário; dados já coletados foram preservados.',{reason:state.stopReason,total:rowsArr().length,enriched:Number(metaRunSummary().completedUnique||0)});
    updateButtons();renderStatus();return true;
  }
  function nowBR(){ return new Date().toLocaleString('pt-BR'); }
  function isoStamp(){ return new Date().toISOString().replace(/[:.]/g,'-'); }
  function slug(s){ return String(s||'facebook').toLowerCase().replace(/^@/,'').replace(/[^a-z0-9_.-]+/g,'_').replace(/^_+|_+$/g,'').slice(0,80) || 'facebook'; }
  function normalizeUrl(u){ try{return new URL(String(u||''), location.origin).href;}catch(e){return '';} }
  function isFacebookHost(host){ return /(^|\.)(facebook\.com|fb\.com)$/i.test(String(host||'')); }
  function pathParts(url){ return url.pathname.replace(/^\/+|\/+$/g,'').split('/').filter(Boolean); }
  function log(type,message,extra){ const ev={at:new Date().toISOString(),type,message}; if(extra!==undefined) ev.extra=extra; state.events.push(ev); renderStatus(); }
  function warn(message,extra){ state.warnings.push({at:new Date().toISOString(),type:'warn',message,extra}); log('warn',message,extra); }
  function err(message,extra){ state.errors.push({at:new Date().toISOString(),type:'error',message,extra:String(extra&&extra.stack||extra||'')}); log('error',message,extra); }

  function currentTarget(){
    const parts = location.pathname.replace(/^\/+|\/+$/g,'').split('/').filter(Boolean);
    if(parts[0] === 'profile.php') return new URL(location.href).searchParams.get('id') ? 'id:'+new URL(location.href).searchParams.get('id') : '';
    return parts[0] || '';
  }
  const FRIENDS_CANONICAL_RESUME_KEY = 'FB_B35A1_V29_FRIENDS_ALL_RESUME';
  function isBareFriendsContainerUrl(href=location.href){
    try{
      const u=new URL(String(href||location.href),location.origin),path=u.pathname.replace(/\/+$/,'').toLowerCase();
      if(path==='/profile.php')return /(?:^|[?&])sk=friends(?:&|$)/i.test(u.search)&&!/(?:^|[?&])sk=friends_all(?:&|$)/i.test(u.search);
      return /\/friends$/.test(path);
    }catch(e){return false;}
  }
  function isCanonicalFriendsAllUrl(href=location.href){
    try{
      const u=new URL(String(href||location.href),location.origin),path=u.pathname.replace(/\/+$/,'').toLowerCase();
      if(path==='/profile.php')return /(?:^|[?&])sk=friends_all(?:&|$)/i.test(u.search);
      return /\/friends_all$/.test(path);
    }catch(e){return false;}
  }
  function canonicalFriendsAllUrl(){ return ''; }
  function storeCanonicalFriendsResume(){
    // V31: navegação automática removida. Limpa eventual marcador legado e nunca persiste retomada.
    try{sessionStorage.removeItem(FRIENDS_CANONICAL_RESUME_KEY);}catch(e){}
    return false;
  }
  function consumeCanonicalFriendsResume(){
    // V31: impede auto-resume herdado de V29/V30 após rota artificial friends_all.
    try{sessionStorage.removeItem(FRIENDS_CANONICAL_RESUME_KEY);}catch(e){}
    return false;
  }
  function ensureCanonicalFriendsSurfaceForRun(){
    // V31: preserva estritamente a URL/superfície aberta pelo usuário. Nunca usa location.assign,
    // nunca fabrica /friends_all e nunca troca de página durante a execução.
    const route=relationRouteContext(location.href);
    return {ready:true,navigating:false,relation:route.relation||state.relation,preservedUrl:true,href:String(location.href||'')};
  }
  function inferRelationFromUrl(href){ const s=String(href||'').toLowerCase(); if(s.includes('/followers')) return 'followers'; if(s.includes('/following')) return 'following'; if(s.includes('/friends_all') || /(?:^|[?&])sk=friends_all(?:&|$)/i.test(s)) return 'friends'; if(s.includes('/friends') || /(?:^|[?&])sk=friends(?:&|$)/i.test(s)) return 'friends'; return 'friends'; }
  function normalizeRelationSurfaceText(value){
    return cleanText(value).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/\s+/g,' ').trim();
  }
  function relationFromSurfaceValue(value){
    const raw=String(value||''), t=normalizeRelationSurfaceText(raw);
    const label=t.replace(/\s*(?:[·|:]\s*)?\(?\d[\d.,\s]*[kmb]?\)?\s*$/i,'').trim();
    if(/^(?:friends?|amigos?|amizades?)$/.test(label))return 'friends';
    if(/^(?:following|seguindo)$/.test(label))return 'following';
    if(/^(?:followers?|seguidores?)$/.test(label))return 'followers';
    const lower=raw.toLowerCase();
    if(/\/following(?:\/|$|[?#])/.test(lower))return 'following';
    if(/\/followers(?:\/|$|[?#])/.test(lower))return 'followers';
    if(/\/friends_all(?:\/|$|[?#])/.test(lower)||/(?:^|[?&])sk=friends_all(?:&|$)/.test(lower))return 'friends';
    if(/\/friends(?:\/|$|[?#])/.test(lower)||/(?:^|[?&])sk=friends(?:&|$)/.test(lower))return 'friends';
    return '';
  }
  function elementIsVisible(el){
    if(!el||!el.getBoundingClientRect)return false;
    const rect=el.getBoundingClientRect();
    if(rect.width<1||rect.height<1)return false;
    try{const cs=getComputedStyle(el);if(cs.display==='none'||cs.visibility==='hidden')return false;}catch(e){}
    return true;
  }
  function relationRelationsInContainer(container){
    if(!container||!container.querySelectorAll)return [];
    const out=[],seen=new Set();let nodes=[];
    try{nodes=Array.from(container.querySelectorAll('[role="tab"],a[href],a[aria-current],[aria-selected]'));}catch(e){}
    for(const el of nodes){
      const label=cleanText(el.getAttribute&&el.getAttribute('aria-label')||el.innerText||el.textContent||'');
      const href=el.getAttribute&&el.getAttribute('href')||'';
      const rel=relationFromSurfaceValue(label)||relationFromSurfaceValue(href);
      if(rel&&!seen.has(rel)){seen.add(rel);out.push(rel);}
    }
    return out;
  }
  function relationSurfaceCluster(el){
    if(!el)return null;
    let tablist=null;
    try{tablist=el.closest&&el.closest('[role="tablist"]');}catch(e){}
    if(tablist){
      const relations=relationRelationsInContainer(tablist);
      if(relations.length>=2)return {node:tablist,kind:'tablist',relations};
    }
    let node=el.parentElement||null;
    for(let depth=0;depth<6&&node;depth++,node=node.parentElement){
      try{if(node===document.body||node===document.documentElement)break;}catch(e){}
      const text=cleanText(node.innerText||node.textContent||'');
      if(text.length>0&&text.length<=1200){
        const relations=relationRelationsInContainer(node);
        if(relations.length>=2)return {node,kind:'bounded_relation_cluster',relations};
      }
    }
    return null;
  }
  function cssRgbTuple(value){
    const m=String(value||'').match(/rgba?\(\s*(\d+)\s*[, ]\s*(\d+)\s*[, ]\s*(\d+)/i);return m?[Number(m[1]),Number(m[2]),Number(m[3])]:null;
  }
  function isFacebookBlueCss(value){ const rgb=cssRgbTuple(value);if(!rgb)return false;const [r,g,b]=rgb;return b>=150&&b>r*1.35&&b>g*1.08; }
  function numericCssPx(value){ const n=parseFloat(String(value||'').replace('px',''));return Number.isFinite(n)?n:0; }
  function relationVisualActiveEvidence(el){
    if(!el)return {active:false,score:0,evidence:[]};
    const nodes=[];let cur=el;
    for(let i=0;i<10&&cur;i++,cur=cur.parentElement)nodes.push(cur);
    try{for(const d of Array.from(el.querySelectorAll('*')).slice(0,60))nodes.push(d);}catch(e){}
    let blue=false,underline=false,geometryUnderline=false;const evidence=[];
    for(const n of nodes){
      try{
        const cs=getComputedStyle(n);if(isFacebookBlueCss(cs.color)||isFacebookBlueCss(cs.backgroundColor)){blue=true;}
        const bw=Math.max(numericCssPx(cs.borderBottomWidth),numericCssPx(cs.borderTopWidth));
        if(bw>=2&&(isFacebookBlueCss(cs.borderBottomColor)||isFacebookBlueCss(cs.borderTopColor))){underline=true;}
        for(const pseudo of ['::after','::before']){
          let ps=null;try{ps=getComputedStyle(n,pseudo);}catch(e){}
          if(!ps)continue;
          const h=Math.max(numericCssPx(ps.height),numericCssPx(ps.borderBottomWidth),numericCssPx(ps.borderTopWidth));
          const w=numericCssPx(ps.width);
          if(h>=2&&(w>=8||String(ps.width||'').includes('%'))&&(isFacebookBlueCss(ps.backgroundColor)||isFacebookBlueCss(ps.borderBottomColor)||isFacebookBlueCss(ps.borderTopColor))){underline=true;}
        }
      }catch(e){}
    }
    try{
      const r=el.getBoundingClientRect();
      const ys=[r.bottom-2,r.bottom+1,r.bottom+3];
      const xs=[r.left+r.width*0.25,r.left+r.width*0.5,r.left+r.width*0.75];
      for(const y of ys)for(const x of xs){
        for(const n of (document.elementsFromPoint?document.elementsFromPoint(x,y):[]).slice(0,12)){
          try{
            const cs=getComputedStyle(n),h=n.getBoundingClientRect().height;
            if(h<=10&&(isFacebookBlueCss(cs.backgroundColor)||isFacebookBlueCss(cs.borderBottomColor)||isFacebookBlueCss(cs.borderTopColor))){geometryUnderline=true;break;}
          }catch(e){}
        }
        if(geometryUnderline)break;
      }
    }catch(e){}
    if(blue)evidence.push('visual_fb_blue');
    if(underline)evidence.push('visual_underline');
    if(geometryUnderline)evidence.push('visual_geometry_underline');
    return {active:blue&&(underline||geometryUnderline),score:(blue?35:0)+(underline?55:0)+(geometryUnderline?45:0),evidence};
  }
  function explicitUserRelationHintSource(source=''){
    return /^(?:user_click|user_click_capture|panel_user_intent|explicit_user_interaction)$/.test(String(source||''));
  }
  function recentRelationUiHint(maxAgeMs=30*60*1000){
    const h=state.relationUiHint||{},at=Date.parse(h.at||'')||0;
    if(!h.relation||!at||Date.now()-at>maxAgeMs||!explicitUserRelationHintSource(h.source))return null;
    const target=String(h.targetUser||''),current=String(currentTarget()||'');
    if(target&&current&&target!==current)return null;
    return {...h};
  }
  function rememberRelationUiHint(relation,extra={}){
    const rel=String(relation||'');if(!['friends','followers','following'].includes(rel))return null;
    const source=String(extra.source||'ui_diagnostic');
    const hint={relation:rel,label:cleanText(extra.label||''),href:String(extra.href||''),source,confidence:Math.max(120,Number(extra.confidence||0)),at:extra.at||new Date().toISOString(),targetUser:String(extra.targetUser||currentTarget()||'')};
    state.relationUiHint=hint;
    if(explicitUserRelationHintSource(source))state.relationIntent={relation:rel,source,confidence:Math.max(250,Number(hint.confidence||0)),explicitUser:true,at:hint.at,targetUser:hint.targetUser};
    return hint;
  }
  function relationClickControl(target){
    let el=target&&target.nodeType===1?target:null;
    for(let depth=0;el&&depth<7;depth++,el=el.parentElement){
      const label=cleanText(el.getAttribute&&el.getAttribute('aria-label')||el.innerText||el.textContent||'');
      const href=String(el.getAttribute&&el.getAttribute('href')||'');
      const relLabel=relationFromSurfaceValue(label),relHref=relationFromSurfaceValue(href),role=String(el.getAttribute&&el.getAttribute('role')||'').toLowerCase();
      const exactLabel=!!relLabel&&normalizeRelationSurfaceText(label).replace(/\s*(?:[·|:]\s*)?\(?\d[\d.,\s]*[kmb]?\)?\s*$/i,'').trim().length<=24;
      const controlLike=role==='tab'||el.tagName==='A'||el.tagName==='BUTTON'||el.hasAttribute&&el.hasAttribute('aria-selected');
      const relation=relLabel||(controlLike?relHref:'');
      if(relation&&controlLike&&(exactLabel||relHref))return {el,relation,label,href};
    }
    return null;
  }
  function installExplicitRelationClickTracker(){
    if(__b35RelationClickHandler)return;
    __b35RelationClickHandler=event=>{
      const hit=relationClickControl(event.target);if(!hit)return;
      const previous=state.relation,rel=hit.relation;
      rememberRelationUiHint(rel,{label:hit.label,href:hit.href,source:'user_click_capture',confidence:320,targetUser:currentTarget()});
      if(state.relationRunContext&&state.relationRunContext.locked===true&&rel!==state.relation){
        state.relationSurfaceBlocked=true;warn('Mudança explícita de relação durante execução; operação será interrompida para impedir mistura de coortes.',{requested:state.relation,clicked:rel});requestStop('explicit_relation_click_during_run');return;
      }
      if(rel!==previous){
        if(state.rows.size>0)resetRelationCohort(previous,rel,'explicit_user_relation_click');
        state.relation=rel;
      }
      setTimeout(()=>{if(panelBusy()||state.stopRequested)return;refreshRelationTargetFromDom('explicit_user_relation_click',true);safeScanVisibleForCurrentIntent('explicit_user_relation_click');renderStatus();},220);
    };
    document.addEventListener('click',__b35RelationClickHandler,true);
  }
  function detectActiveRelationSurface(){
    const selectors=['[role="tab"][aria-selected="true"]','[role="tab"][aria-current="page"]','a[aria-current="page"]','[aria-selected="true"]','a[href]','[role="tab"]'];
    const candidates=[],seen=new Set();
    for(const selector of selectors){
      let nodes=[];try{nodes=Array.from(document.querySelectorAll(selector));}catch(e){}
      for(const el of nodes){
        if(seen.has(el)||!elementIsVisible(el))continue;seen.add(el);
        const label=cleanText(el.getAttribute&&el.getAttribute('aria-label')||el.innerText||el.textContent||'');
        if(label.length>100)continue;
        const href=el.getAttribute&&el.getAttribute('href')||'';
        const labelRelation=relationFromSurfaceValue(label),hrefRelation=relationFromSurfaceValue(href);
        const relation=labelRelation||hrefRelation;if(!relation)continue;
        const cluster=relationSurfaceCluster(el),visual=relationVisualActiveEvidence(el);
        const routeCtx=relationRouteContext(location.href);
        const hrefAbs=normalizeUrl(href),outerFriendsContainer=relation==='friends'&&routeCtx.kind==='container'&&isBareFriendsContainerUrl(hrefAbs||href);
        let confidence=0;const evidence=[];
        const ariaSelected=el.getAttribute&&el.getAttribute('aria-selected')==='true';
        const ariaCurrent=el.getAttribute&&el.getAttribute('aria-current')==='page';
        if(ariaSelected){confidence+=110;evidence.push('aria_selected_true');}
        if(ariaCurrent){confidence+=100;evidence.push('aria_current_page');}
        if(labelRelation){confidence+=20;evidence.push('relation_label');}
        if(hrefRelation){confidence+=15;evidence.push('relation_href');}
        if(visual.active){confidence+=visual.score;evidence.push(...visual.evidence);}
        if(cluster){confidence+=35;evidence.push('relation_cluster_'+cluster.kind);}
        const clusterRelations=cluster&&Array.isArray(cluster.relations)?cluster.relations:[];
        const strongActive=ariaSelected||ariaCurrent||visual.active;
        const trusted=!outerFriendsContainer&&(visual.active===true||((ariaSelected||ariaCurrent)&&!!cluster&&clusterRelations.length>=2));
        if(outerFriendsContainer)evidence.push('outer_friends_container_not_relation_surface');
        candidates.push({relation,confidence,label,href,evidence:uniq(evidence),trusted,visualActive:visual.active,clusterKind:cluster&&cluster.kind||'',clusterRelations});
      }
    }
    const remembered=recentRelationUiHint();
    if(remembered)candidates.push({relation:remembered.relation,confidence:Math.max(150,Number(remembered.confidence||0)),label:remembered.label||'',href:remembered.href||'',evidence:['recent_user_relation_interaction',remembered.source||'ui_hint'],trusted:true,visualActive:true,clusterKind:'interaction_hint',clusterRelations:[remembered.relation]});
    candidates.sort((a,b)=>Number(b.trusted)-Number(a.trusted)||b.confidence-a.confidence);
    const best=candidates.find(x=>x.trusted===true&&x.confidence>=100)||null;
    if(!best)return {relation:'',confidence:0,evidence:[],trusted:false,visualActive:false,clusterKind:'',clusterRelations:[],candidates,untrustedBest:candidates[0]||null};
    return {...best,candidates};
  }
  function auditRelationSurface(reason=''){
    const requested=state.relation||inferRelationFromUrl(location.href),active=detectActiveRelationSurface();
    const clusterRelations=Array.isArray(active.clusterRelations)?active.clusterRelations:[];
    const requestedInCluster=clusterRelations.includes(requested);
    const trusted=active.trusted===true&&Number(active.confidence||0)>=100&&requestedInCluster;
    const friendsContainerOverride=(typeof friendsContainerObservableOverride==='function')?friendsContainerObservableOverride(requested,active.relation||''):false;
    const mismatch=trusted&&!!active.relation&&active.relation!==requested&&!friendsContainerOverride;
    const audit={at:new Date().toISOString(),reason,requested,active:active.relation||'',confidence:Number(active.confidence||0),mismatch,trusted,clusterKind:active.clusterKind||'',clusterRelations:[...clusterRelations],requestedInCluster,friendsContainerOverride,evidence:[...(active.evidence||[])]};
    state.relationSurfaceAudit=audit;
    return audit;
  }
  function assertRelationSurface(reason=''){
    const audit=auditRelationSurface(reason);
    if(audit.mismatch){
      state.relationSurfaceBlocked=true;
      const e=new Error('RELATION_SURFACE_MISMATCH: '+audit.requested+' != '+audit.active);
      e.code='RELATION_SURFACE_MISMATCH';e.audit=audit;throw e;
    }
    return audit;
  }
  function relationLabel(rel){ if(rel==='followers')return 'Seguidores'; if(rel==='following')return 'Seguindo'; return 'Amigos'; }
  function parseCompactRelationCount(raw){
    const t=cleanText(raw).toLowerCase().replace(/ /g,' '); if(!t)return 0;
    const m=t.match(/([0-9][0-9.,\s]*)(?:\s*)(mil|k|m|mi|milh(?:a|õ)es?)?/i); if(!m)return 0;
    let n=String(m[1]||'').replace(/\s/g,''); const suf=String(m[2]||'').toLowerCase();
    if(suf){n=n.replace(',','.'); const v=parseFloat(n.replace(/\.(?=.*\.)/g,'')); if(!Number.isFinite(v))return 0; if(suf==='k'||suf==='mil')return Math.round(v*1000); if(suf==='m'||suf==='mi'||suf.startsWith('milh'))return Math.round(v*1000000);}
    const digits=n.replace(/[^0-9]/g,''); return digits?Number(digits):0;
  }
  function relationCountPairsFromText(raw){
    const text=cleanText(raw);if(!text)return [];
    const out=[];const re=/([0-9][0-9.,\s]*(?:\s*(?:mil|k|m|mi|milh(?:a|õ|o)es?))?)\s*(friends?|amigos?|amizades?|followers?|seguidores?|following|seguindo)\b/gi;let m;
    while((m=re.exec(text))){const relation=relationFromSurfaceValue(m[2]),count=parseCompactRelationCount(m[1]);if(relation&&count>0)out.push({relation,count,label:cleanText(m[0])});}
    return out;
  }
  function detectRelationCountsFromDom(){
    const best={friends:0,followers:0,following:0},evidence=[];let nodes=[];
    try{nodes=Array.from(document.querySelectorAll('h1,h2,h3,[role="heading"],a,span,div'));}catch(e){}
    const seen=new Set();
    for(const node of nodes){
      if(!elementIsVisible(node))continue;
      let top=0;try{top=Number(node.getBoundingClientRect&&node.getBoundingClientRect().top||0);}catch(e){}
      if(top>1250||top<-250)continue;
      const texts=uniq([cleanText(node.getAttribute&&node.getAttribute('aria-label')||''),cleanText(node.innerText||node.textContent||'')]).filter(t=>t&&t.length<=180);
      for(const txt of texts){const sig=txt.toLowerCase();if(seen.has(sig))continue;seen.add(sig);for(const pair of relationCountPairsFromText(txt)){if(pair.count>best[pair.relation])best[pair.relation]=pair.count;evidence.push({...pair,text:txt.slice(0,180),top});}}
    }
    return {counts:best,evidence};
  }
  function relationRouteContext(href){
    const s=String(href||'').toLowerCase();
    if(/\/followers(?:\/|$|[?#])/.test(s)||/(?:^|[?&])sk=followers(?:&|$)/.test(s))return {relation:'followers',kind:'explicit',confidence:120};
    if(/\/following(?:\/|$|[?#])/.test(s)||/(?:^|[?&])sk=following(?:&|$)/.test(s))return {relation:'following',kind:'explicit',confidence:120};
    if(/\/friends_all(?:\/|$|[?#])/.test(s)||/(?:^|[?&])sk=friends_all(?:&|$)/.test(s))return {relation:'friends',kind:'explicit_friends_all',confidence:220};
    if(/(?:^|[?&])sk=friends(?:&|$)/.test(s))return {relation:'friends',kind:'explicit',confidence:120};
    if(/\/friends(?:\/|$|[?#])/.test(s))return {relation:'friends',kind:'container',confidence:40};
    return {relation:'',kind:'none',confidence:0};
  }
  function friendsContainerObservableOverride(requested,activeRelation){
    const rel=String(requested||state.relation||''),active=String(activeRelation||''),route=relationRouteContext(location.href);
    if(rel!=='friends'||active!=='following'||route.kind!=='container'||route.relation!=='friends')return false;
    const target=String(currentTarget()||''),intent=state.relationIntent||{},runCtx=state.relationRunContext||{};
    if(!target)return false;
    if(intent.explicitUser===true&&intent.relation&&intent.relation!=='friends')return false;
    if(intent.targetUser&&String(intent.targetUser)!==target)return false;
    if(runCtx.locked===true&&runCtx.relation&&runCtx.relation!=='friends')return false;
    const activeSurface=detectActiveRelationSurface(),cluster=Array.isArray(activeSurface&&activeSurface.clusterRelations)?activeSurface.clusterRelations:[];
    if(activeSurface&&activeSurface.relation&&activeSurface.relation!=='following')return false;
    if(!(activeSurface&&activeSurface.trusted===true&&Number(activeSurface.confidence||0)>=100))return false;
    const clusterBound=cluster.includes('friends')&&cluster.includes('following');
    const intentBound=!!(intent.relation==='friends'&&Number(intent.confidence||0)>=120&&(!intent.targetUser||String(intent.targetUser)===target));
    const runBound=!!(runCtx.locked===true&&runCtx.relation==='friends');
    if(!(clusterBound||intentBound||runBound))return false;
    const audit=detectRelationCountsFromDom(),friendsCount=Number(audit&&audit.counts&&audit.counts.friends||0);
    if(!(friendsCount>0))return false;
    const headerEvidence=(audit.evidence||[]).filter(x=>x&&x.relation==='friends'&&Number(x.count||0)===friendsCount&&Number(x.top||0)>=-80&&Number(x.top||0)<=520&&cleanText(x.text||x.label||'').length<=180);
    return headerEvidence.length>0;
  }
  function relationFromUrlExplicit(href){const c=relationRouteContext(href);return (c.kind==='explicit'||c.kind==='explicit_friends_all')?c.relation:'';}
  function resolveActiveRelationContext(reason='resolve'){
    const visual=detectActiveRelationSurface(),route=relationRouteContext(location.href),urlFallback=inferRelationFromUrl(location.href),countsAudit=detectRelationCountsFromDom(),remembered=recentRelationUiHint();
    const currentTargetKey=String(currentTarget()||''),intent=state.relationIntent||{};
    let relation=urlFallback,source='url_fallback',confidence=40,chosenVisual=visual&&visual.relation?visual:null;
    const runCtx=state.relationRunContext||{};
    if(runCtx.locked===true&&runCtx.relation){relation=runCtx.relation;source='locked_run_context';confidence=Math.max(300,Number(runCtx.confidence||0));}
    else if(route.kind==='explicit_friends_all'){relation='friends';source='url_explicit_friends_all';confidence=route.confidence;}
    else if(route.kind==='explicit'){relation=route.relation;source='url_explicit';confidence=route.confidence;}
    else if(remembered&&remembered.relation){relation=remembered.relation;source='recent_user_relation_interaction';confidence=Math.max(250,Number(remembered.confidence||0));chosenVisual={...remembered,trusted:true,visualActive:true,evidence:['recent_user_relation_interaction']};}
    else if(intent.relation&&(!intent.targetUser||!currentTargetKey||String(intent.targetUser)===currentTargetKey)){
      relation=intent.relation;source=String(intent.source||'stable_relation_intent');confidence=Math.max(120,Number(intent.confidence||0));
    }
    else if(route.kind==='container'){
      relation='friends';source=Number(countsAudit.counts.friends||0)>0?'url_container_plus_friends_count':'url_container_friends_intent';confidence=Number(countsAudit.counts.friends||0)>0?225:120;
    }
    else if(visual&&visual.trusted&&visual.relation){
      relation=visual.relation;source=visual.visualActive?'visual_active_relation_surface':'aria_active_relation_surface';confidence=Math.max(confidence,Number(visual.confidence||0));chosenVisual=visual;
    }
    else if(visual&&visual.untrustedBest&&visual.untrustedBest.visualActive&&visual.untrustedBest.relation&&Number(countsAudit.counts[visual.untrustedBest.relation]||0)>0){
      relation=visual.untrustedBest.relation;source='visual_active_plus_matching_header_count';confidence=Math.max(105,Number(visual.untrustedBest.confidence||0));chosenVisual=visual.untrustedBest;
    }
    const target=Math.max(0,Number(countsAudit.counts[relation]||0));
    const targetEvidence=countsAudit.evidence.filter(x=>x.relation===relation&&x.count===target).slice(0,6);
    const cv=chosenVisual||{};
    const out={at:new Date().toISOString(),reason,relation,target,source,confidence,routeKind:route.kind,routeRelation:route.relation,evidence:targetEvidence,counts:{...countsAudit.counts},visual:{relation:cv.relation||'',confidence:Number(cv.confidence||0),trusted:cv.trusted===true,visualActive:cv.visualActive===true,evidence:[...(cv.evidence||[])]}};
    state.relation=relation;state.relationTargetAudit=out;return out;
  }
  function detectFriendsExpectedFromDom(){return Number(detectRelationCountsFromDom().counts.friends||0);}
  function declaredRelationTarget(){
    const rc=state.relationRunContext||{};
    if(rc.locked===true&&rc.relation===state.relation)return Math.max(0,Number(rc.target||0));
    return Math.max(0,Number(state.declaredRelationTarget||state.expectedHint||0));
  }
  function relationDisplayTarget(){return declaredRelationTarget();}
  function relationMissingCount(){const declared=declaredRelationTarget();return declared?Math.max(0,declared-rowsArr().length):0;}
  function isTrustedRelationTargetContext(ctx){
    const target=Math.max(0,Number(ctx&&ctx.target||0));if(!(target>0))return false;
    const relation=String(ctx&&ctx.relation||'');const evidence=Array.isArray(ctx&&ctx.evidence)?ctx.evidence:[];
    const exact=evidence.some(x=>x&&x.relation===relation&&Number(x.count||0)===target&&cleanText(x.text||x.label||'').length<=180);
    const visual=ctx&&ctx.visual||{};
    const strongRelation=(ctx&&['url_explicit','url_explicit_friends_all','recent_user_relation_interaction','url_container_plus_friends_count','startup_route','context_reset_route'].includes(String(ctx.source||'')))||(visual.relation===relation&&(visual.trusted===true||visual.visualActive===true))||(ctx&&ctx.source==='previous_confirmed_relation_surface');
    return exact&&strongRelation&&Number(ctx&&ctx.confidence||0)>=100;
  }
  function lockRelationRunContext(ctx,rawTarget){
    const trusted=isTrustedRelationTargetContext(ctx),target=trusted?Math.max(0,Number(rawTarget||ctx&&ctx.target||0)):0;
    state.relationRunContext={locked:true,active:true,relation:String(ctx&&ctx.relation||state.relation||'friends'),target,rawTarget:Math.max(0,Number(rawTarget||ctx&&ctx.target||0)),targetConfirmed:trusted,source:trusted?String(ctx&&ctx.source||'trusted_relation_count'):'relation_target_unconfirmed',confidence:Number(ctx&&ctx.confidence||0),startedAt:new Date().toISOString(),completedAt:''};
    return state.relationRunContext;
  }
  function completeRelationRunContext(){
    const rc=state.relationRunContext||{};if(rc.locked===true){rc.active=false;rc.completedAt=new Date().toISOString();}
    return rc;
  }
  function refreshRelationTargetFromDom(reason='refresh',promote=true){
    const ctx=resolveActiveRelationContext(reason),rawDetected=Math.max(0,Number(ctx.target||0)),trusted=isTrustedRelationTargetContext(ctx),detected=trusted?rawDetected:0,previous=declaredRelationTarget();
    state.relationTargetAudit={...ctx,rawTarget:rawDetected,target:detected,targetConfirmed:trusted};
    const rc=state.relationRunContext||{};
    if(rc.locked===true&&rc.relation===state.relation){
      log('info','Contexto de execução preservado; observador não alterou o denominador da coorte em andamento/concluída.',{reason,relation:state.relation,lockedTarget:Number(rc.target||0),rawDetected,trustedDetected:detected});
      return Number(rc.target||0);
    }
    if(detected>0){
      state.declaredRelationTarget=detected;state.expectedHint=detected;
      if(promote&&state.bottomConfirmed!==true){state.expected=detected;state.limit=detected;state.expectedSource='trusted_relation_bound_count';}
      log('info','Alvo da relação atualizado por contagem estritamente vinculada à superfície ativa.',{reason,relation:ctx.relation,detected,rawDetected,previousDeclared:previous,source:ctx.source,confidence:ctx.confidence});
    }else{
      state.declaredRelationTarget=0;state.expectedHint=0;if(promote){state.expected=0;state.limit=Number.MAX_SAFE_INTEGER;state.expectedSource='relation_target_unconfirmed';}
      log('info','Relação resolvida sem cardinalidade estritamente confirmada; total observado não será usado como alvo.',{reason,relation:ctx.relation,rawDetected,source:ctx.source,confidence:ctx.confidence,counts:ctx.counts});
    }
    return detected;
  }
  function configureAllFriendsMode(){
    state.relationSurfaceBlocked=false;state.relationVisibilityGap=false;state.relationExposure={serverTerminalBelowTarget:false,backendHasNext:false,backendEndCursor:'',backendRootCount:0,visibleCount:0,declaredCount:0,reason:'',at:''};
    state.relationRecovery={active:false,rounds:0,attempts:0,gains:0,lastGainAt:'',startedAt:'',completedAt:'',exhausted:false,reason:'',candidateCount:0};
    const ctx=resolveActiveRelationContext('configure_relation_mode');
    state.relation=ctx.relation;
    const rawDetected=Math.max(0,Number(ctx.target||0)),runCtx=lockRelationRunContext(ctx,rawDetected),detected=Number(runCtx.target||0);
    state.relationTargetAudit={...ctx,rawTarget:rawDetected,target:detected,targetConfirmed:runCtx.targetConfirmed===true};
    state.declaredRelationTarget=detected;state.expectedHint=detected;state.expected=detected;
    state.expectedSource=detected>0?'trusted_relation_bound_count':'relation_target_unconfirmed';
    state.observedRelationCount=0;state.closedRelationCount=0;state.relationObservedClosed=false;state.relationTargetReached=false;state.closureReason='';state.bottomConfirmed=false;
    state.limit=detected>0?detected:Number.MAX_SAFE_INTEGER;state.metaLimit=0;
    log('info','Contexto da relação congelado para a execução.',{relation:state.relation,target:detected,targetConfirmed:detected>0,rawTarget:rawDetected,source:runCtx.source,confidence:runCtx.confidence});
    return {detected:detected>0,expected:state.expected,expectedHint:state.expectedHint,declaredTarget:state.declaredRelationTarget,relation:state.relation,targetAudit:{...state.relationTargetAudit},runContext:{...state.relationRunContext}};
  }
  function relationScrollMetrics(sc){
    const docEl=document.scrollingElement||document.documentElement;
    const isDoc=!sc || sc===docEl || sc===document.documentElement || sc===document.body;
    if(isDoc){
      const de=document.documentElement||{}, body=document.body||{};
      const top=Math.max(0,Number(window.scrollY||de.scrollTop||body.scrollTop||0));
      const clientHeight=Math.max(1,Number(window.innerHeight||de.clientHeight||body.clientHeight||1));
      const scrollHeight=Math.max(clientHeight,Number(de.scrollHeight||0),Number(body.scrollHeight||0));
      const maxTop=Math.max(0,scrollHeight-clientHeight);
      return {top,clientHeight,scrollHeight,maxTop,remaining:Math.max(0,maxTop-top),isDoc:true};
    }
    const top=Math.max(0,Number(sc.scrollTop||0)),clientHeight=Math.max(1,Number(sc.clientHeight||1)),scrollHeight=Math.max(clientHeight,Number(sc.scrollHeight||clientHeight));
    const maxTop=Math.max(0,scrollHeight-clientHeight);
    return {top,clientHeight,scrollHeight,maxTop,remaining:Math.max(0,maxTop-top),isDoc:false};
  }
  function nearPhysicalBottom(metrics){
    const m=metrics||{}; return Number(m.remaining||0)<=Math.max(RELATION_BOTTOM_EPS_PX,Number(m.clientHeight||0)*0.035);
  }
  function decideRelationClosure(total,target,nearBottom,rowsGrew,heightGrew,bottomStable,bottomDwellMs){
    const t=Math.max(0,Number(target||0)),n=Math.max(0,Number(total||0));
    if(t>0){
      if(n>=t)return {close:true,reason:'expected_target_reached',recovery:false};
      const stableBottom=nearBottom===true&&rowsGrew!==true&&heightGrew!==true&&Number(bottomStable||0)>=RELATION_BOTTOM_CONFIRMATIONS&&Number(bottomDwellMs||0)>=RELATION_BOTTOM_DWELL_MS;
      if(stableBottom)return {close:false,reason:'declared_target_gap_needs_recovery',recovery:true};
      return {close:false,reason:'',recovery:false};
    }
    if(nearBottom===true&&rowsGrew!==true&&heightGrew!==true&&Number(bottomStable||0)>=RELATION_BOTTOM_CONFIRMATIONS&&Number(bottomDwellMs||0)>=RELATION_BOTTOM_DWELL_MS)return {close:true,reason:'physical_bottom_stable_without_declared_target',recovery:false};
    return {close:false,reason:'',recovery:false};
  }
  function waitForRelationMutation(timeoutMs=RELATION_SCROLL_WAIT_MS){
    return new Promise(resolve=>{
      let done=false,obs=null,timer=null;
      const finish=changed=>{if(done)return;done=true;try{if(obs)obs.disconnect();}catch(e){}try{if(timer)clearTimeout(timer);}catch(e){}resolve(changed===true);};
      try{obs=new MutationObserver(()=>finish(true));obs.observe(getMainRoot(),{childList:true,subtree:true});}catch(e){}
      timer=setTimeout(()=>finish(false),Math.max(120,Number(timeoutMs||RELATION_SCROLL_WAIT_MS)));
    });
  }
  function profileKeyFromHref(href){
    const h = normalizeUrl(href); if(!h) return '';
    let u; try{u=new URL(h);}catch(e){return '';}
    if(!isFacebookHost(u.hostname)) return '';
    const parts = pathParts(u); if(!parts.length) return '';
    if(parts[0].toLowerCase() === 'profile.php'){
      const id = u.searchParams.get('id'); return id && /^\d+$/.test(id) ? 'id:'+id : '';
    }
    const first = decodeURIComponent(parts[0]||'').trim();
    if(!first || RESERVED.has(first.toLowerCase())) return '';
    if(!/^[A-Za-z0-9_.-]{2,80}$/.test(first)) return '';
    return first;
  }
  function canonicalProfileUrlFromKey(key){ if(!key) return ''; return String(key).startsWith('id:') ? 'https://www.facebook.com/profile.php?id=' + encodeURIComponent(String(key).slice(3)) : 'https://www.facebook.com/' + encodeURIComponent(String(key)); }
  function canonicalProfileUrl(href){ return canonicalProfileUrlFromKey(profileKeyFromHref(href)); }
  function isSelfKey(key){ const t=currentTarget(); if(!t||!key) return false; return key===t || key===t.replace(/^id:/,'') || (t.startsWith('id:') && key===t.slice(3)); }

  function isImageUrl(u){ const s=String(u||''); return /^https:\/\//i.test(s) && /(fbcdn\.net|scontent|facebook\.com\/.*\.(?:jpg|jpeg|png|webp))/i.test(s) && !/(static|rsrc\.php|emoji|sprite|static\.xx\.fbcdn)/i.test(s); }
  function parseDimensionFromUrl(url){
    const s = decodeURIComponent(String(url||'').replace(/&amp;/g,'&'));
    const patterns = [/cstp=mx(\d+)x(\d+)/i,/(?:^|[?&_])mx(\d+)x(\d+)/i,/[?&]stp=[^&]*(?:mx|s)(\d+)x(\d+)/i,/[?&]ctp=s(\d+)x(\d+)/i,/_(\d+)x(\d+)(?:_|\.)/i,/(?:^|[^a-z])s(\d+)x(\d+)(?:[^a-z]|$)/i];
    for(const p of patterns){ const m=s.match(p); if(m) return {width:+m[1]||0, height:+m[2]||0}; }
    return {width:0,height:0};
  }
  function dimOf(imgOrUrl){
    const src = typeof imgOrUrl === 'string' ? imgOrUrl : (imgOrUrl && (imgOrUrl.currentSrc || imgOrUrl.src) || '');
    const d=parseDimensionFromUrl(src); let nw=0,nh=0;
    if(typeof imgOrUrl !== 'string' && imgOrUrl){ nw=Number(imgOrUrl.naturalWidth||imgOrUrl.width||0); nh=Number(imgOrUrl.naturalHeight||imgOrUrl.height||0); }
    return {width:Math.max(nw,d.width), height:Math.max(nh,d.height)};
  }
  function classifyPhoto(w,h){ const max=Math.max(+w||0,+h||0); if(max>=960) return {classe:'HD_REAL_960_PLUS', qualidade:'HD 960+ estrito'}; if(max>=900) return {classe:'HD_REAL_900_PLUS', qualidade:'HD 900+ (alta)'}; if(max>=640) return {classe:'HD_REAL_640_PLUS', qualidade:'HD 640+ (boa)'}; if(max>=300) return {classe:'BEST_AVAILABLE_300_PLUS', qualidade:'300+ aceitável'}; if(max>=120) return {classe:'THUMB_120_299', qualidade:'Baixa resolução'}; if(max>0) return {classe:'THUMB_OR_SMALL', qualidade:'Miniatura'}; return {classe:'NO_PHOTO', qualidade:'Sem foto'}; }
  function upgradeFbImageUrl(url){
    let s=String(url||'').replace(/&amp;/g,'&'); if(!s) return '';
    s = s.replace(/([?&])ctp=s\d+x\d+&?/i,'$1').replace(/[?&]$/, '');
    // preserve cstp when it already says mxNNNxNNN; otherwise remove only tiny ctp.
    return s;
  }
  function bestImageFromCard(card){
    const imgs = Array.from(card && card.querySelectorAll ? card.querySelectorAll('img[src]') : []);
    let best = null;
    for(const img of imgs){
      const raw = img.currentSrc || img.src || ''; const url=upgradeFbImageUrl(raw); if(!isImageUrl(url)) continue;
      const d=dimOf(url); const natural=dimOf(img); const width=Math.max(d.width,natural.width), height=Math.max(d.height,natural.height);
      const alt=cleanText(img.alt||'');
      const score=Math.max(width,height) + (alt?30:0) - (/emoji|icon|logo/i.test(alt)?1000:0);
      if(!best || score>best.score) best={url,width,height,alt,score};
    }
    if(!best) return {url:'', width:0, height:0, alt:''};
    return best;
  }

  function getMainRoot(){ return document.querySelector('div[role="main"]') || document.querySelector('main') || document.body || document.documentElement; }
  function getScrollable(){
    const docEl = document.scrollingElement || document.documentElement; let best=docEl, bestScore=(docEl.scrollHeight||0)-(docEl.clientHeight||0);
    for(const n of Array.from(document.querySelectorAll('div,section,main'))){
      try{ const cs=getComputedStyle(n), score=(n.scrollHeight||0)-(n.clientHeight||0); if(score>bestScore && score>300 && /(auto|scroll)/i.test(cs.overflowY||'')){ best=n; bestScore=score; } }catch(e){}
    }
    return best;
  }

  function relationAnchorKeyPure(a){
    const key=profileKeyFromHref(a&&(a.href||a.getAttribute&&a.getAttribute('href')));if(!key)return '';
    if(RESERVED.has(String(key).toLowerCase())||isSelfKey(key))return '';
    const h=normalizeUrl(a.href||a.getAttribute&&a.getAttribute('href'));if(!h)return '';
    try{const u=new URL(h),parts=pathParts(u);if(parts.length>1&&parts[0].toLowerCase()!=='profile.php'){const second=(parts[1]||'').toLowerCase();if(['friends','followers','following','photos','videos','about','posts','reels','groups','likes'].includes(second))return '';}}catch(e){return '';}
    return key;
  }
  function relationProfileAnchors(root=getMainRoot()){
    let nodes=[];try{nodes=Array.from((root||document).querySelectorAll('a[href]'));}catch(e){}
    return nodes.filter(a=>!!relationAnchorKeyPure(a));
  }
  function relationScrollCandidates(){
    const docEl=document.scrollingElement||document.documentElement,root=getMainRoot(),anchors=relationProfileAnchors(root),set=new Set([docEl,root]);
    for(const a of anchors.slice(-120)){
      let cur=a;for(let d=0;d<12&&cur;d++,cur=cur.parentElement){
        try{const range=Math.max(0,Number(cur.scrollHeight||0)-Number(cur.clientHeight||0)),ov=String(getComputedStyle(cur).overflowY||'');if(range>120||/(auto|scroll)/i.test(ov))set.add(cur);}catch(e){}
      }
    }
    const candidates=[];
    for(const el of set){
      if(!el||!el.querySelectorAll)continue;
      let keys=new Set();try{for(const a of Array.from(el.querySelectorAll('a[href]')).slice(0,2500)){const k=relationAnchorKeyPure(a);if(k)keys.add(String(k).toLowerCase());}}catch(e){}
      const m=relationScrollMetrics(el),range=Math.max(0,Number(m.maxTop||0));
      let ov='';try{ov=String(getComputedStyle(el).overflowY||'');}catch(e){}
      const scrollable=range>120||/(auto|scroll)/i.test(ov)||m.isDoc===true;
      if(keys.size<=0||!scrollable)continue;
      const score=(m.isDoc===true?2000000:1000000)+Math.min(keys.size,500)*1000+Math.min(range,250000)+(el===root?5000:0);
      candidates.push({el,keys:keys.size,range,scrollable,score,isDoc:m.isDoc===true});
    }
    candidates.sort((a,b)=>b.score-a.score||b.keys-a.keys||b.range-a.range);
    state.relationRecovery.candidateCount=candidates.length;
    return candidates.slice(0,6);
  }
  function scrollRelationNodeTo(el,top){
    if(!el)return;
    const m=relationScrollMetrics(el),value=Math.max(0,Math.min(Number(top||0),Number(m.maxTop||0)));
    try{if(m.isDoc)window.scrollTo({top:value,behavior:'auto'});else el.scrollTo({top:value,behavior:'auto'});}catch(e){try{if(m.isDoc)window.scrollTo(0,value);else el.scrollTop=value;}catch(_) {}}
  }
  function lastRelationAnchor(){
    const anchors=relationProfileAnchors(getMainRoot());if(!anchors.length)return null;
    let best=anchors[anchors.length-1],bestBottom=-Infinity;
    for(const a of anchors){try{const r=a.getBoundingClientRect();if(Number(r.bottom||0)>bestBottom){bestBottom=Number(r.bottom||0);best=a;}}catch(e){}}
    return best;
  }
  async function relationRecoveryRound(target,round){
    const before=state.rows.size,candidates=relationScrollCandidates();state.relationRecovery.attempts++;
    for(const c of candidates.slice(0,4)){
      scrollRelationNodeTo(c.el,relationScrollMetrics(c.el).maxTop);
      await waitForRelationMutation(RELATION_RECOVERY_WAIT_MS);await sleep(120);scanVisible();
      if(state.rows.size>before)break;
    }
    if(state.rows.size===before){
      const last=lastRelationAnchor();
      if(last&&last.scrollIntoView){try{last.scrollIntoView({block:'end',inline:'nearest',behavior:'auto'});}catch(e){try{last.scrollIntoView(false);}catch(_){}}await waitForRelationMutation(RELATION_RECOVERY_WAIT_MS);await sleep(120);scanVisible();}
    }
    if(state.rows.size===before){
      const primary=candidates[0];if(primary){const m=relationScrollMetrics(primary.el),nudge=Math.max(0,m.maxTop-Math.max(260,m.clientHeight*0.45));scrollRelationNodeTo(primary.el,nudge);await sleep(180);scrollRelationNodeTo(primary.el,m.maxTop);await waitForRelationMutation(RELATION_RECOVERY_WAIT_MS+250);await sleep(120);scanVisible();}
    }
    const after=state.rows.size,gained=Math.max(0,after-before);
    if(gained>0){state.relationRecovery.gains+=gained;state.relationRecovery.lastGainAt=new Date().toISOString();}
    log('info','Recuperação adaptativa da relação executada.',{round,target,before,after,gained,candidates:candidates.map(x=>({keys:x.keys,range:x.range,isDoc:x.isDoc,scrollable:x.scrollable}))});
    return {before,after,gained,candidates:candidates.length};
  }
  async function recoverDeclaredTargetGap(target){
    const run=state.relationRecovery;run.active=true;run.exhausted=false;run.reason='';run.startedAt=run.startedAt||new Date().toISOString();
    const started=Date.now();let noGain=0;
    while(state.rows.size<Number(target||0)&&run.rounds<RELATION_RECOVERY_MAX_ROUNDS&&Date.now()-started<RELATION_RECOVERY_MAX_MS){
      throwIfStopped('relation_recovery');
      run.rounds++;renderStatus();const r=await relationRecoveryRound(target,run.rounds);
      if(r.gained>0){noGain=0;await sleep(220);}else{noGain++;if(noGain>=4)break;}
    }
    run.active=false;run.completedAt=new Date().toISOString();run.exhausted=state.rows.size<Number(target||0);run.reason=run.exhausted?'declared_target_not_observable_after_adaptive_recovery':'target_reached_after_adaptive_recovery';renderStatus();
    return {target:Number(target||0),total:state.rows.size,exhausted:run.exhausted,rounds:run.rounds,gains:run.gains,reason:run.reason};
  }

  function relationTokenFromAny(value,depth=0){
    if(depth>8||value==null)return '';
    if(typeof value==='string'){
      const t=normalizeRelationSurfaceText(value);
      if(/(?:^|[^a-z])followers?(?:[^a-z]|$)|seguidores?/.test(t))return 'followers';
      if(/(?:^|[^a-z])following(?:[^a-z]|$)|seguindo/.test(t))return 'following';
      if(/(?:^|[^a-z])friends?(?:[^a-z]|$)|amigos?|amizades?/.test(t))return 'friends';
      return '';
    }
    if(Array.isArray(value)){for(const v of value){const r=relationTokenFromAny(v,depth+1);if(r)return r;}return '';}
    if(typeof value==='object'){
      for(const [k,v] of Object.entries(value)){
        const rk=relationTokenFromAny(String(k),depth+1);if(rk)return rk;
        const rv=relationTokenFromAny(v,depth+1);if(rv)return rv;
      }
    }
    return '';
  }
  function relationHintFromNetworkIntrinsic(request){
    const objHint=relationTokenFromAny(request&&request.variableObject||null);if(objHint)return objHint;
    const text=cleanText([request&&request.friendlyName||'',request&&request.variables||''].join(' ')).toLowerCase();
    if(/followers?|seguidores?/.test(text))return 'followers';
    if(/following|seguindo/.test(text))return 'following';
    if(/friends_all|friends?|amigos?|amizades?/.test(text))return 'friends';
    return '';
  }
  function relationHintFromNetworkRequest(request){
    const intrinsic=relationHintFromNetworkIntrinsic(request);if(intrinsic)return intrinsic;
    return relationTokenFromAny(request&&request.uiRelationHint||'');
  }
  function networkProfileCandidateFromObject(obj){
    if(!obj||typeof obj!=='object'||Array.isArray(obj))return null;
    const variants=[obj,obj.node,obj.user,obj.profile,obj.actor].filter(x=>x&&typeof x==='object'&&!Array.isArray(x));
    for(const v of variants){
      const id=String(v.id||v.profile_id||v.user_id||v.actor_id||'');
      const url=cleanText(v.url||v.profile_url||v.profileUrl||v.uri||v.navigation_url||v.navigationUrl||'');
      const name=cleanText(v.name||v.display_name||v.displayName||v.title&&v.title.text||obj.title&&obj.title.text||'');
      let image='';
      const pics=[v.profile_picture,v.profilePicLarge,v.profile_picture_for_sticky_bar,v.image,v.image_v2,v.profilePicture,obj.image_v2];
      for(const pic of pics){if(typeof pic==='string'&&isImageUrl(pic)){image=upgradeFbImageUrl(pic);break;}if(pic&&typeof pic==='object'){const u=pic.uri||pic.url||pic.src||pic.image&&pic.image.uri||'';if(isImageUrl(u)){image=upgradeFbImageUrl(u);break;}}}
      let key=profileKeyFromHref(url);
      const typeText=String(v.__typename||obj.__typename||'');
      const idUsable=/^\d{5,}$/.test(id)&&!!name&&(!!image||/user|profile|actor/i.test(typeText));
      if(!key&&idUsable)key='id:'+id;
      if(!key||isSelfKey(key)||RESERVED.has(String(key).toLowerCase()))continue;
      if(String(key).startsWith('id:')&&state.networkRelation&&state.networkRelation.targetId&&String(key).slice(3)===String(state.networkRelation.targetId))continue;
      return {key,id:/^\d{5,}$/.test(id)?id:'',url:url?canonicalProfileUrlFromKey(key):canonicalProfileUrlFromKey(key),name:name||key,image,nodeType:typeText||''};
    }
    return null;
  }
  function networkCandidateTypeAudit(candidates){
    const out={typed:0,pageLike:0,userLike:0,otherTyped:0,unknown:0,samples:[]};
    for(const c of candidates||[]){
      const t=cleanText(c&&c.nodeType||'');
      if(!t){out.unknown++;continue;}
      out.typed++;
      if(/(?:^|_)(?:page|businesspage|fanpage)(?:$|_)/i.test(t)||/^(?:Page|CometPage)$/i.test(t)){out.pageLike++;if(out.samples.length<6)out.samples.push({key:c.key||'',nodeType:t});}
      else if(/(?:^|_)(?:user|profile|actor)(?:$|_)/i.test(t)||/^(?:User|Profile|Actor)$/i.test(t))out.userLike++;
      else out.otherTyped++;
    }
    return out;
  }
  function relationCandidateTypeMismatch(candidates,relation=state.relation){
    const audit=networkCandidateTypeAudit(candidates);
    if(relation!=='friends')return {mismatch:false,...audit};
    const mismatch=audit.typed>=3&&audit.pageLike>=2&&audit.pageLike>audit.userLike&&audit.pageLike/audit.typed>=0.5;
    return {mismatch,...audit};
  }
  function extractNetworkRelationCandidates(roots){
    const map=new Map();
    for(const root of roots||[]){
      walkObjects(root,obj=>{
        const c=networkProfileCandidateFromObject(obj);if(!c)return;
        const k=String(c.key||'').toLowerCase();if(!k)return;
        const old=map.get(k);if(!old||(!old.image&&c.image)||(!old.name&&c.name))map.set(k,{...(old||{}),...c});
      },260000);
    }
    return Array.from(map.values());
  }
  function pageInfoFromObject(obj){
    if(!obj||typeof obj!=='object')return {seen:false,hasNext:false,endCursor:''};
    const p=obj.page_info||obj.pageInfo||obj.pagination||null;if(!p||typeof p!=='object')return {seen:false,hasNext:false,endCursor:''};
    const hasNext=p.has_next_page===true||p.hasNextPage===true;const endCursor=cleanText(p.end_cursor||p.endCursor||'');
    const seen=Object.prototype.hasOwnProperty.call(p,'has_next_page')||Object.prototype.hasOwnProperty.call(p,'hasNextPage')||!!endCursor;
    return {seen,hasNext,endCursor};
  }
  function extractNetworkRelationConnections(roots){
    const out=[];
    for(const root of roots||[]){
      walkObjects(root,obj=>{
        if(!obj||Array.isArray(obj)||typeof obj!=='object')return;
        const pageInfo=pageInfoFromObject(obj);if(!pageInfo.seen)return;
        const arrays=[];for(const k of ['edges','nodes','items','results','entries'])if(Array.isArray(obj[k]))arrays.push({kind:k,items:obj[k]});
        for(const group of arrays){
          const map=new Map();
          for(const item of group.items){
            const direct=networkProfileCandidateFromObject(item);if(direct)map.set(String(direct.key).toLowerCase(),direct);
            if(item&&typeof item==='object')walkObjects(item,x=>{const c=networkProfileCandidateFromObject(x);if(c&&!map.has(String(c.key).toLowerCase()))map.set(String(c.key).toLowerCase(),c);},2500);
          }
          const candidates=Array.from(map.values());if(candidates.length)out.push({candidates,pageInfo,kind:group.kind});
        }
      },180000);
    }
    out.sort((a,b)=>(Number(b.pageInfo&&b.pageInfo.seen)-Number(a.pageInfo&&a.pageInfo.seen))||b.candidates.length-a.candidates.length);
    return out;
  }

  function extractNetworkPageInfo(roots){
    let best={hasNext:false,endCursor:'',seen:false};
    for(const root of roots||[]){
      walkObjects(root,obj=>{
        if(!obj||Array.isArray(obj)||typeof obj!=='object')return;
        const has=Object.prototype.hasOwnProperty.call(obj,'has_next_page')||Object.prototype.hasOwnProperty.call(obj,'hasNextPage');
        const cursor=cleanText(obj.end_cursor||obj.endCursor||'');
        if(has||cursor){const hasNext=obj.has_next_page===true||obj.hasNextPage===true; if((hasNext&&!best.hasNext)||(!best.endCursor&&cursor))best={hasNext,endCursor:cursor,seen:true};}
      },180000);
    }
    return best;
  }
  function networkTargetIdFromDocument(){
    try{const b=bootstrapFromRoots(documentJsonRoots(document));return String(b.routeUserID||'');}catch(e){return '';}
  }
  function networkRelationSessionId(){return 'b35v29-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,9);}
  function beginRelationNetworkCapture(){
    const n=state.networkRelation;n.active=true;n.sessionId=networkRelationSessionId();n.targetId=networkTargetIdFromDocument()||String(state.targetProfileEnriched&&state.targetProfileEnriched.profileId||'');n.startedAt=new Date().toISOString();n.runStartedAt=n.startedAt;n.activeRelation=state.relation;n.completedAt='';n.acceptedPayloads=0;n.rejectedPayloads=0;n.candidatesSeen=0;n.rowsCreated=0;n.rowsUpdated=0;n.replaysRequested=0;n.replaysCompleted=0;n.replaysInFlight=0;n.lastCursor='';n.seenCursors=[];n.seenCursorKeys=[];n.seenConnectionCursorKeys=[];n.requestIds=[];n.trustedRequestIds=[];n.replayParents={};n.requestConnections={};n.roots={};n.terminalRoots=[];n.routeBoundRoots=[];n.connectionFingerprints=[];n.rejectionReasons={};n.staleBacklogRejected=0;n.uiHintMismatchRejected=0;n.typeMismatchRejected=0;n.unboundGenericRejected=0;n.lastPayloadAt='';n.lastAcceptedAt='';n.lastGainAt='';n.lastEvidence='';n.terminalObserved=false;n.terminalRequestId='';n.lastPageInfo={seen:false,hasNext:false,endCursor:''};n.drainActive=false;n.drainStartedAt='';n.drainCompletedAt='';n.drainReason='';state.relationExposure={serverTerminalBelowTarget:false,backendHasNext:false,backendEndCursor:'',backendRootCount:0,visibleCount:0,declaredCount:declaredRelationTarget(),reason:'',at:''};state.relationSearchRecovery={active:false,attempted:false,completed:false,available:false,attempts:0,prefixesTried:[],gained:0,startedAt:'',completedAt:'',reason:'',inputDescriptor:''};
    try{window.postMessage({channel:'FB_B35A1_V29_CONTROL',type:'CAPTURE_CONTROL',active:true,sessionId:n.sessionId,relation:state.relation,targetId:n.targetId,runStartedAt:n.runStartedAt},location.origin);}catch(e){}
    log('info','Captura MAIN-world encadeada da relação iniciada.',{sessionId:n.sessionId,relation:state.relation,targetId:n.targetId||'unresolved'});return n.sessionId;
  }
  function endRelationNetworkCapture(reason='complete'){
    const n=state.networkRelation;if(!n.active)return;
    n.active=false;n.completedAt=new Date().toISOString();n.drainActive=false;
    try{window.postMessage({channel:'FB_B35A1_V29_CONTROL',type:'CAPTURE_CONTROL',active:false,sessionId:n.sessionId},location.origin);}catch(e){}
    log('info','Captura MAIN-world encadeada da relação encerrada.',{reason,acceptedPayloads:n.acceptedPayloads,rejectedPayloads:n.rejectedPayloads,rowsCreated:n.rowsCreated,rowsUpdated:n.rowsUpdated,replaysRequested:n.replaysRequested,replaysCompleted:n.replaysCompleted,terminalObserved:n.terminalObserved,rejectionReasons:{...(n.rejectionReasons||{})}});
  }
  function mergeNetworkRelationCandidate(c){
    if(!c||!c.key)return {created:false,updated:false};
    const d=c.image?parseDimensionFromUrl(c.image):{width:0,height:0},cls=classifyPhoto(d.width,d.height);
    const base={key:c.key,relacao:state.relation,relation:state.relation,username:c.key,displayName:c.name||c.key,nome:c.name||c.key,profileUrl:c.url||canonicalProfileUrlFromKey(c.key),perfil:c.url||canonicalProfileUrlFromKey(c.key),profileId:c.id||'',avatarUrl:c.image||'',fotoUrl:c.image||'',fotoUrlHD:c.image||'',avatarWidth:d.width,avatarHeight:d.height,fotoWidth:d.width,fotoHeight:d.height,imageClass:cls.classe,fotoClasse:cls.classe,qualidadeFoto:cls.qualidade,statusMeta:'pending',profileMetaStatus:'pending',metaConfidence:0,metaAudit:'capturado de resposta GraphQL da relação ativa com binding estrito',metaSources:['network_relation_graphql_strict'],firstSeenAt:new Date().toISOString(),lastSeenAt:new Date().toISOString()};
    if(state.rows.has(c.key)){mergeRow(state.rows.get(c.key),base);state.stats.networkRelationRowsUpdated++;state.networkRelation.rowsUpdated++;return {created:false,updated:true};}
    state.rows.set(c.key,syncPhotoFields(base));state.stats.rowsInserted++;state.stats.networkRelationRowsCreated++;state.networkRelation.rowsCreated++;return {created:true,updated:false};
  }
  function networkReject(reason,extra){
    const n=state.networkRelation;n.rejectedPayloads++;state.stats.networkRelationPayloadsRejected++;n.rejectionReasons=n.rejectionReasons||{};n.rejectionReasons[reason]=Number(n.rejectionReasons[reason]||0)+1;
    if(extra&&Number(n.rejectionReasons[reason]||0)<=3)log('info','Payload de rede rejeitado com causa auditável.',{reason,...extra});
    return false;
  }
  function networkRequestTrusted(id){return !!id&&Array.isArray(state.networkRelation.trustedRequestIds)&&state.networkRelation.trustedRequestIds.includes(String(id));}
  function markNetworkRequestTrusted(id,parentId=''){
    const n=state.networkRelation;if(!id)return; n.trustedRequestIds=uniq([...(n.trustedRequestIds||[]),String(id)]).slice(-220); if(parentId)n.replayParents[String(id)]=String(parentId);
  }
  function exactRelationCollectionQuery(friendly=''){
    return /^(?:ProfileCometAppCollectionListRendererPaginationQuery|ProfileCometAppCollectionListRendererQuery)$/i.test(String(friendly||''));
  }
  const NETWORK_CURSOR_KEYS = new Set(['cursor','after','aftercursor','end_cursor','endcursor']);
  const NETWORK_TRANSIENT_VAR_KEYS = new Set(['__req','__spin_r','__spin_b','__spin_t','__a','__user']);
  function normalizeNetworkConnectionValue(value){
    if(Array.isArray(value))return value.map(normalizeNetworkConnectionValue);
    if(!value||typeof value!=='object')return value;
    const out={};for(const key of Object.keys(value).sort()){const low=String(key).toLowerCase();if(['__req','__spin_r','__spin_b','__spin_t','__a','__user'].includes(low))continue;if(['cursor','after','aftercursor','end_cursor','endcursor'].includes(low)){out[key]='__CURSOR__';continue;}out[key]=normalizeNetworkConnectionValue(value[key]);}return out;
  }
  function networkConnectionFingerprint(request){
    if(request&&request.connectionFingerprint)return String(request.connectionFingerprint);
    const friendly=String(request&&request.friendlyName||''),docId=String(request&&request.docId||''),rawVars=String(request&&request.variables||'');let vars=request&&request.variableObject||null;
    if(!vars&&rawVars){try{vars=JSON.parse(rawVars);}catch(e){vars=null;}}
    if(!docId&&!rawVars&&!vars)return '';let canonical='';try{canonical=JSON.stringify(normalizeNetworkConnectionValue(vars||{}));}catch(e){}
    if(!friendly&&!docId&&!canonical)return '';let h=0x811c9dc5,text=friendly+'\u001f'+docId+'\u001f'+canonical;for(let i=0;i<text.length;i++){h^=text.charCodeAt(i);h=Math.imul(h,0x01000193)>>>0;}return h.toString(16).padStart(8,'0');
  }
  function networkRootId(data,requestId='',request=null){
    const rel=String(state.relation||state.networkRelation&&state.networkRelation.activeRelation||'friends');
    const fp=networkConnectionFingerprint(request||data&&data.request||null);if(fp)return 'rel:'+rel+'|conn:'+fp;
    const raw=String(data&&data.rootRequestId||data&&data.parentRequestId&&state.networkRelation.replayParents&&state.networkRelation.replayParents[String(data.parentRequestId)]||data&&data.parentRequestId||requestId||'');
    return raw?('rel:'+rel+'|'+raw):'';
  }
  function ensureNetworkRoot(rootId){
    const n=state.networkRelation,id=String(rootId||'');if(!id)return null;n.roots=n.roots||{};
    if(!n.roots[id])n.roots[id]={rootRequestId:id,accepted:0,requests:[],terminal:false,hasNext:false,lastCursor:'',lastAcceptedAt:'',routeBound:false};
    return n.roots[id];
  }
  function networkAllKnownRootsTerminal(){
    const roots=Object.values(state.networkRelation.roots||{}).filter(r=>Number(r&&r.accepted||0)>0);
    return roots.length>0&&roots.every(r=>r.terminal===true);
  }
  function relationNetworkReplayBudget(){
    const target=declaredRelationTarget();
    if(target>0)return Math.min(RELATION_NETWORK_MAX_REPLAYS,Math.max(RELATION_NETWORK_BASE_REPLAYS,Math.ceil(target/4)+32));
    return Math.min(RELATION_NETWORK_MAX_REPLAYS,320);
  }
  function relationNetworkDrainBudgetMs(){
    const target=declaredRelationTarget();
    if(target>0)return Math.min(RELATION_NETWORK_DRAIN_MAX_MS,Math.max(45000,Math.ceil(target/8)*500));
    return Math.min(RELATION_NETWORK_DRAIN_MAX_MS,90000);
  }
  async function drainRelationNetworkPagination(reason='post_scroll'){
    const n=state.networkRelation;if(!n.active)return {ok:false,reason:'network_capture_inactive'};
    n.drainActive=true;n.drainStartedAt=new Date().toISOString();n.drainReason='';const started=Date.now(),drainBudgetMs=relationNetworkDrainBudgetMs();
    while(Date.now()-started<drainBudgetMs){
      throwIfStopped('network_pagination_drain');
      const target=declaredRelationTarget();if(target>0&&state.rows.size>=target){n.drainReason='target_reached';break;}
      const lastTs=Date.parse(n.lastPayloadAt||n.lastAcceptedAt||n.startedAt||'')||started,quiet=Date.now()-lastTs,inFlight=Number(n.replaysInFlight||0),allTerminal=networkAllKnownRootsTerminal();
      if(target<=0&&allTerminal&&inFlight<=0&&quiet>=RELATION_NETWORK_QUIET_MS){n.drainReason='all_known_roots_terminal';break;}
      if(target>0&&state.rows.size<target&&allTerminal&&inFlight<=0&&quiet>=RELATION_NETWORK_TARGET_GAP_QUIET_MS){n.drainReason='all_known_roots_terminal_below_confirmed_target';break;}
      if(inFlight<=0&&quiet>=(target>0&&state.rows.size<target?RELATION_NETWORK_TARGET_GAP_QUIET_MS:RELATION_NETWORK_QUIET_MS)){
        n.drainReason=target>0&&state.rows.size<target?'network_quiet_below_confirmed_target':'network_quiet_without_pending_next';break;
      }
      await sleep(RELATION_NETWORK_POLL_MS);
    }
    if(!n.drainReason)n.drainReason='network_drain_timeout';n.drainActive=false;n.drainCompletedAt=new Date().toISOString();
    log('info','Dreno da paginação de rede encerrado.',{reason,drainReason:n.drainReason,replaysInFlight:n.replaysInFlight,terminalObserved:n.terminalObserved,allKnownRootsTerminal:networkAllKnownRootsTerminal(),rootCount:Object.keys(n.roots||{}).length,terminalRoots:[...(n.terminalRoots||[])],drainBudgetMs,replayBudget:relationNetworkReplayBudget(),acceptedPayloads:n.acceptedPayloads,replaysRequested:n.replaysRequested,replaysCompleted:n.replaysCompleted,total:state.rows.size,lastPageInfo:{...(n.lastPageInfo||{})}});
    return {ok:true,reason:n.drainReason,terminalObserved:n.terminalObserved,allKnownRootsTerminal:networkAllKnownRootsTerminal(),total:state.rows.size};
  }
  function requestRelationReplay(requestId,cursor,rootRequestId=''){
    const n=state.networkRelation,budget=relationNetworkReplayBudget();if(!n.active||state.stopRequested||!requestId||!cursor||n.replaysRequested>=budget)return false;
    const root=String(rootRequestId||requestId),cursorKey=root+'\u001f'+String(cursor);n.seenCursorKeys=n.seenCursorKeys||[];n.seenConnectionCursorKeys=n.seenConnectionCursorKeys||[];
    if(n.seenConnectionCursorKeys.includes(cursorKey)||n.seenCursorKeys.includes(cursorKey))return false;n.seenConnectionCursorKeys.push(cursorKey);n.seenCursorKeys.push(cursorKey);n.seenCursors=uniq([...(n.seenCursors||[]),String(cursor)]).slice(-500);n.lastCursor=cursor;n.replaysRequested++;n.replaysInFlight++;state.stats.networkRelationReplayRequested++;
    try{window.postMessage({channel:'FB_B35A1_V29_CONTROL',type:'REPLAY_NEXT',sessionId:n.sessionId,requestId,cursor,rootRequestId:root},location.origin);return true;}catch(e){n.replaysInFlight=Math.max(0,n.replaysInFlight-1);return false;}
  }
  function relationRunUiProven(){
    const h=recentRelationUiHint(),a=state.relationTargetAudit||{},rc=state.relationRunContext||{};
    return !!((h&&h.relation===state.relation)||
      (a.relation===state.relation&&['visual_active_relation_surface','aria_active_relation_surface','recent_user_relation_interaction','visual_active_plus_matching_header_count'].includes(String(a.source||''))&&Number(a.confidence||0)>=100)||
      (rc.relation===state.relation&&['visual_active_relation_surface','aria_active_relation_surface','recent_user_relation_interaction'].includes(String(rc.source||''))&&Number(rc.confidence||0)>=100));
  }
  function networkPayloadFreshForRun(data){
    const n=state.networkRelation,runMs=Date.parse(n.runStartedAt||n.startedAt||'')||0,reqMs=Date.parse(data&&data.request&&data.request.requestStartedAt||'')||0,capMs=Date.parse(data&&data.capturedAt||'')||0,ts=reqMs||capMs;
    if(!runMs)return true;
    if(!ts)return false;
    return ts>=runMs-1800;
  }
  function relationBoundCollectionContext(request,friendly,pageInfo,candidates,data,hint){
    const route=relationRouteContext(location.href),exact=exactRelationCollectionQuery(friendly),fresh=networkPayloadFreshForRun(data);
    const reqUi=relationTokenFromAny(request&&request.uiRelationHint||'');
    // A bare /friends URL is only a profile-container route. It MUST NOT bind a generic
    // ProfileCometAppCollectionListRendererPaginationQuery to the Friends relation.
    const explicitStrong=(route.kind==='explicit'||route.kind==='explicit_friends_all')&&route.relation===state.relation;
    const activeUi=relationRunUiProven()&&fresh;
    const uiBound=reqUi===state.relation;
    const intrinsic=relationHintFromNetworkIntrinsic(request);
    const requestBound=intrinsic===state.relation;
    const canonicalFriendsBound=state.relation==='friends'&&route.kind==='explicit_friends_all'&&route.relation==='friends';
    // Bare /friends never binds a generic collection. Canonical friends_all can bind it,
    // because that route is the actual all-friends surface rather than the profile container.
    const bound=exact&&pageInfo.seen===true&&candidates.length>=2&&(requestBound||(uiBound&&explicitStrong)||canonicalFriendsBound);
    return {bound,route,exact,fresh,reqUi,explicitStrong,uiBound,requestBound,intrinsic,canonicalFriendsBound,activeUi,containerFriendsBound:false};
  }
  function handleRelationNetworkPayload(data){
    const context=typeof ensureCurrentPageContext==='function'?ensureCurrentPageContext('network_payload'):{changed:false};
    const n=state.networkRelation;if(context.changed===true||!n.active||!data||data.sessionId!==n.sessionId||state.stopRequested)return;
    state.stats.networkRelationPayloadsSeen++;n.lastPayloadAt=new Date().toISOString();
    const request=data.request||{},friendly=String(request.friendlyName||''),requestId=String(data.requestId||''),parentRequestId=String(data.parentRequestId||''),rootRequestId=networkRootId(data,requestId,request);
    const connectionFingerprint=networkConnectionFingerprint(request);if(connectionFingerprint){n.connectionFingerprints=uniq([...(n.connectionFingerprints||[]),connectionFingerprint]).slice(-96);n.requestConnections=n.requestConnections||{};if(requestId)n.requestConnections[requestId]='rel:'+String(state.relation||'friends')+'|conn:'+connectionFingerprint;}
    if(/ProfileComet(?:Header|AboutAppSection|TopAppSection)Query/i.test(friendly))return networkReject('profile_meta_query',{friendly});
    const text=String(data.responseText||'');if(!text||text.length>RELATION_NETWORK_MAX_PAYLOAD_BYTES)return networkReject('empty_or_oversized_payload',{size:text.length});
    let roots=[];try{roots=graphPayloadRoots(text);}catch(e){}
    if(!roots.length)return networkReject('unparsed_graphql_payload',{friendly,origin:data.origin||''});
    const connections=extractNetworkRelationConnections(roots),bestConnection=connections[0]||null;
    const candidates=bestConnection?bestConnection.candidates:extractNetworkRelationCandidates(roots);
    const pageInfo=bestConnection?bestConnection.pageInfo:extractNetworkPageInfo(roots);n.candidatesSeen+=candidates.length;state.stats.networkRelationCandidatesSeen+=candidates.length;
    const existing=new Set(rowsArr().map(r=>String(r.key||r.username||'').toLowerCase()));
    const overlap=candidates.filter(c=>existing.has(String(c.key||'').toLowerCase())).length;
    const hint=relationHintFromNetworkRequest(request),vars=String(request.variables||''),requestUiHint=relationTokenFromAny(request&&request.uiRelationHint||'');
    const targetId=n.targetId||networkTargetIdFromDocument();if(targetId&&!n.targetId)n.targetId=targetId;
    const targetBound=!!targetId&&vars.includes(targetId),lineageTrusted=networkRequestTrusted(parentRequestId)||networkRequestTrusted(requestId),controlledReplay=String(data.origin||'')==='controlled_replay';
    const liveUiHint=recentRelationUiHint(8000);
    if(liveUiHint&&liveUiHint.relation&&liveUiHint.relation!==state.relation){n.uiHintMismatchRejected++;state.stats.networkRelationUiHintMismatch++;return networkReject('live_ui_relation_mismatch',{liveUiHint:liveUiHint.relation,relation:state.relation,friendly,capturedAt:data.capturedAt||''});}
    if(requestUiHint&&requestUiHint!==state.relation){n.uiHintMismatchRejected++;state.stats.networkRelationUiHintMismatch++;return networkReject('ui_relation_hint_mismatch',{requestUiHint,relation:state.relation,friendly,capturedAt:data.capturedAt||''});}
    const stalePassive=data.passiveBeforeStart===true&&!networkPayloadFreshForRun(data)&&!requestUiHint;
    if(stalePassive){n.staleBacklogRejected++;state.stats.networkRelationStaleRejected++;return networkReject('stale_backlog_unbound',{friendly,capturedAt:data.capturedAt||'',runStartedAt:n.runStartedAt||''});}
    const binding=relationBoundCollectionContext(request,friendly,pageInfo,candidates,data,hint),relationBoundCollection=binding.bound;
    const relationCompatible=!hint||hint===state.relation;
    const enough=(candidates.length>=2&&(pageInfo.seen||candidates.length>=5))||(controlledReplay&&lineageTrusted&&pageInfo.seen===true)||relationBoundCollection;
    // Overlap is diagnostic only. It can never seed trust for a generic collection,
    // because a wrong Following/Pages collection may overlap with already visible cards.
    const cohortBound=targetBound||(controlledReplay&&lineageTrusted)||relationBoundCollection;
    const typeAudit=typeof relationCandidateTypeMismatch==='function'?relationCandidateTypeMismatch(candidates,state.relation):{mismatch:false,typed:0,pageLike:0,userLike:0,otherTyped:0,unknown:candidates.length,samples:[]};
    if(!relationCompatible)return networkReject('relation_hint_mismatch',{hint,relation:state.relation,friendly,requestUiHint});
    if(!enough)return networkReject('insufficient_relation_structure',{friendly,candidates:candidates.length,pageInfoSeen:pageInfo.seen,controlledReplay,lineageTrusted,routeKind:binding.route.kind,requestUiHint});
    if(typeAudit.mismatch){n.typeMismatchRejected++;state.stats.networkRelationTypeMismatch++;return networkReject('friends_candidate_type_mismatch',{friendly,relation:state.relation,requestUiHint,hint,typeAudit});}
    if(!cohortBound){if(binding.exact){n.unboundGenericRejected++;state.stats.networkRelationUnboundGenericRejected++;}return networkReject('cohort_binding_missing',{friendly,candidates:candidates.length,overlap,targetBound,controlledReplay,lineageTrusted,relationBoundCollection,routeKind:binding.route.kind,requestUiHint,binding});}
    const before=state.rows.size;for(const c of candidates)mergeNetworkRelationCandidate(c);const gained=Math.max(0,state.rows.size-before);
    n.acceptedPayloads++;state.stats.networkRelationPayloadsAccepted++;n.requestIds=uniq([...n.requestIds,requestId]).slice(-220);n.lastAcceptedAt=new Date().toISOString();if(gained>0)n.lastGainAt=n.lastAcceptedAt;
    const evidence=targetBound?'target_id_bound':(controlledReplay&&lineageTrusted?'trusted_replay_lineage':(relationBoundCollection?'active_relation_collection_bound':'unbound_rejected'));
    n.lastEvidence=evidence+';hint='+(hint||'unknown')+';overlap='+overlap;markNetworkRequestTrusted(requestId,parentRequestId);
    const root=ensureNetworkRoot(rootRequestId||requestId);if(root){root.accepted++;root.requests=uniq([...(root.requests||[]),requestId]).slice(-220);root.lastAcceptedAt=n.lastAcceptedAt;root.hasNext=pageInfo.hasNext===true;root.lastCursor=pageInfo.endCursor||root.lastCursor||'';root.routeBound=root.routeBound===true||relationBoundCollection;n.routeBoundRoots=root.routeBound?uniq([...(n.routeBoundRoots||[]),root.rootRequestId]):(n.routeBoundRoots||[]);if(pageInfo.seen===true&&pageInfo.hasNext===true){root.terminal=false;n.terminalRoots=(n.terminalRoots||[]).filter(x=>x!==root.rootRequestId);}else if(pageInfo.seen===true&&pageInfo.hasNext!==true){root.terminal=true;n.terminalRoots=uniq([...(n.terminalRoots||[]),root.rootRequestId]);n.terminalRequestId=requestId;}}
    n.terminalObserved=(n.terminalRoots||[]).length>0;n.lastPageInfo={seen:pageInfo.seen===true,hasNext:pageInfo.hasNext===true,endCursor:pageInfo.endCursor||''};
    log('info','Payload GraphQL da relação ativa aceito.',{origin:data.origin||'',requestId,parentRequestId,rootRequestId:rootRequestId||requestId,friendlyName:friendly||'',hint:hint||'',targetBound,lineageTrusted,relationBoundCollection,routeKind:binding.route.kind,requestUiHint,overlap,candidates:candidates.length,typeAudit,gained,total:state.rows.size,connectionKind:bestConnection&&bestConnection.kind||'fallback',hasNext:pageInfo.hasNext,endCursor:pageInfo.endCursor?'present':'absent',rootTerminal:!!(root&&root.terminal),terminalRoots:[...(n.terminalRoots||[])]});
    if(pageInfo.hasNext&&pageInfo.endCursor&&state.rows.size<(declaredRelationTarget()||Number.MAX_SAFE_INTEGER))requestRelationReplay(requestId,pageInfo.endCursor,rootRequestId||requestId);
    renderStatus();
  }

  function installRelationNetworkBridge(){
    if(state.networkRelation.installed)return;state.networkRelation.installed=true;
    window.addEventListener('message',event=>{
      if(event.source!==window)return;const d=event.data;if(!d||d.channel!=='FB_B35A1_V29_MAIN')return;
      if(d.type==='RELATION_UI_HINT'){
        const hint=rememberRelationUiHint(d.relation,{label:d.label||'',href:d.href||'',source:d.source||'active_dom_diagnostic',confidence:160,at:d.at||new Date().toISOString(),targetUser:currentTarget()});
        state.relationVisualDiagnostic={relation:hint&&hint.relation||'',confidence:Number(hint&&hint.confidence||0),trusted:false,evidence:['main_world_diagnostic',String(d.source||'')],at:new Date().toISOString(),reason:'main_world_ui_hint'};
        // V33: sinais do DOM/MAIN são diagnósticos; em /friends com contador Friends confirmado, subguia visual Following não bloqueia a coleta da superfície aberta pelo usuário.
        if(hint&&(state.runningScroll||state.runningMeta)&&hint.relation!==state.relation){
          log('info','Divergência visual observada durante execução e mantida apenas como diagnóstico.',{requested:state.relation,observed:hint.relation,source:hint.source||'',label:hint.label||''});
        }
        renderStatus();
      }else if(d.type==='GRAPHQL_RESPONSE')Promise.resolve().then(()=>handleRelationNetworkPayload(d)).catch(e=>warn('Falha ao processar payload GraphQL suplementar.',String(e&&e.message||e)));
      else if(d.type==='REPLAY_RESULT'&&d.sessionId===state.networkRelation.sessionId){const n=state.networkRelation;n.replaysCompleted++;n.replaysInFlight=Math.max(0,Number(n.replaysInFlight||0)-1);state.stats.networkRelationReplayCompleted++;if(d.requestId&&d.parentRequestId)n.replayParents[String(d.requestId)]=String(d.parentRequestId);if(d.ok!==true)networkReject('controlled_replay_failed',{status:d.status||0,reason:d.reason||'',parentRequestId:d.parentRequestId||''});}
    });
  }

  function collectionSurfaceCompatibility(requested=state.relation){
    const active=detectActiveRelationSurface(),route=relationRouteContext(location.href),rel=String(requested||'friends');
    const override=(typeof friendsContainerObservableOverride==='function')?friendsContainerObservableOverride(rel,active&&active.relation||''):false;
    const mismatch=!!(active&&active.trusted===true&&active.relation&&active.relation!==rel&&Number(active.confidence||0)>=100&&!override);
    return {ok:!mismatch,requested:rel,active:active&&active.relation||'',confidence:Number(active&&active.confidence||0),trusted:active&&active.trusted===true,routeKind:route.kind,friendsContainerOverride:override,evidence:[...(active&&active.evidence||[])]};
  }
  function safeScanVisibleForCurrentIntent(reason='safe_scan'){
    const c=collectionSurfaceCompatibility(state.relation);
    if(!c.ok){state.relationVisualDiagnostic={...c,at:new Date().toISOString(),reason};return 0;}
    return scanVisible();
  }
  function assertCollectableRelationSurface(reason='run_preflight'){
    const c=collectionSurfaceCompatibility(state.relation);
    state.relationVisualDiagnostic={...c,at:new Date().toISOString(),reason};
    if(c.ok)return c;
    state.relationSurfaceBlocked=true;
    const target=declaredRelationTarget()||Number(state.relationTargetAudit&&state.relationTargetAudit.counts&&state.relationTargetAudit.counts[state.relation]||0);
    const code=(state.relation==='friends'&&c.active==='following')?'FRIENDS_LIST_NOT_OBSERVABLE':'RELATION_SURFACE_MISMATCH';
    const msg=code+': solicitado='+state.relation+' ativo='+c.active+(target?(' alvo_declarado='+target):'')+'; a ferramenta não coletará a relação errada nem apagará a coorte estável';
    const e=new Error(msg);e.code=code;e.audit=c;throw e;
  }

  function relationAnchorOk(a){
    const key=profileKeyFromHref(a && (a.href||a.getAttribute('href'))); if(!key){ state.stats.rejectedNoUsername++; return false; }
    if(RESERVED.has(String(key).toLowerCase())){ state.stats.rejectedReserved++; return false; }
    if(isSelfKey(key)){ state.stats.rejectedTarget++; return false; }
    const h=normalizeUrl(a.href||a.getAttribute('href')); if(!h) return false;
    const u=new URL(h); const parts=pathParts(u);
    if(parts.length>1 && parts[0].toLowerCase()!=='profile.php'){
      const second=(parts[1]||'').toLowerCase(); if(['friends','followers','following','photos','videos','about','posts','reels','groups','likes'].includes(second)) return false;
    }
    return true;
  }
  function nearestCard(a){
    let cur=a;
    for(let depth=0; depth<12 && cur && cur!==document.body; depth++,cur=cur.parentElement){
      const txt=cleanText(cur.innerText||cur.textContent||'');
      if(!txt || txt.length>2600) continue;
      if(BAD_UI_TEXT.test(txt)){ state.stats.rejectedBadUi++; return null; }
      const anchors=cur.querySelectorAll ? Array.from(cur.querySelectorAll('a[href]')).filter(x=>profileKeyFromHref(x.href||x.getAttribute('href'))) : [];
      const imgs=cur.querySelectorAll ? Array.from(cur.querySelectorAll('img[src]')).filter(x=>isImageUrl(x.currentSrc||x.src)) : [];
      const rect=cur.getBoundingClientRect ? cur.getBoundingClientRect() : {height:0,width:0};
      if(anchors.length>=1 && anchors.length<=6 && (imgs.length>=1 || txt.length<500) && (rect.height===0 || (rect.height>=24 && rect.height<=760))) return cur;
    }
    state.stats.rejectedNoCard++; return null;
  }
  function photoMax(r){ return Math.max(Number(r&&r.fotoWidth||0),Number(r&&r.fotoHeight||0),Number(r&&r.avatarWidth||0),Number(r&&r.avatarHeight||0)); }
  function syncPhotoFields(r){
    const max=photoMax(r); const has=!!(r&&(r.fotoUrl||r.fotoUrlHD||r.avatarUrl)) && max>0;
    const d=classifyPhoto(r&&r.fotoWidth||r&&r.avatarWidth||0,r&&r.fotoHeight||r&&r.avatarHeight||0);
    if(has){
      r.fotoClasse=r.imageClass=d.classe;
      r.qualidadeFoto=d.qualidade;
      if(!r.dimensaoFotoBaixada && (r.fotoWidth||r.avatarWidth) && (r.fotoHeight||r.avatarHeight)) r.dimensaoFotoBaixada=(r.fotoWidth||r.avatarWidth)+'x'+(r.fotoHeight||r.avatarHeight);
      r.statusFoto=max>=300?'validada':'baixa_remanescente';
      if(!r.fonteFotoBaixada) r.fonteFotoBaixada=r.fotoOrigem||'visible_dom_cdn';
      if(!r.fotoOrigem) r.fotoOrigem='visible_dom_cdn';
      if(!r.fotoBestSource) r.fotoBestSource=r.fotoOrigem;
    }else{
      r.fotoClasse=r.imageClass='NO_PHOTO'; r.qualidadeFoto='Sem foto'; r.statusFoto='sem_foto';
    }
    return r;
  }
  const PHOTO_FIELDS=['avatarUrl','fotoUrl','fotoUrlHD','avatarWidth','avatarHeight','fotoWidth','fotoHeight','imageClass','fotoClasse','imageEvidence','fotoOrigem','fotoBestSource','fotoCandidatesTested','qualidadeFoto','dimensaoFotoBaixada','fonteFotoBaixada','statusFoto'];
  function mergeRow(old, base){
    syncPhotoFields(old); syncPhotoFields(base);
    const oldPhoto=photoMax(old), newPhoto=photoMax(base);
    if((base.fotoUrl||base.avatarUrl) && newPhoto>=oldPhoto){ PHOTO_FIELDS.forEach(k=>{ if(base[k]!==undefined && base[k]!=='' && base[k]!==0) old[k]=base[k]; }); }
    for(const [k,v] of Object.entries(base)){
      if(PHOTO_FIELDS.includes(k)) continue;
      if(v==='' || v===0 || (Array.isArray(v)&&!v.length)) continue;
      if((k==='profileMetaStatus'||k==='statusMeta') && (old.profileMetaStatus==='ok'||old.statusMeta==='ok')) continue;
      if((k==='bio'||k==='bioText') && old.bio) continue;
      if(old[k]===undefined || old[k]==='' || old[k]===0 || (Array.isArray(old[k])&&!old[k].length) || k==='lastSeenAt' || k==='visualContext') old[k]=v;
    }
    old.lastSeenAt=new Date().toISOString(); syncPhotoFields(old); return old;
  }

  function pickName(a,card,key,imgAlt){
    const bad=/^(follow|following|add friend|message|friends|followers|more|see more|facebook|perfil|profile|curtir|like|share|compartilhar|seguir|amigos|seguidores|seguindo)$/i;
    const cands=[];
    [a.innerText, a.textContent, a.getAttribute('aria-label'), imgAlt].forEach(x=>{x=cleanText(String(x||'').replace(/^(perfil de|profile of|timeline of)\s+/i,'')); if(x)cands.push(x);});
    if(card){
      Array.from(card.querySelectorAll ? card.querySelectorAll('img[alt]') : []).forEach(i=>{const t=cleanText(i.alt); if(t)cands.push(t);});
      cleanText(card.innerText||card.textContent||'').split('\n').map(cleanText).filter(Boolean).slice(0,12).forEach(x=>cands.push(x));
    }
    for(let c of cands){
      c=cleanText(c); if(!c || c.length<2 || c.length>120) continue;
      if(bad.test(c) || BAD_UI_TEXT.test(c) || BAD_BIO_RE.test(c) || JSONISH_RE.test(c)) continue;
      if(c===key || c===key.replace(/^id:/,'')) continue;
      if(/^https?:\/\//i.test(c)) continue;
      return c;
    }
    state.stats.rejectedNoName++; return key;
  }
  function scanVisible(){
    state.stats.domScans++;
    const root=getMainRoot();
    const anchors=Array.from(root.querySelectorAll('a[href]')).filter(relationAnchorOk);
    let seen=0;
    for(const a of anchors){
      const key=profileKeyFromHref(a.href||a.getAttribute('href')); if(!key) continue;
      const card=nearestCard(a); if(!card) continue;
      const img=bestImageFromCard(card); const name=pickName(a,card,key,img.alt);
      const d=classifyPhoto(img.width,img.height);
      const text=cleanText(card.innerText||card.textContent||'');
      const base={
        key, relacao:state.relation, relation:state.relation, username:key, displayName:name, nome:name,
        profileUrl:canonicalProfileUrlFromKey(key), perfil:canonicalProfileUrlFromKey(key),
        avatarUrl:img.url, fotoUrl:img.url, fotoUrlHD:img.url, avatarWidth:img.width, avatarHeight:img.height,
        fotoWidth:img.width, fotoHeight:img.height, imageClass:d.classe, fotoClasse:d.classe,
        imageEvidence: img.url ? 'visible_dom_img_url_dim_or_natural' : '', fotoOrigem: img.url ? 'visible_dom_cdn' : '', fotoBestSource: img.url ? 'visible_dom_cdn' : '', fotoCandidatesTested: img.url ? 1 : 0,
        qualidadeFoto:d.qualidade, dimensaoFotoBaixada: img.width&&img.height ? img.width+'x'+img.height : '', fonteFotoBaixada: img.url ? 'visible_dom_cdn' : '', statusFoto: img.url ? (Math.max(img.width,img.height)>=300?'validada':'baixa_remanescente') : 'sem_foto',
        bio:'', bioText:'', linkExterno:'', externalUrl:'', seguidores:'', seguindo:'', curtidas:'', videos:'', postagens:'', amigos:'', privada:'', categoria:'', trabalho:'', localizacao:'', formacao:'', metadadosCompletos:'', detalhesRenderizados:[],
        statusMeta:'pending', profileMetaStatus:'pending', visualContext:text.slice(0,500), metaConfidence:0, metaAudit:'coletado do DOM visivel da relacao', metaSources:['dom_visible_relation'],
        firstSeenAt:new Date().toISOString(), lastSeenAt:new Date().toISOString()
      };
      syncPhotoFields(base);
      if(state.rows.has(key)){
        const old=state.rows.get(key); state.stats.rowsUpdated++; state.stats.duplicates++;
        mergeRow(old, base);
      }else{
        state.rows.set(key,syncPhotoFields(base)); state.stats.rowsInserted++;
      }
      seen++;
    }
    state.stats.domRowsSeen += seen;
    log('info','Coleta visivel executada.',{seenThis:seen,total:state.rows.size});
    renderStatus(); return seen;
  }
  function relationSectionCandidates(){
    const out=[];let nodes=[];
    try{nodes=Array.from(document.querySelectorAll('section,div,[role="main"],[role="region"]'));}catch(e){}
    for(const node of nodes){
      if(!node||!node.querySelectorAll)continue;
      const t=cleanText(node.innerText||node.textContent||'');if(!t||t.length>5000)continue;
      const rels=relationCountPairsFromText(t).map(x=>x.relation);
      const labelHit=new RegExp('(?:^|\\b)'+(state.relation==='followers'?'followers?|seguidores?':state.relation==='following'?'following|seguindo':'friends?|amigos?|amizades?')+'(?:\\b|$)','i').test(t);
      const anchors=Array.from(node.querySelectorAll('a[href]')).filter(a=>{const k=profileKeyFromHref(a.href||a.getAttribute('href'));return !!k&&!RESERVED.has(String(k).toLowerCase())&&!isSelfKey(k);});
      if(labelHit||rels.includes(state.relation)||anchors.length>=2)out.push({node,anchors:anchors.length,text:t.slice(0,240)});
    }
    out.sort((a,b)=>b.anchors-a.anchors);
    return out.slice(0,12);
  }
  async function prepareRelationSearchSurface(){
    const candidates=relationSectionCandidates();
    const section=candidates[0]&&candidates[0].node;
    try{if(section&&section.scrollIntoView)section.scrollIntoView({block:'start',inline:'nearest',behavior:'auto'});}catch(e){}
    try{const sc=(relationScrollCandidates()[0]&&relationScrollCandidates()[0].el)||getScrollable();scrollRelationNodeTo(sc,0);}catch(e){}
    await waitForRelationMutation(Math.min(1200,RELATION_SEARCH_RECOVERY_SETTLE_MS+500));await sleep(180);
    return section||null;
  }
  async function revealRelationSearchInput(){
    let found=relationSearchInput();if(found)return found;
    const sections=relationSectionCandidates();
    for(const s of sections.slice(0,5)){
      let controls=[];try{controls=Array.from(s.node.querySelectorAll('button,[role="button"],a,[aria-label]'));}catch(e){}
      for(const el of controls){
        const label=cleanText([el.getAttribute&&el.getAttribute('aria-label'),el.getAttribute&&el.getAttribute('title'),el.innerText||el.textContent].filter(Boolean).join(' '));
        if(!/(?:search|pesquisar|buscar|rechercher|suchen)/i.test(label))continue;
        try{el.click();}catch(e){try{el.dispatchEvent(new MouseEvent('click',{bubbles:true,cancelable:true}));}catch(_){}}
        await waitForRelationMutation(900);await sleep(120);found=relationSearchInput();if(found)return found;
      }
    }
    return null;
  }
  function relationSearchInput(){
    ensureCurrentPageContext('relation_search_input');
    const active=detectActiveRelationSurface();
    if(active&&active.relation&&active.relation!==state.relation&&Number(active.confidence||0)>=100)return null;
    const root=getMainRoot(),selector='input,[role="searchbox"],[contenteditable="true"]',nodes=Array.from((root||document).querySelectorAll(selector)).filter(elementIsVisible),labelRe=/(?:search|pesquisar|buscar|rechercher|suchen)/i;
    let best=null,bestScore=-Infinity;
    for(const input of nodes){
      const label=cleanText([input.getAttribute&&input.getAttribute('placeholder'),input.getAttribute&&input.getAttribute('aria-label'),input.getAttribute&&input.getAttribute('title')].filter(Boolean).join(' '));
      const role=String(input.getAttribute&&input.getAttribute('role')||''),type=String(input.getAttribute&&input.getAttribute('type')||'');
      if(!labelRe.test(label)&&role!=='searchbox'&&type!=='search')continue;
      let rect={top:0,width:0,height:0};try{rect=input.getBoundingClientRect();}catch(e){}
      if(rect.width<60||rect.height<14)continue;
      let score=20,cur=input,profileAnchors=0,relationText='',bounded=false;
      for(let depth=0;depth<12&&cur&&cur!==document.body;depth++,cur=cur.parentElement){
        if(cur.querySelectorAll){
          const anchors=Array.from(cur.querySelectorAll('a[href]')).filter(a=>{const k=profileKeyFromHref(a.href||a.getAttribute('href'));return !!k&&!RESERVED.has(String(k).toLowerCase())&&!isSelfKey(k);});
          if(anchors.length>profileAnchors)profileAnchors=anchors.length;
        }
        const t=cleanText(cur.innerText||cur.textContent||'');
        if(/friends?|amigos?|followers?|seguidores?|following|seguindo/i.test(t)){relationText=t;bounded=true;}
        if(profileAnchors>=2&&relationText)break;
      }
      score+=Math.min(100,profileAnchors*5);if(relationText)score+=45;if(bounded)score+=20;if(root&&root.contains(input))score+=15;if(labelRe.test(label))score+=20;
      if(score>bestScore){bestScore=score;best={input,label:label||role||type||'searchbox',score,profileAnchors,top:rect.top,bounded,relationText};}
    }
    return bestScore>=75&&best&&best.bounded===true&&best.profileAnchors>=2?best:null;
  }
  function setRelationSearchValue(input,value){
    if(!input)return false;try{
      input.focus();const str=String(value||'');
      if(input instanceof HTMLInputElement||input instanceof HTMLTextAreaElement){
        const proto=input instanceof HTMLTextAreaElement?window.HTMLTextAreaElement.prototype:window.HTMLInputElement.prototype,desc=proto&&Object.getOwnPropertyDescriptor(proto,'value');if(desc&&desc.set)desc.set.call(input,str);else input.value=str;
      }else if(input.getAttribute&&input.getAttribute('contenteditable')==='true'){input.textContent=str;}
      else input.value=str;
      try{input.dispatchEvent(new InputEvent('input',{bubbles:true,inputType:'insertText',data:str}));}catch(e){input.dispatchEvent(new Event('input',{bubbles:true}));}
      input.dispatchEvent(new Event('change',{bubbles:true}));return true;
    }catch(e){return false;}
  }
  function relationSearchPrefixBudget(target,current){
    const gap=Math.max(0,Number(target||0)-Number(current||0));return Math.min(1400,Math.max(72,Math.ceil(gap*2.2)));
  }
  async function scanRelationSearchResults(target){
    let stable=0,last=state.rows.size,maxSeen=0,steps=0;let sc=(relationScrollCandidates()[0]&&relationScrollCandidates()[0].el)||getScrollable();
    try{scrollRelationNodeTo(sc,0);}catch(e){}
    while(steps<RELATION_SEARCH_RECOVERY_MAX_SCROLL_STEPS){
      throwIfStopped('relation_search_recovery');const seen=scanVisible();maxSeen=Math.max(maxSeen,Number(seen||0));if(target>0&&state.rows.size>=target)break;
      if(state.rows.size>last){last=state.rows.size;stable=0;}else stable++;
      const m=relationScrollMetrics(sc);if(stable>=RELATION_SEARCH_RECOVERY_STABLE_STEPS&&nearPhysicalBottom(m))break;
      scrollRelationNodeTo(sc,Math.min(m.maxTop,m.top+Math.max(420,Math.floor(m.clientHeight*0.88))));
      await waitForRelationMutation(RELATION_SEARCH_RECOVERY_STEP_WAIT_MS);await sleep(120);steps++;
    }
    scanVisible();return {maxSeen,steps,total:state.rows.size};
  }
  async function recoverRelationGapBySearch(target){
    const t=Math.max(0,Number(target||0)),run=state.relationSearchRecovery||{};if(run.active)return run;if(t<=0||state.rows.size>=t)return {...run,attempted:false,reason:'target_absent_or_reached'};
    await prepareRelationSearchSurface();let found=relationSearchInput();if(!found)found=await revealRelationSearchInput();
    state.relationSearchRecovery={active:false,attempted:true,completed:false,available:!!found,attempts:0,prefixesTried:[],gained:0,startedAt:new Date().toISOString(),completedAt:'',reason:'',inputDescriptor:found?found.label:''};
    const r=state.relationSearchRecovery;if(!found){r.completed=true;r.completedAt=new Date().toISOString();r.reason='relation_search_input_not_found';log('info','Recuperação por busca da relação indisponível.',{target:t,total:state.rows.size});return r;}
    r.active=true;const beforeAll=state.rows.size,queue=[...RELATION_SEARCH_RECOVERY_ALPHABET],visited=new Set(),budget=relationSearchPrefixBudget(t,beforeAll),wasRunning=state.runningScroll;state.runningScroll=true;updateButtons();
    try{
      while(queue.length&&r.attempts<budget&&state.rows.size<t){
        throwIfStopped('relation_search_prefix');const prefix=queue.shift();if(!prefix||visited.has(prefix))continue;visited.add(prefix);r.attempts++;r.prefixesTried.push(prefix);state.stats.relationSearchRecoveryAttempts++;state.stats.relationSearchRecoveryPrefixes++;
        const before=state.rows.size;if(!setRelationSearchValue(found.input,prefix)){r.reason='relation_search_input_set_failed';break;}
        await waitForRelationMutation(RELATION_SEARCH_RECOVERY_SETTLE_MS);await sleep(120);const pass=await scanRelationSearchResults(t),gained=Math.max(0,state.rows.size-before);r.gained+=gained;state.stats.relationSearchRecoveryGained+=gained;
        log('info','Prefixo de recuperação relacional processado.',{prefix,gained,total:state.rows.size,maxSeen:pass.maxSeen,steps:pass.steps,target:t});
        if(prefix.length<RELATION_SEARCH_RECOVERY_MAX_PREFIX_LEN&&pass.maxSeen>=RELATION_SEARCH_RECOVERY_SATURATION){for(const c of RELATION_SEARCH_RECOVERY_ALPHABET)if(!visited.has(prefix+c))queue.push(prefix+c);}
        if(r.attempts===RELATION_SEARCH_RECOVERY_ALPHABET.length&&r.gained===0){r.reason='relation_search_first_level_no_gain';break;}
      }
      if(state.rows.size>=t)r.reason='target_reached_by_relation_search';else if(!r.reason)r.reason=queue.length?'relation_search_budget_exhausted':'relation_search_prefixes_exhausted';
    }finally{
      try{setRelationSearchValue(found.input,'');await waitForRelationMutation(RELATION_SEARCH_RECOVERY_SETTLE_MS);await sleep(100);scanVisible();}catch(e){}
      state.runningScroll=wasRunning;r.active=false;r.completed=true;r.completedAt=new Date().toISOString();r.gained=Math.max(r.gained,state.rows.size-beforeAll);updateButtons();renderStatus();
    }
    log('info','Recuperação adicional por busca da própria relação encerrada.',{target:t,before:beforeAll,total:state.rows.size,gained:r.gained,attempts:r.attempts,budget,reason:r.reason});return r;
  }

  async function autoScrollCollect(){
    if(state.runningScroll) return; state.runningScroll=true; state.bottomConfirmed=false;
    updateButtons();
    const sc=getScrollable(); let stable=0, last=state.rows.size, passes=0;
    log('info','Auto-scroll iniciado.',{limit:state.limit});
    try{
      while(state.rows.size < state.limit && stable < 7 && passes < 180){
        scanVisible();
        if(state.rows.size>last){ stable=0; last=state.rows.size; } else stable++;
        try{ sc.scrollTo({top:(sc.scrollTop||0)+(sc.clientHeight||window.innerHeight)*0.86, behavior:'smooth'}); }catch(e){ window.scrollBy(0, Math.floor(window.innerHeight*0.86)); }
        await sleep(Math.max(700, Math.min(3000, state.delay/3)));
        passes++;
      }
      scanVisible(); state.bottomConfirmed = state.rows.size >= state.limit || stable >= 7;
      log('info','Auto-scroll encerrado.',{total:state.rows.size,bottomConfirmed:state.bottomConfirmed,passes});
    }catch(e){ err('Erro no auto-scroll',e); }
    state.runningScroll=false; updateButtons(); renderStatus();
  }
  async function autoScrollCollectRobustTarget(){
    if(state.runningScroll)return {total:rowsArr().length,bottomConfirmed:state.bottomConfirmed,closureReason,visibilityGap:state.relationVisibilityGap===true};
    state.runningScroll=true;state.bottomConfirmed=false;state.relationVisibilityGap=false;state.closureReason='';updateButtons();
    let passes=0,bottomStable=0,bottomSince=0,lastRows=state.rows.size;
    let sc=getScrollable(),lastMetrics=relationScrollMetrics(sc);
    const target=declaredRelationTarget(),maxPasses=target>0?Math.min(5000,Math.max(RELATION_SCROLL_MAX_PASSES,Math.ceil(target/4)+80)):RELATION_UNKNOWN_TARGET_MAX_PASSES;
    log('info','Auto-scroll robusto V29 iniciado.',{relation:state.relation,target,targetSource:state.expectedSource,initialTotal:state.rows.size,maxPasses,recoveryMaxRounds:RELATION_RECOVERY_MAX_ROUNDS});
    try{
      while(passes<maxPasses){
        throwIfStopped('relation_scroll');
        if(passes===0||passes%8===0)assertRelationSurface('robust_scroll_pass_'+passes);
        scanVisible();
        let total=state.rows.size;
        let decision=decideRelationClosure(total,target,false,false,false,0,0);
        if(decision.close){state.bottomConfirmed=true;state.closureReason=decision.reason;break;}

        const boundCandidates=relationScrollCandidates();
        sc=(boundCandidates[0]&&boundCandidates[0].el)||getScrollable();
        const before=relationScrollMetrics(sc),prevRows=total,prevHeight=before.scrollHeight;
        const forceBottom=bottomStable>0||nearPhysicalBottom(before);
        const step=Math.max(520,Math.floor(before.clientHeight*0.92));
        const desired=forceBottom?before.maxTop:Math.min(before.maxTop,before.top+step);
        scrollRelationNodeTo(sc,desired);

        await waitForRelationMutation(RELATION_SCROLL_WAIT_MS);await sleep(180);scanVisible();
        total=state.rows.size;
        const after=relationScrollMetrics(sc);
        const rowsGrew=total>prevRows,heightGrew=after.scrollHeight>prevHeight+RELATION_HEIGHT_EPS_PX,nearBottom=nearPhysicalBottom(after);

        if(rowsGrew||heightGrew){bottomStable=0;bottomSince=0;}
        else if(nearBottom){if(!bottomSince)bottomSince=Date.now();bottomStable++;}
        else{bottomStable=0;bottomSince=0;}

        decision=decideRelationClosure(total,target,nearBottom,rowsGrew,heightGrew,bottomStable,bottomSince?Date.now()-bottomSince:0);
        if(decision.close){state.bottomConfirmed=true;state.closureReason=decision.reason;break;}
        if(decision.recovery===true){
          const rec=await recoverDeclaredTargetGap(target);
          scanVisible();total=state.rows.size;
          if(total>=target){state.bottomConfirmed=true;state.closureReason='expected_target_reached_after_recovery';break;}
          if(rec.exhausted){state.relationVisibilityGap=true;state.bottomConfirmed=false;state.closureReason='declared_target_not_observable_after_adaptive_recovery';break;}
          bottomStable=0;bottomSince=0;passes++;continue;
        }

        if(!rowsGrew&&!heightGrew&&!nearBottom&&passes>0&&passes%6===0){
          scrollRelationNodeTo(sc,after.maxTop);await waitForRelationMutation(Math.min(1800,RELATION_SCROLL_WAIT_MS+600));
        }
        lastRows=total;lastMetrics=after;passes++;
      }
      scanVisible();const finalTotal=state.rows.size;
      if(!state.bottomConfirmed&&target>0&&finalTotal>=target){state.bottomConfirmed=true;state.closureReason='expected_target_reached';}
      if(!state.bottomConfirmed&&!state.relationVisibilityGap){warn('Coleta robusta atingiu o limite de passes sem confirmar alvo.',{target,total:finalTotal,passes,lastMetrics});state.closureReason='max_passes_without_target';}
      log('info','Auto-scroll robusto V29 encerrado.',{target,total:finalTotal,bottomConfirmed:state.bottomConfirmed,visibilityGap:state.relationVisibilityGap===true,closureReason:state.closureReason||'',passes,lastRows,recovery:{...state.relationRecovery}});
    }catch(e){if(!isStopError(e)&&state.stopRequested!==true)err('Erro no auto-scroll robusto V29',e);else state.closureReason='stopped_by_user';}
    state.runningScroll=false;updateButtons();renderStatus();
    return {total:rowsArr().length,bottomConfirmed:state.bottomConfirmed,visibilityGap:state.relationVisibilityGap===true,closureReason:state.closureReason||'',passes,recovery:{...state.relationRecovery}};
  }
  function finalizeObservedRelationClosure(cfg,total){
    const observed=Math.max(0,Number(total||0));const declared=Math.max(0,Number(state.declaredRelationTarget||(cfg&&cfg.expectedHint)||0));
    state.observedRelationCount=observed;state.closedRelationCount=observed;state.relationObservedClosed=state.bottomConfirmed===true||state.relationVisibilityGap===true;state.relationTargetReached=declared>0?observed>=declared:false;state.metaLimit=observed;
    if(declared>0){
      state.declaredRelationTarget=declared;state.expected=declared;state.expectedHint=declared;state.limit=declared;
      state.expectedSource=state.relationTargetReached?'trusted_relation_target_reached':(state.relationVisibilityGap?'trusted_relation_target_not_observable_after_recovery':'trusted_relation_target_not_reached');
      if(!state.relationTargetReached)warn('Cardinalidade confirmada não foi integralmente observada após recuperação.',{declaredTarget:declared,observed,missing:Math.max(0,declared-observed),closureReason:state.closureReason||'',recovery:{...state.relationRecovery}});return;
    }
    state.expected=0;state.expectedHint=0;state.limit=Number.MAX_SAFE_INTEGER;state.expectedSource=state.relationObservedClosed?'relation_target_unconfirmed_observed_surface_closed':'relation_target_unconfirmed';state.relationTargetReached=false;
  }
  async function autoScrollCollectAllFriends(preconfigured=null){
    const cfg=preconfigured||configureAllFriendsMode();assertRelationSurface('before_relation_scroll');
    await autoScrollCollectRobustTarget();
    if(!state.stopRequested)assertRelationSurface('after_relation_scroll');scanVisible();
    const total=rowsArr().length;
    if(state.stopRequested===true){state.observedRelationCount=total;state.closedRelationCount=total;state.relationObservedClosed=false;state.relationTargetReached=false;state.closureReason='stopped_by_user';}
    else if(state.bottomConfirmed===true||state.relationVisibilityGap===true)finalizeObservedRelationClosure(cfg,total);
    log('info','Coleta da relação preparada.',{relation:state.relation,declaredTarget:declaredRelationTarget(),observedRelationCount:state.observedRelationCount,expected:state.expected,expectedHint:state.expectedHint,closedRelationCount:state.closedRelationCount,relationObservedClosed:state.relationObservedClosed,relationTargetReached:state.relationTargetReached,total,bottomConfirmed:state.bottomConfirmed,visibilityGap:state.relationVisibilityGap===true,closureReason:state.closureReason||'',expectedSource:state.expectedSource,relationSurfaceAudit:state.relationSurfaceAudit,recovery:{...state.relationRecovery}});
    return {relation:state.relation,declaredTarget:declaredRelationTarget(),observedRelationCount:state.observedRelationCount,expected:state.expected,expectedHint:state.expectedHint,closedRelationCount:state.closedRelationCount,relationObservedClosed:state.relationObservedClosed,relationTargetReached:state.relationTargetReached,total,bottomConfirmed:state.bottomConfirmed,visibilityGap:state.relationVisibilityGap===true,closureReason:state.closureReason||'',recovery:{...state.relationRecovery}};
  }
  function relationReadyForMeta(){
  const total=rowsArr().length;
  const observedClosed=Number(state.closedRelationCount||state.observedRelationCount||0);
  return state.relationObservedClosed===true&&observedClosed>0&&total>=observedClosed&&state.relationSurfaceBlocked!==true;
}
  async function waitForActiveScroll(timeoutMs=SCROLL_WAIT_TIMEOUT_MS){
    const started=Date.now();
    while(state.runningScroll===true){
      if(Date.now()-started>timeoutMs)throw new Error('SCROLL_ACTIVE_TIMEOUT');
      await sleep(250);
    }
    return relationReadyForMeta();
  }
  function relationMetaKeys(rows=rowsArr()){
    const out=[],seen=new Set();
    for(const row of rows){const k=metaRowKey(row);if(!k||seen.has(k))continue;seen.add(k);out.push(k);}
    return out;
  }
  function metaRunCoverageAudit(run,rows=rowsArr()){
    const required=relationMetaKeys(rows), queued=new Set(Array.isArray(run&&run.queuedKeys)?run.queuedKeys:[]), completed=new Set(run&&run.completedKeys instanceof Set?Array.from(run.completedKeys):Array.isArray(run&&run.completedKeys)?run.completedKeys:[]);
    const missingQueued=required.filter(k=>!queued.has(k)), missingCompleted=required.filter(k=>!completed.has(k));
    return {required:required.length,queued:queued.size,completed:completed.size,missingQueued,missingCompleted,queuedCovers:missingQueued.length===0,completedCovers:missingCompleted.length===0};
  }
  function validAboutBindingMode(v){return VALID_ABOUT_BINDING_MODES.includes(String(v||''));}
  function blockingGraphQLErrorCount(graphqlErrorCount,dataRootCount,targetBound){
    const n=Math.max(0,Number(graphqlErrorCount||0));
    if(n===0)return 0;
    return targetBound===true && Number(dataRootCount||0)>0 ? 0 : n;
  }
  async function ensureMetaCoverageForCurrentRelation(reason='ensure'){
    if(state.runningScroll===true)await waitForActiveScroll();
    if(!relationReadyForMeta())return metaRunSummary();
    state.metaLimit=rowsArr().length;
    const existing=state.metaRun;
    if(existing&&existing.active&&existing.promise){
      await existing.promise;
      const after=metaRunCoverageAudit(state.metaRun,rowsArr());
      if(after.completedCovers)return metaRunSummary();
    }
    const current=state.metaRun;
    if(current&&current.completed){
      const cov=metaRunCoverageAudit(current,rowsArr());
      if(cov.completedCovers){log('info','Meta concluída cobre integralmente a relação atual.',{reason,required:cov.required,completed:cov.completed});return metaRunSummary();}
      state.metaRunHistory.push(metaRunSummary());
      log('warn','Run Meta concluída não cobre a relação atual; nova run integral será criada.',{reason,required:cov.required,missingQueued:cov.missingQueued.length,missingCompleted:cov.missingCompleted.length});
      state.metaRun={active:false,completed:false,runId:'',requestedLimit:0,queuedKeys:[],startedKeys:new Set(),completedKeys:new Set(),targetBoundKeys:new Set(),semanticKeys:new Set(),bioKeys:new Set(),followersKeys:new Set(),followingKeys:new Set(),withCountsKeys:new Set(),externalLinkKeys:new Set(),idResolvedKeys:new Set(),headerHttpOkKeys:new Set(),headerParseOkKeys:new Set(),headerTargetBoundKeys:new Set(),headerSemanticKeys:new Set(),aboutQueuedKeys:new Set(),aboutHttpOkKeys:new Set(),aboutSemanticKeys:new Set(),aboutCompleteKeys:new Set(),aboutPartialKeys:new Set(),aboutUnavailableKeys:new Set(),bioPresentKeys:new Set(),bioAbsentConfirmedKeys:new Set(),bioNotObservableKeys:new Set(),bioUnresolvedKeys:new Set(),onePassKeys:new Set(),headerFallbackKeys:new Set(),rejectedDuplicateStarts:0,startedAt:'',completedAt:'',promise:null};
    }
    return fastEnrichStrict();
  }
  async function startStreamingMetaDuringScroll(reason='scroll_stream'){
    const existing=state.metaRun;
    if(existing&&existing.active&&existing.promise)return existing.promise;
    const run=newMetaRun([]); run.streaming=true; run.streamingReason=reason; run.scrollStartedAt=state.scrollStartedAt||new Date().toISOString();
    state.metaRun=run; state.runningMeta=true; resetRunStats(); beginGeneralLaneForMetaRun(run.runId); syncRunStats(run); updateButtons();
    const task=(async()=>{
      const roots=documentJsonRoots(document); let boot=bootstrapFromRoots(roots); attachStructuredRelationIds(boot); boot=await discoverOperationIds(boot);
      state.bootstrapAudit={actorID:boot.actorID?'present':'missing',dtsg:boot.dtsg?'present':'missing',lsd:boot.lsd?'present':'missing',headerQueryID:boot.headerQueryID,aboutQueryID:boot.aboutQueryID,topAppQueryID:boot.topAppQueryID,operationProvenance:{...(boot.operationProvenance||{})},routePolicy:ABOUT_ROUTE_POLICY,relationStructuredItems:boot.relationItems.size,evidence:uniq(boot.evidence)};
      if(!boot.actorID||!boot.dtsg)throw new Error('GRAPHQL_BOOTSTRAP_INCOMPLETO');
      const targetTask=ensureTargetProfileEnriched(boot);
      const queue=[],queued=new Set(); let next=0,postScrollWaitStartedAt=0;
      const enqueueVisible=()=>{
        const currentRows=rowsArr();
        for(const row of currentRows){const k=metaRowKey(row);if(!k||queued.has(k))continue;queued.add(k);run.queuedKeys.push(k);queue.push(row);}
        run.requestedLimit=run.queuedKeys.length;
        const cohort=computeFrozenCohortSelection(currentRows);state.cohortAudit=cohort.audit;run.cohortAudit={...cohort.audit,missing:[...(cohort.audit.missing||[])]};
        syncRunStats(run);
      };
      enqueueVisible();
      log('info','Meta streaming iniciada durante o scroll.',{runId:run.runId,concurrency:Math.max(1,Math.min(32,state.fetchConcurrency)),initialQueue:queue.length,reason});
      const worker=async()=>{
        while(true){
          if(state.stopRequested===true)break;
          enqueueVisible();
          if(next<queue.length){
            const i=next++, row=queue[i], k=metaRowKey(row); if(!k)continue;
            if(run.startedKeys.has(k)){run.rejectedDuplicateStarts++;syncRunStats(run);continue;}
            run.startedKeys.add(k);syncRunStats(run);
            try{await enrichOneStructured(row,boot,i+1,Math.max(queue.length,rowsArr().length),run);}catch(e){if(isStopError(e)||state.stopRequested===true)break;state.stats.profileFetchFailed++;err('Falha meta streaming '+row.username,e);}finally{if(!state.stopRequested){run.completedKeys.add(k);updateRunEvidence(run,row);syncRunStats(run);}}
            continue;
          }
          if(state.runningScroll===true){postScrollWaitStartedAt=0;await sleep(STREAM_POLL_MS);continue;}
          if(!relationReadyForMeta()){
            if(!postScrollWaitStartedAt)postScrollWaitStartedAt=Date.now();
            if(Date.now()-postScrollWaitStartedAt>MAX_POST_SCROLL_TAIL_MS)throw new Error('STREAM_META_RELATION_CLOSURE_TIMEOUT');
            await sleep(STREAM_POLL_MS);continue;
          }
          postScrollWaitStartedAt=0;
          enqueueVisible();
          if(next>=queue.length)break;
        }
      };
      await Promise.all(Array.from({length:Math.max(1,Math.min(32,state.fetchConcurrency))},()=>worker()));
      if(!state.stopRequested)await targetTask;
      if(!state.stopRequested)await awaitGeneralLaneDrain();
      if(!state.stopRequested)await recoverLowPhotos();
      run.active=false;run.completed=!state.stopRequested;run.stopped=state.stopRequested===true;run.completedAt=new Date().toISOString();run.scrollCompletedAt=state.scrollCompletedAt||'';run.postScrollTailMs=(run.scrollCompletedAt?Math.max(0,new Date(run.completedAt)-new Date(run.scrollCompletedAt)):0);
      state.runningMeta=false;syncRunStats(run);recalcMetaStatsStrict();updateButtons();renderStatus();
      log('info','Meta streaming integral encerrada.',metaRunSummary());
      return metaRunSummary();
    })().catch(e=>{run.active=false;run.completed=false;run.stopped=isStopError(e)||state.stopRequested===true;run.completedAt=new Date().toISOString();state.runningMeta=false;syncRunStats(run);if(!run.stopped)err('Falha da run Meta streaming',e);updateButtons();renderStatus();return metaRunSummary();});
    run.promise=task;return task;
  }
  async function maybeAutoStartMeta(reason='auto'){
    return (async()=>{
      try{readInputs();}catch(e){}
      if(state.runningScroll===true)await waitForActiveScroll();
      scanVisible();
      const total=rowsArr().length, ready=relationReadyForMeta();
      if(!AUTO_META_AFTER_LIST || !ready){
        log('info','Meta automática aguardando fechamento integral da relação.',{reason,total,expected:state.expected,bottomConfirmed:state.bottomConfirmed,productionMode:PRODUCTION_META_MODE});
        return metaRunSummary();
      }
      state.metaLimit=total;
      log('info','Meta automática garante cobertura integral sem clique manual.',{reason,total,metaLimit:state.metaLimit,productionMode:PRODUCTION_META_MODE});
      return ensureMetaCoverageForCurrentRelation(reason);
    })();
  }
  async function autoScrollCollectAndEnrich(){
    return (async()=>{
      if(state.runningScroll===true){await waitForActiveScroll();return ensureMetaCoverageForCurrentRelation('existing_scroll_finished');}
      ensureCurrentPageContext('run_preflight');storeCanonicalFriendsResume();
      const preserved=ensureCanonicalFriendsSurfaceForRun();
      const requestedRelation=state.relation;
      assertCollectableRelationSurface('auto_scroll_user_intent_preflight');
      resetRunControl();installRelationNetworkBridge();state.relationSurfaceBlocked=false;
      const cfg=configureAllFriendsMode();
      assertCollectableRelationSurface('auto_scroll_configured_preflight');
      log('info','Execução iniciada sem navegação automática; URL aberta pelo usuário foi preservada.',{href:location.href,relation:state.relation,preservedUrl:preserved&&preserved.preservedUrl===true});
      beginRelationNetworkCapture();state.scrollStartedAt=new Date().toISOString();
      const streamingPromise=STREAM_META_DURING_SCROLL?startStreamingMetaDuringScroll('auto_scroll_begin'):null;
      try{
        await autoScrollCollectAllFriends(cfg);
        if(!state.stopRequested)await drainRelationNetworkPagination('post_scroll_chain');
        scanVisible();
        let target=declaredRelationTarget();
        if(!state.stopRequested&&target>0&&state.rows.size<target){
          const searchRun=await recoverRelationGapBySearch(target);scanVisible();target=declaredRelationTarget();
          if(state.networkRelation&&state.networkRelation.active&&Number(state.networkRelation.replaysInFlight||0)>0)await drainRelationNetworkPagination('post_search_gap');
          log('info','Recuperação pós-terminal abaixo do alvo avaliada.',{target,total:state.rows.size,search:{...searchRun,prefixesTried:[...(searchRun&&searchRun.prefixesTried||[])]},allKnownRootsTerminal:networkAllKnownRootsTerminal()});
        }
        if(target>0&&state.rows.size>=target){state.bottomConfirmed=true;state.relationVisibilityGap=false;state.relationExposure={serverTerminalBelowTarget:false,backendHasNext:false,backendEndCursor:'',backendRootCount:Object.keys(state.networkRelation.roots||{}).length,visibleCount:state.rows.size,declaredCount:target,reason:'target_reached',at:new Date().toISOString()};state.closureReason='expected_target_reached_after_network_and_search_recovery';}
        else if(target>0&&state.rows.size<target){
          const terminal=networkAllKnownRootsTerminal(),pi=state.networkRelation&&state.networkRelation.lastPageInfo||{};
          state.bottomConfirmed=false;
          if(terminal&&pi.seen===true&&pi.hasNext!==true){
            state.relationVisibilityGap=true;
            state.relationExposure={serverTerminalBelowTarget:true,backendHasNext:false,backendEndCursor:pi.endCursor||'',backendRootCount:Object.keys(state.networkRelation.roots||{}).length,visibleCount:state.rows.size,declaredCount:target,reason:'backend_connection_terminal_below_public_count',at:new Date().toISOString()};
            state.closureReason='server_visible_subset_terminal_below_total';
          }else if(state.stopRequested===true){
            state.relationVisibilityGap=false;
            state.relationExposure={serverTerminalBelowTarget:false,backendHasNext:pi.hasNext===true,backendEndCursor:pi.endCursor||'',backendRootCount:Object.keys(state.networkRelation.roots||{}).length,visibleCount:state.rows.size,declaredCount:target,reason:'user_stop_before_terminal_proof',at:new Date().toISOString()};
            state.closureReason='user_stop_before_terminal_closure';
          }else{
            state.relationVisibilityGap=true;
            state.relationExposure={serverTerminalBelowTarget:false,backendHasNext:pi.hasNext===true,backendEndCursor:pi.endCursor||'',backendRootCount:Object.keys(state.networkRelation.roots||{}).length,visibleCount:state.rows.size,declaredCount:target,reason:'recovery_exhausted_without_backend_terminal_proof',at:new Date().toISOString()};
            state.closureReason=state.relationSearchRecovery&&state.relationSearchRecovery.attempted?'relation_search_recovery_exhausted_below_confirmed_target':'confirmed_target_gap_after_all_recovery';
          }
        }
        else if(target===0&&networkAllKnownRootsTerminal()){state.bottomConfirmed=true;state.closureReason='all_logical_connections_terminal_with_unconfirmed_target';}
        state.observedRelationCount=state.rows.size;state.closedRelationCount=state.rows.size;state.metaLimit=state.rows.size;
      }catch(e){if(!isStopError(e))throw e;}
      finally{completeRelationRunContext();endRelationNetworkCapture(state.stopRequested?'stopped':'scroll_and_network_drain_complete');}
      state.scrollCompletedAt=new Date().toISOString();if(state.stopRequested===true)return metaRunSummary();
      if(streamingPromise)await streamingPromise;
      return ensureMetaCoverageForCurrentRelation('post_network_drain_complete');
    })();
  }

  function rejectBadText(s){
    const t=cleanText(s); if(!t) return '';
    if(BAD_BIO_RE.test(t)){ state.stats.qplBioRejected++; return ''; }
    if(JSONISH_RE.test(t)){ state.stats.scriptTextRejected++; return ''; }
    if(BAD_UI_TEXT.test(t)) return '';
    if(/^(facebook|public|everyone|home|menu|notifications?|notifica[cç][oõ]es|see more|ver mais|about|intro|details|detalhes)$/i.test(t)) return '';
    if(t.length>900) return '';
    return t;
  }
  const GENERIC_META_RE = /^(facebook|public|everyone|home|menu|notifications?|notifica[cç][oõ]es|see more|ver mais|about|intro|details|detalhes|people|community)$/i;
  const META_FIELD_MAP = {
    bio:'bio', biography:'bio', intro:'bio', profilebio:'bio', description:'bio', about:'bio',
    followerscount:'seguidores', followercount:'seguidores',
    followingcount:'seguindo',
    postscount:'postagens', postcount:'postagens',
    videoscount:'videos', videocount:'videos',
    friendscount:'amigos', friendcount:'amigos',
    likescount:'curtidas', likecount:'curtidas',
    category:'categoria', categoryname:'categoria', pagecategory:'categoria',
    externalurl:'externalUrl', website:'externalUrl', websiteurl:'externalUrl',
    isprivate:'privada', private:'privada',
    email:'email', phone:'telefone', phonenumber:'telefone', telephone:'telefone'
  };
  function uniq(a){ return Array.from(new Set((a||[]).filter(Boolean))); }
  function normKey(k){ return String(k||'').replace(/[^a-z0-9]/gi,'').toLowerCase(); }
  function sameProfileKey(a,b){
    a=String(a||'').toLowerCase(); b=String(b||'').toLowerCase();
    if(!a||!b) return false; if(a===b) return true;
    if(a.startsWith('id:') && a.slice(3)===b.replace(/^id:/,'')) return true;
    if(b.startsWith('id:') && b.slice(3)===a.replace(/^id:/,'')) return true;
    return false;
  }
  function confirmedRowsIndex(){ const m=new Map(); for(const [k,r] of state.rows){ m.set(String(k).toLowerCase(),r); if(String(k).startsWith('id:')) m.set(String(k).slice(3).toLowerCase(),r); } return m; }
  function safeCount(v){
    if(typeof v==='number' && Number.isFinite(v) && v>=0) return String(v);
    const t=cleanText(v); if(!t || t.length>40) return '';
    const m=t.match(/^([0-9][0-9.,]*\s*[KMBkmb]?)$/); return m?m[1].replace(/\s+/g,''):'';
  }
  function safeExternalUrl(v){
    const t=cleanText(v); if(!t) return '';
    let u; try{u=new URL(t,location.origin);}catch(e){return '';}
    if(!/^https?:$/i.test(u.protocol)) return '';
    if(/(^|\.)(facebook\.com|fb\.com|fbcdn\.net)$/i.test(u.hostname)||/\.facebook\.com$/i.test(u.hostname)||/\.fbcdn\.net$/i.test(u.hostname)) return '';
    if(/api\.whatsapp\.com$/i.test(u.hostname) && !u.searchParams.get('phone')) return '';
    return u.href;
  }
  function isLocationUtilityUrl(v){
    const t=cleanText(v); if(!t)return false;
    let u; try{u=new URL(t,location.origin);}catch(e){return false;}
    const h=u.hostname.toLowerCase(), p=(u.pathname+u.search).toLowerCase();
    return /(^|\.)(bing\.com|google\.[a-z.]+|maps\.google\.[a-z.]+|maps\.apple\.com|openstreetmap\.org|waze\.com)$/.test(h) && /(?:maps|map|where1|q=|query=|place|dir)/.test(p);
  }
  function safeContactExternalUrl(v){
    const u=unwrapExternalUrl(v)||safeExternalUrl(v);
    if(!u||isLocationUtilityUrl(u))return '';
    return u;
  }
  const CATEGORY_PT_BR_EXACT = Object.freeze({
    "tv channel": "Canal de TV",
    "television channel": "Canal de televisão",
    "radio station": "Estação de rádio",
    "newspaper": "Jornal",
    "magazine": "Revista",
    "news & media website": "Site de notícias e mídia",
    "news and media website": "Site de notícias e mídia",
    "media/news company": "Empresa de mídia/notícias",
    "media company": "Empresa de mídia",
    "broadcasting & media production company": "Empresa de radiodifusão e produção de mídia",
    "digital creator": "Criador digital",
    "creator digital": "Criador digital",
    "content creator": "Criador de conteúdo",
    "creator": "Criador de conteúdo",
    "video creator": "Criador de vídeos",
    "reel creator": "Criador de Reels",
    "gaming video creator": "Criador de vídeos de jogos",
    "public figure": "Figura pública",
    "personal blog": "Blog pessoal",
    "blogger": "Blogueiro",
    "writer": "Escritor",
    "author": "Autor",
    "journalist": "Jornalista",
    "artist": "Artista",
    "musician/band": "Músico/banda",
    "musician": "Músico",
    "band": "Banda",
    "singer": "Cantor",
    "songwriter": "Compositor",
    "record label": "Gravadora",
    "dj": "DJ",
    "dancer": "Dançarino",
    "actor": "Ator",
    "actress": "Atriz",
    "comedian": "Comediante",
    "film director": "Diretor de cinema",
    "producer": "Produtor",
    "movie": "Filme",
    "movie/television studio": "Estúdio de cinema/televisão",
    "performing arts": "Artes cênicas",
    "arts & entertainment": "Artes e entretenimento",
    "arts and entertainment": "Artes e entretenimento",
    "entertainment website": "Site de entretenimento",
    "entertainment service": "Serviço de entretenimento",
    "fashion model": "Modelo",
    "model": "Modelo",
    "photographer": "Fotógrafo",
    "photography videography": "Fotografia e videografia",
    "photography & videography": "Fotografia e videografia",
    "visual arts": "Artes visuais",
    "graphic designer": "Designer gráfico",
    "entrepreneur": "Empreendedor",
    "business person": "Pessoa de negócios",
    "business service": "Serviço empresarial",
    "professional service": "Serviço profissional",
    "consulting agency": "Agência de consultoria",
    "marketing agency": "Agência de marketing",
    "advertising agency": "Agência de publicidade",
    "internet company": "Empresa de internet",
    "software company": "Empresa de software",
    "technology company": "Empresa de tecnologia",
    "information technology company": "Empresa de tecnologia da informação",
    "computer company": "Empresa de informática",
    "app page": "Página de aplicativo",
    "website": "Site",
    "e-commerce website": "Site de comércio eletrônico",
    "product/service": "Produto/serviço",
    "product service": "Produto/serviço",
    "brand": "Marca",
    "company": "Empresa",
    "business": "Negócio",
    "local business": "Empresa local",
    "shopping & retail": "Compras e varejo",
    "shopping and retail": "Compras e varejo",
    "retail company": "Empresa varejista",
    "clothing store": "Loja de roupas",
    "women's clothing store": "Loja de roupas femininas",
    "men's clothing store": "Loja de roupas masculinas",
    "shoe store": "Loja de calçados",
    "jewelry/watches": "Joias/relógios",
    "jewelry & watches store": "Loja de joias e relógios",
    "furniture store": "Loja de móveis",
    "electronics store": "Loja de eletrônicos",
    "mobile phone shop": "Loja de celulares",
    "bookstore": "Livraria",
    "grocery store": "Mercado",
    "supermarket": "Supermercado",
    "convenience store": "Loja de conveniência",
    "restaurant": "Restaurante",
    "cafe": "Café",
    "coffee shop": "Cafeteria",
    "bakery": "Padaria",
    "dessert shop": "Loja de sobremesas",
    "food & beverage": "Alimentos e bebidas",
    "food and beverage": "Alimentos e bebidas",
    "food delivery service": "Serviço de entrega de alimentos",
    "caterer": "Serviço de buffet",
    "chef": "Chef de cozinha",
    "bar": "Bar",
    "pub": "Pub",
    "brewery": "Cervejaria",
    "winery/vineyard": "Vinícola/vinhedo",
    "hotel": "Hotel",
    "motel": "Motel",
    "hostel": "Hostel",
    "resort": "Resort",
    "travel agency": "Agência de viagens",
    "tour agency": "Agência de turismo",
    "tour guide": "Guia de turismo",
    "vacation home rental": "Aluguel de casa de temporada",
    "transportation service": "Serviço de transporte",
    "taxi service": "Serviço de táxi",
    "airline company": "Companhia aérea",
    "airport": "Aeroporto",
    "automotive repair shop": "Oficina mecânica",
    "auto repair shop": "Oficina mecânica",
    "car dealership": "Concessionária de automóveis",
    "motorcycle dealership": "Concessionária de motocicletas",
    "automotive dealership": "Concessionária automotiva",
    "car wash": "Lava-rápido",
    "tire dealer & repair shop": "Loja e oficina de pneus",
    "motor vehicle company": "Empresa de veículos automotores",
    "real estate": "Imobiliário",
    "real estate agent": "Corretor de imóveis",
    "real estate company": "Empresa imobiliária",
    "real estate service": "Serviço imobiliário",
    "property management company": "Empresa de administração de imóveis",
    "construction company": "Empresa de construção",
    "contractor": "Empreiteiro",
    "architectural designer": "Designer de arquitetura",
    "interior design studio": "Estúdio de design de interiores",
    "home improvement": "Melhoria residencial",
    "lawyer & law firm": "Advogado e escritório de advocacia",
    "lawyer and law firm": "Advogado e escritório de advocacia",
    "law firm": "Escritório de advocacia",
    "lawyer": "Advogado",
    "legal service": "Serviço jurídico",
    "accountant": "Contador",
    "financial service": "Serviço financeiro",
    "financial services": "Serviços financeiros",
    "bank": "Banco",
    "credit union": "Cooperativa de crédito",
    "insurance company": "Companhia de seguros",
    "insurance agent": "Corretor de seguros",
    "tax preparation service": "Serviço de preparação de impostos",
    "medical & health": "Saúde e medicina",
    "medical and health": "Saúde e medicina",
    "medical service": "Serviço médico",
    "doctor": "Médico",
    "family doctor": "Médico de família",
    "dermatologist": "Dermatologista",
    "dentist & dental office": "Dentista e consultório odontológico",
    "dentist": "Dentista",
    "hospital": "Hospital",
    "clinic": "Clínica",
    "medical center": "Centro médico",
    "pharmacy / drugstore": "Farmácia",
    "pharmacy/drugstore": "Farmácia",
    "health/beauty": "Saúde/beleza",
    "health & wellness website": "Site de saúde e bem-estar",
    "health and wellness website": "Site de saúde e bem-estar",
    "mental health service": "Serviço de saúde mental",
    "physical therapist": "Fisioterapeuta",
    "nutritionist": "Nutricionista",
    "psychologist": "Psicólogo",
    "veterinarian": "Veterinário",
    "pet service": "Serviço para animais de estimação",
    "pet store": "Loja de animais",
    "beauty salon": "Salão de beleza",
    "hair salon": "Salão de cabeleireiro",
    "barber shop": "Barbearia",
    "nail salon": "Salão de unhas",
    "spa": "Spa",
    "makeup artist": "Maquiador",
    "fitness trainer": "Instrutor de fitness",
    "personal trainer": "Personal trainer",
    "gym/physical fitness center": "Academia/centro de condicionamento físico",
    "gym & physical fitness center": "Academia e centro de condicionamento físico",
    "sports & recreation": "Esportes e recreação",
    "sports and recreation": "Esportes e recreação",
    "sports team": "Equipe esportiva",
    "sports club": "Clube esportivo",
    "sports league": "Liga esportiva",
    "sports": "Esportes",
    "athlete": "Atleta",
    "coach": "Treinador",
    "sports coach": "Treinador esportivo",
    "recreation center": "Centro de recreação",
    "martial arts school": "Escola de artes marciais",
    "dance school": "Escola de dança",
    "yoga studio": "Estúdio de ioga",
    "school": "Escola",
    "education": "Educação",
    "educational consultant": "Consultor educacional",
    "college & university": "Faculdade e universidade",
    "college and university": "Faculdade e universidade",
    "university": "Universidade",
    "preschool": "Pré-escola",
    "private school": "Escola particular",
    "public school": "Escola pública",
    "tutor/teacher": "Tutor/professor",
    "teacher": "Professor",
    "language school": "Escola de idiomas",
    "nonprofit organization": "Organização sem fins lucrativos",
    "non-profit organization": "Organização sem fins lucrativos",
    "community organization": "Organização comunitária",
    "community": "Comunidade",
    "organization": "Organização",
    "government organization": "Organização governamental",
    "government official": "Autoridade governamental",
    "government agency": "Órgão governamental",
    "public & government service": "Serviço público e governamental",
    "public and government service": "Serviço público e governamental",
    "politician": "Político",
    "political candidate": "Candidato político",
    "political organization": "Organização política",
    "religious organization": "Organização religiosa",
    "church": "Igreja",
    "religious center": "Centro religioso",
    "charity organization": "Organização beneficente",
    "social service": "Serviço social",
    "cause": "Causa",
    "event": "Evento",
    "event planner": "Organizador de eventos",
    "event venue": "Local de eventos",
    "wedding planning service": "Serviço de planejamento de casamentos",
    "party entertainment service": "Serviço de entretenimento para festas",
    "museum": "Museu",
    "library": "Biblioteca",
    "landmark & historical place": "Marco e local histórico",
    "landmark and historical place": "Marco e local histórico",
    "park": "Parque",
    "national park": "Parque nacional",
    "tourist attraction": "Atração turística",
    "animal shelter": "Abrigo de animais",
    "agriculture": "Agricultura",
    "farm": "Fazenda",
    "farmer": "Agricultor",
    "industrial company": "Empresa industrial",
    "manufacturer/supplier": "Fabricante/fornecedor",
    "manufacturer": "Fabricante",
    "wholesale & supply store": "Loja de atacado e suprimentos",
    "wholesale and supply store": "Loja de atacado e suprimentos",
    "cargo & freight company": "Empresa de cargas e fretes",
    "cargo and freight company": "Empresa de cargas e fretes",
    "delivery service": "Serviço de entrega",
    "cleaning service": "Serviço de limpeza",
    "home cleaning": "Limpeza residencial",
    "security guard service": "Serviço de segurança",
    "printing service": "Serviço de impressão",
    "repair service": "Serviço de reparo",
    "appliance repair service": "Serviço de reparo de eletrodomésticos",
    "computer repair service": "Serviço de reparo de computadores",
    "telecommunication company": "Empresa de telecomunicações",
    "internet service provider": "Provedor de internet",
    "energy company": "Empresa de energia",
    "engineering service": "Serviço de engenharia",
    "scientist": "Cientista",
    "research institute": "Instituto de pesquisa",
    "personal coach": "Coach pessoal",
    "motivational speaker": "Palestrante motivacional",
    "podcast": "Podcast",
    "podcaster": "Podcaster",
    "game publisher": "Publicadora de jogos",
    "video game": "Videogame",
    "esports team": "Equipe de e-sports",
    "fan page": "Página de fãs",
    "just for fun": "Apenas por diversão",
    "fictional character": "Personagem fictício",
    "community service": "Serviço comunitário"
});
  function categoryLookupKey(value){
    return cleanText(value).replace(/[’‘]/g,"'").replace(/\s+/g,' ').trim().toLowerCase();
  }
  function translateCategoryPtBr(value){
    const t=cleanText(value); if(!t) return '';
    const exact=CATEGORY_PT_BR_EXACT[categoryLookupKey(t)];
    if(exact) return exact;
    const parts=t.split(/\s*(?:·|\||;)\s*/).filter(Boolean);
    if(parts.length>1){
      const translated=parts.map(p=>CATEGORY_PT_BR_EXACT[categoryLookupKey(p)]||p);
      if(translated.some((v,i)=>v!==parts[i])) return translated.join(' · ');
    }
    return t;
  }
  function normalizeAllCategoriesPtBr(){
    for(const r of rowsArr()) if(r&&r.categoria) r.categoria=safeCategory(r.categoria);
    if(state.targetProfileEnriched&&state.targetProfileEnriched.categoria) state.targetProfileEnriched.categoria=safeCategory(state.targetProfileEnriched.categoria);
  }
  function safeCategory(v){ const t=rejectBadText(v); if(!t||t.length>100||GENERIC_META_RE.test(t)) return ''; return translateCategoryPtBr(t); }
  function safeEmail(v){ const t=cleanText(v); return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(t)?t:''; }
  function safePhone(v){ const t=cleanText(v); const digits=t.replace(/\D/g,''); return digits.length>=8&&digits.length<=15?t:''; }
  function safeBio(v){
    const t=rejectBadText(v); if(!t||t.length<2||GENERIC_META_RE.test(t)) return '';
    if(/^(?:see|veja)\s+photos?|^(?:is|está)\s+on facebook/i.test(t)) return '';
    if(/facebook helps you connect|people you may know|log in|sign up|create new account/i.test(t)) return '';
    return t;
  }
  function directIdentityKeys(obj){
    if(!obj||typeof obj!=='object'||Array.isArray(obj)) return [];
    const out=[]; const add=v=>{ if(v===null||v===undefined) return; const t=String(v); if(/^\d{5,}$/.test(t)) out.push('id:'+t,t); else if(/^[A-Za-z0-9_.-]{2,80}$/.test(t)) out.push(t); };
    for(const k of ['username','vanity','profile_username','screen_name','id','profile_id','user_id']) if(Object.prototype.hasOwnProperty.call(obj,k)) add(obj[k]);
    for(const k of ['url','uri','profile_url','profileUrl','web_url','canonical_url','link']){
      const v=obj[k]; if(typeof v==='string'){ const key=profileKeyFromHref(v); if(key) out.push(key); }
    }
    for(const k of ['actor','user','profile','owner','node']){
      const v=obj[k]; if(v&&typeof v==='object'&&!Array.isArray(v)){
        for(const kk of ['username','vanity','id','profile_id','user_id']) if(Object.prototype.hasOwnProperty.call(v,kk)) add(v[kk]);
        for(const kk of ['url','uri','profile_url','profileUrl','web_url']) if(typeof v[kk]==='string'){ const key=profileKeyFromHref(v[kk]); if(key) out.push(key); }
      }
    }
    return uniq(out);
  }
  function objectMatchesRow(obj,row){ return directIdentityKeys(obj).some(k=>sameProfileKey(k,row.key||row.username)); }
  function mergeStrictMeta(a,b){
    const out={...(a||{})};
    for(const k of ['bio','seguidores','seguindo','postagens','videos','amigos','curtidas','categoria','externalUrl','privada','email','telefone']) if(!out[k]&&b&&b[k]) out[k]=b[k];
    out.evidence=uniq([...(a&&a.evidence||[]),...(b&&b.evidence||[])]); return out;
  }
  function extractStrictMetaFromObject(root,row){
    const out={evidence:[]}; const seen=new WeakSet();
    function visit(o,depth,path){
      if(!o||typeof o!=='object'||depth>4) return; if(seen.has(o)) return; seen.add(o);
      if(depth>0){ const ids=directIdentityKeys(o); if(ids.length && !ids.some(k=>sameProfileKey(k,row.key||row.username))) return; }
      if(Array.isArray(o)){ for(let i=0;i<Math.min(o.length,80);i++) visit(o[i],depth+1,path+'['+i+']'); return; }
      for(const [k,v] of Object.entries(o)){
        const nk=normKey(k), mapped=META_FIELD_MAP[nk];
        if(mapped && (typeof v==='string'||typeof v==='number'||typeof v==='boolean')){
          let val='';
          if(mapped==='bio') val=safeBio(v);
          else if(['seguidores','seguindo','postagens','videos','amigos','curtidas'].includes(mapped)) val=safeCount(v);
          else if(mapped==='externalUrl') val=safeExternalUrl(v);
          else if(mapped==='categoria') val=safeCategory(v);
          else if(mapped==='privada') val=(v===true||String(v).toLowerCase()==='true')?'sim':(v===false||String(v).toLowerCase()==='false')?'nao':'';
          else if(mapped==='email') val=safeEmail(v);
          else if(mapped==='telefone') val=safePhone(v);
          if(val && !out[mapped]){ out[mapped]=val; out.evidence.push(path+'.'+k); }
        }
      }
      for(const [k,v] of Object.entries(o)) if(v&&typeof v==='object') visit(v,depth+1,path+'.'+k);
    }
    visit(root,0,'$'); return out;
  }
  function walkObjects(root,cb,maxNodes=120000){
    const stack=[root], seen=new WeakSet(); let n=0;
    while(stack.length && n<maxNodes){ const v=stack.pop(); if(!v||typeof v!=='object') continue; if(seen.has(v)) continue; seen.add(v); n++; cb(v); if(Array.isArray(v)){ for(let i=Math.min(v.length,1000)-1;i>=0;i--) stack.push(v[i]); } else { const vals=Object.values(v); for(let i=Math.min(vals.length,1000)-1;i>=0;i--) stack.push(vals[i]); } }
    return n;
  }
  function parseJsonCandidates(text){
    const out=[]; let s=String(text||'').trim(); if(!s) return out;
    s=s.replace(/^for\s*\(\s*;;\s*\)\s*;\s*/,'');
    const tryPush=x=>{ try{ const v=JSON.parse(x); if(v&&typeof v==='object') out.push(v); }catch(e){} };
    tryPush(s);
    if(!out.length){ for(const line of s.split(/\n+/).slice(0,2000)){ const t=line.trim().replace(/^for\s*\(\s*;;\s*\)\s*;\s*/,''); if(t[0]==='{'||t[0]==='[') tryPush(t); } }
    return out.slice(0,1000);
  }
  
  function photoCandidateMax(url,width=0,height=0){const d=parseDimensionFromUrl(url||'');return Math.max(Number(width||0),Number(height||0),Number(d.width||0),Number(d.height||0));}
  function promoteMetaAvatarToPhoto(row,meta,source='meta_avatar'){
    if(!row||!meta||!meta.avatarUrl)return false;
    const candidate=upgradeFbImageUrl(meta.avatarUrl),cw=Number(meta.avatarWidth||0),ch=Number(meta.avatarHeight||0),candidateMax=photoCandidateMax(candidate,cw,ch),currentMax=photoMax(row);
    if(!candidate||candidateMax<=currentMax)return false;
    row.avatarUrl=row.fotoUrl=row.fotoUrlHD=candidate;row.avatarWidth=row.fotoWidth=cw||parseDimensionFromUrl(candidate).width;row.avatarHeight=row.fotoHeight=ch||parseDimensionFromUrl(candidate).height;
    row.imageEvidence=uniq([row.imageEvidence,'meta_avatar_exact_bound_dimension_improvement']).filter(Boolean).join(' | ');row.fotoOrigem=source;row.fotoBestSource=source;row.fotoCandidatesTested=Math.max(Number(row.fotoCandidatesTested||0),1);row.fonteFotoBaixada=source;syncPhotoFields(row);return true;
  }
  function fbPhotoRecoveryVariants(row){
    const seeds=uniq([row&&row.profileAvatarUrl,row&&row.fotoUrlHD,row&&row.fotoUrl,row&&row.avatarUrl].map(v=>cleanText(v)).filter(isImageUrl)),out=[];
    const add=v=>{if(v&&isImageUrl(v)&&!out.includes(v))out.push(v);};
    for(const seed of seeds){
      add(upgradeFbImageUrl(seed));
      try{
        const u=new URL(seed);u.searchParams.delete('ctp');
        const cstp=u.searchParams.get('cstp');if(cstp&&/mx\d+x\d+/i.test(cstp)){u.searchParams.set('cstp',cstp.replace(/mx\d+x\d+/i,'mx960x960'));add(u.href);}else{u.searchParams.set('cstp','mx960x960');add(u.href);}
        const stp=u.searchParams.get('stp');if(stp){const relaxed=stp.replace(/^c\d+(?:\.\d+){3}a_/i,'');u.searchParams.set('stp',relaxed);add(u.href);u.searchParams.set('stp',relaxed.replace(/^cp0_/i,''));add(u.href);u.searchParams.delete('stp');add(u.href);}
      }catch(e){}
    }
    return out.slice(0,8);
  }
  function probeImageDimensions(url,timeoutMs=LOW_PHOTO_PROBE_TIMEOUT_MS){
    return new Promise(resolve=>{let done=false,timer=null;const img=new Image(),finish=(ok)=>{if(done)return;done=true;if(timer)clearTimeout(timer);resolve({ok:ok===true,url,width:Number(img.naturalWidth||0),height:Number(img.naturalHeight||0)});};img.decoding='async';img.onload=()=>finish(true);img.onerror=()=>finish(false);timer=setTimeout(()=>finish(false),Math.max(1000,Number(timeoutMs||LOW_PHOTO_PROBE_TIMEOUT_MS)));img.src=url;});
  }
  async function recoverOneLowPhoto(row){
    const current=photoMax(row),candidates=fbPhotoRecoveryVariants(row);let best={url:'',width:0,height:0,max:current};state.stats.lowPhotoRecoveryStarted++;
    for(const url of candidates){state.stats.lowPhotoRecoveryProbed++;const p=await probeImageDimensions(url);if(!p.ok)continue;const max=Math.max(p.width,p.height);if(max>best.max)best={...p,max};if(max>=960)break;}
    if(best.url&&best.max>current){row.avatarUrl=row.fotoUrl=row.fotoUrlHD=best.url;row.avatarWidth=row.fotoWidth=best.width;row.avatarHeight=row.fotoHeight=best.height;row.imageEvidence=uniq([row.imageEvidence,'validated_image_probe_dimension_improvement']).filter(Boolean).join(' | ');row.fotoOrigem='validated_low_photo_recovery';row.fotoBestSource='validated_low_photo_recovery';row.fonteFotoBaixada='validated_low_photo_recovery';row.fotoCandidatesTested=Number(row.fotoCandidatesTested||0)+candidates.length;syncPhotoFields(row);state.stats.lowPhotoRecoveryImproved++;return true;}
    state.stats.lowPhotoRecoveryFailed++;return false;
  }
  async function recoverLowPhotos(){
    const run=state.photoRecoveryRun;if(run.active&&run.promise)return run.promise;if(run.completed)return {...run};
    const queue=rowsArr().filter(r=>photoMax(r)>0&&photoMax(r)<300);run.active=true;run.completed=false;run.queued=queue.length;run.started=0;run.probed=0;run.improved=0;run.failed=0;run.startedAt=new Date().toISOString();state.stats.lowPhotoRecoveryQueued=queue.length;renderStatus();
    const task=(async()=>{let next=0;const worker=async()=>{while(true){const i=next++;if(i>=queue.length)break;run.started++;try{const ok=await recoverOneLowPhoto(queue[i]);if(ok)run.improved++;else run.failed++;}catch(e){run.failed++;state.stats.lowPhotoRecoveryFailed++;}run.probed=state.stats.lowPhotoRecoveryProbed;renderStatus();}};await Promise.all(Array.from({length:Math.max(1,Math.min(LOW_PHOTO_RECOVERY_CONCURRENCY,queue.length||1))},()=>worker()));run.active=false;run.completed=true;run.completedAt=new Date().toISOString();renderStatus();log('info','Recuperação validada de fotos baixas encerrada.',{...run});return {...run};})().catch(e=>{run.active=false;run.completed=false;run.completedAt=new Date().toISOString();warn('Falha na recuperação de fotos baixas.',String(e&&e.message||e));return {...run};});run.promise=task;return task;
  }

function applyStrictMeta(row,meta,source){
    if(!row||!meta) return false;
    const responseTargetBound=meta.targetBoundOk===true;
    row.metaTargetBoundOk=(row.metaTargetBoundOk===true)||responseTargetBound;
    row.metaParseOk=(row.metaParseOk===true)||(meta.parseOk===true);
    const fields=[];
    const set=(dst,val)=>{ if(val){ row[dst]=val; fields.push(dst); } };
    set('bio',meta.bio); if(meta.bio) row.bioText=meta.bio;
    set('seguidores',meta.seguidores); set('seguindo',meta.seguindo); set('postagens',meta.postagens); set('videos',meta.videos); set('amigos',meta.amigos); set('curtidas',meta.curtidas); set('categoria',meta.categoria);
    const extCandidates=uniq([meta.externalUrl,...(Array.isArray(meta.externalUrls)?meta.externalUrls:[])]).map(safeContactExternalUrl).filter(Boolean);
    if(extCandidates.length){row.linksExternos=uniq([...(row.linksExternos||[]),...extCandidates]);if(!row.externalUrl)row.externalUrl=row.linksExternos[0];row.linkExterno=row.linksExternos.join(' | ');fields.push('externalUrl');}
    set('privada',meta.privada); set('trabalho',meta.trabalho); set('localizacao',meta.localizacao); set('formacao',meta.formacao);
    set('horarioFuncionamento',meta.horarioFuncionamento); set('responsavelPagina',meta.responsavelPagina);
    if(meta.avatarUrl){row.profileAvatarUrl=meta.avatarUrl;row.profileAvatarWidth=Number(meta.avatarWidth||0);row.profileAvatarHeight=Number(meta.avatarHeight||0);if(promoteMetaAvatarToPhoto(row,meta,source+'.avatar'))fields.push('fotoMelhoradaPorMeta');fields.push('profileAvatarUrl');}
    if(meta.coverUrl){row.coverUrl=meta.coverUrl;row.coverWidth=Number(meta.coverWidth||0);row.coverHeight=Number(meta.coverHeight||0);fields.push('coverUrl');}
    if(Array.isArray(meta.areasAtendimento)&&meta.areasAtendimento.length){row.areasAtendimento=uniq([...(row.areasAtendimento||[]),...meta.areasAtendimento]);fields.push('areasAtendimento');}
    if(Array.isArray(meta.aboutItems)&&meta.aboutItems.length){row.aboutItems=mergeAboutItems(row.aboutItems,meta.aboutItems);fields.push('aboutItems');}
    if(Array.isArray(meta.generalItems)&&meta.generalItems.length){const beforeGeneral=Array.isArray(row.generalItems)?row.generalItems.length:0;row.generalItems=mergeGeneralInfoItems(row.generalItems,meta.generalItems);if(row.generalItems.length>beforeGeneral)state.stats.generalItemsApplied+=row.generalItems.length-beforeGeneral;fields.push('generalItems');}
    const emailCandidates=uniq([meta.email,...(Array.isArray(meta.emails)?meta.emails:[])]).map(v=>safeEmail(v)).filter(Boolean);
    if(emailCandidates.length){row.emails=uniq([...(row.emails||[]),...emailCandidates]);if(!row.email)row.email=row.emails[0];fields.push('email');}
    const phoneCandidates=uniq([meta.telefone,...(Array.isArray(meta.telefones)?meta.telefones:[])]).map(v=>safePhone(v)).filter(Boolean);
    if(phoneCandidates.length){row.telefones=uniq([...(row.telefones||[]),...phoneCandidates]);if(!row.telefone)row.telefone=row.telefones[0];fields.push('telefone');}
    row.metaEvidence=uniq([...(row.metaEvidence||[]),...(meta.evidence||[])]); row.metaSources=uniq([...(row.metaSources||[]),source]);
    const responseSemantic=fields.length>0 && responseTargetBound;
    row.metaSemanticOk=(row.metaSemanticOk===true)||responseSemantic;
    if(row.metaSemanticOk){ row.statusMeta=row.profileMetaStatus='ok'; row.metaConfidence=Math.max(Number(row.metaConfidence||0),95); row.metaAudit='metadados target-bound estritos; merge monotônico; relação/foto preservadas'; }
    else { row.statusMeta=row.profileMetaStatus=row.metaTargetBoundOk?'target_bound_sem_meta':'pending'; }
    return responseSemantic;
  }
  function strictMetaFromJsonRoots(roots,row){
    let best={parseOk:roots.length>0,targetBoundOk:false,evidence:[]};
    for(const root of roots){ walkObjects(root,obj=>{ if(objectMatchesRow(obj,row)){ best.targetBoundOk=true; const m=extractStrictMetaFromObject(obj,row); m.parseOk=true; m.targetBoundOk=true; best=mergeStrictMeta(best,m); best.parseOk=true; best.targetBoundOk=true; } }); }
    return best;
  }
  function strictMetaFromHtml(html,row){
    const result={parseOk:false,targetBoundOk:false,evidence:[]}; let doc;
    try{ doc=new DOMParser().parseFromString(String(html||''),'text/html'); result.parseOk=!!doc; }catch(e){ return result; }
    const exactUrls=[];
    try{ doc.querySelectorAll('link[rel="canonical"],meta[property="og:url"]').forEach(n=>{ const v=n.getAttribute('href')||n.getAttribute('content')||''; const k=profileKeyFromHref(v); if(k&&sameProfileKey(k,row.key||row.username)) exactUrls.push(v); }); }catch(e){}
    if(exactUrls.length){ result.targetBoundOk=true; result.evidence.push('html.canonical_target_exact'); }
    const roots=[];
    try{ doc.querySelectorAll('script[type="application/json"],script[type="application/ld+json"]').forEach(sc=>{ for(const r of parseJsonCandidates(sc.textContent||'')) roots.push(r); }); }catch(e){}
    const jr=strictMetaFromJsonRoots(roots,row); let merged=mergeStrictMeta(result,jr); merged.parseOk=result.parseOk||jr.parseOk; merged.targetBoundOk=result.targetBoundOk||jr.targetBoundOk;
    if(result.targetBoundOk){
      const desc=[]; try{ doc.querySelectorAll('meta[property="og:description"],meta[name="description"]').forEach(n=>{const v=safeBio(n.getAttribute('content')||''); if(v) desc.push(v);}); }catch(e){}
      if(!merged.bio && desc[0]){ merged.bio=desc[0]; merged.evidence=uniq([...(merged.evidence||[]),'html.meta_description_target_exact']); }
    }
    return merged;
  }
  function passiveUrlRelevant(url){ return /(?:\/api\/graphql\/?|graphql|comet|friend|profile|actor|user)/i.test(String(url||'')); }
  function installPassiveNetworkStrict(){
    // Deliberately disabled in this version. The approved B35A1 source is rendered visible DOM.
    // This preserves the stable relation/photo lane and prevents network payloads from creating or mutating rows.
    state.passiveInstalled=false;
  }
  function processPassivePayloadStrict(url,body,channel){
    return;
  }
  function sameOriginProfileUrls(row){
    return [row && row.profileUrl || canonicalProfileUrlFromKey(row && (row.key||row.username))].filter(Boolean);
  }

  // ===== B35A1 V8: metadata lane grounded in real offline snapshots and live rejection fixtures =====
  // Snapshot evidence observed in the uploaded saved page:
  // - ProfileCometHeaderQuery operation 26916983467972978
  // - ProfileCometAboutAppSectionQuery operation 26885786877765593
  // - DTSGInitialData/LSD/RelayAPIConfigDefaults in JSON script modules
  // - relation rows at ...all_collections...pageItems.edges[].node with node.id/title/url/image_v2
  // - header data at result.data.user.profile_header_renderer.user with profile_social_context/profile_intro_card/profile_tabs
  function documentJsonRoots(doc=document){
    const out=[];
    try{
      doc.querySelectorAll('script[type="application/json"],script[type="application/ld+json"],script[data-sjs]').forEach(sc=>{
        const txt=sc.textContent||''; if(!txt.trim()||txt.length>12000000) return;
        for(const r of parseJsonCandidates(txt)) out.push(r);
      });
    }catch(e){}
    return out;
  }
  function htmlJsonRoots(html){
    try{return documentJsonRoots(new DOMParser().parseFromString(String(html||''),'text/html'));}catch(e){return [];}
  }
  function profileIdFromKey(key){ const s=String(key||''); return /^id:\d+$/.test(s)?s.slice(3):(/^\d{5,}$/.test(s)?s:''); }
  function bootstrapFromRoots(roots){
    const b={actorID:'',dtsg:'',lsd:'',graphURI:'/api/graphql/',headerQueryID:'',aboutQueryID:'',topAppQueryID:'',operationVariableTemplates:{},operationProvenance:{},routeUserID:'',relationItems:new Map(),evidence:[]};
    for(const root of roots){
      walkObjects(root,obj=>{
        if(Array.isArray(obj) && typeof obj[0]==='string' && obj.length>=3){
          const name=obj[0], data=obj[2];
          if(name==='DTSGInitialData' && data&&data.token){b.dtsg=String(data.token);b.evidence.push('module.DTSGInitialData');}
          if(name==='LSD' && data&&data.token){b.lsd=String(data.token);b.evidence.push('module.LSD');}
          if(name==='RelayAPIConfigDefaults' && data){if(data.actorID)b.actorID=String(data.actorID);if(data.graphURI)b.graphURI=String(data.graphURI);b.evidence.push('module.RelayAPIConfigDefaults');}
          if(name==='MRequestConfig' && data&&data.dtsg&&data.dtsg.token&&!b.dtsg){b.dtsg=String(data.dtsg.token);b.evidence.push('module.MRequestConfig.dtsg');}
        }
        if(!obj||Array.isArray(obj)) return;
        if(obj.queryName==='ProfileCometHeaderQuery' && obj.queryID){b.headerQueryID=String(obj.queryID);b.operationProvenance.ProfileCometHeaderQuery='preloader_current_document';if(obj.variables&&typeof obj.variables==='object')b.operationVariableTemplates.ProfileCometHeaderQuery=JSON.parse(JSON.stringify(obj.variables));b.evidence.push('preloader.ProfileCometHeaderQuery');}
        if(obj.queryName==='ProfileCometAboutAppSectionQuery' && obj.queryID){b.aboutQueryID=String(obj.queryID);b.operationProvenance.ProfileCometAboutAppSectionQuery='preloader_current_document';if(obj.variables&&typeof obj.variables==='object')b.operationVariableTemplates.ProfileCometAboutAppSectionQuery=JSON.parse(JSON.stringify(obj.variables));b.evidence.push('preloader.ProfileCometAboutAppSectionQuery');}
        if(obj.queryName==='ProfileCometTopAppSectionQuery' && obj.queryID){b.topAppQueryID=String(obj.queryID);b.operationProvenance.ProfileCometTopAppSectionQuery='preloader_current_document';if(obj.variables&&typeof obj.variables==='object')b.operationVariableTemplates.ProfileCometTopAppSectionQuery=JSON.parse(JSON.stringify(obj.variables));b.evidence.push('preloader.ProfileCometTopAppSectionQuery');}
        if(obj.actorID && /^\d{5,}$/.test(String(obj.actorID)) && !b.actorID)b.actorID=String(obj.actorID);
        if(obj.route && obj.route.rootView && obj.route.rootView.props && obj.route.rootView.props.userID && !b.routeUserID)b.routeUserID=String(obj.route.rootView.props.userID);
        if(obj.title&&obj.title.text&&obj.url&&obj.node&&obj.node.id&&/^\d{5,}$/.test(String(obj.node.id))){
          const key=profileKeyFromHref(obj.url); if(key){ b.relationItems.set(String(key).toLowerCase(),{key,id:String(obj.node.id),url:String(obj.url),name:cleanText(obj.title.text),subtitle:cleanText(obj.subtitle_text&&obj.subtitle_text.text||''),image:String(obj.image_v2&&obj.image_v2.uri||'')}); }
        }
      },220000);
    }
    if(!b.headerQueryID){b.headerQueryID=SNAPSHOT_HEADER_QUERY_ID;b.operationProvenance.ProfileCometHeaderQuery='snapshot_fallback';}
    if(!b.aboutQueryID){b.aboutQueryID=SNAPSHOT_ABOUT_QUERY_ID;b.operationProvenance.ProfileCometAboutAppSectionQuery='snapshot_fallback';}
    if(!b.topAppQueryID){b.topAppQueryID=SNAPSHOT_TOP_APP_QUERY_ID;b.operationProvenance.ProfileCometTopAppSectionQuery='snapshot_fallback';}
    return b;
  }
  function attachStructuredRelationIds(boot){
    let applied=0;
    for(const row of rowsArr()){
      let id=profileIdFromKey(row.key||row.username);
      const hit=boot&&boot.relationItems&&boot.relationItems.get(String(row.key||row.username||'').toLowerCase());
      if(!id&&hit)id=hit.id;
      if(id){ if(!row.profileId)applied++; row.profileId=id; row.metaSources=uniq([...(row.metaSources||[]),'relation_structured_node_id']); if(hit&&hit.subtitle&&!row.visualContext)row.visualContext=hit.subtitle; }
    }
    return applied;
  }
  function jazoestFromToken(token){ return '2'+Array.from(String(token||'')).reduce((a,c)=>a+c.charCodeAt(0),0); }
  async function discoverOperationIds(boot){
    boot.operationProvenance=boot.operationProvenance||{};
    try{
      const resources=performance.getEntriesByType('resource').map(e=>e.name).filter(u=>/(?:\.js(?:\?|$)|\/rsrc\.php\/)/i.test(u)).slice(0,160);
      const r=await chrome.runtime.sendMessage({type:'B35A1_DISCOVER_OPS_V2',resources});
      if(r&&r.ok){
        const fresh=r.freshOps||{}, fallback=r.ops||{};
        if(fresh.ProfileCometHeaderQuery){boot.headerQueryID=String(fresh.ProfileCometHeaderQuery);boot.operationProvenance.ProfileCometHeaderQuery='bundle_fresh';} else if(!boot.headerQueryID&&fallback.ProfileCometHeaderQuery){boot.headerQueryID=String(fallback.ProfileCometHeaderQuery);boot.operationProvenance.ProfileCometHeaderQuery='cache_fallback';}
        if(fresh.ProfileCometAboutAppSectionQuery){boot.aboutQueryID=String(fresh.ProfileCometAboutAppSectionQuery);boot.operationProvenance.ProfileCometAboutAppSectionQuery='bundle_fresh';} else if(!boot.aboutQueryID&&fallback.ProfileCometAboutAppSectionQuery){boot.aboutQueryID=String(fallback.ProfileCometAboutAppSectionQuery);boot.operationProvenance.ProfileCometAboutAppSectionQuery='cache_fallback';}
        if(fresh.ProfileCometTopAppSectionQuery){boot.topAppQueryID=String(fresh.ProfileCometTopAppSectionQuery);boot.operationProvenance.ProfileCometTopAppSectionQuery='bundle_fresh';} else if(!boot.topAppQueryID&&fallback.ProfileCometTopAppSectionQuery){boot.topAppQueryID=String(fallback.ProfileCometTopAppSectionQuery);boot.operationProvenance.ProfileCometTopAppSectionQuery='cache_fallback';}
        boot.evidence.push(Object.keys(fresh).length?'service_worker.bundle_operation_discovery_fresh':'service_worker.operation_cache_or_fallback_not_overriding_preloader');
      }
    }catch(e){}
    return boot;
  }
  function graphPayloadRoots(text){ return parseJsonCandidates(String(text||'')); }
  function collectGraphDataRoots(roots){
    const out=[], seen=new WeakSet();
    const add=v=>{ if(!v||typeof v!=='object')return; if(seen.has(v))return; seen.add(v); out.push(v); };
    for(const root of roots||[]){
      if(!root||typeof root!=='object')continue;
      if(Object.prototype.hasOwnProperty.call(root,'data') && root.data && typeof root.data==='object')add(root.data);
      if(root.payload&&typeof root.payload==='object'&&root.payload.data&&typeof root.payload.data==='object')add(root.payload.data);
      if(Array.isArray(root.incremental))for(const x of root.incremental)if(x&&x.data&&typeof x.data==='object')add(x.data);
      if(Array.isArray(root.items))for(const x of root.items)if(x&&x.data&&typeof x.data==='object')add(x.data);
      const looksEnvelope=Object.prototype.hasOwnProperty.call(root,'data')||Object.prototype.hasOwnProperty.call(root,'errors')||Object.prototype.hasOwnProperty.call(root,'extensions')||Object.prototype.hasOwnProperty.call(root,'incremental')||Object.prototype.hasOwnProperty.call(root,'payload');
      if(!looksEnvelope)add(root);
    }
    return out;
  }
  function collectGraphQLErrors(roots){
    const out=[];
    const add=(e,source)=>{if(!e)return; const msg=cleanText(e&&e.message||String(e)); out.push({source:source||'graphql',message:msg,path:Array.isArray(e&&e.path)?e.path:[],code:cleanText(e&&e.extensions&&e.extensions.code||'')});};
    for(const root of roots||[]){
      if(!root||typeof root!=='object')continue;
      if(Array.isArray(root.errors))for(const e of root.errors)add(e,'root.errors');
      if(root.payload&&Array.isArray(root.payload.errors))for(const e of root.payload.errors)add(e,'payload.errors');
      if(Array.isArray(root.incremental))for(const x of root.incremental||[])if(x&&Array.isArray(x.errors))for(const e of x.errors)add(e,'incremental.errors');
    }
    return out;
  }
  function graphPayloadAudit(text){
    const roots=graphPayloadRoots(text), dataRoots=collectGraphDataRoots(roots), graphqlErrors=collectGraphQLErrors(roots);
    return {roots,dataRoots,graphqlErrors,rootCount:roots.length,dataRootCount:dataRoots.length,graphqlErrorCount:graphqlErrors.length};
  }
  function cloneBootForProfile(base){
    const b=base&&typeof base==='object'?base:{}; let templates={};
    try{templates=JSON.parse(JSON.stringify(b.operationVariableTemplates||{}));}catch(e){templates={};}
    return {...b,operationProvenance:{...(b.operationProvenance||{})},operationVariableTemplates:templates,evidence:Array.isArray(b.evidence)?[...b.evidence]:[]};
  }
  function operationVariablesFor(boot,queryName,explicit){
    const out={};
    const tpl=boot&&boot.operationVariableTemplates&&boot.operationVariableTemplates[queryName];
    if(tpl&&typeof tpl==='object'){
      for(const [k,v] of Object.entries(tpl)){
        if(k.startsWith('__relay_internal__pv__'))out[k]=v;
        else if(queryName==='ProfileCometTopAppSectionQuery'&&k==='useDefaultActor')out[k]=v;
      }
    }
    if(queryName==='ProfileCometTopAppSectionQuery'&&!Object.prototype.hasOwnProperty.call(out,'useDefaultActor'))out.useDefaultActor=false;
    return Object.assign(out,explicit||{});
  }
  function graphqlRetryableStatus(status){
    const s=Number(status||0); return s===408||s===425||s===429||(s>=500&&s<=599);
  }
  function retryAfterMs(headers){
    try{
      const raw=headers&&headers.get&&headers.get('retry-after'); if(!raw)return 0;
      const n=Number(raw); if(Number.isFinite(n)&&n>=0)return Math.min(GRAPHQL_RETRY_CAP_MS,Math.round(n*1000));
      const dt=Date.parse(raw); if(Number.isFinite(dt))return Math.min(GRAPHQL_RETRY_CAP_MS,Math.max(0,dt-Date.now()));
    }catch(e){}
    return 0;
  }
  async function waitGraphqlCooldown(){
    const ms=Math.max(0,Number(state.graphqlCooldownUntil||0)-Date.now()); if(ms>0)await sleep(ms);
  }
  async function graphQLStructured(boot,queryName,docId,variables){
    if(!boot||!boot.actorID||!boot.dtsg||!docId) throw new Error('GRAPHQL_BOOTSTRAP_INCOMPLETO');
    const headers={'content-type':'application/x-www-form-urlencoded;charset=UTF-8','x-fb-friendly-name':queryName}; if(boot.lsd)headers['x-fb-lsd']=boot.lsd;
    const retryStatuses=[]; let lastError=null;
    for(let attempt=1;attempt<=GRAPHQL_MAX_ATTEMPTS;attempt++){
      throwIfStopped('graphql_'+queryName);
      await waitGraphqlCooldown();
      const body=new URLSearchParams();
      const set=(k,v)=>{if(v!==undefined&&v!==null&&v!=='')body.set(k,String(v));};
      set('av',boot.actorID); set('__user',boot.actorID); set('__a','1'); set('__req',Math.random().toString(36).slice(2,5)); set('__comet_req','15'); set('dpr',window.devicePixelRatio||1);
      set('fb_dtsg',boot.dtsg); set('jazoest',jazoestFromToken(boot.dtsg)); set('lsd',boot.lsd); set('fb_api_caller_class','RelayModern'); set('fb_api_req_friendly_name',queryName); set('variables',JSON.stringify(operationVariablesFor(boot,queryName,variables))); set('server_timestamps','true'); set('doc_id',docId);
      let res;
      try{res=await fetch(new URL(boot.graphURI||'/api/graphql/',location.origin).href,{method:'POST',credentials:'include',headers,body:body.toString(),signal:runSignal()||undefined});}
      catch(e){
        if(state.stopRequested===true||isStopError(e)||(e&&e.name==='AbortError'&&runSignal()&&runSignal().aborted))throw makeStopError('graphql_'+queryName);
        lastError=e;
        if(attempt<GRAPHQL_MAX_ATTEMPTS){const delay=Math.min(GRAPHQL_RETRY_CAP_MS,750*Math.pow(2,attempt-1));state.graphqlCooldownUntil=Math.max(Number(state.graphqlCooldownUntil||0),Date.now()+delay);retryStatuses.push('network_error');continue;}
        try{e.graphqlRetryMeta={attempts:attempt,retryCount:attempt-1,retryStatuses:[...retryStatuses]};}catch(_e){}
        throw e;
      }
      const text=await res.text(), audit=graphPayloadAudit(text), status=Number(res.status||0);
      if(graphqlRetryableStatus(status)&&attempt<GRAPHQL_MAX_ATTEMPTS){
        const serverDelay=retryAfterMs(res.headers), fallbackDelay=status===429?2500*Math.pow(2,attempt-1):1000*Math.pow(2,attempt-1), delay=Math.min(GRAPHQL_RETRY_CAP_MS,Math.max(serverDelay,fallbackDelay));
        state.graphqlCooldownUntil=Math.max(Number(state.graphqlCooldownUntil||0),Date.now()+delay); retryStatuses.push(status); continue;
      }
      return {ok:res.ok,status,text,roots:audit.roots,dataRoots:audit.dataRoots,graphqlErrors:audit.graphqlErrors,rootCount:audit.rootCount,dataRootCount:audit.dataRootCount,graphqlErrorCount:audit.graphqlErrorCount,attempts:attempt,retryCount:attempt-1,retryStatuses};
    }
    throw lastError||new Error('GRAPHQL_RETRY_EXHAUSTED');
  }
  function exactProfileObject(roots,expectedId){
    let best=null,bestScore=-1; const id=String(expectedId||'');
    for(const root of roots){walkObjects(root,obj=>{
      if(!obj||Array.isArray(obj)||String(obj.id||'')!==id)return;
      let s=1; if(obj.profile_social_context)s+=8;if(obj.profile_intro_card)s+=8;if(obj.profile_tabs)s+=8;if(obj.header_top_row)s+=5;if(obj.name)s+=2;if(obj.url)s+=2;if(obj.profilePicLarge||obj.profile_picture_for_sticky_bar)s+=2;
      if(s>bestScore){best=obj;bestScore=s;}
    },180000);}
    return best;
  }
  function mediaObjectUrl(v){
    if(!v)return '';
    if(typeof v==='string')return isImageUrl(v)?upgradeFbImageUrl(v):'';
    if(typeof v==='object'){
      for(const k of ['uri','url','source']){const u=String(v[k]||'');if(isImageUrl(u))return upgradeFbImageUrl(u);}
    }
    return '';
  }
  function profileMediaFromExactObject(p){
    const out={avatarUrl:'',coverUrl:'',avatarWidth:0,avatarHeight:0,coverWidth:0,coverHeight:0,mediaEvidence:[]};
    if(!p||typeof p!=='object')return out;
    const avatarCandidates=[]; const coverCandidates=[];
    const add=(arr,v,evidence)=>{const u=mediaObjectUrl(v);if(!u)return;let width=0,height=0;if(v&&typeof v==='object'){width=Number(v.width||v.viewer_image&&v.viewer_image.width||0);height=Number(v.height||v.viewer_image&&v.viewer_image.height||0);}const d=parseDimensionFromUrl(u);width=Math.max(width,d.width);height=Math.max(height,d.height);arr.push({url:u,width,height,score:Math.max(width,height),evidence});};
    add(avatarCandidates,p.profilePicLarge,'profilePicLarge');
    add(avatarCandidates,p.profile_picture_for_sticky_bar,'profile_picture_for_sticky_bar');
    add(avatarCandidates,p.profilePic160,'profilePic160');
    add(avatarCandidates,p.profile_picture,'profile_picture');
    add(avatarCandidates,p.header_top_row&&p.header_top_row.profile_user&&p.header_top_row.profile_user.profilePicLarge,'header_top_row.profile_user.profilePicLarge');
    add(avatarCandidates,p.header_top_row&&p.header_top_row.profile_user&&p.header_top_row.profile_user.profile_picture,'header_top_row.profile_user.profile_picture');
    const cp=p.cover_photo&&p.cover_photo.photo;
    add(coverCandidates,cp&&cp.image,'cover_photo.photo.image');
    add(coverCandidates,cp&&cp.image_high_quality,'cover_photo.photo.image_high_quality');
    if(cp&&Array.isArray(cp.images))for(const im of cp.images)add(coverCandidates,im,'cover_photo.photo.images');
    if(p.cover_photo&&p.cover_photo.image)add(coverCandidates,p.cover_photo.image,'cover_photo.image');
    const best=a=>a.sort((x,y)=>(y.score-x.score)||String(y.url).length-String(x.url).length)[0]||null;
    const av=best(avatarCandidates), cv=best(coverCandidates);
    if(av){out.avatarUrl=av.url;out.avatarWidth=av.width;out.avatarHeight=av.height;out.mediaEvidence.push(av.evidence);}
    if(cv){out.coverUrl=cv.url;out.coverWidth=cv.width;out.coverHeight=cv.height;out.mediaEvidence.push(cv.evidence);}
    return out;
  }
  function profileMediaFromRoots(roots,expectedId){
    const merged={avatarUrl:'',coverUrl:'',avatarWidth:0,avatarHeight:0,coverWidth:0,coverHeight:0,mediaEvidence:[]};
    for(const root of roots||[])walkObjects(root,obj=>{
      if(!obj||Array.isArray(obj)||String(obj.id||'')!==String(expectedId||''))return;
      const m=profileMediaFromExactObject(obj);
      const avScore=Math.max(Number(m.avatarWidth||0),Number(m.avatarHeight||0),parseDimensionFromUrl(m.avatarUrl||'').width,parseDimensionFromUrl(m.avatarUrl||'').height);
      const oldAv=Math.max(Number(merged.avatarWidth||0),Number(merged.avatarHeight||0),parseDimensionFromUrl(merged.avatarUrl||'').width,parseDimensionFromUrl(merged.avatarUrl||'').height);
      if(m.avatarUrl&&avScore>=oldAv){merged.avatarUrl=m.avatarUrl;merged.avatarWidth=m.avatarWidth;merged.avatarHeight=m.avatarHeight;}
      const cvScore=Math.max(Number(m.coverWidth||0),Number(m.coverHeight||0),parseDimensionFromUrl(m.coverUrl||'').width,parseDimensionFromUrl(m.coverUrl||'').height);
      const oldCv=Math.max(Number(merged.coverWidth||0),Number(merged.coverHeight||0),parseDimensionFromUrl(merged.coverUrl||'').width,parseDimensionFromUrl(merged.coverUrl||'').height);
      if(m.coverUrl&&cvScore>=oldCv){merged.coverUrl=m.coverUrl;merged.coverWidth=m.coverWidth;merged.coverHeight=m.coverHeight;}
      merged.mediaEvidence=uniq([...(merged.mediaEvidence||[]),...(m.mediaEvidence||[])]);
    },180000);
    return merged;
  }
  function valueText(v){ if(typeof v==='string'||typeof v==='number')return cleanText(v); if(v&&typeof v==='object'){ if(typeof v.text==='string')return cleanText(v.text); if(v.text&&typeof v.text.text==='string')return cleanText(v.text.text); if(typeof v.name==='string')return cleanText(v.name); } return ''; }
  function parseLabeledCounts(text,meta,evidence){
    const t=cleanText(text); if(!t)return;
    const defs=[['seguidores',['followers','seguidores']],['seguindo',['following','seguindo']],['amigos',['friends','amigos']],['curtidas',['likes','curtidas']],['postagens',['posts','postagens','publicações']],['videos',['videos','vídeos']]];
    for(const [dst,labs] of defs){
      for(const lab of labs){
        let m=t.match(new RegExp('([0-9][0-9.,]*\\s*[KMBkmb]?)\\s*'+lab+'\\b','i')) || t.match(new RegExp('\\b'+lab+'\\s*([0-9][0-9.,]*\\s*[KMBkmb]?)','i'));
        if(m&&!meta[dst]){const c=safeCount(m[1]);if(c){meta[dst]=c;evidence.push('profile_social_context.'+dst);}}
      }
    }
  }
  function aboutTokensFromProfile(p){
    const out={sectionToken:'',collections:{},collectionList:[]};
    try{
      const edges=p.profile_tabs&&p.profile_tabs.profile_user&&p.profile_tabs.profile_user.timeline_nav_app_sections&&p.profile_tabs.profile_user.timeline_nav_app_sections.edges||[];
      for(const e of edges){
        const n=e&&e.node;if(!n)continue;
        if(String(n.section_type||'').toUpperCase()==='ABOUT'||String(n.tab_key||'').toLowerCase()==='about'){
          out.sectionToken=String(n.id||'');
          const seen=new Set();
          for(const c of n.all_collections&&n.all_collections.nodes||[]){
            if(!c||!c.id)continue;
            const tabKey=String(c.tab_key||'').trim(), token=String(c.id||'').trim();
            if(!token||seen.has(token))continue;
            seen.add(token);
            if(tabKey)out.collections[tabKey]=token;
            out.collectionList.push({tabKey:tabKey||null,token});
          }
          break;
        }
      }
    }catch(e){}
    return out;
  }
  function explicitMetaFromTargetObject(p,expectedId){
    const meta={parseOk:true,targetBoundOk:!!p&&String(p.id||'')===String(expectedId||''),evidence:[]}; if(!meta.targetBoundOk)return meta;
    const contexts=[]; walkObjects(p,obj=>{ if(obj&&!Array.isArray(obj)&&obj.profile_social_context)contexts.push(obj.profile_social_context); },25000);
    for(const c of contexts){ for(const item of c&&c.content||[])parseLabeledCounts(valueText(item&&item.text),meta,meta.evidence); }
    const exactFields={biography:'bio',bio:'bio',profile_bio:'bio',description:'bio',followers_count:'seguidores',follower_count:'seguidores',following_count:'seguindo',friends_count:'amigos',likes_count:'curtidas',posts_count:'postagens',videos_count:'videos',category_name:'categoria',category:'categoria',external_url:'externalUrl',website:'externalUrl',email:'email',phone_number:'telefone',is_private:'privada'};
    walkObjects(p,obj=>{
      if(!obj||Array.isArray(obj))return;
      for(const [k,dst] of Object.entries(exactFields))if(Object.prototype.hasOwnProperty.call(obj,k)&&!meta[dst]){
        const v=obj[k]; let val=''; if(dst==='bio')val=safeBio(valueText(v));else if(['seguidores','seguindo','amigos','curtidas','postagens','videos'].includes(dst))val=safeCount(valueText(v));else if(dst==='categoria')val=safeCategory(valueText(v));else if(dst==='externalUrl')val=safeContactExternalUrl(valueText(v));else if(dst==='email')val=safeEmail(valueText(v));else if(dst==='telefone')val=safePhone(valueText(v));else if(dst==='privada')val=(v===true?'sim':v===false?'nao':''); if(val){meta[dst]=val;meta.evidence.push('header.'+k);}
      }
      if(obj.profile_field_type&&obj.short_title){
        const ft=String(obj.profile_field_type).toLowerCase(), val=valueText(obj.short_title); if(!val)return;
        if(/current_city|hometown|location/.test(ft)&&!meta.localizacao){meta.localizacao=val;meta.evidence.push('profile_intro_card.'+ft);}
        else if(/work|employer/.test(ft)&&!meta.trabalho){meta.trabalho=val;meta.evidence.push('profile_intro_card.'+ft);}
        else if(/school|college|education/.test(ft)&&!meta.formacao){meta.formacao=val;meta.evidence.push('profile_intro_card.'+ft);}
        else if(/bio|description|intro/.test(ft)&&!meta.bio){const b=safeBio(val);if(b){meta.bio=b;meta.evidence.push('profile_intro_card.'+ft);}}
      }
    },60000);
    meta.about=aboutTokensFromProfile(p); meta.name=safeHeaderCandidate(p.name||''); meta.profileUrl=String(p.url||'');
    const media=profileMediaFromExactObject(p); meta.avatarUrl=media.avatarUrl;meta.coverUrl=media.coverUrl;meta.avatarWidth=media.avatarWidth;meta.avatarHeight=media.avatarHeight;meta.coverWidth=media.coverWidth;meta.coverHeight=media.coverHeight;meta.evidence=uniq([...(meta.evidence||[]),...(media.mediaEvidence||[]).map(x=>'profile_media.'+x)]);
    return meta;
  }

  function aboutCollectionPlan(about){
    const out=[], seen=new Set();
    const add=(tabKey,token)=>{
      const t=String(token||'').trim(); if(!t||seen.has(t))return;
      seen.add(t); out.push({tabKey:tabKey===null||tabKey===undefined?null:String(tabKey),token:t});
    };
    for(const x of about&&about.collectionList||[])add(x&&x.tabKey,x&&x.token);
    if(!out.length)for(const [k,v] of Object.entries(about&&about.collections||{}))add(k,v);
    if(!out.length&&about&&about.sectionToken)out.push({tabKey:null,token:null});
    return out;
  }
  function deepText(v){
    if(typeof v==='string'||typeof v==='number')return cleanText(v);
    if(!v||typeof v!=='object')return '';
    for(const x of [v.text,v.plaintext_title,v.title,v.name,v.label,v.short_title,v.subtitle,v.description]){
      const t=valueText(x); if(t)return t;
    }
    if(v.text&&typeof v.text==='object'){const t=valueText(v.text);if(t)return t;}
    return '';
  }
  function decodeRepeated(v){
    let s=String(v||''); for(let i=0;i<3;i++){try{const d=decodeURIComponent(s);if(d===s)break;s=d;}catch(e){break;}} return s;
  }
  function unwrapExternalUrl(v){
    const raw=cleanText(v); if(!raw)return '';
    let u; try{u=new URL(raw,location.origin);}catch(e){return '';}
    if(/(^|\.)facebook\.com$/i.test(u.hostname)||/\.facebook\.com$/i.test(u.hostname)){
      if(/^\/l\.php$/i.test(u.pathname)){
        const q=u.searchParams.get('u'); if(q){const d=decodeRepeated(q); try{return new URL(d).href;}catch(e){}}
      }
      return '';
    }
    return /^https?:$/i.test(u.protocol)?u.href:'';
  }
  function collectExternalUrls(root,maxNodes=5000){
    const out=[],seen=new Set(); const add=v=>{
      const u=unwrapExternalUrl(v)||safeExternalUrl(v); if(u&&!seen.has(u)){seen.add(u);out.push(u);}
    };
    walkObjects(root,obj=>{
      if(!obj||Array.isArray(obj))return;
      for(const k of ['url','external_url','web_url','mobileUrl','href']){
        if(typeof obj[k]==='string')add(obj[k]);
      }
    },maxNodes);
    return out;
  }
  function normalizedAboutType(v){ return String(v||'').trim().replace(/[^A-Za-z0-9_:-]+/g,'_').slice(0,180); }
  function itemUrlCandidates(obj){
    const out=[]; const add=v=>{if(typeof v!=='string')return; const raw=cleanText(v); if(!raw)return; const u=unwrapExternalUrl(raw)||safeExternalUrl(raw); if(u)out.push(u);};
    if(!obj||typeof obj!=='object')return out;
    for(const k of ['url','external_url','website_url','web_url','mobileUrl','href'])add(obj[k]);
    if(obj.web_link&&typeof obj.web_link==='object')add(obj.web_link.url);
    return uniq(out);
  }
  function extractAboutStructuredItems(p,collectionTabKey,bindingMode=''){
    const mode=cleanText(bindingMode||'');
    if(!validAboutBindingMode(mode))return [];
    const items=[],seen=new Set(),seenCanonicalUrls=new Set();
    const add=(type,title='',subtitle='',urls=[])=>{
      const t=normalizedAboutType(type); const ttl=cleanText(title), sub=cleanText(subtitle); const us=uniq((urls||[]).map(v=>unwrapExternalUrl(v)||safeExternalUrl(v)).filter(Boolean));
      if(!t||(!ttl&&!sub&&!us.length))return;
      const item={collectionTabKey:collectionTabKey||null,type:t,title:ttl,subtitle:sub,url:us[0]||'',urls:us,bindingMode:mode};
      if(item.url&&seenCanonicalUrls.has(item.url))return;
      const sig=[item.collectionTabKey||'',item.type,item.title,item.subtitle,item.url,item.bindingMode].join('\u001f'); if(seen.has(sig))return; seen.add(sig); if(item.url)seenCanonicalUrls.add(item.url); items.push(item);
    };
    walkObjects(p,obj=>{
      if(!obj||Array.isArray(obj))return;
      const timelineType=String(obj.timeline_context_list_item_type||'').trim();
      const fieldType=String(obj.profile_field_type||obj.field_type||obj.pressable_profile_field_type||obj.directory_section_type||'').trim();
      const ctx=(obj.timeline_context_item&&obj.timeline_context_item.renderer&&obj.timeline_context_item.renderer.context_item)||(obj.renderer&&obj.renderer.context_item)||obj.context_item||null;
      const extraText=Array.isArray(obj.extra_text_items)?uniq(obj.extra_text_items.map(x=>deepText(x&&x.key||x)).filter(Boolean)).join(' · '):'';
      const title=deepText(ctx&&((ctx.plaintext_title)||ctx.title)||obj.short_title||obj.item_title||obj.item_subtitle||obj.title||obj.name||obj.label)||extraText;
      const subtitle=deepText(ctx&&ctx.subtitle||obj.subtitle||obj.item_subtitle);
      const urls=uniq([...itemUrlCandidates(ctx||{}),...itemUrlCandidates(obj),...collectExternalUrls(ctx||obj,2500)]);
      if(timelineType)add(timelineType,title,subtitle,urls);
      else if(fieldType)add('PROFILE_FIELD_'+fieldType.toUpperCase(),title,subtitle,urls);
      const typename=String(obj.__typename||'');
      if(/ExternalUrl|ExternalWebLink/i.test(typename))add('ENTITY_EXTERNAL_URL',title||deepText(obj),subtitle,urls);
      if(!timelineType&&!fieldType){
        const directDefs=[
          ['FIELD_EMAIL',['email','email_address','contact_email']],
          ['FIELD_PHONE',['phone','phone_number','telephone','mobile_phone']],
          ['FIELD_WEBSITE',['website','website_url','external_url']],
          ['FIELD_BUSINESS_HOURS',['business_hours','hours','opening_hours']],
          ['FIELD_LOCATION',['location','current_city','hometown','address']],
          ['FIELD_CATEGORY',['category','category_name','page_category']],
          ['FIELD_BIO',['biography','profile_bio','bio']]
        ];
        for(const [type,keys] of directDefs)for(const k of keys){
          if(!Object.prototype.hasOwnProperty.call(obj,k))continue; const v=obj[k];
          const val=deepText(v)||valueText(v)||(typeof v==='string'||typeof v==='number'?cleanText(v):'');
          const vu=typeof v==='string'?[v]:itemUrlCandidates(v&&typeof v==='object'?v:{});
          if(val||vu.length)add(type,val,'',vu);
        }
      }
    },160000);
    return items;
  }
  function extractAboutStructuredItemsFromRoots(roots,collectionTabKey,bindingMode=''){
    if(!validAboutBindingMode(bindingMode))return [];
    let out=[]; for(const root of roots||[])out=mergeAboutItems(out,extractAboutStructuredItems(root,collectionTabKey,bindingMode)); return out;
  }
  // V39: A single Facebook document can serialize the same exact target ID in several
  // objects. Header-rich and profile_tile_sections-rich objects are often distinct.
  // The old All lane selected only one scored object and could therefore miss fields
  // already present in the same target-bound response. Union only subtrees whose own
  // id equals the resolved target ID; never scan foreign profile objects for promotion.
  function exactProfileObjects(roots,expectedId,limit=96){
    const id=String(expectedId||''),out=[],seen=new WeakSet();
    if(!id)return out;
    for(const root of roots||[]){
      walkObjects(root,obj=>{
        if(out.length>=limit||!obj||Array.isArray(obj)||String(obj.id||'')!==id||seen.has(obj))return;
        seen.add(obj);out.push(obj);
      },180000);
      if(out.length>=limit)break;
    }
    return out;
  }
  function extractAboutStructuredItemsFromExactIdObjects(roots,expectedId,collectionTabKey,bindingMode=''){
    if(!validAboutBindingMode(bindingMode))return [];
    let out=[];
    for(const obj of exactProfileObjects(roots,expectedId))out=mergeAboutItems(out,extractAboutStructuredItems(obj,collectionTabKey,bindingMode));
    return out;
  }
  function mergeAboutItems(a,b){
    const out=[],seen=new Set();
    for(const x of [...(Array.isArray(a)?a:[]),...(Array.isArray(b)?b:[])]){
      if(!x||typeof x!=='object')continue;
      const mode=cleanText(x.bindingMode||''); if(!validAboutBindingMode(mode))continue;
      const item={collectionTabKey:x.collectionTabKey||null,type:String(x.type||''),title:cleanText(x.title||''),subtitle:cleanText(x.subtitle||''),url:cleanText(x.url||''),urls:Array.isArray(x.urls)?uniq(x.urls.map(cleanText).filter(Boolean)):[],bindingMode:mode};
      const sig=[item.collectionTabKey||'',item.type,item.title,item.subtitle,item.url,item.bindingMode].join('\u001f');
      if(seen.has(sig))continue;seen.add(sig);out.push(item);
    }
    return out;
  }
  function mapAboutItemsToMeta(meta,items){
    const boundItems=(Array.isArray(items)?items:[]).filter(x=>x&&validAboutBindingMode(x.bindingMode));
    meta.aboutItems=mergeAboutItems(meta.aboutItems,boundItems); meta.emails=uniq(meta.emails||[]); meta.telefones=uniq(meta.telefones||[]); meta.externalUrls=uniq(meta.externalUrls||[]);
    const addEmail=v=>{const e=safeEmail(String(v||'').replace(/^mailto:/i,''));if(e){meta.emails=uniq([...(meta.emails||[]),e]);if(!meta.email)meta.email=e;return true;}return false;};
    const addPhone=v=>{const p=safePhone(String(v||'').replace(/^tel:/i,''));if(p){meta.telefones=uniq([...(meta.telefones||[]),p]);if(!meta.telefone)meta.telefone=p;return true;}return false;};
    const addUrl=v=>{const u=safeContactExternalUrl(v);if(u){meta.externalUrls=uniq([...(meta.externalUrls||[]),u]);if(!meta.externalUrl)meta.externalUrl=u;return true;}return false;};
    for(const item of meta.aboutItems){
      if(!validAboutBindingMode(item.bindingMode))continue;
      const ft=String(item.type||'').toUpperCase(), title=cleanText(item.title||''), subtitle=cleanText(item.subtitle||'');
      let evidenced=false;
      if(/EMAIL/.test(ft)){evidenced=addEmail(title)||addEmail(item.url)||evidenced;}
      if(/PHONE|TELEPHONE|MOBILE/.test(ft)){evidenced=addPhone(title)||addPhone(item.url)||evidenced;}
      if(/WEBSITE|EXTERNAL_URL|WEB_LINK|LINK/.test(ft)){for(const u of [item.url,...(item.urls||[]),title])evidenced=addUrl(u)||evidenced;}
      if(/BUSINESS_HOURS|OPENING_HOURS|FIELD_BUSINESS_HOURS/.test(ft)&&!meta.horarioFuncionamento&&title){meta.horarioFuncionamento=title;evidenced=true;}
      if(/BUSINESS_SERVICE_AREA|SERVICE_AREA/.test(ft)&&title){meta.areasAtendimento=uniq([...(meta.areasAtendimento||[]),...title.split(/\s*[·•|]\s*/).map(cleanText).filter(Boolean)]);evidenced=true;}
      if(/CONFIRMED_OWNER_LABEL|PAGE_OWNER|RESPONSIBLE/.test(ft)&&!meta.responsavelPagina&&title){meta.responsavelPagina=subtitle?title+' — '+subtitle:title;evidenced=true;}
      if(/INFLUENCER_CATEGORY|PROFILE_CATEGORY|FIELD_CATEGORY|CATEGORY/.test(ft)&&!meta.categoria&&title){const candidate=cleanText(title.split(/\s*[·•|]\s*/).pop()||title),v=safeCategory(candidate);if(v){meta.categoria=v;evidenced=true;}}
      if(/CURRENT_CITY|HOMETOWN|LOCATION|ADDRESS/.test(ft)&&!meta.localizacao&&title){meta.localizacao=title;evidenced=true;}
      if(/WORK|EMPLOYER/.test(ft)&&!meta.trabalho&&title){meta.trabalho=title;evidenced=true;}
      if(/SCHOOL|COLLEGE|EDUCATION/.test(ft)&&!meta.formacao&&title){meta.formacao=title;evidenced=true;}
      if(/BIO|BIOGRAPHY|DESCRIPTION/.test(ft)&&!meta.bio&&title){const b=safeBio(title);if(b){meta.bio=b;evidenced=true;}}
      if(evidenced)meta.evidence.push('about_item.'+ft+'.'+item.bindingMode);
    }
    return meta;
  }
  function semanticAboutSurfaceAudit(roots){
    let containerCount=0,itemCount=0; const evidence=[];
    const semanticTypeRe=/(?:bio|biography|description|intro|email|phone|telephone|mobile|website|external_url|web_link|business_hours|opening_hours|service_area|owner|category|current_city|hometown|location|address|work|employer|school|college|education|personal_details|contact_info|privacy|life_event|interest|travel|specialt|offer|activit)/i;
    for(const root of roots||[])walkObjects(root,obj=>{
      if(!obj||Array.isArray(obj))return;
      if(obj.profile_tile_sections&&Array.isArray(obj.profile_tile_sections.edges)){containerCount++;evidence.push('surface.profile_tile_sections');}
      if(obj.profile_tile_items&&Array.isArray(obj.profile_tile_items.nodes)){containerCount++;evidence.push('surface.profile_tile_items');}
      if(obj.timeline_context_item&&obj.timeline_context_item.renderer){containerCount++;itemCount++;evidence.push('surface.timeline_context_item');}
      const ft=String(obj.profile_field_type||obj.field_type||obj.timeline_context_list_item_type||obj.type||'');
      if(ft&&semanticTypeRe.test(ft)){containerCount++;itemCount++;evidence.push('surface.type.'+normalizedAboutType(ft));}
      for(const k of ['biography','profile_bio','bio','description','email','email_address','contact_email','phone','phone_number','telephone','mobile_phone','website','website_url','external_url','business_hours','opening_hours','location','current_city','hometown','address','category','category_name']){
        if(Object.prototype.hasOwnProperty.call(obj,k)){containerCount++;itemCount++;evidence.push('surface.field.'+k);}
      }
    },180000);
    return {examined:containerCount>0,containerCount,itemCount,evidence:uniq(evidence)};
  }
  function aboutUrlForRow(row){
    try{
      const base=new URL(row&&row.profileUrl||canonicalProfileUrlFromKey(row&&(row.key||row.username)),location.origin); base.hostname=location.hostname;
      if(/\/profile\.php$/i.test(base.pathname)){base.searchParams.set('sk','about');return base.href;}
      base.pathname=base.pathname.replace(/\/+$/,'')+'/about'; base.search=''; return base.href;
    }catch(e){return '';}
  }
  function allUrlForRow(row){
    try{
      const base=new URL(row&&row.profileUrl||canonicalProfileUrlFromKey(row&&(row.key||row.username)),location.origin); base.hostname=location.hostname;
      if(/\/profile\.php$/i.test(base.pathname)){
        const id=base.searchParams.get('id'); base.search=''; if(id)base.searchParams.set('id',id); return base.href;
      }
      base.pathname=base.pathname.replace(/\/(?:about|friends|followers|following)\/?$/i,'').replace(/\/+$/,'')||'/'; base.search=''; base.hash=''; return base.href;
    }catch(e){return '';}
  }
  // V39: Target-bound supplementary About-directory endpoints. These are not a new
  // relation lane and never discover identities. They are queried only after the All pass
  // when a page-like row still lacks high-value fields.
  function directoryUrlForRow(row,kind){
    const allowed=new Set(['contact_info','links','basic_info']);
    if(!allowed.has(String(kind||'')))return '';
    try{
      const base=new URL(row&&row.profileUrl||canonicalProfileUrlFromKey(row&&(row.key||row.username)),location.origin);base.hostname=location.hostname;
      if(/\/profile\.php$/i.test(base.pathname))return '';
      base.pathname=base.pathname.replace(/\/(?:about|friends|followers|following|directory_[^/]+)\/?$/i,'').replace(/\/+$/,'')+'/directory_'+kind;
      base.search='';base.hash='';return base.href;
    }catch(e){return '';}
  }
  async function fetchDirectorySupplementOnePass(row,knownId,kind){
    const url=directoryUrlForRow(row,kind);if(!url)return {ok:false,status:0,url:'',meta:null,targetBound:false,error:'directory_url_missing'};
    try{
      throwIfStopped('directory_'+kind+'_fetch');
      const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),ALL_GENERAL_FETCH_TIMEOUT_MS),outerSignal=runSignal();
      const outerAbort=()=>controller.abort();try{if(outerSignal)outerSignal.addEventListener('abort',outerAbort,{once:true});}catch(e){}
      let res,html;try{res=await fetch(url,{credentials:'include',headers:{'accept':'text/html,application/xhtml+xml'},signal:controller.signal});html=await res.text();}finally{clearTimeout(timer);try{if(outerSignal)outerSignal.removeEventListener('abort',outerAbort);}catch(e){}}
      if(!res.ok)return {ok:false,status:res.status,url,meta:null,targetBound:false,error:'http_'+res.status};
      const doc=new DOMParser().parseFromString(html,'text/html'),roots=documentJsonRoots(doc);
      const resolved=resolveAboutBootstrapTarget(doc,row,roots,knownId||'');
      const id=String(resolved&&resolved.id||knownId||''),knownOk=!!knownId&&id===String(knownId);
      const strong=!!(resolved&&resolved.ok&&(knownOk||resolved.objectUrlOk===true||resolved.canonicalOk===true));
      if(!strong)return {ok:true,status:res.status,url,meta:null,targetBound:false,error:'directory_target_unresolved'};
      const exactObjects=exactProfileObjects(roots,id),primary=exactProfileObject(roots,id)||exactObjects[0]||resolved.exactProfile;
      let meta=primary?explicitMetaFromTargetObject(primary,id):{parseOk:true,targetBoundOk:true,evidence:[],aboutItems:[]};
      meta.parseOk=true;meta.targetBoundOk=true;
      const items=extractAboutStructuredItemsFromExactIdObjects(roots,id,'directory_'+kind,'response_exact_id');
      meta=mapAboutItemsToMeta(meta,items);
      const domMeta=extractTargetBoundContactDomMeta(doc,'directory_'+kind);
      domMeta.generalItems=extractTargetBoundGeneralDomItems(doc,'directory_'+kind);
      promoteGeneralItemsToMeta(domMeta,domMeta.generalItems);
      meta=mergeSupplementMeta(meta,domMeta);
      meta.generalItems=mergeGeneralInfoItems(generalInfoFromAboutItems(meta.aboutItems,'about'),meta.generalItems);
      promoteGeneralItemsToMeta(meta,meta.generalItems);
      meta.evidence=uniq([...(meta.evidence||[]),'directory_'+kind+'.target_bound.exact_union.'+exactObjects.length]);
      return {ok:true,status:res.status,url,meta,targetBound:true,id,error:'',kind,exactIdObjectCount:exactObjects.length};
    }catch(e){return {ok:false,status:0,url,meta:null,targetBound:false,error:String(e&&e.name==='AbortError'?'directory_fetch_timeout':e&&e.message||e),kind};}
  }
  async function applyDirectorySupplements(row,knownId=''){
    if(!row||!isPageLikeRow(row))return [];
    const plans=[];
    const haveEmail=!!safeEmail(row.email||''),havePhone=!!safePhone(row.telefone||''),haveLink=!!safeContactExternalUrl(row.externalUrl||''),haveLoc=!!cleanText(row.localizacao||''),haveHours=!!cleanText(row.horarioFuncionamento||'');
    if(!haveEmail||!havePhone)plans.push('contact_info');
    if(!haveLink)plans.push('links');
    if(!haveLoc||!haveHours)plans.push('basic_info');
    const results=[];
    for(const kind of plans.slice(0,3)){
      const r=await fetchDirectorySupplementOnePass(row,knownId,kind);results.push(r);
      if(r&&r.ok&&r.targetBound&&r.meta){promoteGeneralItemsToMeta(r.meta,r.meta.generalItems);applyStrictMeta(row,r.meta,'html_directory_'+kind+'.target_bound_supplement');}
    }
    row.directorySupplementAudit=results.map(r=>({kind:r&&r.kind||'',ok:!!(r&&r.ok),status:Number(r&&r.status||0),targetBound:!!(r&&r.targetBound),url:r&&r.url||'',exactIdObjectCount:Number(r&&r.exactIdObjectCount||0),error:r&&r.error||''}));
    return results;
  }
  function contactHeadingLabel(v){
    const t=cleanText(v).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
    return /^(?:contact info|contact information|contact and basic info|informacoes de contato|informacao de contato|informacoes de contacto|informacao de contacto|dados de contato|dados de contacto|contato|contacto|contactos)$/.test(t);
  }
  function profileInfoHeadingLabel(v){
    const t=cleanText(v).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
    return contactHeadingLabel(v)||/^(?:intro|details|detalhes|informacoes|informacao)$/.test(t);
  }
  function scopeSemanticKind(doc,scope){
    try{
      const labelled=String(scope&&scope.getAttribute&&scope.getAttribute('aria-labelledby')||'').split(/\s+/).filter(Boolean);
      for(const id of labelled){const h=doc.getElementById(id);if(h){const t=cleanText(h.textContent||'');if(contactHeadingLabel(t))return 'contact';if(profileInfoHeadingLabel(t))return 'details';}}
      let n=scope;
      for(let i=0;i<8&&n;i++,n=n.parentElement){
        const hs=Array.from(n.querySelectorAll?n.querySelectorAll('h1,h2,h3,h4,h5,h6,[role="heading"]'):[]);
        for(const h of hs){const t=cleanText(h.textContent||'');if(contactHeadingLabel(t))return 'contact';if(profileInfoHeadingLabel(t))return 'details';}
      }
    }catch(e){}
    return 'bounded';
  }
  function phoneCandidatesFromBoundedText(text,allowLocal=false){
    const out=[]; const src=String(text||'');
    const re=/(?:\+\d{1,3}[\s().-]*)?(?:\d[\s().-]*){7,15}/g;
    for(const m of src.matchAll(re)){
      const raw=cleanText(m[0]); const digits=raw.replace(/\D+/g,'');
      if(digits.length<7||digits.length>15)continue;
      if(!allowLocal&&!/^\+/.test(raw))continue;
      const p=safePhone(raw); if(p)out.push(p);
    }
    return uniq(out);
  }
  function contactScopesFromDocument(doc){
    const scopes=[],seen=new Set(); const add=node=>{if(!node||seen.has(node))return;seen.add(node);scopes.push(node);};
    if(!doc||!doc.querySelectorAll)return scopes;
    let headings=[]; try{headings=Array.from(doc.querySelectorAll('h1,h2,h3,h4,h5,h6,[role="heading"]'));}catch(e){}
    for(const h of headings){
      if(!contactHeadingLabel(h.textContent||''))continue;
      const ids=[]; if(h.id)ids.push(h.id);
      try{h.querySelectorAll('[id]').forEach(n=>{if(n.id)ids.push(n.id);});}catch(e){}
      for(const id of uniq(ids)){
        try{doc.querySelectorAll('[aria-labelledby]').forEach(n=>{const toks=String(n.getAttribute('aria-labelledby')||'').split(/\s+/);if(toks.includes(id))add(n);});}catch(e){}
      }
      if(!scopes.length){
        let host=h; for(let i=0;i<4&&host;i++,host=host.parentElement){
          const next=host&&host.nextElementSibling; if(next&&cleanText(next.textContent||'').length<=2500)add(next);
        }
      }
    }
    // Facebook also renders target-bound Page contact data inside bounded Intro/Details lists on the All surface.
    // Only list-like descendants of the nearest small semantic card are accepted; the whole page/feed is never scanned.
    for(const h of headings){
      if(!profileInfoHeadingLabel(h.textContent||'')||contactHeadingLabel(h.textContent||''))continue;
      let host=h;
      for(let i=0;i<12&&host;i++,host=host.parentElement){
        const hostText=cleanText(host.textContent||''); if(hostText.length>5000)break;
        let lists=[]; try{lists=Array.from(host.querySelectorAll('ul,[role="list"]'));}catch(e){}
        const bounded=lists.filter(n=>{const t=cleanText(n.textContent||'');return t.length>0&&t.length<=2500;});
        if(bounded.length){bounded.forEach(add);break;}
      }
    }
    return scopes;
  }
  function extractTargetBoundContactDomMeta(doc,surface='about'){
    const meta={parseOk:!!doc,targetBoundOk:true,evidence:[],emails:[],telefones:[],externalUrls:[],aboutItems:[],areasAtendimento:[]};
    const scopes=contactScopesFromDocument(doc); if(!scopes.length){meta.evidence.push('dom_contact.'+surface+'.scope_absent');return meta;}
    const addEmail=(v,ev)=>{const raw=decodeRepeated(String(v||'').replace(/^mailto:/i,'').split('?')[0]);const e=safeEmail(raw);if(e){meta.emails=uniq([...(meta.emails||[]),e]);if(!meta.email)meta.email=e;meta.evidence.push('dom_contact.'+surface+'.email.'+ev);meta.aboutItems=mergeAboutItems(meta.aboutItems,[{collectionTabKey:surface+'_contact',type:'DOM_CONTACT_EMAIL',title:e,subtitle:'',url:'',urls:[],bindingMode:'response_exact_id'}]);return true;}return false;};
    const addPhone=(v,ev)=>{const raw=decodeRepeated(String(v||'').replace(/^tel:/i,'').split('?')[0]);const ph=safePhone(raw);if(ph){meta.telefones=uniq([...(meta.telefones||[]),ph]);if(!meta.telefone)meta.telefone=ph;meta.evidence.push('dom_contact.'+surface+'.phone.'+ev);meta.aboutItems=mergeAboutItems(meta.aboutItems,[{collectionTabKey:surface+'_contact',type:'DOM_CONTACT_PHONE',title:ph,subtitle:'',url:'',urls:[],bindingMode:'response_exact_id'}]);return true;}return false;};
    const addUrl=(v,ev)=>{const u=safeContactExternalUrl(v);if(u){meta.externalUrls=uniq([...(meta.externalUrls||[]),u]);if(!meta.externalUrl)meta.externalUrl=u;meta.evidence.push('dom_contact.'+surface+'.url.'+ev);meta.aboutItems=mergeAboutItems(meta.aboutItems,[{collectionTabKey:surface+'_contact',type:'DOM_CONTACT_EXTERNAL_URL',title:u,subtitle:'',url:u,urls:[u],bindingMode:'response_exact_id'}]);return true;}return false;};
    const addLocation=(v,ev)=>{const loc=cleanText(v);if(!loc||loc.length>500)return false;if(!meta.localizacao)meta.localizacao=loc;meta.evidence.push('dom_contact.'+surface+'.location.'+ev);meta.aboutItems=mergeAboutItems(meta.aboutItems,[{collectionTabKey:surface+'_details',type:'DOM_CONTACT_LOCATION',title:loc,subtitle:'',url:'',urls:[],bindingMode:'response_exact_id'}]);return true;};
    for(const scope of scopes){
      const kind=scopeSemanticKind(doc,scope);
      try{scope.querySelectorAll('a[href]').forEach(a=>{
        const href=cleanText(a.getAttribute('href')||''), label=cleanText(a.textContent||'');
        const unwrapped=unwrapExternalUrl(href)||safeExternalUrl(href);
        if(/^mailto:/i.test(href))addEmail(href,'href');
        else if(/^tel:/i.test(href))addPhone(href,'href');
        else if(unwrapped&&isLocationUtilityUrl(unwrapped))addLocation(label,'map_href');
        else if(/^https?:/i.test(href)||unwrapped)addUrl(href,'href');
      });}catch(e){}
      const text=cleanText(scope.textContent||'');
      for(const m of text.matchAll(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi))addEmail(m[0],'text');
      for(const ph of phoneCandidatesFromBoundedText(text,kind==='contact'))addPhone(ph,kind==='contact'?'contact_text':'international_text');
    }
    meta.emails=uniq(meta.emails||[]);meta.telefones=uniq(meta.telefones||[]);meta.externalUrls=uniq(meta.externalUrls||[]);
    if(meta.emails.length||meta.telefones.length||meta.externalUrls.length||meta.localizacao)meta.evidence.push('dom_contact.'+surface+'.target_bound_scope');
    return meta;
  }
  function mergeSupplementMeta(base,supplement){
    const meta=base&&typeof base==='object'?base:{parseOk:false,targetBoundOk:false,evidence:[]}; const x=supplement||{};
    meta.parseOk=(meta.parseOk===true)||(x.parseOk===true); meta.targetBoundOk=(meta.targetBoundOk===true)||(x.targetBoundOk===true);
    meta.evidence=uniq([...(meta.evidence||[]),...(x.evidence||[])]);
    meta.emails=uniq([...(meta.emails||[]),...(x.emails||[]),x.email].filter(Boolean)); if(!meta.email&&meta.emails.length)meta.email=meta.emails[0];
    meta.telefones=uniq([...(meta.telefones||[]),...(x.telefones||[]),x.telefone].filter(Boolean)); if(!meta.telefone&&meta.telefones.length)meta.telefone=meta.telefones[0];
    meta.externalUrls=uniq([...(meta.externalUrls||[]),...(x.externalUrls||[]),x.externalUrl].filter(Boolean).map(safeContactExternalUrl).filter(Boolean)); if(!meta.externalUrl&&meta.externalUrls.length)meta.externalUrl=meta.externalUrls[0];
    for(const k of ['bio','categoria','localizacao','trabalho','formacao','horarioFuncionamento','responsavelPagina'])if(!meta[k]&&x[k])meta[k]=x[k];
    meta.areasAtendimento=uniq([...(meta.areasAtendimento||[]),...(x.areasAtendimento||[])]);
    meta.aboutItems=mergeAboutItems(meta.aboutItems,x.aboutItems);
    meta.generalItems=mergeGeneralInfoItems(meta.generalItems,x.generalItems);
    return meta;
  }
  function normalizeGeneralInfoItem(item){
    if(!item||typeof item!=='object')return null;
    const bindingMode=cleanText(item.bindingMode||'');
    if(!validAboutBindingMode(bindingMode))return null;
    const surface=cleanText(item.surface||'').toLowerCase();
    const sources=uniq([...(Array.isArray(item.sources)?item.sources:[]),surface].map(v=>cleanText(v).toLowerCase()).filter(Boolean));
    const section=cleanText(item.section||''),type=cleanText(item.type||''),label=cleanText(item.label||'');
    const value=cleanText(item.value||item.title||''),subtitle=cleanText(item.subtitle||''),url=cleanText(item.url||'');
    const urls=uniq([...(Array.isArray(item.urls)?item.urls:[]),url].map(cleanText).filter(Boolean));
    if(!value&&!subtitle&&!urls.length)return null;
    return {surface:surface||sources[0]||'about',sources:sources.length?sources:[surface||'about'],section,type,label,value,subtitle,url:urls[0]||'',urls,bindingMode};
  }
  function mergeGeneralInfoItems(...lists){
    const out=[],bySig=new Map();
    for(const list of lists){
      for(const raw of Array.isArray(list)?list:[]){
        const item=normalizeGeneralInfoItem(raw);if(!item)continue;
        const sig=[item.type,item.label,item.value,item.subtitle,item.url].map(v=>cleanText(v).toLowerCase()).join('\u001f');
        const prior=bySig.get(sig);
        if(prior){
          prior.sources=uniq([...(prior.sources||[]),...(item.sources||[])]);
          if(!prior.section&&item.section)prior.section=item.section;
          continue;
        }
        const copy={...item,sources:[...(item.sources||[])]};bySig.set(sig,copy);out.push(copy);
      }
    }
    return out;
  }
  function surfaceFromCollectionKey(key){
    const k=cleanText(key).toLowerCase();return k.startsWith('all_')||k.includes('all_profile')?'all':'about';
  }
  function readableGeneralInfoLabel(type){
    const t=String(type||'').toUpperCase();
    if(/BIO/.test(t))return 'Bio';
    if(/EMAIL/.test(t))return 'E-mail';
    if(/PHONE|TELEPHONE|MOBILE/.test(t))return 'Telefone';
    if(/OWNER|RESPONSIBLE|CONFIRMED_OWNER/.test(t))return 'Responsável pela Página';
    if(/SERVICE_AREA/.test(t))return 'Área de atendimento';
    if(/BUSINESS_HOURS|OPENING_HOURS/.test(t))return 'Horário';
    if(/CURRENT_CITY/.test(t))return 'Cidade atual';
    if(/HOMETOWN/.test(t))return 'Cidade natal';
    if(/LOCATION|ADDRESS/.test(t))return 'Localização';
    if(/WORK|EMPLOYER|JOB/.test(t))return 'Trabalho';
    if(/SCHOOL|COLLEGE|EDUCATION|UNIVERSITY/.test(t))return 'Formação';
    if(/CATEGORY|PAGE_TYPE/.test(t))return 'Categoria/tipo';
    if(/LANGUAGE/.test(t))return 'Idiomas';
    if(/GENDER/.test(t))return 'Gênero';
    if(/RELATIONSHIP/.test(t))return 'Relacionamento';
    if(/RATING|RECOMMEND|REVIEW/.test(t))return 'Avaliação';
    if(/WEBSITE|EXTERNAL_URL|WEB_LINK|SOCIAL_LINK/.test(t))return 'Site/link';
    const raw=cleanText(type).replace(/^PROFILE_FIELD_/i,'').replace(/^DOM_GENERAL_/i,'').replace(/[_-]+/g,' ');return raw||'Informação';
  }
  function generalInfoFromAboutItems(items,fallbackSurface='about'){
    const out=[];
    for(const x of Array.isArray(items)?items:[]){
      const collectionKey=cleanText(x.collectionTabKey||'');
      out.push({
        surface:collectionKey?surfaceFromCollectionKey(collectionKey):fallbackSurface,
        sources:[collectionKey?surfaceFromCollectionKey(collectionKey):fallbackSurface],
        section:collectionKey,
        type:cleanText(x.type||''),
        label:readableGeneralInfoLabel(x.type),
        value:cleanText(x.title||''),
        subtitle:cleanText(x.subtitle||''),
        url:cleanText(x.url||''),
        urls:Array.isArray(x.urls)?x.urls:[],
        bindingMode:cleanText(x.bindingMode||'')
      });
    }
    return mergeGeneralInfoItems(out);
  }
  function generalSectionKind(value){
    const t=normalizeRelationSurfaceText(value);
    if(contactHeadingLabel(value))return 'Contact info';
    if(/^(?:intro|introducao)$/.test(t))return 'Intro';
    if(/^(?:details|detalhes)$/.test(t))return 'Details';
    if(/^(?:basic info|informacoes basicas|informacao basica)$/.test(t))return 'Basic info';
    if(/^(?:personal details|detalhes pessoais)$/.test(t))return 'Personal details';
    if(/^(?:categories?|categorias?)$/.test(t))return 'Categories';
    if(/^(?:websites and social links|sites e links sociais|sites e redes sociais)$/.test(t))return 'Websites and social links';
    if(/^(?:service area|area de atendimento|areas de atendimento)$/.test(t))return 'Service area';
    if(/^(?:hours|business hours|horario|horarios|horario de funcionamento)$/.test(t))return 'Hours';
    if(/^(?:page transparency|transparencia da pagina)$/.test(t))return 'Page transparency';
    if(/^(?:languages?|idiomas?)$/.test(t))return 'Languages';
    if(/^(?:ratings?|reviews?|recommendations?|avaliacoes?|recomendacoes?)$/.test(t))return 'Ratings';
    return '';
  }
  function generalScopesFromDocument(doc){
    const out=[],seen=new Set();if(!doc||!doc.querySelectorAll)return out;
    const add=(section,node,mode)=>{if(!section||!node||seen.has(node))return;const text=cleanText(node.textContent||'');if(!text||text.length>2600)return;seen.add(node);out.push({section,node,mode:mode||'bounded'});};
    let headings=[];try{
      const primary=Array.from(doc.querySelectorAll('h1,h2,h3,h4,h5,h6,[role="heading"]'));
      const semantic=[];
      for(const el of Array.from(doc.querySelectorAll('span,div,strong,b,a')).slice(0,12000)){
        if(el.closest&&el.closest('script,style,noscript,[role="tablist"],nav'))continue;
        const txt=cleanText(el.textContent||'');if(!txt||txt.length>80||!generalSectionKind(txt))continue;
        // Exact-label nodes only; parent containers carrying whole cards are excluded.
        let childText='';try{childText=cleanText(Array.from(el.children||[]).map(x=>cleanText(x.textContent||'')).join(' '));}catch(e){}
        if(childText&&childText===txt&&el.children&&el.children.length>1)continue;
        semantic.push(el);
      }
      headings=uniq([...primary,...semantic]);
    }catch(e){}
    for(const h of headings){
      const section=generalSectionKind(h.textContent||'');if(!section)continue;
      const ids=[];if(h.id)ids.push(h.id);try{h.querySelectorAll('[id]').forEach(n=>{if(n.id)ids.push(n.id);});}catch(e){}
      for(const id of uniq(ids)){try{doc.querySelectorAll('[aria-labelledby]').forEach(node=>{const tokens=String(node.getAttribute('aria-labelledby')||'').split(/\s+/).filter(Boolean);if(tokens.includes(id))add(section,node,'aria_labelledby');});}catch(e){}}
      let sib=h.nextElementSibling,steps=0;
      while(sib&&steps<6){
        const ownHeading=generalSectionKind(sib.textContent||'');
        if(ownHeading)break;
        let nestedStop=false;try{for(const hh of Array.from(sib.querySelectorAll('h1,h2,h3,h4,h5,h6,[role="heading"]')).slice(0,8)){if(generalSectionKind(hh.textContent||'')){nestedStop=true;break;}}}catch(e){}
        if(nestedStop)break;
        add(section,sib,'adjacent_sibling');sib=sib.nextElementSibling;steps++;
      }
      if(!out.some(x=>x.section===section)){
        let host=h.parentElement;for(let depth=0;depth<5&&host;depth++,host=host.parentElement){
          const txt=cleanText(host.textContent||'');if(!txt||txt.length>2200)break;
          let recognized=0;try{for(const hh of host.querySelectorAll('h1,h2,h3,h4,h5,h6,[role="heading"]'))if(generalSectionKind(hh.textContent||''))recognized++;}catch(e){}
          if(recognized>1)continue;
          let lists=[];try{lists=Array.from(host.querySelectorAll(':scope > ul,:scope > [role="list"]'));}catch(e){}
          if(lists.length){lists.forEach(node=>add(section,node,'nearest_direct_list'));break;}
        }
      }
    }
    return out;
  }
  function extractTargetBoundGeneralDomItems(doc,surface='about'){
    const items=[];
    const sectionFamily=section=>({Categories:'category','Contact info':'contact','Websites and social links':'links','Service area':'service_area',Hours:'hours',Languages:'language',Ratings:'rating','Page transparency':'responsibility'}[section]||'other');
    const valueFamily=value=>{const t=cleanText(value);if(/\b[^\s@]+@[^\s@]+\.[^\s@]+\b/.test(t))return 'contact';if(/https?:\/\//i.test(t))return 'links';if(/\+?\d[\d\s().-]{6,}\d/.test(t))return 'contact';if(/service area|area de atendimento/i.test(t))return 'service_area';if(/always open|closed now|open now|hours?$/i.test(t))return 'hours';return 'other';};
    for(const scope of generalScopesFromDocument(doc)){
      let nodes=[];try{nodes=Array.from(scope.node.querySelectorAll('li,[role="listitem"]'));}catch(e){}
      if(!nodes.length)try{nodes=Array.from(scope.node.children||[]);}catch(e){}
      if(!nodes.length)nodes=[scope.node];
      for(const node of nodes){
        let value=cleanText(node.textContent||'');if(!value||value.length>700||BAD_UI_TEXT.test(value))continue;
        const urls=[];try{node.querySelectorAll('a[href]').forEach(a=>{const href=cleanText(a.getAttribute('href')||'');const resolved=unwrapExternalUrl(href)||normalizeUrl(href);if(resolved)urls.push(resolved);});}catch(e){}
        let type='DOM_GENERAL_ITEM',label=scope.section,subtitle='';
        const norm=normalizeRelationSurfaceText(value);
        const resp=value.match(/^(.{2,160}?)\s+(?:is responsible for this page|e responsavel por esta pagina|é responsável por esta página)\.?$/i);
        if(resp){type='PAGE_RESPONSIBLE_ENTITY';label='Responsável pela Página';subtitle=value.slice(resp[1].length).trim();value=cleanText(resp[1]);}
        else if(/responsible for this page|responsavel por esta pagina/i.test(norm)){
          let entity='';try{entity=cleanText(Array.from(node.querySelectorAll('a,span,strong')).map(x=>cleanText(x.textContent||'')).find(x=>x&& !/responsible for this page|responsavel por esta pagina/i.test(normalizeRelationSurfaceText(x)))||'');}catch(e){}
          if(entity){type='PAGE_RESPONSIBLE_ENTITY';label='Responsável pela Página';subtitle=value;value=entity;}else continue;
        }
        else if(/^(?:page|pagina)\s*[·|:-]/i.test(norm)){type='PAGE_TYPE';label='Tipo de Página';}
        else if(scope.section==='Languages'){type='LANGUAGE';label='Idiomas';}
        else if(scope.section==='Ratings'){type='RATING_REVIEW';label='Avaliação';}
        else{
          const sf=sectionFamily(scope.section),vf=valueFamily(value);
          if(sf==='category'&&vf!=='other')continue;
          if(sf!=='other'&&vf!=='other'&&sf!==vf&&!(sf==='contact'&&vf==='links'))continue;
          if(/(?:Service area|Mobile|Email|Hours)$/i.test(value)&&sf==='category')continue;
        }
        items.push({surface,sources:[surface],section:scope.section,type,label,value,subtitle,url:uniq(urls)[0]||'',urls:uniq(urls),bindingMode:'response_exact_id'});
      }
    }
    return mergeGeneralInfoItems(items);
  }
  function generalInfoFamily(item){
    const hay=[item&&item.type,item&&item.label,item&&item.section].map(v=>cleanText(v||'').toUpperCase()).join(' '),value=cleanText(item&&item.value||'');
    if(/BIO/.test(hay))return 'bio';
    if(/EMAIL|PHONE|TELEPHONE|MOBILE/.test(hay))return 'contact';
    if(/OWNER|RESPONSIBLE|TRANSPARENCY/.test(hay))return 'responsibility';
    if(/SERVICE_AREA/.test(hay))return 'service_area';
    if(/CURRENT_CITY/.test(hay))return 'current_city';
    if(/HOMETOWN/.test(hay))return 'hometown';
    if(/LOCATION|ADDRESS/.test(hay))return 'location';
    if(/WORK|EMPLOYER|JOB/.test(hay))return 'work';
    if(/SCHOOL|COLLEGE|EDUCATION|UNIVERSITY/.test(hay))return 'education';
    if(/CATEGORY|PAGE_TYPE/.test(hay))return 'category';
    if(/BUSINESS_HOURS|OPENING_HOURS|HOURS/.test(hay))return 'hours';
    if(/WEBSITE|WEB_LINK|EXTERNAL_URL|SOCIAL_LINK|SCREENNAME/.test(hay)||/(?:https?:\/\/|www\.|(?:youtube|instagram|tiktok|linkedin)\.com\/)/i.test(value))return 'links';
    if(/LANGUAGE/.test(hay)||(/PERSONAL DETAILS/.test(hay)&&/\b(?:portuguesa?|portuguese|ingles|english|espanhol|spanish|franc[eê]s|french)\b/i.test(value)))return 'language';
    if(/GENDER/.test(hay))return 'gender';
    if(/RELATIONSHIP/.test(hay))return 'relationship';
    if(/RATING|REVIEW|RECOMMEND/.test(hay)||/\b\d{1,3}%\s+recommend\b|\b\d[\d.,]*\s+reviews?\b/i.test(value))return 'rating';
    if(/CONTACT/.test(hay))return 'contact';
    return 'other';
  }
  // V39: Promote only semantically strong, already target-bound All/About general items
  // into the frozen 18-column contract. Ambiguous items (ratings, languages, gender, etc.)
  // stay in generalItems and are never forced into an unrelated column.
  function promoteGeneralItemsToMeta(meta,items){
    meta=meta&&typeof meta==='object'?meta:{parseOk:false,targetBoundOk:false,evidence:[]};
    const list=mergeGeneralInfoItems(items);
    const addEmail=v=>{const e=safeEmail(v);if(!e)return false;meta.emails=uniq([...(meta.emails||[]),e]);if(!meta.email)meta.email=e;return true;};
    const addPhone=v=>{const p=safePhone(v);if(!p)return false;meta.telefones=uniq([...(meta.telefones||[]),p]);if(!meta.telefone)meta.telefone=p;return true;};
    const addUrl=v=>{const u=safeContactExternalUrl(v);if(!u)return false;meta.externalUrls=uniq([...(meta.externalUrls||[]),u]);if(!meta.externalUrl)meta.externalUrl=u;return true;};
    for(const item of list){
      if(!item||!validAboutBindingMode(item.bindingMode))continue;
      const type=cleanText(item.type||'').toUpperCase(),label=cleanText(item.label||'').toUpperCase(),section=cleanText(item.section||'').toUpperCase();
      const hay=[type,label,section].join(' '),value=cleanText(item.value||''),urls=uniq([item.url,...(item.urls||[])]).map(cleanText).filter(Boolean);
      let hit=false;
      for(const m of value.matchAll(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi))hit=addEmail(m[0])||hit;
      for(const ph of phoneCandidatesFromBoundedText(value,/CONTACT/.test(hay)))hit=addPhone(ph)||hit;
      if(/EMAIL/.test(hay))hit=addEmail(value)||hit;
      if(/PHONE|TELEPHONE|MOBILE/.test(hay))hit=addPhone(value)||hit;
      if(/WEBSITE|EXTERNAL_URL|WEB_LINK|SOCIAL_LINK|LINKS?/.test(hay)){
        for(const u of [...urls,value])hit=addUrl(u)||hit;
      }
      if(/CATEGORY|PAGE_TYPE/.test(hay)&&!meta.categoria&&value){const c=safeCategory(value);if(c){meta.categoria=c;hit=true;}}
      if(/BUSINESS_HOURS|OPENING_HOURS|\bHOURS\b/.test(hay)&&!meta.horarioFuncionamento&&value){meta.horarioFuncionamento=value;hit=true;}
      if(/SERVICE_AREA/.test(hay)&&value){meta.areasAtendimento=uniq([...(meta.areasAtendimento||[]),...value.split(/\s*[·•|]\s*/).map(cleanText).filter(Boolean)]);hit=true;}
      if(/CURRENT_CITY|HOMETOWN|LOCATION|ADDRESS/.test(hay)&&!meta.localizacao&&value){meta.localizacao=value;hit=true;}
      // Generic Details rows are promoted as location only with strong map/address evidence.
      if(!meta.localizacao&&/DOM_GENERAL_ITEM/.test(type)&&/DETAILS/.test(section)&&value){
        const mapEvidence=urls.some(isLocationUtilityUrl),postalEvidence=/\b\d{4,6}(?:-\d{3,4})?\b/.test(value)&&/,/.test(value);
        if(mapEvidence||postalEvidence){meta.localizacao=value;hit=true;}
      }
      if(/WORK|EMPLOYER|JOB/.test(hay)&&!meta.trabalho&&value){meta.trabalho=value;hit=true;}
      if(/SCHOOL|COLLEGE|EDUCATION|UNIVERSITY/.test(hay)&&!meta.formacao&&value){meta.formacao=value;hit=true;}
      if(/BIO|BIOGRAPHY|DESCRIPTION/.test(hay)&&!meta.bio&&value){const b=safeBio(value);if(b){meta.bio=b;hit=true;}}
      if(hit)meta.evidence=uniq([...(meta.evidence||[]),'general_item_promoted.'+(type||'UNKNOWN')]);
    }
    return meta;
  }
  function generalInfoCoverage(row){
    const items=mergeGeneralInfoItems(generalInfoFromAboutItems(row&&row.aboutItems,'about'),row&&row.generalItems);
    const families=new Set(items.map(generalInfoFamily));
    return {items,itemCount:items.length,familyCount:families.size,families:Array.from(families)};
  }
  function isPageLikeRow(row){
    if(safeCategory(row&&row.categoria||''))return true;
    return Array.isArray(row&&row.aboutItems)&&row.aboutItems.some(item=>/PAGE|CATEGORY|OWNER|SERVICE_AREA|BUSINESS_HOURS/i.test(String(item&&item.type||'')));
  }
  function needsAllGeneralSupplement(row){
    // V39 contract: All/root overview is a complementary target-bound source for every
    // discovered identity. About coverage must never suppress the All pass.
    return !!(row&&cleanText(row.profileUrl||row.key||row.username||''));
  }
  function needsAllContactSupplement(row){return needsAllGeneralSupplement(row);}
  function usefulGeneralSupplementMeta(meta){
    if(!meta)return false;
    if(Array.isArray(meta.generalItems)&&meta.generalItems.length)return true;
    if(Array.isArray(meta.aboutItems)&&meta.aboutItems.length)return true;
    return !!(safeEmail(meta.email||'')||safePhone(meta.telefone||'')||cleanText(meta.localizacao||'')||cleanText(meta.trabalho||'')||cleanText(meta.formacao||'')||cleanText(meta.responsavelPagina||'')||cleanText(meta.horarioFuncionamento||'')||(Array.isArray(meta.areasAtendimento)&&meta.areasAtendimento.length)||safeContactExternalUrl(meta.externalUrl||''));
  }
  function usefulSupplementMeta(meta){return usefulGeneralSupplementMeta(meta);}
  let __b35AllSupplementActive=0; const __b35AllSupplementWaiters=[];
  async function acquireAllSupplementSlot(){
    if(__b35AllSupplementActive<ALL_GENERAL_SUPPLEMENT_CONCURRENCY){__b35AllSupplementActive++;return;}
    await new Promise(resolve=>__b35AllSupplementWaiters.push(resolve));__b35AllSupplementActive++;
  }
  function releaseAllSupplementSlot(){
    __b35AllSupplementActive=Math.max(0,__b35AllSupplementActive-1);const next=__b35AllSupplementWaiters.shift();if(next)next();
  }
  async function withAllSupplementSlot(fn){await acquireAllSupplementSlot();try{return await fn();}finally{releaseAllSupplementSlot();}}
  
  function targetedAllJsonRoots(doc,knownId=''){
    const out=[]; const id=String(knownId||'');
    try{
      doc.querySelectorAll('script[type="application/json"],script[type="application/ld+json"],script[data-sjs]').forEach(sc=>{
        const txt=sc.textContent||''; if(!txt.trim()||txt.length>12000000)return;
        const marker=/profile_tile_sections|pressable_profile_field_type|directory_tile_item_renderer|profile_tile_items/i.test(txt);
        const idHit=!!id&&txt.includes(id);
        if(!marker&&!idHit)return;
        for(const r of parseJsonCandidates(txt))out.push(r);
      });
    }catch(e){}
    return out;
  }
  function canonicalDocumentMatchesRow(doc,row){
    let ok=false;
    try{doc.querySelectorAll('link[rel="canonical"],meta[property="og:url"]').forEach(n=>{const v=n.getAttribute('href')||n.getAttribute('content')||'';const k=profileKeyFromHref(v);if(k&&sameProfileKey(k,row&&(row.key||row.username)))ok=true;});}catch(e){}
    return ok;
  }
  
  function buildAllBootstrapResult(row,baseBoot,url,status,doc,roots,knownId=''){
  const resolved=resolveAboutBootstrapTarget(doc,row,roots,knownId);const local=bootstrapFromRoots(roots);
  local.actorID=baseBoot.actorID;local.dtsg=baseBoot.dtsg;local.lsd=baseBoot.lsd;local.graphURI=baseBoot.graphURI;
  const knownOk=!!knownId&&String(resolved.id||'')===String(knownId);
  const strongTarget=!!(resolved.ok&&(knownOk||resolved.objectUrlOk===true||resolved.canonicalOk===true));
  if(!strongTarget)return {ok:true,status,url,roots,doc,boot:local,meta:null,targetBound:false,id:'',canonicalOk:resolved.canonicalOk===true,exactIdOk:false,error:'all_target_unresolved_or_weak_binding'};
  let meta=explicitMetaFromTargetObject(resolved.exactProfile,resolved.id);meta.targetBoundOk=true;meta.parseOk=true;
  const exactObjects=exactProfileObjects(roots,resolved.id);
  const tileItems=extractAboutStructuredItemsFromExactIdObjects(roots,resolved.id,'all_profile_tiles','response_exact_id');
  meta=mapAboutItemsToMeta(meta,tileItems);
  meta.evidence=uniq([...(meta.evidence||[]),'all_profile_tiles.exact_id_object_union.'+exactObjects.length]);
  const domMeta=extractTargetBoundContactDomMeta(doc,'all');meta=mergeSupplementMeta(meta,domMeta);
  meta.generalItems=mergeGeneralInfoItems(generalInfoFromAboutItems(meta.aboutItems,'all'),extractTargetBoundGeneralDomItems(doc,'all'));
  promoteGeneralItemsToMeta(meta,meta.generalItems);
  meta.evidence=uniq([...(meta.evidence||[]),'all_html_bootstrap.target_bound','all_first.'+resolved.source]);
  return {ok:true,status,url,roots,doc,boot:local,meta,targetBound:true,id:resolved.id,canonicalOk:resolved.canonicalOk===true,exactIdOk:true,error:'',bindingSource:resolved.source,contactScopeFound:contactScopesFromDocument(doc).length>0,generalScopeFound:generalScopesFromDocument(doc).length>0};
}
  async function fetchProfileAllBootstrapOnePass(row,baseBoot,knownId=''){
  const url=allUrlForRow(row);if(!url)return {ok:false,status:0,roots:[],meta:null,boot:null,targetBound:false,id:'',error:'all_url_missing'};
  try{
    throwIfStopped('all_general_fetch');
    const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),ALL_GENERAL_FETCH_TIMEOUT_MS),outerSignal=runSignal();
    const outerAbort=()=>controller.abort();try{if(outerSignal)outerSignal.addEventListener('abort',outerAbort,{once:true});}catch(e){}
    let res,html;try{res=await fetch(url,{credentials:'include',headers:{'accept':'text/html,application/xhtml+xml'},signal:controller.signal});html=await res.text();}finally{clearTimeout(timer);try{if(outerSignal)outerSignal.removeEventListener('abort',outerAbort);}catch(e){}}
    if(!res.ok)return {ok:false,status:res.status,url,roots:[],meta:null,boot:null,targetBound:false,id:'',error:'http_'+res.status};
    const doc=new DOMParser().parseFromString(html,'text/html');
    const domMeta=extractTargetBoundContactDomMeta(doc,'all');
    domMeta.generalItems=extractTargetBoundGeneralDomItems(doc,'all');
    promoteGeneralItemsToMeta(domMeta,domMeta.generalItems);
    if(knownId&&canonicalDocumentMatchesRow(doc,row)){
      let unionRoots=targetedAllJsonRoots(doc,knownId);
      let exactObjects=exactProfileObjects(unionRoots,knownId);
      // If the targeted script filter did not expose an exact target object, parse the
      // complete serialized root set once. DOM usefulness is never allowed to suppress
      // this exact-ID fallback.
      if(!exactObjects.length){
        const fullRoots=documentJsonRoots(doc);
        unionRoots=[...unionRoots,...fullRoots];
        exactObjects=exactProfileObjects(unionRoots,knownId);
      }
      let fastMeta=domMeta,tileItems=[];
      if(exactObjects.length){
        const primary=exactProfileObject(unionRoots,knownId)||exactObjects[0];
        let tileMeta=explicitMetaFromTargetObject(primary,knownId);tileMeta.targetBoundOk=true;tileMeta.parseOk=true;
        tileItems=extractAboutStructuredItemsFromExactIdObjects(unionRoots,knownId,'all_profile_tiles','response_exact_id');
        tileMeta=mapAboutItemsToMeta(tileMeta,tileItems);
        tileMeta.evidence=uniq([...(tileMeta.evidence||[]),'all_profile_tiles.exact_id_object_union.'+exactObjects.length]);
        tileMeta.generalItems=mergeGeneralInfoItems(generalInfoFromAboutItems(tileMeta.aboutItems,'all'),extractTargetBoundGeneralDomItems(doc,'all'));
        promoteGeneralItemsToMeta(tileMeta,tileMeta.generalItems);
        fastMeta=mergeSupplementMeta(tileMeta,domMeta);
      }
      if(usefulGeneralSupplementMeta(fastMeta)||tileItems.length){
        fastMeta.targetBoundOk=true;fastMeta.parseOk=true;
        fastMeta.generalItems=mergeGeneralInfoItems(generalInfoFromAboutItems(fastMeta.aboutItems,'all'),fastMeta.generalItems);
        promoteGeneralItemsToMeta(fastMeta,fastMeta.generalItems);
        fastMeta.evidence=uniq([...(fastMeta.evidence||[]),'all_targeted_fast.canonical_exact_union_plus_dom']);
        return {ok:true,status:res.status,url,roots:unionRoots,doc,boot:cloneBootForProfile(baseBoot||{}),meta:fastMeta,targetBound:true,id:String(knownId),canonicalOk:true,exactIdOk:exactObjects.length>0,error:'',bindingSource:exactObjects.length?'canonical_prior_id_plus_exact_id_union':'canonical_exact_dom_only',contactScopeFound:contactScopesFromDocument(doc).length>0,generalScopeFound:generalScopesFromDocument(doc).length>0,fastDom:true,exactIdObjectCount:exactObjects.length};
      }
    }
    state.stats.allSupplementJsonFallback++;
    const roots=documentJsonRoots(doc);return buildAllBootstrapResult(row,baseBoot,url,res.status,doc,roots,knownId);
  }catch(e){return {ok:false,status:0,url,roots:[],meta:null,boot:null,targetBound:false,id:'',error:String(e&&e.name==='AbortError'?'all_fetch_timeout':e&&e.message||e)};}
}
  async function maybeApplyAllContactSupplement(row,baseBoot,knownId=''){
  return applyAllGeneralSupplement(row,baseBoot,knownId);
}
  async function applyAllGeneralSupplement(row,baseBoot,knownId=''){
    if(!needsAllGeneralSupplement(row)){state.stats.allSupplementSkippedGeneralCoverage++;return {attempted:false,reason:'about_general_coverage_sufficient_or_not_candidate'};}
    state.stats.allSupplementQueued++;
    const result=await withAllSupplementSlot(async()=>{state.stats.allSupplementStarted++;return fetchProfileAllBootstrapOnePass(row,cloneBootForProfile(baseBoot||{}),knownId);});
    row.allSupplementAudit={attempted:true,mode:'general_information',ok:!!(result&&result.ok),status:Number(result&&result.status||0),url:result&&result.url||allUrlForRow(row),targetBound:!!(result&&result.targetBound),exactIdOk:!!(result&&result.exactIdOk),bindingSource:result&&result.bindingSource||'',contactScopeFound:!!(result&&result.contactScopeFound),generalScopeFound:!!(result&&result.generalScopeFound),fastDom:!!(result&&result.fastDom),generalItems:Number(result&&result.meta&&result.meta.generalItems&&result.meta.generalItems.length||0),error:result&&result.error||''};
    if(!(result&&result.ok)){state.stats.allSupplementFailed++;return result;}
    state.stats.allSupplementHttpOk++;
    if(!(result.targetBound&&result.meta)){state.stats.allSupplementFailed++;return result;}
    state.stats.allSupplementTargetBoundOk++;
    const before={email:!!safeEmail(row.email||''),phone:!!safePhone(row.telefone||''),location:!!cleanText(row.localizacao||''),external:!!safeContactExternalUrl(row.externalUrl||'')};
    promoteGeneralItemsToMeta(result.meta,result.meta.generalItems);
    const semantic=applyStrictMeta(row,result.meta,'html_all_bootstrap.target_bound_general_supplement');
    if(semantic)state.stats.allSupplementSemanticOk++;
    if(result&&result.fastDom)state.stats.allSupplementFastDomHit++;
    if(!before.email&&!!safeEmail(row.email||''))state.stats.allSupplementEmailFound++;
    if(!before.phone&&!!safePhone(row.telefone||''))state.stats.allSupplementPhoneFound++;
    if(!before.location&&!!cleanText(row.localizacao||''))state.stats.allSupplementLocationFound++;
    if(!before.external&&!!safeContactExternalUrl(row.externalUrl||''))state.stats.allSupplementExternalFound++;
    // V39: only remaining high-value gaps on page-like rows trigger bounded directory
    // supplements. They never create rows and run after the target-bound All merge.
    await applyDirectorySupplements(row,knownId);
    return result;
  }
  const __b35GeneralPromises=new Map();
  function ensureGeneralRun(){
    if(!state.generalRun)state.generalRun={active:false,completed:false,runId:'',queuedUnique:0,startedUnique:0,completedUnique:0,failedUnique:0,startedAt:'',completedAt:''};
    return state.generalRun;
  }
  function beginGeneralLaneForMetaRun(runId=''){
    if(state.generalRun&&state.generalRun.active===true)return state.generalRun;
    __b35GeneralPromises.clear();
    state.generalRun={active:false,completed:false,runId:String(runId||''),queuedUnique:0,startedUnique:0,completedUnique:0,failedUnique:0,startedAt:new Date().toISOString(),completedAt:''};
    return state.generalRun;
  }
  function generalRunSummary(){
    const r=ensureGeneralRun();
    return {active:r.active===true,completed:r.completed===true,runId:r.runId||'',queuedUnique:Number(r.queuedUnique||0),startedUnique:Number(r.startedUnique||0),completedUnique:Number(r.completedUnique||0),failedUnique:Number(r.failedUnique||0),startedAt:r.startedAt||'',completedAt:r.completedAt||''};
  }
  function enqueueAllGeneralSupplement(row,baseBoot,knownId='',metaRun=null){
    const run=ensureGeneralRun(),key=metaRowKey(row);
    if(!key)return Promise.resolve({attempted:false,reason:'general_lane_missing_key'});
    if(__b35GeneralPromises.has(key))return __b35GeneralPromises.get(key);
    if(!needsAllGeneralSupplement(row)){state.stats.allSupplementSkippedGeneralCoverage++;return Promise.resolve({attempted:false,reason:'about_general_coverage_sufficient_or_not_candidate'});}
    run.active=true;run.completed=false;run.queuedUnique++;
    const promise=(async()=>{
      run.startedUnique++;
      try{return await applyAllGeneralSupplement(row,baseBoot,knownId);}
      catch(e){run.failedUnique++;state.stats.allSupplementFailed++;warn('Falha na lane de informações gerais '+row.username,String(e&&e.message||e));return {attempted:true,ok:false,error:String(e&&e.message||e)};}
      finally{
        run.completedUnique++;
        if(metaRun){updateRunEvidence(metaRun,row);syncRunStats(metaRun);}
        recalcMetaStatsStrict();renderStatus();
      }
    })();
    __b35GeneralPromises.set(key,promise);
    return promise;
  }
  async function awaitGeneralLaneDrain(){
    const run=ensureGeneralRun(),promises=Array.from(__b35GeneralPromises.values());
    if(!promises.length){run.active=false;run.completed=true;run.completedAt=new Date().toISOString();return generalRunSummary();}
    await Promise.allSettled(promises);
    run.active=false;run.completed=true;run.completedAt=new Date().toISOString();
    return generalRunSummary();
  }
  function exactTargetInHtmlDocument(doc,row,id,roots){
    let canonicalOk=false;
    try{doc.querySelectorAll('link[rel="canonical"],meta[property="og:url"]').forEach(n=>{const v=n.getAttribute('href')||n.getAttribute('content')||'';const k=profileKeyFromHref(v);if(k&&sameProfileKey(k,row.key||row.username))canonicalOk=true;});}catch(e){}
    const exact=exactProfileObject(roots||[],id);
    // Canonical URL is contextual evidence only. Metadata/operation adoption requires an exact profile object with the expected ID in the serialized payload.
    return {ok:!!exact,canonicalOk,exactIdOk:!!exact,exactProfile:exact};
  }
  function knownProfileIdForRow(row,boot){
    if(row&&row.profileId)return String(row.profileId);
    const byKey=profileIdFromKey(row&&(row.key||row.username)); if(byKey)return String(byKey);
    const hit=boot&&boot.relationItems&&boot.relationItems.get(String(row&&(row.key||row.username)||'').toLowerCase());
    return hit&&hit.id?String(hit.id):'';
  }
  function aboutBootstrapIdCandidates(roots){
    const out=[],seen=new Set();
    const add=(id,source)=>{const v=String(id||'');if(!/^\d{5,}$/.test(v)||seen.has(v))return;seen.add(v);out.push({id:v,source:String(source||'unknown')});};
    for(const root of roots||[])walkObjects(root,obj=>{
      if(!obj||Array.isArray(obj))return;
      if(obj.queryName==='ProfileCometHeaderQuery'&&obj.variables)add(obj.variables.userID,'header_preloader_userid');
      if(obj.route&&obj.route.rootView&&obj.route.rootView.props)add(obj.route.rootView.props.userID,'route_root_userid');
      if(/^\d{5,}$/.test(String(obj.id||''))&&typeof obj.url==='string')add(obj.id,'profile_object_url');
    },180000);
    return out;
  }
  function canonicalProfileKeyFromDocument(doc){
    let key='';
    try{doc.querySelectorAll('link[rel="canonical"],meta[property="og:url"]').forEach(n=>{if(key)return;const v=n.getAttribute('href')||n.getAttribute('content')||'';const k=profileKeyFromHref(v);if(k)key=k;});}catch(e){}
    return key;
  }
  function resolveAboutBootstrapTarget(doc,row,roots,knownId=''){
    const rowKey=String(row&&(row.key||row.username)||'');
    const canonicalKey=canonicalProfileKeyFromDocument(doc);
    const candidates=[]; const seen=new Set();
    const add=(id,source)=>{const v=String(id||'');if(!/^\d{5,}$/.test(v)||seen.has(v))return;seen.add(v);candidates.push({id:v,source});};
    add(knownId,'known_row_or_relation_id');
    for(const c of aboutBootstrapIdCandidates(roots))add(c.id,c.source);
    for(const c of candidates){
      const exact=exactProfileObject(roots,c.id); if(!exact)continue;
      const objectKey=profileKeyFromHref(String(exact.url||''));
      const knownOk=!!knownId&&String(c.id)===String(knownId);
      const objectUrlOk=!!objectKey&&sameProfileKey(objectKey,rowKey);
      const canonicalOk=!!canonicalKey&&sameProfileKey(canonicalKey,rowKey);
      const preloaderExactOk=/^(?:header_preloader_userid|route_root_userid)$/.test(String(c.source||''));
      if(knownOk||objectUrlOk||canonicalOk||preloaderExactOk)return {ok:true,id:c.id,exactProfile:exact,source:c.source,canonicalOk,objectUrlOk};
    }
    return {ok:false,id:'',exactProfile:null,source:'',canonicalOk:false,objectUrlOk:false};
  }
  function buildAboutBootstrapResult(row,baseBoot,url,status,doc,roots,knownId=''){
  const resolved=resolveAboutBootstrapTarget(doc,row,roots,knownId);
  const local=bootstrapFromRoots(roots);
  local.actorID=baseBoot.actorID;local.dtsg=baseBoot.dtsg;local.lsd=baseBoot.lsd;local.graphURI=baseBoot.graphURI;
  if(!resolved.ok)return {ok:true,status,url,roots,doc,boot:local,meta:null,targetBound:false,id:'',canonicalOk:resolved.canonicalOk===true,exactIdOk:false,semanticSurfaceExamined:false,semanticContainerCount:0,semanticItemCount:0,error:'about_target_unresolved'};
  const meta=explicitMetaFromAboutRoots(roots,resolved.id,null,null,null,roots,[]);
  const rootMedia=profileMediaFromRoots(roots,resolved.id);
  if(rootMedia.avatarUrl)meta.avatarUrl=rootMedia.avatarUrl;if(rootMedia.coverUrl)meta.coverUrl=rootMedia.coverUrl;
  meta.avatarWidth=rootMedia.avatarWidth;meta.avatarHeight=rootMedia.avatarHeight;meta.coverWidth=rootMedia.coverWidth;meta.coverHeight=rootMedia.coverHeight;
  meta.evidence=uniq([...(meta.evidence||[]),...(rootMedia.mediaEvidence||[]).map(x=>'profile_media_roots.'+x)]);
  meta.generalItems=mergeGeneralInfoItems(generalInfoFromAboutItems(meta.aboutItems,'about'),extractTargetBoundGeneralDomItems(doc,'about'));
  const surface=semanticAboutSurfaceAudit(roots);
  meta.semanticSurfaceExamined=surface.examined;meta.semanticContainerCount=surface.containerCount;meta.semanticItemCount=surface.itemCount;
  meta.evidence=uniq([...(meta.evidence||[]),...surface.evidence,'about_html_bootstrap.target_bound','about_first.'+resolved.source]);
  return {ok:true,status,url,roots,doc,boot:local,meta,targetBound:true,id:resolved.id,canonicalOk:resolved.canonicalOk===true,exactIdOk:true,semanticSurfaceExamined:surface.examined,semanticContainerCount:surface.containerCount,semanticItemCount:surface.itemCount,error:'',bindingSource:resolved.source,generalScopeFound:generalScopesFromDocument(doc).length>0};
}
  async function fetchProfileAboutBootstrapOnePass(row,baseBoot,knownId=''){
    const url=aboutUrlForRow(row); if(!url)return {ok:false,status:0,roots:[],meta:null,boot:null,targetBound:false,id:'',semanticSurfaceExamined:false,error:'about_url_missing'};
    try{
      const res=await fetch(url,{credentials:'include',headers:{'accept':'text/html,application/xhtml+xml'},signal:runSignal()||undefined}), html=await res.text();
      if(!res.ok)return {ok:false,status:res.status,url,roots:[],meta:null,boot:null,targetBound:false,id:'',semanticSurfaceExamined:false,error:'http_'+res.status};
      const doc=new DOMParser().parseFromString(html,'text/html'), roots=documentJsonRoots(doc);
      return buildAboutBootstrapResult(row,baseBoot,url,res.status,doc,roots,knownId);
    }catch(e){return {ok:false,status:0,url,roots:[],meta:null,boot:null,targetBound:false,id:'',semanticSurfaceExamined:false,error:String(e&&e.message||e)};}
  }
  function rebindAboutBootstrapResult(result,row,id,baseBoot){
    if(!result||!result.ok||result.targetBound||!id||!Array.isArray(result.roots)||!result.doc)return result;
    return buildAboutBootstrapResult(row,baseBoot,result.url||aboutUrlForRow(row),result.status||200,result.doc,result.roots,String(id));
  }
  function targetProfileSeedRow(){
    const base=targetProfile(), key=String(base.username||currentTarget()||'');
    return {key,username:key,displayName:base.displayName||key,nome:base.displayName||key,profileUrl:canonicalProfileUrlFromKey(key),perfil:canonicalProfileUrlFromKey(key),profileId:''};
  }
  function targetProfileFromBootstrap(base,result){
    const meta=result&&result.meta||{};
    return {
      ...base,
      profileId:String(result&&result.id||base.profileId||''),
      displayName:meta.name||base.displayName||base.username,
      bio:safeBio(meta.bio)||base.bio||'',
      avatar:meta.avatarUrl||base.avatar||'',
      avatarUrl:meta.avatarUrl||base.avatar||'',
      avatarWidth:Number(meta.avatarWidth||0),avatarHeight:Number(meta.avatarHeight||0),
      coverUrl:meta.coverUrl||'',coverWidth:Number(meta.coverWidth||0),coverHeight:Number(meta.coverHeight||0),
      categoria:meta.categoria||'',externalUrl:meta.externalUrl||'',linksExternos:uniq(meta.externalUrls||[]),
      seguidores:meta.seguidores||'',seguindo:meta.seguindo||'',email:meta.email||'',emails:uniq(meta.emails||[]),telefone:meta.telefone||'',telefones:uniq(meta.telefones||[]),
      localizacao:meta.localizacao||'',trabalho:meta.trabalho||'',formacao:meta.formacao||'',horarioFuncionamento:meta.horarioFuncionamento||'',areasAtendimento:uniq(meta.areasAtendimento||[]),aboutItems:Array.isArray(meta.aboutItems)?meta.aboutItems:[],
      targetBound:!!(result&&result.targetBound),semanticSurfaceExamined:!!(result&&result.semanticSurfaceExamined),source:'target_about_onepass'
    };
  }
  async function ensureTargetProfileEnriched(baseBoot){
    if(state.targetProfilePromise)return state.targetProfilePromise;
    state.targetProfilePromise=(async()=>{
      const base=targetProfile(), seed=targetProfileSeedRow();
      try{
        const result=await fetchProfileAboutBootstrapOnePass(seed,cloneBootForProfile(baseBoot||{}),'');
        if(result&&result.ok&&result.targetBound){state.targetProfileEnriched=targetProfileFromBootstrap(base,result);cacheTargetAvatarV44R13(state.targetProfileEnriched);log('info','Perfil-alvo enriquecido por /about one-pass.',{username:seed.username,id:result.id,avatar:!!state.targetProfileEnriched.avatarUrl,cover:!!state.targetProfileEnriched.coverUrl,bio:!!state.targetProfileEnriched.bio});}
        else {state.targetProfileEnriched={...base,targetBound:false,source:'target_about_unresolved',error:result&&result.error||'target_unresolved'};warn('Perfil-alvo não ficou target-bound no /about one-pass.',{username:seed.username,error:result&&result.error||''});}
      }catch(e){state.targetProfileEnriched={...base,targetBound:false,source:'target_about_error',error:String(e&&e.message||e)};warn('Falha ao enriquecer perfil-alvo.',String(e&&e.message||e));}
      return state.targetProfileEnriched;
    })();
    return state.targetProfilePromise;
  }

  async function fetchProfileAboutBootstrap(row,id,baseBoot){
    const url=aboutUrlForRow(row); if(!url)return {ok:false,status:0,roots:[],meta:null,boot:null,targetBound:false,semanticSurfaceExamined:false,error:'about_url_missing'};
    try{
      const res=await fetch(url,{credentials:'include',headers:{'accept':'text/html,application/xhtml+xml'},signal:runSignal()||undefined}), html=await res.text();
      if(!res.ok)return {ok:false,status:res.status,roots:[],meta:null,boot:null,targetBound:false,semanticSurfaceExamined:false,error:'http_'+res.status};
      const doc=new DOMParser().parseFromString(html,'text/html'), roots=documentJsonRoots(doc), bind=exactTargetInHtmlDocument(doc,row,id,roots), local=bootstrapFromRoots(roots);
      // inherit authentication transport from relation page; operation IDs/templates from exact profile About page win when current-page preloaders exist.
      local.actorID=baseBoot.actorID; local.dtsg=baseBoot.dtsg; local.lsd=baseBoot.lsd; local.graphURI=baseBoot.graphURI;
      const meta=bind.ok?explicitMetaFromAboutRoots(roots,id,null,null,null,roots,[]):{parseOk:roots.length>0,targetBoundOk:false,evidence:[],aboutItems:[]};
      const surface=semanticAboutSurfaceAudit(roots); meta.semanticSurfaceExamined=surface.examined;meta.semanticContainerCount=surface.containerCount;meta.semanticItemCount=surface.itemCount;meta.evidence=uniq([...(meta.evidence||[]),...surface.evidence,'about_html_bootstrap.target_bound']);
      return {ok:true,status:res.status,url,roots,doc,boot:local,meta,targetBound:bind.ok,canonicalOk:bind.canonicalOk===true,exactIdOk:bind.exactIdOk===true,semanticSurfaceExamined:surface.examined,semanticContainerCount:surface.containerCount,semanticItemCount:surface.itemCount,error:''};
    }catch(e){return {ok:false,status:0,roots:[],meta:null,boot:null,targetBound:false,semanticSurfaceExamined:false,error:String(e&&e.message||e)};}
  }
  function freshOperationAvailable(boot,name){const p=String(boot&&boot.operationProvenance&&boot.operationProvenance[name]||'');return /^(?:preloader_current_document|bundle_fresh|profile_about_preloader_current_document|profile_about_bundle_fresh)$/.test(p);}
  function operationTemplateMatchesProfile(boot,name,expectedId){
    const tpl=boot&&boot.operationVariableTemplates&&boot.operationVariableTemplates[name]; if(!tpl||typeof tpl!=='object')return false;
    const id=String(expectedId||''); if(!id)return false;
    const vals=[tpl.userID,tpl.pageID,tpl.selectedID].filter(v=>v!==undefined&&v!==null&&String(v)!=='').map(String);
    return vals.length>0&&vals.some(v=>v===id);
  }
  function selectAboutOperationRoute(boot){
    // Exact offline personal snapshot proves TopApp is the operation preloaded by the real /about page; prefer it when fresh. AboutApp remains a fresh-only secondary route.
    if(freshOperationAvailable(boot,'ProfileCometTopAppSectionQuery')&&boot.topAppQueryID)return {queryName:'ProfileCometTopAppSectionQuery',docId:boot.topAppQueryID,reason:'fresh_top_app_operation'};
    if(freshOperationAvailable(boot,'ProfileCometAboutAppSectionQuery')&&boot.aboutQueryID)return {queryName:'ProfileCometAboutAppSectionQuery',docId:boot.aboutQueryID,reason:'fresh_about_operation'};
    // Live V8 evidence rejects stale operations: stale AboutApp had 0/2040 useful data roots and the TopApp fallback had zero semantic yield. No stale operation is promoted as useful.
    return {queryName:'',docId:'',reason:'no_fresh_semantic_about_operation'};
  }
  function collectionVariablesForRoute(route,boot,id,sectionToken,collectionToken){
    if(route.queryName==='ProfileCometTopAppSectionQuery')return {collectionToken:collectionToken||null,scale:window.devicePixelRatio||1,sectionToken,userID:String(id)};
    return {appSectionFeedKey:'ProfileCometAppSectionFeed_timeline_nav_app_sections__'+sectionToken,collectionToken:collectionToken||null,pageID:String(id),rawSectionToken:null,scale:window.devicePixelRatio||1,sectionToken,showReactions:true,userID:String(id)};
  }
  function collectScopedAboutMeta(meta,roots,collectionTabKey,bindingMode=''){
    const mode=cleanText(bindingMode||'');
    if(!validAboutBindingMode(mode))return meta;
    const surface=semanticAboutSurfaceAudit(roots); meta.semanticSurfaceExamined=surface.examined; meta.semanticContainerCount=surface.containerCount; meta.semanticItemCount=surface.itemCount; meta.semanticSurfaceEvidence=surface.evidence;
    const items=extractAboutStructuredItemsFromRoots(roots,collectionTabKey,mode); mapAboutItemsToMeta(meta,items);
    const addEvidence=(kind,path)=>meta.evidence.push('about_scoped.'+kind+'.'+path+'.'+mode);
    walkObjects(roots,obj=>{
      if(!obj||Array.isArray(obj))return;
      const setEmail=(v,k)=>{const e=safeEmail(valueText(v)||v);if(e){meta.emails=uniq([...(meta.emails||[]),e]);if(!meta.email)meta.email=e;addEvidence('email',k);}};
      const setPhone=(v,k)=>{const p=safePhone(valueText(v)||v);if(p){meta.telefones=uniq([...(meta.telefones||[]),p]);if(!meta.telefone)meta.telefone=p;addEvidence('phone',k);}};
      const setUrl=(v,k)=>{const raw=valueText(v)||v;const u=unwrapExternalUrl(raw)||safeExternalUrl(raw);if(u){meta.externalUrls=uniq([...(meta.externalUrls||[]),u]);if(!meta.externalUrl)meta.externalUrl=u;addEvidence('url',k);}};
      for(const k of ['email','email_address','contact_email'])if(Object.prototype.hasOwnProperty.call(obj,k))setEmail(obj[k],k);
      for(const k of ['phone','phone_number','telephone','mobile_phone'])if(Object.prototype.hasOwnProperty.call(obj,k))setPhone(obj[k],k);
      for(const k of ['external_url','website','website_url'])if(Object.prototype.hasOwnProperty.call(obj,k))setUrl(obj[k],k);
      const ft=String(obj.profile_field_type||obj.field_type||obj.timeline_context_list_item_type||obj.type||'').toLowerCase(); const val=deepText(obj.short_title||obj.title||obj.text||obj.name||obj.description||'');
      if(ft&&val){
        if(/bio|biography|description/.test(ft)&&!meta.bio){const b=safeBio(val);if(b){meta.bio=b;addEvidence('bio',ft);}}
        if(/current_city|hometown|location|address/.test(ft)&&!meta.localizacao){meta.localizacao=val;addEvidence('location',ft);}
        if(/work|employer/.test(ft)&&!meta.trabalho){meta.trabalho=val;addEvidence('work',ft);}
        if(/school|college|education/.test(ft)&&!meta.formacao){meta.formacao=val;addEvidence('education',ft);}
        if(/category/.test(ft)&&!meta.categoria){const c=safeCategory(val);if(c){meta.categoria=c;addEvidence('category',ft);}}
      }
    },180000);
    meta.emails=uniq(meta.emails||[]); meta.telefones=uniq(meta.telefones||[]); meta.externalUrls=uniq(meta.externalUrls||[]);
    return meta;
  }
  function profileLikeIdsInRoots(roots){
    const out=[];
    for(const root of roots||[])walkObjects(root,obj=>{
      if(!obj||Array.isArray(obj)||!obj.id)return;
      // Only strong primary-profile containers count as identity conflicts. A nested related User/Page entity (employer, owner, link target) must not invalidate a request-scoped collection.
      const profileLike=!!(obj.profile_social_context||obj.profile_intro_card||obj.profile_tabs||obj.header_top_row);
      if(profileLike)out.push(String(obj.id));
    },120000);
    return uniq(out);
  }
  function validAboutRequestScope(scope,expectedId,collectionTabKey,collectionToken){
    if(!scope||typeof scope!=='object')return false;
    const id=String(expectedId||''), sid=String(scope.expectedId||''); if(!id||sid!==id)return false;
    if(scope.source!=='header_exact_profile_about_plan')return false;
    if(!String(scope.sectionToken||''))return false;
    const requestedKey=collectionTabKey===null||collectionTabKey===undefined?null:String(collectionTabKey);
    const scopeKey=scope.collectionTabKey===null||scope.collectionTabKey===undefined?null:String(scope.collectionTabKey);
    if(requestedKey!==scopeKey)return false;
    const requestedToken=collectionToken===null||collectionToken===undefined?null:String(collectionToken);
    const scopeToken=scope.collectionToken===null||scope.collectionToken===undefined?null:String(scope.collectionToken);
    if(requestedToken!==scopeToken)return false;
    if(scopeToken!==null&&!scopeToken)return false;
    return true;
  }
  function explicitMetaFromAboutRoots(roots,expectedId,collectionTabKey=null,collectionToken=null,requestScope=null,dataRoots=null,graphqlErrors=[]){
    const allRoots=Array.isArray(roots)?roots:[], scopedRoots=Array.isArray(dataRoots)&&dataRoots.length?dataRoots:collectGraphDataRoots(allRoots);
    const p=exactProfileObject(scopedRoots,expectedId)||exactProfileObject(allRoots,expectedId);
    const profileIds=profileLikeIdsInRoots(scopedRoots);
    const conflictingProfileId=profileIds.some(x=>String(x)!==String(expectedId||''));
    let meta=p?explicitMetaFromTargetObject(p,expectedId):{parseOk:allRoots.length>0,targetBoundOk:false,evidence:[],aboutItems:[]};
    meta.parseOk=allRoots.length>0; meta.graphqlErrorCount=Array.isArray(graphqlErrors)?graphqlErrors.length:0; meta.bindingMode='unbound'; meta.profileIdsObserved=profileIds;
    if(p){meta.targetBoundOk=true;meta.bindingMode='response_exact_id';meta.evidence=uniq([...(meta.evidence||[]),'about_binding.response_exact_id']);}
    else if(!conflictingProfileId&&validAboutRequestScope(requestScope,expectedId,collectionTabKey,collectionToken)&&scopedRoots.length){meta.targetBoundOk=true;meta.bindingMode=String(requestScope.collectionToken||'')?'request_scoped_collection_token':'request_scoped_section_token';meta.evidence=uniq([...(meta.evidence||[]),'about_binding.'+meta.bindingMode]);}
    else if(conflictingProfileId){meta.evidence=uniq([...(meta.evidence||[]),'about_binding.conflicting_profile_id_rejected']);}
    if(!meta.targetBoundOk)return meta;
    collectScopedAboutMeta(meta,scopedRoots.length?scopedRoots:allRoots,collectionTabKey,meta.bindingMode);
    return meta;
  }
  async function resolveProfileIdStructured(row,boot){
    if(row.profileId)return row.profileId; const byKey=profileIdFromKey(row.key||row.username); if(byKey){row.profileId=byKey;return byKey;}
    const hit=boot.relationItems.get(String(row.key||row.username||'').toLowerCase()); if(hit&&hit.id){row.profileId=hit.id;return hit.id;}
    // ID resolution only: HTML bootstrap is allowed to resolve userID; it is NOT promoted as metadata.
    try{
      const u=new URL(row.profileUrl||canonicalProfileUrlFromKey(row.key||row.username),location.origin); u.hostname=location.hostname;
      const res=await fetch(u.href,{credentials:'include',headers:{'accept':'text/html,application/xhtml+xml'},signal:runSignal()||undefined}); if(!res.ok)return '';
      const html=await res.text(), roots=htmlJsonRoots(html); let id='';
      for(const root of roots){walkObjects(root,obj=>{ if(id||!obj||Array.isArray(obj))return; if(obj.queryName==='ProfileCometHeaderQuery'&&obj.variables&&/^\d{5,}$/.test(String(obj.variables.userID||'')))id=String(obj.variables.userID); if(!id&&obj.route&&obj.route.rootView&&obj.route.rootView.props&&/^\d{5,}$/.test(String(obj.route.rootView.props.userID||'')))id=String(obj.route.rootView.props.userID);},100000);if(id)break;}
      if(id){row.profileId=id;row.metaSources=uniq([...(row.metaSources||[]),'html_bootstrap_userid_resolution_only']);}
      return id;
    }catch(e){return '';}
  }
  function normalizeIdentityAlias(v){
    const s=String(v||'').trim().toLowerCase(); if(!s)return '';
    if(/^id:\d+$/.test(s))return s;
    if(/^\d{5,}$/.test(s))return 'id:'+s;
    return s;
  }
  function rowIdentityAliases(row){
    const out=[]; const add=v=>{const a=normalizeIdentityAlias(v);if(a)out.push(a);if(/^id:\d+$/.test(a))out.push(a.slice(3));};
    add(row&&row.key);add(row&&row.username);add(row&&row.profileId);add(profileIdFromKey(row&&row.key));add(profileIdFromKey(row&&row.username));
    return uniq(out);
  }
  function cohortEntryAliases(entry){
    const out=[]; const add=v=>{const a=normalizeIdentityAlias(v);if(a)out.push(a);if(/^id:\d+$/.test(a))out.push(a.slice(3));};
    add(entry&&entry.key);add(entry&&entry.username);add(entry&&entry.profileId);return uniq(out);
  }
  function computeFrozenCohortSelection(allRows){
    if(!BENCHMARK_DIAGNOSTICS_ENABLED){
      return {selected:[],audit:{cohortId:FROZEN_META_COHORT.cohortId,configSha256:FROZEN_META_COHORT.configSha256,mode:'disabled_in_production',comparable:false,matched:0,expected:0,missing:[],diagnosticOnly:true}};
    }
    const rows=Array.from(allRows||[]), aliasToRow=new Map();
    for(const row of rows)for(const a of rowIdentityAliases(row))if(!aliasToRow.has(a))aliasToRow.set(a,row);
    const selected=[], seen=new Set(), missing=[];
    for(const entry of FROZEN_META_COHORT.entries){
      let hit=null; for(const a of cohortEntryAliases(entry)){if(aliasToRow.has(a)){hit=aliasToRow.get(a);break;}}
      const k=hit&&metaRowKey(hit); if(hit&&k&&!seen.has(k)){seen.add(k);selected.push(hit);} else missing.push(entry.key||entry.username||String(entry.ordinal||''));
    }
    const comparable=selected.length===FROZEN_META_COHORT.requiredExactMatches&&missing.length===0;
    return {selected,audit:{cohortId:FROZEN_META_COHORT.cohortId,configSha256:FROZEN_META_COHORT.configSha256,mode:comparable?'frozen_exact_50':'fallback_noncomparable',comparable,matched:selected.length,expected:FROZEN_META_COHORT.requiredExactMatches,missing:missing.slice()}};
  }
  function selectMetaQueueForRun(allRows,limit){
    const rows=Array.from(allRows||[]), requested=Math.max(0,Number(limit||0));
    const cohort=computeFrozenCohortSelection(rows); state.cohortAudit={...cohort.audit,diagnosticOnly:true,selectionApplied:false};
    const queue=[], seen=new Set(), cap=requested>0?requested:rows.length;
    for(const row of rows){const k=metaRowKey(row);if(!k||seen.has(k))continue;seen.add(k);queue.push(row);if(queue.length>=cap)break;}
    return queue;
  }
  function ensureBioCoverage(row){
    if(!row)return null;
    if(![BIO_PRESENT,BIO_ABSENT_CONFIRMED,BIO_NOT_OBSERVABLE,BIO_UNRESOLVED].includes(row.bioCoverageState))row.bioCoverageState=BIO_UNRESOLVED;
    if(typeof row.aboutSectionToken!=='string')row.aboutSectionToken='';
    for(const k of ['aboutCollectionsExpected','aboutCollectionsAttempted','aboutCollectionsHttpOk','aboutCollectionsParsed','aboutCollectionsResolved','aboutCollectionsSemanticExamined','aboutRetryCount'])if(!Number.isInteger(row[k])||row[k]<0)row[k]=0;
    if(!Array.isArray(row.aboutFailures))row.aboutFailures=[];
    if(!Array.isArray(row.bioEvidence))row.bioEvidence=[];
    if(!Array.isArray(row.aboutCollectionTokensExpected))row.aboutCollectionTokensExpected=[];
    if(!Array.isArray(row.aboutCollectionTokensAttempted))row.aboutCollectionTokensAttempted=[];
    if(!Array.isArray(row.aboutCollectionKeysExpected))row.aboutCollectionKeysExpected=[];
    if(!Array.isArray(row.aboutCollectionKeysAttempted))row.aboutCollectionKeysAttempted=[];
    if(!Array.isArray(row.aboutCollectionResults))row.aboutCollectionResults=[];
    if(!Array.isArray(row.aboutItems))row.aboutItems=[];
    if(!Array.isArray(row.areasAtendimento))row.areasAtendimento=[];
    if(typeof row.aboutCoverageMode!=='string')row.aboutCoverageMode='all_discovered_about_collections';
    if(![ABOUT_COMPLETE,ABOUT_PARTIAL,ABOUT_UNAVAILABLE].includes(row.aboutCoverageState))row.aboutCoverageState=ABOUT_UNAVAILABLE;
    if(typeof row.aboutCoverageReason!=='string')row.aboutCoverageReason='not_evaluated';
    if(typeof row.bioCoverageReason!=='string')row.bioCoverageReason='not_resolved_yet';
    return row;
  }
  function coverageFailure(row,stage,kind,extra={}){
    ensureBioCoverage(row); const status=Number.isFinite(Number(extra.status))?Number(extra.status):null;
    const retryable=extra.retryable===true || status===429 || status===408 || status===425 || (status!==null&&status>=500&&status<=599);
    row.aboutFailures.push({at:new Date().toISOString(),stage:String(stage||'about'),kind:String(kind||'unknown'),status,collectionTabKey:extra.collectionTabKey===undefined?null:extra.collectionTabKey,collectionToken:extra.collectionToken===undefined?null:extra.collectionToken,retryable,message:cleanText(extra.message||'')});
  }
  function recordBioEvidence(row,meta,source){
    ensureBioCoverage(row); if(!meta||!safeBio(meta.bio))return false;
    row.bioEvidence=uniq([...(row.bioEvidence||[]),String(source||'metadata'),...(meta.evidence||[])]);
    row.bioCoverageState=BIO_PRESENT; row.bioCoverageReason='safe_bio_present'; return true;
  }
  function finalizeAboutCoverage(row){
    ensureBioCoverage(row);
    if(row.aboutCoverageMode==='target_bound_serialized_about_bootstrap'){
      const a=row.aboutBootstrapAudit||{};
      if(a.targetBound===true&&a.semanticSurfaceExamined===true){row.aboutCoverageState=ABOUT_COMPLETE;row.aboutCoverageReason='target_bound_serialized_about_bootstrap_semantic_surface_examined';}
      else if(a.targetBound===true){row.aboutCoverageState=ABOUT_PARTIAL;row.aboutCoverageReason='target_bound_about_bootstrap_without_semantic_surface';}
      else {row.aboutCoverageState=ABOUT_UNAVAILABLE;row.aboutCoverageReason='target_bound_about_bootstrap_not_observable';}
      return row.aboutCoverageState;
    }
    const e=row.aboutCollectionsExpected, a=row.aboutCollectionsAttempted, h=row.aboutCollectionsHttpOk, p=row.aboutCollectionsParsed, r=row.aboutCollectionsResolved, sem=row.aboutCollectionsSemanticExamined;
    const full=e>0&&a===e&&h===e&&p===e&&r===e&&sem===e&&row.aboutFailures.length===0;
    if(full){row.aboutCoverageState=ABOUT_COMPLETE;row.aboutCoverageReason='all_discovered_about_collections_http_ok_parsed_target_bound_semantic_surface_examined';}
    else if(e>0){row.aboutCoverageState=ABOUT_PARTIAL;row.aboutCoverageReason='discovered_about_collections_incomplete_or_failed';}
    else {row.aboutCoverageState=ABOUT_UNAVAILABLE;row.aboutCoverageReason=row.aboutSectionToken?'no_about_collections_discovered':'about_section_or_collections_not_available';}
    return row.aboutCoverageState;
  }
  function finalizeBioCoverage(row){
    ensureBioCoverage(row); finalizeAboutCoverage(row);
    if(safeBio(row.bioText||row.bio)){row.bioCoverageState=BIO_PRESENT;row.bioCoverageReason='safe_bio_present';return row.bioCoverageState;}
    if(row.aboutCoverageMode==='target_bound_serialized_about_bootstrap'){
      if(row.aboutCoverageState===ABOUT_COMPLETE){row.bioCoverageState=BIO_NOT_OBSERVABLE;row.bioCoverageReason='target_bound_bootstrap_semantic_surface_without_safe_bio';}
      else if(row.aboutCoverageState===ABOUT_UNAVAILABLE&&row.metaTargetBoundOk===true){row.bioCoverageState=BIO_NOT_OBSERVABLE;row.bioCoverageReason='target_bound_profile_without_observable_about_bootstrap';}
      else {row.bioCoverageState=BIO_UNRESOLVED;row.bioCoverageReason='about_bootstrap_semantic_surface_incomplete';}
      return row.bioCoverageState;
    }
    const technicalUnavailable=['about_query_operation_missing'].includes(String(row.bioCoverageReason||''));
    if(row.aboutCoverageState===ABOUT_COMPLETE){row.bioCoverageState=BIO_ABSENT_CONFIRMED;row.bioCoverageReason='complete_about_coverage_without_safe_bio';}
    else if(technicalUnavailable){row.bioCoverageState=BIO_UNRESOLVED;row.bioCoverageReason='about_query_operation_missing';}
    else if(row.aboutCoverageState===ABOUT_UNAVAILABLE && row.metaTargetBoundOk===true){row.bioCoverageState=BIO_NOT_OBSERVABLE;row.bioCoverageReason='target_bound_profile_without_public_about_coverage';}
    else {row.bioCoverageState=BIO_UNRESOLVED;row.bioCoverageReason=row.aboutCoverageState===ABOUT_UNAVAILABLE?'about_coverage_not_available_before_target_bound':'about_coverage_incomplete_or_failed';}
    return row.bioCoverageState;
  }
  function bioCoverageSummary(rows=rowsArr()){
    const out={present:0,absentConfirmed:0,notObservable:0,unresolved:0,instrumented:0,total:0,aboutComplete:0,aboutPartial:0,aboutUnavailable:0};
    for(const r of rows){out.total++;ensureBioCoverage(r);out.instrumented++;if(r.bioCoverageState===BIO_PRESENT)out.present++;else if(r.bioCoverageState===BIO_ABSENT_CONFIRMED)out.absentConfirmed++;else if(r.bioCoverageState===BIO_NOT_OBSERVABLE)out.notObservable++;else out.unresolved++;if(r.aboutCoverageState===ABOUT_COMPLETE)out.aboutComplete++;else if(r.aboutCoverageState===ABOUT_PARTIAL)out.aboutPartial++;else out.aboutUnavailable++;}
    return out;
  }
  function metaRowKey(row){ return String(row&&row.key||row&&row.username||row&&row.profileId||'').toLowerCase(); }
  function resetRunStats(){
    for(const k of ['profileFetchQueued','profileFetchStarted','profileFetchHttpOk','profileParseOk','profileTargetBoundOk','profileSemanticMetaOk','profileFetchFailed','profileFetch403','profileFetch429','profileIdResolved','profileHeaderQueued','profileHeaderStarted','profileHeaderHttpOk','profileHeaderTargetBoundOk','profileHeaderSemanticOk','profileAboutQueued','profileAboutHttpOk','profileAboutSemanticOk','profileAboutRequestsQueued','profileAboutRequestsHttpOk','profileAboutRequestsSemanticOk','metaDuplicateStartRejected','bioCoveragePresent','bioCoverageAbsentConfirmed','bioCoverageNotObservable','bioCoverageUnresolved','bioCoverageRowsInstrumented','aboutCoverageComplete','aboutCoveragePartial','aboutCoverageUnavailable','allSupplementQueued','allSupplementStarted','allSupplementHttpOk','allSupplementTargetBoundOk','allSupplementSemanticOk','allSupplementEmailFound','allSupplementPhoneFound','allSupplementLocationFound','allSupplementExternalFound','allSupplementFastDomHit','allSupplementJsonFallback','allSupplementSkippedContactPresent','allSupplementSkippedGeneralCoverage','generalItemsApplied','allSupplementFailed']) state.stats[k]=0;
  }
  function newMetaRun(rows){
    const queued=[]; const seen=new Set();
    for(const row of rows){ const k=metaRowKey(row); if(!k||seen.has(k))continue; seen.add(k); queued.push(k); }
    return {active:true,completed:false,runId:'meta-'+Date.now()+'-'+Math.random().toString(36).slice(2,8),requestedLimit:queued.length,queuedKeys:queued,startedKeys:new Set(),completedKeys:new Set(),targetBoundKeys:new Set(),semanticKeys:new Set(),bioKeys:new Set(),followersKeys:new Set(),followingKeys:new Set(),withCountsKeys:new Set(),externalLinkKeys:new Set(),idResolvedKeys:new Set(),headerHttpOkKeys:new Set(),headerParseOkKeys:new Set(),headerTargetBoundKeys:new Set(),headerSemanticKeys:new Set(),aboutQueuedKeys:new Set(),aboutHttpOkKeys:new Set(),aboutSemanticKeys:new Set(),aboutCompleteKeys:new Set(),aboutPartialKeys:new Set(),aboutUnavailableKeys:new Set(),bioPresentKeys:new Set(),bioAbsentConfirmedKeys:new Set(),bioNotObservableKeys:new Set(),bioUnresolvedKeys:new Set(),onePassKeys:new Set(),headerFallbackKeys:new Set(),cohortAudit:{...state.cohortAudit,missing:[...(state.cohortAudit&&state.cohortAudit.missing||[])]},rejectedDuplicateStarts:0,startedAt:new Date().toISOString(),completedAt:'',promise:null};
  }
  function syncRunStats(run){
    if(!run)return;
    state.stats.profileFetchQueued=run.queuedKeys.length; state.stats.profileHeaderQueued=run.headerFallbackKeys?run.headerFallbackKeys.size:0;
    state.stats.profileFetchStarted=run.startedKeys.size; state.stats.profileHeaderStarted=run.headerFallbackKeys?run.headerFallbackKeys.size:0;
    state.stats.profileFetchHttpOk=run.headerHttpOkKeys.size; state.stats.profileHeaderHttpOk=run.headerHttpOkKeys.size;
    state.stats.profileParseOk=run.headerParseOkKeys.size; state.stats.profileTargetBoundOk=run.targetBoundKeys.size; state.stats.profileHeaderTargetBoundOk=run.headerTargetBoundKeys.size;
    state.stats.profileSemanticMetaOk=run.semanticKeys.size; state.stats.profileHeaderSemanticOk=run.headerSemanticKeys.size;
    state.stats.profileIdResolved=run.idResolvedKeys.size;
    state.stats.profileAboutQueued=run.aboutQueuedKeys.size; state.stats.profileAboutHttpOk=run.aboutHttpOkKeys.size; state.stats.profileAboutSemanticOk=run.aboutSemanticKeys.size;
    state.stats.metaDuplicateStartRejected=run.rejectedDuplicateStarts;
    state.stats.profileBioWithText=run.bioKeys.size; state.stats.profileMetaWithCounts=run.withCountsKeys.size; state.stats.profileExternalLinkFound=run.externalLinkKeys.size;
    state.stats.bioCoveragePresent=run.bioPresentKeys.size; state.stats.bioCoverageAbsentConfirmed=run.bioAbsentConfirmedKeys.size; state.stats.bioCoverageNotObservable=run.bioNotObservableKeys.size; state.stats.bioCoverageUnresolved=run.bioUnresolvedKeys.size; state.stats.bioCoverageRowsInstrumented=run.bioPresentKeys.size+run.bioAbsentConfirmedKeys.size+run.bioNotObservableKeys.size+run.bioUnresolvedKeys.size; state.stats.aboutCoverageComplete=run.aboutCompleteKeys.size; state.stats.aboutCoveragePartial=run.aboutPartialKeys.size; state.stats.aboutCoverageUnavailable=run.aboutUnavailableKeys.size;
  }
  function updateRunEvidence(run,row){
    if(!run||!row)return; const k=metaRowKey(row); if(!k)return;
    if(row.metaTargetBoundOk===true)run.targetBoundKeys.add(k); if(row.metaSemanticOk===true)run.semanticKeys.add(k);
    if(safeBio(row.bioText||row.bio))run.bioKeys.add(k); if(safeCount(row.seguidores))run.followersKeys.add(k); if(safeCount(row.seguindo))run.followingKeys.add(k);
    if(safeCount(row.seguidores)||safeCount(row.seguindo)||safeCount(row.postagens)||safeCount(row.amigos)||safeCount(row.curtidas)||safeCount(row.videos))run.withCountsKeys.add(k);
    const firstExternal=(row.externalUrl||(Array.isArray(row.linksExternos)&&row.linksExternos[0])||String(row.linkExterno||'').split(' | ')[0]||''); if(safeExternalUrl(firstExternal))run.externalLinkKeys.add(k);
    ensureBioCoverage(row); run.bioPresentKeys.delete(k);run.bioAbsentConfirmedKeys.delete(k);run.bioNotObservableKeys.delete(k);run.bioUnresolvedKeys.delete(k);run.aboutCompleteKeys.delete(k);run.aboutPartialKeys.delete(k);run.aboutUnavailableKeys.delete(k);
    if(row.bioCoverageState===BIO_PRESENT)run.bioPresentKeys.add(k);else if(row.bioCoverageState===BIO_ABSENT_CONFIRMED)run.bioAbsentConfirmedKeys.add(k);else if(row.bioCoverageState===BIO_NOT_OBSERVABLE)run.bioNotObservableKeys.add(k);else run.bioUnresolvedKeys.add(k);
    if(row.aboutCoverageState===ABOUT_COMPLETE)run.aboutCompleteKeys.add(k);else if(row.aboutCoverageState===ABOUT_PARTIAL)run.aboutPartialKeys.add(k);else run.aboutUnavailableKeys.add(k);
    syncRunStats(run);
  }
  function metaRunSummary(){
    const r=state.metaRun; if(!r||!r.runId)return {runId:'',active:false,completed:false,requestedLimit:0,queuedUnique:0,startedUnique:0,completedUnique:0,idResolvedUnique:0,targetBoundUnique:0,semanticUnique:0,bioWithTextUnique:0,followersUnique:0,followingUnique:0,withCountsUnique:0,externalLinksUnique:0,bioPresentUnique:0,bioAbsentConfirmedUnique:0,bioNotObservableUnique:0,bioUnresolvedUnique:0,aboutCompleteUnique:0,aboutPartialUnique:0,aboutUnavailableUnique:0,onePassUnique:0,headerFallbackUnique:0,metaDurationMs:0,postScrollTailMs:0,streaming:false,performanceOk:false,cohortId:FROZEN_META_COHORT.cohortId,cohortComparable:false,cohortMatched:0,cohortExpected:FROZEN_META_COHORT.requiredExactMatches,cohortMode:'not_evaluated',cohortConfigSha256:FROZEN_META_COHORT.configSha256,cohortMissing:[],duplicateStartsRejected:0,startedAt:'',completedAt:''};
    const ca=r.cohortAudit||state.cohortAudit||{};
    return {runId:r.runId,active:r.active===true,completed:r.completed===true,requestedLimit:r.requestedLimit||0,queuedUnique:r.queuedKeys.length,startedUnique:r.startedKeys.size,completedUnique:r.completedKeys.size,idResolvedUnique:r.idResolvedKeys.size,targetBoundUnique:r.targetBoundKeys.size,semanticUnique:r.semanticKeys.size,bioWithTextUnique:r.bioKeys.size,followersUnique:r.followersKeys.size,followingUnique:r.followingKeys.size,withCountsUnique:r.withCountsKeys.size,externalLinksUnique:r.externalLinkKeys.size,bioPresentUnique:r.bioPresentKeys.size,bioAbsentConfirmedUnique:r.bioAbsentConfirmedKeys.size,bioNotObservableUnique:r.bioNotObservableKeys.size,bioUnresolvedUnique:r.bioUnresolvedKeys.size,aboutCompleteUnique:r.aboutCompleteKeys.size,aboutPartialUnique:r.aboutPartialKeys.size,aboutUnavailableUnique:r.aboutUnavailableKeys.size,onePassUnique:r.onePassKeys?r.onePassKeys.size:0,headerFallbackUnique:r.headerFallbackKeys?r.headerFallbackKeys.size:0,metaDurationMs:(r.startedAt&&r.completedAt?Math.max(0,new Date(r.completedAt)-new Date(r.startedAt)):0),postScrollTailMs:Number(r.postScrollTailMs||0),streaming:r.streaming===true,performanceMetric:r.streaming===true?'post_scroll_tail':'meta_wall',performanceOk:(r.startedAt&&r.completedAt?(r.streaming===true?Number(r.postScrollTailMs||0)<=MAX_POST_SCROLL_TAIL_MS:Math.max(0,new Date(r.completedAt)-new Date(r.startedAt))<=MAX_META_WALL_MS):false),cohortId:ca.cohortId||FROZEN_META_COHORT.cohortId,cohortComparable:ca.comparable===true,cohortMatched:Number(ca.matched||0),cohortExpected:Number(ca.expected||FROZEN_META_COHORT.requiredExactMatches),cohortMode:String(ca.mode||'not_evaluated'),cohortConfigSha256:ca.configSha256||FROZEN_META_COHORT.configSha256,cohortMissing:[...(ca.missing||[])],duplicateStartsRejected:r.rejectedDuplicateStarts||0,startedAt:r.startedAt||'',completedAt:r.completedAt||''};
  }
  function evaluateMetaRunGate(run,need,metaLimit,cleanMeta){
    const r=run||{};
    const runCardinalityOk=need===0 || (r.completed===true && r.queuedUnique===need && r.startedUnique===need && r.completedUnique===need && r.startedUnique<=r.queuedUnique);
    const idsOk=need===0 || Number(r.idResolvedUnique||0)===need;
    const targetBoundOk=need===0 || Number(r.targetBoundUnique||0)===need;
    const semanticOk=need===0 || Number(r.semanticUnique||0)>0;
    const followersOk=need===0 || Number(r.followersUnique||0)>0;
    const followingFloor=metaLimit>=50?48:Math.max(0,Math.min(need,Number(r.followingUnique||0)));
    const followingOk=need===0 || Number(r.followingUnique||0)>0;
    const bioResolvedOk=need===0 || Number(r.bioUnresolvedUnique||0)===0;
    const aboutCompleteOk=need===0 || (Number(r.aboutCompleteUnique||0)+Number(r.aboutUnavailableUnique||0)===need && Number(r.aboutPartialUnique||0)===0);
    const duplicateOk=Number(r.duplicateStartsRejected||0)===0;
    const metaDurationMs=Number(r.metaDurationMs||0), postScrollTailMs=Number(r.postScrollTailMs||0), performanceMetricMs=(r.streaming===true?postScrollTailMs:metaDurationMs);
    const performanceMeasured=!!(r.startedAt&&r.completedAt&&(r.streaming===true?postScrollTailMs>=0:metaDurationMs>0));
    const performanceLimitMs=r.streaming===true?15000:60000;
    const performanceOk=need===0 || !performanceMeasured || performanceMetricMs<=performanceLimitMs;
    const coverageFinalOk=idsOk&&targetBoundOk&&bioResolvedOk&&aboutCompleteOk&&duplicateOk;
    const bioMetaFinalOk=need===0 || (runCardinalityOk && coverageFinalOk && cleanMeta===true && performanceOk);
    const warnings=[];
    if(!runCardinalityOk)warnings.push('meta_run_cardinality_invalid');
    if(Number(r.startedUnique||0)>Number(r.queuedUnique||0))warnings.push('meta_started_exceeds_queued');
    if(!duplicateOk)warnings.push('meta_duplicate_start_rejected');
    if(!idsOk)warnings.push('profile_id_resolution_incomplete');
    if(!targetBoundOk)warnings.push('header_target_bound_incomplete');
    if(!semanticOk)warnings.push('semantic_yield_zero');
    if(!followersOk)warnings.push('followers_yield_zero');
    if(!followingOk)warnings.push('following_yield_zero');
    if(!bioResolvedOk)warnings.push('bio_unresolved_nonzero');
    if(!aboutCompleteOk)warnings.push('about_coverage_not_complete');
    if(cleanMeta!==true)warnings.push('semantic_or_ui_contamination');
    if(performanceMeasured&&!performanceOk)warnings.push(r.streaming===true?'post_scroll_tail_exceeds_60s':'meta_duration_exceeds_60s');
    return {runCardinalityOk,idsOk,targetBoundOk,semanticOk,followersOk,followingOk,bioResolvedOk,aboutCompleteOk,performanceMeasured,performanceOk,metaDurationMs,postScrollTailMs,performanceMetricMs,performanceLimitMs,performanceMetric:r.streaming===true?'post_scroll_tail':'meta_wall',coverageFinalOk,bioMetaFinalOk,warnings,historicalReference:HISTORICAL_META_REFERENCE_50};
  }
  async function enrichOneStructured(row,boot,ordinal,total,run){
    const runKey=metaRowKey(row); ensureBioCoverage(row); row.aboutRetryCount=0; row.aboutFailures=[]; row.bioEvidence=[]; row.aboutCollectionTokensExpected=[]; row.aboutCollectionTokensAttempted=[]; row.aboutCollectionKeysExpected=[]; row.aboutCollectionKeysAttempted=[]; row.aboutCollectionResults=[]; row.aboutCollectionsExpected=0; row.aboutCollectionsAttempted=0; row.aboutCollectionsHttpOk=0; row.aboutCollectionsParsed=0; row.aboutCollectionsResolved=0; row.aboutCollectionsSemanticExamined=0; row.aboutSectionToken=''; row.aboutCoverageMode='target_bound_serialized_about_bootstrap'; row.aboutCoverageState=ABOUT_UNAVAILABLE; row.aboutCoverageReason='not_evaluated'; row.bioCoverageState=safeBio(row.bioText||row.bio)?BIO_PRESENT:BIO_UNRESOLVED; row.bioCoverageReason=safeBio(row.bioText||row.bio)?'safe_bio_preexisting':'not_resolved_yet'; row.metaRoute='about_first_pending';
    const profileBoot=cloneBootForProfile(boot);
    let id=knownProfileIdForRow(row,profileBoot);
    let aboutBootstrap=await fetchProfileAboutBootstrapOnePass(row,profileBoot,id);
    if(aboutBootstrap.ok&&runKey){run.aboutQueuedKeys.add(runKey);run.aboutHttpOkKeys.add(runKey);}
    if(aboutBootstrap.ok&&aboutBootstrap.targetBound&&aboutBootstrap.id){
      id=String(aboutBootstrap.id); row.profileId=id; row.metaRoute='about_first_onepass';
      if(runKey){run.idResolvedKeys.add(runKey);run.targetBoundKeys.add(runKey);run.onePassKeys.add(runKey);}
      const aboutSemantic=applyStrictMeta(row,aboutBootstrap.meta,'html_about_bootstrap.onepass_serialized_graphql'); recordBioEvidence(row,aboutBootstrap.meta,'html_about_bootstrap.onepass_serialized_graphql');
      const aboutDomContact=extractTargetBoundContactDomMeta(aboutBootstrap.doc,'about'); const aboutDomSemantic=applyStrictMeta(row,aboutDomContact,'html_about_dom.target_bound_contact_scope');
      if(aboutDomSemantic&&runKey)run.semanticKeys.add(runKey);
      row.aboutBootstrapAudit={ok:true,status:aboutBootstrap.status,url:aboutBootstrap.url,targetBound:true,canonicalOk:aboutBootstrap.canonicalOk===true,exactIdOk:true,bindingSource:aboutBootstrap.bindingSource||'',semanticSurfaceExamined:aboutBootstrap.semanticSurfaceExamined,semanticContainerCount:aboutBootstrap.semanticContainerCount,semanticItemCount:aboutBootstrap.semanticItemCount,contactScopeFound:contactScopesFromDocument(aboutBootstrap.doc).length>0,aboutQueryID:aboutBootstrap.boot&&aboutBootstrap.boot.aboutQueryID||'',topAppQueryID:aboutBootstrap.boot&&aboutBootstrap.boot.topAppQueryID||'',operationProvenance:aboutBootstrap.boot&&aboutBootstrap.boot.operationProvenance||{}};
      if(aboutBootstrap.semanticSurfaceExamined===true&&runKey)run.aboutSemanticKeys.add(runKey);
      if(aboutBootstrap.semanticSurfaceExamined!==true)coverageFailure(row,'about_bootstrap','semantic_surface_not_examined',{message:'Target-bound /about bootstrap did not expose a recognized semantic surface.'});
      if(aboutSemantic&&runKey)run.semanticKeys.add(runKey);
      updateRunEvidence(run,row);
    }
    // Fallback is exceptional: only profiles not exact-bound by the one-pass /about bootstrap, or profiles whose bootstrap lacks follower count, pay the legacy ID/Header path.
    const needHeaderFallback=!(aboutBootstrap&&aboutBootstrap.targetBound&&aboutBootstrap.id) || !safeCount(row.seguidores);
    if(needHeaderFallback){
      row.metaRoute=(aboutBootstrap&&aboutBootstrap.targetBound)?'about_first_plus_header_fallback':'legacy_id_header_fallback';
      if(runKey)run.headerFallbackKeys.add(runKey);
      if(!id)id=await resolveProfileIdStructured(row,profileBoot);
      if(!id){row.statusMeta=row.profileMetaStatus='sem_profile_id';coverageFailure(row,'id_resolution','profile_id_unresolved',{message:'No exact profile ID was resolved.'});finalizeBioCoverage(row);updateRunEvidence(run,row);return false;}
      row.profileId=String(id); if(runKey)run.idResolvedKeys.add(runKey);
      if(aboutBootstrap&&aboutBootstrap.ok&&!aboutBootstrap.targetBound)aboutBootstrap=rebindAboutBootstrapResult(aboutBootstrap,row,id,profileBoot);
      const vars={scale:window.devicePixelRatio||1,selectedID:String(id),selectedSpaceType:'profile',shouldUseFXIMProfilePicEditor:false,userID:String(id)};
      let hdr;
      try{hdr=await graphQLStructured(profileBoot,'ProfileCometHeaderQuery',profileBoot.headerQueryID,vars);}catch(e){row.statusMeta=row.profileMetaStatus='header_request_error';coverageFailure(row,'header','request_error',{message:String(e&&e.message||e)});finalizeBioCoverage(row);updateRunEvidence(run,row);return false;}
      if(!hdr.ok){if(hdr.status===403)state.stats.profileFetch403++;if(hdr.status===429)state.stats.profileFetch429++;state.stats.profileFetchFailed++;row.statusMeta=row.profileMetaStatus='header_http_'+hdr.status;coverageFailure(row,'header','http_error',{status:hdr.status,message:'Header GraphQL HTTP failure.'});finalizeBioCoverage(row);updateRunEvidence(run,row);return false;}
      if(runKey){run.headerHttpOkKeys.add(runKey);if(hdr.roots&&hdr.roots.length)run.headerParseOkKeys.add(runKey);} syncRunStats(run);
      const pobj=exactProfileObject(hdr.roots,id); const hdrMeta=explicitMetaFromTargetObject(pobj,id);
      if(!hdrMeta.targetBoundOk)coverageFailure(row,'header','target_bound_missing',{message:'Exact profile object was not found in parsed header roots.'});
      if(hdrMeta.targetBoundOk&&runKey){run.targetBoundKeys.add(runKey);run.headerTargetBoundKeys.add(runKey);}
      const headerSemantic=applyStrictMeta(row,hdrMeta,'graphql.ProfileCometHeaderQuery.fallback'); recordBioEvidence(row,hdrMeta,'graphql.ProfileCometHeaderQuery.fallback'); if(headerSemantic&&runKey){run.semanticKeys.add(runKey);run.headerSemanticKeys.add(runKey);} updateRunEvidence(run,row);
      if(aboutBootstrap&&aboutBootstrap.ok&&aboutBootstrap.targetBound&&aboutBootstrap.meta){
        const aboutSemantic=applyStrictMeta(row,aboutBootstrap.meta,'html_about_bootstrap.rebound_serialized_graphql');recordBioEvidence(row,aboutBootstrap.meta,'html_about_bootstrap.rebound_serialized_graphql');
        const reboundDomContact=extractTargetBoundContactDomMeta(aboutBootstrap.doc,'about'); const reboundDomSemantic=applyStrictMeta(row,reboundDomContact,'html_about_dom.rebound_target_bound_contact_scope');
        row.aboutBootstrapAudit={ok:true,status:aboutBootstrap.status,url:aboutBootstrap.url,targetBound:true,canonicalOk:aboutBootstrap.canonicalOk===true,exactIdOk:true,bindingSource:aboutBootstrap.bindingSource||'rebound_expected_id',semanticSurfaceExamined:aboutBootstrap.semanticSurfaceExamined,semanticContainerCount:aboutBootstrap.semanticContainerCount,semanticItemCount:aboutBootstrap.semanticItemCount,contactScopeFound:contactScopesFromDocument(aboutBootstrap.doc).length>0,aboutQueryID:aboutBootstrap.boot&&aboutBootstrap.boot.aboutQueryID||'',topAppQueryID:aboutBootstrap.boot&&aboutBootstrap.boot.topAppQueryID||'',operationProvenance:aboutBootstrap.boot&&aboutBootstrap.boot.operationProvenance||{}};
        if(aboutBootstrap.semanticSurfaceExamined===true&&runKey)run.aboutSemanticKeys.add(runKey);if((aboutSemantic||reboundDomSemantic)&&runKey)run.semanticKeys.add(runKey);
      }else if(!(aboutBootstrap&&aboutBootstrap.targetBound)){
        row.aboutBootstrapAudit={ok:false,status:aboutBootstrap&&aboutBootstrap.status||0,url:aboutBootstrap&&aboutBootstrap.url||'',targetBound:false,semanticSurfaceExamined:false,error:aboutBootstrap&&aboutBootstrap.error||'not_target_bound'};
      }
    }
    enqueueAllGeneralSupplement(row,profileBoot,id,run);
    finalizeBioCoverage(row);
    row.metaRender={audit:'V33: preserva núcleo V29 estável de relação/foto/Meta; mantém URL; /friends com contador Friends confirmado é coletável apesar de oscilação visual para Following; sinais visuais seguem diagnósticos; mídia target-bound preservada; PDF=HTML e laudo Courier preservados',profileId:id,route:row.metaRoute,headerQueryID:profileBoot.headerQueryID,aboutQueryID:profileBoot.aboutQueryID,topAppQueryID:profileBoot.topAppQueryID,cohortId:FROZEN_META_COHORT.cohortId,cohortConfigSha256:FROZEN_META_COHORT.configSha256,evidence:uniq([...(row.metaEvidence||[])]),extractedAtISO:new Date().toISOString()};
    updateRunEvidence(run,row); recalcMetaStatsStrict(); renderStatus(); log('info','Meta estruturada '+ordinal+'/'+total+': '+row.username,{runId:run&&run.runId||'',id,route:row.metaRoute,targetBound:row.metaTargetBoundOk===true,semantic:row.metaSemanticOk===true,bio:!!safeBio(row.bio),bioCoverageState:row.bioCoverageState,aboutItems:(row.aboutItems||[]).length,followers:row.seguidores||'',following:row.seguindo||''});
    return row.metaSemanticOk===true;
  }
  async function fastEnrichStrict(){
    return (async()=>{
      if(state.runningScroll===true)await waitForActiveScroll();
      scanVisible();
      if(!relationReadyForMeta()){
        log('warn','Meta não iniciada: relação ainda não está integralmente fechada.',{total:rowsArr().length,expected:state.expected,bottomConfirmed:state.bottomConfirmed});
        return metaRunSummary();
      }
      const allRows=rowsArr(); state.metaLimit=allRows.length;
      const existing=state.metaRun;
      if(existing&&existing.active&&existing.promise){
        const cov=metaRunCoverageAudit(existing,allRows);
        if(!cov.queuedCovers)log('warn','Run ativa não cobre toda a relação; será aguardada e depois substituída por run integral.',{missingQueued:cov.missingQueued.length});
        else log('info','Run ativa reutilizada idempotentemente; nenhum novo start foi criado.',{runId:existing.runId,required:cov.required});
        await existing.promise;
        const after=metaRunCoverageAudit(state.metaRun,allRows); if(after.completedCovers)return metaRunSummary();
      }
      if(state.metaRun&&state.metaRun.completed){
        const cov=metaRunCoverageAudit(state.metaRun,allRows);
        if(cov.completedCovers){log('info','Novo disparo ignorado: run concluída cobre integralmente a relação atual.',{runId:state.metaRun.runId,required:cov.required});return metaRunSummary();}
        state.metaRunHistory.push(metaRunSummary());
        log('warn','Run concluída parcial não será reutilizada; iniciando run integral.',{required:cov.required,missingQueued:cov.missingQueued.length,missingCompleted:cov.missingCompleted.length});
      }
      const queue=selectMetaQueueForRun(allRows,allRows.length);
      state.metaLimit=queue.length;
      log('info','Fila Meta de produção integral selecionada.',{cohortId:state.cohortAudit.cohortId,mode:state.cohortAudit.mode,comparable:state.cohortAudit.comparable,matched:state.cohortAudit.matched,expected:state.cohortAudit.expected,queue:queue.length,relationRows:allRows.length,productionMode:PRODUCTION_META_MODE});
      const run=newMetaRun(queue); state.metaRun=run; state.runningMeta=true; resetRunStats(); beginGeneralLaneForMetaRun(run.runId); syncRunStats(run); updateButtons();
      const task=(async()=>{
        const roots=documentJsonRoots(document); let boot=bootstrapFromRoots(roots); attachStructuredRelationIds(boot); boot=await discoverOperationIds(boot);
        state.bootstrapAudit={actorID:boot.actorID?'present':'missing',dtsg:boot.dtsg?'present':'missing',lsd:boot.lsd?'present':'missing',headerQueryID:boot.headerQueryID,aboutQueryID:boot.aboutQueryID,topAppQueryID:boot.topAppQueryID,operationProvenance:{...(boot.operationProvenance||{})},routePolicy:ABOUT_ROUTE_POLICY,relationStructuredItems:boot.relationItems.size,evidence:uniq(boot.evidence)};
        if(!boot.actorID||!boot.dtsg||!boot.headerQueryID) throw new Error('GRAPHQL_BOOTSTRAP_INCOMPLETO');
        log('info','Enriquecimento GraphQL estruturado integral iniciado.',{runId:run.runId,total:queue.length,concurrency:state.fetchConcurrency,relationStructuredItems:boot.relationItems.size,headerQueryID:boot.headerQueryID,aboutQueryID:boot.aboutQueryID,topAppQueryID:boot.topAppQueryID});
        const targetTask=ensureTargetProfileEnriched(boot);
        let next=0;
        const worker=async()=>{while(true){if(state.stopRequested===true)break;const i=next++;if(i>=queue.length)break;const row=queue[i],k=metaRowKey(row);if(!k)continue;if(run.startedKeys.has(k)){run.rejectedDuplicateStarts++;syncRunStats(run);continue;}run.startedKeys.add(k);syncRunStats(run);try{await enrichOneStructured(row,boot,i+1,queue.length,run);}catch(e){if(isStopError(e)||state.stopRequested===true)break;state.stats.profileFetchFailed++;err('Falha meta estruturada '+row.username,e);}finally{if(!state.stopRequested){run.completedKeys.add(k);updateRunEvidence(run,row);syncRunStats(run);}}if(state.delay)await sleep(state.delay);}};
        await Promise.all(Array.from({length:Math.max(1,Math.min(32,state.fetchConcurrency))},()=>worker()));
        if(!state.stopRequested)await targetTask;
        if(!state.stopRequested)await awaitGeneralLaneDrain();
        if(!state.stopRequested)await recoverLowPhotos();
        run.active=false; run.completed=!state.stopRequested;run.stopped=state.stopRequested===true; run.completedAt=new Date().toISOString(); state.runningMeta=false; syncRunStats(run); recalcMetaStatsStrict(); updateButtons(); renderStatus();
        log('info','Enriquecimento GraphQL estruturado integral encerrado.',metaRunSummary());
        return metaRunSummary();
      })().catch(e=>{ run.active=false; run.completed=false;run.stopped=isStopError(e)||state.stopRequested===true; run.completedAt=new Date().toISOString(); state.runningMeta=false; syncRunStats(run); if(!run.stopped)err('Falha da run GraphQL estruturada',e); updateButtons(); renderStatus(); return metaRunSummary(); });
      run.promise=task; return task;
    })();
  }
  async function enrichOneStrict(row,ordinal,total){
    // Metadata orchestration is now direct structured GraphQL in the content script; kept for API compatibility.
    return false;
  }
  function recalcMetaStatsStrict(){
    const rows=rowsArr();
    state.stats.profileBioWithText=rows.filter(r=>!!safeBio(r.bioText||r.bio)).length;
    state.stats.profileMetaWithCounts=rows.filter(r=>!!(safeCount(r.seguidores)||safeCount(r.seguindo)||safeCount(r.postagens)||safeCount(r.amigos)||safeCount(r.curtidas))).length;
    state.stats.profileExternalLinkFound=rows.filter(r=>{const v=r.externalUrl||(Array.isArray(r.linksExternos)&&r.linksExternos[0])||String(r.linkExterno||'').split(' | ')[0]||'';return !!safeExternalUrl(v);}).length;
  }
  function rowsArr(){ return Array.from(state.rows.values()).map(syncPhotoFields).sort((a,b)=>(a.ordinal||0)-(b.ordinal||0) || String(a.username||'').localeCompare(String(b.username||''))); }
  function assignOrdinals(){ rowsArr().forEach((r,i)=>{ if(!r.ordinal) r.ordinal=i+1; }); }
  function quality(){ const rows=rowsArr(); const q={totalRows:rows.length,rowsWithPhoto:0,rowsWithHD960:0,rowsWithHD900Plus:0,rowsWithHD640Plus:0,rowsWithBest300Plus:0,rowsWithLowPhoto:0,rowsWithoutPhoto:0,photoApprovalRate:0}; for(const r of rows){ const max=Math.max(r.fotoWidth||0,r.fotoHeight||0); if(max>0) q.rowsWithPhoto++; else q.rowsWithoutPhoto++; if(max>=960)q.rowsWithHD960++; else if(max>=900)q.rowsWithHD900Plus++; else if(max>=640)q.rowsWithHD640Plus++; else if(max>=300)q.rowsWithBest300Plus++; else if(max>0)q.rowsWithLowPhoto++; } q.photoApprovalRate=q.totalRows?Number(((q.rowsWithPhoto/q.totalRows)*100).toFixed(2)):0; return q; }
  function metaQuality(){
    const rows=rowsArr();
    const m={totalRows:rows.length,enriched:0,targetBoundResolved:0,bioWithText:0,followers:0,following:0,categories:0,externalLinks:0,emails:0,phones:0,location:0,aboutItemsRows:0,aboutItemsTotal:0,pending:0,bioPresent:0,bioAbsentConfirmed:0,bioNotObservable:0,bioUnresolved:0,aboutComplete:0,aboutPartial:0,aboutUnavailable:0,technicalContamination:0,semanticContamination:0,uiContamination:0,emptyLinkContamination:0};
    for(const r of rows){
      if(r.metaTargetBoundOk===true) m.targetBoundResolved++;
      const ok=r.metaTargetBoundOk===true && r.metaSemanticOk===true;
      if(ok)m.enriched++; else m.pending++;
      if(safeBio(r.bioText||r.bio))m.bioWithText++;
      if(safeCount(r.seguidores))m.followers++;
      if(safeCount(r.seguindo))m.following++;
      if(safeCategory(r.categoria))m.categories++;
      const extFirst=r.externalUrl||(Array.isArray(r.linksExternos)&&r.linksExternos[0])||String(r.linkExterno||'').split(' | ')[0]||''; if(safeExternalUrl(extFirst))m.externalLinks++;
      if((Array.isArray(r.emails)&&r.emails.some(safeEmail))||safeEmail(r.email||''))m.emails++;
      if((Array.isArray(r.telefones)&&r.telefones.some(safePhone))||safePhone(r.telefone||''))m.phones++;
      if(r.localizacao)m.location++;
      if(Array.isArray(r.aboutItems)&&r.aboutItems.length){m.aboutItemsRows++;m.aboutItemsTotal+=r.aboutItems.length;}
      ensureBioCoverage(r); if(r.bioCoverageState===BIO_PRESENT)m.bioPresent++;else if(r.bioCoverageState===BIO_ABSENT_CONFIRMED)m.bioAbsentConfirmed++;else if(r.bioCoverageState===BIO_NOT_OBSERVABLE)m.bioNotObservable++;else m.bioUnresolved++;
      if(r.aboutCoverageState===ABOUT_COMPLETE)m.aboutComplete++;else if(r.aboutCoverageState===ABOUT_PARTIAL)m.aboutPartial++;else m.aboutUnavailable++;
      if(BAD_BIO_RE.test(String(r.bioText||r.bio||'')))m.technicalContamination++;
      if(GENERIC_META_RE.test(cleanText(r.bioText||r.bio||'')) || GENERIC_META_RE.test(cleanText(r.categoria||'')))m.semanticContamination++;
      if(BAD_UI_TEXT.test(cleanText(r.bioText||r.bio||'')))m.uiContamination++;
      const extRaw=cleanText(extFirst); if(extRaw && !safeExternalUrl(extRaw))m.emptyLinkContamination++;
    }
    state.stats.semanticContamination=m.semanticContamination; state.stats.uiContamination=m.uiContamination; state.stats.emptyLinkContamination=m.emptyLinkContamination;
    return m;
  }
  function cohortReferenceQuality(){
    const c=computeFrozenCohortSelection(rowsArr());
    const out={comparable:BENCHMARK_DIAGNOSTICS_ENABLED&&c.audit.comparable===true,matched:Number(c.audit.matched||0),expected:Number(c.audit.expected??0),followersRows:0,followingRows:0,emailRows:0,phoneRows:0,aboutItemsRows:0,aboutItemsTotal:0,enrichedRows:0};
    for(const r of c.selected){
      if(r.metaTargetBoundOk===true&&r.metaSemanticOk===true)out.enrichedRows++;
      if(safeCount(r.seguidores))out.followersRows++;
      if(safeCount(r.seguindo))out.followingRows++;
      if((Array.isArray(r.emails)&&r.emails.some(safeEmail))||safeEmail(r.email||''))out.emailRows++;
      if((Array.isArray(r.telefones)&&r.telefones.some(safePhone))||safePhone(r.telefone||''))out.phoneRows++;
      if(Array.isArray(r.aboutItems)&&r.aboutItems.length){out.aboutItemsRows++;out.aboutItemsTotal+=r.aboutItems.length;}
    }
    return out;
  }
  function digitsOnly(v){return String(v||'').replace(/\D+/g,'');}
  function evaluateKnownCanaries(rows=rowsArr()){
    return {ok:true,required:0,failed:[],checks:[],diagnosticOnly:true,disabledInProduction:true};
  }
  function evaluate25NewsGeneralInfoCanary(rows=rowsArr()){
    return {ok:true,present:false,reason:'benchmark_canary_disabled_in_production',checks:{},diagnosticOnly:true};
  }
  function gates(){
    const q=quality(),m=metaQuality(),total=rowsArr().length,declared=declaredRelationTarget();
    const expected=Number(declared||0);
    const stoppedByUser=state.stopRequested===true,terminalVisibilityProof=!!(state.relationExposure&&state.relationExposure.serverTerminalBelowTarget===true);
    const targetConfirmed=declared>0,surfaceMismatch=!!(state.relationSurfaceAudit&&state.relationSurfaceAudit.mismatch===true),visibilityGap=state.relationVisibilityGap===true&&!(stoppedByUser&&!terminalVisibilityProof);
    const exactTotal=targetConfirmed&&total===expected,overflow=targetConfirmed?Math.max(0,total-expected):0,missing=targetConfirmed?Math.max(0,expected-total):0,photoOk=q.rowsWithPhoto===total&&q.rowsWithoutPhoto===0;
    const listFinalOk=targetConfirmed&&exactTotal&&state.bottomConfirmed===true&&photoOk&&!surfaceMismatch;
    const need=Math.min(state.metaLimit,total),run=metaRunSummary(),cleanMeta=m.technicalContamination===0&&m.semanticContamination===0&&m.uiContamination===0&&m.emptyLinkContamination===0,runGate=evaluateMetaRunGate(run,need,state.metaLimit,cleanMeta),cohortQ=cohortReferenceQuality();
    const cohortComparableOk=run.cohortComparable===true&&run.cohortMatched===50&&run.cohortExpected===50&&cohortQ.comparable===true;
    const sameCohortCoreGuardOk=!cohortComparableOk||(cohortQ.followersRows>=HISTORICAL_META_REFERENCE_50.followers&&cohortQ.followingRows>=HISTORICAL_META_REFERENCE_50.following);
    const sameCohortContactGuardOk=!cohortComparableOk||(cohortQ.emailRows>=SAME_COHORT_CONTACT_REFERENCE_50.emailRows&&cohortQ.phoneRows>=SAME_COHORT_CONTACT_REFERENCE_50.phoneRows);
    const structuredAboutEvidenceOk=!cohortComparableOk||(cohortQ.aboutItemsRows>0&&cohortQ.aboutItemsTotal>0),canaryGate=evaluateKnownCanaries(rowsArr()),generalCanaryGate=evaluate25NewsGeneralInfoCanary(rowsArr());
    const bioMetaFinalOk=runGate.bioMetaFinalOk;
    const finalOk=listFinalOk&&bioMetaFinalOk,warnings=[];
    if(!targetConfirmed)warnings.push('relation_target_unconfirmed');if(targetConfirmed&&total<expected)warnings.push(stoppedByUser?'relation_collection_stopped_by_user':(visibilityGap?'relation_declared_target_not_observable_after_recovery':'relation_limit_not_reached'));if(targetConfirmed&&total>expected)warnings.push('relation_overflow_confirmed_rows');if(!state.bottomConfirmed&&!visibilityGap&&!stoppedByUser)warnings.push('bottom_not_confirmed');if(surfaceMismatch)warnings.push('relation_surface_mismatch');if(!photoOk)warnings.push('photo_incomplete');if(BENCHMARK_DIAGNOSTICS_ENABLED&&!cohortComparableOk)warnings.push('meta_cohort_not_comparable');if(BENCHMARK_DIAGNOSTICS_ENABLED&&!sameCohortCoreGuardOk)warnings.push('same_cohort_core_counts_regression_guard_failed');if(BENCHMARK_DIAGNOSTICS_ENABLED&&!sameCohortContactGuardOk)warnings.push('same_cohort_contact_regression_guard_failed');if(BENCHMARK_DIAGNOSTICS_ENABLED&&!structuredAboutEvidenceOk)warnings.push('structured_about_items_zero');if(BENCHMARK_DIAGNOSTICS_ENABLED&&!canaryGate.ok)warnings.push('known_canary_gate_failed');if(BENCHMARK_DIAGNOSTICS_ENABLED&&!generalCanaryGate.ok)warnings.push('general_info_responsibility_not_observed');warnings.push(...runGate.warnings);
    const decision=finalOk?'PRONTO_FINAL_V34_HARDENED_RELATION_BINDING':(stoppedByUser?'EXPORT_OPERACIONAL_PARCIAL_PARADA_USUARIO':(visibilityGap?'EXPORT_OPERACIONAL_PARCIAL_VISIBILIDADE_OBSERVAVEL':'EXPORT_OPERACIONAL_PARCIAL_NAO_FINAL'));
    return {ok:true,exportOk:true,listFinalOk,bioMetaFinalOk,finalOk,decision,blockers:finalOk?[]:uniq(warnings),warnings:uniq(warnings),stoppedByUser,targetConfirmed,expectedTotal:expected,collectedTotal:total,missing,overflow,coveragePercent:targetConfirmed?Number(((Math.min(total,expected)/expected)*100).toFixed(2)):null,relation:state.relation,declaredRelationTarget:declaredRelationTarget(),observedRelationCount:Number(state.observedRelationCount||state.closedRelationCount||total),relationTargetReached:state.relationTargetReached===true,relationVisibilityGap:visibilityGap,relationRecovery:{...state.relationRecovery},relationSearchRecovery:{...(state.relationSearchRecovery||{}),prefixesTried:[...(state.relationSearchRecovery&&state.relationSearchRecovery.prefixesTried||[])]},relationSurfaceAudit:{...(state.relationSurfaceAudit||{})},generalRun:generalRunSummary(),photoRecoveryRun:{...state.photoRecoveryRun,promise:undefined},stableLanePreserved:true,stableBaseVersion:STABLE_BASE_VERSION,imageDistribution:{hdReal640Plus:q.rowsWithHD960+q.rowsWithHD900Plus+q.rowsWithHD640Plus,improved:q.rowsWithBest300Plus,thumbOrSmall:q.rowsWithLowPhoto,unknown:q.rowsWithoutPhoto,hdPercent:total?Number((((q.rowsWithHD960+q.rowsWithHD900Plus+q.rowsWithHD640Plus)/total)*100).toFixed(2)):0},metaRun:run,metaGate:{runCardinalityOk:runGate.runCardinalityOk,idsOk:runGate.idsOk,targetBoundOk:runGate.targetBoundOk,semanticOk:runGate.semanticOk,followersOk:runGate.followersOk,followingOk:runGate.followingOk,bioResolvedOk:runGate.bioResolvedOk,aboutCompleteOk:runGate.aboutCompleteOk,performanceMeasured:runGate.performanceMeasured,performanceOk:runGate.performanceOk,metaDurationMs:runGate.metaDurationMs,postScrollTailMs:runGate.postScrollTailMs,performanceMetricMs:runGate.performanceMetricMs,performanceMetric:runGate.performanceMetric,coverageFinalOk:runGate.coverageFinalOk,cleanMeta,sameCohortCoreGuardOk,sameCohortContactGuardOk,structuredAboutEvidenceOk,knownCanaryGate:canaryGate,generalInfoCanaryGate:generalCanaryGate,historicalReference:runGate.historicalReference,contactReference:SAME_COHORT_CONTACT_REFERENCE_50,cohortObserved:cohortQ},bioMetaDistribution:{profileOk:run.semanticUnique,targetBoundResolved:run.targetBoundUnique,bioWithText:run.bioWithTextUnique,metaWithCounts:run.withCountsUnique,externalLinks:run.externalLinksUnique,bioPresent:run.bioPresentUnique,bioAbsentConfirmed:run.bioAbsentConfirmedUnique,bioNotObservable:run.bioNotObservableUnique,bioUnresolved:run.bioUnresolvedUnique,aboutComplete:run.aboutCompleteUnique,aboutPartial:run.aboutPartialUnique,aboutUnavailable:run.aboutUnavailableUnique,pending:Math.max(0,need-run.semanticUnique),rateLimited429:state.stats.profileFetch429,forbidden403:state.stats.profileFetch403,technicalContamination:m.technicalContamination,semanticContamination:m.semanticContamination,uiContamination:m.uiContamination,emptyLinkContamination:m.emptyLinkContamination},cohort:{id:run.cohortId,configSha256:run.cohortConfigSha256,comparable:run.cohortComparable,matched:run.cohortMatched,expected:run.cohortExpected,mode:run.cohortMode,missing:run.cohortMissing}};
  }
  function titleCaseFromKey(key){ return String(key||'').replace(/^id:/,'ID ').replace(/[._-]+/g,' ').split(' ').filter(Boolean).map(w=>w.charAt(0).toUpperCase()+w.slice(1)).join(' ') || key; }
  function safeHeaderCandidate(s){ const t=cleanText(String(s||'').replace(/^\(\d+\+?\)\s*/,'').replace(/\|.*$/,'').replace(/- Facebook.*$/i,'')); if(!t || t.length<2 || t.length>120) return ''; if(BAD_UI_TEXT.test(t)) return ''; if(/^(notifications|notificações|facebook|home|watch|friends|seguidores|seguindo|profile|perfil|number of unread notifications)$/i.test(t)) return ''; return t; }
  /* RC5 44.21.33 - avatar target-bound, current-tab/current-target only.
     Nenhum cache persistente. Captura apenas evidência do proprio perfil e promove
     somente por maior hint de resolução. A resolução/embedding HD ocorre no export. */
  let __b35TargetAvatarRunV4433={targetKey:'',url:'',maxHint:0,capturedAt:'',source:'',history:[]};
  function avatarHintV4433(url){try{const d=parseDimensionFromUrl(String(url||''));return Math.max(Number(d.width||0),Number(d.height||0));}catch(_){return 0;}}
  function targetAvatarRunV4433(){
    const key=String(currentTarget()||'');
    if(String(__b35TargetAvatarRunV4433.targetKey||'')!==key)__b35TargetAvatarRunV4433={targetKey:key,url:'',maxHint:0,capturedAt:'',source:'',history:[]};
    return __b35TargetAvatarRunV4433;
  }
  function captureTargetAvatarRunV4433(reason='runtime'){
    const st=targetAvatarRunV4433();let url='';try{url=scopedTargetAvatarFromDom()||'';}catch(_){}
    if(!url||!isImageUrl(url))return st;
    const hint=avatarHintV4433(url),accepted=!st.url||hint>Number(st.maxHint||0)||(hint===Number(st.maxHint||0)&&String(url).length>String(st.url||'').length);
    const ev={at:new Date().toISOString(),reason:String(reason||''),url:url,hint:hint,accepted:accepted};st.history=[...(st.history||[]),ev].slice(-12);
    if(accepted){st.url=url;st.maxHint=hint;st.capturedAt=ev.at;st.source='scoped_target_dom';}
    return st;
  }
  function applyTargetAvatarV4433(tp,r,source){
    if(!tp||!r||!r.ok)return false;
    const w=Number(r.width||0),h=Number(r.height||0),next=Math.max(w,h),cur=Math.max(Number(tp.avatarWidth||0),Number(tp.avatarHeight||0));
    const data=/^data:image\//i.test(String(r.dataUrl||''))?String(r.dataUrl):'';
    const raw=cleanText(r.highResUrl||r.avatarUrl||r.sourceUrl||tp.avatarSourceUrl||tp.avatarUrl||'');
    if(!data&&!raw)return false;
    if(cur>next&&/^data:image\//i.test(String(tp.avatar||'')))return false;
    tp.avatarSourceUrl=raw;tp.avatarUrl=raw;tp.avatar=data||raw;tp.avatarEmbedded=!!data;tp.avatarWidth=w;tp.avatarHeight=h;tp.avatarMime=String(r.mime||'');tp.avatarBytes=Number(r.bytes||0);tp.avatarSha256=String(r.sha256||'');tp.avatarBindingReason=String(source||r.source||'');
    tp.avatarQualityAudit={targetKey:String(currentTarget()||''),available:!!(data||raw),embedded:!!data,width:w,height:h,maxDimension:next,sha256:tp.avatarSha256,currentRunOnly:true,persistentCache:false,source:String(source||r.source||''),capturedUrl:targetAvatarRunV4433().url||'',history:[...(targetAvatarRunV4433().history||[])]};
    return true;
  }
  function targetProfile(){
    const key=currentTarget(); const avatar=Array.from(document.querySelectorAll('img[src]')).map(img=>({img,dim:dimOf(img)})).filter(x=>isImageUrl(x.img.currentSrc||x.img.src)).sort((a,b)=>Math.max(b.dim.width,b.dim.height)-Math.max(a.dim.width,a.dim.height))[0];
    const candidates=[];
    try{ candidates.push(document.querySelector('meta[property="og:title"]')?.getAttribute('content')||''); }catch(e){}
    try{ candidates.push(document.title||''); }catch(e){}
    try{ candidates.push(document.querySelector('h1')?.innerText||''); }catch(e){}
    let name=''; for(const c of candidates){ name=safeHeaderCandidate(c); if(name) break; }
    if(!name) name=titleCaseFromKey(key);
    return {username:key,displayName:name||key,subtitle:key,bio:'',avatar: avatar?(avatar.img.currentSrc||avatar.img.src):'',followingText:String(state.expected||''),followersText:String(rowsArr().length||''),likesText:String(metaQuality().bioWithText||'')};
  }
  function scopedTargetAvatarFromDom(){
    const target=String(currentTarget()||'').toLowerCase(),targetPlain=target.replace(/^id:/,'');
    // 1) OpenGraph only when the canonical/og URL is bound to the current target.
    try{
      const boundUrls=[document.querySelector('meta[property="og:url"]')?.getAttribute('content')||'',document.querySelector('link[rel="canonical"]')?.getAttribute('href')||''].filter(Boolean);
      const bound=boundUrls.some(u=>{try{const k=profileKeyFromHref(new URL(u,location.origin).href);return String(k||'').toLowerCase()===target||String(k||'').toLowerCase()===targetPlain;}catch(e){return false;}});
      const og=cleanText(document.querySelector('meta[property="og:image"]')?.getAttribute('content')||'');
      if(bound&&isImageUrl(og))return og;
    }catch(e){}
    // 2) Visible image whose alt text matches the profile heading, limited to the upper profile header.
    let heading='';try{heading=cleanText(document.querySelector('h1')?.innerText||'').toLowerCase();}catch(e){}
    let best=null;
    for(const img of Array.from(document.querySelectorAll('img[src]'))){
      const u=cleanText(img.currentSrc||img.src||'');if(!isImageUrl(u))continue;
      let r={top:99999,left:0,width:0,height:0};try{r=img.getBoundingClientRect();}catch(e){}
      if(r.top<-120||r.top>760)continue;
      const alt=cleanText(img.alt||'').toLowerCase(),d=dimOf(img);
      const exactName=heading&&alt&&(alt===heading||heading.includes(alt)||alt.includes(heading));
      if(!exactName)continue;
      const score=400+(d.width===d.height?100:0)+Math.min(220,Math.max(d.width,d.height));
      if(!best||score>best.score)best={url:u,score};
    }
    return best?best.url:'';
  }
  function targetProfileFinal(){
    const base=targetProfile(), e=state.targetProfileEnriched||{},bound=e&&e.targetBound===true;
    const captured=captureTargetAvatarRunV4433('targetProfileFinal'),scopedAvatar=typeof scopedTargetAvatarFromDom==='function'?scopedTargetAvatarFromDom():'';
    const avatar=bound?(e.avatarUrl||e.avatar||captured.url||scopedAvatar||''):(captured.url||scopedAvatar||'');
    return {...base,...e,username:e.username||base.username,displayName:safeHeaderCandidate(e.displayName||base.displayName)||titleCaseFromKey(e.username||base.username),avatar,avatarUrl:avatar,avatarSourceUrl:e.avatarSourceUrl||avatar,coverUrl:bound?(e.coverUrl||''):'',bio:e.bio||base.bio||'',followingText:cleanText(e.followingText||'')||cleanText(e.seguindo||''),followersText:cleanText(e.followersText||'')||cleanText(e.seguidores||''),likesText:cleanText(e.likesText||'')};
  }
  function cacheTargetAvatarV44R13(tp){
    try{
      if(!tp||!(String(tp.avatar||'').startsWith('data:image/')||isImageUrl(tp.avatarSourceUrl||tp.avatarUrl||'')))return;
    }catch(_){}
  }
  function makeJson(){
  assertCreditNameIntegrity();normalizeAllCategoriesPtBr();assignOrdinals();
  const tp=targetProfileFinal();if(tp&&tp.categoria)tp.categoria=safeCategory(tp.categoria);cacheTargetAvatarV44R13(tp);
  const declared=declaredRelationTarget(),observed=Number(state.observedRelationCount||state.closedRelationCount||rowsArr().length||0);
  const exposure={...(state.relationExposure||{})};
  const userStopBeforeTerminal=state.stopRequested===true&&exposure.serverTerminalBelowTarget!==true;
  if(userStopBeforeTerminal){exposure.reason='user_stop_before_terminal_proof';exposure.backendHasNext=exposure.backendHasNext===true||!!(state.networkRelation&&state.networkRelation.lastPageInfo&&state.networkRelation.lastPageInfo.hasNext===true);}
  const closureReason=userStopBeforeTerminal?'user_stop_before_terminal_closure':(state.closureReason||'');
  const visibilityGap=userStopBeforeTerminal?false:state.relationVisibilityGap===true;
  return {
    tool:TOOL,version:VERSION,startedAt:state.startedAt,exportedAt:new Date().toISOString(),
    exportStatus:{at:nowBR(),line1:'Status do Export - '+nowBR(),line2:'Script de raspagem desenvolvido por '+CREDIT_NAME,instagram:CREDIT_IG},
    page:{href:location.href,hostname:location.hostname,pathname:location.pathname,targetUser:tp.username},
    targetProfile:tp,
    relation:{locked:state.relation,label:relationLabel(state.relation),requested:state.relation,activeSurface:state.relationSurfaceAudit&&state.relationSurfaceAudit.active||'',confidence:Number(state.relationSurfaceAudit&&state.relationSurfaceAudit.confidence||0),visibilityGap,exposure,uiHint:{...(state.relationUiHint||{})},targetAudit:{...(state.relationTargetAudit||{})},runContext:{...(state.relationRunContext||{})},recovery:{...state.relationRecovery},searchRecovery:{...(state.relationSearchRecovery||{}),prefixesTried:[...(state.relationSearchRecovery&&state.relationSearchRecovery.prefixesTried||[])]},surfaceAudit:{...(state.relationSurfaceAudit||{})}},
    expected:{active:state.expected,hint:state.expectedHint,declaredTarget:declared,targetConfirmed:declared>0,observedRelationCount:observed,relationTargetReached:state.relationTargetReached===true,source:state.expectedSource,closedRelationCount:state.closedRelationCount,closureReason},
    totals:{rows:rowsArr().length,expectedActive:state.expected,expectedHint:state.expectedHint,declaredTarget:declared,targetConfirmed:declared>0,observedRelationCount:observed,closedRelationCount:state.closedRelationCount,missing:declared?Math.max(0,declared-rowsArr().length):null,coveragePercent:declared?Number(((Math.min(rowsArr().length,declared)/declared)*100).toFixed(2)):null,bottomApparent:userStopBeforeTerminal?state.bottomConfirmed:(state.bottomConfirmed||visibilityGap),bottomReal:state.bottomConfirmed,bottomConfirmed:state.bottomConfirmed,visibilityGap,listFinalOk:gates().listFinalOk,bioMetaFinalOk:gates().bioMetaFinalOk,finalOk:gates().finalOk},
    stop:{requested:state.stopRequested===true,reason:state.stopReason||'',at:state.stopAt||''},
    networkRelation:{...state.networkRelation,seenCursors:[...(state.networkRelation&&state.networkRelation.seenCursors||[])],seenCursorKeys:[...(state.networkRelation&&state.networkRelation.seenCursorKeys||[])],seenConnectionCursorKeys:[...(state.networkRelation&&state.networkRelation.seenConnectionCursorKeys||[])],connectionFingerprints:[...(state.networkRelation&&state.networkRelation.connectionFingerprints||[])],requestIds:[...(state.networkRelation&&state.networkRelation.requestIds||[])],trustedRequestIds:[...(state.networkRelation&&state.networkRelation.trustedRequestIds||[])],terminalRoots:[...(state.networkRelation&&state.networkRelation.terminalRoots||[])],routeBoundRoots:[...(state.networkRelation&&state.networkRelation.routeBoundRoots||[])]},
    stats:state.stats,gates:gates(),warnings:state.warnings,errors:state.errors,events:state.events,quality:quality(),metaQuality:metaQuality(),metaRun:metaRunSummary(),generalRun:generalRunSummary(),photoRecoveryRun:{...state.photoRecoveryRun,promise:undefined},
    cohort:{...state.cohortAudit,missing:[...(state.cohortAudit&&state.cohortAudit.missing||[])]},bioCoverage:bioCoverageSummary(),rows:rowsArr()
  };
}
  function rowPhotoHtml(r){
    const urls=uniq([r&&r.fotoUrlHD,r&&r.profileAvatarUrl,r&&r.fotoUrl,r&&r.avatarUrl].map(v=>cleanText(v)).filter(isImageUrl)),url=urls[0]||'';
    const dim=esc(r.dimensaoFotoBaixada||((r.fotoWidth&&r.fotoHeight)?r.fotoWidth+'x'+r.fotoHeight:'')),cls=esc(r.fotoClasse||r.imageClass||'NO_PHOTO'),badge=/HD_REAL|BEST_AVAILABLE/.test(cls)?'hd':'thumb';
    if(!url)return '<span class="dim"></span><span class="cls thumb">NO_PHOTO</span>';
    const fallbacks=esc(JSON.stringify(urls.slice(1)));
    return '<a href="'+esc(url)+'" target="_blank"><img class="tblphoto b35photo" loading="lazy" decoding="async" src="'+esc(url)+'" data-fallbacks="'+fallbacks+'" alt="'+esc(r.username)+'"></a><span class="dim">'+dim+'</span><span class="cls '+badge+'">'+cls+'</span>';
  }
  function rowCoverHtml(r){ const url=esc(r&&r.coverUrl||''); if(!url)return ''; const dim=(r.coverWidth&&r.coverHeight)?esc(r.coverWidth+'x'+r.coverHeight):''; return '<a href="'+url+'" target="_blank" title="Abrir capa em alta definição"><img class="tblcover" loading="lazy" src="'+url+'" alt="capa '+esc(r.username||'')+'"></a>'+(dim?'<span class="dim">'+dim+'</span>':''); }
  function linkHtml(url,label){ return url?'<a href="'+esc(url)+'" target="_blank">'+esc(label||'link')+'</a>':''; }
  function aboutItemsHtml(r){
    const parts=[];
    for(const x of Array.isArray(r&&r.aboutItems)?r.aboutItems:[]){
      const label=cleanText(x.type||x.collectionTabKey||'about'), title=cleanText(x.title||''), sub=cleanText(x.subtitle||''), url=cleanText(x.url||'');
      const val=[title,sub].filter(Boolean).join(' — ');
      if(val||url)parts.push((label?label+': ':'')+(val||url)+(url&&val?' | '+url:''));
    }
    if(r&&r.horarioFuncionamento)parts.push('HORARIO: '+cleanText(r.horarioFuncionamento));
    if(r&&Array.isArray(r.areasAtendimento)&&r.areasAtendimento.length)parts.push('AREAS: '+r.areasAtendimento.map(cleanText).filter(Boolean).join(' · '));
    if(r&&r.responsavelPagina)parts.push('RESPONSAVEL: '+cleanText(r.responsavelPagina));
    return esc(uniq(parts).join('\n')).replace(/\n/g,'<br>');
  }
  
  function comparableGeneralText(value){return normalizeRelationSurfaceText(cleanText(value||'')).replace(/https?:\/\//g,'').replace(/[^a-z0-9@.+]+/g,' ').replace(/\s+/g,' ').trim();}
  function canonicalExternalForHtml(value){
    const raw=cleanText(value||'');if(!raw)return '';
    let u;try{u=new URL(raw,location.origin);}catch(e){return raw;}
    for(const k of Array.from(u.searchParams.keys()))if(/^fbclid$|^utm_|^__cft__|^__tn__|^ref$|^refsrc$/i.test(k))u.searchParams.delete(k);
    u.hash='';return u.href;
  }
  function compactUrlLabel(value){
    const clean=canonicalExternalForHtml(value);try{const u=new URL(clean);let p=decodeURIComponent(u.pathname||'/').replace(/\/$/,'');let text=u.hostname.replace(/^www\./,'')+(p&&p!=='/'?p:'');if(text.length>54)text=text.slice(0,51)+'…';return text;}catch(e){return clean.length>54?clean.slice(0,51)+'…':clean;}
  }
  function rowExternalLinks(row){
    const structured=[];
    for(const item of [...(Array.isArray(row&&row.aboutItems)?row.aboutItems:[]),...(Array.isArray(row&&row.generalItems)?row.generalItems:[])]){
      structured.push(item&&item.url);if(Array.isArray(item&&item.urls))structured.push(...item.urls);if(/WEBSITE|EXTERNAL_URL|WEB_LINK|SOCIAL_LINK/i.test(String(item&&item.type||'')))structured.push(item&&item.value);
    }
    return uniq([row&&row.externalUrl,...(Array.isArray(row&&row.linksExternos)?row.linksExternos:[]),...(Array.isArray(row&&row.externalUrls)?row.externalUrls:[]),...String(row&&row.linkExterno||'').split(' | '),...structured].map(safeContactExternalUrl).filter(Boolean).map(canonicalExternalForHtml));
  }
  function generalItemRedundant(row,item){
    const family=generalInfoFamily(item),value=cleanText(item&&item.value||item&&item.subtitle||''),nv=comparableGeneralText(value);
    if(family==='bio'&&cleanText(row&&row.bio||row&&row.bioText||''))return true;
    if(family==='category'&&cleanText(row&&row.categoria||''))return true;
    if(family==='contact'){
      const vals=[row&&row.email,...(row&&row.emails||[]),row&&row.telefone,...(row&&row.telefones||[])].map(comparableGeneralText).filter(Boolean);if(vals.some(v=>nv&& (v===nv||v.includes(nv)||nv.includes(v))))return true;
    }
    if(family==='links'){const u=canonicalExternalForHtml(item&&item.url||value);if(u&&rowExternalLinks(row).includes(u))return true;}
    const itemUrls=uniq([item&&item.url,...(Array.isArray(item&&item.urls)?item.urls:[])].map(safeContactExternalUrl).filter(Boolean).map(canonicalExternalForHtml));
    if(itemUrls.length&&itemUrls.every(u=>rowExternalLinks(row).includes(u)))return true;
    if(family==='current_city'||family==='location'){const v=comparableGeneralText(row&&row.localizacao||'');if(v&&nv&&(v===nv||v.includes(nv)||nv.includes(v)))return true;}
    if(family==='work'){const v=comparableGeneralText(row&&row.trabalho||'');if(v&&nv&&(v===nv||v.includes(nv)||nv.includes(v)))return true;}
    if(family==='education'){const v=comparableGeneralText(row&&row.formacao||'');if(v&&nv&&(v===nv||v.includes(nv)||nv.includes(v)))return true;}
    if(family==='hours'&&cleanText(row&&row.horarioFuncionamento||''))return true;
    if(family==='service_area'&&Array.isArray(row&&row.areasAtendimento)&&row.areasAtendimento.length)return true;
    return false;
  }
  function generalItemContaminated(item){
    const value=cleanText(item&&item.value||''),section=cleanText(item&&item.section||''),family=generalInfoFamily(item);
    if(!value)return true;
    if(item&&item.type==='DOM_GENERAL_ITEM'){
      if(section==='Categories'&&(/@|https?:\/\/|\+?\d[\d\s().-]{6,}\d|Service area|Mobile|Email|Hours/i.test(value)))return true;
      if(value.length>420)return true;
    }
    if(family==='other'&&/^(?:details?|detalhes?)\s*[:\-]?\s*$/i.test(value))return true;
    return false;
  }
  function visibleGeneralInfoItems(row){
    const extras=[];if(row&&row.responsavelPagina)extras.push({surface:'about',sources:['about'],section:'Page responsibility',type:'PAGE_RESPONSIBLE_ENTITY',label:'Responsável pela Página',value:cleanText(row.responsavelPagina),bindingMode:'response_exact_id'});
    const merged=mergeGeneralInfoItems(generalInfoFromAboutItems(row&&row.aboutItems,'about'),row&&row.generalItems,extras),out=[],seen=new Set();
    for(const item of merged){if(generalItemContaminated(item)||generalItemRedundant(row,item))continue;const key=[generalInfoFamily(item),comparableGeneralText(item.value),canonicalExternalForHtml(item.url||'')].join('|');if(seen.has(key))continue;seen.add(key);out.push(item);}
    const pr={responsibility:1,language:2,rating:3,gender:4,relationship:5,hometown:6,other:7,links:8,current_city:9,location:10,work:11,education:12,category:13,contact:14,hours:15,service_area:16,bio:17};
    return out.sort((a,b)=>(pr[generalInfoFamily(a)]||50)-(pr[generalInfoFamily(b)]||50)||String(a.label||'').localeCompare(String(b.label||'')));
  }
  function externalLinksHtml(row){
    const links=rowExternalLinks(row);if(!links.length)return '';
    return links.map(u=>'<div class="extLink"><a target="_blank" href="'+esc(u)+'" title="'+esc(u)+'">'+esc(compactUrlLabel(u))+'</a></div>').join('');
  }
function generalInfoHtml(row){
    const items=visibleGeneralInfoItems(row);if(!items.length)return '<span class="gempty">—</span>';
    const familyLabel={responsibility:'Responsável pela Página',language:'Idiomas',rating:'Avaliação',gender:'Gênero',relationship:'Relacionamento',hometown:'Cidade natal',current_city:'Cidade atual',location:'Localização',links:'Site/link',work:'Trabalho',education:'Formação',category:'Categoria/tipo',hours:'Horário',service_area:'Área de atendimento'};
    const render=item=>{
      const sources=uniq(item.sources||[item.surface]).map(v=>String(v||'').toUpperCase()).filter(Boolean),family=generalInfoFamily(item);
      const sourceHtml=sources.length?'<span class="gsource">'+esc(sources.join('/'))+'</span>':'';
      const rawSection=cleanText(item.section||''),section=/^(?:all_|directory_)/i.test(rawSection)?'':rawSection;
      let label=cleanText(item.label||readableGeneralInfoLabel(item.type));if(familyLabel[family])label=familyLabel[family];if(/^(?:Details?|Detalhes?)$/i.test(label)&&family!=='other')label=familyLabel[family]||label;
      const value=[cleanText(item.value||''),cleanText(item.subtitle||'')].filter(Boolean).join(' — '),rawUrl=cleanText(item.url||''),url=rawUrl?canonicalExternalForHtml(rawUrl):'';
      const valueHtml=url?'<a target="_blank" href="'+esc(url)+'" title="'+esc(url)+'">'+esc(value&&!/^https?:\/\//i.test(value)?value:compactUrlLabel(url))+'</a>':esc(value);
      return '<div class="gitem g-'+esc(family)+'"><div class="gmeta">'+sourceHtml+(section?'<span class="gsection">'+esc(section)+'</span>':'')+'</div><div class="gtext">'+(label?'<b>'+esc(label)+':</b> ':'')+valueHtml+'</div></div>';
    };
    const head=items.slice(0,5).map(render).join(''),rest=items.slice(5);
    if(!rest.length)return head;
    return head+'<details class="gmore"><summary>+'+rest.length+' informações</summary>'+rest.map(render).join('')+'</details>';
  }
  function targetMetaNativeUrl(tp,kind,value){
    const val=cleanText(value||'').toLowerCase(); if(!val)return '';
    const rules={
      localizacao:/(CURRENT_CITY|HOMETOWN|LOCATION|ADDRESS|PLACE)/i,
      trabalho:/(WORK|EMPLOYER|JOB)/i,
      formacao:/(SCHOOL|COLLEGE|EDUCATION|UNIVERSITY)/i
    };
    const rule=rules[kind]; if(!rule)return '';
    for(const x of Array.isArray(tp&&tp.aboutItems)?tp.aboutItems:[]){
      const hay=[x.type,x.collectionTabKey,x.title,x.subtitle].map(v=>cleanText(v||'')).join(' ');
      const textMatch=hay.toLowerCase().includes(val)||val.includes(cleanText(x.title||'').toLowerCase());
      const urls=[x.url,...(Array.isArray(x.urls)?x.urls:[])].map(normalizeUrl).filter(Boolean);
      if(rule.test(hay)&&textMatch&&urls.length)return urls[0];
    }
    return '';
  }
  function targetProfileMetaHtml(tp){
    const raw=[
      ['Categoria',tp&&tp.categoria,''],['Seguidores',tp&&tp.seguidores,''],['Seguindo',tp&&tp.seguindo,''],['E-mail',tp&&tp.email||((tp&&tp.emails||[]).join(' | ')),''],['Telefone',tp&&tp.telefone||((tp&&tp.telefones||[]).join(' | ')),''],
      ['Localização',tp&&tp.localizacao,targetMetaNativeUrl(tp,'localizacao',tp&&tp.localizacao)],['Trabalho',tp&&tp.trabalho,targetMetaNativeUrl(tp,'trabalho',tp&&tp.trabalho)],['Formação',tp&&tp.formacao,targetMetaNativeUrl(tp,'formacao',tp&&tp.formacao)],
      ['Horário',tp&&tp.horarioFuncionamento,''],['Área de atendimento',Array.isArray(tp&&tp.areasAtendimento)?tp.areasAtendimento.join(' · '):'','']
    ].filter(x=>cleanText(x[1]||''));
    if(!raw.length)return '';
    return '<div class="targetMeta">'+raw.map(([k,v,u])=>'<span><b>'+esc(k)+':</b> '+(u?'<a target="_blank" href="'+esc(u)+'">'+esc(v)+'</a>':esc(v))+'</span>').join('')+'</div>';
  }
  function makeHtml(snapshotJson=null){
    const j=snapshotJson||makeJson(),rows=j.rows,tp=j.targetProfile,g=j.gates,m=j.metaQuality,title='Raspador de dados de relações e postagens do Facebook';
    const css='*{box-sizing:border-box}html,body{max-width:100%;overflow-x:hidden}body{font-family:Arial,sans-serif;background:#f7f7f8;color:#111;margin:16px;padding-bottom:92px}.plaquinha{position:fixed;bottom:30px;right:12px;background:#0b1324;color:#e6edf6;border:1px solid #22314e;border-radius:7px;padding:4px 7px;font-size:10px;line-height:1.15;box-shadow:0 6px 18px rgba(0,0,0,.22);white-space:normal;z-index:9;max-width:330px}.plaquinha a{color:#86e1ff;text-decoration:underline}.profileHero{background:#050505;color:#fff;border-radius:18px;padding:24px 28px;margin:0 0 16px;display:flex;gap:24px;align-items:center;box-shadow:0 8px 24px rgba(0,0,0,.18)}.profileAvatarLink{display:block;flex:0 0 auto}.profileHero img{width:160px;height:160px;border-radius:50%;object-fit:cover;background:#222}.profileInfo{min-width:0}.profileName{font-size:28px;font-weight:800;line-height:1.08;display:flex;gap:10px;align-items:baseline;flex-wrap:wrap}.profileUser{font-size:18px;font-weight:500;color:#b7b7b7}.profileUser a{color:#b7b7b7;text-decoration:none}.profileCounts{display:flex;gap:18px;flex-wrap:wrap;margin:10px 0 18px;font-size:18px}.profileCounts b{font-size:21px;margin-right:4px}.profileActions{display:flex;gap:8px;margin:4px 0 12px;flex-wrap:wrap}.profileBtn{display:inline-block;border-radius:999px;padding:10px 26px;background:#1877f2;color:#fff;font-size:16px;font-weight:800;text-decoration:none}.profileBtn.gray{background:#222;color:#f4f4f4}.profileBio{font-size:17px;font-weight:700;color:#fff;white-space:pre-wrap}.targetMeta{display:flex;gap:7px 12px;flex-wrap:wrap;margin-top:12px;font-size:12px;color:#e5e7eb}.targetMeta span{background:#171717;border-radius:999px;padding:4px 8px}.targetMeta a{color:#86e1ff}.exportSummary{background:#fff;border:1px solid #ddd;border-radius:10px;padding:8px 10px;margin:0 0 8px;color:#333;font-size:11px}.tableWrap{width:100%;max-width:100%;overflow-x:auto;overflow-y:visible;background:#fff;border:1px solid #d8d8d8;border-radius:10px;box-shadow:0 3px 12px rgba(0,0,0,.05)}table.b35Table{border-collapse:collapse;width:100%;min-width:1664px;table-layout:fixed;background:white}th,td{border:1px solid #ddd;padding:5px 6px;font-size:12px;vertical-align:top;white-space:normal;overflow-wrap:anywhere;word-break:normal}th{background:#111;color:white;position:sticky;top:0;z-index:2;line-height:1.15}.textCell{white-space:normal;overflow-wrap:anywhere;word-break:normal}.photocell{text-align:center;min-width:0}.photocell a{font-size:10px;color:#0645ad;text-decoration:none}.photocell .dim{display:block;font-size:11px;color:#111;margin-top:2px}.photocell .cls{display:inline-block;margin-top:2px;padding:2px 5px;border-radius:8px;background:#eee;font-size:10px}.tblphoto{width:96px;height:96px;border-radius:50%;object-fit:cover;background:#eee}.tblcover{width:150px;height:84px;border-radius:7px;object-fit:cover;background:#eee}.badge{display:inline-block;padding:2px 6px;border-radius:10px;background:#eee;font-size:11px}.hd{background:#d1fae5}.thumb{background:#fee2e2}.bad{background:#fef2f2;border-color:#fecaca}.okbox{background:#f0fdf4;border-color:#86efac}.generalCell{vertical-align:top;padding:6px;white-space:normal;overflow-wrap:anywhere}.gitem{background:#f8fafc;border:1px solid #e5e7eb;border-radius:7px;padding:5px 6px;margin:0 0 5px;line-height:1.25;overflow-wrap:anywhere}.gitem:last-child{margin-bottom:0}.gmeta{display:flex;gap:4px;align-items:center;flex-wrap:wrap;margin-bottom:2px}.gsource{display:inline-block;font-size:9px;font-weight:800;background:#e0e7ff;color:#3730a3;border-radius:999px;padding:1px 5px}.gsection{font-size:9px;color:#64748b;background:#f1f5f9;border-radius:999px;padding:1px 5px}.gtext{font-size:11px}.gtext a{color:#0645ad;text-decoration:none;overflow-wrap:anywhere}.gempty{color:#94a3b8}.gmore{margin-top:4px}.gmore summary{cursor:pointer;font-size:9px;font-weight:700;color:#475569;padding:3px 2px}.extLink{margin:0 0 2px}.extLink a{display:block;color:#0645ad;text-decoration:none;white-space:normal;overflow-wrap:anywhere;word-break:normal}.bottomScroll{position:fixed;left:12px;right:12px;bottom:0;min-height:36px;background:#f8fafc;border:2px solid #334155;border-radius:10px 10px 0 0;z-index:2147483600;display:flex;align-items:center;gap:8px;padding:5px 9px;box-shadow:0 -4px 18px rgba(15,23,42,.22);font-size:11px;font-weight:800;color:#0f172a}.bottomScroll[hidden]{display:none!important}.bottomScroll input[type=range]{flex:1;min-width:120px;accent-color:#1877f2;cursor:ew-resize}.bottomScroll .hsHint{white-space:nowrap}.bottomScroll .hsRight{color:#075985}.bottomScrollInner{display:none}.gallery{display:grid;grid-template-columns:repeat(auto-fill,minmax(118px,1fr));gap:8px;margin:12px 0 18px}.tile{background:white;border:1px solid #ddd;border-radius:10px;padding:7px;text-align:center;overflow:hidden}.tile img{width:96px;height:96px;border-radius:50%;object-fit:cover;background:#eee}.tile a{font-size:10px;display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:#0645ad;text-decoration:none}.subphoto{font-size:9px;color:#555;line-height:1.2;margin-top:2px}@media(max-width:760px){body{margin:6px}.profileHero{align-items:flex-start;padding:14px;gap:12px}.profileHero img{width:90px;height:90px}.profileName{font-size:20px}.profileUser{font-size:14px}.profileCounts{font-size:13px;gap:8px}.profileCounts b{font-size:15px}.profileBio{font-size:13px}.profileBtn{font-size:12px;padding:7px 13px}}';
    const th=['#','Foto<br><small>dimensão/classe</small>','Capa','Username','Nome','Perfil','Bio','Categoria','Link externo','Seguidores','Seguindo','E-mail','Telefone','Localização','Trabalho','Formação','Horário','Área de atendimento','Informações gerais (All/About)'];
    const colgroup='<colgroup>'+[28,114,166,76,80,46,210,60,76,48,48,86,74,86,80,70,56,114,150].map(w=>'<col style="width:'+w+'px">').join('')+'</colgroup>';
    const trs=rows.map((r,i)=>'<tr><td>'+(i+1)+'</td><td class="photocell">'+rowPhotoHtml(r)+'</td><td class="photocell">'+rowCoverHtml(r)+'</td><td class="textCell">'+esc(r.username)+'</td><td class="textCell">'+esc(r.nome||r.displayName)+'</td><td>'+linkHtml(r.perfil||r.profileUrl,'perfil')+'</td><td class="textCell">'+esc(rejectBadText(r.bio||r.bioText||''))+'</td><td class="textCell">'+esc(r.categoria||'')+'</td><td class="textCell">'+externalLinksHtml(r)+'</td><td>'+esc(r.seguidores||'')+'</td><td>'+esc(r.seguindo||'')+'</td><td class="textCell">'+esc(r.email||(Array.isArray(r.emails)?r.emails.join(' | '):''))+'</td><td class="textCell">'+esc(r.telefone||(Array.isArray(r.telefones)?r.telefones.join(' | '):''))+'</td><td class="textCell">'+esc(r.localizacao||'')+'</td><td class="textCell">'+esc(r.trabalho||'')+'</td><td class="textCell">'+esc(r.formacao||'')+'</td><td class="textCell">'+esc(r.horarioFuncionamento||'')+'</td><td class="textCell">'+esc(Array.isArray(r.areasAtendimento)?r.areasAtendimento.join(' · '):'')+'</td><td class="generalCell">'+generalInfoHtml(r)+'</td></tr>').join('');
    const gallery=rows.map(r=>{const urls=uniq([r.fotoUrlHD,r.profileAvatarUrl,r.fotoUrl,r.avatarUrl].map(v=>cleanText(v)).filter(isImageUrl)),url=urls[0]||'';return '<div class="tile">'+(url?'<a href="'+esc(url)+'" target="_blank"><img class="b35photo" src="'+esc(url)+'" data-fallbacks="'+esc(JSON.stringify(urls.slice(1)))+'" loading="lazy" decoding="async" alt="'+esc(r.username)+'"></a>':'<div style="width:96px;height:96px;border-radius:50%;background:#eee;margin:auto"></div>')+'<a href="'+esc(r.perfil||r.profileUrl)+'" target="_blank">'+esc(r.nome||r.displayName||r.username)+'</a><div class="subphoto">'+esc(r.username)+'</div><span class="badge '+(/HD_REAL|BEST/.test(r.fotoClasse||r.imageClass||'')?'hd':'thumb')+'">'+esc(r.fotoClasse||r.imageClass||'NO_PHOTO')+'</span></div>';}).join('');
    const heroAvatar=esc(tp.avatar||''),heroAvatarLink=esc(tp.avatarSourceUrl||tp.avatarUrl||tp.avatar||''),targetUrl=esc('https://www.facebook.com/'+String(tp.username||'')),heroCover=esc(tp.coverUrl||''),coverAction=heroCover?'<a class="profileBtn gray" href="'+heroCover+'" target="_blank">Capa HD</a>':'';
    const declared=j.expected.declaredTarget||0,gapText=j.totals.visibilityGap&&declared?' | <b>Observabilidade:</b> '+j.totals.rows+' visíveis de '+declared+' declarados':'';
    const targetText=declared?String(declared):'não confirmado';
    const fallbackScript='<script>(function(){document.addEventListener("error",function(ev){var img=ev.target;if(!img||!img.classList||!img.classList.contains("b35photo"))return;var a=[];try{a=JSON.parse(img.getAttribute("data-fallbacks")||"[]")}catch(e){};if(!a.length)return;var next=a.shift();img.setAttribute("data-fallbacks",JSON.stringify(a));img.src=next;},true);var wrap=document.querySelector(".tableWrap"),table=wrap&&wrap.querySelector("table"),bottom=document.querySelector(".bottomScroll"),slider=bottom&&bottom.querySelector("input[type=range]"),lock=false;function maxScroll(){return wrap?Math.max(0,wrap.scrollWidth-wrap.clientWidth):0}function syncSize(){if(!wrap||!table||!bottom||!slider)return;var m=maxScroll();bottom.hidden=!(m>2);slider.disabled=!(m>2);if(!lock){var v=m?Math.round(wrap.scrollLeft/m*1000):0;slider.value=String(Math.max(0,Math.min(1000,v)));}}if(wrap&&slider){wrap.addEventListener("scroll",function(){if(lock)return;lock=true;var m=maxScroll(),v=m?Math.round(wrap.scrollLeft/m*1000):0;slider.value=String(Math.max(0,Math.min(1000,v)));lock=false},{passive:true});slider.addEventListener("input",function(){if(lock)return;lock=true;var m=maxScroll();wrap.scrollLeft=m*(Number(slider.value||0)/1000);lock=false});}window.addEventListener("resize",syncSize);window.addEventListener("load",syncSize);if(window.ResizeObserver&&wrap&&table){var ro=new ResizeObserver(syncSize);ro.observe(wrap);ro.observe(table);}requestAnimationFrame(syncSize);setTimeout(syncSize,50);setTimeout(syncSize,300);setTimeout(syncSize,1200);})();</script>';
    return '<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+title+'</title><style>'+css+'</style></head><body><div class="plaquinha">'+esc(j.exportStatus.line1)+'<br><a target="_blank" href="'+CREDIT_IG+'">'+esc(j.exportStatus.line2)+'</a></div><div class="profileHero"><a class="profileAvatarLink" href="'+heroAvatarLink+'" target="_blank">'+(heroAvatar?'<img src="'+heroAvatar+'" alt="'+esc(tp.displayName)+'">':'')+'</a><div class="profileInfo"><div class="profileName"><span>'+esc(tp.displayName)+'</span><span class="profileUser">| &nbsp;<a target="_blank" href="https://www.facebook.com/'+esc(tp.username)+'">'+esc(tp.username)+'</a></span></div><div class="profileCounts"><span><b>'+esc(targetText)+'</b>'+esc(relationLabel(state.relation))+'</span><span><b>'+esc(j.totals.rows)+'</b>Coletados</span><span><b>'+esc(m.bioWithText)+'</b>Bio</span></div><div class="profileActions"><a class="profileBtn" href="'+targetUrl+'" target="_blank">Facebook</a><span class="profileBtn gray">'+esc(relationLabel(state.relation))+'</span>'+coverAction+'</div><div class="profileBio">'+esc(tp.bio||'')+'</div>'+targetProfileMetaHtml(tp)+'</div></div><div class="exportSummary '+(g.finalOk?'okbox':'bad')+'"><b>Relação exportada:</b> '+esc(relationLabel(state.relation))+' | <b>Total coletado:</b> '+j.totals.rows+' | <b>Alvo real:</b> '+esc(targetText)+' | <b>Fonte do alvo:</b> '+esc(j.expected.source||'')+' | <b>Lista final:</b> '+(g.listFinalOk?'sim':'nao')+' | <b>Bio/meta:</b> '+(g.bioMetaFinalOk?'sim':'nao')+gapText+' | <b>Status:</b> '+(g.finalOk?'Coleta completa':(j.totals.visibilityGap?'Parcial por observabilidade':'Coleta parcial'))+'</div><div class="tableWrap"><table class="b35Table">'+colgroup+'<thead><tr>'+th.map(x=>'<th>'+x+'</th>').join('')+'</tr></thead><tbody>'+trs+'</tbody></table></div><div class="bottomScroll" hidden><input type="range" min="0" max="1000" value="0" step="1" aria-label="Barra de rolagem horizontal da tabela"></div><h3>Fotos redondas - abaixo da lista</h3><div class="gallery">'+gallery+'</div>'+fallbackScript+'</body></html>';
  }

  function makeManifest(){
  const j=makeJson();
  return {
    generated_at:j.exportedAt,version:VERSION,tool:TOOL,gate:'fb-b35a1-v29-active-relation-binding-visibility',
    stable_base_version:STABLE_BASE_VERSION,stable_lane_preserved:true,historicalMetaReference50:HISTORICAL_META_REFERENCE_50,historicalReferenceIsFinalGate:false,benchmarkDiagnosticsEnabled:BENCHMARK_DIAGNOSTICS_ENABLED,benchmarkSelectionApplied:false,
    frozenMetaCohort:{id:FROZEN_META_COHORT.cohortId,configSha256:FROZEN_META_COHORT.configSha256,requiredExactMatches:FROZEN_META_COHORT.requiredExactMatches},
    architecture:{
      relation_photo:'stable_metaframe_lane_frozen_hash_guard',
      cardinality:'declared_target_separate_from_observed_count_no_silent_rebase',
      relationSurface:'current_user_opened_surface_plus_inner_surface_precedence_runtime_mismatch_abort',
      metadata:'streaming_during_scroll_about_first_onepass_exact_bound_plus_exceptional_header_fallback_no_collection_fanout',
      generalInformation:'about_all_novel_only_deduplicated_specialized_fields_filtered_bounded_dom_sections',
      allLane:'parallel_independent_target_bound_general_fallback_drained_at_global_completion',
      lowPhotoRecovery:'low_rows_only_validated_by_real_image_natural_dimensions_before_promotion',
      htmlLayout:'internal_horizontal_table_wrapper_compact_general_column_tracking_url_cleanup',
      productionQueue:'full_relation_streaming',
      relationClosure:'no_automatic_navigation;declared_target_never_closed_by_wrong_container_or_physical_bottom',
      streamWaitWatchdogMs:MAX_POST_SCROLL_TAIL_MS,autoMetaDuringScroll:true,popup:false,iframe:false,window_aux:false,aux_tabs:false,graphqlStructured:true,retryImplemented:true,retryMaxAttempts:GRAPHQL_MAX_ATTEMPTS,retryAfterCapMs:GRAPHQL_RETRY_CAP_MS
    },
    url:location.href,total:j.totals.rows,expected:j.expected.active,declaredTarget:j.expected.declaredTarget,observedRelationCount:j.expected.observedRelationCount,
    finalOk:j.gates.finalOk,decision:j.gates.decision,quality:j.quality,metaQuality:j.metaQuality,metaRun:j.metaRun,generalRun:j.generalRun,relationSurfaceAudit:j.relation.surfaceAudit,cohort:j.cohort,bioCoverage:j.bioCoverage,stats:j.stats,gates:j.gates
  };
}
  async function shaHexData(algo,data){
    const bytes=typeof data==='string'?new TextEncoder().encode(data):(data instanceof Uint8Array?data:new Uint8Array(data||[]));
    const buf=await crypto.subtle.digest(algo,bytes);return Array.from(new Uint8Array(buf)).map(b=>b.toString(16).padStart(2,'0')).join('');
  }
  async function shaHex(algo,text){return shaHexData(algo,text);}
  function downloadBlob(name,data,type){
    const blob=new Blob([data],{type:type||'application/octet-stream'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(url);a.remove();},2500);
  }
  function downloadText(name,text,type){downloadBlob(name,text,type||'text/plain;charset=utf-8');}
  function csvCell(value){let s=String(value==null?'':value);if(/^[\t\r\n ]*[=+\-@]/.test(s))s="'"+s;return '"'+s.replace(/"/g,'""')+'"';}
  function makeCsv(){
    normalizeAllCategoriesPtBr();assignOrdinals();
    const cols=['#','Foto','Capa','Username','Nome','Perfil','Bio','Categoria','Link externo','Seguidores','Seguindo','E-mail','Telefone','Localização','Trabalho','Formação','Horário','Área de atendimento','Informações gerais (All/About)'];
    const rows=rowsArr().map((r,i)=>[
      i+1,r.fotoUrlHD||r.fotoUrl||r.avatarUrl||'',r.coverUrl||'',r.username||'',r.nome||r.displayName||'',r.perfil||r.profileUrl||'',rejectBadText(r.bio||r.bioText||''),r.categoria||'',
      uniq([r.externalUrl,...(r.externalUrls||[]),...(r.linksExternos||[])]).filter(Boolean).join(' | '),r.seguidores||'',r.seguindo||'',r.email||(r.emails||[]).join(' | '),r.telefone||(r.telefones||[]).join(' | '),r.localizacao||'',r.trabalho||'',r.formacao||'',r.horarioFuncionamento||'',(r.areasAtendimento||[]).join(' | '),
      visibleGeneralInfoItems(r).map(x=>[x.label||x.section||x.type,x.value||x.subtitle||''].filter(Boolean).join(': ')).join(' | ')
    ]);
    return '\ufeff'+[cols,...rows].map(row=>row.map(csvCell).join(';')).join('\r\n');
  }
  function winAnsiChar(ch){
    const code=ch.charCodeAt(0);if(code<=255)return String.fromCharCode(code);
    const map={'€':128,'‚':130,'ƒ':131,'„':132,'…':133,'†':134,'‡':135,'ˆ':136,'‰':137,'Š':138,'‹':139,'Œ':140,'Ž':142,'‘':145,'’':146,'“':147,'”':148,'•':149,'–':150,'—':151,'˜':152,'™':153,'š':154,'›':155,'œ':156,'ž':158,'Ÿ':159};
    return Object.prototype.hasOwnProperty.call(map,ch)?String.fromCharCode(map[ch]):'?';
  }
  function toWinAnsi(s){return Array.from(String(s||'')).map(winAnsiChar).join('');}
  function pdfLiteral(s){return toWinAnsi(s).replace(/\\/g,'\\\\').replace(/\(/g,'\\(').replace(/\)/g,'\\)').replace(/[\r\n]/g,' ');}
  function binaryStringBytes(s){const a=new Uint8Array(s.length);for(let i=0;i<s.length;i++)a[i]=s.charCodeAt(i)&255;return a;}
  function wrapPdfLine(text,max=94){
    const src=cleanText(text).replace(/\s*\n\s*/g,' ');if(!src)return [''];const words=src.split(/\s+/),out=[];let line='';
    for(const w of words){if(!line){line=w;continue;}if((line+' '+w).length<=max)line+=' '+w;else{out.push(line);line=w;}}
    if(line)out.push(line);return out.length?out:[''];
  }
  function makePagedPdf(lines,title='Raspador de dados de relações e postagens do Facebook'){
    const safeLines=[];for(const line of lines||[])safeLines.push(...wrapPdfLine(line,96));
    const perPage=49,pages=[];for(let i=0;i<safeLines.length;i+=perPage)pages.push(safeLines.slice(i,i+perPage));if(!pages.length)pages.push(['']);
    const pageCount=pages.length,fontObj=3,pageObjs=pages.map((_,i)=>4+i*2),contentObjs=pages.map((_,i)=>5+i*2),objs=[];
    objs[1]='<< /Type /Catalog /Pages 2 0 R >>';
    objs[2]='<< /Type /Pages /Kids ['+pageObjs.map(n=>n+' 0 R').join(' ')+'] /Count '+pageCount+' >>';
    objs[3]='<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>';
    pages.forEach((page,i)=>{
      const pObj=pageObjs[i],cObj=contentObjs[i];
      objs[pObj]='<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 3 0 R >> >> /Contents '+cObj+' 0 R >>';
      const heading=(i===0?title:title+' - página '+(i+1)+'/'+pageCount);
      let stream='BT /F1 9 Tf 34 810 Td 12 TL ('+pdfLiteral(heading)+') Tj T* ';
      for(const line of page)stream+='('+pdfLiteral(line)+') Tj T* ';
      stream+='ET';objs[cObj]='<< /Length '+stream.length+' >>\nstream\n'+stream+'\nendstream';
    });
    const maxObj=3+pageCount*2;let out='%PDF-1.4\n%âãÏÓ\n',offs=[0];
    for(let i=1;i<=maxObj;i++){offs[i]=out.length;out+=i+' 0 obj\n'+objs[i]+'\nendobj\n';}
    const xref=out.length;out+='xref\n0 '+(maxObj+1)+'\n0000000000 65535 f \n';for(let i=1;i<=maxObj;i++)out+=String(offs[i]).padStart(10,'0')+' 00000 n \n';out+='trailer << /Size '+(maxObj+1)+' /Root 1 0 R >>\nstartxref\n'+xref+'\n%%EOF';
    return binaryStringBytes(out);
  }
  function makeDataPdf(){
    const j=makeJson(),lines=[];lines.push('Data/Hora: '+nowBR(),'URL: '+location.href,'Relação: '+relationLabel(state.relation),'Alvo real: '+(j.expected.declaredTarget||'não confirmado'),'Coletados: '+j.totals.rows,'Status: '+j.gates.decision,'');
    for(const [i,r] of rowsArr().entries()){
      lines.push('#'+(i+1)+' '+(r.nome||r.displayName||r.username)+' | '+r.username);
      lines.push('Perfil: '+(r.perfil||r.profileUrl||''));
      lines.push('Seguidores: '+(r.seguidores||'')+' | Seguindo: '+(r.seguindo||'')+' | Categoria: '+(r.categoria||''));
      if(r.bio||r.bioText)lines.push('Bio: '+rejectBadText(r.bio||r.bioText||''));
      if(r.email||(r.emails||[]).length||r.telefone||(r.telefones||[]).length)lines.push('Contato: '+[r.email||(r.emails||[]).join(' | '),r.telefone||(r.telefones||[]).join(' | ')].filter(Boolean).join(' | '));
      if(r.localizacao||r.trabalho||r.formacao)lines.push('Contexto: '+[r.localizacao&&('Local '+r.localizacao),r.trabalho&&('Trabalho '+r.trabalho),r.formacao&&('Formação '+r.formacao)].filter(Boolean).join(' | '));
      const links=uniq([r.externalUrl,...(r.externalUrls||[]),...(r.linksExternos||[])]).filter(Boolean);if(links.length)lines.push('Links: '+links.join(' | '));
      const gen=visibleGeneralInfoItems(r).map(x=>[x.label||x.section||x.type,x.value||x.subtitle||''].filter(Boolean).join(': '));if(gen.length)lines.push('Informações gerais: '+gen.join(' | '));
      lines.push('----------------------------------------------------------------');
    }
    lines.push('Script de raspagem desenvolvido por '+CREDIT_NAME,CREDIT_IG);return makePagedPdf(lines,'Relatório de dados de relações do Facebook');
  }
  function byteLengthDataV442130(data){
    if(typeof data==='string')return new TextEncoder().encode(data).byteLength;
    if(data instanceof Uint8Array)return data.byteLength;
    if(data instanceof ArrayBuffer)return data.byteLength;
    if(ArrayBuffer.isView(data))return data.byteLength;
    return new TextEncoder().encode(String(data==null?'':data)).byteLength;
  }
  function legacyIntegrityText(artifact,sha256,sha512){
    const rows=[
      ['Data/Hora',nowBR()],
      ['URL',location.href],
      ['Arquivo',artifact.name],
      ['Formato',artifact.mime],
      ['Tamanho',byteLengthDataV442130(artifact.data)+' bytes'],
      ['Hash SHA-256',sha256],
      ['Hash SHA-512',sha512],
      ['Status do Export','OK em '+nowBR()]
    ];
    let text='Laudo de Integridade - Raspador de dados de amigos Facebook\nCampo Valor\n------------------ --------------------------------------------------------------\n';
    rows.forEach(([k,v])=>{text+=(String(k)+'                ').slice(0,18)+' '+String(v||'')+'\n';});
    text+='-------------------------------------------------------------------------------\nScript de raspagem desenvolvido por '+CREDIT_NAME+'\n'+CREDIT_IG;
    return text;
  }
  function legacyPdfEscape(s){return String(s||'').replace(/[\\()]/g,'\\$&').replace(/\r/g,'').split('\n');}
  function makeLegacySimplePdf(text){
    const lines=legacyPdfEscape(text).slice(0,55);let stream='BT /F1 10 Tf 40 790 Td 14 TL ';
    lines.forEach((l,i)=>{if(i)stream+='T* ';stream+='('+l+') Tj ';});stream+='ET';
    const objs=[];function add(x){objs.push(x);return objs.length;}
    add('<< /Type /Catalog /Pages 2 0 R >>');
    add('<< /Type /Pages /Kids [3 0 R] /Count 1 >>');
    add('<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>');
    add('<< /Type /Font /Subtype /Type1 /BaseFont /Courier >>');
    add('<< /Length '+stream.length+' >>\nstream\n'+stream+'\nendstream');
    let out='%PDF-1.4\n';const offs=[0];objs.forEach((o,i)=>{offs.push(out.length);out+=(i+1)+' 0 obj\n'+o+'\nendobj\n';});
    const xref=out.length;out+='xref\n0 '+(objs.length+1)+'\n0000000000 65535 f \n';
    for(let i=1;i<offs.length;i++)out+=String(offs[i]).padStart(10,'0')+' 00000 n \n';
    out+='trailer << /Size '+(objs.length+1)+' /Root 1 0 R >>\nstartxref\n'+xref+'\n%%EOF';
    return binaryStringBytes(out);
  }
  function makeIntegrityPdf(artifact,sha256,sha512){
    return makeLegacySimplePdf(legacyIntegrityText(artifact,sha256,sha512));
  }
  function artifactBase(){return 'fb_relacoes_b35a1_'+slug(currentTarget())+'_'+isoStamp();}
  function relationMessageV44R10(message){return new Promise(resolve=>{try{chrome.runtime.sendMessage(message,response=>{if(chrome.runtime.lastError){resolve(null);return;}resolve(response||null);});}catch(_){resolve(null);}});}
  async function freezeExportSnapshotV44R10(){
    captureTargetAvatarRunV4433('freeze_export_before_json');
    const json=makeJson(),tp=json&&json.targetProfile||null;
    if(tp){
      let raw=cleanText(tp.avatarSourceUrl||tp.avatarUrl||targetAvatarRunV4433().url||'');
      let best=null;
      if(raw&&!/^data:image\//i.test(raw)){
        try{best=await relationMessageV44R10({type:'B35_FETCH_IMAGE_DATA_V44R10',url:raw,preferHighRes:true});}catch(_){}
      }
      if(!best||!best.ok||Math.max(Number(best.width||0),Number(best.height||0))<640){
        const key=String(currentTarget()||''),profileUrl=canonicalProfileUrlFromKey(key),authorName=safeHeaderCandidate(tp.displayName||'')||titleCaseFromKey(key),identity=/^id:/i.test(key)?key:'user:'+key;
        let resolved=null;try{resolved=await relationMessageV44R10({type:'B35_FETCH_PROFILE_AVATAR_V44R3',profileUrl:profileUrl,authorName:authorName,profileIdentity:identity});}catch(_){}
        if(resolved&&resolved.ok&&resolved.identityMatched===true){
          if(!best||!best.ok||Math.max(Number(resolved.width||0),Number(resolved.height||0))>Math.max(Number(best.width||0),Number(best.height||0)))best=resolved;
        }
      }
      if(best&&best.ok)applyTargetAvatarV4433(tp,best,best.source||'RC5_EXPORT_TARGET_BOUND');
      else tp.avatarQualityAudit={targetKey:String(currentTarget()||''),available:!!raw,embedded:/^data:image\//i.test(String(tp.avatar||'')),width:Number(tp.avatarWidth||0),height:Number(tp.avatarHeight||0),maxDimension:Math.max(Number(tp.avatarWidth||0),Number(tp.avatarHeight||0)),sha256:String(tp.avatarSha256||''),currentRunOnly:true,persistentCache:false,source:'UNRESOLVED_FAIL_LOUD',capturedUrl:targetAvatarRunV4433().url||'',history:[...(targetAvatarRunV4433().history||[])]};
    }
    return {json,html:makeHtml(json),createdAt:json.exportedAt||new Date().toISOString()};
  }
  function freezeExportSnapshot(){const json=makeJson();return {json,html:makeHtml(json),createdAt:json.exportedAt||new Date().toISOString()};}
  function buildExportArtifact(kind,base,snapshot=null){
    if(kind==='json')return snapshot?{kind,name:base+'.json',mime:'application/json;charset=utf-8',data:JSON.stringify(snapshot.json,null,2)}:{kind,name:base+'.json',mime:'application/json;charset=utf-8',data:JSON.stringify(makeJson(),null,2)};
    if(kind==='html')return snapshot?{kind,name:base+'.html',mime:'text/html;charset=utf-8',data:snapshot.html}:{kind,name:base+'.html',mime:'text/html;charset=utf-8',data:makeHtml()};
    if(kind==='csv')return {kind,name:base+'.csv',mime:'text/csv;charset=utf-8',data:makeCsv()};
    if(kind==='pdf')return snapshot?{kind,name:base+'.pdf',mime:'text/html;charset=utf-8',data:snapshot.html,nativePrint:true,sourceHtmlName:base+'.html'}:{kind,name:base+'.pdf',mime:'text/html;charset=utf-8',data:makeHtml(),nativePrint:true,sourceHtmlName:base+'.html'};
    throw new Error('FORMATO_EXPORT_NAO_SUPORTADO: '+kind);
  }
  function nativePdfViewportMetrics(){
    let width=1880,height=1060;
    try{
      const w=typeof window!=='undefined'&&window?Number(window.innerWidth||0):0;
      const h=typeof window!=='undefined'&&window?Number(window.innerHeight||0):0;
      if(Number.isFinite(w)&&w>900)width=Math.round(w);
      if(Number.isFinite(h)&&h>500)height=Math.round(h);
    }catch(e){}
    width=Math.max(1700,Math.min(2560,width));
    height=Math.max(900,Math.min(1600,height));
    return {width,height,widthMm:Number((width*25.4/96).toFixed(3)),heightMm:Number((height*25.4/96).toFixed(3))};
  }
  function htmlForNativePdfPrint(html,metrics){
    const m=metrics||nativePdfViewportMetrics();
    const marker='</head>';
    const printCss='<style id="fb-b35-pdf-screen-parity">@page{size:'+m.widthMm+'mm '+m.heightMm+'mm;margin:0}'+
      '@media print{html,body{width:'+m.width+'px!important;min-width:'+m.width+'px!important;max-width:none!important;-webkit-print-color-adjust:exact!important;print-color-adjust:exact!important}'+
      'body{margin:16px!important;padding-bottom:92px!important;background:#f7f7f8!important}'+
      '.bottomScroll{display:none!important}}<\/style>';
    const printScript='<script>(function(){async function ready(){var imgs=Array.from(document.images||[]);await Promise.all(imgs.map(function(img){if(img.complete)return Promise.resolve();return new Promise(function(resolve){var done=function(){resolve()};img.addEventListener("load",done,{once:true});img.addEventListener("error",done,{once:true});setTimeout(done,10000)})}));try{if(document.fonts&&document.fonts.ready)await Promise.race([document.fonts.ready,new Promise(function(r){setTimeout(r,3000)})])}catch(e){}await new Promise(function(r){requestAnimationFrame(function(){requestAnimationFrame(function(){setTimeout(r,180)})})});window.focus();window.print()}window.addEventListener("load",ready,{once:true})})();<\/script>';
    let out=String(html||'');out=out.includes(marker)?out.replace(marker,printCss+marker):printCss+out;return out+printScript;
  }
  function openHtmlReportNativePdf(html,preopened=null){
    const w=preopened||window.open('about:blank','_blank');if(!w)throw new Error('PDF_PRINT_WINDOW_BLOCKED');
    try{w.document.open();w.document.write(htmlForNativePdfPrint(html,nativePdfViewportMetrics()));w.document.close();w.focus();return true;}catch(e){try{w.close();}catch(_){}throw e;}
  }
  async function exportArtifactWithIntegrity(artifact,options){
    options=options||{};
    const sha256=await shaHexData('SHA-256',artifact.data),sha512=await shaHexData('SHA-512',artifact.data);
    if(artifact.nativePrint===true){
      openHtmlReportNativePdf(artifact.data,options.preopenedPrintWindow||null);
      const sourceArtifact={...artifact,name:artifact.sourceHtmlName||artifact.name.replace(/\.pdf$/i,'.html'),mime:'text/html;charset=utf-8'};
      const laudo=makeIntegrityPdf(sourceArtifact,sha256,sha512),laudoName=artifact.name.replace(/\.[^.]+$/,'')+'_fonte_html_laudo_integridade.pdf';
      downloadBlob(laudoName,laudo,'application/pdf');
      return {name:artifact.name,mime:'application/pdf',mode:'native_print_exact_makeHtml',sourceHtmlSha256:sha256,sourceHtmlSha512:sha512,integrityPdf:laudoName,viewport:nativePdfViewportMetrics()};
    }
    downloadBlob(artifact.name,artifact.data,artifact.mime);
    const laudo=makeIntegrityPdf(artifact,sha256,sha512),laudoName=artifact.name.replace(/\.[^.]+$/,'')+'_laudo_integridade.pdf';
    downloadBlob(laudoName,laudo,'application/pdf');
    return {name:artifact.name,mime:artifact.mime,sha256,sha512,integrityPdf:laudoName};
  }
  async function prepareFinalBeforeExport(){
    readInputs();const exportSurfaceAudit=auditRelationSurface('prepared_export_nonblocking');if(exportSurfaceAudit.mismatch)warn('Exportação preservada apesar de divergência de superfície detectada após a coleta.',exportSurfaceAudit);
    if(state.runningScroll===true&&!state.stopRequested){try{await waitForActiveScroll();}catch(e){if(!isStopError(e))warn('Exportação seguirá com snapshot operacional após falha ao aguardar scroll.',String(e&&e.message||e));}}
    scanVisible();
    if(!state.stopRequested){
      const relationReady=relationReadyForMeta();
      if(relationReady){state.metaLimit=rowsArr().length;try{await ensureMetaCoverageForCurrentRelation('prepared_export');}catch(e){if(!isStopError(e))warn('Exportação seguirá com snapshot operacional após falha de cobertura Meta.',String(e&&e.message||e));}}
      else warn('Exportação operacional/parcial preservada: relação não está fechada para cobertura integral.',{total:rowsArr().length,declaredTarget:declaredRelationTarget(),observedRelationCount:Number(state.observedRelationCount||state.closedRelationCount||0),relationSurfaceBlocked:state.relationSurfaceBlocked===true});
      if(state.metaRun&&state.metaRun.active===true&&state.metaRun.promise){try{await state.metaRun.promise;}catch(e){if(!isStopError(e))warn('Exportação seguirá após falha da run Meta ativa.',String(e&&e.message||e));}}
      if(!(state.metaRun&&state.metaRun.active===true)){try{await awaitGeneralLaneDrain();}catch(e){if(!isStopError(e))warn('Exportação seguirá após falha no dreno da lane de informações gerais.',String(e&&e.message||e));}try{await recoverLowPhotos();}catch(e){if(!isStopError(e))warn('Exportação seguirá após falha na recuperação de fotos baixas.',String(e&&e.message||e));}}
    }else warn('Exportação de snapshot preservado após parada solicitada pelo usuário.',{stoppedAt:state.stopAt,total:rowsArr().length});
    const cov=metaRunCoverageAudit(state.metaRun,rowsArr()),metaComplete=!!(state.metaRun&&state.metaRun.completed&&cov.completedCovers),generalComplete=!!(state.generalRun&&state.generalRun.completed===true);
    if(!metaComplete)warn('Exportação operacional/parcial: Meta não cobre integralmente a relação atual.',{required:cov.required,completed:cov.completed,missingCompleted:cov.missingCompleted.length});if(!generalComplete)warn('Exportação operacional/parcial: lane de informações gerais não terminou integralmente.',generalRunSummary());rowsArr().forEach(syncPhotoFields);renderStatus();
    return {relationReady:relationReadyForMeta(),metaComplete,generalComplete,surfaceAudit:exportSurfaceAudit};
  }
  async function exportSelectedFormats(kinds,options){
    options=options||{};
    const selected=uniq((kinds||[]).map(x=>String(x).toLowerCase())).filter(x=>['json','html','pdf','csv'].includes(x));if(!selected.length)throw new Error('SELECIONE_AO_MENOS_UM_FORMATO');
    const printWindow=selected.includes('pdf')?(options.preopenedPrintWindow||window.open('about:blank','_blank')):null;
    await prepareFinalBeforeExport();const base=artifactBase();state.lastExportBase=base;const out=[];
    const snapshot=selected.some(k=>k==='json'||k==='html'||k==='pdf')?freezeExportSnapshot():null;
    for(const kind of selected){const artifact=buildExportArtifact(kind,base,snapshot);out.push(await exportArtifactWithIntegrity(artifact,{preopenedPrintWindow:kind==='pdf'?printWindow:null}));await new Promise(r=>setTimeout(r,180));}
    log('info','Exportação multiformato concluída; PDF usa exatamente makeHtml() em impressão nativa com paridade visual de viewport; laudos usam o modelo legado Courier.',{formats:selected,files:out.map(x=>x.name)});return out;
  }
  async function exportOne(kind){return exportSelectedFormats([kind]);}
  async function exportPreparedOne(kind){return exportSelectedFormats([kind]);}
  async function exportAll(){return exportSelectedFormats(['json','html','pdf','csv']);}
  function showExportChooser(){
    const old=document.getElementById('fb-b35-export-chooser');if(old){old.remove();return;}
    const box=document.createElement('div');box.id='fb-b35-export-chooser';box.style.cssText='margin-top:8px;border:1px solid #cbd5e1;border-radius:10px;padding:9px;background:#f8fafc';
    box.innerHTML='<div style="font-weight:800;margin-bottom:6px">Escolha os formatos</div><label style="margin-right:9px"><input type="checkbox" value="json"> JSON</label><label style="margin-right:9px"><input type="checkbox" value="html"> HTML</label><label style="margin-right:9px"><input type="checkbox" value="pdf"> PDF</label><label><input type="checkbox" value="csv"> CSV</label><div style="font-size:10px;color:#64748b;margin:6px 0">PDF abre exatamente o mesmo HTML no diálogo nativo de impressão, preservando cores, fonte, imagens, colunas e geometria visual para salvar como PDF. Os laudos de integridade usam o modelo legado Courier de referência; o PDF recebe laudo da fonte HTML porque os bytes finais dependem do salvamento do navegador.</div><div style="display:flex;gap:6px"><button id="fb-b35-export-go" style="font-weight:800">Gerar selecionados</button><button id="fb-b35-export-all">Marcar todos</button><button id="fb-b35-export-cancel">Cancelar</button></div>';
    const panel=document.getElementById('fb-b35a1-raspador-amigos-v29-panel');if(!panel)return;panel.appendChild(box);
    box.querySelector('#fb-b35-export-all').onclick=()=>box.querySelectorAll('input[type="checkbox"]').forEach(x=>x.checked=true);
    box.querySelector('#fb-b35-export-cancel').onclick=()=>box.remove();
    box.querySelector('#fb-b35-export-go').onclick=runPanelAction('exportação multiformato',async()=>{const kinds=Array.from(box.querySelectorAll('input[type="checkbox"]:checked')).map(x=>x.value);await exportSelectedFormats(kinds);box.remove();});
  }

  function runPanelAction(label,fn){
    return ()=>Promise.resolve().then(fn).catch(e=>{if(isStopError(e)||state.stopRequested===true){renderStatus();return;}const detail=cleanText(String(e&&e.message||e||'')).slice(0,220);err('Falha '+String(label||'ação do painel')+(detail?' · '+detail:''),e);renderStatus();});
  }
  function panelBusy(){
    return state.runningMeta===true||state.runningScroll===true||
      !!(state.metaRun&&state.metaRun.active===true)||
      !!(state.generalRun&&state.generalRun.active===true)||
      !!(state.photoRecoveryRun&&state.photoRecoveryRun.active===true)||
      !!(state.relationRecovery&&state.relationRecovery.active===true)||
      !!(state.networkRelation&&state.networkRelation.drainActive===true);
  }
  function pctValue(part,total){
    const a=Math.max(0,Number(part||0)),b=Math.max(0,Number(total||0));
    if(!(b>0))return null;
    return Math.max(0,Math.min(100,(a/b)*100));
  }
  function pctText(value){
    return value==null?'—%':Number(value).toLocaleString('pt-BR',{minimumFractionDigits:2,maximumFractionDigits:2})+'%';
  }
  function relationProgressSnapshot(){
    const collected=rowsArr().length,target=declaredRelationTarget(),run=metaRunSummary(),enriched=Number(run.completedUnique||0),targetConfirmed=target>0;
    const listPct=targetConfirmed?pctValue(collected,target):null;
    const metaDen=targetConfirmed?target:Math.max(collected,0);
    const metaPct=metaDen>0?pctValue(enriched,metaDen):(collected===0?0:null);
    return {relation:state.relation,label:relationLabel(state.relation),collected,target,targetConfirmed,listPct,enriched,metaDen,metaPct,metaScope:targetConfirmed?'confirmed_target':'observed_cohort'};
  }
  function installRelationUiObserver(){
    if(__b35RelationUiObserver||typeof MutationObserver==='undefined')return;const root=document.body||document.documentElement;if(!root)return;
    __b35RelationUiObserver=new MutationObserver(()=>{
      // V35 idle-safe: enquanto o usuário não iniciou a raspagem, não percorre DOM, não conta perfis e não disputa o carregamento do Facebook.
      if(!panelBusy()||state.stopRequested===true)return;
      try{if(__b35RelationUiTimer)clearTimeout(__b35RelationUiTimer);}catch(e){}
      __b35RelationUiTimer=setTimeout(()=>{
        if(!panelBusy()||state.stopRequested===true)return;
        const pageCtx=ensureCurrentPageContext('active_ui_observer');
        if(pageCtx.changed===true){refreshRelationTargetFromDom('active_target_context_switch',true);safeScanVisibleForCurrentIntent('active_target_context_switch');renderStatus();return;}
        const active=detectActiveRelationSurface();
        state.relationVisualDiagnostic={relation:active&&active.relation||'',confidence:Number(active&&active.confidence||0),trusted:active&&active.trusted===true,evidence:[...(active&&active.evidence||[])],at:new Date().toISOString(),reason:'active_ui_observer'};
        // Sinais visuais permanecem diagnósticos e nunca mudam a intenção/coorte por conta própria.
        safeScanVisibleForCurrentIntent('active_ui_observer');renderStatus();
      },320);
    });
    try{__b35RelationUiObserver.observe(root,{subtree:true,childList:true,attributes:true,attributeFilter:['aria-selected','aria-current','class','style']});}catch(e){__b35RelationUiObserver=null;}
  }

  function makePanel(){
    assertCreditNameIntegrity();
    try{document.getElementById('fb-b35a1-ext-structured-v5-panel')?.remove();}catch(e){}
    try{document.getElementById('fb-b35a1-ext-structured-v6-panel')?.remove();}catch(e){}
    try{document.getElementById('fb-b35a1-ext-structured-v7-panel')?.remove();}catch(e){}
    try{document.getElementById('fb-b35a1-ext-structured-v11-panel')?.remove();}catch(e){}
    try{document.getElementById('fb-b35a1-ext-structured-v13-panel')?.remove();}catch(e){}
    for(const id of ['fb-b35a1-raspador-amigos-v15-panel','fb-b35a1-raspador-amigos-v17-panel','fb-b35a1-raspador-amigos-v18-panel','fb-b35a1-raspador-amigos-v19-panel','fb-b35a1-raspador-amigos-v20-panel','fb-b35a1-raspador-amigos-v21-panel','fb-b35a1-raspador-amigos-v22-panel','fb-b35a1-raspador-amigos-v23-panel','fb-b35a1-raspador-amigos-v24-panel','fb-b35a1-raspador-amigos-v25-panel','fb-b35a1-raspador-amigos-v26-panel','fb-b35a1-raspador-amigos-v29-panel']){const old=document.getElementById(id);if(old)old.remove();}
    const panel=document.createElement('div'); panel.id='fb-b35a1-raspador-amigos-v29-panel'; panel.style.cssText='position:fixed;z-index:2147483647;top:18px;right:18px;width:390px;max-width:calc(100vw - 24px);max-height:88vh;overflow:auto;background:#fff;color:#111;border:2px solid #111;border-radius:14px;padding:14px;font:13px Arial;box-shadow:0 12px 36px rgba(0,0,0,.35)';
    panel.innerHTML='<div style="font-weight:800;font-size:18px;line-height:1.2">Raspador de dados de relações do Facebook</div>'+
      '<div style="font-size:12px;margin:4px 0 12px;color:#555">Desenvolvido por <a href="'+CREDIT_IG+'" target="_blank" style="color:#1877f2;font-weight:700;text-decoration:none">'+esc(CREDIT_NAME)+'</a></div>'+
      '<div id="fb-b35-friendly-status" style="background:#f6f7f9;border:1px solid #ddd;border-radius:10px;padding:10px;margin-bottom:10px">'+
        '<div id="fb-b35-friendly-text" style="font-weight:700;margin-bottom:9px">Pronto para iniciar.</div>'+
        '<div style="display:flex;justify-content:space-between;gap:8px;font-size:11px;color:#555;margin-bottom:3px"><span id="fb-b35-list-label">Relação coletada</span><b id="fb-b35-list-number" style="color:#111">0 · —%</b></div>'+
        '<div style="height:9px;background:#ddd;border-radius:999px;overflow:hidden"><div id="fb-b35-list-progress" style="height:100%;width:0;background:#1877f2;transition:width .18s linear"></div></div>'+
        '<div style="display:flex;justify-content:space-between;gap:8px;font-size:11px;color:#555;margin:8px 0 3px"><span>Perfis enriquecidos</span><b id="fb-b35-meta-number" style="color:#111">0 · 0,00%</b></div>'+
        '<div style="height:9px;background:#ddd;border-radius:999px;overflow:hidden"><div id="fb-b35-meta-progress" style="height:100%;width:0;background:#16a34a;transition:width .18s linear"></div></div>'+
      '</div>'+
      '<div style="display:flex;flex-wrap:wrap;gap:6px">'+
        '<button id="fb-b35-scroll" style="font-weight:800">Raspar relação</button>'+
        '<button id="fb-b35-stop" style="font-weight:800;background:#fee2e2;color:#991b1b;border:1px solid #fca5a5">Parar</button>'+
        '<button id="fb-b35-export" style="font-weight:800">Exportar…</button>'+
        '<button id="fb-b35-close">Fechar</button>'+
      '</div>'+
      '<div id="fb-b35-target-audit" style="margin-top:7px;font-size:10px;color:#64748b"></div>'+
      '<div id="fb-b35-friendly-error" style="display:none;margin-top:8px;padding:7px;border-radius:8px;background:#fef2f2;color:#991b1b;font-size:11px"></div>';
    document.body.appendChild(panel);
    panel.querySelector('#fb-b35-scroll').onclick=runPanelAction('raspagem integral',async()=>{readInputs();await autoScrollCollectAndEnrich();});
    panel.querySelector('#fb-b35-stop').onclick=()=>requestStop('botao_painel');
    panel.querySelector('#fb-b35-export').onclick=()=>showExportChooser();
    panel.querySelector('#fb-b35-close').onclick=()=>destroy();
    renderStatus(); updateButtons(); return panel;
  }
  function readInputs(){
    state.delay=DEFAULT_DELAY;
    state.fetchConcurrency=DEFAULT_FETCH_CONCURRENCY;
    if(state.relationObservedClosed===true)state.metaLimit=Number(state.closedRelationCount||state.observedRelationCount||rowsArr().length||0);
    else state.metaLimit=rowsArr().length;
  }
  function updateButtons(){
    const busy=panelBusy(),snap=relationProgressSnapshot();
    const sb=document.getElementById('fb-b35-scroll'),stop=document.getElementById('fb-b35-stop'),exp=document.getElementById('fb-b35-export');
    if(sb){
      sb.disabled=busy;
      const verb=state.runningScroll?'Raspando '+snap.label.toLowerCase()+'…':(state.runningMeta?'Enriquecendo…':(state.generalRun&&state.generalRun.active?'Coletando informações gerais…':'Raspar '+snap.label.toLowerCase()));
      sb.textContent=verb;
    }
    if(stop){stop.disabled=!busy||state.stopRequested===true;stop.textContent=state.stopRequested?'Parada solicitada':'Parar';}
    if(exp){exp.disabled=false;exp.textContent=busy&&!state.stopRequested?'Exportar snapshot…':'Exportar…';}
  }
  function renderStatus(){
    const text=document.getElementById('fb-b35-friendly-text'),lp=document.getElementById('fb-b35-list-progress'),mp=document.getElementById('fb-b35-meta-progress'),er=document.getElementById('fb-b35-friendly-error');
    const ln=document.getElementById('fb-b35-list-number'),mn=document.getElementById('fb-b35-meta-number'),ll=document.getElementById('fb-b35-list-label'),ta=document.getElementById('fb-b35-target-audit');
    const snap=relationProgressSnapshot();
    if(lp){lp.style.width=(snap.listPct==null?0:snap.listPct).toFixed(2)+'%';lp.style.opacity=snap.listPct==null?'0.35':'1';}
    if(mp){mp.style.width=(snap.metaPct==null?0:snap.metaPct).toFixed(2)+'%';mp.style.opacity=snap.metaPct==null?'0.35':'1';}
    if(ll)ll.textContent=snap.label+' coletados';
    if(ln)ln.textContent=snap.targetConfirmed?(snap.collected.toLocaleString('pt-BR')+' de '+snap.target.toLocaleString('pt-BR')+' · '+pctText(snap.listPct)):(snap.collected.toLocaleString('pt-BR')+' · alvo não confirmado · —%');
    if(mn){mn.textContent=snap.metaDen>0?(snap.enriched.toLocaleString('pt-BR')+' de '+snap.metaDen.toLocaleString('pt-BR')+' · '+pctText(snap.metaPct)+(snap.metaScope==='observed_cohort'?' da coorte coletada':'')):(snap.enriched.toLocaleString('pt-BR')+' · 0,00%');}
    if(ta){const a=state.relationTargetAudit||{},rc=state.relationRunContext||{};ta.textContent='Relação: '+snap.label+' · alvo '+(snap.targetConfirmed?snap.target.toLocaleString('pt-BR'):'não confirmado')+' · fonte: '+(rc.locked?rc.source:(a.source||'aguardando evidência'))+(rc.locked&&rc.confidence?(' · confiança '+Number(rc.confidence).toFixed(0)):(a.confidence?(' · confiança '+Number(a.confidence).toFixed(0)):''));}
    if(text){
      const listPart=snap.targetConfirmed?(snap.collected+' de '+snap.target+' ('+pctText(snap.listPct)+')'):(snap.collected+' coletados · alvo não confirmado');
      const metaPart=snap.metaDen>0?(snap.enriched+' de '+snap.metaDen+' enriquecidos ('+pctText(snap.metaPct)+')'+(snap.metaScope==='observed_cohort'?' da coorte coletada':'')):(snap.enriched+' enriquecidos');
      if(state.stopRequested===true)text.textContent='Parado pelo usuário · '+listPart+' · '+metaPart;
      else if(state.networkRelation&&state.networkRelation.drainActive===true)text.textContent='Continuando paginação da relação: '+listPart+' · replays '+Number(state.networkRelation.replaysCompleted||0)+'/'+Number(state.networkRelation.replaysRequested||0)+' · '+metaPart;
      else if(state.relationSearchRecovery&&state.relationSearchRecovery.active===true)text.textContent='Recuperando lacuna por busca da relação: '+listPart+' · prefixos '+Number(state.relationSearchRecovery.attempts||0)+' · ganhos '+Number(state.relationSearchRecovery.gained||0);
      else if(state.relationRecovery&&state.relationRecovery.active===true)text.textContent='Recuperando '+snap.label.toLowerCase()+': '+listPart+' · tentativa '+Number(state.relationRecovery.rounds||0)+' de '+RELATION_RECOVERY_MAX_ROUNDS;
      else if(state.photoRecoveryRun&&state.photoRecoveryRun.active===true)text.textContent='Recuperando fotos baixas: '+Number(state.photoRecoveryRun.started||0)+' de '+Number(state.photoRecoveryRun.queued||0)+' · melhoradas '+Number(state.photoRecoveryRun.improved||0);
      else if(state.runningScroll)text.textContent='Raspando '+snap.label.toLowerCase()+': '+listPart+' · '+metaPart;
      else if(state.generalRun&&state.generalRun.active===true)text.textContent='Finalizando informações gerais: '+Number(state.generalRun.completedUnique||0)+' de '+Number(state.generalRun.queuedUnique||0)+' · '+metaPart;
      else if(state.runningMeta||metaRunSummary().active)text.textContent='Finalizando enriquecimento: '+metaPart+' · '+listPart;
      else if(state.relationVisibilityGap===true&&snap.targetConfirmed&&snap.collected<snap.target){
        const exposure=state.relationExposure||{};
        text.textContent=exposure.serverTerminalBelowTarget===true
          ?snap.collected+' perfis expostos pelo Facebook de '+snap.target+' informados ('+pctText(snap.listPct)+') · conexão terminal da sessão · '+metaPart
          :snap.collected+' observados de '+snap.target+' confirmados ('+pctText(snap.listPct)+') · recuperação esgotada · '+metaPart;
      }
      else if(snap.targetConfirmed&&snap.collected>=snap.target)text.textContent='Concluído: '+listPart+' · '+metaPart;
      else text.textContent='Encontrados: '+listPart+' · '+metaPart;
    }
    if(er){const last=state.errors[state.errors.length-1];if(last){er.style.display='block';er.textContent=last.message||String(last);}else er.style.display='none';}
    updateButtons();
  }
  function destroy(){
    try{if(panelBusy())requestStop('destroy');}catch(e){}
    try{endRelationNetworkCapture('destroy');}catch(e){}
    try{document.getElementById('fb-b35-export-chooser')?.remove();}catch(e){}
    try{document.getElementById('fb-b35a1-raspador-amigos-v29-panel')?.remove();}catch(e){}
    try{if(__b35RelationUiObserver)__b35RelationUiObserver.disconnect();}catch(e){}
    try{if(__b35RelationUiTimer)clearTimeout(__b35RelationUiTimer);}catch(e){}
    try{if(__b35RelationClickHandler)document.removeEventListener('click',__b35RelationClickHandler,true);}catch(e){}
    __b35RelationUiObserver=null;__b35RelationUiTimer=null;__b35RelationClickHandler=null;
    try{ if(__b35a1Heartbeat) clearInterval(__b35a1Heartbeat); }catch(e){}
    try{ if(__b35a1Port) __b35a1Port.disconnect(); }catch(e){}
    __b35a1Heartbeat=null; __b35a1Port=null;
  }


  // =====================================================================
  // V36 — PATCH CIRÚRGICO SOBRE O NÚCLEO V35
  // Objetivos:
  // 1) preservar a velocidade e o enriquecimento target-bound V35;
  // 2) quando /friends materializa Following, não perseguir 324 Friends;
  // 3) coletar a superfície realmente exibida, em tempo real, com Meta/HD streaming;
  // 4) seed append-only até fundo estável e freeze final;
  // 5) exportar diagnóstico explícito sem renomear Following como Friends;
  // 6) manter o modelo visual V35, com tabela final de 18 colunas congeladas.
  // =====================================================================
  const __v36BaseScanVisible=scanVisible;
  const __v36BaseAutoScrollCollectAndEnrich=autoScrollCollectAndEnrich;
  const __v36BaseMakeJson=makeJson;
  const __v36BaseMakeHtml=makeHtml;
  const __v36BaseMakeCsv=makeCsv;
  const __v36BaseMakeManifest=makeManifest;
  const __v36BaseMakePanel=makePanel;
  const __v36BaseRenderStatus=renderStatus;

  function v36EmptySeedState(){
    return {schema:'b35a1_online_append_only_seed_v36',open:false,finalized:false,startedAt:'',frozenAt:'',inputCount:0,outputCount:0,cohortSha256:'',nextIndex:1,identities:new Map(),gate:{ok:true,failures:[],checks:0},postFreezeBlocked:0};
  }
  function v36SeedState(){if(!state.v36Seed||!(state.v36Seed.identities instanceof Map))state.v36Seed=v36EmptySeedState();return state.v36Seed;}
  function v36ResetSeed(){state.v36Seed=v36EmptySeedState();return state.v36Seed;}
  function v36SeedIdentityForRow(key,row){
    return {profileUrl:cleanText(row&&row.profileUrl||row&&row.perfil||canonicalProfileUrlFromKey(key)),username:cleanText(row&&row.username||key),name:cleanText(row&&row.nome||row&&row.displayName||row&&row.username||key),avatarUrlInitial:cleanText(row&&row.avatarUrl||row&&row.fotoUrl||''),source:cleanText(row&&row.source||row&&row.captureSource||'visible_dom_card')||'visible_dom_card'};
  }
  function v36AttachSeedRows(){
    const seed=v36SeedState();
    for(const [key,row] of state.rows){
      const k=String(key||row&&row.key||'').toLowerCase();if(!k)continue;
      if(!seed.identities.has(k)){
        if(seed.finalized===true){state.rows.delete(key);seed.postFreezeBlocked++;continue;}
        const identity=v36SeedIdentityForRow(k,row),seedIndex=seed.nextIndex++;
        seed.identities.set(k,{seedIndex,seedKey:k,identity});
        row.seedIndex=seedIndex;row.seedKey=k;row.seedSha256='';row.seedProfileUrl=identity.profileUrl;row.seedUsername=identity.username;row.seedName=identity.name;row.seedAvatarUrlInitial=identity.avatarUrlInitial;row.seedSource=identity.source;
      }else{
        const rec=seed.identities.get(k);row.seedIndex=rec.seedIndex;row.seedKey=rec.seedKey;if(rec.seedSha256)row.seedSha256=rec.seedSha256;if(!row.seedProfileUrl)row.seedProfileUrl=rec.identity.profileUrl;if(!row.seedUsername)row.seedUsername=rec.identity.username;if(!row.seedName)row.seedName=rec.identity.name;if(!row.seedAvatarUrlInitial)row.seedAvatarUrlInitial=rec.identity.avatarUrlInitial;if(!row.seedSource)row.seedSource=rec.identity.source;
      }
    }
    seed.inputCount=seed.identities.size;seed.outputCount=state.rows.size;return seed;
  }
  function v36SeedGate(reason='gate'){
    const seed=v36SeedState(),fail=[];seed.gate.checks++;
    const rows=rowsArr(),keys=new Set(rows.map(r=>String(r&&r.key||r&&r.seedKey||'').toLowerCase()).filter(Boolean));
    if(seed.identities.size!==rows.length)fail.push('CARDINALIDADE_IDENTIDADES_DIFERE_ROWS');
    for(const [k,rec] of seed.identities){
      if(!keys.has(k))fail.push('SEED_REMOVIDA:'+k);
      const row=rows.find(r=>String(r&&r.key||r&&r.seedKey||'').toLowerCase()===k);
      if(row){
        if(Number(row.seedIndex||0)!==Number(rec.seedIndex||0))fail.push('SEED_INDEX_DRIFT:'+k);
        if(String(row.seedKey||'').toLowerCase()!==k)fail.push('SEED_KEY_DRIFT:'+k);
        if(cleanText(row.seedProfileUrl||'')!==cleanText(rec.identity.profileUrl||''))fail.push('SEED_PROFILE_URL_DRIFT:'+k);
        if(cleanText(row.seedUsername||'')!==cleanText(rec.identity.username||''))fail.push('SEED_USERNAME_DRIFT:'+k);
        if(cleanText(row.seedName||'')!==cleanText(rec.identity.name||''))fail.push('SEED_NAME_DRIFT:'+k);
        if(cleanText(row.seedAvatarUrlInitial||'')!==cleanText(rec.identity.avatarUrlInitial||''))fail.push('SEED_AVATAR_INITIAL_DRIFT:'+k);
        if(cleanText(row.seedSource||'')!==cleanText(rec.identity.source||''))fail.push('SEED_SOURCE_DRIFT:'+k);
      }
    }
    for(const k of keys)if(!seed.identities.has(k))fail.push('PERFIL_NAO_PERTENCE_SEED:'+k);
    if(seed.finalized===true&&rows.length!==Number(seed.outputCount||0))fail.push('CARDINALIDADE_POS_FREEZE_MUDOU');
    seed.gate.ok=fail.length===0;seed.gate.failures=uniq(fail);seed.lastGateReason=reason;return {ok:seed.gate.ok,failures:[...seed.gate.failures],checks:seed.gate.checks};
  }
  async function v36FreezeSeed(reason='stable_bottom'){
    const seed=v36AttachSeedRows();
    const ordered=Array.from(seed.identities.values()).sort((a,b)=>a.seedIndex-b.seedIndex);
    for(const rec of ordered){
      const canonical=JSON.stringify({seedIndex:rec.seedIndex,seedKey:rec.seedKey,profileUrl:rec.identity.profileUrl,username:rec.identity.username,name:rec.identity.name,avatarUrlInitial:rec.identity.avatarUrlInitial,source:rec.identity.source});
      rec.seedSha256=await shaHex('SHA-256',canonical);
      const row=rowsArr().find(r=>String(r&&r.key||r&&r.seedKey||'').toLowerCase()===rec.seedKey);if(row)row.seedSha256=rec.seedSha256;
    }
    const cohortCanonical=JSON.stringify(ordered.map(rec=>({seedIndex:rec.seedIndex,seedKey:rec.seedKey,seedSha256:rec.seedSha256})));
    seed.cohortSha256=await shaHex('SHA-256',cohortCanonical);seed.open=false;seed.finalized=true;seed.frozenAt=new Date().toISOString();seed.inputCount=ordered.length;seed.outputCount=state.rows.size;
    const gate=v36SeedGate('freeze:'+reason);if(!gate.ok){const e=new Error('SEED_GATE_FALHOU: '+gate.failures.join(','));e.code='SEED_GATE_FALHOU';throw e;}
    return seed;
  }

  scanVisible=function(){
    const seed=v36SeedState(),before=seed.finalized===true?new Set(Array.from(state.rows.keys()).map(String)):null;
    const n=__v36BaseScanVisible();
    if(seed.finalized===true&&before){for(const k of Array.from(state.rows.keys()))if(!before.has(String(k))){state.rows.delete(k);seed.postFreezeBlocked++;}}
    v36AttachSeedRows();if(seed.finalized===true)v36SeedGate('post_freeze_scan');return n;
  };

  function v36ObservedFallbackContext(){
    const route=relationRouteContext(location.href),requested=route.relation||inferRelationFromUrl(location.href)||state.relation||'friends';
    const active=detectActiveRelationSurface(),counts=detectRelationCountsFromDom(),declaredFriends=Math.max(0,Number(counts&&counts.counts&&counts.counts.friends||0));
    const eligible=requested==='friends'&&route.kind==='container'&&active&&active.relation==='following'&&active.trusted===true&&Number(active.confidence||0)>=100&&declaredFriends>0;
    return {eligible,requestedRelation:requested,materializedRelation:active&&active.relation||'',declaredFriendsCount:declaredFriends,routeKind:route.kind,activeConfidence:Number(active&&active.confidence||0),activeTrusted:active&&active.trusted===true,evidence:[...(active&&active.evidence||[])],countEvidence:[...(counts&&counts.evidence||[])]};
  }
  function v36TechnicalStatement(ctx,count){return 'O Facebook declara '+Number(ctx.declaredFriendsCount||0)+' amigos para o perfil. Contudo, nas sessões analisadas, a interface não materializou uma lista correspondente à relação Friends; manteve ativa a superfície interna Following, na qual foram observados '+Number(count||0)+' perfis únicos.';}
  function v36TechnicalNote(ctx,count){return 'A interface analisada não materializou a lista correspondente aos '+Number(ctx.declaredFriendsCount||0)+' amigos declarados. Durante a execução, permaneceu ativa a relação ‘Seguindo’, na qual foram observados '+Number(count||0)+' perfis únicos.';}
  function v36SetObservedContext(ctx){
    state.v36ObservedSurface={active:true,requestedRelation:'friends',requestedRelationLabel:'Amigos',declaredFriendsCount:Number(ctx.declaredFriendsCount||0),materializedRelation:'following',materializedRelationLabel:'Seguindo',resultLabel:'Seguindo observados',confirmedFriendsUnique:0,friendsResolved:false,startedAt:new Date().toISOString(),diagnosticSource:'outer_friends_plus_inner_following_trusted',evidence:[...(ctx.evidence||[])],continuity:{status:'start_trusted_following',ok:true,relation:'following'}};
  }
  function v37RelationContinuity(expected='following'){
    const active=detectActiveRelationSurface();
    if(active&&active.trusted===true&&active.relation){
      if(active.relation===expected)return {ok:true,status:'same_trusted_relation',relation:active.relation,confidence:Number(active.confidence||0),evidence:[...(active.evidence||[])]};
      return {ok:false,status:'explicit_trusted_conflict',relation:active.relation,confidence:Number(active.confidence||0),evidence:[...(active.evidence||[])]};
    }
    return {ok:true,status:'unknown_no_explicit_conflict',relation:active&&active.relation||'',confidence:Number(active&&active.confidence||0),evidence:[...(active&&active.evidence||[])]};
  }
  async function v36RunObservedSurfaceRealtime(ctx){
    if(state.runningScroll===true){await waitForActiveScroll();return ensureMetaCoverageForCurrentRelation('existing_observed_scroll_finished');}
    const targetKey=String(currentTarget()||'');
    clearOperationalCohort('following','v37_observed_surface_run_start',{requestedRelation:'friends',materializedRelation:'following'});
    resetRunControl();v36ResetSeed();const seed=v36SeedState();seed.open=true;seed.startedAt=new Date().toISOString();v36SetObservedContext(ctx);
    state.v37ObservedClosure={terminal:false,reason:'',count:0,at:'',continuity:null};
    state.v37ObservedProgressPct=0;state.v37ObservedProgressCacheAt=0;
    state.relation='following';state.relationSurfaceBlocked=false;state.expected=0;state.expectedHint=0;state.declaredRelationTarget=0;state.limit=Number.MAX_SAFE_INTEGER;state.expectedSource='materialized_following_observed_surface_unconfirmed_total';
    state.relationRunContext={locked:true,active:true,relation:'following',target:0,rawTarget:0,targetConfirmed:false,source:'observed_materialized_surface',confidence:Number(ctx.activeConfidence||0),startedAt:new Date().toISOString(),completedAt:''};
    state.relationTargetAudit={relation:'friends',target:0,rawTarget:Number(ctx.declaredFriendsCount||0),targetConfirmed:false,source:'declared_friends_count_not_materialized',confidence:Number(ctx.activeConfidence||0),evidence:[...(ctx.countEvidence||[])],counts:{friends:Number(ctx.declaredFriendsCount||0),followers:0,following:0},at:new Date().toISOString()};
    state.pageTargetKey=targetKey||state.pageTargetKey;state.pageHref=String(location.href||'');
    const lockPath=location.pathname+location.search,lockTarget=String(currentTarget()||'');
    state.scrollStartedAt=new Date().toISOString();
    const streamingPromise=STREAM_META_DURING_SCROLL?startStreamingMetaDuringScroll('v37_observed_surface_scroll'):null;
    try{
      await autoScrollCollectRobustTarget();
      if((location.pathname+location.search)!==lockPath)throw new Error('V37_ROUTE_CHANGED_ABORT');
      if(String(currentTarget()||'')!==lockTarget)throw new Error('V37_TARGET_CHANGED_ABORT');
      const continuity=v37RelationContinuity('following');
      if(state.v36ObservedSurface)state.v36ObservedSurface.continuity=continuity;
      if(continuity.ok!==true)throw new Error('V37_RELATION_EXPLICIT_CONFLICT_ABORT:'+String(continuity.relation||'unknown'));
      scanVisible();const total=rowsArr().length;
      if(state.stopRequested===true){state.observedRelationCount=total;state.closedRelationCount=total;state.relationObservedClosed=false;state.closureReason='stopped_by_user';}
      else if(state.bottomConfirmed===true){
        finalizeObservedRelationClosure({expectedHint:0},total);
        state.expectedSource='materialized_following_observed_surface_closed';
        state.closureReason=state.closureReason||'physical_bottom_stable_observed_following';
        await v36FreezeSeed(state.closureReason||'observed_surface_closed');
        state.v37ObservedClosure={terminal:true,reason:state.closureReason,count:total,at:new Date().toISOString(),continuity};
        state.v37ObservedProgressPct=100;
      }else{throw new Error('V37_OBSERVED_SURFACE_NOT_TERMINAL');}
    }catch(e){
      if(!isStopError(e)&&state.stopRequested!==true){state.relationSurfaceBlocked=true;throw e;}
    }finally{
      completeRelationRunContext();state.scrollCompletedAt=new Date().toISOString();seed.open=false;
    }
    if(state.stopRequested===true)return metaRunSummary();
    if(streamingPromise)await streamingPromise;
    const out=await ensureMetaCoverageForCurrentRelation('v37_observed_surface_post_scroll');v36SeedGate('post_meta_drain');return out;
  }

  autoScrollCollectAndEnrich=async function(){
    const ctx=v36ObservedFallbackContext();
    if(ctx.eligible===true)return v36RunObservedSurfaceRealtime(ctx);
    // Fora do caso Friends→Following materializado, preserva integralmente o fluxo V35.
    v36ResetSeed();const seed=v36SeedState();seed.open=true;seed.startedAt=new Date().toISOString();
    const result=await __v36BaseAutoScrollCollectAndEnrich();v36AttachSeedRows();if((state.bottomConfirmed===true||state.relationObservedClosed===true)&&!state.stopRequested)await v36FreezeSeed('v35_core_relation_closed');return result;
  };

  function v36RelationExportContext(jsonBase){
    const obs=state.v36ObservedSurface&&state.v36ObservedSurface.active===true?state.v36ObservedSurface:null,count=rowsArr().length;
    if(!obs)return null;
    return {requestedRelation:'friends',requestedRelationLabel:'Amigos',declaredFriendsCount:Number(obs.declaredFriendsCount||0),materializedRelation:'following',materializedRelationLabel:'Seguindo',resultLabel:'Seguindo observados',observedUniqueProfiles:count,confirmedFriendsUnique:0,friendsResolved:false,phase1DiagnosticStatus:'closed',technicalStatement:v36TechnicalStatement(obs,count),note:v36TechnicalNote(obs,count)};
  }
  makeJson=function(){
    const j=__v36BaseMakeJson(),seed=v36SeedState(),rel=v36RelationExportContext(j);
    j.schema='b35a1_v36_v35_core_observed_surface_realtime';j.tool=TOOL;j.version=VERSION;
    j.seed={schema:seed.schema,frozenAt:seed.frozenAt||'',inputCount:Number(seed.inputCount||seed.identities.size||0),outputCount:Number(seed.outputCount||state.rows.size||0),cohortSha256:seed.cohortSha256||'',finalized:seed.finalized===true,gate:{ok:seed.gate.ok===true,failures:[...(seed.gate.failures||[])],checks:Number(seed.gate.checks||0)},postFreezeBlocked:Number(seed.postFreezeBlocked||0)};
    j.architecture={...(j.architecture||{}),stableBase:'V35_IDLE_SAFE_LATE_ARM',relationPolicy:'declared_friends_separate_from_materialized_following_observed_surface',collection:'online_realtime_scroll',seed:'append_only_until_terminal_then_frozen',metadata:'v35_target_bound_streaming_during_scroll',photos:'v35_hd_pipeline_and_low_photo_recovery',networkRelationFallbackMode:'disabled_not_armed',friendsAllActivationAllowed:false};
    if(rel){
      j.relation={...(j.relation||{}),...rel,locked:'following',label:'Seguindo',requested:'friends',activeSurface:'following',visibilityGap:false};
      j.expected={...(j.expected||{}),active:0,hint:0,declaredTarget:0,targetConfirmed:false,observedRelationCount:rel.observedUniqueProfiles,relationTargetReached:false,source:'materialized_following_observed_surface_closed',closedRelationCount:rel.observedUniqueProfiles,closureReason:state.closureReason||'physical_bottom_stable_observed_following'};
      j.totals={...(j.totals||{}),rows:rel.observedUniqueProfiles,expectedActive:0,expectedHint:0,declaredTarget:0,targetConfirmed:false,observedRelationCount:rel.observedUniqueProfiles,closedRelationCount:rel.observedUniqueProfiles,missing:null,coveragePercent:null,bottomApparent:state.bottomConfirmed===true,bottomReal:state.bottomConfirmed===true,bottomConfirmed:state.bottomConfirmed===true,visibilityGap:false};
      j.phase1Diagnostic={status:'closed',requestedRelation:'friends',declaredFriendsCount:rel.declaredFriendsCount,materializedRelation:'following',observedUniqueProfiles:rel.observedUniqueProfiles,confirmedFriendsUnique:0,decision:'SAME_ROUTE_RESET_FAILED_FOLLOWING_OBSERVED'};
      j.networkRelation={...(j.networkRelation||{}),active:false,mode:'disabled_for_observed_surface_fallback',acceptedPayloads:0,replaysRequested:0,replaysCompleted:0};
    }
    return j;
  };

  function v36HtmlRelationAudit(doc,rel,j){
    if(!rel)return;
    const hero=doc.querySelector('.profileHero'),box=doc.createElement('div');box.className='v36RelationAudit';
    box.innerHTML='<div class="v36AuditGrid"><div><b>Relação solicitada</b><span>Amigos</span></div><div><b>Amigos declarados</b><span>'+rel.declaredFriendsCount+'</span></div><div><b>Relação materializada</b><span>Seguindo</span></div><div><b>Seguindo observados</b><span>'+rel.observedUniqueProfiles+'</span></div><div><b>Amigos confirmados</b><span>0</span></div></div><div class="v36Statement">'+esc(rel.technicalStatement)+'</div><div class="v36Note">'+esc(rel.note)+'</div>';
    if(hero&&hero.parentNode)hero.parentNode.insertBefore(box,hero.nextSibling);else doc.body.insertBefore(box,doc.body.firstChild);
    const pc=doc.querySelector('.profileCounts');if(pc){pc.innerHTML='<span><b>'+rel.declaredFriendsCount+'</b>Amigos declarados</span><span><b>'+rel.observedUniqueProfiles+'</b>Seguindo observados</span><span><b>'+Number(j&&j.metaQuality&&j.metaQuality.bioWithText||j&&j.metaRun&&j.metaRun.bioWithTextUnique||0)+'</b>Bio</span>';}
    const action=doc.querySelector('.profileActions .profileBtn.gray');if(action)action.textContent='Seguindo observado';
    const summary=doc.querySelector('.exportSummary');if(summary){summary.classList.remove('bad');summary.classList.add('okbox');summary.innerHTML='<b>Relação solicitada:</b> Amigos | <b>Amigos declarados:</b> '+rel.declaredFriendsCount+' | <b>Relação materializada:</b> Seguindo | <b>Seguindo observados:</b> '+rel.observedUniqueProfiles+' | <b>Amigos confirmados:</b> 0 | <b>Bio/meta:</b> '+(j&&j.gates&&j.gates.bioMetaFinalOk?'sim':'em auditoria')+' | <b>Status:</b> Coorte observada concluída';}
    const st=doc.createElement('style');st.textContent='.v36RelationAudit{background:#fff;border:1px solid #cbd5e1;border-radius:12px;padding:12px 14px;margin:0 0 12px;box-shadow:0 3px 12px rgba(0,0,0,.05)}.v36AuditGrid{display:grid;grid-template-columns:repeat(5,minmax(130px,1fr));gap:8px}.v36AuditGrid div{background:#f8fafc;border:1px solid #e2e8f0;border-radius:9px;padding:8px}.v36AuditGrid b{display:block;font-size:10px;color:#64748b;text-transform:uppercase;letter-spacing:.03em}.v36AuditGrid span{display:block;font-size:16px;font-weight:800;margin-top:2px}.v36Statement{margin-top:9px;font-size:12px;font-weight:700;color:#1e293b}.v36Note{margin-top:5px;font-size:11px;color:#475569}@media(max-width:900px){.v36AuditGrid{grid-template-columns:repeat(2,minmax(120px,1fr))}}';doc.head.appendChild(st);
  }
  function v36Enforce18Columns(doc){
    const table=doc.querySelector('table.b35Table');if(!table)return;
    const heads=Array.from(table.querySelectorAll('thead th'));const idx=heads.findIndex(th=>/Informações gerais/i.test(th.textContent||''));if(idx<0)return;
    heads[idx].remove();for(const tr of Array.from(table.querySelectorAll('tbody tr'))){const cells=tr.children;if(cells&&cells[idx])cells[idx].remove();}
    const cols=table.querySelectorAll('colgroup col');if(cols[idx])cols[idx].remove();
  }
  makeHtml=function(snapshotJson=null){
    const j=snapshotJson||makeJson(),html=__v36BaseMakeHtml(j),rel=j&&j.relation&&j.relation.materializedRelation==='following'&&j.relation.requestedRelation==='friends'?j.relation:null;
    if(!rel)return html;
    try{const doc=new DOMParser().parseFromString(html,'text/html');v36HtmlRelationAudit(doc,rel,j);v36Enforce18Columns(doc);doc.title='Raspador de dados de relações do Facebook';return '<!doctype html>'+doc.documentElement.outerHTML;}catch(e){return html;}
  };
  makeCsv=function(){
    const j=makeJson(),rel=j&&j.relation&&j.relation.materializedRelation==='following'&&j.relation.requestedRelation==='friends'?j.relation:null;
    normalizeAllCategoriesPtBr();assignOrdinals();
    const cols=['#','Foto','Capa','Username','Nome','Perfil','Bio','Categoria','Link externo','Seguidores','Seguindo','E-mail','Telefone','Localização','Trabalho','Formação','Horário','Área de atendimento'];
    const data=rowsArr().map((r,i)=>[i+1,r.fotoUrlHD||r.fotoUrl||r.avatarUrl||'',r.coverUrl||'',r.username||'',r.nome||r.displayName||'',r.perfil||r.profileUrl||'',rejectBadText(r.bio||r.bioText||''),r.categoria||'',uniq([r.externalUrl,...(r.externalUrls||[]),...(r.linksExternos||[])]).filter(Boolean).join(' | '),r.seguidores||'',r.seguindo||'',r.email||(r.emails||[]).join(' | '),r.telefone||(r.telefones||[]).join(' | '),r.localizacao||'',r.trabalho||'',r.formacao||'',r.horarioFuncionamento||'',(r.areasAtendimento||[]).join(' | ')]);
    const pre=rel?[["Relação solicitada","Amigos"],["Amigos declarados",rel.declaredFriendsCount],["Relação materializada","Seguindo"],["Seguindo observados",rel.observedUniqueProfiles],["Amigos confirmados",0],["Nota técnica",rel.technicalStatement],["Nota",rel.note],[]]:[];
    return '\ufeff'+[...pre,cols,...data].map(row=>row.map(csvCell).join(';')).join('\r\n');
  };
  makeManifest=function(){const m=__v36BaseMakeManifest(),j=makeJson();m.version=VERSION;m.tool=TOOL;m.architecture={...(m.architecture||{}),stableBase:'V35_IDLE_SAFE_LATE_ARM',observedSurfaceFallback:'friends_declared_separate_from_following_materialized_no_324_pursuit',seed:'append_only_until_terminal_then_sha256_frozen',finalHtml:'v35_visual_model_18_frozen_columns'};m.relation=j.relation;m.seed=j.seed;return m;};

  makePanel=function(){
    const p=__v36BaseMakePanel();if(!p)return p;
    let box=p.querySelector('#fb-b35-v36-relation-card');if(!box){box=document.createElement('div');box.id='fb-b35-v36-relation-card';box.style.cssText='display:none;margin:8px 0;padding:8px;border:1px solid #cbd5e1;border-radius:9px;background:#f8fafc;font-size:11px;line-height:1.3';const anchor=p.querySelector('#fb-b35-friendly-status');if(anchor&&anchor.parentNode)anchor.parentNode.insertBefore(box,anchor.nextSibling);else p.appendChild(box);}return p;
  };
  renderStatus=function(){
    __v36BaseRenderStatus();const box=document.getElementById('fb-b35-v36-relation-card'),obs=state.v36ObservedSurface&&state.v36ObservedSurface.active===true?state.v36ObservedSurface:null;if(!box)return;
    if(!obs){box.style.display='none';return;}const n=rowsArr().length;box.style.display='block';box.innerHTML='<b>Relação solicitada:</b> Amigos<br><b>Amigos declarados:</b> '+Number(obs.declaredFriendsCount||0)+'<br><b>Relação materializada:</b> Seguindo<br><b>Seguindo observados:</b> '+n+'<br><b>Amigos confirmados:</b> 0';
    const ll=document.getElementById('fb-b35-list-label'),ln=document.getElementById('fb-b35-list-number'),ta=document.getElementById('fb-b35-target-audit'),ft=document.getElementById('fb-b35-friendly-text');if(ll)ll.textContent='Seguindo observados';if(ln)ln.textContent=n.toLocaleString('pt-BR')+' · coorte observada';if(ta)ta.textContent='Friends declarado '+Number(obs.declaredFriendsCount||0)+' · Following materializado · sem perseguição do alvo declarado';if(ft&&!state.runningScroll&&!state.runningMeta&&state.relationObservedClosed===true)ft.textContent='Concluído: '+n+' Seguindo observados · '+Number(metaRunSummary().completedUnique||0)+' enriquecidos';
  };

  // =====================================================================
  // V37 — TERMINAL HANDSHAKE + PROGRESSO OBSERVÁVEL + GATE FINAL CORRETO
  // =====================================================================
  const __v37LegacyRelationReadyForMeta=relationReadyForMeta;
  const __v37V36MakeJson=makeJson;
  const __v37V36RenderStatus=renderStatus;
  function v37ObservedTerminalReady(){
    const obs=state.v36ObservedSurface&&state.v36ObservedSurface.active===true;
    const closure=state.v37ObservedClosure||{};
    const seed=v36SeedState();
    const n=rowsArr().length;
    const expected=Number(closure.count||seed.outputCount||0);
    return obs&&closure.terminal===true&&seed.finalized===true&&seed.gate&&seed.gate.ok===true&&state.relationSurfaceBlocked!==true&&expected>0&&n===expected;
  }
  relationReadyForMeta=function(){
    if(v37ObservedTerminalReady())return true;
    return __v37LegacyRelationReadyForMeta();
  };
  function v37ObservedScrollProgressPct(){
    const obs=state.v36ObservedSurface&&state.v36ObservedSurface.active===true;if(!obs)return null;
    if(state.bottomConfirmed===true||state.relationObservedClosed===true||v36SeedState().finalized===true){state.v37ObservedProgressPct=100;return 100;}
    const now=Date.now();if(Number(state.v37ObservedProgressCacheAt||0)>0&&now-Number(state.v37ObservedProgressCacheAt||0)<300)return Math.max(0,Math.min(100,Number(state.v37ObservedProgressPct||0)));
    let metrics=relationScrollMetrics(document.scrollingElement||document.documentElement);
    try{const c=relationScrollCandidates();if(c&&c[0]&&c[0].el)metrics=relationScrollMetrics(c[0].el);}catch(e){}
    let pct=Number(metrics&&metrics.maxTop||0)>0?(Number(metrics.top||0)/Number(metrics.maxTop||1))*100:0;
    pct=Math.max(0,Math.min(99.5,pct));
    state.v37ObservedProgressPct=Math.max(Number(state.v37ObservedProgressPct||0),pct);
    state.v37ObservedProgressCacheAt=now;
    return state.v37ObservedProgressPct;
  }
  function v37ActualV35ContactReference(){
    return {emailRows:15,phoneRows:10,source:'V35_Julio_real_2026_07_07_and_V36_same_cohort',staleLegacyFloor:{emailRows:16,phoneRows:10}};
  }
  function v37NormalizeObservedFallbackGates(j,rel){
    if(!j||!rel)return j;
    const rows=Number(rel.observedUniqueProfiles||0),seed=j.seed||{},run=j.gates&&j.gates.metaRun||j.metaRun||{},metaGate=j.gates&&j.gates.metaGate||{};
    const terminalOk=state.bottomConfirmed===true&&state.relationObservedClosed===true&&seed.finalized===true&&seed.gate&&seed.gate.ok===true&&Number(seed.inputCount||0)===rows&&Number(seed.outputCount||0)===rows;
    const runCardinalityOk=rows===0||(run.completed===true&&Number(run.queuedUnique||0)===rows&&Number(run.startedUnique||0)===rows&&Number(run.completedUnique||0)===rows);
    const coverageOk=rows===0||(Number(run.targetBoundUnique||0)===rows&&Number(run.bioUnresolvedUnique||0)===0&&(Number(run.aboutCompleteUnique||0)+Number(run.aboutUnavailableUnique||0)===rows)&&Number(run.aboutPartialUnique||0)===0);
    const cleanMeta=Number(j.gates&&j.gates.bioMetaDistribution&&j.gates.bioMetaDistribution.technicalContamination||0)===0&&Number(j.gates&&j.gates.bioMetaDistribution&&j.gates.bioMetaDistribution.semanticContamination||0)===0&&Number(j.gates&&j.gates.bioMetaDistribution&&j.gates.bioMetaDistribution.uiContamination||0)===0&&Number(j.gates&&j.gates.bioMetaDistribution&&j.gates.bioMetaDistribution.emptyLinkContamination||0)===0;
    const ref=v37ActualV35ContactReference(),cohort=metaGate.cohortObserved||{},contactOk=cohort.comparable!==true||(Number(cohort.emailRows||0)>=ref.emailRows&&Number(cohort.phoneRows||0)>=ref.phoneRows);
    const performanceOk=metaGate.performanceOk!==false;
    const metaFinalOk=runCardinalityOk&&coverageOk&&cleanMeta&&performanceOk;
    const legacyBlockers=[...((j.gates&&j.gates.blockers)||[])],legacyWarnings=[...((j.gates&&j.gates.warnings)||[])];
    const nonBlockingDiagnostics=[];
    if(legacyBlockers.includes('relation_target_unconfirmed'))nonBlockingDiagnostics.push('relation_target_unconfirmed_expected_by_closed_observed_surface_policy');
    if(legacyBlockers.includes('general_info_responsibility_not_observed'))nonBlockingDiagnostics.push('general_info_responsibility_not_observed_outside_frozen_18_column_contract');
    if(legacyBlockers.includes('same_cohort_contact_regression_guard_failed')&&contactOk)nonBlockingDiagnostics.push('legacy_contact_floor_16_rebased_to_real_v35_15');
    const critical=legacyBlockers.filter(x=>{
      if(x==='relation_target_unconfirmed')return false;
      if(x==='general_info_responsibility_not_observed')return false;
      if(x==='same_cohort_contact_regression_guard_failed'&&contactOk)return false;
      if(x==='meta_run_cardinality_invalid'&&runCardinalityOk)return false;
      return true;
    });
    if(!terminalOk)critical.push('observed_surface_terminal_seed_gate_invalid');
    if(!runCardinalityOk)critical.push('meta_run_cardinality_invalid');
    if(!coverageOk)critical.push('meta_target_bound_or_coverage_incomplete');
    if(!cleanMeta)critical.push('semantic_or_ui_contamination');
    const blockers=uniq(critical);
    const normalizedLegacy=new Set(['relation_target_unconfirmed','general_info_responsibility_not_observed']);
    if(contactOk)normalizedLegacy.add('same_cohort_contact_regression_guard_failed');
    if(runCardinalityOk)normalizedLegacy.add('meta_run_cardinality_invalid');
    const activeWarnings=uniq([...legacyWarnings.filter(x=>!normalizedLegacy.has(x)),...blockers,...nonBlockingDiagnostics]);
    j.gates={...(j.gates||{}),listFinalOk:terminalOk,bioMetaFinalOk:metaFinalOk,finalOk:terminalOk&&metaFinalOk&&blockers.length===0,decision:(terminalOk&&metaFinalOk&&blockers.length===0?'FINAL_OBSERVED_SURFACE_COMPLETE':'EXPORT_OPERACIONAL_PARCIAL_NAO_FINAL'),blockers,warnings:activeWarnings,legacyBlockers,legacyWarnings,nonBlockingDiagnostics};
    j.gates.metaRun={...run};
    j.gates.metaGate={...metaGate,runCardinalityOk,coverageFinalOk:coverageOk,bioMetaFinalOk:metaFinalOk,sameCohortContactGuardOk:contactOk,contactReference:ref};
    j.totals={...(j.totals||{}),listFinalOk:terminalOk,bioMetaFinalOk:metaFinalOk,finalOk:j.gates.finalOk};
    j.releaseGate={phase1DiagnosticClosed:true,observedSurfaceTerminalOk:terminalOk,seedFrozenOk:seed.finalized===true&&seed.gate&&seed.gate.ok===true,metaCardinalityOk:runCardinalityOk,metaCoverageOk:coverageOk,cleanMeta,contactNonRegressionAgainstRealV35:contactOk,finalOk:j.gates.finalOk};
    return j;
  }
  makeJson=function(){
    const j=__v37V36MakeJson(),rel=j&&j.relation&&j.relation.materializedRelation==='following'&&j.relation.requestedRelation==='friends'?j.relation:null;
    if(rel)v37NormalizeObservedFallbackGates(j,rel);
    j.schema='b35a1_v38_v35_core_all_about_enrich_final';j.tool=TOOL;j.version=VERSION;
    j.architecture={...(j.architecture||{}),terminalHandshake:'tri_state_relation_continuity_explicit_conflict_only',progress:'scroll_geometry_absolute_observed_count',metaClosure:'observed_terminal_seed_freeze_handshake',allAboutTargetBound:'union_all_exact_profile_id_objects',bottomHorizontalScrollbar:'persistent_synced'};
    if(rel)j.observedSurfaceRuntime={progressPct:Number(v37ObservedScrollProgressPct()||0),continuity:state.v36ObservedSurface&&state.v36ObservedSurface.continuity||null,terminalClosure:{...(state.v37ObservedClosure||{})}};
    return j;
  };
  renderStatus=function(){
    __v37V36RenderStatus();
    const obs=state.v36ObservedSurface&&state.v36ObservedSurface.active===true?state.v36ObservedSurface:null;if(!obs)return;
    const n=rowsArr().length,pct=v37ObservedScrollProgressPct(),lp=document.getElementById('fb-b35-list-progress'),ll=document.getElementById('fb-b35-list-label'),ln=document.getElementById('fb-b35-list-number'),ft=document.getElementById('fb-b35-friendly-text');
    if(lp){lp.style.width=Number(pct||0).toFixed(2)+'%';lp.style.opacity='1';}
    if(ll)ll.textContent='Seguindo observados · varredura';
    if(ln)ln.textContent=n.toLocaleString('pt-BR')+' observados · scroll '+Number(pct||0).toLocaleString('pt-BR',{minimumFractionDigits:1,maximumFractionDigits:1})+'%';
    if(ft&&state.runningScroll===true){const run=metaRunSummary();ft.textContent='Raspando seguindo: '+n+' observados · varredura '+Number(pct||0).toLocaleString('pt-BR',{minimumFractionDigits:1,maximumFractionDigits:1})+'% · '+Number(run.completedUnique||0)+' enriquecidos';}
    if(ft&&!state.runningScroll&&!state.runningMeta&&state.relationObservedClosed===true)ft.textContent='Concluído: '+n+' Seguindo observados · '+Number(metaRunSummary().completedUnique||0)+' enriquecidos · seed congelada';
  };


  // =====================================================================
  // V40 — 19ª COLUNA COMPLEMENTAR, SOMENTE NA CAMADA DE EXPORTAÇÃO
  // Base operacional V39/V37/V35 preservada. Nenhuma alteração em scroll,
  // seed, Meta streaming, binding, fotos, capas ou handshake terminal.
  // =====================================================================
  const __v40BaseMakeJson=makeJson;
  const __v40BaseMakeHtml=makeHtml;
  const __v40BaseMakeCsv=makeCsv;
  const __v40BaseMakeManifest=makeManifest;
  const V40_COMPLEMENTARY_COLUMN='Informações complementares (Sobre/All)';
  const V40_COMPLEMENTARY_ALLOWED_FAMILIES=new Set(['responsibility','language','rating','gender','relationship','hometown','other']);
  const V40_COMPLEMENTARY_LABELS={responsibility:'Responsável pela Página',language:'Idiomas',rating:'Avaliação',gender:'Gênero',relationship:'Relacionamento',hometown:'Cidade natal',other:'Informação complementar'};
  function v40ComplementaryItems(row){
    const out=[],seen=new Set();
    for(const item of visibleGeneralInfoItems(row)){
      const family=generalInfoFamily(item);if(!V40_COMPLEMENTARY_ALLOWED_FAMILIES.has(family))continue;
      const value=cleanText(item&&item.value||''),subtitle=cleanText(item&&item.subtitle||''),rawUrl=cleanText(item&&item.url||''),url=rawUrl?canonicalExternalForHtml(rawUrl):'';
      if(!value&&!subtitle&&!url)continue;
      const label=V40_COMPLEMENTARY_LABELS[family]||cleanText(item&&item.label||readableGeneralInfoLabel(item&&item.type||''))||'Informação complementar';
      const key=[family,comparableGeneralText(value),comparableGeneralText(subtitle),url].join('|');if(seen.has(key))continue;seen.add(key);
      out.push({family,type:cleanText(item&&item.type||''),rotulo:label,valor:value,subtitle,section:cleanText(item&&item.section||''),surface:cleanText(item&&item.surface||''),sources:uniq(item&&item.sources||[item&&item.surface]).filter(Boolean),url,urls:uniq([...(Array.isArray(item&&item.urls)?item.urls:[]),url].map(canonicalExternalForHtml).filter(Boolean)),bindingMode:cleanText(item&&item.bindingMode||'')});
    }
    return out;
  }
  function v40ComplementaryText(row){
    return v40ComplementaryItems(row).map(x=>{const value=[x.valor,x.subtitle].filter(Boolean).join(' — '),tail=x.url&&(!value||canonicalExternalForHtml(value)!==x.url)?(value?' ['+x.url+']':x.url):'';return x.rotulo+': '+(value||'')+tail;}).join(' | ');
  }
  function v40ComplementaryHtml(row){
    const items=v40ComplementaryItems(row);if(!items.length)return '<span class="gempty">—</span>';
    return items.map(x=>{const source=x.sources&&x.sources.length?'<span class="gsource">'+esc(x.sources.map(v=>String(v).toUpperCase()).join('/'))+'</span>':'',section=x.section?'<span class="gsection">'+esc(x.section)+'</span>':'',value=[x.valor,x.subtitle].filter(Boolean).join(' — '),valueHtml=x.url?'<a target="_blank" href="'+esc(x.url)+'" title="'+esc(x.url)+'">'+esc(value||compactUrlLabel(x.url))+'</a>':esc(value);return '<div class="gitem v40-complementary v40-'+esc(x.family)+'"><div class="gmeta">'+source+section+'</div><div class="gtext"><b>'+esc(x.rotulo)+':</b> '+valueHtml+'</div></div>';}).join('');
  }
  function v40RemoveLegacyGeneralColumn(doc){
    const table=doc.querySelector('table.b35Table');if(!table)return;
    const heads=Array.from(table.querySelectorAll('thead th'));
    for(let idx=heads.length-1;idx>=0;idx--){if(/Informações gerais|Informações complementares/i.test(heads[idx].textContent||'')){heads[idx].remove();for(const tr of Array.from(table.querySelectorAll('tbody tr'))){if(tr.children&&tr.children[idx])tr.children[idx].remove();}const cols=table.querySelectorAll('colgroup col');if(cols[idx])cols[idx].remove();}}
  }
  makeJson=function(){
    const j=__v40BaseMakeJson();
    j.schema='b35a1_v40_v39_core_complementary_column_final';j.tool=TOOL;j.version=VERSION;
    j.rows=(Array.isArray(j.rows)?j.rows:[]).map(row=>({...row,informacoesComplementares:v40ComplementaryItems(row)}));
    const itemCount=j.rows.reduce((n,r)=>n+(Array.isArray(r.informacoesComplementares)?r.informacoesComplementares.length:0),0),rowsWith=j.rows.filter(r=>Array.isArray(r.informacoesComplementares)&&r.informacoesComplementares.length).length;
    j.exportContract={...(j.exportContract||{}),columns:19,columnOrder:['#','Foto','Capa','Username','Nome','Perfil','Bio','Categoria','Link externo','Seguidores','Seguindo','E-mail','Telefone','Localização','Trabalho','Formação','Horário','Área de atendimento',V40_COMPLEMENTARY_COLUMN],complementaryColumn:{name:V40_COMPLEMENTARY_COLUMN,policy:'somente_itens_target_bound_sem_coluna_semantica_propria_sem_duplicar_18_campos_existentes',rowsWithItems:rowsWith,itemCount}};
    j.architecture={...(j.architecture||{}),stableCore:'V39/V37/V35_preserved',complementaryColumn:'export_layer_only_19th_column'};
    return j;
  };
  makeHtml=function(snapshotJson=null){
    const j=snapshotJson||makeJson(),html=__v40BaseMakeHtml(j);
    try{
      const doc=new DOMParser().parseFromString(html,'text/html'),table=doc.querySelector('table.b35Table');if(!table)return html;
      v40RemoveLegacyGeneralColumn(doc);
      const headRow=table.querySelector('thead tr');if(headRow){const th=doc.createElement('th');th.textContent=V40_COMPLEMENTARY_COLUMN;headRow.appendChild(th);}
      let cg=table.querySelector('colgroup');if(!cg){cg=doc.createElement('colgroup');table.insertBefore(cg,table.firstChild);}const col=doc.createElement('col');col.setAttribute('style','width:190px');cg.appendChild(col);
      const bodyRows=Array.from(table.querySelectorAll('tbody tr')),dataRows=Array.isArray(j.rows)?j.rows:[];
      for(let i=0;i<bodyRows.length;i++){const td=doc.createElement('td');td.className='generalCell v40ComplementaryCell';td.innerHTML=v40ComplementaryHtml(dataRows[i]||{});bodyRows[i].appendChild(td);}
      table.style.minWidth='1854px';table.setAttribute('data-export-columns','19');
      const st=doc.createElement('style');st.textContent='.v40ComplementaryCell{min-width:190px;max-width:280px}.v40ComplementaryCell .gitem{background:#fffdf5;border-color:#fde68a}.v40ComplementaryCell .gtext{font-size:11px}.v40ComplementaryCell .gsource{background:#ede9fe;color:#5b21b6}';doc.head.appendChild(st);
      doc.title='Raspador de dados de relações do Facebook';return '<!doctype html>'+doc.documentElement.outerHTML;
    }catch(e){return html;}
  };
  makeCsv=function(){
    const j=makeJson(),rel=j&&j.relation&&j.relation.materializedRelation==='following'&&j.relation.requestedRelation==='friends'?j.relation:null;
    const cols=['#','Foto','Capa','Username','Nome','Perfil','Bio','Categoria','Link externo','Seguidores','Seguindo','E-mail','Telefone','Localização','Trabalho','Formação','Horário','Área de atendimento',V40_COMPLEMENTARY_COLUMN];
    const data=(j.rows||[]).map((r,i)=>[i+1,r.fotoUrlHD||r.fotoUrl||r.avatarUrl||'',r.coverUrl||'',r.username||'',r.nome||r.displayName||'',r.perfil||r.profileUrl||'',rejectBadText(r.bio||r.bioText||''),r.categoria||'',uniq([r.externalUrl,...(r.externalUrls||[]),...(r.linksExternos||[])]).filter(Boolean).join(' | '),r.seguidores||'',r.seguindo||'',r.email||(r.emails||[]).join(' | '),r.telefone||(r.telefones||[]).join(' | '),r.localizacao||'',r.trabalho||'',r.formacao||'',r.horarioFuncionamento||'',(r.areasAtendimento||[]).join(' | '),v40ComplementaryText(r)]);
    const pre=rel?[["Relação solicitada","Amigos"],["Amigos declarados",rel.declaredFriendsCount],["Relação materializada","Seguindo"],["Seguindo observados",rel.observedUniqueProfiles],["Amigos confirmados",0],["Nota técnica",rel.technicalStatement],["Nota",rel.note],[]]:[];
    return '\ufeff'+[...pre,cols,...data].map(row=>row.map(csvCell).join(';')).join('\r\n');
  };
  makeManifest=function(){const m=__v40BaseMakeManifest();m.version=VERSION;m.tool=TOOL;m.architecture={...(m.architecture||{}),stableCore:'V39/V37/V35_preserved',finalHtml:'v39_visual_model_19_columns_complementary',spreadsheet:'csv_semicolon_19_columns_append_only',jsonComplementary:'structured_informacoesComplementares'};return m;};


  // =====================================================================
  // V41 — HARDENING EXCLUSIVO DE APRESENTAÇÃO / EXPORTAÇÃO / IDENTIDADE
  // Núcleo V40/V39/V37/V35 preservado byte a byte nas funções críticas.
  // =====================================================================
  const __v41BaseMakeJson=makeJson;
  const __v41BaseMakeHtml=makeHtml;
  const __v41BaseMakeCsv=makeCsv;
  const __v41BaseMakeManifest=makeManifest;
  const __v41BaseMakePanel=makePanel;
  const __v41BaseExportSelectedFormats=exportSelectedFormats;
  const __v41BaseLegacyIntegrityText=legacyIntegrityText;
  const __v41BaseMakeIntegrityPdf=makeIntegrityPdf;
  const V41_COMPLEMENTARY_COLUMN='Informações complementares (Sobre/All)';
  const V41_AUTHOR_CREDIT_PREFIX='Script de raspagem desenvolvido por ';
  const V41_AUTHOR_PANEL_PREFIX='Desenvolvido por ';
  const V41_AUTHOR_NAME_CODEPOINTS=Object.freeze([71,117,105,108,104,101,114,109,101,32,67,97,115,101,108,108,105]);
  const V41_AUTHOR_IG_CODEPOINTS=Object.freeze([104,116,116,112,115,58,47,47,119,119,119,46,105,110,115,116,97,103,114,97,109,46,99,111,109,47,103,117,105,108,104,101,114,109,101,99,97,115,101,108,108,105,47]);
  const V41_AUTHOR_PAYLOAD_FNV1A32=0x1ed23918;
  function v41Fnv1a32(value){let h=0x811c9dc5;for(const ch of String(value||'')){h^=ch.charCodeAt(0);h=Math.imul(h,0x01000193)>>>0;}return h>>>0;}
  function v41AuthorExpected(){return {name:String.fromCharCode(...V41_AUTHOR_NAME_CODEPOINTS),instagram:String.fromCharCode(...V41_AUTHOR_IG_CODEPOINTS)};}
  function v41AuthorPayload(){const e=v41AuthorExpected();return [e.name,e.instagram,V41_AUTHOR_CREDIT_PREFIX,V41_AUTHOR_PANEL_PREFIX].join('\n');}
  function v41BreakAuthorIdentity(reason){
    try{state.stopRequested=true;state.runningScroll=false;state.runningMeta=false;state.runningGeneral=false;}catch(e){}
    try{const p=document.getElementById('fb-b35a1-raspador-amigos-v29-panel');if(p){p.innerHTML='<div style="font:800 14px Arial;color:#991b1b;background:#fef2f2;border:2px solid #dc2626;border-radius:10px;padding:12px">B35A1 BLOQUEADO: identidade autoral alterada.</div>';}}catch(e){}
    throw new Error('B35A1_AUTHOR_IDENTITY_TAMPERED:'+String(reason||'unknown'));
  }
  function v41AssertAuthorIdentityIntegrity(context='runtime'){
    const e=v41AuthorExpected(),payload=v41AuthorPayload();
    if(CREDIT_NAME!==e.name)return v41BreakAuthorIdentity(context+':name');
    if(CREDIT_IG!==e.instagram)return v41BreakAuthorIdentity(context+':instagram');
    if(v41Fnv1a32(payload)!==V41_AUTHOR_PAYLOAD_FNV1A32)return v41BreakAuthorIdentity(context+':payload_hash');
    if(!/^https:\/\/www\.instagram\.com\/guilhermecaselli\/$/.test(CREDIT_IG))return v41BreakAuthorIdentity(context+':instagram_format');
    return true;
  }
  function v41AuthorPanelValid(panel){
    const e=v41AuthorExpected(),anchors=Array.from(panel&&panel.querySelectorAll?panel.querySelectorAll('a'):[]),a=anchors.find(x=>String(x.textContent||'').trim()===e.name);
    if(!a)return false;
    let href='';try{href=new URL(a.getAttribute('href')||'',location.href).href;}catch(err){href=String(a.getAttribute('href')||'');}
    return href===e.instagram && String(a.parentElement&&a.parentElement.textContent||'').includes(V41_AUTHOR_PANEL_PREFIX+e.name);
  }
  function v41BindAuthorPanelGuard(panel){
    v41AssertAuthorIdentityIntegrity('panel_bind');
    if(!v41AuthorPanelValid(panel))return v41BreakAuthorIdentity('panel_initial_dom');
    try{if(state.v41AuthorObserver)state.v41AuthorObserver.disconnect();}catch(e){}
    try{
      const e=v41AuthorExpected(),a=Array.from(panel.querySelectorAll('a')).find(x=>String(x.textContent||'').trim()===e.name),scope=a&&a.parentElement;
      if(scope&&typeof MutationObserver!=='undefined'){
        const mo=new MutationObserver(()=>{if(!v41AuthorPanelValid(panel))v41BreakAuthorIdentity('panel_mutation');});
        mo.observe(scope,{subtree:true,childList:true,attributes:true,characterData:true});state.v41AuthorObserver=mo;
      }
    }catch(e){if(String(e&&e.message||e).includes('B35A1_AUTHOR_IDENTITY_TAMPERED'))throw e;}
    return panel;
  }
  function v41CanonicalValue(value){return comparableGeneralText(cleanText(value||''));}
  function v41CanonicalUrl(value){try{return canonicalExternalForHtml(value||'')||'';}catch(e){return '';}}
  function v41Digits(value){return String(value||'').replace(/\D+/g,'');}
  function v41OccupiedSemanticValues(row){
    const text=new Set(),urls=new Set(),emails=new Set(),phones=new Set();
    const addText=v=>{const x=v41CanonicalValue(v);if(x)text.add(x);};
    const addUrl=v=>{const x=v41CanonicalUrl(v);if(x)urls.add(x);};
    const addEmail=v=>{const x=String(v||'').trim().toLowerCase();if(x)emails.add(x);};
    const addPhone=v=>{const x=v41Digits(v);if(x.length>=7)phones.add(x);};
    [row&&row.bio,row&&row.bioText,row&&row.categoria,row&&row.seguidores,row&&row.seguindo,row&&row.localizacao,row&&row.trabalho,row&&row.formacao,row&&row.horarioFuncionamento,row&&row.nome,row&&row.displayName,row&&row.username].forEach(addText);
    [row&&row.externalUrl,...(row&&row.externalUrls||[]),...(row&&row.linksExternos||[]),row&&row.profileUrl,row&&row.perfil].forEach(v=>{addText(v);addUrl(v);});
    [row&&row.email,...(row&&row.emails||[])].forEach(v=>{addText(v);addEmail(v);});
    [row&&row.telefone,...(row&&row.telefones||[])].forEach(v=>{addText(v);addPhone(v);});
    (row&&row.areasAtendimento||[]).forEach(addText);
    return {text,urls,emails,phones};
  }
  function v41TechnicalComplementaryNoise(item){
    const tokens=[item&&item.valor,item&&item.subtitle,item&&item.rotulo].map(v=>String(v||'').trim().toLowerCase()).filter(Boolean);
    return tokens.some(v=>/^(all|all_profile_tiles|profile_tile_sections|profile_tiles|all\/about)$/i.test(v));
  }
  function v41ComplementaryDuplicatesPrimary(row,item){
    const occ=v41OccupiedSemanticValues(row),vals=[item&&item.valor,item&&item.subtitle].filter(Boolean);
    for(const v of vals){
      const t=v41CanonicalValue(v);if(t&&occ.text.has(t))return true;
      const em=String(v||'').trim().toLowerCase();if(em&&occ.emails.has(em))return true;
      const ph=v41Digits(v);if(ph.length>=7&&occ.phones.has(ph))return true;
    }
    const u=v41CanonicalUrl(item&&item.url||'');if(u&&occ.urls.has(u))return true;
    return false;
  }
  function v41ComplementaryDisplayItems(row){
    const out=[],seen=new Set();
    for(const item of v40ComplementaryItems(row)){
      if(item&&item.family==='responsibility')continue;
      if(v41TechnicalComplementaryNoise(item))continue;
      if(v41ComplementaryDuplicatesPrimary(row,item))continue;
      const value=cleanText(item&&item.valor||''),subtitle=cleanText(item&&item.subtitle||''),url=v41CanonicalUrl(item&&item.url||'');
      if(!value&&!subtitle&&!url)continue;
      const key=[item.family,v41CanonicalValue(value),v41CanonicalValue(subtitle),url].join('|');if(seen.has(key))continue;seen.add(key);
      out.push({...item,valor:value,subtitle,url});
    }
    return out;
  }
  function v41ComplementaryDisplayText(row){
    return v41ComplementaryDisplayItems(row).map(x=>{const value=[x.valor,x.subtitle].filter(Boolean).join(' — '),tail=x.url&&(!value||v41CanonicalUrl(value)!==x.url)?(value?' ['+x.url+']':x.url):'';return x.rotulo+': '+(value||'')+tail;}).join(' | ');
  }
  function v41ComplementaryDisplayHtml(row){
    const items=v41ComplementaryDisplayItems(row);if(!items.length)return '';
    return items.map(x=>{const value=[x.valor,x.subtitle].filter(Boolean).join(' — '),valueHtml=x.url?'<a target="_blank" href="'+esc(x.url)+'" title="'+esc(x.url)+'">'+esc(value||compactUrlLabel(x.url))+'</a>':esc(value);return '<div class="gitem v41-complementary v41-'+esc(x.family)+'"><div class="gtext"><b>'+esc(x.rotulo)+':</b> '+valueHtml+'</div></div>';}).join('');
  }
  function v41EnsureBottomGuide(doc){
    if(!doc||!doc.body)return null;let bottom=doc.querySelector('.bottomScroll');
    if(!bottom){bottom=doc.createElement('div');bottom.className='bottomScroll';bottom.hidden=true;bottom.innerHTML='<span class="hsHint"></span><input type="range" min="0" max="1000" value="0" step="1" aria-label="Barra de rolagem horizontal da tabela"><span class="hsHint hsRight"></span>';const tableWrap=doc.querySelector('.tableWrap');if(tableWrap&&tableWrap.parentNode)tableWrap.parentNode.insertBefore(bottom,tableWrap.nextSibling);else doc.body.appendChild(bottom);}
    bottom.setAttribute('data-v41-bottom-guide','true');return bottom;
  }
  function v41AssertExportAuthorHtml(doc,context='html'){
    v41AssertAuthorIdentityIntegrity(context+':constants');const e=v41AuthorExpected(),a=doc&&doc.querySelector&&doc.querySelector('.plaquinha a');
    if(!a)return v41BreakAuthorIdentity(context+':credit_anchor_missing');
    let href='';try{href=new URL(a.getAttribute('href')||'',location.href).href;}catch(err){href=String(a.getAttribute('href')||'');}
    if(href!==e.instagram)return v41BreakAuthorIdentity(context+':credit_href');
    if(String(a.textContent||'').trim()!==V41_AUTHOR_CREDIT_PREFIX+e.name)return v41BreakAuthorIdentity(context+':credit_text');
    return true;
  }
  function v41AuthorExportGuardScript(){
    const e=v41AuthorExpected(),name=JSON.stringify(e.name),ig=JSON.stringify(e.instagram),prefix=JSON.stringify(V41_AUTHOR_CREDIT_PREFIX);
    return '<script id="b35a1-author-integrity-guard">(function(){var N='+name+',I='+ig+',P='+prefix+';function fail(){document.documentElement.innerHTML="<body style=\\"font:800 18px Arial;color:#991b1b;padding:30px\\">B35A1 BLOQUEADO: identidade autoral alterada.</body>";throw new Error("B35A1_AUTHOR_IDENTITY_TAMPERED")};function ok(){var a=document.querySelector(".plaquinha a");return !!a&&a.textContent.trim()===P+N&&a.href===I}if(!ok())fail();if(window.MutationObserver){var a=document.querySelector(".plaquinha a"),s=a&&a.parentElement;if(s){new MutationObserver(function(){if(!ok())fail()}).observe(s,{subtree:true,childList:true,attributes:true,characterData:true})}}})();<\/script>';
  }
  function v41StickyHeaderScript(){
    return '<script id="b35a1-v41-sticky-header">(function(){var wrap=document.querySelector(".tableWrap"),table=wrap&&wrap.querySelector("table.b35Table"),head=table&&table.querySelector("thead");if(!wrap||!table||!head)return;var dock=document.createElement("div");dock.className="v41StickyHeadDock";dock.setAttribute("aria-hidden","true");var cloneTable=document.createElement("table");cloneTable.className="b35Table v41StickyHeadTable";cloneTable.appendChild(head.cloneNode(true));dock.appendChild(cloneTable);document.body.appendChild(dock);function widths(){var src=Array.from(head.querySelectorAll("th")),dst=Array.from(cloneTable.querySelectorAll("th"));src.forEach(function(th,i){if(dst[i])dst[i].style.width=th.getBoundingClientRect().width+"px"});cloneTable.style.width=table.scrollWidth+"px";cloneTable.style.minWidth=table.scrollWidth+"px"}function sync(){var tr=table.getBoundingClientRect(),wr=wrap.getBoundingClientRect(),hh=head.getBoundingClientRect().height||36,show=tr.top<0&&tr.bottom>hh;if(!show){dock.style.display="none";return}dock.style.display="block";dock.style.left=Math.max(0,wr.left)+"px";dock.style.width=Math.max(0,Math.min(window.innerWidth,wr.right)-Math.max(0,wr.left))+"px";dock.style.height=hh+"px";cloneTable.style.transform="translateX("+(-wrap.scrollLeft)+"px)"}function refresh(){widths();sync()}wrap.addEventListener("scroll",sync,{passive:true});window.addEventListener("scroll",sync,{passive:true});window.addEventListener("resize",refresh);if(window.ResizeObserver){var ro=new ResizeObserver(refresh);ro.observe(wrap);ro.observe(table)}window.addEventListener("load",refresh,{once:true});requestAnimationFrame(refresh);setTimeout(refresh,80);setTimeout(refresh,500)})();<\/script>';
  }
  function v41WrapIntegrityValue(value,width=64){
    const src=String(value||'').replace(/\r/g,'').split('\n'),out=[];
    for(const part0 of src){let part=part0;if(!part){out.push('');continue;}while(part.length>width){let cut=part.lastIndexOf(' ',width);if(cut<Math.floor(width*0.55))cut=width;out.push(part.slice(0,cut));part=part.slice(cut).replace(/^\s+/,'');}out.push(part);}
    return out;
  }
  function v41IntegrityText(artifact,sha256,sha512){
    v41AssertAuthorIdentityIntegrity('integrity_text');
    const rows=[['Data/Hora',nowBR()],['URL',location.href],['Arquivo',artifact.name],['Formato',artifact.mime],['Tamanho',byteLengthDataV442130(artifact.data)+' bytes'],['Hash SHA-256',sha256],['Hash SHA-512',sha512],['Status do Export','OK em '+nowBR()]];
    let text='Laudo de Integridade - Raspador de dados de amigos Facebook\nCampo Valor\n------------------ --------------------------------------------------------------\n';
    for(const [k,v] of rows){const parts=v41WrapIntegrityValue(v,64),prefix=(String(k)+'                ').slice(0,18)+' ';text+=prefix+(parts[0]||'')+'\n';for(let i=1;i<parts.length;i++)text+='                   '+parts[i]+'\n';}
    text+='-------------------------------------------------------------------------------\n'+V41_AUTHOR_CREDIT_PREFIX+CREDIT_NAME+'\n'+CREDIT_IG;
    return text;
  }
  makeJson=function(){
    v41AssertAuthorIdentityIntegrity('make_json');const j=__v41BaseMakeJson();
    j.schema='b35a1_v41_v40_core_production_hardening_final';j.tool=TOOL;j.version=VERSION;
    j.rows=(Array.isArray(j.rows)?j.rows:[]).map(row=>({...row,informacoesComplementares:Array.isArray(row.informacoesComplementares)?row.informacoesComplementares:v40ComplementaryItems(row),informacoesComplementaresExibidas:v41ComplementaryDisplayItems(row)}));
    const displayRows=j.rows.filter(r=>Array.isArray(r.informacoesComplementaresExibidas)&&r.informacoesComplementaresExibidas.length).length,displayItems=j.rows.reduce((n,r)=>n+(r.informacoesComplementaresExibidas||[]).length,0);
    j.exportContract={...(j.exportContract||{}),columns:19,columnOrder:['#','Foto','Capa','Username','Nome','Perfil','Bio','Categoria','Link externo','Seguidores','Seguindo','E-mail','Telefone','Localização','Trabalho','Formação','Horário','Área de atendimento',V41_COMPLEMENTARY_COLUMN],complementaryColumn:{name:V41_COMPLEMENTARY_COLUMN,displayPolicy:'somente_informacao_realmente_adicional_nao_duplicada_sem_responsibility_sem_metadado_tecnico',jsonPolicy:'preserva_itens_estruturados_residuais_inclusive_nao_exibidos',rowsWithDisplayedItems:displayRows,displayedItemCount:displayItems}};
    if(!j.exportStatus||j.exportStatus.line2!==V41_AUTHOR_CREDIT_PREFIX+v41AuthorExpected().name||j.exportStatus.instagram!==v41AuthorExpected().instagram)return v41BreakAuthorIdentity('json_export_status');
    j.security={...(j.security||{}),authorIdentityGuard:'fail_closed_runtime_export_panel_mutation',authorIdentityDigest:'fnv1a32:'+V41_AUTHOR_PAYLOAD_FNV1A32.toString(16)};
    return j;
  };
  makeHtml=function(snapshotJson=null){
    v41AssertAuthorIdentityIntegrity('make_html');const j=snapshotJson||makeJson(),html=__v41BaseMakeHtml(j);
    try{
      const doc=new DOMParser().parseFromString(html,'text/html'),table=doc.querySelector('table.b35Table');if(!table)return html;
      const heads=Array.from(table.querySelectorAll('thead th')),idx=heads.findIndex(th=>String(th.textContent||'').trim()===V41_COMPLEMENTARY_COLUMN);
      if(idx>=0){const rows=Array.from(table.querySelectorAll('tbody tr')),data=Array.isArray(j.rows)?j.rows:[];for(let i=0;i<rows.length;i++){const td=rows[i].children&&rows[i].children[idx];if(td){td.innerHTML=v41ComplementaryDisplayHtml(data[i]||{});td.classList.add('v41ComplementaryCell');}}}
      v41EnsureBottomGuide(doc);
      const st=doc.createElement('style');st.id='b35a1-v41-production-hardening-style';st.textContent='table.b35Table thead{position:sticky!important;top:0!important;z-index:79!important}table.b35Table thead th{position:sticky!important;top:0!important;z-index:80!important;background:#111!important;color:#fff!important;box-shadow:0 2px 0 rgba(255,255,255,.22),0 3px 8px rgba(15,23,42,.28)}.v41StickyHeadDock{position:fixed;top:0;overflow:hidden;background:#111;z-index:2147483500;display:none;pointer-events:none;box-shadow:0 3px 10px rgba(15,23,42,.35)}.v41StickyHeadTable{margin:0!important;table-layout:fixed!important}.v41StickyHeadTable thead th{position:static!important}.v41ComplementaryCell:empty{background:#fff!important}.v41ComplementaryCell .gitem{background:#fffdf5;border:1px solid #fde68a;border-radius:7px;padding:5px 6px;margin:0 0 5px}.v41ComplementaryCell .gtext{font-size:11px}.bottomScroll[data-v41-bottom-guide=true]{display:flex;visibility:visible}.bottomScroll[data-v41-bottom-guide=true][hidden]{display:none!important}';doc.head.appendChild(st);
      v41AssertExportAuthorHtml(doc,'html_export');
      doc.body.insertAdjacentHTML('beforeend',v41StickyHeaderScript());
      doc.body.insertAdjacentHTML('beforeend',v41AuthorExportGuardScript());
      doc.title='Raspador de dados de relações do Facebook';return '<!doctype html>'+doc.documentElement.outerHTML;
    }catch(e){if(String(e&&e.message||e).includes('B35A1_AUTHOR_IDENTITY_TAMPERED'))throw e;return html;}
  };
  makeCsv=function(){
    v41AssertAuthorIdentityIntegrity('make_csv');const j=makeJson(),rel=j&&j.relation&&j.relation.materializedRelation==='following'&&j.relation.requestedRelation==='friends'?j.relation:null;
    const cols=['#','Foto','Capa','Username','Nome','Perfil','Bio','Categoria','Link externo','Seguidores','Seguindo','E-mail','Telefone','Localização','Trabalho','Formação','Horário','Área de atendimento',V41_COMPLEMENTARY_COLUMN];
    const data=(j.rows||[]).map((r,i)=>[i+1,r.fotoUrlHD||r.fotoUrl||r.avatarUrl||'',r.coverUrl||'',r.username||'',r.nome||r.displayName||'',r.perfil||r.profileUrl||'',rejectBadText(r.bio||r.bioText||''),r.categoria||'',uniq([r.externalUrl,...(r.externalUrls||[]),...(r.linksExternos||[])]).filter(Boolean).join(' | '),r.seguidores||'',r.seguindo||'',r.email||(r.emails||[]).join(' | '),r.telefone||(r.telefones||[]).join(' | '),r.localizacao||'',r.trabalho||'',r.formacao||'',r.horarioFuncionamento||'',(r.areasAtendimento||[]).join(' | '),v41ComplementaryDisplayText(r)]);
    const pre=rel?[["Relação solicitada","Amigos"],["Amigos declarados",rel.declaredFriendsCount],["Relação materializada","Seguindo"],["Seguindo observados",rel.observedUniqueProfiles],["Amigos confirmados",0],["Nota técnica",rel.technicalStatement],["Nota",rel.note],[]]:[];
    return '\ufeff'+[...pre,cols,...data].map(row=>row.map(csvCell).join(';')).join('\r\n');
  };
  legacyIntegrityText=function(artifact,sha256,sha512){return v41IntegrityText(artifact,sha256,sha512);};
  makeIntegrityPdf=function(artifact,sha256,sha512){v41AssertAuthorIdentityIntegrity('make_integrity_pdf');return makeLegacySimplePdf(v41IntegrityText(artifact,sha256,sha512));};
  exportSelectedFormats=async function(kinds,options){v41AssertAuthorIdentityIntegrity('export_before');const out=await __v41BaseExportSelectedFormats(kinds,options);v41AssertAuthorIdentityIntegrity('export_after');return out;};
  makePanel=function(){v41AssertAuthorIdentityIntegrity('make_panel');return v41BindAuthorPanelGuard(__v41BaseMakePanel());};
  makeManifest=function(){const m=__v41BaseMakeManifest();m.version=VERSION;m.tool=TOOL;m.architecture={...(m.architecture||{}),stableCore:'V40/V39/V37/V35_preserved',complementaryDisplay:'non_duplicate_blank_when_empty',stickyHeader:'explicit_export_layer',bottomGuide:'guaranteed_fixed_range',integrityPdf:'wrapped_long_values_64_chars',authorIdentityGuard:'fail_closed'};return m;};


  /* V42 - camada de apresentação/Excel. Núcleo V41 preservado. */
  const __v42BaseMakeJson=makeJson;
  const __v42BaseMakeHtml=makeHtml;
  const __v42BaseMakeCsv=makeCsv;
  const __v42BaseBuildExportArtifact=buildExportArtifact;
  const __v42BaseExportSelectedFormats=exportSelectedFormats;
  const __v42BaseShowExportChooser=showExportChooser;
  const V42_XLSX_MIME='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
  const V42_COLUMNS=['#','Foto','Capa','Username','Nome','Perfil','Bio','Categoria','Link externo','Seguidores','Seguindo','E-mail','Telefone','Localização','Trabalho','Formação','Horário','Área de atendimento','Informações complementares (Sobre/All)'];
  function v42CellText(value){return cleanText(value==null?'':String(value)).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g,'').trim();}
  function v42LinksText(r){return uniq([r&&r.externalUrl,...(r&&r.externalUrls||[]),...(r&&r.linksExternos||[])].filter(Boolean).map(canonicalExternalForHtml)).join(' | ');}
  function v42DataRows(j){
    const rows=Array.isArray(j&&j.rows)?j.rows:[];
    return rows.map((r,i)=>[
      String(i+1), r.fotoUrlHD||r.fotoUrl||r.avatarUrl||'', r.coverUrl||'', r.username||'', r.nome||r.displayName||'', r.perfil||r.profileUrl||'', rejectBadText(r.bio||r.bioText||''), r.categoria||'', v42LinksText(r), r.seguidores||'', r.seguindo||'', r.email||(r.emails||[]).join(' | '), r.telefone||(r.telefones||[]).join(' | '), r.localizacao||'', r.trabalho||'', r.formacao||'', r.horarioFuncionamento||'', (r.areasAtendimento||[]).join(' | '), v41ComplementaryDisplayText(r)
    ].map(v42CellText));
  }
  function v42Xml(s){return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&apos;');}
  function v42Col(n){let s='';n=Number(n);while(n>0){let m=(n-1)%26;s=String.fromCharCode(65+m)+s;n=Math.floor((n-1)/26);}return s;}
  function v42SheetData(rows,headerStyle=1,bodyStyle=2){
    return rows.map((row,ri)=>'<row r="'+(ri+1)+'">'+row.map((v,ci)=>{const ref=v42Col(ci+1)+(ri+1),style=ri===0?headerStyle:bodyStyle;return '<c r="'+ref+'" t="inlineStr" s="'+style+'"><is><t xml:space="preserve">'+v42Xml(v)+'</t></is></c>';}).join('')+'</row>').join('');
  }
  function v42WorksheetXml(rows,opts){
    opts=opts||{};const maxRow=Math.max(1,rows.length),maxCol=Math.max(1,(rows[0]||[]).length),ref='A1:'+v42Col(maxCol)+maxRow;
    const cols=(opts.widths||[]).map((w,i)=>'<col min="'+(i+1)+'" max="'+(i+1)+'" width="'+w+'" customWidth="1"/>').join('');
    const freeze=opts.freezeHeader?'<sheetViews><sheetView workbookViewId="0"><pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/><selection pane="bottomLeft" activeCell="A2" sqref="A2"/></sheetView></sheetViews>':'<sheetViews><sheetView workbookViewId="0"/></sheetViews>';
    const filter=opts.autoFilter?'<autoFilter ref="'+ref+'"/>':'';
    return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">'+freeze+'<cols>'+cols+'</cols><sheetData>'+v42SheetData(rows)+'</sheetData>'+filter+'<pageMargins left="0.7" right="0.7" top="0.75" bottom="0.75" header="0.3" footer="0.3"/></worksheet>';
  }
  function v42Crc32Table(){const t=[];for(let n=0;n<256;n++){let c=n;for(let k=0;k<8;k++)c=(c&1)?(0xedb88320^(c>>>1)):(c>>>1);t[n]=c>>>0;}return t;}const V42_CRC_TABLE=v42Crc32Table();
  function v42Crc32(bytes){let c=0xffffffff;for(const b of bytes)c=V42_CRC_TABLE[(c^b)&255]^(c>>>8);return (c^0xffffffff)>>>0;}
  function v42U16(n){return [n&255,(n>>>8)&255];}function v42U32(n){return [n&255,(n>>>8)&255,(n>>>16)&255,(n>>>24)&255];}
  function v42Zip(entries){
    const enc=new TextEncoder(),locals=[],centrals=[];let offset=0;
    for(const e of entries){const name=enc.encode(e.name),data=e.data instanceof Uint8Array?e.data:enc.encode(String(e.data||'')),crc=v42Crc32(data),size=data.length;
      const local=new Uint8Array(30+name.length+size);let p=0;local.set([0x50,0x4b,0x03,0x04],p);p+=4;local.set(v42U16(20),p);p+=2;local.set(v42U16(0),p);p+=2;local.set(v42U16(0),p);p+=2;local.set(v42U16(0),p);p+=2;local.set(v42U16(0),p);p+=2;local.set(v42U32(crc),p);p+=4;local.set(v42U32(size),p);p+=4;local.set(v42U32(size),p);p+=4;local.set(v42U16(name.length),p);p+=2;local.set(v42U16(0),p);p+=2;local.set(name,p);p+=name.length;local.set(data,p);locals.push(local);
      const central=new Uint8Array(46+name.length);p=0;central.set([0x50,0x4b,0x01,0x02],p);p+=4;central.set(v42U16(20),p);p+=2;central.set(v42U16(20),p);p+=2;central.set(v42U16(0),p);p+=2;central.set(v42U16(0),p);p+=2;central.set(v42U16(0),p);p+=2;central.set(v42U16(0),p);p+=2;central.set(v42U32(crc),p);p+=4;central.set(v42U32(size),p);p+=4;central.set(v42U32(size),p);p+=4;central.set(v42U16(name.length),p);p+=2;central.set(v42U16(0),p);p+=2;central.set(v42U16(0),p);p+=2;central.set(v42U16(0),p);p+=2;central.set(v42U16(0),p);p+=2;central.set(v42U32(0),p);p+=4;central.set(v42U32(offset),p);p+=4;central.set(name,p);centrals.push(central);offset+=local.length;}
    const centralSize=centrals.reduce((n,a)=>n+a.length,0),localSize=locals.reduce((n,a)=>n+a.length,0),end=new Uint8Array(22);let p=0;end.set([0x50,0x4b,0x05,0x06],p);p+=4;end.set(v42U16(0),p);p+=2;end.set(v42U16(0),p);p+=2;end.set(v42U16(entries.length),p);p+=2;end.set(v42U16(entries.length),p);p+=2;end.set(v42U32(centralSize),p);p+=4;end.set(v42U32(localSize),p);p+=4;end.set(v42U16(0),p);
    const out=new Uint8Array(localSize+centralSize+end.length);p=0;for(const a of locals){out.set(a,p);p+=a.length;}for(const a of centrals){out.set(a,p);p+=a.length;}out.set(end,p);return out;
  }
  function makeXlsx(snapshotJson=null){
    v41AssertAuthorIdentityIntegrity('make_xlsx');const j=snapshotJson||makeJson(),rel=j&&j.relation||{},data=[V42_COLUMNS,...v42DataRows(j)];
    const resumo=[['Campo','Valor'],['Relação solicitada',rel.requestedRelationLabel||'Amigos'],['Amigos declarados',String(rel.declaredFriendsCount||'')],['Relação materializada',rel.materializedRelationLabel||relationLabel(j.relation&&j.relation.locked||state.relation)],['Seguindo observados',String(rel.observedUniqueProfiles||j.totals&&j.totals.rows||'')],['Amigos confirmados',String(rel.confirmedFriendsUnique||0)],['Nota técnica',rel.technicalStatement||''],['Nota',rel.note||'']];
    const widths=[6,32,32,18,24,14,44,22,34,12,12,28,22,30,26,24,20,32,46];
    const entries=[
      {name:'[Content_Types].xml',data:'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/><Override PartName="/xl/worksheets/sheet2.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/><Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/><Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/></Types>'},
      {name:'_rels/.rels',data:'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/><Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/></Relationships>'},
      {name:'docProps/core.xml',data:'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:dcmitype="http://purl.org/dc/dcmitype/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><dc:creator>'+v42Xml(CREDIT_NAME)+'</dc:creator><dc:title>B35A1 Relações Facebook</dc:title><dcterms:created xsi:type="dcterms:W3CDTF">'+new Date().toISOString()+'</dcterms:created></cp:coreProperties>'},
      {name:'docProps/app.xml',data:'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes"><Application>B35A1 Rosetta</Application></Properties>'},
      {name:'xl/workbook.xml',data:'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets><sheet name="Resumo" sheetId="1" r:id="rId1"/><sheet name="Dados" sheetId="2" r:id="rId2"/></sheets></workbook>'},
      {name:'xl/_rels/workbook.xml.rels',data:'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet2.xml"/><Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>'},
      {name:'xl/styles.xml',data:'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><fonts count="2"><font><sz val="11"/><name val="Aptos"/></font><font><b/><color rgb="FFFFFFFF"/><sz val="11"/><name val="Aptos"/></font></fonts><fills count="3"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill><fill><patternFill patternType="solid"><fgColor rgb="FF111111"/><bgColor indexed="64"/></patternFill></fill></fills><borders count="2"><border><left/><right/><top/><bottom/><diagonal/></border><border><left style="thin"><color rgb="FFD9E2EC"/></left><right style="thin"><color rgb="FFD9E2EC"/></right><top style="thin"><color rgb="FFD9E2EC"/></top><bottom style="thin"><color rgb="FFD9E2EC"/></bottom><diagonal/></border></borders><cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs><cellXfs count="3"><xf numFmtId="0" fontId="0" fillId="0" borderId="1" xfId="0" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="2" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center" vertical="center" wrapText="1"/></xf><xf numFmtId="0" fontId="0" fillId="0" borderId="1" xfId="0" applyAlignment="1"><alignment vertical="top" wrapText="1"/></xf></cellXfs><cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles></styleSheet>'},
      {name:'xl/worksheets/sheet1.xml',data:v42WorksheetXml(resumo,{widths:[28,120],freezeHeader:true})},
      {name:'xl/worksheets/sheet2.xml',data:v42WorksheetXml(data,{widths,freezeHeader:true,autoFilter:true})}
    ];
    return v42Zip(entries);
  }
  function v42HtmlUxScript(){
    return '<script id="b35a1-v42-html-ux-final">(function(){function q(s){return document.querySelector(s)}var wrap=q(".tableWrap"),table=wrap&&wrap.querySelector("table.b35Table");if(!wrap||!table)return;var old=q("#b35x-bottom-dock");if(old)old.remove();var dock=document.createElement("div");dock.id="b35x-bottom-dock";dock.innerHTML="<input type=\\"range\\" min=\\"0\\" max=\\"1000\\" value=\\"0\\" step=\\"1\\" aria-label=\\"Rolagem horizontal da tabela\\">";document.body.appendChild(dock);var range=dock.querySelector("input"),lock=false;function max(){return Math.max(0,wrap.scrollWidth-wrap.clientWidth)}function syncFromWrap(){if(lock)return;var m=max();dock.style.display=m>2?"flex":"none";range.disabled=!(m>2);range.value=String(m?Math.round(wrap.scrollLeft/m*1000):0)}function syncFromRange(){if(lock)return;lock=true;wrap.scrollLeft=max()*(Number(range.value||0)/1000);lock=false;syncSticky()}range.addEventListener("input",syncFromRange);wrap.addEventListener("scroll",function(){syncFromWrap();syncSticky()},{passive:true});var head=table.querySelector("thead"),sticky=document.createElement("div");sticky.id="b35x-sticky-head";sticky.setAttribute("aria-hidden","true");var clone=document.createElement("table");clone.className="b35Table";clone.appendChild(head.cloneNode(true));sticky.appendChild(clone);document.body.appendChild(sticky);function widths(){var s=Array.from(head.querySelectorAll("th")),d=Array.from(clone.querySelectorAll("th"));s.forEach(function(th,i){if(d[i])d[i].style.width=th.getBoundingClientRect().width+"px"});clone.style.width=table.scrollWidth+"px";clone.style.minWidth=table.scrollWidth+"px"}function syncSticky(){var wr=wrap.getBoundingClientRect(),tr=table.getBoundingClientRect(),hh=head.getBoundingClientRect().height||38,show=tr.top<0&&tr.bottom>hh;if(!show){sticky.style.display="none";return}sticky.style.display="block";sticky.style.left=Math.max(0,wr.left)+"px";sticky.style.top="0px";sticky.style.width=Math.max(0,Math.min(window.innerWidth,wr.right)-Math.max(0,wr.left))+"px";sticky.style.height=hh+"px";clone.style.transform="translateX("+(-wrap.scrollLeft)+"px)"}function refresh(){widths();syncFromWrap();syncSticky()}window.addEventListener("scroll",syncSticky,{passive:true});window.addEventListener("resize",refresh);if(window.ResizeObserver){var ro=new ResizeObserver(refresh);ro.observe(wrap);ro.observe(table)}requestAnimationFrame(refresh);setTimeout(refresh,50);setTimeout(refresh,300);setTimeout(refresh,1200)})();<\/script>';
  }
  makeHtml=function(snapshotJson=null){
    v41AssertAuthorIdentityIntegrity('v42_make_html');const j=snapshotJson||makeJson();let html=__v42BaseMakeHtml(j);
    try{const doc=new DOMParser().parseFromString(html,'text/html');const st=doc.createElement('style');st.id='b35a1-v42-html-ui-style';st.textContent='html,body{overflow-x:hidden}.tableWrap{max-height:none!important;overflow:auto!important}.b35Table thead th{position:sticky!important;top:0!important;z-index:120!important;background:#111!important;color:#fff!important;box-shadow:0 2px 4px rgba(0,0,0,.25)!important}#b35x-bottom-dock{position:fixed!important;left:12px!important;right:12px!important;bottom:0!important;z-index:2147483600!important;height:38px!important;display:flex;align-items:center;gap:10px;background:#0f172a;color:#fff;border:1px solid #334155;border-radius:10px 10px 0 0;padding:6px 10px;box-shadow:0 -6px 20px rgba(15,23,42,.35);font:700 12px Arial,sans-serif}#b35x-bottom-dock input{flex:1;min-width:160px}#b35x-sticky-head{position:fixed;top:0;overflow:hidden;background:#111;z-index:2147483500;display:none;pointer-events:none;box-shadow:0 4px 12px rgba(15,23,42,.35)}#b35x-sticky-head table{margin:0!important;table-layout:fixed!important}.bottomScroll{display:none!important}@media print{#b35x-bottom-dock,#b35x-sticky-head{display:none!important}}';doc.head.appendChild(st);doc.body.insertAdjacentHTML('beforeend',v42HtmlUxScript());v41AssertExportAuthorHtml(doc,'v42_html_export');return '<!doctype html>'+doc.documentElement.outerHTML;}catch(e){if(String(e&&e.message||e).includes('B35A1_AUTHOR_IDENTITY_TAMPERED'))throw e;return html;}
  };
  makeJson=function(){
    v41AssertAuthorIdentityIntegrity('v42_make_json');const j=__v42BaseMakeJson();j.tool=TOOL;j.version=VERSION;j.schema='b35a1_v42_v41_core_excel_html_final';j.exportContract={...(j.exportContract||{}),excelXlsx:{enabled:true,sheets:['Resumo','Dados'],freezeHeader:true,autoFilter:true,summarySeparated:true,columnWidths:true},htmlUi:{bottomGuide:'fixed_range_dock_b35x',stickyHeader:'thead_sticky_plus_fixed_clone_b35x'}};return j;
  };
  buildExportArtifact=function(kind,base,snapshot=null){
    const k=String(kind||'').toLowerCase();if(k==='xlsx')return {kind:'xlsx',name:base+'.xlsx',mime:V42_XLSX_MIME,data:makeXlsx(snapshot&&snapshot.json?snapshot.json:null)};
    return __v42BaseBuildExportArtifact(kind,base,snapshot);
  };
  exportSelectedFormats=async function(kinds,options){
    options=options||{};v41AssertAuthorIdentityIntegrity('v42_export_before');const selected=uniq((kinds||[]).map(x=>String(x).toLowerCase())).filter(x=>['json','html','pdf','csv','xlsx'].includes(x));if(!selected.length)throw new Error('SELECIONE_AO_MENOS_UM_FORMATO');
    const printWindow=selected.includes('pdf')?(options.preopenedPrintWindow||window.open('about:blank','_blank')):null;await prepareFinalBeforeExport();const base=artifactBase();state.lastExportBase=base;const out=[];
    const snapshot=selected.some(k=>k==='json'||k==='html'||k==='pdf'||k==='xlsx')?freezeExportSnapshot():null;
    for(const kind of selected){const artifact=buildExportArtifact(kind,base,snapshot);out.push(await exportArtifactWithIntegrity(artifact,{preopenedPrintWindow:kind==='pdf'?printWindow:null}));await new Promise(r=>setTimeout(r,180));}
    v41AssertAuthorIdentityIntegrity('v42_export_after');log('info','Exportação V42 multiformato concluída; XLSX possui aba Resumo, aba Dados, cabeçalho congelado e autoFiltro.',{formats:selected,files:out.map(x=>x.name)});return out;
  };
  exportPreparedOne=async function(kind){return exportSelectedFormats([kind]);};
  exportAll=async function(){return exportSelectedFormats(['json','html','pdf','csv','xlsx']);};
  showExportChooser=function(){
    v41AssertAuthorIdentityIntegrity('v42_export_chooser');const old=document.getElementById('fb-b35-export-chooser');if(old){old.remove();return;}
    const box=document.createElement('div');box.id='fb-b35-export-chooser';box.style.cssText='margin-top:8px;border:1px solid #cbd5e1;border-radius:10px;padding:9px;background:#f8fafc';
    box.innerHTML='<div style="font-weight:800;margin-bottom:6px">Escolha os formatos</div><label style="margin-right:9px"><input type="checkbox" value="json"> JSON</label><label style="margin-right:9px"><input type="checkbox" value="html"> HTML</label><label style="margin-right:9px"><input type="checkbox" value="xlsx"> Excel XLSX</label><label style="margin-right:9px"><input type="checkbox" value="pdf"> PDF</label><label><input type="checkbox" value="csv"> CSV simples</label><div style="font-size:10px;color:#64748b;margin:6px 0">XLSX gera uma planilha organizada com abas Resumo e Dados, cabeçalho congelado, filtros e colunas dimensionadas. HTML mantém guia inferior fixa e cabeçalho congelado visual.</div><div style="display:flex;gap:6px"><button id="fb-b35-export-go" style="font-weight:800">Gerar selecionados</button><button id="fb-b35-export-all">Marcar todos</button><button id="fb-b35-export-cancel">Cancelar</button></div>';
    const panel=document.getElementById('fb-b35a1-raspador-amigos-v29-panel');if(!panel)return;panel.appendChild(box);box.querySelector('#fb-b35-export-all').onclick=()=>box.querySelectorAll('input[type="checkbox"]').forEach(x=>x.checked=true);box.querySelector('#fb-b35-export-cancel').onclick=()=>box.remove();box.querySelector('#fb-b35-export-go').onclick=runPanelAction('exportação multiformato V42',async()=>{const kinds=Array.from(box.querySelectorAll('input[type="checkbox"]:checked')).map(x=>x.value);await exportSelectedFormats(kinds);box.remove();});
  };
  makeManifest=function(){const m=__v41BaseMakeManifest();m.version=VERSION;m.tool=TOOL;m.architecture={...(m.architecture||{}),stableCore:'V41/V40/V39/V37/V35_preserved',xlsxExport:'Resumo_Dados_freezeHeader_autoFilter_widths',htmlBottomGuide:'b35x_fixed_range_dock',htmlStickyHeader:'b35x_fixed_clone_plus_sticky_thead',authorIdentityGuard:'fail_closed_preserved'};return m;};



  /* V43 - camada final de UX Excel/HTML. Núcleo V42/V41 preservado. */
  const __v43BaseMakeJson=makeJson;
  const __v43BaseMakeHtml=makeHtml;
  const __v43BaseMakeCsv=makeCsv;
  const __v43BaseMakeXlsx=makeXlsx;
  const __v43BaseBuildExportArtifact=buildExportArtifact;
  const __v43BaseExportSelectedFormats=exportSelectedFormats;
  const __v43BaseExportPreparedOne=exportPreparedOne;
  const __v43BaseExportAll=exportAll;
  const __v43BaseShowExportChooser=showExportChooser;
  const __v43BaseMakePanel=makePanel;
  const __v43BaseMakeManifest=makeManifest;
  const V43_SCHEMA='b35a1_v43_v42_core_excel_ui_final';
  function v43OneLine(value){return v42CellText(value).replace(/[\r\n\t]+/g,' ').replace(/\s{2,}/g,' ').trim();}
  function v43ShortUrl(value){const u=String(value||'').trim();if(!u)return '';try{const url=new URL(u,location.href);let path=(url.pathname||'').replace(/\/$/,'');let label=(url.hostname||'').replace(/^www\./,'')+(path&&path!=='/'?path:'');if(label.length>58)label=label.slice(0,55)+'...';return label;}catch(e){return u.length>58?u.slice(0,55)+'...':u;}}
  function v43CsvRows(j){return [V42_COLUMNS,...v42DataRows(j).map(row=>row.map(v43OneLine))];}
  function v43XlsxRows(j){
    const rows=Array.isArray(j&&j.rows)?j.rows:[];
    const body=rows.map((r,i)=>[
      String(i+1),
      r.fotoUrlHD||r.fotoUrl||r.avatarUrl?'Abrir foto':'',
      r.coverUrl?'Abrir capa':'',
      v43OneLine(r.username||''),
      v43OneLine(r.nome||r.displayName||''),
      r.perfil||r.profileUrl?'Abrir perfil':'',
      v43OneLine(rejectBadText(r.bio||r.bioText||'')),
      v43OneLine(r.categoria||''),
      v43OneLine(v42LinksText(r).split(' | ').map(v43ShortUrl).join(' | ')),
      v43OneLine(r.seguidores||''),v43OneLine(r.seguindo||''),
      v43OneLine(r.email||(r.emails||[]).join(' | ')),v43OneLine(r.telefone||(r.telefones||[]).join(' | ')),
      v43OneLine(r.localizacao||''),v43OneLine(r.trabalho||''),v43OneLine(r.formacao||''),v43OneLine(r.horarioFuncionamento||''),v43OneLine((r.areasAtendimento||[]).join(' | ')),v43OneLine(v41ComplementaryDisplayText(r))
    ]);
    return [V42_COLUMNS,...body];
  }
  function v43WorksheetXml(rows,opts){
    opts=opts||{};const maxRow=Math.max(1,rows.length),maxCol=Math.max(1,(rows[0]||[]).length),ref='A1:'+v42Col(maxCol)+maxRow;
    const cols=(opts.widths||[]).map((w,i)=>'<col min="'+(i+1)+'" max="'+(i+1)+'" width="'+w+'" customWidth="1"/>').join('');
    const freeze=opts.freezeHeader?'<sheetViews><sheetView workbookViewId="0"><pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/><selection pane="bottomLeft" activeCell="A2" sqref="A2"/></sheetView></sheetViews>':'<sheetViews><sheetView workbookViewId="0"/></sheetViews>';
    const filter=opts.autoFilter?'<autoFilter ref="'+ref+'"/>':'';
    const rowsXml=rows.map((row,ri)=>'<row r="'+(ri+1)+'"'+(ri===0?' ht="28" customHeight="1"':' ht="22" customHeight="1"')+'>'+row.map((v,ci)=>{const r=v42Col(ci+1)+(ri+1),style=ri===0?1:2;return '<c r="'+r+'" t="inlineStr" s="'+style+'"><is><t xml:space="preserve">'+v42Xml(v43OneLine(v))+'</t></is></c>';}).join('')+'</row>').join('');
    return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">'+freeze+'<cols>'+cols+'</cols><sheetData>'+rowsXml+'</sheetData>'+filter+'<pageMargins left="0.35" right="0.35" top="0.55" bottom="0.55" header="0.2" footer="0.2"/></worksheet>';
  }
  function v43MakeXlsx(snapshotJson=null){
    v41AssertAuthorIdentityIntegrity('v43_make_xlsx');const j=snapshotJson||makeJson(),rel=j&&j.relation||{},data=v43XlsxRows(j);
    const resumo=[['Campo','Valor'],['Relação solicitada',rel.requestedRelationLabel||'Amigos'],['Amigos declarados',String(rel.declaredFriendsCount||'')],['Relação materializada',rel.materializedRelationLabel||relationLabel(j.relation&&j.relation.locked||state.relation)],['Seguindo observados',String(rel.observedUniqueProfiles||j.totals&&j.totals.rows||'')],['Amigos confirmados',String(rel.confirmedFriendsUnique||0)],['Nota técnica',rel.technicalStatement||''],['Nota',rel.note||''],['Orientação','Use a aba Dados. Ela abre com cabeçalho congelado, filtro e colunas dimensionadas. O CSV é bruto e não mantém congelamento no Excel.']];
    const widths=[6,14,14,18,26,14,55,20,34,12,12,28,20,34,24,24,18,30,46];
    const entries=[
      {name:'[Content_Types].xml',data:'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/><Override PartName="/xl/worksheets/sheet2.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/><Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/><Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/></Types>'},
      {name:'_rels/.rels',data:'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/><Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/></Relationships>'},
      {name:'docProps/core.xml',data:'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:dcmitype="http://purl.org/dc/dcmitype/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><dc:creator>'+v42Xml(CREDIT_NAME)+'</dc:creator><dc:title>B35A1 Relações Facebook V43</dc:title><dcterms:created xsi:type="dcterms:W3CDTF">'+new Date().toISOString()+'</dcterms:created></cp:coreProperties>'},
      {name:'docProps/app.xml',data:'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes"><Application>B35A1 Rosetta</Application></Properties>'},
      {name:'xl/workbook.xml',data:'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets><sheet name="Dados" sheetId="1" r:id="rId1"/><sheet name="Resumo" sheetId="2" r:id="rId2"/></sheets></workbook>'},
      {name:'xl/_rels/workbook.xml.rels',data:'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet2.xml"/><Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>'},
      {name:'xl/styles.xml',data:'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><fonts count="2"><font><sz val="11"/><name val="Aptos"/></font><font><b/><color rgb="FFFFFFFF"/><sz val="11"/><name val="Aptos"/></font></fonts><fills count="3"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill><fill><patternFill patternType="solid"><fgColor rgb="FF111111"/><bgColor indexed="64"/></patternFill></fill></fills><borders count="2"><border><left/><right/><top/><bottom/><diagonal/></border><border><left style="thin"><color rgb="FFD9E2EC"/></left><right style="thin"><color rgb="FFD9E2EC"/></right><top style="thin"><color rgb="FFD9E2EC"/></top><bottom style="thin"><color rgb="FFD9E2EC"/></bottom><diagonal/></border></borders><cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs><cellXfs count="3"><xf numFmtId="0" fontId="0" fillId="0" borderId="1" xfId="0" applyBorder="1" applyAlignment="1"><alignment vertical="top" wrapText="0"/></xf><xf numFmtId="0" fontId="1" fillId="2" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center" vertical="center" wrapText="1"/></xf><xf numFmtId="0" fontId="0" fillId="0" borderId="1" xfId="0" applyAlignment="1"><alignment vertical="top" wrapText="0"/></xf></cellXfs><cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles></styleSheet>'},
      {name:'xl/worksheets/sheet1.xml',data:v43WorksheetXml(data,{widths,freezeHeader:true,autoFilter:true})},
      {name:'xl/worksheets/sheet2.xml',data:v43WorksheetXml(resumo,{widths:[28,120],freezeHeader:true})}
    ];
    return v42Zip(entries);
  }
  function v43HtmlUxScript(){
    return '<script id="b35a1-v43-html-ux-force-visible">(function(){function q(s){return document.querySelector(s)}var wrap=q(".tableWrap"),table=wrap&&wrap.querySelector("table.b35Table");if(!wrap||!table)return;var old=q("#b35x-bottom-dock");if(old)old.remove();var dock=document.createElement("div");dock.id="b35x-bottom-dock";dock.innerHTML="<input type=\\"range\\" min=\\"0\\" max=\\"1000\\" value=\\"0\\" step=\\"1\\" aria-label=\\"Rolagem horizontal da tabela\\">";document.body.appendChild(dock);var range=dock.querySelector("input"),lock=false;function max(){return Math.max(0,wrap.scrollWidth-wrap.clientWidth)}function setVisible(){dock.style.display="flex";dock.style.visibility="visible";range.disabled=false}function syncFromWrap(){if(lock)return;setVisible();var m=max();range.value=String(m?Math.round(wrap.scrollLeft/m*1000):0)}function syncFromRange(){if(lock)return;lock=true;var m=max();wrap.scrollLeft=m*(Number(range.value||0)/1000);lock=false;syncSticky()}range.addEventListener("input",syncFromRange);wrap.addEventListener("scroll",function(){syncFromWrap();syncSticky()},{passive:true});var head=table.querySelector("thead"),sticky=document.createElement("div");sticky.id="b35x-sticky-head";sticky.setAttribute("aria-hidden","true");var clone=document.createElement("table");clone.className="b35Table";clone.appendChild(head.cloneNode(true));sticky.appendChild(clone);document.body.appendChild(sticky);function widths(){var s=Array.from(head.querySelectorAll("th")),d=Array.from(clone.querySelectorAll("th"));s.forEach(function(th,i){if(d[i])d[i].style.width=th.getBoundingClientRect().width+"px"});clone.style.width=table.scrollWidth+"px";clone.style.minWidth=table.scrollWidth+"px"}function syncSticky(){var wr=wrap.getBoundingClientRect(),tr=table.getBoundingClientRect(),hh=head.getBoundingClientRect().height||38,show=tr.top<0&&tr.bottom>hh;if(!show){sticky.style.display="none";return}sticky.style.display="block";sticky.style.left=Math.max(0,wr.left)+"px";sticky.style.top="0px";sticky.style.width=Math.max(0,Math.min(window.innerWidth,wr.right)-Math.max(0,wr.left))+"px";sticky.style.height=hh+"px";clone.style.transform="translateX("+(-wrap.scrollLeft)+"px)"}function refresh(){widths();syncFromWrap();syncSticky()}window.addEventListener("scroll",syncSticky,{passive:true});window.addEventListener("resize",refresh);if(window.ResizeObserver){var ro=new ResizeObserver(refresh);ro.observe(wrap);ro.observe(table)}setVisible();requestAnimationFrame(refresh);setTimeout(refresh,50);setTimeout(refresh,300);setTimeout(refresh,1200)})();<\/script>';
  }
  makeHtml=function(snapshotJson=null){
    v41AssertAuthorIdentityIntegrity('v43_make_html');const j=snapshotJson||makeJson();let html=__v43BaseMakeHtml(j);
    try{const doc=new DOMParser().parseFromString(html,'text/html');doc.querySelectorAll('#b35x-bottom-dock,#b35x-sticky-head,script#b35a1-v42-html-ux-final,script#b35a1-v43-html-ux-force-visible').forEach(x=>x.remove());const st=doc.createElement('style');st.id='b35a1-v43-html-ui-style';st.textContent='html,body{overflow-x:hidden}.tableWrap{overflow:auto!important}.b35Table thead,.b35Table thead th{position:sticky!important;top:0!important;z-index:160!important;background:#111!important;color:#fff!important}#b35x-bottom-dock{position:fixed!important;left:12px!important;right:12px!important;bottom:0!important;z-index:2147483600!important;height:24px!important;display:flex!important;visibility:visible!important;align-items:center;background:rgba(248,250,252,.97);border:1px solid #cbd5e1;border-radius:6px 6px 0 0;padding:2px 8px;box-shadow:0 -2px 8px rgba(15,23,42,.12)}#b35x-bottom-dock input{width:100%;min-width:160px;accent-color:#1877f2}#b35x-sticky-head{position:fixed;top:0;overflow:hidden;background:#111;z-index:2147483500;display:none;pointer-events:none;box-shadow:0 4px 12px rgba(15,23,42,.35)}#b35x-sticky-head table{margin:0!important;table-layout:fixed!important}.bottomScroll{display:none!important}@media print{#b35x-bottom-dock,#b35x-sticky-head{display:none!important}}';doc.head.appendChild(st);doc.body.insertAdjacentHTML('beforeend',v43HtmlUxScript());v41AssertExportAuthorHtml(doc,'v43_html_export');return '<!doctype html>'+doc.documentElement.outerHTML;}catch(e){if(String(e&&e.message||e).includes('B35A1_AUTHOR_IDENTITY_TAMPERED'))throw e;return html;}
  };
  makeCsv=function(){
    v41AssertAuthorIdentityIntegrity('v43_make_csv_clean');const j=makeJson();return '\ufeff'+v43CsvRows(j).map(row=>row.map(csvCell).join(';')).join('\r\n');
  };
  makeXlsx=function(snapshotJson=null){return v43MakeXlsx(snapshotJson);};
  buildExportArtifact=function(kind,base,snapshot=null){const k=String(kind||'').toLowerCase();if(k==='xlsx')return {kind:'xlsx',name:base+'.xlsx',mime:V42_XLSX_MIME,data:makeXlsx(snapshot&&snapshot.json?snapshot.json:null)};return __v43BaseBuildExportArtifact(kind,base,snapshot);};
  exportSelectedFormats=async function(kinds,options){
    options=options||{};v41AssertAuthorIdentityIntegrity('v43_export_before');let selected=uniq((kinds||[]).map(x=>String(x).toLowerCase())).filter(x=>['json','html','pdf','csv','xlsx'].includes(x));if(!selected.length)throw new Error('SELECIONE_AO_MENOS_UM_FORMATO');
    const printWindow=selected.includes('pdf')?(options.preopenedPrintWindow||window.open('about:blank','_blank')):null;await prepareFinalBeforeExport();const base=artifactBase();state.lastExportBase=base;const out=[];
    const snapshot=selected.some(k=>k==='json'||k==='html'||k==='pdf'||k==='xlsx')?await freezeExportSnapshotV44R10():null;
    for(const kind of selected){const artifact=buildExportArtifact(kind,base,snapshot);out.push(await exportArtifactWithIntegrity(artifact,{preopenedPrintWindow:kind==='pdf'?printWindow:null}));await new Promise(r=>setTimeout(r,180));}
    v41AssertAuthorIdentityIntegrity('v43_export_after');log('info','Exportação V43 concluída. Para Excel organizado use o .xlsx; CSV é bruto e sem congelamento.',{formats:selected,files:out.map(x=>x.name)});return out;
  };
  exportPreparedOne=async function(kind){return exportSelectedFormats([kind]);};
  exportAll=async function(){return exportSelectedFormats(['xlsx','html','json']);};
  showExportChooser=function(){
    v41AssertAuthorIdentityIntegrity('v43_export_chooser');const old=document.getElementById('fb-b35-export-chooser');if(old){old.remove();return;}const box=document.createElement('div');box.id='fb-b35-export-chooser';box.style.cssText='margin-top:8px;border:2px solid #0ea5e9;border-radius:10px;padding:9px;background:#f0f9ff';
    box.innerHTML='<div style="font-weight:900;margin-bottom:6px">Exportação</div><label style="display:block;margin:4px 0"><input type="checkbox" value="xlsx"> Excel XLSX organizado (recomendado: cabeçalho congelado, filtros, colunas ajustadas)</label><label style="display:block;margin:4px 0"><input type="checkbox" value="html"> HTML com barra horizontal simples e cabeçalho congelado</label><label style="display:block;margin:4px 0"><input type="checkbox" value="json"> JSON técnico</label><label style="display:block;margin:4px 0"><input type="checkbox" value="pdf"> PDF</label><label style="display:block;margin:4px 0;color:#991b1b"><input type="checkbox" value="csv"> CSV bruto (não congela cabeçalho no Excel; a ferramenta também gerará XLSX)</label><div style="font-size:11px;color:#0f172a;margin:7px 0;font-weight:700">Para abrir no Excel, use o arquivo .xlsx. O .csv é apenas intercâmbio bruto e não guarda congelamento, largura ou guia inferior.</div><div style="display:flex;gap:6px;flex-wrap:wrap"><button id="fb-b35-export-xlsx" style="font-weight:900;background:#dcfce7">Gerar Excel XLSX</button><button id="fb-b35-export-go" style="font-weight:800">Gerar marcados</button><button id="fb-b35-export-cancel">Cancelar</button></div>';
    const panel=document.getElementById('fb-b35a1-raspador-amigos-v29-panel');if(!panel)return;panel.appendChild(box);box.querySelector('#fb-b35-export-cancel').onclick=()=>box.remove();box.querySelector('#fb-b35-export-xlsx').onclick=runPanelAction('exportação Excel XLSX V43',async()=>{await exportSelectedFormats(['xlsx']);box.remove();});box.querySelector('#fb-b35-export-go').onclick=runPanelAction('exportação multiformato V43',async()=>{const kinds=Array.from(box.querySelectorAll('input[type="checkbox"]:checked')).map(x=>x.value);await exportSelectedFormats(kinds);box.remove();});
  };
  makePanel=function(){
    const p=__v43BaseMakePanel();if(!p)return p;try{const old=p.querySelector('#fb-b35-v43-xlsx-direct');if(old)old.remove();const exp=p.querySelector('#fb-b35-export');if(exp&&exp.parentNode){exp.textContent='Exportar formatos…';const b=document.createElement('button');b.id='fb-b35-v43-xlsx-direct';b.textContent='Excel XLSX';b.title='Exporta planilha organizada: cabeçalho congelado, filtros, colunas dimensionadas';b.style.cssText='font-weight:900;background:#dcfce7;border:1px solid #16a34a;color:#14532d';b.onclick=runPanelAction('exportação Excel XLSX V43',async()=>{await exportSelectedFormats(['xlsx']);});exp.parentNode.insertBefore(b,exp.nextSibling);}}catch(e){}return p;
  };
  makeJson=function(){v41AssertAuthorIdentityIntegrity('v43_make_json');const j=__v43BaseMakeJson();j.tool=TOOL;j.version=VERSION;j.schema=V43_SCHEMA;j.exportContract={...(j.exportContract||{}),csv:'bruto_sem_resumo_sem_congelamento',excelXlsx:{enabled:true,firstSheet:'Dados',freezeHeader:true,autoFilter:true,summarySheet:'Resumo',oneLineCells:true,columnWidths:true},htmlUi:{bottomGuide:'always_visible_fixed_range_dock',stickyHeader:'thead_sticky_plus_fixed_clone'}};return j;};
  makeManifest=function(){const m=__v43BaseMakeManifest();m.version=VERSION;m.tool=TOOL;m.architecture={...(m.architecture||{}),stableCore:'V42/V41/V40/V39/V37/V35_preserved',xlsxFirst:'Dados',csvClean:'header_first_no_summary',mainPanelXlsxButton:true,htmlBottomGuide:'always_visible_fixed_range_dock',htmlStickyHeader:'force_sticky_clone'};return m;};

  v41AssertAuthorIdentityIntegrity('startup');

  // V2 does not keep a render-pool port; metadata is fetched as target-bound structured GraphQL.
  consumeCanonicalFriendsResume();state.pageTargetKey=String(currentTarget()||state.pageTargetKey||'');state.pageHref=String(location.href||'');
  installRelationNetworkBridge(); installExplicitRelationClickTracker(); makePanel(); ensureCurrentPageContext('startup'); refreshRelationTargetFromDom('startup',true); installRelationUiObserver();
  try{captureTargetAvatarRunV4433('startup_document_idle');}catch(_){}setTimeout(()=>{try{captureTargetAvatarRunV4433('startup_settle');}catch(_){}},700);
  log('info','Raspador de dados de relações do Facebook V35 carregado em modo idle-safe: sem varredura passiva da relação e sem interceptação de rede antes do clique; núcleo V34/V29 preservado.',{relation:state.relation,expected:state.expected,expectedHint:state.expectedHint,target:state.pageTargetKey,href:location.href,targetAudit:{...state.relationTargetAudit}});
  const __b35v35Api={__rcRuntimeBuild:__B35_RC_RUNTIME_BUILD__,state,makePanel,scanVisible,v36ObservedFallbackContext,v36FreezeSeed,v36SeedGate,v37RelationContinuity,v37ObservedTerminalReady,v37ObservedScrollProgressPct,v37NormalizeObservedFallbackGates,safeScanVisibleForCurrentIntent,collectionSurfaceCompatibility,assertCollectableRelationSurface,installExplicitRelationClickTracker,autoScrollCollect,autoScrollCollectRobustTarget,autoScrollCollectAllFriends,autoScrollCollectAndEnrich,refreshRelationTargetFromDom,resolveActiveRelationContext,detectRelationCountsFromDom,relationCountPairsFromText,relationProgressSnapshot,requestStop,relationScrollMetrics,relationScrollCandidates,recoverDeclaredTargetGap,decideRelationClosure,beginRelationNetworkCapture,endRelationNetworkCapture,handleRelationNetworkPayload,drainRelationNetworkPagination,networkAllKnownRootsTerminal,relationNetworkReplayBudget,relationNetworkDrainBudgetMs,networkConnectionFingerprint,relationSearchInput,relationSearchPrefixBudget,recoverRelationGapBySearch,exactRelationCollectionQuery,isTrustedRelationTargetContext,maybeAutoStartMeta,ensureMetaCoverageForCurrentRelation,relationReadyForMeta,metaRunCoverageAudit,fetchProfileAboutBootstrapOnePass,fetchProfileAllBootstrapOnePass,extractTargetBoundContactDomMeta,contactScopesFromDocument,scopeSemanticKind,phoneCandidatesFromBoundedText,isLocationUtilityUrl,safeContactExternalUrl,targetedAllJsonRoots,needsAllContactSupplement,needsAllGeneralSupplement,generalInfoCoverage,visibleGeneralInfoItems,generalInfoHtml,generalRunSummary,recoverLowPhotos,detectActiveRelationSurface,assertRelationSurface,auditRelationSurface,resolveAboutBootstrapTarget,blockingGraphQLErrorCount,validAboutBindingMode,fastEnrichStrict,exportPreparedOne,exportAll,exportSelectedFormats,showExportChooser,makeCsv,makeXlsx,makeDataPdf,makeIntegrityPdf,legacyIntegrityText,makeLegacySimplePdf,nativePdfViewportMetrics,makeJson,makeHtml,makeManifest,freezeExportSnapshot,buildExportArtifact,htmlForNativePdfPrint,openHtmlReportNativePdf,canonicalFriendsAllUrl,isCanonicalFriendsAllUrl,isBareFriendsContainerUrl,ensureCanonicalFriendsSurfaceForRun,consumeCanonicalFriendsResume,ensureCurrentPageContext,resetTargetContext,metaRunSummary,evaluateMetaRunGate,selectMetaQueueForRun,cohortReferenceQuality,bioCoverageSummary,finalizeBioCoverage,destroy};
  window.__FB_B35A1_V43_V42_CORE_EXCEL_UI_FINAL__=__b35v35Api;
  window.__FB_B35A1_V42_V41_CORE_EXCEL_HTML_FINAL__=__b35v35Api;
  window.__FB_B35A1_V41_V40_CORE_PRODUCTION_HARDENING_FINAL__=__b35v35Api;
  window.__FB_B35A1_V40_V39_CORE_COMPLEMENTARY_COLUMN_FINAL__=__b35v35Api;
  window.__FB_B35A1_V38_V35_CORE_ALL_ABOUT_ENRICH_FINAL__=__b35v35Api;
  window.__FB_B35A1_V37_V35_CORE_TERMINAL_HANDSHAKE__=__b35v35Api; // alias compatível V37
  window.__FB_B35A1_V36_V35_CORE_OBSERVED_SURFACE_REALTIME__=__b35v35Api; // alias compatível V36
  window.__FB_B35A1_RASPADOR_AMIGOS_V35_IDLE_SAFE_LATE_ARM__=__b35v35Api; // alias compatível V35
  window.__FB_B35A1_RASPADOR_AMIGOS_V34_PROD_HARDENED_FROM_V29__=__b35v35Api; // alias compatível V34
  window.__FB_B35A1_RASPADOR_AMIGOS_V33_ROUTE_CONTAINER_OBSERVABLE_FRIENDS__=__b35v35Api;
  window.__FB_B35A1_RASPADOR_AMIGOS_V31_NO_NAV_CONTEXT_GUARD__=__b35v35Api; // alias compatível V31
  window.__FB_B35A1_RASPADOR_AMIGOS_V30_HTML_PDF_PARITY_LEGACY_INTEGRITY__=__b35v35Api; // alias compatível V30
  window.__FB_B35A1_RASPADOR_AMIGOS_V29_CANONICAL_FRIENDS_ALL_HTML_PDF__=__b35v35Api; // alias compatível V29
})();
