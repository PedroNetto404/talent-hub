import { z } from 'zod';
import { YearMonthSchema } from './year-month-schema';

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
export const PeriodSchema = z
    .object({
        start: YearMonthSchema,
        end: YearMonthSchema.nullable().default(null),
    })
    .refine(
        ({ end, start }) =>
            !end || end.year > start.year || (end.year === start.year && end.month >= start.month),
        {
            message: 'End date must be after or equal to the start date.',
        },
    );
