# LinkedIn — texto del post

Tres versiones según gusto y largo. Las tres pensadas para ir junto al carrusel de 6 slides.

---

## Versión A — corta (≈ 500 caracteres)

> "Un cookie es la voz del usuario en el sitio. Que hable bien."
>
> Hace 30 años los cookies guardaron tu sesión. Hoy te escuchan, te ven, te anticipan. Nunca trabajaron para vos.
>
> AIcookies es la inversión: un cookie que piensa. Un agente del usuario que el sitio consulta — no un archivo que el sitio lee.
>
> v0.1 publicado: manifiesto, spec, implementación de referencia (MIT) y demo funcional.
>
> github.com/davidmusali87251/aicookies
>
> La idea es libre. La doctrina, también. El sello, certificable.
>
> Israel · 2026

---

## Versión B — media (≈ 900 caracteres)

> "Un cookie es la voz del usuario en el sitio. Que hable bien."
>
> Hace 30 años los cookies guardaron tu sesión. Hace 20, te siguieron. Hace 10, te perfilaron. Hoy te escuchan, te ven, te anticipan. Nunca trabajaron para vos — trabajaron para el sitio que los escribió.
>
> **AIcookies** es el cookie que piensa.
>
> No es un archivo que el sitio lee. Es un agente del usuario que el sitio consulta. El sitio recibe respuestas, no datos.
>
> Siete principios doctrinales, una API obligatoria, una implementación de referencia de ~270 líneas. Estándar abierto, sello certificable.
>
> v0.1 publicado:
> — Manifiesto bilingüe
> — Especificación técnica
> — Reference implementation (MIT)
> — Demo funcional en browser
>
> github.com/davidmusali87251/aicookies
>
> La idea es libre. La doctrina, también. El sello, certificable.
>
> Israel · 2026

---

## Versión C — larga (≈ 1.300 caracteres, casi tope LinkedIn sin "see more")

> "Un cookie es la voz del usuario en el sitio. Que hable bien."
>
> Hace 30 años los cookies guardaron tu sesión. Hace 20, te siguieron. Hace 10, te perfilaron. Hoy te escuchan, te ven, te anticipan.
>
> El cookie nunca trabajó para vos. Trabajó para el sitio que lo escribió.
>
> **AIcookies** es la inversión completa: un cookie que piensa. Un agente del usuario que el sitio consulta — no un archivo que el sitio lee.
>
> Cambia la dirección del flujo. El sitio ya no pide datos: le pregunta al agente. El agente decide qué responder. El sitio recibe respuestas, no datos.
>
> Siete principios — el cookie sirve al usuario, razona, negocia, sabe que el silencio es válido, cura su propia memoria, es local por default, es transparente.
>
> v0.1 publicado:
> — Manifiesto bilingüe (ES + EN)
> — Especificación técnica + API obligatoria
> — Implementación de referencia (~270 líneas, vanilla JS, MIT)
> — Demo funcional en browser, sin server, sin build
>
> github.com/davidmusali87251/aicookies
>
> La idea es libre. La doctrina, también. El sello, certificable.
>
> Israel · 2026.
>
> #privacy #aiagents #opensource #userdata

---

---

## Versiones v0.2 — arquitectura Custodian + Dian

*Actualizadas al pivote de cuatro piezas. Reemplazan A/B/C para publicaciones nuevas.*

### Versión corta (≈ 500 caracteres)

> "Un cookie es la voz del usuario en el sitio. Que hable bien."
>
> Hace 30 años los cookies guardaron tu sesión. Hoy te escuchan, te ven, te anticipan. Nunca trabajaron para vos.
>
> AIcookies es la inversión. Cuatro piezas: la doctrina, el protocolo abierto, el **Custodian** — el agente que administra tus cookies existentes —, y **Dian** — el módulo que razona. El único que piensa.
>
> v0.1 publicado: manifiesto, spec, implementación MIT y demo.
> Custodian y Dian: especificados, en diseño.
>
> github.com/davidmusali87251/aicookies
>
> La idea es libre. El sello, certificable.
>
> Israel · 2026

---

### Versión media (≈ 900 caracteres)

> "Un cookie es la voz del usuario en el sitio. Que hable bien."
>
> Hace 30 años los cookies guardaron tu sesión. Hace 20, te siguieron. Hace 10, te perfilaron. Hoy te escuchan, te ven, te anticipan. Nunca trabajaron para vos.
>
> **AIcookies** es la arquitectura que invierte eso. Cuatro piezas:
>
> — **La doctrina**: siete principios sobre quién trabaja para quién en la web.
> — **La spec**: el protocolo abierto entre el sitio y el agente del usuario.
> — **El Custodian**: el agente que vive en tu browser y administra las miles de cookies que ya tenés — sin esperar que ningún sitio cambie nada.
> — **Dian**: el módulo de razonamiento dentro del Custodian. El único que piensa. Clasifica, decide banners, cura la memoria, negocia valores. Cust·ODÍA·n: trae día a un dominio que fue oscuro treinta años.
>
> v0.1 publicado: manifiesto bilingüe, spec técnica, implementación MIT (~270 líneas), demo funcional.
> Custodian y Dian: especificados, en diseño.
>
> github.com/davidmusali87251/aicookies
>
> La idea es libre. La doctrina, también. El sello, certificable.
>
> Israel · 2026

---

## Notas de uso

- LinkedIn corta a ~210 caracteres antes del "see more". El primer párrafo (la tagline) tiene que sostenerse solo.
- El carrusel son 6 imágenes en orden: cover → problema → giro → 7 principios → es/no es → status.
- **Repo público:** https://github.com/davidmusali87251/aicookies — sumarlo al final del post (no en el carrusel, que queda atemporal). Ya está incluido en las versiones de arriba.
- Los hashtags al final son opcionales. El tono doctrinal funciona mejor sin ellos; si los usás, máximo 4.

## Texto alternativo (alt text) para accesibilidad

Para cargar en LinkedIn al subir cada imagen:

1. **Cover** — "Tagline en serif: 'Un cookie es la voz del usuario en el sitio. Que hable bien.' Marca AIcookies, versión 0.1, Israel 2026."
2. **Historia** — "Cuatro líneas: hace 30 años el cookie guardó tu sesión, hace 20 te siguió, hace 10 te perfiló, hoy te escucha. Nunca trabajó para vos."
3. **El giro** — "Tabla antes/ahora: el sitio pasa de pedir datos a preguntar al agente. Recibe respuestas, no datos."
4. **Siete principios** — "Lista numerada del 01 al 07: sirve al usuario, razona, negocia, silencio válido, cura memoria, local por default, transparente."
5. **Es / no es** — "Dos columnas. Es: agente bounded, local-first, doctrina, estándar abierto. No es: tracker, AI del sitio, wrapper ad-tech, producto cerrado."
6. **Closer** — "v0.1 publicado. Manifiesto, spec, implementación MIT, demo. La idea es libre, la doctrina también, el sello certificable. Selim David Musali, Israel 2026."
