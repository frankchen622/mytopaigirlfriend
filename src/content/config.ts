import { defineCollection, z } from 'astro:content';

const reviewSchema = z.object({
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
});

const enCollection = defineCollection({
  type: 'content',
  schema: reviewSchema,
});

const esCollection = defineCollection({
  type: 'content',
  schema: reviewSchema,
});

const ptCollection = defineCollection({
  type: 'content',
  schema: reviewSchema,
});

const jaCollection = defineCollection({
  type: 'content',
  schema: reviewSchema,
});

const deCollection = defineCollection({
  type: 'content',
  schema: reviewSchema,
});

const frCollection = defineCollection({
  type: 'content',
  schema: reviewSchema,
});

const koCollection = defineCollection({
  type: 'content',
  schema: reviewSchema,
});

export const collections = {
  'en': enCollection,
  'es': esCollection,
  'pt': ptCollection,
  'ja': jaCollection,
  'de': deCollection,
  'fr': frCollection,
  'ko': koCollection,
};
