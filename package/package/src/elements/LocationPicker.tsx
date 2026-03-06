import React, { useState,  useRef, useEffect } from 'react';

interface LocationPickerProps {
    onLocationSelect: (lat: number, lng: number, address: string) => void;
    initialLat?: number;
    initialLng?: number;
}

const LocationPicker: React.FC<LocationPickerProps> = ({ onLocationSelect, initialLat, initialLng }) => {
    const defaultLat = Number(initialLat) || 30.1575;
    const defaultLng = Number(initialLng) || 66.9961;

    const [coords, setCoords] = useState({ lat: defaultLat, lng: defaultLng });
    const [address, setAddress] = useState('');
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const mapRef = useRef<any>(null);
    const markerRef = useRef<any>(null);

    useEffect(() => {
        if (!mapContainerRef.current || !window.google?.maps) return;

        // Create map
        const map = new window.google.maps.Map(mapContainerRef.current, {
            center: { lat: defaultLat, lng: defaultLng },
            zoom: 15,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false,
        });
        mapRef.current = map;

        // Create marker
        const marker = new window.google.maps.Marker({
            position: { lat: defaultLat, lng: defaultLng },
            map: map,
            draggable: true,
        });
        markerRef.current = marker;

        // Map click -> move marker
        map.addListener('click', (e: any) => {
            const lat = e.latLng.lat();
            const lng = e.latLng.lng();
            marker.setPosition(e.latLng);
            setCoords({ lat, lng });
            reverseGeocode(lat, lng);
        });

        // Marker drag -> update coords
        marker.addListener('dragend', (e: any) => {
            const lat = e.latLng.lat();
            const lng = e.latLng.lng();
            setCoords({ lat, lng });
            reverseGeocode(lat, lng);
        });

        // Setup autocomplete on search input
        if (searchInputRef.current && window.google.maps.places) {
            const autocomplete = new window.google.maps.places.Autocomplete(searchInputRef.current, {
                fields: ['geometry', 'formatted_address', 'name'],
            });

            autocomplete.bindTo('bounds', map);

            autocomplete.addListener('place_changed', () => {
                const place = autocomplete.getPlace();
                if (!place.geometry || !place.geometry.location) return;

                const lat = place.geometry.location.lat();
                const lng = place.geometry.location.lng();

                // Move map
                if (place.geometry.viewport) {
                    map.fitBounds(place.geometry.viewport);
                } else {
                    map.setCenter(place.geometry.location);
                    map.setZoom(17);
                }

                // Move marker
                marker.setPosition(place.geometry.location);

                // Update state
                setCoords({ lat, lng });
                const addr = place.formatted_address || place.name || '';
                setAddress(addr);
                onLocationSelect(lat, lng, addr);
            });
        }
    }, []);

    const reverseGeocode = (lat: number, lng: number) => {
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ location: { lat, lng } }, (results: any, status: any) => {
            if (status === 'OK' && results && results[0]) {
                const addr = results[0].formatted_address;
                setAddress(addr);
                onLocationSelect(lat, lng, addr);
                if (searchInputRef.current) {
                    searchInputRef.current.value = addr;
                }
            } else {
                onLocationSelect(lat, lng, `${lat.toFixed(6)}, ${lng.toFixed(6)}`);
            }
        });
    };

    if (!window.google?.maps) {
        return (
            <div style={{
                height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: '#f5f5f5', borderRadius: 12, color: '#c00', fontSize: 14
            }}>
                ⚠️ Google Maps not loaded. Please refresh the page.
            </div>
        );
    }

    return (
        <div>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 }}>
                <div>
                    <h5 style={{ margin: 0, fontWeight: 700, fontSize: 16 }}>Pin your Location</h5>
                    <p style={{ margin: '4px 0 0', fontSize: 12, color: '#888', fontStyle: 'italic' }}>Click on the map to set your precise coordinates</p>
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                    <div style={{ background: '#f3f4f6', padding: '6px 14px', borderRadius: 8, border: '1px solid #e5e7eb' }}>
                        <span style={{ display: 'block', fontSize: 10, color: '#9ca3af' }}>Latitude</span>
                        <span style={{ fontSize: 13, fontWeight: 700, fontFamily: 'monospace' }}>{coords.lat.toFixed(6)}</span>
                    </div>
                    <div style={{ background: '#f3f4f6', padding: '6px 14px', borderRadius: 8, border: '1px solid #e5e7eb' }}>
                        <span style={{ display: 'block', fontSize: 10, color: '#9ca3af' }}>Longitude</span>
                        <span style={{ fontSize: 13, fontWeight: 700, fontFamily: 'monospace' }}>{coords.lng.toFixed(6)}</span>
                    </div>
                </div>
            </div>

            {/* Search Bar */}
            <div style={{ position: 'relative', marginBottom: 15 }}>
                <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search your location (e.g. City, Street, Restaurant name)..."
                    style={{
                        width: '100%',
                        padding: '12px 16px 12px 40px',
                        border: '1px solid #d1d5db',
                        borderRadius: 14,
                        fontSize: 14,
                        outline: 'none',
                        fontWeight: 500,
                    }}
                />
                <span style={{
                    position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
                    color: '#9ca3af', fontSize: 15, pointerEvents: 'none'
                }}>📍</span>
            </div>

            {/* Map */}
            <div style={{ borderRadius: 16, overflow: 'hidden', border: '2px solid #e5e7eb', boxShadow: '0 4px 15px rgba(0,0,0,0.06)' }}>
                <div
                    ref={mapContainerRef}
                    style={{ width: '100%', height: '400px' }}
                />
            </div>

            {/* Address */}
            {address && (
                <div style={{
                    marginTop: 15, padding: '12px 16px',
                    background: '#fffbeb', borderRadius: 12, border: '1px solid #fde68a',
                    fontSize: 13, color: '#92400e', display: 'flex', alignItems: 'flex-start', gap: 10
                }}>
                    <span style={{ fontSize: 16 }}>📍</span>
                    <div>
                        <strong style={{ display: 'block', marginBottom: 2 }}>Selected Address:</strong>
                        {address}
                    </div>
                </div>
            )}
        </div>
    );
};

export default LocationPicker;
