# Repository

Repository

| Operation | Http Method | End Point |
| --- | --- | --- |
| Get Branches | GET | /repositories/{projectId}/branches |
| Get Default Branch | GET | /repositories/{projectId}/default-branch |
| Set Default Branch | POST | /repositories/{projectId}/default-branch |
| Get Branch | GET | /repositories/{projectId}/branches/{branch:.*} |
| Create Branch | POST | /repositories/{projectId}/branches |
| Delete Branch | DELETE | /repositories/{projectId}/branches/{branch:.*} |
| Get Tags | GET | /repositories/{projectId}/tags |
| Get Tag | GET | /repositories/{projectId}/tags/{tag:.*} |
| Create Tag | POST | /repositories/{projectId}/tags |
| Delete Tag | DELETE | /repositories/{projectId}/tags/{tag:.*} |
| Query Commits | GET | /repositories/{projectId}/commits |
| Get Commit | GET | /repositories/{projectId}/commits/{commitHash} |
| Get Directory | GET | /repositories/{projectId}/directories/{revisionAndDirectory:.*} |
| Get File | GET | /repositories/{projectId}/files/{revisionAndFile:.*} |
| Edit File | POST | /repositories/{projectId}/files/{branchAndFile:.*} |

---

## Operation Details

### getBranches

Repository

Get Branches

Get Branches

List all branches

Http Method
GET
End Point

/~api/repositories/{projectId}/branches

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

"string"

]

Operation Failed

Status code
Status code other than 200 indicating the error type
Response Body
Error detail of content type "text/plain"

cURL Example

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/repositories/1/branches

### getDefaultBranch

Repository

Get Default Branch

Get Default Branch

Get default branch. Return status code 204 if no default branch (repository not initialized)

Http Method
GET
End Point

/~api/repositories/{projectId}/default-branch

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

string

Operation Failed

Status code
Status code other than 200 indicating the error type
Response Body
Error detail of content type "text/plain"

cURL Example

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/repositories/1/default-branch

### setDefaultBranch

Repository

Set Default Branch

Set Default Branch

Set default branch

Http Method
POST
End Point

/~api/repositories/{projectId}/default-branch

| Placeholder | Description | Example |
| --- | --- | --- |
| {projectId} | Project Id | 1 |

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

$ curl -u <login name>:<password or access token> -X POST -d@request-body.json -H "Content-Type: application/json" https://code.shoncloud.com/~api/repositories/1/default-branch

### getBranch

Repository

Get Branch

Get Branch

Get specified branch

Http Method
GET
End Point

/~api/repositories/{projectId}/branches/{branch:.*}

| Placeholder | Description | Example |
| --- | --- | --- |
| {projectId} | Project Id | 1 |
| {branch} | Branch | test-branch |

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
  "commitHash": "46c001b04cba0ca41588841f1ca32f50b582ee9b",
  "refName": "string"
}
```

Operation Failed

Status code
Status code other than 200 indicating the error type
Response Body
Error detail of content type "text/plain"

cURL Example

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/repositories/1/branches/test-branch

### createBranch

Repository

Create Branch

Create Branch

Create a new branch

Http Method
POST
End Point

/~api/repositories/{projectId}/branches

| Placeholder | Description | Example |
| --- | --- | --- |
| {projectId} | Project Id | 1 |

Request Body

Content Type
application/json

Example

```json
{
  "revision": "46c001b04cba0ca41588841f1ca32f50b582ee9b",
  "branchName": "string"
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

$ curl -u <login name>:<password or access token> -X POST -d@request-body.json -H "Content-Type: application/json" https://code.shoncloud.com/~api/repositories/1/branches

### deleteBranch

Repository

Delete Branch

Delete Branch

Delete specified branch

Http Method
DELETE
End Point

/~api/repositories/{projectId}/branches/{branch:.*}

| Placeholder | Description | Example |
| --- | --- | --- |
| {projectId} | Project Id | 1 |
| {branch} | Branch | test-branch |

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

$ curl -u <login name>:<password or access token> -X DELETE https://code.shoncloud.com/~api/repositories/1/branches/test-branch

### getTags

Repository

Get Tags

Get Tags

List all tags

Http Method
GET
End Point

/~api/repositories/{projectId}/tags

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

"string"

]

Operation Failed

Status code
Status code other than 200 indicating the error type
Response Body
Error detail of content type "text/plain"

cURL Example

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/repositories/1/tags

### getTag

Repository

Get Tag

Get Tag

Get specified tag

Http Method
GET
End Point

/~api/repositories/{projectId}/tags/{tag:.*}

| Placeholder | Description | Example |
| --- | --- | --- |
| {projectId} | Project Id | 1 |
| {tag} | Tag | test-tag |

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
  "commitHash": "46c001b04cba0ca41588841f1ca32f50b582ee9b",
  "refName": "string"
}
```

Operation Failed

Status code
Status code other than 200 indicating the error type
Response Body
Error detail of content type "text/plain"

cURL Example

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/repositories/1/tags/test-tag

### createTag

Repository

Create Tag

Create Tag

Create a new tag

Http Method
POST
End Point

/~api/repositories/{projectId}/tags

| Placeholder | Description | Example |
| --- | --- | --- |
| {projectId} | Project Id | 1 |

Request Body

Content Type
application/json

Example

```json
{
  "revision": "46c001b04cba0ca41588841f1ca32f50b582ee9b",
  "tagName": "string",
  "tagMessage": "string"
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

$ curl -u <login name>:<password or access token> -X POST -d@request-body.json -H "Content-Type: application/json" https://code.shoncloud.com/~api/repositories/1/tags

### deleteTag

Repository

Delete Tag

Delete Tag

Delete specified tag

Http Method
DELETE
End Point

/~api/repositories/{projectId}/tags/{tag:.*}

| Placeholder | Description | Example |
| --- | --- | --- |
| {projectId} | Project Id | 1 |
| {tag} | Tag | test-tag |

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

$ curl -u <login name>:<password or access token> -X DELETE https://code.shoncloud.com/~api/repositories/1/tags/test-tag

### queryCommits

Repository

Query Commits

Query Commits

Query commits of specified project. Will return list of matching commit hashes

Http Method
GET
End Point

/~api/repositories/{projectId}/commits

| Placeholder | Description | Example |
| --- | --- | --- |
| {projectId} | Project Id | 1 |

Query Parameters

| Parameter | Description | Required | Example |
| --- | --- | --- | --- |
| query | Syntax of this query is the same as in commits page | No | since tag(v4.0.0) until tag(v4.7.0) |
| count | Number of commits to return | Yes | 100 |
| field | Fields to return. Unspecified fields will return as null in returned commit object | No | [ 	 		 	 		"PARENTS"  	  	 	 	 	 	 	 	 	 	 		 	 	 	 	 	 	 	 	 	  		,  	 		 	 		"AUTHOR"  	  	 	 	 	 	 	 	 	 	 		 	 	 	 	 	 	 	 	 	  		,  	 		 	 		"COMMITTER"  	  	 	 	 	 	 	 	 	 	 		 	 	 	 	 	 	 	 	 	  		,  	 		 	 		"COMMIT_DATE"  	  	 	 	 	 	 	 	 	 	 		 	 	 	 	 	 	 	 	 	  		,  	 		 	 		"SUBJECT"  	  	 	 	 	 	 	 	 	 	 		 	 	 	 	 	 	 	 	 	  		,  	 		 	 		"BODY"  	  	 	 	 	 	 	 	 	 	 		 	 	 	 	 	 	 	 	 	  		,  	 		 	 		"FILE_CHANGES"  	  	 	 	 	 	 	 	 	 	 		 	 	 	 	 	 	 	 	 	  		,  	 		 	 		"LINE_CHANGES"  	  	 	 	 	 	 	 	 	 	 		 	 	 	 	 	 	 	 	 	  		  	 	] |

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
  "hash": "string",
  "subject": "string",
  "body": "string",
  "commitDate": "2026-03-05T13:55:42.405+00:00",
  "committer":
  {
    "name": "string",
    "emailAddress": "string",
    "when": 1,
    "tzOffset": 1
  },
  "author":
  {
    "name": "string",
    "emailAddress": "string",
    "when": 1,
    "tzOffset": 1
  },
  "parentHashes":
  [
    "string"
  ],
  "fileChanges":
  [
    {
      "oldPath": "string",
      "newPath": "string",
      "additions": 1,
      "deletions": 1
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

$ curl -u <login name>:<password or access token> -G https://code.shoncloud.com/~api/repositories/1/commits --data-urlencode 'query=since tag(v4.0.0) until tag(v4.7.0)' --data-urlencode count=100 --data-urlencode field=PARENTS --data-urlencode field=AUTHOR --data-urlencode field=COMMITTER --data-urlencode field=COMMIT_DATE --data-urlencode field=SUBJECT --data-urlencode field=BODY --data-urlencode field=FILE_CHANGES --data-urlencode field=LINE_CHANGES

### getCommit

Repository

Get Commit

Get Commit

Get specified commit

Http Method
GET
End Point

/~api/repositories/{projectId}/commits/{commitHash}

| Placeholder | Description | Example |
| --- | --- | --- |
| {projectId} | Project Id | 1 |
| {commitHash} | Commit Hash | 8cbec3d9eda2050a4ca0676767be3b6bf20251b8 |

Query Parameters

| Parameter | Description | Required | Example |
| --- | --- | --- | --- |
| field | Fields to return. Unspecified fields will return as null in returned commit object | No | [ 	 		 	 		"PARENTS"  	  	 	 	 	 	 	 	 	 	 		 	 	 	 	 	 	 	 	 	  		,  	 		 	 		"AUTHOR"  	  	 	 	 	 	 	 	 	 	 		 	 	 	 	 	 	 	 	 	  		,  	 		 	 		"COMMITTER"  	  	 	 	 	 	 	 	 	 	 		 	 	 	 	 	 	 	 	 	  		,  	 		 	 		"COMMIT_DATE"  	  	 	 	 	 	 	 	 	 	 		 	 	 	 	 	 	 	 	 	  		,  	 		 	 		"SUBJECT"  	  	 	 	 	 	 	 	 	 	 		 	 	 	 	 	 	 	 	 	  		,  	 		 	 		"BODY"  	  	 	 	 	 	 	 	 	 	 		 	 	 	 	 	 	 	 	 	  		,  	 		 	 		"FILE_CHANGES"  	  	 	 	 	 	 	 	 	 	 		 	 	 	 	 	 	 	 	 	  		,  	 		 	 		"LINE_CHANGES"  	  	 	 	 	 	 	 	 	 	 		 	 	 	 	 	 	 	 	 	  		  	 	] |

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
  "hash": "string",
  "subject": "string",
  "body": "string",
  "commitDate": "2026-03-05T13:55:43.796+00:00",
  "committer":
  {
    "name": "string",
    "emailAddress": "string",
    "when": 1,
    "tzOffset": 1
  },
  "author":
  {
    "name": "string",
    "emailAddress": "string",
    "when": 1,
    "tzOffset": 1
  },
  "parentHashes":
  [
    "string"
  ],
  "fileChanges":
  [
    {
      "oldPath": "string",
      "newPath": "string",
      "additions": 1,
      "deletions": 1
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

$ curl -u <login name>:<password or access token> -G https://code.shoncloud.com/~api/repositories/1/commits/8cbec3d9eda2050a4ca0676767be3b6bf20251b8 --data-urlencode field=PARENTS --data-urlencode field=AUTHOR --data-urlencode field=COMMITTER --data-urlencode field=COMMIT_DATE --data-urlencode field=SUBJECT --data-urlencode field=BODY --data-urlencode field=FILE_CHANGES --data-urlencode field=LINE_CHANGES

### getDirectory

Repository

Get Directory

Get Directory

Get children of specified directory

Http Method
GET
End Point

/~api/repositories/{projectId}/directories/{revisionAndDirectory:.*}

| Placeholder | Description | Example |
| --- | --- | --- |
| {projectId} | Project Id | 1 |
| {revisionAndDirectory} | Revision And Directory | some-branch-or-tag/path/to/directory |

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
  "path": "string",
  "isFile": true
}
```

]

Operation Failed

Status code
Status code other than 200 indicating the error type
Response Body
Error detail of content type "text/plain"

cURL Example

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/repositories/1/directories/some-branch-or-tag/path/to/directory

### getFile

Repository

Get File

Get File

Get metadata and content of specified file

Http Method
GET
End Point

/~api/repositories/{projectId}/files/{revisionAndFile:.*}

| Placeholder | Description | Example |
| --- | --- | --- |
| {projectId} | Project Id | 1 |
| {revisionAndFile} | Revision And File | some-branch-or-tag/path/to/file |

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
  "sha": "46c001b04cba0ca41588841f1ca32f50b582ee9b",
  "base64Content": "string",
  "isPartial": true,
  "path": "string",
  "size": 1
}
```

Operation Failed

Status code
Status code other than 200 indicating the error type
Response Body
Error detail of content type "text/plain"

cURL Example

$ curl -u <login name>:<password or access token> https://code.shoncloud.com/~api/repositories/1/files/some-branch-or-tag/path/to/file

### editFile

Repository

Edit File

Edit File

Create, update, or delete specified file. Return hash of resulting commit

Http Method
POST
End Point

/~api/repositories/{projectId}/files/{branchAndFile:.*}

| Placeholder | Description | Example |
| --- | --- | --- |
| {projectId} | Project Id | 1 |
| {branchAndFile} | Branch And File | test-branch/path/to/file |

Request Body

Content Type
application/json

Example

```json
{
  "@type": "FileCreateOrUpdateRequest",
  "base64Content": "string",
  "commitMessage": "string"
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

46c001b04cba0ca41588841f1ca32f50b582ee9b

Operation Failed

Status code
Status code other than 200 indicating the error type
Response Body
Error detail of content type "text/plain"

cURL Example

$ curl -u <login name>:<password or access token> -X POST -d@request-body.json -H "Content-Type: application/json" https://code.shoncloud.com/~api/repositories/1/files/test-branch/path/to/file
