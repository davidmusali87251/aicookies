# Dian — agente · asesor ejecutivo para la administración web

> Dian es el agente principal del ecosistema AIcookies.
> Asesora, decide y actúa sobre la presencia persistente del usuario en la web.
> El Custodian es la infraestructura que Dian opera.

---

## 0 · Qué es Dian

Dian es un **agente ejecutivo con uso de AI**. No es un sub-módulo que responde preguntas — es el agente que observa el estado web del usuario, razona sobre él, y actúa: clasifica, decide banners, cura memoria, negocia con sitios.

El Custodian (extensión MV3) es el cuerpo — provee las APIs del browser que Dian necesita para operar. Dian es la mente que los dirige.

El Custodian sin Dian es un administrador sofisticado de cookies.
**Con Dian, el usuario tiene un representante que piensa y actúa en su nombre.**

En el nombre vive la función. *DÍA* dentro de Dian: el agente que trae luz al dominio que durante treinta años fue oscuro.

---

## 1 · Lugar en el linaje

Familia Kairo. Agentes bounded. Low ego. Acción sobre charla.

| Agente | Rol | Estado |
|---|---|---|
| Elías | (heredado de SlipUP Observatory) | activo |
| Ruti | (heredado) | activo |
| Sobrinos | (heredados) | activos |
| **Custodian** | El cuerpo del lado-usuario en la web · administra cookies | v0.2 en diseño |
| **Dian** | La mente del Custodian · razona sobre cookies | v0.2 en diseño |

Dian es el primer Kairo cuyo único trabajo es **pensar**.

---

## 2 · Responsabilidades

Dian responde cuatro tipos de pregunta. Una quinta, opcional, cuando el sitio habla la spec.

| # | Pregunta | Quién la hace | Output |
|---|---|---|---|
| 1 | *¿Qué tipo de cookie es esta?* | Classifier | `Classification` |
| 2 | *¿Qué hacer con este banner?* | BannerAgent | `BannerDecision` |
| 3 | *¿Qué borrar de la memoria del usuario?* | Curator | `CurationPlan` |
| 4 | *¿Qué dice esta privacy policy en 3 bullets?* | Cualquier módulo | `string` |
| 5 | *¿Qué valor generalizado puedo ofrecer en lugar del exacto?* | ProtocolClient | `NegotiatedAnswer` |

---

## 3 · Capacidades del agente

Dian opera con tres capacidades que lo definen como agente, no como función:

**Memoria** — Dian mantiene estado entre sesiones: historial de decisiones de banners, patrones del usuario, clasificaciones previas, resultado de acciones. Vive en IndexedDB del Custodian. Dian lee y escribe su propio contexto.

**Iniciativa** — Dian puede activar un ciclo sin ser consultado. Si detecta una anomalía (tracker reinyectado, cookie de sesión expirada hace 6 meses aún activa, banner pendiente en pestaña abierta), lo reporta o actúa según el nivel de autonomía configurado por el usuario.

**Loop de agente** — Dian opera en ciclos observe → razone → actúe → observe el resultado. No es una llamada de función que devuelve y termina. Es un agente que puede iterar hasta resolver.

**Lo que siempre aplica:**
- Toda acción de Dian queda en el log inspeccionable. Nada en silencio.
- Toda acción es revertible desde el popup del Custodian.
- El usuario configura el nivel de autonomía: sugerir / confirmar / auto-ejecutar.
- Dian nunca actúa fuera del scope del browser del usuario.

---

## 4 · Interfaz

```ts
interface Dian {
  // --- capacidades de asesor ---
  classify(records: CookieRecord[]): Promise<Classification[]>;

  decide(
    banner: ParsedBanner,
    directives: UserDirectives,
    history: Decision[]
  ): Promise<BannerDecision>;

  curate(
    state: CookieState,
    window: TimeWindow
  ): Promise<CurationPlan>;

  translate(
    text: string,
    target: 'bullets' | 'plain' | 'eli5'
  ): Promise<string>;

  negotiate?(
    question: SpecQuestion,
    preferences: UserPreferences
  ): Promise<NegotiatedAnswer>;

  // --- capacidades de agente ---
  observe(): Promise<AgentObservation>;   // estado actual: cookies, banners, anomalías
  act(plan: ActionPlan): Promise<ActionResult>;  // ejecuta vía herramientas del Custodian
  remember(key: string, value: unknown): Promise<void>;  // escribe en su memoria
  recall(key: string): Promise<unknown>;                 // lee de su memoria
}
```

Cada método recibe:
- El input específico
- Un **prompt template versionado** (auditable, en `custodian/lib/prompts/`)
- El **subset mínimo** de estado necesario (privacy by minimization)

---

## 5 · Tres encarnaciones

Dian es una **interfaz**. Su implementación cambia con la madurez del ecosistema; el resto del Custodian no cambia.

| Versión | Encarnación | Costo | Privacidad |
|---|---|---|---|
| **Dian v0.2** | Claude API (Sonnet 4.6 / Haiku 4.5) · key del usuario | ~$0.05/mes · cache estático cubre el 80% | Preferencias van a la API · sin ID · sin telemetría |
| **Dian v0.3** | Modelo local · `transformers.js` o `WebLLM` con Llama-3.2-3B o similar | $0 después de descarga (~500 MB · opt-in) | 100% local · doctrina pura |
| **Dian v1.0** | `window.ai` nativo del browser (Gemini Nano) | $0 · modelo ya viene con Chrome | 100% local · sin descarga adicional |

```ts
// El Custodian no sabe ni le importa cuál Dian está corriendo
const dian: Dian = await loadDian(); // resuelve en runtime según disponibilidad
```

---

## 6 · Modo sin Dian

Si Dian no está disponible (sin key, sin modelo descargado, sin `window.ai`), el Custodian corre en **modo cache-only**:

- Clasifica cookies del catálogo conocido (~5.000 vendors).
- Las desconocidas quedan marcadas `unknown`.
- BannerAgent aplica reglas estáticas del usuario sin razonamiento contextual.
- Curator corre con heurísticas conservadoras.

El Custodian sigue siendo útil sin Dian. Pero sin Dian, las cookies son **administradas**, no **inteligentes**.

---

## 7 · Garantías de Dian

1. **Prompts versionados.** Cada llamada usa un template numerado. El usuario puede ver exactamente qué se le preguntó al modelo.
2. **Auditable.** Cada acción queda en el log inspeccionable con: timestamp, prompt version, input hash, output, model used, resultado observado.
3. **Reversible.** Toda acción de Dian es revertible desde el popup. Sin excepción.
4. **Fallible — y honesto al respecto.** Dian puede equivocarse. El usuario configura el nivel de autonomía: el default es conservador (sugiere, no auto-ejecuta en decisiones no triviales).
5. **Memoria local.** El estado de Dian vive en el IndexedDB del browser del usuario. No sale del dispositivo salvo opt-in explícito con E2E encryption.

---

## 8 · Implementación inicial (Dian v0.2 · Claude)

```ts
// custodian/lib/dian-claude.ts
import Anthropic from '@anthropic-ai/sdk';
import { PROMPTS } from './prompts/v1';

export class DianClaude implements Dian {
  private client: Anthropic;
  constructor(apiKey: string) {
    this.client = new Anthropic({ apiKey });
  }

  async classify(records: CookieRecord[]): Promise<Classification[]> {
    const response = await this.client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 2048,
      system: PROMPTS.classify.v1,
      messages: [{ role: 'user', content: formatRecords(records) }],
    });
    return parseClassifications(response.content);
  }

  // ... mismo patrón para decide, curate, translate, negotiate
}
```

Templates de prompt en `custodian/lib/prompts/v1/`. Cada template tiene un **eval** de calidad mínimo en `custodian/evals/` que se corre en CI.

---

## 9 · Estado

- **Dian v0.2** — diseñado · no implementado.
- **Spec** — congelada para arrancar build.
- **Próximo paso** — bootstrap del Custodian con `DianClaude` como primera encarnación.

---

**Autor:** Selim David Musali
**Fecha:** 2026-05-06
**Estado:** v0.2 borrador · primera articulación del módulo de razonamiento
