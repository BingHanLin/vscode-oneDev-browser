# IssueLink

Issue Link

| Operation | Http Method | End Point |
| --- | --- | --- |
| Get Link | GET | /issue-links/{linkId} |
| Create Link | POST | /issue-links |
| Delete Link | DELETE | /issue-links/{linkId} |

---

## Operation Details

### getLink

Issue Link

Get Link

Get Link

Http Method
GET
End Point

/~api/issue-links/{linkId}

| Placeholder | Description | Example |
| --- | --- | --- |
| {linkId} | Link Id | 1 |

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
  "sourceId": 1,
  "targetId": 1,
  "specId": 1,
  "position": 1
}
```

Operation Failed

Status code
Status code other than 200 indicating the error type
Response Body
Error detail of content type "text/plain"

cURL Example

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/issue-links/1

### createLink

Issue Link

Create Link

Create Link

Create new issue link

Http Method
POST
End Point

/~api/issue-links

Request Body

Content Type
application/json

Example

```json
{
  "sourceId": 1,
  "targetId": 1,
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

$ curl -u <login name>:<password or access token> -X POST -d@request-body.json -H "Content-Type: application/json" https://code.shoncloud.com/~api/issue-links

### deleteLink

Issue Link

Delete Link

Delete Link

Http Method
DELETE
End Point

/~api/issue-links/{linkId}

| Placeholder | Description | Example |
| --- | --- | --- |
| {linkId} | Link Id | 1 |

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

$ curl -u <login name>:<password or access token> -X DELETE https://code.shoncloud.com/~api/issue-links/1
