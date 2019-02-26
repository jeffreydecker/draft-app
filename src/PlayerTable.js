import React, { Component } from 'react';
import Table from 'react-bootstrap/Table'
import RankingRow from './RankingRow'
import HitterRow from './HitterRow';
import PitcherRow from './PitcherRow';

export const columns = {
    all:        ['#', 'Name', 'Positions', 'Team', 'R', 'HR', 'RBI', 'AVG', 'SB', 'ERA', 'WHIP', 'K', 'W', 'S'],
    rankings:   ['#', 'Name', 'Positions', 'Team'],
    hitting:    ['#', 'Name', 'Positions', 'Team', 'R', 'HR', 'RBI', 'AVG', 'SB'],
    pitching:   ['#', 'Name', 'Positions', 'Team', 'ERA', 'WHIP', 'K', 'W', 'S'],
};

export const positions = {
    hitting:    ['C', '1B', '2B', '3B', 'SS', 'OF', 'CF', 'LF', 'RF', 'DH'],
    pitching:   ['SP', 'RP'],
    outfield:   ['OF', 'CF', 'LF', 'RF'],
}

export const DisplayTypeEnum = {
    Ranking:    1,
    Hitting:    2,
    Pitching:   3,
}

// TODO - Would be nice to exclude #, name, positions and team when showing in the player dialog
// We can combine all of the rows into one then pass columns to the row and have the row know how
// to gather the matching information for each row into an array to be displayed (entry per col)


export class PlayerTable extends Component {
    constructor(props) {
        super(props);
        this.handlePlayerClick = this.handlePlayerClick.bind(this);
    }

    handlePlayerClick = (player) => {
        this.props.handlePlayerClick(player)
    }

    render() {
        var displayType = this.props.displayType
        var players = this.props.players
        var cols = this.props.cols

        return (         
            <Table responsive="sm" size="sm" striped hover>
                <thead>
                    <tr>
                        {cols.map(title => (
                            <th>{title}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {players ? 
                        players.map(player => {
                            if (displayType == DisplayTypeEnum.Hitting) {
                                return <HitterRow player={player} handlePlayerClick={this.handlePlayerClick} />
                            } else if (displayType == DisplayTypeEnum.Pitching) {
                                return <PitcherRow player={player} handlePlayerClick={this.handlePlayerClick} />
                            } else {
                                return <RankingRow player={player} handlePlayerClick={this.handlePlayerClick} />
                            }
                        })
                        : <div>Loading</div>
                    }
                </tbody>
            </Table>
        );
    }
}
 
export default PlayerTable;