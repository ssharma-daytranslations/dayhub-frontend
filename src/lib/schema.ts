import { mysqlTable, serial, varchar, text, timestamp, boolean } from 'drizzle-orm/mysql-core';

export const interpreters = mysqlTable('interpreters', {
  id: serial('id').primaryKey(),
  firstName: varchar('first_name', { length: 256 }).notNull(),
  lastName: varchar('last_name', { length: 256 }).notNull(),
  city: varchar('city', { length: 256 }),
  state: varchar('state', { length: 256 }),
  metro: varchar('metro', { length: 256 }),
  sourceLanguage: varchar('source_language', { length: 256 }),
  targetLanguage: varchar('target_language', { length: 256 }),
  rating: varchar('rating', { length: 50 }),
  specialties: text('specialties'), // JSON array
  phone: varchar('phone', { length: 50 }),
  email: varchar('email', { length: 256 }).notNull().unique(),
  isAvailable: boolean('is_available').default(true),
  isVetted: boolean('is_vetted').default(false),
  approvalStatus: varchar('approval_status', { length: 50 }).default('pending'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
});
