import React from "react";
import classes from "./Pricing.css";

const pricing = () => {
    const trimestral_price = process.env.REACT_APP_TRIMESTRAL_PRICE;
    const semestral_price = process.env.REACT_APP_SEMESTRAL_PRICE;
    const anual_price = process.env.REACT_APP_ANUAL_PRICE;
    return (
        <React.Fragment>
            <div className="col-md-10 col-md-offset-1 col-lg-8 col-lg-offset-2">
                    <div className="row pricing pricing-no-gutter-sm">
                        <div className="col-sm-4">
                            <div className="panel">
                                <div className="panel-body">
                                    <p className="pricing-title">Plan Trimestral</p>
                                    <p className="pricing-desc">Suscripción Dolar SET-FX</p>
                                    <div className="pricing-price">
                                        <p><span className={["text-semibold text-primary", classes.PricingTitle].join(' ')}>${trimestral_price}</span></p>
                                        <p>Trimestral</p>
                                    </div>
                                    <ul className="pricing-list">
                                        <li>Información en tiempo real</li>
                                        <li><strong>1</strong> Usuario</li>
                                        <li><strong>Soporte</strong> gratuito</li>
                                    </ul>
                                    {/* <a href="https://payco.link/248238" className="btn btn-block btn-primary btn-lg">Suscribirme</a> */}
                                   <a href="https://payco.link/447619" className="btn btn-block btn-primary btn-lg">Suscribirme</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-4 pricing-featured">
                            <div className="panel">
                                <div className="ribbon"><span>POPULAR</span></div>
                                <div className="panel-body">
                                    <p className="pricing-title">Plan semestral</p>
                                    <p className="pricing-desc">Suscripción Dolar SET-FX.</p>
                                    <div className="pricing-price">
                                        <p><span className={["text-semibold text-success", classes.PricingTitle].join(' ')}>${semestral_price}</span></p>
                                        <p>Semestral</p>
                                    </div>
                                    <ul className="pricing-list">
                                        <li>Información en tiempo real</li>
                                        <li><strong>1</strong> Usuario</li>
                                        <li><strong>Soporte</strong> gratuito</li>
                                    </ul>
                                    <a href="https://payco.link/248240" className="btn btn-block btn-primary btn-lg">Suscribirme</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="panel">
                                <div className="panel-body">
                                    <p className="pricing-title">Plan anual</p>
                                    <p className="pricing-desc">Suscripción Dolar SET-FX.</p>
                                    <div className="pricing-price">
                                        <p><span className={["text-semibold text-purple", classes.PricingTitle].join(' ')}>${anual_price}</span></p>
                                        <p>Anual</p>
                                    </div>
                                    <ul className="pricing-list">
                                        <li>Información en tiempo real</li>
                                        <li><strong>1</strong> Usuario</li>
                                        <li><strong>Soporte</strong> gratuito</li>
                                    </ul>
                                    <a href="https://payco.link/447845" className="btn btn-block btn-primary btn-lg">Suscribirme</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </React.Fragment>
    )
}

export default pricing;
