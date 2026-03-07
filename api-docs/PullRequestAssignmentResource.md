# PullRequestAssignment

Pull Request Assignment

| Operation | Http Method | End Point |
| --- | --- | --- |
| Get | GET | /pull-request-assignments/{assignmentId} |
| Create | POST | /pull-request-assignments |
| Delete | DELETE | /pull-request-assignments/{assignmentId} |

---

## Operation Details

### get

Pull Request Assignment

Get

Get

Http Method
GET
End Point

/~api/pull-request-assignments/{assignmentId}

| Placeholder | Description | Example |
| --- | --- | --- |
| {assignmentId} | Assignment Id | 1 |

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
  "userId": 1,
  "requestId": 1
}
```

Operation Failed

Status code
Status code other than 200 indicating the error type
Response Body
Error detail of content type "text/plain"

cURL Example

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/pull-request-assignments/1

### create

Pull Request Assignment

Create

Create

Create new pull request assignment

Http Method
POST
End Point

/~api/pull-request-assignments

Request Body

Content Type
application/json

Example

```json
{
  "userId": 1,
  "requestId": 1
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

$ curl -u <login name>:<password or access token> -X POST -d@request-body.json -H "Content-Type: application/json" https://code.shoncloud.com/~api/pull-request-assignments

### delete

Pull Request Assignment

Delete

Delete

Http Method
DELETE
End Point

/~api/pull-request-assignments/{assignmentId}

| Placeholder | Description | Example |
| --- | --- | --- |
| {assignmentId} | Assignment Id | 1 |

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

$ curl -u <login name>:<password or access token> -X DELETE https://code.shoncloud.com/~api/pull-request-assignments/1
