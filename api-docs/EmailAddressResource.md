# EmailAddress

Email Address

| Operation | Http Method | End Point |
| --- | --- | --- |
| Get Email Address | GET | /email-addresses/{emailAddressId} |
| Is Email Address Verified | GET | /email-addresses/{emailAddressId}/verified |
| Create Email Address | POST | /email-addresses |
| Set As Public | POST | /email-addresses/public |
| Set As Private | POST | /email-addresses/private |
| Set As Primary | POST | /email-addresses/primary |
| Use For Git Operations | POST | /email-addresses/git |
| Resend Verification Email | POST | /email-addresses/resend-verification-email |
| Delete Email Address | DELETE | /email-addresses/{emailAddressId} |

---

## Operation Details

### getEmailAddress

Email Address

Get Email Address

Get Email Address

Http Method
GET
End Point

/~api/email-addresses/{emailAddressId}

| Placeholder | Description | Example |
| --- | --- | --- |
| {emailAddressId} | Email Address Id | 1 |

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
  "value": "string",
  "primary": true,
  "git": true,
  "open": true,
  "ownerId": 1
}
```

Operation Failed

Status code
Status code other than 200 indicating the error type
Response Body
Error detail of content type "text/plain"

cURL Example

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/email-addresses/1

### isEmailAddressVerified

Email Address

Is Email Address Verified

Is Email Address Verified

Http Method
GET
End Point

/~api/email-addresses/{emailAddressId}/verified

| Placeholder | Description | Example |
| --- | --- | --- |
| {emailAddressId} | Email Address Id | 1 |

Response

Operation Successful

Status Code
200
Response Body

Content Type
application/json

Example

true

Operation Failed

Status code
Status code other than 200 indicating the error type
Response Body
Error detail of content type "text/plain"

cURL Example

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/email-addresses/1/verified

### createEmailAddress

Email Address

Create Email Address

Create Email Address

Create new email address

Http Method
POST
End Point

/~api/email-addresses

Request Body

Content Type
application/json

Example

```json
{
  "value": "string",
  "ownerId": 1
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

$ curl -u <login name>:<password or access token> -X POST -d@request-body.json -H "Content-Type: application/json" https://code.shoncloud.com/~api/email-addresses

### setAsPublic

Email Address

Set As Public

Set As Public

Set as public email address

Http Method
POST
End Point

/~api/email-addresses/public

Request Body

Content Type
application/json

Example

1

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

$ curl -u <login name>:<password or access token> -X POST -d@request-body.json -H "Content-Type: application/json" https://code.shoncloud.com/~api/email-addresses/public

### setAsPrivate

Email Address

Set As Private

Set As Private

Set as private email address

Http Method
POST
End Point

/~api/email-addresses/private

Request Body

Content Type
application/json

Example

1

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

$ curl -u <login name>:<password or access token> -X POST -d@request-body.json -H "Content-Type: application/json" https://code.shoncloud.com/~api/email-addresses/private

### setAsPrimary

Email Address

Set As Primary

Set As Primary

Set as primary email address

Http Method
POST
End Point

/~api/email-addresses/primary

Request Body

Content Type
application/json

Example

1

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

$ curl -u <login name>:<password or access token> -X POST -d@request-body.json -H "Content-Type: application/json" https://code.shoncloud.com/~api/email-addresses/primary

### useForGitOperations

Email Address

Use For Git Operations

Use For Git Operations

Use for git operations

Http Method
POST
End Point

/~api/email-addresses/git

Request Body

Content Type
application/json

Example

1

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

$ curl -u <login name>:<password or access token> -X POST -d@request-body.json -H "Content-Type: application/json" https://code.shoncloud.com/~api/email-addresses/git

### resendVerificationEmail

Email Address

Resend Verification Email

Resend Verification Email

Resend verification email

Http Method
POST
End Point

/~api/email-addresses/resend-verification-email

Request Body

Content Type
application/json

Example

1

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

$ curl -u <login name>:<password or access token> -X POST -d@request-body.json -H "Content-Type: application/json" https://code.shoncloud.com/~api/email-addresses/resend-verification-email

### deleteEmailAddress

Email Address

Delete Email Address

Delete Email Address

Http Method
DELETE
End Point

/~api/email-addresses/{emailAddressId}

| Placeholder | Description | Example |
| --- | --- | --- |
| {emailAddressId} | Email Address Id | 1 |

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

$ curl -u <login name>:<password or access token> -X DELETE https://code.shoncloud.com/~api/email-addresses/1
