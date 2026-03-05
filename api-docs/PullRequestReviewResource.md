# PullRequestReview

Pull Request Review

| Operation | Http Method | End Point |
| --- | --- | --- |
| Get | GET | /pull-request-reviews/{reviewId} |
| Create | POST | /pull-request-reviews |
| Update | POST | /pull-request-reviews/{reviewId} |

---

## Operation Details

### get

Pull Request Review

Get

Get

Http Method
GET
End Point

/~api/pull-request-reviews/{reviewId}

| Placeholder | Description | Example |
| --- | --- | --- |
| {reviewId} | Review Id | 1 |

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
  "requestId": 1,
  "status": "PENDING",
  "statusDate": "2026-03-05T13:55:16.270+00:00"
}
```

Operation Failed

Status code
Status code other than 200 indicating the error type
Response Body
Error detail of content type "text/plain"

cURL Example

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/pull-request-reviews/1

### create

Pull Request Review

Create

Create

Create new pull request review

Http Method
POST
End Point

/~api/pull-request-reviews

Request Body

Content Type
application/json

Example

```json
{
  "userId": 1,
  "requestId": 1,
  "status": "PENDING"
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

$ curl -u <login name>:<password or access token> -X POST -d@request-body.json -H "Content-Type: application/json" https://code.shoncloud.com/~api/pull-request-reviews

### update

Pull Request Review

Update

Update

Update pull request review of specified id

Http Method
POST
End Point

/~api/pull-request-reviews/{reviewId}

| Placeholder | Description | Example |
| --- | --- | --- |
| {reviewId} | Review Id | 1 |

Request Body

Content Type
application/json

Example

```json
{
  "status": "PENDING"
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

$ curl -u <login name>:<password or access token> -X POST -d@request-body.json -H "Content-Type: application/json" https://code.shoncloud.com/~api/pull-request-reviews/1
