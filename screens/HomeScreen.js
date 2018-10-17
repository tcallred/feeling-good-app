import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    StatusBar,
    Button,
    Alert
} from 'react-native';
import {LinearGradient} from 'expo'
import ThoughtsAndResponses from "../components/ThoughtsAndResponses"
import ThoughtCard from '../components/ThoughtCard'
import NavBar from "../components/NavBar";

export default class HomeScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tr: ThoughtsAndResponses.getInstance()
        };
        // this.props.navigation.addListener('willFocus', () => this.setState({tr: ThoughtsAndResponses.getInstance()}));
    }


    render() {
        return (
            <View style={{flex: 1}}>

                <NavBar leftTitle='Learn' leftButtonPress={() => {
                    Alert.alert('Pressed', 'ok');
                }}
                        rightTitle='Settings' rightButtonPress={() => {
                    Alert.alert('Pressed settings', 'ok')
                }}/>
                <ScrollView style={styles.outerContainer}>
                    <Text style={styles.title}>Recorded thoughts</Text>
                    <Text style={styles.subtitle}>Respond to these at any time</Text>
                    <View style={styles.thoughtsContainer}>
                        {
                            this.state.tr.getList().map((value) => {
                                return <TouchableOpacity key={value.id} onPress={() => {
                                    this.props.navigation.navigate('Response', {id: value.id})
                                }
                                }>
                                    <ThoughtCard id={value.id} datetime={value.datetime}/>
                                </TouchableOpacity>
                            })}
                        <View style={styles.plusButton}>
                            <Button title='New' style={styles.plusButton} onPress={() => {
                                this.props.navigation.navigate('Thought')
                            }}/>
                        </View>

                    </View>
                </ScrollView>
            </View>
        );
    }

}


const styles = StyleSheet.create({
    title: {
        fontSize: 22
    },
    subtitle: {
        fontSize: 12
    },
    outerContainer: {
        margin: 15
    },
    thoughtsContainer: {
        flexWrap: 'wrap',
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    plusButton: {
        // fontSize: 20,
        height: 88,
        width: 88,
        margin: 15,
        borderWidth: 2,
        borderColor: '#333',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
