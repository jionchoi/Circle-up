import { View, Text, Image, TextInput } from 'react-native'
import React from 'react'
import { icons } from '@/constants/icons'

const SearchBar = () => {
  return (
    <View className="flex-row flex-1 mr-2 items-center rounded-full px-5 py-4">
      <Image source={icons.explore} className='size-5' resizeMode='contain' tintColor="#ab8bff" />
      <TextInput 
        onPress={() => {}}
        placeholder='Search for an event'
        value=''
        onChangeText={() => {}}
        className='flex-1 ml-2 text-white'

        />
    </View>
  )
}

export default SearchBar