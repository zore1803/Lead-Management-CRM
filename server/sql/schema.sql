CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    company_name VARCHAR(255),
    status VARCHAR(30) DEFAULT 'New',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT leads_status_check CHECK (
        status IN ('New', 'Contacted', 'Qualified', 'Converted', 'Lost')
    )
);

CREATE INDEX IF NOT EXISTS leads_status_idx ON leads(status);
CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS leads_name_idx ON leads(name);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read leads" ON leads;
DROP POLICY IF EXISTS "Allow public insert leads" ON leads;
DROP POLICY IF EXISTS "Allow public update leads" ON leads;
DROP POLICY IF EXISTS "Allow public delete leads" ON leads;

CREATE POLICY "Allow public read leads"
ON leads FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Allow public insert leads"
ON leads FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Allow public update leads"
ON leads FOR UPDATE
TO anon, authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Allow public delete leads"
ON leads FOR DELETE
TO anon, authenticated
USING (true);
