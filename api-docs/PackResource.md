# Pack

Package

| Operation | Http Method | End Point |
| --- | --- | --- |
| Get Pack | GET | /packages/{packId} |
| Get Labels | GET | /packages/{packId}/labels |
| Get Blobs | GET | /packages/{packId}/blobs |
| Query Packs | GET | /packages |
| Delete Pack | DELETE | /packages/{packId} |

---

## Operation Details

### getPack

Package

Get Pack

Get Pack

Http Method
GET
End Point

/~api/packages/{packId}

| Placeholder | Description | Example |
| --- | --- | --- |
| {packId} | Pack Id | 1 |

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
  "projectId": 1,
  "type": "string",
  "name": "string",
  "version": "string",
  "prerelease": true,
  "userId": 1,
  "buildId": 1,
  "publishDate": "2026-03-05T13:53:40.260+00:00"
}
```

Operation Failed

Status code
Status code other than 200 indicating the error type
Response Body
Error detail of content type "text/plain"

cURL Example

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/packages/1

### getLabels

Package

Get Labels

Get Labels

Get list of labels

Http Method
GET
End Point

/~api/packages/{packId}/labels

| Placeholder | Description | Example |
| --- | --- | --- |
| {packId} | Pack Id | 1 |

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
  "packId": 1,
  "specId": 1
}
```

]

Operation Failed

Status code
Status code other than 200 indicating the error type
Response Body
Error detail of content type "text/plain"

cURL Example

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/packages/1/labels

### getBlobs

Package

Get Blobs

Get Blobs

Http Method
GET
End Point

/~api/packages/{packId}/blobs

| Placeholder | Description | Example |
| --- | --- | --- |
| {packId} | Pack Id | 1 |

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
  "projectId": 1,
  "sha256Hash": "string",
  "sha512Hash": "string",
  "md5Hash": "string",
  "sha1Hash": "string",
  "size": 1,
  "createDate": "2026-03-05T13:53:43.040+00:00"
}
```

]

Operation Failed

Status code
Status code other than 200 indicating the error type
Response Body
Error detail of content type "text/plain"

cURL Example

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/packages/1/blobs

### queryPacks

Package

Query Packs

Query Packs

Http Method
GET
End Point

/~api/packages

Query Parameters

| Parameter | Description | Required | Example |
| --- | --- | --- | --- |
| query | Syntax of this query is the same as in packages page | No | "Type" is "Container Image" |
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
  "projectId": 1,
  "type": "string",
  "name": "string",
  "version": "string",
  "prerelease": true,
  "userId": 1,
  "buildId": 1,
  "publishDate": "2026-03-05T13:53:44.423+00:00"
}
```

]

Operation Failed

Status code
Status code other than 200 indicating the error type
Response Body
Error detail of content type "text/plain"

cURL Example

$ curl -u <login name>:<password or access token> -G https://code.shoncloud.com/~api/packages --data-urlencode 'query="Type" is "Container Image"' --data-urlencode offset=0 --data-urlencode count=100

### deletePack

Package

Delete Pack

Delete Pack

Http Method
DELETE
End Point

/~api/packages/{packId}

| Placeholder | Description | Example |
| --- | --- | --- |
| {packId} | Pack Id | 1 |

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

$ curl -u <login name>:<password or access token> -X DELETE https://code.shoncloud.com/~api/packages/1
