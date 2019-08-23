import json
import os
import boto3

def foodLists(event, context):
    f=open("data/menuCarbs.json", "r")
    results =f.read()

    response = {
        "statusCode": 200,
        "headers": {
        'Access-Control-Allow-Origin': '*'
        },
        "body": results
    }
    return response