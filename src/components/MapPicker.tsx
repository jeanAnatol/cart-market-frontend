import {MapContainer, TileLayer, Marker, useMapEvents} from "react-leaflet";
import {useState} from "react";

function LocationPicker({onSelect}: { onSelect: (lat: string, lon: string) => void }) {
  useMapEvents({
    click(e: { latlng: { lat: string; lng: string; }; }) {
      onSelect(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

interface MapPickerProps {
  onChange?: (lat: string, lon: string) => Promise<void>
}

export default function MapPicker({onChange}: MapPickerProps) {
  const [position, setPosition] = useState<[string, string] | null>(null);
  
  return (
    <MapContainer className="w-full h-64 h-64 w-full rounded"
                  center={[37.9838, 23.7275]} // Αθήνα
                  zoom={10}
    >
      <TileLayer
        attribution="© OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      <LocationPicker
        onSelect={(lat, lon) => {
          setPosition([lat, lon]);
          onChange(lat, lon);
        }}
      />
      
      {position && <Marker position={position}/>}
    </MapContainer>
  );
}
