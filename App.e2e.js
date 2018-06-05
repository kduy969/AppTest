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

import AndroidWebView from 'react-native-webview-android'
//var SITE_URL = "http://192.168.1.3:5000/";
var SITE_URL = "https://fierce-fortress-80373.herokuapp.com/";
const SOURCE_DEFAULT = {uri: SITE_URL, method: "GET"};

var FormData = require('form-data');
import axios from 'axios';

var instance = axios.create({
    baseURL: SITE_URL,
    timeout: 20000,
    headers: {
        'User-Agent': 'Mozilla/5.0',
        "Connection": "keep-alive"
    }
});


type Props = {};

async function requestStoragePermission() {
    try {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
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
        result: 'init',
        source: SOURCE_DEFAULT
    }

    constructor() {
        super();
        this.onNavigationStateChange = this.onNavigationStateChange.bind(this);
    }

    componentDidMount() {
        if (Platform.OS === 'android')
            requestStoragePermission();

    }

    onNavigationStateChange(event) {
        //At navigation change event, I check page title, url, and navigationType... to determine what is current page
        if (Platform.OS === 'android') {
            if (event.url.includes('fileupload') && event.loading === false) {
                //mean upload process done ( can be error or success )
                let result = 'success';
                if (event.title === 'Error')
                    result = 'fail'
                this.setState({
                    state: 'uploadDone',
                    result: result
                })
            }

            if (!event.url.includes('fileupload') && event.url.length > SITE_URL.length && event.loading === true) {
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
            if (event.navigationType === "click") {
                //this mean open link
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
                <AndroidWebView
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
                    source={this.state.source}
                    //url={SITE_URL}
                    style={styles.container}/>
                <Button testID={'buttonPostUpload'} onPress={() => {
                    const form = new FormData();
                    form.append("filetoupload", {
                        uri: "https://facebook.github.io/react-native/docs/assets/favicon.png",
                        type: 'image/png', // or photo.type
                        name: 'favicon.png'
                    });
                    instance.post('fileupload', form, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        },
                    }).then((res) => {
                        console.log(res);
                        let result = 'success';
                        if (!res.data.includes("File path is")) {
                            result = 'fail'
                        }
                        this.setState({
                            state: 'uploadDone',
                            result: result,
                            source: {html: res.data}
                        })
                    }).catch((err) => {
                        console.log(err);
                    })
                }} title={''}/>
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
