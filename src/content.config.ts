import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const categoryEnum = z.enum(['reviews', 'stories', 'pros-cons', 'buying-guides', 'guides', 'market']);

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: categoryEnum,
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('American Car Saga Team'),
    heroImage: z.string().optional(),
    heroAlt: z.string().optional(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    // Brand promotion / paid content label
    sponsored: z.boolean().default(false),
    sponsorName: z.string().optional(),
    // Review fields
    rating: z.number().min(0).max(5).optional(),
    verdict: z.string().optional(),
    pros: z.array(z.string()).default([]),
    cons: z.array(z.string()).default([]),
    specs: z.array(z.object({ label: z.string(), value: z.string() })).default([]),
    // Affiliate products (buying guides)
    products: z
      .array(
        z.object({
          name: z.string(),
          badge: z.string().optional(),
          description: z.string().optional(),
          image: z.string().optional(),
          url: z.string(),
          buttonText: z.string().default('Check Price'),
        }),
      )
      .default([]),
    // Optional YouTube video shown inside the article (paste the full link)
    youtubeUrl: z.string().optional(),
  }),
});

const videos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/videos' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    // 'youtube' = embed from YouTube. 'upload' = self-hosted video file (upcoming feature).
    type: z.enum(['youtube', 'upload']).default('youtube'),
    youtubeUrl: z.string().optional(),
    videoFile: z.string().optional(),
    poster: z.string().optional(),
    duration: z.string().optional(),
    category: categoryEnum.optional(),
    relatedArticle: z.string().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = { articles, videos };
