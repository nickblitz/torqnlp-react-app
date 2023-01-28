import {
  Box,
  Input,
} from '@material-ui/core';
import SearchIcon from '../../icons/Search';

const SearchAutocomplete = () => (
  <Box
    sx={{
      alignItems: 'center',
      display: 'flex',
      p: 2
    }}
  >
    <SearchIcon fontSize="small" />
    <Box
      sx={{
        flexGrow: 1,
        ml: 3
      }}
    >
      <Input
        disableUnderline
        fullWidth
        placeholder="Enter a keyword"
      />
    </Box>
  </Box>
);

export default SearchAutocomplete;
