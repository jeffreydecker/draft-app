import React, { Component } from 'react';

class RankingRow extends Component {
    handlePlayerClick = (event) => {
        this.props.handlePlayerClick(this.props.player)
    }

    render() {
        let player = this.props.player
        return (
            <tr key={player._id} data-player={player._player._id} onClick={this.handlePlayerClick} class={player._team ? "bg-dark" : ""}>
                <td component="th" scope="row">{player._player.rank == Number.MAX_SAFE_INTEGER ? 'NA' : player._player.rank}</td>
                <td>{player._player.name}</td>
                <td>{player._player.pos}</td>
                <td>{player._player.team}</td>
            </tr>
        );
    }
}
 
export default RankingRow;