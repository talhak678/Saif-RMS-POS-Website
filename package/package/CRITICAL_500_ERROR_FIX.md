# 🔥 CRITICAL: 500 Error Fix

## Problem
Website is getting 500 error when trying to fetch CMS data from:
`/api/cms/config/public/saifs-kitchen`

## Most Likely Causes

### 1. Restaurant slug "saifs-kitchen" doesn't exist
The backend is looking for a restaurant with `slug = "saifs-kitchen"` but it doesn't exist.

**Your Save Logs Show:**
- You're saving to: `restaurantId: 'cmlqmhnt7000fv520x7qu63bq'`
- But this restaurant might have a DIFFERENT slug (not "saifs-kitchen")

## Immediate Fix Options

### Option A: Check Your Restaurant's Actual Slug

Run this query in your database or via Prisma Studio:
```sql
SELECT id, name, slug FROM Restaurant WHERE id = 'cmlqmhnt7000fv520x7qu63bq';
```

Then update website `.env`:
```
VITE_RESTAURANT_SLUG=<your-actual-slug>
```

### Option B: Update Your Restaurant's Slug to "saifs-kitchen"

Run this in database:
```sql
UPDATE Restaurant 
SET slug = 'saifs-kitchen' 
WHERE id = 'cmlqmhnt7000fv520x7qu63bq';
```

### Option C: Use Restaurant ID Instead of Slug (Backend Change)

Create a new API endpoint that accepts restaurantId directly.

## Quick Test

1. Open website with updated error logging
2. Check browser console
3. Look for these logs:
   ```
   🔍 Fetching CMS for restaurant slug: saifs-kitchen
   🌐 API URL: https://...
   ❌ Error details: { status: 500, data: { ... } }
   ```

4. The `data` field will show the exact database error

## Verification Steps

After applying fix:

1. Save something in Dashboard CMS
2. Check console: `✅ CMS Save Response: { restaurantId: '...' }`
3. Open website
4. Check console: `🆔 Restaurant ID: '...'`
5. **Both IDs should match!**

If they match → Problem solved ✅
If they don't match → Wrong slug still being used ❌
