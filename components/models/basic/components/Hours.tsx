import { Hours as HoursType, WorkingHour } from "@/types/salon-temp";

interface HoursProps {
  data: HoursType;
}

export default function Hours({ data }: HoursProps) {
  return (
    <section id="hours">
      <div className="container">
        <div className="section-header">
          <span>Schedule</span>

          <h2>{data.title}</h2>
        </div>

        <div className="hours-card">
          {data.items.map((item: WorkingHour) => (
            <div
              key={item.day}
              className="hour"
            >
              <span>{item.day}</span>

              <strong>{item.time}</strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}