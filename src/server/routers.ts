import { z } from 'zod';
import { router, publicProcedure } from './trpc';

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
  getStats: publicProcedure.query(() => {
    return { totalInterpreters: 21943 };
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
    .query(() => {
      // Return mock data
      return {
        interpreters: [
          {
            id: 1,
            firstName: "Maria",
            lastName: "Gonzalez",
            city: "New York",
            state: "NY",
            metro: "New York",
            sourceLanguage: "English",
            targetLanguage: "Spanish",
            rating: "4.9",
            specialties: JSON.stringify(["Medical", "Legal"]),
            phone: "(555) 123-4567",
            email: "maria.g@example.com",
            isAvailable: true,
            isVetted: true,
            approvalStatus: "approved"
          },
          {
            id: 2,
            firstName: "John",
            lastName: "Smith",
            city: "Los Angeles",
            state: "CA",
            metro: "Los Angeles",
            sourceLanguage: "English",
            targetLanguage: "French",
            rating: "4.7",
            specialties: JSON.stringify(["Conference", "Business"]),
            phone: "(555) 987-6543",
            email: "john.s@example.com",
            isAvailable: false,
            isVetted: false,
            approvalStatus: "approved"
          },
          {
            id: 3,
            firstName: "Wei",
            lastName: "Chen",
            city: "San Francisco",
            state: "CA",
            metro: "San Francisco",
            sourceLanguage: "English",
            targetLanguage: "Chinese",
            rating: "5.0",
            specialties: JSON.stringify(["Medical", "Community"]),
            phone: "(555) 555-5555",
            email: "wei.c@example.com",
            isAvailable: true,
            isVetted: true,
            approvalStatus: "approved"
          }
        ],
        hasMore: false,
        total: 3
      };
    }),
  geocode: publicProcedure
    .input(z.object({ address: z.string() }))
    .query(() => {
      return { lat: 40.7128, lng: -74.0060 };
    }),
  exportToCSV: publicProcedure
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
  auth: router({
    me: publicProcedure.query(() => {
      // Return mock user or null
      return null; 
    }),
    logout: publicProcedure.mutation(() => {
      return { success: true };
    })
  })
});

export type AppRouter = typeof appRouter;
