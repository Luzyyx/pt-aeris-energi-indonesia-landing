import { useEffect, useMemo, useState } from 'react';

export default function ProductGridCarousel({ cards, interval = 4200 }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeCard = cards[activeIndex];

  useEffect(() => {
    if (cards.length < 2) return undefined;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % cards.length);
    }, interval);

    return () => window.clearInterval(timer);
  }, [cards.length, interval]);

  const gridCards = useMemo(() => {
    if (!cards.length) return [];
    return cards.map((card, index) => ({
      ...card,
      isActive: index === activeIndex,
      distance: Math.abs(index - activeIndex),
    }));
  }, [activeIndex, cards]);

  if (!cards.length) return null;

  return (
    <div className="product-grid-showcase" style={{ '--product-progress': `${((activeIndex + 1) / cards.length) * 100}%` }}>
      <div className="product-grid" key={activeIndex} aria-live="polite">
        {gridCards.map((card, index) => (
          <button
            type="button"
            className={`product-tile ${card.isActive ? 'is-active' : ''} ${card.distance > 1 ? 'is-muted' : ''}`}
            key={card.title || index}
            onClick={() => setActiveIndex(index)}
            aria-label={`Tampilkan ${card.title}`}
          >
            <img src={card.imgUrl} loading="lazy" alt={card.alt || card.title} />
            <span className="product-tile-shade" />
            <span className="product-tile-copy">
              <small>{card.label}</small>
              <strong>{card.title}</strong>
              {card.isActive ? <em>{card.text}</em> : null}
            </span>
            <span className="product-tile-index">0{index + 1}</span>
          </button>
        ))}
      </div>

      <div className="product-grid-footer">
        <div>
          <span className="eyebrow">Sedang ditampilkan</span>
          <strong>{activeCard.title}</strong>
        </div>
        <div className="product-progress" aria-hidden="true"><span /></div>
        <div className="product-dots" aria-label="Pilih produk">
          {cards.map((card, index) => (
            <button
              type="button"
              key={card.title || index}
              className={index === activeIndex ? 'is-active' : ''}
              onClick={() => setActiveIndex(index)}
              aria-label={`Pilih ${card.title}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
