import pool from './connection.js';
import dotenv from 'dotenv';

dotenv.config();

const seedData = [
  {
    name: 'Q4 Product Launch',
    type: 'Email',
    description: 'Launch campaign for new product features',
    status: 'Active',
    sent: 1250,
    replies: 342,
  },
  {
    name: 'Customer Feedback Survey',
    type: 'WhatsApp',
    description: 'Collecting feedback from active customers',
    status: 'Active',
    sent: 850,
    replies: 215,
  },
  {
    name: 'Holiday Promotion',
    type: 'Email',
    description: 'Special holiday discount announcement',
    status: 'Completed',
    sent: 2100,
    replies: 523,
  },
  {
    name: 'New Feature Announcement',
    type: 'Email',
    description: 'Announcing new dashboard features',
    status: 'Draft',
    sent: 0,
    replies: 0,
  },
];

async function seed() {
  try {
    console.log('Seeding database...');
    
    const result = await pool.query('SELECT COUNT(*) FROM campaigns');
    const count = parseInt(result.rows[0].count);
    
    if (count > 0) {
      console.log(`Database already contains ${count} campaigns. Skipping seed.`);
      process.exit(0);
    }

    for (const campaign of seedData) {
      await pool.query(
        `INSERT INTO campaigns (name, type, description, status, sent, replies, created_at)
         VALUES ($1, $2, $3, $4, $5, $6, NOW() - INTERVAL '${Math.floor(Math.random() * 14) + 1} days')`,
        [campaign.name, campaign.type, campaign.description, campaign.status, campaign.sent, campaign.replies]
      );
    }

    console.log(`Seeded ${seedData.length} campaigns successfully`);
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
}

seed();

