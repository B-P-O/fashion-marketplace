import React from 'react';
import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, Text } from 'react-native';
// import { SFSymbol } from 'expo-symbols';
import { Ionicons } from '@expo/vector-icons';

interface TabIconProps {
  name: keyof typeof Ionicons.glyphMap;
  color: string;
  focused: boolean;
  title: string;
}

const TabIcon: React.FC<TabIconProps> = ({ name, color, focused, title }) => {
  return (
    <View className="items-center justify-center pt-1">
      <Ionicons 
        name={name} 
        size={24} 
        color={color}
      />
      <Text
        className={`text-xs mt-1 ${
          focused ? 'font-rSemibold' : 'font-rMedium'
        }`}
        style={{ color }}
      >
        {title}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#228B22', // primary color
          tabBarInactiveTintColor: '#A0AEC0', // gray-500
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: '#FFFFFF',
            borderTopWidth: 1,
            borderTopColor: '#E2E8F0',
            height: 60,
            paddingBottom: 8,
            paddingTop: 8,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                name="home"
                color={color}
                focused={focused}
                title="Home"
              />
            ),
          }}
        />

        <Tabs.Screen
          name="catalog"
          options={{
            title: 'Catalog',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                name="grid"
                color={color}
                focused={focused}
                title="Catalog"
              />
            ),
          }}
        />

        <Tabs.Screen
          name="sellers"
          options={{
            title: 'Sellers',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                name="people"
                color={color}
                focused={focused}
                title="Sellers"
              />
            ),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                name="person"
                color={color}
                focused={focused}
                title="Profile"
              />
            ),
          }}
        />
      </Tabs>
      
      <StatusBar style="dark" backgroundColor="#F8F8FF" />
    </>
  );
};

export default TabsLayout;