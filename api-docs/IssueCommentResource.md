# IssueComment

Issue Comment

| Operation | Http Method | End Point |
| --- | --- | --- |
| Get Comment | GET | /issue-comments/{commentId} |
| Create Comment | POST | /issue-comments |
| Update Comment | POST | /issue-comments/{commentId} |
| Delete Comment | DELETE | /issue-comments/{commentId} |

---

## Operation Details

### getComment

Issue Comment

Get Comment

Get Comment

Http Method
GET
End Point

/~api/issue-comments/{commentId}

| Placeholder | Description | Example |
| --- | --- | --- |
| {commentId} | Comment Id | 1 |

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
  "issueId": 1,
  "revisionCount": 1,
  "onBehalfOf":
  {
    "address": "string",
    "personal": "string",
    "encodedPersonal": "string"
  },
  "date": "2026-03-05T13:52:42.211+00:00",
  "userId": 1,
  "content": "string"
}
```

Operation Failed

Status code
Status code other than 200 indicating the error type
Response Body
Error detail of content type "text/plain"

cURL Example

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/issue-comments/1

### createComment

Issue Comment

Create Comment

Create Comment

Create new issue comment

Http Method
POST
End Point

/~api/issue-comments

Request Body

Content Type
application/json

Example

```json
{
  "issueId": 1,
  "onBehalfOf":
  {
    "address": "string",
    "personal": "string",
    "encodedPersonal": "string"
  },
  "userId": 1,
  "content": "string"
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

$ curl -u <login name>:<password or access token> -X POST -d@request-body.json -H "Content-Type: application/json" https://code.shoncloud.com/~api/issue-comments

### updateComment

Issue Comment

Update Comment

Update Comment

Update issue comment of specified id

Http Method
POST
End Point

/~api/issue-comments/{commentId}

| Placeholder | Description | Example |
| --- | --- | --- |
| {commentId} | Comment Id | 1 |

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

$ curl -u <login name>:<password or access token> -X POST -d@request-body.json -H "Content-Type: application/json" https://code.shoncloud.com/~api/issue-comments/1

### deleteComment

Issue Comment

Delete Comment

Delete Comment

Http Method
DELETE
End Point

/~api/issue-comments/{commentId}

| Placeholder | Description | Example |
| --- | --- | --- |
| {commentId} | Comment Id | 1 |

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

$ curl -u <login name>:<password or access token> -X DELETE https://code.shoncloud.com/~api/issue-comments/1
