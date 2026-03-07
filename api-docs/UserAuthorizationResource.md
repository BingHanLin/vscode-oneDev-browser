# UserAuthorization

User Authorization

| Operation | Http Method | End Point |
| --- | --- | --- |
| Get Authorization | GET | /user-authorizations/{authorizationId} |
| Create Authorization | POST | /user-authorizations |
| Delete Authorization | DELETE | /user-authorizations/{authorizationId} |

---

## Operation Details

### getAuthorization

User Authorization

Get Authorization

Get Authorization

Get user authorization of specified id

Http Method
GET
End Point

/~api/user-authorizations/{authorizationId}

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
  "userId": 1,
  "roleId": 1
}
```

Operation Failed

Status code
Status code other than 200 indicating the error type
Response Body
Error detail of content type "text/plain"

cURL Example

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/user-authorizations/1

### createAuthorization

User Authorization

Create Authorization

Create Authorization

Create user authorization

Http Method
POST
End Point

/~api/user-authorizations

Request Body

Content Type
application/json

Example

```json
{
  "projectId": 1,
  "userId": 1,
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

$ curl -u <login name>:<password or access token> -X POST -d@request-body.json -H "Content-Type: application/json" https://code.shoncloud.com/~api/user-authorizations

### deleteAuthorization

User Authorization

Delete Authorization

Delete Authorization

Delete user authorization of specified id

Http Method
DELETE
End Point

/~api/user-authorizations/{authorizationId}

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

$ curl -u <login name>:<password or access token> -X DELETE https://code.shoncloud.com/~api/user-authorizations/1
