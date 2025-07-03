import json
import boto3

dynamodb = boto3.resource('dynamodb', region_name='eu-west-1')
table = dynamodb.Table('user')

def lambda_handler(event, context):
    method = event.get('httpMethod')

    if method == 'GET':
        user_id = event['queryStringParameters']['user_id']
        response = table.get_item(Key={'user_id': user_id})
        return {
            'statusCode': 200,
            'body': json.dumps(response.get('Item', {}))
        }

    elif method == 'POST':
        body = json.loads(event['body'])
        table.put_item(Item=body)
        return {
            'statusCode': 201,
            'body': json.dumps({'message': 'User created'})
        }

    return {'statusCode': 400, 'body': 'Unsupported method'}
