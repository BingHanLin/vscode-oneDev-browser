# Build

Build

In most cases, build resource is operated with build id, which is different from build number. To get build id of a particular build number, use the Query Basic Info operation with query for instance "Number" is "path/to/project#100" or "Number" is "PROJECTKEY-100"

| Operation | Http Method | End Point |
| --- | --- | --- |
| Get Build | GET | /builds/{buildId} |
| Get Labels | GET | /builds/{buildId}/labels |
| Get Params | GET | /builds/{buildId}/params |
| Get Dependencies | GET | /builds/{buildId}/dependencies |
| Get Dependents | GET | /builds/{buildId}/dependents |
| Get Fixed Issue Ids | GET | /builds/{buildId}/fixed-issue-ids |
| Query Builds | GET | /builds |
| Set Description | POST | /builds/{buildId}/description |
| Delete Build | DELETE | /builds/{buildId} |

---

## Operation Details

### getBuild

Build

Get Build

Get Build

Http Method
GET
End Point

/~api/builds/{buildId}

| Placeholder | Description | Example |
| --- | --- | --- |
| {buildId} | Build Id | 1 |

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
  "numberScopeId": 1,
  "projectId": 1,
  "agentId": 1,
  "submitterId": 1,
  "cancellerId": 1,
  "jobName": "string",
  "workspacePath": "string",
  "checkoutPaths":
  [
    "string"
  ],
  "refName": "string",
  "version": "string",
  "description": "string",
  "uuid": "string",
  "number": 1,
  "submitSequence": 1,
  "commitHash": "string",
  "status": "WAITING",
  "paused": true,
  "submitDate": "2026-03-05T13:51:13.642+00:00",
  "pendingDate": "2026-03-05T13:51:13.642+00:00",
  "runningDate": "2026-03-05T13:51:13.642+00:00",
  "finishDate": "2026-03-05T13:51:13.642+00:00",
  "pendingDuration": 1,
  "runningDuration": 1,
  "retryDate": "2026-03-05T13:51:13.642+00:00",
  "finishTimeGroups":
  {
    "day": 1,
    "week": 1,
    "month": 1
  },
  "submitReason": "string",
  "requestId": 1,
  "issueId": 1
}
```

Operation Failed

Status code
Status code other than 200 indicating the error type
Response Body
Error detail of content type "text/plain"

cURL Example

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/builds/1

### getLabels

Build

Get Labels

Get Labels

Get list of labels

Http Method
GET
End Point

/~api/builds/{buildId}/labels

| Placeholder | Description | Example |
| --- | --- | --- |
| {buildId} | Build Id | 1 |

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
  "buildId": 1,
  "specId": 1
}
```

]

Operation Failed

Status code
Status code other than 200 indicating the error type
Response Body
Error detail of content type "text/plain"

cURL Example

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/builds/1/labels

### getParams

Build

Get Params

Get Params

Http Method
GET
End Point

/~api/builds/{buildId}/params

| Placeholder | Description | Example |
| --- | --- | --- |
| {buildId} | Build Id | 1 |

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
  "buildId": 1,
  "name": "string",
  "type": "string",
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

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/builds/1/params

### getDependencies

Build

Get Dependencies

Get Dependencies

Http Method
GET
End Point

/~api/builds/{buildId}/dependencies

| Placeholder | Description | Example |
| --- | --- | --- |
| {buildId} | Build Id | 1 |

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
  "dependentId": 2,
  "dependencyId": 1,
  "requireSuccessful": true,
  "artifacts": "string",
  "destinationPath": "string"
}
```

]

Operation Failed

Status code
Status code other than 200 indicating the error type
Response Body
Error detail of content type "text/plain"

cURL Example

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/builds/1/dependencies

### getDependents

Build

Get Dependents

Get Dependents

Http Method
GET
End Point

/~api/builds/{buildId}/dependents

| Placeholder | Description | Example |
| --- | --- | --- |
| {buildId} | Build Id | 1 |

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
  "dependentId": 2,
  "dependencyId": 1,
  "requireSuccessful": true,
  "artifacts": "string",
  "destinationPath": "string"
}
```

]

Operation Failed

Status code
Status code other than 200 indicating the error type
Response Body
Error detail of content type "text/plain"

cURL Example

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/builds/1/dependents

### getFixedIssueIds

Build

Get Fixed Issue Ids

Get Fixed Issue Ids

Http Method
GET
End Point

/~api/builds/{buildId}/fixed-issue-ids

| Placeholder | Description | Example |
| --- | --- | --- |
| {buildId} | Build Id | 1 |

Response

Operation Successful

Status Code
200
Response Body

Content Type
application/json

Example

[

1

]

Operation Failed

Status code
Status code other than 200 indicating the error type
Response Body
Error detail of content type "text/plain"

cURL Example

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/builds/1/fixed-issue-ids

### queryBuilds

Build

Query Builds

Query Builds

Http Method
GET
End Point

/~api/builds

Query Parameters

| Parameter | Description | Required | Example |
| --- | --- | --- | --- |
| query | Syntax of this query is the same as in builds page | No | "Job" is "Release" |
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
  "numberScopeId": 1,
  "projectId": 1,
  "agentId": 1,
  "submitterId": 1,
  "cancellerId": 1,
  "jobName": "string",
  "workspacePath": "string",
  "checkoutPaths":
  [
    "string"
  ],
  "refName": "string",
  "version": "string",
  "description": "string",
  "uuid": "string",
  "number": 1,
  "submitSequence": 1,
  "commitHash": "string",
  "status": "WAITING",
  "paused": true,
  "submitDate": "2026-03-05T13:51:21.842+00:00",
  "pendingDate": "2026-03-05T13:51:21.842+00:00",
  "runningDate": "2026-03-05T13:51:21.842+00:00",
  "finishDate": "2026-03-05T13:51:21.842+00:00",
  "pendingDuration": 1,
  "runningDuration": 1,
  "retryDate": "2026-03-05T13:51:21.842+00:00",
  "finishTimeGroups":
  {
    "day": 1,
    "week": 1,
    "month": 1
  },
  "submitReason": "string",
  "requestId": 1,
  "issueId": 1
}
```

]

Operation Failed

Status code
Status code other than 200 indicating the error type
Response Body
Error detail of content type "text/plain"

cURL Example

$ curl -u <login name>:<password or access token> -G https://code.shoncloud.com/~api/builds --data-urlencode 'query="Job" is "Release"' --data-urlencode offset=0 --data-urlencode count=100

### setDescription

Build

Set Description

Set Description

Http Method
POST
End Point

/~api/builds/{buildId}/description

| Placeholder | Description | Example |
| --- | --- | --- |
| {buildId} | Build Id | 1 |

Request Body

Content Type
application/json

Example

string

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

$ curl -u <login name>:<password or access token> -X POST -d@request-body.json -H "Content-Type: application/json" https://code.shoncloud.com/~api/builds/1/description

### deleteBuild

Build

Delete Build

Delete Build

Http Method
DELETE
End Point

/~api/builds/{buildId}

| Placeholder | Description | Example |
| --- | --- | --- |
| {buildId} | Build Id | 1 |

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

$ curl -u <login name>:<password or access token> -X DELETE https://code.shoncloud.com/~api/builds/1
