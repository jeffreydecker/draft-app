import React, { Component } from 'react';

class TeamRow extends Component {
    constructor(props) {
        super(props)
        this.handleTeamClick = this.handleTeamClick.bind(this)
    }

    handleTeamClick = (event) => {
        this.props.onClick(this.props.team)
    }

    render() {
        let team = this.props.team
        let league = this.props.league

        var spent = 0
        var picks = 0
        
        team.players.forEach(playerId => {
            let player = league.players.find(p => {
                return p._id === playerId
            })
            spent += player.salary
            if (player.isRostered) {
                picks += 1
            }
        });

        var moneyRemaining = league.budget - spent
        var picksRemaining = league.rosterSize - picks
        var maxBid = moneyRemaining - picksRemaining - 1
        var avgBid = moneyRemaining / picksRemaining

        return (
            <tr key={team._id} onClick={this.handleTeamClick}>
                <td component="th" scope="row">{team.name}</td>
                <td>{moneyRemaining} of {league.budget}</td>
                <td>{picksRemaining} of {league.rosterSize}</td>
                <td>{maxBid}</td>
                <td>{avgBid.toFixed(2)}</td>
            </tr>
        );
    }
}
 
export default TeamRow;