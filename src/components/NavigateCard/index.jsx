import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from '@env';
import { useDispatch, useSelector } from 'react-redux';
import { selectDestination, setDestination } from '../../slices/navSlice';
import { useNavigation } from '@react-navigation/native';
import { NavFavorites } from '../NavFavorites';
import { Icon } from 'react-native-elements';

export const NavigateCard = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const destination = useSelector(selectDestination);

    return (
        <SafeAreaView className="bg-white flex-1">
            <Text className="text-center text-xl py-5">Hey Tom</Text>
            <View className="border-t border-gray-200 flex-shrink">
                <View>
                    <GooglePlacesAutocomplete
                        styles={{
                            container: {
                                backgroundColor: 'white',
                                paddingTop: 20,
                                flex: 0,
                            },
                            textInput: {
                                fontSize: 18,
                                backgroundColor: '#DDDDDF',
                                borderRadius: 10,
                            },
                            textInputContainer: {
                                paddingHorizontal: 20,
                                paddingBottom: 0,
                            },
                        }}
                        enablePoweredByContainer={false}
                        minLength={2}
                        returnKeyType={'search'}
                        onPress={(data, details = null) => {
                            dispatch(
                                setDestination({
                                    location: details.geometry.location,
                                    description: data.description,
                                }),
                            );
                            navigation.navigate('RideOptionsCard');
                        }}
                        fetchDetails={true}
                        query={{
                            key: GOOGLE_MAPS_APIKEY,
                            language: 'en',
                        }}
                        placeholder="Where to?"
                        nearbyPlacesAPI="GooglePlacesSearch"
                        debounce={400}
                    />
                </View>
                <NavFavorites />
            </View>
            <View className="flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100">
                <TouchableOpacity
                    disabled={!destination}
                    className={
                        'flex flex-row justify-between bg-black w-24 px-4 py-3 rounded-full ' + (!destination && 'bg-gray-300')
                    }
                    onPress={() => navigation.navigate('RideOptionsCard')}>
                    <Icon class name="car" type="font-awesome" color="white" size={16} />
                    <Text className="text-white text-center">Rides</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex flex-row w-24 px-4 py-3 rounded-full justify-between" disabled={true}>
                    <Icon name="fast-food-outline" type="ionicon" color="black" size={16} />
                    <Text className="text-center">Eats</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};
