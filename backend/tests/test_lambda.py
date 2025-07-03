import pytest
from moto import mock_dynamodb
import boto3
import os
from lambda_function import lambda_handler

@pytest.fixture
def setup_dynamodb():
    with mock_dynamodb():
        client = boto3.resource('dynamodb', region_name='eu-west-1')
        table = client.create_table(
            TableName='Users',
            KeySchema=[{'AttributeName': 'user_id', 'KeyType': 'HASH'}],
            AttributeDefinitions=[{'AttributeName': 'user_id', 'AttributeType': 'S'}],
            BillingMode='PAY_PER_REQUEST'
        )
        table.put_item(Item={'user_id': '123', 'name': 'Alice'})
        yield

def test_get_user(setup_dynamodb, monkeypatch):
    monkeypatch.setenv("TABLE_NAME", "Users")
    event = {
        'httpMethod': 'GET',
        'queryStringParameters': {'user_id': '123'}
    }
    response = lambda_handler(event, None)
    assert response['statusCode'] == 200
    assert 'Alice' in response['body']
