import { z } from 'zod';
import { t } from 'i18next';

const customerConfigSchema = z.object({
  customerId: z.string().min(1, { message: t('Tổ chức là bắt buộc') }),
  quota: z.number().int().positive({ message: t('Hạn mức request là bắt buộc') }).min(1, { message: t('Hạn mức request phải lớn hơn hoặc bằng 1') }),
  freeRequest: z.number().int().optional(),
  freeTraining: z.number().int().optional(),
});

export default customerConfigSchema;
