# JobRun

Job Run

| Operation | Http Method | End Point |
| --- | --- | --- |
| Run Build | POST | /job-runs |
| Rebuild | POST | /job-runs/rebuild |
| Cancel Build | DELETE | /job-runs/{buildId} |

---

## Operation Details

### runBuild

Job Run

Run Build

Run Build

Http Method
POST
End Point

/~api/job-runs

Request Body

Content Type
application/json

Example

```json
{
  "@type": "JobRunOnCommit",
  "projectId": 1,
  "commitHash": "string",
  "jobName": "string",
  "params":
  {
    "string":
    [
      "string"
    ]
  },
  "refName": "string",
  "reason": "string"
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

$ curl -u <login name>:<password or access token> -X POST -d@request-body.json -H "Content-Type: application/json" https://code.shoncloud.com/~api/job-runs

### rebuild

Job Run

Rebuild

Rebuild

Http Method
POST
End Point

/~api/job-runs/rebuild

Request Body

Content Type
application/json

Example

```json
{
  "buildId": 1,
  "reason": "string"
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

$ curl -u <login name>:<password or access token> -X POST -d@request-body.json -H "Content-Type: application/json" https://code.shoncloud.com/~api/job-runs/rebuild

### cancelBuild

Job Run

Cancel Build

Cancel Build

Http Method
DELETE
End Point

/~api/job-runs/{buildId}

| Placeholder | Description | Example |
| --- | --- | --- |
| {buildId} | Build Id | 1 |

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

$ curl -u <login name>:<password or access token> -X DELETE https://code.shoncloud.com/~api/job-runs/1
