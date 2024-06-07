import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import { IconButton, Tooltip } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import CreateFieldDialog from './create-field-dialog';

export const UpdateField = ({field}) => {
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
      <CreateFieldDialog
      field={field}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
};
