#!/bin/bash
# ============================================
# ChillShell — Script d'installation SSH pour macOS
#
# Double-clique sur ce fichier pour tout configurer
# Le Terminal s'ouvrira automatiquement
#
# Ce script va :
#   1. Activer l'accès à distance (SSH) sur ton Mac
#   2. Vérifier que c'est bien activé
#   3. Afficher ton IP et ton nom d'utilisateur
# ============================================

echo ""
echo "============================================"
echo " ChillShell — Installation SSH pour macOS"
echo "============================================"
echo ""

# -------------------------------------------------
# ÉTAPE 1 : Activer l'accès à distance (Remote Login)
# Cette commande active le serveur SSH intégré à macOS
# C'est la même chose que d'aller dans :
#   Réglages Système > Général > Partage > Session à distance
# Ton mot de passe administrateur sera demandé (c'est normal)
# -------------------------------------------------
echo "[1/3] Activation de l'accès à distance (SSH)..."
echo "      Permet à ChillShell de se connecter à CE Mac."
echo "      Ton mot de passe administrateur va être demandé."
echo ""
sudo systemsetup -setremotelogin on
echo ""
echo "      OK"
echo ""

# -------------------------------------------------
# ÉTAPE 2 : Vérifier que c'est activé
# On demande à macOS si le Remote Login est bien actif
# La réponse attendue est : "Remote Login: On"
# -------------------------------------------------
echo "[2/3] Vérification..."
echo "      On vérifie que SSH est bien activé."
REMOTE_LOGIN=$(sudo systemsetup -getremotelogin 2>&1)
echo "      $REMOTE_LOGIN"
echo ""

# -------------------------------------------------
# ÉTAPE 3 : Afficher l'adresse IP et le nom d'utilisateur
# On essaie en0 (WiFi) puis en1 (Ethernet) pour trouver l'IP
# L'utilisateur a besoin de ces infos pour se connecter depuis ChillShell
# -------------------------------------------------
echo "[3/3] Récupération de tes informations de connexion..."
echo ""

# Chercher l'IP sur WiFi (en0) puis Ethernet (en1)
IP=$(ipconfig getifaddr en0 2>/dev/null || ipconfig getifaddr en1 2>/dev/null || echo "Non trouvée — vérifie ta connexion réseau")

echo "============================================"
echo " INFORMATIONS POUR CHILLSHELL"
echo "============================================"
echo ""
echo " Ton adresse IP (entre-la dans ChillShell) :"
echo "    $IP"
echo ""
echo " Ton nom d'utilisateur :"
echo "    $(whoami)"
echo ""
echo "============================================"
echo " Dans ChillShell, connecte-toi avec :"
echo "    $(whoami)@$IP"
echo "============================================"
echo ""
echo " Installation terminée !"
echo ""
echo " Tu peux fermer cette fenêtre."
echo ""
