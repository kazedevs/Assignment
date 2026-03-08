# Remaining Modules (Architecture Design)

These two modules were part of the original plan but weren't fully built out in this assignment. Here's how they were supposed to work.

---

## Module 3: AI Impact Reporting Generator

The idea here is pretty simple — whenever someone completes an order, the system automatically calculates the environmental impact and generates a short report about it.

### Workflow

```
Order Completed → Impact Calculation → AI Summary → Report Saved
```

### How It Works

Once an order is marked as complete, the system grabs the order details (what was bought, how much) and runs some basic math to estimate impact:

```
plastic_saved = quantity × plastic_per_product
carbon_avoided = quantity × carbon_factor
```

If the products came from local suppliers, it also factors in the reduced transportation emissions.

Then the AI takes all those numbers and turns them into something a human would actually want to read:

> *"This order prevented 1.2kg of plastic waste and reduced carbon emissions by 3.5kg while supporting local suppliers."*

That report then gets saved to the database alongside the order so it's there whenever you need it.

```
ImpactReport
├── orderId
├── plasticSaved
├── carbonAvoided
├── impactStatement
└── createdAt
```

---

## Module 4: AI WhatsApp Support Bot

This one lets customers get support directly through WhatsApp instead of going through a website or email. The bot handles the common stuff and hands off the tricky cases to a real person.

### Workflow

```
Customer Message → WhatsApp API → Webhook → AI → Response
```

### How It Works

When a customer sends a message like *"Where is my order?"*, it hits the webhook endpoint (`POST /webhook/whatsapp`) and the AI figures out what they're asking about — things like order status, return policy, or refund requests.

If it's an order status question, it just pulls the info from the database and replies instantly. If it's something more sensitive like a refund or a complaint, it creates a support ticket and loops in a human agent.

```
Refund Request → Support Ticket Created → Human Agent
```

Every conversation gets logged so the team can review it later and keep improving the bot.

```
SupportConversation
├── phoneNumber
├── userMessage
├── aiResponse
├── intent
└── createdAt
```

---

## AI Prompt Design

The prompts were written to make sure the AI always returns clean, predictable outputs that the backend can actually work with — no surprises, no weird formatting.

### Structured JSON Output

Every prompt tells the AI to return only valid JSON, nothing else. No explanations, no extra text. This makes it straightforward for the backend to parse and save the response.

```
Return ONLY valid JSON in the following format.
Do not include explanations.
```

### Defined Output Schema

The prompts include the exact JSON shape the AI needs to follow. For example, the category generator expects:

```json
{
  "category": "",
  "subcategory": "",
  "seoTags": [],
  "sustainabilityFilters": []
}
```

Giving it a clear schema upfront makes the responses a lot more consistent.

### Context Injection

User inputs like product title, description, budget, and company size get injected directly into the prompt so the AI has the right context to work with.

```
Product Title: Reusable Bamboo Cutlery
Description: Eco-friendly bamboo utensils with travel pouch
```

### Domain-Specific Instructions

The prompts are tailored for sustainable commerce — so things like generating SEO tags and sustainability filters (plastic-free, compostable, recycled, etc.) are baked into the instructions.

### Reliable Parsing

Before anything gets saved to the database, the backend strips out any leftover markdown formatting from the AI response and parses it cleanly. Just a small safety net to avoid random errors.