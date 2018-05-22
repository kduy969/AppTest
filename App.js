/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import {PermissionsAndroid} from 'react-native';


import React, {Component} from 'react';
import {WebView} from 'react-native';
import {
    Platform,
    Text,
    Button,
    View,
    StyleSheet,
    Linking
} from 'react-native';


//var { StyleSheet } = React;

var WebViewAndroid = require('react-native-webview-android');

var SITE_URL = "https://fierce-fortress-80373.herokuapp.com/";

type Props = {};

async function requestStoragePermission() {
    try {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("You can use the storage")
        } else {
            console.log("Storage request deny")
        }
    } catch (err) {
        console.warn(err)
    }
}

export default class App extends Component<Props> {

    state = {
        state: 'init',
        result: 'init'
    }

    constructor() {
        super();
        this.onNavigationStateChange = this.onNavigationStateChange.bind(this);
    }

    componentDidMount() {
        requestStoragePermission();
    }

    onNavigationStateChange(event) {
        //At navigation change event, I check page title, url, and navigationType... to determine what is current page
        if (Platform.OS === 'android') {
            if (event.title.includes('fileupload') && !event.url.includes('fileupload') && event.loading === true) {
                this.webview.stopLoading();
                Linking.canOpenURL(event.url).then(supported => {
                    if (supported) {
                        Linking.openURL(event.url);
                    } else {
                        console.log("Don't know how to open URI: " + this.props.url);
                    }
                });
            }
        } else {
            if (event.url.includes('fileupload') && typeof(event.navigationType) === 'undefined') {
                //mean upload process don ( can be error or success )
                let result = 'success';
                if (event.title === 'Error')
                    result = 'fail'
                this.setState({
                    state: 'uploadDone',
                    result: result
                })
            }
            if (!event.url.includes('fileupload') && event.url.length > SITE_URL.length && event.navigationType === 'click') {
                //mean user click on file link
                this.webview.stopLoading();
                //open link on native browser if support
                Linking.canOpenURL(event.url).then(supported => {
                    if (supported) {
                        Linking.openURL(event.url);
                    } else {
                        console.log("Don't know how to open URI: " + this.props.url);
                    }
                });
            }
        }

    }

    render() {
        if (Platform.OS === 'android')
            return (
                <WebViewAndroid
                    testID={'MyWebView123'}
                    ref={(ref) => {
                        this.webview = ref;
                    }}
                    javaScriptEnabled={true}
                    geolocationEnabled={false}
                    onNavigationStateChange={this.onNavigationStateChange}
                    builtInZoomControls={false}
                    url={SITE_URL} // or use the source(object) attribute...
                    style={styles.container}/>
            );
        else return (
            <View style={styles.fullSize} testID={'MyContainer'}>

                <WebView
                    testID={'MyWebView123'}
                    ref={(ref) => {
                        this.webview = ref;
                    }}
                    javaScriptEnabled={true}
                    geolocationEnabled={false}
                    onNavigationStateChange={this.onNavigationStateChange}
                    builtInZoomControls={false}
                    url={SITE_URL} // or use the source(object) attribute...
                    style={styles.container}/>
                <Button testID={'button321'} title={'Test'}/>
                <Text style={styles.hidden} testID={'MyStateText'}>{this.state.state}</Text>
                <Text style={styles.hidden} testID={'MyResultText'}>{this.state.result}</Text>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    hidden: {
        width: 0,
        height: 0,
    },
    fullSize: {
        width: '100%',
        height: '100%',
    }
});