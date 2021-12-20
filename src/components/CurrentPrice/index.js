import React from "react";
import { View, Text } from "react-native"

import styles from "./styles"

const CurrentPrice = ({lastCotation}) => {
    return(
        <View style={styles.headerPrice}>
            <Text style={styles.currentPrice}>{lastCotation.toFixed(2)}</Text>
            <Text style={styles.textPrice}>última cotação</Text>
        </View>
    )
}

export default CurrentPrice