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
import CreateFieldDialog from './create-field-dialog';
import { UpdateField } from './update-field';

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

const applyPagination = (fields, page, limit) => {
  return fields.slice(page * limit, page * limit + limit);
};

const FieldTable = ({ fields = [], fetchData, totalCount }) => {
  const dispatch = useDispatch();

  const [selectedItems, setSelectedField] = useState([]);
  const { t } = useTranslation();
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(6);
  const [query, setQuery] = useState();
  const [searchValue, setSearchValue] = useState('');

  const [filters, setFilters] = useState({
    fieldStatus: null,
    paymentStatus: null,
  });

  const isLoading = useSelector((state) => state.common.loading);
  const isRefresh = useSelector((state) => state.common.refresh);

  const paginatedField = applyPagination(fields, page, limit);
  const selectedBulkActions = selectedItems.length > 0;
  const selectedSomeField = selectedItems.length > 0 && selectedItems.length < fields.length;
  const selectedAllField = selectedItems.length === fields.length;

  const fieldStatusOptions = [
    { id: 'all', name: 'Tất cả' },
    { id: 'active', name: 'Hoạt động' },
    { id: 'inactive', name: 'Không hoạt động' },
  ];

  const handleQueryChange = (field) => (event) => {
    setQuery((prevQuery) => ({
      ...prevQuery,
      [field]: event.target.value,
    }));
  };

  const handleStatusChange = (field) => (event) => {
    let value = null;
    if (event.target.value !== 'all') {
      value = event.target.value;
    }
    setFilters((prevFilters) => ({
      ...prevFilters,
      [field]: value,
    }));
  };

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
  const handleDeleteField = async (customerId) => {
    try {
      // const response = await customersApi.deleteCustomer(customerId);

      // toast.success(t(response.data));
      dispatch(setRefresh(!isRefresh));
    } catch (error) {
      toast.error(t('Something wrong please try again!'));
      console.log(error);
    }
  };

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
            <Checkbox
              checked={selectedAllField}
              indeterminate={selectedSomeField}
              onChange={handleSelectAllField}
              disabled={paginatedField.length === 0}
            />
            {selectedBulkActions ? (
              <ButtonSoft
                color="error"
                variant="contained"
                size="small"
                startIcon={<DeleteRounded />}
              >
                Delete selected
              </ButtonSoft>
            ) : (
              <>
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
                  <b>{paginatedField.length}</b> <b>{t('lĩnh vực')}</b>
                </Box>
              </>
            )}
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
            <FormControl
              size="small"
              variant="outlined"
            >
              <Select
                value={filters.fieldStatus || 'all'}
                onChange={handleStatusChange('fieldStatus')}
                label=""
              >
                {fieldStatusOptions.map((statusOption) => (
                  <MenuItem
                    key={statusOption.id}
                    value={statusOption.id}
                  >
                    {statusOption.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

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
                    <TableCell>{t('#')}</TableCell>
                    <TableCell>{t('Tên lĩnh vực')}</TableCell>
                    <TableCell>{t('Mã lĩnh vực')}</TableCell>
                    <TableCell>{t('Tag')}</TableCell>
                    <TableCell>{t('Trạng thái')}</TableCell>
                    <TableCell align="center">{t('Hành động')}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {fields.map((field, index) => {
                    const isInvoiceSelected = selectedItems.includes(field.id);
                    return (
                      <TableRow
                        hover
                        key={field.id}
                        selected={isInvoiceSelected}
                      >
                        <TableCell>
                          <Checkbox
                            checked={isInvoiceSelected}
                            onChange={(event) => handleSelectOneInvoice(event, field.id)}
                            value={isInvoiceSelected}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography
                            noWrap
                            variant="subtitle2"
                          >
                            {field.fieldName}
                          </Typography>
                        </TableCell>

                        <TableCell>
                          <Typography
                            noWrap
                            variant="subtitle2"
                          >
                            {field.fieldCode}
                          </Typography>
                        </TableCell>

                        <TableCell>
                          {field.tags.map((tag, index) => (
                            <Chip
                              sx={{ margin: '5px' }}
                              key={index}
                              label={tag}
                              size="small"
                              variant="outlined"
                            />
                          ))}
                        </TableCell>
                        <TableCell>
                          <Typography
                            noWrap
                            variant="subtitle2"
                          >
                            {field.status === 'inactive' ? 'Không hoat động' : 'Hoạt động'}
                          </Typography>
                        </TableCell>

                        <TableCell align="center">
                          <Typography noWrap>
                            <UpdateField field={field} />
                            <DialogConfirmDelete onConfirm={() => handleDeleteField(field?.id)} />
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
