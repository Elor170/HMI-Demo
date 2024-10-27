import "@arcgis/core/assets/esri/themes/dark/main.css";
import "@arcgis/map-components/dist/components/arcgis-map";
import MapImageLayer from "@arcgis/core/layers/MapImageLayer";
import styles from "./MapPage.module.scss";

import MapView from "@arcgis/core/views/MapView";
import Map from "@arcgis/core/Map";
import { useRef, useEffect, useState } from "react";
import { FormControlLabel, FormGroup, Checkbox, Card } from "@mui/material";
import { MAP_SERVER } from "@/Helper/consts";

// TODO: Read about layerlist in docs
export default function MapPage() {
  const mapDiv = useRef(null);

  const [showCitiesLayer, setSowCitiesLayer] = useState(true);
  const [showSampleLayer, setShowSampleLayer] = useState(true);

  const citiesMap = new MapImageLayer({
    url: `${MAP_SERVER}/arcgis/rest/services/SampleWorldCities/MapServer`,
    visible: showCitiesLayer,
  });

  const sampleMap = new MapImageLayer({
    url: `${MAP_SERVER}/arcgis/rest/services/sampleSD111/MapServer`,
    visible: showSampleLayer,
  });

  const webmap = new Map({
    layers: [citiesMap, sampleMap],
  });

  useEffect(() => {
    if (mapDiv.current) {
      const view = new MapView({
        spatialReference: {
          wkid: 102100,
        },
        container: mapDiv.current, // The id or node representing the DOM element containing the view.
        map: webmap, // An instance of a Map object to display in the view.
        center: [31, 42],
        scale: 100000000, // Represents the map scale at the center of the view.
      });

      return () => view && view.destroy();
    }
  }, [showCitiesLayer, showSampleLayer]);

  return (
    <>
      <div
        className="mapDiv"
        ref={mapDiv}
        style={{ height: "100vh", width: "100%" }}
      ></div>

      <Card className={styles.checkboxLayer}>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={showCitiesLayer}
                onClick={() => setSowCitiesLayer(!showCitiesLayer)}
              />
            }
            label="Cities Layer"
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={showSampleLayer}
                onClick={() => setShowSampleLayer(!showSampleLayer)}
              />
            }
            label="Sample Layer"
          />
        </FormGroup>
      </Card>
    </>
  );
}
