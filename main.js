const { app, BrowserWindow } = require('electron')
const { registerFileIPC } = require('./ipc/fileIPC')
const { Menu } = require('electron')
const path = require('path')
let win

Menu.setApplicationMenu(null)

app.whenReady().then(() => {
  win = new BrowserWindow({
    width: 1500,
    height: 1000,
    icon: path.join(__dirname, 'assets/icon.ico'),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  win.loadFile('index.html')
  
  registerFileIPC(win)
  
})