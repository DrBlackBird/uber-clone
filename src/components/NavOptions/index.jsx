import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectOrigin } from '../../slices/navSlice';

const data = [
    {
        id: '123',
        title: 'Get a ride',
        image: 'https://links.papareact.com/3pn',
        screen: 'MapScreen',
    },
    {
        id: '456',
        title: 'Order food',
        image: 'https://links.papareact.com/28w',
        screen: 'EatsScreen',
    },
];

export const NavOptions = () => {
    const navigation = useNavigation();
    const origin = useSelector(selectOrigin);
    return (
        <FlatList
            data={data}
            horizontal
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
                <TouchableOpacity
                    onPress={() => navigation.navigate(item.screen)}
                    className="p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-40"
                    disabled={!origin}>
                    <View className={!origin ? 'opacity-20' : ''}>
                        <Image style={{ width: 120, height: 120, resizeMode: 'contain' }} source={{ uri: item.image }} />
                        <Text className="mt-2 text-md font-semibold">{item.title}</Text>
                        <Icon className="p-2 bg-black rounded-full w-10 mt-4" type="antdesign" name="arrowright" color="white" />
                    </View>
                </TouchableOpacity>
            )}
        />
    );
};
