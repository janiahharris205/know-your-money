import React, {Component} from 'react';
import Link from './Link';
import {connect} from 'react-redux';
import { Toolbar, AppBar, Typography} from '@mui/material';

/**
 * Header component that renders the top navigation bar
 */
class Header extends Component{
    constructor(props){
        super(props) //initialize the component with inherited properties
    }

    render(){
        return (
            <>
            <div>
                {/* AppBar is the main container for the header bar */}
                <AppBar position="static">
                    <Toolbar style={{display: 'flex'}}>
                        <Typography variant="h5">
                            Know Your Money
                        </Typography>
                        <Link/>
                    </Toolbar>
                </AppBar>
            </div>
        </>
        );
    }
} 

//map state to props (currently no state being mapped)
const mapStateToProps = state => ({});

//connect the Header component to the Redux store
export default connect(mapStateToProps, {},)(Header);