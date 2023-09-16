import React from "react";
import { useEffect } from "react";
import PropTypes from "prop-types";
import { useMap } from "react-leaflet";
import L from "leaflet";
import shp from "shpjs";

const ShapeFileMap = ({ zip }) => {
  console.log("9" + zip);
  const map = useMap();

  useEffect(() => {
    const fr = new FileReader();
    fr.onload = async (event) => {
      try {
        if (!zip || !map) return;
        const zipUrl = await shp.parseZip(zip?.zip);

        const geo = L.geoJson(
          { features: [] },
          {
            onEachFeature: function popUp(f, l) {
              var out = [];
              if (f.properties) {
                for (var key in f.properties) {
                  out.push(key + ": " + f.properties[key]);
                }
                l.bindPopup(out.join("<br />"));
              }
            },
          }
        ).addTo(map);

        shp(zipUrl).then(function (data) {
          geo.addData(data);
        });
      } catch (error) {
        console.error(error + "error converting shp file to geojson");
      }
    };
    fr.readAsArrayBuffer(zip);
  }, [map, zip]);

  return null;
};
// ShapeFileMap.propTypes = {
//   zipUrl: PropTypes.string.isRequired,
// };

export default ShapeFileMap;
