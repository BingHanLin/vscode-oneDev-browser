# SsoProvider

Sso Provider

| Operation | Http Method | End Point |
| --- | --- | --- |
| Get Sso Provider | GET | /sso-providers/{ssoProviderId} |
| List Sso Providers | GET | /sso-providers |
| Get Sso Provider Id | GET | /sso-providers/ids/{name} |
| Create Sso Provider | POST | /sso-providers |
| Update Sso Provider | POST | /sso-providers/{ssoProviderId} |
| Delete Sso Provider | DELETE | /sso-providers/{ssoProviderId} |

---

## Operation Details

### getSsoProvider

Sso Provider

Get Sso Provider

Get Sso Provider

Http Method
GET
End Point

/~api/sso-providers/{ssoProviderId}

| Placeholder | Description | Example |
| --- | --- | --- |
| {ssoProviderId} | Sso Provider Id | 1 |

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
  "defaultGroupId": 1,
  "connector":
  {
    "@type": "DiscordConnector",
    "clientId": "string",
    "clientSecret": "string",
    "serverId": "string"
  }
}
```

Operation Failed

Status code
Status code other than 200 indicating the error type
Response Body
Error detail of content type "text/plain"

cURL Example

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/sso-providers/1

### listSsoProviders

Sso Provider

List Sso Providers

List Sso Providers

Http Method
GET
End Point

/~api/sso-providers

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
  "defaultGroupId": 1,
  "connector":
  {
    "@type": "DiscordConnector",
    "clientId": "string",
    "clientSecret": "string",
    "serverId": "string"
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

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/sso-providers

### getSsoProviderId

Sso Provider

Get Sso Provider Id

Get Sso Provider Id

Get SSO provider id by name

Http Method
GET
End Point

/~api/sso-providers/ids/{name}

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

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/sso-providers/ids/string

### createSsoProvider

Sso Provider

Create Sso Provider

Create Sso Provider

Create SSO provider

Http Method
POST
End Point

/~api/sso-providers

Request Body

Content Type
application/json

Example

```json
{
  "name": "string",
  "defaultGroupId": 1,
  "connector":
  {
    "@type": "DiscordConnector",
    "clientId": "string",
    "clientSecret": "string",
    "serverId": "string"
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

$ curl -u <login name>:<password or access token> -X POST -d@request-body.json -H "Content-Type: application/json" https://code.shoncloud.com/~api/sso-providers

### updateSsoProvider

Sso Provider

Update Sso Provider

Update Sso Provider

Update SSO provider of specified id

Http Method
POST
End Point

/~api/sso-providers/{ssoProviderId}

| Placeholder | Description | Example |
| --- | --- | --- |
| {ssoProviderId} | Sso Provider Id | 1 |

Request Body

Content Type
application/json

Example

```json
{
  "name": "string",
  "defaultGroupId": 1,
  "connector":
  {
    "@type": "DiscordConnector",
    "clientId": "string",
    "clientSecret": "string",
    "serverId": "string"
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

$ curl -u <login name>:<password or access token> -X POST -d@request-body.json -H "Content-Type: application/json" https://code.shoncloud.com/~api/sso-providers/1

### deleteSsoProvider

Sso Provider

Delete Sso Provider

Delete Sso Provider

Http Method
DELETE
End Point

/~api/sso-providers/{ssoProviderId}

| Placeholder | Description | Example |
| --- | --- | --- |
| {ssoProviderId} | Sso Provider Id | 1 |

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

$ curl -u <login name>:<password or access token> -X DELETE https://code.shoncloud.com/~api/sso-providers/1
