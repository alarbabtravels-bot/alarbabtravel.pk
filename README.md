# Al Arbab Travels — Official Website Frontend

> Modern, high-performance web platform for **Al Arbab Travels (Pvt) Ltd**, premier travel agency and visa consultancy based in Blue Area, Islamabad, Pakistan. Built with **React 18**, **Vite**, **React Router 6**, and **Vanilla CSS**.

---

## 🚀 Standard Operational Workflow (Update → Test → Deploy)

Follow this numbered step-by-step process whenever you make updates to the website:

### Step 1: Make Local Code Changes
- Edit the relevant components in `src/components/`, pages in `src/pages/`, or data in `src/data/`.
- If adding new routes or services, ensure:
  - Slugs and aliases are consistent in `src/data/servicesData.js` or `src/data/destinationsData.js`.
  - Routes are registered in `src/App.jsx`.
  - Canonical links and redirects (if applicable) are synced in `vercel.json`.

### Step 2: Test Locally with Dev Server
```bash
npm run dev
```
- Open `http://localhost:5173` in your browser.
- Verify UI responsiveness, check console for any warnings, and confirm interactive modals/forms work as intended.

### Step 3: Run the Production Build Test
```bash
npm run build
```
- This automatically regenerates `sitemap.xml` with all 44+ active URLs and compiles the Vite production bundle into `dist/`.
- **Ensure the command exits with code 0 and ZERO errors.**
- (Optional) Preview production bundle locally:
  ```bash
  npm run preview
  ```

### Step 4: Check Git Status & Stage Changes
```bash
git status
git add .
```
- Verify that only intended files are staged (no temporary media, unneeded test scripts, or `.env` files).

### Step 5: Commit with Descriptive Message
```bash
git commit -m "feat/fix: concise description of changes"
```

### Step 6: Push to GitHub
```bash
git push origin main
```

### Step 7: Verify Vercel Deployment
1. Log in to your [Vercel Dashboard](https://vercel.com).
2. Check the **Deployments** tab for the latest build triggered by your commit.
3. Confirm the build status is **Ready** (green checkmark).
4. Visit the live production domain (`https://alarbabtravel.pk` or your Vercel preview URL) to verify the changes in production.

---

## 🛠 Tech Stack & Architecture

- **Frontend Core**: React 18.3, React Router DOM 6.28
- **Build Tool**: Vite 5.4 with `@vitejs/plugin-react`
- **Icons**: Lucide React
- **Animations**: GSAP & CSS3 Keyframes
- **Styling**: Vanilla CSS Design System with responsive variables (`src/index.css`)
- **Hosting & Edge Routing**: Vercel (`vercel.json`)
- **SEO Engine**: Dynamic meta tags, JSON-LD structured data, automatic XML sitemap generator (`scripts/generate-sitemap.js`)

---

## 📁 Project Structure

```text
alarbab-pk-website/
├── public/                 # Static assets, webp images, favicons, robots.txt, sitemap.xml
├── scripts/
│   └── generate-sitemap.js # Automated SEO sitemap builder (runs on build)
├── src/
│   ├── components/         # 10 Active React UI components
│   │   ├── BrandLogo.jsx
│   │   ├── CountryMarqueeStrip.jsx
│   │   ├── Footer.jsx
│   │   ├── HeroSearchWidget.jsx
│   │   ├── InteractiveDestinationCards.jsx
│   │   ├── Navbar.jsx
│   │   ├── SEO.jsx
│   │   ├── SiteSearch.jsx
│   │   ├── VisaEligibilityModal.jsx
│   │   └── WhatsAppFloatingButton.jsx
│   ├── data/               # Structured content & metadata
│   │   ├── blogData.js
│   │   ├── destinationsData.js
│   │   ├── faqData.js
│   │   ├── servicesData.js
│   │   └── testimonialsData.js
│   ├── pages/              # 7 Core Pages
│   │   ├── About.jsx
│   │   ├── Blog.jsx
│   │   ├── Contact.jsx
│   │   ├── Destinations.jsx
│   │   ├── FAQ.jsx
│   │   ├── Home.jsx
│   │   └── Services.jsx
│   ├── App.jsx             # Main router & modal state manager
│   ├── index.css           # Global design system & typography tokens
│   └── main.jsx            # Application entry point
├── .env.example            # Environment variables template
├── .gitignore              # Git ignore rules
├── index.html              # HTML5 shell with preloaded fonts and Schema.org
├── package.json            # Scripts & dependencies
├── vercel.json             # Vercel SPA rewrites, redirects & security headers
└── vite.config.js          # Vite build configuration
```

---

## 📞 Business Information

- **Company**: Al Arbab Travels (Pvt) Ltd
- **Office**: Eagle Plaza, Mezzanine 121, Fazal-e-Haq Road, Blue Area, Islamabad
- **UAN / Landline**: +92 51 2000066
- **WhatsApp**: +92 309 9923232
- **Website**: [alarbabtravel.pk](https://alarbabtravel.pk)
