import { useEffect, useState } from 'react';
import Clock from 'react-clock';
import 'react-clock/dist/Clock.css';

import { formatDateWithWeekday } from '../utils/formatDateWithWeekday';
import { getWeatherIconName } from '../utils/getWeatherIconName.js';
import { getLocalTimeFromCoords } from '../utils/getLocalTime.js';

export default function WeatherCurrent({ weatherData, coordinates }) {
	const { current_weather } = weatherData;
	const [timeZoneName, setTimeZoneName] = useState('');
	const [localDate, setLocalDate] = useState(new Date());

	useEffect(() => {
		let timer;

		if (coordinates?.lat && coordinates?.lon) {
			getLocalTimeFromCoords(coordinates.lat, coordinates.lon).then(
				(result) => {
					setTimeZoneName(result.timeZoneName);
					const now = new Date().toLocaleString('en-US', {
						timeZone: result.timeZoneName,
					});
					setLocalDate(new Date(now));
				}
			);

			timer = setInterval(() => {
				const now = new Date().toLocaleString('en-US', {
					timeZone: timeZoneName,
				});
				setLocalDate(new Date(now));
			}, 1000);
		}

		return () => clearInterval(timer);
	}, [coordinates, timeZoneName]);

	const todayWeather = formatDateWithWeekday(current_weather.time);

	// 🧠 Aktuellen Index in den stündlichen Daten finden
	const currentHourIndex = weatherData.hourly?.time.findIndex((time) => {
		const t = new Date(time);
		const current = new Date(current_weather.time);
		return (
			t.getHours() === current.getHours() && t.getDate() === current.getDate()
		);
	});

	const precipitation =
		weatherData.hourly?.precipitation_probability?.[currentHourIndex] ?? '-';
	const humidity =
		weatherData.hourly?.relativehumidity_2m?.[currentHourIndex] ?? '-';

	return (
		<div className="current-weather-container">
			<div className="current-weather-box">
				<p>
					Ergebnisse für <strong>{coordinates?.name || '-'}</strong>
				</p>
				<div className="current-weather-date">{todayWeather}</div>
				<div className="current-time">
					<Clock value={localDate} />
					<p>Zeitzone: {timeZoneName}</p>
				</div>
			</div>

			<div className="weather-data-box">
				<img
					src={`/weather-icons/${getWeatherIconName(
						current_weather.weathercode
					)}.svg`}
					alt="Wetter"
					className="current-weather-icon"
				/>

				<div className="weather-main-info">
					<div className="temperature">
						<span className="temp">{current_weather.temperature}°</span>
						<span className="unit active">C</span>
						<span className="divider">|</span>
					</div>
				</div>

				<div className="weather-details">
					<p>Niederschlag: {precipitation}%</p>
					<p>Luftfeuchte: {humidity}%</p>
					<p>Wind: {current_weather.windspeed} km/h</p>
				</div>
			</div>
		</div>
	);
}
