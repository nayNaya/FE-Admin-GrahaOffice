import React from "react";
import PrivateRoute from "./components/routes/PrivateRoute";
import PublicRoute from "./components/routes/PublicRoute";
import { Switch, BrowserRouter as Router } from 'react-router-dom';
import { APP_ROUTE } from "./components/routes/Routes";

// Tailwind CSS Style Sheet
import 'assets/styles/tailwind.css';

function App() {
    return (
        <Router>
            <Switch>
                {APP_ROUTE.map((value, index) => {
                    if (value.private) {
                    return (
                        <PrivateRoute
                            key={value.name}
                            component={value.component}
                            path={value.path}
                            exact={value.exact}
                        />
                    );
                    } else {
                    return (
                        <PublicRoute
                            key={value.name}
                            restricted={value.restricted}
                            path={value.path}
                            component={value.component}
                            exact={value.exact}
                        />
                    );
                    }
                })}
            </Switch>
        </Router>
    );
}

export default App;
