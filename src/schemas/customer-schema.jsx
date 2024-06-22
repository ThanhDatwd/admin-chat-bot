import { z } from 'zod';

const customerSchema = z.object({
  customerName: z
    .string()
    .min(1, { message: 'Tên tổ là bắt buộc' })
    .max(500,{message:"Tên tổ chức không được quá 500 ký tự"})
    .transform((val) => val.trim())
    .refine((val) => val !== '', { message: 'Tên tổ chức không hợp lệ' }),
  email: z
    .string()
    .min(1, 'Email là bắt buộc')
    .max(500,{message:"Email không được quá 500 ký tự"})
    .email({ message: 'Địa chỉ email không hợp lệ' })
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
      message: 'Địa chỉ email không hợp lệ',
    })
    .transform((val) => val.trim())
    .refine((val) => val !== '', { message: 'Địa chỉ email không hợp lệ' }),
  website: z.string().optional(),
  phoneNumber: z
    .string()
    .min(1, { message: 'Số điện thoại là bắt buộc' })
    .max(500,{message:"Số điện thoại không được quá 20 ký tự"})
    .transform((val) => val.trim())
    .refine((val) => val !== '', { message: 'Số điện thoại không hợp lệ' }),
  representative: z
    .string()
    .min(1, { message: 'Người đại diện là bắt buộc' })
    .max(500,{message:"Người đại diện không được quá 500 ký tự"})
    .transform((val) => val.trim())
    .refine((val) => val !== '', { message: 'Người đại diện không hợp lệ' }),
  taxCode: z
    .string()
    .min(1, { message: 'Mã số thuế là bắt buộc' })
    .max(500,{message:"Mã số thuế không được quá 500 ký tự"})
    .transform((val) => val.trim())
    .refine((val) => val !== '', { message: 'Mã số thuế không hợp lệ' }),
});

export default customerSchema;
