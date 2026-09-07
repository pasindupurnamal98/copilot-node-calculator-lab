'use strict';

function validateOperand(name, value) {
  if (!value ||
      !value.match(/^(-)?[0-9\.]+(e(-)?[0-9]+)?$/) ||
      value.replace(/[-0-9e]/g, '').length > 1) {
    throw new Error("Invalid " + name + ": " + value);
  }
}

exports.calculate = function(req, res, next) {
  try {
  // TODO: Add operator
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
