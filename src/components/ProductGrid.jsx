import React from 'react';
import ProductCard from './ProductCard';
import './ProductGrid.css';

const ProductGrid = ({ products, isLoading }) => {
  if (isLoading) {
    return (
      <div className="product-grid-container">
        <div className="loading-state">
          <div className="spinner-large"></div>
          <p>Loading recommendations...</p>
        </div>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="product-grid-container">
        <div className="empty-state">
          <p>No recommendations available. Submit the form to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="product-grid-container">
      <div className="results-header">
        <h2 className="results-title">
          Recommendations
          <span className="results-count">({products.length} products)</span>
        </h2>
      </div>
      <div className="product-grid">
        {products.map((product, index) => (
          <ProductCard key={product.product_id || index} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
