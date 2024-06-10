import { DeleteRounded } from '@mui/icons-material';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import {
  alpha,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Chip,
  CircularProgress,
  debounce,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  Stack,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { format } from 'date-fns';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setRefresh } from 'src/slices/common';
import DialogConfirmDelete from '../common/dialog-confirm-delete';

// import CreateUserDialog from './create-user-dialog';
// import { UpdateUser } from './update-user';

export const ButtonSoft = styled(Button)(({ theme, color }) => {
  const computedColor = color ? theme.palette[color].main : theme.palette.primary.main;
  return {
    backgroundColor: alpha(computedColor, 0.08),
    color: computedColor,
    '&:hover': {
      backgroundColor: alpha(computedColor, 0.12),
      color: computedColor,
    },
    '&:disabled': {
      backgroundColor: alpha(theme.palette.action.disabledBackground, 0.3),
    },
  };
});

const applyPagination = (users, page, limit) => {
  return users.slice(page * limit, page * limit + limit);
};

const BotUsersTable = ({ users = [], fetchData, totalCount }) => {
  const dispatch = useDispatch();

  const [selectedItems, setSelectedUser] = useState([]);
  const { t } = useTranslation();
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(6);
  const [query, setQuery] = useState();
  const [searchValue, setSearchValue] = useState('');

  const [filters, setFilters] = useState({
    userStatus: null,
    paymentStatus: null,
  });

  const isLoading = useSelector((state) => state.common.loading);
  const isRefresh = useSelector((state) => state.common.refresh);

  const paginatedUser = applyPagination(users, page, limit);
  const selectedBulkActions = selectedItems.length > 0;
  const selectedSomeUser = selectedItems.length > 0 && selectedItems.length < users.length;
  const selectedAllUser = selectedItems.length === users.length;


  const handleQueryChange = (user) => (event) => {
    setQuery((prevQuery) => ({
      ...prevQuery,
      [user]: event.target.value,
    }));
  };

  const handleStatusChange = (user) => (event) => {
    let value = null;
    if (event.target.value !== 'all') {
      value = event.target.value;
    }
    setFilters((prevFilters) => ({
      ...prevFilters,
      [user]: value,
    }));
  };

  const handleSelectAllUser = (event) => {
    setSelectedUser(event.target.checked ? users.map((user) => user.id) : []);
  };

  const handleSelectOneInvoice = (_event, userId) => {
    if (!selectedItems.includes(userId)) {
      setSelectedUser((prevSelected) => [...prevSelected, userId]);
    } else {
      setSelectedUser((prevSelected) => prevSelected.filter((id) => id !== userId));
    }
  };

  const handlePageChange = (_event, newPage) => {
    setPage(newPage);
    fetchData&&fetchData({ pageNumber: newPage, pageSize: limit }, filters);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
    fetchData&&fetchData({ pageNumber: page, pageSize: parseInt(event.target.value) }, filters);
  };
  const handleChangeFilter = (data) => {
    let newFilter = { ...filters, ...data };

    for (const key in newFilter) {
      if (newFilter[key] === '' || newFilter[key] === undefined) {
        delete newFilter[key];
      }
    }

    setFilters(newFilter);
    return newFilter;
  };

  const handleFilter = async () => {
    if (fetchData && filters) {
      dispatch(setLoading(true));
      fetchData(
        {
          pageNumber: page,
          pageSize: limit,
        },
        filters
      ).finally(() => dispatch(setLoading(false)));
    }
  };

  const handleSearchByName = async (value) => {
    handleChangeFilter({ customerName: value });
  };
  const debounceHandleSearch = debounce(handleSearchByName, 900);
  const handleDeleteUser = async (customerId) => {
    try {
      // const response = await customersApi.deleteCustomer(customerId);

      // toast.success(t(response.data));
      dispatch(setRefresh(!isRefresh));
    } catch (error) {
      toast.error(error?.response?.data?.error?.message ?? t('Something wrong please try again!'));
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData&&fetchData({ pageNumber: page, pageSize: limit });
  }, [isRefresh]);

  return (
    <>
      <Card
        sx={{
          width: '100%',
        }}
      >
        <CardHeader
          titleTypographyProps={{
            variant: 'h4',
          }}
          title="Danh sách người dùng thuộc bot"
        />
        <Divider />
        <CardContent>
          <Box
            
            pb={2}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            flexWrap={'wrap'}
          >
            <Stack
              direction="row"
              flexWrap={'wrap'}
              gap={'10px'}
            >
              <TextField
                size="small"
                style={{ width: 210 }}
                placeholder="Tên / Mã lĩnh vực"
                value={searchValue}
                onChange={(event) => {
                  debounceHandleSearch(event.target.value);
                  setSearchValue(event.target.value);
                }}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchTwoToneIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={handleFilter}
              >
                Tìm kiếm
              </Button>
            </Stack>
          </Box>
          <Divider />
          {isLoading ? (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '16px',
                height: '50vh',
              }}
              color="common.white"
            >
              {' '}
              <CircularProgress style={{ height: '30px', width: '30px' }} />
            </Box>
          ) : users.length === 0 ? (
            <Typography
              sx={{
                py: {
                  xs: 2,
                  sm: 3,
                  md: 6,
                  lg: 10,
                },
              }}
              variant="h3"
              color="text.secondary"
              fontWeight={500}
              align="center"
            >
              {t("We couldn't find any user matching your search criteria")}
            </Typography>
          ) : (
            <>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>{t('Username')}</TableCell>
                      <TableCell>{t('Email')}</TableCell>
                      <TableCell>{t('Role chat')}</TableCell>
                      <TableCell>{t('Role training')}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((user, index) => {
                      const isInvoiceSelected = selectedItems.includes(user.id);
                      return (
                        <TableRow
                          hover
                          key={user.id}
                          selected={isInvoiceSelected}
                        >
                          <TableCell>
                            <Typography
                              noWrap
                              variant="subtitle2"
                            >
                              {user.userName}
                            </Typography>
                          </TableCell>

                          <TableCell>
                            <Typography
                              noWrap
                              variant="subtitle2"
                            >
                              {user.userCode}
                            </Typography>
                          </TableCell>

                          <TableCell>
                            <Checkbox
                              checked={isInvoiceSelected}
                              onChange={(event) => handleSelectOneInvoice(event, user.id)}
                              value={isInvoiceSelected}
                            />
                          </TableCell>

                          <TableCell>
                            <Checkbox
                              checked={isInvoiceSelected}
                              onChange={(event) => handleSelectOneInvoice(event, user.id)}
                              value={isInvoiceSelected}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
              <Box
                p={2}
                sx={{
                  '.MuiTablePagination-select': {
                    py: 0.55,
                  },
                }}
              >
                <TablePagination
                  component="div"
                  count={100}
                  onPageChange={handlePageChange}
                  onRowsPerPageChange={handleLimitChange}
                  page={page}
                  rowsPerPage={limit}
                  rowsPerPageOptions={[6, 9, 15]}
                  slotProps={{
                    select: {
                      variant: 'outlined',
                      size: 'small',
                      sx: {
                        p: 0,
                      },
                    },
                  }}
                />
              </Box>
            </>
          )}
        </CardContent>
      </Card>
    </>
  );
};

BotUsersTable.propTypes = {
  user: PropTypes.array.isRequired,
};

BotUsersTable.defaultProps = {
  user: [],
};

export default BotUsersTable;
