import { DeleteRounded } from '@mui/icons-material';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import LaunchTwoToneIcon from '@mui/icons-material/LaunchTwoTone';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import {
  alpha,
  Box,
  Button,
  Card,
  Checkbox,
  Divider,
  FormControl,
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

const applyFilters = (invoices, query, filters) => {
  return invoices.filter((invoice) => {
    let matches = true;

    if (query.invoiceNumber) {
      if (!invoice.invoiceNumber.toLowerCase().includes(query.invoiceNumber.toLowerCase())) {
        matches = false;
      }
    }

    Object.keys(filters).forEach((key) => {
      const value = filters[key];
      if (value && invoice[key] !== value) {
        matches = false;
      }
    });

    return matches;
  });
};

const applyPagination = (invoices, page, limit) => {
  return invoices.slice(page * limit, page * limit + limit);
};

const InvoicesTable = ({ invoices }) => {
  const [selectedItems, setSelectedInvoices] = useState([]);
  const { t } = useTranslation();
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(6);
  const [query, setQuery] = useState({
    invoiceNumber: '',
  });
  const [filters, setFilters] = useState({
    invoiceStatus: null,
    paymentStatus: null,
  });

  const invoiceStatusOptions = [
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

  const handleSelectAllInvoices = (event) => {
    setSelectedInvoices(event.target.checked ? invoices.map((invoice) => invoice.id) : []);
  };

  const handleSelectOneInvoice = (_event, invoiceId) => {
    if (!selectedItems.includes(invoiceId)) {
      setSelectedInvoices((prevSelected) => [...prevSelected, invoiceId]);
    } else {
      setSelectedInvoices((prevSelected) => prevSelected.filter((id) => id !== invoiceId));
    }
  };

  const handlePageChange = (_event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
  };

  const filteredInvoices = applyFilters(invoices, query, filters);
  const paginatedInvoices = applyPagination(filteredInvoices, page, limit);
  const selectedBulkActions = selectedItems.length > 0;
  const selectedSomeInvoices = selectedItems.length > 0 && selectedItems.length < invoices.length;
  const selectedAllInvoices = selectedItems.length === invoices.length;

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
        >
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
          >
            <Checkbox
              checked={selectedAllInvoices}
              indeterminate={selectedSomeInvoices}
              onChange={handleSelectAllInvoices}
              disabled={paginatedInvoices.length === 0}
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
                  <b>{paginatedInvoices.length}</b> <b>{t('hóa đơn')}</b>
                </Box>
              </>
            )}
          </Stack>
          <Stack
            direction="row"
            spacing={1}
          >
            <TextField
              size="small"
              placeholder="Số hóa đơn"
              value={query.invoiceNumber}
              onChange={handleQueryChange('invoiceNumber')}
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchTwoToneIcon />
                  </InputAdornment>
                ),
                endAdornment: query.invoiceNumber && (
                  <InputAdornment
                    sx={{
                      mr: -0.7,
                    }}
                    position="end"
                  >
                    <IconButton
                      color="error"
                      aria-label="clear input"
                      onClick={() => setQuery((prevQuery) => ({ ...prevQuery, invoiceNumber: '' }))}
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
                value={filters.invoiceStatus || 'all'}
                onChange={handleStatusChange('invoiceStatus')}
                label=""
              >
                {invoiceStatusOptions.map((statusOption) => (
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

        {paginatedInvoices.length === 0 ? (
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
            {t("We couldn't find any invoices matching your search criteria")}
          </Typography>
        ) : (
          <>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>{t('#')}</TableCell>
                    <TableCell>{t('Số hóa đơn')}</TableCell>
                    <TableCell>{t('Tên khách hàng')}</TableCell>
                    <TableCell>{t('Mã khách hàng')}</TableCell>
                    <TableCell>{t('Số hợp đồng')}</TableCell>
                    <TableCell>{t('Số tiền thanh toán')}</TableCell>
                    <TableCell>{t('Trạng thái hóa đơn')}</TableCell>
                    <TableCell>{t('Trạng thái thanh toán')}</TableCell>
                    <TableCell>{t('Ngày tạo')}</TableCell>
                    <TableCell align="center">{t('Hành động')}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedInvoices.map((invoice, index) => {
                    const isInvoiceSelected = selectedItems.includes(invoice.id);
                    return (
                      <TableRow
                        hover
                        key={invoice.id}
                        selected={isInvoiceSelected}
                      >
                        <TableCell>
                          <Checkbox
                            checked={isInvoiceSelected}
                            onChange={(event) => handleSelectOneInvoice(event, invoice.id)}
                            value={isInvoiceSelected}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography
                            noWrap
                            variant="subtitle2"
                          >
                            {invoice.invoiceNumber}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            noWrap
                            variant="subtitle2"
                          >
                            {invoice.customerName}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            noWrap
                            variant="subtitle2"
                          >
                            {invoice.customerCode}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            noWrap
                            variant="subtitle2"
                          >
                            {invoice.contractNumber}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            variant="h6"
                            fontWeight={600}
                          >
                            {numeral(invoice.amount).format('0,0')}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            noWrap
                            variant="subtitle2"
                          >
                            {invoice.invoiceStatus === 'unsynced' ? 'Chưa đồng bộ' : 'Đã đồng bộ'}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            noWrap
                            variant="subtitle2"
                          >
                            {invoice.paymentStatus === 'unpaid'
                              ? 'Chưa thanh toán'
                              : 'Đã thanh toán'}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            noWrap
                            variant="subtitle2"
                          >
                            {format(new Date(invoice.creationDate), 'dd/MM/yyyy')}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography noWrap>
                            <Tooltip
                              title={t('Xem')}
                              arrow
                            >
                              <IconButton
                                color="primary"
                                onClick={() => console.log('Sửa', invoice.id)}
                              >
                                <LaunchTwoToneIcon fontSize="small" />
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
                count={filteredInvoices.length}
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

InvoicesTable.propTypes = {
  invoices: PropTypes.array.isRequired,
};

InvoicesTable.defaultProps = {
  invoices: [],
};

export default InvoicesTable;
