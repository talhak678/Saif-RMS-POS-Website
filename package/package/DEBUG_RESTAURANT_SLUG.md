# Quick Debug Steps

## Check Your Restaurant Slug

Run this in your backend to find your restaurant's slug:

```bash
# Option 1: Direct database query (if you have database access)
# Check the slug for restaurantId: cmlqmhnt7000fv520x7qu63bq

# Option 2: Check API response
# Open browser console on website and look for:
# 🔍 Fetching CMS for restaurant slug: [SLUG_HERE]
# 🆔 Restaurant ID: [ID_HERE]
```

## Fix Steps

### If using local website:

1. Create `.env` file:
```bash
cd e:\Saif-RMS-POS-Website\package\package
copy .env.example .env
```

2. Edit `.env` and set your restaurant slug:
```
VITE_RESTAURANT_SLUG=saifs-kitchen
```

3. Restart website dev server

### If using deployed website (Vercel):

1. Go to Vercel Dashboard
2. Select your website project
3. Settings → Environment Variables
4. Add: `VITE_RESTAURANT_SLUG` = `saifs-kitchen`
5. Redeploy

## Verify

1. Open website
2. Open browser console (F12)
3. Look for logs:
   - `🔍 Fetching CMS for restaurant slug: saifs-kitchen`
   - `✅ CMS Data loaded for restaurant: [Restaurant Name]`
   - `🆔 Restaurant ID: cmlqmhnt7000fv520x7qu63bq`

If Restaurant ID matches what you're saving to in dashboard, then it's working!
