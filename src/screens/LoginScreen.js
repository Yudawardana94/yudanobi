import React, {useState, useEffect} from 'react'
import { Image, View, Text, TextInput, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

import Icon from '../assets/icons'

const LoginScreen = (props) => {
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });
  const [secureTextEntry, setSecureTextEntry] = useState(true)

  const onChangeText = (field, input) => {
    setLoginForm(value => {
      return {...value, [field]: input}
    })
  }

  const onLogin = () => {
    props.navigation.navigate("Home")
  }

  const onPasswordVisiblePressed = () => {
    setSecureTextEntry(value => !value)
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#152A53', '#000000']} style={styles.linearStyle}>
        {/* Image wrapper */}
        <View style={styles.topLogo}>
          <Image source={Icon.logo} style={styles.logo} resizeMode={"contain"}/>
        </View>

        {/* Input Wrapper */}
        <View style={styles.inputWrapper}>
          {/* Email */}
          <View style={styles.input}>
            <Text style={styles.textLabel}>E-mail Address</Text>
            <TextInput 
              onChangeText={value => onChangeText('email', value)} 
              value={loginForm.email} 
              style={styles.textInput} 
              placeholder={'Enter E-mail Address'} 
              placeholderTextColor={"#9D9FA0"}
            />
          </View>
          
          {/* Password */}
          <View style={styles.input}>
            <Text style={styles.textLabel}>Password</Text>
            <View style={styles.passswordInput}>
              <TextInput 
                onChangeText={value => onChangeText('password', value)} 
                value={loginForm.password} 
                style={styles.textInput} 
                placeholder={'Enter Password'} 
                placeholderTextColor={"#9D9FA0"}
                secureTextEntry={secureTextEntry}
              />
              <Pressable 
                onPress={onPasswordVisiblePressed}
                hitSlop={18}>
                  <Image 
                    source={secureTextEntry ? Icon.eye_closed : Icon.eye_open} 
                    style={styles.passwordLogo} 
                    resizeMode={"contain"}
                  />
                </Pressable>
            </View>
          </View>

        </View>

        {/* Button Wrapper */}
        <TouchableOpacity 
          style={styles.loginButton} 
          onPress={() => onLogin()}
        >
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      </LinearGradient>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  linearStyle: {
    flex: 1,
    paddingHorizontal: 24
  },
  topLogo: {
    alignItems: "center",
    marginTop: 24,
  },
  logo: {
    height: 18
  },
  loginButton: {
    backgroundColor: '#2045F1',
    width: '90%',
    height: 40,
    flex: 1,
    position: 'absolute',
    bottom: 12,
    alignSelf: 'center',
    alignItems: 'center',
    padding: 8,
    borderRadius: 6,
  },
  loginText: {
    fontWeight: '400', 
    fontSize: 16, 
    color: 'white'
  },
  inputWrapper: {
    marginTop: 44,
  },
  textInput: {
    backgroundColor: "#11203C",
    color: "#9D9FA0",
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },
  textLabel: {
    color: "#9D9FA0",
    marginBottom: 14,
  },
  input: {
    marginVertical: 6.5,
  },
  passswordInput: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: "#11203C",
    paddingRight: 16
  },
  passwordLogo: {
    height: 18,
    width: 18
  }
})

export default LoginScreen