import React, { useEffect, useRef, useState } from 'react';

declare global {
    interface Window {
        google: any;
        initGoogleMaps: () => void;
    }
}

interface LocationPickerProps {
    onLocationSelect: (lat: number, lng: number, address: string) => void;
    initialLat?: number;
    initialLng?: number;
}

const loadGoogleMapsScript = (): Promise<void> => {
    return new Promise((resolve, reject) => {
        if (window.google?.maps) {
            resolve();
            return;
        }

        if (document.getElementById('google-maps-script')) {
            const check = setInterval(() => {
                if (window.google?.maps) {
                    clearInterval(check);
                    resolve();
                }
            }, 100);
            return;
        }

        const apiKey = import.meta.env.VITE_GOOGLE_MAPS_KEY || '';

        if (!apiKey || apiKey === 'YOUR_ACTUAL_KEY_HERE' || apiKey === '') {
            reject(new Error('Google Maps API key not configured. Please add VITE_GOOGLE_MAPS_KEY to your .env file.'));
            return;
        }

        window.initGoogleMaps = () => resolve();

        const script = document.createElement('script');
        script.id = 'google-maps-script';
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initGoogleMaps`;
        script.async = true;
        script.defer = true;
        script.onerror = () => reject(new Error('Failed to load Google Maps script. Check your API key or internet connection.'));
        document.head.appendChild(script);
    });
};

const LocationPicker: React.FC<LocationPickerProps> = ({ onLocationSelect, initialLat, initialLng }) => {
    const mapRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const [address, setAddress] = useState('');
    const [mapsError, setMapsError] = useState('');
    const [mapsLoading, setMapsLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        setMapsLoading(true);

        loadGoogleMapsScript()
            .then(() => {
                if (cancelled || !mapRef.current) return;
                setMapsLoading(false);

                const defaultLat = Number(initialLat) || 31.5204; // Lahore
                const defaultLng = Number(initialLng) || 74.3587;

                const center = { lat: defaultLat, lng: defaultLng };

                const gMap = new window.google.maps.Map(mapRef.current, {
                    center,
                    zoom: 15,
                    mapTypeControl: false,
                    streetViewControl: false,
                    fullscreenControl: false,
                });

                const gMarker = new window.google.maps.Marker({
                    position: center,
                    map: gMap,
                    draggable: true,
                    animation: window.google.maps.Animation.DROP
                });

                // Autocomplete setup
                if (searchInputRef.current) {
                    const autocomplete = new window.google.maps.places.Autocomplete(searchInputRef.current);
                    autocomplete.bindTo('bounds', gMap);

                    autocomplete.addListener('place_changed', () => {
                        const place = autocomplete.getPlace();
                        if (!place.geometry || !place.geometry.location) return;

                        if (place.geometry.viewport) {
                            gMap.fitBounds(place.geometry.viewport);
                        } else {
                            gMap.setCenter(place.geometry.location);
                            gMap.setZoom(17);
                        }

                        gMarker.setPosition(place.geometry.location);
                        const lat = place.geometry.location.lat();
                        const lng = place.geometry.location.lng();
                        const addr = place.formatted_address || '';
                        setAddress(addr);
                        onLocationSelect(lat, lng, addr);
                    });
                }

                gMap.addListener('click', (e: any) => {
                    const pos = e.latLng;
                    gMarker.setPosition(pos);
                    updateAddress(pos.lat(), pos.lng());
                });

                gMarker.addListener('dragend', (e: any) => {
                    const pos = e.latLng;
                    updateAddress(pos.lat(), pos.lng());
                });

                // Initial address fetch
                updateAddress(defaultLat, defaultLng);
            })
            .catch((err) => {
                if (!cancelled) {
                    setMapsLoading(false);
                    setMapsError(err.message || 'Could not load Google Maps');
                    console.error("Maps Error:", err);
                }
            });

        return () => { cancelled = true; };
    }, []);

    const updateAddress = (lat: number, lng: number) => {
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ location: { lat, lng } }, (results: any, status: any) => {
            if (status === 'OK' && results[0]) {
                const addr = results[0].formatted_address;
                setAddress(addr);
                onLocationSelect(lat, lng, addr);
                if (searchInputRef.current) {
                    searchInputRef.current.value = addr;
                }
            }
        });
    };

    if (mapsError) {
        return (
            <div style={{
                padding: '25px', borderRadius: 12, background: '#fff5f5',
                border: '1px solid #feb2b2', color: '#c53030', fontSize: 14, textAlign: 'center'
            }}>
                <i className="fa-solid fa-triangle-exclamation mb-2" style={{ fontSize: 24 }}></i>
                <div style={{ fontWeight: 700, marginBottom: 5 }}>Map Error</div>
                <p style={{ margin: 0 }}>{mapsError}</p>
                <button
                    className="btn btn-sm btn-outline-danger mt-3"
                    onClick={() => window.location.reload()}
                >
                    Reload Page
                </button>
            </div>
        );
    }

    if (mapsLoading) {
        return (
            <div style={{
                height: 350, borderRadius: 12, background: '#f8f9fa',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                color: '#6c757d', fontSize: 14, border: '1px dashed #dee2e6'
            }}>
                <div className="spinner-border text-primary mb-3" role="status"></div>
                Initializing Map...
            </div>
        );
    }

    return (
        <div className="location-picker">
            <style>
                {`
                    .map-search-container {
                        position: relative;
                        margin-bottom: 15px;
                    }
                    .map-search-input {
                        width: 100%;
                        padding: 12px 15px 12px 40px;
                        border: 2px solid #eee;
                        border-radius: 10px;
                        font-size: 14px;
                        transition: all 0.3s;
                        outline: none;
                    }
                    .map-search-input:focus {
                        border-color: #fe9f10;
                        box-shadow: 0 4px 12px rgba(254, 159, 16, 0.1);
                    }
                    .search-icon {
                        position: absolute;
                        left: 15px;
                        top: 50%;
                        transform: translateY(-50%);
                        color: #999;
                    }
                    .pac-container {
                        border-radius: 10px;
                        margin-top: 5px;
                        box-shadow: 0 8px 16px rgba(0,0,0,0.1);
                        border: 1px solid #eee;
                        font-family: inherit;
                        z-index: 10002 !important;
                    }
                `}
            </style>

            <div className="map-search-container">
                <i className="fa-solid fa-magnifying-glass search-icon"></i>
                <input
                    ref={searchInputRef}
                    type="text"
                    className="map-search-input"
                    placeholder="Search your area, building or street..."
                />
            </div>

            <div
                ref={mapRef}
                style={{
                    width: '100%',
                    height: '350px',
                    borderRadius: '12px',
                    marginBottom: '15px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                    border: '1px solid #eee'
                }}
            />

            {address && (
                <div style={{
                    padding: '12px 15px',
                    background: '#fff9f0',
                    borderRadius: '10px',
                    border: '1px solid #ffe8cc',
                    fontSize: '13px',
                    color: '#862e00',
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: '10px'
                }}>
                    <i className="fa-solid fa-location-dot" style={{ color: '#fe9f10' }}></i>
                    <div>
                        <strong style={{ display: 'block', marginBottom: '2px' }}>Confirm Address:</strong>
                        {address}
                    </div>
                </div>
            )}
        </div>
    );
};

export default LocationPicker;

