export const getUserLocation = () => {
	return new Promise((resolve, reject) => {
		if (!navigator.geolocation) {
			reject(new Error('Geolocation wird nicht unterstützt.'));
			return;
		}

		navigator.geolocation.getCurrentPosition(async (position) => {
			const { latitude, longitude } = position.coords;

			try {
				const response = await fetch(
					`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
				);
				const data = await response.json();

				const name =
					data.address?.city ||
					data.address?.town ||
					data.address?.village ||
					data.address?.municipality ||
					'Unbekannter Ort';

				resolve({
					lat: latitude,
					lon: longitude,
					name: name || 'Unbekannter Ort',
				});
			} catch (error) {
				console.error('Reverse Geocoding fehlgeschlagen:', error);
				resolve({
					lat: latitude,
					lon: longitude,
					name: 'Unbekannter Ort',
				});
			}
		}, reject);
	});
};
