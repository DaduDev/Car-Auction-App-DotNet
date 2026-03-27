using Duende.IdentityServer.Models;

namespace IdentityService;

public static class Config
{
    public static IEnumerable<IdentityResource> IdentityResources =>
        new IdentityResource[]
        { 
            new IdentityResources.OpenId(),
            new IdentityResources.Profile()
        };

    public static IEnumerable<ApiScope> ApiScopes =>
        new ApiScope[]
        {
            new ApiScope("auctionApp", "My Car Auction App", new[] {"name", "role"})
        };

    public static IEnumerable<Client> Clients =>
        new Client[]
        {
            new Client
            {
                ClientId = "postman",
                ClientName = "Postman Client",
                AllowedGrantTypes = GrantTypes.ResourceOwnerPassword,
                ClientSecrets = { new Secret("NotASecret".Sha256())},
                AllowedScopes = {"auctionApp", "openid", "profile" }
            },

            new Client
            {
                ClientId = "frontend",
                ClientName = "Frontend Client",
                ClientSecrets = {new Secret("secret".Sha256())},
                AllowedGrantTypes = GrantTypes.Code,
                RequirePkce = false,
                RedirectUris = {"http://localhost:3000/signin-callback"},
                PostLogoutRedirectUris = {"http://localhost:3000/"},
                AllowedCorsOrigins = {"http://localhost:3000"},
                AllowOfflineAccess = true,
                AllowedScopes = {"auctionApp", "openid", "profile" },
                AccessTokenLifetime = 3600 * 24 * 30,
                AlwaysIncludeUserClaimsInIdToken = true
            }
        };
}