import WeatherCurrent from '../components/WeatherCurrent.jsx';
import WeatherForecast from './WeatherForecast.jsx';
import WeatherMap from './WeatherMap.jsx';

export default function WeatherDisplay({ weatherData, coordinates }) {
	if (!weatherData) return <p>Keine Wetterdaten verfügbar</p>;

	return (
		<>
			<div className="weather-layout">
				<WeatherCurrent weatherData={weatherData} coordinates={coordinates} />
				<WeatherMap coordinates={coordinates} weatherData={weatherData} />
			</div>
			<WeatherForecast weatherData={weatherData} />
		</>
	);
}
