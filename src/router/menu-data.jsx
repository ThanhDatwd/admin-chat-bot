import HomeIcon from '@heroicons/react/24/outline/HomeIcon';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import CorporateFareTwoToneIcon from '@mui/icons-material/CorporateFareTwoTone';
import FolderTwoToneIcon from '@mui/icons-material/FolderTwoTone';
import HandshakeTwoToneIcon from '@mui/icons-material/HandshakeTwoTone';
import LeaderboardTwoToneIcon from '@mui/icons-material/LeaderboardTwoTone';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import RuleIcon from '@mui/icons-material/Rule';
import SmartToyTwoToneIcon from '@mui/icons-material/SmartToyTwoTone';
import TopicIcon from '@mui/icons-material/Topic';
import { Box } from '@mui/material';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ROLE } from 'src/constants/role';
import { routes } from './routes';

export const useMenuItems = (currentRole) => {
  const { t } = useTranslation();

  const filterMenuItemsByRole = (menuItems, roles) => {
    return menuItems
      .map((menu) => ({
        ...menu,
        subMenu: menu.subMenu.filter((item) => roles.some((role) => item.roles.includes(role))),
      }))
      .filter((menu) => menu.subMenu.length > 0);
  };

  const allMenuItems = useMemo(() => {
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
            roles: [ROLE.SUPER_ADMIN, ROLE.ADMIN, ROLE.ORG_ADMIN],
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
            roles: [ROLE.SUPER_ADMIN, ROLE.ADMIN, ROLE.ORG_ADMIN],
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
            roles: [ROLE.SUPER_ADMIN, ROLE.ADMIN],
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
            roles: [ROLE.SUPER_ADMIN, ROLE.ADMIN, ROLE.ORG_ADMIN],
          },
          {
            title: t('Gán quyền'),
            icon: (
              <Box
                width={24}
                height={24}
              >
                <RuleIcon />
              </Box>
            ),
            route: routes.decentralization,
            roles: [ROLE.SUPER_ADMIN, ROLE.ADMIN, ROLE.ORG_ADMIN],
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
            roles: [ROLE.SUPER_ADMIN, ROLE.ADMIN],
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
            roles: [ROLE.SUPER_ADMIN, ROLE.ADMIN],
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
            roles: [ROLE.SUPER_ADMIN, ROLE.ADMIN],
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
            roles: [ROLE.SUPER_ADMIN, ROLE.ADMIN],
          },
          {
            title: 'Lĩnh vực',
            icon: (
              <Box
                width={24}
                height={24}
              >
                <TopicIcon />
              </Box>
            ),
            route: routes.field,
            roles: [ROLE.SUPER_ADMIN, ROLE.ADMIN],
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
            roles: [ROLE.SUPER_ADMIN, ROLE.ADMIN],
          },
        ],
      },
    ];
  }, [t]);

  return useMemo(
    () => filterMenuItemsByRole(allMenuItems, currentRole),
    [allMenuItems, currentRole]
  );
};
