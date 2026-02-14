# 🐚 ChillShell — Configurer SSH et Wake-on-LAN sur Windows

Guide complet pour préparer ton PC Windows à recevoir des connexions SSH depuis ChillShell et le réveiller à distance avec le Wake-on-LAN.

---

## 📡 Partie 1 — Installer et configurer OpenSSH

### Méthode graphique (interface Windows)

**Étape 1** — Ouvre les **Paramètres Windows**, puis va dans **Système** > **Fonctionnalités facultatives**.

**Étape 2** — Clique sur **« Afficher les fonctionnalités »**.

**Étape 3** — Clique sur **« Afficher les fonctionnalités disponibles »**.

**Étape 4** — Dans la barre de recherche, tape **« open »**. Coche les deux options :
- **Client OpenSSH** si elle n'est pas déjà activer, si pas disponible ---> cela veut dire que Client OpenSSH déjà activer.
- Puis ajoute **Serveur OpenSSH**
- Toujours activer d'abord **Client OpenSSH** en premier (IMPORTANT), **Serveur OpenSSH** ne s'ajoutera pas si **Client OpenSSH** n'est pas déjà activer.

**Étape 5** — **Redémarre ton PC** pour que l'installation prenne effet.

---

### Méthode terminal (PowerShell en administrateur)

Ouvre **PowerShell en tant qu'administrateur** (clic droit sur le menu Démarrer > Terminal Windows (Admin)).

**Installer le client et le serveur OpenSSH :**

```powershell
Add-WindowsCapability -Online -Name OpenSSH.Client~~~~0.0.1.0
Add-WindowsCapability -Online -Name OpenSSH.Server~~~~0.0.1.0
```

**Redémarre ton PC** pour que l'installation prenne effet.

---

### Activer le service SSH

Après le redémarrage, ouvre à nouveau **PowerShell en administrateur** et lance :

```powershell
Start-Service sshd
Set-Service -Name sshd -StartupType Automatic
```

La première commande démarre le service SSH immédiatement. La deuxième fait en sorte qu'il se lance automatiquement à chaque démarrage de Windows.

---

### Vérifier que tout fonctionne

**Vérifier que OpenSSH est bien installé :**

```powershell
Get-WindowsCapability -Online | Where-Object Name -like 'OpenSSH*'
```

Tu devrais voir `State : Installed` pour le client et le serveur.

**Vérifier que le service SSH tourne :**

```powershell
Get-Service sshd
```

Tu devrais voir `Status: Running`.

---

### Et le pare-feu ?

Bonne nouvelle : quand tu installes le **Serveur OpenSSH** via les fonctionnalités facultatives de Windows, la règle de pare-feu pour le port 22 est créée automatiquement. Tu n'as normalement rien à faire.

Pour vérifier que la règle existe bien :

```powershell
Get-NetFirewallRule -Name *ssh*
```

Si la règle apparaît, tout est bon. Si ce n'est pas le cas, tu peux la créer manuellement :

```powershell
New-NetFirewallRule -Name 'OpenSSH-Server' -DisplayName 'OpenSSH Server (sshd)' -Enabled True -Direction Inbound -Protocol TCP -Action Allow -LocalPort 22
```

---

## 🌐 Partie 2 — Trouver ton adresse MAC (pour le Wake-on-LAN)

L'adresse MAC est nécessaire pour réveiller ton PC à distance avec la fonctionnalité Wake-on-LAN de ChillShell.

### Méthode graphique (interface Windows)

**Étape 1** — Ouvre les **Paramètres Windows**, puis va dans **Réseau et Internet** > **Ethernet** (ou Wi-Fi selon ta connexion).

**Étape 2** — Descends tout en bas de la page. Tu trouveras la ligne :

> **Adresse physique (MAC) :** XX:XX:XX:XX:XX:XX

Note cette adresse, tu en auras besoin dans ChillShell.

### Méthode terminal

La commande la plus simple :

```powershell
getmac
```

Pour plus de détails (avec le nom de chaque adaptateur) :

```powershell
ipconfig /all
```

Cherche la ligne **« Adresse physique »** sous ton adaptateur réseau actif (Ethernet ou Wi-Fi).

---

## ✅ Récapitulatif

| Étape | Commande / Action |
|-------|-------------------|
| Installer OpenSSH | Fonctionnalités facultatives ou `Add-WindowsCapability` |
| Redémarrer le PC | Obligatoire après l'installation |
| Démarrer SSH | `Start-Service sshd` |
| Activer au démarrage | `Set-Service -Name sshd -StartupType Automatic` |
| Vérifier SSH | `Get-Service sshd` |
| Vérifier le pare-feu | `Get-NetFirewallRule -Name *ssh*` |
| Trouver l'adresse MAC | `getmac` ou Paramètres > Réseau > Ethernet |

---

> 💡 **Astuce** — Pour te connecter à ton PC depuis ChillShell, tu auras besoin de ton **adresse IP locale** (visible dans les paramètres réseau ou avec la commande `ipconfig`), de ton **nom d'utilisateur Windows** et de ton **mot de passe**.
