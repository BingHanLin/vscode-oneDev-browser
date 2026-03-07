# Group

Group

| Operation | Http Method | End Point |
| --- | --- | --- |
| Get Group | GET | /groups/{groupId} |
| Get Authorizations | GET | /groups/{groupId}/authorizations |
| Get Memberships | GET | /groups/{groupId}/memberships |
| Query Groups | GET | /groups |
| Get Group Id | GET | /groups/ids/{name} |
| Create Group | POST | /groups |
| Update Group | POST | /groups/{groupId} |
| Delete Group | DELETE | /groups/{groupId} |

---

## Operation Details

### getGroup

Group

Get Group

Get Group

Http Method
GET
End Point

/~api/groups/{groupId}

| Placeholder | Description | Example |
| --- | --- | --- |
| {groupId} | Group Id | 1 |

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
  "description": "string",
  "administrator": true,
  "createRootProjects": true,
  "enforce2FA": true
}
```

Operation Failed

Status code
Status code other than 200 indicating the error type
Response Body
Error detail of content type "text/plain"

cURL Example

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/groups/1

### getAuthorizations

Group

Get Authorizations

Get Authorizations

Http Method
GET
End Point

/~api/groups/{groupId}/authorizations

| Placeholder | Description | Example |
| --- | --- | --- |
| {groupId} | Group Id | 1 |

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
  "groupId": 1,
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

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/groups/1/authorizations

### getMemberships

Group

Get Memberships

Get Memberships

Http Method
GET
End Point

/~api/groups/{groupId}/memberships

| Placeholder | Description | Example |
| --- | --- | --- |
| {groupId} | Group Id | 1 |

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
  "userId": 1,
  "groupId": 1
}
```

]

Operation Failed

Status code
Status code other than 200 indicating the error type
Response Body
Error detail of content type "text/plain"

cURL Example

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/groups/1/memberships

### queryGroups

Group

Query Groups

Query Groups

Http Method
GET
End Point

/~api/groups

Query Parameters

| Parameter | Description | Required | Example |
| --- | --- | --- | --- |
| name | Name | No | string |
| offset | Offset | Yes | 0 |
| count | Count | Yes | 100 |

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
  "name": "string",
  "description": "string",
  "administrator": true,
  "createRootProjects": true,
  "enforce2FA": true
}
```

]

Operation Failed

Status code
Status code other than 200 indicating the error type
Response Body
Error detail of content type "text/plain"

cURL Example

$ curl -u <login name>:<password or access token> -G https://code.shoncloud.com/~api/groups --data-urlencode name=string --data-urlencode offset=0 --data-urlencode count=100

### getGroupId

Group

Get Group Id

Get Group Id

Http Method
GET
End Point

/~api/groups/ids/{name}

| Placeholder | Description | Example |
| --- | --- | --- |
| {name} | Group name | string |

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

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/groups/ids/string

### createGroup

Group

Create Group

Create Group

Create new group

Http Method
POST
End Point

/~api/groups

Request Body

Content Type
application/json

Example

```json
{
  "name": "string",
  "description": "string",
  "administrator": true,
  "createRootProjects": true,
  "enforce2FA": true
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

$ curl -u <login name>:<password or access token> -X POST -d@request-body.json -H "Content-Type: application/json" https://code.shoncloud.com/~api/groups

### updateGroup

Group

Update Group

Update Group

Update group of specified id

Http Method
POST
End Point

/~api/groups/{groupId}

| Placeholder | Description | Example |
| --- | --- | --- |
| {groupId} | Group Id | 1 |

Request Body

Content Type
application/json

Example

```json
{
  "name": "string",
  "description": "string",
  "administrator": true,
  "createRootProjects": true,
  "enforce2FA": true
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

$ curl -u <login name>:<password or access token> -X POST -d@request-body.json -H "Content-Type: application/json" https://code.shoncloud.com/~api/groups/1

### deleteGroup

Group

Delete Group

Delete Group

Http Method
DELETE
End Point

/~api/groups/{groupId}

| Placeholder | Description | Example |
| --- | --- | --- |
| {groupId} | Group Id | 1 |

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

$ curl -u <login name>:<password or access token> -X DELETE https://code.shoncloud.com/~api/groups/1
