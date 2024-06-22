import { useTheme } from '@emotion/react';
import { Image } from '@mui/icons-material';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import TopicIcon from '@mui/icons-material/Topic';
import {
  alpha,
  Avatar,
  Box,
  Button,
  Card,
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
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from 'src/slices/common';
import { AvatarState } from '../base/styles/avatar';

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

const FieldTable = ({ fields = [], fetchData, totalCount }) => {
  const dispatch = useDispatch();

  const [selectedItems, setSelectedField] = useState([]);
  const { t } = useTranslation();
  const theme = useTheme();

  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(15);
  const [searchValue, setSearchValue] = useState('');

  const [filters, setFilters] = useState({
    fieldStatus: null,
    paymentStatus: null,
  });

  const isLoading = useSelector((state) => state.common.loading);
  const isRefresh = useSelector((state) => state.common.refresh);

  const handleSelectAllField = (event) => {
    setSelectedField(event.target.checked ? fields.map((field) => field.id) : []);
  };

  const handleSelectOneInvoice = (_event, fieldId) => {
    if (!selectedItems.includes(fieldId)) {
      setSelectedField((prevSelected) => [...prevSelected, fieldId]);
    } else {
      setSelectedField((prevSelected) => prevSelected.filter((id) => id !== fieldId));
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
      ).finally(() => dispatch(setLoading(false)));
    }
  };

  const handleSearchByName = async (value) => {
    handleChangeFilter({ customerName: value });
  };
  const debounceHandleSearch = debounce(handleSearchByName, 900);

  useEffect(() => {
    fetchData({ pageNumber: page, pageSize: limit });
  }, [isRefresh]);

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
            alignItems="center"
            flexWrap={'wrap'}
          >
            <Box>
              <Typography
                sx={{
                  display: {
                    xs: 'none',
                    md: 'inline-flex',
                  },
                }}
                component="span"
                variant="subtitle1"
              >
                {t('Hiển thị')}:
              </Typography>{' '}
              <b>{fields.length}</b> <b>{t('lĩnh vực')}</b>
            </Box>
          </Stack>
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
        ) : fields.length === 0 ? (
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
            {t("We couldn't find any field matching your search criteria")}
          </Typography>
        ) : (
          <>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>{t('Ảnh')}</TableCell>
                    <TableCell>{t('Tên lĩnh vực')}</TableCell>
                    <TableCell>{t('Ngày tạo')}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {fields.map((field, index) => {
                    const isInvoiceSelected = selectedItems.includes(field.id);
                    return (
                      <TableRow
                        hover
                        key={field.knowId}
                        selected={isInvoiceSelected}
                      >
                        <TableCell>
                          {!field.icon ? (
                            <AvatarState
                              isSoft
                              variant="rounded"
                              state="primary"
                              sx={{
                                height: theme.spacing(4),
                                width: theme.spacing(4),
                                svg: {
                                  height: theme.spacing(2),
                                  width: theme.spacing(2),
                                  minWidth: theme.spacing(2),
                                },
                              }}
                            >
                              <TopicIcon />
                            </AvatarState>
                          ) : (
                            <Image
                              sx={{
                                height: theme.spacing(4),
                                width: theme.spacing(4),
                              }}
                              src={field.icon}
                            />
                          )}
                        </TableCell>
                        <TableCell>
                          <Typography
                            noWrap
                            variant="subtitle2"
                          >
                            {field.knowName}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            noWrap
                            variant="subtitle2"
                          >
                            {format(new Date(field.createDate), 'dd-MM-yyyy')}
                          </Typography>
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
                count={fields.length}
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
          </>
        )}
      </Card>
    </>
  );
};

FieldTable.propTypes = {
  field: PropTypes.array.isRequired,
};

FieldTable.defaultProps = {
  field: [],
};

export default FieldTable;
