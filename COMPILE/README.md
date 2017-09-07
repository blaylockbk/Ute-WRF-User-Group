# Latest compile settings: _Sept-07-2017_
### This should be in your `custom.csh` file

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
        module load intel
        module load python/2.7.11

        module load pgi/16.9
        module load mpich/3.2.p
        module load ncarg/6.1.2
        module load hdf5/1.8.17
        module load netcdf-c/4.4.1
        module load netcdf-f/4.4.4.p
        setenv NETCDF $NETCDFF

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
        module load intel
        module load python/2.7.11

        module load pgi/16.9
        module load mpich/3.2.p
        module load ncarg/6.1.2
        module load hdf5/1.8.17
        module load netcdf-c/4.4.1
        module load netcdf-f/4.4.4.p
        setenv NETCDF $NETCDFF
        
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
