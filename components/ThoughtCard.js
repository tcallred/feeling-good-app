import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import CardView from 'react-native-cardview'
import moment from 'moment'

const cardSize = 120;
const cardMargin = 10;

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
                <Text style={{maxWidth: cardSize}}>{moment(this.props.datetime, 'YYYYMMDD').fromNow()}</Text>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    cardContainer: {
        alignItems: 'center',
        margin: cardMargin,
    },
    card: {
        height: cardSize,
        width: cardSize,
        backgroundColor: 'white'    ,
        marginBottom: 5,
        padding: 10,
        borderWidth: 1,
        borderColor: '#d3d3d3',
        // borderRadius: 20
    },
    innerText: {
        color: '#cecece',
        fontSize: 10
    }
});