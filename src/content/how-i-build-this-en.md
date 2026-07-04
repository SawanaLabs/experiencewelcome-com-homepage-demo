---
title: "How I Build This: Starting from a Figma Assignment"
description: "A build retrospective on turning a Figma landing page assignment into a maintainable, agent-ready front-end delivery system."
---

# How I Build This: Starting from a Figma Assignment

## Table of contents

- [0. The Future-facing AI Native Product Engineer](#0-the-future-facing-ai-native-product-engineer)
- [1. Starting from a Figma assignment](#1-starting-from-a-figma-assignment)
- [2. Starting to build the project](#2-starting-to-build-the-project)
  - [2.1 Building a project that can keep growing](#21-building-a-project-that-can-keep-growing)
  - [2.2 Leaving readable context for Agents](#22-leaving-readable-context-for-agents)
  - [2.3 Reading Figma like a requirement](#23-reading-figma-like-a-requirement)
  - [2.4 Pushing the design into a real page](#24-pushing-the-design-into-a-real-page)
  - [2.5 Catching the delivery with a verification loop](#25-catching-the-delivery-with-a-verification-loop)
- [3. What it became](#3-what-it-became)

## 0. The Future-facing AI Native Product Engineer

In the past, for a new member to really land in a project, there was usually a real cost of context transfer: part of it came from the team explaining things, and part of it came from that person reading code, reading docs, and running commands alone. Someone had to introduce the directory structure, someone had to explain why components were split in a certain way, and someone had to point out which commands were safe to run, which checks had to pass, and which areas should not be changed casually. The more mature a project became, the more knowledge it carried, and the heavier the context became for anyone entering it. Adding more people to a team did not automatically increase output. Communication, synchronization, and rework often created friction first.

When AI becomes part of a developer's daily workflow, another possibility appears. When a new member takes over a project, they may first ask AI: why was this feature implemented this way? What history and trade-offs led to this decision? What technology stack does the project use? If I need to change a module, which directory and which docs should I read first? AI becomes a context entry point for landing in the project. A good engineering practice therefore needs to serve both human developers and Coding Agents. Directories, docs, tests, quality gates, implementation habits, and verification paths should all help a new person or a new Agent session understand the project faster, know where to begin, and know how to judge whether the work is correct.

A more ideal state is this: after landing in the project, a new member does not need to spend a long time recovering hidden context. They can use code, docs, and AI to build a project map quickly, then add their own judgment on top of existing decisions. This new member can be a teammate or a freshly opened Agent session. After entering the project, both should be able to understand the product surface, the engineering constraints, and the decisions already made, then keep moving from that context.

To make that state real, at least two lines have to work at the same time.

The first line is project engineering practice. It covers every hard delivery asset in the repository: directory structure, actual code, components, styles, content, i18n, assets, docs, tests, and quality gates. Together, these materials become a set of team-specific best practices, so both human developers and Coding Agents can understand, modify, and verify the project through the same material. The value is not that the project looks more architectural. The point is that every later change has a clear place, boundary, and basis for judgment.

The second line is Agent Harness. Here, Harness can be understood as a mechanism for designing how an Agent works: it combines project context, skills, tools, verification habits, and delivery standards, telling the Agent how to understand a task, choose a path, implement the change, verify the result, and deliver the work result back to humans in a new session. Its goal is to put Agent autonomy onto a verifiable engineering track. An Agent needs to know the project's context, know which skills and tools are available, know how to extract constraints from Figma or a requirement, and know which checks to run, which pages to open, and which evidence to leave after implementation.

When both lines are strong enough, a very concrete business scenario appears: the team wants to add a new Landing Page, or adjust a section on the homepage. A human developer can understand the work quickly through docs, directories, and code. A Coding Agent can read the same context in a new session, find the same implementation entry point, and run the same verification flow. Project delivery moves away from hidden knowledge inside one person's head and toward a system that can be read, executed, and reused.

In this way of working, the role of the AI Native Product Engineer becomes concrete. They are first a user of this system: they use AI, code, and docs to understand the project and deliver a specific module or page. At the same time, they keep improving the delivery system, making the context, docs, best practices, and verification paths clearer so the next landing becomes easier.

These ideas did not start from an abstract concept. They came from a very specific implementation task. The task material was a static Figma visual reference, from a Community file that collected Awwwards 2024 websites, and the Experience homepage was the target to reproduce. The real goal was not just to match the visual result. It was to push a static page into an assessable front-end work: it needed reasonable responsive behavior, necessary interaction enhancement, multilingual content organization, and verifiable foundations for performance and SEO.

## 1. Starting from a Figma assignment

It was not a formal handoff with a complete design system, component notes, and interaction annotations. After opening the file, what appeared was a Community file containing multiple long homepage visuals placed side by side, and the Experience page was the specified implementation scope. It was more like a static visual reference: the page outcome was there, and the hierarchy, rhythm, colors, images, and text were visible, but many things that front-end implementation needs would not appear automatically.

For example, a page can be a very long visual mockup in Figma, but in the browser it needs to reflow across different widths. A button in the mockup can be only a shape and a line of text, but in the product it should have hover, active, focus, and mobile touch feedback. English content on the page can be copied visually, but the task also asks for multiple languages, so content organization cannot serve only the current visual. Performance and SEO are the same. They will not grow out of Figma layers, and they need to be brought into the engineering structure during implementation.

So the first step was not rushing into code. The more important step was to read the task clearly: Figma was the visual target, the Experience homepage was the boundary, and the final deliverable was a front-end work that could be opened, reviewed, tested, and maintained. This work needed to respect the original visual while also adding the responsive behavior, interaction, content structure, accessibility, performance, and verification evidence that static material naturally lacks.

That is where the task became interesting. On the surface, it looked like a Landing Page reproduction. After reading the requirements fully, it looked more like a compressed front-end delivery scenario. It asked the developer to use AI, while also asking them to explain which parts came from their own judgment, adjustment, and trade-off. In other words, AI participation itself became part of delivery quality. Generating code is not hard. The hard part is letting AI output enter an engineering process that can be reviewed, corrected, and verified.

Therefore, from the beginning, this project did not fit as a one-off page imitation. A better starting point was to treat Figma as the input, the webpage as the output, and the process that lets both humans and Agents understand, collaborate, and verify as the real system to build. The later project structure, docs, i18n, component boundaries, verification commands, and browser review all grew from this judgment.

## 2. Starting to build the project

This chapter enters the actual build process. It will move through time and judgment, showing how they started from an empty project and gradually built the repository, Harness, Figma reading process, page implementation, and verification loop.

### 2.1 Building a project that can keep growing

This section covers early project judgment: how the app structure, package management, docs system, i18n, component boundaries, asset management, and quality gates made the project maintainable.

### 2.2 Leaving readable context for Agents

This section explains Harness through the project: how Model, repository context, skills, and tools combine so an Agent can still work end to end in a new session.

### 2.3 Reading Figma like a requirement

This section covers how to inspect, scope, and read the Figma file, then turn design information into implementation constraints without treating raw coordinates as the final layout API.

### 2.4 Pushing the design into a real page

This section enters the actual development process: components, responsive layout, real assets, localized content, motion, interaction, and the specific trade-offs that happened during the build.

### 2.5 Catching the delivery with a verification loop

This section covers how to verify the result: tests, quality commands, browser checks, visual review, performance feedback, and deployment evidence form a loop.

## 3. What it became

This chapter closes the essay: the project ultimately became an agent-ready front-end delivery system for Landing Page work, while also distilling a method that can travel to other projects.
