import React, { Component } from 'react';
import LeaguesTable from './LeaguesTable';
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import DollarSign from 'react-feather/dist/icons/dollar-sign';
import LeagueForm from './LeagueForm';

class League extends Component {
    state = {
        leagues: null,
    };

    async componentDidMount() {
        var response = await fetch('https://pure-bastion-69696.herokuapp.com/api/leagues');
        if (response.status !== 200) throw Error("Error fetching stats and rankings");
        var leagues = await response.json();
        this.setState({leagues: leagues});
    }
    
    render() {
        return (
            <div>
                <LeagueForm></LeagueForm>
                <LeaguesTable leagues={this.state.leagues} />
            </div>
        );
    }
}
 
export default League;