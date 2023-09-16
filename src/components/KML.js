import React from "react";
import ReactLeafletKml from "react-leaflet-kml";
import Borough_Boundaries from "./../test_files/Borough_Boundaries.kml";
// const KML = () => {
//   const [kml, setKml] = React.useState(null);
//   React.useEffect(() => {

//       fetch(
//         "https://raw.githubusercontent.com/aviklai/react-leaflet-kml/master/src/assets/example1.kml"
//       )
//         .then((res) => res.text())
//         .then((kmlText) => {
//           const parser = new DOMParser();
//           const kml = parser.parseFromString(kmlText, "text/xml");
//           setKml(kml);
//         });
//     }, []);
//     console.log(kml);
//     return <ReactLeafletKml kml={kml} />;
// };

const KML = () => {
  const [kml, setKml] = React.useState(null);

  React.useEffect(() => {
    // Fetch the KML file at runtime
    fetch(Borough_Boundaries)
      .then((res) => res.text())
      .then((kmlText) => {
        const parser = new DOMParser();
        const kml = parser.parseFromString(kmlText, "text/xml");
        setKml(kml);
      })
      .catch((error) => {
        console.error("Error fetching KML file:", error);
      });
  }, []);

  console.log(kml);
  // return <ReactLeafletKml kml={kml} />;
  return <div>{!!kml && <ReactLeafletKml kml={kml} />}</div>;
};

export default KML;
