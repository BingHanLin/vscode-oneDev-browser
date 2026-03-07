# IssueWatch

Issue Watch

| Operation | Http Method | End Point |
| --- | --- | --- |
| Get Watch | GET | /issue-watches/{watchId} |
| Create Watch | POST | /issue-watches |
| Update Watch | POST | /issue-watches/{watchId} |
| Delete Watch | DELETE | /issue-watches/{watchId} |

---

## Operation Details

### getWatch

Issue Watch

Get Watch

Get Watch

Http Method
GET
End Point

/~api/issue-watches/{watchId}

| Placeholder | Description | Example |
| --- | --- | --- |
| {watchId} | Watch Id | 1 |

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
  "watching": true
}
```

Operation Failed

Status code
Status code other than 200 indicating the error type
Response Body
Error detail of content type "text/plain"

cURL Example

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/issue-watches/1

### createWatch

Issue Watch

Create Watch

Create Watch

Create new issue watch

Http Method
POST
End Point

/~api/issue-watches

Request Body

Content Type
application/json

Example

```json
{
  "issueId": 1,
  "userId": 1,
  "watching": true
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

$ curl -u <login name>:<password or access token> -X POST -d@request-body.json -H "Content-Type: application/json" https://code.shoncloud.com/~api/issue-watches

### updateWatch

Issue Watch

Update Watch

Update Watch

Update issue watch of specified id

Http Method
POST
End Point

/~api/issue-watches/{watchId}

| Placeholder | Description | Example |
| --- | --- | --- |
| {watchId} | Watch Id | 1 |

Request Body

Content Type
application/json

Example

```json
{
  "watching": true
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

$ curl -u <login name>:<password or access token> -X POST -d@request-body.json -H "Content-Type: application/json" https://code.shoncloud.com/~api/issue-watches/1

### deleteWatch

Issue Watch

Delete Watch

Delete Watch

Http Method
DELETE
End Point

/~api/issue-watches/{watchId}

| Placeholder | Description | Example |
| --- | --- | --- |
| {watchId} | Watch Id | 1 |

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

$ curl -u <login name>:<password or access token> -X DELETE https://code.shoncloud.com/~api/issue-watches/1
