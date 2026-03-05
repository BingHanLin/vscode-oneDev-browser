# User

User

| Operation | Http Method | End Point |
| --- | --- | --- |
| Get User | GET | /users/{userId} |
| Get Me | GET | /users/me |
| Get Access Tokens | GET | /users/{userId}/access-tokens |
| Get Email Addresses | GET | /users/{userId}/email-addresses |
| Get Authorizations | GET | /users/{userId}/authorizations |
| Get Memberships | GET | /users/{userId}/memberships |
| Get Pull Request Reviews | GET | /users/{userId}/pull-request-reviews |
| Get Issue Votes | GET | /users/{userId}/issue-votes |
| Get Issue Watches | GET | /users/{userId}/issue-watches |
| Get Project Build Query Personalizations | GET | /users/{userId}/project-build-query-personalizations |
| Get Project Code Comment Query Personalizations | GET | /users/{userId}/project-code-comment-query-personalizations |
| Get Project Commit Query Personalizations | GET | /users/{userId}/project-commit-query-personalizations |
| Get Projec Issue Query Personalizations | GET | /users/{userId}/project-issue-query-personalizations |
| Get Projec Pull Request Query Personalizations | GET | /users/{userId}/project-pull-request-query-personalizations |
| Get Pull Request Assignments | GET | /users/{userId}/pull-request-assignments |
| Get Pull Request Watches | GET | /users/{userId}/pull-request-watches |
| Get Ssh Keys | GET | /users/{userId}/ssh-keys |
| Get Queries And Watches | GET | /users/{userId}/queries-and-watches |
| Query Users | GET | /users |
| Get User Id | GET | /users/ids/{name} |
| Create User | POST | /users |
| Update user | POST | /users/{userId} |
| Disable User | POST | /users/{userId}/disable |
| Enable User | POST | /users/{userId}/enable |
| Convert To Service Account | POST | /users/{userId}/convert-to-service-account |
| Set Password | POST | /users/{userId}/password |
| Reset Two Factor Authentication | DELETE | /users/{userId}/two-factor-authentication |
| Set Queries And Watches | POST | /users/{userId}/queries-and-watches |
| Add Ssh Key | POST | /users/{userId}/ssh-keys |
| Delete User | DELETE | /users/{userId} |

---

## Operation Details

### getUser

User

Get User

Get User

Http Method
GET
End Point

/~api/users/{userId}

| Placeholder | Description | Example |
| --- | --- | --- |
| {userId} | User Id | 1 |

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
  "disabled": true,
  "type": "ORDINARY",
  "name": "string",
  "fullName": "string",
  "notifyOwnEvents": true
}
```

Operation Failed

Status code
Status code other than 200 indicating the error type
Response Body
Error detail of content type "text/plain"

cURL Example

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/users/1

### getMe

User

Get Me

Get Me

Http Method
GET
End Point

/~api/users/me

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
  "disabled": true,
  "type": "ORDINARY",
  "name": "string",
  "fullName": "string",
  "notifyOwnEvents": true
}
```

Operation Failed

Status code
Status code other than 200 indicating the error type
Response Body
Error detail of content type "text/plain"

cURL Example

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/users/me

### getAccessTokens

User

Get Access Tokens

Get Access Tokens

Http Method
GET
End Point

/~api/users/{userId}/access-tokens

| Placeholder | Description | Example |
| --- | --- | --- |
| {userId} | User Id | 1 |

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
  "ownerId": 1,
  "value": "string",
  "hasOwnerPermissions": true,
  "createDate": "2026-03-05T13:57:06.285+00:00",
  "expireDate": "2026-03-05T13:57:06.285+00:00"
}
```

]

Operation Failed

Status code
Status code other than 200 indicating the error type
Response Body
Error detail of content type "text/plain"

cURL Example

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/users/1/access-tokens

### getEmailAddresses

User

Get Email Addresses

Get Email Addresses

Http Method
GET
End Point

/~api/users/{userId}/email-addresses

| Placeholder | Description | Example |
| --- | --- | --- |
| {userId} | User Id | 1 |

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
  "value": "string",
  "primary": true,
  "git": true,
  "open": true,
  "ownerId": 1
}
```

]

Operation Failed

Status code
Status code other than 200 indicating the error type
Response Body
Error detail of content type "text/plain"

cURL Example

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/users/1/email-addresses

### getAuthorizations

User

Get Authorizations

Get Authorizations

Http Method
GET
End Point

/~api/users/{userId}/authorizations

| Placeholder | Description | Example |
| --- | --- | --- |
| {userId} | User Id | 1 |

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
  "userId": 1,
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

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/users/1/authorizations

### getMemberships

User

Get Memberships

Get Memberships

Http Method
GET
End Point

/~api/users/{userId}/memberships

| Placeholder | Description | Example |
| --- | --- | --- |
| {userId} | User Id | 1 |

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

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/users/1/memberships

### getPullRequestReviews

User

Get Pull Request Reviews

Get Pull Request Reviews

Http Method
GET
End Point

/~api/users/{userId}/pull-request-reviews

| Placeholder | Description | Example |
| --- | --- | --- |
| {userId} | User Id | 1 |

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
  "requestId": 1,
  "status": "PENDING",
  "statusDate": "2026-03-05T13:57:11.779+00:00"
}
```

]

Operation Failed

Status code
Status code other than 200 indicating the error type
Response Body
Error detail of content type "text/plain"

cURL Example

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/users/1/pull-request-reviews

### getIssueVotes

User

Get Issue Votes

Get Issue Votes

Http Method
GET
End Point

/~api/users/{userId}/issue-votes

| Placeholder | Description | Example |
| --- | --- | --- |
| {userId} | User Id | 1 |

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
  "issueId": 1,
  "userId": 1,
  "date": "2026-03-05T13:57:13.193+00:00"
}
```

]

Operation Failed

Status code
Status code other than 200 indicating the error type
Response Body
Error detail of content type "text/plain"

cURL Example

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/users/1/issue-votes

### getIssueWatches

User

Get Issue Watches

Get Issue Watches

Http Method
GET
End Point

/~api/users/{userId}/issue-watches

| Placeholder | Description | Example |
| --- | --- | --- |
| {userId} | User Id | 1 |

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
  "issueId": 1,
  "userId": 1,
  "watching": true
}
```

]

Operation Failed

Status code
Status code other than 200 indicating the error type
Response Body
Error detail of content type "text/plain"

cURL Example

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/users/1/issue-watches

### getProjectBuildQueryPersonalizations

User

Get Project Build Query Personalizations

Get Project Build Query Personalizations

Http Method
GET
End Point

/~api/users/{userId}/project-build-query-personalizations

| Placeholder | Description | Example |
| --- | --- | --- |
| {userId} | User Id | 1 |

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
  "userId": 1,
  "queries":
  [
    {
      "name": "string",
      "query": "string"
    }
  ],
  "querySubscriptions":
  [
    "string"
  ]
}
```

]

Operation Failed

Status code
Status code other than 200 indicating the error type
Response Body
Error detail of content type "text/plain"

cURL Example

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/users/1/project-build-query-personalizations

### getProjectCodeCommentQueryPersonalizations

User

Get Project Code Comment Query Personalizations

Get Project Code Comment Query Personalizations

Http Method
GET
End Point

/~api/users/{userId}/project-code-comment-query-personalizations

| Placeholder | Description | Example |
| --- | --- | --- |
| {userId} | User Id | 1 |

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
  "userId": 1,
  "queries":
  [
    {
      "name": "string",
      "query": "string"
    }
  ]
}
```

]

Operation Failed

Status code
Status code other than 200 indicating the error type
Response Body
Error detail of content type "text/plain"

cURL Example

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/users/1/project-code-comment-query-personalizations

### getProjectCommitQueryPersonalizations

User

Get Project Commit Query Personalizations

Get Project Commit Query Personalizations

Http Method
GET
End Point

/~api/users/{userId}/project-commit-query-personalizations

| Placeholder | Description | Example |
| --- | --- | --- |
| {userId} | User Id | 1 |

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
  "userId": 1,
  "queries":
  [
    {
      "name": "string",
      "query": "string"
    }
  ],
  "querySubscriptions":
  [
    "string"
  ]
}
```

]

Operation Failed

Status code
Status code other than 200 indicating the error type
Response Body
Error detail of content type "text/plain"

cURL Example

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/users/1/project-commit-query-personalizations

### getProjecIssueQueryPersonalizations

User

Get Projec Issue Query Personalizations

Get Projec Issue Query Personalizations

Http Method
GET
End Point

/~api/users/{userId}/project-issue-query-personalizations

| Placeholder | Description | Example |
| --- | --- | --- |
| {userId} | User Id | 1 |

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
  "userId": 1,
  "queries":
  [
    {
      "name": "string",
      "query": "string"
    }
  ],
  "queryWatches":
  {
    "string": true
  }
}
```

]

Operation Failed

Status code
Status code other than 200 indicating the error type
Response Body
Error detail of content type "text/plain"

cURL Example

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/users/1/project-issue-query-personalizations

### getProjecPullRequestQueryPersonalizations

User

Get Projec Pull Request Query Personalizations

Get Projec Pull Request Query Personalizations

Http Method
GET
End Point

/~api/users/{userId}/project-pull-request-query-personalizations

| Placeholder | Description | Example |
| --- | --- | --- |
| {userId} | User Id | 1 |

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
  "userId": 1,
  "queries":
  [
    {
      "name": "string",
      "query": "string"
    }
  ],
  "queryWatches":
  {
    "string": true
  }
}
```

]

Operation Failed

Status code
Status code other than 200 indicating the error type
Response Body
Error detail of content type "text/plain"

cURL Example

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/users/1/project-pull-request-query-personalizations

### getPullRequestAssignments

User

Get Pull Request Assignments

Get Pull Request Assignments

Http Method
GET
End Point

/~api/users/{userId}/pull-request-assignments

| Placeholder | Description | Example |
| --- | --- | --- |
| {userId} | User Id | 1 |

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
  "requestId": 1
}
```

]

Operation Failed

Status code
Status code other than 200 indicating the error type
Response Body
Error detail of content type "text/plain"

cURL Example

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/users/1/pull-request-assignments

### getPullRequestWatches

User

Get Pull Request Watches

Get Pull Request Watches

Http Method
GET
End Point

/~api/users/{userId}/pull-request-watches

| Placeholder | Description | Example |
| --- | --- | --- |
| {userId} | User Id | 1 |

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
  "requestId": 1,
  "userId": 1,
  "watching": true
}
```

]

Operation Failed

Status code
Status code other than 200 indicating the error type
Response Body
Error detail of content type "text/plain"

cURL Example

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/users/1/pull-request-watches

### getSshKeys

User

Get Ssh Keys

Get Ssh Keys

Http Method
GET
End Point

/~api/users/{userId}/ssh-keys

| Placeholder | Description | Example |
| --- | --- | --- |
| {userId} | User Id | 1 |

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
  "content": "string",
  "ownerId": 1
}
```

]

Operation Failed

Status code
Status code other than 200 indicating the error type
Response Body
Error detail of content type "text/plain"

cURL Example

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/users/1/ssh-keys

### getQueriesAndWatches

User

Get Queries And Watches

Get Queries And Watches

Http Method
GET
End Point

/~api/users/{userId}/queries-and-watches

| Placeholder | Description | Example |
| --- | --- | --- |
| {userId} | User Id | 1 |

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
  "projectQueries":
  [
    {
      "name": "string",
      "query": "string"
    }
  ],
  "issueQueries":
  [
    {
      "name": "string",
      "query": "string"
    }
  ],
  "issueQueryWatches":
  {
    "string": true
  },
  "pullRequestQueries":
  [
    {
      "name": "string",
      "query": "string"
    }
  ],
  "pullRequestQueryWatches":
  {
    "string": true
  },
  "buildQueries":
  [
    {
      "name": "string",
      "query": "string"
    }
  ],
  "buildQuerySubscriptions":
  [
    "string"
  ]
}
```

Operation Failed

Status code
Status code other than 200 indicating the error type
Response Body
Error detail of content type "text/plain"

cURL Example

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/users/1/queries-and-watches

### queryUsers

User

Query Users

Query Users

Http Method
GET
End Point

/~api/users

Query Parameters

| Parameter | Description | Required | Example |
| --- | --- | --- | --- |
| term | Any string in login name, full name or email address | No | string |
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
  "disabled": true,
  "type": "ORDINARY",
  "name": "string",
  "fullName": "string",
  "notifyOwnEvents": true
}
```

]

Operation Failed

Status code
Status code other than 200 indicating the error type
Response Body
Error detail of content type "text/plain"

cURL Example

$ curl -u <login name>:<password or access token> -G https://code.shoncloud.com/~api/users --data-urlencode term=string --data-urlencode offset=0 --data-urlencode count=100

### getUserId

User

Get User Id

Get User Id

Http Method
GET
End Point

/~api/users/ids/{name}

| Placeholder | Description | Example |
| --- | --- | --- |
| {name} | Login name of user | string |

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

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/users/ids/string

### createUser

User

Create User

Create User

Create new user

Http Method
POST
End Point

/~api/users

Request Body

Content Type
application/json

Example

```json
{
  "type": "ORDINARY",
  "name": "string",
  "password": "string",
  "emailAddress": "string",
  "notifyOwnEvents": true,
  "fullName": "string"
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

$ curl -u <login name>:<password or access token> -X POST -d@request-body.json -H "Content-Type: application/json" https://code.shoncloud.com/~api/users

### updateUser

User

Update user

Update user

Http Method
POST
End Point

/~api/users/{userId}

| Placeholder | Description | Example |
| --- | --- | --- |
| {userId} | User Id | 1 |

Request Body

Content Type
application/json

Example

```json
{
  "name": "string",
  "fullName": "string",
  "notifyOwnEvents": true
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

$ curl -u <login name>:<password or access token> -X POST -d@request-body.json -H "Content-Type: application/json" https://code.shoncloud.com/~api/users/1

### disableUser

User

Disable User

Disable User

Disable user

Http Method
POST
End Point

/~api/users/{userId}/disable

| Placeholder | Description | Example |
| --- | --- | --- |
| {userId} | User Id | 1 |

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

$ curl -u <login name>:<password or access token> -X POST https://code.shoncloud.com/~api/users/1/disable

### enableUser

User

Enable User

Enable User

Enable user

Http Method
POST
End Point

/~api/users/{userId}/enable

| Placeholder | Description | Example |
| --- | --- | --- |
| {userId} | User Id | 1 |

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

$ curl -u <login name>:<password or access token> -X POST https://code.shoncloud.com/~api/users/1/enable

### convertToServiceAccount

User

Convert To Service Account

Convert To Service Account

Convert to service account

Http Method
POST
End Point

/~api/users/{userId}/convert-to-service-account

| Placeholder | Description | Example |
| --- | --- | --- |
| {userId} | User Id | 1 |

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

$ curl -u <login name>:<password or access token> -X POST https://code.shoncloud.com/~api/users/1/convert-to-service-account

### setPassword

User

Set Password

Set Password

Http Method
POST
End Point

/~api/users/{userId}/password

| Placeholder | Description | Example |
| --- | --- | --- |
| {userId} | User Id | 1 |

Request Body

Content Type
application/json

Example

string

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

$ curl -u <login name>:<password or access token> -X POST -d@request-body.json -H "Content-Type: application/json" https://code.shoncloud.com/~api/users/1/password

### resetTwoFactorAuthentication

User

Reset Two Factor Authentication

Reset Two Factor Authentication

Http Method
DELETE
End Point

/~api/users/{userId}/two-factor-authentication

| Placeholder | Description | Example |
| --- | --- | --- |
| {userId} | User Id | 1 |

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

$ curl -u <login name>:<password or access token> -X DELETE https://code.shoncloud.com/~api/users/1/two-factor-authentication

### setQueriesAndWatches

User

Set Queries And Watches

Set Queries And Watches

Http Method
POST
End Point

/~api/users/{userId}/queries-and-watches

| Placeholder | Description | Example |
| --- | --- | --- |
| {userId} | User Id | 1 |

Request Body

Content Type
application/json

Example

```json
{
  "projectQueries":
  [
    {
      "name": "string",
      "query": "string"
    }
  ],
  "issueQueries":
  [
    {
      "name": "string",
      "query": "string"
    }
  ],
  "issueQueryWatches":
  {
    "string": true
  },
  "pullRequestQueries":
  [
    {
      "name": "string",
      "query": "string"
    }
  ],
  "pullRequestQueryWatches":
  {
    "string": true
  },
  "buildQueries":
  [
    {
      "name": "string",
      "query": "string"
    }
  ],
  "buildQuerySubscriptions":
  [
    "string"
  ]
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

$ curl -u <login name>:<password or access token> -X POST -d@request-body.json -H "Content-Type: application/json" https://code.shoncloud.com/~api/users/1/queries-and-watches

### addSshKey

User

Add Ssh Key

Add Ssh Key

Http Method
POST
End Point

/~api/users/{userId}/ssh-keys

| Placeholder | Description | Example |
| --- | --- | --- |
| {userId} | User Id | 1 |

Request Body

Content Type
application/json

Example

string

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

$ curl -u <login name>:<password or access token> -X POST -d@request-body.json -H "Content-Type: application/json" https://code.shoncloud.com/~api/users/1/ssh-keys

### deleteUser

User

Delete User

Delete User

Http Method
DELETE
End Point

/~api/users/{userId}

| Placeholder | Description | Example |
| --- | --- | --- |
| {userId} | User Id | 1 |

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

$ curl -u <login name>:<password or access token> -X DELETE https://code.shoncloud.com/~api/users/1
