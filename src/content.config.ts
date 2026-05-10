import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(),
    updated: z.string().optional(),
    author: z.string().default('UFO Declassified Research Team'),
    category: z.string(),
    tags: z.array(z.string()),
    ogImage: z.string().optional(),
    featured: z.boolean().default(false),
    readingTime: z.string().optional(),
  }),
});

export const collections = { blog };
