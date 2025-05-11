
// import React, { useState, useCallback, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { GoogleMap, LoadScript, Marker, StandaloneSearchBox } from "@react-google-maps/api";

// const containerStyle = {
//   width: "100%",
//   height: "300px",
// };

// const libraries = ["places"];

// const FarmerRegister = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     location: "",
//     address: "",
//   });

//   const [mapCenter, setMapCenter] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const searchBoxRef = useRef(null);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const getLocation = () => {
//     if (navigator.geolocation) {
//       setLoading(true);
//       navigator.geolocation.getCurrentPosition(
//         async (position) => {
//           const latitude = position.coords.latitude;
//           const longitude = position.coords.longitude;
//           const locationString = `${latitude}, ${longitude}`;

//           setMapCenter({ lat: latitude, lng: longitude });
//           setFormData((prevData) => ({
//             ...prevData,
//             location: locationString,
//           }));

//           try {
//             const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
//             const response = await fetch(
//               `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
//             );
//             const data = await response.json();
//             const formattedAddress = data.results[0]?.formatted_address || "";
//             setFormData((prevData) => ({
//               ...prevData,
//               address: formattedAddress,
//             }));
//           } catch (err) {
//             console.error("Failed to fetch address:", err);
//           }

//           setLoading(false);
//         },
//         (error) => {
//           console.error("Error getting location:", error);
//           alert("Please allow location access.");
//           setLoading(false);
//         }
//       );
//     } else {
//       alert("Geolocation not supported in this browser.");
//     }
//   };

//   const handleMarkerDragEnd = useCallback(async (e) => {
//     const lat = e.latLng.lat();
//     const lng = e.latLng.lng();
//     const locationString = `${lat}, ${lng}`;
//     setFormData((prevData) => ({
//       ...prevData,
//       location: locationString,
//     }));
//     setMapCenter({ lat, lng });

//     try {
//       const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
//       const response = await fetch(
//         `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
//       );
//       const data = await response.json();
//       const formattedAddress = data.results[0]?.formatted_address || "";
//       setFormData((prevData) => ({
//         ...prevData,
//         address: formattedAddress,
//       }));
//     } catch (err) {
//       console.error("Failed to fetch address:", err);
//     }
//   }, []);

//   const onPlacesChanged = () => {
//     const places = searchBoxRef.current.getPlaces();
//     if (places.length === 0) return;

//     const place = places[0];
//     const lat = place.geometry.location.lat();
//     const lng = place.geometry.location.lng();
//     const locationString = `${lat}, ${lng}`;

//     setMapCenter({ lat, lng });
//     setFormData((prevData) => ({
//       ...prevData,
//       location: locationString,
//       address: place.formatted_address || place.name,
//     }));
//   };

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/farmers/register`, formData);
//       alert(response.data.message || "Registration successful!");
//       navigate("/farmer-login");
//     } catch (error) {
//       console.error("Registration failed:", error);
//       alert("Registration failed!");
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h2>Farmer Registration</h2>
//       <form onSubmit={handleRegister}>
//         <div className="mb-3">
//           <label>Name</label>
//           <input type="text" name="name" className="form-control" onChange={handleChange} required />
//         </div>

//         <div className="mb-3">
//           <label>Email</label>
//           <input type="email" name="email" className="form-control" onChange={handleChange} required />
//         </div>

//         <div className="mb-3">
//           <label>Password</label>
//           <input type="password" name="password" className="form-control" onChange={handleChange} required />
//         </div>

//         <div className="mb-3">
//           <label>Location (Latitude, Longitude)</label>
//           <input type="text" name="location" value={formData.location} className="form-control" readOnly />
//           <button type="button" className="btn btn-secondary mt-2" onClick={getLocation} disabled={loading}>
//             📍 Detect My Current Location
//           </button>
//         </div>

//         <div className="mb-3">
//           <label>Address</label>
//           <input
//             type="text"
//             name="address"
//             value={formData.address}
//             onChange={handleChange}
//             className="form-control"
//             required
//           />
//         </div>

//         <div className="mb-3">
//           <label>Search Your Location</label>
//           <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY} libraries={libraries}>
//             <StandaloneSearchBox onLoad={(ref) => (searchBoxRef.current = ref)} onPlacesChanged={onPlacesChanged}>
//               <input
//                 type="text"
//                 placeholder="Search places..."
//                 className="form-control"
//                 style={{ marginBottom: "10px" }}
//               />
//             </StandaloneSearchBox>

//             {mapCenter && (
//               <GoogleMap
//                 mapContainerStyle={containerStyle}
//                 center={mapCenter}
//                 zoom={15}
//               >
//                 <Marker
//                   position={mapCenter}
//                   draggable={true}
//                   onDragEnd={handleMarkerDragEnd}
//                 />
//               </GoogleMap>
//             )}
//           </LoadScript>
//         </div>

//         <button type="submit" className="btn btn-primary">Register</button>
//       </form>
//     </div>
//   );
// };

// export default FarmerRegister;


// import React, { useState, useCallback, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { GoogleMap, LoadScript, Marker, StandaloneSearchBox } from "@react-google-maps/api";

// const containerStyle = { width: "100%", height: "300px" };
// const libraries = ["places"];

// const FarmerRegister = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     mobile: "",
//     location: "",
//     address: "",
//   });

//   const [idCard, setIdCard] = useState(null);
//   const [mapCenter, setMapCenter] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const searchBoxRef = useRef(null);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleFileChange = (e) => {
//     setIdCard(e.target.files[0]);
//   };

//   const getLocation = () => {
//     if (navigator.geolocation) {
//       setLoading(true);
//       navigator.geolocation.getCurrentPosition(
//         async (position) => {
//           const lat = position.coords.latitude;
//           const lng = position.coords.longitude;
//           const locationString = `${lat}, ${lng}`;
//           setMapCenter({ lat, lng });
//           setFormData((prev) => ({ ...prev, location: locationString }));

//           try {
//             const key = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
//             const response = await fetch(
//               `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${key}`
//             );
//             const data = await response.json();
//             const formatted = data.results[0]?.formatted_address || "";
//             setFormData((prev) => ({ ...prev, address: formatted }));
//           } catch (err) {
//             console.error("Address fetch failed", err);
//           }

//           setLoading(false);
//         },
//         (err) => {
//           alert("Enable location access.");
//           setLoading(false);
//         }
//       );
//     }
//   };

//   const handleMarkerDragEnd = useCallback(async (e) => {
//     const lat = e.latLng.lat();
//     const lng = e.latLng.lng();
//     const locationString = `${lat}, ${lng}`;
//     setFormData((prev) => ({ ...prev, location: locationString }));
//     setMapCenter({ lat, lng });

//     try {
//       const key = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
//       const response = await fetch(
//         `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${key}`
//       );
//       const data = await response.json();
//       const formatted = data.results[0]?.formatted_address || "";
//       setFormData((prev) => ({ ...prev, address: formatted }));
//     } catch (err) {
//       console.error("Address update failed", err);
//     }
//   }, []);

//   const onPlacesChanged = () => {
//     const places = searchBoxRef.current.getPlaces();
//     if (places.length === 0) return;

//     const place = places[0];
//     const lat = place.geometry.location.lat();
//     const lng = place.geometry.location.lng();
//     const locationString = `${lat}, ${lng}`;

//     setMapCenter({ lat, lng });
//     setFormData((prev) => ({
//       ...prev,
//       location: locationString,
//       address: place.formatted_address || place.name,
//     }));
//   };

//   const handleRegister = async (e) => {
//     e.preventDefault();

//     const data = new FormData();
//     Object.keys(formData).forEach((key) => data.append(key, formData[key]));
//     if (idCard) data.append("idCard", idCard);

//     try {
//       const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/farmers/register`, data);
//       alert("Registration successful!");
//       navigate("/farmer-login");
//     } catch (err) {
//       console.error("Registration error:", err);
//       alert("Registration failed");
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h2>Farmer Registration</h2>
//       <form onSubmit={handleRegister} encType="multipart/form-data">
//         <div className="mb-3">
//           <label>Name</label>
//           <input type="text" name="name" className="form-control" onChange={handleChange} required />
//         </div>

//         <div className="mb-3">
//           <label>Email</label>
//           <input type="email" name="email" className="form-control" onChange={handleChange} required />
//         </div>

//         <div className="mb-3">
//           <label>Mobile Number</label>
//           <input type="tel" name="mobile" className="form-control" onChange={handleChange} required />
//         </div>

//         <div className="mb-3">
//           <label>Password</label>
//           <input type="password" name="password" className="form-control" onChange={handleChange} required />
//         </div>

//         <div className="mb-3">
//           <label>Location (Lat, Long)</label>
//           <input type="text" name="location" value={formData.location} className="form-control" readOnly />
//           <button type="button" className="btn btn-secondary mt-2" onClick={getLocation} disabled={loading}>
//             📍 Detect My Current Location
//           </button>
//         </div>

//         <div className="mb-3">
//           <label>Address</label>
//           <input
//             type="text"
//             name="address"
//             value={formData.address}
//             onChange={handleChange}
//             className="form-control"
//             required
//           />
//         </div>

//         <div className="mb-3">
//           <label>Upload Farmer ID Card</label>
//           <input type="file" name="idCard" className="form-control" accept="image/*" onChange={handleFileChange} required />
//         </div>

//         <div className="mb-3">
//           <label>Search Location</label>
//           <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY} libraries={libraries}>
//             <StandaloneSearchBox onLoad={(ref) => (searchBoxRef.current = ref)} onPlacesChanged={onPlacesChanged}>
//               <input type="text" placeholder="Search..." className="form-control mb-2" />
//             </StandaloneSearchBox>
//             {mapCenter && (
//               <GoogleMap mapContainerStyle={containerStyle} center={mapCenter} zoom={15}>
//                 <Marker position={mapCenter} draggable onDragEnd={handleMarkerDragEnd} />
//               </GoogleMap>
//             )}
//           </LoadScript>
//         </div>

//         <button type="submit" className="btn btn-primary">Register</button>
//       </form>
//     </div>
//   );
// };

// export default FarmerRegister;


import React, { useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleMap, LoadScript, Marker, StandaloneSearchBox } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "300px",
};

const libraries = ["places"];

const FarmerRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    location: "",
    address: "",
  });

  const [idCardImage, setIdCardImage] = useState(null);
  const [mapCenter, setMapCenter] = useState(null);
  const [loading, setLoading] = useState(false);
  const searchBoxRef = useRef(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setIdCardImage(e.target.files[0]);
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          const locationString = `${latitude}, ${longitude}`;

          setMapCenter({ lat: latitude, lng: longitude });
          setFormData((prevData) => ({
            ...prevData,
            location: locationString,
          }));

          try {
            const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
            const response = await fetch(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
            );
            const data = await response.json();
            const formattedAddress = data.results[0]?.formatted_address || "";
            setFormData((prevData) => ({
              ...prevData,
              address: formattedAddress,
            }));
          } catch (err) {
            console.error("Failed to fetch address:", err);
          }

          setLoading(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Please allow location access.");
          setLoading(false);
        }
      );
    } else {
      alert("Geolocation not supported in this browser.");
    }
  };

  const handleMarkerDragEnd = useCallback(async (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    const locationString = `${lat}, ${lng}`;
    setMapCenter({ lat, lng });
    setFormData((prevData) => ({
      ...prevData,
      location: locationString,
    }));

    try {
      const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
      );
      const data = await response.json();
      const formattedAddress = data.results[0]?.formatted_address || "";
      setFormData((prevData) => ({
        ...prevData,
        address: formattedAddress,
      }));
    } catch (err) {
      console.error("Failed to fetch address:", err);
    }
  }, []);

  const onPlacesChanged = () => {
    const places = searchBoxRef.current.getPlaces();
    if (places.length === 0) return;

    const place = places[0];
    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();
    const locationString = `${lat}, ${lng}`;

    setMapCenter({ lat, lng });
    setFormData((prevData) => ({
      ...prevData,
      location: locationString,
      address: place.formatted_address || place.name,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!idCardImage) {
      alert("Please upload your farmer ID card.");
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
    data.append("idCardImage", idCardImage);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/farmers/register`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Registration successful!");
      navigate("/farmer-login");
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed!");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Farmer Registration</h2>
      <form onSubmit={handleRegister}>
        <div className="mb-3">
          <label>Name</label>
          <input type="text" name="name" className="form-control" onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label>Email</label>
          <input type="email" name="email" className="form-control" onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input type="password" name="password" className="form-control" onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label>Mobile Number</label>
          <input type="text" name="mobile" className="form-control" onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label>Upload Farmer ID Card</label>
          <input type="file" name="idCardImage" className="form-control" accept="image/*" onChange={handleFileChange} required />
        </div>

        <div className="mb-3">
          <label>Location (Latitude, Longitude)</label>
          <input type="text" name="location" value={formData.location} className="form-control" readOnly />
          <button type="button" className="btn btn-secondary mt-2" onClick={getLocation} disabled={loading}>
            📍 Detect My Current Location
          </button>
        </div>

        <div className="mb-3">
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label>Search Your Location</label>
          <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY} libraries={libraries}>
            <StandaloneSearchBox onLoad={(ref) => (searchBoxRef.current = ref)} onPlacesChanged={onPlacesChanged}>
              <input
                type="text"
                placeholder="Search places..."
                className="form-control"
                style={{ marginBottom: "10px" }}
              />
            </StandaloneSearchBox>

            {mapCenter && (
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={mapCenter}
                zoom={15}
              >
                <Marker
                  position={mapCenter}
                  draggable={true}
                  onDragEnd={handleMarkerDragEnd}
                />
              </GoogleMap>
            )}
          </LoadScript>
        </div>

        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </div>
  );
};

export default FarmerRegister;
