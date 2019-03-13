import React, { Component } from 'react';

class HitterRow extends Component {
    handlePlayerClick = (event) => {
        this.props.handlePlayerClick(this.props.player)
    }

    render() {
        let player = this.props.player
        return (
            <tr key={player._id} data-player={player._player._id} onClick={this.handlePlayerClick} className={player._team ? "bg-dark text-white" : ""}>
                <td component="th" scope="row">{player._player.rank == Number.MAX_SAFE_INTEGER ? 'NA' : player._player.rank}</td>
                <td>{player._player.name}</td>
                <td>{player._player.pos}</td>
                <td>{player._player.team}</td>
                <td>{player.salary}</td>
                <td>{player._player.hittingProjections.runs}</td>
                <td>{player._player.hittingProjections.homeRuns}</td>
                <td>{player._player.hittingProjections.rbi}</td>
                <td>{player._player.hittingProjections.average.toFixed(3)}</td>
                <td>{player._player.hittingProjections.steals}</td>
            </tr>
        );
    }
}
 
export default HitterRow;