import React, { useState } from 'react';
import { mustDoItems } from '../data/mustDoData';

export default function MustDoPage() {
  const [selectedId, setSelectedId] = useState(null);

  const selectedItem = mustDoItems.find(item => item.id === selectedId);

  return (
    <div style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
      <h1>Must Do Checklist</h1>

      {!selectedItem ? (
        // OVERVIEW GRID (6 Cards)
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {mustDoItems.map(item => (
            <div 
              key={item.id} 
              style={{ border: '1fr solid #ccc', padding: '1.5rem', borderRadius: '8px', cursor: 'pointer', background: '#fff' }}
              onClick={() => setSelectedId(item.id)}
            >
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <button style={{ padding: '0.5rem 1rem', background: '#A6551F', color: '#fff', border: 'none', borderRadius: '4px' }}>
                View Details
              </button>
            </div>
          ))}
        </div>
      ) : (
        // SINGLE DETAIL VIEW
        <div style={{ border: '1px solid #ccc', padding: '2rem', borderRadius: '8px', background: '#fff' }}>
          <button onClick={() => setSelectedId(null)} style={{ marginBottom: '1rem' }}>
            ← Back to Overview
          </button>
          <h2>{selectedItem.title}</h2>
          <p><strong>Description:</strong> {selectedItem.description}</p>
          <p><strong>Who Needs It:</strong> {selectedItem.whoNeedsIt}</p>
          <p><strong>Time Needed:</strong> {selectedItem.timeNeeded}</p>
          
          <h3>Required Documents:</h3>
          <ul>
            {selectedItem.documents.map((doc, idx) => (
              <li key={idx}>{doc}</li>
            ))}
          </ul>

          <p>
            <a href={selectedItem.officialLink} target="_blank" rel="noreferrer">
              Visit Official Website
            </a>
          </p>
          <small>Information last checked on: {selectedItem.checkedDate}</small>
        </div>
      )}
    </div>
  );
}