import React, {useState, useEffect} from 'react'
import { ActivityIndicator,Image, View, Text, TextInput, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

import {userLogin, } from '../services/UserService'
import {getToken} from '../services/AsyncService'
import Icon from '../assets'

const LoginScreen = (props) => {
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });
  const [errorState, setError] = useState(null)
  const [secureTextEntry, setSecureTextEntry] = useState(true)
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    onCheckLogin()
  },[])

  const onChangeText = (field, input) => {
    setLoginForm(value => {
      return {...value, [field]: input}
    })
  }

  const onCheckLogin = async () => {
    let loged = await getToken();
    loged ? props.navigation.navigate("Home", {screen: "Dashboard"}) : null 
  }

  const onLogin = async () => {
    try {
      setLoading(true)
      setError(null)
      const {status, message} = await userLogin(loginForm);
      if(status !== 200) {
        setError(message)
        throw new Error(message)
      }
      setError(null)
      props.navigation.navigate("Home", {screen: "Dashboard"})
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const onPasswordVisiblePressed = () => {
    setSecureTextEntry(value => !value)
  }

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#152A53', '#000000']} style={styles.linearStyle}>
        <SafeAreaView />
        {/* Image wrapper */}
        <View style={styles.topLogo}>
          <Image source={Icon.logo} style={styles.logo} resizeMode={"contain"}/>
        </View>

        {/* Input Wrapper */}
        <View style={styles.inputWrapper}>
          {/* Error box */}
          {errorState && <View style={styles.errorWrapper}>
            <Text style={styles.errorText}>{errorState}</Text>
          </View>}

          {/* Email */}
          <View style={styles.input}>
            <Text style={styles.textLabel}>E-mail Address</Text>
            <View style={styles.textInputWrapper}>
              <TextInput 
                onChangeText={value => onChangeText('email', value)} 
                value={loginForm.email} 
                style={styles.textInput} 
                placeholder={'Enter E-mail Address'} 
                placeholderTextColor={"#9D9FA0"}
              />
            </View>
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
          disabled={isLoading}
          onPress={() => onLogin()}
        >
          {
            isLoading ? (
              <ActivityIndicator size={'small'} color="lime" />
            ) : (
              <Text style={styles.loginText}>Login</Text>
            )
          }
        </TouchableOpacity>
      </LinearGradient>
    </View>
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
    bottom: 36,
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
    color: "#9D9FA0",
    width: "100%"
  },
  textLabel: {
    color: "#9D9FA0",
    marginBottom: 14,
  },
  input: {
    marginVertical: 6.5,
  },
  textInputWrapper: {
    backgroundColor: "#11203C",
    height: 40,
    paddingHorizontal: 16,
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderRadius: 4,
  },
  passswordInput: {
    height: 40,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: "#11203C",
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  passwordLogo: {
    height: 18,
    width: 18
  },
  errorWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(252,100,110,0.6)',
    borderColor: '#FF4E5A',
    borderRadius: 4,
    borderWidth: 1,
    paddingTop: 3,
    paddingBottom: 6,
    paddingHorizontal: 8,
  },
  errorText: {
    color: "white",
    fontWeight: 'bold',
    textTransform: 'capitalize'
  }
})

export default LoginScreen