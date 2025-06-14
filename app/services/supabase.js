import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_API_BASE_URL,
  import.meta.env.VITE_API_KEY
);

export default supabase;