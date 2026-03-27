import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, DollarSign, Gauge, Palette, User, ArrowLeft } from 'lucide-react';
import { auctionService } from '../services/api';
import { formatDistanceToNow, format } from 'date-fns';
import toast from 'react-hot-toast';

export default function AuctionDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [auction, setAuction] = useState(null);
  const [loading, setLoading] = useState(true);
  const isAuthenticated = !!localStorage.getItem('access_token');

  useEffect(() => {
    fetchAuction();
  }, [id]);

  const fetchAuction = async () => {
    try {
      const response = await auctionService.getAuctionById(id);
      setAuction(response.data);
    } catch (error) {
      console.error('Error fetching auction:', error);
      toast.error('Failed to load auction details');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 dark:border-blue-400"></div>
      </div>
    );
  }

  if (!auction) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center bg-gray-50 dark:bg-gray-900 min-h-screen">
        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300">Auction not found</h2>
        <button onClick={() => navigate('/')} className="mt-4 btn-primary">
          Back to Auctions
        </button>
      </div>
    );
  }

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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate('/')}
          className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-6 transition"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Auctions</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="card overflow-hidden">
              <img
                src={auction.imageUrl || 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800'}
                alt={`${auction.make} ${auction.model}`}
                className="w-full h-96 object-cover"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="card p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {auction.year} {auction.make} {auction.model}
                  </h1>
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(auction.status)}`}>
                      {auction.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Current Bid</span>
                  <div className="flex items-center space-x-1 text-blue-600 dark:text-blue-400 font-bold text-3xl">
                    <DollarSign className="h-8 w-8" />
                    <span>{auction.currentHighBid?.toLocaleString() || '0'}</span>
                  </div>
                </div>

                {auction.reservePrice > 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Reserve Price</span>
                    <span className="font-semibold text-gray-900 dark:text-white">${auction.reservePrice.toLocaleString()}</span>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="flex items-center space-x-3">
                    <Gauge className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Mileage</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{auction.mileage?.toLocaleString()} km</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Palette className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Color</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{auction.color}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Year</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{auction.year}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <User className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Seller</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{auction.seller}</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 mb-2">
                    <Clock className="h-5 w-5" />
                    <span className="font-semibold">
                      {formatDistanceToNow(new Date(auction.auctionEnd), { addSuffix: true })}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Ends on {format(new Date(auction.auctionEnd), 'PPpp')}
                  </p>
                </div>

                {auction.winner && (
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                    <p className="text-sm text-green-800 dark:text-green-200">
                      <span className="font-semibold">Winner:</span> {auction.winner}
                    </p>
                    {auction.soldAmount && (
                      <p className="text-sm text-green-800 dark:text-green-200">
                        <span className="font-semibold">Sold for:</span> ${auction.soldAmount.toLocaleString()}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {isAuthenticated && auction.status?.toLowerCase() === 'live' && (
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Place a Bid</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Bidding functionality will be available once the Bidding Service is integrated.
                </p>
                <button className="w-full btn-primary" disabled>
                  Place Bid (Coming Soon)
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
