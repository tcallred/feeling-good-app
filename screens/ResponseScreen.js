import React from 'react';
import {
    View,
    TextInput,
    Button,
    StyleSheet,
    Text,
    ScrollView,
    Alert,
    TouchableHighlight
} from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer'
import ThoughtsAndResponses from "../components/ThoughtsAndResponses"
import NavBar from "../components/NavBar";
import CardView from 'react-native-cardview'

export default class ResponseScreen extends React.Component {

    constructor(props) {
        super(props);
        const {navigation} = this.props;
        const id = navigation.getParam('id', 'NO-ID');

        let tr = ThoughtsAndResponses.getInstance();
        this.state = {
            text: tr.getResponseText(id),
            id: id,
            respOpen: false
        };
    }

    render() {
        let tr = ThoughtsAndResponses.getInstance();
        return (
            <View style={{flex: 1}}>
                <NavBar
                    leftTitle='Save'
                    leftButtonPress={() => {
                        tr.setResponse(this.state.id, this.state.text);
                        this.props.navigation.navigate('Home');
                    }}
                    rightTitle='Finish'
                    rightButtonPress={() => {
                        Alert.alert(
                            'Finished?',
                            'Are you satisfied with this thought?',
                            [
                                {
                                    text: 'Yes', onPress: () => {
                                        tr.removeEntry(this.state.id);
                                        this.props.navigation.navigate('Home');
                                    }
                                },
                                {
                                    text: 'Not yet', onPress: () => {
                                    }
                                }
                            ]
                        )

                    }}/>

                <View style={{padding: 15, flex: 1}}>
                    <CardView cardElevation={4} style={styles.textShow}>
                        <ScrollView >
                            <Text>
                                {tr.getThoughtText(this.state.id)}
                            </Text>
                        </ScrollView>
                    </CardView>

                    <TouchableHighlight onPress={() => this.setState({respOpen: true})} style={styles.bottomButton}>
                        <Text>Your Response</Text>
                    </TouchableHighlight>

                    {this.state.respOpen && <CardView cardElevation={6} style={styles.textBox}>
                        <TouchableHighlight onPress={() => this.setState({respOpen: false})}>
                            <Text>Your Response</Text>
                        </TouchableHighlight>
                        <TextInput style={styles.textBoxInput}

                                   onChangeText={(text) => {
                                       this.setState({text: text})
                                   }}
                                   value={this.state.text}
                                   multiline={true}
                                   numberOfLines={1000}
                        />
                        <KeyboardSpacer/>
                    </CardView>}

                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    textShow: {
        flex:1,
        backgroundColor: 'white',
        width: '100%',
        marginBottom: 15,
        padding: 10,
        borderRadius: 10,
        opacity: 0.5,
        borderWidth: 1,
        borderColor: '#d3d3d3',
    },
    textBox: {
        backgroundColor: 'white',
        borderRadius: 10,
        position: 'absolute',
        bottom: 0,
        right: 10,
        left: 10,
        top: 75,
        borderWidth: 1,
        borderColor: '#d3d3d3',
    },
    textBoxInput: {
        flex: 1,
        color: 'grey'
    },
    bottomButton: {
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        borderRadius: 10,

    }
});