const axios = require('axios');

for (let i = 0; i < 10; ++i) {
    axios.get('http://localhost:5000/big-file').then((message) => {console.log(`${i}: ${message.data}`)});
}