import React from 'react';
import './InteractionRow.css';

const InteractionRow = ({ interaction, index, onChange, onRemove, canRemove }) => {
  return (
    <div className="interaction-row">
      <div className="interaction-input-group">
        <label htmlFor={`product-id-${index}`}>Product ID</label>
        <input
          type="text"
          id={`product-id-${index}`}
          value={interaction.product_id}
          onChange={(e) => onChange(index, 'product_id', e.target.value)}
          placeholder="uuid"
          className="product-id-input"
        />
      </div>
      <div className="interaction-input-group">
        <label htmlFor={`event-type-${index}`}>Event Type</label>
        <select
          id={`event-type-${index}`}
          value={interaction.event_type}
          onChange={(e) => onChange(index, 'event_type', e.target.value)}
          className="event-type-select"
        >
          <option value="view">view</option>
          <option value="add_to_cart">add_to_cart</option>
          <option value="purchase">purchase</option>
        </select>
      </div>
      {canRemove && (
        <button
          type="button"
          onClick={() => onRemove(index)}
          className="remove-button"
          aria-label="Remove interaction"
        >
          🗑
        </button>
      )}
    </div>
  );
};

export default InteractionRow;
