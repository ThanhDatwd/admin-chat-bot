import { OPTION_CUSTOMER } from 'src/constans/user';
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
  organization: z.string().min(1, { message: 'Tổ chức là bắt buộc' }),
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
  // website: z.string().optional(),
  phoneNumber: z.string().min(1, { message: 'Số điện thoại là bắt buộc' }),
  houseNumber: z.string().min(1, { message: 'Số nhà là bắt buộc' }),
  address: z.string().min(1, { message: 'Địa chỉ là bắt buộc' }),
  village: z.number().int().positive({ message: 'Xã / Phường là bắt buộc' }),
  district: z.number().int().positive({ message: 'Quận / Huyện là bắt buộc' }),
  province: z.number().int().positive({ message: 'Tỉnh / Thành phố là bắt buộc' }),
  // role: z.string().optional(),
});

export default userBaseSchema