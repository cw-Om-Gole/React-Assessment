export function capitalizeFirstLetter(word) {
    if (!word) return '';
    return word.charAt(0).toUpperCase() + word.slice(1);
}

export const getCarLocation = (carDetails) => {
    return carDetails.areaName + "," + " " + carDetails.cityName;
}

// export default { capitalizeFirstLetter };