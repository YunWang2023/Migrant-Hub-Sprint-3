import React, { useState } from 'react';

export default function CommunityPage() {
  const [isJoined, setIsJoined] = useState(false);

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Helsinki Newcomers Community</h2>
      <p>Connect with other international students living and studying in Helsinki.</p>
      
      <button 
        onClick={() => setIsJoined(!isJoined)}
        style={{ padding: '0.5rem 1rem', backgroundColor: isJoined ? '#666' : '#A6551F', color: '#fff', border: 'none', borderRadius: '4px' }}
      >
        {isJoined ? 'Joined' : 'Join Community'}
      </button>

      <h3 style={{ marginTop: '2rem' }}>Community Posts</h3>
      <div style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '4px' }}>
        <h4>Best places to buy cheap groceries?</h4>
        <p>Check out Lidl or Prisma for budget-friendly student shopping!</p>
      </div>
    </div>
  );
}