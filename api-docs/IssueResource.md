# Issue

Issue

In most cases, issue resource is operated with issue id, which is different from issue number. To get issue id of a particular issue number, use the Query Basic Info operation with query for instance "Number" is "path/to/project#100" or "Number" is "PROJECTKEY-100"

| Operation | Http Method | End Point |
| --- | --- | --- |
| Get Issue | GET | /issues/{issueId} |
| Get Fields | GET | /issues/{issueId}/fields |
| Get Changes | GET | /issues/{issueId}/changes |
| Get Comments | GET | /issues/{issueId}/comments |
| Get Works | GET | /issues/{issueId}/works |
| Get Iterations | GET | /issues/{issueId}/iterations |
| Get Votes | GET | /issues/{issueId}/votes |
| Get Watches | GET | /issues/{issueId}/watches |
| Get Links | GET | /issues/{issueId}/links |
| Get Pull Requests | GET | /issues/{issueId}/pulls |
| Get Commits | GET | /issues/{issueId}/commits |
| Query Issues | GET | /issues |
| Create Issue | POST | /issues |
| Set Title | POST | /issues/{issueId}/title |
| Set Description | POST | /issues/{issueId}/description |
| Set Confidential | POST | /issues/{issueId}/confidential |
| Set Own Estimated Time | POST | /issues/{issueId}/own-estimated-time |
| Set Iterations | POST | /issues/{issueId}/iterations |
| Set Fields | POST | /issues/{issueId}/fields |
| Transit State | POST | /issues/{issueId}/state-transitions |
| Upload Attachment | POST | /issues/{issueId}/attachments/{preferredAttachmentName} |
| Delete Issue | DELETE | /issues/{issueId} |

---

## Operation Details

### getIssue

Issue

Get Issue

Get Issue

Http Method
GET
End Point

/~api/issues/{issueId}

| Placeholder | Description | Example |
| --- | --- | --- |
| {issueId} | Issue Id | 1 |

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
  "description": "string",
  "state": "string",
  "stateOrdinal": 1,
  "title": "string",
  "numberScopeId": 1,
  "projectId": 1,
  "submitterId": 1,
  "submitDate": "2026-03-05T13:52:09.950+00:00",
  "onBehalfOf":
  {
    "address": "string",
    "personal": "string",
    "encodedPersonal": "string"
  },
  "voteCount": 1,
  "commentCount": 1,
  "thumbsUpCount": 1,
  "thumbsDownCount": 1,
  "smileCount": 1,
  "tadaCount": 1,
  "confusedCount": 1,
  "heartCount": 1,
  "rocketCount": 1,
  "eyesCount": 1,
  "totalEstimatedTime": 1,
  "totalSpentTime": 1,
  "ownEstimatedTime": 1,
  "ownSpentTime": 1,
  "progress": 1,
  "descriptionRevisionCount": 1,
  "uuid": "string",
  "number": 1,
  "messageId": "string",
  "lastActivity":
  {
    "userId": 1,
    "date": "2026-03-05T13:52:09.951+00:00",
    "description": "string"
  },
  "confidential": true,
  "pinDate": "2026-03-05T13:52:09.951+00:00",
  "boardPosition": 1,
  "externalParticipants":
  [
    {
      "address": "string",
      "personal": "string",
      "encodedPersonal": "string"
    }
  ]
}
```

Operation Failed

Status code
Status code other than 200 indicating the error type
Response Body
Error detail of content type "text/plain"

cURL Example

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/issues/1

### getFields

Issue

Get Fields

Get Fields

Http Method
GET
End Point

/~api/issues/{issueId}/fields

| Placeholder | Description | Example |
| --- | --- | --- |
| {issueId} | Issue Id | 1 |

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
  "field1": "value1",
  "field2":
  [
    "value1",
    "value2"
  ]
}
```

Operation Failed

Status code
Status code other than 200 indicating the error type
Response Body
Error detail of content type "text/plain"

cURL Example

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/issues/1/fields

### getChanges

Issue

Get Changes

Get Changes

Http Method
GET
End Point

/~api/issues/{issueId}/changes

| Placeholder | Description | Example |
| --- | --- | --- |
| {issueId} | Issue Id | 1 |

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
  "issueId": 1,
  "userId": 1,
  "date": "2026-03-05T13:52:12.894+00:00",
  "data":
  {
    "@type": "IssueBatchUpdateData",
    "oldState": "string",
    "newState": "string",
    "oldConfidential": true,
    "newConfidential": true,
    "oldIterations":
    [
      "string"
    ],
    "newIterations":
    [
      "string"
    ],
    "oldFields":
    {
      "string":
      {
        "name": "string",
        "type": "string",
        "values":
        [
          "string"
        ]
      }
    },
    "newFields":
    {
      "string":
      {
        "name": "string",
        "type": "string",
        "values":
        [
          "string"
        ]
      }
    }
  }
}
```

]

Operation Failed

Status code
Status code other than 200 indicating the error type
Response Body
Error detail of content type "text/plain"

cURL Example

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/issues/1/changes

### getComments

Issue

Get Comments

Get Comments

Http Method
GET
End Point

/~api/issues/{issueId}/comments

| Placeholder | Description | Example |
| --- | --- | --- |
| {issueId} | Issue Id | 1 |

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
  "issueId": 1,
  "revisionCount": 1,
  "onBehalfOf":
  {
    "address": "string",
    "personal": "string",
    "encodedPersonal": "string"
  },
  "date": "2026-03-05T13:52:14.306+00:00",
  "userId": 1,
  "content": "string"
}
```

]

Operation Failed

Status code
Status code other than 200 indicating the error type
Response Body
Error detail of content type "text/plain"

cURL Example

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/issues/1/comments

### getWorks

Issue

Get Works

Get Works

Http Method
GET
End Point

/~api/issues/{issueId}/works

| Placeholder | Description | Example |
| --- | --- | --- |
| {issueId} | Issue Id | 1 |

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
  "issueId": 1,
  "userId": 1,
  "date": "2026-03-05T13:52:15.699+00:00",
  "minutes": 1,
  "note": "string"
}
```

]

Operation Failed

Status code
Status code other than 200 indicating the error type
Response Body
Error detail of content type "text/plain"

cURL Example

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/issues/1/works

### getIterations

Issue

Get Iterations

Get Iterations

Http Method
GET
End Point

/~api/issues/{issueId}/iterations

| Placeholder | Description | Example |
| --- | --- | --- |
| {issueId} | Issue Id | 1 |

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
  "description": "string",
  "startDay": 1,
  "dueDay": 1,
  "projectId": 1,
  "name": "string",
  "closed": true
}
```

]

Operation Failed

Status code
Status code other than 200 indicating the error type
Response Body
Error detail of content type "text/plain"

cURL Example

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/issues/1/iterations

### getVotes

Issue

Get Votes

Get Votes

Http Method
GET
End Point

/~api/issues/{issueId}/votes

| Placeholder | Description | Example |
| --- | --- | --- |
| {issueId} | Issue Id | 1 |

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
  "issueId": 1,
  "userId": 1,
  "date": "2026-03-05T13:52:18.506+00:00"
}
```

]

Operation Failed

Status code
Status code other than 200 indicating the error type
Response Body
Error detail of content type "text/plain"

cURL Example

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/issues/1/votes

### getWatches

Issue

Get Watches

Get Watches

Http Method
GET
End Point

/~api/issues/{issueId}/watches

| Placeholder | Description | Example |
| --- | --- | --- |
| {issueId} | Issue Id | 1 |

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
  "issueId": 1,
  "userId": 1,
  "watching": true
}
```

]

Operation Failed

Status code
Status code other than 200 indicating the error type
Response Body
Error detail of content type "text/plain"

cURL Example

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/issues/1/watches

### getLinks

Issue

Get Links

Get Links

Http Method
GET
End Point

/~api/issues/{issueId}/links

| Placeholder | Description | Example |
| --- | --- | --- |
| {issueId} | Issue Id | 1 |

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
  "sourceId": 1,
  "targetId": 1,
  "specId": 1,
  "position": 1
}
```

]

Operation Failed

Status code
Status code other than 200 indicating the error type
Response Body
Error detail of content type "text/plain"

cURL Example

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/issues/1/links

### getPullRequests

Issue

Get Pull Requests

Get Pull Requests

Http Method
GET
End Point

/~api/issues/{issueId}/pulls

| Placeholder | Description | Example |
| --- | --- | --- |
| {issueId} | Issue Id | 1 |

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
  "title": "string",
  "description": "string",
  "sourceProjectId": 1,
  "status": "OPEN",
  "submitterId": 1,
  "numberScopeId": 1,
  "targetProjectId": 1,
  "targetBranch": "string",
  "sourceBranch": "string",
  "baseCommitHash": "string",
  "buildCommitHash": "string",
  "submitDate": "2026-03-05T13:52:22.682+00:00",
  "closeDate": "2026-03-05T13:52:22.682+00:00",
  "duration": 1,
  "submitTimeGroups":
  {
    "day": 1,
    "week": 1,
    "month": 1
  },
  "closeTimeGroups":
  {
    "day": 1,
    "week": 1,
    "month": 1
  },
  "mergeStrategy": "CREATE_MERGE_COMMIT",
  "uuid": "string",
  "number": 1,
  "commentCount": 1,
  "thumbsUpCount": 1,
  "thumbsDownCount": 1,
  "smileCount": 1,
  "tadaCount": 1,
  "confusedCount": 1,
  "heartCount": 1,
  "rocketCount": 1,
  "eyesCount": 1,
  "descriptionRevisionCount": 1,
  "lastActivity":
  {
    "userId": 1,
    "date": "2026-03-05T13:52:22.683+00:00",
    "description": "string"
  },
  "autoMerge":
  {
    "enabled": true,
    "commitMessage": "string"
  },
  "codeCommentsUpdateDate": "2026-03-05T13:52:22.683+00:00",
  "checkError": "string"
}
```

]

Operation Failed

Status code
Status code other than 200 indicating the error type
Response Body
Error detail of content type "text/plain"

cURL Example

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/issues/1/pulls

### getCommits

Issue

Get Commits

Get Commits

Http Method
GET
End Point

/~api/issues/{issueId}/commits

| Placeholder | Description | Example |
| --- | --- | --- |
| {issueId} | Issue Id | 1 |

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
  "projectId": 1,
  "commitHash": "string"
}
```

]

Operation Failed

Status code
Status code other than 200 indicating the error type
Response Body
Error detail of content type "text/plain"

cURL Example

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/issues/1/commits

### queryIssues

Issue

Query Issues

Query Issues

Http Method
GET
End Point

/~api/issues

Query Parameters

| Parameter | Description | Required | Example |
| --- | --- | --- | --- |
| query | Syntax of this query is the same as in issues page | No | "State" is "Open" |
| withFields | Whether or not to include issue fields. Default to false | No | true |
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
  "state": "string",
  "stateOrdinal": 1,
  "title": "string",
  "description": "string",
  "submitDate": "2026-03-05T13:52:25.508+00:00",
  "onBehalfOf":
  {
    "address": "string",
    "personal": "string",
    "group": false,
    "type": "rfc822"
  },
  "voteCount": 1,
  "commentCount": 1,
  "thumbsUpCount": 1,
  "thumbsDownCount": 1,
  "smileCount": 1,
  "tadaCount": 1,
  "confusedCount": 1,
  "heartCount": 1,
  "rocketCount": 1,
  "eyesCount": 1,
  "totalEstimatedTime": 1,
  "totalSpentTime": 1,
  "ownEstimatedTime": 1,
  "ownSpentTime": 1,
  "progress": 1,
  "descriptionRevisionCount": 1,
  "uuid": "string",
  "number": 1,
  "messageId": "string",
  "lastActivity":
  {
    "date": "2026-03-05T13:52:25.509+00:00",
    "description": "string",
    "userId": 1
  },
  "confidential": true,
  "pinDate": "2026-03-05T13:52:25.509+00:00",
  "boardPosition": 1,
  "externalParticipants":
  [
    {
      "address": "string",
      "personal": "string",
      "group": false,
      "type": "rfc822"
    }
  ],
  "numberScopeId": 1,
  "projectId": 1,
  "submitterId": 1
}
```

]

Operation Failed

Status code
Status code other than 200 indicating the error type
Response Body
Error detail of content type "text/plain"

cURL Example

$ curl -u <login name>:<password or access token> -G https://code.shoncloud.com/~api/issues --data-urlencode 'query="State" is "Open"' --data-urlencode withFields=true --data-urlencode offset=0 --data-urlencode count=100

### createIssue

Issue

Create Issue

Create Issue

Http Method
POST
End Point

/~api/issues

Request Body

Content Type
application/json

Example

```json
{
  "projectId": 1,
  "title": "string",
  "description": "string",
  "confidential": true,
  "ownEstimatedTime": 1,
  "iterationIds":
  [
    1
  ],
  "fields":
  {
    "field1": "value1",
    "field2":
    [
      "value1",
      "value2"
    ]
  }
}
```

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

$ curl -u <login name>:<password or access token> -X POST -d@request-body.json -H "Content-Type: application/json" https://code.shoncloud.com/~api/issues

### setTitle

Issue

Set Title

Set Title

Http Method
POST
End Point

/~api/issues/{issueId}/title

| Placeholder | Description | Example |
| --- | --- | --- |
| {issueId} | Issue Id | 1 |

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

$ curl -u <login name>:<password or access token> -X POST -d@request-body.json -H "Content-Type: application/json" https://code.shoncloud.com/~api/issues/1/title

### setDescription

Issue

Set Description

Set Description

Http Method
POST
End Point

/~api/issues/{issueId}/description

| Placeholder | Description | Example |
| --- | --- | --- |
| {issueId} | Issue Id | 1 |

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

$ curl -u <login name>:<password or access token> -X POST -d@request-body.json -H "Content-Type: application/json" https://code.shoncloud.com/~api/issues/1/description

### setConfidential

Issue

Set Confidential

Set Confidential

Http Method
POST
End Point

/~api/issues/{issueId}/confidential

| Placeholder | Description | Example |
| --- | --- | --- |
| {issueId} | Issue Id | 1 |

Request Body

Content Type
application/json

Example

true

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

$ curl -u <login name>:<password or access token> -X POST -d@request-body.json -H "Content-Type: application/json" https://code.shoncloud.com/~api/issues/1/confidential

### setOwnEstimatedTime

Issue

Set Own Estimated Time

Set Own Estimated Time

Http Method
POST
End Point

/~api/issues/{issueId}/own-estimated-time

| Placeholder | Description | Example |
| --- | --- | --- |
| {issueId} | Issue Id | 1 |

Request Body

Content Type
application/json

Example

1

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

$ curl -u <login name>:<password or access token> -X POST -d@request-body.json -H "Content-Type: application/json" https://code.shoncloud.com/~api/issues/1/own-estimated-time

### setIterations

Issue

Set Iterations

Set Iterations

Schedule issue into specified iterations with list of iteration id

Http Method
POST
End Point

/~api/issues/{issueId}/iterations

| Placeholder | Description | Example |
| --- | --- | --- |
| {issueId} | Issue Id | 1 |

Request Body

Content Type
application/json

Example

[

1

]

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

$ curl -u <login name>:<password or access token> -X POST -d@request-body.json -H "Content-Type: application/json" https://code.shoncloud.com/~api/issues/1/iterations

### setFields

Issue

Set Fields

Set Fields

Http Method
POST
End Point

/~api/issues/{issueId}/fields

| Placeholder | Description | Example |
| --- | --- | --- |
| {issueId} | Issue Id | 1 |

Request Body

Content Type
application/json

Example

```json
{
  "field1": "value1",
  "field2":
  [
    "value1",
    "value2"
  ]
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

$ curl -u <login name>:<password or access token> -X POST -d@request-body.json -H "Content-Type: application/json" https://code.shoncloud.com/~api/issues/1/fields

### transitState

Issue

Transit State

Transit State

Http Method
POST
End Point

/~api/issues/{issueId}/state-transitions

| Placeholder | Description | Example |
| --- | --- | --- |
| {issueId} | Issue Id | 1 |

Request Body

Content Type
application/json

Example

```json
{
  "state": "string",
  "fields":
  {
    "field1": "value1",
    "field2":
    [
      "value1",
      "value2"
    ]
  },
  "comment": "string"
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

$ curl -u <login name>:<password or access token> -X POST -d@request-body.json -H "Content-Type: application/json" https://code.shoncloud.com/~api/issues/1/state-transitions

### uploadAttachment

Issue

Upload Attachment

Upload Attachment

Upload attachment to issue and get attachment url via response. This url can then be used in issue description or comment

Http Method
POST
End Point

/~api/issues/{issueId}/attachments/{preferredAttachmentName}

| Placeholder | Description | Example |
| --- | --- | --- |
| {issueId} | Issue Id | 1 |
| {preferredAttachmentName} | Preferred Attachment Name | string |

Request Body

Content Type
application/octet-stream

Response

Operation Successful

Status Code
200
Response Body

Content Type
application/json

Example

/~downloads/projects/1/attachments/6a5a1a20-c8c0-44a5-a1bb-8a3d2a830094/attachment.txt

Operation Failed

Status code
Status code other than 200 indicating the error type
Response Body
Error detail of content type "text/plain"

cURL Example

$ curl -u <login name>:<password or access token> -X POST --data-binary "@upload-file" -H "Content-Type: application/octet-stream" https://code.shoncloud.com/~api/issues/1/attachments/string

### deleteIssue

Issue

Delete Issue

Delete Issue

Http Method
DELETE
End Point

/~api/issues/{issueId}

| Placeholder | Description | Example |
| --- | --- | --- |
| {issueId} | Issue Id | 1 |

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

$ curl -u <login name>:<password or access token> -X DELETE https://code.shoncloud.com/~api/issues/1
