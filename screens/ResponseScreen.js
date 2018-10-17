import React from 'react';
import {
    View,
    TextInput,
    Button,
    StyleSheet,
    Text,
    ScrollView,
    Alert
} from 'react-native';
import ThoughtsAndResponses from "../components/ThoughtsAndResponses"
import NavBar from "../components/NavBar";

export default class ResponseScreen extends React.Component {

    constructor(props) {
        super(props);
        const {navigation} = this.props;
        const id = navigation.getParam('id', 'NO-ID');

        let tr = ThoughtsAndResponses.getInstance();
        this.state = {text: tr.getResponseText(id), id: id};
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
                                    text: 'Not yet', onPress: () => {}
                                }
                            ]
                        )

                    }}/>
                <ScrollView style={{padding: 15}}>
                    <View style={styles.textShow}>
                        <Text>
                            {tr.getThoughtText(this.state.id)}
                        </Text>
                    </View>
                    <TextInput
                        style={styles.textBox}
                        onChangeText={(text) => {
                            this.setState({text})
                        }}
                        value={this.state.text}
                        multiline={true}
                        numberOfLines={1000}
                    />
                    <View style={{height: 800, width: '100%'}}/>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    textBox: {
        backgroundColor: 'white',
        height: 200,
        width: '100%',
        borderRadius: 10
    },
    textShow: {
        backgroundColor: 'white',
        width: '100%',
        marginBottom: 15,
        padding: 10,
        borderRadius: 10
    }
});