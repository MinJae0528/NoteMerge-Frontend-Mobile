import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View } from "react-native";
import Home from "../screens/Home";
import MyInfo from "../screens/MyInfo";
import Login from "../screens/Login";
import Notes from "../screens/Notes";
import Calendar from "../screens/Calendar";
import Quiz from "../screens/Quiz";
import NoteDetail from "../screens/Notes/NoteDetail";
import QuizDetail from "../screens/Quiz/QuizDetail";
import QuizResult from "../screens/Quiz/QuizResult";

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
      <Stack.Screen
        name="NoteDetail"
        component={NoteDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="QuizDetail"
        component={QuizDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="QuizResult"
        component={QuizResult}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
