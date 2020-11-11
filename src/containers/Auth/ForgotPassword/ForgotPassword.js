import React, {Component} from 'react';
import Layout from '../../../components/Auth/Layout';
import classes from './ForgotPassword.css';
import Input from '../../../components/Nifty/UI/Input/Input';
import Button from '../../../components/Nifty/UI/Button/Button';
import {Link} from 'react-router-dom';
class ForgotPassword extends Component{
	state = {
		form:{
			email: {
				config: {
					type: 'email',
					placeholder: 'Email'
				},
				value: ''
			}
		}
	}

	changeInputHandler = (evt, inputID) => {
		const updateForm = {...this.state.form};
		const updatedFormElement = {
			...updateForm[inputID]
		};
		updatedFormElement.value = evt.target.value;
		updateForm[inputID] = updatedFormElement; 
		this.setState({form : updateForm});
	}

    render(){

		const formControls = Object.keys(this.state.form).map((key) => {
            return {
                id: key,
                ...this.state.form[key]
            }
		});

		const form = formControls.map((formElement) => {
			return (
                <Input 
                    key={formElement.id} 
                    value={formElement.value} 
                    change={(event) => { this.changeInputHandler(event, formElement.id) }}
                    {...formElement}>
                </Input>)
		})

        return(
            <Layout>
                <div className="panel-body">
					<div className={['mar-ver', 'pad-btm', classes.TitleSection].join(' ')}>
						<h1 className="h3">¿Olvidaste tu contraseña?</h1>
						<p className="pad-btm">Ingrese su correo electrónico para recuperar su contraseña</p>
					</div>
		            <form>
		                {form}
		                <div className="form-group text-right">
		                    <Button type="danger">Restablezca la contraseña</Button>
		                </div>
		            </form>
		            <div className="pad-top" style={{textAlign: 'center'}}>
						<Link to="/auth/login/" className={['btn-link', 'text-bold'].join(' ')}>Regresar al inicio de sesión</Link>
		            </div>
		        </div>
            </Layout>
        )
    }
}

export default ForgotPassword;