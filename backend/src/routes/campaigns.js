import express from 'express';
import pool from '../db/connection.js';
import { validateCampaign, validateStatus } from '../middleware/validation.js';

const router = express.Router();

const formatCampaign = (campaign) => {
  return {
    ...campaign,
    createdAt: campaign.createdAt.toISOString(),
    updatedAt: campaign.updatedAt.toISOString(),
  };
};

router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, name, type, description, status, sent, replies, created_at as "createdAt", updated_at as "updatedAt" FROM campaigns ORDER BY created_at DESC'
    );
    
    const campaigns = result.rows.map(formatCampaign);
    res.json(campaigns);
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    res.status(500).json({ 
      error: 'Failed to fetch campaigns',
      message: error.message 
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'SELECT id, name, type, description, status, sent, replies, created_at as "createdAt", updated_at as "updatedAt" FROM campaigns WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Campaign not found' });
    }

    res.json(formatCampaign(result.rows[0]));
  } catch (error) {
    console.error('Error fetching campaign:', error);
    res.status(500).json({ 
      error: 'Failed to fetch campaign',
      message: error.message 
    });
  }
});

router.post('/', validateCampaign, async (req, res) => {
  try {
    const { name, type, description } = req.body;

    const result = await pool.query(
      `INSERT INTO campaigns (name, type, description, status, sent, replies, created_at, updated_at)
       VALUES ($1, $2, $3, 'Draft', 0, 0, NOW(), NOW())
       RETURNING id, name, type, description, status, sent, replies, created_at as "createdAt", updated_at as "updatedAt"`,
      [name.trim(), type, description.trim()]
    );

    res.status(201).json(formatCampaign(result.rows[0]));
  } catch (error) {
    console.error('Error creating campaign:', error);
    res.status(500).json({ 
      error: 'Failed to create campaign',
      message: error.message 
    });
  }
});

router.put('/:id', validateCampaign, validateStatus, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, type, description, status } = req.body;

    const updateFields = [];
    const values = [];
    let paramCount = 1;

    if (name) {
      updateFields.push(`name = $${paramCount++}`);
      values.push(name.trim());
    }
    if (type) {
      updateFields.push(`type = $${paramCount++}`);
      values.push(type);
    }
    if (description) {
      updateFields.push(`description = $${paramCount++}`);
      values.push(description.trim());
    }
    if (status) {
      updateFields.push(`status = $${paramCount++}`);
      values.push(status);
    }

    if (updateFields.length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }

    updateFields.push(`updated_at = NOW()`);
    values.push(id);

    const result = await pool.query(
      `UPDATE campaigns 
       SET ${updateFields.join(', ')}
       WHERE id = $${paramCount}
       RETURNING id, name, type, description, status, sent, replies, created_at as "createdAt", updated_at as "updatedAt"`,
      values
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Campaign not found' });
    }

    res.json(formatCampaign(result.rows[0]));
  } catch (error) {
    console.error('Error updating campaign:', error);
    res.status(500).json({ 
      error: 'Failed to update campaign',
      message: error.message 
    });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, sent, replies } = req.body;

    const updateFields = [];
    const values = [];
    let paramCount = 1;

    if (status !== undefined) {
      if (!['Active', 'Draft', 'Completed'].includes(status)) {
        return res.status(400).json({ 
          error: 'Validation failed',
          details: ['Status must be Active, Draft, or Completed'] 
        });
      }
      updateFields.push(`status = $${paramCount++}`);
      values.push(status);
    }

    if (sent !== undefined) {
      if (typeof sent !== 'number' || sent < 0) {
        return res.status(400).json({ 
          error: 'Validation failed',
          details: ['Sent must be a non-negative number'] 
        });
      }
      updateFields.push(`sent = $${paramCount++}`);
      values.push(sent);
    }

    if (replies !== undefined) {
      if (typeof replies !== 'number' || replies < 0) {
        return res.status(400).json({ 
          error: 'Validation failed',
          details: ['Replies must be a non-negative number'] 
        });
      }
      updateFields.push(`replies = $${paramCount++}`);
      values.push(replies);
    }

    if (updateFields.length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }

    updateFields.push(`updated_at = NOW()`);
    values.push(id);

    const result = await pool.query(
      `UPDATE campaigns 
       SET ${updateFields.join(', ')}
       WHERE id = $${paramCount}
       RETURNING id, name, type, description, status, sent, replies, created_at as "createdAt", updated_at as "updatedAt"`,
      values
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Campaign not found' });
    }

    res.json(formatCampaign(result.rows[0]));
  } catch (error) {
    console.error('Error updating campaign:', error);
    res.status(500).json({ 
      error: 'Failed to update campaign',
      message: error.message 
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'DELETE FROM campaigns WHERE id = $1 RETURNING id',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Campaign not found' });
    }

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting campaign:', error);
    res.status(500).json({ 
      error: 'Failed to delete campaign',
      message: error.message 
    });
  }
});

export default router;

