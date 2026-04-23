@echo off
echo Starting AI-Powered Digital Wills Platform...

:: Start Python AI Microservice (with protobuf workaround for Python 3.14+)
start "AI Microservice" cmd /c "cd ai-models && venv\Scripts\activate && set PROTOCOL_BUFFERS_PYTHON_IMPLEMENTATION=python && python main.py"

:: Start Node.js Backend
start "Backend Server" cmd /c "cd backend && npm start"

:: Start React Frontend
start "Frontend Client" cmd /c "cd frontend && npm start"

echo.
echo =======================================================
echo Services are starting in separate windows:
echo - AI Microservice running on http://localhost:5001
echo - Node Backend running on http://localhost:5000
echo - React Frontend running on http://localhost:3000
echo =======================================================
echo.
pause
