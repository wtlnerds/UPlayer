const electron = window.require('electron')
const ipcRenderer = electron.ipcRenderer

module.exports = {
  // read tmp folder
  loadTrackList: () => {
    return new Promise(resolve => {
      ipcRenderer.on('receive-track-list', (event, res) => {
        resolve(res)
      })
      ipcRenderer.send('fetch-track-list')
    })
  },

  loadTrack: (track) => {
    return new Promise(resolve => {
      ipcRenderer.on('receive-track-byte', (event, res) => {
        resolve(res)
      })
      ipcRenderer.send('fetch-track-byte', track)
    });
  },

  download: (url) => {
    return new Promise(resolve => {
      ipcRenderer.send('download-audio', url)
    })
  }
}
