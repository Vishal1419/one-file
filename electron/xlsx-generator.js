const path = require('path');
const Parser = require('node-dbf').default;
const XLSX = require('xlsx-populate');

const xlsxGenerator = (fileNames, reportName, additionalColumns = [], startingRowNo = 5) => {
  console.log('child process forked');
  console.log('parameters: ', fileNames, reportName, additionalColumns, startingRowNo);
  process.send({ text: 'Reading data from template', type: 'message' });
  // read the template file
  XLSX.fromFileAsync(
    process.env.NODE_ENV && process.env.NODE_ENV.toLowerCase() === 'production'
      ? path.join(__dirname, `../../sample-files/${reportName}.xlsx`)
      : path.join(__dirname, `sample-files/${reportName}.xlsx`)
  ).then((workbook) => {
    process.send({ text: 'Reading data from munim files', type: 'message' });
    let count = 0;
    // loop through all the files
    fileNames.forEach(fileName => {
      // start parsing dbf file
      const parser = new Parser(fileName, { encoding: 'utf-8' });
      let worksheet = null;
      let noOfColumns = 0;
      let rowIndex = 0;
      parser.on('start', () => {
        // reset row no. as new sheet is being written
        process.send({ text: `Reading data from ${fileName}`, type: 'message' });
        rowIndex = 0;
        // select the sheet to work on
        worksheet = workbook.sheet(path.parse(fileName).name.toLowerCase());
        if (worksheet) {
          // get total columns in the worksheet
          noOfColumns = (worksheet.row(3) && worksheet.row(3)._node
          && worksheet.row(3)._node.children && worksheet.row(3)._node.children.length
          && worksheet.row(3)._node.children.length - 1) || 0;
        }
      });
      parser.on('record', (record) => {
        if (worksheet) {
          let cells = [...additionalColumns, ...Object.values(record)];
          cells.shift();
          cells.shift();
          let isNull = true;
          cells.forEach((cell, columnIndex) => {
            if ((columnIndex + 1) < noOfColumns && cell) {
              isNull = false;
            }
          });
          if (!isNull) {
            rowIndex = rowIndex + 1;
            cells.forEach((cell, columnIndex) => {
              if ((columnIndex + 1) < noOfColumns) {
                if (!cell || cell === "NaN") cell = "";
                worksheet.row(rowIndex + startingRowNo - 1).cell(columnIndex + 1).value(cell);
              }
            });
          }
        }
      });
      parser.on('end', () => {
        count = count + 1;
        if (count === fileNames.length) {
          process.send({ text: 'Finishing it up', type: 'message' });
          workbook.toFileAsync(`D:/${reportName}.xlsx`).then(() => {
            process.send({ text: `Successfully created file at D:/${reportName}.xlsx. Click this message to see the file`, type: 'success', filePath: `D:\\${reportName}.xlsx` });
          }).catch((error) => {
            console.log(err.message);
            process.send({ text: `Error writing file. Please make sure that D:/${reportName}.xlsx is closed`, type:'error' });
          });
        }
      });
      parser.parse(); 
    });
  }).catch((err) => {
    console.log(err.message);
    process.send({ text: 'Error reading template', type: 'error' });
  });
}

xlsxGenerator(JSON.parse(process.argv[2]), process.argv[3], JSON.parse(process.argv[4]), JSON.parse(process.argv[5]));
// console.log(process.argv[2], JSON.parse(process.argv[3]), process.argv[4]);
