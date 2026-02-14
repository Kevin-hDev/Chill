@echo off
chcp 65001 >nul
:: ============================================
:: ChillShell — Script d'installation SSH pour Windows
:: Double-cliquez sur ce fichier pour tout configurer
:: ============================================

:: --- Demande les droits administrateur ---
:: (nécessaire pour installer OpenSSH et modifier le pare-feu)
net session >nul 2>&1
if %errorlevel% neq 0 (
    powershell -Command "Start-Process '%~f0' -Verb RunAs"
    exit /b
)

echo.
echo ============================================
echo  ChillShell — Installation SSH pour Windows
echo ============================================
echo.

:: -------------------------------------------------
:: ETAPE 1 : Installer OpenSSH Client
:: Le Client permet de se connecter DEPUIS ce PC vers d'autres machines
:: -------------------------------------------------
echo [1/6] Installation de OpenSSH Client...
echo       Permet de se connecter depuis ce PC vers d'autres machines.
powershell -Command "Add-WindowsCapability -Online -Name OpenSSH.Client~~~~0.0.1.0" >nul 2>&1
echo       OK
echo.

:: -------------------------------------------------
:: ETAPE 2 : Installer OpenSSH Server
:: Le Serveur permet aux autres machines (dont ChillShell) de se connecter A ce PC
:: -------------------------------------------------
echo [2/6] Installation de OpenSSH Server...
echo       Permet a ChillShell de se connecter a CE PC.
powershell -Command "Add-WindowsCapability -Online -Name OpenSSH.Server~~~~0.0.1.0" >nul 2>&1
echo       OK
echo.

:: -------------------------------------------------
:: ETAPE 3 : Demarrer le service SSH
:: Lance le service SSH immediatement pour que les connexions soient possibles
:: Si ca echoue, c'est probablement qu'il faut redemarrer le PC d'abord
:: -------------------------------------------------
echo [3/6] Demarrage du service SSH...
echo       Active SSH maintenant pour que les connexions soient possibles.
powershell -Command "Start-Service sshd" >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo       /!\ Le service n'a pas pu demarrer.
    echo       Redemarre ton PC, puis relance ce script.
    echo.
    pause
    exit /b 1
)
echo       OK
echo.

:: -------------------------------------------------
:: ETAPE 4 : Activer le demarrage automatique
:: SSH se lancera tout seul a chaque demarrage du PC
:: Sans ca, il faudrait relancer SSH manuellement apres chaque redemarrage
:: -------------------------------------------------
echo [4/6] Activation du demarrage automatique de SSH...
echo       SSH se lancera tout seul a chaque demarrage du PC.
powershell -Command "Set-Service -Name sshd -StartupType Automatic"
echo       OK
echo.

:: -------------------------------------------------
:: ETAPE 5 : Verifier/creer la regle pare-feu
:: Le pare-feu Windows doit autoriser les connexions entrantes sur le port 22 (SSH)
:: Normalement la regle est creee automatiquement, sinon on la cree
:: -------------------------------------------------
echo [5/6] Verification du pare-feu...
echo       Le port 22 (SSH) doit etre autorise pour les connexions entrantes.
powershell -Command "if (-not (Get-NetFirewallRule -Name '*ssh*' -ErrorAction SilentlyContinue)) { New-NetFirewallRule -Name 'OpenSSH-Server' -DisplayName 'OpenSSH Server (sshd)' -Enabled True -Direction Inbound -Protocol TCP -Action Allow -LocalPort 22 | Out-Null; Write-Host '       Regle pare-feu creee (port 22 autorise)' } else { Write-Host '       Regle pare-feu deja presente — OK' }"
echo.

:: -------------------------------------------------
:: ETAPE 6 : Afficher l'adresse IP et le nom d'utilisateur
:: L'utilisateur a besoin de ces infos pour se connecter depuis ChillShell
:: -------------------------------------------------
echo [6/6] Recuperation de tes informations de connexion...
echo.
echo ============================================
echo  INFORMATIONS POUR CHILLSHELL
echo ============================================
echo.
echo  Ton adresse IP (entre-la dans ChillShell) :
powershell -Command "(Get-NetIPAddress -AddressFamily IPv4 | Where-Object { $_.InterfaceAlias -notlike '*Loopback*' -and $_.IPAddress -ne '127.0.0.1' }).IPAddress | ForEach-Object { Write-Host \"    $_\" }"
echo.
echo  Ton nom d'utilisateur :
echo     %USERNAME%
echo.
echo ============================================
echo  Dans ChillShell, connecte-toi avec :
echo     %USERNAME%@[TON_IP]
echo ============================================
echo.
echo  Installation terminee !
echo.
pause
