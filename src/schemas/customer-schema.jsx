import { z } from 'zod';

const customerSchema = z.object({
  customerName: z
    .string()
    .min(1, { message: 'Tên tổ là bắt buộc' })
    .transform((val) => val.trim())
    .refine((val) => val !== '', { message: 'Tên tổ chức không hợp lệ' }),
  email: z
    .string()
    .min(1, 'Email là bắt buộc')
    .email({ message: 'Địa chỉ email không hợp lệ' })
    .regex(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/, { message: 'Địa chỉ email không hợp lệ' })
    .transform((val) => val.trim())
    .refine((val) => val !== '', { message: 'Địa chỉ email không hợp lệ' }),
  website: z.string().optional(),
  phoneNumber: z
    .string()
    .min(1, { message: 'Số điện thoại là bắt buộc' })
    .transform((val) => val.trim())
    .refine((val) => val !== '', { message: 'Số điện thoại không hợp lệ' }),
  representative: z
    .string()
    .min(1, { message: 'Người đại diện là bắt buộc' })
    .transform((val) => val.trim())
    .refine((val) => val !== '', { message: 'Người đại diện không hợp lệ' }),
  taxCode: z
    .string()
    .min(1, { message: 'Mã số thuế là bắt buộc' })
    .transform((val) => val.trim())
    .refine((val) => val !== '', { message: 'Mã số thuế không hợp lệ' }),
});


export default customerSchema;
