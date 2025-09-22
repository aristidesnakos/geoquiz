export interface Country {
  name: string
  flag: string
  continent: string
}

export const countries: Country[] = [
  // Europe
  { name: 'France', flag: '🇫🇷', continent: 'Europe' },
  { name: 'Germany', flag: '🇩🇪', continent: 'Europe' },
  { name: 'Italy', flag: '🇮🇹', continent: 'Europe' },
  { name: 'Spain', flag: '🇪🇸', continent: 'Europe' },
  { name: 'United Kingdom', flag: '🇬🇧', continent: 'Europe' },
  { name: 'Netherlands', flag: '🇳🇱', continent: 'Europe' },
  { name: 'Poland', flag: '🇵🇱', continent: 'Europe' },
  { name: 'Sweden', flag: '🇸🇪', continent: 'Europe' },
  { name: 'Norway', flag: '🇳🇴', continent: 'Europe' },
  { name: 'Portugal', flag: '🇵🇹', continent: 'Europe' },
  
  // North America
  { name: 'United States', flag: '🇺🇸', continent: 'North America' },
  { name: 'Canada', flag: '🇨🇦', continent: 'North America' },
  { name: 'Mexico', flag: '🇲🇽', continent: 'North America' },
  
  // South America
  { name: 'Brazil', flag: '🇧🇷', continent: 'South America' },
  { name: 'Argentina', flag: '🇦🇷', continent: 'South America' },
  { name: 'Chile', flag: '🇨🇱', continent: 'South America' },
  { name: 'Peru', flag: '🇵🇪', continent: 'South America' },
  { name: 'Colombia', flag: '🇨🇴', continent: 'South America' },
  
  // Asia
  { name: 'Japan', flag: '🇯🇵', continent: 'Asia' },
  { name: 'China', flag: '🇨🇳', continent: 'Asia' },
  { name: 'India', flag: '🇮🇳', continent: 'Asia' },
  { name: 'South Korea', flag: '🇰🇷', continent: 'Asia' },
  { name: 'Thailand', flag: '🇹🇭', continent: 'Asia' },
  { name: 'Indonesia', flag: '🇮🇩', continent: 'Asia' },
  
  // Africa
  { name: 'South Africa', flag: '🇿🇦', continent: 'Africa' },
  { name: 'Egypt', flag: '🇪🇬', continent: 'Africa' },
  { name: 'Nigeria', flag: '🇳🇬', continent: 'Africa' },
  { name: 'Kenya', flag: '🇰🇪', continent: 'Africa' },
  { name: 'Morocco', flag: '🇲🇦', continent: 'Africa' },
  
  // Oceania
  { name: 'Australia', flag: '🇦🇺', continent: 'Oceania' },
  { name: 'New Zealand', flag: '🇳🇿', continent: 'Oceania' },
]

export const continents = ['All', 'Europe', 'North America', 'South America', 'Asia', 'Africa', 'Oceania'] as const

export type Continent = typeof continents[number]

export function getCountriesByContinent(continent: Continent): Country[] {
  if (continent === 'All') {
    return countries
  }
  return countries.filter(country => country.continent === continent)
}

export function getRandomCountry(continent: Continent = 'All'): Country {
  const availableCountries = getCountriesByContinent(continent)
  const randomIndex = Math.floor(Math.random() * availableCountries.length)
  return availableCountries[randomIndex]
}