const XLSX = require('xlsx');

module.exports = {
  add_cell_to_sheet: (worksheet, address, value) => {
	/* cell object */
    const cell = {t:'?', v:value};

    /* assign type */
    if(typeof value == "string") cell.t = 's'; // string
    else if(typeof value == "number") cell.t = 'n'; // number
    else if(value === true || value === false) cell.t = 'b'; // boolean
    else if(value instanceof Date) cell.t = 'd';
    else if(value === null) cell.t = 'z';
    else throw new Error("cannot store value");

    /* add to worksheet, overwriting a cell if it exists */
    worksheet[address] = cell;

    /* find the cell range */
    const range = XLSX.utils.decode_range(worksheet['!ref']);
    const addr = XLSX.utils.decode_cell(address);

    /* extend the range to include the new cell */
    if(range.s.c > addr.c) range.s.c = addr.c;
    if(range.s.r > addr.r) range.s.r = addr.r;
    if(range.e.c < addr.c) range.e.c = addr.c;
    if(range.e.r < addr.r) range.e.r = addr.r;

    /* update range */
    worksheet['!ref'] = XLSX.utils.encode_range(range);
  }
}