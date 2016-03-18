---
layout: article
title:  "Tests unitaires avec HBase"
date:   2016-03-16
categories: [big-data]
tags: [Hadoop, HBase, JUnit]
excerpt: Utilisation du mini-cluster Hadoop pour réaliser des tests JUnit avec HBase
image: /img/big-data.png
---

## Utilisation

Les sources sont disponibles sur [github](https://github.com/beeNotice/blog-sample)

## Remarques

### Version Hadoop

Sur la branche master de HBase la version d'hadoop est `<hadoop-two.version>2.7.1</hadoop-two.version>` mais sur la version [actuelle (1.2)](https://github.com/apache/hbase/blob/branch-1.2/pom.xml) elle n'est qu'en `2.5.1`.\\
Compte tenu de notre utilisation d'Hadoop la 2.5.1 est suffisante.
