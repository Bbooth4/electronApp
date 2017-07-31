const electron = require('electron')
const path = require('path')
const { app, Menu, Tray } = electron 

// this exists as a little icon in the top menu of the computer 

app.on('ready', _ => {
  const tray = new Tray(path.join('src', 'trayIcon.png'))
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Wow',
      click: _ => console.log('wow')
    },
    {
      label: 'Awesome',
      click: _ => console.log('awesome')
    }
  ])
  tray.setToolTip('Woweeee')
  tray.setContextMenu(contextMenu)
})
