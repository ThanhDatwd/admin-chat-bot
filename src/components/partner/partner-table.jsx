import { DeleteRounded } from '@mui/icons-material';
import HowToRegTwoToneIcon from '@mui/icons-material/HowToRegTwoTone';
import LockTwoToneIcon from '@mui/icons-material/LockTwoTone';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import {
  Box,
  Card,
  Checkbox,
  FormControl,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ButtonSoft } from '../base/styles/button-soft';
import ApprovePartnerDialog from './approve-partner-dialog';
import LockPartnerDialog from './lock-partner-dialog';

const statusOptions = [
  { id: 'all', name: 'Tất cả' },
  { id: 'init', name: 'Khởi tạo' },
  { id: 'pending', name: 'Chờ duyệt' },
  { id: 'approved', name: 'Đã duyệt' },
  { id: 'embedded', name: 'Đã nạp' },
  { id: 'locked', name: 'Khóa' },
];

const getStatusName = (statusId) => {
  const status = statusOptions.find((option) => option.id === statusId);
  return status ? status.name : statusId;
};

const PartnerTable = ({ partners }) => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [filters, setFilters] = useState({
    status: 'all',
  });

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedItems.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedItems, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedItems.slice(1));
    } else if (selectedIndex === selectedItems.length - 1) {
      newSelected = newSelected.concat(selectedItems.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedItems.slice(0, selectedIndex),
        selectedItems.slice(selectedIndex + 1)
      );
    }

    setSelectedItems(newSelected);
  };

  const handleSelectAllPartners = (event) => {
    setSelectedItems(event.target.checked ? partners.map((p) => p.id) : []);
  };

  const handleStatusChange = (e) => {
    let value = e.target.value;
    setFilters((prevFilters) => ({
      ...prevFilters,
      status: value,
    }));
  };

  const isSelected = (id) => selectedItems.indexOf(id) !== -1;
  const selectedBulkActions = selectedItems.length > 0;
  const selectedSomePartners = selectedItems.length > 0 && selectedItems.length < partners.length;
  const selectedAllPartners = selectedItems.length === partners.length;

  const filteredPartners = partners.filter((partner) => {
    const matchesStatus = filters.status === 'all' || partner.accountStatus === filters.status;
    const matchesSearchTerm = partner.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearchTerm;
  });

  return (
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
            checked={selectedAllPartners}
            indeterminate={selectedSomePartners}
            onChange={handleSelectAllPartners}
            disabled={partners.length === 0}
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
                <b>{partners.length}</b> <b>{t('đối tác')}</b>
              </Box>
            </>
          )}
        </Stack>
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
        >
          <FormControl
            size="small"
            variant="outlined"
          >
            <Select
              value={filters.status}
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
            placeholder="Tìm kiếm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchTwoToneIcon />
                </InputAdornment>
              ),
            }}
          />
        </Stack>
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell></TableCell>
              <TableCell>Tên đối tác</TableCell>
              <TableCell>Email/SĐT liên hệ</TableCell>
              <TableCell>Số hợp đồng</TableCell>
              <TableCell>Lĩnh vực</TableCell>
              <TableCell>Số bot sở hữu</TableCell>
              <TableCell>Trạng thái tài khoản</TableCell>
              <TableCell>Ngày tạo</TableCell>
              <TableCell align="center">Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPartners.map((partner, index) => (
              <TableRow
                hover
                key={partner.id}
                selected={isSelected(partner.id)}
              >
                <TableCell>
                  <Typography
                    noWrap
                    variant="subtitle2"
                  >
                    <Checkbox
                      onClick={(event) => handleSelectOne(event, partner.id)}
                      checked={isSelected(partner.id)}
                    />
                  </Typography>
                </TableCell>
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
                    {partner.name}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    noWrap
                    variant="subtitle2"
                  >
                    <div>{partner.email}</div>
                    <div>{partner.phoneNumber}</div>
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    noWrap
                    variant="subtitle2"
                  >
                    {partner.contractNumber}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    noWrap
                    variant="subtitle2"
                  >
                    {partner.field}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    noWrap
                    variant="subtitle2"
                  >
                    {partner.botCount}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    noWrap
                    variant="subtitle2"
                  >
                    {getStatusName(partner.accountStatus)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    noWrap
                    variant="subtitle2"
                  >
                    {partner.creationDate}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography noWrap>
                    <ApprovePartnerDialog />
                    <LockPartnerDialog />
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default PartnerTable;
