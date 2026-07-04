---
title: "How I Build This : partir d'une mission Figma"
description: "Une rétrospective de construction sur la manière de transformer une mission de landing page Figma en système de livraison front-end maintenable et prêt pour les agents."
---

# How I Build This : partir d'une mission Figma

## Sommaire

- [0. L'AI Native Product Engineer tourné vers l'avenir](#0-lai-native-product-engineer-tourné-vers-lavenir)
- [1. Partir d'une mission Figma](#1-partir-dune-mission-figma)
- [2. Commencer à construire le projet](#2-commencer-à-construire-le-projet)
  - [2.1 Construire un projet qui peut continuer à grandir](#21-construire-un-projet-qui-peut-continuer-à-grandir)
  - [2.2 Laisser un contexte lisible aux Agents](#22-laisser-un-contexte-lisible-aux-agents)
  - [2.3 Lire Figma comme un besoin](#23-lire-figma-comme-un-besoin)
  - [2.4 Faire avancer la maquette vers une vraie page](#24-faire-avancer-la-maquette-vers-une-vraie-page)
  - [2.5 Soutenir la livraison avec une boucle de vérification](#25-soutenir-la-livraison-avec-une-boucle-de-vérification)
- [3. Ce que le projet est devenu](#3-ce-que-le-projet-est-devenu)

## 0. L'AI Native Product Engineer tourné vers l'avenir

Auparavant, lorsqu'une nouvelle personne devait vraiment atterrir dans un projet, cela impliquait souvent un coût de transmission du contexte : une partie venait des explications de l'équipe, une autre de la lecture du code, de la documentation et des commandes à exécuter soi-même. Il fallait quelqu'un pour présenter la structure des dossiers, quelqu'un pour expliquer pourquoi les composants étaient découpés ainsi, quelqu'un pour dire quelles commandes lancer, quels contrôles devaient passer et quelles zones ne devaient pas être modifiées à la légère. Plus un projet était mature, plus il portait de connaissances, et plus le contexte à absorber devenait lourd pour les nouveaux arrivants. Ajouter des personnes à l'équipe n'augmentait pas immédiatement la production. La communication, la synchronisation et le retravail créaient souvent de la friction avant toute amélioration.

Lorsque l'IA entre dans le quotidien des développeurs, une autre possibilité apparaît. Quand une nouvelle personne reprend un projet, elle peut commencer par poser des questions à l'IA : pourquoi cette fonctionnalité est-elle implémentée ainsi ? Quel historique et quels arbitrages ont conduit à ce choix ? Quelle stack technique le projet utilise-t-il ? Si un module doit être modifié, quel dossier et quels documents faut-il lire d'abord ? L'IA devient une entrée de contexte pour atterrir dans le projet. Une bonne pratique d'ingénierie doit donc servir à la fois les développeurs humains et les Coding Agents. Les dossiers, la documentation, les tests, les quality gates, les habitudes d'implémentation et les chemins de vérification devraient aider une nouvelle personne ou une nouvelle session d'Agent à comprendre le projet plus vite, savoir par où commencer et savoir comment juger si le travail est correct.

Un état plus idéal ressemble à ceci : après son arrivée dans le projet, une nouvelle personne n'a pas besoin de passer longtemps à reconstituer un contexte implicite. Elle peut utiliser le code, la documentation et l'IA pour construire rapidement une carte du projet, puis apporter son propre jugement au-dessus des décisions existantes. Cette nouvelle personne peut être un collègue ou une nouvelle session d'Agent. Une fois dans le projet, les deux devraient pouvoir comprendre la surface produit, les contraintes d'ingénierie et les décisions déjà prises, puis continuer à avancer à partir de ce contexte.

Pour atteindre cet état, au moins deux lignes doivent fonctionner ensemble.

La première ligne est la pratique d'ingénierie du projet. Elle couvre tout le contenu dur qui participe réellement à la livraison dans le dépôt : structure de dossiers, code concret, composants, styles, contenu, i18n, assets, documentation, tests et quality gates. Ensemble, ces éléments deviennent un ensemble de bonnes pratiques propres à l'équipe, permettant aux développeurs humains et aux Coding Agents de comprendre, modifier et vérifier le projet avec les mêmes matériaux. Sa valeur ne réside pas dans l'apparence plus architecturée du projet. L'enjeu est que chaque modification future dispose d'un emplacement, d'une limite et d'une base de jugement clairs.

La deuxième ligne est l'Agent Harness. Ici, Harness peut se comprendre comme un mécanisme qui conçoit le comportement de travail d'un Agent : il combine contexte du projet, skills, tools, habitudes de vérification et standards de livraison, puis indique à l'Agent comment comprendre une tâche, choisir une voie, réaliser l'implémentation, vérifier le résultat et livrer le travail aux humains dans une nouvelle session. Son objectif est de placer l'autonomie de l'Agent sur une trajectoire d'ingénierie vérifiable. Un Agent doit connaître le contexte du projet, savoir quelles skills et quels tools utiliser, savoir extraire les contraintes depuis Figma ou depuis une demande, puis savoir quels checks lancer, quelles pages ouvrir et quelles preuves laisser une fois l'implémentation terminée.

Quand ces deux lignes fonctionnent suffisamment bien, un scénario métier très concret apparaît : l'équipe veut ajouter une Landing Page ou ajuster une section de la page d'accueil. Un développeur humain peut comprendre rapidement le travail grâce aux docs, aux dossiers et au code. Un Coding Agent peut lire le même contexte dans une nouvelle session, trouver le même point d'entrée d'implémentation et exécuter le même flux de vérification. La livraison du projet quitte la dépendance à la connaissance implicite dans la tête d'une seule personne et s'appuie sur un système lisible, exécutable et réutilisable.

Dans cette manière de travailler, le rôle d'AI Native Product Engineer devient concret. Cette personne est d'abord utilisatrice du système : elle utilise l'IA, le code et la documentation pour comprendre le projet et livrer un module ou une page précise. En même temps, elle améliore continuellement le système de livraison, en clarifiant le contexte, la documentation, les bonnes pratiques et les chemins de vérification pour faciliter le prochain atterrissage.

Ces idées ne sont pas parties d'un concept abstrait. Elles viennent d'une tâche d'implémentation très concrète. Le matériau de départ était une référence visuelle Figma statique issue d'un fichier Community regroupant des sites Awwwards 2024, et la page d'accueil Experience était la cible à reproduire. Le vrai objectif ne consistait pas seulement à copier l'image. Il fallait pousser une page statique vers un livrable front-end évaluable : avec un comportement responsive raisonnable, les améliorations d'interaction nécessaires, une organisation de contenu multilingue et des bases vérifiables pour la performance et le SEO.

## 1. Partir d'une mission Figma

Ce n'était pas un handoff formel avec un design system complet, des notes de composants et des annotations d'interaction. En ouvrant le fichier, on voyait un fichier Community contenant plusieurs longues pages d'accueil placées côte à côte, et la page Experience était le périmètre à implémenter. Cela ressemblait davantage à une référence visuelle statique : le résultat visuel de la page était là, la hiérarchie, le rythme, les couleurs, les images et le texte étaient visibles, mais beaucoup d'éléments nécessaires à l'implémentation front-end n'apparaissaient pas automatiquement.

Par exemple, une page peut être une très longue maquette visuelle dans Figma, mais dans le navigateur elle doit se réorganiser selon différentes largeurs. Un bouton dans la maquette peut être seulement une forme et une ligne de texte, mais dans le produit il devrait avoir des états hover, active, focus et un retour tactile sur mobile. Le contenu anglais de la page peut être reproduit visuellement, mais la tâche demande aussi plusieurs langues, ce qui signifie que l'organisation du contenu ne peut pas servir uniquement cette image actuelle. La performance et le SEO fonctionnent de la même façon. Ils ne sortent pas des calques Figma et doivent entrer volontairement dans la structure d'ingénierie pendant l'implémentation.

La première étape n'était donc pas de se précipiter dans le code. Le plus important était de bien lire la tâche : Figma était la cible visuelle, la page d'accueil Experience était la limite, et le livrable final était une pièce front-end pouvant être ouverte, examinée, testée et maintenue. Cette pièce devait respecter le visuel original tout en ajoutant le responsive, l'interaction, le contenu, l'accessibilité, la performance et les preuves de vérification que le matériau statique ne fournit pas naturellement.

C'est là que la tâche devenait intéressante. En surface, elle ressemblait à une reproduction de Landing Page. Après lecture complète des attentes, elle ressemblait davantage à un scénario condensé de livraison front-end. Elle demandait au développeur d'utiliser l'IA, tout en exigeant d'expliquer quelles parties relevaient de son propre jugement, de ses ajustements et de ses arbitrages. Autrement dit, la participation de l'IA devenait elle-même une partie de la qualité de livraison. Générer du code n'est pas difficile. Le vrai défi est de faire entrer la production de l'IA dans un processus d'ingénierie révisable, corrigeable et vérifiable.

Ainsi, dès le départ, ce projet ne se prêtait pas à une simple imitation de page jetable. Le point de départ le plus solide était de traiter Figma comme l'entrée, la page web comme le produit, et le processus permettant aux humains et aux Agents de comprendre, collaborer et vérifier comme le véritable système à construire. La structure du projet, la documentation, l'i18n, les limites de composants, les commandes de vérification et la revue dans le navigateur ont toutes découlé de ce jugement.

## 2. Commencer à construire le projet

Ce chapitre entre dans le processus réel de construction. Il avancera selon le temps et les décisions, en montrant comment partir d'un projet vide pour construire progressivement le dépôt, le Harness, la lecture de Figma, l'implémentation de la page et la boucle de vérification.

### 2.1 Construire un projet qui peut continuer à grandir

Cette section présente les premiers choix du projet : comment la structure de l'application, la gestion des paquets, le système documentaire, l'i18n, les limites de composants, la gestion des assets et les quality gates ont rendu le projet maintenable.

### 2.2 Laisser un contexte lisible aux Agents

Cette section explique Harness à travers le projet : comment Model, repository context, skills et tools se combinent pour qu'un Agent puisse travailler de bout en bout dans une nouvelle session.

### 2.3 Lire Figma comme un besoin

Cette section explique comment inspecter, cadrer et lire le fichier Figma, puis convertir les informations de design en contraintes d'implémentation sans traiter les coordonnées brutes comme l'API finale de layout.

### 2.4 Faire avancer la maquette vers une vraie page

Cette section entre dans le développement réel : composants, layout responsive, assets réels, contenu localisé, motion, interactions et arbitrages concrets apparus pendant la construction.

### 2.5 Soutenir la livraison avec une boucle de vérification

Cette section explique comment vérifier le résultat : tests, commandes qualité, contrôle navigateur, revue visuelle, retours de performance et preuves de déploiement forment une boucle.

## 3. Ce que le projet est devenu

Ce chapitre referme le texte : le projet est finalement devenu un système de livraison front-end agent-ready pour les travaux de Landing Page, tout en faisant émerger une méthode transférable.
