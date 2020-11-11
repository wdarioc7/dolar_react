import React, { Component } from "react";
import Button from "../../../components/Nifty/UI/Button/Button";
import classes from "./Login.css";
import Layout from "../../../components/Auth/Layout";
import { Link } from "react-router-dom";
import { withFormik, Field } from "formik";
import { connect } from "react-redux";
import actions from "../../../store/actions/auth.actions";
import Recaptcha from 'react-recaptcha';
class LoginContainer extends Component {

    constructor(propse){
        super(propse)
        this.captureR = this.captureR.bind(this);
        this.recaptchaLoaded = this.recaptchaLoaded.bind(this);
        this.verifyCallback = this.verifyCallback.bind(this);
        this.state = {
            isVerified:false
       }

    };
   captureR() { if(this.state.isVerified){
               console.log('funciona recaptcha');
        }else{
           console.log('NO funciona recaptcha');
        }
        }
  recaptchaLoaded(){
      console.log('captcha loaded correctly');
  }
  verifyCallback(response){
          if(response){
              this.setState({
                  isVerified:true
            })
          }
  }
  render() {
    return (
      <Layout>
        {this.props.loginError ? <div className="alert alert-danger">{this.props.loginError}</div> : null}


        <div className="panel-body">
          <div
            className={["mar-ver", "pad-btm", classes.TitleSection].join(" ")}
          >
            <h1 className="h3">Iniciar sesión</h1>
            <p>Iniciar sesión en tu cuenta de SET-ICAP | FX</p>
          </div>
          <form onSubmit={this.props.handleSubmit}>
            <div
              className={[
                "form-group",
                this.props.errors.username && this.props.touched.username ? "has-error" : ""
              ].join(" ")}
            >
              <Field
                name="username"
                placeholder="Usuario"
                className="form-control"
                maxlength="15"
              />
              {this.props.errors.username &&
                this.props.touched.username && (
                  <div className="help-block">{this.props.errors.username}</div>
                )}
            </div>
            <div
              className={[
                "form-group",
                this.props.errors.password && this.props.touched.password ? "has-error" : ""
              ].join(" ")}
            >
              <Field
                type="password"
                name="password"
                placeholder="Contraseña"
                className="form-control"
                maxlength="15"
              />
              {this.props.errors.password &&
                this.props.touched.password && (
                  <div className="help-block">{this.props.errors.password}</div>
                )}
            </div>
            <div className="checkbox pad-btm text-left">
              <label>
                <Field name="rememberme" type="checkbox" />
                Recuérdame
              </label>
            </div>
           <Recaptcha
            sitekey="6Ldu0rgZAAAAAM0yru80ZJLhNZBy_y5jGwz_qdC9"
            render="explicit"
            verifyCallback={this.verifyCallback}
            onloadCallback={this.recaptchaLoaded}
            />
            {/* <Button type="submit">Iniciar sesión</Button> */}
            <Button type="submit" onClick={this.captureR}>Iniciar sesión</Button>
            <br></br>
     
          </form>
        </div>

        <div className="pad-all">
          <Link to="/auth/forgot-password/" className="btn-link pull-left">
            ¿Olvidaste tu contraseña?
          </Link>
          <Link to="/auth/registro/" className="btn-link pull-right">
            Crear nueva cuenta
          </Link>
        </div>
      </Layout>
    );
  }
}
const mapPropsToValues = props => {
  return {
    username: props.username || "",
    password: props.password || "",
    rememberme: props.rememberme || "",
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: (username, password, history) => dispatch(actions.login(username, password, history))
  };
};

const mapStateToProps = state => ({
  loginError: state.auth.error
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withFormik({
    mapPropsToValues: mapPropsToValues,
    validate: values => {
      const errors = {};
      if (!values.username) {
        errors.username = "El usuario es requerido";
      }
      if (!values.password) {
        errors.password = "Por favor digite una contraseña";
      }
      return errors;
    },
    handleSubmit(values, cmp) {
      cmp.props.login(values.username, values.password, cmp.props.history);
    }
  })(LoginContainer)
);
