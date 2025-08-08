import { View, Text, Image } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { icons } from '@/constants/icons'

const _layout = () => {
    return (
        <Tabs>
            {/* each Tabs.Screen indicates the navigation component in the tab*/}
            <Tabs.Screen
                name='index'
                options={{
                    title: "Explore",
                    headerShown: false,
                    tabBarIcon: ( {focused} ) => (
                        <>
                            <Image source={icons.group} className="size-5 my-2"/>
                        </>
                    )
                }}
            />

            <Tabs.Screen
                name='location'
                options={{
                    title: "Location",
                    headerShown: false
                }}
            />

            <Tabs.Screen
                name='group'
                options={{
                    title: "Groups",
                    headerShown: false,
                    tabBarIcon: ( {focused} ) => (
                        <>
                            <Image source={icons.group} className="size-5 my-2"/>
                        </>
                    )
                }}
            />

            <Tabs.Screen
                name='profile'
                options={{
                    title: "Profile",
                    headerShown: false
                }}
            />
        </Tabs>
    )
}

export default _layout