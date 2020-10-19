var table;

function appendDropdown(){
let dzialy = table.columns( 2 ).data().eq( 0 ).unique();
var dzial = $('#dzial');


$.each(dzialy, function (index, value) {
	dzial.append($('<option/>', { 
      value: value,
      text : value 
   }));
});    
}

function addRow() {
    const counter = "wpisz ";
 
    $('#addRow').on('click', function () {
        table.row.add( [
            counter +'imię',
            counter +'nazwisko',
            counter +'dział',
            counter +'wynagrodzenie',
        ] ).draw( false );
    } );
}

$(document).ready(function () {
    table = $('#tabela').DataTable({
        "dom": 't',   
        "paging":   false,
        "info":     false,
        "footerCallback": function ( row, data, start, end, display ) {
            var api = this.api(), data;
 
         
            var intVal = function ( i ) {
                console.log(i);
                console.log(parseFloat( i ));
        return parseFloat( i ); 
            };
 
          
            total = api
                .column( 3 )
                .data()
                .reduce( function (a, b) {
                    return intVal(a) + intVal(b);
                });
 
            $( api.column( 3 ).footer() ).html(total);
          } 
      
    });





    oTable = $('#tabela').DataTable();   
    $('#myInputTextField').keyup(function(){
          oTable.search($(this).val()).draw() ;
    })






    table.MakeCellsEditable({
        "onUpdate": myCallbackFunction
    });
    addRow();
    appendDropdown();
    registerMinMax();
    registerDropdown();
});

function registerMinMax(){
    $('#min, #max').keyup( function() {
        table.draw();
    } );
}


function registerDropdown(){
    let dzial = $('#dzial');
    dzial.on('change', function () {
        let search = dzial.val()
      
            table
                .column(2)
                .search(dzial.val())
                .draw();
    } );

} 

function myCallbackFunction(updatedCell, updatedRow, oldValue) {
    console.log("The new value for the cell is: " + updatedCell.data());
    console.log("The old value for that cell was: " + oldValue);
    console.log("The values for each cell in that row are: " + updatedRow.data());
}


$.fn.dataTable.ext.search.push(
    function( settings, data, dataIndex ) {
        var min = parseInt( $('#min').val(), 10 );
        var max = parseInt( $('#max').val(), 10 );
        var kwota = parseFloat( data[3] ) || 0; 
 
        if ( ( isNaN( min ) && isNaN( max ) ) ||
             ( isNaN( min ) && kwota <= max ) ||
             ( min <= kwota   && isNaN( max ) ) ||
             ( min <= kwota   && kwota <= max ) )
        {
            return true;
        }
        return false;
    }
);





