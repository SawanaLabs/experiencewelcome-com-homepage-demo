---
title: "How I Build This: desde una tarea de Figma"
description: "Una retrospectiva de construcción sobre cómo convertir una tarea de landing page en Figma en un sistema de entrega front-end mantenible y preparado para agentes."
---

# How I Build This: desde una tarea de Figma

## Índice

- [0. El AI Native Product Engineer orientado al futuro](#0-el-ai-native-product-engineer-orientado-al-futuro)
- [1. Empezar desde una tarea de Figma](#1-empezar-desde-una-tarea-de-figma)
- [2. Empezar a construir el proyecto](#2-empezar-a-construir-el-proyecto)
  - [2.1 Construir un proyecto que pueda seguir creciendo](#21-construir-un-proyecto-que-pueda-seguir-creciendo)
  - [2.2 Dejar contexto legible para los Agents](#22-dejar-contexto-legible-para-los-agents)
  - [2.3 Leer Figma como si fuera un requisito](#23-leer-figma-como-si-fuera-un-requisito)
  - [2.4 Llevar el diseño a una página real](#24-llevar-el-diseño-a-una-página-real)
  - [2.5 Sostener la entrega con un bucle de verificación](#25-sostener-la-entrega-con-un-bucle-de-verificación)
- [3. En qué terminó convirtiéndose](#3-en-qué-terminó-convirtiéndose)

## 0. El AI Native Product Engineer orientado al futuro

En el pasado, que una nueva persona aterrizara de verdad en un proyecto solía implicar un coste claro de transferencia de contexto: una parte venía de las explicaciones del equipo y otra de leer código, leer documentación y ejecutar comandos por cuenta propia. Alguien tenía que presentar la estructura de carpetas, alguien tenía que explicar por qué los componentes estaban separados de cierta manera, y alguien tenía que aclarar qué comandos se podían ejecutar, qué checks tenían que pasar y qué zonas no convenía tocar sin cuidado. Cuanto más maduro era el proyecto, más conocimiento acumulaba, y más pesado se volvía el contexto para quien entraba. Añadir gente al equipo no elevaba automáticamente la producción. La comunicación, la sincronización y el retrabajo solían aparecer primero como fricción.

Cuando la IA empieza a formar parte del flujo diario de los desarrolladores, aparece otra posibilidad. Cuando una nueva persona toma un proyecto, probablemente empiece preguntando a la IA: ¿por qué esta funcionalidad se implementó así? ¿Qué historia y qué decisiones hubo detrás? ¿Qué stack técnico usa el proyecto? Si hay que cambiar un módulo, ¿qué carpeta y qué documentos conviene mirar primero? La IA se convierte en una entrada de contexto para aterrizar en el proyecto. Por eso, una buena práctica de ingeniería debe servir tanto a desarrolladores humanos como a Coding Agents. Directorios, documentación, tests, quality gates, hábitos de implementación y rutas de verificación deberían ayudar a una persona nueva o a una nueva sesión de Agent a entender el proyecto más rápido, saber por dónde empezar y saber cómo juzgar si el trabajo está bien hecho.

Un estado más ideal sería este: después de aterrizar en el proyecto, una nueva persona no necesita pasar mucho tiempo reconstruyendo contexto implícito. Puede usar código, documentación e IA para formar rápidamente un mapa del proyecto y luego aportar su propio criterio encima de las decisiones existentes. Esa nueva persona puede ser un colega o una sesión nueva de Agent. Al entrar al proyecto, ambos deberían poder entender la superficie del producto, las restricciones de ingeniería y las decisiones ya tomadas, y seguir avanzando desde ese contexto.

Para que ese estado exista, al menos dos líneas tienen que funcionar al mismo tiempo.

La primera línea es la práctica de ingeniería del proyecto. Cubre todo el material duro que participa en la entrega dentro del repositorio: estructura de carpetas, código concreto, componentes, estilos, contenido, i18n, assets, documentación, tests y quality gates. Todo esto se convierte en un conjunto de mejores prácticas propias del equipo, de modo que desarrolladores humanos y Coding Agents puedan entender, modificar y verificar el proyecto usando el mismo material. Su valor no está en que el proyecto parezca más arquitectónico. El punto es que cada cambio posterior tenga una ubicación, un límite y una base de juicio claros.

La segunda línea es el Agent Harness. Aquí, Harness puede entenderse como un mecanismo para diseñar el comportamiento de trabajo de un Agent: combina contexto del proyecto, skills, tools, hábitos de verificación y estándares de entrega para decirle al Agent cómo entender una tarea, elegir un camino, ejecutar la implementación, verificar el resultado y entregar el trabajo a los humanos en una sesión nueva. Su objetivo es poner la autonomía del Agent dentro de una pista de ingeniería verificable. Un Agent necesita conocer el contexto del proyecto, saber qué skills y tools puede usar, saber cómo extraer restricciones de Figma o de un requisito, y saber qué checks ejecutar, qué páginas abrir y qué evidencia dejar al terminar.

Cuando estas dos líneas funcionan lo bastante bien, aparece un escenario de negocio muy concreto: el equipo quiere añadir una nueva Landing Page o ajustar una sección del homepage. Un desarrollador humano puede entender el trabajo rápido a través de docs, directorios y código. Un Coding Agent también puede leer el mismo contexto en una sesión nueva, encontrar la misma entrada de implementación y ejecutar el mismo flujo de verificación. La entrega del proyecto deja de depender del conocimiento implícito en la cabeza de una persona y pasa a depender de un sistema que puede leerse, ejecutarse y reutilizarse.

En esta forma de trabajar, el rol de AI Native Product Engineer empieza a volverse concreto. Primero es una persona usuaria de este sistema: usa IA, código y documentación para entender el proyecto y entregar un módulo o una página específica. Al mismo tiempo, mejora continuamente el sistema de entrega, ordenando mejor el contexto, la documentación, las mejores prácticas y las rutas de verificación para que el siguiente aterrizaje sea más fácil.

Estas ideas no empezaron desde un concepto abstracto. Nacieron de una tarea de implementación muy concreta. El material de la tarea era una referencia visual estática de Figma, tomada de un archivo Community que recopilaba sitios de Awwwards 2024, y el homepage de Experience era el objetivo a reproducir. El objetivo real no consistía solo en igualar la imagen. Había que empujar una página estática hasta convertirla en una pieza front-end evaluable: con comportamiento responsive razonable, mejoras de interacción necesarias, organización de contenido multilingüe y bases verificables de rendimiento y SEO.

## 1. Empezar desde una tarea de Figma

No era un handoff formal con un sistema de diseño completo, notas de componentes y anotaciones de interacción. Al abrir el archivo, aparecía un archivo Community con varias páginas de homepage largas colocadas una al lado de otra, y la página Experience era el alcance definido para implementar. Se parecía más a una referencia visual estática: el resultado visual de la página ya estaba ahí, y se podían ver la jerarquía, el ritmo, los colores, las imágenes y el texto, pero muchas cosas necesarias para entrar en implementación front-end no aparecían automáticamente.

Por ejemplo, una página en Figma puede ser un mockup visual muy largo, pero en el navegador necesita reacomodarse en distintos anchos. Un botón en el mockup puede ser solo una forma y una línea de texto, pero en el producto debería tener hover, active, focus y feedback táctil en móvil. El contenido en inglés de la página puede copiarse visualmente, pero la tarea también pide varios idiomas, así que la organización del contenido no puede servir solo a esa imagen concreta. Rendimiento y SEO funcionan igual. No salen de las capas de Figma, y hay que introducirlos activamente en la estructura de ingeniería durante la implementación.

Así que el primer paso no fue ponerse a escribir código a toda prisa. Lo más importante era leer bien la tarea: Figma era el objetivo visual, el homepage de Experience era el límite, y el entregable final era una pieza front-end que pudiera abrirse, revisarse, probarse y mantenerse. Esa pieza tenía que respetar la visual original y también completar lo que el material estático no trae por naturaleza: responsive, interacción, contenido, accesibilidad, rendimiento y evidencia de verificación.

Ahí fue donde la tarea empezó a volverse interesante. En la superficie parecía una reproducción de Landing Page. Después de leer los requisitos completos, se parecía más a un escenario comprimido de entrega front-end. Pedía al desarrollador usar IA, y a la vez pedía explicar qué partes pasaron por su propio criterio, ajuste y decisión. En otras palabras, la participación de la IA también se volvió parte de la calidad de entrega. Generar código no es difícil. Lo difícil es hacer que la salida de la IA entre en un proceso de ingeniería que pueda revisarse, corregirse y verificarse.

Por eso, desde el principio, este proyecto no encajaba como una simple imitación de página para usar una sola vez. Un punto de partida más sólido era tratar Figma como entrada, la web como resultado, y el proceso que permite a humanos y Agents entender, colaborar y verificar como el sistema real que había que construir. La estructura del proyecto, la documentación, i18n, los límites de componentes, los comandos de verificación y la revisión en navegador crecieron a partir de ese juicio.

## 2. Empezar a construir el proyecto

Este capítulo entra en el proceso real de construcción. Avanzará por tiempo y criterio, mostrando cómo se partió de un proyecto vacío para construir gradualmente el repositorio, el Harness, la lectura de Figma, la implementación de la página y el bucle de verificación.

### 2.1 Construir un proyecto que pueda seguir creciendo

Aquí se explican las decisiones tempranas del proyecto: cómo la estructura de la app, la gestión de paquetes, el sistema de documentación, i18n, los límites de componentes, la gestión de assets y los quality gates dieron mantenibilidad al proyecto.

### 2.2 Dejar contexto legible para los Agents

Aquí se explica Harness a través del proyecto: cómo Model, repository context, skills y tools se combinan para que un Agent pueda trabajar de extremo a extremo en una sesión nueva.

### 2.3 Leer Figma como si fuera un requisito

Aquí se explica cómo inspeccionar, acotar y leer el archivo de Figma, y cómo convertir información de diseño en restricciones de implementación sin tratar coordenadas originales como la API final de layout.

### 2.4 Llevar el diseño a una página real

Aquí se entra en el desarrollo real: componentes, layout responsive, assets reales, contenido localizado, motion, interacción y las decisiones concretas que aparecieron durante la construcción.

### 2.5 Sostener la entrega con un bucle de verificación

Aquí se explica cómo verificar el resultado: tests, comandos de calidad, checks en navegador, revisión visual, feedback de rendimiento y evidencia de despliegue formando un bucle.

## 3. En qué terminó convirtiéndose

Este capítulo cierra el texto: el proyecto terminó convirtiéndose en un sistema de entrega front-end agent-ready para trabajos de Landing Page, y también dejó una metodología que puede trasladarse a otros proyectos.
