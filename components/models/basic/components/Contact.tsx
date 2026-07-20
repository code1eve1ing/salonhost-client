import { ContactDetails } from "@/types/salon";

interface ContactProps {
  data: ContactDetails;
}

export default function Contact({ data }: ContactProps) {
  return (
    <section id="contact">
      <div className="container">
        <div className="section-header">
          <span>Contact</span>

          <h2>{data.title}</h2>
        </div>

        <div className="contact-grid">
          <div className="contact-card">
            <div className="contact-item">
              <h4>WhatsApp</h4>

              <a href={`https://wa.me/${data.whatsapp}`}>
                +{data.whatsapp}
              </a>
            </div>

            <div className="contact-item">
              <h4>Email</h4>

              <a href={`mailto:${data.email}`}>
                {data.email}
              </a>
            </div>

            <div className="contact-item">
              <h4>Address</h4>

              <p>{data.address}</p>
            </div>
          </div>

          <iframe
            src={data.map || "https://maps.google.com/maps?q=Ahmedabad&t=&z=13&ie=UTF8&iwloc=&output=embed"}
            title="Salon location"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}