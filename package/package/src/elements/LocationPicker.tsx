import React, { useState, useCallback, useRef } from 'react';
import { GoogleMap, useJsApiLoader, Marker, Autocomplete } from '@react-google-maps/api';

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_KEY || 'AIzaSyAhwD5EE1C7J_K5qaqlPuBX6o0SjqJ2wYw';

const libraries: ("places")[] = ["places"];

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
    const defaultLng = Number(initialLng) || 74.3587;

    const [markerPos, setMarkerPos] = useState({ lat: defaultLat, lng: defaultLng });
    const [address, setAddress] = useState('');
    const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
    const mapRef = useRef<google.maps.Map | null>(null);

    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: GOOGLE_MAPS_API_KEY,
        libraries,
    });

    const onMapClick = useCallback((e: google.maps.MapMouseEvent) => {
        if (e.latLng) {
            const lat = e.latLng.lat();
            const lng = e.latLng.lng();
            setMarkerPos({ lat, lng });
            reverseGeocode(lat, lng);
        }
    }, []);

    const onMarkerDragEnd = useCallback((e: google.maps.MapMouseEvent) => {
        if (e.latLng) {
            const lat = e.latLng.lat();
            const lng = e.latLng.lng();
            setMarkerPos({ lat, lng });
            reverseGeocode(lat, lng);
        }
    }, []);

    const reverseGeocode = (lat: number, lng: number) => {
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ location: { lat, lng } }, (results, status) => {
            if (status === 'OK' && results && results[0]) {
                const addr = results[0].formatted_address;
                setAddress(addr);
                onLocationSelect(lat, lng, addr);
            } else {
                onLocationSelect(lat, lng, `${lat.toFixed(6)}, ${lng.toFixed(6)}`);
            }
        });
    };

    const onAutocompleteLoad = useCallback((autocomplete: google.maps.places.Autocomplete) => {
        autocompleteRef.current = autocomplete;
    }, []);

    const onPlaceChanged = useCallback(() => {
        if (autocompleteRef.current) {
            const place = autocompleteRef.current.getPlace();
            if (place.geometry && place.geometry.location) {
                const lat = place.geometry.location.lat();
                const lng = place.geometry.location.lng();
                setMarkerPos({ lat, lng });
                
                if (mapRef.current) {
                    if (place.geometry.viewport) {
                        mapRef.current.fitBounds(place.geometry.viewport);
                    } else {
                        mapRef.current.setCenter({ lat, lng });
                        mapRef.current.setZoom(17);
                    }
                }

                const addr = place.formatted_address || '';
                setAddress(addr);
                onLocationSelect(lat, lng, addr);
            }
        }
    }, [onLocationSelect]);

    const onMapLoad = useCallback((map: google.maps.Map) => {
        mapRef.current = map;
    }, []);

    if (loadError) {
        return (
            <div style={{
                padding: '30px', borderRadius: 16, background: '#fff5f5',
                border: '1px solid #feb2b2', color: '#c53030', fontSize: 14, textAlign: 'center'
            }}>
                <div style={{ fontSize: 32, marginBottom: 10 }}>⚠️</div>
                <div style={{ fontWeight: 700, marginBottom: 8, fontSize: 16 }}>Map could not be loaded</div>
                <p style={{ margin: 0, color: '#999' }}>Please check your internet connection and try again.</p>
                <button 
                    className="btn btn-sm btn-outline-danger mt-3"
                    onClick={() => window.location.reload()}
                    style={{ borderRadius: 10 }}
                >
                    🔄 Reload Page
                </button>
            </div>
        );
    }

    if (!isLoaded) {
        return (
            <div style={{
                height: 400, borderRadius: 16, background: '#f8f9fa',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                color: '#6c757d', fontSize: 14, border: '2px dashed #dee2e6'
            }}>
                <div className="spinner-border text-primary mb-3" role="status" style={{ width: 40, height: 40 }}></div>
                <strong>Loading Google Maps...</strong>
            </div>
        );
    }

    return (
        <div className="location-picker">
            <style>
                {`
                    .location-picker .pac-container {
                        z-index: 10060 !important;
                        border-radius: 12px;
                        margin-top: 5px;
                        box-shadow: 0 8px 24px rgba(0,0,0,0.12);
                        border: 1px solid #eee;
                        font-family: inherit;
                    }
                `}
            </style>

            {/* Header */}
            <div style={{ 
                display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
                marginBottom: 15,
                padding: '0 5px'
            }}>
                <div>
                    <h5 style={{ margin: 0, fontWeight: 800, fontSize: 16 }}>📍 Pin your Delivery Location</h5>
                    <p style={{ margin: '4px 0 0', fontSize: 12, color: '#888', fontStyle: 'italic' }}>Click on the map or search to set your address</p>
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                    <div style={{ background: '#f8f9fa', padding: '6px 12px', borderRadius: 10, border: '1px solid #eee' }}>
                        <span style={{ display: 'block', fontSize: 10, color: '#999', fontWeight: 600 }}>Latitude</span>
                        <span style={{ fontSize: 13, fontWeight: 700, fontFamily: 'monospace' }}>{markerPos.lat.toFixed(6)}</span>
                    </div>
                    <div style={{ background: '#f8f9fa', padding: '6px 12px', borderRadius: 10, border: '1px solid #eee' }}>
                        <span style={{ display: 'block', fontSize: 10, color: '#999', fontWeight: 600 }}>Longitude</span>
                        <span style={{ fontSize: 13, fontWeight: 700, fontFamily: 'monospace' }}>{markerPos.lng.toFixed(6)}</span>
                    </div>
                </div>
            </div>

            {/* Search Bar */}
            <div style={{ position: 'relative', marginBottom: 15 }}>
                <Autocomplete onLoad={onAutocompleteLoad} onPlaceChanged={onPlaceChanged}>
                    <input
                        type="text"
                        placeholder="Search your location (e.g. City, Street, Restaurant name)..."
                        style={{
                            width: '100%',
                            padding: '14px 16px 14px 44px',
                            border: '2px solid #eee',
                            borderRadius: 14,
                            fontSize: 14,
                            outline: 'none',
                            transition: 'all 0.3s',
                            fontWeight: 500,
                        }}
                        onFocus={(e) => {
                            e.currentTarget.style.borderColor = '#fe9f10';
                            e.currentTarget.style.boxShadow = '0 4px 16px rgba(254,159,16,0.1)';
                        }}
                        onBlur={(e) => {
                            e.currentTarget.style.borderColor = '#eee';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    />
                </Autocomplete>
                <span style={{
                    position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)',
                    color: '#999', fontSize: 16, pointerEvents: 'none'
                }}>
                    🔍
                </span>
            </div>

            {/* Google Map */}
            <div style={{ 
                borderRadius: 16, overflow: 'hidden', 
                boxShadow: '0 6px 20px rgba(0,0,0,0.08)', 
                border: '2px solid #f0f0f0',
                marginBottom: 15
            }}>
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={markerPos}
                    zoom={15}
                    onClick={onMapClick}
                    onLoad={onMapLoad}
                    options={{
                        mapTypeControl: false,
                        streetViewControl: false,
                        fullscreenControl: false,
                    }}
                >
                    <Marker 
                        position={markerPos} 
                        draggable={true}
                        onDragEnd={onMarkerDragEnd}
                    />
                </GoogleMap>
            </div>

            {/* Selected Address */}
            {address && (
                <div style={{ 
                    padding: '14px 18px', 
                    background: 'linear-gradient(135deg, #fff9f0 0%, #fff5e6 100%)', 
                    borderRadius: 14, 
                    border: '1px solid #ffe8cc',
                    fontSize: 13,
                    color: '#862e00',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 12
                }}>
                    <span style={{ fontSize: 18, marginTop: 1 }}>📍</span>
                    <div>
                        <strong style={{ display: 'block', marginBottom: 3, fontSize: 13 }}>Selected Delivery Address:</strong>
                        <span style={{ lineHeight: 1.5 }}>{address}</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LocationPicker;
