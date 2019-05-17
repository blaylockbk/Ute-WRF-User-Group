# Add Continous Tracer Plumes
Version: WRF 3.7

Additional Details: http://home.chpc.utah.edu/~u0553130/Brian_Blaylock/tracer.html

Files to Modify:
- `Registry.EM`
- `module_initliaze_real.F`
- `solve_em.F`

In the `namelist.input` file, you need to toggle the tracer function on in the `&dynamics` section. The follwoing sets the tracer option to "2" for the first and second domain.

    &dynamics 
    tracer_opt = 2, 2
