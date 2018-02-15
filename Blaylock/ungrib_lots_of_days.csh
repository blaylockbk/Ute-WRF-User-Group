#!/bin/csh

# in order to make this work you'll have to edit the namlist.wps file

set year = '2015'
set s_month = '04'
set e_month = '04'

foreach i (23 24 25 26 27 28 29 30 01)
   # i is the current day, j is the next day
   @ j = $i + 1
   echo 'create a new namelist.wps'
   
# some funny logic to get the files and process metgrids for April 18 - May 01
   if ($i == 30) then
      set j = '01'
	  set e_month = '05'
   endif
   if ($i == 01) then
      set j = '02'
	  set s_month = '05'
	  set e_month = '05'
   endif
   
   echo ' start date '$i
   echo ' end date ' $j
   
   echo "&share" > namelist.wps
   echo " wrf_core = 'ARW'," >> namelist.wps
   echo " max_dom = 1," >> namelist.wps
   echo " start_date = '"$year"-"$s_month"-"$i"_00:00:00'," >> namelist.wps
   echo " end_date   = '"$year"-"$e_month"-"$i"_23:00:00'," >> namelist.wps
   echo " interval_seconds = 3600," >> namelist.wps
   echo " io_form_geogrid = 2," >> namelist.wps
   echo "/" >> namelist.wps
   echo "" >> namelist.wps
   echo "&geogrid" >> namelist.wps
   echo " parent_id         =   1," >> namelist.wps
   echo " parent_grid_ratio =   1," >> namelist.wps
   echo " i_parent_start    =   1," >> namelist.wps
   echo " j_parent_start    =   1," >> namelist.wps
   echo " e_we              = 350," >> namelist.wps
   echo " e_sn              = 350," >> namelist.wps
   echo " geog_data_res     = '10m'," >> namelist.wps
   echo " dx = 3000," >> namelist.wps
   echo " dy = 3000," >> namelist.wps
   echo " map_proj = 'lambert'," >> namelist.wps
   echo " ref_lat   =  40.25," >> namelist.wps
   echo " ref_lon   = -109.5," >> namelist.wps
   echo " truelat1  =  33.0," >> namelist.wps
   echo " truelat2  =  45.0," >> namelist.wps
   echo " stand_lon = -97.0," >> namelist.wps
   echo " geog_data_path = '/uufs/chpc.utah.edu/common/home/horel-group3/horel_data/WPS_GEOG/'" >> namelist.wps
   echo "/" >> namelist.wps
   echo "" >> namelist.wps
   echo "&ungrib" >> namelist.wps
   echo "out_format = 'WPS'," >> namelist.wps
   echo "prefix = 'FILE_testHRRR'," >> namelist.wps
   echo "/" >> namelist.wps
   echo "" >> namelist.wps
   echo "&metgrid" >> namelist.wps
   echo "fg_name = 'FILE_testHRRR'" >> namelist.wps
   echo "io_form_metgrid = 2," >> namelist.wps
   echo "/" >> namelist.wps

   echo 'copying the met data'
   rm -f GRIBFILE.*
   ./link_grib.csh /uufs/chpc.utah.edu/common/home/horel-group/archive/$year$s_month$i/models/hrrr/hrrr*prs*
   echo 'do ungrib for the day'
   ./ungrib.exe
   echo 'run metgrid for the day'
   mpirun -np 10 ./metgrid.exe
   echo 'removing the ungrib data (these are large files)'
   rm -f FILE_testHRRR*
   rm -f PFILE:*
   echo 'finished ' $year $s_month  $i
end

echo 'COMPLETED'
