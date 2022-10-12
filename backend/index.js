const express = require('express');
const bodyParser = require("body-parser")
const cors = require('cors');
const app = express();
app.set('port', process.env.PORT || 3080);

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}));

//---------- API Routes ----------
app.use('/api/users', require('./routes/users'));
// app.use('/api/sales', require('./routes/sales'));
// app.use('/api/kpi', require('./routes/kpi'));

// server
app.listen(app.get('port'), ()=> {
    console.log('Server running on port', app.get('port'));
});
