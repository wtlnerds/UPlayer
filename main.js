// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')
const url = require('url')
const fs = require('fs')
const ytdl = require('ytdl-core')


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  mainWindow.loadURL('http://localhost:3000')
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.


ipcMain.on('fetch-track-byte', (event, arg) => {
  //  console.log(path.join(__dirname, '/tmp', arg))
  const fileBytes = fs.readFileSync(path.join(__dirname, '/tmp', arg))
  event.sender.send('receive-track-byte', fileBytes)
})

ipcMain.on('fetch-track-list', (event, arg) => {
  const trackLocation = path.join(__dirname, '/tmp')
  fs.readdir(trackLocation, (err, items) => {
    event.sender.send(
      'receive-track-list', 
      items.filter((track) => {
        return track.length >= 4 && track.substr(track.length - 4) === '.mp3'
      })
    )
  })
})

ipcMain.on('download-audio', (event, arg) => {

  ytdl(arg, { filter: "audioonly" })
  .pipe(fs.createWriteStream("./tmp/" + arg.substr(arg.length-11) + ".mp3"))

})
