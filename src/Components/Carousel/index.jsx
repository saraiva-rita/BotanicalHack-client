import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const ImageCarousel = () => {
  return (
    <div className="carousel-container">
      <Carousel showThumbs={false} infiniteLoop={true}>
        <div className="carousel-item">
          <img src="/images/calathea-banner.avif" alt="Image 1" />
        </div>
        <div className="carousel-item">
          <img src="/images/calathea-orbifolia.jpg" alt="Image 2" />
        </div>
        <div className="carousel-item">
          <img src="/images/kiyohime.png" alt="Image 3" />
        </div >
        <div className="carousel-item">
          <img src="/images/light-veins-maranta.png" alt="Image 3" />
        </div>
        <div className="carousel-item">
          <img src="/images/pinus.png" alt="Image 3" />
        </div>
      </Carousel>
    </div>
  );
};

export default ImageCarousel;
