import React, {Component} from 'react';
import Header from "./Header";
import AccountHolder from "./Accounts";
import Transactions from "./Transactions";
import Link from './Link';
import {connect} from 'react-redux';
import {Container, Paper, Grid, Card, Divider} from '@mui/material';

/**
 * Landing component acts as the main layout for the app
 */
class Landing extends Component{

    render(){
        console.log('App Rendered');

        return (
            <>
            
            <Container>
                {/* paper component to add a background for content */}
                <Paper>
                    <Header/>
                    {/* main grid layout for content */}
                    <Grid
                        container
                        direction="row"
                        justify="flex-center"
                        alignItems="flex-start"
                        spacing={3}
                    >
                        {/* grid item for AccountHolder component */}
                        <Grid item>
                            <Card variant="outlined">
                                <AccountHolder></AccountHolder>
                            </Card>
                        </Grid>
                        {/* divider between AccountHolder and Transactions */}
                        <Divider orientation="vertical" flexItem />
                        {/* grid item for Transactions component */}
                        <Grid item xs={8}>
                            <Card variant="outlined">
                                <Transactions></Transactions>
                            </Card>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </>);
    }
} 

//map Redux state to props (currently no state is being mapped in this component)
const mapStateToProps = state => ({});

//connect the Landing component to the Redux store
export default connect(mapStateToProps, {})(Landing);