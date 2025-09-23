'use client'

import { useState } from 'react'
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps'

interface WorldMapProps {
  onCountryClick: (countryName: string) => void
  selectedCountry: string | null
}

const geoUrl = '/countries.geojson'

const mapStyles = {
  default: { outline: 'none', stroke: '#FFFFFF', strokeWidth: 0.5 },
  hover: { fill: '#F53', outline: 'none', cursor: 'pointer' },
  pressed: { fill: '#FFD700', outline: 'none' },
}

export default function WorldMap({ onCountryClick, selectedCountry }: WorldMapProps) {
  const [position, setPosition] = useState({ coordinates: [0, 20] as [number, number], zoom: 1 })

  const getCountryName = (geo: any): string => 
    geo.properties?.ADMIN || geo.properties?.NAME || geo.properties?.name || geo.properties?.NAME_EN || 'Unknown'

  const handleZoomIn = () => {
    if (position.zoom >= 4) return
    setPosition(prev => ({ ...prev, zoom: prev.zoom * 2 }))
  }

  const handleZoomOut = () => {
    if (position.zoom <= 1) return
    setPosition(prev => ({ ...prev, zoom: prev.zoom / 2 }))
  }

  const handleReset = () => {
    setPosition({ coordinates: [0, 20], zoom: 1 })
  }

  return (
    <div className="map-wrapper">
      <div className="zoom-controls">
        <button 
          onClick={handleZoomIn}
          disabled={position.zoom >= 4}
          className="zoom-button"
          title="Zoom In"
        >
          +
        </button>
        <button 
          onClick={handleZoomOut}
          disabled={position.zoom <= 1}
          className="zoom-button"
          title="Zoom Out"
        >
          −
        </button>
        <button 
          onClick={handleReset}
          className="zoom-button reset-button"
          title="Reset View"
        >
          ⌂
        </button>
      </div>
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 147,
          center: [0, 20],
        }}
        style={{
          width: '100%',
          height: 'auto',
          maxHeight: '70vh',
        }}
      >
        <ZoomableGroup 
          zoom={position.zoom}
          center={position.coordinates}
          onMoveEnd={setPosition}
          maxZoom={4}
          minZoom={1}
        >
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
        </ZoomableGroup>
      </ComposableMap>
    </div>
  )
}