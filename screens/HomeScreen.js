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
import ThoughtsAndResponses from "../components/ThoughtsAndResponses"
import ThoughtCard from '../components/ThoughtCard'
import NavBar from "../components/NavBar";
import c from "../constants/Constants";


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

                <NavBar leftTitle='   ' leftButtonPress={() => {}}
                        rightTitle='   ' rightButtonPress={() => {
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
                                    <ThoughtCard id={value.id} datetime={value.datetime} text={value.thought}/>
                                </TouchableOpacity>
                            })}
                        <TouchableOpacity style={styles.plusButton} onPress={() => {
                            this.props.navigation.navigate('Thought')
                        }}>
                            <Text style={styles.plusButtonText}>+</Text>
                        </TouchableOpacity>
                        <View style={styles.dummy}/>
                    </View>
                </ScrollView>
            </View>
        );
    }

}



const styles = StyleSheet.create({
    title: {
        fontSize: 22,
        fontWeight: 'bold'
    },
    subtitle: {
        fontSize: 12
    },
    outerContainer: {
        padding: 15
    },
    thoughtsContainer: {
        flexWrap: 'wrap',
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    plusButton: {
        // fontSize: 20,
        height: c.cardSize,
        width: c.cardSize,
        margin: c.cardMargin,
        borderWidth: 1,
        borderColor: c.themeColor,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    plusButtonText: {
        fontSize: 30,
        color: c.themeColor
    },
    // Dummy exists to align plus button
    dummy: {
        height: c.cardSize,
        width: c.cardSize,
        margin: c.cardMargin
    }
});
