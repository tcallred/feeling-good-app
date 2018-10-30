import React from 'react';
import {
    View,
    TextInput,
    Button,
    StyleSheet,
    Text,
    ScrollView,
    Alert,
    TouchableOpacity,
    PanResponder,
    Animated,
    Dimensions,
    Keyboard
} from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer'
import ThoughtsAndResponses from "../components/ThoughtsAndResponses"
import NavBar from "../components/NavBar";
import CardView from 'react-native-cardview';
import c from "../constants/Constants";

const {height} = Dimensions.get('window');

export default class ResponseScreen extends React.Component {

    constructor(props) {
        super(props);
        const {navigation} = this.props;
        const id = navigation.getParam('id', 'NO-ID');

        let tr = ThoughtsAndResponses.getInstance();
        this.state = {
            text: tr.getResponseText(id),
            id: id,
            mode: 'viewing'
        };
    };

    textRef2 = React.createRef();

    resolve = () => {
        let tr = ThoughtsAndResponses.getInstance();
        Alert.alert(
            'Resolved?',
            'Are you satisfied with this thought and ready to delete it?',
            [
                {
                    text: 'Yes', onPress: () => {
                        Animated.timing(this._opacityValue, {
                            toValue: 0,
                            duration: 350,
                        }).start(()=>{
                            setTimeout(()=>{
                                tr.removeEntry(this.state.id);
                                this.props.navigation.navigate('Home');
                            }, 350);
                        });

                    }
                },
                {
                    text: 'Not yet', onPress: () => {
                    }
                }
            ]
        )
    };

    toViewingMode = () => {
        this.setState({mode: 'viewing'});
    };

    _panResponder = PanResponder.create({
        onMoveShouldSetPanResponder: (evt, gestureState) => {
            return true;
        },
        onPanResponderMove: (evt, gestureState) => {
            let moveTo = (gestureState.moveY - 65) ;
            if (moveTo < 0) moveTo = 0;
            if (gestureState.moveY >= height / 3) {
                Keyboard.dismiss();
            }
            this._animatedValue.setValue(moveTo - 45);
        },
        onPanResponderTerminationRequest: (evt, gestureState) => true,
        onPanResponderRelease: (evt, gestureState) => {
            // console.warn("Delta:", gestureState.dy);
            // console.warn("Orig:", gestureState.y0);
            // if (gestureState.dy >= 100 && gestureState.y0 < height / 2 ||
            // gestureState.dy < 100 && gestureState.dy > -100 && gestureState.y0 > height / 2)
            if (gestureState.vy > 0){
                // To Bottom of the screen
                Keyboard.dismiss();
                Animated.spring(this._animatedValue, {
                    toValue: height - 165,
                    // duration: 250,
                    bounciness: 8

                }).start();
            }
            // if (gestureState.dy <= -100 && gestureState.y0 > height / 2 ||
            // gestureState.dy > -100 && gestureState.dy < 100 && gestureState.y0 < height / 2)
            else if (gestureState.vy <= 0) {
                // To top
                Animated.spring(this._animatedValue, {
                    toValue: 0,
                    // duration: 250,
                    bounciness: 8

                }).start();
                this.textRef2.current.focus();
            }
        },
        onPanResponderTerminate: (evt, gestureState) => {},
    });

    _animatedValue = new Animated.Value(0);

    _opacityValue = new Animated.Value(1);

    render() {
        let tr = ThoughtsAndResponses.getInstance();
        return (
            <View style={{flex: 1}}>
                <NavBar
                    leftTitle= {this.state.mode === 'viewing' ? 'Save' : ''}
                    leftButtonPress={() => {
                        tr.setResponse(this.state.id, this.state.text);
                        this.props.navigation.navigate('Home');
                    }}
                    rightTitle={this.state.mode === 'viewing' ? 'Resolve' : 'Done'}
                    rightColor={this.state.mode === 'viewing' ? c.secondaryColor : c.themeColor}
                    rightButtonPress={this.state.mode === 'viewing' ? this.resolve : this.toViewingMode}/>

                <Animated.View style={{padding: 10, flex: 1, justifyContent: 'space-between', opacity: this._opacityValue}}>
                    <CardView cardElevation={4} style={styles.thoughtCard}>
                        <View style={styles.headingArea}>
                            <Text>Your thought:</Text>
                        </View>
                        <ScrollView style={{paddingTop: 4}}>
                            <Text>
                                {tr.getThoughtText(this.state.id)}
                            </Text>
                        </ScrollView>
                    </CardView>

                    {this.state.mode === 'viewing' &&

                    <CardView cardElevation={4} style={styles.responseCard}>
                        <View style={styles.headingArea}>
                            <View style={{width: 15, height:10}}/>
                            <Text>Your response:</Text>
                            <TouchableOpacity onPress={() => {
                                this.setState({mode: 'editing'}, () => {
                                    this._animatedValue.setValue(height - 165);
                                    Animated.spring(this._animatedValue, {
                                        toValue: 0,
                                        bounciness: 8

                                    }).start();
                                    this.textRef2.current.focus();
                                });


                            }}>
                                <Text style={{color:c.themeColor, fontSize: 20}}>Edit</Text>
                            </TouchableOpacity>
                        </View>
                        {this.state.text === '' &&
                        <Text style={{color: '#cecece', fontStyle: 'italic'}}>No response yet.</Text>}
                        <ScrollView style={{paddingTop: 4}}>
                            <Text>
                                {this.state.text}
                            </Text>
                        </ScrollView>
                    </CardView>

                    }

                    {this.state.mode === 'editing' && <View style={styles.spacer}/>}



                    {this.state.mode === 'editing' &&
                    <Animated.View style={{position: 'absolute', right: 10, left: 10, top: this._animatedValue}}>
                        <View {...this._panResponder.panHandlers} style={

                            {
                                height:45
                            }
                        }/>
                        <CardView cardElevation={6} style={styles.editingResponse}>
                            <View {...this._panResponder.panHandlers} style={
                                [styles.headingArea, {
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }]
                            }>
                                <View style={styles.dragLine}/>
                                <Text>Your response: </Text>
                            </View>
                            <TextInput
                                style={styles.textBoxInput}
                                ref={this.textRef2}
                                onChangeText={(text) => {
                                    this.setState({text: text})
                                }}
                                value={this.state.text}
                                multiline={true}
                                numberOfLines={1000}
                            />
                            <KeyboardSpacer/>
                        </CardView>
                    </Animated.View>
                    }

                </Animated.View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    thoughtCard: {
        flex: 1,
        backgroundColor: 'white',
        width: '100%',
        marginTop: 5,
        marginBottom: 5,
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: c.themeColor,
    },
    responseCard: {
        flex: 1,
        backgroundColor: 'white',
        width: '100%',
        marginTop: 5,
        marginBottom: 5,
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: c.secondaryColor,
    },
    headingArea: {
        width: '100%',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexWrap: 'nowrap',
        flexDirection: 'row',
        paddingBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#e7e7e7'

    },
    editingResponse: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        // position: 'absolute',
        height: 465,
        // right: 10,
        // left: 10,
        // top: 30,
        borderWidth: 1,
        borderColor: c.secondaryColor,
    },
    dragLine: {
        backgroundColor: '#d0d0d0',
        height: 5,
        width: 60,
        borderRadius: 10,
        marginBottom: 5
    },
    textBoxInput: {
        flex: 1
    },
    spacer: {
        width: '100%',
        height: 50
    },

});