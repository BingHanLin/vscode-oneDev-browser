# Version

Version

Version info for server and various tools

| Operation | Http Method | End Point |
| --- | --- | --- |
| Get Server Version | GET | /version/server |
| Get Compatible Tod Versions | GET | /version/compatible-tod-versions |

---

## Operation Details

### getServerVersion

Version

Get Server Version

Get Server Version

Get server version

Http Method
GET
End Point

/~api/version/server

Response

Operation Successful

Status Code
200
Response Body

Content Type
application/json

Example

string

Operation Failed

Status code
Status code other than 200 indicating the error type
Response Body
Error detail of content type "text/plain"

cURL Example

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/version/server

### getCompatibleTodVersions

Version

Get Compatible Tod Versions

Get Compatible Tod Versions

Get tod version range compatible with this server

Http Method
GET
End Point

/~api/version/compatible-tod-versions

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
  "minVersion": "1.0.0",
  "maxVersion": "2.0.0"
}
```

Operation Failed

Status code
Status code other than 200 indicating the error type
Response Body
Error detail of content type "text/plain"

cURL Example

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/version/compatible-tod-versions
