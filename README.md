## [3D-AI-Project](https://exslym.github.io/3D-AI-Project/)

[![preview](https://github.com/exslym/3D-AI-Project/blob/main/preview.jpg)](https://exslym.github.io/3D-AI-Project/)

### Zora'-T-shirt-AI** is a creator-first application that allows users to generate AI-powered t-shirt designs, preview them in an interactive 3D interface, and tokenize each design using the **Zora Coins Protocol**. This project bridges the gap between creative expression and onchain monetization — empowering artists, designers, and traders to create, collect, and earn. Built for [Zora's WaveHack](https://docs.zora.co/coins), the project aligns with the core goals of pushing Zora’s creator economy forward with scalable, AI-enhanced, real-time tools. An outstanding and impressive website for 3D t-shirts customizing tools with AI (DALL-E) using React, 3D-graphics and animations with ThreeJS and Framer Motion, TailwindCSS for styling, and openAI API!

### Vercel Deployment: [3D-AI-Project](https://tshirts-customizing-ai-project.vercel.app/)

---
## 🎯 What It Does

- 🎨 Users input a text prompt and generate a unique image using **OpenAI's DALL·E**.
- 👕 That image is applied to a 3D t-shirt in real time using **Three.js**.
- 🪙 Users can then **mint the design as a coin** using **Zora’s Coins SDK** — turning art into an onchain ERC-20 token tradable on Base.
- 📈 Coins are fully tradeable, allowing both **creator referral** and **trade referral** monetization.

---

## 🧩 Problem It Solves

Creators can now:
- Monetize their work instantly via Zora’s ERC-20 coin model
- Showcase and customize designs in real-time with rich 3D visuals
- Avoid the complexity of setting up contracts or marketplaces
- Bridge creative output with blockchain-native financial models

Meanwhile, traders can:
- Invest in trending, collectible designs as speculative assets
- Track creator performance and sentiment via Zora's protocol

---

## 🛠️ Technologies Used

### Frontend
- `React` – UI Framework
- `Three.js` – 3D rendering of t-shirt models
- `Framer Motion` – UI animations
- `TailwindCSS` – CSS framework
- `html2canvas` – for capturing image snapshots

### AI & Backend
- `OpenAI API (DALL·E)` – text-to-image generation
- `Node.js` + `Express` – API backend
- `Cloudinary` – image hosting and optimization
- `MongoDB` *(optional)* – store prompt history

### Blockchain & Zora SDK
- `Zora Coins SDK` – ERC-20 post+coin minting
- `Viem / Ethers.js` – wallet and Base chain interactions
- `Base` – high-speed L2 blockchain for transaction execution

---

## 🧪 How It Works

1. **Prompt → AI**: User enters a prompt like "cyberpunk flowers" → DALL·E generates art.
2. **Art → 3D Shirt**: Art is mapped onto a 3D t-shirt model using Three.js.
3. **3D Shirt → Coin**: Clicking “Coin It” triggers:
   - Upload to Cloudinary
   - Metadata packaging
   - Zora Coins SDK tokenization
4. **$COIN is live**: Users get a link to view/trade their new design-coin on Zora/Base.

---

## 💡 Zora Protocol Integration

This app meets **WaveHack evaluation requirements**:
- Uses **Zora Coins SDK** for minting coins from content
- Supports **creator + trade referrals**
- Tokenizes every t-shirt as a **ERC-20 coin**
- Enhances Zora’s creator/trader tools with AI & 3D UX
- Taps into Base for low-cost, high-speed tokenization

---

### Features:

- `Legacy Browsers` support via **@vite/plugin-legacy** with built-in **babel**
- `SCSS` support via **sass**
- `Autoprefix` support via **postcss**
- `3D Effects` support via **ThreeJS**
- `Animation` support via **Framer Motion**
- `Styles` support via **TailwindCSS**
