# PullRequestComment

Pull Request Comment

| Operation | Http Method | End Point |
| --- | --- | --- |
| Get | GET | /pull-request-comments/{commentId} |
| Create | POST | /pull-request-comments |
| Update | POST | /pull-request-comments/{commentId} |
| Delete | DELETE | /pull-request-comments/{commentId} |

---

## Operation Details

### get

Pull Request Comment

Get

Get

Http Method
GET
End Point

/~api/pull-request-comments/{commentId}

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
  "requestId": 1,
  "revisionCount": 1,
  "date": "2026-03-05T13:55:05.330+00:00",
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

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/pull-request-comments/1

### create

Pull Request Comment

Create

Create

Create new pull request comment

Http Method
POST
End Point

/~api/pull-request-comments

Request Body

Content Type
application/json

Example

```json
{
  "requestId": 1,
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

$ curl -u <login name>:<password or access token> -X POST -d@request-body.json -H "Content-Type: application/json" https://code.shoncloud.com/~api/pull-request-comments

### update

Pull Request Comment

Update

Update

Update pull request comment of specified id

Http Method
POST
End Point

/~api/pull-request-comments/{commentId}

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

$ curl -u <login name>:<password or access token> -X POST -d@request-body.json -H "Content-Type: application/json" https://code.shoncloud.com/~api/pull-request-comments/1

### delete

Pull Request Comment

Delete

Delete

Http Method
DELETE
End Point

/~api/pull-request-comments/{commentId}

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

$ curl -u <login name>:<password or access token> -X DELETE https://code.shoncloud.com/~api/pull-request-comments/1
