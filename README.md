# AIcookies

> **A cookie is the user's voice in the site. Let it speak well.**
> Un cookie es la voz del usuario en el sitio. Que hable bien.

The open standard for cookies that think, negotiate, and represent the user — and the **Custodian**, the user-side agent that administers them.

---

## Architecture · four pieces, one doctrine

| Piece | What it is | Document |
|---|---|---|
| **Doctrine** | Seven principles. Who works for whom on the web. | [`MANIFIESTO.md`](MANIFIESTO.md) · [`MANIFESTO_EN.md`](MANIFESTO_EN.md) |
| **Spec** | Open protocol between site and user agent. | [`SPEC.md`](SPEC.md) |
| **Custodian** | The body · user-side browser extension that administers existing cookies. | [`CUSTODIAN.md`](CUSTODIAN.md) |
| **Dian** | The mind · the reasoning module that makes cookies intelligent. Lives inside the Custodian. | [`DIAN.md`](DIAN.md) |

---

## What this folder contains

| File | What it is |
|---|---|
| [`MANIFIESTO.md`](MANIFIESTO.md) | The manifesto (Spanish, primary) |
| [`MANIFESTO_EN.md`](MANIFESTO_EN.md) | The manifesto (English mirror) |
| [`SPEC.md`](SPEC.md) | Technical spec — the open protocol between site and agent |
| [`CUSTODIAN.md`](CUSTODIAN.md) | Spec of the user-side agent (browser extension) — the body |
| [`DIAN.md`](DIAN.md) | Spec of the reasoning module — the mind inside the Custodian |
| [`CERTIFICATION.md`](CERTIFICATION.md) | How to obtain the official seal |
| [`aicookie.js`](aicookie.js) | Reference implementation of the **site-side** library (~270 lines, zero deps) |
| [`index.html`](index.html) | Interactive demo of the site-side library |
| [`styles.css`](styles.css) | Demo styling (Airu family aesthetic) |
| [`seal.svg`](seal.svg) | Brand seal — reusable as icon, badge, favicon |
| [`linkedin/`](linkedin/) | LinkedIn carousel slides + post copy |
| [`LICENSE`](LICENSE) | MIT — the idea is free |

---

## Try the site-side demo

Open `index.html` in any modern browser. No build, no server, no installation. Two panels: a simulated site on the left, the cookie inspector on the right. Click scenarios. Watch the cookie refuse irrelevant requests. Inspect everything it does.

This demo shows what a **site** sees when it speaks the AIcookies spec. The Custodian (user side) is in active development — see [`CUSTODIAN.md`](CUSTODIAN.md).

---

## Embed in your site (5 lines)

```html
<script src="aicookie.js"></script>
<script>
  const cookie = new AIcookie();

  cookie.remember('food.diet', 'vegetarian', { scope: 'business' });

  const decision = cookie.ask({
    topic: 'food.diet',
    context: 'restaurant',
  });

  if (decision.answer === 'allow') {
    showVegetarianMenu(decision.value);
  }
</script>
```

The site never reads `localStorage` directly. It asks the cookie. The cookie decides.

---

## The shift, at a glance

| Before | Now |
|---|---|
| The site asks for data | The site asks the user's Custodian |
| The user accepts or refuses | The Custodian decides what to answer |
| The site receives **data** | The site receives **answers** |
| Surveillance economy | User-sovereign economy |

---

## Lineage

AIcookies belongs to the **agent family** under the **Kairo doctrine** — bounded presence, low ego, silence is valid, action over chatter. It shares roots with Elías, Ruti, and the sobrinos. Its role is infrastructure: it serves other agents and the user, not faces of conversation.

The Custodian is the first user-side Kairo on the web.

---

## Status

- **Doctrine** — v0.2 (four-piece architecture: doctrine · spec · Custodian · Dian)
- **Spec v0.1** — stable, published
- **Site-side reference impl** — published, ~270 lines, MIT
- **Custodian v0.2** — specified in [`CUSTODIAN.md`](CUSTODIAN.md), implementation in design
- **Dian v0.2** — specified in [`DIAN.md`](DIAN.md), Claude API as first incarnation

The idea is free. The doctrine, also. The seal, certifiable.

---

**Author:** Selim David Musali
**Israel** · 2026
