
#------------------------------------------------------------------------------------------
Compiling Workflow from March 7, 2017 (Kingspeak):
#------------------------------------------------------------------------------------------

1. Load modules and setenv commands

module load pgi/16.9
module load mpich/3.2.p
module load ncarg/6.1.2
module load hdf5/1.8.17
module load netcdf-c/4.4.1
module load netcdf-f/4.4.4.p
setenv NETCDF $NETCDFF
setenv WRF_EM_CORE 1
setenv WRFIO_NCD_LARGE_FILE_SUPPORT 1

for WPS:
see steenburgh-group2/leah/wrf/WPS/readme_setup_compile.txt

2. Run ./configure, choose option 4 (PGI DM/SM par) and then option 1
Then make changes to configure.wrf file so it matches Martin Cuma's, here:
/uufs/chpc.utah.edu/common/home/steenburgh-group2/leah/wrf/configure.wrf.martincuma_march3_2017

2. Alternatively, copy over /uufs/chpc.utah.edu/common/home/steenburgh-group2/leah/wrf/configure.wrf.march3_2017 to WRFV3.8.1/configure.wrf
or /uufs/chpc.utah.edu/common/home/u0101881/meteo/wrf/WRFV3.8.1-c7/configure.wrf.uni to configure.wrf

3. Modify external/io_netcdf/makefile so it matches Martin Cuma's, here:
/uufs/chpc.utah.edu/common/home/steenburgh-group2/leah/wrf/WRFV3.8.1/external/io_netcdf/makefile.martincuma_march4_2017 or
/uufs/chpc.utah.edu/common/home/u0101881/meteo/wrf/WRFV3.8.1-c7/external/io_netcdf/makefile
*** Be careful with indentation on the makefile this will make the compile crash ****

3. Alternatively, copy over /uufs/chpc.utah.edu/common/home/steenburgh-group2/leah/wrf/WRFV3.8.1/external/io_netcdf/makefile.martincuma_march4_2017 to makefile
or /uufs/chpc.utah.edu/common/home/u0101881/meteo/wrf/WRFV3.8.1-c7/external/io_netcdf/makefile to makefile

4. Run compile with new commands:
./compile em_real >& make.out
or:
./compile -j 1 em_real |& tee make.out ???



#------------------------------------------------------------------------------------------
# Results from "diff" command for configure.wrf and external/io_netcdf/makefile:
#------------------------------------------------------------------------------------------
[u0528254@kingspeak32 WRFV3 2]$ diff configure.wrf /uufs/chpc.utah.edu/common/home/u0101881/meteo/wrf/WRFV3.8.1-c7/configure.wrf.uni
115c115,116
< SCC             =       gcc
---
> #SCC             =       gcc
> SCC             =       pgcc  # MC change in order to do unified binary
125,126c126,127
< CFLAGS_LOCAL    =       -w -O3
< LDFLAGS_LOCAL   =       
---
> CFLAGS_LOCAL    =       -w -O3 -tp=nehalem,sandybridge,haswell -Minfo=unified,vect
> LDFLAGS_LOCAL   =       -tp=nehalem,sandybridge,haswell -Minfo=unified,vect
131,132c132,133
< FCNOOPT		=       -O0
< FCDEBUG         =       # -g $(FCNOOPT)  # -C -Ktrap=fp -traceback
---
> FCNOOPT		=       -O0  -tp=nehalem,sandybridge,haswell -Minfo=unified,vect 
> FCDEBUG         =       -tp=nehalem,sandybridge,haswell -Minfo=unified,vect # -g $(FCNOOPT)
196c197
<                       -I$(NETCDFPATH)/include \
---
>                       -I$(NETCDFF_INCDIR) \
212,213c213
<                       -L$(WRF_SRC_ROOT_DIR)/external/io_netcdf -lwrfio_nf -L/uufs/chpc.utah.edu/sys/installdir/netcdf-f/4.4.4-c7/lib -lnetcdff      -L/uufs/chpc.utah.edu/sys/installdir/hdf5/1.8.17-c7/lib -lhdf5_fortran -lhdf5 -lm -lz
< 
---
>                       -L$(WRF_SRC_ROOT_DIR)/external/io_netcdf -lwrfio_nf -Wl,-rpath=$(NETCDFC_LIBDIR)  -Wl,-rpath=$(NETCDFF_LIBDIR) -L$(NETCDFF_LIBDIR) -L$(NETCDFC_LIBDIR) -lnetcdff -lnetcdf -L$(HDF5_LIBDIR) -Wl,-rpath=$(HDF5_LIBDIR) -lhdf5 -lm -lz
219,220c219,220
< NETCDFPATH      =    /uufs/chpc.utah.edu/sys/installdir/netcdf-f/4.4.4-c7
< HDF5PATH        =    /uufs/chpc.utah.edu/sys/installdir/hdf5/1.8.17-c7
---
> NETCDFPATH      =    $(NETCDFF)
> HDF5PATH        =    $(HDF5)
222d221
< RTTOVPATH       =    

[u0528254@kingspeak32 io_netcdf]$ diff /uufs/chpc.utah.edu/common/home/u0101881/meteo/wrf/WRFV3.8.1-c7/external/io_netcdf/makefile makefile
7,8c7,8
< LIBS    = $(LIB_LOCAL) -L$(NETCDFC)/lib -lnetcdf
< LIBFFS  = $(LIB_LOCAL) -L$(NETCDFPATH)/lib -L$(NETCDFF_LIBDIR) -lnetcdff -lnetcdf $(NETCDF4_DEP_LIB)
---
> LIBS    = $(LIB_LOCAL) -L$(NETCDFPATH)/lib -lnetcdf
> LIBFFS  = $(LIB_LOCAL) -L$(NETCDFPATH)/lib -lnetcdff -lnetcdf $(NETCDF4_DEP_LIB)
54c54
<             $(FC) $(FFLAGS) $(LDFLAGS) -o diffwrf diffwrf.o $(OBJSL) ../../frame/wrf_debug.o ../../frame/module_wrf_error.o ../../frame/clog.o $(ESMF_IO_LIB_EXT) $(LIBFFS) -L$(NETCDFC_LIBDIR) ;\
---


#------------------------------------------------------------------------------------------
Notes from Martin Cuma, March 3 2017:
#------------------------------------------------------------------------------------------

McKenna, 

I have the WRF built. It's all in 
/uufs/chpc.utah.edu/common/home/u0101881/meteo/wrf/WRFV3.8.1-c7 

There are 2 main difference from the usual WRF build e.g. at NCAR 
1. Since NetCDF split its C and Fortran libraries to different packages, 
we install them to independent locations (their versions differ too). So, 
WRF needs to know where both the C and Fortran libs are, while the 
standard WRF configure is only aware of one NetCDF path 
2. I added PGI option to build "unified binary", which is a feature that 
lets you build optimized code for multiple CPU architectures. This should 
result in optimized code for all CHPC machines (ember, kingspeak, etc). 

So, with that, we need to do a few modifications to the configure.wrf and 
one makefile. Here's the instructions how to do the build: 
1. Load required modules 
ml pgi mpich ncarg hdf5 netcdf-c netcdf-f 
Currently Loaded Modules: 
   1) xalt/0.6 2) chpc/1.0 3) pgi/16.9 4) mpich/3.2.p 5) 
ncarg/6.1.2 6) hdf5/1.8.17 7) netcdf-c/4.4.1 8) netcdf-f/4.4.4.p 

2. Set NETCDF environment variable for the WRF configure to work: 
setenv NETCDF $NETCDFF 

3. Run ./configure, choose option 4 (PGI DM/SM par) 

4. After configure finishes, we need to make a few modifications to the 
configure.wrf and one makefile, to adjust NetCDF library paths, compiler 
flags 
(use unified binary to run on all CHPC machines optimally) and use pgcc 
instead of gcc for base C compilation (to produce the unified binary). 
That 
is: 

- modify configure.wrf like configure.wrf.uni in 
/uufs/chpc.utah.edu/common/home/u0101881/meteo/wrf/WRFV3.8.1-c7 
- modify external/io_netcdf/makefile like 

/uufs/chpc.utah.edu/common/home/u0101881/meteo/wrf/WRFV3.8.1-c7/external/io_netcdf/makefile 
- ./compile -j 8 em_real |& tee make.out 

I also made some changes to the SLURM script, so check that 
/uufs/chpc.utah.edu/common/home/u0101881/meteo/wrf/WRFV3.8.1-c7/test/em_real/wrf.slurm 

