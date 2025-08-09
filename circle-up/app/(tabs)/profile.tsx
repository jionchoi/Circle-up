import { View, Text, Image, TouchableOpacity, TextInput, ScrollView} from 'react-native'
import { StyleSheet } from 'react-native'
import React, {useState} from 'react'
import CustomInput from '../components/CustomInput'
import ActivityInput from '../components/ActivityInput';
import RatingStars from '../components/RatingStars';

const profile = () => {
  const [name, setName] = useState('Margaret James');
  const [description, setDescription] = useState('Loves reading and morning walks!');
  const [email, setEmail] = useState('margaretjames@gmail.com');
  const [mobile, setMobile] = useState('+3458834565');
  return (
    <ScrollView style={styles.scrollContainer}>
      <Text>profile</Text>
      <View style = {styles.profileImagecontainer}>
        <Image source = {require('../../assets/images/elderly_pfp_2.png')}
        style = {styles.profileImage}/>
        <TouchableOpacity style = {styles.editIconContainer}>
          <Image source = {require('../../assets/icons/pencil.png')}
          style = {styles.editIcon}/>
        </TouchableOpacity>
      </View>

         {/*Name*/}
    <View style={styles.textFieldContainer}>
        <TextInput
          style={styles.nameInput}
          value={name}
          onChangeText={setName}
          placeholder="Enter your name"
          placeholderTextColor="#999"
        />
      </View>
    
      
   {/*Bio*/}
  <View style={styles.textFieldContainer}>
        <TextInput
          style={styles.descriptionInput}
          value={description}
          onChangeText={setDescription}
          placeholder="Enter your description"
          placeholderTextColor="#999"
          multiline
        />
      </View>

      {/* Rating Display */}
      <View style={styles.ratingContainer}>
        <View style={styles.ratingRow}>
          <Text style={styles.ratingLabel}>Rating:</Text>
          <View style={styles.starsContainer}>
            <RatingStars
              rating={4.2}
              onRatingChange={() => {}}
              size={16}
              readonly={true}
            />
            <Text style={styles.ratingText}>4.2</Text>
          </View>
        </View>
        <Text style={styles.ratingCount}>(15 ratings)</Text>
      </View>
   

             {/* Input field container */}
       <View style = {styles.inputFieldsContainer}>
         <CustomInput icon = {require('../../assets/icons/email.png')} placeholder = 'Enter your email address' value={email}/>
         <CustomInput icon = {require('../../assets/icons/phone.png')} placeholder = 'Enter your mobile address' value={mobile}/>
       </View>

             {/* Activity Field */}
       <View style = {styles.ActivityRow}>
         <ActivityInput  placeholder = 'Activity'/>
        <ActivityInput placeholder = 'Activity'/>
        <ActivityInput placeholder = 'Activity'/>
       </View>
      


      {/*Joined events*/}
    <View style={styles.textFieldContainer}>
        <Text style={{fontSize: 18, fontWeight: 'bold', textAlign: 'left'}}>Joined Events</Text>
      </View>

  </ScrollView>

  )
}

export default profile

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  profileImagecontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60,},
  profileImage: {
    width: 140,
    height: 140,
    borderRadius: 50,
  },
  editIconContainer: {
    height:31,
    width: 31,
    backgroundColor: '#FFA500',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -30,
    marginLeft: 70,
  },
  editIcon: {
    width: 18,
    height: 18,
    alignSelf: 'center',
    marginTop: 5,
  },
  inputFieldsContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  textFieldContainer: {
    marginTop: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
 nameInput: {
    fontSize: 22,          // Bigger font for name
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  descriptionInput: {
    fontSize: 14,          // Smaller font for description
    color: '#555',
    textAlign: 'center',
    marginTop: 5,
    paddingHorizontal: 20,
  },
  textfieldContainer2: {
    marginTop: 20,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  ActivityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 20,
  },
  ratingContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  ratingLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginRight: 8,
  },
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 4,
  },
  ratingCount: {
    fontSize: 14,
    color: '#666',
  },
   
 
})

