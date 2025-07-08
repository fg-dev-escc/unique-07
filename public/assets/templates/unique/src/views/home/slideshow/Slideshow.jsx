import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { Card } from "./Card";
import { Spin } from "antd";
import { Loading } from "../../../components/Loading";

export function Slideshow() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const {slideCars, loading} = useSelector((state) => state.slideshowReducer);
  const itemsPerPage = 4;

  const nextSlide = () => {
    if (current + itemsPerPage < slideCars.length) {
      setCurrent((prev) => prev + itemsPerPage);
    } else {
      setCurrent(0);
    }
  };

  const prevSlide = () => {
    if (current - itemsPerPage >= 0) {
      setCurrent((prev) => prev - itemsPerPage);
    } else {
      setCurrent(0);
    }
  };

  const totalPages = Math.ceil(slideCars.length / itemsPerPage);
  const activePage = Math.floor(current / itemsPerPage);
  const click = (car) => {
    // navigate(`/detalles/${car.link}`);
    navigate(`/detalles/${car.link}`);
  };

  if (loading) return <Loading />
  if (slideCars.length === 0) return <div className="loading">Sin imagenes para mostrar </div>;

  return (
    <div className="carousel">
      {/* Puntitos arriba */}
      <div className="dots">
        {Array.from({ length: totalPages }).map((_, index) => (
          <span
            key={index}
            className={`dot ${index === activePage ? "active" : ""}`}
            onClick={() => setCurrent(index * itemsPerPage)}
          ></span>
        ))}
      </div>

      <button onClick={prevSlide} className="nav left">
        &#10094;
      </button>

      <div
        className="carousel-track"
        style={{
          transform: `translateX(-${current * (100 / itemsPerPage)}%)`,
          transition: "transform 0.5s ease",
        }}
      >
        {slideCars.map((car, index) => (
          <Card car={car} click={click} key={car.id} />
        ))}
      </div>

      <button onClick={nextSlide} className="nav right">
        &#10095;
      </button>
    </div>
  );
}
