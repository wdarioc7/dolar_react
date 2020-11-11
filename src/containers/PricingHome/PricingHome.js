import React, {Component} from 'react';
import HomeHeader from "../../components/HomePage/Header/Header";
import PreFooter from '../../components/shared/PreFooter/PreFooter';
import Footer from "../../components/shared/Footer/Footer";
import Pricing from '../../components/HomePage/Pricing/Pricing';

class PricingHome extends Component{

    render(){
        return(<div id="container" className="home_page">
            <HomeHeader empty={true}/>
            <div className="boxed">
                <div className="container-fluid">
                    <div className="row">
                        <Pricing />
                    </div>
                <PreFooter></PreFooter>
                <Footer></Footer>
                </div>
            </div>
            
        </div>)
    }
}


export default PricingHome;