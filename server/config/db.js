import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { createClient } from "@supabase/supabase-js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootEnvPath = path.resolve(__dirname, "../../.env");
const serverEnvPath = path.resolve(__dirname, "../.env");

dotenv.config({ path: rootEnvPath });
dotenv.config({ path: serverEnvPath, override: false });

const supabaseUrl = process.env.SUPABASE_URL || process.env.supabase_project_url;
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.supabase_service_role_key ||
  process.env.SUPABASE_ANON_KEY ||
  process.env.supabase_anon_key;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase URL and key are required. Add them to the root .env file.");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
