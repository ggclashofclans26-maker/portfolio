# Afifa Tahsin Mridula — Portfolio

A premium, fully responsive personal portfolio built with plain HTML5, CSS3, and vanilla JavaScript (no frameworks).

## 📁 Folder structure

```
portfolio/
├── index.html              → all page content/sections
├── style.css                → all styling, theme tokens, animations
├── script.js                 → all interactivity
├── README.md
└── assets/
    ├── images/
    │   └── profile.jpg      → ⚠️ ADD YOUR PHOTO HERE (see below)
    ├── icons/
    │   └── favicon.png      → ⚠️ ADD A FAVICON HERE (optional)
    └── fonts/                → empty — fonts load from Google Fonts CDN
```

## 🖼️ Adding your profile photo

1. Save your photo as **`profile.jpg`** (square photo, at least 500×500px works best).
2. Place it inside `assets/images/`.
3. That's it — `index.html` already references `assets/images/profile.jpg`. If the file is missing, an "ATM" initials avatar is shown automatically so the page never breaks.

## 📄 Adding your CV

1. Export your CV/resume as a PDF.
2. Name it **`Afifa_Tahsin_Mridula_CV.pdf`**.
3. Place it directly inside the `assets/` folder (next to `index.html`... actually place it at `assets/Afifa_Tahsin_Mridula_CV.pdf`, matching the path already linked in the "Download CV" button).

## ▶️ Running locally in VS Code

1. Open the `portfolio` folder in VS Code (`File → Open Folder…`).
2. Install the **Live Server** extension (by Ritwick Dey) if you don't have it.
3. Right-click `index.html` → **Open with Live Server**.
4. The site opens at `http://127.0.0.1:5500` and reloads automatically as you edit.

(Alternatively, just double-click `index.html` to open it directly in your browser — everything works without a server since there's no build step.)

## 🔧 Updating content later

- **Text/content** → edit the relevant section inside `index.html`.
- **Colors/fonts/spacing** → edit the CSS variables at the top of `style.css` under `:root`.
- **Typing animation roles, form behavior, etc.** → edit `script.js`.
- **Contact form** → the form currently only validates and shows a confirmation message in the browser (no backend). To actually receive messages, connect it to a free service like [Formspree](https://formspree.io) or [EmailJS](https://www.emailjs.com/) by pointing the `<form>` action or `script.js` submit handler at their API.

## 🐙 Uploading to GitHub

1. Create a new repository on GitHub (e.g. `portfolio`).
2. In the `portfolio` folder, run:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio commit"
   git branch -M main
   git remote add origin https://github.com/<your-username>/portfolio.git
   git push -u origin main
   ```

## 🌐 Deploying — GitHub Pages

1. Push the project to GitHub (see above).
2. Go to your repo → **Settings → Pages**.
3. Under "Build and deployment", set **Source** to `Deploy from a branch`, branch `main`, folder `/ (root)`.
4. Save. Your site will be live at `https://<your-username>.github.io/<repo-name>/` within a minute or two.

## 🌐 Deploying — Netlify

1. Go to [netlify.com](https://netlify.com) and sign in (GitHub login works).
2. Click **Add new site → Import an existing project**, connect GitHub, and pick your repository.
3. Leave build settings empty (no build command, publish directory = `/`).
4. Click **Deploy site**. Netlify gives you a live URL immediately, and redeploys automatically on every push.

## 🌐 Deploying — Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub.
2. Click **Add New → Project**, select your repository.
3. Framework preset: **Other**. Leave build command empty, output directory = `/`.
4. Click **Deploy**. Vercel hosts it instantly and redeploys on every push to `main`.

---
Designed & developed by **Afifa Tahsin Mridula**.
