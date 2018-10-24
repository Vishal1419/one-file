import React, { Component } from 'react';
import isElectron from 'is-electron';
import XLSX from 'xlsx';

let ipcRenderer;
if (isElectron()) {
	ipcRenderer = window.require('electron').ipcRenderer;	
}

class App extends Component {
  componentDidMount() {
    if (isElectron()) {
      ipcRenderer.send('get-master-workbook');
      ipcRenderer.on('got-master-workbook', (event, workbook) => {
        console.log(workbook.Sheets['Help Instruction']);
        const helpInstructions = workbook.Sheets['Help Instruction'];
        const newWorkbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(newWorkbook, helpInstructions, 'Help Instruction');
        ipcRenderer.send('save-new-workbook', newWorkbook);
        ipcRenderer.on('saved-new-workbook', () => {
          console.log('created new file');
        })
      })
    }
  }

  render() {
    return (
      <div className="App">
        Hello
      </div>
    );
  }
}

export default App;
