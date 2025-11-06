import express from 'express';
import pool from '../db/connection.js';

const router = express.Router();

router.get('/stats', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        COUNT(CASE WHEN status = 'Active' THEN 1 END) as active_campaigns,
        COALESCE(SUM(sent), 0) as total_sent,
        COALESCE(SUM(replies), 0) as total_replies
      FROM campaigns
    `);

    const stats = result.rows[0];
    
    const meetingsBooked = Math.floor(parseInt(stats.total_replies) * 0.28);

    res.json({
      activeCampaigns: parseInt(stats.active_campaigns) || 0,
      totalSent: parseInt(stats.total_sent) || 0,
      totalReplies: parseInt(stats.total_replies) || 0,
      meetingsBooked: meetingsBooked,
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ 
      error: 'Failed to fetch dashboard statistics',
      message: error.message 
    });
  }
});

export default router;

