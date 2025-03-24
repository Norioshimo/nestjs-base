import { ExceptionFilter, Catch, ArgumentsHost, NotFoundException, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        response.status(404).json({
            statusCode: 404,
            message: 'Ruta no encontrada',
            error: 'Not Found',
        });
    }
}
