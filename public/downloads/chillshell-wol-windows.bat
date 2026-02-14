@echo off
chcp 65001 >nul
:: ============================================
:: ChillShell — Script Wake-on-LAN pour Windows
:: Double-cliquez sur ce fichier pour tout configurer
::
:: Ce script configure ton PC pour pouvoir etre allume
:: a distance depuis ChillShell via Wake-on-LAN.
::
:: IMPORTANT : la partie BIOS doit etre faite manuellement
:: (consulte le tuto BIOS sur le site ChillShell)
:: ============================================

:: --- Demande les droits administrateur ---
:: (necessaire pour modifier les parametres reseau et le registre)
net session >nul 2>&1
if %errorlevel% neq 0 (
    powershell -Command "Start-Process '%~f0' -Verb RunAs"
    exit /b
)

echo.
echo ============================================
echo  ChillShell — Configuration Wake-on-LAN
echo ============================================
echo.
echo  /!\ PREREQUIS : les parametres BIOS doivent etre
echo  configures manuellement (consulte le tuto BIOS).
echo.

:: -------------------------------------------------
:: ETAPE 1 : Trouver la carte reseau Ethernet
:: On cherche une carte reseau branchee en cable (pas WiFi, pas Bluetooth)
:: C'est cette carte qui recevra le signal pour allumer le PC
:: -------------------------------------------------
echo [1/5] Recherche de ta carte reseau Ethernet...
echo       On cherche une carte branchee en cable (pas WiFi).

powershell -Command ^
  "$adapter = Get-NetAdapter | Where-Object { $_.Status -eq 'Up' -and $_.InterfaceDescription -notlike '*Wi-Fi*' -and $_.InterfaceDescription -notlike '*Wireless*' -and $_.InterfaceDescription -notlike '*Bluetooth*' -and $_.InterfaceDescription -notlike '*Virtual*' } | Select-Object -First 1; ^
  if (-not $adapter) { ^
    Write-Host '       /!\ Aucune carte Ethernet trouvee.'; ^
    Write-Host '       Verifie que ton cable Ethernet est branche.'; ^
    exit 1 ^
  } else { ^
    Write-Host ('       Trouvee : ' + $adapter.Name + ' (' + $adapter.InterfaceDescription + ')'); ^
    $adapter.Name | Out-File -FilePath $env:TEMP\chillshell_adapter.txt -NoNewline; ^
    $adapter.InterfaceDescription | Out-File -FilePath $env:TEMP\chillshell_adapter_desc.txt -NoNewline ^
  }"

if %errorlevel% neq 0 (
    echo.
    pause
    exit /b 1
)
echo.

:: -------------------------------------------------
:: ETAPE 2 : Activer Wake on Magic Packet (onglet Avance)
:: Dans le Gestionnaire de peripheriques > carte reseau > onglet Avance
:: Le "Magic Packet" c'est le signal special envoye par ChillShell
:: pour reveiller ton PC quand il est eteint
:: -------------------------------------------------
echo [2/5] Activation de Wake on Magic Packet...
echo       C'est le signal que ChillShell envoie pour allumer ton PC.

powershell -Command ^
  "$name = Get-Content $env:TEMP\chillshell_adapter.txt; ^
  $props = Get-NetAdapterAdvancedProperty -Name $name -ErrorAction SilentlyContinue | Where-Object { $_.DisplayName -like '*Wake*Magic*' -or $_.DisplayName -like '*WOL*Magic*' }; ^
  if ($props) { ^
    foreach ($p in $props) { ^
      Set-NetAdapterAdvancedProperty -Name $name -DisplayName $p.DisplayName -DisplayValue 'Enabled' -ErrorAction SilentlyContinue; ^
    }; ^
    Write-Host '       OK — Wake on Magic Packet active' ^
  } else { ^
    Write-Host '       Propriete non trouvee — ta carte reseau ne supporte peut-etre pas WoL'; ^
    Write-Host '       ou le nom du parametre est different. Verifie manuellement dans le'; ^
    Write-Host '       Gestionnaire de peripheriques > carte reseau > onglet Avance.' ^
  }"
echo.

:: -------------------------------------------------
:: ETAPE 3 : Autoriser le reveil par le reseau (Gestion de l alimentation)
:: Active 2 options :
::   - "Autoriser ce peripherique a sortir l ordinateur du mode veille"
::   - "Autoriser uniquement un paquet magique a sortir l ordinateur du mode veille"
:: Sans ca, le PC ignore le signal de reveil envoye par ChillShell
:: -------------------------------------------------
echo [3/5] Autorisation du reveil par le reseau...
echo       Permet a la carte reseau de sortir le PC du mode veille.

powershell -Command ^
  "$desc = Get-Content $env:TEMP\chillshell_adapter_desc.txt; ^
  powercfg /deviceenablewake $desc 2>$null; ^
  if ($?) { ^
    Write-Host '       OK — Reveil par le reseau autorise' ^
  } else { ^
    Write-Host '       Impossible via powercfg. Verifie manuellement :'; ^
    Write-Host '       Gestionnaire de peripheriques > carte reseau > Proprietes'; ^
    Write-Host '       > onglet Gestion de l alimentation > coche les 2 cases.' ^
  }; ^
  Write-Host ''; ^
  Write-Host '       Appareils pouvant reveiller le PC :'; ^
  powercfg /devicequery wake_armed | ForEach-Object { Write-Host ('         ' + $_) }"
echo.

:: -------------------------------------------------
:: ETAPE 4 : Desactiver le demarrage rapide
:: Le demarrage rapide de Windows empeche le Wake-on-LAN de fonctionner
:: Car le PC ne s eteint pas completement (il fait une sorte de veille)
:: Du coup la carte reseau n ecoute pas le signal de reveil
:: -------------------------------------------------
echo [4/5] Desactivation du demarrage rapide...
echo       Le demarrage rapide empeche le Wake-on-LAN de fonctionner.
echo       On le desactive pour que le PC s eteigne vraiment.

reg add "HKLM\SYSTEM\CurrentControlSet\Control\Session Manager\Power" /v HiberbootEnabled /t REG_DWORD /d 0 /f >nul 2>&1

if %errorlevel% equ 0 (
    echo       OK — Demarrage rapide desactive
) else (
    echo       Erreur. Desactive-le manuellement :
    echo       Panneau de configuration ^> Options d alimentation
    echo       ^> Choisir l action des boutons ^> Modifier les parametres
    echo       ^> Decoche "Activer le demarrage rapide"
)
echo.

:: -------------------------------------------------
:: ETAPE 5 : Afficher l adresse MAC
:: L adresse MAC est l identifiant unique de ta carte reseau
:: C est ce que ChillShell utilise pour cibler TON PC
:: Tu dois la copier dans les parametres de ChillShell
:: -------------------------------------------------
echo [5/5] Recuperation de ton adresse MAC...
echo       C est l adresse a entrer dans ChillShell pour cibler ton PC.
echo.
echo ============================================
echo  INFORMATIONS POUR CHILLSHELL
echo ============================================
echo.

powershell -Command ^
  "$name = Get-Content $env:TEMP\chillshell_adapter.txt; ^
  $adapter = Get-NetAdapter -Name $name; ^
  Write-Host ' Carte reseau :'; ^
  Write-Host ('    ' + $adapter.Name + ' (' + $adapter.InterfaceDescription + ')'); ^
  Write-Host ''; ^
  Write-Host ' Ton adresse MAC (entre-la dans ChillShell) :'; ^
  Write-Host ('    ' + $adapter.MacAddress); ^
  Write-Host ''; ^
  Write-Host ' Ton adresse IP :'; ^
  $ip = (Get-NetIPAddress -InterfaceIndex $adapter.ifIndex -AddressFamily IPv4 -ErrorAction SilentlyContinue).IPAddress; ^
  Write-Host ('    ' + $ip)"

echo.
echo ============================================
echo  N oublie pas :
echo    1. Configure ton BIOS (tuto BIOS sur le site)
echo    2. Copie l adresse MAC dans ChillShell
echo    3. Le PC doit etre branche en Ethernet (pas WiFi)
echo ============================================
echo.

:: Nettoyage des fichiers temporaires
del /q %TEMP%\chillshell_adapter.txt 2>nul
del /q %TEMP%\chillshell_adapter_desc.txt 2>nul

echo Configuration terminee !
echo.
pause
