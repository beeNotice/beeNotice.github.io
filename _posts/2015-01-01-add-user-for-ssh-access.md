---
layout: article
title:  "Ajout d'un nouvel utilisateur pour une connexion SSH"
date:   2015-01-01
categories: [system]
tags: [linux]
excerpt: Actions à réaliser pour permettre à un utilisateur une connexion via clé SSH
image: /img/system.png
---

## Création de l'utilisateur

{% highlight bash %}

sudo useradd fmartin
sudo passwd fmartin

{% endhighlight %}

## Autorisation de l'utilisateur pour une connexion SSH

On le fait à la main, mais il est aussi possible d'utiliser des <code>ssh-copy-id</code>, ou des <code>ssh-keygen</code>

{% highlight bash %}

sudo mkdir /home/fmartin/.ssh
sudo vi /home/fmartin/.ssh/authorized_keys
	=> Coller la clé publique

sudo chown -R fmartin:fmartin /home/fmartin/.ssh
sudo chmod 700 /home/fmartin/.ssh
sudo chmod 600 /home/fmartin/.ssh/authorized_keys

vi /etc/ssh/sshd_config
	=> AllowUsers fmartin

sudo service sshd reload

{% endhighlight %}

## Ajout de l'utilisateur dans les sudoers

{% highlight bash %}

# Utiliser NOPASSWD ou PASSWD
sudo vi /etc/sudoers.d/fmartin
	=> fmartin                 ALL=(ALL) PASSWD: ALL

sudo chmod 440 /etc/sudoers.d/fmartin

# Liste des sudoers
sudo visudo -c

{% endhighlight %}

## Notes

En cas de soucis, les logs de connexion sont visibles dans <code>/var/log/secure</code>