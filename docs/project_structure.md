# Project Structure

```
portfolio/
├── .github/                 # GitHub workflows and templates
├── .husky/                  # Pre-commit hooks
├── public/                  # Static assets
│   ├── fonts/               # Local fonts
│   ├── models/              # 3D models (.glb/.gltf)
│   ├── images/              # Static images
│   └── og/                  # Open Graph images
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── (marketing)/     # Group for main site pages
│   │   │   ├── page.tsx     # Home page
│   │   │   ├── about/       # About page
│   │   │   ├── projects/    # Projects page + individual project pages
│   │   │   ├── contact/     # Contact page
│   │   │   └── blog/        # Blog section
│   │   ├── api/             # API routes
│   │   ├── sitemap.ts       # Sitemap configuration
│   │   ├── robots.ts        # Robots.txt configuration
│   │   ├── layout.tsx       # Root layout
│   │   └── globals.css      # Global styles
│   ├── components/          # Reusable components
│   │   ├── ui/              # Base UI components
│   │   ├── layout/          # Layout components
│   │   ├── motion/          # Animation components
│   │   ├── three/           # Three.js components
│   │   ├── projects/        # Project-specific components
│   │   └── sections/        # Section components for pages
│   ├── content/             # ContentLayer content
│   │   ├── projects/        # Project MDX files
│   │   └── blog/            # Blog MDX files
│   ├── hooks/               # Custom React hooks
│   │   ├── use-theme.ts     # Theme handling
│   │   ├── use-scroll.ts    # Scroll position tracking
│   │   ├── use-animations.ts # Animation utilities
│   │   └── use-three.ts     # Three.js utilities
│   ├── lib/                 # Utility functions and configs
│   │   ├── animations/      # Animation utilities
│   │   ├── three/           # Three.js utilities
│   │   └── utils/           # General utilities
│   ├── store/               # Zustand stores
│   │   ├── theme-store.ts   # Theme state
│   │   ├── ui-store.ts      # UI state
│   │   └── three-store.ts   # Three.js state
│   ├── styles/              # CSS modules and style utilities
│   ├── types/               # TypeScript type definitions
│   │   ├── content.ts       # Content types
│   │   ├── projects.ts      # Project types
│   │   ├── three.ts         # Three.js types
│   │   └── index.ts         # Common types
│   └── config/              # Configuration files
│       ├── site.ts          # Site metadata
│       ├── nav.ts           # Navigation config
│       └── theme.ts         # Theme configuration
├── contentlayer.config.ts   # ContentLayer configuration
├── next.config.js           # Next.js configuration
├── tailwind.config.js       # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Dependencies and scripts
```

