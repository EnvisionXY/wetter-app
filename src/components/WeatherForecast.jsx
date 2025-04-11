import { formatDateWithWeekday } from '../utils/formatDateWithWeekday';
import { getWeatherIconName } from '../utils/getWeatherIconName.js';

export default function WeatherForecast({ weatherData }) {
	const { daily } = weatherData;

	return (
		<div className="weather-forecast">
			<h2>Vorhersage für die nächsten 7 Tage:</h2>
			<div
				className="grid"
				style={{
					'--grid-columns': 7,
					'--grid-min-width': '150px',
					'--grid-gap': '1rem',
				}}
			>
				{daily.time.map((dateStr, index) => (
					<div key={index} className="forecast-box">
						<p className="forecast-day">
							{formatDateWithWeekday(dateStr, 'de-DE', {
								weekdayOnly: true,
							})}
						</p>
						<img
							src={`/weather-icons/${getWeatherIconName(
								daily.weathercode[index]
							)}.svg`}
							alt="Wetter"
							className="forecast-icon"
						/>
						<p className="forecast-temp">
							<span className="temp-max">
								{daily.temperature_2m_max[index]}°C
							</span>{' '}
							<span className="temp-min">
								{daily.temperature_2m_min[index]}°C
							</span>
						</p>
					</div>
				))}
			</div>
		</div>
	);
}
