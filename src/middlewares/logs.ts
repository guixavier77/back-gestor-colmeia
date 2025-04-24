import { Request, Response, NextFunction } from 'express'
import LogsService from '../services/logs/logs.service'

export const requestLogger = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const start = Date.now()
    const originalJson = res.json

    res.json = function (body) {
        const duration = Date.now() - start
        const level = res.statusCode < 400 ? 'INFO' : 'WARN'
        const logService = new LogsService();
        logService.perform({
            level,
            method: req.method,
            url: req.originalUrl,
            statusCode: res.statusCode,
            message: `Request completed in ${duration}ms`,
            context: JSON.stringify({
                headers: req.headers,
                body: req.body,
                query: req.query,
                params: req.params,
            }),
            data: JSON.stringify(body),
        }).catch(console.error)

        return originalJson.call(this, body)
    }

    next()
}

export const errorLogger = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    if (res.statusCode < 400) {
        res.status(500)
    }

    if (res.statusCode >= 500) {
        const logService = new LogsService();
        logService.perform({
            level: 'ERROR',
            method: req.method,
            url: req.originalUrl,
            statusCode: res.statusCode,
            message: err.message,
            context: JSON.stringify({
                headers: req.headers,
                body: req.body,
                query: req.query,
                params: req.params,
            }),
            data: err.stack,
        }).catch(console.error)
    }

    next(err)
}
