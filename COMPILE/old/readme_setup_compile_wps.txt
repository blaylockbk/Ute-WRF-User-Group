* Note that you need to download the new GEOG files for geogrid.exe to work.

module load pgi
module load mpich
module load ncarg
module load netcdf-c
module load netcdf-f
setenv NETCDF $NETCDFF
setenv JASPERLIB /uufs/chpc.utah.edu/sys/installdir/jasper/1.900.1-atmos07102015/lib
setenv JASPERINC /uufs/chpc.utah.edu/sys/installdir/jasper/1.900.1-atmos07102015/include

[u0528254@kingspeak32 WPS]$ ./configure
Will use NETCDF in dir: /uufs/chpc.utah.edu/sys/installdir/netcdf-f/4.4.4p-c7
Found Jasper environment variables for GRIB2 support...
  $JASPERLIB = /uufs/chpc.utah.edu/sys/installdir/jasper/1.900.1-atmos07102015/include
  $JASPERINC = /uufs/chpc.utah.edu/sys/installdir/jasper/1.900.1-atmos07102015/include
------------------------------------------------------------------------
Please select from among the following supported platforms.

   1.  Linux x86_64, gfortran    (serial)
   2.  Linux x86_64, gfortran    (serial_NO_GRIB2)
   3.  Linux x86_64, gfortran    (dmpar)
   4.  Linux x86_64, gfortran    (dmpar_NO_GRIB2)
   5.  Linux x86_64, PGI compiler   (serial)
   6.  Linux x86_64, PGI compiler   (serial_NO_GRIB2)
   7.  Linux x86_64, PGI compiler   (dmpar)
   8.  Linux x86_64, PGI compiler   (dmpar_NO_GRIB2)
   9.  Linux x86_64, PGI compiler, SGI MPT   (serial)
  10.  Linux x86_64, PGI compiler, SGI MPT   (serial_NO_GRIB2)
  11.  Linux x86_64, PGI compiler, SGI MPT   (dmpar)
  12.  Linux x86_64, PGI compiler, SGI MPT   (dmpar_NO_GRIB2)
  13.  Linux x86_64, IA64 and Opteron    (serial)
  14.  Linux x86_64, IA64 and Opteron    (serial_NO_GRIB2)
  15.  Linux x86_64, IA64 and Opteron    (dmpar)
  16.  Linux x86_64, IA64 and Opteron    (dmpar_NO_GRIB2)
  17.  Linux x86_64, Intel compiler    (serial)
  18.  Linux x86_64, Intel compiler    (serial_NO_GRIB2)
  19.  Linux x86_64, Intel compiler    (dmpar)
  20.  Linux x86_64, Intel compiler    (dmpar_NO_GRIB2)
  21.  Linux x86_64, Intel compiler, SGI MPT    (serial)
  22.  Linux x86_64, Intel compiler, SGI MPT    (serial_NO_GRIB2)
  23.  Linux x86_64, Intel compiler, SGI MPT    (dmpar)
  24.  Linux x86_64, Intel compiler, SGI MPT    (dmpar_NO_GRIB2)
  25.  Linux x86_64, Intel compiler, IBM POE    (serial)
  26.  Linux x86_64, Intel compiler, IBM POE    (serial_NO_GRIB2)
  27.  Linux x86_64, Intel compiler, IBM POE    (dmpar)
  28.  Linux x86_64, Intel compiler, IBM POE    (dmpar_NO_GRIB2)
  29.  Linux x86_64 g95 compiler     (serial)
  30.  Linux x86_64 g95 compiler     (serial_NO_GRIB2)
  31.  Linux x86_64 g95 compiler     (dmpar)
  32.  Linux x86_64 g95 compiler     (dmpar_NO_GRIB2)
  33.  Cray XE/XC CLE/Linux x86_64, Cray compiler   (serial)
  34.  Cray XE/XC CLE/Linux x86_64, Cray compiler   (serial_NO_GRIB2)
  35.  Cray XE/XC CLE/Linux x86_64, Cray compiler   (dmpar)
  36.  Cray XE/XC CLE/Linux x86_64, Cray compiler   (dmpar_NO_GRIB2)
  37.  Cray XC CLE/Linux x86_64, Intel compiler   (serial)
  38.  Cray XC CLE/Linux x86_64, Intel compiler   (serial_NO_GRIB2)
  39.  Cray XC CLE/Linux x86_64, Intel compiler   (dmpar)
  40.  Cray XC CLE/Linux x86_64, Intel compiler   (dmpar_NO_GRIB2)

Enter selection [1-40] : 7
------------------------------------------------------------------------
Configuration successful. To build the WPS, type: compile
------------------------------------------------------------------------

Now modify configure.wps to be like /uufs/chpc.utah.edu/common/home/u0101881/meteo/wrf/WPS/configure.wps.chpc
(or just copy over from the path above or from WPS/configure.wps.martincuma_march9_2017)

In particular:
 - right path to WRF
 - paths to both NetCDF C and NetCDF Fortran libraries, incl -Wl,-rpath
 - replace the full Jasper paths with JASPERLIB, JASPERINC
 - replace NCARG_LIBS2 with the path to the correct PGI version
 - add PGI unified binary compile/link flags

Then compile the code:
./compile
