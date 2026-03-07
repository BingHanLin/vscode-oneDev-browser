# BuildLogStream

Build Log Stream

Build log stream resource is operated with build id, which is different from build number. To get build id of a particular build number, use the Query Basic Info operation with query for instance "Number" is "path/to/project#100" or "Number" is "PROJECTKEY-100"

| Operation | Http Method | End Point |
| --- | --- | --- |
| Download Log | GET | /streaming/build-logs/{buildId} |

---

## Operation Details

### downloadLog

Build Log Stream

Download Log

Download Log

Streaming log of specified build

Http Method
GET
End Point

/~api/streaming/build-logs/{buildId}

| Placeholder | Description | Example |
| --- | --- | --- |
| {buildId} | Build Id | 1 |

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

$ curl -u <login name>:<password or access token> -O https://code.shoncloud.com/~api/streaming/build-logs/1
