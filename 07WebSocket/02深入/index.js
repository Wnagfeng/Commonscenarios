const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server); // 使用 socket.io 创建 WebSocket 服务器

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html'); // 提供 index.html
});

// 监听客户端连接
io.on('connection', (socket) => {
    console.log('a user connected');

    // 监听用户的用户名
    socket.on('join', (username) => {
        socket.username = username; // 将用户名存储在 socket 对象上
        // 广播用户进入聊天室的消息
        io.emit('chat message', { message: `${username} 进入了聊天室`, username: '系统' });
    });

    // 监听消息
    socket.on('chat message', ({ message }) => {
        console.log('message: ' + message);
        // 将消息广播给所有连接的客户端
        io.emit('chat message', { message: message, username: socket.username });
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
        // 只在 username 存在时发送离开消息
        if (socket.username) {
            io.emit('chat message', { message: `${socket.username} 离开了聊天室`, username: '系统' });
        }
    });
});

// 启动 HTTP 服务器
server.listen(3000, () => {
    console.log('listening on *:3000');
});
