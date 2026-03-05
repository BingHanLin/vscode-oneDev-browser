# BaseAuthorization

Base Authorization

This resource manages default roles of project

| Operation | Http Method | End Point |
| --- | --- | --- |
| Get Authorization | GET | /base-authorizations/{authorizationId} |
| Create Authorization | POST | /base-authorizations |
| Delete Authorization | DELETE | /base-authorizations/{authorizationId} |

---

## Operation Details

### getAuthorization

Base Authorization

Get Authorization

Get Authorization

Get base authorization of specified id

Http Method
GET
End Point

/~api/base-authorizations/{authorizationId}

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
  "roleId": 1
}
```

Operation Failed

Status code
Status code other than 200 indicating the error type
Response Body
Error detail of content type "text/plain"

cURL Example

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/base-authorizations/1

### createAuthorization

Base Authorization

Create Authorization

Create Authorization

Create base authorization

Http Method
POST
End Point

/~api/base-authorizations

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

$ curl -u <login name>:<password or access token> -X POST -d@request-body.json -H "Content-Type: application/json" https://code.shoncloud.com/~api/base-authorizations

### deleteAuthorization

Base Authorization

Delete Authorization

Delete Authorization

Delete base authorization of specified id

Http Method
DELETE
End Point

/~api/base-authorizations/{authorizationId}

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

$ curl -u <login name>:<password or access token> -X DELETE https://code.shoncloud.com/~api/base-authorizations/1
