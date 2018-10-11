import React from 'react';
import {Platform, StatusBar, StyleSheet, View} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import {AppLoading, Asset, Font, Icon} from 'expo';
import HomeScreen from "./screens/HomeScreen";
import ThoughtScreen from "./screens/ThoughtScreen";
import ThoughtsAndResponses from "./components/ThoughtsAndResponses"


export default class App extends React.Component {
    state = {
        isLoadingComplete: false
    };

    constructor(props) {
        super(props);
        let tr = ThoughtsAndResponses.getInstance();
        tr.addEntry('Oct 5, 2018 4:15', 'Lorem ipsum dolor sit amet');
        tr.addEntry('Oct 3, 2018 4:26', 'Lorem ipsum dolor sit amet, consecutor blah blah');
    }


    render() {
        if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
            return (
                <AppLoading
                    startAsync={this._loadResourcesAsync}
                    onError={this._handleLoadingError}
                    onFinish={this._handleFinishLoading}
                />
            );
        } else {
            return <RootStack/>
            // return (
            //     <View style={styles.container}>
            //         <StatusBar hidden={true}/>
            //         <RootStack/>
            //     </View>
            // );
        }
    }

    _loadResourcesAsync = async () => {
        // return Promise.all([
        //     Asset.loadAsync([
        //         require('./assets/images/robot-dev.png'),
        //         require('./assets/images/robot-prod.png'),
        //     ]),
        //     Font.loadAsync({
        //         // This is the font that we are using for our tab bar
        //         ...Icon.Ionicons.font,
        //         // We include SpaceMono because we use it in HomeScreen.js. Feel free
        //         // to remove this if you are not using it in your app
        //         'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
        //     }),
        // ]);
    };

    _handleLoadingError = error => {
        // In this case, you might want to report the error to your error
        // reporting service, for example Sentry
        console.warn(error);
    };

    _handleFinishLoading = () => {
        this.setState({isLoadingComplete: true});
    };
}
const RootStack = createStackNavigator(
    {
        Home: HomeScreen,
        Thought: ThoughtScreen,
    },
    {
        initialRouteName: 'Home',
    }
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffecec',
    },
});
