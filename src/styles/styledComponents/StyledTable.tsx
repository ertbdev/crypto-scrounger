import {TableRow, styled} from '@mui/material';

export const StyledTableRow = styled(TableRow)(({theme}) => ({
  cursor: 'pointer',
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
}));
