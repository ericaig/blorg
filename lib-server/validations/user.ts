import { z } from 'zod'

const passwordMin = 4,
    passwordMax = 20,
    nameMin = 2,
    nameMax = 25,
    surnameMax = 50;

const userSignupSchema = z.object({
    name: z.string().min(nameMin).max(nameMax),
    surnames: z.string().min(nameMin).max(surnameMax),
    email: z.string().email(),
    password: z.string().min(passwordMin).max(passwordMax),
    confirmPassword: z.string(),
})
    .refine((data) => data.confirmPassword === data.password, {
        message: "Passwords don't match.",
        path: ['confirmPassword'],
    })

const userLoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(passwordMin).max(passwordMax),
});

export {
    userSignupSchema,
    userLoginSchema
}