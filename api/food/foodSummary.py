import json
import os
import boto3

def foodLists(event, context):
    results = 'test'

    response = {
        "statusCode": 200,
        "headers": {
        'Access-Control-Allow-Origin': '*'
        },
        #"body": json.dumps(results)
        "body": results
    }
    return response