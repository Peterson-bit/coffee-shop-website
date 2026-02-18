import React, { useRef, useState } from 'react'

const PodswietlanaKarta = ({ card, children, index }) => {
  const cardRef = useRef(null);
  const [glowPos, setGlowPos] = useState({ x: '50%', y: '50%' });

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setGlowPos({ x: `${x}%`, y: `${y}%` });
  };

  const handleMouseLeave = () => {
    setGlowPos({ x: '50%', y: '50%' });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="card timeline-card mb-5 break-inside-avoid-column"
      style={{ minHeight: '180px' }}
    >
      <div
        className="card-glow"
        style={{
          left: glowPos.x,
          top: glowPos.y,
        }}
      />
      <div className="card-content">
        <div className="mb-5">
          <p className="text-blue-100 text-lg">{card.review}</p>
        </div>
        {children}
      </div>
    </div>
  );
};

export default PodswietlanaKarta;