import { StyleSheet, TextInput, View, Image, ImageSourcePropType } from 'react-native'
import React from 'react'

type CustomInputProps = {

  icon: ImageSourcePropType;
  placeholder: string;
  value?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({ icon, placeholder, value }) => {
  return (
    <View style={styles.container}>
      <View style={styles.emailimagecontainer}>
        <Image source={icon} style={styles.emailImage} />
      </View>
      <View style={styles.inputFieldsContainer}>
        <TextInput
          style={styles.textInput}
          placeholder={placeholder}
          placeholderTextColor="#999"
          value={value}
        />
      </View>
    </View>
  )
}

export default CustomInput

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // Lay children horizontally
    alignItems: 'center', // Vertically center icon and input
    borderWidth: 1,
    borderColor: '#000', // valid color
    paddingHorizontal: 10,
    height: 40,
    marginVertical: 10,
  },
  emailimagecontainer: {
    height: 20,
    width: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  emailImage: {
    width: 20,
    height: 20,
  },
  inputFieldsContainer: {
    flex: 1,
    height: '100%',
  },
  textInput: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
})
