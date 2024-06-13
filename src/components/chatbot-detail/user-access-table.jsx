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
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { downloadFile, fetchUserFiles } from 'src/api/files';
import { usersApi } from 'src/api/user';
import { useRefMounted } from 'src/hooks/use-ref-mounted';
import fileIcon from '../base/fileIcon';
import { ButtonIcon } from '../base/styles/button-icon';
import DecentralizationTable from '../decentralization/decentralization-table';

const UserAccessTable = ({ botId }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMountedRef = useRefMounted();
  const currentAdmin = useSelector((state) => state.auth.admin);
  const isRefresh = useSelector((state) => state.common.refresh);

  const [totalCount, setTotalCount] = useState(0);
  const [users, setUsers] = useState([]);

  const getUserByOrg = useCallback(
    async (paginate, filter) => {
      if (botId) {
        try {
          const response = await usersApi.getUserWithGranted({
            customerId: currentAdmin.customerId,
            botId: botId,
            pagination: {
              pageNumber: paginate.pageNumber,
              pageSize: paginate.pageSize,
            },
          });
          if (isMountedRef()) {
            setUsers(response.content);
            setTotalCount(response.totalElements);
          }
        } catch (err) {
          console.error(err);
        }
      } else {
        setUsers([]);
      }
    },
    [isMountedRef, isRefresh, botId]
  );
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
        title="Danh sách người dùng được truy cập Bot"
      />
      <Divider />
      <CardContent>
        <DecentralizationTable
          totalCount={totalCount}
          users={users}
          botId={botId}
          fetchData={getUserByOrg}
        />
      </CardContent>
    </Card>
  );
};

export default UserAccessTable;
