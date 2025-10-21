import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "./screens/login";
import RegisterScreen from "./screens/RegisterScreen";
import Home from "./screens/Home";
import EditarPerfil from "./screens/EditarPerfil";
import Lembretes from "./screens/Lembretes";


const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="EditarPerfil" component={EditarPerfil} />
                <Stack.Screen name="Lembretes" component={Lembretes} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}