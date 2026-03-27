# Car Auction Frontend Service

Modern, professional React frontend for the Car Auction microservices application built with Vite, React, Tailwind CSS, and OIDC authentication.

## Features

✨ **Authentication**
- Login/Logout with Identity Server (OIDC)
- Protected routes for authenticated users
- JWT token management

🚗 **Auction Management**
- Browse all live auctions
- Search by make, model, or color
- Filter by status (Live, Ending Soon, Finished)
- View detailed auction information
- Create new auctions (authenticated users)
- Manage your own auctions

🎨 **Modern UI**
- Tailwind CSS for styling
- Responsive design (mobile, tablet, desktop)
- Smooth animations and transitions
- Professional gradient themes
- Lucide React icons

## Tech Stack

- **Vite** - Lightning fast build tool
- **React 18** - UI library
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS
- **OIDC Client** - Authentication
- **Axios** - HTTP client
- **React Hot Toast** - Notifications
- **date-fns** - Date formatting

## Development

### Prerequisites
- Node.js 18+
- Backend services running (Gateway, Search, Auction, Identity)

### Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will run on http://localhost:3000

### Environment

The app proxies API requests to the gateway service at `http://localhost:5004`

## Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## Docker

### Build Image
```bash
docker build -t frontend-svc .
```

### Run Container
```bash
docker run -p 3000:80 frontend-svc
```

### Docker Compose
```bash
cd ../../
docker-compose up frontend-svc
```

## Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── Navbar.jsx
│   └── AuctionCard.jsx
├── pages/           # Page components
│   ├── Home.jsx
│   ├── AuctionDetails.jsx
│   ├── CreateAuction.jsx
│   ├── MyAuctions.jsx
│   └── SigninCallback.jsx
├── services/        # API services
│   └── api.js
├── config/          # Configuration files
│   └── authConfig.js
├── App.jsx          # Main app component
├── main.jsx         # Entry point
└── index.css        # Global styles
```

## Authentication Flow

1. User clicks "Login" button
2. Redirected to Identity Server
3. User enters credentials
4. Redirected back to `/signin-callback`
5. Token stored in localStorage
6. User authenticated and can access protected routes

## API Integration

All API calls go through the gateway service:
- `GET /api/search` - Search auctions
- `GET /api/auctions/:id` - Get auction details
- `POST /api/auctions` - Create auction (auth required)
- `PUT /api/auctions/:id` - Update auction (auth required)
- `DELETE /api/auctions/:id` - Delete auction (auth required)

## Notes

- Bidding functionality placeholder (waiting for BiddingService)
- Identity Server must be running on port 5000
- Gateway must be running on port 5004
- CORS must be configured on backend services
