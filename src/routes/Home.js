import Card from "react-bootstrap/Card";
import placeholderImg from "../placeholder150.png";
//https://via.placeholder.com/150
import { Carousel } from "react-bootstrap";
import { useState, useEffect } from "react";
import $ from "jquery";

export default function Home() {
  // State to store the width of the window
  const [width, setWidth] = useState(window.innerWidth);
  // Event listener to update the width state on window resize
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Breakpoint for mobile view
  let smBreakpoint = 576;
  let isMobile = width <= smBreakpoint;
  // Styles for the scroll container depending on the device
  let scrollContainerStyle = isMobile
    ? {
        height: "90svh",
        overflowY: "auto",
        scrollSnapType: "y mandatory",
      }
    : { width: "100%",
     };
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
/**
 * Section component to display the titles of a genre
 * @param {*} props
 * @returns Section component with title cards
 */
let GenreSection = ({ ...props }) => {
  // State to store the titles of a genre
  const [titles, setTitles] = useState([]);
  // Fetch the titles of a genre from the API
  useEffect(() => {
    let fetchedTitles = [];

    // API request settings
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

    // Fetch the titles from the API then set the titles state
    $.ajax(settings).then(() => {
      setTitles(fetchedTitles.entries);
      // mapAssetTypeDistribution(fetchedTitles);
    });
  }, []);

  // Default props
  props.genreTitle = props.genreTitle || "Genre";
  props.isMobile = props.isMobile || false;

  // Conditional rendering of the carousel component depending on the device
  return (
    <>
      {props.isMobile ? (
        <TitleCarousel genreTitle={props.genreTitle} titles={titles} />
      ) : (
        <TitleSidewaysScroll genreTitle={props.genreTitle} titles={titles} />
      )}
    </>
  );
};

/**
 * Carousel component to display the titles of a genre
 * @param {*} props
 * @returns Carousel component with title cards
 */
let TitleCarousel = ({ ...props }) => {
  let totalTitles = props.titles.length || 0;
  let scrollSectionStyle = {
    height: "90svh",
    scrollSnapAlign: "center",
    backgroundColor: "#74f0ed",
    
  };
  return (
    <section style={scrollSectionStyle}>
      <div>
        <h3 style={{color: "#ea445a"}}>
          {props.genreTitle} {" (" + totalTitles + ") "} {">"} 
          {/* {(should be link to this genres page)} */}
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
    width: "200px",
    height: "100%",
    padding: "10px 10px",
  };
  let totalTitles = props.titles.length || 0;

  return (
    <>
      <style type="text/css">
        {`
    .scrollable-element-container::-webkit-scrollbar {
        display: none;
        }
        `}
      </style>
      <div style={{ margin: "5svh 10svw 0 10svw", padding:"20px", borderRadius:"1rem", backgroundColor: "#74f0ed", }}>
        <h2 style={{color: "#ea445a"}} className="font-weight-light">
          {props.genreTitle} {" (" + totalTitles + ") "} {">"}
          {/* {(should be link to this genres page)} */}
        </h2>
        <div
          className="scrollable-element-container"
          style={scrollableElementContainerStyle}
        >
          {props.titles.map((title) => (
            <div key={title.id} style={scrollableElementStyle}>
              <TitleCard title={title.title} imgSrc={findImageUrl(title)} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

/**
 * Card component to display the title and image of a movie or show
 * @param {*} props
 * @returns Card component with title and image
 */
let TitleCard = ({ ...props }) => {
  props.title = props.title || "Title";
  props.imgSrc = props.imgSrc || placeholderImg;
  return (
    <Card style={{border:"none",backgroundColor: "#74f0ed",}}>
      <Card.Img
        style={{ aspectRatio: 76 / 109, borderRadius: "1rem", filter: "drop-shadow(5px 10px 5px #000000)" }}
        variant="top"
        src={props.imgSrc}
      />
      <Card.Body>
        <Card.Title style={{whiteSpace:"wrap", color: "#ea445a"}}>{props.title}</Card.Title>
      </Card.Body>
    </Card>
  );
};

/**
 * Temporary function to map the asset types of the images in the API response
 * Made to get the gist of the asset type distribution in the API response
 * @param {*} titles entries from the API response
 */
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
    if (
      !val.plprogram$url.startsWith("https://prod.cdn.bbaws.net") &&
      !val.plprogram$url.startsWith("http://data.entertainment.tv.theplatform.eu") &&
      !val.plprogram$url.startsWith("https://image.tmdb.org") && // another image server that might not be valid
      !val.plprogram$url.startsWith("http://voduzi.images.production.s3.amazonaws.com") // another image server that might not be valid
    ) {
      posterImageUrl = val.plprogram$url;
    } else {
      posterImageUrl = placeholderImg;
    }
  });
  return posterImageUrl;
}
