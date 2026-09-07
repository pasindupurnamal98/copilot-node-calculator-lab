using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("arithmetic")]
public sealed class CalculatorController : ControllerBase
{
    private static readonly IReadOnlyDictionary<string, Func<double, double, double>> Operations =
        new Dictionary<string, Func<double, double, double>>(StringComparer.Ordinal)
        {
            ["add"] = (a, b) => a + b,
            ["subtract"] = (a, b) => a - b,
            ["multiply"] = (a, b) => a * b,
            ["divide"] = (a, b) => a / b,
            ["percentage"] = (a, b) => (a / 100) * b,
            ["power"] = Math.Pow
        };

    private static readonly Regex OperandPattern =
        new Regex(@"^(-)?[0-9\.]+(e(-)?[0-9]+)?$", RegexOptions.Compiled);

    [HttpGet]
    public IActionResult Calculate(
        [FromQuery] string? operation,
        [FromQuery] string? operand1,
        [FromQuery] string? operand2)
    {
        if (string.IsNullOrEmpty(operation))
        {
            return BadRequest(new { error = "Unspecified operation" });
        }

        if (!Operations.TryGetValue(operation, out var calculateOperation))
        {
            return BadRequest(new { error = $"Invalid operation: {operation}" });
        }

        if (!TryParseOperand("operand1", operand1, out var firstOperand, out var firstError))
        {
            return BadRequest(new { error = firstError });
        }

        if (!TryParseOperand("operand2", operand2, out var secondOperand, out var secondError))
        {
            return BadRequest(new { error = secondError });
        }

        var result = calculateOperation(firstOperand, secondOperand);
        return Ok(new { result = double.IsFinite(result) ? result : (double?)null });
    }

    private static bool TryParseOperand(
        string name,
        string? value,
        out double operand,
        out string error)
    {
        if (string.IsNullOrEmpty(value) ||
            !OperandPattern.IsMatch(value) ||
            value.Count(character => !"-0123456789e".Contains(character)) > 1 ||
            !double.TryParse(value, NumberStyles.Float, CultureInfo.InvariantCulture, out operand))
        {
            operand = 0;
            error = $"Invalid {name}: {value ?? "undefined"}";
            return false;
        }

        error = string.Empty;
        return true;
    }
}
