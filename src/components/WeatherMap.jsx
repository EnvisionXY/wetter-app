import { useEffect } from 'react';
import '../utils/fixLeafletIcons.js';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix für fehlende Icons bei Vite
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
	iconUrl: markerIcon,
	shadowUrl: markerShadow,
});

// Helper-Komponente für das Update der Karte
function MapUpdater({ coordinates }) {
	const map = useMap();

	useEffect(() => {
		if (coordinates) {
			const { lat, lon } = coordinates;
			console.log('Karte wird zentriert auf:', lat, lon);
			map.setView([lat, lon], 13); // 📌 Hier wird die Karte tatsächlich bewegt
		}
	}, [coordinates, map]);

	return null;
}

export default function WeatherMap({ coordinates, weatherData }) {
	const defaultPosition = [52.52, 13.405]; // Berlin, falls keine Koordinaten gesetzt sind
	const temperature = weatherData?.current_weather?.temperature;
	return (
		<MapContainer
			center={defaultPosition}
			zoom={13}
			style={{ height: '500px', width: '100%' }}
		>
			<TileLayer
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			/>
			{coordinates && (
				<>
					<Marker position={[coordinates.lat, coordinates.lon]}>
						<Popup>
							📍 {coordinates.name} <br />
							🌡️ {temperature !== undefined ? `${temperature}°C` : 'Lädt...'}
						</Popup>
					</Marker>
					<MapUpdater coordinates={coordinates} />{' '}
					{/* Hilfskomponente wird hier eingebunden */}
				</>
			)}
		</MapContainer>
	);
}
