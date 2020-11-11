import React, { Component } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import classes from './HeaderDropDown.css';

class HeaderDropDown extends Component{
    state = {
        open: false
    }

    componentWillMount(){
      document.addEventListener('mousedown', this.handleClickOutside, false);
    }

    componentWillUnmount(){
      document.removeEventListener('mousedown', this.handleClickOutside, false);
    }

    render() {
        return (
            <li ref={ node => this.node = node } id={this.props.id} className={['dropdown', this.state.open ? 'open': '', classes.StaticDropDown].join(' ')} onClick={this.toggleOpen}>
              <a data-toggle="dropdown" aria-expanded={this.state.open ? 'true': 'false'} className="dropdown-toggle text-right">
                <span className="ic-user pull-right">
                  <FontAwesomeIcon icon={this.props.icon} />
                </span>
              </a>
              <div className="dropdown-menu dropdown-menu-sm dropdown-menu-right panel-default">
                {this.props.children}
              </div>
            </li>
        )
    }

    handleClickOutside = (e) => {
      if(this.node.contains(e.target)){
        return;
      }
      this.close(); // close just in case user clicks outside the dropdown
    }

    toggleOpen = () => {
      this.setState({
        ...this.state,
        open: !this.state.open
      });
    }

    close = () => {
      this.setState({
        ...this.state,
        open: false
      })
    }
}

export default HeaderDropDown;