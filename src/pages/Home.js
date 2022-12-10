import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";

export default function Home() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <div className="container my-3">
      <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
          <img
            className="d-block w-100  h-80"
            src="https://makananoleholeh.com/wp-content/uploads/2020/12/Makanan-Khas-Indonesia-terlengkap.jpg"
            alt="First slide"
          />
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 h-80"
            src="https://1.bp.blogspot.com/-mu7rzFodbfM/XS3aqQzmmCI/AAAAAAAAAjM/STIVkm5P9o0bk-gQPJiD1ElNUPnfh9NsACLcBGAs/s1600/snack.jpg"
            alt="Second slide"
          />

          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 h-80"
            src="https://bisnisukm.com/uploads/2020/06/manisnya-peluang-usaha-minuman-kekinian-modal-kecil.png"
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
      <div className="text-white">
        <h1>Selamat Datang  <br/> Warung Online D'Sawah Bns</h1>
        <h4>Selamat Berbelanja yang anda inginkan</h4>
       
      </div>
    </div>
  );
}
