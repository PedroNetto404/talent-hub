import { z } from 'zod'
import { YearMonthSchema } from './year-month-schema'
import { Period } from '../types/period'

/**
 * @swagger
 * components:
 *  schemas:
 *   PeriodSchema:
 *    type: object
 *    properties:
 *      start:
 *       $ref: '#/components/schemas/YearMonthSchema'
 *      end:
 *        $ref: '#/components/schemas/YearMonthSchema'
 */
export const PeriodSchema: z.ZodType<Period> = z
  .object({
    start: YearMonthSchema,
    end: YearMonthSchema.nullable(),
  })
  .refine(
    ({ end, start }) =>
      !end ||
      end.year > start.year ||
      (end.year === start.year && end.month >= start.month),
    {
      message: 'End date must be after or equal to the start date.',
    },
  )
