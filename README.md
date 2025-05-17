# Portfolio Template

A modern, customizable portfolio website built with Next.js, Three.js, and TailwindCSS. This template offers an interactive 3D experience, content management through Contentlayer, and responsive design.

## Screenshot
![Portfolio Screenshot](https://mnscdttmmwkfyosjhaij.supabase.co/storage/v1/object/public/images-public/screens/Screenshot%202025-05-16%20at%202.41.45%20PM.png)


## Features

- ⚡ **Next.js 14** - The latest version with Server Components and App Router
- 🎨 **TailwindCSS** - Utility-first CSS framework for rapid UI development
- 🌐 **Three.js & React Three Fiber** - 3D rendering capabilities
- 📝 **Contentlayer** - Type-safe content management
- 🔄 **Framer Motion** - Animations and transitions
- 🪝 **React Hook Form** - Form validation with Zod
- 🧩 **Zustand** - Lightweight state management
- 🔍 **SEO Optimized** - Built with best practices for search engine visibility
- 📱 **Responsive Design** - Mobile-friendly interface
- 🎭 **GSAP** - Advanced animations
- 📁 **Type Safety** - Full TypeScript support

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ImDPS/portfolio-durgendra.git
   cd portfolio-durgendra
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

```
portfolio-durgendra/
├── app/                # Next.js app directory
│   ├── 3d/            # Three.js components
│   ├── gsap/          # GSAP animations
│   ├── motion/        # Framer Motion components
│   └── ui/            # UI components
├── content/           # Markdown/MDX content files
├── lib/               # Utility functions
├── public/            # Static assets
├── scripts/           # Helper scripts
├── styles/            # Global styles
└── types/             # TypeScript types
```

## Key Components

### 3D Elements
- `HeroBackground` - Interactive 3D background
- `InteractiveAvatar` - 3D avatar with animations

### Animation Components
- `MotionPage` - Page-level animations
- `MotionSection` - Section-level animations
- `MotionItem` - Item-level animations
- `ParallaxSection` - GSAP-powered parallax effects

### UI Components
- `Container` - Layout container
- `GradientSection` - Gradient background sections
- `MotionButton` - Animated buttons

## Configuration

### Next.js Configuration
The project uses TypeScript for Next.js configuration (`next.config.ts`):
```typescript
const { withContentlayer } = require('next-contentlayer');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.unsplash.com', 'unsplash.com'],
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false };
    return config;
  },
};

module.exports = withContentlayer(nextConfig);
```

### Contentlayer Setup
The project includes a prepare script (`scripts/prepare-install.js`) that automatically configures Contentlayer for Next.js 14 compatibility. This ensures smooth installation without manual configuration.

### Vercel Deployment
The project includes a `vercel.json` configuration for optimal deployment on Vercel:
```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install --legacy-peer-deps",
  "framework": "nextjs",
  "outputDirectory": ".next"
} 
```

## Customization

### Personal Information
Update your personal information in the appropriate files:
- `app/page.tsx` - Update hero section content
- `content/` - Add your projects and blog posts

### Theming
The project uses TailwindCSS for styling. Customize the theme in `tailwind.config.js`.

### 3D Elements
Modify 3D components in the `components/3d` directory to match your style.

## Dependencies

### Core
- `next`: ^14.0.4
- `react`: ^18.2.0
- `react-dom`: ^18.2.0
- `typescript`: ^5.2.2

### 3D Rendering
- `@react-three/drei`: ^9.88.0
- `@react-three/fiber`: ^8.15.11
- `three`: ^0.158.0
- `three-mesh-bvh`: ^0.5.0

### Styling
- `tailwindcss`: ^3.3.5
- `autoprefixer`: ^10.4.16
- `postcss`: ^8.4.31
- `clsx`: ^2.0.0
- `tailwind-merge`: ^2.0.0

### Animation
- `framer-motion`: ^10.16.4
- `gsap`: ^3.12.2

### Forms and Validation
- `react-hook-form`: ^7.47.0
- `@hookform/resolvers`: ^5.0.1
- `zod`: ^3.24.4

### Content Management
- `contentlayer`: ^0.3.4
- `next-contentlayer`: ^0.3.4
- `date-fns`: ^4.1.0
- `rehype-pretty-code`: ^0.10.0
- `rehype-slug`: ^5.1.0
- `remark-gfm`: ^3.0.1
- `shiki`: ^0.14.3

### State Management
- `zustand`: ^4.4.6

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Durgendra - Original creator
- Next.js Team
- Three.js Community
- TailwindCSS Team

## Support

If you find this template helpful, please consider giving it a star ⭐ on GitHub!

---

Created with ❤️ by Durgendra
