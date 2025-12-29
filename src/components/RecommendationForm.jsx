import React, { useState } from 'react';
import InteractionRow from './InteractionRow';
import './RecommendationForm.css';

const RecommendationForm = ({ onSubmit, isLoading }) => {
  const [buyerId, setBuyerId] = useState('buyer_123');
  const [interactions, setInteractions] = useState([
    { product_id: '', event_type: 'view' }
  ]);
  const [k, setK] = useState(50);

  const handleInteractionChange = (index, field, value) => {
    const updated = [...interactions];
    updated[index] = { ...updated[index], [field]: value };
    setInteractions(updated);
  };

  const handleAddInteraction = () => {
    setInteractions([...interactions, { product_id: '', event_type: 'view' }]);
  };

  const handleRemoveInteraction = (index) => {
    if (interactions.length > 1) {
      const updated = interactions.filter((_, i) => i !== index);
      setInteractions(updated);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Filter out empty product IDs
    const validInteractions = interactions.filter(
      (interaction) => interaction.product_id.trim() !== ''
    );

    if (validInteractions.length === 0) {
      alert('Please add at least one interaction with a product ID');
      return;
    }

    onSubmit({
      buyer_id: buyerId.trim() || 'buyer_123',
      recent_interactions: validInteractions,
      k: k
    });
  };

  return (
    <form className="recommendation-form" onSubmit={handleSubmit}>
      <div className="form-section">
        <h2 className="form-title">Get Product Recommendations</h2>
        
        <div className="form-row">
          <div className="form-group compact">
            <label htmlFor="buyer-id">Buyer ID</label>
            <input
              type="text"
              id="buyer-id"
              value={buyerId}
              onChange={(e) => setBuyerId(e.target.value)}
              placeholder="buyer_123"
              className="buyer-id-input"
            />
          </div>

          <div className="form-group compact">
            <label htmlFor="k-selector">Recommendations (K)</label>
            <select
              id="k-selector"
              value={k}
              onChange={(e) => setK(Number(e.target.value))}
              className="k-selector"
            >
              <option value={10}>10</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
              <option value={150}>150</option>
              <option value={200}>200</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <div className="interactions-header">
            <label className="interactions-label">Recent Interactions</label>
            <button
              type="button"
              onClick={handleAddInteraction}
              className="add-interaction-button"
              aria-label="Add interaction"
            >
              ➕
            </button>
          </div>
          <div className="interactions-list">
            {interactions.map((interaction, index) => (
              <InteractionRow
                key={index}
                interaction={interaction}
                index={index}
                onChange={handleInteractionChange}
                onRemove={handleRemoveInteraction}
                canRemove={interactions.length > 1}
              />
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="submit-button"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="spinner"></span>
              Loading...
            </>
          ) : (
            'Get Recommendations'
          )}
        </button>
      </div>
    </form>
  );
};

export default RecommendationForm;
