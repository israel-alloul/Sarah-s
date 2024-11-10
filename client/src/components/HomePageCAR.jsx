import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

// הגדרות למפה
const mapContainerStyle = {
  width: '100vw',
  height: '100vh',
};
const center = {
  lat: 31.0461,
  lng: 34.8516,
};

const HomePage = () => {
  const [chargingStations, setChargingStations] = useState([]);
  const [selectedStation, setSelectedStation] = useState(null);

  const fetchAddress = async (lat, lng) => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyBZqMQT-dk9PChLflXL_mkEXX6-5Ac-CQo`
    );
    const data = await response.json();
    return data.results[0]?.formatted_address || null; // מחזירים null אם לא נמצאה כתובת
  };

  const handleMapClick = async (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    const address = await fetchAddress(lat, lng);

    if (address) { // אם הכתובת קיימת
      const newStation = {
        id: chargingStations.length + 1,
        location: { lat, lng },
        address,
        details: {
          name: '',
          price: '',
          availability: '',
          connectorType: '',
          power: '',
        },
      };
      setSelectedStation(newStation);
    } else {
      alert('לא ניתן להוסיף עמדת טעינה לכתובת זו, בבקשה בחרו כתובת קיימת.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedStation((prev) => ({
      ...prev,
      details: {
        ...prev.details,
        [name]: value,
      },
    }));
  };

  const handleSaveDetails = () => {
    if (selectedStation) {
      setChargingStations((prevStations) => [...prevStations, selectedStation]);
      setSelectedStation(null); // מאפסים את העמדה הנבחרת
    }
  };

  return (
    <div>
      <LoadScript googleMapsApiKey="AIzaSyBZqMQT-dk9PChLflXL_mkEXX6-5Ac-CQo 
      ">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={10}
          onClick={handleMapClick}
        >
          {chargingStations.map((station) => (
            <Marker
              key={station.id}
              position={station.location}
              onClick={() => setSelectedStation(station)}
            />
          ))}

          {selectedStation && (
            <InfoWindow
              position={selectedStation.location}
              onCloseClick={() => setSelectedStation(null)}
            >
              <div style={{ width: '250px', padding: '10px' }}>
                <h3>פרטי עמדת טעינה</h3>
                <p><strong>כתובת:</strong> {selectedStation.address}</p>
                <input
                  type="text"
                  name="name"
                  placeholder="שם העמדה"
                  value={selectedStation.details.name}
                  onChange={handleInputChange}
                  style={{ width: '100%', margin: '5px 0' }}
                />
                <input
                  type="text"
                  name="price"
                  placeholder="מחיר לשעה"
                  value={selectedStation.details.price}
                  onChange={handleInputChange}
                  style={{ width: '100%', margin: '5px 0' }}
                />
                <input
                  type="text"
                  name="availability"
                  placeholder="זמינות"
                  value={selectedStation.details.availability}
                  onChange={handleInputChange}
                  style={{ width: '100%', margin: '5px 0' }}
                />
                <input
                  type="text"
                  name="connectorType"
                  placeholder="סוג מחבר"
                  value={selectedStation.details.connectorType}
                  onChange={handleInputChange}
                  style={{ width: '100%', margin: '5px 0' }}
                />
                <input
                  type="text"
                  name="power"
                  placeholder="הספק טעינה"
                  value={selectedStation.details.power}
                  onChange={handleInputChange}
                  style={{ width: '100%', margin: '5px 0' }}
                />
                <button onClick={handleSaveDetails} style={{ width: '100%', padding: '10px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '5px' }}>שמור פרטים</button>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default HomePage;
