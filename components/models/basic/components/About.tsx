import { Intro } from "@/types/salon-temp";

interface AboutProps {
  data: Intro;
}

export default function About({ data }: AboutProps) {
  return (
    <section id="about">
      <div className="container">
        <div className="section-header">
          <span>About Us</span>

          <h2>{data.title}</h2>
        </div>

        <div className="intro-card">
          <p>{data.description}</p>
        </div>
      </div>
    </section>
  );
}