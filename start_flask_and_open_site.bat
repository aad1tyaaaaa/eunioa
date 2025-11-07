@echo off
REM This batch file starts the Flask app and then opens the main website in the default browser

REM Start Flask app in a new window
start cmd /k "py app.py"

REM Wait a few seconds to allow Flask to start
timeout /t 5 /nobreak

REM Open the main website (index.html) in the default browser
start "" "index.html"
