# Artifact

Artifact

In most cases, artifact resource is operated with build id, which is different from build number. To get build id of a particular build number, use the Query Basic Info operation with query for instance "Number" is "path/to/project#100" or "Number" is "PROJECTKEY-100"

| Operation | Http Method | End Point |
| --- | --- | --- |
| Get Artifact Info | GET | /artifacts/{buildId}/infos{artifactPath:(/.*)?} |
| Download Artifact | GET | /artifacts/{buildId}/contents/{artifactPath:(.*)} |
| Upload Artifact | POST | /artifacts/{buildId}/{artifactPath:(.*)} |
| Delete Artifact | DELETE | /artifacts/{buildId}{artifactPath:(/.*)?} |

---

## Operation Details

### getArtifactInfo

Artifact

Get Artifact Info

Get Artifact Info

Get artifact info of specified path

Http Method
GET
End Point

/~api/artifacts/{buildId}/infos{artifactPath:(/.*)?}

| Placeholder | Description | Example |
| --- | --- | --- |
| {buildId} | Build Id | 1 |
| {artifactPath} | Artifact Path | /path/to/directoryOrFile |

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
  "@type": "DirectoryInfo",
  "children":
  [
    {
      "@type": "DirectoryInfo",
      "children": null,
      "path": "directory/sub-directory",
      "lastModified": 1
    },
    {
      "@type": "FileInfo",
      "length": 1000,
      "mediaType": null,
      "path": "directory/file",
      "lastModified": 1
    }
  ],
  "path": "directory",
  "lastModified": 1
}
```

Operation Failed

Status code
Status code other than 200 indicating the error type
Response Body
Error detail of content type "text/plain"

cURL Example

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/artifacts/1/infos/path/to/directoryOrFile

### downloadArtifact

Artifact

Download Artifact

Download Artifact

Download artifact of specified path

Http Method
GET
End Point

/~api/artifacts/{buildId}/contents/{artifactPath:(.*)}

| Placeholder | Description | Example |
| --- | --- | --- |
| {buildId} | Build Id | 1 |
| {artifactPath} | Artifact Path | path/to/file |

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

$ curl -u <login name>:<password or access token> -O https://code.shoncloud.com/~api/artifacts/1/contents/path/to/file

### uploadArtifact

Artifact

Upload Artifact

Upload Artifact

Upload artifact to specified path

Http Method
POST
End Point

/~api/artifacts/{buildId}/{artifactPath:(.*)}

| Placeholder | Description | Example |
| --- | --- | --- |
| {buildId} | Build Id | 1 |
| {artifactPath} | Artifact Path | path/to/file |

Request Body

Content Type
application/octet-stream

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

$ curl -u <login name>:<password or access token> -X POST --data-binary "@upload-file" -H "Content-Type: application/octet-stream" https://code.shoncloud.com/~api/artifacts/1/path/to/file

### deleteArtifact

Artifact

Delete Artifact

Delete Artifact

Delete artifact of specified path, or delete all artifacts if artifact path is not specified

Http Method
DELETE
End Point

/~api/artifacts/{buildId}{artifactPath:(/.*)?}

| Placeholder | Description | Example |
| --- | --- | --- |
| {buildId} | Build Id | 1 |
| {artifactPath} | Artifact Path | /path/to/directoryOrFile |

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

$ curl -u <login name>:<password or access token> -X DELETE https://code.shoncloud.com/~api/artifacts/1/path/to/directoryOrFile
