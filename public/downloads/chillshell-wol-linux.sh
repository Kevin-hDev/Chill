#!/bin/bash
# ============================================
# ChillShell — Script Wake-on-LAN pour Linux
#
# Comment utiliser :
#   chmod +x chillshell-wol-linux.sh
#   ./chillshell-wol-linux.sh
#
# Ce script configure ton PC Linux pour pouvoir être allumé
# à distance depuis ChillShell via Wake-on-LAN.
#
# IMPORTANT : la partie BIOS doit être faite manuellement
# (consulte le tuto BIOS sur le site ChillShell)
# ============================================

set -e

echo ""
echo "============================================"
echo " ChillShell — Configuration Wake-on-LAN"
echo "============================================"
echo ""
echo " /!\\ PRÉREQUIS : les paramètres BIOS doivent être"
echo " configurés manuellement (consulte le tuto BIOS)."
echo ""

# --- Détection de la distribution ---
# Chaque distro a sa propre commande pour installer des logiciels
if [ -f /etc/os-release ]; then
    . /etc/os-release
    DISTRO="$ID"
else
    DISTRO="unknown"
fi

# -------------------------------------------------
# ÉTAPE 1 : Installer ethtool
# ethtool est l'outil qui permet de configurer les paramètres
# avancés de la carte réseau, dont le Wake-on-LAN
# -------------------------------------------------
echo "[1/5] Installation de ethtool..."
echo "      Outil nécessaire pour activer le Wake-on-LAN."

if ! command -v ethtool &> /dev/null; then
    case "$DISTRO" in
        ubuntu|debian|linuxmint|pop)
            sudo apt update -qq && sudo apt install ethtool -y -qq
            ;;
        fedora|rhel|centos|rocky|alma)
            sudo dnf install ethtool -y -q
            ;;
        arch|manjaro|endeavouros)
            sudo pacman -S --noconfirm ethtool
            ;;
        *)
            echo "      Distribution non reconnue ($DISTRO)."
            echo "      Installe ethtool manuellement."
            exit 1
            ;;
    esac
    echo "      OK — ethtool installé"
else
    echo "      Déjà installé — OK"
fi
echo ""

# -------------------------------------------------
# ÉTAPE 2 : Trouver l'interface Ethernet
# On cherche une interface réseau filaire (pas WiFi, pas loopback)
# C'est cette interface qui recevra le signal pour allumer le PC
# -------------------------------------------------
echo "[2/5] Recherche de ta carte réseau Ethernet..."
echo "      On cherche une carte branchée en câble (pas WiFi)."

# Chercher une interface Ethernet active
ETH_IFACE=""
for iface in $(ls /sys/class/net/); do
    # Ignorer loopback et WiFi
    if [ "$iface" = "lo" ]; then continue; fi
    if [ -d "/sys/class/net/$iface/wireless" ]; then continue; fi

    # Vérifier si c'est un lien physique (pas virtuel)
    if [ -e "/sys/class/net/$iface/device" ]; then
        # Vérifier si le câble est branché (carrier = 1)
        carrier=$(cat /sys/class/net/$iface/carrier 2>/dev/null || echo "0")
        if [ "$carrier" = "1" ]; then
            ETH_IFACE="$iface"
            break
        fi
        # Garder en fallback même si le câble n'est pas détecté
        if [ -z "$ETH_IFACE" ]; then
            ETH_IFACE="$iface"
        fi
    fi
done

if [ -z "$ETH_IFACE" ]; then
    echo "      /!\\ Aucune carte Ethernet trouvée."
    echo "      Vérifie que ton câble Ethernet est branché."
    exit 1
fi

echo "      Trouvée : $ETH_IFACE"
echo ""

# -------------------------------------------------
# ÉTAPE 3 : Activer le Wake-on-LAN
# La commande 'ethtool -s <interface> wol g' active le mode "magic packet"
# Le "magic packet" c'est le signal spécial envoyé par ChillShell
# pour réveiller ton PC quand il est éteint
# 'g' = mode "magic packet" (le plus fiable)
# -------------------------------------------------
echo "[3/5] Activation du Wake-on-LAN..."
echo "      Active la réception du signal de réveil (magic packet)."

sudo ethtool -s "$ETH_IFACE" wol g

# Vérifier que c'est actif
WOL_STATUS=$(sudo ethtool "$ETH_IFACE" 2>/dev/null | grep "Wake-on:" | tail -1 | awk '{print $2}')
if [ "$WOL_STATUS" = "g" ]; then
    echo "      OK — Wake-on-LAN actif (mode magic packet)"
else
    echo "      /!\\ Le WoL ne semble pas actif (statut: $WOL_STATUS)."
    echo "      Ta carte réseau ne supporte peut-être pas le WoL."
fi
echo ""

# -------------------------------------------------
# ÉTAPE 4 : Rendre le WoL permanent
# Sans cette étape, le WoL se désactive à chaque redémarrage du PC
# On crée un petit service systemd qui relance la commande au démarrage
# -------------------------------------------------
echo "[4/5] Activation permanente du Wake-on-LAN..."
echo "      Crée un service pour que le WoL reste actif après chaque redémarrage."

# Créer le fichier de service systemd
sudo tee /etc/systemd/system/wol-enable.service > /dev/null << SERVICEEOF
[Unit]
Description=Enable Wake-on-LAN on $ETH_IFACE
After=network-online.target
Wants=network-online.target

[Service]
Type=oneshot
ExecStart=/usr/sbin/ethtool -s $ETH_IFACE wol g
RemainAfterExit=yes

[Install]
WantedBy=multi-user.target
SERVICEEOF

# Activer le service pour qu'il se lance au démarrage
sudo systemctl daemon-reload
sudo systemctl enable wol-enable.service --quiet

echo "      OK — Service wol-enable créé et activé"
echo "      Le WoL restera actif après chaque redémarrage."
echo ""

# -------------------------------------------------
# ÉTAPE 5 : Afficher l'adresse MAC
# L'adresse MAC est l'identifiant unique de ta carte réseau
# C'est ce que ChillShell utilise pour cibler TON PC
# Tu dois la copier dans les paramètres de ChillShell
# -------------------------------------------------
echo "[5/5] Récupération de ton adresse MAC..."
echo "      C'est l'adresse à entrer dans ChillShell pour cibler ton PC."
echo ""

MAC_ADDR=$(cat /sys/class/net/$ETH_IFACE/address)
IP_ADDR=$(ip -4 addr show "$ETH_IFACE" 2>/dev/null | grep -oP '(?<=inet\s)\d+(\.\d+){3}' | head -1)

echo "============================================"
echo " INFORMATIONS POUR CHILLSHELL"
echo "============================================"
echo ""
echo " Interface réseau : $ETH_IFACE"
echo ""
echo " Ton adresse MAC (entre-la dans ChillShell) :"
echo "    $MAC_ADDR"
echo ""
echo " Ton adresse IP :"
echo "    ${IP_ADDR:-Non trouvée}"
echo ""
echo "============================================"
echo " N'oublie pas :"
echo "   1. Configure ton BIOS (tuto BIOS sur le site)"
echo "   2. Copie l'adresse MAC dans ChillShell"
echo "   3. Le PC doit être branché en Ethernet (pas WiFi)"
echo "============================================"
echo ""
echo " Configuration terminée !"
echo ""
