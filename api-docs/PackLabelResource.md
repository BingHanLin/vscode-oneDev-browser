# PackLabel

Package Label

| Operation | Http Method | End Point |
| --- | --- | --- |
| Create Label | POST | /package-labels |
| Delete Label | DELETE | /package-labels/{packLabelId} |

---

## Operation Details

### createLabel

Package Label

Create Label

Create Label

Create package label

Http Method
POST
End Point

/~api/package-labels

Request Body

Content Type
application/json

Example

```json
{
  "packId": 1,
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

$ curl -u <login name>:<password or access token> -X POST -d@request-body.json -H "Content-Type: application/json" https://code.shoncloud.com/~api/package-labels

### deleteLabel

Package Label

Delete Label

Delete Label

Http Method
DELETE
End Point

/~api/package-labels/{packLabelId}

| Placeholder | Description | Example |
| --- | --- | --- |
| {packLabelId} | Pack Label Id | 1 |

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

$ curl -u <login name>:<password or access token> -X DELETE https://code.shoncloud.com/~api/package-labels/1
