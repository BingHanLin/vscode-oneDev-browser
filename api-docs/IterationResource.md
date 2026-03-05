# Iteration

Iteration

| Operation | Http Method | End Point |
| --- | --- | --- |
| Get Iteration | GET | /iterations/{iterationId} |
| Create Iteration | POST | /iterations |
| Update Iteration | POST | /iterations/{iterationId} |
| Delete Iteration | DELETE | /iterations/{iterationId} |

---

## Operation Details

### getIteration

Iteration

Get Iteration

Get Iteration

Http Method
GET
End Point

/~api/iterations/{iterationId}

| Placeholder | Description | Example |
| --- | --- | --- |
| {iterationId} | Iteration Id | 1 |

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
  "startDay": 1,
  "dueDay": 1,
  "projectId": 1,
  "name": "string",
  "closed": true
}
```

Operation Failed

Status code
Status code other than 200 indicating the error type
Response Body
Error detail of content type "text/plain"

cURL Example

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/iterations/1

### createIteration

Iteration

Create Iteration

Create Iteration

Create new iteration

Http Method
POST
End Point

/~api/iterations

Request Body

Content Type
application/json

Example

```json
{
  "description": "string",
  "startDay": 1,
  "dueDay": 1,
  "projectId": 1,
  "name": "string",
  "closed": true
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

$ curl -u <login name>:<password or access token> -X POST -d@request-body.json -H "Content-Type: application/json" https://code.shoncloud.com/~api/iterations

### updateIteration

Iteration

Update Iteration

Update Iteration

Update iteration of specified id

Http Method
POST
End Point

/~api/iterations/{iterationId}

| Placeholder | Description | Example |
| --- | --- | --- |
| {iterationId} | Iteration Id | 1 |

Request Body

Content Type
application/json

Example

```json
{
  "description": "string",
  "startDay": 1,
  "dueDay": 1,
  "name": "string",
  "closed": true
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

$ curl -u <login name>:<password or access token> -X POST -d@request-body.json -H "Content-Type: application/json" https://code.shoncloud.com/~api/iterations/1

### deleteIteration

Iteration

Delete Iteration

Delete Iteration

Http Method
DELETE
End Point

/~api/iterations/{iterationId}

| Placeholder | Description | Example |
| --- | --- | --- |
| {iterationId} | Iteration Id | 1 |

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

$ curl -u <login name>:<password or access token> -X DELETE https://code.shoncloud.com/~api/iterations/1
