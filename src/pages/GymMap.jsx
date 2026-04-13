import { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'

const IconPin = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
)
const IconRefresh = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
  </svg>
)

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLon = (lon2 - lon1) * Math.PI / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return (R * c).toFixed(1)
}

export default function GymMap() {
  const [gyms, setGyms] = useState([])
  const [userLocation, setUserLocation] = useState(null)
  const [loading, setLoading] = useState(true)
  const [locationError, setLocationError] = useState(null)
  const [selected, setSelected] = useState(null)
  const [cityName, setCityName] = useState('')

  useEffect(() => {
    getLocation()
  }, [])

  const getLocation = () => {
    setLoading(true)
    setLocationError(null)
    setGyms([])
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          const { latitude, longitude } = pos.coords
          setUserLocation({ lat: latitude, lng: longitude })
          fetchCityName(latitude, longitude)
          fetchNearbyGyms(latitude, longitude)
        },
        err => {
          setLocationError('Could not get your location. Showing default area (Manila).')
          const lat = 14.5995, lng = 120.9842
          setUserLocation({ lat, lng })
          setCityName('Manila, Philippines')
          fetchNearbyGyms(lat, lng)
        },
        { timeout: 10000 }
      )
    } else {
      setLocationError('Geolocation not supported. Showing default area.')
      const lat = 14.5995, lng = 120.9842
      setUserLocation({ lat, lng })
      setCityName('Manila, Philippines')
      fetchNearbyGyms(lat, lng)
    }
  }

  const fetchCityName = async (lat, lng) => {
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`)
      const data = await res.json()
      const city = data.address?.city || data.address?.town || data.address?.village || data.address?.county || 'Your Area'
      const country = data.address?.country || ''
      setCityName(`${city}${country ? ', ' + country : ''}`)
    } catch {
      setCityName('Your Area')
    }
  }

  const fetchNearbyGyms = async (lat, lng) => {
    setLoading(true)
    try {
      const radius = 5000
      const query = `
        [out:json][timeout:20];
        (
          node["leisure"="fitness_centre"](around:${radius},${lat},${lng});
          node["amenity"="gym"](around:${radius},${lat},${lng});
          way["leisure"="fitness_centre"](around:${radius},${lat},${lng});
          way["amenity"="gym"](around:${radius},${lat},${lng});
        );
        out body center;
      `
      const res = await fetch('https://overpass-api.de/api/interpreter', {
        method: 'POST',
        body: query,
      })
      const data = await res.json()
      const list = data.elements
        .filter(el => el.tags?.name)
        .map(el => ({
          id: el.id,
          name: el.tags.name,
          lat: el.lat || el.center?.lat,
          lng: el.lon || el.center?.lon,
          address: [
            el.tags['addr:housenumber'],
            el.tags['addr:street'],
            el.tags['addr:city'],
          ].filter(Boolean).join(' ') || 'Address not available',
          phone: el.tags.phone || el.tags['contact:phone'] || null,
          website: el.tags.website || el.tags['contact:website'] || null,
          opening: el.tags.opening_hours || null,
          distance: calculateDistance(lat, lng, el.lat || el.center?.lat, el.lon || el.center?.lon),
        }))
        .filter(g => g.lat && g.lng)
        .sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance))
      setGyms(list)
    } catch (err) {
      setGyms([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', background: '#080808', overflow: 'hidden' }}>
      <Sidebar />
      <main style={{ marginLeft: 220, flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Header */}
        <div style={{
          padding: '15px 28px', borderBottom: '1px solid rgba(255,255,255,0.05)',
          flexShrink: 0, background: 'rgba(8,8,8,0.9)', backdropFilter: 'blur(20px)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div>
            <h1 style={{ fontFamily: 'Syne', fontSize: 18, fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 2 }}>
              Explore Gyms
            </h1>
            {cityName && (
              <p style={{ fontSize: 12, color: 'rgba(234,234,234,0.35)', fontFamily: 'DM Sans' }}>
                Near {cityName}
              </p>
            )}
          </div>
          <button
            onClick={getLocation}
            style={{
              display: 'flex', alignItems: 'center', gap: 7,
              background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.25)',
              color: '#c9a84c', fontFamily: 'Syne', fontWeight: 600, fontSize: 12,
              padding: '8px 14px', borderRadius: 8, cursor: 'pointer', transition: 'all 0.18s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(201,168,76,0.18)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(201,168,76,0.1)'}
          >
            <IconRefresh /> Refresh
          </button>
        </div>

        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          {/* Map iframe */}
          <div style={{ flex: 1, position: 'relative', flexShrink: 0 }}>
            {userLocation ? (
              <iframe
                key={`${userLocation.lat}-${userLocation.lng}-${selected}`}
                title="Gym Map"
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ display: 'block' }}
                src={
                  selected
                    ? `https://www.openstreetmap.org/export/embed.html?bbox=${selected.lng - 0.012},${selected.lat - 0.008},${selected.lng + 0.012},${selected.lat + 0.008}&layer=mapnik&marker=${selected.lat},${selected.lng}`
                    : `https://www.openstreetmap.org/export/embed.html?bbox=${userLocation.lng - 0.05},${userLocation.lat - 0.03},${userLocation.lng + 0.05},${userLocation.lat + 0.03}&layer=mapnik&marker=${userLocation.lat},${userLocation.lng}`
                }
              />
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'rgba(234,234,234,0.3)' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ animation: 'spin 1s linear infinite', display: 'inline-block', marginBottom: 12 }}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round">
                      <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                    </svg>
                  </div>
                  <p style={{ fontFamily: 'DM Sans', fontSize: 14 }}>Getting your location...</p>
                </div>
              </div>
            )}
          </div>

          {/* Gyms list panel */}
          <div style={{
            width: 320, flexShrink: 0, borderLeft: '1px solid rgba(255,255,255,0.05)',
            display: 'flex', flexDirection: 'column', background: '#080808', overflow: 'hidden',
          }}>
            <div style={{
              padding: '14px 16px', borderBottom: '1px solid rgba(255,255,255,0.05)',
              flexShrink: 0,
            }}>
              <span style={{ fontFamily: 'Syne', fontSize: 13, fontWeight: 700, color: '#c9a84c' }}>
                {loading ? 'Searching...' : `${gyms.length} Gyms Found`}
              </span>
              {!loading && gyms.length > 0 && (
                <span style={{ fontSize: 11, color: 'rgba(234,234,234,0.25)', marginLeft: 8, fontFamily: 'DM Sans' }}>
                  within 5km
                </span>
              )}
            </div>

            <div style={{ flex: 1, overflowY: 'auto' }}>
              {locationError && (
                <div style={{ padding: '12px 16px', background: 'rgba(224,82,82,0.08)', borderBottom: '1px solid rgba(224,82,82,0.15)' }}>
                  <p style={{ fontSize: 12, color: '#e05252', fontFamily: 'DM Sans', lineHeight: 1.5 }}>{locationError}</p>
                </div>
              )}

              {loading ? (
                <div style={{ padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="skeleton" style={{ height: 72, borderRadius: 10 }} />
                  ))}
                </div>
              ) : gyms.length === 0 ? (
                <div style={{ padding: '48px 20px', textAlign: 'center' }}>
                  <div style={{
                    width: 52, height: 52, borderRadius: '50%', margin: '0 auto 16px',
                    background: 'rgba(201,168,76,0.07)', border: '1px solid rgba(201,168,76,0.12)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <IconPin />
                  </div>
                  <h3 style={{ fontFamily: 'Syne', fontSize: 14, fontWeight: 700, color: 'rgba(234,234,234,0.5)', marginBottom: 8 }}>
                    No gyms found nearby
                  </h3>
                  <p style={{ color: 'rgba(234,234,234,0.25)', fontSize: 13, lineHeight: 1.6 }}>
                    Try refreshing or check a different area.
                  </p>
                </div>
              ) : (
                gyms.map((gym, i) => {
                  const isSel = selected?.id === gym.id
                  return (
                    <div
                      key={gym.id}
                      onClick={() => setSelected(isSel ? null : gym)}
                      style={{
                        padding: '14px 16px',
                        borderBottom: '1px solid rgba(255,255,255,0.04)',
                        cursor: 'pointer',
                        background: isSel ? 'rgba(201,168,76,0.07)' : 'transparent',
                        borderLeft: isSel ? '2px solid #c9a84c' : '2px solid transparent',
                        transition: 'all 0.18s',
                        animation: `fadeUp 0.3s ease ${i * 30}ms both`,
                      }}
                      onMouseEnter={e => { if (!isSel) e.currentTarget.style.background = 'rgba(255,255,255,0.025)' }}
                      onMouseLeave={e => { if (!isSel) e.currentTarget.style.background = 'transparent' }}
                    >
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                        <div style={{
                          width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                          background: 'rgba(201,168,76,0.08)',
                          border: '1px solid rgba(201,168,76,0.15)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          <IconPin />
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontFamily: 'Syne', fontSize: 13, fontWeight: 700, color: '#EAEAEA', marginBottom: 3, lineHeight: 1.3 }}>
                            {gym.name}
                          </div>
                          <div style={{ fontSize: 11, color: 'rgba(234,234,234,0.35)', marginBottom: 4, lineHeight: 1.4 }}>
                            {gym.address}
                          </div>
                          {gym.opening && (
                            <div style={{ fontSize: 10, color: 'rgba(201,168,76,0.6)', fontFamily: 'DM Sans' }}>
                              {gym.opening}
                            </div>
                          )}
                        </div>
                        <div style={{
                          background: 'rgba(201,168,76,0.1)',
                          border: '1px solid rgba(201,168,76,0.2)',
                          color: '#c9a84c', fontSize: 11,
                          padding: '3px 8px', borderRadius: 20,
                          fontFamily: 'Syne', fontWeight: 700,
                          flexShrink: 0, whiteSpace: 'nowrap',
                        }}>
                          {gym.distance} km
                        </div>
                      </div>

                      {isSel && (gym.phone || gym.website) && (
                        <div style={{ marginTop: 10, paddingTop: 10, borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', gap: 8 }}>
                          {gym.phone && (
                            <a href={`tel:${gym.phone}`} style={{
                              fontSize: 11, color: '#c9a84c', fontFamily: 'DM Sans',
                              background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)',
                              padding: '4px 10px', borderRadius: 6, textDecoration: 'none',
                            }}>📞 Call</a>
                          )}
                          {gym.website && (
                            <a href={gym.website} target="_blank" rel="noreferrer" style={{
                              fontSize: 11, color: '#c9a84c', fontFamily: 'DM Sans',
                              background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)',
                              padding: '4px 10px', borderRadius: 6, textDecoration: 'none',
                            }}>🌐 Website</a>
                          )}
                          <a
                            href={`https://www.openstreetmap.org/directions?from=${userLocation?.lat},${userLocation?.lng}&to=${gym.lat},${gym.lng}`}
                            target="_blank" rel="noreferrer"
                            style={{
                              fontSize: 11, color: '#c9a84c', fontFamily: 'DM Sans',
                              background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)',
                              padding: '4px 10px', borderRadius: 6, textDecoration: 'none',
                            }}
                          >🗺 Directions</a>
                        </div>
                      )}
                    </div>
                  )
                })
              )}
            </div>
          </div>
        </div>
      </main>

      <style>{`
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
    </div>
  )
}