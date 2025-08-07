import { View, Text, TouchableOpacity, Image, Button } from 'react-native'
import React from 'react'
import Event from '@/interfaces/interfaces'
import { Link } from 'expo-router'
import { images } from '@/constants/images'

const EventCard = ({ id, title, host, location, date, poster_path }: Event) => {
    return (
        <Link href={`/event/${id}`} asChild>
            <TouchableOpacity className='w-full'>
                <View className='w-full h-[27rem] bg-gray-200 rounded-xl mt-5'>
                    <Text className='w-full text-center my-3'>
                        hosted by{' '}
                        <Text
                            className='text-blue-600 underline'
                            onPress={(e) => {
                                e.stopPropagation() // prevents the outer card link from triggering
                                router.push(`/host/${encodeURIComponent(host)}`) // or use a hostId if you have one
                            }}
                        >
                            {host}
                        </Text>
                    </Text>

                    <Image source={images.cat} className="w-full px-3 rounded-xl h-48" />


                    <View className='mt-4 ml-3'>
                        <Text className='font-bold text-xl mb-2'>{title}</Text>
                        <View className='flex-row'>
                            <Text>{location}</Text>
                            <Text> @{date}</Text>
                        </View>
                        <Text>Short description</Text>

                    </View>
                    
                    <Button title='Join Event'></Button>

                </View>

            </TouchableOpacity>
        </Link>
    )
}

export default EventCard