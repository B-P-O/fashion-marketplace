import React from 'react';
import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
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
  const insets = useSafeAreaInsets();

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
            height: 60 + insets.bottom, // Add safe area bottom for home indicator
            paddingBottom: insets.bottom + 8,
            paddingTop: 8,
          },
        }}
      >
        <Tabs.Screen
          name="home"
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
            title: 'List',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                name="grid"
                color={color}
                focused={focused}
                title="List"
              />
            ),
          }}
        />

        <Tabs.Screen
          name="sellers"
          options={{
            title: 'Brand',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                name="people"
                color={color}
                focused={focused}
                title="Brand"
              />
            ),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: 'Me',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                name="person"
                color={color}
                focused={focused}
                title="Me"
              />
            ),
          }}
        />
      </Tabs>
      
      <StatusBar style="dark" /> 
    </>
  );
};

export default TabsLayout;