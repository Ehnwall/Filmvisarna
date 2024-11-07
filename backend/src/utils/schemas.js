import { z } from 'zod'

export const movieSchema = z.object({
    title: z.string().min(1),
    durationMin: z.number().int().positive(),
    ageLimit: z.number().int(),
    description: z.object({
        director: z.string(),
        cast: z.array(z.string()),
        synopsis: z.string(),
        genre: z.array(z.string()),
        language: z.string(),
        text: z.string(),
        originalTitle: z.string(),
        year: z.number().int(),
    }),
    trailerUrl: z.string().min(11).max(11),
    posterUrl: z.string().url(),
})
