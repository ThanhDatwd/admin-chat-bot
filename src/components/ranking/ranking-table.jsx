import { DeleteTwoTone as DeleteIcon, EditTwoTone as EditIcon } from '@mui/icons-material';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import {
  Box,
  Button,
  Card,
  IconButton,
  InputAdornment,
  Stack,
  Switch,
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
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DialogConfirmDelete from '../common/dialog-confirm-delete';
import { UpdateRank } from './update-ranking';

const RankingTable = ({ rankings }) => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddRank = () => {
    console.log('Add new rank');
  };

  const handleEditRank = (id) => {
    console.log('Edit rank with id:', id);
  };

  const handleDeleteRank = (id) => {
    console.log('Delete rank with id:', id);
  };

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
        </Stack>{' '}
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>STT</TableCell>
              <TableCell>Tên rank</TableCell>
              <TableCell>Điểm bắt đầu rank</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Ngày tạo</TableCell>
              <TableCell align="center">Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rankings
              .filter((rank) => rank.name.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((rank, index) => (
                <TableRow key={rank.id}>
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
                      {rank.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      noWrap
                      variant="subtitle2"
                    >
                      {rank.startingPoints}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      noWrap
                      variant="subtitle2"
                    >
                      {rank.status}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      noWrap
                      variant="subtitle2"
                    >
                      {rank.creationDate}
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
                          onClick={() => console.log('Sửa')}
                        >
                          <Switch
                            defaultChecked
                            id="switch-spatial-audio"
                          />
                        </IconButton>
                      </Tooltip>
                      <UpdateRank rank={rank} />
                      <DialogConfirmDelete onConfirm={() => {}} />
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

export default RankingTable;
