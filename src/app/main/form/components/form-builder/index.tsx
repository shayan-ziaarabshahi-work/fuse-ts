import FormTextField from 'app/shared-components/form-fields/FormTextField'
import { useForm } from 'react-hook-form';
import FormSelectBox from 'app/shared-components/form-fields/FormSelectBox';
import FormDatePicker from 'app/shared-components/form-fields/FormDatePicker';
import FormCkeckbox from 'app/shared-components/form-fields/FormCkeckbox';
import { Grid, Box } from '@mui/material';


export interface FormFieldInterface {
    selectbox: string | null;
    datepicker: Date | null;
    numeric: number;
    checkbox: boolean;
    textfield: string;
    image: File | null;
}

function FormBuilder({ fieldsSchema, onSubmit, buttonText }: any) {

    const { control, handleSubmit } = useForm<FormFieldInterface>({
        defaultValues: {

        },
    });

    return (
        <Box sx={(theme: any) => ({ backgroundColor: theme.palette.common.white })} className='px-20 rounded-lg'>
            <Grid container spacing={2} className="my-10">
                {
                    fieldsSchema.map((field: any, index: any) => {
                        switch (field.type) {
                            case 'text':
                                return (
                                    <Grid key={index} item xs={field.grid.xs}>
                                        <FormTextField name={field.name} label={field.label} control={control} size="small" />
                                    </Grid>
                                )
                            case 'dropdown':
                                return (
                                    <Grid key={index} item xs={field.grid.xs}>
                                        <FormSelectBox name={field.name} label={field.label} control={control} options={field.options} size="small" />
                                    </Grid>
                                )
                            case 'calendar':
                                return (
                                    <Grid key={index} item xs={field.grid.xs}>
                                        <FormDatePicker name={field.name} label={field.label} control={control} size="small" />
                                    </Grid>
                                )
                            case 'checkbox':
                                return (
                                    <Grid key={index} item xs={field.grid.xs}>
                                        <FormCkeckbox name={field.name} label={field.label} control={control} size="small" />
                                    </Grid>
                                )
                            default:
                            // code block
                        }

                    })
                }
            </Grid>
        </Box>
    )
}

export default FormBuilder