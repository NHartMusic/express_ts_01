import { Request, Response, NextFunction } from 'express'
import { get, controller, use } from './decorators' 

function requireAuth(req: Request, res: Response, next: NextFunction): void {
    if (req.session && req.session.loggedIn) {
        next()
        return
    }

    res.status(403)
    res.send('gtfo')
}

@controller('')
class RootController {
    getRoot(req: Request, res: Response){
        if (req.session && req.session.loggedIn) {
            res.send(`
                <div>
                    <div>You are logged in bro</div>
                    <a href="/auth/logout">Logout</a>
                </div>
            `)
        } else {
            res.send(`
                <div>
                    <div>You are not logged in bro</div>
                    <a href="/auth/login">Log In</a>
                </div>
            `)
        }
    }

    @get('/protected')
    @use(requireAuth)
    getProtected(req: Request, res: Response) {
        res.send('Welcome to protected route, logged in user!! Congrats xoxo')
    }

}
