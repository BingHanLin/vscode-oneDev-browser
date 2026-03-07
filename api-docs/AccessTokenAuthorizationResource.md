# AccessTokenAuthorization

Access Token Authorization

This resource manages project authorizations of access tokens. Note that project authorizations will not take effect if option hasOwnerPermissions is enabled for associated access token

| Operation | Http Method | End Point |
| --- | --- | --- |
| Get Authorization | GET | /access-token-authorizations/{authorizationId} |
| Create Authorization | POST | /access-token-authorizations |
| Update Authorization | POST | /access-token-authorizations/{authorizationId} |
| Delete Authorization | DELETE | /access-token-authorizations/{authorizationId} |

---

## Operation Details

### getAuthorization

Access Token Authorization

Get Authorization

Get Authorization

Get access token authorization of specified id

Http Method
GET
End Point

/~api/access-token-authorizations/{authorizationId}

| Placeholder | Description | Example |
| --- | --- | --- |
| {authorizationId} | Authorization Id | 1 |

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
  "tokenId": 1,
  "roleId": 1
}
```

Operation Failed

Status code
Status code other than 200 indicating the error type
Response Body
Error detail of content type "text/plain"

cURL Example

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/access-token-authorizations/1

### createAuthorization

Access Token Authorization

Create Authorization

Create Authorization

Create access token authorization. Access token owner should have permission to manage authorized project

Http Method
POST
End Point

/~api/access-token-authorizations

Request Body

Content Type
application/json

Example

```json
{
  "projectId": 1,
  "tokenId": 1,
  "roleId": 1
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

$ curl -u <login name>:<password or access token> -X POST -d@request-body.json -H "Content-Type: application/json" https://code.shoncloud.com/~api/access-token-authorizations

### updateAuthorization

Access Token Authorization

Update Authorization

Update Authorization

Update access authorization of specified id. Access token owner should have permission to manage authorized project

Http Method
POST
End Point

/~api/access-token-authorizations/{authorizationId}

| Placeholder | Description | Example |
| --- | --- | --- |
| {authorizationId} | Authorization Id | 1 |

Request Body

Content Type
application/json

Example

```json
{
  "projectId": 1,
  "roleId": 1
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

$ curl -u <login name>:<password or access token> -X POST -d@request-body.json -H "Content-Type: application/json" https://code.shoncloud.com/~api/access-token-authorizations/1

### deleteAuthorization

Access Token Authorization

Delete Authorization

Delete Authorization

Delete access token authorization of specified id

Http Method
DELETE
End Point

/~api/access-token-authorizations/{authorizationId}

| Placeholder | Description | Example |
| --- | --- | --- |
| {authorizationId} | Authorization Id | 1 |

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

$ curl -u <login name>:<password or access token> -X DELETE https://code.shoncloud.com/~api/access-token-authorizations/1
