/**
 * A formik form with the following fields:
 * 1. Model Name - Select field with model names as options.
 * 2. Prompt - Text Area field.
 */
import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {
    Grid,
    Button,
    Select,
    TextField,
    MenuItem,
    FormControl,
    InputLabel,
    FormHelperText,
} from '@material-ui/core';

const options = [
    { value: 'gpt2', label: 'GPT-2' },
    { value: 'gpt2-medium', label: 'GPT-2 Medium' },
    { value: 'gpt2-large', label: 'GPT-2 Large' },
];

const PlaygroundForm = () => {
    return (
        <Formik
            initialValues={{
                modelName: '',
                prompt: '',
            }}
            validationSchema={Yup.object({
                modelName: Yup.string().required('Required'),
                prompt: Yup.string().required('Required'),
            })}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    setSubmitting(false);
                    alert(JSON.stringify(values, null, 2));
                }, 400);
            }
        }
        >
            {({ values, handleChange, handleBlur, handleSubmit, isSubmitting, errors }) => (
                <Form>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <FormControl variant="outlined" fullWidth>
                                <InputLabel id="select-label">Model Name</InputLabel>
                                <Field
                                    as={Select}
                                    name="modelName"
                                    labelId="select-label"
                                    fullWidth
                                    value={values.selectField}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(errors.modelName)}
                                >
                                    {options.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </Field>
                                {errors.modelName && <FormHelperText error>{errors.modelName}</FormHelperText>}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <Field
                                as={TextField}
                                name="prompt"
                                label="Prompt"
                                multiline
                                rows={4}
                                variant="outlined"
                                fullWidth
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={Boolean(errors.prompt)}
                            />
                            {errors.prompt && <FormHelperText error>{errors.prompt}</FormHelperText>}
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={isSubmitting}
                            >
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </Form>
            )}
        </Formik>
    );
                
};

export default PlaygroundForm;