import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import { IconButton, Tooltip } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import CreateRankingDialog from './create-ranking-dialog';

export const UpdateRank = ({ rank }) => {
  const { t } = useTranslation();

  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Tooltip
        title={t('Sửa')}
        arrow
      >
        <IconButton
          color="primary"
          onClick={() => setOpen(true)}
        >
          <EditTwoToneIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <CreateRankingDialog
        rank={rank}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
};
