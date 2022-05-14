import 'react-native-gesture-handler';
import React from 'react';
import {Image} from 'react-native'
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Icons from '../assets'

import HomeScreen from '../screens/HomeScreen';
import DashboradScreen from '../screens/Dashborad';
import LoginScreen from '../screens/LoginScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => {
    const iconStyle = {
        maxWidth: 25, 
        maxHeight: 25
    }
    return (
        <Tab.Navigator screenOptions={{
            tabBarShowLabel: false,
            tabBarStyle: { backgroundColor: "#000"},
        }}>
            <Tab.Screen name="HomeScreen" component={HomeScreen} options={{
                headerShown: false,
                tabBarIcon: ({focused}) => focused ? 
                    <Image source={Icons.tren_active} style={iconStyle} resizeMode={"contain"}/> : 
                    <Image source={Icons.tren_inactive} style={iconStyle} resizeMode={"contain"}/>
            }}/>
            <Tab.Screen name="Dashboard" component={DashboradScreen} options={{
                headerShown: false,
                tabBarIcon: ({focused}) => focused ? 
                    <Image source={Icons.nobi_active} style={iconStyle} resizeMode={"contain"}/> : 
                    <Image source={Icons.nobi_inactive} style={iconStyle} resizeMode={"contain"}/>
            }}/>
            {/* <Tab.Screen name="ProfileScreen" component={ProfileScreen} options={{
                headerShown: false,
                tabBarIcon: ({focused}) => focused ? 
                <Image source={Icons.user_active} style={iconStyle} resizeMode={"contain"}/> : 
                <Image source={Icons.user_inactive} style={iconStyle} resizeMode={"contain"}/>
            }}/> */}
        </Tab.Navigator>
    )
}

const TabBottom = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator >
                <Stack.Screen name="LoginScreen" component={LoginScreen} options={{
                    headerShown: false,
                    tabBarStyle: {
                        display: "none",
                    },
                }}/>
                <Stack.Screen name="Home" component={HomeStack} options={{
                    headerShown: false
                }}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default TabBottom