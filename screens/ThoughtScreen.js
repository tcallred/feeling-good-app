import React from 'react';
import {
    View,
    TextInput,
    Button,
    StyleSheet,
    Text
} from 'react-native';
import ThoughtsAndResponses from "../components/ThoughtsAndResponses"

export default class ThoughtScreen extends React.Component {

    state = {
        text: ''
    };


    render() {
        return (
            <View>
                <TextInput style={styles.textBox} onChangeText={(text) => {
                    this.setState({text})
                }} value={this.state.text}/>
                <Button title='Save' onPress={() => {
                    let tr = ThoughtsAndResponses.getInstance();
                    tr.addEntry('Just now', this.state.text)}
                }/>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    textBox: {
        backgroundColor: 'white',
        height: 200,
        width: 100
    }
});