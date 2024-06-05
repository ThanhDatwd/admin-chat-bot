import ArchiveIcon from '@heroicons/react/24/outline/ArchiveBoxIcon';
import DocumentIcon from '@heroicons/react/24/outline/DocumentMagnifyingGlassIcon';
import ReportIcon from '@heroicons/react/24/outline/FlagIcon';
import HomeIcon from '@heroicons/react/24/outline/HomeIcon';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import CorporateFareTwoToneIcon from '@mui/icons-material/CorporateFareTwoTone';
import FolderTwoToneIcon from '@mui/icons-material/FolderTwoTone';
import HandshakeTwoToneIcon from '@mui/icons-material/HandshakeTwoTone';
import LeaderboardTwoToneIcon from '@mui/icons-material/LeaderboardTwoTone';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import SmartToyTwoToneIcon from '@mui/icons-material/SmartToyTwoTone';
import { Box } from '@mui/material';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { routes } from 'src/router/routes';

export const useMenuItems = () => {
  const { t } = useTranslation();
  return useMemo(() => {
    return [
      {
        title: 'Dashboard',
        subMenu: [
          {
            title: t('Trang chủ'),
            icon: (
              <Box
                width={24}
                height={24}
              >
                <HomeIcon />
              </Box>
            ),
            route: routes.index,
          },
          {
            title: 'Another page',
            icon: (
              <Box
                width={24}
                height={24}
              >
                <ReportIcon />
              </Box>
            ),
            route: routes.pageExample,
          },
          {
            title: 'Chatbot',
            icon: (
              <Box
                width={24}
                height={24}
              >
                <SmartToyTwoToneIcon />
              </Box>
            ),
            route: routes.chatbot,
          },
          {
            title: t('Khách hàng tổ chức'),
            icon: (
              <Box
                width={24}
                height={24}
              >
                <CorporateFareTwoToneIcon />
              </Box>
            ),
            route: routes.customer,
          },
          {
            title: t('Người dùng'),
            icon: (
              <Box
                width={24}
                height={24}
              >
                <PersonOutlineOutlinedIcon />
              </Box>
            ),
            route: routes.user,
          },
          {
            title: t('Tạo tài khoản quản trị'),
            icon: (
              <Box
                width={24}
                height={24}
              >
                <AddBoxOutlinedIcon />
              </Box>
            ),
            route: routes.createAccountAdmin,
          },
          {
            title: 'Gói dịch vụ',
            icon: (
              <Box
                width={24}
                height={24}
              >
                <FolderTwoToneIcon />
              </Box>
            ),
            route: routes.servicesPackage,
          },
          {
            title: 'Hóa đơn',
            icon: (
              <Box
                width={24}
                height={24}
              >
                <ReceiptOutlinedIcon />
              </Box>
            ),
            route: routes.invoices,
          },
          {
            title: 'Xếp hạng',
            icon: (
              <Box
                width={24}
                height={24}
              >
                <LeaderboardTwoToneIcon />
              </Box>
            ),
            route: routes.ranking,
          },
          {
            title: 'Đối tác',
            icon: (
              <Box
                width={24}
                height={24}
              >
                <HandshakeTwoToneIcon />
              </Box>
            ),
            route: routes.partner,
          },
          {
            title: 'Dropdown menu',
            icon: (
              <Box
                width={24}
                height={24}
              >
                <DocumentIcon />
              </Box>
            ),
            subMenu: [
              {
                title: 'Listings',
                route: routes.dummy,
              },
              {
                title: 'Reviews',
                route: routes.dummy,
              },
              {
                title: 'Files',
                subMenu: [
                  {
                    title: 'Reports',
                    route: routes.dummy,
                  },
                  {
                    title: 'Logs',
                    route: routes.dummy,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        title: 'Archive',
        subMenu: [
          {
            title: 'Old Docs',
            icon: (
              <Box
                width={24}
                height={24}
              >
                <ArchiveIcon />
              </Box>
            ),
            route: routes.dummy,
          },
        ],
      },
    ];
  }, [t]);
};
