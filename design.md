# Design System & Styling Guide (`design.md`)

> **Purpose**: Use this document as the single source of truth for design parameters, color palettes, typography specs, layout rules, and component patterns to construct web applications that match the exact visual style, polish, and editorial aesthetic of this portfolio.

---

## 1. Aesthetic Persona & Core Philosophy

- **Style Keyword**: *Modern Editorial / High-Fidelity Architectural Minimalism*.
- **Visual Vibe**: Clean, high-density, high-contrast UI featuring tight sans-serif headlines paired with delicate serif-italic accents, sleek card elevations, electric blue accents, and deep dark-mode callout blocks.
- **Global Feel**: High editorial sophistication, precise alignment, subtle hover elevation micro-interactions, and zoom-density scaling.

---

## 2. Tech Stack & Required Packages

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.0.0 or ^7.0.0"
  },
  "devDependencies": {
    "autoprefixer": "^10.4.21",
    "postcss": "^8.5.6",
    "tailwindcss": "^3.4.17",
    "typescript": "^4.5.0",
    "vite": "^5.0.0"
  }
}
```

---

## 3. Typography & Font Pairing

### 3.1 Font Families
1. **Primary Sans**: `Inter` (Weights: `300` Light, `400` Regular, `500` Medium, `600` Semi-Bold, `700` Bold, `900` Black).
2. **Editorial Accent**: `Playfair Display` (Italic weights: `400` Light Italic, `600` Semi-Bold Italic).

### 3.2 HTML Font Import (`index.html`)
```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;900&family=Playfair+Display:ital,wght@0,400;0,600;1,400;1,600&display=swap"
  rel="stylesheet"
/>
```

### 3.3 Type Hierarchy Rules
- **Display Headlines (`H1`)**: `text-6xl sm:text-7xl md:text-8xl font-black tracking-tighter leading-[1.05] text-gray-900`.
- **Section Titles (`H2`)**: `text-5xl md:text-6xl font-black tracking-tighter text-gray-900`.
- **Card Titles (`H3`)**: `text-2xl font-bold tracking-tight text-gray-900`.
- **Eyebrow Tags / Category Labels**: `text-blue-600 text-xs font-bold tracking-widest uppercase mb-4` (e.g., `Archive 01`, `Recognition`, `Case Study`).
- **Editorial Emphasis Accent**: `<span className="font-editorial italic text-blue-600 font-light tracking-normal pr-2">word</span>`.
- **Body Paragraphs**: `text-gray-600 text-lg leading-relaxed font-light`.

---

## 4. Color Palette & Token Matrix

| Token Name | Hex Code | Tailwind Class | Usage Context |
| :--- | :--- | :--- | :--- |
| **Page Background** | `#FAFAFA` | `bg-[#fafafa]` | Primary body background (soft off-white) |
| **Card Surface** | `#FFFFFF` | `bg-white` | Section background, card panels |
| **Dark Block / Footer**| `#111111` | `bg-[#111111]` | Footer background, hero dark blocks, banner callout |
| **Primary Accent** | `#2563EB` | `bg-blue-600`, `text-blue-600` | CTA buttons, active links, accent text, eyebrow tags |
| **Primary Hover Accent**| `#1D4ED8` | `hover:bg-blue-700` | Primary button hover state |
| **Primary Text** | `#111111` | `text-gray-900` | Titles, bold text, high-emphasis content |
| **Secondary Text** | `#4B5563` | `text-gray-600` | Body copy, descriptions |
| **Muted Text** | `#6B7280` / `#9CA3AF` | `text-gray-500` / `text-gray-400` | Subtitles, footer links, metadata |
| **Light Border** | `#F3F4F6` / `#E5E7EB` | `border-gray-100` / `border-gray-200` | Section dividers, card outlines |
| **Dark Border** | `#1F2937` / `#4B5563` | `border-gray-800` / `border-gray-600` | Footer border, dark container outlines |

---

## 5. Global Styles & Configuration Setup

### 5.1 `tailwind.config.js`
```javascript
module.exports = {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

### 5.2 `src/index.css`
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

html {
  zoom: 0.9;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE/Edge */
}

html::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

body {
  font-family: 'Inter', sans-serif;
  background-color: #fafafa;
  color: #111111;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Custom utility for serif italics */
.font-editorial {
  font-family: 'Playfair Display', serif;
}
```

---

## 6. Container Architecture & Grid System

- **Global Shell**: `<div className="min-h-screen bg-[#fafafa] text-gray-900 selection:bg-blue-600 selection:text-white flex flex-col">`
- **Max Content Container**: `<main className="flex-grow w-full max-w-[1600px] mx-auto px-8 md:px-16">`
- **Section Padding**: Standard vertical section padding is `py-24` (or `pt-16 pb-32` for Hero).
- **Grid Layout Patterns**:
  - **Hero Grid**: `grid grid-cols-1 lg:grid-cols-12 gap-16 items-center` (`lg:col-span-7` text, `lg:col-span-5` media container).
  - **Feature 2-Col Grid**: `grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16`.
  - **Accolades 3-Col Grid**: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`.

---

## 7. Core Component Blueprint & Code Specs

### 7.1 Navigation Bar (`Layout.tsx`)
```tsx
<nav className="flex justify-between items-center py-6 px-8 md:px-16 max-w-[1600px] mx-auto w-full">
  <Link to="/" className="font-bold text-xl tracking-tight uppercase">BRAND NAME</Link>
  <div className="hidden md:flex gap-8 text-sm font-medium text-gray-500">
    <Link to="/" className="text-gray-900 hover:text-blue-600 transition-colors pb-1">Home</Link>
    <a href="#features" className="hover:text-gray-900 transition-colors">Features</a>
    <a href="#about" className="hover:text-gray-900 transition-colors">About</a>
    <a href="#contact" className="hover:text-gray-900 transition-colors">Contact</a>
  </div>
  <a
    href="#contact"
    className="bg-blue-600 text-white px-6 py-2.5 text-sm font-semibold rounded hover:bg-blue-700 transition-colors"
  >
    Action CTA
  </a>
</nav>
```

### 7.2 Primary & Secondary Buttons
```tsx
/* Solid Primary Button */
<button className="bg-blue-600 text-white px-8 py-4 text-sm font-semibold hover:bg-blue-700 transition-colors">
  Primary Action
</button>

/* Secondary Outline Button */
<button className="border border-gray-300 text-gray-900 px-8 py-4 text-sm font-semibold hover:border-blue-600 hover:text-blue-600 transition-colors flex items-center gap-2">
  Secondary Action
</button>

/* Rounded Pill Button */
<button className="border border-gray-200 text-gray-900 px-8 py-3 text-sm font-semibold rounded-full hover:border-gray-900 transition-colors">
  Explore All ↗
</button>
```

### 7.3 Section Header Pattern
```tsx
<div className="flex flex-col md:flex-row md:justify-between md:items-end mb-16">
  <div>
    <p className="text-blue-600 text-xs font-bold tracking-widest uppercase mb-4">EYEBROW CATEGORY</p>
    <h2 className="text-5xl md:text-6xl font-black tracking-tighter">Main Section Title</h2>
  </div>
  <p className="text-gray-500 font-editorial italic text-lg max-w-sm mt-6 md:mt-0">
    Editorial descriptive caption summarizing the section context.
  </p>
</div>
```

### 7.4 Interactive Card / Grid Tile
```tsx
<div className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:-translate-y-2 hover:shadow-xl transition-[transform,box-shadow] duration-300 ease-out cursor-pointer">
  <div className="aspect-[4/3] overflow-hidden bg-gray-100 relative">
    <img
      src="/path/to/image.jpg"
      alt="Card Media"
      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
    />
  </div>
  <div className="p-8">
    <span className="text-blue-600 text-xs font-bold tracking-widest uppercase mb-2 block">TAG NAME</span>
    <h3 className="text-xl font-bold tracking-tight text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
      Card Headline
    </h3>
    <p className="text-gray-500 text-sm leading-relaxed">
      Detailed summary or feature description for the card item.
    </p>
  </div>
</div>
```

### 7.5 Dark Callout Banner (`Contact / CTA`)
```tsx
<section className="bg-[#111111] text-white py-32 px-8 text-center mt-12 mb-[-32px] rounded-t-3xl">
  <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
    Ready to build <br />
    something <span className="font-editorial italic font-light text-gray-300">timeless?</span>
  </h2>
  <p className="text-gray-400 font-editorial italic text-xl mb-12">
    Subheader description with editorial italic emphasis.
  </p>
  <div className="flex flex-col sm:flex-row justify-center gap-4">
    <a
      href="mailto:contact@example.com"
      className="bg-blue-600 text-white px-8 py-4 text-sm font-semibold hover:bg-blue-500 transition-colors rounded"
    >
      Get in Touch
    </a>
    <a
      href="#secondary"
      className="border border-gray-600 text-white px-8 py-4 text-sm font-semibold hover:border-gray-400 transition-colors rounded"
    >
      Secondary Action
    </a>
  </div>
</section>
```

### 7.6 Footer Pattern
```tsx
<footer className="bg-[#111111] text-gray-400 py-8 px-8 md:px-16 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm mt-auto">
  <div className="font-bold text-white tracking-tight uppercase">BRAND NAME</div>
  <div className="flex gap-6">
    <a href="#" className="hover:text-white transition-colors">GitHub</a>
    <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
    <a href="#" className="hover:text-white transition-colors">Email</a>
  </div>
  <div>© 2026 Brand Name. All rights reserved.</div>
</footer>
```

---

## 8. Micro-Interactions & Transitions Rules

1. **Card Lift Effect**:
   - Class: `hover:-translate-y-2 hover:shadow-xl transition-[transform,box-shadow] duration-300 ease-out will-change-transform`
2. **Image Hover Zoom & Color Reveal**:
   - Image default: `grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700`
3. **Text Link Hover**:
   - Class: `transition-colors hover:text-blue-600`
4. **Underline Arrow Hover**:
   - Class: `group-hover:text-blue-600 transition-colors flex items-center gap-1 underline underline-offset-4 decoration-blue-600/40 group-hover:decoration-blue-600`

---

## 9. Checklist for Coding Agents

When given this `design.md` file, the coding agent MUST ensure:
- [ ] Font imports for `Inter` and `Playfair Display` are included in `index.html`.
- [ ] Custom `.font-editorial` utility is added to `src/index.css`.
- [ ] `html` element includes `zoom: 0.9` and hidden scrollbar rules.
- [ ] Primary accent color is strictly `#2563eb` (`blue-600`), and dark backgrounds use `#111111`.
- [ ] Headings alternate sans-serif black headers with italic serif highlights (`font-editorial italic font-light text-blue-600`).
- [ ] Cards have subtle borders (`border-gray-200`), rounded corners (`rounded-2xl` or `rounded-xl`), and image zoom/color reveal hover effects.
- [ ] Outer layout containers strictly respect `max-w-[1600px] mx-auto px-8 md:px-16`.
