import { z } from 'zod';
import { t } from 'i18next';

const contractSchema = z.object({
  customerId: z.string().min(1, { message: t('Tổ chức là bắt buộc') }),
  number: z
    .string()
    .min(1, { message: t('Mã hợp đồng là bắt buộc') })
    .transform((val) => val.trim())
    .refine((val) => val !== '', { message:  t('Mã hợp đồng không hợp lệ') }),
  name: z
    .string()
    .min(1, { message: t('Tên hợp đồng là bắt buộc') })
    .transform((val) => val.trim())
    .refine((val) => val !== '', { message: t('Tên hợp đòng không hợp lệ') }),

  signedDate: z
    .string()
    .min(1, { message: t('Ngày ký là bắt buộc') })
    .transform((val) => val.trim())
    .refine((val) => val !== '', { message: t('Ngày ký không hợp lệ') }),
  effectiveDate: z
    .string().optional(),
  endDate: z
    .string()
    .min(1, { message: t('Ngày hết hạn là bắt buộc') })
    .transform((val) => val.trim())
    .refine((val) => val !== '', { message: t('Ngày hết hạn không hợp lệ') }),
  beforeTax: z.number().int().positive({ message: t('Nhập tiền trước thuế là bắt buộc') }),
  taxRate: z.number().int().positive({ message: t('Thuế là bắt buộc') }),
});

export default contractSchema;
