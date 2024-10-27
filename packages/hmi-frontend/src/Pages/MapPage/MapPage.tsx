import "@arcgis/core/assets/esri/themes/dark/main.css";
import "@arcgis/map-components/dist/components/arcgis-map";
import { ArcgisMap } from "@arcgis/map-components-react";
import MapImageLayer from "@arcgis/core/layers/MapImageLayer";

import MapView from "@arcgis/core/views/MapView";
import Map from "@arcgis/core/Map";
import { useRef, useEffect } from "react";
import Basemap from "@arcgis/core/Basemap";

// TODO: Read about layerlist in docs
export default function MapPage() {
  const mapDiv = useRef(null);

  useEffect(() => {
    // const basemap = new Basemap({
    //   baseLayers
    // })

    // Basemap.fromJSON("https://192.168.253.231:6443/arcgis/rest/services/SampleWorldCities/MapServer")
    if (mapDiv.current) {
      /**
       * Initialize application
       */
      const webmap = new Map({
        layers: [
          new MapImageLayer({
            url: "https://192.168.253.231:6443/arcgis/rest/services/SampleWorldCities/MapServer",
          }),

          new MapImageLayer({
            url: "https://192.168.253.231:6443/arcgis/rest/services/sampleSD111/MapServer"
          })
        ],
      });

      const view = new MapView({
        container: mapDiv.current, // The id or node representing the DOM element containing the view.
        map: webmap, // An instance of a Map object to display in the view.
        center: [-117.149, 32.7353],
        scale: 10000000, // Represents the map scale at the center of the view.
      });

      return () => view && view.destroy();
    }
  }, []);

  return (
    <div
      className="mapDiv"
      ref={mapDiv}
      style={{ height: "100vh", width: "100%" }}
    ></div>
  );
}
