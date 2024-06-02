import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import placeholderImg from "../placeholder150.png";
import { Carousel } from "react-bootstrap";
import { useState, useEffect } from "react";
//https://via.placeholder.com/150

export default function Home() {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  let smBreakpoint = 576;
  let isMobile = width <= smBreakpoint;
  let scrollContainerStyle = isMobile
    ? {
        height: "90svh",
        overflowY: "auto",
        scrollSnapType: "y mandatory",
      }
    : { width: "100%"};
  let genres = [
    "Action",
    "Comedy",
    "Thriller",
    "War",
    "Romance",
    "Drama",
    "Crime",
    "Documentary",
    "Horror",
  ];
  return (
    <div style={scrollContainerStyle}>
      {genres.map((genre) => (
        <GenreSection key={genre} genreTitle={genre} isMobile={isMobile} />
      ))}
    </div>
  );
}

let GenreSection = ({ ...props }) => {
  let titles = [
    {
      title: "Title 1",
      img: placeholderImg,
      description: "Description 1",
    },
    {
      title: "Title 2",
      img: placeholderImg,
      description: "Description 2",
    },
    {
      title: "Title 3",
      img: placeholderImg,
      description: "Description 3",
    },
    {
      title: "Title 4",
      img: placeholderImg,
      description: "Description 4",
    },
    {
      title: "Title 5",
      img: placeholderImg,
      description: "Description 5",
    },
    {
      title: "Title 7",
      img: placeholderImg,
      description: "Description 7",
    },
  ];
  props.genreTitle = props.genreTitle || "Genre";
  props.isMobile = props.isMobile || false;

  return (
    <>
      {props.isMobile ? (
        <TitleCarousel genreTitle={props.genreTitle} />
      ) : (
        <TitleSidewaysScroll genreTitle={props.genreTitle} />
      )}
    </>
  );
};

let TitleCarousel = ({ ...props }) => {
  let scrollSectionStyle = {
    height: "90svh",
    scrollSnapAlign: "center",
  };
  return (
    <section style={scrollSectionStyle}>
      <div>
        <h3>
          {props.genreTitle} {">"} (should be link to this genres page)
        </h3>
      </div>
      <Carousel>
        <Carousel.Item>
          <TitleCard />
        </Carousel.Item>
        <Carousel.Item>
          <TitleCard />
        </Carousel.Item>
        <Carousel.Item>
          <TitleCard />
        </Carousel.Item>
      </Carousel>
    </section>
  );
};

let TitleSidewaysScroll = ({...props}) => {
    let scrollableElementContainerStyle = {
        width: "100%",
        height: "auto",
        overflowX: "auto",
        overflowY: "hidden",
        whiteSpace: "nowrap",
        WebkitOverflowScrolling: "touch",
        MsOverflowStyle: "none",
        scrollbarWidth: "none",
        };
        let scrollableElementStyle = {
        display: "inline-block",
        width: "25svw",
        padding: "10px 10px"
        };
  return (
    <>
    <style type="text/css">
    {`
    .scrollable-element-container::-webkit-scrollbar {
        display: none;
        }
        `}
    </style>
    <div style={{margin: "5svh 10svw"}}>
      <h2 className="font-weight-light">
      {props.genreTitle} {">"} (should be link to this genres page)
      </h2>
      <div className="scrollable-element-container"
        style={scrollableElementContainerStyle}
      >
        <div style={scrollableElementStyle}>
        <TitleCard />
        </div>        
        <div style={scrollableElementStyle}>
        <TitleCard />
        </div>        
        <div style={scrollableElementStyle}>
        <TitleCard />
        </div>        
        <div style={scrollableElementStyle}>
        <TitleCard />
        </div>        
        <div style={scrollableElementStyle}>
        <TitleCard />
        </div>        
        <div style={scrollableElementStyle}>
        <TitleCard />
        </div>        
        <div style={scrollableElementStyle}>
        <TitleCard />
        </div>        
      </div>
    </div>
    </>
  );
};

let TitleCard = () => {
  return (
    <Card>
      <Card.Img variant="top" src={placeholderImg} />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>Texty-text</Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
};
