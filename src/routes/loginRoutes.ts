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

export { router }
