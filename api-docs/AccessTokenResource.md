# AccessToken

Access Token

| Operation | Http Method | End Point |
| --- | --- | --- |
| Get Token | GET | /access-tokens/{accessTokenId} |
| Get Authorizations | GET | /access-tokens/{accessTokenId}/authorizations |
| Create Token | POST | /access-tokens |
| Update Token | POST | /access-tokens/{accessTokenId} |
| Delete Token | DELETE | /access-tokens/{accessTokenId} |

---

## Operation Details

### getToken

Access Token

Get Token

Get Token

Http Method
GET
End Point

/~api/access-tokens/{accessTokenId}

| Placeholder | Description | Example |
| --- | --- | --- |
| {accessTokenId} | Access Token Id | 1 |

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
  "name": "string",
  "ownerId": 1,
  "value": "string",
  "hasOwnerPermissions": true,
  "createDate": "2026-03-05T13:50:31.381+00:00",
  "expireDate": "2026-03-05T13:50:31.381+00:00"
}
```

Operation Failed

Status code
Status code other than 200 indicating the error type
Response Body
Error detail of content type "text/plain"

cURL Example

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/access-tokens/1

### getAuthorizations

Access Token

Get Authorizations

Get Authorizations

Http Method
GET
End Point

/~api/access-tokens/{accessTokenId}/authorizations

| Placeholder | Description | Example |
| --- | --- | --- |
| {accessTokenId} | Access Token Id | 1 |

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
  "tokenId": 1,
  "roleId": 1
}
```

]

Operation Failed

Status code
Status code other than 200 indicating the error type
Response Body
Error detail of content type "text/plain"

cURL Example

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/access-tokens/1/authorizations

### createToken

Access Token

Create Token

Create Token

Create access token

Http Method
POST
End Point

/~api/access-tokens

Request Body

Content Type
application/json

Example

```json
{
  "name": "string",
  "ownerId": 1,
  "hasOwnerPermissions": true,
  "expireDate": "2026-03-05T13:50:34.122+00:00"
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

$ curl -u <login name>:<password or access token> -X POST -d@request-body.json -H "Content-Type: application/json" https://code.shoncloud.com/~api/access-tokens

### updateToken

Access Token

Update Token

Update Token

Update access token

Http Method
POST
End Point

/~api/access-tokens/{accessTokenId}

| Placeholder | Description | Example |
| --- | --- | --- |
| {accessTokenId} | Access Token Id | 1 |

Request Body

Content Type
application/json

Example

```json
{
  "name": "string",
  "hasOwnerPermissions": true,
  "expireDate": "2026-03-05T13:50:35.458+00:00"
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

$ curl -u <login name>:<password or access token> -X POST -d@request-body.json -H "Content-Type: application/json" https://code.shoncloud.com/~api/access-tokens/1

### deleteToken

Access Token

Delete Token

Delete Token

Http Method
DELETE
End Point

/~api/access-tokens/{accessTokenId}

| Placeholder | Description | Example |
| --- | --- | --- |
| {accessTokenId} | Access Token Id | 1 |

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

$ curl -u <login name>:<password or access token> -X DELETE https://code.shoncloud.com/~api/access-tokens/1
