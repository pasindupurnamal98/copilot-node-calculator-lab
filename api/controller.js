'use strict';

/**
 * Validates a query-string operand as a number, including decimal, negative,
 * and exponential notation, and reports which operand was invalid.
 */
function validateOperand(name, value) {
  if (!value ||
      !value.match(/^(-)?[0-9\.]+(e(-)?[0-9]+)?$/) ||
      value.replace(/[-0-9e]/g, '').length > 1) {
    throw new Error("Invalid " + name + ": " + value);
  }
}

/**
 * Handles GET /arithmetic requests by validating the selected operation and
 * operands, executing the operation, and returning the result as JSON.
 */
exports.calculate = function(req, res, next) {
  try {
  // Operations receive query-string values and return a numeric result.
  var operations = {
    'add':      function(a, b) { return Number(a) + Number(b) },
    'subtract': function(a, b) { return a - b },
    'multiply': function(a, b) { return a * b },
    'divide':   function(a, b) { return a / b },
    'percentage': function(a, b) { return (Number(a) / 100) * Number(b) },
    'power':    function(a, b) { return Math.pow(Number(a), Number(b)) },
  };

  if (!req.query.operation) {
    throw new Error("Unspecified operation");
  }

  var operation = operations[req.query.operation];

  if (!operation) {
    throw new Error("Invalid operation: " + req.query.operation);
  }

  validateOperand('operand1', req.query.operand1);
  validateOperand('operand2', req.query.operand2);

  res.json({ result: operation(req.query.operand1, req.query.operand2) });
  } catch (err) {
    next(err);
  }
};
