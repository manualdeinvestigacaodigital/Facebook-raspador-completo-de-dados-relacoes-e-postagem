from pathlib import Path
import json,hashlib,subprocess,sys
ROOT=Path(__file__).resolve().parent
EXT=ROOT/"01_EXTENSAO_FACEBOOK_RASPADOR"
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
checks=[]
def ck(k,v,d=""):checks.append((k,bool(v),str(d)))
try:
 m=json.loads((EXT/"manifest.json").read_text(encoding="utf-8"))
except Exception as e:
 print("[FAIL] manifest:",e);sys.exit(2)
ck("MANIFEST_V3",m.get("manifest_version")==3,m.get("manifest_version"))
ck("VERSION_44_21_34",m.get("version")=="44.21.34",m.get("version"))
runtime={"manifest.json",m["background"]["service_worker"]}
for cs in m.get("content_scripts",[]):runtime.update(cs.get("js",[]))
actual={p.name for p in EXT.iterdir() if p.is_file()}
ck("RUNTIME_14",actual==runtime and len(actual)==14,len(actual))
ck("NO_RESERVED_UNDERSCORE",not list(EXT.rglob("_*")))
node=True
for p in EXT.glob("*.js"):
 q=subprocess.run(["node","--check",str(p)],capture_output=True,text=True)
 if q.returncode:node=False
ck("NODE_ALL_JS",node)
ck("EXACT_COLLECTOR_FROZEN",sha(EXT/"exact_relation_collector_442127.js")=="50cbc96e6c2b8559349ff86db688c3dcf9132eca940ff30f63079bf2efa46a25")
uc=(EXT/"unified_controller.js").read_text(encoding="utf-8")
post=(EXT/"post_scraper_module.js").read_text(encoding="utf-8")
ck("RELATIONS",all(x in uc for x in ["data-download-rel","friends","following","followers"]))
ck("POSTS","data-start-post" in uc)
ck("INTERACTIONS","data-scrape-interactions" in uc and "Interações com a postagem" in post)
ck("COMMENTS_REPLIES","Comentários e respostas" in post)
for k,v,d in checks:print(f"[{'PASS' if v else 'FAIL'}] {k} {d}")
print("OVERALL:","PASS" if all(v for _,v,_ in checks) else "FAIL")
sys.exit(0 if all(v for _,v,_ in checks) else 3)
