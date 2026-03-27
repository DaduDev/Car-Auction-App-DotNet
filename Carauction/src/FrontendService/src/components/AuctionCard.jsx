import { Link } from 'react-router-dom';
import { Clock, DollarSign, Gauge, Calendar } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export default function AuctionCard({ auction }) {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'live':
        return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200';
      case 'finished':
        return 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200';
      case 'reservenotmet':
        return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200';
    }
  };

  const timeRemaining = formatDistanceToNow(new Date(auction.auctionEnd), { addSuffix: true });

  return (
    <Link to={`/auction/${auction.id}`} className="block">
      <div className="card overflow-hidden group">
        <div className="relative h-48 overflow-hidden bg-gray-200 dark:bg-gray-700">
          <img
            src={auction.imageUrl || 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=500'}
            alt={`${auction.make} ${auction.model}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 right-3">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(auction.status)}`}>
              {auction.status}
            </span>
          </div>
        </div>
        
        <div className="p-5">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            {auction.year} {auction.make} {auction.model}
          </h3>
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
              <Gauge className="h-4 w-4" />
              <span className="text-sm">{auction.mileage?.toLocaleString()} km</span>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{auction.color}</div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Current Bid</span>
              <div className="flex items-center space-x-1 text-blue-600 dark:text-blue-400 font-bold text-lg">
                <DollarSign className="h-5 w-5" />
                <span>{auction.currentHighBid?.toLocaleString() || '0'}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
                <Clock className="h-4 w-4" />
                <span>{timeRemaining}</span>
              </div>
              <div className="text-gray-500 dark:text-gray-400">
                Seller: {auction.seller}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
