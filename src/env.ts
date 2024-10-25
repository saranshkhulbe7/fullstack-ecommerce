import { z, ZodError } from "zod";

const envVariables = z.object({
  DATABASE_URL: z.string(),
  NODE_ENV: z.enum(["development", "production", "test"]),
  ACCESS_TOKEN_SECRET: z.string(),
  ACCESS_TOKEN_EXPIRY: z.string(),
  REFRESH_TOKEN_SECRET: z.string(),
  REFRESH_TOKEN_EXPIRY: z.string(),
});

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVariables> {}
  }
}

export const parsedEnv = () => {
  try {
    envVariables.parse(process.env);
  } catch (e) {
    const errors = (e as ZodError).errors.map((issue: any) => ({
      field: issue.path.join("."),
      errorMessage: issue.message,
    }));
    console.log({
      message: "Invalid environment variables",
      errors,
    });
    process.exit(1);
  }
};
