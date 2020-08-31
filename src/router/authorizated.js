import  React  from "react";
import { BrowserRouter,Switch,Route ,Redirect} from "react-router-dom";

export default ()=>(
    <BrowserRouter>
        <Switch>
            <Route path='/' render={() => <div>logado</div>}/>
        </Switch>
    </BrowserRouter>
)