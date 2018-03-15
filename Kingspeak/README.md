<img src='../images/kingspeak.jpg'>

# Submitting WRF Jobs to Kingspeak
Author: brian.blaylock@utah.edu

- [Kingspeak User Guide](https://www.chpc.utah.edu/documentation/guides/)
- [SLURM](https://www.chpc.utah.edu/documentation/software/slurm.php)

## Getting Started
If you have a CHPC account, you have access to the general compute nodes--kingspeak, notchpeak, lonepeak, ember. This document focuses on submitting jobs to Kingspeak. **At this point, you should have already successfully configured and compiled WRF on Kingspeak.** We will submit `real.exe` and `wrf.exe` to the Kingspeak schedular.

> Note: As a curtesy, consider doing all your WPS work and namelist changes on your groups local (meso3, meteo19, atmosXX, etc.) so you aren't hogging resources on the Kingspeak head node.

ssh to Kingspeaks

    ssh u0xxxxx@kingspeak.chpc.utah.edu

Know where your WRF builds are. You will submit jobs from the WRF directory.

## SLURM
SLURM, which stands for Simple Linux Utility for Resource Management, is a job schedular for supercomputers. You will submit your job with a SLURM script and SLURM will place your job in a queue. When the compute nodes on Kingspeak become available, SLURM sends your job to the compute nodes.

Import parts of a SLURM script:

- Name your group so SLURM knows if you have allocation on the CHPC node. You may use a guest account.
- Set the number of CPUs you want your job to run with.
- Set the run time you expect your job will take (72 hours is the maximum runtime for general allocation).
- Set the path to the executable you want to run.
- Set the path for where you want output to go.

In order to see which accounts and partitions you can use do:

    sacctmgr -p show assoc user=<UNID>  

## Example SLURM Script: `real.exe`
    #! /bin/bash
    #SBATCH --time=48:00:00     #walltime for the WRF simulation, max is 72 on Kingspeak general nodes, 336 on private nodes
    #SBATCH --nodes=5           #Number of nodes I want to use, max is 15 for lin-group, each node has 16 cores
    #SBATCH --ntasks=80         #Number of MPI tasks, multiply number of nodes with cores per node. 5*16=80
    #SBATCH --account=lin-kp                     #Account name
    #SBATCH --partition=lin-kp                   #Partition name
    #SBATCH --mail-user=Derek.Mallia@utah.edu    #Email account
    #SBATCH --mail-type=FAIL,BEGIN,END           #When to email
    #SBATCH -o dvm_REAL.out                      #Error and output file names
    #SBATCH -e dvm_REAL.err
    cd /uufs/chpc.utah.edu/common/home/lin-group1/dvm/WRF_v34_kingspeak/WRFV3/test/em_real
    srun hostname | sort  > nodefile.$SLURM_JOBID
    mpiexec.hydra -n $SLURM_NTASKS -machinefile nodefile.$SLURM_JOBID  ./real.exe

## Example SLURM Script: `wrf.exe`
    #! /bin/bash
    #SBATCH --time=48:00:00       #walltime for the WRF simulation, max is 72 on Kingspeak general nodes, 336 on private nodes
    #SBATCH --nodes=5             #Number of nodes I want to use, max is 15 for lin-group, each node has 16 cores
    #SBATCH --ntasks=80           #Number of MPI tasks, multiply number of nodes with cores per node. 5*16=80
    #SBATCH --account=lin-kp                    #Account name
    #SBATCH --partition=lin-kp                  #Partition name
    #SBATCH --mail-user=Derek.Mallia@utah.edu   #Email account
    #SBATCH --mail-type=FAIL,BEGIN,END          #When to email
    #SBATCH -o dvm_WRF.out                      #Error and output file names
    #SBATCH -e dvm_WRF.err
    cd /uufs/chpc.utah.edu/common/home/lin-group1/dvm/WRF_v34_kingspeak/WRFV3/test/em_real
    srun hostname | sort  > nodefile.$SLURM_JOBID
    mpiexec.hydra -n $SLURM_NTASKS -machinefile nodefile.$SLURM_JOBID  ./wrf.exe

## While your job is in the queue...

List all jobs:

    squeue

List your jobs:

    squeue -u <UNID>

To get an estimated start time:

    scontrol show job=2534503

Replacing with your job id.

Your job could run earlier if jobs ahead of it do not run in their requested wall time or later if a job with higher priority comes along.

Small jobs and short jobs do have an advantage as they can often backfill on nodes that are being held for a larger job as it waits to gather up the nodes needs. A `squeue` lists the pending jobs by priority with the first jobs listed are the ones that should start next. That is, unless a job with a higher priority score comes along.

















