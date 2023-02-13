/**
 * Show Skeleton Loader for rows while data is being fetched.
 */

import {
    Skeleton,
    TableRow,
    TableCell,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    Paper,
} from '@material-ui/core';
import PropTypes from 'prop-types';
  
  
  const ResultLoader = ({ isLoading, children }) => {
    if (!isLoading) {
      return children;
    }
  
    return (
        <TableContainer component={Paper} sx={{ mb: 4 }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell><Skeleton animation="wave" /></TableCell>
                        <TableCell align="left"><Skeleton animation="wave" /></TableCell>
                        <TableCell align="left"><Skeleton animation="wave" /></TableCell>
                        <TableCell align="left"><Skeleton animation="wave" /></TableCell>
                        <TableCell align="left"><Skeleton animation="wave" /></TableCell>
                        <TableCell align="right"><Skeleton animation="wave" /></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow key="model-row-loading">
                        <TableCell component="th" scope="row" colSpan={6}>
                            <Skeleton animation="wave" />
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
        
    );
  }
  
  ResultLoader.propTypes = {
    isLoading: PropTypes.bool,
    children: PropTypes.element.isRequired,
  };
  
  ResultLoader.defaultProps = {
    isLoading: false,
  };
  
  export default ResultLoader;