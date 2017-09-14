# WRF 3.4 Compiling Workflow  
**Updated:** Sept. 13, 2017  
**Author:** Derek Mallia  
**Computer:** Kingspeak  
**WRF Version:** 3.4  

## WRF SECTION OF INSTRUCTIONS

#### Step 1
First load the following modules by typing the  following command in your terminal session:

    ml pgi mpich ncarg hdf5 netcdf-c netcdf-f

#### Step 2
If you have not loaded perl, also do the following (I unload it in my custom.sh
due to incompatibilities with other programs unrelated to WRF)

    module load perl

#### Step 3
Set the following environment variables depending on the shell that you are using
(setenv = .tcsh, export = bash / .sh)

for tsch:

    setenv NETCDF $NETCDFF
    setenv WRF_EM_CORE 1
    setenv WRFIO_NCD_LARGE_FILE_SUPPORT 1

or for bash:

    export NETCDF=$NETCDFF
    export WRF_EM_CORE=1
    export WRFIO_NCD_LARGE_FILE_SUPPORT=1

#### Step 4
If a previous compilation has failed, or there are already executable from an older build, clean the previous build:

    ./clean -a

Next, run the configure script with the following command:

    ./configure

Select option **4** for Linux x86_64, PGI compiler with gcc (dm+sm) with basic nesting (option 1).

#### Step 5
Significant changes were needed for the several WRF makefiles along with the configure.wrf file.

These changes include separating the netcdf F and C libraries, as CHPC has installed these separately. In addition, Martin needed to remove the -C from the $(CPP) lines. To save you some time, can get WRF Makefiles and configure.wrf file from the following path:

    /uufs/chpc.utah.edu/common/home/lin-group1/dvm/WRF_v34_kingspeak_NLCD_GRIB2_centos7/martin_instructions

This includes

`./external/esmf_time_f90/Makefile   -> Makefile_esmf_time`  
`./external/io_netcdf/makefile -> makefile_netcdf`  
`configure.wrf  -> configure.wrf` 

#### Step 6
Once you have copied over the appropriate makefiles and wrf.configure script, you are read to compile WRF!
Enter the following command into your command line within ./WRFV3 directory:

    ./compile em_real >& make.out

If the script successfully completes, you should have the `real.exe`, `wrf.exe`, and `ndown.exe` executables sitting in your
`./WRFV3/test/em_real` directory. If not, your compilation went bad.



## WPS SECTION OF INSTRUCTIONS
#### Step 7
Next, we need to install WPS. First, we need to set the following environment variables:

For .tcsh shell:

    setenv JASPERLIB /uufs/chpc.utah.edu/sys/installdir/jasper/1.900.1-atmos07102015/lib
    setenv JASPERINC /uufs/chpc.utah.edu/sys/installdir/jasper/1.900.1-atmos07102015/include
    setenv NETCDF $NETCDFF

or for .sh (bash) shell:

    export JASPERLIB=/uufs/chpc.utah.edu/sys/installdir/jasper/1.900.1-atmos07102015/lib
    export JASPERINC=/uufs/chpc.utah.edu/sys/installdir/jasper/1.900.1-atmos07102015/include
    export NETCDF=$NETCDFF

**_The above environment variables are needed for GRIB2 support!!!_**

#### Step 8
Optional step, if you need to remove an older WPS build, type `./clean -a` in your command line to remove the old build of WPS.

#### Step 9
Run `./configure` within the  your ./WPS directory

Select option **7** for Linux x86_64, PGI compiler, SGI MPT (dmpar)

Next, copy `configure.wps` from the following directory:

    /uufs/chpc.utah.edu/common/home/lin-group1/dvm/WRF_v34_kingspeak_NLCD_GRIB2_centos7/martin_instructions


**NOTE:** Within configure.wps, make sure `WRF_DIR = ../WRFV3` or the name of the path where your already compiled WRF code sits.

#### Step 10
After you have copied your configure.wps file over, compile WPS:

    ./compile


If you WPS code has been successfully compiled, you should see the `geogrid.exe`, `ungrib.exe` and `metgrid.exe` executables setting in your WPS directory. If not, something went wrong!