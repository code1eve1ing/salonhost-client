import { Hero as HeroType } from "@/types/salon-temp";

interface HeroProps {
  data: HeroType;
}

export default function Hero({ data }: HeroProps) {
  return (
    <section className="hero">
      <div
        className="hero-bg"
        style={{
          backgroundImage: `url(${data.background})`,
        }}
      />

      <div className="hero-overlay" />

      <div className="container">
        <div className="hero-content">
          <div className="hero-subtitle">{data.subtitle}</div>

          <h1>{data.name}</h1>

          <p>{data.description}</p>

          <div className="hero-actions">
            <a
              className="btn-primary"
              href={data.primaryButton.link}
            >
              {data.primaryButton.text}
            </a>

            <a
              className="btn-secondary"
              href={data.secondaryButton.link}
            >
              {data.secondaryButton.text}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}