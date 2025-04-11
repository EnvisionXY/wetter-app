export function getWeatherIconName(code) {
	const mapping = {
		0: 'clear-day',
		1: 'partly-cloudy-day',
		2: 'partly-cloudy-day',
		3: 'overcast-day',
		45: 'fog-day',
		48: 'fog-day',
		51: 'drizzle',
		53: 'drizzle',
		55: 'drizzle',
		61: 'rain',
		63: 'rain',
		65: 'rain',
		66: 'extreme-day-sleet',
		67: 'extreme-day-sleet',
		71: 'snow',
		73: 'snow',
		75: 'snow',
		77: 'snow',
		80: 'overcast-day-rain',
		81: 'overcast-day-rain',
		82: 'overcast-day-rain',
		85: 'overcast-day-snow',
		86: 'overcast-day-snow',
		95: 'thunderstorms-day',
		96: 'thunderstorms-day',
		99: 'thunderstorms-day',
	};

	return mapping[code] || 'not-available';
}
