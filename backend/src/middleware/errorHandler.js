// Global error handler middleware
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Validation errors
  if (err.validationErrors) {
    return res.status(err.statusCode || 400).json({
      success: false,
      error: 'Validation failed',
      details: err.validationErrors
    });
  }

  // Azure API errors
  if (err.isAxiosError) {
    return res.status(503).json({
      success: false,
      error: 'External service unavailable',
      message: 'Azure AI services are temporarily unavailable'
    });
  }

  // Generic server errors
  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || 'Internal server error'
  });
};

export default errorHandler;
