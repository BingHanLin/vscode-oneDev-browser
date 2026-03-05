# ProjectLabel

Project Label

| Operation | Http Method | End Point |
| --- | --- | --- |
| Add Label | POST | /project-labels |
| Remove Label | DELETE | /project-labels/{projectLabelId} |

---

## Operation Details

### addLabel

Project Label

Add Label

Add Label

Add project label

Http Method
POST
End Point

/~api/project-labels

Request Body

Content Type
application/json

Example

```json
{
  "projectId": 1,
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

$ curl -u <login name>:<password or access token> -X POST -d@request-body.json -H "Content-Type: application/json" https://code.shoncloud.com/~api/project-labels

### removeLabel

Project Label

Remove Label

Remove Label

Http Method
DELETE
End Point

/~api/project-labels/{projectLabelId}

| Placeholder | Description | Example |
| --- | --- | --- |
| {projectLabelId} | Project Label Id | 1 |

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

$ curl -u <login name>:<password or access token> -X DELETE https://code.shoncloud.com/~api/project-labels/1
