import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const columns = [
    {
        name: "Rank",
        options: {
            filter: false,
            sort: true,
        }
    }, 
    {
        name: "Name",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Pos",
        options: {
            filter: false,
            sort: true,
        }
    },
    {
        name: "Team",
        options: {
            filter: false,
            sort: true,
        }
    }
];

// Creates classes and styles them
const styles = theme => ({
    root: {
      width: '100%',
      // marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
    },
    table: {
      minWidth: 480,
    },
    row: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default,
      },
    },
});

class PlayersTable extends Component {
    state = {
        league: null,
    };

    async componentDidMount() {
        var response = await fetch('https://pure-bastion-69696.herokuapp.com/api/leagues/5c6a1e6f5447a601b68f255d');
        const league = await response.json();
    
        league.players.sort(function(a, b){return a._player.rank - b._player.rank})

        if (response.status !== 200) throw Error("Error fetching stats and rankings");
    
        this.setState({league: league});
    }

    render() {
        var playerData = [];

        if (this.state.league) {
            this.state.league.players.forEach((player) => {
                var rank = player._player.rank
                if (rank == Number.MAX_SAFE_INTEGER) { rank = 'NA' }
                playerData.push({id: player._id, rank: rank, name: player._player.name, pos: player._player.pos, team: player._player.team})
            })
        }

        return (
            <Paper className={this.props.classes.root}>
                <Table className={this.props.classes.table}>
                <TableHead>
                    <TableRow>
                    <TableCell>Rank</TableCell>
                    <TableCell align="right">Name</TableCell>
                    <TableCell align="right">Pos</TableCell>
                    <TableCell align="right">Team</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.state.league ? 
                        this.state.league.players.map(player => (
                            <TableRow className={this.props.classes.row} key={player.id}>
                                <TableCell component="th" scope="row">{player._player.rank == Number.MAX_SAFE_INTEGER ? 'NA' : player._player.rank}</TableCell>
                                <TableCell align="right">{player._player.name}</TableCell>
                                <TableCell align="right">{player._player.pos}</TableCell>
                                <TableCell align="right">{player._player.team}</TableCell>
                            </TableRow>
                        ))
                        : <div>Loading</div>
                    }
                </TableBody>
                </Table>
            </Paper>
        );
    }
}

// Verifies props are there
PlayersTable.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(PlayersTable);