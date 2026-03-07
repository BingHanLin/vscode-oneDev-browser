# PackBlob

Package Blob

| Operation | Http Method | End Point |
| --- | --- | --- |
| Download Blob | GET | /package-blobs/{packBlobId}/content |
| Find By Hash | GET | /package-blobs |

---

## Operation Details

### downloadBlob

Package Blob

Download Blob

Download Blob

Download package blob

Http Method
GET
End Point

/~api/package-blobs/{packBlobId}/content

| Placeholder | Description | Example |
| --- | --- | --- |
| {packBlobId} | Pack Blob Id | 1 |

Response

Operation Successful

Status Code
200
Response Body

Content Type
application/octet-stream

Operation Failed

Status code
Status code other than 200 indicating the error type
Response Body
Error detail of content type "text/plain"

cURL Example

$ curl -u <login name>:<password or access token> -O https://code.shoncloud.com/~api/package-blobs/1/content

### findByHash

Package Blob

Find By Hash

Find By Hash

Find package blob by project id and hash

Http Method
GET
End Point

/~api/package-blobs

Query Parameters

| Parameter | Description | Required | Example |
| --- | --- | --- | --- |
| projectId | Project id | No | 1 |
| hash | Hash | No | string |

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
  "sha256Hash": "string",
  "sha512Hash": "string",
  "md5Hash": "string",
  "sha1Hash": "string",
  "size": 1,
  "createDate": "2026-03-05T13:53:49.944+00:00"
}
```

Operation Failed

Status code
Status code other than 200 indicating the error type
Response Body
Error detail of content type "text/plain"

cURL Example

$ curl -u <login name>:<password or access token> -G https://code.shoncloud.com/~api/package-blobs --data-urlencode projectId=1 --data-urlencode hash=string
