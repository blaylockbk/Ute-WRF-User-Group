// Brian Blaylock
// May 17, 2016

// JavaScript that will incrament a date input HTML tag

function pad(number, length) {
   // Pad the month and day with zeros
    var str = '' + number;
    while (str.length < length) {
        str = '0' + str;
    }
    return str;
  }

function next_day(){
    // Add a day to the current input
    //                    dec   jan   feb   mar   arp   may   jun   jul   aug   set   oct   nov   dec   jan
    var days_per_month = ["31", "31", "28", "31", "30", "31", "30", "31", "31", "30", "31", "30", "31", "31"];
    
    year = parseInt(document.getElementById('dateinput').value.slice(0,4));
    month = parseInt(document.getElementById('dateinput').value.slice(5,7));
    day = parseInt(document.getElementById('dateinput').value.slice(8,10));
        
    if (day < parseInt(days_per_month[month])){
       day = day+1; 
       day = pad(day,2);
       month = pad(month,2);
        }
    else{
        day = '01';
         if (month==12){
            month = '01';
            year = year +1
            year = pad(year,4)
         }
         else{
            month = month + 1;
            month = pad(month,2);     
         }
        
    }
    
    document.getElementById('dateinput').value = year+'-'+month+'-'+day
}

function previous_day(){
    // Subtract a day from the current input
    //                    dec   jan   feb   mar   arp   may   jun   jul   aug   set   oct   nov   dec
    var days_per_month = ["31", "31", "28", "31", "30", "31", "30", "31", "31", "30", "31", "30", "31"];
    
    year = parseInt(document.getElementById('dateinput').value.slice(0,4));
    month = parseInt(document.getElementById('dateinput').value.slice(5,7));
    day = parseInt(document.getElementById('dateinput').value.slice(8,10));
    
    if (day == 1){
       day = days_per_month[month-1];
        if (month==1){
            month = '12';
            year = year -1
            year = pad(year,4)
        }
        else{
          month = month-1;
           month = pad(month,2);     
        }
       
    }
    else{
        day = day-1;
        day = pad(day,2);
        month = pad(month,2);
    }
    
    document.getElementById('dateinput').value = year+'-'+month+'-'+day;

}
