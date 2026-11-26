@echo off
REM ===== One-time setup for the IT7744 Laravel lab project =====
REM Before running: start Apache + MySQL in the XAMPP Control Panel.
cd /d "%~dp0"

echo.
echo === Checking PHP (needs 8.2 or newer) ===
php -v || (echo PHP not found. Add C:\xampp\php to your PATH, then try again. & pause & exit /b)

echo.
echo === Checking Composer ===
call composer --version || (echo Composer not found. Install it from https://getcomposer.org/download/ then try again. & pause & exit /b)

echo.
echo === Installing PHP packages (vendor folder) ===
call composer install

echo.
echo === Installing front-end packages (Tailwind, Vite) ===
call npm install

echo.
echo === Creating the database tables + dummy data ===
echo If it asks to create the "my_app" database, type yes.
php artisan migrate:fresh --seed

echo.
echo === Done! Start the app with:  composer run dev
echo === Then open http://127.0.0.1:8000
echo === Test login: test@example.com / password
pause
