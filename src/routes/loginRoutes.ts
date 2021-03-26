import { Router, Request, Response } from 'express'

interface IRequestWithBody extends Request {
    body: { [key: string]: string | undefined }
}

const router = Router()

router.get('/login', (req: Request, res: Response) => {
    res.send(`
        <form method="POST">
            <div>
                <label>Email</label>
                <input name="email" />
            </div>
            <div>
                <label>Password</label>
                <input name="password" type="password" />
            </div>
            <button>Submit</button>
        </form>
    `)
})

router.post('/login', (req: IRequestWithBody, res: Response) => {
   const { email, password } = req.body

   if (email && password && email === 'hi@hi.com' && password === 'password') {
        //mark as logged in
        req.session = { loggedIn: true } 
        //redirect to root route
        res.redirect('/')
   } else {
       res.send('Invalid email or password')
   }
})

router.get('/', (req: Request, res: Response) => {
    if (req.session && req.session.loggedIn) {
        res.send(`
            <div>
                <div>You are logged in bro</div>
                <a href="/logout">Logout</a>
            </div>
        `)
    } else {
        res.send(`
            <div>
                <div>You are not logged in bro</div>
                <a href="/login">Log In</a>
            </div>
        `)
    }
})

router.get('/logout', (req: Request, res: Response) => {
    req.session = undefined
    res.redirect('/')
})

export { router }
