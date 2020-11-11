import React, { Component } from 'react';
import StatisticsComponent from '../Dashboard/Statistics';
import HomeHeader from "../../components/HomePage/Header/Header";
import { connect } from "react-redux";

class HomeStatistics extends Component {
    render() {
        return (
            <div id="container">
                <HomeHeader auth={this.props.auth} />
                <StatisticsComponent />
            </div>

        )
    }
}


const mapStateToProps = state => {
    return {
        auth: state.auth
    };
};

export default connect(mapStateToProps)(HomeStatistics);