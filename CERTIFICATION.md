# AIcookies — Certificación

> Cualquier implementación puede usar el nombre genérico "cookie that thinks".
> Solo las certificadas pueden usar el sello oficial **AIcookies-compliant™**.

---

## Por qué existe la certificación

La doctrina AIcookies define principios concretos. Una implementación puede declararse "AIcookies" pero traicionar la doctrina (compartir datos sin consentimiento, esconder el log, no respetar el scope, etc.). El sello existe para que **el usuario sepa de un vistazo** que la implementación cumple lo que dice cumplir.

Para el implementador, el sello es:
- Diferenciador en marketing
- Confianza prearmada con usuarios
- Pertenencia a una comunidad de práctica
- Aparición en el directorio oficial

Para el usuario, el sello es:
- Garantía de doctrina respetada
- Saber que puede ejercer sus derechos (`inspect`, `forget`, `export`, `reset`)
- Saber que sus datos no se comparten sin pasar por su agente

---

## Quién puede certificarse

Cualquier implementación de AIcookies que cumpla:

1. La **API obligatoria** definida en `SPEC.md` sección 1
2. Todo el **comportamiento obligatorio** de `SPEC.md` sección 2
3. Ningún **comportamiento prohibido** de `SPEC.md` sección 3
4. El **test suite oficial** (publicado por separado)
5. La **revisión humana** de un certifier autorizado

Esto incluye:
- Bibliotecas JavaScript / TypeScript (la implementación de referencia es una)
- Bibliotecas en otros lenguajes (Python, Rust, Go, Swift, Kotlin)
- Servicios hosted que provean AIcookies como SaaS
- Plugins de plataformas (WordPress, Shopify, etc.)
- Frameworks que integren AIcookies como dependencia

---

## Cómo obtenerla

### Paso 1 — Self-assessment

Antes de aplicar formalmente, completá un self-assessment público (template disponible) que documente:

- Cómo cumple cada punto de la spec
- Qué decisiones de diseño tomó
- Qué tests internos pasa
- Qué casos edge considera

### Paso 2 — Solicitud

Enviar a `cert@aicookies.org` (pendiente de setup):

- Self-assessment completado
- Link al código (puede ser propietario, pero el certifier debe poder revisarlo bajo NDA)
- Documentación pública del producto
- Datos de contacto

### Paso 3 — Revisión

El certifier:

- Revisa el código contra la spec
- Ejecuta el test suite oficial
- Evalúa la documentación pública
- Identifica gaps, inconsistencias o violations

Resultado posible:
- ✓ Aprobado → certificación emitida
- ⚠ Aprobado con observaciones → debe corregir antes de re-aplicar
- ✗ Rechazado con razones → puede re-aplicar luego de corregir

### Paso 4 — Renovación

La certificación dura **12 meses**. Antes de vencer, el implementador debe:

- Demostrar que sigue cumpliendo (la spec puede haber evolucionado)
- Pagar el fee de renovación
- Pasar nuevamente el test suite (versión vigente)

---

## Fees

| Tipo de implementación | Fee anual (USD) |
|---|---|
| **Open source / proyecto sin fines de lucro** | 0 (gratis, requiere aprobación) |
| **Indie / freelance** | 500 |
| **Startup / pyme** (< USD 1M revenue) | 5.000 |
| **Empresa mediana** (USD 1M-50M revenue) | 15.000 |
| **Corporativo** (> USD 50M revenue) | 30.000 |
| **White-label / OEM** | Custom |

Los fees financian:
- Mantenimiento del estándar
- Test suite y herramientas
- Brand authority y comunicación
- Tiempo del autor / certifiers

---

## Qué incluye la certificación

- Derecho a usar el sello **AIcookies-compliant™** en marketing y producto
- Aparición en el directorio oficial (`aicookies.org/certified`)
- Logo + assets oficiales
- Soporte por mail con el certifier
- Notificación temprana de cambios al estándar
- Invitación a la comunidad de implementadores

---

## Qué NO incluye

- **Soporte técnico** del producto certificado (el implementador es responsable)
- **Garantía legal** o seguros (es certificación de doctrina, no auditoría legal)
- **Exclusividad geográfica o vertical** (cualquier implementador puede certificarse)
- **Acceso al código** del autor o de otros certificados

---

## Pérdida de certificación

Una implementación pierde el sello si:

- Se descubre que viola la doctrina en producción
- No paga la renovación
- Cambia de comportamiento sin re-certificarse
- Es vendida/transferida y el nuevo dueño no re-certifica

La revocación se publica en el directorio oficial.

---

## Para empezar

Si querés ser de los primeros implementadores certificados, escribí a `selim@aicookies.org` (pendiente) o contactá al autor por canales actuales.

La primera ola tendrá:
- Fee reducido (descuento de 50%)
- Logo "AIcookies-compliant — Founding Implementation"
- Voz en la evolución del estándar v0.2

---

**Autor del estándar:** Selim David Musali
**Fecha:** 2026-05-06
**Estado:** v0.1 — primera versión pública
