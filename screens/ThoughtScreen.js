import React from 'react';
import {
    View,
    TextInput,
    Button,
    StyleSheet,
    Text,
    Alert,
    Keyboard,
    TouchableWithoutFeedback
} from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import ThoughtsAndResponses from "../components/ThoughtsAndResponses";
import NavBar from "../components/NavBar";

export default class ThoughtScreen extends React.Component {

    state = {
        text: ''
    };


    render() {
        return (
            <TouchableWithoutFeedback onPress={()=> {Keyboard.dismiss()}}>
                <View style={{flex: 1}}>
                    <NavBar leftTitle='Close' leftButtonPress={() => {
                        this.props.navigation.navigate('Home');
                    }}
                            rightTitle='Save' rightButtonPress={() => {
                        let tr = ThoughtsAndResponses.getInstance();
                        tr.addEntry('Just now', this.state.text);
                        this.props.navigation.navigate('Home');

                    }}/>
                    <View style={{padding: 15, flex: 1}}>
                        <Text style={styles.title}>Your thoughts</Text>
                        <TextInput
                            style={styles.textBox}
                            onChangeText={(text) => {
                                this.setState({text})
                            }}
                            value={this.state.text}
                            multiline={true}
                            numberOfLines={1000}
                        />
                        <KeyboardSpacer/>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }

}

const styles = StyleSheet.create({
    textBox: {
        backgroundColor: 'white',
        flex: 1,
        width: '100%',
        borderRadius: 10,
        padding: 10
    },
    title: {
        fontSize: 22,
        marginBottom: 10
    },
});