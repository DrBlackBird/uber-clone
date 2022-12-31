import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useRef } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import { selectDestination, selectOrigin, setTravelTimeInformation } from '../../slices/navSlice';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAPS_APIKEY } from '@env';

export const Map = () => {
    const dispatch = useDispatch();
    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);
    const mapRef = useRef(null);

    useEffect(() => {
        if (!origin || !destination) return;
        mapRef.current.fitToSuppliedMarkers(['origin', 'destination'], {
            edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        });
    }, [origin, destination]);

    useEffect(() => {
        if (!origin || !destination) return;
        const getTravelTime = async () => {
            let URL = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origin.description}&destinations=${destination.description}&key=${GOOGLE_MAPS_APIKEY}`;
            fetch(URL)
                .then(res => res.json())
                .then(data => {
                    dispatch(setTravelTimeInformation(data.rows[0].elements[0]));
                });
        };
        getTravelTime();
    }, [origin, destination, GOOGLE_MAPS_APIKEY]);

    return (
        <MapView
            ref={mapRef}
            className="h-full"
            mapType="mutedStandard"
            initialRegion={{
                latitude: origin.location.lat,
                longitude: origin.location.lng,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            }}>
            {origin && destination && (
                <MapViewDirections
                    mode="DRIVING"
                    precision="low"
                    origin={origin.description}
                    destination={destination.description}
                    apikey={GOOGLE_MAPS_APIKEY}
                    strokeWidth={3}
                    strokeColor="black"
                />
            )}
            {origin?.location && (
                <Marker
                    identifier="origin"
                    title="Origin"
                    description={origin.description}
                    coordinate={{ latitude: origin.location.lat, longitude: origin.location.lng }}
                />
            )}
            {destination?.location && (
                <Marker
                    identifier="destination"
                    title="Destination"
                    description={destination.description}
                    coordinate={{ latitude: destination.location.lat, longitude: destination.location.lng }}
                />
            )}
        </MapView>
    );
};
