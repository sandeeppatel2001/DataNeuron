module.exports.validateRequest = (schema) => (req, res, next) => {
  try {
    const response = schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    req.query = response.query;
    req.body = response.body;
    req.params = response.params;
    next();
  } catch (error) {
    const errors = [];
    for (const e of error.errors) {
      errors.push(e.message);
    }
    return res.status(400).json({ success: false, message: errors.join(". ") });
  }
};
