#!/bin/bash
# ============================================
# ChillShell — Script d'installation SSH pour Linux
#
# Comment utiliser :
#   chmod +x chillshell-setup-linux.sh
#   ./chillshell-setup-linux.sh
#
# Ce script va :
#   1. Installer le serveur SSH
#   2. Le démarrer et l'activer au démarrage
#   3. Vérifier qu'il fonctionne
#   4. Configurer le pare-feu si nécessaire
#   5. Afficher ton IP et ton nom d'utilisateur
# ============================================

set -e

echo ""
echo "============================================"
echo " ChillShell — Installation SSH pour Linux"
echo "============================================"
echo ""

# --- Détection de la distribution ---
# On regarde le fichier /etc/os-release pour savoir quelle distro Linux tu utilises
# Chaque distro a sa propre commande pour installer des logiciels
if [ -f /etc/os-release ]; then
    . /etc/os-release
    DISTRO="$ID"
else
    DISTRO="unknown"
fi

echo "Distribution détectée : $DISTRO"
echo ""

# -------------------------------------------------
# ÉTAPE 1 : Installer OpenSSH Server
# Le serveur SSH permet aux autres machines (dont ChillShell)
# de se connecter à CE PC à distance
# -------------------------------------------------
echo "[1/5] Installation de OpenSSH Server..."
echo "      Permet à ChillShell de se connecter à CE PC."
case "$DISTRO" in
    ubuntu|debian|linuxmint|pop)
        # Debian/Ubuntu utilisent apt pour installer des logiciels
        sudo apt update -qq && sudo apt install openssh-server -y -qq
        ;;
    fedora|rhel|centos|rocky|alma)
        # Fedora/RHEL utilisent dnf pour installer des logiciels
        sudo dnf install openssh-server -y -q
        ;;
    arch|manjaro|endeavouros)
        # Arch/Manjaro utilisent pacman pour installer des logiciels
        sudo pacman -S --noconfirm openssh
        ;;
    *)
        echo "      Distribution non reconnue ($DISTRO)."
        echo "      Installe openssh-server manuellement avec le gestionnaire de paquets de ta distro."
        exit 1
        ;;
esac
echo "      OK"
echo ""

# -------------------------------------------------
# ÉTAPE 2 : Démarrer et activer le service SSH
# 'enable' = SSH se lancera automatiquement à chaque démarrage du PC
# '--now' = en plus, on le démarre tout de suite
# -------------------------------------------------
echo "[2/5] Démarrage et activation du service SSH..."
echo "      SSH sera actif maintenant ET à chaque démarrage du PC."
sudo systemctl enable --now sshd
echo "      OK"
echo ""

# -------------------------------------------------
# ÉTAPE 3 : Vérifier que le service tourne
# On demande à systemd si le service sshd est bien en cours d'exécution
# -------------------------------------------------
echo "[3/5] Vérification du service SSH..."
echo "      On vérifie que SSH est bien actif."
if systemctl is-active --quiet sshd; then
    echo "      SSH est actif et fonctionne !"
else
    echo "      /!\\ SSH ne semble pas actif."
    echo "      Lance cette commande pour voir le problème :"
    echo "        systemctl status sshd"
fi
echo ""

# -------------------------------------------------
# ÉTAPE 4 : Configurer le pare-feu
# Le pare-feu peut bloquer les connexions SSH même si le service tourne
# On détecte quel pare-feu est utilisé (ufw ou firewalld) et on autorise SSH
# -------------------------------------------------
echo "[4/5] Configuration du pare-feu..."
echo "      Le pare-feu doit autoriser les connexions SSH (port 22)."
if command -v ufw &> /dev/null; then
    # ufw = pare-feu utilisé sur Ubuntu, Debian, Linux Mint, Pop!_OS
    if sudo ufw status | grep -q "Status: active"; then
        sudo ufw allow ssh
        echo "      Règle ufw ajoutée — port 22 autorisé."
    else
        echo "      ufw est installé mais pas actif — pas de règle nécessaire."
    fi
elif command -v firewall-cmd &> /dev/null; then
    # firewalld = pare-feu utilisé sur Fedora, RHEL, CentOS
    if systemctl is-active --quiet firewalld; then
        sudo firewall-cmd --permanent --add-service=ssh
        sudo firewall-cmd --reload
        echo "      Règle firewalld ajoutée — SSH autorisé."
    else
        echo "      firewalld est installé mais pas actif — pas de règle nécessaire."
    fi
else
    echo "      Aucun pare-feu détecté (ni ufw ni firewalld) — pas de règle nécessaire."
fi
echo ""

# -------------------------------------------------
# ÉTAPE 5 : Afficher l'adresse IP et le nom d'utilisateur
# L'utilisateur a besoin de ces infos pour se connecter depuis ChillShell
# hostname -I affiche toutes les adresses IP du PC
# -------------------------------------------------
echo "[5/5] Récupération de tes informations de connexion..."
echo ""
echo "============================================"
echo " INFORMATIONS POUR CHILLSHELL"
echo "============================================"
echo ""
echo " Ton adresse IP (entre-la dans ChillShell) :"
hostname -I | awk '{for(i=1;i<=NF;i++) print "    " $i}'
echo ""
echo " Ton nom d'utilisateur :"
echo "    $(whoami)"
echo ""
echo "============================================"
echo " Dans ChillShell, connecte-toi avec :"
echo "    $(whoami)@[TON_IP]"
echo "============================================"
echo ""
echo " Installation terminée !"
echo ""
