'use client'

import { ComposableMap, Geographies, Geography } from 'react-simple-maps'

interface WorldMapProps {
  onCountryClick: (countryName: string) => void
  selectedCountry: string | null
}

const geoUrl = '/world-simple.json'

const mapStyles = {
  default: { outline: 'none', stroke: '#FFFFFF', strokeWidth: 0.5 },
  hover: { fill: '#F53', outline: 'none', cursor: 'pointer' },
  pressed: { fill: '#FFD700', outline: 'none' },
}

export default function WorldMap({ onCountryClick, selectedCountry }: WorldMapProps) {
  const getCountryName = (geo: any): string => 
    geo.properties?.NAME || geo.properties?.name || geo.properties?.NAME_EN || 'Unknown'

  return (
    <ComposableMap>
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map((geo) => {
            const countryName = getCountryName(geo)
            const isSelected = selectedCountry === countryName
            
            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                onClick={() => onCountryClick(countryName)}
                style={{
                  default: { ...mapStyles.default, fill: isSelected ? '#FFD700' : '#D6D6DA' },
                  hover: mapStyles.hover,
                  pressed: mapStyles.pressed,
                }}
              />
            )
          })
        }
      </Geographies>
    </ComposableMap>
  )
}