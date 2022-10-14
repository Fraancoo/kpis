const express = require('express');
const bodyParser = require("body-parser")
const cors = require('cors');
const app = express();
app.set('port', process.env.PORT || 3080);

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}));

//---------- API Routes ----------
app.use('/users', require('./routes/users'));
app.use('/kpi', require('./routes/kpi'));

// server
app.listen(app.get('port'), ()=> {
    console.log('Server running on port', app.get('port'));
});
