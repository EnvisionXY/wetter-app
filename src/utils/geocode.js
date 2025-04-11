export const geocodeLocation = async (locationName) => {
	const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
		locationName
	)}&format=json&addressdetails=1&limit=1`;

	try {
		const response = await fetch(url);
		if (!response.ok) throw new Error('Geocoding Fehler');

		const results = await response.json();
		if (results.length === 0) return null;

		const { lat, lon, display_name } = results[0];
		console.log('Erfolgreich Geocodiert:', { lat, lon, name: display_name }); // Debugging
		return { lat: parseFloat(lat), lon: parseFloat(lon), name: display_name };
	} catch (error) {
		console.error(error);
		return null;
	}
};
