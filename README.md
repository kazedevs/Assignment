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

When a customer sends a message like *"Where is my order?"*, it hits the webhook endpoint (`POST /api//webhook/whatsapp`) and the AI figures out what they're asking about — things like order status, return policy, or refund requests.

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