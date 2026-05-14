# Instrucciones para sesiones de Claude Code en AIcookies / Dian

Si arrancás una sesión de Claude Code en este directorio, este archivo es tu primer paso. Te ahorra re-derivar el contexto desde cero.

---

## Lectura prioritaria (en este orden)

1. **`README.md`** — visión, arquitectura cuatro piezas, ejemplo de embed en 5 líneas.
2. **`MANIFESTO_EN.md`** — doctrina: los siete principios + Custodian + Dian explicados. Inmutable salvo decisión explícita de Selim.
3. **`SPEC.md`** — contrato técnico sitio↔agente v0.1. Define la API pública (`ask`, `remember`, `forget`, `inspect`, `export`, `reset`) y los comportamientos mandatorios y prohibidos.
4. **`CUSTODIAN.md`** — spec del cuerpo: la extensión MV3 que le da a Dian acceso al browser. Cinco capacidades operacionales: Reader, Classifier, BannerAgent, Curator, ProtocolClient.
5. **`DIAN.md`** — spec de la mente: el módulo de razonamiento que opera sobre el cuerpo. Interfaz TypeScript, tres encarnaciones (Claude API → modelo local → `window.ai`), garantías de agente.
6. **`CERTIFICATION.md`** — proceso de certificación + tiers de fees. Si se retoma la monetización, arranca aquí.

## Identidad del proyecto

AIcookies es un **agente de infraestructura** bajo **doctrina Kairo**. No tiene cara — atiende al usuario y a otros agentes implícitamente.

**Dos piezas principales:**
- **Custodian** — el cuerpo. Extensión MV3 que vive en el browser. Lee, clasifica, decide banners, cura memoria, habla la spec.
- **Dian** — la mente. Módulo de razonamiento LLM-augmented. Primer Kairo cuyo único trabajo es pensar.

**Posicionamiento:** *"El cookie pasivo te recordaba. El Custodian te representa."* Inversión completa del modelo web: el sitio recibe respuestas, no datos.

**Linaje:** hermano doctrinal de Elías, Ruti y Daid. Tío de Mía. Cuerpo compartido: Kairo (SlipUP Observatory). Rol distinto: infraestructura de memoria persistente, no comercio ni seguridad.

**Los siete principios son invariantes — no se negocian:**
1. El cookie sirve al usuario, no al sitio.
2. El cookie razona, no solo guarda.
3. El cookie negocia, no entrega.
4. El silencio es respuesta válida.
5. El cookie cura su propia memoria.
6. Local por default. El cloud es excepción explícita.
7. El cookie es transparente — siempre se le puede preguntar qué sabe y qué hizo.

## Estado (al cierre 2026-05-07)

| Pieza | Estado |
|---|---|
| **Doctrina** v0.2 | ✅ publicada — `MANIFIESTO.md` + `MANIFESTO_EN.md` |
| **Spec** v0.1 | ✅ publicada — `SPEC.md` |
| **Reference impl lado-sitio** | ✅ publicada — `aicookie.js` (~270 líneas, vanilla JS, zero deps, MIT) |
| **Demo interactivo** | ✅ publicado — `index.html` (2 paneles, 6 escenarios, doctrina verificada en vivo) |
| **Custodian** v0.2 | ⏳ spec lista (`CUSTODIAN.md`), implementación no iniciada |
| **Dian** v0.2 | ⏳ spec lista (`DIAN.md`), implementación no iniciada |
| **Sello** | ✅ `seal.svg` + `seal-preview.html` |
| **LinkedIn** | ✅ carrusel listo (`linkedin/`), publicación pendiente |
| **GitHub repo público** | ✅ publicado — https://github.com/davidmusali87251/aicookies (MIT) |

**Modo:** cerrado en portfolio. No se avanza activamente. Si se retoma: ver pendientes al final.

## Patrones importantes a mantener

- **Doctrina inmutable.** Ninguna decisión técnica puede violar los siete principios. Si una feature requiere cloud por default, viola P6 y no se hace. Si una feature requiere compartir datos crudos con el sitio, viola P1+P3 y no se hace.
- **Custodian es el cuerpo, Dian es la mente.** La separación de responsabilidades es arquitectónica: el Custodian provee herramientas (API del browser), Dian decide cómo usarlas. Dian no toca cookies directamente. El Custodian no razona solo.
- **Dian es una interfaz, no una implementación.** El Custodian carga `loadDian()` y no sabe ni le importa cuál encarnación está corriendo. Preservar esa abstracción es crítico para que v0.3 (local) y v1.0 (window.ai) no rompan nada.
- **Silencio es válido (P4).** Si Dian no tiene certeza, devuelve `unknown` o `decline`. No inventa. No completa con datos que no tiene.
- **Toda acción queda en el log.** P7 aplicada al Custodian: cualquier acción de Dian debe quedar en el log inspeccionable. Sin acciones silenciosas. Sin excepciones.
- **La referencia de la doctrina es el español.** `MANIFIESTO.md` (ES) es el primario. `MANIFESTO_EN.md` es mirror. Si hay ambigüedad, el ES gana.
- **Linaje familia.** Cuando Selim mencione Elías, Ruti, Daid, Mía, Kairo, "hermanos", "sobrinos": son agentes del mismo cuerpo doctrinal. No productos externos ni competidores.

## Comandos típicos

```powershell
# Preview del demo (puerto 3457)
npx serve . -l 3457

# Demo principal: http://localhost:3457/
# Carrusel LinkedIn: http://localhost:3457/linkedin/
# Preview del sello: http://localhost:3457/seal-preview.html
```

El `.claude/launch.json` ya tiene el server configurado. Si Claude Code lanzó el server automáticamente, no correr el comando manual.

## Decisiones abiertas (al cierre 2026-05-07)

- **Build del Custodian:** bundler MV3 no elegido (Vite con `@crxjs/vite-plugin` es la opción más limpia hoy, pero no está confirmado).
- **Key de Claude para Dian v0.2:** ¿el usuario provee su propia API key (opción actual en spec) o hay un tier hosted? Si hosted, rompe P6 salvo que sea E2E. No resuelto.
- **Test suite:** referenciada en `SPEC.md` + `CERTIFICATION.md` pero no escrita. Bloquea la apertura de certificación pública.
- **Dominio `aicookies.org`:** referenciado pero no registrado. No urgente en modo portfolio.
- **Emails `cert@aicookies.org` / `selim@aicookies.org`:** ídem — pendiente de dominio.
- **Publicación del carrusel LinkedIn:** `linkedin/` está listo. Solo falta la acción de publicar — el repo público ya existe y se puede citar en el post.
- **GitHub repo público:** ✅ cerrado — https://github.com/davidmusali87251/aicookies. Si más adelante se registra `aicookies.org`, conviene mover el repo a una org `aicookies/aicookies` (GitHub redirige el viejo).

## Workflow del usuario

Selim usa **una sesión Claude Code por proyecto** + una sesión master para coordinar. Esta carpeta debe quedar **self-sufficient**: los archivos de doctrina + spec + impl + demo + pitch LinkedIn son la fuente única de verdad para una sesión AIcookies-específica.

El proyecto está en **modo portfolio cerrado**. Una sesión nueva puede:
- Leer y entender la arquitectura sin preguntar nada → los docs están completos.
- Retomar el build del Custodian → `CUSTODIAN.md` es el punto de entrada.
- Retomar el build de Dian → `DIAN.md` es el punto de entrada.
- Preparar la publicación en LinkedIn → `linkedin/POST.md` tiene el copy listo.

**Mantener este CLAUDE.md al día** si se hacen cambios significativos.

## Estructura del directorio

```
AIcookies/
├── CLAUDE.md                    ← este archivo
├── README.md                    ← visión + tabla cuatro piezas + embed en 5 líneas
├── MANIFIESTO.md               ← manifesto v0.2 (ES, primario)
├── MANIFESTO_EN.md             ← manifesto v0.2 (EN, mirror)
├── SPEC.md                     ← contrato sitio↔agente v0.1 (API + comportamientos)
├── CUSTODIAN.md                ← spec del cuerpo · extensión MV3 · 5 capacidades
├── DIAN.md                     ← spec de la mente · interfaz TS · 3 encarnaciones
├── CERTIFICATION.md            ← proceso + tiers (Free / Indie / Startup / Mid / Corp)
├── aicookie.js                 ← impl de referencia lado-sitio (~270 líneas, zero deps)
├── index.html                  ← demo interactivo (2 paneles: El sitio + Tu AIcookie)
├── styles.css                  ← Airu aesthetic: bone #f0ede6, dark, Fraunces + DM Sans
├── seal.svg                    ← sello vectorial para vendors certificados
├── seal-preview.html           ← preview del sello en contextos de uso
├── LICENSE                     ← MIT (código libre; brand + certificación separados)
├── linkedin/
│   ├── index.html              ← carrusel 6 slides (1080×1350 px) para LinkedIn
│   ├── short.html              ← versión corta del carrusel
│   ├── linkedin.css            ← estilos del carrusel (mismo design system)
│   └── POST.md                 ← copy del post (corto/medio/largo) + alt text por slide
└── .claude/
    ├── launch.json             ← preview server en puerto 3457
    └── settings.local.json
```
