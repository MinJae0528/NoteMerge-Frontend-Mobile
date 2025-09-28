import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View } from "react-native";
import Home from "../screens/Home";
import MyInfo from "../screens/MyInfo";
import Login from "../screens/Login";
import Notes from "../screens/Notes";
import Calendar from "../screens/Calendar";
import Quiz from "../screens/Quiz";

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Notes"
        component={Notes}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Calendar"
        component={Calendar}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Quiz"
        component={Quiz}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MyInfo"
        component={MyInfo}
        options={{ title: "My Info" }}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
