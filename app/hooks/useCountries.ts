import countries from "world-countries";

const formattedCountries = countries.map((country) => ({
  value: country.cca2,
  label: country.name.common,
  flag: country.flag,
  latlng: country.latlng,
  region: country.region,
}));

/**
 * Custom hook to manage and retrieve country data.
 */
const useCountries = () => {
  /**
   * Retrieves all formatted countries.
   */
  const getAll = () => formattedCountries;

  /**
   * Retrieves a country object by its value.
   *
   * @param {string} value - The value of the country to retrieve.
   */
  const getByValue = (value: string) => {
    return formattedCountries.find((country) => country.value === value);
  };

  return {
    getAll,
    getByValue,
  };
};

export default useCountries;
