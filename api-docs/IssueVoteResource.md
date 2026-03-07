# IssueVote

Issue Vote

| Operation | Http Method | End Point |
| --- | --- | --- |
| Get Vote | GET | /issue-votes/{voteId} |
| Create Vote | POST | /issue-votes |
| Delete Vote | DELETE | /issue-votes/{voteId} |

---

## Operation Details

### getVote

Issue Vote

Get Vote

Get Vote

Http Method
GET
End Point

/~api/issue-votes/{voteId}

| Placeholder | Description | Example |
| --- | --- | --- |
| {voteId} | Vote Id | 1 |

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
  "date": "2026-03-05T13:52:54.669+00:00"
}
```

Operation Failed

Status code
Status code other than 200 indicating the error type
Response Body
Error detail of content type "text/plain"

cURL Example

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/issue-votes/1

### createVote

Issue Vote

Create Vote

Create Vote

Create new issue vote

Http Method
POST
End Point

/~api/issue-votes

Request Body

Content Type
application/json

Example

```json
{
  "issueId": 1,
  "userId": 1
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

$ curl -u <login name>:<password or access token> -X POST -d@request-body.json -H "Content-Type: application/json" https://code.shoncloud.com/~api/issue-votes

### deleteVote

Issue Vote

Delete Vote

Delete Vote

Http Method
DELETE
End Point

/~api/issue-votes/{voteId}

| Placeholder | Description | Example |
| --- | --- | --- |
| {voteId} | Vote Id | 1 |

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

$ curl -u <login name>:<password or access token> -X DELETE https://code.shoncloud.com/~api/issue-votes/1
