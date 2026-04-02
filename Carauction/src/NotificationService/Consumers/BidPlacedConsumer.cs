using Contracts;
using MassTransit;
using Microsoft.AspNetCore.SignalR;

namespace NotificationService;

public class BidPlacedConsumer : IConsumer<BidPlaced>
{
    private readonly IHubContext<NotificationHub> _context;

    public BidPlacedConsumer(IHubContext<NotificationHub> context)
    {
        _context = context;
    }
    public async Task Consume(ConsumeContext<BidPlaced> context)
    {
        await _context.Clients.All.SendAsync("BidPlaced", context.Message);
    }
}