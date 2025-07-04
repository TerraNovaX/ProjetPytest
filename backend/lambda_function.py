import json
import boto3
import uuid

dynamodb = boto3.resource('dynamodb', region_name='eu-west-1')
table = dynamodb.Table('user')

def lambda_handler(event, context):
    # Compatible HTTP API
    method = event.get("requestContext", {}).get("http", {}).get("method")

    if method == 'GET':
        params = event.get('queryStringParameters') or {}
        user_id = params.get('user_id')
        if user_id:
            # Récupérer un seul utilisateur
            response = table.get_item(Key={'user_id': user_id})
            return {
                'statusCode': 200,
                'body': json.dumps(response.get('Item', {}))
            }
        else:
            # Récupérer tous les utilisateurs
            response = table.scan()
            return {
                'statusCode': 200,
                'body': json.dumps(response.get('Items', []))
            }

    elif method == 'POST':
        try:
            body = json.loads(event.get('body', '{}'))
            name = body.get('name')

            if not name:
                return {
                    'statusCode': 400,
                    'body': json.dumps({'error': 'Le champ name est requis'})
                }

            user_id = str(uuid.uuid4())
            item = {
                'user_id': user_id,
                'name': name
            }

            table.put_item(Item=item)
            return {
                'statusCode': 201,
                'body': json.dumps({'message': 'User created', 'user_id': user_id})
            }
        except Exception as e:
            return {
                'statusCode': 500,
                'body': json.dumps({'error': f'Erreur serveur: {str(e)}'})
            }

    return {
        'statusCode': 405,
        'body': json.dumps({'error': 'Méthode HTTP non supportée'})
    }
