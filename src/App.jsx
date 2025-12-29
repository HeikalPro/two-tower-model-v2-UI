import React, { useState } from 'react';
import axios from 'axios';
import RecommendationForm from './components/RecommendationForm';
import ProductGrid from './components/ProductGrid';
import './App.css';

const API_ENDPOINT = 'http://34.203.221.132:8000/retrieve';

function App() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (formData) => {
    setIsLoading(true);
    setError(null);
    setProducts([]);

    try {
      const response = await axios.post(API_ENDPOINT, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 30000, // 30 seconds timeout
      });

      if (response.data && response.data.products) {
        setProducts(response.data.products);
      } else {
        setError('Invalid response format from API');
      }
    } catch (err) {
      console.error('API Error:', err);
      
      if (err.response) {
        // Server responded with error status
        setError(`Server error: ${err.response.status} - ${err.response.data?.message || err.response.statusText}`);
      } else if (err.request) {
        // Request made but no response
        setError('No response from server. Please check your connection and try again.');
      } else {
        // Something else happened
        setError(`Error: ${err.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">E-commerce Recommendation Demo</h1>
        <p className="app-subtitle">Get personalized product recommendations</p>
      </header>

      <main className="app-main">
        <div className="container">
          <RecommendationForm onSubmit={handleSubmit} isLoading={isLoading} />
          
          {error && (
            <div className="error-message">
              <strong>Error:</strong> {error}
            </div>
          )}

          <ProductGrid products={products} isLoading={isLoading} />
        </div>
      </main>

      <footer className="app-footer">
        <p>&copy; 2024 E-commerce Recommendation Demo</p>
      </footer>
    </div>
  );
}

export default App;
