import  React  from "react";
import { BrowserRouter,Switch,Route ,Redirect} from "react-router-dom";
import Login from '../routes/login'
import NewUser from '../routes/newUser'

export default ()=>(
    <BrowserRouter>
        <Switch>
            <Route exact path='/login' component={Login}/>
            <Route exact path='/novoUsuario' component={NewUser}/>
            <Route path='/' render={() => <Redirect to='/login'/>}/>
        </Switch>
    </BrowserRouter>
)