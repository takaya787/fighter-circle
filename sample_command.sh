export POOL_ID="ap-northeast-1_OFBsaeLLS"
export CLIENT_ID="1krtduqoihfonjm5uq12v0or71"
export URL="https://7onl51xe81.execute-api.ap-northeast-1.amazonaws.com/prod"

aws cognito-idp admin-create-user \
--user-pool-id "$POOL_ID" \
--username "test" \
--user-attributes Name=email,Value="test1990318@gmail.com" Name=email_verified,Value=false

aws cognito-idp admin-create-user \
--user-pool-id "$POOL_ID" \
--username "takaya" \
--user-attributes Name=email,Value="takaya318318@gmail.com" Name=email_verified,Value=true

aws cognito-idp admin-set-user-password \
--user-pool-id "$POOL_ID" \
--username "test" \
--password 'P@ssw0rd' \
--permanent

aws cognito-idp admin-get-user \
--user-pool-id "$POOL_ID" \
--username "test"

aws cognito-idp admin-initiate-auth \
  --user-pool-id "$POOL_ID" \
  --client-id "$CLIENT_ID" \
  --auth-flow ADMIN_NO_SRP_AUTH \
  --auth-parameters "USERNAME=test,PASSWORD=P@ssw0rd"


curl -H "Authorization:eyJraWQiOiJWQXBTbUJnRmp0T3RNN2xmbzdzNGlMdlZpXC9oNzN2WkRIZGlkQU03K3FaRT0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJkNzQ0M2E2OC0zMGExLTcwMGItZTUzNi05NTgxNTZlZmQ3NjIiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmFwLW5vcnRoZWFzdC0xLmFtYXpvbmF3cy5jb21cL2FwLW5vcnRoZWFzdC0xX09GQnNhZUxMUyIsImNvZ25pdG86dXNlcm5hbWUiOiJ0ZXN0Iiwib3JpZ2luX2p0aSI6IjBjYzdjY2M0LTMxMDQtNDNlNy1iMmQzLTVjNDVlZWY4NTVhZiIsImF1ZCI6IjFrcnRkdXFvaWhmb25qbTV1cTEydjBvcjcxIiwiZXZlbnRfaWQiOiI5ZWU4ZWNkYy04MDI1LTRhOWMtOWNlNy0yMTE2MDUzMjcxNDIiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTcyMDAxMzg3MiwiZXhwIjoxNzIwMDE3NDcyLCJpYXQiOjE3MjAwMTM4NzIsImp0aSI6ImZjOGJlYzc0LTgwNzEtNDU0ZS04M2M5LTNjYjc2NmUwMGQwOSIsImVtYWlsIjoidGVzdDE5OTAzMThAZ21haWwuY29tIn0.etgRGyvCfQPivBCDeZ-JoHGtsFdsREOSEhbNpGINBu8EbslokVJcRaQw6LmaowK06_XfJ4lXNj9aJLY0iNASr31oqJpO_Ted0G1EA4dxbYwqfeq_xCQjz4hiiuFLS0h8aKBbcmcSFVwlPqRPWhTCvE8xL6bfD3CHH7y8Tcm3x9hfAy0dH0nTQfkFoblmOljRtU8CgPWBG7W3uuPw7HPqArfhcSKPfKJW_EsvKQ31XSrxla-UTo9oDNd2TX0ZuIFF9_dQgjvBKI5YdO-sWRyLgS_ptxE13ycguXa_m5UXn8P59suRnjk8Y-ZBqW8gi6feeLBtauHjSMLITSpSMLXqGg" "${URL}/hello"
