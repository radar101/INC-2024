import { createBrowserRouter, Route, createRoutesFromElements } from 'react-router-dom';
import Layout from '../Layout.jsx';
import Login from '../Pages/Login.jsx';
import Register from '../Pages/Register.jsx';
import About from '../Pages/About.jsx';
import Home from '../Pages/Home.jsx';
import Create from '../Pages/Create.jsx'
import User from '../Pages/User.jsx';
import CreateIP from '../Pages/CreateIP.jsx';
import CreateWill from '../Pages/CreateWill.jsx';

const router = createBrowserRouter(

    createRoutesFromElements(

        <Route>
            <Route path='login' element={<Login />} />

            <Route path='register' element={<Register />} />

            <Route path='/' element={<Layout />}>
                <Route path='' element={<Home />} />
                <Route path='create'>
                    <Route path='' element={<Create/>}/>
                    <Route path='ip' element={<CreateIP/>}/>
                    <Route path='will' element={<CreateWill/>}/>
                </Route>
                <Route path='about' element={<About />} />
                <Route path='user' element={<User />} />
            </Route>
        </Route>
    )
)
export default router;