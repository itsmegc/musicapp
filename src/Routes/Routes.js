import React from "react";
import {  Route, Switch, HashRouter } from "react-router-dom";

import Homepage from "../Components/Homepage/Homepage";
import second from './../Components/Sectionpage/second';
import Artist from './../Components/artist/artist';
import adminLogin from './../Components/Admin/adminLogIn/admin-login';
import addArtist from './../Components/Admin/Artist/addArtist';



class Routes extends React.Component {
  render() {
    return (
      <HashRouter style={{ overflow: "auto" }}>
    
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route exact path="/artists" component={Artist} />
            <Route exact path="/admin" component={adminLogin}/>
            <Route exact path="/admin/addArtist" component={addArtist}/>
            <Route exact path="/:title" component={second} />

            
          </Switch>
  
      </HashRouter>
    );
  }
}
export default Routes;
