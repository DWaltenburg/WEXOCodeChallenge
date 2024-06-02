import Card from "react-bootstrap/Card";
import placeholderImg from "../placeholder150.png";
//https://via.placeholder.com/150
import { Carousel } from "react-bootstrap";
import { useState, useEffect } from "react";
import $ from "jquery";

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
    : { width: "100%" };
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
  const [titles, setTitles] = useState([]);
  useEffect(() => {
    let fetchedTitles = [];
    var settings = {
      url: `https://feed.entertainment.tv.theplatform.eu/f/jGxigC/bb-all-pas?form=json&byTags=genre:${props.genreTitle}&range=1-20`,
      method: "GET",
      timeout: 0,
      success: function (response) {
        // console.log(JSON.parse(response));
        fetchedTitles = JSON.parse(response);
      },
      error: function (error) {
        console.error(error);
      },
    };
    $.ajax(settings).then(() => {
      setTitles(fetchedTitles.entries);
      console.log(props.genreTitle);
      mapAssetTypeDistribution(fetchedTitles);
    });
  }, []);
  props.genreTitle = props.genreTitle || "Genre";
  props.isMobile = props.isMobile || false;

  return (
    <>
      {props.isMobile ? (
        <TitleCarousel genreTitle={props.genreTitle} titles={titles} />
      ) : (
        <TitleSidewaysScroll genreTitle={props.genreTitle} />
      )}
    </>
  );
};

let TitleCarousel = ({ ...props }) => {
  let totalTitles = props.titles.length || 0;
  let scrollSectionStyle = {
    height: "90svh",
    scrollSnapAlign: "center",
  };
  return (
    <section style={scrollSectionStyle}>
      <div>
        <h3>
          {props.genreTitle} {" (" + totalTitles + ") "} {">"} (should be link
          to this genres page)
        </h3>
      </div>
      <Carousel>
        {props.titles.map((title) => (
          <Carousel.Item key={title.id}>
            <TitleCard title={title.title} imgSrc={findImageUrl(title)} />
          </Carousel.Item>
        ))}
      </Carousel>
    </section>
  );
};

let TitleSidewaysScroll = ({ ...props }) => {
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
    padding: "10px 10px",
  };
  let totalTitles = 7;

  return (
    <>
      <style type="text/css">
        {`
    .scrollable-element-container::-webkit-scrollbar {
        display: none;
        }
        `}
      </style>
      <div style={{ margin: "5svh 10svw" }}>
        <h2 className="font-weight-light">
          {props.genreTitle} {" (" + totalTitles + ") "} {">"} (should be link
          to this genres page)
        </h2>
        <div
          className="scrollable-element-container"
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

let TitleCard = ({ ...props }) => {
  props.title = props.title || "Title";
  props.imgSrc = props.imgSrc || placeholderImg;
  return (
    <Card>
      <Card.Img variant="top" src={props.imgSrc} />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
      </Card.Body>
    </Card>
  );
};

function mapAssetTypeDistribution(titles) {
  let imageTypes = [];
  $.each(titles.entries, function (index, value) {
    $.each(value.plprogram$thumbnails, function (key, val) {
      $.each(val.plprogram$assetTypes, function (key, type) {
        if (type in imageTypes) imageTypes[type] += 1;
        else imageTypes[type] = 1;
      });
    });
  });
  console.log(imageTypes);
}

/**
 * Gets a valid image url from the API response with a fallback to a placeholder image. 
 * Does not allow urls that begin with "x" as they are not valid. "x" being urls of inactive image servers provided in the challenge description.
 * @param {*} title entry from the API response
 * @returns  url as string
 */
function findImageUrl(title) {
  let posterImageUrl = "";

  $.each(title.plprogram$thumbnails, function (key, val) {
    if ( !val.plprogram$url.startsWith("https://prod.cdn.bbaws.net") 
      &&!val.plprogram$url.startsWith("http://data.entertainment.tv.theplatform.eu")) {
      posterImageUrl = val.plprogram$url;
    } 
    else {
      posterImageUrl = placeholderImg;
    }
  });
  return posterImageUrl;
}

