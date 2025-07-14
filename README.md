# Travel Blog CMS

A modern, SEO-friendly Travel Blog frontend built with **Next.js 15**, **TypeScript**, **Apollo Client**, and a **Headless WordPress CMS** backend. This project displays travel stories using dynamic routing, GraphQL, and custom metadata.

---

## Features

- Dynamic blog post pages with static generation
- Apollo Client + GraphQL integration
- Featured image, location, rating, and map link
- SEO support using `generateMetadata()`
- ISR with revalidation every 60 seconds
- Renders HTML content from WordPress safely
- Styled using Tailwind CSS

---

## Tech Stack

| Frontend     | Backend CMS           | Integration         |
| ------------ | --------------------- | ------------------- |
| Next.js 15   | Headless WordPress    | Apollo Client       |
| TypeScript   | WPGraphQL Plugin      | GraphQL Codegen     |
| Tailwind CSS | Self-hosted or Remote | REST & GraphQL APIs |

---

## Project Structure

```
.
├── src/
│   ├── app/posts/[slug]/page.tsx   # Post page
│   ├── lib/apolloClient.ts         # Apollo setup
│   └── generated/graphql.ts        # Auto-generated types
├── public/                         # Static files
├── codegen.ts                      # GraphQL codegen config
├── env.local                       # Environment variables
└── README.md
```

---

## Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_WORDPRESS_GRAPHQL_ENDPOINT=http://your-wordpress-site.com/graphql
```

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Generate GraphQL types

```bash
npx graphql-codegen
```

### 3. Run the development server

```bash
npm run dev
```

---

## Build & Deployment

To build for production:

```bash
npm run build
npm start
```

---

## Metadata Support

Each blog post supports the following fields from WordPress via GraphQL:

- Title
- Content
- Excerpt
- Featured Image
- Metadata:
  - Location
  - Trip Rating
  - Map Link

---

## Error Handling

- Fallback UI for missing post data
- Console logging for failed queries
- Type-safe `params` and `metadata` functions

---

## Author

Built by [Jayasree Kulothungan](https://github.com/Jayashree-Kulothungan)

---

## License

MIT – free to use, clone, and modify.
