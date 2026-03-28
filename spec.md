# TrendiVault

## Current State
New project — no existing application files.

## Requested Changes (Diff)

### Add
- Full recreation of https://trendivault.my.canva.site/trendivault2
- Login / Register modal using authorization component
- Shopping cart (add items, view cart, manage quantities)
- Checkout flow using Cashfree payment links per product
- "Add to cart" button replacing "Get it now"

### Modify
N/A

### Remove
N/A

## Implementation Plan

### Backend
- Use authorization component for user auth (login/register)
- Store products as stable data: id, title, description, price, mrp, discount, category, cashfreeUrl, externalLink
- Cart stored client-side (localStorage or React state)
- No backend cart needed (digital products, per-user order state is minimal)

### Products (7 total)
1. 15+ Premium iPhone Lightroom Presets — ₹99 / MRP ₹1499 / 93% off — Cashfree: https://payments.cashfree.com/forms/steserpenohpI
2. 15000+ Lightroom Presets + Modded APK — ₹199 / MRP ₹499 / 56% off — Cashfree: https://payments.cashfree.com/forms/Lightroom
3. Best Editing VFX Pack (2570+ Assets) — ₹49 / MRP ₹699 / 93% off — Cashfree: https://payments.cashfree.com/forms/kcaplianbmihT
4. 50 GB Mega Editing Bundle — ₹99 / MRP ₹999 / 90% off — Cashfree: https://payments.cashfree.com/forms?code=kcapb50g
5. 675 GB Ultimate Graphic Designing Bundle — ₹199 / MRP ₹1499 / 93% off — Cashfree: https://payments.cashfree.com/forms?code=B675G
6. Free Earning Guide (₹1000–₹1L/month) — FREE / MRP ₹99 / 100% off — Google Drive link
7. Digital Product Selling New Method 2026 — ₹99 / MRP ₹299 / 67% off — External Canva site

### Frontend Pages/Sections
1. Sticky Navbar: TrendiVault brand + Instagram link + Login button + Cart icon (with badge)
2. Hero banner: "☟ All Trending Digital Products ☟" + sub-banner text
3. Product listing grid: 7 product cards with thumbnail, discount badge, price, MRP, "Add to cart" button
4. Product detail section: 5 expanded cards with full description, prices, "Add to cart" + "Buy Now" (Cashfree redirect)
5. Cart drawer/sidebar: list items, quantities, total, Checkout button (redirects to Cashfree for each item)
6. Login/Register modal: email + password form
7. Footer with Instagram link

### Design
- Background: linear-gradient(135deg, #000 0%, #ff0000 100%)
- Text: white primary, #ffde59 yellow for prices
- Strikethrough MRP: #a6a6a6
- Buttons: styled to match original
