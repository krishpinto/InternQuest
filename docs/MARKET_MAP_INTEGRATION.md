# Market Intelligence Map Integration

## Overview

The Misrut app now includes an integrated **Market Intelligence Map** feature that combines:
- Interactive Leaflet.js map showing market opportunity zones by state
- Real-time category filtering (Retail, Food, Services, Wellness, Tech)
- Direct Telegram lead dispatch system for merchant opportunities

## Features

### 1. Interactive Map
- Full US state selection dropdown (all 50 states)
- Leaflet-based map rendering with OpenStreetMap tiles
- Category-specific opportunity zones displayed as:
  - Color-coded circles (25km radius each)
  - Custom markers showing zone names
  - Popup information on hover/click

### 2. Category Filtering
Five market categories with distinct colors:
- **Retail** (Emerald Green) - Shopping districts, commercial zones
- **Food & Beverage** (Amber) - Restaurant rows, food courts
- **Services** (Blue) - Business districts, service centers
- **Wellness** (Pink) - Health hubs, fitness zones
- **Tech** (Purple) - Innovation districts, startup zones

### 3. Telegram Lead Dispatch
- Send market opportunities directly to Telegram
- Formatted messages include:
  - Business name
  - Target state and coordinates
  - Market category with emoji
  - Custom opportunity message
  - Timestamp of dispatch
- Inline buttons for easy action in Telegram (View on Maps, Accept Lead)

## Architecture

### Components

**Market Intelligence Map** (`components/market-intelligence-map.tsx`)
- Main container component
- State management for selected location/category
- Lead dispatch form with textarea input
- Feedback messaging system
- Responsive grid layout

**Map Viewer** (`components/map-viewer.tsx`)
- Leaflet map component (client-side only via dynamic import)
- Handles map initialization and updates
- Renders opportunity zones with category-specific colors
- Supports marker clustering and popups

### API Endpoint

**POST /api/dispatch-lead**
- Accepts location, category, message, business name
- Formats message with HTML tags for Telegram
- Uses Telegram Bot API to send messages
- Returns success/error status to client
- Falls back gracefully in demo mode if Telegram credentials unavailable

### State Management

Updated Zustand store (`lib/store.ts`):
- Added `'market-map'` to `CurrentView` type
- Existing `businessData` is used for merchant name in dispatches

### Navigation

Updated Navigation component:
- New "Market Map" button alongside existing views
- Seamless switching between all 5 views (Home, Onboard, Dashboard, Analytics, Market Map)

## Setup Instructions

### 1. Telegram Configuration

Get your bot token and chat ID:

1. Create a Telegram bot:
   - Message @BotFather on Telegram
   - Follow prompts to create a new bot
   - Copy your bot token (e.g., `123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11`)

2. Get your chat ID:
   - Message your bot
   - Visit: `https://api.telegram.org/botYOUR_BOT_TOKEN/getUpdates`
   - Find your chat ID in the response (negative number for groups)

### 2. Environment Variables

Add to your `.env.local` file:
```
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_CHAT_ID=your_chat_id_here
```

Or set in Vercel project settings under "Environment Variables":
- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`

### 3. Dependencies

Required packages added to `package.json`:
- `leaflet@^1.9.4` - Map rendering
- `@types/leaflet@^1.9.11` - TypeScript types

Install via: `pnpm install`

## Usage Flow

1. **Navigate to Market Map** - Click "Market Map" in the navigation bar
2. **Select State** - Choose target state from dropdown (all 50 US states available)
3. **Choose Category** - Click market category button to filter opportunity zones
4. **Review Map** - Map updates with category-specific zones color-coded by opportunity
5. **Enter Details** - Write lead message describing the opportunity
6. **Dispatch to Telegram** - Click "Send to Telegram" button
7. **Receive in Telegram** - Lead appears in your Telegram chat with action buttons

## Data Flow

```
User Input (State, Category)
    ↓
Map Updates with Leaflet
    ↓
User Writes Message
    ↓
Clicks "Send to Telegram"
    ↓
API Route Formats Message
    ↓
Telegram Bot API Sends Message
    ↓
Feedback Message Displayed
```

## Styling & Design

- Matches Misrut's existing emerald/amber/white color palette
- Uses Tailwind CSS with custom design tokens
- Responsive grid: 2 columns on desktop, 1 on mobile
- Consistent with existing component styling
- Leaflet markers use custom icons for category-specific colors

## Demo Mode

If Telegram credentials are not configured:
- The API endpoint returns success response anyway
- Map functionality works normally
- Form can be tested without actual Telegram integration
- Perfect for demonstrations or development

## Future Enhancements

Potential features to add:
- Clustering of opportunity zones
- Historical lead tracking
- Lead acceptance confirmation in Telegram
- Dynamic zone generation based on real market data
- Lead scoring based on category/location
- Merchant performance metrics per dispatch

## Troubleshooting

**Map not loading:**
- Check browser console for Leaflet CSS import errors
- Ensure JavaScript is enabled
- Verify Leaflet CDN is accessible

**Telegram messages not receiving:**
- Verify TELEGRAM_BOT_TOKEN format (should contain colon)
- Check TELEGRAM_CHAT_ID is correct (should be negative for groups)
- Ensure bot has permission to send messages in chat
- Check /api/dispatch-lead in browser DevTools Network tab

**Category colors not updating:**
- Verify category slug matches (lowercase: retail, food, services, wellness, tech)
- Check map-viewer.tsx CATEGORY_COLORS object

## Files Modified/Created

**Created:**
- `components/market-intelligence-map.tsx`
- `components/map-viewer.tsx`
- `app/api/dispatch-lead/route.ts`
- `docs/TELEGRAM_SETUP.md`
- `docs/MARKET_MAP_INTEGRATION.md` (this file)
- `.env.local.example`

**Modified:**
- `lib/store.ts` - Added 'market-map' view type
- `components/navigation.tsx` - Added Market Map button
- `components/app-container.tsx` - Added MarketIntelligenceMap component render
- `package.json` - Added leaflet and @types/leaflet

## Testing Checklist

- [ ] Map loads on Market Map view
- [ ] State dropdown changes map location
- [ ] Category buttons update zone colors/locations
- [ ] Message textarea accepts input
- [ ] Send button submits form
- [ ] Telegram message received with correct formatting
- [ ] Feedback message shows success/error
- [ ] All views (Home, Onboard, Dashboard, Analytics, Market Map) accessible
