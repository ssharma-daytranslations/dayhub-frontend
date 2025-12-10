import { z } from 'zod';
import { router, publicProcedure } from './trpc';
import { db } from "@/lib/db";
import { interpreters } from "@/lib/schema";
import { eq, and, count } from "drizzle-orm";

export const appRouter = router({
  getLanguages: publicProcedure.query(() => {
    return ["Spanish", "French", "Chinese", "Arabic", "Russian", "Portuguese", "German", "Japanese"];
  }),
  getMetros: publicProcedure.query(() => {
    return ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego"];
  }),
  getStates: publicProcedure.query(() => {
    return ["NY", "CA", "IL", "TX", "AZ", "PA"];
  }),
  getStats: publicProcedure.query(async () => {
    const result = await db.select({ count: count() }).from(interpreters);
    return { 
      totalInterpreters: result[0].count,
      totalCalls: 0,
      topMetros: []
    };
  }),
  searchInterpreters: publicProcedure
    .input(z.object({
      query: z.string().optional(),
      sourceLanguage: z.string().optional(),
      targetLanguage: z.string().optional(),
      metro: z.string().optional(),
      state: z.string().optional(),
      zipCode: z.string().optional(),
      radius: z.number().optional(),
      availableOnly: z.boolean().optional(),
      certificationType: z.string().optional(),
      minExperience: z.number().optional(),
      maxExperience: z.number().optional(),
      minRate: z.number().optional(),
      maxRate: z.number().optional(),
      proficiencyLevel: z.string().optional(),
      limit: z.number().optional(),
      offset: z.number().optional(),
      sortBy: z.enum(['name', 'rating', 'distance']).optional(),
      sortOrder: z.enum(['asc', 'desc']).optional(),
    }))
    .query(async ({ input }) => {
      const filters: any[] = [];
      if (input.sourceLanguage) filters.push(eq(interpreters.sourceLanguage, input.sourceLanguage));
      if (input.targetLanguage) filters.push(eq(interpreters.targetLanguage, input.targetLanguage));
      if (input.metro) filters.push(eq(interpreters.metro, input.metro));
      if (input.state) filters.push(eq(interpreters.state, input.state));
      
      const result = await db.select()
        .from(interpreters)
        .where(filters.length > 0 ? and(...filters) : undefined)
        .limit(input.limit || 10)
        .offset(input.offset || 0);

      return {
        interpreters: result,
        hasMore: false, 
        total: result.length 
      };
    }),
  geocode: publicProcedure
    .input(z.object({ address: z.string() }))
    .query(() => {
      return { lat: 40.7128, lng: -74.0060 };
    }),
  exportInterpretersCSV: publicProcedure
    .input(z.any())
    .query(() => {
      return { csv: "name,email\nMaria,maria@example.com", count: 1 };
    }),
  getSavedSearches: publicProcedure.query(() => {
    return [];
  }),
  createSavedSearch: publicProcedure.input(z.any()).mutation(() => {
    return { success: true };
  }),
  deleteSavedSearch: publicProcedure.input(z.any()).mutation(() => {
    return { success: true };
  }),
  importInterpretersCSV: publicProcedure
    .input(z.object({ csvData: z.string() }))
    .mutation(async ({ input }) => {
      const rows = input.csvData.split('\n').slice(1); // simple parsing, skipping header
      let success = 0;
      let failed = 0;

      for (const row of rows) {
          if (!row.trim()) continue;
          try {
            // Simplified CSV parsing (assuming standard format)
            const cols = row.split(',').map(c => c.trim().replace(/^"|"$/g, ''));
            // Expected: name, email, phone, source, target... (adjust based on actual CSV format)
            // For now, map loosely
            const [name, email, phone, sourceLang, targetLang, city, state, metro] = cols;
            
            if (email && name) {
                const parts = name.split(' ');
                const firstName = parts[0];
                const lastName = parts.slice(1).join(' ') || 'Unknown';

                await db.insert(interpreters).values({
                    firstName,
                    lastName,
                    email,
                    phone: phone || undefined,
                    sourceLanguage: sourceLang || undefined,
                    targetLanguage: targetLang || undefined,
                    city: city || undefined,
                    state: state || undefined,
                    metro: metro || undefined,
                    isAvailable: true
                });
                success++;
            } else {
                failed++;
            }
          } catch (e) {
            console.error("Import error for row", row, e);
            failed++;
          }
      }
      return { success, failed };
    }),

  auth: router({
    me: publicProcedure.query(() => {
      // Return mock admin user for demo purposes
      return {
        id: "admin-1",
        name: "Admin User",
        email: "admin@example.com",
        role: "admin"
      }; 
    }),
    logout: publicProcedure.mutation(() => {
      return { success: true };
    })
  })
});

export type AppRouter = typeof appRouter;
