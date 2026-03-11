import React, { useState, useCallback, useRef} from 'react';
import { GoogleMap, useJsApiLoader, Marker, Autocomplete } from '@react-google-maps/api';

const GOOGLE_MAPS_API_KEY = "AIzaSyAhwD5EE1C7J_K5qaqlPuBX6o0SjqJ2wYw";
const LIBRARIES: any = ['places'];

const containerStyle = {
    width: '100%',
    height: '400px'
};

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
    const searchInputRef = useRef<HTMLInputElement>(null);
    const mapRef = useRef<google.maps.Map | null>(null);
    const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: GOOGLE_MAPS_API_KEY,
        libraries: LIBRARIES,
    });

    const onAutocompleteLoad = (autocompleteInstance: google.maps.places.Autocomplete) => {
        console.log("Autocomplete Loaded:", autocompleteInstance);
        setAutocomplete(autocompleteInstance);
    };

    const onPlaceChanged = () => {
        console.log("Place Changed Event Triggered");
        if (autocomplete !== null) {
            const place = autocomplete.getPlace();
            console.log("Selected Place:", place);
            if (place.geometry && place.geometry.location) {
                const lat = place.geometry.location.lat();
                const lng = place.geometry.location.lng();
                setCoords({ lat, lng });

                if (mapRef.current) {
                    if (place.geometry.viewport) {
                        mapRef.current.fitBounds(place.geometry.viewport);
                    } else {
                        mapRef.current.setCenter({ lat, lng });
                        mapRef.current.setZoom(17);
                    }
                }

                const addr = place.formatted_address || place.name || '';
                setAddress(addr);
                onLocationSelect(lat, lng, addr);
                if (searchInputRef.current) {
                    searchInputRef.current.value = addr;
                }
            }
        } else {
            console.warn("Autocomplete instance is null onPlaceChanged");
        }
    };

    // Global style for .pac-container is defined in index.html to ensure it works correctly with the modal.

    const onMapClick = useCallback((e: google.maps.MapMouseEvent) => {
        if (e.latLng) {
            const lat = e.latLng.lat();
            const lng = e.latLng.lng();
            setCoords({ lat, lng });

            const geocoder = new window.google.maps.Geocoder();
            geocoder.geocode({ location: { lat, lng } }, (results, status) => {
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
        }
    }, [onLocationSelect]);

    const onMapLoad = useCallback((map: google.maps.Map) => {
        mapRef.current = map;
    }, []);

    if (!isLoaded) {
        return (
            <div style={{
                height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: '#f5f5f5', borderRadius: 12, color: '#999', fontSize: 14
            }}>
                Loading Map library...
            </div>
        );
    }

    return (
        <div>
            {/* Header with coordinates */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 }}>
                <div>
                    <h5 style={{ margin: 0, fontWeight: 700, fontSize: 16, color: '#222' }}>Pin your Location</h5>
                    <p style={{ margin: '4px 0 0', fontSize: 12, color: '#888', fontStyle: 'italic' }}>Click on the map or search to set your precise coordinates</p>
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                    <div style={{ background: '#f3f4f6', padding: '6px 14px', borderRadius: 8, border: '1px solid #e5e7eb' }}>
                        <span style={{ display: 'block', fontSize: 10, color: '#9ca3af' }}>Latitude</span>
                        <span style={{ fontSize: 13, fontWeight: 700, fontFamily: 'monospace', color: '#333' }}>{coords.lat.toFixed(6)}</span>
                    </div>
                    <div style={{ background: '#f3f4f6', padding: '6px 14px', borderRadius: 8, border: '1px solid #e5e7eb' }}>
                        <span style={{ display: 'block', fontSize: 10, color: '#9ca3af' }}>Longitude</span>
                        <span style={{ fontSize: 13, fontWeight: 700, fontFamily: 'monospace', color: '#333' }}>{coords.lng.toFixed(6)}</span>
                    </div>
                </div>
            </div>

            {/* Search Bar - Using Autocomplete component from @react-google-maps/api */}
            <div style={{ position: 'relative', marginBottom: 15 }}>
                <Autocomplete
                    onLoad={onAutocompleteLoad}
                    onPlaceChanged={onPlaceChanged}
                    fields={['geometry', 'formatted_address', 'name', 'address_components']}
                    options={{
                        types: [], // empty array means all types
                        componentRestrictions: { country: "pk" } // Restricted to Pakistan like the dashboard
                    }}
                >
                    <input
                        ref={searchInputRef}
                        type="text"
                        autoComplete="off"
                        placeholder="Search your location (e.g. City, Street, Restaurant name)..."
                        style={{
                            width: '100%',
                            padding: '12px 16px 12px 40px',
                            border: '1px solid #d1d5db',
                            borderRadius: 14,
                            fontSize: 14,
                            outline: 'none',
                            fontWeight: 500,
                            background: '#fff',
                            color: '#333'
                        }}
                    />
                </Autocomplete>
                <span style={{
                    position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
                    color: '#9ca3af', fontSize: 15, pointerEvents: 'none', zIndex: 2
                }}>📍</span>
            </div>

            {/* Google Map */}
            <div style={{ borderRadius: 16, overflow: 'hidden', border: '2px solid #e5e7eb', boxShadow: '0 4px 15px rgba(0,0,0,0.06)' }}>
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={{ lat: coords.lat, lng: coords.lng }}
                    zoom={15}
                    onClick={onMapClick}
                    onLoad={onMapLoad}
                    options={{
                        mapTypeControl: false,
                        streetViewControl: false,
                        fullscreenControl: false,
                    }}
                >
                    <Marker position={{ lat: coords.lat, lng: coords.lng }} />
                </GoogleMap>
            </div>

            {/* Selected Address */}
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

