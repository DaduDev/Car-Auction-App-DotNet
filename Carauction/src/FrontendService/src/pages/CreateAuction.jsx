import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Car, DollarSign, Calendar, Palette, Gauge, Image } from 'lucide-react';
import { auctionService } from '../services/api';
import toast from 'react-hot-toast';

export default function CreateAuction() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: new Date().getFullYear(),
    color: '',
    mileage: '',
    imageUrl: '',
    reservePrice: '',
    auctionEnd: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const auctionData = {
        ...formData,
        year: parseInt(formData.year),
        mileage: parseInt(formData.mileage),
        reservePrice: parseInt(formData.reservePrice),
        auctionEnd: new Date(formData.auctionEnd).toISOString(),
      };

      await auctionService.createAuction(auctionData);
      toast.success('Auction created successfully!');
      navigate('/my-auctions');
    } catch (error) {
      console.error('Error creating auction:', error);
      toast.error(error.response?.data?.message || 'Failed to create auction');
    } finally {
      setLoading(false);
    }
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="card p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">List Your Car</h1>
            <p className="text-gray-600 dark:text-gray-400">Fill in the details to create an auction for your vehicle</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <div className="flex items-center space-x-2">
                    <Car className="h-4 w-4" />
                    <span>Make</span>
                  </div>
                </label>
                <input
                  type="text"
                  name="make"
                  value={formData.make}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Ford, Toyota, BMW"
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Model
                </label>
                <input
                  type="text"
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Mustang, Camry, M3"
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>Year</span>
                  </div>
                </label>
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  required
                  className="input-field"
                >
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <div className="flex items-center space-x-2">
                    <Palette className="h-4 w-4" />
                    <span>Color</span>
                  </div>
                </label>
                <input
                  type="text"
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Red, Blue, Black"
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <div className="flex items-center space-x-2">
                    <Gauge className="h-4 w-4" />
                    <span>Mileage (km)</span>
                  </div>
                </label>
                <input
                  type="number"
                  name="mileage"
                  value={formData.mileage}
                  onChange={handleChange}
                  required
                  min="0"
                  placeholder="e.g., 50000"
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4" />
                    <span>Reserve Price</span>
                  </div>
                </label>
                <input
                  type="number"
                  name="reservePrice"
                  value={formData.reservePrice}
                  onChange={handleChange}
                  required
                  min="0"
                  placeholder="Minimum price"
                  className="input-field"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <div className="flex items-center space-x-2">
                  <Image className="h-4 w-4" />
                  <span>Image URL</span>
                </div>
              </label>
              <input
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="https://example.com/car-image.jpg"
                className="input-field"
              />
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Provide a URL to an image of your vehicle
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>Auction End Date & Time</span>
                </div>
              </label>
              <input
                type="datetime-local"
                name="auctionEnd"
                value={formData.auctionEnd}
                onChange={handleChange}
                required
                min={new Date().toISOString().slice(0, 16)}
                className="input-field"
              />
            </div>

            <div className="flex space-x-4 pt-6">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating...' : 'Create Auction'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/')}
                className="flex-1 btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
