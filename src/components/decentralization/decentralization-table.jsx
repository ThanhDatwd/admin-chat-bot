import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import SyncOutlinedIcon from '@mui/icons-material/SyncOutlined';
import {
  alpha,
  Box,
  Button,
  Card,
  Checkbox,
  CircularProgress,
  debounce,
  Divider,
  InputAdornment,
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
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { botsApi } from 'src/api/bots';
import { setLoading } from 'src/slices/common';

// import CreateUserDialog from './create-field-dialog';
// import { UpdateUser } from './update-field';

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

const DecentralizationTable = ({ users = [], fetchData, totalCount, botId }) => {
  const dispatch = useDispatch();

  const [selectedItems, setSelectedUser] = useState([]);
  const { t } = useTranslation();
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [searchValue, setSearchValue] = useState('');
  const [selectedUsersRole, setSelectUsersRole] = useState({});
  const [aggregateUsers, setAggregateUsers] = useState([]);

  const [filters, setFilters] = useState({
    fieldStatus: null,
    paymentStatus: null,
  });

  const isLoading = useSelector((state) => state.common.loading);
  const isRefresh = useSelector((state) => state.common.refresh);
  const currentAdmin = useSelector((state) => state.auth.admin);

  const [currentBotId, setCurrentBotId] = useState('');
  const [selectedAllUserRoleQuery, setSelectedAllUserRoleQuery] = useState(false);
  const [selectedAllUserRoleUpdate, setSelectedAllUserRoleUpdate] = useState(false);
  const [countChange, setCountChange] = useState(0);

  const handleSelectAllRole = (event, key) => {
    if (botId && botId !== '') {
      let cloneSelectUserRole = { ...selectedUsersRole };
      users.forEach((item) => {
        cloneSelectUserRole = {
          ...cloneSelectUserRole,
          [item.userId]: {
            ...cloneSelectUserRole[item.userId],
            [key]: event.target.checked,
            userId: item.userId,
            customerId: currentAdmin.customerId,
            botId: botId,
          },
        };
      });
      setSelectedAllUserRoleQuery(
        Object.keys(cloneSelectUserRole).length > 0
          ? !users.some((item) => cloneSelectUserRole[item.userId]?.canQuery === false)
          : false
      );
      setSelectedAllUserRoleUpdate(
        Object.keys(cloneSelectUserRole).length > 0
          ? !users.some((item) => cloneSelectUserRole[item.userId]?.canUpdate === false)
          : false
      );
      setSelectUsersRole(cloneSelectUserRole);
      let dataChange = getChangedItems({ ...cloneSelectUserRole }, aggregateUsers);
      setCountChange(dataChange.count ?? 0);
    } else {
      toast.error(t('Vui lòng chọn bot để thực hiện'));
    }
  };
  const handleSelectOneRole = (_event, userId, data) => {
    if (botId && botId !== '') {
      let cloneSelectUserRole = {
        ...selectedUsersRole,
        [userId]: {
          ...selectedUsersRole[userId],
          ...data,
          userId: userId,
          customerId: currentAdmin.customerId,
          botId: botId,
        },
      };

      setSelectUsersRole(cloneSelectUserRole);
      setSelectedAllUserRoleQuery(
        Object.keys(cloneSelectUserRole).length > 0
          ? !users.some((item) => cloneSelectUserRole[item.userId]?.canQuery === false)
          : false
      );
      setSelectedAllUserRoleUpdate(
        Object.keys(cloneSelectUserRole).length > 0
          ? !users.some((item) => cloneSelectUserRole[item.userId]?.canUpdate === false)
          : false
      );

      let dataChange = getChangedItems({ ...cloneSelectUserRole }, aggregateUsers);
      setCountChange(dataChange.count ?? 0);
    } else {
      toast.error('Vui lòng chọn bot để thực hiện');
    }
  };

  const handlePageChange = (_event, newPage) => {
    setPage(newPage);
    fetchData({ pageNumber: newPage, pageSize: limit }, filters);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
    fetchData({ pageNumber: page, pageSize: parseInt(event.target.value) }, filters);
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
      ).finally(() => {
        dispatch(setLoading(false));
      });
    }
  };
  const handleSearchByName = async (value) => {
    handleChangeFilter({ customerName: value });
  };
  const debounceHandleSearch = debounce(handleSearchByName, 900);

  useEffect(() => {
    handleRefresh();
  }, [botId]);

  const handleRefresh = async () => {
    dispatch(setLoading(true));
    setSelectUsersRole({});
    setSelectedAllUserRoleQuery(false);
    setSelectedAllUserRoleUpdate(false);
    setAggregateUsers([]);
    setCountChange(0);
    fetchData({ pageNumber: 0, pageSize: limit }).finally(() => {
      dispatch(setLoading(false));
    });
    setPage(0);
  };

  useEffect(() => {
    let cloneSelectUserRole = { ...selectedUsersRole };
    const currentPage = Math.ceil(Object.keys(cloneSelectUserRole).length / limit);
    // if (currentPage === 0 || currentPage <= page) {
    users.forEach((item) => {
      cloneSelectUserRole = {
        ...cloneSelectUserRole,
        [item.userId]: {
          ...cloneSelectUserRole[item.userId],
          canQuery: cloneSelectUserRole[item.userId]?.canQuery ?? item.canQuery ?? false,
          canUpdate: cloneSelectUserRole[item.userId]?.canUpdate ?? item.canUpdate ?? false,
          canDelete: cloneSelectUserRole[item.userId]?.canDelete ?? item.canDelete ?? false,
          userId: item.userId,
          customerId: currentAdmin.customerId,
          botId: currentBotId,
        },
      };
    });
    setAggregateUsers((prev) => [...prev, ...users]);
    setSelectUsersRole((prev) => {
      return { ...prev, ...cloneSelectUserRole };
    });
    // }
    setSelectedAllUserRoleQuery(
      Object.keys(cloneSelectUserRole).length > 0
        ? users.every((item) => cloneSelectUserRole[item.userId]?.canQuery === true)
        : false
    );
    setSelectedAllUserRoleUpdate(
      Object.keys(cloneSelectUserRole).length > 0
        ? users.every((item) => cloneSelectUserRole[item.userId]?.canUpdate === true)
        : false
    );

    // } else {
    //   toast.error('please chose bot');
    // }
  }, [users]);

  const handleGrantPermissions = async () => {
    try {
      dispatch(setLoading(true));
      let dataChange = getChangedItems({ ...selectedUsersRole }, aggregateUsers);

      const response = await botsApi.grantUserToBot(dataChange.data);
      toast.success(t('Cập nhật thành công'));
      handleRefresh();
      // fetchData({ pageNumber: page, pageSize: limit });
    } catch (error) {
      toast.error(t('Cập nhật thất bại!'));
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  };
  const getChangedItems = (compareData, originalData) => {
    originalData.forEach((item) => {
      const state = compareData[item.userId];
      if (state) {
        if (
          state.canQuery === item.canQuery &&
          state.canUpdate === item.canUpdate &&
          state.canDelete === item.canDelete
        ) {
          delete compareData[item.userId];
        }
      }
    });

    return {
      data: Object.keys(compareData).map((key) => compareData[key]),
      count: Object.keys(compareData).length,
    };
  };
  return (
    <>
      <Card>
        <Box
          py={2}
          pl={1}
          pr={2}
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
          <Stack
            direction="row"
            gap={'10px'}
          >
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={handleGrantPermissions}
              disabled={countChange <= 0}
            >
              Áp dụng {countChange > 0 && `(${countChange})`}
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={handleRefresh}
              startIcon={<SyncOutlinedIcon fontSize="small" />}
            >
              Làm mới
            </Button>
          </Stack>
        </Box>
        <Divider />
        <>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{t('Username')}</TableCell>
                  <TableCell>{t('Email')}</TableCell>
                  <TableCell>
                    {t('Role chat')}
                    <Checkbox
                      checked={selectedAllUserRoleQuery}
                      onChange={(event) => handleSelectAllRole(event, 'canQuery')}
                      disabled={users.length === 0}
                    />{' '}
                  </TableCell>
                  <TableCell>
                    {t('Role training')}
                    <Checkbox
                      checked={selectedAllUserRoleUpdate}
                      onChange={(event) => handleSelectAllRole(event, 'canUpdate')}
                      disabled={users.length === 0}
                    />
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {isLoading ? (
                  <TableCell colSpan={4}>
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
                  </TableCell>
                ) : users.length === 0 ? (
                  <TableCell colSpan={4}>
                    <Box
                      sx={{ minHeight: '50vh' }}
                      display={'flex'}
                      justifyContent={'center'}
                      flexDirection={'column'}
                      alignItems={'center'}
                    >
                      {' '}
                      {botId && (
                        <img
                          style={{ width: '200px' }}
                          src="/src/assets/images/all-img/empty-data.png"
                        />
                      )}
                      <Typography
                        variant="h5"
                        color="text.secondary"
                        align="center"
                        sx={{
                          mt: 1,
                        }}
                        fontWeight={500}
                      >
                        {botId
                          ? t('Không có dữ liệu người dùng')
                          : t('Cần chọn một bot để thực hiện')}
                      </Typography>
                    </Box>
                  </TableCell>
                ) : (
                  users.map((user, index) => {
                    const userSelected = selectedUsersRole[user.userId];
                    return (
                      <TableRow
                        hover
                        key={user.userId}
                      >
                        <TableCell>
                          <Typography
                            noWrap
                            variant="subtitle2"
                          >
                            {user.username}
                          </Typography>
                        </TableCell>

                        <TableCell>
                          <Typography
                            noWrap
                            variant="subtitle2"
                          >
                            {user.email}
                          </Typography>
                        </TableCell>

                        <TableCell>
                          <Checkbox
                            checked={userSelected?.canQuery ?? false}
                            onChange={(event) =>
                              handleSelectOneRole(event, user.userId, {
                                canQuery: userSelected?.canQuery ? false : true,
                              })
                            }
                            value={userSelected?.canQuery ?? false}
                          />
                        </TableCell>

                        <TableCell>
                          <Checkbox
                            checked={userSelected?.canUpdate ?? false}
                            onChange={(event) =>
                              handleSelectOneRole(event, user.userId, {
                                canUpdate: userSelected?.canUpdate ? false : true,
                              })
                            }
                            value={userSelected?.canUpdate ?? false}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
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
              count={totalCount}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleLimitChange}
              page={page}
              rowsPerPage={limit}
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
        </>
      </Card>
    </>
  );
};

DecentralizationTable.propTypes = {
  field: PropTypes.array.isRequired,
};

DecentralizationTable.defaultProps = {
  field: [],
};

export default DecentralizationTable;
