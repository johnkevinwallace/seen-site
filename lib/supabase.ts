import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://obomakxpgqmuijofqkmj.supabase.co";
const supabaseAnonKey = "sb_publishable_SoFr1XpqC6YqtwN2HMUIZA_a2wu9CO2";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);