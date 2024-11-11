const Koa = require('koa');
const WebSocket = require('ws');
const app = new Koa();

// 创建 WebSocket 服务器
const wss = new WebSocket.Server({ port: 3000 });

// 模拟数据更新
function generateData() {
    return {
        type: 'data',  // 标识这是数据消息
        value: Math.random() * 100,
        timestamp: new Date().toISOString()
    };
}

wss.on('connection', (ws) => {
    console.log('大屏客户端已连接');
    
    // 定期推送数据
    const dataInterval = setInterval(() => {
        if (ws.readyState === WebSocket.OPEN) {
            const data = generateData();
            ws.send(JSON.stringify(data));
        }
    }, 1000); // 每秒推送一次新数据

    // 处理心跳
    ws.on('message', (message) => {
        const msg = message.toString();
        if (msg === 'ping') {
            ws.send(JSON.stringify({
                type: 'pong'
            }));
        }
    });

    ws.on('close', () => {
        console.log('客户端断开连接');
        clearInterval(dataInterval);
    });
});

// 启动 HTTP 服务器
app.listen(8080, () => {
    console.log('HTTP服务器运行在端口 8080');
});
