import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import ArrowForwardTwoToneIcon from '@mui/icons-material/ArrowForwardTwoTone';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import GridViewTwoToneIcon from '@mui/icons-material/GridViewTwoTone';
import IosShareRoundedIcon from '@mui/icons-material/IosShareRounded';
import LaunchTwoToneIcon from '@mui/icons-material/LaunchTwoTone';
import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import TableRowsTwoToneIcon from '@mui/icons-material/TableRowsTwoTone';
import {
  alpha,
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  Chip,
  Divider,
  Unstable_Grid2 as Grid,
  IconButton,
  InputAdornment,
  Link,
  MenuItem,
  Select,
  Stack,
  styled,
  Switch,
  Tab,
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
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { customersApi } from 'src/api/customer';
import { knowledgesApi } from 'src/api/knowledges';
import { ButtonIcon } from 'src/components/base/styles/button-icon';
import { TabsShadow } from 'src/components/base/styles/tabs';
import { useRouter } from 'src/hooks/use-router';
import { getKnowledge, setKnowledge } from 'src/slices/knowledge';
import { useDispatch } from 'src/store';
import BulkDelete from '../common/bulk-delete';
import DialogConfirmDelete from '../common/dialog-confirm-delete';
import CustomerFooterDropdown from './customer-footer-dropdown';
import toast from 'react-hot-toast';

// import ChatuserFooterDropdown from './user-footer-dropdown';

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

const applyFilters = (users, query, filters) => {
  return users.filter((user) => {
    let matches = true;
    if (query) {
      const properties = ['userId', 'userName'];
      let containsQuery = false;
      properties.forEach((property) => {
        if (user[property].toLowerCase().includes(query.toLowerCase())) {
          containsQuery = true;
        }
      });
      if (filters.knowId && user.knowId !== filters.knowId) {
        matches = false;
      }
      if (!containsQuery) {
        matches = false;
      }
    }
    Object.keys(filters).forEach((key) => {
      const value = filters[key];
      if (value && user[key] !== value) {
        matches = false;
      }
    });
    return matches;
  });
};
const applyPagination = (users, page, limit) => {
  return users.slice(page * limit, page * limit + limit);
};
const CustomerSection = ({ users ,setIsRefresh }) => {
  const [selectedItems, setSelectedUsers] = useState([]);
  const [knowledges, setKnowledges] = useState([]);
  const { t } = useTranslation();
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up('md'));
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({
    knowId: null,
  });
  const navigate = useNavigate();
  const [openDialogDelete, setOpenDialogDelete] = useState(false);

  const getUserRoleLabel = (knowId) => {
    const knowledgeItem = knowledges.find((item) => item.value === knowId);
    const labelName = knowledgeItem ? knowledgeItem.label : 'Unknown';

    return (
      <Chip
        style={{ maxWidth: '80%' }}
        color={'info'}
        label={labelName}
      />
    );
  };

  const handleTabsChange = (_event, tabsValue) => {
    let value = null;
    if (tabsValue !== 'all') {
      value = tabsValue;
    }
    setFilters((prevFilters) => ({
      ...prevFilters,
      knowId: value,
    }));
    setSelectedUsers([]);
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
    setSelectedUsers(event.target.checked ? users.map((user) => user.customerId) : []);
  };

  const handleSelectOneUser = (_event, customerId) => {
    if (!selectedItems.includes(customerId)) {
      setSelectedUsers((prevSelected) => [...prevSelected, customerId]);
    } else {
      setSelectedUsers((prevSelected) => prevSelected.filter((id) => id !== customerId));
    }
  };

  const handlePageChange = (_event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
  };

  const filteredUsers = applyFilters(users, query, filters);
  const paginatedUsers = applyPagination(filteredUsers, page, limit);
  const selectedBulkActions = selectedItems.length > 0;
  const selectedSomeUsers = selectedItems.length > 0 && selectedItems.length < users.length;
  const selectedAllUsers = selectedItems.length === users.length;
  const [toggleView, setToggleView] = useState('grid_view');
  const handleViewOrientation = (_event, newValue) => {
    setToggleView(newValue);
  };
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchKnowledgeData = async () => {
      try {
        let data = [];
        data = await dispatch(getKnowledge({ pageNumber: 0, pageSize: 20 }));
        const knowledgeCounts = users.reduce((acc, item) => {
          acc[item.knowId] = (acc[item.knowId] || 0) + 1;
          return acc;
        }, {});

        const convertedKnowledges = [
          {
            value: 'all',
            label: t('All users'),
            count: users.length,
          },
          // eslint-disable-next-line no-unsafe-optional-chaining
          ...data?.map((item) => ({
            value: item.knowId,
            label: t(item.knowName),
            count: knowledgeCounts[item.knowId],
          })),
        ];

        setKnowledges(convertedKnowledges);
      } catch (error) {
        console.error('Error fetching knowledge data:', error);
      }
    };

    if (users.length) fetchKnowledgeData();
  }, [users]);

  const handleDeleteCustomer = async (customerId) => {
    try {
      const response = await customersApi.deleteCustomer(customerId);
      
      toast.success(t(response.data));
      setIsRefresh((preState)=>!preState)

    } catch (error) {
      toast.error(error?.response?.data?.error?.message ?? t('Something wrong please try again!'));
      console.log(error);
    }
  };
  return (
    <>
      {/* {mdUp ? (
        <TabsShadow
          sx={{
            '& .MuiTab-root': {
              flexDirection: 'row',
              pr: 1,
              '& .MuiChip-root': {
                ml: 1,
                transition: theme.transitions.create(['background', 'color'], {
                  duration: theme.transitions.duration.complex,
                }),
              },
              '&.Mui-selected': {
                '& .MuiChip-root': {
                  backgroundColor: alpha(theme.palette.primary.contrastText, 0.12),
                  color: 'primary.contrastText',
                },
              },
              '&:first-child': {
                ml: 0,
              },
            },
          }}
          onChange={handleTabsChange}
          scrollButtons="auto"
          textColor="secondary"
          value={filters.knowId || 'all'}
          variant="scrollable"
        >
          {knowledges.map((tab) => (
            <Tab
              key={tab.value}
              value={tab.value}
              label={
                <>
                  {tab.label}
                  <Chip
                    label={tab.count}
                    size="small"
                  />
                </>
              }
            />
          ))}
        </TabsShadow>
      ) : (
        <Select
          value={filters.knowId || 'all'}
          //@ts-ignore
          onChange={handleSelectChange}
          fullWidth
        >
          {knowledges.map((tab) => (
            <MenuItem
              key={tab.value}
              value={tab.value}
            >
              {tab.label}
            </MenuItem>
          ))}
        </Select>
      )} */}

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        py={2}
      >
        <Box
          display="flex"
          alignItems="center"
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
            <TextField
              margin="none"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchTwoToneIcon />
                  </InputAdornment>
                ),
                endAdornment: query && (
                  <InputAdornment
                    sx={{
                      mr: -0.7,
                    }}
                    position="end"
                  >
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
              onChange={handleQueryChange}
              placeholder={t('Filter results')}
              value={query}
              size="small"
              variant="outlined"
            />
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
      {paginatedUsers.length === 0 ? (
        <>
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
            fontWeight={500}
          >
            {t('Không có dữ liệu user')}
          </Typography>
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
                        <TableCell>{t('Tên tổ chức')}</TableCell>
                        <TableCell>{t('Người đại diện')}</TableCell>
                        <TableCell>{t('Email/Số điện thoại')}</TableCell>
                        <TableCell>{t('Mã số thuế')}</TableCell>
                        <TableCell align="center">{t('Trạng thái ')}</TableCell>
                        <TableCell align="center">{t('Hành động')}</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {paginatedUsers.map((user, index) => {
                        const isUserSelected = selectedItems.includes(user.customerId);
                        return (
                          <TableRow
                            hover
                            key={user.id}
                            selected={isUserSelected}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                checked={isUserSelected}
                                onChange={(event) => handleSelectOneUser(event, user.customerId)}
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
                              <Typography fontWeight={600}>{user.customerName}</Typography>
                            </TableCell>
                            <TableCell>
                              <Chip
                                color={'info'}
                                label={user?.representative}
                              />
                            </TableCell>
                            <TableCell>
                              <Typography fontWeight={600}>{user.email}</Typography>
                              <Typography fontWeight={600}>{user.phoneNumber}</Typography>
                            </TableCell>
                            <TableCell></TableCell>
                            <TableCell align="center">
                              <Switch
                                checked={true}
                                onChange={() => {}}
                                inputProps={{ 'aria-label': 'controlled' }}
                              />
                            </TableCell>
                            <TableCell align="center">
                              <Typography noWrap>
                                {/* <Tooltip
                                  title={t('Tạo mới')}
                                  arrow
                                >
                                  <IconButton color="secondary">
                                    <AddCircleOutlineOutlinedIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip> */}
                                <Tooltip
                                  title={t('Xem chi tiết')}
                                  arrow
                                >
                                  <IconButton
                                    onClick={() => {
                                      navigate(`/customer/${user.customerId}`);
                                    }}
                                    color="secondary"
                                  >
                                    <LaunchTwoToneIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                                <DialogConfirmDelete
                                  onConfirm={() => handleDeleteCustomer(user?.customerId)}
                                >
                                  <Tooltip
                                    title={t('Xoá')}
                                    arrow
                                  >
                                    <IconButton color="secondary">
                                      <DeleteTwoToneIcon fontSize="small" />
                                    </IconButton>
                                  </Tooltip>
                                </DialogConfirmDelete>
                              </Typography>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Card>
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
                  count={filteredUsers.length}
                  onPageChange={handlePageChange}
                  onRowsPerPageChange={handleLimitChange}
                  page={page}
                  rowsPerPage={limit}
                  rowsPerPageOptions={[5, 10, 15]}
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
          {toggleView === 'grid_view' && (
            <>
              {paginatedUsers.length === 0 ? (
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
                    {paginatedUsers.map((user) => {
                      const isUserSelected = selectedItems.includes(user.customerId);
                      return (
                        <Grid
                          xs={12}
                          sm={6}
                          lg={4}
                          key={user.customerId}
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
                                {getUserRoleLabel(user.knowId)}
                                <CustomerFooterDropdown customer={user} />
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
                                      {user.customerName}
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
                                <Button
                                  variant="contained"
                                  onClick={() => router.push(`/customer/${user.customerId}`)}
                                  endIcon={<ArrowForwardTwoToneIcon />}
                                >
                                  {t('Xem chi tiết ')}
                                </Button>
                                <Checkbox
                                  checked={isUserSelected}
                                  onChange={(event) => handleSelectOneUser(event, user.customerId)}
                                  value={isUserSelected}
                                />
                              </Box>
                            </Box>
                          </CardWrapper>
                        </Grid>
                      );
                    })}
                  </Grid>
                  <Card
                    sx={{
                      p: 2,
                      mt: 3,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      '.MuiTablePagination-select': {
                        py: 0.55,
                      },
                    }}
                  >
                    <Box>
                      <Typography
                        component="span"
                        variant="subtitle1"
                      >
                        {t('Showing')}
                      </Typography>{' '}
                      <b>{Math.min(limit, filteredUsers.length)}</b> {t('of')}{' '}
                      <b>{filteredUsers.length}</b> <b>{t('users')}</b>
                    </Box>
                    <TablePagination
                      component="div"
                      count={filteredUsers.length}
                      onPageChange={handlePageChange}
                      onRowsPerPageChange={handleLimitChange}
                      page={page}
                      rowsPerPage={limit}
                      labelRowsPerPage=""
                      rowsPerPageOptions={[5, 10, 15]}
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
                  </Card>
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
    </>
  );
};
CustomerSection.propTypes = {
  users: PropTypes.array.isRequired,
};
CustomerSection.defaultProps = {
  users: [],
};
export default CustomerSection;
