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

  // API/External service errors
  if (err.isAxiosError) {
    return res.status(503).json({
      success: false,
      error: 'External service unavailable',
      message: 'Service temporarily unavailable. Please try again later.'
    });
  }

  // Generic server errors
  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || 'Internal server error'
  });
};

export default errorHandler;
