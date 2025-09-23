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
  const [zoom, setZoom] = useState(1)
  const [center, setCenter] = useState<[number, number]>([0, 20])

  const getCountryName = (geo: any): string => 
    geo.properties?.ADMIN || geo.properties?.NAME || geo.properties?.name || geo.properties?.NAME_EN || 'Unknown'

  const handleZoomIn = () => {
    if (zoom >= 4) return
    setZoom(zoom * 2)
  }

  const handleZoomOut = () => {
    if (zoom <= 1) return
    setZoom(zoom / 2)
  }

  const handleReset = () => {
    setZoom(1)
    setCenter([0, 20])
  }

  return (
    <div className="map-wrapper">
      <div className="zoom-controls">
        <button onClick={handleZoomIn} className="zoom-button" disabled={zoom >= 4}>
          +
        </button>
        <button onClick={handleZoomOut} className="zoom-button" disabled={zoom <= 1}>
          −
        </button>
        <button onClick={handleReset} className="zoom-button reset-button">
          Reset
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
          zoom={zoom} 
          center={center}
          onMoveEnd={({ coordinates }) => setCenter(coordinates)}
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