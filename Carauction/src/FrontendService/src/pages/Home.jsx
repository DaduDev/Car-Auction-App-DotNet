import { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import { auctionService } from '../services/api';
import AuctionCard from '../components/AuctionCard';
import toast from 'react-hot-toast';

export default function Home() {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('live');

  useEffect(() => {
    fetchAuctions();
  }, [filterBy]);

  const fetchAuctions = async () => {
    setLoading(true);
    try {
      const response = await auctionService.getAuctions({ filterBy });
      setAuctions(response.data.results || []);
    } catch (error) {
      console.error('Error fetching auctions:', error);
      toast.error('Failed to load auctions');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      fetchAuctions();
      return;
    }
    
    setLoading(true);
    try {
      const response = await auctionService.getAuctions({ 
        searchTerm: searchTerm.trim(), 
        filterBy 
      });
      setAuctions(response.data.results || []);
    } catch (error) {
      console.error('Error searching:', error);
      toast.error('Search failed');
    } finally {
      setLoading(false);
    }
  };

  const filters = [
    { value: 'live', label: 'Live Auctions' },
    { value: 'endingSoon', label: 'Ending Soon' },
    { value: 'finished', label: 'Finished' },
  ];

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-700 dark:to-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Find Your Dream Car</h1>
          <p className="text-lg text-blue-100 mb-8">
            Browse thousands of premium vehicles at auction
          </p>
          
          <form onSubmit={handleSearch} className="max-w-3xl">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search by make, model, or color..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-lg text-gray-900 dark:text-gray-100 dark:bg-gray-800 focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>
              <button type="submit" className="bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                Search
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center space-x-2 mb-8 overflow-x-auto">
          <Filter className="h-5 w-5 text-gray-600 dark:text-gray-400 flex-shrink-0" />
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setFilterBy(filter.value)}
              className={`px-6 py-2 rounded-lg font-medium transition whitespace-nowrap ${
                filterBy === filter.value
                  ? 'bg-blue-600 dark:bg-blue-500 text-white shadow-sm'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 dark:border-blue-400"></div>
          </div>
        ) : auctions.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-gray-400 dark:text-gray-600 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No auctions found</h3>
            <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or filters</p>
          </div>
        ) : (
          <>
            <div className="mb-6 text-gray-600 dark:text-gray-400">
              <span className="font-semibold">{auctions.length}</span> auctions found
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {auctions.map((auction) => (
                <AuctionCard key={auction.id} auction={auction} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
