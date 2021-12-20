import React from "react";
import { View, Text, Image } from "react-native";

import styles from "./styles"

export default function QuotationsItems(props) {
    return(
        <View style={styles.mainContent}>
            <View style={styles.contextLeft}>
                <View style={styles.boxLogo}>
                    <Image
                        style={styles.logBitcoin}
                        source={require("../../../img/bitcoinyellow.png")}
                    />
                    <Text style={styles.dayQuotation}>{props.data}</Text>
                </View>
            </View>
            <View style={styles.contextRight}>
                <Text style={styles.price}>{props.valor.toFixed(2)}</Text>
            </View>
        </View>
    )
} 
