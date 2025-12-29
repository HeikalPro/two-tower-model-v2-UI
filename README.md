# E-commerce Recommendation Demo

A modern React UI for an e-commerce recommendation system that matches the design of the provided website screenshot.

## Features

- ✅ Clean, modern UI with rounded corners and soft shadows
- ✅ Responsive design (Desktop: 4-5 cards, Tablet: 2-3 cards, Mobile: 1 card)
- ✅ RTL support for Arabic text
- ✅ Dynamic interaction list with add/remove functionality
- ✅ API integration with loading states and error handling
- ✅ Product cards with hover effects
- ✅ Recommendation score display

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

## API Configuration

The app is configured to use the local backend endpoint by default:
- **URL**: `http://localhost:8000/retrieve` (default)
- **Method**: POST
- **Request Body**: 
  ```json
  {
    "buyer_id": "buyer_123",
    "recent_interactions": [
      { "product_id": "uuid", "event_type": "view" }
    ],
    "k": 50
  }
  ```

### Custom API Endpoint

To use a different API endpoint, create a `.env` file in the root directory:
```
VITE_API_URL=http://your-api-url:8000/retrieve
```

## Local Development Setup

### Running the Frontend and Backend Together

1. **Start the Backend API** (on port 8000):
   ```bash
   # Your backend should be running on http://localhost:8000
   # The /retrieve endpoint should be available
   ```

2. **Start the Frontend** (on port 3000):
   ```bash
   npm install
   npm run dev
   ```

3. **Access the Application**:
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:8000/retrieve`

The frontend will automatically connect to the local backend API.

## Project Structure

```
src/
├── components/
│   ├── InteractionRow.jsx       # Individual interaction input row
│   ├── InteractionRow.css
│   ├── RecommendationForm.jsx    # Main form component
│   ├── RecommendationForm.css
│   ├── ProductCard.jsx           # Individual product card
│   ├── ProductCard.css
│   ├── ProductGrid.jsx           # Grid container for products
│   └── ProductGrid.css
├── App.jsx                        # Main app component
├── App.css
├── main.jsx                       # Entry point
└── index.css                      # Global styles
```

## Usage

1. Enter a Buyer ID (default: `buyer_123`)
2. Add one or more recent interactions:
   - Product ID (text input)
   - Event Type (dropdown: view, add_to_cart, purchase)
3. Select the number of recommendations (K): 10, 50, 100, 150, or 200
4. Click "Get Recommendations" to fetch and display products

## Technologies Used

- React 18
- Vite
- Axios
- CSS3 (Grid, Flexbox, Animations)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
