import { StyleSheet, TextInput, View } from 'react-native'
import React from 'react'

type ActivityInputProps = {

  
  placeholder: string;
}

const ActivityInput: React.FC<ActivityInputProps> = ({  placeholder }) => {
  return (
    <View style={styles.container}>
      <View style={styles.activityimagecontainer}>
      </View>
      <View style={styles.inputFieldsContainer}>
        <TextInput
          style={styles.textInput}
          placeholder={placeholder}
          placeholderTextColor="#999"
        />
      </View>
    </View>
  )
}

export default ActivityInput

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // Lay children horizontally
    alignItems: 'center', // Vertically center icon and input
    borderWidth: 1,
    borderColor: '#D3D3D3', // valid color
    backgroundColor: '#D3D3D3',
    paddingHorizontal: 10,
    borderRadius: 5,
    height: 40,
    marginVertical: 10,
    width: 100, // Adjust width as needed
  },
  activityimagecontainer: {
    height: 10,
    width: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10, 
  },
  inputFieldsContainer: {
    flex: 1,
    height: '100%',
    width: 250
  },
  textInput: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center'
  },
})