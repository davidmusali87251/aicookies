# AIcookies — Especificación técnica v0.1

> Este documento define qué cumple un **AIcookies-compliant cookie**.
> Cualquier implementación que respete esta spec puede usar el sello.
> La idea es libre. La certificación se obtiene de quien la escribió.

---

## 0. Glosario

| Término | Significado |
|---|---|
| **AIcookie** | Un agente bounded que administra cookies en nombre del usuario. |
| **Site** | Cualquier aplicación web (1st party o 3rd party) que interactúa con el AIcookie. |
| **User** | La persona dueña del browser donde vive el AIcookie. |
| **Topic** | Un identificador semántico de qué tipo de información (ej: `food.diet`, `commerce.history`). |
| **Context** | Por qué el site pregunta (ej: `restaurant`, `news`, `commerce`). |
| **Scope** | A quién se le permite ver una preferencia (`private`, `business`, `public`). |
| **Decision** | La respuesta del AIcookie a una pregunta del site (`allow`, `decline`, `unknown`, `negotiate`). |

---

## 1. API obligatoria

Toda implementación AIcookies-compliant DEBE exponer:

### 1.1 `ask(question)` — la interfaz primaria del site

```
question = {
  topic: string,        // requerido
  context: string,      // requerido
  purpose: string,      // opcional, human-readable
}
```

Retorna:

```
decision = {
  answer: 'allow' | 'decline' | 'unknown' | 'negotiate',
  reason: string,       // por qué se tomó esta decisión
  value: any,           // solo si answer === 'allow'
  topic: string,
}
```

**El site NO puede leer datos crudos. Solo puede preguntar.** Esta es la inversión fundamental.

### 1.2 `remember(topic, value, options)` — interfaz del usuario

```
remember(topic, value, {
  scope: 'private' | 'business' | 'public',  // default: 'business'
  source: string,                            // opcional, origen del dato
})
```

### 1.3 `forget(topic)` — interfaz del usuario

Borra una preferencia. Idempotente.

### 1.4 `inspect()` — transparencia obligatoria

Retorna todo lo que el cookie sabe + las últimas decisiones. **Esto NO es opcional.** Sin transparencia no hay AIcookies.

```
{
  id: string,
  createdAt: timestamp,
  knownAbout: { [topic]: { value, setAt, scope, source } },
  recentDecisions: [...],
  version: string,
}
```

### 1.5 `export()` — soberanía del usuario

Retorna toda la data en formato portable (JSON). El usuario es dueño y puede exportarla cuando quiera. **Esto tampoco es opcional.**

### 1.6 `reset()` — derecho al olvido

Borra todo. Sin pedir confirmación a nadie más que al usuario.

---

## 2. Comportamiento obligatorio

### 2.1 Local primero

La implementación **DEBE** funcionar 100% en el browser del usuario sin ninguna llamada de red. Cloud sync es excepción opt-in, nunca default.

### 2.2 Refusal por irrelevancia

Si un site pregunta sobre un `topic` que no está dentro de los `context`s relevantes para ese topic, el AIcookie **DEBE** retornar `decline`.

Ejemplo: un site de noticias que pregunta `food.diet` debe recibir `decline`, no `allow`, aunque el usuario haya guardado esa preferencia.

### 2.3 Respeto del scope

`private` nunca se comparte con sites.
`business` se comparte solo si hay context.
`public` se comparte siempre.

### 2.4 Logging transparente

Cada decisión que el AIcookie toma **DEBE** quedar registrada y ser inspectable por el usuario via `inspect()`.

### 2.5 Cura de memoria

El AIcookie **DEBE** tener un mecanismo para limitar el crecimiento del log y/o caducar preferencias antiguas. La doctrina dice "el cookie cura su propia memoria".

### 2.6 Silencio válido

Si no hay regla aplicable, la respuesta default **DEBE** ser `decline`, no `allow`. Silencio es válido — entrega no autorizada no lo es.

---

## 3. Comportamiento prohibido

Una implementación **NO PUEDE**:

1. Compartir datos sin que el site haya invocado `ask()`.
2. Compartir datos crudos por fuera del valor retornado en `decision.value`.
3. Hacer llamadas de red sin opt-in explícito y separable del uso normal.
4. Esconder al usuario qué sabe o qué hizo.
5. Bloquear `forget()` o `reset()` por cualquier razón.
6. Permitir que un site lea o escriba directamente sobre el storage interno (debe pasar por la API).
7. Aceptar reglas remotas que invierten la doctrina (ej: "comparte siempre con esta cookie network").

---

## 4. Decisiones recomendadas (no obligatorias)

- **Storage**: `localStorage` o `IndexedDB`. No cookies HTTP nativas (ironía intencional: el AIcookie vive más arriba en el stack).
- **Identificadores**: locales únicamente. No fingerprinting cross-site.
- **Encriptación**: opcional para v0.1. Recomendado a partir de v0.2 con clave derivada del usuario (passphrase opcional).
- **Reglas extensibles**: la implementación debería permitir reglas custom además de las default.

---

## 5. Versionado

Esta spec es **v0.1**. Cambios:

- **v0.1** (2026-05-06): primera versión pública.

Cambios futuros mantendrán retrocompatibilidad cuando sea posible. Cuando no, se incrementará el major version y se documentará el path de migración.

---

## 6. Cómo obtener certificación

Una implementación que cumple esta spec puede solicitar el sello oficial **AIcookies-compliant**:

1. Implementar la API completa (sección 1).
2. Cumplir todo el comportamiento obligatorio (sección 2).
3. No incurrir en ningún comportamiento prohibido (sección 3).
4. Pasar el test suite oficial (publicado por separado).
5. Solicitar revisión y certificación (ver `CERTIFICATION.md`).

La certificación tiene fee anual y otorga derecho a usar el sello, aparecer en el directorio oficial, y participar de la comunidad de implementadores.

---

## 7. Linaje

Esta spec hereda principios de la **doctrina Kairo** (presencia bounded, no protagonista, silencio válido, action over chatter), aplicados al dominio específico de la memoria persistente del usuario en la web.

Ver: `MANIFIESTO.md`, `MANIFESTO_EN.md`.

---

**Autor:** Selim David Musali
**Fecha:** 2026-05-06
**Estado:** v0.1 borrador para discusión
