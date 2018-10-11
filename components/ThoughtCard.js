import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

export default class ThoughtCard extends React.Component {

    // constructor(props){
    //     super(props);
    //     this.state.datetime = props.datetime;
    //     this.state.id = props.id;
    // }

    render() {
        return (
            <View style={styles.cardContainer}>
                <View style={styles.card}/>
                <Text>{this.props.datetime}</Text>
            </View>
        );
    }

}

const styles = StyleSheet.create({
   cardContainer: {
       alignItems: 'flex-start',
       margin: 15,
   },
   card: {
       height: 88,
       width: 88,
       backgroundColor: 'white',
       marginBottom: 5,
       borderWidth: 2,
       borderColor: '#333',
       borderRadius: 20
   }
});