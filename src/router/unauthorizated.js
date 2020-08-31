import  React  from "react";
import { BrowserRouter,Switch,Route ,Redirect} from "react-router-dom";
import Login from '../routes/login'

export default ()=>(
    <BrowserRouter>
        <Switch>
            <Route exact path='/login' component={Login}/>
            <Route path='/' render={() => <Redirect to='/login'/>}/>
        </Switch>
    </BrowserRouter>
)