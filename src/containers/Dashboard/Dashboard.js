import React, {Component} from 'react';
import Header from "../../components/Dashboard/Header/Header";
import Navbar from "../../components/Dashboard/Navbar/Navbar";
import { connect } from "react-redux";
import authActions from "../../store/actions/auth.actions";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import DashboardHome from './Home';
import StatisticsComponent from './Statistics';

class Dashboard extends Component {
  state = {
      largeMenu: true,
  }

  componentDidMount(){
    if(window.innerWidth <= 600){
      this.toggleMenu();
    }
  }

  toggleMenu = () => {
    this.setState({
      ...this.state,
      largeMenu: !this.state.largeMenu
    });
  };

  render(){
    return (
      <div
        id="container"
        className={[
          "effect",
          "aside-float",
          "aside-bright",
          this.state.largeMenu ? "mainnav-lg" : "mainnav-sm"
        ].join(" ")}>
        <Header
          largeMenu={this.state.largeMenu}
          user={this.props.auth.user}
          actions={{ logout: this.props.logout, toggleMenu: this.toggleMenu }}
        />
        <Navbar market={this.state.market} changeMarket={this.changeMarket} />
        <div className="main-content" style={{marginTop: '-60px'}}>
          <Switch>
            <Route path="/dashboard/estadisticas/" component={() => <StatisticsComponent paddingTop='8' />} />
            <Route exact path="/dashboard/:market/" component={DashboardHome} />
            <Redirect to="/dashboard/spot/"></Redirect>
          </Switch>
        </div>
      </div>)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(authActions.logout())
  };
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard));