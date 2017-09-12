# Compile WRF the Successfull Way
**Updated:** September 12, 2017  
**Authors:** Leah Campbell, Derek Mallia, Brian Blaylock  
**Computer:** kingspeak.chpc.utah.edu  
**WRF Versions:** 3.9.1.1  
**WPS Versions:** 3.9.1

## Load necessary modules and set up the environment

First log into `kingspeak.chpc.utah.edu`

Let's start by disregaring all the settings in your current `~/.custom.csh` file:
    
    module purge

Now we'll load the modules we need for WRF and WPS
    
    module load perl
    module load pgi/16.9
    module load mpich/3.2.p
    module load ncarg/6.1.2
    module load hdf5/1.8.17
    module load netcdf-c/4.4.1
    module load netcdf-f/4.4.4.p

Set environment variables for tcsh:

    setenv NETCDF $NETCDFF
    setenv WRF_EM_CORE 1
    setenv WRFIO_NCD_LARGE_FILE_SUPPORT 1
    
    # JASPER Library required for grib2 processing in WPS
    setenv JASPERLIB /uufs/chpc.utah.edu/sys/installdir/jasper/1.900.1-atmos07102015/lib
    setenv JASPERINC  /uufs/chpc.utah.edu/sys/installdir/jasper/1.900.1-atmos07102015/include

or for bash:

    export NETCDF=$NETCDFF
    export WRF_EM_CORE=1
    export WRFIO_NCD_LARGE_FILE_SUPPORT=1

    # If you are using grib2 in WPS you need to set JASPER


You must configure and compile **WRF** before you can compile **WPS** because metgrid and geogrid depend on a netcdf library created by WRF (or something like that).

## Configure WRF
Change your directory to where your WRF source code is located and enter the `WRFV3` directory.  

It's always smart to `./clean -a` if you have previously attempted to compile.

- Type `./configure`
- Select option **4** for the PGI compiler dm+sm. You may also try a different option in that group:
    1. `serial` will run the job on a single processor
    1. `smpar` uses shared memory (OpenMPI), utilizes multiprocessing
    1. `dmpar` uses distributed memory (MPI), utilizes multiprocessing
    1. `dm+sm` uses distributed memory and shared memory, unitlizes multiprocessing
- Select option **1** for basic nesting

You should get a message that says `Configuration successful!` followed by a list of settings used, which are in the newly created `configure.wrf` file.

## Compile WRF
Compile WRF for a real case, and write out to a log:

     ./compile em_real >& compile.log

_Note: Compiling WRF takes 30 minutes or longer_

Check that WRF compiled successfully.

    tail compile.log

If WRF compiled successfully, you should see four new excecutables in the `main/` directory:
- `main/ndown.exe`
- `main/real.exe`
- `main/tc.exe`
- `main/wrf.exe`

## Configure WPS
Navigate back to the `WPS` directory. Again, do a `./clean -a` if you have previously attempted to compile WPS.

Usually, you would run `./configure`, select option **7** for PGI with dmpar, and then `./compile >& compile.log`. But this won't compile the metgrid and geogrid executables (not sure why, has to do with the netcdf library??).

Instead, use a configure file created by Martin on March 9, 2017.

Download the `configure.wps` file from this Github page or copy the file (from the path below) and put into the `WPS` directory you are in.

    cp /uufs/chpc.utah.edu/common/home/u0553130/public_html/Ute_WRF/COMPILE/configure.wps .

Now that you have a configure.wps file, you _don't_ need to run `./configure`.


## Compile WPS
Type `./compile >& compile.log` to compile WPS and write the output to a log file. This shouldn't take longer than two or three minutes, but if it only takes a few seconds then it probably didn't work.

Compiling should create three new executable files:
1. `metgrid.exe`
2. `geogrid.exe`
3. `ungrib.exe`


______
If you get all that, **Congratulations**!! Now you can begin doing your WRF work.    
-Sincerely, the [Unviersity of Utah WRF User Group](http://home.chpc.utah.edu/~u0553130/Ute_WRF/)

P.S. Brian tested that these instructions successfully compile WRF and WPS, but he didn't run any of the executables. Please let him know if you are successful running all the executables after following these instructions.
