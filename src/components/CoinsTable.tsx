import {useEffect, useRef, useState} from 'react';

import {useDispatch, useSelector} from '@/hooks/redux';
import {fetchCoins} from '@/redux/coinsSlice';
import {
  Box,
  Grid,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import {Coin} from '@/types/Coin';
import Image from 'next/image';
import {CurrencySymbol} from '@/constants/currency';
import {getNumberWithCommas} from '@/functions/getNumberWithCommas';

const CoinsTable = () => {
  const [loading, setLoading] = useState(false);

  const currency = useSelector(state => state.coinsSlice.currency);
  const coins = useSelector(state => state.coinsSlice.coins);
  const dispatch = useDispatch();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [visibleCoins, setVisibleCoins] = useState<Coin[]>([]);

  const tableRef = useRef<HTMLElement>(null);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - coins.length) : 0;

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
    tableRef.current && window.scrollTo(0, tableRef.current.offsetTop - 150);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    tableRef.current && window.scrollTo(0, tableRef.current.offsetTop - 150);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(fetchCoins(currency));
      setLoading(false);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  useEffect(() => {
    const startIndex = page * rowsPerPage;
    const endIndex = page * rowsPerPage + rowsPerPage;
    setVisibleCoins(coins.slice(startIndex, endIndex));
  }, [coins, page, rowsPerPage]);

  return (
    <Box ref={tableRef} maxWidth={'lg'} sx={{pb: 10}}>
      {visibleCoins.length > 0 && !loading ? (
        <TableContainer component={Paper}>
          <Table sx={{minWidth: {xs: 320, sm: 500, md: 800}}} aria-label="coins table">
            <TableHead>
              <TableRow sx={{backgroundColor: 'primary.main'}}>
                <TableCell align="left">Coin</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">24h Change</TableCell>
                <TableCell align="right">Market Cap</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {visibleCoins.map(coin => (
                <TableRow hover key={coin.id} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                  <TableCell component="th" scope="row">
                    <Grid sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                      {typeof coin.image === 'string' ? <Image src={coin.image} alt={coin.name} height={50} width={50} /> : null}
                      <Grid sx={{display: 'flex', flexDirection: 'column', ml: 2}}>
                        <Typography variant="body1">{coin.symbol}</Typography>
                        <Typography variant="body2">{coin.name}</Typography>
                      </Grid>
                    </Grid>
                  </TableCell>
                  <TableCell align="right">{coin.current_price}</TableCell>
                  <TableCell align="right" sx={{color: coin.price_change_percentage_24h > 0 ? 'success.main' : 'error.main'}}>
                    {coin.price_change_percentage_24h > 0 && '+'}
                    {coin.price_change_percentage_24h.toFixed(2)}%
                  </TableCell>
                  <TableCell align="right">
                    {CurrencySymbol[currency]} {getNumberWithCommas(coin.market_cap)}
                  </TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{height: 53 * emptyRows}}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 20]}
                  colSpan={3}
                  count={coins.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      'aria-label': 'rows per page',
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      ) : (
        <LinearProgress sx={{width: {xs: 300, sm: 500, md: 800, lg: 1100, xl: 1400}}} />
      )}
    </Box>
  );
};

export default CoinsTable;
