import React, {useState, useEffect} from 'react'
import { View, Image, Text, SafeAreaView, ScrollView, StyleSheet, TextInput, Pressable } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';

import Icon from '../assets'

import {getList} from '../services/DataServices'

// TODO: add loading component

const HomeScreen = (props) => {
  const [listData, setData] = useState([])
  const [baseData, setBaseData] = useState([])
  const [errorState, setError] = useState(null)
  const [searchText, setSearchText] = useState(null)

  useEffect(() => {
    getData()
  },[])

  const getData = async () => {
    try {
      const lists = await getList();
      if(lists.status !== 200) throw new Error('Something went wrong!')
      setData(lists.data)
      setBaseData(lists.data)
    } catch (error) {
      setError(error.message)
    }
  }

  const onSearch = (value) => {
    setSearchText(value)
    if(value === '') {
      setData(baseData)
    } else {
      const filtered = baseData.filter(data => data.ticker.toLowerCase().includes(value.toLowerCase()))
      setData(filtered)
    }

  }

  const onGoback = () => {
    props.navigation.goBack()
  }

  const Coin = (coinData) => {
    const {image, ticker, amount} = coinData.data
    const fixedAmmount = Number.parseFloat(amount).toFixed(8);
    
    return (
      <View style={styles.coinContainer}>
        <View style={styles.coinHead}>
          <Image source={{uri: image}} style={styles.coinImage} resizeMode={"contain"}/>
          <Text style={styles.coinTicker}>{ticker}</Text>
        </View>
        <Text style={styles.coinAmmount}>{fixedAmmount}</Text>
      </View>
    )
  }

  const SearchBox = () => {
    return (
      <View style={styles.searchContainer}>
        <Pressable onPress={onGoback}>
          <Image source={Icon.back_outline} style={styles.backIcon} resizeMode="contain" />
        </Pressable>
        <View style={styles.searchBox}>
          <Image source={Icon.search} style={styles.searchIcon} resizeMode="contain" />
          <TextInput
            style={styles.searchInputBox}
            hitSlop={{
              top: 18,
              bottom: 18,
              left: 18,
              right: 18,
            }}
            onChangeText={value => onSearch(value)}
            value={searchText}
            placeholder={'Search'}
            placeholderTextColor={"#EAEAEA"}
            />
        </View>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#152A53', '#000000']} style={styles.linearStyle}>
        <SearchBox />
        {listData.length > 0 && <ScrollView style={styles.contentWrapper}>
          {
            listData?.map((coin, idx) => {
              return <Coin data={coin} key={idx+Math.random()}/>
            })
          }
        </ScrollView>}
      </LinearGradient>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  // Main Styles
  container: {
    flex: 1,
  },
  linearStyle: {
    flex: 1,
    paddingHorizontal: 18
  },
  contentWrapper: {
    flex: 1,
    marginTop: 18,
    marginBottom:4,
  },
  //Coin Style
  coinContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomColor: 'white',
    borderBottomWidth: 0.41,
  },
  coinHead: {
    flexDirection: 'row',
  },
  coinImage: {
    width: 24, 
    height: 24, 
    marginRight: 8
  },
  coinTicker: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: 'white',
    fontSize: 16,
  },
  coinAmmount: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: 'white',
    fontSize: 16,
  },
  // Search Styles
  searchContainer: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  backIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
    marginLeft: -4
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 6,
    backgroundColor: '#223965',
    paddingHorizontal: 12,
    alignItems: 'center'
  },
  searchIcon: {
    width: 18,
    height: 18,
    marginRight: 12,
  },
  searchInputBox: {
    color: "#EAEAEA",
    height: 36,
    width: '100%',
  }
})

export default HomeScreen