import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button
} from 'react-native';

import c from "../constants/Constants";

export default class TextBar extends React.Component {


    render(){
        return (
            <View style={styles.bar}>
                <Text style={styles.title}>{this.props.text}</Text>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    bar: {
        width: '100%',
        minHeight: 80,
        padding:5,
        paddingBottom: 10,
        paddingRight: 10,
        paddingLeft: 15,
        backgroundColor:'#f9f9f9',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        alignContent: 'flex-end',
        borderBottomWidth: 1,
        borderBottomColor: '#d3d3d3'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold'
    },
});

TextBar.defaultProps = {
    text: ''
};