import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import FillerComponent from '../screens/FillerComponent';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
      sceneContainerStyle= {{backgroundColor: 'white'}}
      screenOptions={{
        tabBarLabel: () => false,
        headerLeftContainerStyle: {marginLeft: 10, marginTop: 2},
        headerLeft: () => (
          <Ionicons name="chevron-back" size={25} color="black" />
        ),
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Experience Journey',
          headerTransparent: true,
          headerTitleStyle: {fontWeight: '800'},
          tabBarStyle: {elevation: 0, borderTopWidth: 0},
          tabBarIcon: ({color, size}) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Test1"
        component={FillerComponent}
        options={{
          tabBarIcon: ({color, size}) => (
            <Ionicons name="sync" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Test2"
        component={FillerComponent}
        options={{
          tabBarIcon: ({color, size}) => (
            <Fontisto name="pie-chart-1" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Test3"
        component={FillerComponent}
        options={{
          tabBarIcon: ({color, size}) => (
            <Ionicons name="swap-horizontal" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
