/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../types/api-error';
import { Action } from '../enums/action';
import { Permissions } from '../enums/permissions';
import { Resource } from '../enums/resource';
import { MiddlewareFactory } from '../types/middleware-factory';
import { AuthContext } from '@talent-hub/shared';

export const authorize: MiddlewareFactory<{ resource: Resource; action: Action }> =
    ({ resource, action }) =>
    (
        _req: Request,
        res: Response<any, AuthContext | Record<string, any>>,
        next: NextFunction,
    ): any => {
        const { user } = res.locals as AuthContext;
        if (!user) {
            ApiError.throwUnauthorized('user is not authenticated');
        }

        const userPermissions = Permissions.find((p) => p.role === user.role);
        if (!userPermissions) {
            ApiError.throwWithoutExpose(`${user.role} not contains defined permissions`);
        }

        if (
            !userPermissions!.actionsPerResource.some(
                (ap) => ap.resource === resource && ap.actions.includes(action),
            )
        ) {
            ApiError.throwForbidden(
                `user cannot performe action ${action} on resource ${resource}`,
            );
        }

        next();
    };
