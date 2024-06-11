import { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
// import 'dotenv/config';

import {icon} from '../locationIcon/locationIcon';

mapboxgl.accessToken = process.env.REACT_APP_ACCESS_TOKEN;


const createMarker = (user) => {
  const el = document.createElement("div");
  el.className = "custom-marker";
  var nameParagraph = document.createElement("p");
  var designationParagraph = document.createElement("p");
  var cityParagraph = document.createElement("p");

  nameParagraph.className = "marker-para";
  designationParagraph.className = "marker-para";
  cityParagraph.className = "marker-para";

  // Set text content for each paragraph
  nameParagraph.textContent = user.fullName;
  designationParagraph.textContent = user.designation;
  cityParagraph.textContent = `${user.location.city}, ${user.location.country}`;

  // Append paragraphs to the div
  el.appendChild(nameParagraph);
  el.appendChild(designationParagraph);
  el.appendChild(cityParagraph);

  return el;
}


export default function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(79.75);
  const [lat, setLat] = useState(29.81);
  const [zoom, setZoom] = useState(6);

  const fetchData = async () => {
    const data = await fetch('./users.json');
    const users = await data.json();
    
    users.forEach((user, idx) => {
        const el =icon(user);
        console.log(el);
        new mapboxgl.Marker(el)
            .setLngLat([user.location.lng, user.location.lat])
            .addTo(map.current);
    })
  }



  useEffect( () => {
    if (map.current) return; 
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom
    });

    fetchData();

    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  return (
    <div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}