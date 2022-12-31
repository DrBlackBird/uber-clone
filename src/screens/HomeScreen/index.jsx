import { GOOGLE_MAPS_APIKEY } from '@env';
import React from 'react';
import { Image, SafeAreaView, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useDispatch } from 'react-redux';
import { NavFavorites } from '../../components/NavFavorites';
import { NavOptions } from '../../components/NavOptions';
import { setDestination, setOrigin } from '../../slices/navSlice';

export const HomeScreen = () => {
    const dispatch = useDispatch();
    return (
        <SafeAreaView className="bg-white h-full">
            <View className="p-5">
                <Image
                    style={{ width: 100, height: 100, resizeMode: 'contain' }}
                    source={{
                        uri: 'https://links.papareact.com/gzs',
                    }}
                />
                <GooglePlacesAutocomplete
                    styles={{
                        container: {
                            flex: 0,
                        },
                        textInput: {
                            fontSize: 18,
                        },
                    }}
                    enablePoweredByContainer={false}
                    minLength={2}
                    returnKeyType={'search'}
                    onPress={(data, details = null) => {
                        dispatch(
                            setOrigin({
                                location: details.geometry.location,
                                description: data.description,
                            }),
                        );
                        dispatch(setDestination(null));
                    }}
                    fetchDetails={true}
                    query={{
                        key: GOOGLE_MAPS_APIKEY,
                        language: 'en',
                    }}
                    placeholder="Where From?"
                    nearbyPlacesAPI="GooglePlacesSearch"
                    debounce={400}
                />
                <NavOptions />
                <NavFavorites />
            </View>
        </SafeAreaView>
    );
};
