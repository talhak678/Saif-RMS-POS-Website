import React, { useEffect, useRef, useState } from 'react';

declare global {
    interface Window {
        google: any;
    }
}

interface LocationPickerProps {
    onLocationSelect: (lat: number, lng: number, address: string) => void;
    initialLat?: number;
    initialLng?: number;
}

const LocationPicker: React.FC<LocationPickerProps> = ({ onLocationSelect, initialLat, initialLng }) => {
    const mapRef = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<any>(null);
    const [address, setAddress] = useState('');

    useEffect(() => {
        if (window.google && mapRef.current && !map) {
            const gMap = new window.google.maps.Map(mapRef.current, {
                center: { lat: initialLat || 24.8607, lng: initialLng || 67.0011 }, // Default Karachi
                zoom: 15,
            });

            const gMarker = new window.google.maps.Marker({
                position: { lat: initialLat || 24.8607, lng: initialLng || 67.0011 },
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
        }
    }, [mapRef, map]);

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

    return (
        <div className="location-picker">
            <div ref={mapRef} style={{ width: '100%', height: '300px', borderRadius: '10px', marginBottom: '10px' }}></div>
            {address && (
                <div className="selected-address p-2 bg-light rounded border small">
                    <strong>Selected Location:</strong> {address}
                </div>
            )}
        </div>
    );
};

export default LocationPicker;
