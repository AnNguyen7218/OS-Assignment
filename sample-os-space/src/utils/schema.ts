import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Email must have the correct format'),
  password: z
    .string()
    .min(1, 'The password must not be empty')
    .min(8, 'Password must be at least 8 characters')
    .max(32, 'Password must not exceed 32 characters')
});
export type LoginFormData = z.infer<typeof loginSchema>;

export const widgetSchema = z.object({
  id: z.any(),
  title: z.string().min(1, 'The title is required'),
  description: z.string().min(1, 'The description must not be empty')
});
export type WidgetFormData = z.infer<typeof widgetSchema>;
