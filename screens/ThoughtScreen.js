import React from 'react';
import {
    View,
    TextInput,
    Button,
    StyleSheet,
    Text, Alert
} from 'react-native';
import ThoughtsAndResponses from "../components/ThoughtsAndResponses"
import NavBar from "../components/NavBar";

export default class ThoughtScreen extends React.Component {

    state = {
        text: ''
    };


    render() {
        return (
            <View style={{backgroundColor:'#fad5d0', flex:1}}>
                <NavBar leftTitle='Close' leftButtonPress={() => {
                    this.props.navigation.navigate('Home');
                }}
                        rightTitle='Save' rightButtonPress={() => {
                    let tr = ThoughtsAndResponses.getInstance();
                    tr.addEntry('Just now', this.state.text);
                    this.props.navigation.navigate('Home');

                }}/>
                <View style={{padding: 15, flex: 1}}>
                    <TextInput
                        style={styles.textBox}
                        onChangeText={(text) => {
                            this.setState({text})
                        }}
                        value={this.state.text}
                        multiline={true}
                        numberOfLines={1000}
                    />
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    textBox: {
        backgroundColor: 'white',
        flex: 1,
        width: '100%',
        borderRadius: 10
    }
});