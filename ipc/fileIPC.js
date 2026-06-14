const { ipcMain, dialog } = require('electron')
const fs = require('fs')
const path = require('path')

function registerFileIPC(win) {

  ipcMain.handle('open-file', async () => {
    const result = dialog.showOpenDialogSync(win, {
      filters: [{ name: 'Text', extensions: ['txt'] }],
      properties: ['openFile']
    })

    if (!result) return null

    const filePath = result[0]
    const content = fs.readFileSync(filePath, 'utf-8')

    return { filePath, content }
  })
}

module.exports = { registerFileIPC }