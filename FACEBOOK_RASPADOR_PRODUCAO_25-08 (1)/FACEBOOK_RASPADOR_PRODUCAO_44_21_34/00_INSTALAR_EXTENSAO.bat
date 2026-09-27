@echo off
setlocal EnableExtensions
chcp 65001 >nul
set "ROOT=%~dp0"
set "EXT=%ROOT%01_EXTENSAO_FACEBOOK_RASPADOR"

echo ============================================================
echo FACEBOOK RASPADOR - PRODUCAO 44.21.34
echo ============================================================
echo.
if not exist "%EXT%\manifest.json" (
  echo [FAIL] manifest.json nao encontrado.
  echo Esperado:
  echo %EXT%\manifest.json
  pause
  exit /b 10
)

echo [PASS] Extensao localizada.
echo.
echo PASTA A CARREGAR SEM COMPACTACAO:
echo %EXT%
echo.
>nul echo %EXT%| clip

start "" explorer "%EXT%"

set "CHROME="
if exist "%ProgramFiles%\Google\Chrome\Application\chrome.exe" set "CHROME=%ProgramFiles%\Google\Chrome\Application\chrome.exe"
if not defined CHROME if exist "%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe" set "CHROME=%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe"
if not defined CHROME if exist "%LocalAppData%\Google\Chrome\Application\chrome.exe" set "CHROME=%LocalAppData%\Google\Chrome\Application\chrome.exe"

if defined CHROME (
  start "" "%CHROME%" "chrome://extensions/"
) else (
  echo [WARN] Abra manualmente chrome://extensions/
)

echo.
echo INSTALACAO:
echo 1. Ative Modo do desenvolvedor.
echo 2. Clique Carregar sem compactacao.
echo 3. Selecione 01_EXTENSAO_FACEBOOK_RASPADOR.
echo 4. Use a aba do Facebook ja logada.
echo 5. Pressione F5 nessa aba depois de instalar/atualizar.
echo.
echo NAO carregue o ZIP. Carregue a pasta acima.
echo.
pause
exit /b 0
