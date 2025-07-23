import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  ZoomControl,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import MarkerForm from "./MarkerForm";

const MapView = () => {
  const [markers, setMarkers] = useState([]);
  const [pendingPosition, setPendingPosition] = useState(null);
  const [editingMarkerIndex, setEditingMarkerIndex] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("markers");
    if (saved) {
      try {
        setMarkers(JSON.parse(saved));
      } catch (e) {
        console.error("Error loading markers:", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("markers", JSON.stringify(markers));
  }, [markers]);

  const MapClickHandler = () => {
    useMapEvents({
      dblclick(e) {
        setPendingPosition(e.latlng);
        setEditingMarkerIndex(null);
      },
    });
    return null;
  };

  const handleAddOrUpdateMarker = ({
    title,
    description,
    category,
    date,
    image,
  }) => {
    const icon = L.divIcon({
      className: "custom-div-icon",
      html: `<div style="font-size: 24px; color: red;">📍</div>`,
      iconSize: [24, 24],
      iconAnchor: [12, 24],
    });

    const newMarker = {
      position: [pendingPosition.lat, pendingPosition.lng],
      icon,
      data: {
        title,
        description,
        category,
        date,
        image: image || null,
      },
    };

    if (editingMarkerIndex !== null) {
      const updated = [...markers];
      updated[editingMarkerIndex] = {
        ...updated[editingMarkerIndex],
        ...newMarker,
      };
      setMarkers(updated);
    } else {
      setMarkers((prev) => [...prev, newMarker]);
    }

    setPendingPosition(null);
    setEditingMarkerIndex(null);
  };

  const handleEditMarker = (index) => {
    setPendingPosition({
      lat: markers[index].position[0],
      lng: markers[index].position[1],
    });
    setEditingMarkerIndex(index);
  };

  const handleDeleteMarker = (index) => {
    const updated = markers.filter((_, i) => i !== index);
    setMarkers(updated);
  };

  const center = [13.0827, 80.2707];

  return (
    <>
      <MapContainer
        center={center}
        zoom={13}
        doubleClickZoom={false}
        zoomControl={false}
        style={{
          height: "calc(100vh - 60px)",
          width: "100vw",
          marginTop: "60px",
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapClickHandler />

        <ZoomControl position="bottomleft" />

        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={marker.position}
            icon={marker.icon}
          >
            <Popup minWidth={250}>
              <h3>{marker.data.title}</h3>
              {marker.data.description && (
                <p><strong>Description:</strong> {marker.data.description}</p>
              )}
              {marker.data.category && (
                <p><strong>Category:</strong> {marker.data.category}</p>
              )}
              {marker.data.date && (
                <p><strong>Date:</strong> {marker.data.date}</p>
              )}
              {marker.data.image && (
                <img
                  src={marker.data.image}
                  alt="story"
                  style={{
                    width: "100%",
                    borderRadius: "5px",
                    marginTop: "10px",
                  }}
                />
              )}
              <div style={{ marginTop: "10px", display: "flex", justifyContent: "space-between" }}>
                <button
                  onClick={() => handleEditMarker(index)}
                  style={{
                    background: "#007bff",
                    color: "#fff",
                    border: "none",
                    padding: "5px 10px",
                    cursor: "pointer",
                    borderRadius: "3px",
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteMarker(index)}
                  style={{
                    background: "#dc3545",
                    color: "#fff",
                    border: "none",
                    padding: "5px 10px",
                    cursor: "pointer",
                    borderRadius: "3px",
                  }}
                >
                  Delete
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {pendingPosition && (
        <MarkerForm
          onSubmit={handleAddOrUpdateMarker}
          onCancel={() => {
            setPendingPosition(null);
            setEditingMarkerIndex(null);
          }}
          initialData={
            editingMarkerIndex !== null
              ? markers[editingMarkerIndex].data
              : null
          }
        />
      )}
    </>
  );
};

export default MapView;