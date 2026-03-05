# GroupAuthorization

Group Authorization

| Operation | Http Method | End Point |
| --- | --- | --- |
| Get Authorization | GET | /group-authorizations/{authorizationId} |
| Create Authorization | POST | /group-authorizations |
| Delete Authorization | DELETE | /group-authorizations/{authorizationId} |

---

## Operation Details

### getAuthorization

Group Authorization

Get Authorization

Get Authorization

Get group authorization of specified id

Http Method
GET
End Point

/~api/group-authorizations/{authorizationId}

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
  "groupId": 1,
  "roleId": 1
}
```

Operation Failed

Status code
Status code other than 200 indicating the error type
Response Body
Error detail of content type "text/plain"

cURL Example

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/group-authorizations/1

### createAuthorization

Group Authorization

Create Authorization

Create Authorization

Create new group authorization

Http Method
POST
End Point

/~api/group-authorizations

Request Body

Content Type
application/json

Example

```json
{
  "projectId": 1,
  "groupId": 1,
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

$ curl -u <login name>:<password or access token> -X POST -d@request-body.json -H "Content-Type: application/json" https://code.shoncloud.com/~api/group-authorizations

### deleteAuthorization

Group Authorization

Delete Authorization

Delete Authorization

Delete group authorization of specified id

Http Method
DELETE
End Point

/~api/group-authorizations/{authorizationId}

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

$ curl -u <login name>:<password or access token> -X DELETE https://code.shoncloud.com/~api/group-authorizations/1
