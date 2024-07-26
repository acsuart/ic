import React, { useEffect, useState } from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack"
import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import HomeScreen from "../screens/Home";

import { useAuth } from "./AuthContext";
import ProfileScreen from "../screens/Profile";
import imgPath from "./imgPath";
import MyDataScreen from "../screens/MyData";
import SignupScreen from "../screens/SignupScreen";
import LoginPage from "../screens/LoginScreen";
import Form1Screen from "../forms/Form1";
import Form2Screen from "../forms/Form2";
import Form3Screen from "../forms/Form3";
import Docs1Screen from "../forms/Docs1";
import Docs2Screen from "../forms/Docs2";
import Docs3Screen from "../forms/Docs3";
import Docs4Screen from "../forms/Docs4";
import FormPEPScreen from "../forms/FormPep";
import SimScreen from "../screens/SimulatorUser";
import NewBeneficiario from "../forms/NewBenef";


const HomeStackNavigator = createStackNavigator();
const ProfileStackNavigator = createStackNavigator();



export const HomeStack = () => {

  return (
    <HomeStackNavigator.Navigator initialRouteName="HOME" screenOptions={{ headerShown: false }}>
      <HomeStackNavigator.Screen name="HOME" component={HomeScreen} />
      <HomeStackNavigator.Screen name="INGRESAR" component={LoginPage} />
      <HomeStackNavigator.Screen name="REGISTRO" component={SignupScreen} />
    </HomeStackNavigator.Navigator>
  );
};


export const ProfileStack = () => {
  return (
    <ProfileStackNavigator.Navigator initialRouteName="MIS DATOS" screenOptions={{ headerShown: false }} >
      <ProfileStackNavigator.Screen name="SIMULADOR" component={SimScreen} />
      <ProfileStackNavigator.Screen name="MIS DATOS" component={MyDataScreen} />
      <ProfileStackNavigator.Screen name="GENERALES" component={Form1Screen} />
      <ProfileStackNavigator.Screen name="FINANCIEROS" component={Form2Screen} />
      <ProfileStackNavigator.Screen name="BENEFICIARIOS" component={Form3Screen} />
      <ProfileStackNavigator.Screen name="NEW BENEFICIARIOS" component={NewBeneficiario} />
      <ProfileStackNavigator.Screen name="INE FRONTAL" component={Docs1Screen} />
      <ProfileStackNavigator.Screen name="INE REVERSO" component={Docs2Screen} />
      <ProfileStackNavigator.Screen name="CDOMICILIO" component={Docs3Screen} />
      <ProfileStackNavigator.Screen name="CBANCARIA" component={Docs4Screen} />
      <ProfileStackNavigator.Screen name="PEP" component={FormPEPScreen} />
    </ProfileStackNavigator.Navigator>
  );
};




const TabProfile = createBottomTabNavigator();
function MyTabPro() {
  return (
    <TabProfile.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false
      }}>



      <TabProfile.Screen
        name="MIS DATOS PROFILE"
        component={ProfileStack}
        options={{
          tabBarLabelStyle: { color: "black", fontSize: 18 },
          tabBarStyle: { backgroundColor: "white" },
          tabBarIcon: ({ color, size }) => (
            <Image source={imgPath.icUser} style={{ width: 30, height: 35, tintColor: '#343466', marginTop: 13, marginBottom: 5 }} />
          ),
        }}
      />

      <TabProfile.Screen
        name="SIMULADOR"
        component={SimScreen}
        options={{

          tabBarLabelStyle: { color: "white", fontSize: 18 },
          tabBarStyle: { backgroundColor: "white" },

          tabBarIcon: ({ color, size }) => (
            <Image source={imgPath.tabmoney} style={{ width: 30, height: 30, tintColor: '#343466', marginTop: 13, marginBottom: 5 }} />
          ),

        }}
      />
    </TabProfile.Navigator>
  )

}

export default function Navigation() {
  const { user } = useAuth();
  const [id_User, setId_User] = useState(null);

  useEffect(() => {
    if (user && !id_User) {
      setId_User(user.usuarioId);
    }
  }, [id_User, user]);

  return (
    <NavigationContainer>
      {user ? <MyTabPro /> : <HomeStack />}
    </NavigationContainer>
  );
}