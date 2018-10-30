import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import CardView from 'react-native-cardview'
import moment from 'moment'
import c from "../constants/Constants";

export default class ThoughtCard extends React.Component {

    // constructor(props){
    //     super(props);
    //     this.state.datetime = props.datetime;
    //     this.state.id = props.id;
    // }

    render() {
        return (
            <View style={styles.cardContainer}>
                <CardView cardElevation={2} cornerRadius={20} style={styles.card}>
                    <Text style={styles.innerText}>{'   ' + this.props.text}</Text>
                </CardView>
                <Text style={{maxWidth: c.cardSize}}>{moment(this.props.datetime, 'YYYYMMDD').fromNow()}</Text>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    cardContainer: {
        alignItems: 'center',
        margin: c.cardMargin,
    },
    card: {
        height: c.cardSize,
        width: c.cardSize,
        backgroundColor: 'white'    ,
        marginBottom: 5,
        padding: 10,
        borderWidth: 1,
        borderColor: c.themeColor,
        // borderRadius: 20
    },
    innerText: {
        color: '#cecece',
        fontSize: 10
    }
});