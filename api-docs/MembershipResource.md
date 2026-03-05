# Membership

Membership

| Operation | Http Method | End Point |
| --- | --- | --- |
| Get Membership | GET | /memberships/{membershipId} |
| Create Membership | POST | /memberships |
| Delete Membership | DELETE | /memberships/{membershipId} |

---

## Operation Details

### getMembership

Membership

Get Membership

Get Membership

Http Method
GET
End Point

/~api/memberships/{membershipId}

| Placeholder | Description | Example |
| --- | --- | --- |
| {membershipId} | Membership Id | 1 |

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
  "userId": 1,
  "groupId": 1
}
```

Operation Failed

Status code
Status code other than 200 indicating the error type
Response Body
Error detail of content type "text/plain"

cURL Example

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/memberships/1

### createMembership

Membership

Create Membership

Create Membership

Create new membership

Http Method
POST
End Point

/~api/memberships

Request Body

Content Type
application/json

Example

```json
{
  "userId": 1,
  "groupId": 1
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

$ curl -u <login name>:<password or access token> -X POST -d@request-body.json -H "Content-Type: application/json" https://code.shoncloud.com/~api/memberships

### deleteMembership

Membership

Delete Membership

Delete Membership

Http Method
DELETE
End Point

/~api/memberships/{membershipId}

| Placeholder | Description | Example |
| --- | --- | --- |
| {membershipId} | Membership Id | 1 |

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

$ curl -u <login name>:<password or access token> -X DELETE https://code.shoncloud.com/~api/memberships/1
