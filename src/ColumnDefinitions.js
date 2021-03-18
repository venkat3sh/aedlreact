import ProficiencyCustomCell from './ProficiencyCustomCell.js';

// ag-Grid builds columns based on the column definitions returned here
export default class ColumnDefinitionFactory {

    createColDefs() {
        return [
            // first column has the checkboxes
            { headerName: '#', width: 30, checkboxSelection: true,
                suppressSorting: true, suppressMenu: true, pinned: true },

            // the first three columns are grouped in a group called 'Employee'
            {
                headerName: 'Employee',
                field: "name", 
                width: 150
            },

            

            // then the last group with three columns
            {
                headerName: 'Mobile',
                field: "mobile", 
                width: 150
            }
        ];
    }
}

// this is a simple cell renderer, putting together static html, no
// need to use React for it.
function countryCellRenderer(params) {
    const COUNTRY_CODES = {
        Ireland: "ie",
        Spain: "es",
        "United Kingdom": "gb",
        France: "fr",
        Germany: "de",
        Sweden: "se",
        Italy: "it",
        Greece: "gr",
        Iceland: "is",
        Portugal: "pt",
        Malta: "mt",
        Norway: "no",
        Brazil: "br",
        Argentina: "ar",
        Colombia: "co",
        Peru: "pe",
        Venezuela: "ve",
        Uruguay: "uy"
    };

    if (params.value) {
        const flag = "<img border='0' width='15' height='10' " +
            "style='margin-bottom: 2px' src='http://flags.fmcdn.net/data/flags/mini/"
            + COUNTRY_CODES[params.value] + ".png'>";
        return flag + " " + params.value;
    } else {
        return null;
    }
}

// utility function to format date
function formatDate(value) {
    return pad(value.getDate(), 2) + '/' +
        pad(value.getMonth() + 1, 2) + '/' +
        value.getFullYear();
}

// utility function used to pad the date formatting.
function pad(num, totalStringSize) {
    let asString = num + "";
    while (asString.length < totalStringSize) asString = "0" + asString;
    return asString;
}
