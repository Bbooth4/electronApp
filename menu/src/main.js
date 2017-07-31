const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const Menu = electron.Menu

const path = require('path')
const url = require('url')
const ipc = electron.ipcMain;

const windows = [];

app.on('ready',_ => {
  let win = new BrowserWindow({width: 800, height: 600})

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  const name = electron.app.getName();

  // electron.app.getName() is used to grab productName from package.json to display the name of a submenu item in the dropdown menu in the top of the window 
  // the about role works specifically for osx, need to look up in the docs for what roles are available 
  const template = [
    {
      label: name,
      submenu: [{
        label: `About ${name}`,
        click: _ => {
          console.log('clicked')
        },
        role: 'about'
      }, {
        type: 'separator'
      }, {
        label: 'Quit',
        click: _ => { app.quit() },
        accelerator: 'alt+f4' || 'crtl+w'
      }
    ]
}
  ]

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  win.webContents.openDevTools()

  win.on('closed', function () {
    win = null
  })
  windows.push(win)
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (win === null) {
    createWindow()
  }
})

ipc.on('countdown-start', _ => {
  countdown(count => {
    windows.forEach(win => {
      win.webContents.send('countdown', count)
    })
  })
})