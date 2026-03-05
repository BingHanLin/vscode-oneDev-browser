# TriggerJob

Trigger Job

This resource provides an alternative way to run job by passing all parameters via url

| Operation | Http Method | End Point |
| --- | --- | --- |
| Trigger Job Via Get | GET | /trigger-job |
| Trigger Job Via Post | POST | /trigger-job |

---

## Operation Details

### triggerJobViaGet

Trigger Job

Trigger Job Via Get

Trigger Job Via Get

Trigger specified job. Query parameters other than listed below will be interpreted as job params

Http Method
GET
End Point

/~api/trigger-job

Query Parameters

| Parameter | Description | Required | Example |
| --- | --- | --- | --- |
| project | Path of the project | Yes | string |
| branch | Specify branch or tag to be triggered against. If none specified, default branch will be used | No | string |
| tag | Specify branch or tag to be triggered against. If none specified, default branch will be used | No | string |
| job | Job | Yes | string |
| access-token | OneDev access token with permission to trigger the job | Yes | string |

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

$ curl -G https://code.shoncloud.com/~api/trigger-job --data-urlencode project=string --data-urlencode branch=string --data-urlencode tag=string --data-urlencode job=string --data-urlencode access-token=string

### triggerJobViaPost

Trigger Job

Trigger Job Via Post

Trigger Job Via Post

Trigger specified job. Query parameters other than listed below will be interpreted as job params

Http Method
POST
End Point

/~api/trigger-job

Query Parameters

| Parameter | Description | Required | Example |
| --- | --- | --- | --- |
| project | Path of the project | Yes | string |
| branch | Specify branch or tag to be triggered against. If none specified, default branch will be used | No | string |
| tag | Specify branch or tag to be triggered against. If none specified, default branch will be used | No | string |
| job | Job | Yes | string |
| access-token | OneDev access token with permission to trigger the job | Yes | string |

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

$ curl -G -X POST -H "Content-Type: application/json" https://code.shoncloud.com/~api/trigger-job --data-urlencode project=string --data-urlencode branch=string --data-urlencode tag=string --data-urlencode job=string --data-urlencode access-token=string
