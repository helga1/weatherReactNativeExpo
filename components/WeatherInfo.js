import React, { Component } from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'
import TextAncestorContext from "react-native-web/dist/exports/Text/TextAncestorContext";
import {colors} from '../utils/index'

const {PRIMARY_COLOR, SECONDARY_COLOR} = colors

export default function WeatherInfo({ currentWeather}) {
    const {
        main:{temp},
        weather:[details],
        name,
    }
        = currentWeather
    const {icon, main, description} =details
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`
    return (
      <View style = {styles.weatherInfo}>
          <Text style = {styles.name}>{name}</Text>
          <Image style = {styles.weatherIcon} source ={{url: iconUrl}} />
        <Text style={ styles.textPrimary}> {temp}° </Text>
          <Text style = {styles.weatherDescription}>{description}</Text>
          <Text style={styles.textSecondary}>{main}</Text>
      </View>
    )
}

const styles =StyleSheet.create({
    weatherInfo:{
        alignItems: 'center'
    },
    weatherDescription:{
        textTransform: 'uppercase'
    },
    weatherIcon:{
        width:100,
        height:100
    },
    name:{
        textTransform: 'uppercase'
    },
    textPrimary:{
        fontSize:40,
        color:PRIMARY_COLOR
    },
    textSecondary:{
        fontSize: 20,
        color: SECONDARY_COLOR,
        fontWeight: '500',
        margin:10,
    }
})