# Role

Role

| Operation | Http Method | End Point |
| --- | --- | --- |
| Get Role | GET | /roles/{roleId} |
| Query Roles | GET | /roles |
| Get Role Id | GET | /roles/ids/{name} |
| Create Role | POST | /roles |
| Update Role | POST | /roles/{roleId} |
| Delete Role | DELETE | /roles/{roleId} |

---

## Operation Details

### getRole

Role

Get Role

Get Role

Http Method
GET
End Point

/~api/roles/{roleId}

| Placeholder | Description | Example |
| --- | --- | --- |
| {roleId} | Role Id | 1 |

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
  "manageProject": true,
  "createChildren": true,
  "managePullRequests": true,
  "manageCodeComments": true,
  "codePrivilege": "NONE",
  "packPrivilege": "NONE",
  "manageIssues": true,
  "accessConfidentialIssues": true,
  "accessTimeTracking": true,
  "scheduleIssues": true,
  "editableIssueFields":
  {
    "@type": "AllIssueFields"
  },
  "manageBuilds": true,
  "uploadCache": true,
  "jobPrivileges":
  [
    {
      "jobNames": "string",
      "manageJob": true,
      "runJob": true,
      "accessLog": true,
      "accessPipeline": true,
      "accessibleReports": "string"
    }
  ]
}
```

Operation Failed

Status code
Status code other than 200 indicating the error type
Response Body
Error detail of content type "text/plain"

cURL Example

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/roles/1

### queryRoles

Role

Query Roles

Query Roles

Http Method
GET
End Point

/~api/roles

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
  "manageProject": true,
  "createChildren": true,
  "managePullRequests": true,
  "manageCodeComments": true,
  "codePrivilege": "NONE",
  "packPrivilege": "NONE",
  "manageIssues": true,
  "accessConfidentialIssues": true,
  "accessTimeTracking": true,
  "scheduleIssues": true,
  "editableIssueFields":
  {
    "@type": "AllIssueFields"
  },
  "manageBuilds": true,
  "uploadCache": true,
  "jobPrivileges":
  [
    {
      "jobNames": "string",
      "manageJob": true,
      "runJob": true,
      "accessLog": true,
      "accessPipeline": true,
      "accessibleReports": "string"
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

$ curl -u <login name>:<password or access token> -G https://code.shoncloud.com/~api/roles --data-urlencode name=string --data-urlencode offset=0 --data-urlencode count=100

### getRoleId

Role

Get Role Id

Get Role Id

Http Method
GET
End Point

/~api/roles/ids/{name}

| Placeholder | Description | Example |
| --- | --- | --- |
| {name} | Name | string |

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

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/roles/ids/string

### createRole

Role

Create Role

Create Role

Create new role

Http Method
POST
End Point

/~api/roles

Request Body

Content Type
application/json

Example

```json
{
  "name": "string",
  "description": "string",
  "manageProject": true,
  "createChildren": true,
  "managePullRequests": true,
  "manageCodeComments": true,
  "codePrivilege": "NONE",
  "packPrivilege": "NONE",
  "manageIssues": true,
  "accessConfidentialIssues": true,
  "accessTimeTracking": true,
  "scheduleIssues": true,
  "editableIssueFields":
  {
    "@type": "AllIssueFields"
  },
  "manageBuilds": true,
  "uploadCache": true,
  "jobPrivileges":
  [
    {
      "jobNames": "string",
      "manageJob": true,
      "runJob": true,
      "accessLog": true,
      "accessPipeline": true,
      "accessibleReports": "string"
    }
  ]
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

$ curl -u <login name>:<password or access token> -X POST -d@request-body.json -H "Content-Type: application/json" https://code.shoncloud.com/~api/roles

### updateRole

Role

Update Role

Update Role

Update role of specified id

Http Method
POST
End Point

/~api/roles/{roleId}

| Placeholder | Description | Example |
| --- | --- | --- |
| {roleId} | Role Id | 1 |

Request Body

Content Type
application/json

Example

```json
{
  "name": "string",
  "description": "string",
  "manageProject": true,
  "createChildren": true,
  "managePullRequests": true,
  "manageCodeComments": true,
  "codePrivilege": "NONE",
  "packPrivilege": "NONE",
  "manageIssues": true,
  "accessConfidentialIssues": true,
  "accessTimeTracking": true,
  "scheduleIssues": true,
  "editableIssueFields":
  {
    "@type": "AllIssueFields"
  },
  "manageBuilds": true,
  "uploadCache": true,
  "jobPrivileges":
  [
    {
      "jobNames": "string",
      "manageJob": true,
      "runJob": true,
      "accessLog": true,
      "accessPipeline": true,
      "accessibleReports": "string"
    }
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

$ curl -u <login name>:<password or access token> -X POST -d@request-body.json -H "Content-Type: application/json" https://code.shoncloud.com/~api/roles/1

### deleteRole

Role

Delete Role

Delete Role

Http Method
DELETE
End Point

/~api/roles/{roleId}

| Placeholder | Description | Example |
| --- | --- | --- |
| {roleId} | Role Id | 1 |

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

$ curl -u <login name>:<password or access token> -X DELETE https://code.shoncloud.com/~api/roles/1
