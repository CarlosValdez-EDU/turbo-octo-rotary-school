import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, Platform } from 'react-native';
import giftCard from '@assets/img/itunes-gift-card.png';
import copy from '@assets/icons/copy.png';
import { Item } from 'native-base';

class RedeemedCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <View style={{ width: '30%' }}>
                    <Image source={giftCard} style={styles.cardImage} />
                </View>
                <View style={styles.container}>
                    <Text numberOfLines={1} style={styles.codeText}>{this.props.gift}</Text>
                    <TouchableOpacity onPress={this.props.onPressCopy}>
                        <Image source={copy} style={styles.copyImage} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default RedeemedCard;

const styles = {
    mainContainer: {
        flexDirection: 'row',
        width: '90%',
        justifyContent: 'space-between',
        alignContent: 'center',
        alignSelf: 'center',
        marginTop: 20,
        padding: 10,
    },
    container: {
        backgroundColor: 'white',
        height: 60,
        width: '70%',
        borderRadius: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        ...Platform.select({
            ios: {
                shadowColor: '#808080',
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.2,
                shadowRadius: 1,
            },
            android: {
                elevation: 1,
            },
        }),
    },
    cardImage: {
        height: 60,
        width: 90
    },
    copyImage: {
        height: 20,
        width: 20
    },
    codeText: {
        color: 'gray',
        fontSize: 18,
    }
};