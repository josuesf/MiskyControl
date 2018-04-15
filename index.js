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
    width: 800,//width,
    height: 800,//height,
    minHeight: 800,
    minWidth: 800,
    maxHeight:800,
    maxWidth:800,
    frame: false,
  });

  mainWindow.setMenu(null);

  mainWindow.loadURL('file://' + __dirname + '/index.html');

  mainWindow.on('closed', function () {
    mainWindow = null;
  });

  //mainWindow.toggleDevTools()
});