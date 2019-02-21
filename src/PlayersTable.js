import React, { Component } from 'react';
import PlayersDialog from './PlayerDialog'
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'

const columns = {
    rankings: ['#', 'Name', 'Positions', 'Team'],
    hitting: [],
    pitching: [],
};

class PlayersTable extends Component {
    state = {
        league: null,
        dialogOpen: false,
        searchText: "",
    };

    constructor(props) {
        super(props);
        this.handlePlayerClick = this.handlePlayerClick.bind(this);
        this.handleDialogClose = this.handleDialogClose.bind(this);
        this.onSearch = this.onSearch.bind(this);
    }

    handlePlayerClick = (event) => {
        console.log(`click: ${event}`)
        this.setState({dialogOpen: true})
    }

    handleDialogClose = () => {
        this.setState({dialogOpen: false})
    }

    onSearch = (event) => {
        console.log(`blur: ${event.currentTarget.value}`)
        this.setState({searchText: event.currentTarget.value})
    }

    async componentDidMount() {
        // var response = await fetch('https://pure-bastion-69696.herokuapp.com/api/leagues/5c6a1e6f5447a601b68f255d');
        // const league = await response.json();
    
        // league.players.sort(function(a, b){return a._player.rank - b._player.rank})

        // if (response.status !== 200) throw Error("Error fetching stats and rankings");
    
        // this.setState({league: league});
    }

    render() {

        // TODO - Add pagination

        var players = null

        if (this.props.league) {
            if (this.state.searchText.length > 0) {
                players = this.props.league.players.filter((player) => {
                    return player._player.name.toLowerCase().includes(this.state.searchText.toLowerCase())
                })
            } else {
                players = this.props.league.players.slice(0, 100);
            }
        }
        

        return (
            <div>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" onChangeCapture={this.onSearch}/>
                </Form>
                <Table responsive="sm" striped hover>
                    <thead>
                        <tr>
                            {columns.rankings.map(title => (
                                <th>{title}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {players ? 
                            players.map(player => (
                                <tr key={player._id} player-id={player._id} onClick={this.handlePlayerClick}>
                                    <td component="th" scope="row">{player._player.rank == Number.MAX_SAFE_INTEGER ? 'NA' : player._player.rank}</td>
                                    <td align="right">{player._player.name}</td>
                                    <td align="right">{player._player.pos}</td>
                                    <td align="right">{player._player.team}</td>
                                </tr>
                            ))
                            : <div>Loading</div>
                        }
                    </tbody>
                </Table>
                <PlayersDialog open={this.state.dialogOpen} onClose={this.handleDialogClose}/>
            </div>
        );
    }
}
 
export default PlayersTable;