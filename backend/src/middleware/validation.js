export const validateCampaign = (req, res, next) => {
  const { name, type, description } = req.body;
  const errors = [];

  if (!name || typeof name !== 'string' || name.trim().length < 3) {
    errors.push('Campaign name must be at least 3 characters');
  }
  if (!type || !['Email', 'WhatsApp'].includes(type)) {
    errors.push('Campaign type must be Email or WhatsApp');
  }
  if (!description || typeof description !== 'string' || description.trim().length < 10) {
    errors.push('Description must be at least 10 characters');
  }

  if (errors.length > 0) {
    return res.status(400).json({ 
      error: 'Validation failed',
      details: errors 
    });
  }

  next();
};

export const validateStatus = (req, res, next) => {
  const { status } = req.body;
  
  if (status && !['Active', 'Draft', 'Completed'].includes(status)) {
    return res.status(400).json({ 
      error: 'Validation failed',
      details: ['Status must be Active, Draft, or Completed'] 
    });
  }
  
  next();
};

