# PullRequestWatch

Pull Request Watch

| Operation | Http Method | End Point |
| --- | --- | --- |
| Get | GET | /pull-request-watches/{watchId} |
| Create | POST | /pull-request-watches |
| Update | POST | /pull-request-watches/{watchId} |
| Delete | DELETE | /pull-request-watches/{watchId} |

---

## Operation Details

### get

Pull Request Watch

Get

Get

Http Method
GET
End Point

/~api/pull-request-watches/{watchId}

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
  "requestId": 1,
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

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/pull-request-watches/1

### create

Pull Request Watch

Create

Create

Create new pull request watch

Http Method
POST
End Point

/~api/pull-request-watches

Request Body

Content Type
application/json

Example

```json
{
  "requestId": 1,
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

$ curl -u <login name>:<password or access token> -X POST -d@request-body.json -H "Content-Type: application/json" https://code.shoncloud.com/~api/pull-request-watches

### update

Pull Request Watch

Update

Update

Update pull request watch of specified id

Http Method
POST
End Point

/~api/pull-request-watches/{watchId}

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

$ curl -u <login name>:<password or access token> -X POST -d@request-body.json -H "Content-Type: application/json" https://code.shoncloud.com/~api/pull-request-watches/1

### delete

Pull Request Watch

Delete

Delete

Http Method
DELETE
End Point

/~api/pull-request-watches/{watchId}

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

$ curl -u <login name>:<password or access token> -X DELETE https://code.shoncloud.com/~api/pull-request-watches/1
