import React from 'react'
import { SafeAreaView, StyleSheet, StatusBar, Text, ScrollView } from "react-native";
// import {  } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import RestaurantCard from '../components/RestaurantCard'

export default function FavoritesScreen() {
    const favorites = useSelector(state => state.favorites)

    const displayFavorites = () => {
            return favorites.map((favorite, i) => {
                return <RestaurantCard 
            restaurant={favorite}
            key={favorite.id}
            index= {i + 1}
            />
        })
    }
    
    return (
        <SafeAreaView style={styles.container}>
            <Text> favorites screen </Text>
            <ScrollView style={styles.restaurantContainer}>
                {displayFavorites()}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        width: "100%",
        paddingTop: Platform.OS === "ios" ? StatusBar.currentHeight : 0,
        // alignItems: "center",
        // justifyContent: "center",
    },
    restaurantContainer: {
        flex: 1,
        margin: 15
    }
});
