import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button
} from 'react-native';

export default class NavBar extends React.Component {


    render(){
        return (
            <View style={styles.bar}>
                <Button title={this.props.leftTitle} onPress={this.props.leftButtonPress}/>
                <Button title={this.props.rightTitle} onPress={this.props.rightButtonPress}/>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    bar: {
        width: '100%',
        height: 70,
        padding:5,
        paddingRight: 10,
        paddingLeft: 10,
        backgroundColor:'#f5f5f5',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        alignContent: 'flex-end'
    },

});