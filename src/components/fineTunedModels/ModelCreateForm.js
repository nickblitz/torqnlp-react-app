import React from "react";
import { Formik, Form, Field } from "formik";
import { 
    TextField, 
    Button, 
    Grid,
    FormControl,
    FormHelperText,
} from "@material-ui/core";
import * as yup from "yup";
import{ dataSetValidator } from "../../utils/validators";


const schema = yup.object({
    name: yup
        .string()
        .max(25, "Name must be 25 characters or less")
        .required("Name is required"),
    dataSet: yup
        .mixed()
        .required("A data set file is required")
        .test(
            "fileFormat",
            "file format is not correct",
            dataSetValidator
        ),
});

const ModelCreateForm = () => {

  return (
    <Formik
      initialValues={{ name: "", dataSet: null }}
      validationSchema={schema}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Field
                        name="name"
                        render={({ field, form: { errors, touched } }) => (
                            <TextField
                                {...field}
                                error={Boolean(errors.name && touched.name)}
                                helperText={errors.name}
                                label="Name"
                                variant="outlined"
                                fullWidth
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Field
                        name="dataSet"
                        type="file"
                        render={({ field, form }) => (
                            <FormControl fullWidth>
                                <Field
                                    name="dataSet"
                                    render={({ field, form }) => (
                                        <TextField
                                            {...field}
                                            error={Boolean(form.errors.dataSet && form.touched.dataSet)}
                                            helperText={form.touched.dataSet ? form.errors.dataSet : ''}
                                            type="file"
                                            variant="outlined"
                                            onChange={(event) => {
                                                // Handle form files
                                                // form.setFieldValue(field.name, event.target.files[0].name);
                                            }}
                                        />
                                    )}
                                />
                                <FormHelperText>Data set files must be a CSV, TSV, XLSX, JSON or JSONL</FormHelperText>
                            </FormControl>
                        )}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button 
                        onClick={() => { alert("This is not yet setup.")}} 
                        color="primary" 
                        variant="contained" 
                        type="submit" 
                        disabled={isSubmitting}>
                            Submit
                    </Button>
                </Grid>
            </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default ModelCreateForm;