import { isNil } from 'lodash';

const isAnyTypeEmpty = value => !!(isNil(value) || value === '' || value.length === 0);

export default isAnyTypeEmpty;