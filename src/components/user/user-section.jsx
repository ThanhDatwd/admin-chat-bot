import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import GridViewTwoToneIcon from '@mui/icons-material/GridViewTwoTone';
import IosShareRoundedIcon from '@mui/icons-material/IosShareRounded';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import TableRowsTwoToneIcon from '@mui/icons-material/TableRowsTwoTone';
import {
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  Chip,
  CircularProgress,
  Divider,
  Unstable_Grid2 as Grid,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  styled,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import EmptyDataImage from '/src/assets/images/all-img/empty-data.png';
import clsx from 'clsx';
import { isNull } from 'lodash';
import PropTypes from 'prop-types';
import * as qs from 'qs';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { ButtonIcon } from 'src/components/base/styles/button-icon';
import { useRouter } from 'src/hooks/use-router';
import { setLoading } from 'src/slices/common';
import { useDispatch } from 'src/store';
import { debounce } from 'src/utils';
import { isVietnameseTones } from 'src/utils/validateString';
import BulkDelete from '../common/bulk-delete';
import DialogConfirmDelete from '../common/dialog-confirm-delete';
import UpdateUserDialog from './user-update-dialog';
import UserFooterDropdown from './userFooterDropdown';

export const CardWrapper = styled(Card)(
  ({ theme }) => `

  position: relative;
  overflow: visible;

  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    border-radius: inherit;
    z-index: 1;
  }
      
    &.Mui-selected::after {
      box-shadow: 0 0 0 3px ${theme.palette.primary.main};
    }
  `
);

const applyPagination = (users, page, limit) => {
  return users.slice(page * limit, page * limit + limit);
};
const UserTable = ({ users, fetchData, totalCount }) => {
  const [selectedItems, setSelectedUsers] = useState([]);
  const { t } = useTranslation();
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up('md'));
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(15);
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState();
  const [searchByNameValue, setSearchByNameValue] = useState('');
  const [currentUser, setCurrentUser] = useState({});
  const [openDialogUpdate, setOpenDialogUpdate] = useState(false);

  const paginatedUsers = applyPagination(users, page, limit);
  const selectedBulkActions = selectedItems.length > 0;
  const selectedSomeUsers = selectedItems.length > 0 && selectedItems.length < users.length;
  const selectedAllUsers = selectedItems.length === users.length;
  const [toggleView, setToggleView] = useState('grid_view');
  const isLoading = useSelector((state) => state.common.loading);
  const isRefresh = useSelector((state) => state.common.refresh);

  const navigate = useNavigate();
  const router = useRouter();
  const dispatch = useDispatch();

  const handleViewOrientation = (_event, newValue) => {
    setToggleView(newValue);
  };

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setFilters((prevFilters) => ({
      ...prevFilters,
      knowId: selectedValue === 'all' ? null : selectedValue,
    }));
    setSelectedUsers([]);
  };

  const handleQueryChange = (event) => {
    event.persist();
    setQuery(event.target.value);
  };

  const handleSelectAllUsers = (event) => {
    setSelectedUsers(event.target.checked ? users.map((user) => user.id) : []);
  };

  const handleSelectOneUser = (_event, userId) => {
    if (!selectedItems.includes(userId)) {
      setSelectedUsers((prevSelected) => [...prevSelected, userId]);
    } else {
      setSelectedUsers((prevSelected) => prevSelected.filter((id) => id !== userId));
    }
  };

  const handlePageChange = (_event, newPage) => {
    setPage(newPage);
    const queryParams = qs.stringify({ ...filters, accent: isVietnameseTones(filters?.search) });
    fetchData({ pageNumber: newPage, pageSize: limit }, queryParams);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
    setPage(0);
    const queryParams = qs.stringify({ ...filters, accent: isVietnameseTones(filters?.search) });
    fetchData({ pageNumber: 0, pageSize: parseInt(event.target.value) }, queryParams);
  };

  const handleChangeFilter = (data) => {
    let newFilter = { ...filters, ...data };

    for (const key in newFilter) {
      if (newFilter[key] === '' || newFilter[key] === undefined) {
        delete newFilter[key];
      }
    }

    setFilters({ ...newFilter, accent: isVietnameseTones(newFilter.search) });
    return newFilter;
  };

  const handleFilter = async () => {
    if (fetchData && filters) {
      dispatch(setLoading(true));
      const queryParams = qs.stringify({ ...filters, accent: isVietnameseTones(filters?.search) });
      fetchData(
        {
          pageNumber: page,
          pageSize: limit,
        },

        queryParams
      ).finally(() => dispatch(setLoading(false)));
    }
  };

  const handleSearchByName = async (value) => {
    handleChangeFilter({ search: value });
  };
  const handleEnter = (event) => {
    let enterKey = 13;
    if (event.which == enterKey) {
      event.preventDefault();
      handleFilter();
    }
  };

  useEffect(() => {
    fetchData({ pageNumber: page, pageSize: limit });
  }, [isRefresh]);

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        py={2}
      >
        <Box
          display="flex"
          alignItems="center"
          width={'100%'}
        >
          {toggleView === 'grid_view' && (
            <Tooltip
              arrow
              placement="top"
              title={t('Select all users')}
            >
              <Checkbox
                edge="start"
                sx={{
                  mr: 1,
                }}
                disabled={paginatedUsers.length === 0}
                checked={selectedAllUsers}
                indeterminate={selectedSomeUsers}
                onChange={handleSelectAllUsers}
              />
            </Tooltip>
          )}
          {selectedBulkActions ? (
            <Stack
              direction="row"
              spacing={1}
            >
              <BulkDelete />
              <Tooltip
                arrow
                placement="top"
                title={t('Export user list')}
              >
                <ButtonIcon
                  variant="outlined"
                  color="secondary"
                  sx={{
                    color: 'primary.main',
                  }}
                  size="small"
                  startIcon={<IosShareRoundedIcon fontSize="small" />}
                />
              </Tooltip>
            </Stack>
          ) : (
            <Stack
              direction="row"
              // flexWrap={'wrap'}
              gap={'10px'}
              width={'100%'}
            >
              <Box
                width={{
                  xs: '100%',
                  md: '50%',
                }}
              >
                <TextField
                  margin="none"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchTwoToneIcon />
                      </InputAdornment>
                    ),
                    endAdornment: query && (
                      <InputAdornment position="end">
                        <IconButton
                          color="error"
                          aria-label="clear input"
                          onClick={() => setQuery('')}
                          edge="end"
                          size="small"
                          sx={{
                            color: 'error.main',
                          }}
                        >
                          <ClearRoundedIcon fontSize="small" />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  onChange={(event) => {
                    handleSearchByName(event.target.value);
                    setSearchByNameValue(event.target.value);
                  }}
                  onKeyPress={handleEnter}
                  placeholder={t('Họ và tên / email người dùng')}
                  value={searchByNameValue}
                  size="small"
                  variant="outlined"
                />
              </Box>
              <Button
                variant="contained"
                color="primary"
                size="small"
                sx={{ whiteSpace: 'nowrap', minWidth: 'unset' }}
                onClick={handleFilter}
              >
                {t('Tìm kiếm')}
              </Button>
            </Stack>
          )}
        </Box>
        <ToggleButtonGroup
          sx={{
            ml: 1,
          }}
          size="large"
          color="primary"
          value={toggleView}
          exclusive
          onChange={handleViewOrientation}
        >
          <ToggleButton value="table_view">
            <TableRowsTwoToneIcon />
          </ToggleButton>
          <ToggleButton value="grid_view">
            <GridViewTwoToneIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
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
        <>
          <Box
            sx={{ minHeight: '50vh' }}
            display={'flex'}
            justifyContent={'center'}
            flexDirection={'column'}
            alignItems={'center'}
          >
            {' '}
            <img
              style={{ width: '200px' }}
              src={EmptyDataImage}
            />
            <Typography
              variant="h6"
              color="text.secondary"
              align="center"
              fontWeight={500}
            >
              {t('Không có dữ liệu người dùng')}
            </Typography>
          </Box>
        </>
      ) : (
        <>
          {toggleView === 'table_view' && (
            <>
              <Card>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={selectedAllUsers}
                            indeterminate={selectedSomeUsers}
                            onChange={handleSelectAllUsers}
                          />
                        </TableCell>
                        <TableCell>{t('Ảnh đại diện')}</TableCell>
                        <TableCell>{t('Tên người dùng')}</TableCell>
                        <TableCell>{t('Email/Số điện thoại')}</TableCell>
                        <TableCell>{t('Trạng thái ')}</TableCell>
                        <TableCell align="center">{t('Hành động')}</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {users.map((user, index) => {
                        const isUserSelected = selectedItems.includes(user?.id);
                        return (
                          <TableRow
                            hover
                            key={user.id}
                            selected={isUserSelected}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                checked={isUserSelected}
                                onChange={(event) => handleSelectOneUser(event, user.id)}
                                value={isUserSelected}
                              />
                            </TableCell>
                            <TableCell>
                              <Box
                                display="flex"
                                alignItems="center"
                              >
                                <Avatar
                                  variant="rounded"
                                  sx={{
                                    mr: 1,
                                  }}
                                  src={user.avatar}
                                />
                              </Box>
                            </TableCell>
                            <TableCell>
                              {' '}
                              <Typography fontWeight={600}>
                                {user.firstName} {user.lastName}{' '}
                              </Typography>
                            </TableCell>
                            {/* <TableCell>
                              <Chip
                                color={'info'}
                                label={user?.representative}
                              />
                            </TableCell> */}
                            <TableCell>
                              <Typography fontWeight={600}>{user.email}</Typography>
                              <Typography fontWeight={600}>{user.phoneNumber}</Typography>
                            </TableCell>
                            <TableCell align="center">
                              <Switch
                                checked={user.active}
                                onChange={() => {}}
                                inputProps={{ 'aria-label': 'controlled' }}
                              />
                            </TableCell>
                            <TableCell align="center">
                              <Typography noWrap>
                                <Tooltip
                                  title={t('Cập nhật')}
                                  arrow
                                >
                                  <IconButton
                                    onClick={() => {
                                      setCurrentUser(user);
                                      setOpenDialogUpdate(true);
                                    }}
                                    color="primary"
                                  >
                                    <EditTwoToneIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                              </Typography>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Card>
            </>
          )}
          {toggleView === 'grid_view' && (
            <>
              {users.length === 0 ? (
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
                  align="center"
                >
                  {t('Không có dữ liệu')}
                </Typography>
              ) : (
                <>
                  <Grid
                    container
                    spacing={{
                      xs: 2,
                      sm: 3,
                    }}
                  >
                    {users.map((user) => {
                      const isUserSelected = selectedItems.includes(user?.id);
                      return (
                        <Grid
                          xs={12}
                          sm={6}
                          lg={4}
                          key={user.id}
                        >
                          <CardWrapper
                            className={clsx({
                              'Mui-selected': isUserSelected,
                            })}
                          >
                            <Box
                              sx={{
                                position: 'relative',
                                zIndex: '2',
                              }}
                            >
                              <Box
                                px={2}
                                pt={2}
                                display="flex"
                                alignItems="flex-start"
                                justifyContent="space-between"
                              >
                                <Chip
                                  style={{ maxWidth: '80%' }}
                                  color={user.active ? 'info' : 'error'}
                                  label={user.active ? 'Đang hoạt động' : 'Ngừng hoạt động'}
                                />
                                <UserFooterDropdown
                                  onDelete={() => {}}
                                  onUpdate={() => {
                                    console.log(user);
                                    setCurrentUser(user);
                                    setOpenDialogUpdate(true);
                                  }}
                                />
                              </Box>
                              <Box
                                p={2}
                                display="flex"
                                flexDirection={{
                                  xs: 'column',
                                  md: 'row',
                                }}
                                alignItems="flex-start"
                              >
                                <Avatar
                                  variant="rounded"
                                  sx={{
                                    width: 50,
                                    height: 50,
                                    mr: 1.5,
                                    mb: {
                                      xs: 2,
                                      md: 0,
                                    },
                                  }}
                                  src={user.avatar}
                                />
                                <Box>
                                  <Box>
                                    <Link
                                      variant="h6"
                                      href=""
                                      onClick={(e) => e.preventDefault()}
                                      underline="hover"
                                    >
                                      {user.name}
                                    </Link>{' '}
                                    <Typography
                                      component="span"
                                      variant="body2"
                                      color="text.secondary"
                                    >
                                      {user.firstName} {user.lastName}
                                    </Typography>
                                  </Box>
                                  <Typography
                                    style={{
                                      overflow: 'hidden',
                                      textOverflow: 'ellipsis',
                                      display: '-webkit-box',
                                      WebkitLineClamp: 2,
                                      WebkitBoxOrient: 'vertical',
                                    }}
                                    sx={{
                                      pt: 0.3,
                                    }}
                                    variant="subtitle2"
                                  >
                                    {user.phoneNumber}
                                  </Typography>
                                  <Typography
                                    style={{
                                      overflow: 'hidden',
                                      textOverflow: 'ellipsis',
                                      display: '-webkit-box',
                                      WebkitLineClamp: 2,
                                      WebkitBoxOrient: 'vertical',
                                    }}
                                    sx={{
                                      pt: 0.3,
                                    }}
                                    variant="subtitle2"
                                  >
                                    {user.email}
                                  </Typography>
                                </Box>
                              </Box>
                              <Divider />
                              <Box
                                pl={2}
                                py={1}
                                pr={1}
                                display="flex"
                                alignItems="center"
                                justifyContent="space-between"
                              >
                                {/* <Button
                                  variant="contained"
                                  onClick={() => router.push(`/user/${user.id}`)}
                                  endIcon={<ArrowForwardTwoToneIcon />}
                                >
                                  {t('Xem chi tiết ')}
                                </Button> */}
                                <Checkbox
                                  checked={isUserSelected}
                                  onChange={(event) => handleSelectOneUser(event, user.id)}
                                  value={isUserSelected}
                                />
                              </Box>
                            </Box>
                          </CardWrapper>
                        </Grid>
                      );
                    })}
                  </Grid>
                </>
              )}
            </>
          )}
          {!toggleView && (
            <Box
              sx={{
                textAlign: 'center',
                p: {
                  xs: 2,
                  sm: 3,
                },
              }}
            >
              <Typography
                align="center"
                variant="h4"
                color="text.secondary"
                fontWeight={500}
                sx={{
                  my: {
                    xs: 2,
                    sm: 3,
                    md: 5,
                  },
                }}
                gutterUsertom
              >
                {t('Choose between table or grid views for displaying the users list.')}
              </Typography>
            </Box>
          )}
        </>
      )}
      <Box
        pt={2}
        sx={{
          '.MuiTablePagination-select': {
            py: 0.55,
          },
        }}
      >
        <TablePagination
          component="div"
          count={totalCount}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          labelRowsPerPage="Số hàng mỗi trang"
          rowsPerPageOptions={[5, 15, 30, 50]}
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
      {isNull(currentUser) &&
        {
          /* <UpdateUserDialog
          user={currentUser}
          open={openDialogUpdate}
          onClose={() => setOpenDialogUpdate(false)}
        /> */
        }}
    </>
  );
};
UserTable.propTypes = {
  users: PropTypes.array.isRequired,
};
UserTable.defaultProps = {
  users: [],
};
export default UserTable;
