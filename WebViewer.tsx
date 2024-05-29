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
    webview: {
        flex: 1
    }
});

export const WebViewer: React.FC<WebViewerProps> = ({ url, onSuccess, onFail }) => {
    const [currentUrl, setCurrentUrl] = useState<string | null>(null);

    if (!url || !onSuccess || !onFail) {
        console.log('Make sure url, onSuccess, onError have been set when using WebViewer.')
    }


    // The Incode ID URL within the Web View will change as you progress through screens. 
    // The URL for a passing verification includes "success".  URL for failed verification includes "fail" or "error".
    const onNavigationChange = (navState: WebViewNavigation) => {
        const sourceUrl: string = navState?.url;
        if (sourceUrl) {
            if (sourceUrl.includes("success")) {
                setTimeout(() => {
                    onSuccess();
                }, 3000);
            } else if (sourceUrl.includes("fail")) {
                setTimeout(() => {
                    onFail();
                }, 3000);
            } else if (sourceUrl.includes("error")) {
                setTimeout(() => {
                    onFail();
                }, 3000);
            }
            setCurrentUrl(sourceUrl);
        }
    };

    return (
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
    )
};