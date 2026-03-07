# Setting

Setting

| Operation | Http Method | End Point |
| --- | --- | --- |
| Get System Setting | GET | /settings/system |
| Get Authenticator | GET | /settings/authenticator |
| Get Backup Setting | GET | /settings/backup |
| Get Build Setting | GET | /settings/build |
| Get Groovy Scripts | GET | /settings/groovy-scripts |
| Get Issue Setting | GET | /settings/issue |
| Get Job Executors | GET | /settings/job-executors |
| Get Mail Connector | GET | /settings/mail-service |
| Get Service Desk Setting | GET | /settings/service-desk |
| Get Notificiation Template Setting | GET | /settings/notification-template |
| Get Project Setting | GET | /settings/project |
| Get Pull Request Setting | GET | /settings/pull-request |
| Get Security Setting | GET | /settings/security |
| Get Ssh Setting | GET | /settings/ssh |
| Get Contributed Settings | GET | /settings/contributed-settings |
| Set System Setting | POST | /settings/system |
| Set Authenticator | POST | /settings/authenticator |
| Set Backup Setting | POST | /settings/backup |
| Set Build Setting | POST | /settings/build |
| Set Groovy Scripts | POST | /settings/groovy-scripts |
| Set Issue Setting | POST | /settings/issue |
| Set Job Executors | POST | /settings/job-executors |
| Set Mail Service | POST | /settings/mail-service |
| Set Service Desk Setting | POST | /settings/service-desk |
| Set Notification Template Setting | POST | /settings/notification-template |
| Set Project Setting | POST | /settings/project |
| Set Pull Request Setting | POST | /settings/pull-request |
| Set Security Setting | POST | /settings/security |
| Set Ssh Setting | POST | /settings/ssh |
| Set Contributed Settings | POST | /settings/contributed-settings |

---

## Operation Details

### getSystemSetting

Setting

Get System Setting

Get System Setting

Http Method
GET
End Point

/~api/settings/system

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
  "serverUrl": "string",
  "sshRootUrl": "string",
  "gitLocation":
  {
    "@type": "SpecifiedGit",
    "gitPath": "string"
  },
  "curlLocation":
  {
    "@type": "SpecifiedCurl",
    "curlPath": "string"
  },
  "sessionTimeout": 1,
  "disableAutoUpdateCheck": true,
  "disableDashboard": true,
  "useAvatarService": true,
  "avatarServiceUrl": "string"
}
```

Operation Failed

Status code
Status code other than 200 indicating the error type
Response Body
Error detail of content type "text/plain"

cURL Example

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/settings/system

### getAuthenticator

Setting

Get Authenticator

Get Authenticator

Http Method
GET
End Point

/~api/settings/authenticator

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
  "@type": "ActiveDirectoryAuthenticator",
  "groupSearchBase": "string",
  "ldapUrl": "string",
  "authenticationRequired": true,
  "managerDN": "string",
  "managerPassword": "string",
  "userSearchBases":
  [
    "string"
  ],
  "userSearchFilter": "string",
  "userFullNameAttribute": "string",
  "userEmailAttribute": "string",
  "userSshKeyAttribute": "string",
  "groupRetrieval":
  {
    "@type": "DoNotRetrieveGroups"
  },
  "defaultGroup": "string",
  "timeout": 1
}
```

Operation Failed

Status code
Status code other than 200 indicating the error type
Response Body
Error detail of content type "text/plain"

cURL Example

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/settings/authenticator

### getBackupSetting

Setting

Get Backup Setting

Get Backup Setting

Http Method
GET
End Point

/~api/settings/backup

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
  "schedule": "string"
}
```

Operation Failed

Status code
Status code other than 200 indicating the error type
Response Body
Error detail of content type "text/plain"

cURL Example

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/settings/backup

### getBuildSetting

Setting

Get Build Setting

Get Build Setting

Http Method
GET
End Point

/~api/settings/build

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
  "namedQueries":
  [
    {
      "name": "string",
      "query": "string"
    }
  ],
  "listParams":
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

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/settings/build

### getGroovyScripts

Setting

Get Groovy Scripts

Get Groovy Scripts

Http Method
GET
End Point

/~api/settings/groovy-scripts

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
  "name": "string",
  "content":
  [
    "string"
  ],
  "canBeUsedByBuildJobs": true,
  "authorization": "string"
}
```

]

Operation Failed

Status code
Status code other than 200 indicating the error type
Response Body
Error detail of content type "text/plain"

cURL Example

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/settings/groovy-scripts

### getIssueSetting

Setting

Get Issue Setting

Get Issue Setting

Http Method
GET
End Point

/~api/settings/issue

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
  "stateSpecs":
  [
    {
      "name": "string",
      "description": "string",
      "color": "string"
    }
  ],
  "transitionSpecs":
  [
    {
      "@type": "BranchUpdatedSpec",
      "branches": "string",
      "commitMessages": "string",
      "toState": "string",
      "fromStates":
      [
        "string"
      ],
      "issueQuery": "string",
      "removeFields":
      [
        "string"
      ]
    }
  ],
  "fieldSpecs":
  [
    {
      "@type": "BooleanField",
      "defaultValueProvider":
      {
        "@type": "FalseDefaultValue"
      },
      "nameOfEmptyValue": "string",
      "promptUponIssueOpen": true,
      "applicableProjects": "string",
      "name": "string",
      "description": "string",
      "allowMultiple": true,
      "allowEmpty": true,
      "showCondition":
      {
        "inputName": "string",
        "valueMatcher":
        {
          "@type": "ValueIsEmpty"
        }
      }
    }
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
  "timeTrackingSetting":
  {
    "useHoursAndMinutesOnly": true,
    "hoursPerDay": 1,
    "daysPerWeek": 1,
    "aggregationLink": "string"
  },
  "listFields":
  [
    "string"
  ],
  "listLinks":
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
  "issueTemplates":
  [
    {
      "issueQuery": "string",
      "issueDescription": "string"
    }
  ],
  "commitMessageFixPatterns":
  {
    "entries":
    [
      {
        "prefix": "string",
        "suffix": "string"
      }
    ]
  },
  "externalIssueTransformers":
  {
    "entries":
    [
      {
        "pattern": "string",
        "replaceWith": "string"
      }
    ]
  },
  "reconciled": true
}
```

Operation Failed

Status code
Status code other than 200 indicating the error type
Response Body
Error detail of content type "text/plain"

cURL Example

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/settings/issue

### getJobExecutors

Setting

Get Job Executors

Get Job Executors

Http Method
GET
End Point

/~api/settings/job-executors

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
  "@type": "KubernetesExecutor",
  "nodeSelector":
  [
    {
      "labelName": "string",
      "labelValue": "string"
    }
  ],
  "clusterRole": "string",
  "registryLogins":
  [
    {
      "registryUrl": "string",
      "userName": "string",
      "password": "string"
    }
  ],
  "buildWithPV": true,
  "storageClass": "string",
  "storageSize": "string",
  "serviceLocators":
  [
    {
      "serviceNames": "string",
      "serviceImages": "string",
      "nodeSelector":
      [
        {
          "labelName": "string",
          "labelValue": "string"
        }
      ]
    }
  ],
  "configFile": "string",
  "kubeCtlPath": "string",
  "cpuRequest": "string",
  "memoryRequest": "string",
  "cpuLimit": "string",
  "memoryLimit": "string",
  "alwaysPullImage": true,
  "enabled": true,
  "name": "string",
  "jobMatch": "string",
  "htmlReportPublishEnabled": true,
  "sitePublishEnabled": true
}
```

]

Operation Failed

Status code
Status code other than 200 indicating the error type
Response Body
Error detail of content type "text/plain"

cURL Example

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/settings/job-executors

### getMailConnector

Setting

Get Mail Connector

Get Mail Connector

Http Method
GET
End Point

/~api/settings/mail-service

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
  "@type": "SendgridConnector",
  "apiKey": "string",
  "systemAddress": "string",
  "timeout": 1,
  "webhookSetting":
  {
    "secret": "string"
  }
}
```

Operation Failed

Status code
Status code other than 200 indicating the error type
Response Body
Error detail of content type "text/plain"

cURL Example

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/settings/mail-service

### getServiceDeskSetting

Setting

Get Service Desk Setting

Get Service Desk Setting

Http Method
GET
End Point

/~api/settings/service-desk

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
  "issueCreationSettings":
  [
    {
      "applicableProjects": "string",
      "confidential": true,
      "issueFields":
      [
        {
          "name": "string",
          "secret": true,
          "valueProvider":
          {
            "@type": "IgnoreValue"
          }
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

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/settings/service-desk

### getNotificiationTemplateSetting

Setting

Get Notificiation Template Setting

Get Notificiation Template Setting

Http Method
GET
End Point

/~api/settings/notification-template

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
  "issueNotification": "string",
  "pullRequestNotification": "string",
  "buildNotification": "string",
  "packNotification": "string",
  "commitNotification": "string",
  "issueNotificationUnsubscribed": "string",
  "pullRequestNotificationUnsubscribed": "string",
  "serviceDeskIssueOpened": "string",
  "serviceDeskIssueOpenFailed": "string",
  "userInvitation": "string",
  "emailVerification": "string",
  "passwordReset": "string",
  "stopwatchOverdue": "string",
  "alert": "string"
}
```

Operation Failed

Status code
Status code other than 200 indicating the error type
Response Body
Error detail of content type "text/plain"

cURL Example

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/settings/notification-template

### getProjectSetting

Setting

Get Project Setting

Get Project Setting

Http Method
GET
End Point

/~api/settings/project

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
  "namedQueries":
  [
    {
      "name": "string",
      "query": "string"
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

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/settings/project

### getPullRequestSetting

Setting

Get Pull Request Setting

Get Pull Request Setting

Http Method
GET
End Point

/~api/settings/pull-request

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
  "namedQueries":
  [
    {
      "name": "string",
      "query": "string"
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

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/settings/pull-request

### getSecuritySetting

Setting

Get Security Setting

Get Security Setting

Http Method
GET
End Point

/~api/settings/security

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
  "enableAnonymousAccess": true,
  "enableSelfRegister": true,
  "allowedSelfRegisterEmailDomain": "string",
  "enableSelfDeregister": true,
  "passwordPolicy":
  {
    "minLength": 1,
    "mustContainUppercase": true,
    "mustContainLowercase": true,
    "mustContainNumber": true,
    "mustContainSpecial": true
  },
  "defaultGroupName": "string",
  "enforce2FA": true,
  "corsAllowedOrigins":
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

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/settings/security

### getSshSetting

Setting

Get Ssh Setting

Get Ssh Setting

Http Method
GET
End Point

/~api/settings/ssh

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
  "pemPrivateKey": "string"
}
```

Operation Failed

Status code
Status code other than 200 indicating the error type
Response Body
Error detail of content type "text/plain"

cURL Example

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/settings/ssh

### getContributedSettings

Setting

Get Contributed Settings

Get Contributed Settings

Http Method
GET
End Point

/~api/settings/contributed-settings

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
  "@type": "ExamplePluginSetting",
  "exampleProperty": "string"
}
```

]

Operation Failed

Status code
Status code other than 200 indicating the error type
Response Body
Error detail of content type "text/plain"

cURL Example

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/settings/contributed-settings

### setSystemSetting

Setting

Set System Setting

Set System Setting

Http Method
POST
End Point

/~api/settings/system

Request Body

Content Type
application/json

Example

```json
{
  "serverUrl": "string",
  "sshRootUrl": "string",
  "gitLocation":
  {
    "@type": "SpecifiedGit",
    "gitPath": "string"
  },
  "curlLocation":
  {
    "@type": "SpecifiedCurl",
    "curlPath": "string"
  },
  "sessionTimeout": 1,
  "disableAutoUpdateCheck": true,
  "disableDashboard": true,
  "useAvatarService": true,
  "avatarServiceUrl": "string"
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

$ curl -u <login name>:<password or access token> -X POST -d@request-body.json -H "Content-Type: application/json" https://code.shoncloud.com/~api/settings/system

### setAuthenticator

Setting

Set Authenticator

Set Authenticator

Http Method
POST
End Point

/~api/settings/authenticator

Request Body

Content Type
application/json

Example

```json
{
  "@type": "ActiveDirectoryAuthenticator",
  "groupSearchBase": "string",
  "ldapUrl": "string",
  "authenticationRequired": true,
  "managerDN": "string",
  "managerPassword": "string",
  "userSearchBases":
  [
    "string"
  ],
  "userSearchFilter": "string",
  "userFullNameAttribute": "string",
  "userEmailAttribute": "string",
  "userSshKeyAttribute": "string",
  "groupRetrieval":
  {
    "@type": "DoNotRetrieveGroups"
  },
  "defaultGroup": "string",
  "timeout": 1
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

$ curl -u <login name>:<password or access token> -X POST -d@request-body.json -H "Content-Type: application/json" https://code.shoncloud.com/~api/settings/authenticator

### setBackupSetting

Setting

Set Backup Setting

Set Backup Setting

Http Method
POST
End Point

/~api/settings/backup

Request Body

Content Type
application/json

Example

```json
{
  "schedule": "string"
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

$ curl -u <login name>:<password or access token> -X POST -d@request-body.json -H "Content-Type: application/json" https://code.shoncloud.com/~api/settings/backup

### setBuildSetting

Setting

Set Build Setting

Set Build Setting

Http Method
POST
End Point

/~api/settings/build

Request Body

Content Type
application/json

Example

```json
{
  "namedQueries":
  [
    {
      "name": "string",
      "query": "string"
    }
  ],
  "listParams":
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

$ curl -u <login name>:<password or access token> -X POST -d@request-body.json -H "Content-Type: application/json" https://code.shoncloud.com/~api/settings/build

### setGroovyScripts

Setting

Set Groovy Scripts

Set Groovy Scripts

Http Method
POST
End Point

/~api/settings/groovy-scripts

Request Body

Content Type
application/json

Example

[

```json
{
  "name": "string",
  "content":
  [
    "string"
  ],
  "canBeUsedByBuildJobs": true,
  "authorization": "string"
}
```

]

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

$ curl -u <login name>:<password or access token> -X POST -d@request-body.json -H "Content-Type: application/json" https://code.shoncloud.com/~api/settings/groovy-scripts

### setIssueSetting

Setting

Set Issue Setting

Set Issue Setting

Http Method
POST
End Point

/~api/settings/issue

Request Body

Content Type
application/json

Example

```json
{
  "stateSpecs":
  [
    {
      "name": "string",
      "description": "string",
      "color": "string"
    }
  ],
  "transitionSpecs":
  [
    {
      "@type": "BranchUpdatedSpec",
      "branches": "string",
      "commitMessages": "string",
      "toState": "string",
      "fromStates":
      [
        "string"
      ],
      "issueQuery": "string",
      "removeFields":
      [
        "string"
      ]
    }
  ],
  "fieldSpecs":
  [
    {
      "@type": "BooleanField",
      "defaultValueProvider":
      {
        "@type": "FalseDefaultValue"
      },
      "nameOfEmptyValue": "string",
      "promptUponIssueOpen": true,
      "applicableProjects": "string",
      "name": "string",
      "description": "string",
      "allowMultiple": true,
      "allowEmpty": true,
      "showCondition":
      {
        "inputName": "string",
        "valueMatcher":
        {
          "@type": "ValueIsEmpty"
        }
      }
    }
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
  "timeTrackingSetting":
  {
    "useHoursAndMinutesOnly": true,
    "hoursPerDay": 1,
    "daysPerWeek": 1,
    "aggregationLink": "string"
  },
  "listFields":
  [
    "string"
  ],
  "listLinks":
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
  "issueTemplates":
  [
    {
      "issueQuery": "string",
      "issueDescription": "string"
    }
  ],
  "commitMessageFixPatterns":
  {
    "entries":
    [
      {
        "prefix": "string",
        "suffix": "string"
      }
    ]
  },
  "externalIssueTransformers":
  {
    "entries":
    [
      {
        "pattern": "string",
        "replaceWith": "string"
      }
    ]
  },
  "reconciled": true
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

$ curl -u <login name>:<password or access token> -X POST -d@request-body.json -H "Content-Type: application/json" https://code.shoncloud.com/~api/settings/issue

### setJobExecutors

Setting

Set Job Executors

Set Job Executors

Http Method
POST
End Point

/~api/settings/job-executors

Request Body

Content Type
application/json

Example

[

```json
{
  "@type": "KubernetesExecutor",
  "nodeSelector":
  [
    {
      "labelName": "string",
      "labelValue": "string"
    }
  ],
  "clusterRole": "string",
  "registryLogins":
  [
    {
      "registryUrl": "string",
      "userName": "string",
      "password": "string"
    }
  ],
  "buildWithPV": true,
  "storageClass": "string",
  "storageSize": "string",
  "serviceLocators":
  [
    {
      "serviceNames": "string",
      "serviceImages": "string",
      "nodeSelector":
      [
        {
          "labelName": "string",
          "labelValue": "string"
        }
      ]
    }
  ],
  "configFile": "string",
  "kubeCtlPath": "string",
  "cpuRequest": "string",
  "memoryRequest": "string",
  "cpuLimit": "string",
  "memoryLimit": "string",
  "alwaysPullImage": true,
  "enabled": true,
  "name": "string",
  "jobMatch": "string",
  "htmlReportPublishEnabled": true,
  "sitePublishEnabled": true
}
```

]

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

$ curl -u <login name>:<password or access token> -X POST -d@request-body.json -H "Content-Type: application/json" https://code.shoncloud.com/~api/settings/job-executors

### setMailService

Setting

Set Mail Service

Set Mail Service

Http Method
POST
End Point

/~api/settings/mail-service

Request Body

Content Type
application/json

Example

```json
{
  "@type": "SendgridConnector",
  "apiKey": "string",
  "systemAddress": "string",
  "timeout": 1,
  "webhookSetting":
  {
    "secret": "string"
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

$ curl -u <login name>:<password or access token> -X POST -d@request-body.json -H "Content-Type: application/json" https://code.shoncloud.com/~api/settings/mail-service

### setServiceDeskSetting

Setting

Set Service Desk Setting

Set Service Desk Setting

Http Method
POST
End Point

/~api/settings/service-desk

Request Body

Content Type
application/json

Example

```json
{
  "issueCreationSettings":
  [
    {
      "applicableProjects": "string",
      "confidential": true,
      "issueFields":
      [
        {
          "name": "string",
          "secret": true,
          "valueProvider":
          {
            "@type": "IgnoreValue"
          }
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

$ curl -u <login name>:<password or access token> -X POST -d@request-body.json -H "Content-Type: application/json" https://code.shoncloud.com/~api/settings/service-desk

### setNotificationTemplateSetting

Setting

Set Notification Template Setting

Set Notification Template Setting

Http Method
POST
End Point

/~api/settings/notification-template

Request Body

Content Type
application/json

Example

```json
{
  "issueNotification": "string",
  "pullRequestNotification": "string",
  "buildNotification": "string",
  "packNotification": "string",
  "commitNotification": "string",
  "issueNotificationUnsubscribed": "string",
  "pullRequestNotificationUnsubscribed": "string",
  "serviceDeskIssueOpened": "string",
  "serviceDeskIssueOpenFailed": "string",
  "userInvitation": "string",
  "emailVerification": "string",
  "passwordReset": "string",
  "stopwatchOverdue": "string",
  "alert": "string"
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

$ curl -u <login name>:<password or access token> -X POST -d@request-body.json -H "Content-Type: application/json" https://code.shoncloud.com/~api/settings/notification-template

### setProjectSetting

Setting

Set Project Setting

Set Project Setting

Http Method
POST
End Point

/~api/settings/project

Request Body

Content Type
application/json

Example

```json
{
  "namedQueries":
  [
    {
      "name": "string",
      "query": "string"
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

$ curl -u <login name>:<password or access token> -X POST -d@request-body.json -H "Content-Type: application/json" https://code.shoncloud.com/~api/settings/project

### setPullRequestSetting

Setting

Set Pull Request Setting

Set Pull Request Setting

Http Method
POST
End Point

/~api/settings/pull-request

Request Body

Content Type
application/json

Example

```json
{
  "namedQueries":
  [
    {
      "name": "string",
      "query": "string"
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

$ curl -u <login name>:<password or access token> -X POST -d@request-body.json -H "Content-Type: application/json" https://code.shoncloud.com/~api/settings/pull-request

### setSecuritySetting

Setting

Set Security Setting

Set Security Setting

Http Method
POST
End Point

/~api/settings/security

Request Body

Content Type
application/json

Example

```json
{
  "enableAnonymousAccess": true,
  "enableSelfRegister": true,
  "allowedSelfRegisterEmailDomain": "string",
  "enableSelfDeregister": true,
  "passwordPolicy":
  {
    "minLength": 1,
    "mustContainUppercase": true,
    "mustContainLowercase": true,
    "mustContainNumber": true,
    "mustContainSpecial": true
  },
  "defaultGroupName": "string",
  "enforce2FA": true,
  "corsAllowedOrigins":
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

$ curl -u <login name>:<password or access token> -X POST -d@request-body.json -H "Content-Type: application/json" https://code.shoncloud.com/~api/settings/security

### setSshSetting

Setting

Set Ssh Setting

Set Ssh Setting

Http Method
POST
End Point

/~api/settings/ssh

Request Body

Content Type
application/json

Example

```json
{
  "pemPrivateKey": "string"
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

$ curl -u <login name>:<password or access token> -X POST -d@request-body.json -H "Content-Type: application/json" https://code.shoncloud.com/~api/settings/ssh

### setContributedSettings

Setting

Set Contributed Settings

Set Contributed Settings

Http Method
POST
End Point

/~api/settings/contributed-settings

Request Body

Content Type
application/json

Example

[

```json
{
  "@type": "ExamplePluginSetting",
  "exampleProperty": "string"
}
```

]

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

$ curl -u <login name>:<password or access token> -X POST -d@request-body.json -H "Content-Type: application/json" https://code.shoncloud.com/~api/settings/contributed-settings
