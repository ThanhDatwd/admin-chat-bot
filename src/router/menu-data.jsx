import ArchiveIcon from '@heroicons/react/24/outline/ArchiveBoxIcon';
import DocumentIcon from '@heroicons/react/24/outline/DocumentMagnifyingGlassIcon';
import ReportIcon from '@heroicons/react/24/outline/FlagIcon';
import HomeIcon from '@heroicons/react/24/outline/HomeIcon';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
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
            title: 'Home',
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
                <SmartToyOutlinedIcon />
              </Box>
            ),
            route: routes.chatbot,
          },
          {
            title: 'Customers',
            icon: (
              <Box
                width={24}
                height={24}
              >
                <PersonOutlineOutlinedIcon />
              </Box>
            ),
            route: routes.customer,
          },
          {
            title: 'Create account admin',
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
