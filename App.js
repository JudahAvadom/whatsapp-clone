import { useAssets } from 'expo-asset';
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState, useContext } from 'react';
import { LogBox, Text } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from "./firebase";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ContextWrapper from './context/ContextWrapper';
import Context from "./context/Context";
import Signin from './screens/Signin';
import Profile from './screens/Profile';
import Photo from './screens/Photo';
import Chats from './screens/Chats'

LogBox.ignoreLogs([
  "Setting a timer",
  "AsyncStorage has been extracted from react-native core and will be removed in a future release.",
]);

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

function Home(){
  const {
    theme: { colors },
  } = useContext(Context);
  return (
    <Tab.Navigator screenOptions={({route}) => {
      return {
        tabBarLabel: () => {
          if (route.name === "photo") {
            return <Ionicons name="camera" size={20} color={colors.white} />;
          }
          else {
            return (
              <Text style={{ color: colors.white }}>
                {route.name.toLocaleUpperCase()}
              </Text>
          )};
        },
        tabBarShowIcon: true,
        tabBarLabelStyle: {
          color: colors.white,
        },
        tabBarIndicatorStyle: {
          backgroundColor: colors.white,
        },
        tabBarStyle: {
          backgroundColor: colors.foreground,
        },
      }
    }}>
      <Tab.Screen name="photo" component={Photo} />
      <Tab.Screen name="chats" component={Chats} />
    </Tab.Navigator>
  )
}

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const {
    theme: { colors },
  } = useContext(Context);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false);
      if (user) {
        setCurrentUser(user)
      }
    });
    return () => unsubscribe()
  }, [])
  if (loading) {
    return <Text>Loading...</Text>
  }
  return (
    <NavigationContainer>
      {!currentUser ? (
        <Stack.Navigator screenOptions={{
          headerShown: false
        }}>
          <Stack.Screen name='sigIn' component={Signin} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          screenOptions={{headerStyle: {
            backgroundColor: colors.foreground,
            shadowOpacity: 0,
            elevation: 0
          },
          headerTintColor: colors.white
          }}
        >
          {!currentUser.displayName && (
            <Stack.Screen
              name="Profile"
              component={Profile}
              options={{ headerShown: false }}
            />
          )}
          <Stack.Screen 
            name='home' 
            options={{title:'Whatsapp'}} 
            component={Home} 
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

function Main() {
  const [assets] = useAssets(
    require('./assets/icon-square.png'),
    require('./assets/chatbg.png'),
    require('./assets/user-icon.png'),
    require('./assets/welcome-img.png')
  )
  if (!assets) {
    return <Text>Loading...</Text>
  } else {
    return <ContextWrapper>
      <App />
    </ContextWrapper>
  }
}

export default Main