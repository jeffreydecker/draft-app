import React, { Component } from 'react';

class PitcherRow extends Component {
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
                <td>{player._player.pitchingProjections.era}</td>
                <td>{player._player.pitchingProjections.whip}</td>
                <td>{player._player.pitchingProjections.strikeouts}</td>
                <td>{player._player.pitchingProjections.wins}</td>
                <td>{player._player.pitchingProjections.saves}</td>
            </tr>
        );
    }
}
 
export default PitcherRow;