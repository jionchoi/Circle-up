import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { icons } from '@/constants/icons'

const EventDetails = () => {
    return (
        <View className='flex-1'>
            <Text></Text>

            <TouchableOpacity className='absolute bottom-5 left-0 right-0 mx-5 bg-gray-300 rounded-xl py-3.5 flex flex-row items-center justify-center z-50'>
                <Image source={icons.group} className="size-5 mr-1 mt-0.5" />
                <Text className='text-base font-semibold'>Go back</Text>
            </TouchableOpacity>
        </View>
    )
}

export default EventDetails