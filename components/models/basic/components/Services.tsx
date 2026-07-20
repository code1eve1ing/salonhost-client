import { Services as ServicesType } from "@/types/salon-temp";

interface ServicesProps {
  data: ServicesType;
}

export default function Services({
  data,
}: ServicesProps) {
  return (
    <section id="services">
      <div className="container">
        <div className="section-header">
          <span>Our Services</span>
          <h2>{data.title}</h2>
        </div>

        <div className="services-grid">
          {data.items.map((group) => (
            <div
              className="service-card"
              key={group.title}
            >
              <div className="service-top">
                <h3>{group.title}</h3>
              </div>

              {group.items.map((item) => (
                <div
                  key={item.name}
                  className="service-item"
                >
                  <span>{item.name}</span>
                  <strong>{item.price}</strong>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}