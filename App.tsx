import React, { useState } from 'react';
import { StyleSheet, View, Text} from 'react-native';
import { WebViewer, VerificationStatus } from './WebViewer';

const WEB_APP_URL = process.env.EXPO_PUBLIC_INCODE_WEB_APP_URL as string;

const styles = StyleSheet.create({
  container: {
      flex: 1
  },
  center: {
    margin: 'auto',
    fontSize: 34
  }

});

export default function App() {
  const [verificationStatus, setVerificationStatus] = useState<VerificationStatus>(VerificationStatus.PENDING);

  
  const handleSuccess = () => {
    console.log("Success!!");
    setVerificationStatus(VerificationStatus.PASS);
  }

  const handleFail = () => {
    console.log("Fail!!");
    setVerificationStatus(VerificationStatus.FAIL);
  }

  return (
    <View style={styles.container}>
      {verificationStatus === VerificationStatus.PENDING && <WebViewer url={WEB_APP_URL} onSuccess={handleSuccess} onFail={handleFail} />}
      {verificationStatus === VerificationStatus.PASS &&  <Text style={styles.center}>Passed</Text>}
      {verificationStatus === VerificationStatus.FAIL &&  <Text style={styles.center}>Failed</Text>}
    </View>  
  );
}
