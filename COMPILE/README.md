# Current compile settings:  _September 13, 2017_
**Author: Brian Blaylock, Leah Campbell**  
**Computer: kingspeak.chpc.utah.edu**  
**WRF Version 3.9.1.1**  
**WPS Version 3.9.1**

### Load necessary modules and set up the environment
Use these settings in your `~/.custom.csh` file

    #!/bin/tcsh

    #ncview
    module load ncview

    #---------------------------------------------------------------
    # Do Ember specific initializations
    if ($UUFSCELL == "ember.arches") then
        echo ""
        echo "==============================="
        echo "Hi Brian. Welcome to Ember!"
        echo "==============================="
        echo ""
        module load python/2.7.11

        # WRF
        module load pgi/16.9
        module load mpich/3.2.p
        module load ncarg/6.1.2
        module load hdf5/1.8.17
        module load netcdf-c/4.4.1
        module load netcdf-f/4.4.4.p
        setenv NETCDF $NETCDFF
        setenv WRF_EM_CORE 1
        setenv WRFIO_NCD_LARGE_FILE_SUPPORT 1


        # JASPER Library required for grib2 processing in WPS
        setenv JASPERLIB /uufs/chpc.utah.edu/sys/installdir/jasper/1.900.1-atmos07102015/lib
        setenv JASPERINC  /uufs/chpc.utah.edu/sys/installdir/jasper/1.900.1-atmos07102015/include


    # Do Kingspeak specific initializations
    else if ($UUFSCELL == "kingspeak.peaks") then
        echo ""
        echo "==============================="
        echo "Hi Brian. Welcome to Kingspeak!"
        echo "==============================="
        echo ""
        module load python/2.7.11

        # WRF
        module load pgi/16.9
        module load mpich/3.2.p
        module load ncarg/6.1.2
        module load hdf5/1.8.17
        module load netcdf-c/4.4.1
        module load netcdf-f/4.4.4.p
        setenv NETCDF $NETCDFF
        setenv WRF_EM_CORE 1
        setenv WRFIO_NCD_LARGE_FILE_SUPPORT 1
        
        # JASPER Library required for grib2 processing in WPS
        setenv JASPERLIB /uufs/chpc.utah.edu/sys/installdir/jasper/1.900.1-atmos07102015/lib
        setenv JASPERINC  /uufs/chpc.utah.edu/sys/installdir/jasper/1.900.1-atmos07102015/include


    # Do Hiddenarches initializations
    # includes meso1, meso2, meso3, and meso4
    else if ($UUFSCELL == "hiddenarch.arches") then
        module load intel
        module load python/2.7.3 # because it hasn't been updated to CentOS 7


    # Do Lonepeak specific initializations
    # includes wx1, wx2, w3, wx4, meteo19
    else if ($UUFSCELL == "lonepeak.peaks") then
        module load intel
        module load python/2.7.11

    endif

If you edited your .configure file, you need to reload those settings. The easiest way is to log out and log back into the terminal.

Log into kingspeak.chpc.utah.edu and navigate to your WRF directory.

### WRF
You have to configure and compile WRF before you can compile WPS. (Is that true? Why is this true?)

First, Configure WRF:
- Enter the WRFV3 directory
- Type `./configure`
- Select option **3**: Use the PGI compiler with distributed memory (dmpar).
- Select optoin **1** for basic nesting

You should get a message that says: `Configuration successful!` followed by a list of settings used, which are in the `configure.wrf` file.

Second, Compile WRF for real cases:
- Type `./compile em_real >& compile.log`
    - This can take a half hour or longer
- Check the `compile.log` file for errors. If it was successful, then you should see new excecutables in the `main/` directory:
    - `main/ndown.exe`
    - `main/real.exe`
    - `main/wrf.exe`



### WPS
Choose Option **7**: `Linux x86_64, PGI compiler   (dmpar)`  
This means we use the PGI compiler (which we loaded) and dmpar is the distributed memory version of the code (runs faster)



