import React, {useState, useEffect} from 'react'
import { View, Text, Image, StyleSheet, Pressable } from 'react-native'
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

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#152A53', '#000000']} style={styles.linearStyle}>
        <Image source={Images.ads} style={styles.imageAds} resizeMode={"contain"}/>
        {dashboardData && <View style={{
          alignItems: 'center'
        }}>
          <Text style={{
            color: '#9D9FA0',

          }}>
            24H Changes 
            <Text style={{color: '#05BE90'}}>   +{dashboardData['24hourchange']}</Text>
          </Text>
          <Text style={{
            color: 'white',
            fontSize: 44,
            fontWeight: 'bold',
            marginTop: 12
          }}>${dashboardData['total_asset']}</Text>
        </View>}
        <Pressable style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: pressed ? 'darkgray' : '#05BE90',
          borderRadius: 4,
          padding: 8,
          width: "90%",
          marginTop: 36
        }} hitSlop={18} onPress={onDeposit}>
            <Image source={Images.download} style={{height: 18, width:18, marginRight: 12,}} resizeMode="contain" />
            <Text style={{
              fontWeight: "bold",
              fontSize: 16,
              color: 'white'
            }}>Deposit</Text>
        </Pressable>
        <Pressable style={{
          position: 'absolute',
          bottom: 24,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 4,
          padding: 8,
          width: "90%",
          marginTop: 36
        }} hitSlop={18} onPress={onLogout}>
            <Text style={{
              fontWeight: "bold",
              fontSize: 16,
              color: '#FF5460'
            }}>Logout</Text>
        </Pressable>
        
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
    paddingHorizontal: 18,
    alignItems: 'center',
    paddingTop: 16,
  },
  imageAds: {
    width: '90%',
    marginBottom: 28,
  }
})

export default Dashborad