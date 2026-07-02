import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from "@react-navigation/native-stack";
import { Platform } from "react-native";

import { HomeScreen } from "modules/Home/screens/HomeScreen";
import UI from "modules/UI/const";

import type { RootStackParamList } from "navigation";

const Stack = createNativeStackNavigator<RootStackParamList>();

const HEADER_OPTIONS = {
  title: "Sample App",
  headerLargeTitleEnabled: true,
  headerTransparent: true,
  headerBlurEffect: Platform.OS === "ios" ? "systemChromeMaterial" : undefined,
  headerStyle: {
    backgroundColor:
      Platform.OS === "ios" ? "transparent" : UI.COLORS.BACKGROUND,
  },
  headerLargeStyle: {
    backgroundColor:
      Platform.OS === "ios" ? "transparent" : UI.COLORS.BACKGROUND,
  },
  contentStyle: {
    backgroundColor: UI.COLORS.BACKGROUND,
  },
} as NativeStackNavigationOptions;

export function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={HEADER_OPTIONS}
      />
    </Stack.Navigator>
  );
}
