import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import 'leaflet-control-geocoder';
import { useMap } from 'react-leaflet';

export default function LeafletControlGeocoder({
	searchQuery,
	setCoordinates,
}) {
	// setCoordinates hinzufügen
	const map = useMap();

	useEffect(() => {
		if (!searchQuery) return;

		console.log('Geocoding wird gestartet für:', searchQuery);

		const geocoder = L.Control.Geocoder.nominatim();

		geocoder.geocode(searchQuery, (results) => {
			console.log('Geocoder Ergebnisse:', results);

			if (results && results.length > 0) {
				const { center, name, bbox } = results[0];
				console.log('Gefundene Koordinaten:', center);

				L.marker(center).addTo(map).bindPopup(`${name} gefunden!`).openPopup();
				map.fitBounds(bbox);

				// Koordinaten an App.jsx zurückgeben
				setCoordinates({ lat: center.lat, lon: center.lng });
			} else {
				console.error('Kein Ort gefunden.');
			}
		});
	}, [map, searchQuery, setCoordinates]); // setCoordinates als Dependency hinzufügen

	return null;
}
