using Contracts;
using MassTransit;
using Microsoft.AspNetCore.SignalR;

namespace NotificationService;

public class AuctionFinishedConsumer : IConsumer<AuctionFinished>
{
    private readonly IHubContext<NotificationHub> _context;

    public AuctionFinishedConsumer(IHubContext<NotificationHub> context)
    {
        _context = context;
    }
    public async Task Consume(ConsumeContext<AuctionFinished> context)
    {
        await _context.Clients.All.SendAsync("AuctionFinished", context.Message);
    }
}