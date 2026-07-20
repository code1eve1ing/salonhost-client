import { Offer, Offers as OffersType } from "@/types/salon-temp";

interface OffersProps {
  data: OffersType;
}

export default function Offers({ data }: OffersProps) {
  return (
    <section id="offers">
      <div className="container">
        <div className="section-header">
          <span>Special Offers</span>
          <h2>{data.title}</h2>
        </div>
        <div className="offers-grid">
          {data.items.map((offer: Offer) => (
            <div
              key={offer.title}
              className="offer-card"
            >
              <h3>{offer.title}</h3>
              <p>{offer.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}