import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { useDispatch, useSelector  } from "react-redux";

export default function RestaurantCard({restaurant, index}) {

    
    const dispatch = useDispatch()
    const favorites = useSelector(state => state.favorites)

    
    const handleFavorite = () => {
        dispatch({type: "ADD_FAVORITE", favorite: restaurant})
        console.log(favorites, "favorites")
    }

    return (
        <View style={styles.container}>
            <Image style={styles.cardImage} source={{uri: restaurant.image_url}} />

            <View style={styles.infoContainer}>

                <View style={styles.rowView}>
                    <Text style={styles.name}>{index}. {restaurant.name}</Text>
                    <Text style={styles.price}>{restaurant.price} </Text>
                </View>

                <View style={styles.detailsContainer}>
                    <View style={styles.detailColumn}>
                        <Text style={styles.rating}> Rating: {restaurant.rating}</Text>
                        <Text style={styles.address}>{restaurant.location.address1}</Text>
                        <View style={[styles.rowView, {justifyContent: "flex-start"}]}>
                            {restaurant.categories.map(category => {
                                return <Text>{category.title}, </Text>
                            })}
                        </View>
                    </View>
                        <TouchableOpacity onPress={handleFavorite}>

                            <Ionicons  name='heart' size={24} color='red'  ></Ionicons>
                        </TouchableOpacity>
                    </View>

                <TouchableOpacity 
                    onPress={() => Linking.openURL(restaurant.url)}
                    style={styles.visitWebSiteButton}>
                    <Text style={styles.buttonText}>Visit Website</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderTopWidth: 2,
        borderTopColor: "hsl(0, 0%, 50%)",
        paddingVertical: 30, 
    },
    cardImage:{
        width:'100%',
        height: 150,
    },
    name: {
        fontSize: 17,
        fontWeight: "600"
    },
    infoContainer: {
        marginVertical: 15,
    },
    detailsContainer:{
        flexDirection: 'row'
    },
    detailColumn: {
        width: "50%"
    },
    rowView:{
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    price:{
        color: "green"
    },
    rating: {
        marginVertical:10,
    },
    address:{
        color: 'hsl(0, 0%, 50%)'
    },
    visitWebSiteButton: {
        backgroundColor: '#009fff',
        padding: 10,
        marginTop: 10,
        borderRadius: 6
    },
    buttonText: {
        textAlign: "center",
        color: "white",
        fontSize: 16
    }

})
