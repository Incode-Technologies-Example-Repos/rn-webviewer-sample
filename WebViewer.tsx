import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WebView, WebViewNavigation } from 'react-native-webview';

export interface WebViewerProps {
    url: string;
    onSuccess: () => void;
    onFail: () => void;
}

export enum VerificationStatus {
    PENDING = "PENDING",
    PASS = "PASS",
    FAIL = "FAIL"
  }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        marginTop: 40,
        marginBottom: 10
    },
    webview: {
        flex: 1
    }
});

export const WebViewer: React.FC<WebViewerProps> = ({ url, onSuccess, onFail }) => {
    const [currentUrl, setCurrentUrl] = useState<string | null>(null);

    if (!url || !onSuccess || !onFail) {
        console.log('Make sure url, onSuccess, onError have been set when using WebViewer.')
    }


    // The Incode ID URL will change as screens progress. 
    // The URL for a passing verification includes "success".  URL for failed verification includes "fail" or "error".
    const onNavigationChange = (navState: WebViewNavigation) => {
        const sourceUrl: string = navState?.url;
        if (sourceUrl) {
            if (sourceUrl.includes("success")) {
                setTimeout(()=> {
                    onSuccess();
                }, 3000);
            } else if (sourceUrl.includes("fail")) {
                setTimeout(()=> {
                    onFail();
                }, 3000);
            } else if (sourceUrl.includes("error")) {
                setTimeout(()=> {
                    onFail();
                }, 3000);
            }
            setCurrentUrl(sourceUrl);
        }
    };

    return (
        <View style={styles.container}>
            <WebView
                style={styles.webview}
                useWebKit
                originWhitelist={['*']}
                allowsInlineMediaPlayback
                bounces={true}
                mediaPlaybackRequiresUserAction={false}
                mediaCapturePermissionGrantType="grantIfSameHostElsePrompt"
                source={{ uri: url }}
                startInLoadingState
                scalesPageToFit
                javaScriptEnabledAndroid={true}
                javaScriptEnabled={true}
                onNavigationStateChange={onNavigationChange}
            />
            <View style={{ padding: 10 }}>
                <Text>Current URL: {currentUrl}</Text>
            </View>
        </View>
    )

};