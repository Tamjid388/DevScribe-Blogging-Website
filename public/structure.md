project-root(src)/
├─ app/
│  ├─ layout.tsx                  ← Root layout (Navbar, Footer)
│  ├─ page.tsx                    ← Home page
│  └─ (routes)/                   ← Optional: organize routes separately
│     ├─ blog/
│     │  ├─ page.tsx              ← /blog
│     │  └─ [slug]/page.tsx       ← /blog/my-post
│     ├─ about/page.tsx           ← /about
│     └─ contact/page.tsx         ← /contact

├─ components/
│  ├─ common/
│  │  ├─ Navbar.tsx
│  │  ├─ Footer.tsx
│  ├─ blog/
│  │  ├─ BlogCard.tsx
│  │  ├─ BlogList.tsx
│  ├─ ui/
│  │  ├─ Button.tsx
│  │  ├─ Input.tsx

├─ lib/
│  ├─ db.ts                       ← DB connection setup (e.g., Prisma, MongoDB)
│  ├─ auth.ts                     ← Optional: auth utils (NextAuth, JWT, etc.)

├─ utils/
│  ├─ helpers.ts                  ← Misc helper functions
│  ├─ constants.ts                ← Constants (routes, labels, etc.)

├─ styles/
│  ├─ globals.css
│  ├─ tailwind.config.ts

├─ public/                        ← Static assets (images, icons, etc.)

├─ app/api/                       ← Serverless API routes
│  └─ blog/
│     ├─ route.ts                 ← Handles POST, GET, etc. for blog

├─ prisma/                        ← (If using Prisma)
│  ├─ schema.prisma
│  └─ migrations/

├─ .env                           ← Env variables (DB URL, secrets, etc.)
├─ next.config.js
├─ tsconfig.json
