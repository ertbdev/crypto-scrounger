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
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {CoinDigest} from '@/types/Coin';
import {CurrencySymbol} from '@/constants/currency';
import {getNumberWithCommas} from '@/functions/getNumberWithCommas';
import {useRouter} from 'next/router';
import {StyledTableRow} from '@/styles/styledComponents/StyledTable';
import Image from 'next/image';

const CoinsTable = () => {
  const [loading, setLoading] = useState(false);
  const {breakpoints} = useTheme();
  const isSmall = useMediaQuery(breakpoints.down('sm'));

  const currency = useSelector(state => state.coinsSlice.currency);
  const coins = useSelector(state => state.coinsSlice.coins);
  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filteredCoins, setFilteredCoins] = useState<CoinDigest[]>([]);
  const [visibleCoins, setVisibleCoins] = useState<CoinDigest[]>([]);

  const tableRef = useRef<HTMLElement>(null);

  const router = useRouter();

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - coins.length) : 0;

  const handleTextChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.currentTarget.value);
  };

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
    tableRef.current && window.scrollTo(0, tableRef.current.offsetTop - 150);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    tableRef.current && window.scrollTo(0, tableRef.current.offsetTop - 150);
  };

  const handleGoToCoin = (id: string) => {
    router.push(`/coin/${id}`);
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
    setVisibleCoins(filteredCoins.slice(startIndex, endIndex));
  }, [filteredCoins, page, rowsPerPage]);

  useEffect(() => {
    const filterCoins = async (value: string) => {
      const Fuse = (await import('fuse.js')).default;
      const fuse = new Fuse(coins, {keys: ['name'], threshold: 0.3});
      setFilteredCoins(fuse.search(value).map(result => result.item));
    };

    if (searchText) {
      filterCoins(searchText);
    } else {
      setFilteredCoins(coins);
    }
  }, [coins, searchText]);

  return (
    <Box ref={tableRef} maxWidth={'md'} width={'98%'} sx={{pb: 10}}>
      <Typography variant="h3" sx={{my: 5, px: 2, textAlign: 'center'}}>
        Today&apos;s Cryptocurrency Prices by Market Cap
      </Typography>
      <TextField
        id="search-bar"
        type="search"
        placeholder="Search for a crypto currency"
        variant="outlined"
        fullWidth
        sx={{mb: 2}}
        onChange={handleTextChange}
      />
      {(visibleCoins.length > 0 || searchText) && !loading ? (
        <Paper sx={{width: '100%'}}>
          <TableContainer>
            <Table aria-label="coins table" size={isSmall ? 'small' : 'medium'} sx={{minWidth: 700}}>
              <TableHead>
                <TableRow sx={{backgroundColor: 'primary.dark'}}>
                  <TableCell align="left" sx={{color: '#FFF'}}>
                    Coin
                  </TableCell>
                  <TableCell align="right" sx={{color: '#FFF'}}>
                    Price
                  </TableCell>
                  <TableCell align="right" sx={{color: '#FFF'}}>
                    24h Change
                  </TableCell>
                  <TableCell align="right" sx={{color: '#FFF'}}>
                    Market Cap
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {visibleCoins.map(coin => (
                  <StyledTableRow
                    onClick={() => {
                      coin.id && handleGoToCoin(coin.id);
                    }}
                    key={coin.id}>
                    <TableCell component="th" scope="row">
                      <Grid sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <Image src={coin.image} alt={coin.name} height={50} width={50} />
                        <Grid sx={{display: 'flex', flexDirection: 'column', ml: 2}}>
                          <Typography variant="body1">{coin.symbol}</Typography>
                          <Typography variant="body2">{coin.name}</Typography>
                        </Grid>
                      </Grid>
                    </TableCell>
                    <TableCell align="right">
                      {CurrencySymbol[currency]} {getNumberWithCommas(coin.current_price)}
                    </TableCell>
                    <TableCell align="right" sx={{color: coin.price_change_percentage_24h > 0 ? 'success.main' : 'error.main'}}>
                      {coin.price_change_percentage_24h > 0 && '+'}
                      {coin.price_change_percentage_24h.toFixed(2)}%
                    </TableCell>
                    <TableCell align="right">
                      {CurrencySymbol[currency]} {getNumberWithCommas(coin.market_cap, true)}
                    </TableCell>
                  </StyledTableRow>
                ))}
                {emptyRows > 0 && (
                  <StyledTableRow style={{height: 53 * emptyRows}}>
                    <TableCell colSpan={6} />
                  </StyledTableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={isSmall ? [10] : [5, 10, 20]}
            component="div"
            count={filteredCoins.length}
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
        </Paper>
      ) : (
        <LinearProgress sx={{width: '80%', mx: '10%', mt: 10}} />
      )}
    </Box>
  );
};

export default CoinsTable;
