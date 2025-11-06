import express from 'express';
import pool from '../db/connection.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ 
      status: 'ok', 
      message: 'Campaign Manager API is running',
      database: 'connected'
    });
  } catch (error) {
    res.status(503).json({ 
      status: 'error',
      message: 'Campaign Manager API is running but database connection failed',
      database: 'disconnected',
      error: error.message
    });
  }
});

export default router;

