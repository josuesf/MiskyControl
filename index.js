'use strict';
require('./servidor_admin/server');

const { app, dialog, shell, Menu, BrowserWindow } = require('electron')

var mainWindow = null;

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', function () {

  //const { width, height } = require('electron').screen.getPrimaryDisplay().workAreaSize;

  mainWindow = new BrowserWindow({
    width: 1100,//width,
    height: 600,//height,
    minHeight: 600,
    minWidth: 1100,
    // maxHeight:800,
    // maxWidth:800,
    frame: true,
  });

  mainWindow.setMenu(null);

  mainWindow.loadURL('file://' + __dirname + '/index.html');

  mainWindow.on('closed', function () {
    mainWindow = null;
  });

  //mainWindow.toggleDevTools()
});