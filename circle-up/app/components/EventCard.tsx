import { View, Text, TouchableOpacity, Image, Button } from 'react-native'
import React from 'react'
import Event from '@/interfaces/interfaces'
import { Link, useRouter } from 'expo-router'
import { images } from '@/constants/images'

const EventCard = ({ id, title, host, location, date, poster_path }: Event) => {

    const router = useRouter();
    // inside EventCard component
    const capacity = 6
    const participants = [
        { id: 'u1', avatar: { uri: 'https://i.pravatar.cc/64?img=1' } },
        { id: 'u2', avatar: { uri: 'https://i.pravatar.cc/64?img=2' } },
        { id: 'u3', avatar: { uri: 'https://i.pravatar.cc/64?img=3' } },
        { id: 'u4', avatar: { uri: 'https://i.pravatar.cc/64?img=4' } },

    ]

    const extra = Math.max(participants.length - capacity, 0)

    return (
        <Link href={`/event/${id}`} asChild className=''>
            <TouchableOpacity className='w-full' activeOpacity={0.7}>
                <View className='w-full h-[29rem] bg-gray-200 rounded-xl mt-5'>
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

                    {/* Avatars row — pinned just above the button */}
                    <View className="absolute right-3 bottom-16 flex-row items-center">
                        {Array.from({ length: capacity }).map((_, i) => {
                            const overlap = i === 0 ? 0 : -8;
                            const z = capacity - i // leftmost gets biggest zIndex

                            // If there are more participants than slots, show +N in the last slot
                            if (i === capacity - 1 && extra > 0) {
                                return (
                                    <View
                                        key={`extra`}
                                        className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white items-center justify-center"
                                        style={{ marginLeft: overlap, zIndex: z }}
                                    >
                                        <Text className="text-xs font-semibold">+{extra}</Text>
                                    </View>
                                )
                            }

                            const p = participants[i]
                            return p ? (
                                <Image
                                    key={p.id}
                                    source={p.avatar}
                                    className="w-8 h-8 rounded-full border-2 border-white "
                                    style={{ marginLeft: overlap, zIndex: z }}
                                />
                            ) : (
                                <View
                                    key={`empty-${i}`}
                                    className="w-8 h-8 rounded-full bg-gray-200 border-2 border-black"
                                    style={{ marginLeft: overlap, zIndex: z  }}
                                />
                            )
                        })}
                    </View>

                    <TouchableOpacity
                        className="absolute bottom-3 right-3 bg-gray-300 rounded-full px-5 py-2 items-center justify-center"
                        onPress={(e) => {
                            e.stopPropagation() // prevent Link navigation
                            // TODO: handle join action
                        }}
                        activeOpacity={0.7}
                    >
                        {/* if joined, disable the button and change the text to Joined and then if they press again, unjoin it*/}
                        <Text className="font-semibold">Join</Text>
                    </TouchableOpacity>


                </View>

            </TouchableOpacity >
        </Link >
    )
}

export default EventCard