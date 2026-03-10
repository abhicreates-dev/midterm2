import { z } from "zod";

export const registerSchema = z.object({
    email: z.email(),
    name: z.string().optional(),
    password: z.string().min(6),
});

export const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(6),
});

export const blogCreateSchema = z.object({
    title: z.string(),
    content: z.string()
})


