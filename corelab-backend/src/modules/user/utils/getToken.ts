import { ForbiddenException } from '@nestjs/common';
import { Request } from 'express';

export function getToken(req: Request): string {
  if (!req) {
    throw new ForbiddenException('Acesso negado.');
  }
  const authHeader = req.headers['authorization'] as string | undefined;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    throw new ForbiddenException('Acesso negado.');
  }
  return token;
}
