# Integrated Implementation Plan: Saif RMS Customer Website

This documentation outlines how to implement the requested features by integrating the **existing** Backend, Dashboard, and Website projects.

## Project Structure Overview
1.  **Backend (`saif-rms-pos-backend`)**: Next.js API using Prisma & PostgreSQL. Contains logic for Orders, Payments, Users, and CMS config.
2.  **Dashboard (`Saif-RMS-POS-Frontend-Dashboard`)**: Management portal for restaurant owners to update menu items, view orders, and manage CMS settings.
3.  **Website (`Saif-RMS-POS-Website`)**: The React/Vite customer-facing portal (Current workspace).

---

## 1. Feature-Specific Integration Plan

### A. Menu Browsing (Dynamic Integration)
*   **Current State**: Website uses `cmsConfig` (JSON) to render page layout. Menu items are often hardcoded or partial.
*   **Action**: Use the existing `/api/menu-items` and `/api/categories` endpoints from the backend.
*   **Implementation**:
    *   In `AppContext.tsx`, add a helper to fetch `categories` and `menuItems` for the specific `restaurantId`.
    *   Update `Home2OurMenu.tsx` and `Home3OurMenu.tsx` to map through these API results.
    *   **Availability**: Use the `isAvailable` field from the `MenuItem` model to toggle the "Add to Cart" button.

### B. Cart & Checkout (Local + Backend)
*   **Current State**: No Cart system in Website. Backend has `/api/orders` (requires `withAuth`).
*   **Action**: 
    1.  **Frontend**: Implement `cart` state in `AppContext.tsx` with persistence (localStorage).
    2.  **Backend**: Create a public `POST /api/orders/checkout` or update current route to allow `Customer` role auth.
*   **Online Payments**: 
    *   Integrate the existing `/api/payments` endpoints.
    *   Backend already supports `PaymentMethod: STRIPE, PAYPAL, COD`.

### C. Customer Accounts & Auth
*   **Current State**: Backend has `User` model with Auth, but `Customer` model has no password/login.
*   **Action**:
    1.  **Backend Migration**: Add `password` field to the `Customer` model in `schema.prisma`.
    2.  **API**: Create `/api/customers/auth/register` and `login` routes.
    3.  **Frontend**: Connect the existing "Sign In" modal (`SignIn.tsx`) to these new customer endpoints.

### D. Live Order Status Tracking
*   **Current State**: Backend has `OrderStatus` enum (PENDING, PREPARING, etc.).
*   **Action**:
    1.  **Real-time**: Use **Socket.io** on the backend to emit events when an order's status changes in the Dashboard.
    2.  **Frontend**: A new `OrderTracking` page that listens for these events using the `orderId`.

### E. Google Maps & Delivery Logic
*   **Current State**: `Branch` model in Backend already has `deliveryRadius`, `deliveryCharge`, and `deliveryOffTime`.
*   **Action**:
    1.  **Frontend**: Use Google Maps Autocomplete for address picking.
    2.  **Logic**: Calculate the distance between the chosen `Branch` and the customer's `lat/lng`.
    3.  **Restriction**: If `Distance > Branch.deliveryRadius`, show "Out of range" message.
    4.  **Time Check**: Compare `new Date()` with `Branch.deliveryOffTime`. If late, disable "Delivery" option.

---

## 2. Technical Roadmap (File-by-File)

### Step 1: Backend Update (`saif-rms-pos-backend`)
- [ ] Modify `prisma/schema.prisma` to add `password` & `authToken` to `Customer`.
- [ ] Create `app/api/customers/auth` routes.
- [ ] Update `app/api/orders/route.ts` to support public guest checkout or customer auth.

### Step 2: Website State Management (`Saif-RMS-POS-Website`)
- [ ] Update `src/context/AppContext.tsx` to include:
    - `cartItems`: Array of items.
    - `addToCart(item)` / `removeFromCart(id)`.
    - `user`: Authenticated customer data.
- [ ] Implement `src/hooks/useOrder.ts` for placing orders.

### Step 3: UI Implementation
- [ ] **Menu Page**: Ensure components like `Home2SpacialMenu` use live API data.
- [ ] **Cart Modal**: Create a sliding cart sidebar.
- [ ] **Checkout Page**: A dedicated page for Address, Payment Method, and Order Summary.
- [ ] **Order Tracking**: Page to show status timeline (Pending -> Kitchen -> Rider).

---

## 3. Using Existing Infrastructure
- **CMS**: Continue using the `websiteConfig` JSON for design elements (colors, banners).
- **Dashboard**: Use the existing "Items" and "Categories" modules in the dashboard to populate the website menu.
- **Riders**: When an order is assigned to a `Rider` in the dashboard, the website will display "Rider [Name] is on the way".

---

**Prepared for**: Saif RMS System
**Integration Target**: saif-rms-pos-backend + Saif-RMS-POS-Website
**Contact**: info@3pldynamics.org
