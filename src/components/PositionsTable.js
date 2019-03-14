import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import { positions } from './PlayerTable';

export class PositionsTable extends Component {
    render() {
        var players = this.props.players
        var pos = positions.team
        var counts = []

        pos.forEach((p) => {
            var count = 0

            players.forEach((player) => {
                var pos = player._player.pos.split(String.fromCharCode(160))[0].split(',')

                if (p === "OF"
                    && (pos.includes("OF")
                    || pos.includes("LF")
                    || pos.includes("CF")
                    || pos.includes("RF"))) {
                    count += 1
                } else if (pos.includes(p)) {
                    count += 1
                }
            })

            counts.push(count)
        })

        return (
            <Table responsive="sm" size="sm" striped hover>
                <thead>
                    <tr>
                        {pos.map(p => (<th>{p}</th>))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {counts.map(c => (<td>{c}</td>))}
                    </tr>
                </tbody>
            </Table>
        );
    }
}

export default PositionsTable;