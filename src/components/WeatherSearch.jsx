export default function WeatherSearch({
	handleInputChange,
	handleSubmit,
	searchQuery,
}) {
	return (
		<div>
			<form id="search-form" onSubmit={handleSubmit}>
				<label htmlFor="search-field">Ort eingeben</label>
				<input
					type="text"
					id="search-field"
					value={searchQuery}
					onChange={handleInputChange}
				/>
				<input type="submit" value="Suchen" />
			</form>
		</div>
	);
}
