import React, { Component } from 'react';

class PitcherRow extends Component {
    constructor(props) {
        super(props)
        this.handlePlayerClick = this.handlePlayerClick.bind(this)
    }

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
                <td>{player._player.pitchingProjections ? player._player.pitchingProjections.era.toFixed(2) : 'NA'}</td>
                <td>{player._player.pitchingProjections ? player._player.pitchingProjections.whip.toFixed(2) : 'NA'}</td>
                <td>{player._player.pitchingProjections ? player._player.pitchingProjections.strikeouts : 'NA'}</td>
                <td>{player._player.pitchingProjections ? player._player.pitchingProjections.wins : 'NA'}</td>
                <td>{player._player.pitchingProjections ? player._player.pitchingProjections.saves : 'NA'}</td>
            </tr>
        );
    }
}
 
export default PitcherRow;