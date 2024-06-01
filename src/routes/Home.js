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
        height: "100svh",
        overflowY: "scroll",
        scrollSnapType: "y mandatory",
      }
    : {};
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
    <Container style={scrollContainerStyle}>
      {genres.map((genre) => (
        <GenreSection key={genre} genreTitle={genre} isMobile={isMobile} />
      ))}
    </Container>
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
        <TitleSidewaysScroll />
      )}
    </>
  );
};

let TitleCarousel = ({ ...props }) => {
  let scrollSectionStyle = {
    height: "100svh",
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

let TitleSidewaysScroll = () => {
    let scrollableElementContainerStyle = {
        width: "100%",
        height: "50svh",
        overflowX: "auto",
        overflowY: "hidden",
        whiteSpace: "nowrap",
        WebkitOverflowScrolling: "touch",
        };
        let scrollableElementStyle = {
        display: "inline-block",
        width: "25svw",
        };
  return (
    <Container>
      <h2 className="font-weight-light">
        Horizontal Scrolling Cards with React Bootstrap
      </h2>
      <Container
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
      </Container>
    </Container>
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
