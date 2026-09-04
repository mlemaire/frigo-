# Frigo+

Personal meal-planning app: keep track of what's in your fridge/pantry, set your
cooking preferences, and get meal suggestions based on what you actually have.

## Current state

Expo (React Native) client with the 9 screens from the design mockups, static/mocked:
no backend connection, hardcoded demo data, working local navigation and
interactions (chips, steppers, checkboxes).

Screens (`app/`):

- `index.tsx` — Login
- `(tabs)/index.tsx` — Home / Tonight
- `generate-meal.tsx` — Meal generation
- `recipe.tsx` — Recipe detail
- `cooking-confirmation.tsx` — Modal to confirm quantities used after cooking
- `(tabs)/inventory.tsx` — Inventory
- `(tabs)/scanner.tsx` — Receipt scan
- `preferences.tsx` — Preferences (diet, restrictions, cooking time)
- `(tabs)/settings.tsx` — Settings (account, BYOK API key)

The backend (self-hosted Supabase, RLS, BYOK Edge Functions) and the AI
integration are not implemented yet.

## Development

```bash
npm install
npm run start   # or npm run android / npm run ios / npm run web
```
