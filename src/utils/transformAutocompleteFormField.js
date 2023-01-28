const transformAutocompleteFormField = values => JSON.parse(values).map(l => l.id);

export default transformAutocompleteFormField;