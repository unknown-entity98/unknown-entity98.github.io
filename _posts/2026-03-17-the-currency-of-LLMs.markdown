---
layout: post
title: "The Currency of LLMs"
author: Sameer Navuduri
tags: [AI, LLMs, tokenization]
category: productivity
---

*Or: why your chatbot just charged you $0.003 to say "As an AI language model, I cannot browse the internet."*

Every time you ask an LLM something, a little meter is ticking. Not seconds — **tokens**. They're the unit of currency every major AI provider charges in, and once you understand what they are, the pricing pages start making a lot more sense. Spoiler: output is always more expensive, and there's a reason for that.

---

## What even is a token?

LLMs don't read your text. They read numbers. Before any "thinking" happens, your message gets broken down into small chunks called tokens — and each token maps to a number the model actually processes.

```
  You type:  "Tokenization is surprisingly interesting."

  Becomes:   ["Token", "ization", " is", " surprisingly", " interesting", "."]

  As IDs:    [  9220,     2065,    374,        vaguely,        large,      13 ]
```

Tokens aren't exactly words. Common words like "is" or "the" are usually one token. Long or rare words get split — "tokenization" becomes two pieces. As a rough rule of thumb: **1 token ≈ 4 characters**, or about 0.75 words in English. That 5,000-word essay you're submitting? Roughly 6,700 tokens.

```
  "Hello"          → 1 token
  "extraordinary"  → 1 token   (common enough)
  "pneumonoultram  → 6 tokens  (nobody uses this anyway)
   icroscopicsilico
   volcanoconiosis"
```

Different models use different tokenizers, so token counts vary slightly across providers. Fun.

---

## How the model uses them

At a high level, the flow looks like this:

```
  [ Your message ]
        ↓  tokenize
  [ Token IDs: 1337, 42, 890, ... ]
        ↓  model processes entire sequence
  [ Predicts next token ID ]
        ↓  repeat until done
  [ Detokenize back to text ]
  [ "Here is your answer:" ]
```

The model generates **one token at a time**, each one informed by everything before it. That's why long responses feel slower — it's not downloading text, it's computing each word sequentially. There's no shortcut there.

---

## Decoding the pricing page

When you open any LLM provider's pricing page, you'll see three main terms thrown around:

| Term | What it means |
|---|---|
| **Input tokens** | Tokens in your message / prompt |
| **Output tokens** | Tokens the model generates in response |
| **Context tokens** | The full window — input + output + conversation history |

Here's roughly what that costs across a few popular models today:

| Model | Input (per 1M tokens) | Output (per 1M tokens) |
|---|---|---|
| Claude Sonnet 4 | $3.00 | $15.00 |
| GPT-4o | $2.50 | $10.00 |
| Gemini 1.5 Pro | $1.25 | $5.00 |

Notice a pattern? **Output always costs more** — often 4–5× more. This is because input tokens can be processed in parallel and even cached between requests, but output tokens are generated one by one. You're essentially paying for the model's "thinking time."

---

## Context: the hidden cost

The context window is how much the model can "see" at once. If you're building a chatbot that keeps conversation history, every message in that history gets sent back to the model on each request — and charged as input tokens.

```
  Turn 1:   [system prompt] + [user msg 1]           → ~500 tokens
  Turn 2:   [system prompt] + [user msg 1] + [bot reply 1] + [user msg 2]
                                                      → ~900 tokens
  Turn 10:  everything above + ...                   → costs add up fast
```

Some providers offer **cached input pricing** (usually ~80% cheaper) for repeated prefixes like system prompts. Worth using if you're building something real.

---

## Quick sanity check

Say you're building a simple app — users ask questions, the model answers. Rough estimate:

```
  System prompt:   ~300 tokens
  User message:    ~100 tokens
  Model response:  ~400 tokens

  Per request:     400 input + 400 output
  At Claude rates: 0.0004M × $3 + 0.0004M × $15 = ~$0.0072

  At 10,000 requests/month: ~$72
```

Not ruinous. But a poorly written prompt that's 2,000 tokens instead of 300? That scales.

---

Tokens are a genuinely elegant abstraction — they're what let the same model handle English, code, JSON, and the occasional dramatic monologue with equal indifference. Understanding them won't make you a better engineer overnight, but it will stop you from being surprised by your API bill.
