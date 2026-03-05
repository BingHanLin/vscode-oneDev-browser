# Project

Project

| Operation | Http Method | End Point |
| --- | --- | --- |
| Get Project | GET | /projects/{projectId} |
| Get Project Id | GET | /projects/ids/{path:.*} |
| Get Clone URL | GET | /projects/{projectId}/clone-url |
| Get Setting | GET | /projects/{projectId}/setting |
| Get Forks | GET | /projects/{projectId}/forks |
| Get Base Authorizations | GET | /projects/{projectId}/base-authorizations |
| Get Group Authorizations | GET | /projects/{projectId}/group-authorizations |
| Get User Authorizations | GET | /projects/{projectId}/user-authorizations |
| Get Labels | GET | /projects/{projectId}/labels |
| Query Projects | GET | /projects |
| Query Iterations | GET | /projects/{projectId}/iterations |
| Get Top Contributors | GET | /projects/{projectId}/top-contributors |
| Create Project | POST | /projects |
| Update Project | POST | /projects/{projectId} |
| Update Setting | POST | /projects/{projectId}/setting |
| Delete Project | DELETE | /projects/{projectId} |

---

## Operation Details

### getProject

Project

Get Project

Get Project

Http Method
GET
End Point

/~api/projects/{projectId}

| Placeholder | Description | Example |
| --- | --- | --- |
| {projectId} | Project Id | 1 |

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
  "parentId": 1,
  "forkedFromId": 1,
  "name": "string",
  "key": "string",
  "path": "string",
  "description": "string",
  "createDate": "2026-03-05T13:53:56.834+00:00",
  "codeManagement": true,
  "packManagement": true,
  "issueManagement": true,
  "timeTracking": true,
  "serviceDeskEmailAddress": "string",
  "gitPackConfig":
  {
    "windowMemory": "0",
    "packSizeLimit": "1g",
    "threads": "0",
    "window": "10"
  },
  "codeAnalysisSetting":
  {
    "analysisFiles": "string"
  }
}
```

Operation Failed

Status code
Status code other than 200 indicating the error type
Response Body
Error detail of content type "text/plain"

cURL Example

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/projects/1

### getProjectId

Project

Get Project Id

Get Project Id

Http Method
GET
End Point

/~api/projects/ids/{path:.*}

| Placeholder | Description | Example |
| --- | --- | --- |
| {path} | Path | string |

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

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/projects/ids/string

### getCloneURL

Project

Get Clone URL

Get Clone URL

Http Method
GET
End Point

/~api/projects/{projectId}/clone-url

| Placeholder | Description | Example |
| --- | --- | --- |
| {projectId} | Project Id | 1 |

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
  "http": "string",
  "ssh": "string"
}
```

Operation Failed

Status code
Status code other than 200 indicating the error type
Response Body
Error detail of content type "text/plain"

cURL Example

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/projects/1/clone-url

### getSetting

Project

Get Setting

Get Setting

Http Method
GET
End Point

/~api/projects/{projectId}/setting

| Placeholder | Description | Example |
| --- | --- | --- |
| {projectId} | Project Id | 1 |

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
  "branchProtections":
  [
    {
      "enabled": true,
      "branches": "string",
      "userMatch": "string",
      "preventForcedPush": true,
      "preventDeletion": true,
      "preventCreation": true,
      "commitSignatureRequired": true,
      "commitMessageChecker":
      {
        "@type": "ConventionalCommitChecker",
        "commitTypes":
        [
          "string"
        ],
        "commitScopes":
        [
          "string"
        ],
        "checkCommitMessageFooter": true,
        "commitMessageFooterPattern": "string",
        "commitTypesForFooterCheck":
        [
          "string"
        ]
      },
      "maxCommitMessageLineLength": 1,
      "disallowedFileTypes":
      [
        "string"
      ],
      "reviewRequirement": "string",
      "jobNames":
      [
        "string"
      ],
      "fileProtections":
      [
        {
          "paths": "string",
          "reviewRequirement": "string",
          "jobNames":
          [
            "string"
          ]
        }
      ],
      "requireStrictBuilds": true
    }
  ],
  "tagProtections":
  [
    {
      "enabled": true,
      "tags": "string",
      "userMatch": "string",
      "preventUpdate": true,
      "preventDeletion": true,
      "preventCreation": true,
      "commitSignatureRequired": true,
      "disallowedFileTypes":
      [
        "string"
      ]
    }
  ],
  "issueSetting":
  {
    "listFields":
    [
      "string"
    ],
    "listLinks":
    [
      "string"
    ],
    "boardSpecs":
    [
      {
        "name": "string",
        "baseQuery": "string",
        "backlogBaseQuery": "string",
        "identifyField": "string",
        "columns":
        [
          "string"
        ],
        "iterationPrefix": "string",
        "displayFields":
        [
          "string"
        ],
        "displayLinks":
        [
          "string"
        ]
      }
    ],
    "namedQueries":
    [
      {
        "name": "string",
        "query": "string"
      }
    ],
    "timesheetSettings":
    {
      "string":
      {
        "rowType": "ISSUES",
        "issueQuery": "string",
        "dateRangeType": "MONTH",
        "groupBy": "string"
      }
    }
  },
  "buildSetting":
  {
    "listParams":
    [
      "string"
    ],
    "namedQueries":
    [
      {
        "name": "string",
        "query": "string"
      }
    ],
    "jobProperties":
    [
      {
        "name": "string",
        "value": "string",
        "archived": true
      }
    ],
    "jobSecrets":
    [
      {
        "name": "string",
        "value": "string",
        "authorization": "string",
        "archived": true
      }
    ],
    "buildPreservations":
    [
      {
        "condition": "string",
        "count": 1
      }
    ],
    "defaultFixedIssueFilters":
    [
      {
        "jobNames": "string",
        "issueQuery": "string"
      }
    ],
    "cachePreserveDays": 1
  },
  "packSetting":
  {
    "namedQueries":
    [
      {
        "name": "string",
        "query": "string"
      }
    ]
  },
  "pullRequestSetting":
  {
    "namedQueries":
    [
      {
        "name": "string",
        "query": "string"
      }
    ],
    "defaultMergeStrategy": "CREATE_MERGE_COMMIT",
    "defaultAssignees":
    [
      "string"
    ],
    "deleteSourceBranchAfterMerge": true
  },
  "namedCommitQueries":
  [
    {
      "name": "string",
      "query": "string"
    }
  ],
  "namedCodeCommentQueries":
  [
    {
      "name": "string",
      "query": "string"
    }
  ],
  "webHooks":
  [
    {
      "postUrl": "string",
      "eventTypes":
      [
        "CODE_PUSH"
      ],
      "secret": "string"
    }
  ],
  "contributedSettings":
  [
    {
      "@type": "MSTeamsNotificationSetting",
      "notifications":
      [
        {
          "webhookUrl": "string",
          "issues": true,
          "issueQuery": "string",
          "pullRequests": true,
          "pullRequestQuery": "string",
          "builds": true,
          "buildQuery": "string",
          "codePush": true,
          "commitQuery": "string",
          "codeComments": true,
          "codeCommentQuery": "string"
        }
      ]
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

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/projects/1/setting

### getForks

Project

Get Forks

Get Forks

Http Method
GET
End Point

/~api/projects/{projectId}/forks

| Placeholder | Description | Example |
| --- | --- | --- |
| {projectId} | Project Id | 1 |

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
  "forkedFromId": 1,
  "parentId": 1,
  "lastActivityDateId": 1,
  "name": "string",
  "path": "string",
  "pathLen": 1,
  "key": "string",
  "description": "string",
  "branchProtections":
  [
    {
      "enabled": true,
      "branches": "string",
      "userMatch": "string",
      "preventForcedPush": true,
      "preventDeletion": true,
      "preventCreation": true,
      "commitSignatureRequired": true,
      "commitMessageChecker":
      {
        "@type": "ConventionalCommitChecker",
        "commitTypes":
        [
          "string"
        ],
        "commitScopes":
        [
          "string"
        ],
        "checkCommitMessageFooter": true,
        "commitMessageFooterPattern": "string",
        "commitTypesForFooterCheck":
        [
          "string"
        ]
      },
      "maxCommitMessageLineLength": 1,
      "disallowedFileTypes":
      [
        "string"
      ],
      "reviewRequirement": "string",
      "jobNames":
      [
        "string"
      ],
      "fileProtections":
      [
        {
          "paths": "string",
          "reviewRequirement": "string",
          "jobNames":
          [
            "string"
          ]
        }
      ],
      "requireStrictBuilds": true
    }
  ],
  "tagProtections":
  [
    {
      "enabled": true,
      "tags": "string",
      "userMatch": "string",
      "preventUpdate": true,
      "preventDeletion": true,
      "preventCreation": true,
      "commitSignatureRequired": true,
      "disallowedFileTypes":
      [
        "string"
      ]
    }
  ],
  "contributedSettings":
  {
    "string":
    {
      "@type": "MSTeamsNotificationSetting",
      "notifications":
      [
        {
          "webhookUrl": "string",
          "issues": true,
          "issueQuery": "string",
          "pullRequests": true,
          "pullRequestQuery": "string",
          "builds": true,
          "buildQuery": "string",
          "codePush": true,
          "commitQuery": "string",
          "codeComments": true,
          "codeCommentQuery": "string"
        }
      ]
    }
  },
  "createDate": "2026-03-05T13:54:02.670+00:00",
  "codeManagement": true,
  "packManagement": true,
  "issueManagement": true,
  "timeTracking": true,
  "gitPackConfig":
  {
    "windowMemory": "0",
    "packSizeLimit": "1g",
    "threads": "0",
    "window": "10"
  },
  "codeAnalysisSetting":
  {
    "analysisFiles": "string"
  },
  "serviceDeskEmailAddress": "string",
  "issueSetting":
  {
    "listFields":
    [
      "string"
    ],
    "listLinks":
    [
      "string"
    ],
    "boardSpecs":
    [
      {
        "name": "string",
        "baseQuery": "string",
        "backlogBaseQuery": "string",
        "identifyField": "string",
        "columns":
        [
          "string"
        ],
        "iterationPrefix": "string",
        "displayFields":
        [
          "string"
        ],
        "displayLinks":
        [
          "string"
        ]
      }
    ],
    "namedQueries":
    [
      {
        "name": "string",
        "query": "string"
      }
    ],
    "timesheetSettings":
    {
      "string":
      {
        "rowType": "ISSUES",
        "issueQuery": "string",
        "dateRangeType": "MONTH",
        "groupBy": "string"
      }
    }
  },
  "buildSetting":
  {
    "listParams":
    [
      "string"
    ],
    "namedQueries":
    [
      {
        "name": "string",
        "query": "string"
      }
    ],
    "jobProperties":
    [
      {
        "name": "string",
        "value": "string",
        "archived": true
      }
    ],
    "jobSecrets":
    [
      {
        "name": "string",
        "value": "string",
        "authorization": "string",
        "archived": true
      }
    ],
    "buildPreservations":
    [
      {
        "condition": "string",
        "count": 1
      }
    ],
    "defaultFixedIssueFilters":
    [
      {
        "jobNames": "string",
        "issueQuery": "string"
      }
    ],
    "cachePreserveDays": 1
  },
  "pullRequestSetting":
  {
    "namedQueries":
    [
      {
        "name": "string",
        "query": "string"
      }
    ],
    "defaultMergeStrategy": "CREATE_MERGE_COMMIT",
    "defaultAssignees":
    [
      "string"
    ],
    "deleteSourceBranchAfterMerge": true
  },
  "packSetting":
  {
    "namedQueries":
    [
      {
        "name": "string",
        "query": "string"
      }
    ]
  },
  "namedCommitQueries":
  [
    {
      "name": "string",
      "query": "string"
    }
  ],
  "namedCodeCommentQueries":
  [
    {
      "name": "string",
      "query": "string"
    }
  ],
  "webHooks":
  [
    {
      "postUrl": "string",
      "eventTypes":
      [
        "CODE_PUSH"
      ],
      "secret": "string"
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

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/projects/1/forks

### getBaseAuthorizations

Project

Get Base Authorizations

Get Base Authorizations

A base authorization corresponds to a default role. It can be added/removed via base authorizations resource

Http Method
GET
End Point

/~api/projects/{projectId}/base-authorizations

| Placeholder | Description | Example |
| --- | --- | --- |
| {projectId} | Project Id | 1 |

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

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/projects/1/base-authorizations

### getGroupAuthorizations

Project

Get Group Authorizations

Get Group Authorizations

Http Method
GET
End Point

/~api/projects/{projectId}/group-authorizations

| Placeholder | Description | Example |
| --- | --- | --- |
| {projectId} | Project Id | 1 |

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

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/projects/1/group-authorizations

### getUserAuthorizations

Project

Get User Authorizations

Get User Authorizations

Http Method
GET
End Point

/~api/projects/{projectId}/user-authorizations

| Placeholder | Description | Example |
| --- | --- | --- |
| {projectId} | Project Id | 1 |

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

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/projects/1/user-authorizations

### getLabels

Project

Get Labels

Get Labels

Get list of labels

Http Method
GET
End Point

/~api/projects/{projectId}/labels

| Placeholder | Description | Example |
| --- | --- | --- |
| {projectId} | Project Id | 1 |

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
  "specId": 1
}
```

]

Operation Failed

Status code
Status code other than 200 indicating the error type
Response Body
Error detail of content type "text/plain"

cURL Example

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/projects/1/labels

### queryProjects

Project

Query Projects

Query Projects

Http Method
GET
End Point

/~api/projects

Query Parameters

| Parameter | Description | Required | Example |
| --- | --- | --- | --- |
| query | Syntax of this query is the same as in projects page | No | "Name" is "projectName" |
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
  "parentId": 1,
  "forkedFromId": 1,
  "name": "string",
  "key": "string",
  "path": "string",
  "description": "string",
  "createDate": "2026-03-05T13:54:09.886+00:00",
  "codeManagement": true,
  "packManagement": true,
  "issueManagement": true,
  "timeTracking": true,
  "serviceDeskEmailAddress": "string",
  "gitPackConfig":
  {
    "windowMemory": "0",
    "packSizeLimit": "1g",
    "threads": "0",
    "window": "10"
  },
  "codeAnalysisSetting":
  {
    "analysisFiles": "string"
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

$ curl -u <login name>:<password or access token> -G https://code.shoncloud.com/~api/projects --data-urlencode 'query="Name" is "projectName"' --data-urlencode offset=0 --data-urlencode count=100

### queryIterations

Project

Query Iterations

Query Iterations

Http Method
GET
End Point

/~api/projects/{projectId}/iterations

| Placeholder | Description | Example |
| --- | --- | --- |
| {projectId} | Project Id | 1 |

Query Parameters

| Parameter | Description | Required | Example |
| --- | --- | --- | --- |
| name | Name | No | string |
| startBefore | ISO 8601 date | No | 2026-03-05T13:54:11.269Z |
| startAfter | ISO 8601 date | No | 2026-03-05T13:54:11.270Z |
| dueBefore | ISO 8601 date | No | 2026-03-05T13:54:11.270Z |
| dueAfter | ISO 8601 date | No | 2026-03-05T13:54:11.270Z |
| closed | Closed | No | true |
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
  "description": "string",
  "startDay": 1,
  "dueDay": 1,
  "projectId": 1,
  "name": "string",
  "closed": true
}
```

]

Operation Failed

Status code
Status code other than 200 indicating the error type
Response Body
Error detail of content type "text/plain"

cURL Example

$ curl -u <login name>:<password or access token> -G https://code.shoncloud.com/~api/projects/1/iterations --data-urlencode name=string --data-urlencode startBefore=2026-03-05T13:54:11.266Z --data-urlencode startAfter=2026-03-05T13:54:11.267Z --data-urlencode dueBefore=2026-03-05T13:54:11.267Z --data-urlencode dueAfter=2026-03-05T13:54:11.267Z --data-urlencode closed=true --data-urlencode offset=0 --data-urlencode count=100

### getTopContributors

Project

Get Top Contributors

Get Top Contributors

Get top contributors on default branch

Http Method
GET
End Point

/~api/projects/{projectId}/top-contributors

| Placeholder | Description | Example |
| --- | --- | --- |
| {projectId} | Project Id | 1 |

Query Parameters

| Parameter | Description | Required | Example |
| --- | --- | --- | --- |
| type | Type | Yes | COMMITS |
| sinceDate | Since date of format yyyy-MM-dd | Yes | string |
| untilDate | Until date of format yyyy-MM-dd | Yes | string |
| count | Count | Yes | 1 |

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
  "author":
  {
    "name": "string",
    "emailAddress": "string",
    "when": 1,
    "tzOffset": 1
  },
  "totalContribution":
  {
    "commits": 1,
    "additions": 1,
    "deletions": 1
  },
  "dailyContributions":
  {
    1: 1
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

$ curl -u <login name>:<password or access token> -G https://code.shoncloud.com/~api/projects/1/top-contributors --data-urlencode type=COMMITS --data-urlencode sinceDate=string --data-urlencode untilDate=string --data-urlencode count=1

### createProject

Project

Create Project

Create Project

Create new project

Http Method
POST
End Point

/~api/projects

Request Body

Content Type
application/json

Example

```json
{
  "parentId": 1,
  "forkedFromId": 1,
  "name": "string",
  "key": "string",
  "description": "string",
  "codeManagement": true,
  "packManagement": true,
  "issueManagement": true,
  "timeTracking": true,
  "serviceDeskEmailAddress": "string",
  "gitPackConfig":
  {
    "windowMemory": "0",
    "packSizeLimit": "1g",
    "threads": "0",
    "window": "10"
  },
  "codeAnalysisSetting":
  {
    "analysisFiles": "string"
  }
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

$ curl -u <login name>:<password or access token> -X POST -d@request-body.json -H "Content-Type: application/json" https://code.shoncloud.com/~api/projects

### updateProject

Project

Update Project

Update Project

Update project

Http Method
POST
End Point

/~api/projects/{projectId}

| Placeholder | Description | Example |
| --- | --- | --- |
| {projectId} | Project Id | 1 |

Request Body

Content Type
application/json

Example

```json
{
  "parentId": 1,
  "forkedFromId": 1,
  "name": "string",
  "key": "string",
  "description": "string",
  "codeManagement": true,
  "packManagement": true,
  "issueManagement": true,
  "timeTracking": true,
  "serviceDeskEmailAddress": "string",
  "gitPackConfig":
  {
    "windowMemory": "0",
    "packSizeLimit": "1g",
    "threads": "0",
    "window": "10"
  },
  "codeAnalysisSetting":
  {
    "analysisFiles": "string"
  }
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

$ curl -u <login name>:<password or access token> -X POST -d@request-body.json -H "Content-Type: application/json" https://code.shoncloud.com/~api/projects/1

### updateSetting

Project

Update Setting

Update Setting

Update project settings

Http Method
POST
End Point

/~api/projects/{projectId}/setting

| Placeholder | Description | Example |
| --- | --- | --- |
| {projectId} | Project Id | 1 |

Request Body

Content Type
application/json

Example

```json
{
  "branchProtections":
  [
    {
      "enabled": true,
      "branches": "string",
      "userMatch": "string",
      "preventForcedPush": true,
      "preventDeletion": true,
      "preventCreation": true,
      "commitSignatureRequired": true,
      "commitMessageChecker":
      {
        "@type": "ConventionalCommitChecker",
        "commitTypes":
        [
          "string"
        ],
        "commitScopes":
        [
          "string"
        ],
        "checkCommitMessageFooter": true,
        "commitMessageFooterPattern": "string",
        "commitTypesForFooterCheck":
        [
          "string"
        ]
      },
      "maxCommitMessageLineLength": 1,
      "disallowedFileTypes":
      [
        "string"
      ],
      "reviewRequirement": "string",
      "jobNames":
      [
        "string"
      ],
      "fileProtections":
      [
        {
          "paths": "string",
          "reviewRequirement": "string",
          "jobNames":
          [
            "string"
          ]
        }
      ],
      "requireStrictBuilds": true
    }
  ],
  "tagProtections":
  [
    {
      "enabled": true,
      "tags": "string",
      "userMatch": "string",
      "preventUpdate": true,
      "preventDeletion": true,
      "preventCreation": true,
      "commitSignatureRequired": true,
      "disallowedFileTypes":
      [
        "string"
      ]
    }
  ],
  "issueSetting":
  {
    "listFields":
    [
      "string"
    ],
    "listLinks":
    [
      "string"
    ],
    "boardSpecs":
    [
      {
        "name": "string",
        "baseQuery": "string",
        "backlogBaseQuery": "string",
        "identifyField": "string",
        "columns":
        [
          "string"
        ],
        "iterationPrefix": "string",
        "displayFields":
        [
          "string"
        ],
        "displayLinks":
        [
          "string"
        ]
      }
    ],
    "namedQueries":
    [
      {
        "name": "string",
        "query": "string"
      }
    ],
    "timesheetSettings":
    {
      "string":
      {
        "rowType": "ISSUES",
        "issueQuery": "string",
        "dateRangeType": "MONTH",
        "groupBy": "string"
      }
    }
  },
  "buildSetting":
  {
    "listParams":
    [
      "string"
    ],
    "namedQueries":
    [
      {
        "name": "string",
        "query": "string"
      }
    ],
    "jobProperties":
    [
      {
        "name": "string",
        "value": "string",
        "archived": true
      }
    ],
    "jobSecrets":
    [
      {
        "name": "string",
        "value": "string",
        "authorization": "string",
        "archived": true
      }
    ],
    "buildPreservations":
    [
      {
        "condition": "string",
        "count": 1
      }
    ],
    "defaultFixedIssueFilters":
    [
      {
        "jobNames": "string",
        "issueQuery": "string"
      }
    ],
    "cachePreserveDays": 1
  },
  "packSetting":
  {
    "namedQueries":
    [
      {
        "name": "string",
        "query": "string"
      }
    ]
  },
  "pullRequestSetting":
  {
    "namedQueries":
    [
      {
        "name": "string",
        "query": "string"
      }
    ],
    "defaultMergeStrategy": "CREATE_MERGE_COMMIT",
    "defaultAssignees":
    [
      "string"
    ],
    "deleteSourceBranchAfterMerge": true
  },
  "namedCommitQueries":
  [
    {
      "name": "string",
      "query": "string"
    }
  ],
  "namedCodeCommentQueries":
  [
    {
      "name": "string",
      "query": "string"
    }
  ],
  "webHooks":
  [
    {
      "postUrl": "string",
      "eventTypes":
      [
        "CODE_PUSH"
      ],
      "secret": "string"
    }
  ],
  "contributedSettings":
  [
    {
      "@type": "MSTeamsNotificationSetting",
      "notifications":
      [
        {
          "webhookUrl": "string",
          "issues": true,
          "issueQuery": "string",
          "pullRequests": true,
          "pullRequestQuery": "string",
          "builds": true,
          "buildQuery": "string",
          "codePush": true,
          "commitQuery": "string",
          "codeComments": true,
          "codeCommentQuery": "string"
        }
      ]
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

$ curl -u <login name>:<password or access token> -X POST -d@request-body.json -H "Content-Type: application/json" https://code.shoncloud.com/~api/projects/1/setting

### deleteProject

Project

Delete Project

Delete Project

Http Method
DELETE
End Point

/~api/projects/{projectId}

| Placeholder | Description | Example |
| --- | --- | --- |
| {projectId} | Project Id | 1 |

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

$ curl -u <login name>:<password or access token> -X DELETE https://code.shoncloud.com/~api/projects/1
