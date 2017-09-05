// Grab current obs from MesoWest API (version 2)
// Brian Blaylock
// September 17, 2015
// Updated for camera display 19 January 2017

var r_time = 300000; // Refresh time 5 min
var api_token = '2562b729557f45f5958516081f06c9eb';
var stid = 'WBB,MTMET,NAA,FPS,FPN,GNI,EYSC,BFLAT,UUSYR';
setTimeout(poll, 500); // how often to update it

function CtoF(tempC){
	tempF = Math.round(tempC*9/5 + 32)
	return tempF
}

function short_name(data,stnidx){
  // Gets the name of the station and creates a short name
  // This is better than using the station ID becuase sometimes the 
  // station id's arn't very descriptive. 
        try{
        if (data.STATION[stnidx].NAME=='U of U William Browning Building'){
            s = 'WBB' 
        }
        else if (data.STATION[stnidx].NAME=='Flight Park North'){
            s = 'FPN' 
        }
        else if (data.STATION[stnidx].NAME=='Flight Park South'){
            s = 'FPS' 
        }
        else if (data.STATION[stnidx].NAME=='U of U Mountain Met Lab'){
            s = 'MTMET' 
        }
        else if (data.STATION[stnidx].NAME=='Neil Armstrong Academy'){
            s = 'NAA' 
        }
        else if (data.STATION[stnidx].NAME=='Gunnison Island'){
            s = 'GNI' 
        }
        else if (data.STATION[stnidx].NAME=='Eyring Science Center'){
            s = 'EYSC' 
        }
        else if (data.STATION[stnidx].NAME=='Bonneville Salt Flats'){
            s = 'BFLAT' 
        }
        else if (data.STATION[stnidx].NAME=='Syracuse'){
            s = 'UUSYR' 
        }
        else {
            s='error/unknown'}
            }
         catch(err){s='error/unknown'}
    return s
}

function poll(){
var api_path = 'http://api.mesowest.net/v2/stations/nearesttime?stid='+stid+'&within=30&vars=air_temp&obtimezone=local&token='+api_token;
//alert(api_path);
$.getJSON('http://api.mesowest.net/v2/stations/nearesttime?callback=?',
  {
  // specify the request parameters here
  stid:stid,
  within:120, //Grabs the latest obs in the last two hours. If there isn't one for a station then code breaks
  token:api_token,
  },
  function (data)
  {
            
	  //alert(Object.keys(data.STATION)); //Use this to view what options are available
	  //alert(data.STATION[8].NAME); //Used to find out which Station is in which index
      try{	
       airTemp_0 = short_name(data,0)+": " +CtoF(data.STATION[0].OBSERVATIONS.air_temp_value_1.value);}
	   catch(err){
	   airTemp_0 =short_name(data,0)+': '+'-na-';}
	  
      try{
       airTemp_1    = short_name(data,1)+": " +CtoF(data.STATION[1].OBSERVATIONS.air_temp_value_1.value);}
	   catch(err){
		airTemp_1 = short_name(data,1)+": " +'-na-';}
	   
       try{
	    airTemp_2   = short_name(data,2)+": " +CtoF(data.STATION[2].OBSERVATIONS.air_temp_value_1.value);}
        catch(err){
		airTemp_2 = short_name(data,2)+": " +'-na-';}
	   
       try{
	    airTemp_3   = short_name(data,3)+": " +CtoF(data.STATION[3].OBSERVATIONS.air_temp_value_1.value);}
	    catch(err){
		airTemp_3 = short_name(data,3)+": "  +'-na-';}
	   
       try{
	    airTemp_4   = short_name(data,4)+": " +CtoF(data.STATION[4].OBSERVATIONS.air_temp_value_1.value);}
	    catch(err){
		airTemp_4 = short_name(data,4)+": "  +'-na-';}
        
       try{
	    airTemp_5   = short_name(data,5)+": " +CtoF(data.STATION[5].OBSERVATIONS.air_temp_value_1.value);}
	    catch(err){
		airTemp_5 = short_name(data,5)+": "  +'-na-';}

        try{
	    airTemp_6   = short_name(data,6)+": " +CtoF(data.STATION[6].OBSERVATIONS.air_temp_value_1.value);}
	    catch(err){
		airTemp_6 = short_name(data,6)+": "  +'-na-';}

        try{
	    airTemp_7   = short_name(data,7)+": " +CtoF(data.STATION[7].OBSERVATIONS.air_temp_value_1.value);}
	    catch(err){
		airTemp_7 = short_name(data,7)+": "  +'-na-';}

        try{
	    airTemp_8   = short_name(data,8)+": " +CtoF(data.STATION[8].OBSERVATIONS.air_temp_value_1.value);}
	    catch(err){
		airTemp_8 = short_name(data,8)+": "  +'-na-';}
	
	
	  
//set up variable it will return to the HTML 
  
  $('#ret-tempWBB').html(airTemp_0 + "&deg");
  $('#ret-tempMTMET').html(airTemp_4 + "&deg");
  $('#ret-tempNAA').html(airTemp_5 + "&deg"); 
  $('#ret-tempFPN').html(airTemp_6 + "&deg");
  $('#ret-tempFPS').html(airTemp_2 + "&deg");
  $('#ret-tempGNI').html(airTemp_1 + "&deg");
  $('#ret-tempEYSC').html(airTemp_3 + "&deg");
  $('#ret-tempBFLAT').html(airTemp_7 + "&deg");
  $('#ret-tempSYR').html(airTemp_8 + "&deg");  

}); 
  setTimeout(poll, r_time); 

}  

// NOTHING FOLLOWS //