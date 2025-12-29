import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/300x300?text=No+Image';
  };

  return (
    <div className="product-card" dir={product.title && /[\u0600-\u06FF]/.test(product.title) ? 'rtl' : 'ltr'}>
      <div className="product-image-container">
        <img
          src={product.photo_link || 'https://via.placeholder.com/300x300?text=No+Image'}
          alt={product.title || 'Product'}
          className="product-image"
          onError={handleImageError}
          loading="lazy"
        />
      </div>
      <div className="product-info">
        <h3 className="product-title">{product.title || 'Untitled Product'}</h3>
        {product.brand && (
          <p className="product-brand">{product.brand}</p>
        )}
        {product.description && (
          <p className="product-description">{product.description}</p>
        )}
        <div className="product-score">
          <span className="score-label">Score:</span>
          <span className="score-value">{product.score?.toFixed(2) || '0.00'}</span>
        </div>
        {product.category && (
          <span className="product-category">{product.category}</span>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
