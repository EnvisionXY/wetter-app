export async function getLocalTimeFromCoords(lat, lon) {
	const url = `https://www.timeapi.io/api/Time/current/coordinate?latitude=${lat}&longitude=${lon}`;

	try {
		const response = await fetch(url);
		if (!response.ok) throw new Error('Time API Request failed');
		const data = await response.json();

		const formattedTime = `${data.hour
			.toString()
			.padStart(2, '0')}:${data.minute.toString().padStart(2, '0')}`;

		return {
			time: formattedTime,
			timeZoneName: data.timeZone ?? '',
		};
	} catch (error) {
		console.error('Fehler beim Abrufen der Uhrzeit:', error);
		return {
			time: '--:--',
			timeZoneName: '',
		};
	}
}
