import jwt from 'jsonwebtoken';
import { config } from '../config/environment';
import { UserDto, AuthDto } from '@talent-hub/shared';

const {
    security: { secret, issuer, audience, expiresIn },
} = config;

const authenticateToken = (token: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const decoded: any = jwt.verify(token, secret, {
        issuer,
        audience,
        algorithms: ['HS256'],
    });

    return {
        id: decoded.id,
        username: decoded.username,
        email: decoded.email,
        role: decoded.role,
        profilePictureUrl: decoded.profilePictureUrl,
    } as UserDto;
};

const generateToken = (user: UserDto) => {
    const seconds = expiresIn * 60 * 60;

    const token = jwt.sign(user, secret, {
        issuer,
        audience,
        expiresIn: seconds,
        algorithm: 'HS256',
    });

    const unixEpochExpiration = Math.floor(Date.now() / 1000) + seconds;

    const authToken: AuthDto = {
        accessToken: token,
        tokenType: 'Bearer',
        expiresIn: unixEpochExpiration,
    };

    return authToken;
};

export const jwtService = {
    authenticateToken,
    generateToken,
};
