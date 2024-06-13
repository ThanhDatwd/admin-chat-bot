import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import QRCode from 'qrcode.react';
import { useState } from 'react';

const PaymentEmbedChatbot = () => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleListItemClick = (item) => {
    handleClose();
  };

  const invoiceNumber = '123456';
  const bankInfo = {
    bankName: 'Ngân hàng X',
    accountNumber: '123456789',
    paymentAmount: '500,000 VNĐ',
    invoiceNumber: invoiceNumber,
  };

  return (
    <>
      <Button
        variant="contained"
        color="success"
        onClick={() => handleClickOpen()}
      >
        Payment
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="basic-dialog-title"
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle id="basic-dialog-title">Thanh toán</DialogTitle>
        <DialogContent>
          <Typography variant="h6">Thông tin phí</Typography>
          <Typography>Số file / dung lượng nạp: 10 files / 500MB</Typography>
          <Typography>Phí chi trả: 500,000 VNĐ</Typography>

          <Typography
            variant="h6"
            style={{ marginTop: '20px' }}
          >
            Mã QR
          </Typography>
          <Box
            display="flex"
            justifyContent="center"
            style={{ margin: '20px' }}
          >
            <QRCode
              value={`bank:${bankInfo.bankName};account:${bankInfo.accountNumber};amount:${bankInfo.paymentAmount};invoice:${bankInfo.invoiceNumber}`}
              size={300}
            />
          </Box>
          <Typography>- Phí cần thanh toán: {bankInfo.paymentAmount}</Typography>
          <Typography>- Nội dung chuyển khoản: Số hóa đơn {bankInfo.invoiceNumber}</Typography>

          <Typography variant="body2">
            Chú ý: Nội dung chuyển khoản bắt buộc chứa Số hóa đơn
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            color="primary"
          >
            Quay lại
          </Button>
          <Button
            onClick={handleClose}
            color="primary"
          >
            Tiếp tục
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PaymentEmbedChatbot;
