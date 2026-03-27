using System.Security.Claims;
using IdentityModel;
using IdentityService.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace IdentityService.Controllers;

[ApiController]
[Route("[controller]")]
public class AccountController : ControllerBase
{
    private readonly UserManager<User> _userManager;

    public AccountController(UserManager<User> userManager)
    {
        _userManager = userManager;
    }

    [HttpPost("Register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequest request)
    {
        if (request == null || string.IsNullOrEmpty(request.Username) || string.IsNullOrEmpty(request.Password))
        {
            return BadRequest(new { errors = new[] { "Invalid request" } });
        }

        var user = new User
        {
            UserName = request.Username,
            Email = request.Email ?? $"{request.Username}@example.com",
            Name = request.Username,
            EmailConfirmed = true
        };

        var result = await _userManager.CreateAsync(user, request.Password);

        if (result.Succeeded)
        {
            await _userManager.AddClaimsAsync(user, new[]
            {
                new Claim(JwtClaimTypes.Name, request.Username)
            });

            return Ok(new { message = "Registration successful" });
        }

        return BadRequest(new { errors = result.Errors.Select(e => e.Description).ToArray() });
    }
}

public record RegisterRequest(string Username, string Email, string Password);
