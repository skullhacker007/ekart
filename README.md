# E-Kart | Modern E-Commerce MVP

A robust, scalable e-commerce foundation built with **Next.js 14**, **Prisma**, and **Tailwind CSS**. This project follows the **Feature-Sliced Design (FSD)** architectural pattern to ensure long-term maintainability and clean separation of concerns.

---

## 🚀 Tech Stack

- **Framework:** [Next.js 14 (App Router)](https://nextjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Database / ORM:** [PostgreSQL](https://www.postgresql.org/) with [Prisma](https://www.prisma.io/)
- **Validation:** [Zod](https://zod.dev/)
- **State Management:** [Zustand](https://github.com/pmndrs/zustand) (Recommended for Features) / React Context
- **Package Manager:** [pnpm](https://pnpm.io/)

---

## 🏗️ Architecture Overview

The project uses a hybrid of **Next.js App Router** and **Feature-Sliced Design (FSD)**.

### Folder Structure

````text
e-kart/
├C:.
│   .env
│   .env.local
│   .gitignore
│   debug.txt
│   eslint.config.mjs
│   next-env.d.ts
│   next.config.mjs
│   package.json
│   pnpm-lock.yaml
│   pnpm-workspace.yaml
│   postcss.config.js
│   postcss.config.mjs
│   prisma_error.log
│   README.md
│   skills-lock.json
│   tailwind.config.js
│   tsconfig.json
│   tsconfig.tsbuildinfo
│
├───.agents
│   └───skills
│       └───neon-postgres
│               SKILL.md
│
├───.claude
│   └───skills
│       └───neon-postgres
│               SKILL.md
│
├───.next
│   │   app-build-manifest.json
│   │   build-manifest.json
│   │   package.json
│   │   react-loadable-manifest.json
│   │   trace
│   │
│   ├───cache
│   │   ├───swc
│   │   │   └───plugins
│   │   │       └───v7_windows_x86_64_0.106.15
│   │   └───webpack
│   │       ├───client-development
│   │       │       0.pack.gz
│   │       │       1.pack.gz
│   │       │       10.pack.gz
│   │       │       11.pack.gz
│   │       │       12.pack.gz
│   │       │       13.pack.gz
│   │       │       14.pack.gz
│   │       │       2.pack.gz
│   │       │       3.pack.gz
│   │       │       4.pack.gz
│   │       │       5.pack.gz
│   │       │       6.pack.gz
│   │       │       7.pack.gz
│   │       │       8.pack.gz
│   │       │       9.pack.gz
│   │       │       index.pack.gz
│   │       │       index.pack.gz.old
│   │       │
│   │       └───server-development
│   │               0.pack.gz
│   │               1.pack.gz
│   │               10.pack.gz
│   │               11.pack.gz
│   │               12.pack.gz
│   │               13.pack.gz
│   │               2.pack.gz
│   │               3.pack.gz
│   │               4.pack.gz
│   │               5.pack.gz
│   │               6.pack.gz
│   │               7.pack.gz
│   │               8.pack.gz
│   │               9.pack.gz
│   │               index.pack.gz
│   │               index.pack.gz.old
│   │
│   ├───server
│   │   │   app-paths-manifest.json
│   │   │   crypto-node_buffer.js
│   │   │   interception-route-rewrite-manifest.js
│   │   │   middleware-build-manifest.js
│   │   │   middleware-manifest.json
│   │   │   middleware-react-loadable-manifest.js
│   │   │   next-font-manifest.js
│   │   │   next-font-manifest.json
│   │   │   node_buffer-_a4ce0.js
│   │   │   node_buffer-_a4ce1.js
│   │   │   pages-manifest.json
│   │   │   server-reference-manifest.js
│   │   │   server-reference-manifest.json
│   │   │   webpack-runtime.js
│   │   │
│   │   ├───app
│   │   │   │   page.js
│   │   │   │   page_client-reference-manifest.js
│   │   │   │
│   │   │   ├───api
│   │   │   │   └───auth
│   │   │   │       └───powersync
│   │   │   │               route.js
│   │   │   │
│   │   │   └───_not-found
│   │   │           page.js
│   │   │           page_client-reference-manifest.js
│   │   │
│   │   ├───static
│   │   │   └───media
│   │   │           mc-wa-sqlite-async.6a59104b.wasm
│   │   │           mc-wa-sqlite.dcee4fba.wasm
│   │   │           wa-sqlite-async.6d2cf255.wasm
│   │   │           wa-sqlite.aca54392.wasm
│   │   │
│   │   └───vendor-chunks
│   │           @journeyapps+wa-sqlite@1.5.0.js
│   │           @powersync+common@1.48.0.js
│   │           @powersync+react@1.9.0_@powersync+common@1.48.0_react@18.3.1.js
│   │           @powersync+web@1.35.0_@jour_2a787ea257dfd31727f135f953701a5a.js
│   │           @swc+helpers@0.5.5.js
│   │           async-mutex@0.5.0.js
│   │           bson@6.10.4.js
│   │           comlink@4.4.2.js
│   │           event-iterator@2.0.0.js
│   │           jose@6.2.0.js
│   │           next@14.2.3_react-dom@18.3.1_react@18.3.1__react@18.3.1.js
│   │
│   ├───static
│   │   ├───chunks
│   │   │   │   app-pages-internals.js
│   │   │   │   main-app.js
│   │   │   │   polyfills.js
│   │   │   │   webpack.js
│   │   │   │   _app-pages-browser_node_modules_pnpm_bson_6_10_4_node_modules_bson_lib_bson_mjs.js
│   │   │   │   _app-pages-browser_node_modules_pnpm_journeyapps_wa-sqlite_1_5_0_node_modules_journeyapps_wa--287fec.js
│   │   │   │   _app-pages-browser_node_modules_pnpm_journeyapps_wa-sqlite_1_5_0_node_modules_journeyapps_wa--6c5367.js
│   │   │   │   _app-pages-browser_node_modules_pnpm_journeyapps_wa-sqlite_1_5_0_node_modules_journeyapps_wa--7bf40b.js
│   │   │   │   _app-pages-browser_node_modules_pnpm_journeyapps_wa-sqlite_1_5_0_node_modules_journeyapps_wa--8df861.js
│   │   │   │   _app-pages-browser_node_modules_pnpm_journeyapps_wa-sqlite_1_5_0_node_modules_journeyapps_wa--bb8072.js
│   │   │   │   _app-pages-browser_node_modules_pnpm_journeyapps_wa-sqlite_1_5_0_node_modules_journeyapps_wa--e5afc5.js
│   │   │   │   _app-pages-browser_node_modules_pnpm_journeyapps_wa-sqlite_1_5_0_node_modules_journeyapps_wa--f83eba.js
│   │   │   │   _app-pages-browser_node_modules_pnpm_powersync_web_1_35_0__jour_2a787ea257dfd31727f135f953701-1bdff50.js
│   │   │   │   _app-pages-browser_node_modules_pnpm_powersync_web_1_35_0__jour_2a787ea257dfd31727f135f953701-1bdff51.js
│   │   │   │   _app-pages-browser_node_modules_pnpm_powersync_web_1_35_0__jour_2a787ea257dfd31727f135f953701-efe1ba.js
│   │   │   │
│   │   │   └───app
│   │   │       │   layout.js
│   │   │       │   page.js
│   │   │       │
│   │   │       └───_not-found
│   │   │               page.js
│   │   │
│   │   ├───css
│   │   │   └───app
│   │   │           layout.css
│   │   │
│   │   ├───development
│   │   │       _buildManifest.js
│   │   │       _ssgManifest.js
│   │   │
│   │   ├───media
│   │   │       mc-wa-sqlite-async.6a59104b.wasm
│   │   │       mc-wa-sqlite.dcee4fba.wasm
│   │   │       wa-sqlite-async.6d2cf255.wasm
│   │   │       wa-sqlite.aca54392.wasm
│   │   │
│   │   └───webpack
│   │       │   11860e4c006b13f0.71d862e380c9faac.hot-update.json
│   │       │   11860e4c006b13f0.74a924d2a0d43cc6.hot-update.json
│   │       │   11860e4c006b13f0.e97efa5d6078f828.hot-update.json
│   │       │   11860e4c006b13f0.webpack.hot-update.json
│   │       │   122194fd04bce907.71d862e380c9faac.hot-update.json
│   │       │   122194fd04bce907.74a924d2a0d43cc6.hot-update.json
│   │       │   122194fd04bce907.e97efa5d6078f828.hot-update.json
│   │       │   122194fd04bce907.webpack.hot-update.json
│   │       │   12ea0c42418785ab.71d862e380c9faac.hot-update.json
│   │       │   12ea0c42418785ab.74a924d2a0d43cc6.hot-update.json
│   │       │   12ea0c42418785ab.e97efa5d6078f828.hot-update.json
│   │       │   12ea0c42418785ab.webpack.hot-update.json
│   │       │   633457081244afec._.hot-update.json
│   │       │   a1b27f0aca71989f.71d862e380c9faac.hot-update.json
│   │       │   a1b27f0aca71989f.74a924d2a0d43cc6.hot-update.json
│   │       │   a1b27f0aca71989f.e97efa5d6078f828.hot-update.json
│   │       │   a1b27f0aca71989f.webpack.hot-update.json
│   │       │   be736896961107c4.71d862e380c9faac.hot-update.json
│   │       │   be736896961107c4.74a924d2a0d43cc6.hot-update.json
│   │       │   be736896961107c4.e97efa5d6078f828.hot-update.json
│   │       │   be736896961107c4.webpack.hot-update.json
│   │       │   d527d161974b4444.71d862e380c9faac.hot-update.json
│   │       │   d527d161974b4444.74a924d2a0d43cc6.hot-update.json
│   │       │   d527d161974b4444.e97efa5d6078f828.hot-update.json
│   │       │   d527d161974b4444.webpack.hot-update.json
│   │       │   webpack.11860e4c006b13f0.hot-update.js
│   │       │   webpack.122194fd04bce907.hot-update.js
│   │       │   webpack.12ea0c42418785ab.hot-update.js
│   │       │   webpack.a1b27f0aca71989f.hot-update.js
│   │       │   webpack.be736896961107c4.hot-update.js
│   │       │   webpack.d527d161974b4444.hot-update.js
│   │       │   _app-pages-browser_node_modules_pnpm_powersync_web_1_35_0__jour_2a787ea257dfd31727f135f953701-1bdff50.11860e4c006b13f0.hot-update.js
│   │       │   _app-pages-browser_node_modules_pnpm_powersync_web_1_35_0__jour_2a787ea257dfd31727f135f953701-1bdff50.122194fd04bce907.hot-update.js
│   │       │   _app-pages-browser_node_modules_pnpm_powersync_web_1_35_0__jour_2a787ea257dfd31727f135f953701-1bdff50.12ea0c42418785ab.hot-update.js
│   │       │   _app-pages-browser_node_modules_pnpm_powersync_web_1_35_0__jour_2a787ea257dfd31727f135f953701-1bdff50.a1b27f0aca71989f.hot-update.js
│   │       │   _app-pages-browser_node_modules_pnpm_powersync_web_1_35_0__jour_2a787ea257dfd31727f135f953701-1bdff50.be736896961107c4.hot-update.js
│   │       │   _app-pages-browser_node_modules_pnpm_powersync_web_1_35_0__jour_2a787ea257dfd31727f135f953701-1bdff50.d527d161974b4444.hot-update.js
│   │       │   _app-pages-browser_node_modules_pnpm_powersync_web_1_35_0__jour_2a787ea257dfd31727f135f953701-1bdff51.11860e4c006b13f0.hot-update.js
│   │       │   _app-pages-browser_node_modules_pnpm_powersync_web_1_35_0__jour_2a787ea257dfd31727f135f953701-1bdff51.122194fd04bce907.hot-update.js
│   │       │   _app-pages-browser_node_modules_pnpm_powersync_web_1_35_0__jour_2a787ea257dfd31727f135f953701-1bdff51.12ea0c42418785ab.hot-update.js
│   │       │   _app-pages-browser_node_modules_pnpm_powersync_web_1_35_0__jour_2a787ea257dfd31727f135f953701-1bdff51.a1b27f0aca71989f.hot-update.js
│   │       │   _app-pages-browser_node_modules_pnpm_powersync_web_1_35_0__jour_2a787ea257dfd31727f135f953701-1bdff51.be736896961107c4.hot-update.js
│   │       │   _app-pages-browser_node_modules_pnpm_powersync_web_1_35_0__jour_2a787ea257dfd31727f135f953701-1bdff51.d527d161974b4444.hot-update.js
│   │       │   _app-pages-browser_node_modules_pnpm_powersync_web_1_35_0__jour_2a787ea257dfd31727f135f953701-efe1ba.11860e4c006b13f0.hot-update.js
│   │       │   _app-pages-browser_node_modules_pnpm_powersync_web_1_35_0__jour_2a787ea257dfd31727f135f953701-efe1ba.122194fd04bce907.hot-update.js
│   │       │   _app-pages-browser_node_modules_pnpm_powersync_web_1_35_0__jour_2a787ea257dfd31727f135f953701-efe1ba.12ea0c42418785ab.hot-update.js
│   │       │   _app-pages-browser_node_modules_pnpm_powersync_web_1_35_0__jour_2a787ea257dfd31727f135f953701-efe1ba.a1b27f0aca71989f.hot-update.js
│   │       │   _app-pages-browser_node_modules_pnpm_powersync_web_1_35_0__jour_2a787ea257dfd31727f135f953701-efe1ba.be736896961107c4.hot-update.js
│   │       │   _app-pages-browser_node_modules_pnpm_powersync_web_1_35_0__jour_2a787ea257dfd31727f135f953701-efe1ba.d527d161974b4444.hot-update.js
│   │       │
│   │       └───app
│   │               layout.11860e4c006b13f0.hot-update.js
│   │               layout.122194fd04bce907.hot-update.js
│   │               layout.12ea0c42418785ab.hot-update.js
│   │               layout.a1b27f0aca71989f.hot-update.js
│   │               layout.be736896961107c4.hot-update.js
│   │               layout.d527d161974b4444.hot-update.js
│   │
│   └───types
│       │   package.json
│       │
│       └───app
│           │   layout.ts
│           │   page.ts
│           │
│           └───api
│               └───auth
│                   └───powersync
│                           route.ts
│
├───.vscode
│       settings.json
│
├───app
│   │   layout.tsx
│   │   page.tsx
│   │
│   ├───account
│   ├───admin
│   │       page.tsx
│   │
│   ├───api
│   │   ├───auth
│   │   │   └───powersync
│   │   │           route.ts
│   │   │
│   │   └───v1
│   │       ├───admin
│   │       │   ├───products
│   │       │   │       route.ts
│   │       │   │
│   │       │   └───shipments
│   │       │       └───[shipmentId]
│   │       │               route.ts
│   │       │
│   │       ├───auth
│   │       │   ├───login
│   │       │   │       route.ts
│   │       │   │
│   │       │   ├───refresh
│   │       │   │       route.ts
│   │       │   │
│   │       │   └───register
│   │       │           route.ts
│   │       │
│   │       ├───cart
│   │       │       route.ts
│   │       │
│   │       ├───checkout
│   │       │       route.ts
│   │       │
│   │       ├───orders
│   │       │   │   route.ts
│   │       │   │
│   │       │   └───[orderId]
│   │       │       └───shipment
│   │       │               route.ts
│   │       │
│   │       ├───payments
│   │       │       route.ts
│   │       │
│   │       └───products
│   │           │   route.ts
│   │           │
│   │           └───[productId]
│   │               └───reviews
│   │                       route.ts
│   │
│   ├───cart
│   │       page.tsx
│   │
│   ├───checkout
│   │       page.tsx
│   │
│   ├───login
│   │       page.tsx
│   │
│   ├───orders
│   ├───products
│   │   │   page.tsx
│   │   │
│   │   └───[slug]
│   │           page.tsx
│   │
│   ├───register
│   │       page.tsx
│   │
│   ├───search
│   └───wishlist
├───prisma
│   │   schema.prisma
│   │   seed.ts
│   │
│   └───migrations
│       │   migration_lock.toml
│       │
│       └───20260306105023_add_idempotency_keys
│               migration.sql
│
├───public
│   ├───icons
│   └───images
├───scripts
├───src
│   │   middleware.ts
│   │
│   ├───components
│   │   ├───examples
│   │   │       LiveOrdersList.tsx
│   │   │
│   │   ├───layout
│   │   │       Container.tsx
│   │   │       Footer.tsx
│   │   │       Navbar.tsx
│   │   │
│   │   ├───providers
│   │   │       PowerSyncProvider.tsx
│   │   │       Providers.tsx
│   │   │
│   │   └───ui
│   │           Button.tsx
│   │           Input.tsx
│   │           loader-page.tsx
│   │           Modal.tsx
│   │           ProductCard.tsx
│   │
│   ├───config
│   │       env.ts
│   │
│   ├───constants
│   │       config.ts
│   │       routes.ts
│   │
│   ├───features
│   │   ├───admin
│   │   │   ├───actions
│   │   │   ├───components
│   │   │   ├───services
│   │   │   │       .gitkeep
│   │   │   │
│   │   │   └───types
│   │   │           .gitkeep
│   │   │
│   │   ├───analytics
│   │   │   ├───actions
│   │   │   ├───components
│   │   │   ├───services
│   │   │   │       .gitkeep
│   │   │   │
│   │   │   └───types
│   │   │           .gitkeep
│   │   │
│   │   ├───auth
│   │   │   │   auth.schema.ts
│   │   │   │   auth.service.ts
│   │   │   │   auth.store.ts
│   │   │   │   auth.types.ts
│   │   │   │
│   │   │   ├───actions
│   │   │   │       auth.actions.ts
│   │   │   │
│   │   │   ├───components
│   │   │   │       LoginForm.tsx
│   │   │   │
│   │   │   ├───services
│   │   │   └───types
│   │   ├───cart
│   │   │   │   cart.service.ts
│   │   │   │   cart.store.ts
│   │   │   │
│   │   │   ├───actions
│   │   │   │       cart.actions.ts
│   │   │   │
│   │   │   ├───components
│   │   │   │       CartItem.tsx
│   │   │   │       CartSummary.tsx
│   │   │   │
│   │   │   ├───services
│   │   │   │       cart.repository.ts
│   │   │   │
│   │   │   └───types
│   │   ├───catalog
│   │   │   │   catalog.schema.ts
│   │   │   │
│   │   │   ├───actions
│   │   │   ├───components
│   │   │   ├───services
│   │   │   │       catalog.repository.ts
│   │   │   │       catalog.service.ts
│   │   │   │       product.repository.ts
│   │   │   │
│   │   │   └───types
│   │   ├───checkout
│   │   │   ├───actions
│   │   │   ├───components
│   │   │   ├───services
│   │   │   │       checkout.service.ts
│   │   │   │
│   │   │   └───types
│   │   ├───communications
│   │   │   ├───actions
│   │   │   ├───components
│   │   │   ├───services
│   │   │   │       .gitkeep
│   │   │   │       email.service.ts
│   │   │   │
│   │   │   └───types
│   │   │           .gitkeep
│   │   │
│   │   ├───inventory
│   │   │   ├───actions
│   │   │   │       .gitkeep
│   │   │   │
│   │   │   ├───components
│   │   │   │       .gitkeep
│   │   │   │
│   │   │   ├───services
│   │   │   │       .gitkeep
│   │   │   │       inventory.repository.ts
│   │   │   │       inventory.service.ts
│   │   │   │
│   │   │   └───types
│   │   │           .gitkeep
│   │   │
│   │   ├───orders
│   │   │   │   order.service.ts
│   │   │   │
│   │   │   ├───actions
│   │   │   │       .gitkeep
│   │   │   │       order.actions.ts
│   │   │   │
│   │   │   ├───components
│   │   │   │       CheckoutForm.tsx
│   │   │   │
│   │   │   ├───services
│   │   │   │       .gitkeep
│   │   │   │       order.repository.ts
│   │   │   │
│   │   │   └───types
│   │   │           .gitkeep
│   │   │
│   │   ├───payments
│   │   │   ├───actions
│   │   │   │       .gitkeep
│   │   │   │
│   │   │   ├───components
│   │   │   ├───services
│   │   │   │       .gitkeep
│   │   │   │       payment.repository.ts
│   │   │   │       payment.service.ts
│   │   │   │
│   │   │   └───types
│   │   │           .gitkeep
│   │   │
│   │   ├───products
│   │   │   │   product.service.ts
│   │   │   │   product.types.ts
│   │   │   │
│   │   │   ├───actions
│   │   │   │       product.actions.ts
│   │   │   │
│   │   │   ├───components
│   │   │   │       ProductCard.tsx
│   │   │   │       ProductGallery.tsx
│   │   │   │       ProductPrice.tsx
│   │   │   │
│   │   │   ├───services
│   │   │   └───types
│   │   ├───promotions
│   │   │   ├───actions
│   │   │   ├───components
│   │   │   ├───services
│   │   │   │       .gitkeep
│   │   │   │
│   │   │   └───types
│   │   │           .gitkeep
│   │   │
│   │   ├───reviews
│   │   │   ├───actions
│   │   │   │       .gitkeep
│   │   │   │
│   │   │   ├───components
│   │   │   ├───services
│   │   │   │       .gitkeep
│   │   │   │       review.repository.ts
│   │   │   │       review.service.ts
│   │   │   │
│   │   │   └───types
│   │   │           .gitkeep
│   │   │
│   │   ├───shipping
│   │   │   ├───actions
│   │   │   │       .gitkeep
│   │   │   │
│   │   │   ├───components
│   │   │   ├───services
│   │   │   │       .gitkeep
│   │   │   │       shipping.repository.ts
│   │   │   │       shipping.service.ts
│   │   │   │
│   │   │   └───types
│   │   │           .gitkeep
│   │   │
│   │   └───users
│   │       │   user.service.ts
│   │       │
│   │       ├───actions
│   │       ├───components
│   │       ├───services
│   │       └───types
│   ├───hooks
│   │       useAuth.ts
│   │       useCart.ts
│   │
│   ├───lib
│   │   ├───api
│   │   │       client.ts
│   │   │
│   │   ├───auth
│   │   │       jwt.ts
│   │   │
│   │   ├───cache
│   │   │       .gitkeep
│   │   │       cacheClient.ts
│   │   │
│   │   ├───db
│   │   │       powersync.ts
│   │   │       prisma.ts
│   │   │
│   │   ├───errors
│   │   │       .gitkeep
│   │   │       AppError.ts
│   │   │
│   │   ├───queue
│   │   │       .gitkeep
│   │   │       handlers.ts
│   │   │       queueClient.ts
│   │   │
│   │   ├───services
│   │   │       .gitkeep
│   │   │       logger.ts
│   │   │
│   │   ├───utils
│   │   │   │   formatPrice.ts
│   │   │   │   pagination.ts
│   │   │   │   response.ts
│   │   │   │   slugify.ts
│   │   │   │
│   │   │   ├───pagination
│   │   │   └───response
│   │   └───validations
│   │           .gitkeep
│   │           common.schema.ts
│   │
│   ├───store
│   │       cart.store.ts
│   │       user.store.ts
│   │
│   ├───styles
│   │       globals.css
│   │
│   └───types
│           analytics.ts
│           api.ts
│           auth.ts
│           cart.ts
│           catalog.ts
│           checkout.ts
│           common.ts
│           inventory.ts
│           order.ts
│           orders.ts
│           payments.ts
│           product.ts
│           promotions.ts
│           reviews.ts
│           shipping.ts
│           user.ts
│
└───tests

### Key Architectural Rules

1. **Routing vs Logic:** Keep `app/` folders strictly for routing and high-level layouts. All business logic, complex components, and state should live in `src/features/`.
2. **Feature Encapsulation:** A feature folder (e.g., `src/features/cart`) should ideally contain its own components, server actions, and types.
3. **Shared UI:** Only truly generic/reusable components (like a `Button` or `Modal`) should live in `src/components/ui`.

---

## 🛠️ Getting Started

### 1. Prerequisites

- Node.js 18+
- pnpm (`npm install -g pnpm`)
- PostgreSQL instance

### 2. Environment Setup

Create a `.env` file in the root:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/ekart"
````

### 3. Installation

```bash
pnpm install
```

### 4. Database Initialization

```bash
pnpm exec prisma generate
pnpm exec prisma db push
```

### 5. Running Frontend Server

```bash
pnpm dev
# or for network access:
pnpm dev --hostname 0.0.0.0
```

---

## 📖 Developer Knowledge Transfer (KT)

### Adding a New Feature

1. Create a new folder in `src/features/[feature-name]`.
2. Add a `components/` subfolder for feature-specific UI.
3. Add an `actions/` subfolder for Server Actions (`'use server'`).
4. If the feature needs a database model, update `prisma/schema.prisma` and run `pnpm exec prisma generate`.

### Server Actions

We use Next.js Server Actions for all data mutations. Define them in `src/features/[feature]/actions/`. Ensure you use `'use server'` at the top of the file.

### Environment Validation

All environment variables are validated at runtime using Zod. Update `src/config/env.ts` when adding new variables to ensure the app fails fast if a config is missing.

### Prisma Singleton

Always import `prisma` from `@/lib/db/prisma` to ensure you are using the singleton instance and avoid "too many clients" errors during development hot-reloads.

---

## 📜 Available Scripts

- `pnpm dev`: Starts the development server.
- `pnpm build`: Optimizes the application for production.
- `pnpm start`: Starts the production server.
- `pnpm lint`: Runs ESLint to check for code quality issues.
- `pnpm exec prisma studio`: Opens a GUI to view/edit your database data.

### 🗄️ Database Commands

```bash
# Add Prisma dependencies (already done)
pnpm add @prisma/client
pnpm add -D prisma

# Run migrations based on schema
pnpm prisma migrate dev --name ecommerce_init

# Generate Prisma client
pnpm prisma generate

# Open Prisma Studio GUI
pnpm prisma studio

# Add Framer and Lucide
pnpm add framer-motion lucide-react react-use-measure
```

---

<h2 style="color: #F97316;">💾 Database Logic</h2>

The backend data layer is deliberately structured for maintainability and separation of concerns.

### 1. The Schema (`prisma/schema.prisma`)

This single file is the source of truth for the entire database structure.

- **Users**: Core user accounts and addresses.
- **Catalog System**: Categories (tree structure), Brands, and Products.
- **Variant Engine**: A dynamic attribute system (`Attribute`, `AttributeValue`, `VariantAttribute`) to handle complex product variations (like size/color combinations).
- **Core Operations**: Tables for Orders, CartItems, and Inventory tracking.

### 2. Database Connection (`src/lib/db/prisma.ts`)

We use a singleton pattern for the Prisma Client.

- **Why?** In development, Next.js frequently hot-reloads the application. If we created a new client on every reload, we would quickly exhaust the database connections and crash the app. This file attaches the Prisma client to the global namespace, ensuring only one connection pool exists.
- **Usage:** _Never_ instantiate `new PrismaClient()` in your features. Always import the client from this file: `import { prisma } from "@/src/lib/db/prisma";`

### 3. The Repository Layer (`src/lib/repositories/`)

We use the Repository Pattern to abstract away direct database calls. Instead of calling Prisma directly inside Next.js Server Actions or API routes, we call repository functions.

- **`product.repository.ts`**: Handles finding products, variants, and their nested relations (images, brands). Example: `findProductBySlug()`.
- **`category.repository.ts`**: Handles fetching tree structures, like grabbing the top-level categories and their children.
- **`order.repository.ts`**: Centralizes order creation and retrieval.
- **Why?** This keeps business logic clean and makes it easy to mock database calls in the future if unit testing is introduced.

<h2 style="color: #F97316;">⚙️ Backend Logic (Implementation Complete)</h2>

The backend architecture has been fully implemented based on our robust blueprint. All core e-commerce domains are now functional and production-ready.

### 🏆 Fully Implemented Features

- ✅ **Authentication & Security:** JWT (Access/Refresh tokens), bcrypt hashing, and Middleware route guards (Auth & Admin).
- ✅ **Catalog & Products:** Real DB-backed keyword/category/price filtering, cursor pagination, and admin CRUD endpoints.
- ✅ **Inventory:** Atomic stock reservations during checkout, optimized to prevent double DB queries.
- ✅ **Checkout & Orders:** Price and stock validation gating, atomic order creation using Prisma transactions, and strict idempotency keys.
- ✅ **Payments:** Flexible initiate, capture, and refund endpoints built with idempotency to prevent double-charging.
- ✅ **Shipping:** Automated `PENDING` shipment record creation on payment capture. Admin tracking updates automatically synchronize the parent order status (`SHIPPED`, `DELIVERED`).
- ✅ **Reviews:** Authenticated product reviews, 1-5 rating aggregations, and duplicate prevention logic.
- ✅ **Infrastructure & Resiliency:** Centralized `AppError` hierarchy, JSON-formatted production logging, development-safe Prisma Singleton, and background queue handlers for emails and syncs.

---

_(Below is the original blueprint detailing the architectural domains)_

### 1. System Foundation (Implemented)

- **Project Structure:** Feature modules, shared libraries, and global utilities.
- **Environment Configuration:** Validation using Zod.

### 2. Database Layer (Required)

- **Schema Design:** Users, Catalog, Variants, Inventory, Orders, Payments, Shipping.
- **ORM Integration:** Prisma client, connection management.
- **Optimization:** Indexes and foreign keys.

### 3. Core Backend Architecture (Required)

- **Repository Layer:** Data access abstraction.
- **Service Layer:** Business logic and domain operations.
- **Validation Layer:** Input request validation.
- **API / Server Actions Layer:** Next.js Data mutations and retrieval endpoints.

### 4. Authentication & Authorization (Required)

- **Authentication System:** User registration, login, and session management.
- **Security:** Password hashing, token validation, CSRF/CORS.

### 5. Catalog Domain (Required)

- **Admin Management:** Categories, Brands, Products, Variants, Attributes.
- **Search & Filtering:** Keyword search, price filtering, and attribute filtering.

### 6. Inventory Domain (Required)

- **Management:** Stock tracking, warehouse management.
- **Reservation System:** Reserve stock securely during checkout flow.

### 7. Cart Domain (Required)

- **Cart Service:** Add/update/remove items.

### 8. Checkout Domain (Required - High Priority)

- **Checkout Service:** Cart validation, inventory validation, price calculation.
- **Idempotency Strategy:** Implement strict idempotency keys to ensure users are never double-charged if they click "Pay" multiple times.

### 9. Order Domain (Required)

- **Order Management:** Creation, items, status updates, and history tracking.

### 10. Payment Domain (Required - High Priority)

- **Payment Service:** Secure creation, verification, capture, and refunds. Integrates tightly with Idempotency keys.

### 11. Shipping Domain (Required)

- **Shipping Service:** Shipment creation and tracking updates.

### 12. Transactional Email Domain (Required)

- **Notifications:** Order confirmations, shipping updates, daily/weekly offers, and new arrival blasts.

### 13. Review Domain (Optional)

- Product reviews, ratings, and moderation.

### 14. Promotions Domain (Optional)

- Coupons, discounts, campaigns, and rules.

### 15. Admin Backend (Required)

- Centralized Admin APIs for managing Products, Categories, Orders, Inventory, and Users.

### 16. Logging, Monitoring, & Error Handling (Required)

- Global error handling, API response standardization, and error tracking.

### 17. Security Layer (Required)

- Input validation, rate limiting, and endpoint protection.

### 18. Performance Optimization (Required)

- Database indexing, caching strategies.

### Final Backend Implementation Order (Professional)

1. **System Foundation**
   - Architecture Design
   - Project Structure
   - Environment Configuration

2. **Database Layer**
   - Database Schema
   - Database Migrations
   - ORM Setup
   - Database Optimization

3. **Core Backend Architecture**
   - Repository Layer
   - Validation Layer
   - Service Layer
   - API / Server Actions (Optimized for fast, sub-100ms responses to prevent UI lag)
   - **Pagination & Filtering Engine** (Cursor-based or offset pagination to handle thousands of products without slowing down)

4. **Security Foundation (Initialized early)**
   - Authentication & Authorization
   - Security Setup
   - CORS
   - CSRF protection
   - Rate limiting (Crucial to protect against spam / multiple rapid requests)

5. **Infrastructure & Platform Services (Required)**
   - **Asset / Media Upload Service:** Handles product image and media storage.
   - **Logging & Monitoring:** Application logs, request tracking, and system monitoring.
   - **Error Handling:** Centralized error handling and API response standardization.
   - **Background Job / Queue System:** Offloads heavy or asynchronous tasks such as email sending, analytics processing, and stock synchronization to prevent blocking API requests.
   - **Caching Layer:** Redis or in-memory caching for catalog data, high-traffic endpoints, and expensive database queries to reduce backend load and improve response times.

6. **Catalog Domain**
   - Catalog Admin Backend
   - Product Search & Filtering (Optimized indexing for instant UI feedback)

7. **Inventory Domain**
   - Inventory Management

8. **Cart Domain**
   - Cart Service

9. **Checkout Domain**
   - Checkout Service
   - Cart validation
   - Inventory validation
   - Price calculation
   - Idempotency handling

10. **Order Domain**
    - Order Management

11. **Payment Domain**
    - Payment Service
    - Payment Gateway Integration

12. **Shipping Domain**
    - Shipping Service

13. **Communication Services (Triggered by events like order placed, shipment updates)**
    - Transactional Email Service (Executed via Background Queue)

14. **Admin Backend**
    - Admin APIs

15. **Performance Layer**
    - Performance Optimization
    - **Concurrency & Multiple Request Handling** (Optimized Prisma connection pooling to handle concurrent database hits smoothly)
    - Query optimization

16. **Optional Domains (Enhancements after core ecommerce works)**
    - Review System
    - Promotions System
    - Analytics System

17. **Future Extensions**
    - Recommendation Engine
    - Notifications System
    - Search Engine Integration
    - Event System
