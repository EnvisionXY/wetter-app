import { useState, useEffect } from 'react';
import { fetchWeatherData } from '../utils/api.js';
import { geocodeLocation } from '../utils/geocode.js';
import { getUserLocation } from '../utils/userGeolocation.js';
import { useDebouncedValue } from '../hooks/useDebouncedValue.js';

import WeatherSearch from './WeatherSearch.jsx';
import WeatherDisplay from './WeatherDisplay.jsx';

export default function App() {
	const [searchQuery, setSearchQuery] = useState('');
	const [weatherData, setWeatherData] = useState(null);
	const [coordinates, setCoordinates] = useState(null);

	const debouncedSearchQuery = useDebouncedValue(searchQuery, 500);

	useEffect(() => {
		if (!debouncedSearchQuery.trim()) return;

		async () => {
			try {
				const location = await geocodeLocation(debouncedSearchQuery);
				setCoordinates(location);
			} catch (error) {
				console.error('Fehler beim Geocoding:', error);
			}
		};
	}, [debouncedSearchQuery]);

	const handleInputChange = (event) => {
		setSearchQuery(event.target.value);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		console.log('Submit ausgeführt');

		const location = await geocodeLocation(searchQuery);
		if (location) {
			console.log('Koordinaten gefunden:', location);
			setCoordinates(location);
		} else {
			console.error('Kein Ort gefunden');
		}
	};

	const fetchWeather = async () => {
		if (!coordinates) return;

		try {
			const data = await fetchWeatherData(coordinates.lat, coordinates.lon);
			setWeatherData(data);
			console.log('Wetterdaten empfangen:', data);
		} catch (error) {
			console.error('Fehler beim Abrufen der Wetterdaten:', error);
		}
	};

	// User Geolocation
	useEffect(() => {
		const loadUserLocation = async () => {
			try {
				const userCoordinates = await getUserLocation();
				console.log('User Koordinaten:', userCoordinates);
				setCoordinates(userCoordinates);
			} catch (error) {
				console.log(error.message);
			}
		};
		loadUserLocation();
	}, []);

	useEffect(() => {
		if (coordinates) fetchWeather();
	}, [coordinates]);

	return (
		<div>
			<WeatherSearch
				handleInputChange={handleInputChange}
				handleSubmit={handleSubmit}
				searchQuery={searchQuery}
			/>

			<WeatherDisplay weatherData={weatherData} coordinates={coordinates} />
		</div>
	);
}
