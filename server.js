const http = require('http');
// const https = require('https');
// const fs = require('fs');
const app = require('./app');

// const httpsOptions = {
//     key: fs.readFileSync('path/to/server-key.pem'),
//     cert: fs.readFileSync('path/to/server-crt.pem')
// };

const normalizePort = val => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const errorHandler = error => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const adress = server.address();
    const bind = typeof adress === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind = ' requires elevated privileges.');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use.');
            process.exit(1);
            break;
        default:
            throw error;
    }
};

const serverhttp = http.createServer(app);
// const serverhttps = https.createServer(httpsOptions, app);

serverhttp.on('error', errorHandler);
serverhttp.on('listening', () => {
    const address = serverhttp.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + bind);
});

serverhttp.listen(port);
//serverhttps.listen(port);