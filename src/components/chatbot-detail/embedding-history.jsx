import ArchiveTwoToneIcon from '@mui/icons-material/ArchiveTwoTone';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import LaunchTwoToneIcon from '@mui/icons-material/LaunchTwoTone';
import TextSnippetTwoToneIcon from '@mui/icons-material/TextSnippetTwoTone';
import {
  alpha,
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  IconButton,
  Link,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { formatDistance, subDays } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { deleteFileByBot, downloadFile, fetchUserFiles } from 'src/api/files';
import fileIcon from '../base/fileIcon';
import { ButtonIcon } from '../base/styles/button-icon';
import DialogConfirmDelete from '../common/dialog-confirm-delete';
import toast from 'react-hot-toast';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';

const EmbeddingHistory = ({ tableData }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const { id } = useParams();
  const currentAdmin = useSelector((state) => state.auth.admin);
  const [sortConfig, setSortConfig] = useState({
    key: 'dateCreated',
    direction: 'ascending',
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);

  const handleChangePage = (_event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const sortData = (data, config) => {
    return [...data].sort((a, b) => {
      if (a[config.key] < b[config.key]) {
        return config.direction === 'ascending' ? -1 : 1;
      }
      if (a[config.key] > b[config.key]) {
        return config.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  };

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({
      key,
      direction,
    });
  };

  const renderSortIcon = (columnName) => {
    if (sortConfig.key !== columnName) return null;
    return sortConfig.direction === 'ascending' ? (
      <ExpandMoreRoundedIcon
        sx={{
          color: 'text.secondary',
        }}
        fontSize="small"
      />
    ) : (
      <ExpandLessRoundedIcon
        sx={{
          color: 'text.secondary',
        }}
        fontSize="small"
      />
    );
  };

  const sortedData = sortData(tableData, sortConfig);
  const paginatedData = sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleDownload = async ({ fileKey, fileName }) => {
    try {
      await downloadFile({
        fileKey,
        fileName,
      });
    } catch (error) {
      console.error('Error fetching user files:', error);
    }
  };

  const handleDeleteFile = (fileId) => {
    try {
      const response = deleteFileByBot({
        botId: id,
        customerId: currentAdmin.customerId,
      });

      toast.success(t(response.data));
      // dispatch(setRefresh(!isRefresh));
    } catch (error) {
      toast.error(t('Something wrong please try again!'));
      console.log(error);
    }
  };

  return (
    <Card
      sx={{
        width: '100%',
      }}
    >
      <CardHeader
        titleTypographyProps={{
          variant: 'h4',
        }}
        title="Lịch sử training dữ liệu"
      />
      <Divider />
      <CardContent>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell onClick={() => requestSort('filename')}>
                  <Box
                    sx={{
                      cursor: 'pointer',
                    }}
                    display="flex"
                    alignItems="center"
                  >
                    {t('Tên file')} {renderSortIcon('filename')}
                  </Box>
                </TableCell>
                <TableCell onClick={() => requestSort('owner')}>
                  <Box
                    sx={{
                      cursor: 'pointer',
                    }}
                    display="flex"
                    alignItems="center"
                  >
                    {t('Người training')} {renderSortIcon('owner')}
                  </Box>
                </TableCell>
                <TableCell onClick={() => requestSort('owner')}>
                  <Box
                    sx={{
                      cursor: 'pointer',
                    }}
                    display="flex"
                    alignItems="center"
                  >
                    {t('Tags')} {renderSortIcon('owner')}
                  </Box>
                </TableCell>
                <TableCell onClick={() => requestSort('dateCreated')}>
                  <Box
                    sx={{
                      cursor: 'pointer',
                    }}
                    display="flex"
                    alignItems="center"
                  >
                    {t('Ngày tạo')} {renderSortIcon('dateCreated')}
                  </Box>
                </TableCell>
                <TableCell align="right">{t('Actions')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.map((row) => (
                <TableRow
                  key={row.id}
                  hover
                >
                  <TableCell>
                    <Box
                      display="flex"
                      alignItems="center"
                    >
                      {fileIcon(row.fileName)}
                      <Typography
                        sx={{
                          pl: 1,
                        }}
                        variant="h6"
                      >
                        {row.fileName}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box
                      display="flex"
                      alignItems="center"
                    >
                      {row.avatarUrl ? (
                        <Avatar
                          src={row.avatarUrl}
                          sx={{
                            mr: 1,
                            height: 28,
                            width: 28,
                          }}
                        />
                      ) : null}
                      <Link
                        href=""
                        onClick={(e) => e.preventDefault()}
                        underline="hover"
                        variant="h6"
                        noWrap
                        fontWeight={500}
                      >
                        {row.userId}
                      </Link>
                    </Box>
                  </TableCell>
                  <TableCell>
                          {row?.tags.map((tag, index) => (
                            <Chip
                              sx={{ margin: '5px' }}
                              key={tag.tagId}
                              label={tag.tagName}
                              size="small"
                              variant="outlined"
                            />
                          ))}
                        </TableCell>
                  <TableCell>
                    <Typography
                      variant="h6"
                      fontWeight={400}
                      noWrap
                    >
                      {formatDistance(new Date(row.createDate), new Date(), {
                        addSuffix: true,
                      })}
                    </Typography>
                  </TableCell>
                  <TableCell
                    sx={{
                      whiteSpace: 'nowrap',
                    }}
                    align="right"
                  >
                    {/* <Tooltip
                      title={t('Xem')}
                      arrow
                    >
                      <IconButton
                        sx={{
                          '&:hover': {
                            background: alpha(theme.palette.primary.main, 0.08),
                          },
                          color: theme.palette.primary.main,
                        }}
                        color="inherit"
                        size="small"
                        onClick={() =>
                          handleDownload({ fileKey: row?.objectId, fileName: row?.fileName })
                        }
                      >
                        <LaunchTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip> */}
                    <DialogConfirmDelete
                                  onConfirm={() => handleDeleteFile(row?.botId)}
                                />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <CardActions
          sx={{
            p: 2,
            '.MuiTablePagination-toolbar': {
              justifyContent: 'space-between',
            },
            '.MuiTablePagination-spacer': {
              display: 'none',
            },
          }}
        >
          <TablePagination
            component="div"
            count={tableData.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[3]}
            ActionsComponent={PaginationActions}
          />
        </CardActions>
      </CardContent>
    </Card>
  );
};

export const PaginationActions = ({ count, page, onPageChange }) => {
  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const smUp = useMediaQuery((theme) => theme.breakpoints.up('sm'));

  return (
    <Stack
      direction="row"
      spacing={1}
    >
      {smUp ? (
        <>
          <Button
            variant="outlined"
            color="secondary"
            size="small"
            onClick={handleBackButtonClick}
            disabled={page === 0}
          >
            Trang trước
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            size="small"
            onClick={handleNextButtonClick}
            disabled={page >= Math.ceil(count / 3) - 1}
          >
            Trang sau
          </Button>
        </>
      ) : (
        <>
          <ButtonIcon
            variant="outlined"
            color="secondary"
            size="small"
            onClick={handleBackButtonClick}
            disabled={page === 0}
            startIcon={<ChevronLeftRoundedIcon />}
          />
          <ButtonIcon
            variant="outlined"
            color="secondary"
            size="small"
            onClick={handleNextButtonClick}
            disabled={page >= Math.ceil(count / 3) - 1}
            startIcon={<ChevronRightRoundedIcon />}
          />
        </>
      )}
    </Stack>
  );
};

export default EmbeddingHistory;
