import pool from './connection.js';
import dotenv from 'dotenv';

dotenv.config();

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS campaigns (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('Email', 'WhatsApp')),
    description TEXT NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'Draft' CHECK (status IN ('Active', 'Draft', 'Completed')),
    sent INTEGER NOT NULL DEFAULT 0,
    replies INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

  CREATE INDEX IF NOT EXISTS idx_campaigns_status ON campaigns(status);
  CREATE INDEX IF NOT EXISTS idx_campaigns_created_at ON campaigns(created_at);
`;

async function migrate() {
  try {
    console.log('Running database migration...');
    await pool.query(createTableQuery);
    console.log('Database migration completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

migrate();

