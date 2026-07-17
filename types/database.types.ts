// File ini akan digenerate otomatis oleh Supabase CLI setelah skema
// database dibuat, dengan perintah:
//
//   npx supabase gen types typescript --project-id <PROJECT_ID> > types/database.types.ts
//
// Untuk sementara, tipe berikut adalah placeholder agar project tetap
// type-safe sebelum skema final tersedia (akan dikerjakan di tahap
// "Perancangan database Supabase").

export type Database = {
  public: {
    Tables: Record<string, never>;
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
};
