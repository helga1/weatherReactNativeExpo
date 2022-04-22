import { StatusBar } from 'expo-status-bar';
import React,{ useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location'
import WeatherInfo from "./components/WeatherInfo";
const WEATHER_API_KEY= 'ac12a0ca5453f498b906df3719be5f1a'
const BASE_WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?`
//const

export default function App() {
    const [errorMessage, setErrorMessage] = useState(null)
    const [currentWeather, setCurrentWeather] = useState(null)
    useEffect(() => {
        load()
    }, [])

    async function load() {
        try {
            let {status}
                = await Location.requestForegroundPermissionsAsync()
            if (status !== 'granted') {
                setErrorMessage('Access to location is needed to access the app')
                return
            }
            const location = await Location.getCurrentPositionAsync()
            const {latitude, longitude} = location.coords
            const weatherUrl = `${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}`
            const response = await fetch(weatherUrl)
            const result = await response.json()
            if (response.ok) {
                setCurrentWeather(result)
            } else {
                setErrorMessage(result.message)
            }

        } catch (error) {
            setErrorMessage(error.message)
        }
    }
    if (currentWeather) {

        return (
            <View style={styles.container}>
                <StatusBar style="auto"/>
                <View style={styles.main}>
                    <WeatherInfo currentWeather={currentWeather} />
                </View>
            </View>
        )
    } else {
    return (
        <View style={styles.container}>
            <Text>{errorMessage}
            </Text>
            <StatusBar style="auto"/>
        </View>)
    }}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
