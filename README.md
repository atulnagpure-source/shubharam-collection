# Shubharam Collection — Storefront

A single-file luxury ethnic wear storefront featuring hand-woven sarees, suits, and bridal lehengas with direct WhatsApp checkout and order concierge.

---

## ⚡ How to Open and View Right Now

You can view and test the storefront **immediately** without installing Node.js:

1. Double-click **`index.html`** in this folder, or open it in your browser (Chrome, Edge, Firefox, Brave, Safari).
2. Everything works out of the box:
   - Browse the 6 curated artisan collections
   - Category filter pills (All, Sarees, Suits & Kurtas, Dupattas & Shawls, Lehengas)
   - Quick View modal with size selector and quantity controls
   - Sliding Bag Drawer with total calculations
   - Direct WhatsApp integration with pre-formatted order details

---

## 📞 How to Configure for Your Business

Open `App.jsx` (or `index.html`) and edit the `STORE` constant near the top:

```javascript
const STORE = {
  name: "Shubharam Collection",
  whatsapp: "919000000000", // ← Your WhatsApp number with country code (digits only)
  instagram: "https://www.instagram.com/yourhandle",
  email: "care@shubharamcollection.com",
  city: "Jaipur · Rajasthan",
  hours: "Mon – Sat · 10 am to 8 pm IST",
};
```

### Adding or Updating Products
Products are listed in the `PRODUCTS` array:
- `id`: unique slug
- `name`: product title
- `detail`: subtitle or fabric details
- `price`: price in INR
- `mrp`: original price (optional, for discount display)
- `category`: category for filtering
- `tag`: badge like "Signature", "New", "Limited", "Bridal"
- `sizes`: array of available sizes (e.g. `["XS", "S", "M", "L", "XL"]` or `["Free Size"]`)
- `colour`: color description
- `image`: image URL
- `note`: karigar craft description

---

## 🚀 Running with Node / Vite (Optional)

If you have or install Node.js:

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Build for production deployment (Vercel, Netlify, Cloudflare Pages)
npm run build
```
