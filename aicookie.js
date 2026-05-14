/**
 * AIcookie v0.1 — Reference implementation
 *
 * "Un cookie es la voz del usuario en el sitio. Que hable bien."
 *
 * Doctrine: bounded, local-first, transparent, action-over-chatter.
 * The cookie serves the user, not the site.
 *
 * Author: Selim David Musali
 * License: MIT (the idea is free)
 * Standard: AIcookies — https://aicookies.org (pending)
 */

(function (global) {
  'use strict';

  const VERSION = '0.1.0';
  const STORAGE_KEY = 'aicookie:state';
  const LOG_KEY = 'aicookie:log';
  const MAX_LOG = 200;

  // Decision verbs — the cookie's vocabulary
  const DECISION = Object.freeze({
    ALLOW: 'allow',           // share the data
    DECLINE: 'decline',       // refuse the request
    UNKNOWN: 'unknown',       // no data on this topic
    NEGOTIATE: 'negotiate',   // propose alternative
  });

  // Consent scope — who can see this data
  const SCOPE = Object.freeze({
    PRIVATE: 'private',       // only the user
    BUSINESS: 'business',     // sites that need it for their function
    PUBLIC: 'public',         // any site
  });

  // Topic relevance map — which contexts can ask about which topics
  // This is the doctrine's interpretation of "relevance".
  // A real implementation would learn this; v0.1 uses heuristics.
  const RELEVANCE = {
    'food.diet':        ['food', 'restaurant', 'grocery', 'health'],
    'commerce.history': ['commerce', 'recommendation'],
    'commerce.payment': ['commerce', 'payment'],
    'identity.name':    ['greeting', 'commerce', 'service'],
    'identity.age':     ['legal', 'health', 'restricted_content'],
    'preferences.ui':   ['display', 'commerce', 'service'],
    'location.city':    ['commerce', 'service', 'logistics'],
  };

  class AIcookie {
    constructor(config = {}) {
      this.version = VERSION;
      this._storage = config.storage || (typeof localStorage !== 'undefined' ? localStorage : null);
      this._namespace = config.namespace || '';
      this._listeners = [];

      this._state = this._load(STORAGE_KEY) || {
        id: this._generateId(),
        createdAt: Date.now(),
        preferences: {},
        consent: {},
      };
      this._log = this._load(LOG_KEY) || [];
    }

    // ─────────────────────────────────────────────────────────────
    // PRIMARY INTERFACE — what sites use
    // ─────────────────────────────────────────────────────────────

    /**
     * Sites don't read data. They ask questions.
     *
     * @param {Object} question
     * @param {string} question.topic    — what the site wants to know
     * @param {string} question.context  — why the site is asking
     * @param {string} question.purpose  — human-readable reason (optional)
     * @returns {Object} decision with answer + reason (NOT raw data unless allowed)
     */
    ask(question) {
      const decision = this._decide(question);
      this._record(question, decision);
      this._notify({ type: 'asked', question, decision });
      return decision;
    }

    // ─────────────────────────────────────────────────────────────
    // USER INTERFACE — what the user uses
    // ─────────────────────────────────────────────────────────────

    /**
     * Set or update a preference.
     */
    remember(topic, value, options = {}) {
      const scope = options.scope || SCOPE.BUSINESS;
      this._state.preferences[topic] = {
        value,
        setAt: Date.now(),
        scope,
        source: options.source || 'user',
      };
      this._save();
      this._record({ type: 'remember', topic }, { answer: 'stored', scope });
      this._notify({ type: 'remembered', topic, value, scope });
    }

    /**
     * Forget specific data.
     */
    forget(topic) {
      delete this._state.preferences[topic];
      this._save();
      this._record({ type: 'forget', topic }, { answer: 'deleted' });
      this._notify({ type: 'forgot', topic });
    }

    /**
     * Inspect everything the cookie knows + what it has done.
     * Transparency is a core principle.
     */
    inspect() {
      return {
        id: this._state.id,
        createdAt: this._state.createdAt,
        knownAbout: { ...this._state.preferences },
        recentDecisions: this._log.slice(-50),
        version: this.version,
      };
    }

    /**
     * Export all data the cookie holds about the user.
     * The user owns it — they can take it.
     */
    export() {
      return JSON.stringify({
        meta: { version: this.version, exportedAt: Date.now() },
        state: this._state,
        log: this._log,
      }, null, 2);
    }

    /**
     * Reset everything. Starts over.
     */
    reset() {
      this._state = {
        id: this._generateId(),
        createdAt: Date.now(),
        preferences: {},
        consent: {},
      };
      this._log = [];
      this._save();
      this._saveLog();
      this._notify({ type: 'reset' });
    }

    /**
     * Subscribe to the cookie's actions (for UI / debugging).
     */
    onAction(fn) {
      this._listeners.push(fn);
      return () => {
        this._listeners = this._listeners.filter(l => l !== fn);
      };
    }

    // ─────────────────────────────────────────────────────────────
    // INTERNAL — the doctrine encoded as logic
    // ─────────────────────────────────────────────────────────────

    _decide(question) {
      const { topic, context } = question;

      // Principle 4: silence is valid response. No topic = no answer.
      if (!topic) {
        return { answer: DECISION.DECLINE, reason: 'no_topic_specified' };
      }

      // Principle 1: serve the user. If site asks for irrelevant data → decline.
      if (context && !this._isRelevant(topic, context)) {
        return { answer: DECISION.DECLINE, reason: 'topic_irrelevant_to_context', topic, context };
      }

      const pref = this._state.preferences[topic];

      // Unknown is honest — no data is no data.
      if (!pref) {
        return { answer: DECISION.UNKNOWN, reason: 'no_data_on_topic', topic };
      }

      // Principle 3: negotiate. If consent scope doesn't match → decline (don't surrender).
      if (!this._scopeAllows(pref.scope, context)) {
        return { answer: DECISION.DECLINE, reason: 'consent_scope_mismatch', topic, requested: context, scope: pref.scope };
      }

      // All checks pass. Share.
      return { answer: DECISION.ALLOW, value: pref.value, topic, scope: pref.scope };
    }

    _isRelevant(topic, context) {
      const allowedContexts = RELEVANCE[topic];
      if (!allowedContexts) return true; // unknown topic — don't block by default
      return allowedContexts.includes(context);
    }

    _scopeAllows(scope, context) {
      if (scope === SCOPE.PUBLIC) return true;
      if (scope === SCOPE.PRIVATE) return false;
      if (scope === SCOPE.BUSINESS) return !!context && context !== 'public';
      return false;
    }

    _record(action, decision) {
      this._log.push({
        at: Date.now(),
        action,
        decision,
      });
      // Principle 5: cura su propia memoria. Cap the log.
      if (this._log.length > MAX_LOG) {
        this._log = this._log.slice(-MAX_LOG);
      }
      this._saveLog();
    }

    _notify(event) {
      this._listeners.forEach(fn => {
        try { fn(event); } catch (e) { /* listeners can't break the cookie */ }
      });
    }

    _save() {
      if (!this._storage) return;
      try {
        this._storage.setItem(STORAGE_KEY + this._namespace, JSON.stringify(this._state));
      } catch (e) { /* graceful degradation */ }
    }

    _saveLog() {
      if (!this._storage) return;
      try {
        this._storage.setItem(LOG_KEY + this._namespace, JSON.stringify(this._log));
      } catch (e) { /* graceful degradation */ }
    }

    _load(key) {
      if (!this._storage) return null;
      try {
        const raw = this._storage.getItem(key + this._namespace);
        return raw ? JSON.parse(raw) : null;
      } catch (e) {
        return null;
      }
    }

    _generateId() {
      // Local ID only. Not phoning home.
      return 'aic_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
    }
  }

  // Public exports
  global.AIcookie = AIcookie;
  global.AIcookie.DECISION = DECISION;
  global.AIcookie.SCOPE = SCOPE;
  global.AIcookie.VERSION = VERSION;

})(typeof window !== 'undefined' ? window : globalThis);
