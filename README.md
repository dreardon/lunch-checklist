# Lunch Checklist
## Frontend Installation
### Set Environment Variables
```bash
export BUCKET_NAME=liams-lunch
export API_STAGE=Prod
export REGION=us-east-1
```
### Build Environment
```bash
aws s3 mb s3://$BUCKET_NAME --region $REGION
npm install
```

## API Installation
### Set Environment Variables
```bash
export STACK_NAME=LiamsLunchSAM
export BUCKET_NAME=liams-lunch-sam
export API_STAGE=Prod
export REGION=us-east-1
```

### Lambda/API Gateway and Policies
```bash

#Package Serverless
#pip install -r api/requirements.txt -t api/
sam package \
    --template-file api/template.yaml \
    --output-template-file api/serverless-output.yaml \
    --s3-bucket $BUCKET_NAME

#Create/Update Lambda Functions and API Gateway
sam deploy --template-file api/serverless-output.yaml --stack-name $STACK_NAME --capabilities CAPABILITY_IAM
REST_API_ID=$(aws cloudformation describe-stacks --stack-name $STACK_NAME --query 'Stacks[0].Outputs[?OutputKey==`RESTApiId`].OutputValue' --output text)

#Deploy Gateway Stage
aws apigateway create-deployment --rest-api-id $REST_API_ID --stage-name $API_STAGE
```

### Running Locally
```bash
pip install aws-sam-cli
sam build && sam local start-api
```
