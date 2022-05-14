import React, {useState, useEffect} from 'react'
import { View, Text, Image, StyleSheet, Pressable, SafeAreaView } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';

import {getDashboard} from '../services/DataServices'
import {destroyAsyncData} from '../services/AsyncService'
import Images from '../assets'

const Dashborad = (props) => {
  const [dashboardData, setDashboardData] = useState(null)
  const [pressed, setPressed] = useState(false)
  const [errorState, setError] = useState(null)

  useEffect(() => {
    initData()
  },[])

  const initData = async () => {
    try {
      const {data, status} = await getDashboard()
      if(status !== 200) throw new Error('Something went wrong when geting the data!')
      setDashboardData(data)
    } catch (error) {
      setError(error.message)
    }
  }

  const onDeposit = () => {
    setPressed(true)
    setTimeout(() => {
      setPressed(false)
    }, 5000);
  }

  const onLogout = async () => {
    props.navigation.navigate("LoginScreen")
    await destroyAsyncData()
  }

  const buttonStyle = dynamicButton(pressed)
  return (
    <View style={styles.container}>
      <LinearGradient colors={['#152A53', '#000000']} style={styles.linearStyle}>
        <SafeAreaView />
        <Image source={Images.ads} style={styles.imageAds} resizeMode={"contain"}/>
        {dashboardData && <View style={styles.dashboardWrapper}>
          <Text style={styles.textColor}>
            24H Changes 
            <Text style={styles.textColorGreen}>  +{dashboardData['24hourchange']}</Text>
          </Text>
          <Text style={styles.textDataValue}>${dashboardData['total_asset']}</Text>
        </View>}
        <Pressable style={buttonStyle.depositButton} hitSlop={18} onPress={onDeposit}>
            <Image source={Images.download} style={styles.buttonImage} resizeMode="contain" />
            <Text style={styles.buttonText}>Deposit</Text>
        </Pressable>
        <Pressable style={styles.logoutButton} hitSlop={18} onPress={onLogout}>
            <Text style={styles.logoutText}>Logout</Text>
        </Pressable>
        
      </LinearGradient>
    </View>
  )
}

const dynamicButton = (pressed) => StyleSheet.create({
  depositButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: pressed ? 'darkgray' : '#05BE90',
    borderRadius: 4,
    padding: 8,
    width: "90%",
    marginTop: 36
  },
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  linearStyle: {
    flex: 1,
    paddingHorizontal: 18,
    alignItems: 'center',
    paddingTop: 16,
  },
  imageAds: {
    width: '100%',
    marginBottom: 28,
  },
  // Dashboard Styles
  dashboardWrapper: {
    alignItems: 'center'
  },
  textColor: {
    color: '#9D9FA0'
  },
  textColorGreen: {
    color: '#05BE90'
  },
  textDataValue: {
    color: 'white',
    fontSize: 44,
    fontWeight: 'bold',
    marginTop: 12,
    // fontFamily: 'SignikaNegative-Bold'
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 16,
    color: 'white'
  },
  buttonImage: {
    height: 18,
    width:18,
    marginRight: 12,
  },
  logoutButton: {
    position: 'absolute',
    bottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    padding: 8,
    width: "90%",
    marginTop: 36
  },
  logoutText: {
    fontWeight: "bold",
    fontSize: 16,
    color: '#FF5460'
  }
})

export default Dashborad