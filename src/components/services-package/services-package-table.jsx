import { DeleteRounded } from '@mui/icons-material';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
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
  Switch,
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
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { packageBasesApi } from 'src/api/package-base';
import UpdatePackageDialog from './update-package-dialog';

const ButtonSoft = styled(Button)(({ theme, color }) => {
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

const applyFilters = (packages, query, filters) => {
  return packages.filter((pkg) => {
    let matches = true;

    if (query) {
      const properties = ['pkgName', 'pkgDescription'];
      let containsQuery = false;
      properties.forEach((property) => {
        if (pkg[property].toLowerCase().includes(query.toLowerCase())) {
          containsQuery = true;
        }
      });
      if (!containsQuery) {
        matches = false;
      }
    }

    Object.keys(filters).forEach((key) => {
      const value = filters[key];
      if (value && pkg[key] !== value) {
        matches = false;
      }
    });

    return matches;
  });
};

const applyPagination = (packages, page, limit) => {
  return packages.slice(page * limit, page * limit + limit);
};

const ServicesPackageTable = ({
  loading,
  error,
  page,
  limit,
  packages,
  onPageChange,
  onRowsPerPageChange,
  onUpdate,
}) => {
  const [selectedItems, setSelectedPackages] = useState([]);
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({
    status: null,
  });

  const statusOptions = [
    { id: 'all', name: 'Tất cả' },
    { id: 'active', name: 'Hoạt động' },
    { id: 'inactive', name: 'Không hoạt động' },
    { id: 'deleted', name: 'Đã xóa' },
  ];

  const handleQueryChange = (event) => {
    event.persist();
    setQuery(event.target.value);
  };

  const handleStatusChange = (e) => {
    let value = null;
    if (e.target.value !== 'all') {
      value = e.target.value;
    }
    setFilters((prevFilters) => ({
      ...prevFilters,
      status: value,
    }));
  };

  const handleSelectAllPackages = (event) => {
    setSelectedPackages(event.target.checked ? packages.map((pkg) => pkg.pkgId) : []);
  };

  const handleSelectOnePackage = (_event, packageId) => {
    if (!selectedItems.includes(packageId)) {
      setSelectedPackages((prevSelected) => [...prevSelected, packageId]);
    } else {
      setSelectedPackages((prevSelected) => prevSelected.filter((id) => id !== packageId));
    }
  };

  const filteredPackages = applyFilters(packages, query, filters);
  const paginatedPackages = applyPagination(filteredPackages, page, limit);
  const selectedBulkActions = selectedItems.length > 0;
  const selectedSomePackages = selectedItems.length > 0 && selectedItems.length < packages.length;
  const selectedAllPackages = selectedItems.length === packages.length;

  if (loading) {
    return <Typography>{t('Loading...')}</Typography>;
  }

  if (error) {
    return <Typography>{t('Error fetching packages')}</Typography>;
  }

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
              checked={selectedAllPackages}
              indeterminate={selectedSomePackages}
              onChange={handleSelectAllPackages}
              disabled={paginatedPackages.length === 0}
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
                  <b>{paginatedPackages.length}</b> <b>{t('gói')}</b>
                </Box>
              </>
            )}
          </Stack>
          <Stack
            direction="row"
            spacing={1}
          >
            <FormControl
              size="small"
              variant="outlined"
            >
              <Select
                value={filters.status || 'all'}
                onChange={handleStatusChange}
                label=""
              >
                {statusOptions.map((statusOption) => (
                  <MenuItem
                    key={statusOption.id}
                    value={statusOption.id}
                  >
                    {statusOption.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              size="small"
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
              margin="none"
              onChange={handleQueryChange}
              placeholder={t('Tên gói hoặc Mã gói')}
              value={query}
              variant="outlined"
            />
          </Stack>
        </Box>
        <Divider />

        {paginatedPackages.length === 0 ? (
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
            {t("We couldn't find any packages matching your search criteria")}
          </Typography>
        ) : (
          <>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>{t('STT')}</TableCell>
                    <TableCell>{t('Tên gói')}</TableCell>
                    <TableCell>{t('Mã gói')}</TableCell>
                    <TableCell>{t('Phí dịch vụ ( VNĐ )')}</TableCell>
                    <TableCell>{t('Số lượng sử dụng')}</TableCell>
                    <TableCell>{t('Hạn đăng ký')}</TableCell>
                    <TableCell>{t('Trạng thái')}</TableCell>
                    <TableCell>{t('Ngày tạo')}</TableCell>
                    <TableCell align="center">{t('Hành động')}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedPackages.map((pkg, index) => {
                    const isPackageSelected = selectedItems.includes(pkg.pkgId);
                    return (
                      <TableRow
                        hover
                        key={pkg.pkgId}
                        selected={isPackageSelected}
                      >
                        <TableCell>
                          <Typography
                            noWrap
                            variant="subtitle2"
                          >
                            {index + 1}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            noWrap
                            variant="subtitle2"
                          >
                            {pkg.pkgName}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            noWrap
                            variant="subtitle2"
                          >
                            {pkg.pkgDescription}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            variant="h6"
                            fontWeight={600}
                          >
                            {numeral(pkg.amount).format('0,0')}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            noWrap
                            variant="subtitle2"
                          >
                            {pkg.request}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            noWrap
                            variant="subtitle2"
                          >
                            {format(new Date(pkg.endDate), 'dd/MM/yyyy')}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            noWrap
                            variant="subtitle2"
                          >
                            {pkg.status === 'ACTIVE'
                              ? 'Hoạt động'
                              : pkg.status === 'INACTIVE'
                                ? 'Không hoạt động'
                                : 'Đã xóa'}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            noWrap
                            variant="subtitle2"
                          >
                            {format(new Date(pkg.createDate), 'dd/MM/yyyy')}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography noWrap>
                            <Tooltip
                              title={t('Chuyển trạng thái')}
                              arrow
                            >
                              <IconButton
                                color="primary"
                                disabled={pkg.status !== 'ACTIVE'}
                                onClick={() => console.log('Sửa', pkg.pkgId)}
                              >
                                <Switch
                                  defaultChecked
                                  id="switch-spatial-audio"
                                />
                              </IconButton>
                            </Tooltip>
                            <UpdatePackageDialog
                              selectedItem={pkg}
                              onUpdate={onUpdate}
                            />
                            <Tooltip
                              title={t('Xóa')}
                              arrow
                            >
                              <IconButton
                                color="error"
                                onClick={() => console.log('Xóa', pkg)}
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
                count={filteredPackages.length}
                onPageChange={onPageChange}
                onRowsPerPageChange={onRowsPerPageChange}
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

ServicesPackageTable.propTypes = {
  packages: PropTypes.array,
};

ServicesPackageTable.defaultProps = {
  packages: [],
};

export default ServicesPackageTable;
