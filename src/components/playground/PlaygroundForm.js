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
    Select,
    TextField,
    MenuItem,
    FormControl,
    InputLabel,
    FormHelperText,
} from '@material-ui/core';
import LoadingButton from '../LoadingButton';
import { get, omit } from 'lodash';
import { completions as fineTunedModelCompletions } from '../../slices/fineTunedModels';
import { useSelector, useDispatch } from '../../store';
import { reducerStatus } from '../../constants/reducer';
import CompletionResultModal from './CompletionResultModal';
import toast from 'react-hot-toast';


const PlaygroundForm = () => {
    const dispatch = useDispatch();
    const {
        results: { allIds, byId },
        status,
    } = useSelector((state) => state.fineTunedModels);
    const [createModalOpen, setCreateModalOpen] = React.useState(false);
    const [completionResult, setCompletionResult] = React.useState('');
    return (
        <>
            <Formik
                initialValues={{
                    modelId: '',
                    prompt: '',
                }}
                validationSchema={Yup.object({
                    modelId: Yup.string().required('Required'),
                    prompt: Yup.string().required('Required'),
                })}
                onSubmit={async (data, { setSubmitting }) => {
                    const modelId = get(data, 'modelId', '');

                    // omit modelId from data as it is not required by the API.
                    data = omit(data, 'modelId');
                    const result = await dispatch(fineTunedModelCompletions({data, modelId}));
                    if (!get(result, 'payload.result', false)) {
                        toast.error('Something went wrong. The model may be overloaded. Please try again later.');
                        setCompletionResult({});
                    } else {
                        setCompletionResult(get(result, 'payload.result', {}));
                        setCreateModalOpen(true);
                    }
                    setSubmitting(false);
                    
                }
            }
            >
                {({ values, handleChange, handleBlur, handleSubmit, isSubmitting, errors }) => (
                    <Form>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <FormControl variant="outlined" fullWidth>
                                    <InputLabel id="select-label">Model Name</InputLabel>
                                    <Field
                                        as={Select}
                                        name="modelId"
                                        labelId="select-label"
                                        fullWidth
                                        value={values.modelId}
                                        error={Boolean(errors.modelId)}
                                        disabled={status === reducerStatus.loading}
                                    >
                                        {allIds.map((modelId) => (
                                            <MenuItem key={`model-option-${modelId}`} value={modelId}>
                                                {get(byId[modelId], 'name', '')}
                                            </MenuItem>
                                        ))}
                                    </Field>
                                    {errors.modelId && <FormHelperText error>{errors.modelId}</FormHelperText>}
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
                                    error={Boolean(errors.prompt)}
                                />
                                {errors.prompt && <FormHelperText error>{errors.prompt}</FormHelperText>}
                            </Grid>
                            <Grid item xs={12}>
                                <LoadingButton
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    disabled={isSubmitting}
                                    loading={isSubmitting}
                                >
                                    Submit
                                </LoadingButton>
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>
            <CompletionResultModal 
                open={createModalOpen} 
                handleClose={() => setCreateModalOpen(false)} 
                result={completionResult}
            />
        </>
    );
                
};

export default PlaygroundForm;