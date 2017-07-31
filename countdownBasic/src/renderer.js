// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const electron = require('electron')
// used on the side making the call to main, 'countdown-start' is called on the main side
const ipc = electron.ipcRenderer

document.getElementById('start').addEventListener('click', _ => {
  ipc.send('countdown-start')
});

ipc.on('countdown', (event, count) => {
  document.getElementById('count').innerHTML = count
})
