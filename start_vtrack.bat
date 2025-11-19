@echo off

start "" code "%cd%\vtrack-frontend"
start "" code "%cd%\vtrack_backend"


echo.
start cmd /k "cd /d %cd%\vtrack-frontend && npm start"

echo.
start cmd /k "cd /d %cd%\vtrack_backend && npm start"
