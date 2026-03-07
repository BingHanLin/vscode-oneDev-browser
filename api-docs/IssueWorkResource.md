# IssueWork

Issue Work

| Operation | Http Method | End Point |
| --- | --- | --- |
| Get Work | GET | /issue-works/{workId} |
| Create Work | POST | /issue-works |
| Update Work | POST | /issue-works/{workId} |
| Delete Work | DELETE | /issue-works/{workId} |

---

## Operation Details

### getWork

Issue Work

Get Work

Get Work

Http Method
GET
End Point

/~api/issue-works/{workId}

| Placeholder | Description | Example |
| --- | --- | --- |
| {workId} | Work Id | 1 |

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
  "userId": 1,
  "date": "2026-03-05T13:53:07.109+00:00",
  "minutes": 1,
  "note": "string"
}
```

Operation Failed

Status code
Status code other than 200 indicating the error type
Response Body
Error detail of content type "text/plain"

cURL Example

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/issue-works/1

### createWork

Issue Work

Create Work

Create Work

Log new issue work

Http Method
POST
End Point

/~api/issue-works

Request Body

Content Type
application/json

Example

```json
{
  "issueId": 1,
  "userId": 1,
  "minutes": 1,
  "note": "string"
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

$ curl -u <login name>:<password or access token> -X POST -d@request-body.json -H "Content-Type: application/json" https://code.shoncloud.com/~api/issue-works

### updateWork

Issue Work

Update Work

Update Work

Update issue work of specified id

Http Method
POST
End Point

/~api/issue-works/{workId}

| Placeholder | Description | Example |
| --- | --- | --- |
| {workId} | Work Id | 1 |

Request Body

Content Type
application/json

Example

```json
{
  "minutes": 1,
  "note": "string"
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

$ curl -u <login name>:<password or access token> -X POST -d@request-body.json -H "Content-Type: application/json" https://code.shoncloud.com/~api/issue-works/1

### deleteWork

Issue Work

Delete Work

Delete Work

Http Method
DELETE
End Point

/~api/issue-works/{workId}

| Placeholder | Description | Example |
| --- | --- | --- |
| {workId} | Work Id | 1 |

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

$ curl -u <login name>:<password or access token> -X DELETE https://code.shoncloud.com/~api/issue-works/1
