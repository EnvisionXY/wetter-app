export const fetchWeatherData = async (latitude, longitude) => {
	const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weathercode&hourly=precipitation_probability,relativehumidity_2m&timezone=auto`;

	try {
		const response = await fetch(url);
		if (!response.ok) throw new Error('Fehler beim Abrufen der Wetterdaten');

		const data = await response.json();
		console.log('Wetterdaten erfolgreich abgerufen:', data);
		return data;
	} catch (error) {
		console.error('Fehler beim Abrufen der Wetterdaten:', error);
		return null;
	}
};
