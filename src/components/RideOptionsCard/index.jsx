import { View, Text, SafeAreaView, TouchableOpacity, FlatList, Image, ScrollView, VirtualizedList } from 'react-native';
import React, { useState } from 'react';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectTravelTimeInformation } from '../../slices/navSlice';

const data = [
    { id: 'Uber-SM-987', title: 'Uber SM', multiplier: 0.7, image: 'https://links.papareact.com/3pn' },
    { id: 'Uber-X-123', title: 'UberX', multiplier: 1, image: 'https://links.papareact.com/3pn' },
    { id: 'Uber-XL-456', title: 'Uber XL', multiplier: 1.2, image: 'https://links.papareact.com/5w8' },
    { id: 'Uber-LUX-789', title: 'Uber LUX', multiplier: 1.75, image: 'https://links.papareact.com/7pf' },
];

const SURGE_CHARGE_RATE = 1.5;

export const RideOptionsCard = () => {
    const navigation = useNavigation();
    const [selected, setSelected] = useState(null);
    const travelTimeInformation = useSelector(selectTravelTimeInformation);

    return (
        <SafeAreaView className="bg-white flex-grow">
            <View className="absolute top-0 flex-1 self-stretch right-0 left-0 bg-white overflow-y-auto z-10">
                <TouchableOpacity
                    className="absolute top-3 left-5 p-3 rounded-full z-10"
                    onPress={() => navigation.navigate('NavigateCard')}>
                    <Icon name="chevron-left" type="font-awesome" />
                </TouchableOpacity>
                <Text className="text-center py-5 text-xl">Select a ride - {travelTimeInformation?.distance?.text}</Text>
            </View>
            <FlatList
                className="mt-20"
                data={data}
                keyExtractor={item => item.id}
                renderItem={({ item: { id, title, multiplier, image }, item }) => (
                    <View>
                        <TouchableOpacity
                            className={'flex-row items-center justify-between px-6 ' + (id === selected?.id && 'bg-gray-200')}
                            onPress={() => setSelected(item)}>
                            <Image className="w-[100] h-[100]" resizeMode="contain" source={{ uri: image }} />
                            <View className="-ml-6">
                                <Text className="text-xl font-semibold">{title}</Text>
                                <Text classname="">{travelTimeInformation?.duration?.text} Travel Time</Text>
                            </View>
                            <Text className="text-xl">
                                {new Intl.NumberFormat('en-gb', { style: 'currency', currency: 'GBP' }).format(
                                    (travelTimeInformation?.duration?.value * SURGE_CHARGE_RATE * multiplier) / 100,
                                )}
                            </Text>
                        </TouchableOpacity>
                        {selected?.id === item?.id && (
                            <View>
                                <TouchableOpacity
                                    className={'bg-black py-3 m-3 ' + (!selected && 'bg-gray-200')}
                                    disabled={!selected}>
                                    <Text className="text-center text-white text-xl">Choose {selected?.title}</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                )}
            />
        </SafeAreaView>
    );
};
