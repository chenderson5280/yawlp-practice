import React from "react";
import RestaurantsContainer from "../components/RestaurantsContainer";
import { SafeAreaView, StyleSheet, StatusBar } from "react-native";
// import {View} from 'react-native'

export default function HomeScreen(props) {
    return (
        <SafeAreaView style={styles.container}>
            <RestaurantsContainer />
        </SafeAreaView>
    );
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
});
