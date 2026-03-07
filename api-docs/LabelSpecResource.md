# LabelSpec

Label Spec

| Operation | Http Method | End Point |
| --- | --- | --- |
| Get Spec | GET | /label-specs/{labelSpecId} |
| Query Specs | GET | /label-specs |
| Create Spec | POST | /label-specs |
| Update Spec | POST | /label-specs/{labelSpecId} |
| Delete Spec | DELETE | /label-specs/{labelSpecId} |

---

## Operation Details

### getSpec

Label Spec

Get Spec

Get Spec

Http Method
GET
End Point

/~api/label-specs/{labelSpecId}

| Placeholder | Description | Example |
| --- | --- | --- |
| {labelSpecId} | Label Spec Id | 1 |

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
  "color": "#0d87e9",
  "name": "string"
}
```

Operation Failed

Status code
Status code other than 200 indicating the error type
Response Body
Error detail of content type "text/plain"

cURL Example

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/label-specs/1

### querySpecs

Label Spec

Query Specs

Query Specs

Http Method
GET
End Point

/~api/label-specs

Query Parameters

| Parameter | Description | Required | Example |
| --- | --- | --- | --- |
| name | Name | No | string |
| offset | Offset | Yes | 0 |
| count | Count | Yes | 100 |

Response

Operation Successful

Status Code
200
Response Body

Content Type
application/json

Example

[

```json
{
  "id": 1,
  "color": "#0d87e9",
  "name": "string"
}
```

]

Operation Failed

Status code
Status code other than 200 indicating the error type
Response Body
Error detail of content type "text/plain"

cURL Example

$ curl -u <login name>:<password or access token> -G https://code.shoncloud.com/~api/label-specs --data-urlencode name=string --data-urlencode offset=0 --data-urlencode count=100

### createSpec

Label Spec

Create Spec

Create Spec

Create new label spec

Http Method
POST
End Point

/~api/label-specs

Request Body

Content Type
application/json

Example

```json
{
  "color": "#0d87e9",
  "name": "string"
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

$ curl -u <login name>:<password or access token> -X POST -d@request-body.json -H "Content-Type: application/json" https://code.shoncloud.com/~api/label-specs

### updateSpec

Label Spec

Update Spec

Update Spec

Update label spec of specified id

Http Method
POST
End Point

/~api/label-specs/{labelSpecId}

| Placeholder | Description | Example |
| --- | --- | --- |
| {labelSpecId} | Label Spec Id | 1 |

Request Body

Content Type
application/json

Example

```json
{
  "color": "#0d87e9",
  "name": "string"
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

$ curl -u <login name>:<password or access token> -X POST -d@request-body.json -H "Content-Type: application/json" https://code.shoncloud.com/~api/label-specs/1

### deleteSpec

Label Spec

Delete Spec

Delete Spec

Http Method
DELETE
End Point

/~api/label-specs/{labelSpecId}

| Placeholder | Description | Example |
| --- | --- | --- |
| {labelSpecId} | Label Spec Id | 1 |

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

$ curl -u <login name>:<password or access token> -X DELETE https://code.shoncloud.com/~api/label-specs/1
