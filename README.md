# Isha's Space Party – Gift Wishlist 🚀

A web app for coordinating birthday gifts for Isha's 9th birthday space party (May 9, 2026, Nuremberg). Parents can view the wishlist, claim gifts to avoid duplicates, and see real-time updates.

## Deployment on Netlify (Step by Step)

### 1. Create a Netlify account
Go to https://netlify.com and sign up for free.

### 2. Create a new project
- Click **"Add new site" → "Deploy manually"**
- Drag the entire **`isha-wishlist` folder** into the upload area
- Netlify will deploy the site and give you a URL like `https://abc123.netlify.app`

### 3. Rename the site (recommended)
- Go to **Site settings → General → Site name**
- Change the name to e.g. `isha-party-2026`
- Your permanent URL: `https://isha-party-2026.netlify.app`

### 4. Set the admin password ← IMPORTANT
The password is NOT stored in the code — it's kept securely in Netlify:
- Go to **Site settings → Environment variables**
- Click **"Add a variable"**
- Key:   `ADMIN_PASSWORD`
- Value: `YourSecretPassword123`  ← choose your own!
- Click **Save**
- Then: **Deploys → Trigger deploy → Deploy site** (so the variable takes effect)

### 5. Done! 🎉
- Share the URL with other parents — they can view the wishlist
- Log in with the 🔒 button (bottom right) and your password
- When you mark a gift as claimed, everyone sees the update immediately

## Updating the site
If you want to change the gift list:
- Edit `index.html` (or the default list in `netlify/functions/get-gifts.mjs`)
- Go to **Deploys → Deploy manually** and upload the folder again
- The URL stays the same!

## Project structure
```
isha-wishlist/
├── index.html                          ← The web page
├── netlify.toml                        ← Netlify configuration
└── netlify/
    └── functions/
        ├── get-gifts.mjs               ← Reads the gift list
        └── update-gifts.mjs            ← Saves changes (password-protected)
```

## How it works
- The gift list is stored in **Netlify Blobs** (included for free)
- When you mark a gift as claimed → it's saved to the cloud
- All parents see the same state when they load the page
- The password never leaves your browser (it's only sent to the backend for verification)
