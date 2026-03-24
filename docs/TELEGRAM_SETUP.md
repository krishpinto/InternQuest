# Telegram Integration Setup Guide

This document explains how to set up Telegram bot integration for the Misrut Market Intelligence Map.

## Overview

The Market Intelligence Map feature allows merchants to dispatch market opportunities directly to Telegram. When a user selects a location and market category, they can send detailed lead information to their Telegram account.

## Setup Steps

### 1. Create a Telegram Bot

1. Open Telegram and search for **@BotFather**
2. Send `/start` to begin
3. Send `/newbot` to create a new bot
4. Follow the prompts to name your bot
5. Copy the **Bot Token** (you'll need this)

Example token format: `8761178262:AAFjj6fFhWsuVbEirdwpcs1dr4cPYKqtgyo`

### 2. Get Your Chat ID

1. Send a message to your newly created bot (search for it by name)
2. Visit this URL in your browser, replacing `YOUR_TOKEN`:
   ```
   https://api.telegram.org/botYOUR_TOKEN/getUpdates
   ```
3. Look for the `chat` object and copy the `id` field
4. This is your **Chat ID** (usually a negative number for group chats)

Example chat ID: `-5013098950`

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_CHAT_ID=your_chat_id_here
```

Or set these as environment variables in your deployment platform (Vercel, etc.).

### 4. Test the Integration

1. Navigate to the "Market Map" view in the Misrut app
2. Select a state and market category
3. Enter a test message in the "Lead Message" field
4. Click "Send to Telegram"
5. You should receive the message in Telegram

## How It Works

### User Flow

1. **Select Location**: User chooses a US state from the dropdown
2. **View Map**: Interactive Leaflet map shows opportunity zones in that state
3. **Choose Category**: Select a market category (Retail, Food, Services, Wellness, Tech)
4. **Compose Lead**: Write details about the market opportunity
5. **Dispatch**: Click "Send to Telegram" to dispatch the lead

### Message Format

When a lead is dispatched, Telegram receives a formatted message with:
- Business name
- Target state
- Market category (with emoji)
- Exact coordinates
- Opportunity details
- Timestamp

The message includes action buttons:
- **View on Google Maps**: Opens the location in Google Maps
- **Accept Opportunity**: Callback button for interaction tracking

## Features

- **Interactive Map**: Leaflet-based map showing state locations
- **Multiple Categories**: Support for Retail, Food, Wellness, Services, and Tech
- **Real-time Feedback**: User sees success/error messages immediately
- **Demo Mode**: Works even without Telegram credentials (for testing)
- **State Coordinates**: Pre-configured coordinates for all 50 US states

## Troubleshooting

### "Missing Telegram credentials"

**Solution**: Ensure `.env.local` has both `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` set.

### "Failed to send Telegram message"

**Possible causes:**
- Bot token is invalid or expired
- Chat ID is incorrect
- Bot doesn't have permissions to send messages
- Network error

**Solution**: Verify credentials using the getUpdates endpoint.

### Message not appearing in Telegram

**Possible causes:**
- Bot is blocked or muted in Telegram
- Chat ID points to a different chat than expected

**Solution:**
1. Ensure bot is a member of the target chat
2. Verify chat ID by sending test message to bot
3. Run `getUpdates` endpoint to confirm

## API Endpoint

### POST `/api/dispatch-lead`

**Request Body:**
```json
{
  "state": "California",
  "category": "retail",
  "location": "36.1162, -119.6816",
  "businessName": "Your Business",
  "message": "Found 5 promising retail locations...",
  "timestamp": "2026-03-24T10:30:00Z"
}
```

**Response Success:**
```json
{
  "success": true,
  "message": "Lead dispatched to Telegram successfully",
  "messageId": 12345
}
```

**Response Error (Demo Mode):**
```json
{
  "success": true,
  "message": "Lead dispatched successfully (demo mode)",
  "payload": { ... }
}
```

## Security Notes

- Never commit `.env.local` to version control
- Use environment variables for production deployments
- Bot tokens should be kept private
- Consider limiting bot permissions in Telegram settings
- For private chats, use negative chat IDs (e.g., -5013098950)

## Integration with Misrut

The Market Intelligence Map is accessible from the main Misrut navigation:
1. Click **Market Map** in the top navigation
2. The map opens in a dedicated view
3. All other Misrut features remain accessible

The integration flows naturally with:
- **Onboarding Form**: Business data is used for lead context
- **Dashboard**: Complementary intelligence layer
- **Analytics**: Track which markets generate leads
