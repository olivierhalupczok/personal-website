import { defineCollection, z } from 'astro:content';

const publications = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().min(5),
    description: z.string(),
    date: z.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    // External URL - if present, this is a link to external content
    externalUrl: z.string().url().optional(),
    // Cover image
    cover: z.string().optional(),
    // Reading time in minutes (auto-calculated for original posts, manual for external)
    readingTime: z.number().optional(),
  }),
});

export const collections = { publications };
