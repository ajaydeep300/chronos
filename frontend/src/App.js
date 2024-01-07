
import "./App.css";
// importing components from react-router-dom package
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

  
// import Home component
import LoginPage from "./LoginPage";
// import About component
import LandingPage from "./LandingPage";
// import ContactUs component
import SideBar from "./components/SideBar";
// import ContactUs from "./components/ContactUs";
import PunchInPage from "./PunchInPage";

import managerView from "./ManagerView";

import ViewDataSelf from "./ViewDataSelf"
import ViewEmployee from "./ViewEmployee"

function App() {
  return (
    <>
      {/* This is the alias of BrowserRouter i.e. Router */}
      <Router>
        <Switch>
          {/* This route is for home component 
          with exact path "/", in component props 
          we passes the imported component*/}
          <Route exact path="/" component={LoginPage} />
            
          {/* This route is for about component 
          with exact path "/about", in component 
          props we passes the imported component*/}
          <Route path="/landing" component={LandingPage} />
            
          <Route path="/sidebar" component={SideBar} />

          <Route path="/punchin" component={PunchInPage} />

          <Route path="/viewdata" component={ViewDataSelf} />

          <Route path="/managerview" component={managerView} />
          
          <Route path="/viewemployee" component={ViewEmployee} />
          {/* If any route mismatches the upper 
          route endpoints then, redirect triggers 
          and redirects app to home component with to=" /" */}
          <Redirect to="/" />
        </Switch>
      </Router>
    </>
  );
}
  
export default App;