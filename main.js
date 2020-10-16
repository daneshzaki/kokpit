const { app, BrowserWindow } = require('electron')
const nativeImage = require('electron').nativeImage
const path = require('path');

function createWindow () {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1250,
    height: 550,
    icon: __dirname + '/images/icon.ico',
    autoHideMenuBar: true,
    resizable: true,
    fullscreenable:false, 

    webPreferences: {
      nodeIntegration: true,
      devTools : false
    }
  })

  //no menu 
  win.removeMenu();
  //const image = nativeImage.createFromPath('/code/electronjs/kokpitel/images/icon.ico');
  //set icon
  //win.setOverlayIcon(image, '');
  
  // and load the index.html of the app.
  win.loadFile('index.html')

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
const kokpitserver = require("./kokpitserver");