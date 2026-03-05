# PullRequest

Pull Request

In most cases, pull request resource is operated with pull request id, which is different from pull request number. To get pull request id of a particular pull request number, use the Query Basic Info operation with query for instance "Number" is "path/to/project#100" or "Number" is "PROJECTKEY-100"

| Operation | Http Method | End Point |
| --- | --- | --- |
| Get Pull Request | GET | /pulls/{requestId} |
| Get Labels | GET | /pulls/{requestId}/labels |
| Get Merge Preview | GET | /pulls/{requestId}/merge-preview |
| Get Assignments | GET | /pulls/{requestId}/assignments |
| Get Reviews | GET | /pulls/{requestId}/reviews |
| Get Comments | GET | /pulls/{requestId}/comments |
| Get Watches | GET | /pulls/{requestId}/watches |
| Get Updates | GET | /pulls/{requestId}/updates |
| Get Current Builds | GET | /pulls/{requestId}/current-builds |
| Get Changes | GET | /pulls/{requestId}/changes |
| Get Fixed Issue Ids | GET | /pulls/{requestId}/fixed-issue-ids |
| Query Pull Requests | GET | /pulls |
| Create Pull Request | POST | /pulls |
| Set Title | POST | /pulls/{requestId}/title |
| Set Description | POST | /pulls/{requestId}/description |
| Set Merge Strategy | POST | /pulls/{requestId}/merge-strategy |
| Set Auto Merge | POST | /pulls/{requestId}/auto-merge |
| Reopen Pull Request | POST | /pulls/{requestId}/reopen |
| Discard Pull Request | POST | /pulls/{requestId}/discard |
| Merge Pull Request | POST | /pulls/{requestId}/merge |
| Delete Source Branch | POST | /pulls/{requestId}/delete-source-branch |
| Restore Source Branch | POST | /pulls/{requestId}/restore-source-branch |
| Upload Attachment | POST | /pulls/{requestId}/attachments/{preferredAttachmentName} |
| Delete Pull Request | DELETE | /pulls/{requestId} |

---

## Operation Details

### getPullRequest

Pull Request

Get Pull Request

Get Pull Request

Http Method
GET
End Point

/~api/pulls/{requestId}

| Placeholder | Description | Example |
| --- | --- | --- |
| {requestId} | Request Id | 1 |

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
  "submitDate": "2026-03-05T13:54:25.346+00:00",
  "closeDate": "2026-03-05T13:54:25.346+00:00",
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
    "date": "2026-03-05T13:54:25.347+00:00",
    "description": "string"
  },
  "autoMerge":
  {
    "enabled": true,
    "commitMessage": "string"
  },
  "codeCommentsUpdateDate": "2026-03-05T13:54:25.348+00:00",
  "checkError": "string"
}
```

Operation Failed

Status code
Status code other than 200 indicating the error type
Response Body
Error detail of content type "text/plain"

cURL Example

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/pulls/1

### getLabels

Pull Request

Get Labels

Get Labels

Get list of labels

Http Method
GET
End Point

/~api/pulls/{requestId}/labels

| Placeholder | Description | Example |
| --- | --- | --- |
| {requestId} | Request Id | 1 |

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
  "requestId": 1,
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

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/pulls/1/labels

### getMergePreview

Pull Request

Get Merge Preview

Get Merge Preview

Http Method
GET
End Point

/~api/pulls/{requestId}/merge-preview

| Placeholder | Description | Example |
| --- | --- | --- |
| {requestId} | Request Id | 1 |

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
  "targetHeadCommitHash": "string",
  "headCommitHash": "string",
  "mergeStrategy": "CREATE_MERGE_COMMIT",
  "mergeCommitHash": "string"
}
```

Operation Failed

Status code
Status code other than 200 indicating the error type
Response Body
Error detail of content type "text/plain"

cURL Example

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/pulls/1/merge-preview

### getAssignments

Pull Request

Get Assignments

Get Assignments

Http Method
GET
End Point

/~api/pulls/{requestId}/assignments

| Placeholder | Description | Example |
| --- | --- | --- |
| {requestId} | Request Id | 1 |

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
  "userId": 1,
  "requestId": 1
}
```

]

Operation Failed

Status code
Status code other than 200 indicating the error type
Response Body
Error detail of content type "text/plain"

cURL Example

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/pulls/1/assignments

### getReviews

Pull Request

Get Reviews

Get Reviews

Http Method
GET
End Point

/~api/pulls/{requestId}/reviews

| Placeholder | Description | Example |
| --- | --- | --- |
| {requestId} | Request Id | 1 |

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
  "userId": 1,
  "requestId": 1,
  "status": "PENDING",
  "statusDate": "2026-03-05T13:54:30.951+00:00"
}
```

]

Operation Failed

Status code
Status code other than 200 indicating the error type
Response Body
Error detail of content type "text/plain"

cURL Example

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/pulls/1/reviews

### getComments

Pull Request

Get Comments

Get Comments

Http Method
GET
End Point

/~api/pulls/{requestId}/comments

| Placeholder | Description | Example |
| --- | --- | --- |
| {requestId} | Request Id | 1 |

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
  "requestId": 1,
  "revisionCount": 1,
  "date": "2026-03-05T13:54:32.327+00:00",
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

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/pulls/1/comments

### getWatches

Pull Request

Get Watches

Get Watches

Http Method
GET
End Point

/~api/pulls/{requestId}/watches

| Placeholder | Description | Example |
| --- | --- | --- |
| {requestId} | Request Id | 1 |

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
  "requestId": 1,
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

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/pulls/1/watches

### getUpdates

Pull Request

Get Updates

Get Updates

Http Method
GET
End Point

/~api/pulls/{requestId}/updates

| Placeholder | Description | Example |
| --- | --- | --- |
| {requestId} | Request Id | 1 |

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
  "requestId": 1,
  "headCommitHash": "string",
  "targetHeadCommitHash": "string",
  "date": "2026-03-05T13:54:35.086+00:00"
}
```

]

Operation Failed

Status code
Status code other than 200 indicating the error type
Response Body
Error detail of content type "text/plain"

cURL Example

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/pulls/1/updates

### getCurrentBuilds

Pull Request

Get Current Builds

Get Current Builds

Http Method
GET
End Point

/~api/pulls/{requestId}/current-builds

| Placeholder | Description | Example |
| --- | --- | --- |
| {requestId} | Request Id | 1 |

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
  "submitDate": "2026-03-05T13:54:36.458+00:00",
  "pendingDate": "2026-03-05T13:54:36.458+00:00",
  "runningDate": "2026-03-05T13:54:36.458+00:00",
  "finishDate": "2026-03-05T13:54:36.458+00:00",
  "pendingDuration": 1,
  "runningDuration": 1,
  "retryDate": "2026-03-05T13:54:36.458+00:00",
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

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/pulls/1/current-builds

### getChanges

Pull Request

Get Changes

Get Changes

Http Method
GET
End Point

/~api/pulls/{requestId}/changes

| Placeholder | Description | Example |
| --- | --- | --- |
| {requestId} | Request Id | 1 |

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
  "requestId": 1,
  "userId": 1,
  "date": "2026-03-05T13:54:37.871+00:00",
  "data":
  {
    "@type": "PullRequestApproveData"
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

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/pulls/1/changes

### getFixedIssueIds

Pull Request

Get Fixed Issue Ids

Get Fixed Issue Ids

Http Method
GET
End Point

/~api/pulls/{requestId}/fixed-issue-ids

| Placeholder | Description | Example |
| --- | --- | --- |
| {requestId} | Request Id | 1 |

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

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/pulls/1/fixed-issue-ids

### queryPullRequests

Pull Request

Query Pull Requests

Query Pull Requests

Http Method
GET
End Point

/~api/pulls

Query Parameters

| Parameter | Description | Required | Example |
| --- | --- | --- | --- |
| query | Syntax of this query is the same as in pull requests page | No | to be reviewed by me |
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
  "submitDate": "2026-03-05T13:54:40.631+00:00",
  "closeDate": "2026-03-05T13:54:40.631+00:00",
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
    "date": "2026-03-05T13:54:40.632+00:00",
    "description": "string"
  },
  "autoMerge":
  {
    "enabled": true,
    "commitMessage": "string"
  },
  "codeCommentsUpdateDate": "2026-03-05T13:54:40.633+00:00",
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

$ curl -u <login name>:<password or access token> -G https://code.shoncloud.com/~api/pulls --data-urlencode 'query=to be reviewed by me' --data-urlencode offset=0 --data-urlencode count=100

### createPullRequest

Pull Request

Create Pull Request

Create Pull Request

Http Method
POST
End Point

/~api/pulls

Request Body

Content Type
application/json

Example

```json
{
  "targetProjectId": 1,
  "sourceProjectId": 1,
  "targetBranch": "string",
  "sourceBranch": "string",
  "title": "string",
  "description": "string",
  "mergeStrategy": "CREATE_MERGE_COMMIT",
  "reviewerIds":
  [
    1
  ],
  "assigneeIds":
  [
    1
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

$ curl -u <login name>:<password or access token> -X POST -d@request-body.json -H "Content-Type: application/json" https://code.shoncloud.com/~api/pulls

### setTitle

Pull Request

Set Title

Set Title

Http Method
POST
End Point

/~api/pulls/{requestId}/title

| Placeholder | Description | Example |
| --- | --- | --- |
| {requestId} | Request Id | 1 |

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

$ curl -u <login name>:<password or access token> -X POST -d@request-body.json -H "Content-Type: application/json" https://code.shoncloud.com/~api/pulls/1/title

### setDescription

Pull Request

Set Description

Set Description

Http Method
POST
End Point

/~api/pulls/{requestId}/description

| Placeholder | Description | Example |
| --- | --- | --- |
| {requestId} | Request Id | 1 |

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

$ curl -u <login name>:<password or access token> -X POST -d@request-body.json -H "Content-Type: application/json" https://code.shoncloud.com/~api/pulls/1/description

### setMergeStrategy

Pull Request

Set Merge Strategy

Set Merge Strategy

Http Method
POST
End Point

/~api/pulls/{requestId}/merge-strategy

| Placeholder | Description | Example |
| --- | --- | --- |
| {requestId} | Request Id | 1 |

Request Body

Content Type
application/json

Example

"CREATE_MERGE_COMMIT"

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

$ curl -u <login name>:<password or access token> -X POST -d@request-body.json -H "Content-Type: application/json" https://code.shoncloud.com/~api/pulls/1/merge-strategy

### setAutoMerge

Pull Request

Set Auto Merge

Set Auto Merge

Http Method
POST
End Point

/~api/pulls/{requestId}/auto-merge

| Placeholder | Description | Example |
| --- | --- | --- |
| {requestId} | Request Id | 1 |

Request Body

Content Type
application/json

Example

```json
{
  "commitMessage": "string",
  "enabled": true
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

$ curl -u <login name>:<password or access token> -X POST -d@request-body.json -H "Content-Type: application/json" https://code.shoncloud.com/~api/pulls/1/auto-merge

### reopenPullRequest

Pull Request

Reopen Pull Request

Reopen Pull Request

Http Method
POST
End Point

/~api/pulls/{requestId}/reopen

| Placeholder | Description | Example |
| --- | --- | --- |
| {requestId} | Request Id | 1 |

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

$ curl -u <login name>:<password or access token> -X POST -d@request-body.json -H "Content-Type: application/json" https://code.shoncloud.com/~api/pulls/1/reopen

### discardPullRequest

Pull Request

Discard Pull Request

Discard Pull Request

Http Method
POST
End Point

/~api/pulls/{requestId}/discard

| Placeholder | Description | Example |
| --- | --- | --- |
| {requestId} | Request Id | 1 |

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

$ curl -u <login name>:<password or access token> -X POST -d@request-body.json -H "Content-Type: application/json" https://code.shoncloud.com/~api/pulls/1/discard

### mergePullRequest

Pull Request

Merge Pull Request

Merge Pull Request

Http Method
POST
End Point

/~api/pulls/{requestId}/merge

| Placeholder | Description | Example |
| --- | --- | --- |
| {requestId} | Request Id | 1 |

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

$ curl -u <login name>:<password or access token> -X POST -d@request-body.json -H "Content-Type: application/json" https://code.shoncloud.com/~api/pulls/1/merge

### deleteSourceBranch

Pull Request

Delete Source Branch

Delete Source Branch

Http Method
POST
End Point

/~api/pulls/{requestId}/delete-source-branch

| Placeholder | Description | Example |
| --- | --- | --- |
| {requestId} | Request Id | 1 |

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

$ curl -u <login name>:<password or access token> -X POST -d@request-body.json -H "Content-Type: application/json" https://code.shoncloud.com/~api/pulls/1/delete-source-branch

### restoreSourceBranch

Pull Request

Restore Source Branch

Restore Source Branch

Http Method
POST
End Point

/~api/pulls/{requestId}/restore-source-branch

| Placeholder | Description | Example |
| --- | --- | --- |
| {requestId} | Request Id | 1 |

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

$ curl -u <login name>:<password or access token> -X POST -d@request-body.json -H "Content-Type: application/json" https://code.shoncloud.com/~api/pulls/1/restore-source-branch

### uploadAttachment

Pull Request

Upload Attachment

Upload Attachment

Upload attachment to pull request and get attachment url via response. This url can then be used in pull request description or comment

Http Method
POST
End Point

/~api/pulls/{requestId}/attachments/{preferredAttachmentName}

| Placeholder | Description | Example |
| --- | --- | --- |
| {requestId} | Request Id | 1 |
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

$ curl -u <login name>:<password or access token> -X POST --data-binary "@upload-file" -H "Content-Type: application/octet-stream" https://code.shoncloud.com/~api/pulls/1/attachments/string

### deletePullRequest

Pull Request

Delete Pull Request

Delete Pull Request

Http Method
DELETE
End Point

/~api/pulls/{requestId}

| Placeholder | Description | Example |
| --- | --- | --- |
| {requestId} | Request Id | 1 |

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

$ curl -u <login name>:<password or access token> -X DELETE https://code.shoncloud.com/~api/pulls/1
