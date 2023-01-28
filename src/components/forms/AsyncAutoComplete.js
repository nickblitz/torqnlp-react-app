import * as React from 'react';
import { TextField, Autocomplete } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';

const DEBOUNCE_TIMEOUT = 400;

const AsyncAutoComplete = ({ apiService, textFieldProps, ...props }) => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const searchAutocomplete = debounce(async (e, q) => {
    setLoading(true);
    const resp = await apiService(q);
    setOptions(resp.results);
    setLoading(false);
  }, DEBOUNCE_TIMEOUT);
  return (
    <Autocomplete
      getOptionSelected={(option, value) => option.id === value.id}
      getOptionLabel={(option) => option.text}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      onInputChange={searchAutocomplete}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...textFieldProps}
          {...params}
          size="small"
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
      {...props}
    />
  );
};

AsyncAutoComplete.propTypes = {
  apiService: PropTypes.func.isRequired,
  textFieldProps: PropTypes.shape({}),
};

AsyncAutoComplete.defaultProps = {
  textFieldProps: {},
};

export default AsyncAutoComplete;