import React from "react";
import shpwrite from 'shp-write';


// import Shapefile from "@wavded/js-shapefile-to-geojson";
const convert = () => {
  //   new Shapefile("MMR_adm0.shp", function (data) {
  //     console.log(data);
  //   });
  //https://cdn.rawgit.com/matplotlib/basemap/v1.1.0/lib/mpl_toolkits/basemap/data/UScounties.shp
  var shapefile = require("shapefile");
  shapefile
    .openShp("./UScounties.shp", null)
    .then((source) =>
      source.read().then(function log(result) {
        if (result.done) return;
        console.log(result.value);
        return source.read().then(log);
      })
    )
    .catch((error) => console.error(error.stack));
};
const Shp2Geojson = () => {
  return (
    <div>
      <div>Shp2Geojson</div>
      <div>{convert()}</div>
    </div>
  );
};

export default Shp2Geojson;
