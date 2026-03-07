# Agent

Agent

| Operation | Http Method | End Point |
| --- | --- | --- |
| Get Agent | GET | /agents/{agentId} |
| Get Attributes | GET | /agents/{agentId}/attributes |
| Query Agents | GET | /agents |
| Update Attributes | POST | /agents/{agentId}/attributes |

---

## Operation Details

### getAgent

Agent

Get Agent

Get Agent

Http Method
GET
End Point

/~api/agents/{agentId}

| Placeholder | Description | Example |
| --- | --- | --- |
| {agentId} | Agent Id | 1 |

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

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/agents/1

### getAttributes

Agent

Get Attributes

Get Attributes

Http Method
GET
End Point

/~api/agents/{agentId}/attributes

| Placeholder | Description | Example |
| --- | --- | --- |
| {agentId} | Agent Id | 1 |

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
  "string": "string"
}
```

Operation Failed

Status code
Status code other than 200 indicating the error type
Response Body
Error detail of content type "text/plain"

cURL Example

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/agents/1/attributes

### queryAgents

Agent

Query Agents

Query Agents

Http Method
GET
End Point

/~api/agents

Query Parameters

| Parameter | Description | Required | Example |
| --- | --- | --- | --- |
| query | Syntax of this query is the same as in agent management page | No | "Name" is "agentName" |
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

]

Operation Failed

Status code
Status code other than 200 indicating the error type
Response Body
Error detail of content type "text/plain"

cURL Example

$ curl -u <login name>:<password or access token> -G https://code.shoncloud.com/~api/agents --data-urlencode 'query="Name" is "agentName"' --data-urlencode offset=0 --data-urlencode count=100

### updateAttributes

Agent

Update Attributes

Update Attributes

Http Method
POST
End Point

/~api/agents/{agentId}/attributes

| Placeholder | Description | Example |
| --- | --- | --- |
| {agentId} | Agent Id | 1 |

Request Body

Content Type
application/json

Example

```json
{
  "string": "string"
}
```

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

$ curl -u <login name>:<password or access token> -X POST -d@request-body.json -H "Content-Type: application/json" https://code.shoncloud.com/~api/agents/1/attributes
