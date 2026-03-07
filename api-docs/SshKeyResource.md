# SshKey

Ssh Key

| Operation | Http Method | End Point |
| --- | --- | --- |
| Get Key | GET | /ssh-keys/{sshKeyId} |
| Create Key | POST | /ssh-keys |
| Delete Key | DELETE | /ssh-keys/{sshKeyId} |

---

## Operation Details

### getKey

Ssh Key

Get Key

Get Key

Http Method
GET
End Point

/~api/ssh-keys/{sshKeyId}

| Placeholder | Description | Example |
| --- | --- | --- |
| {sshKeyId} | Ssh Key Id | 1 |

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
  "content": "string",
  "ownerId": 1
}
```

Operation Failed

Status code
Status code other than 200 indicating the error type
Response Body
Error detail of content type "text/plain"

cURL Example

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/ssh-keys/1

### createKey

Ssh Key

Create Key

Create Key

Create new ssh key

Http Method
POST
End Point

/~api/ssh-keys

Request Body

Content Type
application/json

Example

```json
{
  "content": "string",
  "ownerId": 1
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

$ curl -u <login name>:<password or access token> -X POST -d@request-body.json -H "Content-Type: application/json" https://code.shoncloud.com/~api/ssh-keys

### deleteKey

Ssh Key

Delete Key

Delete Key

Http Method
DELETE
End Point

/~api/ssh-keys/{sshKeyId}

| Placeholder | Description | Example |
| --- | --- | --- |
| {sshKeyId} | Ssh Key Id | 1 |

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

$ curl -u <login name>:<password or access token> -X DELETE https://code.shoncloud.com/~api/ssh-keys/1
