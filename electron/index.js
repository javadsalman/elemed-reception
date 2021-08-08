const { app, IPCRenderer } = require('electron');
const MainWindow = require('./windows/mainWindow');

let mainWindow;

app.on('ready', ()=>{
    mainWindow = new MainWindow('http://localhost:3000/');
})