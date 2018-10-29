const electron = require('electron');
// Module to control application life.
const { app, BrowserWindow, ipcMain, dialog } = electron;

const path = require('path');
const fs = require('fs');

const Parser = require('node-dbf').default;
const XLSX = require('xlsx');
const { add_cell_to_sheet } = require('./xlsx-helper-functions');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({width: 800, height: 600});
    mainWindow.setMenu(null);
    // and load the index.html of the app.
    console.log(__dirname);
    const startUrl = process.env.ELECTRON_START_URL || 'http://localhost:3000';
    
    //mainWindow.loadURL(startUrl);
    const ses = mainWindow.webContents.session;
        ses.setProxy({ proxyRules: 'direct://' }, () => {
        mainWindow.loadURL(startUrl);
        mainWindow.show();
    });
    // Open the DevTools.
    mainWindow.webContents.openDevTools();

    ipcMain.on('create-one-file', (event, additionalColumns = [], startingRowNo = 5) => {
			dialog.showOpenDialog({
				filters: [
					{ name: 'CSV Files', extensions: ['csv'] }
				],
				properties: ['openFile', 'multiSelections']
			}, (fileNames) => {
				if (fileNames) {
					fs.copyFile(path.join(__dirname, '../sample-files/test.xlsx'), 'D:/test.xlsx', () => {
						const workbook = XLSX.readFile('D:/test.xlsx');
						fileNames.forEach((fileName, rowIndex) => {
							const parser = new Parser(fileName, { encoding: 'utf-8' });
							let worksheet;
							let noOfColumns = 0;
							parser.on('start', () => {
								try {
									worksheet = workbook.Sheets[path.parse(fileName).name.toLowerCase()];
									console.log(path.parse(fileName).name);
									if (worksheet) {
										noOfColumns = XLSX.utils.decode_range(worksheet['!ref']).e.c;
									}
								} catch (_) {
									console.log(_); // please select a valid file
								}
							});
							parser.on('header', (header) => {
								// console.log('header', header);
							});
							parser.on('record', (record) => {
								let cells = [...additionalColumns, ...Object.values(record)];
								cells.shift();
								cells.shift();
								let isNull = true;
								cells.forEach((cell, columnIndex) => {
									if (columnIndex < noOfColumns && cell) {
										isNull = false;
									}
								});
								if (!isNull) {
									cells.forEach((cell, columnIndex) => {
										if (columnIndex < noOfColumns) {
											if (!cell || isNaN(cell)) cell = "abc";
											console.log(cell);
											add_cell_to_sheet(worksheet, XLSX.utils.encode_cell({ c: columnIndex, r: rowIndex + startingRowNo }), cell);
										}
									});
								}
							});
							parser.on('end', () => {
								XLSX.write(workbook);
								console.log('file end');
							});
							parser.parse();
						})
					});
				}
			});
		});

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
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

// app.on('activate', function () {
//     // On OS X it's common to re-create a window in the app when the
//     // dock icon is clicked and there are no other windows open.
//     if (mainWindow === null) {
//         createWindow()
//     }
// });

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.