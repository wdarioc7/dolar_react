import React from 'react';
import setFXNegative from '../../../assets/img/dolar-fx-logo.png';
import classes from './Footer.css'
const Footer = (props) => {
    const year = (new Date()).getFullYear();
    return (
        <React.Fragment>
            <div className="row foo">
                <div className={classes.SitemapBackground}></div>
                <div className={["row", classes.SiteMap].join(' ')}>
                    <div className="col-md-2 col-sm-12">
                        <div className={classes.Col100}>
                            <img style={{ maxWidth: '200px' }} src={setFXNegative} className={classes.SetFXNegative} alt="Set fx logo negative" />
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-12">
                        <ul className={classes.FooterMiddle}>
                            <li><a href="https://set-icap.com/politica-de-privacidad.pdf">Política de Privacidad y Tratamiento de Datos Personales</a></li>
                            <li><a>Términos y Condiciones de Uso</a></li>
                        </ul>
                    </div>
                    <div className="col-md-3 col-sm-12">
                        <div className={classes.LastMiddle}>
                            <div className="col-md-12 col-sm-12">
                                <strong>Mapa del sitio</strong>
                            </div>
                            <div className="col-md-12">
                                <ul>
                                    <li><a href="https://set-icap.com/set-icap-fx/productos-y-servicios/#setfx">Productos y Servicios</a></li>
                                    <li><a href="https://set-icap.com/set-icap-fx/productos-y-servicios/#mc">Mercado Cambiario</a></li>
                                    <li><a href="https://set-icap.com/set-icap-fx/acerca-de/">SET - FX</a></li>
                                    <li><a href="https://set-icap.com/contacto/">Contacto</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-12">
                        <ul className={classes.Address}>
                            <li><strong>Póngase en contacto con nosotros</strong></li>
                            <li>Cra. 11 No. 93 - 46 Oficina 403</li>
                            <li>Llámenos: +57 (1) 742 77 77</li>
                            <li>Escríbanos: info@set-icap.co</li>
                            <li>Bogotá D.C</li>
                        </ul>
                    </div>
                </div>
                <div className={classes.RightReservedBackground}></div>
                <div className={["col-md-12", "text-center", classes.RightReserved].join(' ')}>
                    © {year} SET-ICAP FX S.A. | Todos los derechos reservados
            </div>
            </div>
        </React.Fragment>
    )
}

export default Footer;