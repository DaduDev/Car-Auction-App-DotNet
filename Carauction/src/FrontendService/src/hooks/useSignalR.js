import { useEffect, useRef } from 'react';
import * as signalR from '@microsoft/signalr';

export function useSignalR(onBidPlaced, onAuctionFinished) {
  const bidPlacedRef = useRef(onBidPlaced);
  const auctionFinishedRef = useRef(onAuctionFinished);

  useEffect(() => { bidPlacedRef.current = onBidPlaced; }, [onBidPlaced]);
  useEffect(() => { auctionFinishedRef.current = onAuctionFinished; }, [onAuctionFinished]);

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl('/notifications')
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Warning)
      .build();

    connection.on('BidPlaced', (data) => bidPlacedRef.current?.(data));
    connection.on('AuctionFinished', (data) => auctionFinishedRef.current?.(data));

    connection.start().catch(console.error);

    return () => { connection.stop(); };
  }, []);
}
