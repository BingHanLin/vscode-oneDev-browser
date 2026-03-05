# CodeComment

Code Comment

| Operation | Http Method | End Point |
| --- | --- | --- |
| Get Comment | GET | /code-comments/{commentId} |
| Delete Comment | DELETE | /code-comments/{commentId} |

---

## Operation Details

### getComment

Code Comment

Get Comment

Get Comment

Http Method
GET
End Point

/~api/code-comments/{commentId}

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
  "projectId": 1,
  "userId": 1,
  "content": "string",
  "createDate": "2026-03-05T13:51:34.215+00:00",
  "lastActivity":
  {
    "userId": 1,
    "date": "2026-03-05T13:51:34.215+00:00",
    "description": "string"
  },
  "replyCount": 1,
  "mark":
  {
    "commitHash": "string",
    "path": "string",
    "range":
    {
      "fromRow": 1,
      "fromColumn": 1,
      "toRow": 1,
      "toColumn": 1,
      "tabWidth": 1
    }
  },
  "compareContext":
  {
    "pullRequestId": 1,
    "oldCommitHash": "string",
    "newCommitHash": "string",
    "pathFilter": "string",
    "whitespaceOption": "IGNORE_TRAILING"
  },
  "resolved": true,
  "uuid": "string"
}
```

Operation Failed

Status code
Status code other than 200 indicating the error type
Response Body
Error detail of content type "text/plain"

cURL Example

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/code-comments/1

### deleteComment

Code Comment

Delete Comment

Delete Comment

Http Method
DELETE
End Point

/~api/code-comments/{commentId}

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

$ curl -u <login name>:<password or access token> -X DELETE https://code.shoncloud.com/~api/code-comments/1
