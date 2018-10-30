import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button
} from 'react-native';

import c from "../constants/Constants";

export default class NavBar extends React.Component {


    render(){
        return (
            <View style={styles.bar}>
                <Button color={this.props.leftColor} title={this.props.leftTitle} onPress={this.props.leftButtonPress}/>
                <Button color={this.props.rightColor} title={this.props.rightTitle} onPress={this.props.rightButtonPress}/>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    bar: {
        width: '100%',
        height: 65,
        padding:5,
        paddingRight: 10,
        paddingLeft: 10,
        backgroundColor:'#f9f9f9',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        alignContent: 'flex-end',
        borderBottomWidth: 1,
        borderBottomColor: '#d3d3d3'
    },
});

NavBar.defaultProps = {
    leftColor: c.themeColor,
    rightColor: c.themeColor,
    leftTitle: '',
    rightTitle: '',
    leftButtonPress: ()=>{},
    rightButtonPress: ()=>{}
}