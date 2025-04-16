// import React, { useEffect } from 'react';

// const MapComponent = () => {
//   useEffect(() => {
//     window.initMap = initMap; // Attach to global scope
//     loadGoogleMapsScript();
//   }, []);

//   const loadGoogleMapsScript = () => {
//     const script = document.createElement('script');
//     script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&callback=initMap`;
//     script.async = true;
//     script.defer = true;
//     document.head.appendChild(script);
//   };

//   const initMap = () => {
//     new window.google.maps.Map(document.getElementById('map'), {
//       center: { lat: -34.397, lng: 150.644 },
//       zoom: 8,
//     });
//   };

//   return <div id="map" style={{ height: '400px', width: '100%' }} />;
// };

// export default MapComponent;


// import React, { useEffect, useRef } from "react";

// const MapComponent = () => {
//   const mapRef = useRef(null);

//   useEffect(() => {
//     // Check if the Google Maps script is already loaded
//     if (!window.google) {
//       loadGoogleMapsScript(() => initMap());
//     } else {
//       initMap();
//     }
//   }, []);

//   const loadGoogleMapsScript = (callback) => {
//     const existingScript = document.querySelector(
//       `script[src*="maps.googleapis.com"]`
//     );
    
//     if (!existingScript) {
//       const script = document.createElement("script");
//       script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&callback=initMap`;
//       script.async = true;
//       script.defer = true;
//       script.onload = callback;  // Call the callback after loading
//       document.head.appendChild(script);
//     } else {
//       callback();
//     }
//   };

//   const initMap = () => {
//     if (mapRef.current) {
//       const map = new window.google.maps.Map(mapRef.current, {
//         center: { lat: 13.0827, lng: 80.2707 }, // Default Chennai location
//         zoom: 12,
//       });

//       // Marker for the farmer's location
//       new window.google.maps.Marker({
//         position: { lat: 13.0827, lng: 80.2707 },
//         map: map,
//         title: "Farmer Location",
//       });
//     }
//   };

//   return <div ref={mapRef} style={{ height: "400px", width: "100%" }} />;
// };

// export default MapComponent;




// src/components/MapComponent.jsx
import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 13.0827, // default (Chennai)
  lng: 80.2707,
};

const MapComponent = ({ lat = center.lat, lng = center.lng }) => {
  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{ lat, lng }}
        zoom={15}
      >
        <Marker position={{ lat, lng }} />
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
