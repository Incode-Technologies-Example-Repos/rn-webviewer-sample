## Handle the Verification Completed Notification (Optional)

To integrate verifications into your business application, you may provide a webhook URL to Incode to which you’ll receive a JSON object notifying the status of the verification and a token to be able to fetch necessary user information.

## Update Your Application

Once you receive the verification result, update your application accordingly to reflect the user's verification status.

By following these steps, you can easily integrate Incode ID Verifications into your application and enjoy a streamlined user onboarding process.

## Access Data from Identity Verification and/or Face Authentication Transactions Via API

## API Authentication[​](https://docs.incode.com/docs/omni-api/api/onboarding#authentication)

REST API calls must be authenticated using a custom HTTP header **X-Incode-Hardware-Id** — along with a JSON web token. Additionally, every API call has to contain **x-api-key** header with valid client API key.

## API Headers[​](https://docs.incode.com/docs/omni-api/api/onboarding#headers)

Custom headers in request:

- **api-version**: This header is mandatory for each request. Value must be set to **1.0**
- **x-api-key**: This header is mandatory for each request. Client specific API key which should be issued by Incode sales support.
- **X-Incode-Hardware-Id**: The value for this header should be set to the token provided as part of webhook notification.
- **Content-Type:** application/json

## Request

```java
{
   "key":"value"
}
```

## Error responses[​](https://docs.incode.com/docs/omni-api/api/onboarding#error-responses)

Incode uses conventional HTTP response codes to indicate the success or failure of an API request. In general:

- Codes in the `2xx` range indicate success.
- Codes in the `4xx` range indicate an error that failed given the information provided (e.g. missing required parameter).
- Codes in the `5xx` range indicate server side errors (these are rare).

Some `4xx` errors that could be handled programmatically include status of an error and message that briefly explains the error reported.

Arguments:

- **timestamp**: Long, UTC timestamp in milliseconds
- **status**: Integer, custom error code or http status code
- **error**: String, Http status error
- **message**: String, custom error message
- **path**: Stirng, endpoint path

Custom error codes are given for each endpoint.

Example:

```java
{
  "timestamp": 1688044216480,
  "status": 500,
  "error": "Internal Server Error",
  "message": "Unexpected error occured",
  "path": "/omni/incode-id/authenticate"
}
```

HTTP status code summary:

- `200` (OK) - Everything worked as expected.
- `400` (Bad Request) - The request was unacceptable, often due to missing a required parameter.
- `401` (Unauthorized) - Invalid or missing access token.
- `403` (Forbidden) - Invalid or missing api key.
- `404` (Not Found) - The requested resource doesn't exist.
- `405` (Method Not Allowed) - Unacceptable HTTP method for requested resource.
- `406` (Not Acceptable) - Unacceptable request.
- `500`, `502`, `503`, `504` (Server Errors) - Something went wrong on server side. (These are rare.)

## Webhook Notifications

Incode ID offers webhooks to notify your application in real time when relevant events happen. Unlike regular API requests, which originate from your server, webhooks make a request from Incode's servers to yours allowing them to notify you of key events. You can configure different webhooks urls, one for identity verification result, and the other for authentication result.

You may subscribe to the following Event Types:

- `verification.completed`
- `authentication.completed`

To receive webhooks, you need a server that can receive HTTPS requests from Incode.

### Example Request For Verification Completed

**POST** [https://{client-defined-url}](about:blank#)

```java
{
  "token": "ecyCI6MTY4Nzk2MzIyNiwiaWF0IjoxNjg3OTYyMzI2fQ.kaw-iQC7U3E3JB6NrxxcP7hp4Zs9123ABC",
  "event": "verification.completed",
  "object": "verification”,
  "id": "196c69e0-5566-4f51-9432-dde8e225aAbc3",
  "timestamp" : 1688052828
}
```

### Example Request For Authentication Completed

**POST** [https://{client-defined-url}](about:blank#)

```java
{
  "token": "cyCI6MTY4Nzk2MzIyNiwiaWF0IjoxNjg3OTYyMzI2fQ.kaw-iQC7U3E3JB6NrxxcP7hp4Zs9S123ABC",
  "event": "authentication.completed",
  "object": "authentication”,
  "id": "196c69e0-5566-4f51-9432-dde8e225aAbc3",
  "timestamp" : 1688059847
}
```

| Attribute | Data Type | Description |
| --- | --- | --- |
| token | String | Token to be able to retrieve verification data |
| event | String | The name of the event, the webhook is subscribing to |
| object | String | The object type for which identifier is provided to fetch more information |
| id | String | The identifier of the object |
| timestamp | Long | The timestamp of the event in UTC |

### Example Response

HTTP Response with StatusCode of 204 No Content.

## Get User Info

## Headers[​](https://docs.incode.com/docs/omni-api/api/onboarding#headers)

Custom headers in request:

- **api-version**: This header is mandatory for each request. Value must be set to **1.0**
- **x-api-key**: This header is mandatory for each request. Client specific API key which should be issued by Incode sales support.
- **X-Incode-Hardware-Id**: The value for this header should be set to the user token provided as part of authenticate response.
- **Content-Type:** application/json

### Example Request

GET

```java
https://INCODE_HOST/omni/incode-id/userinfo
```

### Example Response

```java
{
   "status": IdentityStatus,
   "identityId": "string",
   "name": {
     "fullName": "string",
     "firstName": "string",
     "lastName": "string",
   },
   "dateOfBirth":"string",
   "phone":"string",
   "sex":"string",
   "email":"string",
   "city":"string",
   "country ":"string",
   "curp":"string",
   "emailPreference": "boolean",
   "idImagesInfo": {
      "frontIdImageUrl": "string",
      "backIdImageUrl": "string"
   }
   "idAttestation":{
      "idValidation":{
         "photoSecurityAndQuality":[
            {
               "key":"string",
               "name":"string",
               "value":"string",
               "status":"OK"
            }
         ],
         "idSpecific":[
            {
               "key":"string",
               "name":"string",
               "value":"string",
               "status":"OK"
            }
         ],
         "customFields":[
            {
               "key":"string",
               "name":"string",
               "value":"string",
               "status":"OK"
            }
         ],
         "appliedRule":{
            "value":"string",
            "status":"OK"
         },
         "overall":{
            "value":"string",
            "status":"OK"
         }
      },
      "overall":{
         "value":"string",
         "status":"OK"
      }
   }
}
IdentityStatus can be ACTIVE, REVOKED
Status can be: OK, WARN, FAIL, UNKNOWN, MANUAL, MANUAL_OK, MANUAL_FAIL, MANUAL_PENDING
```

## Get Verification Data

### Example Request

**GET** `https://INCODE_HOST/omni/incode-id/verification/:id`

### Example Response

```java
{
  "id": "64bb17ff915ccccb85bb45b7",
  "createdAt": 1688059847
  "status": "VERIFIED",
  "data": {
    "name":{
      "fullName": "John Doe"
    },
    "email": "john.doe@gmail.com",
    "phone": "+521234567890",
    "dateOfBirth": "587455200000"
  }
}
```

## Get Authentication Data

### Example Request

**GET** `https://INCODE_HOST/omni/incode-id/authentication/:id`

### Example Response

```java
{
  "id": "196c69e0-5566-4f51-9432-dde8e225aAbc3",
  "createdAt": 1688059847,
  "status": "pass",
  "sourceId" : "source-name",
  "verificationId" : "196c69e0-5566-4f51-9432-dde8e225aAbc3"
}
```

| Attribute | Data Type | Description |
| --- | --- | --- |
| id | String | Token to be able to retrieve verification data |
| createdAt | Long | The timestamp when authentication was done in UTC |
| status | String | Whether the authentication was pass or fail |
| sourceId | String | Optional. The source name of the authentication, when provided during authentication |
| verificationId | String | Optional. The verification identifier of the verification that enrolled the user for authentication. Only available when authentication is pass. |

## Face Authentication

### Example Request

**POST** `https://INCODE_HOST/omni/incode-id/authenticate`

```java
{
   "face":{
      "base64Image":"string",
      "imageUrl":"string",
      "template":"string"
   },
   "source":"string"
}
```

Request Body

| Attribute | Data Type | Description |
| --- | --- | --- |
| face | FaceObject | The face object to be authenticated |
| source | String | Optional. Custom name to identify the device / source / location where the authentication is taking place. |

FaceObject

| Attribute | Data Type | Description |
| --- | --- | --- |
| base64Image | String | The base64 encoded face image to be authenticated. |

### Example Response

```java
{
   "token":"string",
   "correlationId":"string",
   "authenticationId":"string",
   "error":{
      "timestamp":"string",
      "status":0,
      "error":"string",
      "message":"string",
      "path":"string"
   },
   "status":"PASS" | "FAIL",
   "source":"string",
   "failureReason":"string" (possible values: "hasFaceMask", "hasLenses", "spoofAttempt", "faceMatchFailed", "otherError"),
   "verificationId":"string"
}
```

Response Body

| Attribute | Data Type | Description |
| --- | --- | --- |
| id | String | Token to be able to retrieve verification data |
| createdAt | Long | The timestamp when authentication was done in UTC |
| status | String | Whether the authentication was pass or fail |
| failureReason | String | Optional. One of the following:  "hasFaceMask", "hasLenses", "spoofAttempt", "faceMatchFailed", "otherError" |
| source | String | Optional. The source name of the authentication, when provided during authentication |
| verificationId | String | Optional. The verification identifier of the verification that enrolled the user for authentication. Only available when authentication is pass. |
| token | String | Optional. The token to fetch authentication data. Only available when authentication is pass. |
