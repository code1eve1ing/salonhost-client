import Image from "next/image";
import { Gallery as GalleryType } from "@/types/salon-temp";

interface GalleryProps {
  data: GalleryType;
}

export default function Gallery({ data }: GalleryProps) {
  return (
    <section id="gallery">
      <div className="container">
        <div className="section-header">
          <span>Gallery</span>

          <h2>{data.title}</h2>
        </div>

        <div className="gallery-grid">
          {data.items.map((image:string, index:number) => (
            <div
              key={index}
              className="gallery-item"
            >
              <Image
                src={image}
                alt={`Gallery image ${index + 1}`}
                width={600}
                height={320}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}