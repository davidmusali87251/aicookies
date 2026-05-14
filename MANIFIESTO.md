# AIcookies — Manifiesto

> **Un cookie es la voz del usuario en el sitio.
> Que hable bien.**

---

## Hoy

Hace treinta años, los cookies guardaron tu sesión.
Hace veinte, te siguieron.
Hace diez, te perfilaron.
Hoy te escuchan, te ven, te anticipan.

Cada app genera más. Cada banner pide más.
¿Pediste alguna vez algo de eso? No.

**El cookie nunca trabajó para vos. Trabajó para el sitio que lo escribió.**

---

## El giro

**AIcookies no es un cookie.** Es la arquitectura que invierte quién trabaja para quién en la web.

Cuatro piezas, una sola doctrina:

| Pieza | Qué es | Dónde vive |
|---|---|---|
| **La doctrina** | Los siete principios | En este documento |
| **La spec** | El protocolo abierto entre sitio y agente | En `SPEC.md` |
| **El Custodian** | El cuerpo · administra las cookies que ya existen | En el browser · `CUSTODIAN.md` |
| **Dian** | La mente · razona, decide, hace inteligentes a las cookies | Dentro del Custodian · `DIAN.md` |

El sitio ya no lee tus cookies. Le habla al Custodian. El Custodian, cuando necesita pensar, le pregunta a Dian.

| Antes | Ahora |
|---|---|
| El sitio pide datos | El sitio le pregunta al Custodian |
| El usuario acepta o rechaza | El Custodian decide qué responder |
| El sitio recibe **datos** | El sitio recibe **respuestas** |

**El cookie pasivo te recordaba. El Custodian te representa.**

---

## Los siete principios

1. **El cookie sirve al usuario, no al sitio.**
2. **El cookie razona, no solo guarda.**
3. **El cookie negocia, no entrega.**
4. **El silencio es respuesta válida.**
5. **El cookie cura su propia memoria — borra lo que ya no aplica.**
6. **Local por default. El cloud es excepción explícita.**
7. **El cookie es transparente — siempre se le puede preguntar qué sabe y qué hizo.**

---

## El Custodian

El Custodian es la pieza que faltaba — y la que vuelve real al resto.

No reemplaza a las cookies que ya tenés. Las **administra**. Vive en tu browser, lee las miles de cookies que cualquier sitio dejó ahí durante años, las clasifica, decide los banners por vos, cura lo que ya no aplica. Es **la hermana mayor** de tu memoria persistente en la web — el único agente con vista completa y responsabilidad sobre ella.

En el nombre vive la función. **Cust·ODÍA·n** carga un *día* adentro: trae luz a un dominio que durante treinta años fue oscuro para el usuario.

Lo que hace:

- **Lee** las cookies que cualquier sitio ya dejó en tu browser.
- **Clasifica** con LLM: esencial · funcional · tracker · ad · desconocido.
- **Decide** los banners por vos, según los principios que le guardaste.
- **Negocia** valores generalizados cuando puede (rango de edad en lugar de fecha exacta).
- **Cura** la memoria — borra lo que ya no aplica, sin pedir permiso al sitio que lo puso.
- **Habla la spec AIcookies** con sitios que la implementan.

Local-first. La doctrina no se negocia.

Adentro del Custodian vive **Dian** — el módulo de razonamiento. Dian no toca cookies, no clickea botones, no habla con sitios. Dian sólo piensa: clasifica, decide, traduce, negocia. Es el único componente del proyecto cuya tarea es **pensar**, y por eso es el que hace inteligentes a las cookies.

Especificación del cuerpo en `CUSTODIAN.md` · de la mente en `DIAN.md`.

---

## Lo que AIcookies ES

- Una **doctrina** sobre quién trabaja para quién en la web.
- Un **protocolo abierto** entre sitios y agentes (la spec).
- Un **agente del usuario** (el Custodian) que encarna la doctrina y administra las cookies que ya existen.

## Lo que AIcookies NO ES

- Un tracker mejor.
- Un AI que trabaja para el sitio.
- Un wrapper para ad-tech.
- Un producto cerrado.

---

## Llamado

AIcookies es estándar **abierto**. La idea es libre.
La implementación se construye en comunidad.
La certificación de doctrina se obtiene de quien la escribió.

- Si sos **engineer**: implementá. La spec está abierta. El Custodian es la primera implementación de referencia del lado-usuario.
- Si sos **comerciante**: respetá. El usuario lo nota.
- Si sos **usuario**: instalá el Custodian. Es tu data, ahora con representante.

---

## Linaje

AIcookies pertenece a la **familia de agentes** bajo doctrina **Kairo** — la presencia bounded heredada del proyecto SlipUP Observatory. Comparte raíz con Elías, Ruti, los sobrinos. Su rol es de **infraestructura** (atiende a otros agentes y al usuario), no de cara.

El Custodian es el primer Kairo del lado-usuario en la web. Dian, dentro de él, es el primer Kairo cuyo único trabajo es pensar.

---

**Firma**
Selim David Musali, autor.
Israel — 2026.

*v0.2 · arquitectura de tres piezas (doctrina · spec · Custodian)*
