import { z } from 'zod';

 const customerSchema = z.object({
  customerName: z
    .string()
    .min(1, { message: 'Tên tổ là bắt buộc' }),
  email: z
    .string()
    .min(1, 'Email là bắt buộc')
    .email({ message: 'Địa chỉ email không hợp lệ' })
    .regex(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/, { message: 'Địa chỉ email không hợp lệ' }),
  website: z.string().optional(),
  phoneNumber: z.string().min(1, { message: 'Số điện thoại là bắt buộc' }),
  houseNumber: z.string().min(1, { message: 'Số nhà là bắt buộc' }),
  representative: z.string().min(1, { message: 'Người diện là bắt buộc' }),
  taxCode: z.string().min(1, { message: 'Mã số thuế là bắt buộc' }),
  address: z.string().min(1, { message: 'Địa chỉ là bắt buộc' }),
  village: z.number().int().positive({ message: 'Xã / Phường là bắt buộc' }),
  district: z.number().int().positive({ message: 'Quận / Huyện là bắt buộc' }),
  province: z.number().int().positive({ message: 'Tỉnh / Thành phố là bắt buộc' }),
});

export default customerSchema