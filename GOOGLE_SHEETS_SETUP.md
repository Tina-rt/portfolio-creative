# Google Sheets Integration Setup

## Overview
This Nuxt application now fetches portfolio data from Google Sheets with automatic fallback to static data defined in `constants.ts`.

## Architecture

### 1. **Composable** (`app/composables/usePortfolioData.ts`)
- Manages portfolio data state
- Fetches data from the server API
- Provides fallback to static `RESUME_DATA` on error
- Returns reactive data, loading state, and error state

### 2. **Server API** (`app/server/api/portfolio.ts`)
- Server-side endpoint that fetches data from Google Sheets
- Calls `getUserData()` from `utils/googleSheets.ts`
- Handles errors gracefully

### 3. **Google Sheets Service** (`app/utils/googleSheets.ts`)
- Connects to Google Sheets using service account credentials
- Maps sheet data to `CVData` interface from `types.ts`
- Supports the following sheets:
  - **Bio**: name, role, location, email, phone, site, summary
  - **Experience**: role, company, period, description
  - **Projects**: title, date, description, tech (comma-separated), image
  - **Awards**: title, date, place, description
  - **Skills**: category (language/framework/tool), name

### 4. **Data Flow**
```
Google Sheets → googleSheets.ts → Server API → Composable → Components
                                        ↓ (on error)
                                   Static RESUME_DATA
```

## Environment Variables

Add these to your `.env` file:

```env
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=your-google-sheet-id
```

### Getting Credentials

1. **Create a Google Cloud Project**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project

2. **Enable Google Sheets API**
   - Navigate to "APIs & Services" → "Library"
   - Search for "Google Sheets API"
   - Click "Enable"

3. **Create Service Account**
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "Service Account"
   - Fill in the details and create
   - Click on the created service account
   - Go to "Keys" tab → "Add Key" → "Create New Key" → "JSON"
   - Download the JSON file

4. **Extract Credentials**
   - Open the downloaded JSON file
   - Copy `client_email` to `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - Copy `private_key` to `GOOGLE_PRIVATE_KEY`

5. **Share Your Google Sheet**
   - Open your Google Sheet
   - Click "Share"
   - Add the service account email with "Viewer" permissions
   - Copy the Sheet ID from the URL: `https://docs.google.com/spreadsheets/d/{SHEET_ID}/edit`

## Google Sheets Structure

### Bio Sheet
| name | role | location | email | phone | site | summary |
|------|------|----------|-------|-------|------|---------|
| TINA HUBERT | FULLSTACK ENGINEER | Antananarivo, Madagascar | rtinahubert@gmail.com | +261 34 77 628 54 | https://tina-dev.netlify.app | Software developer with 2+ years... |

### Experience Sheet
| role | company | period | description |
|------|---------|--------|-------------|
| Frontend VueJS Developer | The Greenshot (Belgium/Remote) | Dec 2023 - Present | Maintaining Vue2/Vue3 applications... |

### Projects Sheet
| title | date | description | tech | image |
|-------|------|-------------|------|-------|
| KAIROT | Sept 2024 | Audio to Text SaaS... | Flask,Nuxt,Gemini API,Firebase | https://... |

### Awards Sheet
| title | date | place | description |
|-------|------|-------|-------------|
| The Red Shalk Hackathon | Nov 2023 | 2nd Place | Marketing solution for food delivery... |

### Skills Sheet
| category | name |
|----------|------|
| language | TypeScript |
| framework | Vue.js |
| tool | Docker |

## Usage in Components

All components now use the injected `portfolioData` from the parent `app.vue`:

```vue
<script setup lang="ts">
import { inject, computed, type ComputedRef } from 'vue';
import type { CVData } from '~/types';
import { RESUME_DATA } from '~/constants';

const portfolioData = inject<ComputedRef<CVData>>('portfolioData', computed(() => RESUME_DATA));
</script>

<template>
  <div>{{ portfolioData.name }}</div>
</template>
```

## Testing

1. **Without Google Sheets**: The app will use static data from `constants.ts`
2. **With Google Sheets**: Configure environment variables and the app will fetch live data
3. **Error Handling**: If Google Sheets fails, it automatically falls back to static data

## Deployment

For production deployment (e.g., Netlify, Vercel):
1. Add environment variables in your hosting platform's settings
2. Ensure the private key is properly escaped (newlines as `\n`)
3. The app will automatically fetch data on each request (server-side)
