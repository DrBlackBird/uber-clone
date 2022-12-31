import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { HomeScreen } from './src/screens/HomeScreen';
import { MapScreen } from './src/screens/MapScreen';
import { store } from './src/store/store';
import { KeyboardAvoidingView, Platform } from 'react-native';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <SafeAreaProvider>
                    <KeyboardAvoidingView
                        className="flex-1"
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        keyboardVerticalOffset={Platform.OS === 'ios' ? -64 : 0}>
                        <Stack.Navigator>
                            <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
                            <Stack.Screen name="MapScreen" component={MapScreen} options={{ headerShown: false }} />
                        </Stack.Navigator>
                    </KeyboardAvoidingView>
                </SafeAreaProvider>
            </NavigationContainer>
        </Provider>
    );
}
