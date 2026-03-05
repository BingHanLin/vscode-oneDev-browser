# BuildLabel

Build Label

| Operation | Http Method | End Point |
| --- | --- | --- |
| Create Label | POST | /build-labels |
| Delete Label | DELETE | /build-labels/{buildLabelId} |

---

## Operation Details

### createLabel

Build Label

Create Label

Create Label

Create build label

Http Method
POST
End Point

/~api/build-labels

Request Body

Content Type
application/json

Example

```json
{
  "buildId": 1,
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

$ curl -u <login name>:<password or access token> -X POST -d@request-body.json -H "Content-Type: application/json" https://code.shoncloud.com/~api/build-labels

### deleteLabel

Build Label

Delete Label

Delete Label

Http Method
DELETE
End Point

/~api/build-labels/{buildLabelId}

| Placeholder | Description | Example |
| --- | --- | --- |
| {buildLabelId} | Build Label Id | 1 |

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

$ curl -u <login name>:<password or access token> -X DELETE https://code.shoncloud.com/~api/build-labels/1
