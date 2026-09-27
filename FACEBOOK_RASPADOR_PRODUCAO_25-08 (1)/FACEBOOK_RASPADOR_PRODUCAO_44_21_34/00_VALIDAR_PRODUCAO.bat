@echo off
setlocal EnableExtensions
chcp 65001 >nul
cd /d "%~dp0"
echo ============================================================
echo FACEBOOK RASPADOR - VALIDACAO OPCIONAL
echo ============================================================
where py >nul 2>nul
if errorlevel 1 goto use_python
py -3 00_VALIDAR_PRODUCAO.py
set "RC=%ERRORLEVEL%"
goto done
:use_python
python 00_VALIDAR_PRODUCAO.py
set "RC=%ERRORLEVEL%"
:done
echo.
echo Codigo real: %RC%
pause
exit /b %RC%
