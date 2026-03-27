import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Trash2 } from 'lucide-react';
import { auctionService } from '../services/api';
import AuctionCard from '../components/AuctionCard';
import toast from 'react-hot-toast';

export default function MyAuctions() {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyAuctions();
  }, []);

  const fetchMyAuctions = async () => {
    setLoading(true);
    try {
      const username = localStorage.getItem('username');
      if (!username) {
        toast.error('Please login to view your auctions');
        setLoading(false);
        return;
      }
      
      const response = await auctionService.getAuctions({ 
        seller: username 
      });
      
      // Filter on client side as backup
      const userAuctions = (response.data.results || []).filter(
        auction => auction.seller.toLowerCase() === username.toLowerCase()
      );
      
      setAuctions(userAuctions);
    } catch (error) {
      console.error('Error fetching auctions:', error);
      toast.error('Failed to load your auctions');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this auction?')) {
      return;
    }

    try {
      await auctionService.deleteAuction(id);
      toast.success('Auction deleted successfully');
      setAuctions(auctions.filter(a => a.id !== id));
    } catch (error) {
      console.error('Error deleting auction:', error);
      toast.error('Failed to delete auction');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 dark:border-blue-400"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Auctions</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Manage your listed vehicles</p>
          </div>
          <Link to="/create" className="btn-primary flex items-center space-x-2">
            <Plus className="h-5 w-5" />
            <span>List New Car</span>
          </Link>
        </div>

        {auctions.length === 0 ? (
          <div className="card p-12 text-center">
            <div className="text-gray-400 dark:text-gray-600 mb-4">
              <Plus className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No auctions yet</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">Start by listing your first vehicle</p>
            <Link to="/create" className="btn-primary inline-flex items-center space-x-2">
              <Plus className="h-5 w-5" />
              <span>Create Auction</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {auctions.map((auction) => (
              <div key={auction.id} className="relative">
                <AuctionCard auction={auction} />
                <div className="absolute top-4 left-4 flex space-x-2">
                  <button
                    onClick={() => handleDelete(auction.id)}
                    className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg shadow-lg transition"
                    title="Delete auction"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
