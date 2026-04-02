import axios from 'axios';

const api = axios.create({
  baseURL: '/',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const auctionService = {
  getAuctions: (params) => api.get('/search', { params }),
  getAuctionById: (id) => api.get(`/auctions/${id}`),
  createAuction: (data) => api.post('/auctions', data),
  updateAuction: (id, data) => api.put(`/auctions/${id}`, data),
  deleteAuction: (id) => api.delete(`/auctions/${id}`),
};

export const bidService = {
  getBidsForAuction: (auctionId) => api.get(`/bids/${auctionId}`),
  placeBid: (auctionId, amount) => api.post(`/bids?AuctionId=${auctionId}&Amount=${amount}`),
};

export default api;
