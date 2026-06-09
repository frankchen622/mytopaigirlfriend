import { defineCollection, z } from 'astro:content';

const enCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    app_name: z.string(),
    type: z.string(),
    category: z.string(),
    has_nsfw: z.boolean(),
    has_free: z.boolean(),
    pricing: z.string(),
    rating: z.number().optional(),
    app_url: z.string().optional(),
    generated_at: z.string(),
  }),
});

export const collections = {
  'en': enCollection,
};
