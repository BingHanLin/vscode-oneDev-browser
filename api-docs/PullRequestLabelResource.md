# PullRequestLabel

Pull Request Label

| Operation | Http Method | End Point |
| --- | --- | --- |
| Create | POST | /pull-request-labels |
| Delete | DELETE | /pull-request-labels/{pullRequestLabelId} |

---

## Operation Details

### create

Pull Request Label

Create

Create

Create pull request label

Http Method
POST
End Point

/~api/pull-request-labels

Request Body

Content Type
application/json

Example

```json
{
  "requestId": 1,
  "specId": 1
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

$ curl -u <login name>:<password or access token> -X POST -d@request-body.json -H "Content-Type: application/json" https://code.shoncloud.com/~api/pull-request-labels

### delete

Pull Request Label

Delete

Delete

Http Method
DELETE
End Point

/~api/pull-request-labels/{pullRequestLabelId}

| Placeholder | Description | Example |
| --- | --- | --- |
| {pullRequestLabelId} | Pull Request Label Id | 1 |

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

$ curl -u <login name>:<password or access token> -X DELETE https://code.shoncloud.com/~api/pull-request-labels/1
