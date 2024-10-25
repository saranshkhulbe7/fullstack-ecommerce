import { integer, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const usersTable = pgTable("users", {
  // system generated fields
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  role: varchar({ length: 255 }).notNull().default("user"),

  // user specified fields
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  address: text(),
});

export const registerUserSchema = createInsertSchema(usersTable)
  .omit({
    id: true,
    role: true,
  })
  .strict();

export const loginUserSchema = createInsertSchema(usersTable)
  .pick({
    email: true,
    password: true,
  })
  .strict();
