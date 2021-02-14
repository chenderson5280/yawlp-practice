import React, { useEffect, useState } from "react";
import { useDispatch, useSelector  } from "react-redux";
import { Text, View, StyleSheet, ScrollView, TextInput, Button } from "react-native";
import RestaurantCard from "./RestaurantCard";

const apiKey =
    "LO81kFLdyFLoVs3DBFFlmaVmlcultviiznp8lal92j1fmX_MLUeSQ4pB62B-y7Mvdam2kEM8fLcRSS9po2c8WGBX-lJkS33iTa_wqW5p92VrPk5PwepySJzjfv4mYHYx";

const apiUrl =
    "https://api.yelp.com/v3/businesses/search?term=restuarants&location=Denver";

export default function RestaurantsContainer() {
    const dispatch = useDispatch();
    const restaurants = useSelector((state) => state.restaurants);
    const [searchTerm, setSearchTerm] = useState('')


    //gotta use 'useEffect' for fetch() / dispatch(HOOK) to store
    useEffect(() => {
        fetch(apiUrl, {
        headers: {
            Authorization: `Bearer ${apiKey}`,
        },
        })
        .then((response) => response.json())
        .then(({ businesses }) =>
            dispatch({ type: "SET_RESTAURANTS", restaurants: businesses })
        );
    }, []);


    const showRestaurants = () =>
        restaurants.map((restaurant,i) => {
        return <RestaurantCard 
            key={restaurant.id} 
            restaurant={restaurant} 
            index={i + 1} 
            />
        });

        
        //takes the value of the input, from user and sets the new value to 'searchTerm' used below in TextInput
        //also no need for event here - Native allows 'text' 
        const handleSearchText = (text) => {
            setSearchTerm(text)
        }

        const handleSearch = () => {
            const updateURL = `https://api.yelp.com/v3/businesses/search?term=restuarants&location=${searchTerm}`
        
            fetch(updateURL, {
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                },
                })
                .then(response => response.json())
                .then(({businesses}) => dispatch({type: "SET_RESTAURANTS", restaurants: businesses}))
        }

    return(
        <>
        <View style={styles.searchContainer}>
            {/* got this to work with 'flex: 0.1' */}
            <TextInput 
                style={styles.search}
                placeholder='Enter Location'
                onChangeText={handleSearchText} 
                value={searchTerm} 
            />
            <Button 
                style={styles.button}
                onPress={handleSearch}
                title='Search'
            />
        </View>

        {/* using scroll view extends the list beyond the ios screen */}
        <ScrollView style={styles.container}>
            {showRestaurants()}
        </ScrollView>
        </>
    ) 
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 15, 
    },
    search: { 
        flex:2, 
        height: 40, 
        borderColor:'gray', 
        borderWidth:1,
        marginHorizontal: 10,
        paddingHorizontal: 10 
    },
    button: { 
        flex: 1 
    },
    searchContainer: {
        flexDirection: 'row', width: '100%',
        margin: 5
    }


});
