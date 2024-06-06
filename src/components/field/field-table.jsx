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
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

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

const applyFilters = (field, query, filters) => {
  return field.filter((field) => {
    let matches = true;

    if (query.fieldInfo) {
      if (
        !field.fieldName.toLowerCase().includes(query.fieldInfo.toLowerCase()) &&
        !field.fieldCode.toLowerCase().includes(query.fieldInfo.toLowerCase())
      ) {
        matches = false;
      }
    }

    Object.keys(filters).forEach((key) => {
      const value = filters[key];
      if (value && field[key] !== value) {
        matches = false;
      }
    });

    return matches;
  });
};

const applyPagination = (field, page, limit) => {
  return field.slice(page * limit, page * limit + limit);
};

const FieldTable = ({ field }) => {
  const [selectedItems, setSelectedField] = useState([]);
  const { t } = useTranslation();
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(6);
  const [query, setQuery] = useState({
    fieldName: '',
    fieldInfo: '',
    tag: '',
  });
  const [filters, setFilters] = useState({
    fieldStatus: null,
    paymentStatus: null,
  });

  const fieldStatusOptions = [
    { id: 'all', name: 'Tất cả' },
    { id: 'unsynced', name: 'Chưa đồng bộ' },
    { id: 'synced', name: 'Đã đồng bộ' },
  ];

  const paymentStatusOptions = [
    { id: 'all', name: 'Tất cả' },
    { id: 'unpaid', name: 'Chưa thanh toán' },
    { id: 'paid', name: 'Đã thanh toán' },
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
    setSelectedField(event.target.checked ? field.map((field) => field.id) : []);
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
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
  };

  const filteredField = applyFilters(field, query, filters);
  const paginatedField = applyPagination(filteredField, page, limit);
  const selectedBulkActions = selectedItems.length > 0;
  const selectedSomeField = selectedItems.length > 0 && selectedItems.length < field.length;
  const selectedAllField = selectedItems.length === field.length;

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
            spacing={1}
            alignItems="center"
            flexWrap={"wrap"}
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
            // spacing={1}
            gap={'10px'}
          >
            <TextField
              size="small"
              style={{ width: 210 }}
              placeholder="Tên / Mã lĩnh vực"
              value={query.customerInfo}
              onChange={handleQueryChange('fieldInfo')}
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchTwoToneIcon />
                  </InputAdornment>
                ),
                endAdornment: query.customerInfo && (
                  <InputAdornment
                    
                    position="end"
                  >
                    <IconButton
                      color="error"
                      aria-label="clear input"
                      onClick={() => setQuery((prevQuery) => ({ ...prevQuery, fieldInfo: '' }))}
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
            <FormControl
              size="small"
              variant="outlined"
            >
              <Select
                value={filters.paymentStatus || 'all'}
                onChange={handleStatusChange('paymentStatus')}
                label=""
              >
                {paymentStatusOptions.map((statusOption) => (
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
            >
              Tìm kiếm
            </Button>
          </Stack>
        </Box>
        <Divider />

        {paginatedField.length === 0 ? (
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
                  {paginatedField.map((field, index) => {
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
                            variant="body2"
                          >
                            {field.fieldName}
                          </Typography>
                        </TableCell>

                        <TableCell>
                          <Typography
                            noWrap
                            variant="body2"
                          >
                            {field.fieldCode}
                          </Typography>
                        </TableCell>

                        <TableCell>
                          {field.tags.map((tag, index) => (
                            <Chip sx={{margin:'5px'}}
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
                            variant="body2"
                          >
                            {field.fieldStatus === 'unsynced' ? 'Chưa đồng bộ' : 'Đã đồng bộ'}
                          </Typography>
                        </TableCell>

                        <TableCell align="center">
                          <Typography noWrap>
                            <Tooltip
                              title={t('Sửa')}
                              arrow
                            >
                              <IconButton
                                color="primary"
                                onClick={() => console.log('Sửa', field.id)}
                              >
                                <EditTwoToneIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip
                              title={t('Xóa')}
                              arrow
                            >
                              <IconButton
                                color="error"
                                onClick={() => console.log('Xóa', field.id)}
                              >
                                <DeleteTwoToneIcon fontSize="small" />
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
                count={filteredField.length}
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
