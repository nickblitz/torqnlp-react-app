import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Box,
  Container,
  Grid,
} from '@material-ui/core';
import { useDispatch } from '../store';
import useSettings from '../hooks/useSettings';
import gtm from '../lib/gtm';
import SearchFilters from '../components/search/SearchFilters';
import SearchResults from '../components/search/SearchResults';
import { search } from '../slices/search';

const Search = () => {
  const { settings } = useSettings();
  const dispatch = useDispatch();

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  useEffect(() => {
    dispatch(search({}));
  }, [ dispatch ]);

  return (
    <>
      <Helmet>
        <title>Search</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          py: 10
        }}
      >
        <Container maxWidth={settings.compact ? 'xl' : false}>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              xs={3}
            >
              <Box
                sx={{
                  mb: 2,
                }}
              >
                <SearchFilters />
              </Box>

            </Grid>
            <Grid item xs={9}>
              <SearchResults />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Search;
