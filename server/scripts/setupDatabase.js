import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import pg from "pg";
import { fileURLToPath } from "url";

const { Client } = pg;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "../..");

dotenv.config({ path: path.join(rootDir, ".env") });
dotenv.config({ path: path.join(rootDir, "server/.env"), override: false });

const databaseUrl =
  process.env.DATABASE_URL ||
  process.env.SUPABASE_DB_URL ||
  process.env.supabase_db_url ||
  process.env.supabase_postgre_url ||
  process.env.supabase_postgres_url ||
  process.env.supabase_posrgre_id ||
  process.env.POSTGRES_URL ||
  process.env.postgres_url;

if (!databaseUrl) {
  console.error("Database connection string missing.");
  console.error("Add DATABASE_URL to .env, then run: cd server && npm run setup-db");
  console.error("You can copy it from Supabase Project Settings > Database > Connection string.");
  process.exit(1);
}

if (!databaseUrl.startsWith("postgresql://") && !databaseUrl.startsWith("postgres://")) {
  console.error("Database connection string is not a valid Postgres URL.");
  console.error("It should look like: postgresql://postgres:[YOUR-PASSWORD]@db.project-ref.supabase.co:5432/postgres");
  process.exit(1);
}

const schemaPath = path.resolve(__dirname, "../sql/schema.sql");
const schema = fs.readFileSync(schemaPath, "utf8");

const client = new Client({
  connectionString: databaseUrl,
  ssl: { rejectUnauthorized: false }
});

try {
  await client.connect();
  await client.query(schema);
  console.log("Database setup complete: leads table is ready.");
} catch (error) {
  console.error("Database setup failed:");
  console.error(error.message);
  if (error.message.includes("password authentication failed")) {
    console.error("Check the password inside DATABASE_URL. If your password has @, #, %, /, :, or spaces, URL-encode it.");
  }
  process.exitCode = 1;
} finally {
  await client.end();
}
