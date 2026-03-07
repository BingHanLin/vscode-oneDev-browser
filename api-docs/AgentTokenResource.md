# AgentToken

Agent Token

| Operation | Http Method | End Point |
| --- | --- | --- |
| Get Agent | GET | /agent-tokens/{tokenId}/agent |
| Get Token | GET | /agent-tokens/{tokenId} |
| Query Tokens | GET | /agent-tokens |
| Create Token | POST | /agent-tokens |
| Delete Token | DELETE | /agent-tokens/{tokenId} |

---

## Operation Details

### getAgent

Agent Token

Get Agent

Get Agent

Get agent using specified token

Http Method
GET
End Point

/~api/agent-tokens/{tokenId}/agent

| Placeholder | Description | Example |
| --- | --- | --- |
| {tokenId} | Token Id | 1 |

Response

Operation Successful

Status Code
200
Response Body

Content Type
application/json

Example

```json
{
  "id": 1,
  "tokenId": 1,
  "name": "string",
  "ipAddress": "string",
  "osName": "string",
  "osVersion": "string",
  "osArch": "string",
  "cpuCount": 1,
  "paused": true,
  "online": false
}
```

Operation Failed

Status code
Status code other than 200 indicating the error type
Response Body
Error detail of content type "text/plain"

cURL Example

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/agent-tokens/1/agent

### getToken

Agent Token

Get Token

Get Token

Http Method
GET
End Point

/~api/agent-tokens/{tokenId}

| Placeholder | Description | Example |
| --- | --- | --- |
| {tokenId} | Token Id | 1 |

Response

Operation Successful

Status Code
200
Response Body

Content Type
application/json

Example

```json
{
  "id": 1,
  "value": "string"
}
```

Operation Failed

Status code
Status code other than 200 indicating the error type
Response Body
Error detail of content type "text/plain"

cURL Example

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/agent-tokens/1

### queryTokens

Agent Token

Query Tokens

Query Tokens

Http Method
GET
End Point

/~api/agent-tokens

Query Parameters

| Parameter | Description | Required | Example |
| --- | --- | --- | --- |
| value | Value | No | string |
| offset | Offset | Yes | 0 |
| count | Count | Yes | 100 |

Response

Operation Successful

Status Code
200
Response Body

Content Type
application/json

Example

[

```json
{
  "id": 1,
  "value": "string"
}
```

]

Operation Failed

Status code
Status code other than 200 indicating the error type
Response Body
Error detail of content type "text/plain"

cURL Example

$ curl -u <login name>:<password or access token> -G https://code.shoncloud.com/~api/agent-tokens --data-urlencode value=string --data-urlencode offset=0 --data-urlencode count=100

### createToken

Agent Token

Create Token

Create Token

Create new token

Http Method
POST
End Point

/~api/agent-tokens

Response

Operation Successful

Status Code
200
Response Body

Content Type
application/json

Example

1

Operation Failed

Status code
Status code other than 200 indicating the error type
Response Body
Error detail of content type "text/plain"

cURL Example

$ curl -u <login name>:<password or access token> -X POST https://code.shoncloud.com/~api/agent-tokens

### deleteToken

Agent Token

Delete Token

Delete Token

Http Method
DELETE
End Point

/~api/agent-tokens/{tokenId}

| Placeholder | Description | Example |
| --- | --- | --- |
| {tokenId} | Token Id | 1 |

Response

Operation Successful

Status Code
200
Response Body
No response body

Operation Failed

Status code
Status code other than 200 indicating the error type
Response Body
Error detail of content type "text/plain"

cURL Example

$ curl -u <login name>:<password or access token> -X DELETE https://code.shoncloud.com/~api/agent-tokens/1
