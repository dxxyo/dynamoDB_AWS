// Configure AWS SDK and create DynamoDB Document Client
AWS.config.update({
    accessKeyId: 'ASIA6GGICQZMQHUNNTFA',
    secretAccessKey: '36j0fpUiR0CtwE98LoMquOqLKHwVqgwkT8YAXsCp',
    region: 'us-east-1' // e.g., 'us-east-1'
  });

const docClient = new AWS.DynamoDB.DocumentClient();

// Fetch data from DynamoDB using the query operation
const fetchData = () => {
    const params = {
        TableName: 'iniDataBase',
        KeyConditionExpression: '#timestamp = :$timestamp()',
        ExpressionAttributeNames: {
            '#timestamp': 'timestamp'
          },
          ExpressionAttributeValues: {
            ':timestampValue': { N: '$timestamp()' } // Replace with your actual timestamp value
          }
    };

    docClient.query(params, (err, data) => {
        if (err) {
            console.error('Error fetching data:', err);
        } else {
            displayData(data.Items);
        }
    });
};


// Display fetched data on the web page
const displayData = (items) => {
    const dataList = document.getElementById('data-list');

    items.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = JSON.stringify(item);
        dataList.appendChild(listItem);
    });
};

// Fetch data when the page loads
window.onload = fetchData;
