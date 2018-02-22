export const placesList = {
	"Ho Chi Minh": [10.8231, 106.6297],
	"Da Nang": [16.0544, 108.2022],
	"Ha Noi": [21.0278, 105.8342],
	"Hue": [16.4498, 107.5624],
	"Nha Trang": [12.2388, 109.1967],
	"Hai Phong": [20.8449, 106.6881]
};
export const getMatchedPlaces = (keyword = "") => {
	const lowercaseKeyword = keyword.toLowerCase().trim();
	return Object.keys(placesList).filter(item => {
		return item.toLowerCase().indexOf(lowercaseKeyword) > -1
	});
};

export const getLongLat = (place) => {
	return placesList[place]
};

export const navbarHeight = 80;
export const marginBottom = 40;
export const isDesktop = $(document).width() >= 992;