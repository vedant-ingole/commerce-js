import React from 'react';
import { TextField, Grid, Select, MenuItem } from '@material-ui/core';
import { useFormContext, Controller } from 'react-hook-form';

const FormInput = ({ name, label, required }) => {

    const { control } = useFormContext();

    return (
       <Grid item xs={12} sm={6}>
           <Controller 

                control={ control }
                name={name}

                render = {({ field})=> (
                    <TextField
                        fullWidth
                        label={label}
                        required
                    />
                )}
               
                // fullwidth
                // label={label}
                // required={required}
            />

       </Grid>
    )
}

export default FormInput;
