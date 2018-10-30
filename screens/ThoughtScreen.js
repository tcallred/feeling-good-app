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
import CardView from 'react-native-cardview'
import moment from 'moment'
import c from "../constants/Constants";

export default class ThoughtScreen extends React.Component {

    state = {
        text: ''
    };

    textRef = React.createRef();

    componentDidMount(){
        this.textRef.current.focus();
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={() => {
                Keyboard.dismiss()
            }}>
                <View style={{flex: 1}}>
                    <NavBar leftTitle='Close' leftButtonPress={() => {
                        this.props.navigation.navigate('Home');
                    }}
                            rightTitle='Save' rightButtonPress={() => {
                        let tr = ThoughtsAndResponses.getInstance();
                        tr.addEntry(moment(), this.state.text);
                        this.props.navigation.navigate('Home');

                    }}/>

                    <View style={{padding: 15, flex: 1}}>
                        <Text style={styles.title}>Your thoughts</Text>
                        <CardView cardElevation={5} style={styles.textCard}>
                            <TextInput
                                ref = {this.textRef}
                                style={styles.editingResponse}
                                onChangeText={(text) => {
                                    this.setState({text})
                                }}
                                value={this.state.text}
                                multiline={true}
                                numberOfLines={1000}
                            />
                        </CardView>
                        <KeyboardSpacer/>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }

}

const styles = StyleSheet.create({
    textCard: {
        flex: 1,
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: c.themeColor,
    },
    editingResponse: {
        flex: 1,
        width: '100%',

    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10
    },
});