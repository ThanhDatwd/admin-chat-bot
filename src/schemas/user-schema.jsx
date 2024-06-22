import { OPTION_CUSTOMER } from 'src/constants/user';
import { z } from 'zod';

const userBaseSchema = z.object({
  userType: z.string().min(1, { message: 'Loại người dùng là bắt buộc' }),
  username: z
    .string()
    .regex(/^[a-zA-Z0-9]*$/, {
      message: 'Tài khoản chỉ được chứa chữ và số, không được chứa ký tự đặc biệt',
    })
    .min(1, { message: 'Tài khoản là bắt buộc' }),
  password: z
    .string()
    .min(8, { message: 'Mật khẩu phải có ít nhất 8 ký tự' })
    .regex(/[A-Z]/, { message: 'Mật khẩu phải chứa ít nhất 1 ký tự chữ hoa' })
    .regex(/[a-z]/, { message: 'Mật khẩu phải chứa ít nhất 1 ký tự chữ thường' })
    .regex(/[0-9]/, { message: 'Mật khẩu phải chứa ít nhất 1 ký tự số' })
    .regex(/[\W_]/, { message: 'Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt' })
    .min(1, { message: 'Mật khẩu là bắt buộc' }),
  fullName: z
    .string()
    .regex(/^[a-zA-Z0-9\s]*$/, {
      message: 'Họ và tên chỉ được chứa chữ và số, không được chứa ký tự đặc biệt',
    })
    .min(1, { message: 'Họ và tên là bắt buộc' }),
  email: z
    .string()
    .min(1, 'Email là bắt buộc')
    .email({ message: 'Địa chỉ email không hợp lệ' })
    .regex(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/, { message: 'Địa chỉ email không hợp lệ' }),
  website: z.string().optional(),
  phoneNumber: z.string().min(1, { message: 'Số điện thoại là bắt buộc' }),
  houseNumber: z.string().min(1, { message: 'Số nhà là bắt buộc' }),
  address: z.string().min(1, { message: 'Địa chỉ là bắt buộc' }),
  avatar: z.string().min(1, 'Ảnh đại diện là bắt buộc'),
  village: z.number().int().positive({ message: 'Xã / Phường là bắt buộc' }),
  district: z.number().int().positive({ message: 'Quận / Huyện là bắt buộc' }),
  province: z.number().int().positive({ message: 'Tỉnh / Thành phố là bắt buộc' }),
});

export const userOrganizationSchema = z.object({
  customerId: z.string().min(1, { message: 'Tổ chức là bắt buộc' }),
  // username: z
  //   .string()
  //   .regex(/^[a-zA-Z0-9]*$/, {
  //     message: 'Tài khoản chỉ được chứa chữ và số, không được chứa ký tự đặc biệt',
  //   })
  //   .min(1, { message: 'Tài khoản là bắt buộc' }).transform((val) => val.trim())
  //   .refine((val) => val !== '', { message: 'Tài khoản không được để trống' }),

  firstname: z
    .string()
    .min(1, { message: 'Họ là bắt buộc' })
    .max(500, { message: 'Họ không được quá 500 ký tự' })
    .transform((val) => val.trim())
    .refine((val) => val !== '', { message: 'Họ không hợp lệ' }),
  lastname: z
    .string()
    .min(1, { message: 'Tên là bắt buộc' })
    .max(500, { message: 'Tên không được quá 500 ký tự' })
    .transform((val) => val.trim())
    .refine((val) => val !== '', { message: 'Tên không hợp lệ' }),
  email: z
    .string()
    .min(1, 'Email là bắt buộc')
    .max(500, { message: 'Email không được quá 500 ký tự' })
    .email({ message: 'Địa chỉ email không hợp lệ' })
    .regex(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/, { message: 'Địa chỉ email không hợp lệ' })
    .transform((val) => val.trim())
    .refine((val) => val !== '', { message: 'Địa chỉ không hợp lệ' }),
  phoneNumber: z
    .string()
    .min(1, { message: 'Số điện thoại là bắt buộc' })
    .transform((val) => val.trim())
    .refine((val) => val !== '', { message: 'Số điện thoại không hợp lệ' }),
});

export default userBaseSchema;
