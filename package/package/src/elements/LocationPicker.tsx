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

// Load Google Maps script dynamically using env variable
const loadGoogleMapsScript = (): Promise<void> => {
    return new Promise((resolve, reject) => {
        if (window.google?.maps) {
            resolve();
            return;
        }

        // Check if script already added
        if (document.getElementById('google-maps-script')) {
            // Wait for it to load
            const check = setInterval(() => {
                if (window.google?.maps) {
                    clearInterval(check);
                    resolve();
                }
            }, 100);
            return;
        }

        const apiKey = import.meta.env.VITE_GOOGLE_MAPS_KEY || '';

        if (!apiKey || apiKey === 'YOUR_ACTUAL_KEY_HERE') {
            reject(new Error('Google Maps API key not configured in .env file'));
            return;
        }

        window.initGoogleMaps = () => resolve();

        const script = document.createElement('script');
        script.id = 'google-maps-script';
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initGoogleMaps`;
        script.async = true;
        script.defer = true;
        script.onerror = () => reject(new Error('Failed to load Google Maps'));
        document.head.appendChild(script);
    });
};

const LocationPicker: React.FC<LocationPickerProps> = ({ onLocationSelect, initialLat, initialLng }) => {
    const mapRef = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<any>(null);
    const [address, setAddress] = useState('');
    const [mapsError, setMapsError] = useState('');
    const [mapsLoading, setMapsLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        setMapsLoading(true);

        loadGoogleMapsScript()
            .then(() => {
                if (cancelled || !mapRef.current || map) return;
                setMapsLoading(false);

                const defaultLat = initialLat || 31.5204; // Default Lahore
                const defaultLng = initialLng || 74.3587;

                const gMap = new window.google.maps.Map(mapRef.current, {
                    center: { lat: defaultLat, lng: defaultLng },
                    zoom: 15,
                });

                const gMarker = new window.google.maps.Marker({
                    position: { lat: defaultLat, lng: defaultLng },
                    map: gMap,
                    draggable: true,
                });

                setMap(gMap);

                gMap.addListener('click', (e: any) => {
                    const pos = e.latLng;
                    gMarker.setPosition(pos);
                    updateAddress(pos.lat(), pos.lng());
                });

                gMarker.addListener('dragend', (e: any) => {
                    const pos = e.latLng;
                    updateAddress(pos.lat(), pos.lng());
                });
            })
            .catch((err) => {
                if (!cancelled) {
                    setMapsLoading(false);
                    setMapsError(err.message || 'Could not load Google Maps');
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
            }
        });
    };

    if (mapsError) {
        return (
            <div style={{
                padding: '20px', borderRadius: 10, background: '#fff8e1',
                border: '1px solid #ffe082', color: '#f57c00', fontSize: 13
            }}>
                <strong>⚠️ Map unavailable:</strong> {mapsError}
                <br />
                <small>Please type your delivery address manually in the field above.</small>
            </div>
        );
    }

    if (mapsLoading) {
        return (
            <div style={{
                height: 300, borderRadius: 10, background: '#f5f5f5',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#999', fontSize: 14
            }}>
                Loading map...
            </div>
        );
    }

    return (
        <div className="location-picker">
            <div
                ref={mapRef}
                style={{ width: '100%', height: '300px', borderRadius: '10px', marginBottom: '10px' }}
            />
            {address && (
                <div className="selected-address p-2 bg-light rounded border small">
                    <strong>📍 Selected Location:</strong> {address}
                </div>
            )}
        </div>
    );
};

export default LocationPicker;
