export const formatDateWithWeekday = (
	isoDateString,
	locale = 'de-DE',
	options = { weekdayOnly: false }
) => {
	const date = new Date(isoDateString);

	if (options.weekdayOnly) {
		return date.toLocaleDateString(locale, { weekday: 'short' });
	}

	return date.toLocaleDateString(locale, {
		weekday: 'long',
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
	});
};
