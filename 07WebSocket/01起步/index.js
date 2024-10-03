const WebSocket = require('ws');

const ws = new WebSocket.Server({ port: 8080 });
ws.on('connection', (client) => {
    console.log('客户端连接了');
    client.on('message', (message) => {
        console.log(`客户端发送了消息: ${message}`);
        client.send(`服务器回复: 你好客户端`);
    });

    client.on('close', () => {
        console.log('客户端断开连接');
    });
});
