import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {Ionicons} from '@expo/vector-icons' // Expo vector icons
import {MyPlantsScreen} from './screens/my-plants-screen/MyPlantsScreen'
import {ProfileScreen} from "./screens/profile-screen/Profile";
import {PlantIntakeStackScreen} from "./screens/add-plant-screen/plant-intake/PlantIntakeStack";
import {PlantOverviewStackScreen} from "./screens/plant-screen/PlantOverviewStackScreen";
import {PlantsOverviewStackScreen} from "./screens/my-plants-screen/PlantsOverviewStackScreen";

const Tab = createBottomTabNavigator()

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({route}) => ({
                    tabBarIcon: ({color, size}) => {
                        let iconName: any = 'leaf'

                        if (route.name === 'MyPlants') {
                            iconName = 'leaf'
                        } else if (route.name === 'AddPlant') {
                            iconName = 'add-circle-outline'
                        } else if (route.name === 'Profile') {
                            iconName = 'person-outline'
                        }

                        // Make icons subtle and small to match Apple style
                        return <Ionicons name={iconName} size={size * 0.8} color={color}/>
                    },
                    tabBarActiveTintColor: '#007AFF', // Apple's blue tint
                    tabBarInactiveTintColor: 'gray',
                    tabBarLabelStyle: {fontSize: 12, fontWeight: '600', paddingBottom: 4},
                    headerShown: false,
                    tabBarStyle: {
                        borderTopWidth: 0.5,
                        borderTopColor: '#ccc',
                    },
                })}
            >
                <Tab.Screen
                    name="MyPlants"
                    component={PlantsOverviewStackScreen}
                    options={{title: 'My Plants'}}
                />
                <Tab.Screen
                    name="AddPlant"
                    component={PlantIntakeStackScreen}
                    options={{title: 'Add Plant'}}
                />
                <Tab.Screen
                    name="Profile"
                    component={ProfileScreen}
                    options={{title: 'Profile'}}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}
