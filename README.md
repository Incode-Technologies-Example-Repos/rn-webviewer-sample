# Incode ID React Native Web Viewer Sample

This sample includes small SDK for using Incode ID within a React Native Web View. 


## Context

Web Views can be challenging to work with if an app contains camera features or sensors which require users to provide their permission. This app aims to remove that friction, so you can focus on Identity Verification. In addition to abstracting away nuanced Web View properties, this sample extends Web View adding extra convenience methods for handling pass and fail Identity Verification events to help simplify your Incode ID integration.

## Prerequisites

* Use Node.JS v22.11.1 (or risk it)

* This sample uses the popular React Native framework [Expo](https://expo.dev)  

* Install [Expo Go](https://expo.dev/go) on your phone or tablet


## Environment Variables

You will need to create a ```.env``` file.  This file holds the Incode ID URL.

```
EXPO_PUBLIC_INCODE_WEB_APP_URL=https://demo.incode.id/?client_id=<your-incode-id-clientid>
```


## Setup and Run

Use yarn or npm. 

__Yarn__

```
yarn

yarn run start

```

__NPM__

```
npm install
npm run start
```

After running the above commands the terminal will display a QR code.  Scan the QR code with your Phone to load the app.


## Usage

You will need to do 3 things to imlement Incode ID with our WebViewer component.


1.  Create an __onSuccess__ function.  This function will be fired when someone successfully passes Identity verification.

2. Create an __onFail__ function.   This function will be fired when someone cannot be identified.

3. Add the Web Viewer component to your renderer and make sure the URL, onSuccess and onFail properties are set.



```js

export default function App() {

  
  const handleSuccess = () => {
    console.log("Success!!");
  }

  const handleFail = () => {
    console.log("Fail!!");
  }

  return (
    <WebViewer url={WEB_APP_URL} onSuccess={handleSuccess} onFail={handleFail} />
  );
}

```
