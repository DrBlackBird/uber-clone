import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Icon } from 'react-native-elements';

const data = [
    {
        id: '123',
        icon: 'home',
        location: 'Home',
        destination: 'Code Street, London, UK',
    },
    {
        id: '456',
        icon: 'briefcase',
        location: 'Work',
        destination: 'London Eye, London, UK',
    },
];

export const NavFavorites = () => {
    return (
        <FlatList
            data={data}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={() => <View className="bg-gray-200 h-[1px]"></View>}
            renderItem={({ item: { location, destination, icon } }) => (
                <TouchableOpacity className="flex-row items-center p-5">
                    <Icon className="mr-4 rounded-full bg-gray-300 p-3" name={icon} type="ionicon" color="white" size={18} />
                    <View>
                        <Text className="font-semibold text-lg">{location}</Text>
                        <Text className="text-gray-500">{destination}</Text>
                    </View>
                </TouchableOpacity>
            )}
        />
    );
};
