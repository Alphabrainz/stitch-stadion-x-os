import { z } from 'zod';

/**
 * Validation schema for user authentication.
 * Enforces email format and minimum password length.
 */
export const authSchema = z.object({
  email: z.string().email("Invalid email format."),
  password: z.string().min(8, "Password must be at least 8 characters long.")
});

// Additional reusable validation schemas can be added here
