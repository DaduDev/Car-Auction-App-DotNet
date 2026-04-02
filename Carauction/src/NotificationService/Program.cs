using MassTransit;
using NotificationService;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddMassTransit(x =>
{
    x.AddConsumersFromNamespaceContaining<AuctionCreatedConsumer>();
    x.AddConsumersFromNamespaceContaining<AuctionFinishedConsumer>();
    x.AddConsumersFromNamespaceContaining<BidPlacedConsumer>();
    x.SetEndpointNameFormatter(new KebabCaseEndpointNameFormatter("nt", false));

    x.UsingRabbitMq((context, cfg) =>
    {
        cfg.AutoStart = true;
        cfg.Host("rabbitmq", "/", h =>
        {
            h.Username("dev");
            h.Password("dev");
        });

        cfg.ConfigureEndpoints(context);
    });
});

builder.Services.AddSignalR();

builder.Services.AddCors(options =>
{
    options.AddPolicy("signalrPolicy", b =>
    {
        b.AllowAnyHeader().AllowAnyMethod().AllowCredentials()
         .WithOrigins("http://localhost:3000");
    });
});

var app = builder.Build();

app.UseCors("signalrPolicy");

app.MapHub<NotificationHub>("/notifications");

app.Run();
