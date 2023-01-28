import { Box, Card, LinearProgress, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { round } from 'lodash';
import numeral from 'numeral';

const CreditUsageWidget = ({ totalCredits, remainingCredits }) => (
  <Card sx={{
    p: 2,
  }}>
    <Typography
      color="textSecondary"
      gutterBottom
      variant="overline"
    >
      Monthly usage
    </Typography>
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        flexWrap: 'wrap',
      }}
    >
      <Typography
        color="textPrimary"
        sx={{ mr: 1 }}
        variant="subtitle2"
      >
        Contacts
      </Typography>
      <Typography
        color="textSecondary"
        variant="subtitle2"
        sx={{
          flexGrow: 1,
          textAlign: 'right',
        }}
      >
        {numeral(remainingCredits).format('0,0')}/{numeral(totalCredits).format('0,0')}
      </Typography>
    </Box>
    <Box>
      <LinearProgress
        color="primary"
        value={remainingCredits && totalCredits ? round(remainingCredits / totalCredits) * 100 : 0}
        variant="determinate"
      />
    </Box>
  </Card>
);

CreditUsageWidget.propTypes = {
  totalCredits: PropTypes.number,
  remainingCredits: PropTypes.number,
}

CreditUsageWidget.defaultProps = {
  totalCredits: 0,
  remainingCredits: 0,
}

export default CreditUsageWidget;
