import React, { Component } from 'react';
import PlayersDialog from './PlayerDialog'
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import InputGroup from 'react-bootstrap/InputGroup'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Search from 'react-feather/dist/icons/search';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button';

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
        positionFilter: null,
        filterDrafted: false,
    };

    constructor(props) {
        super(props);
        this.handlePlayerClick = this.handlePlayerClick.bind(this);
        this.handleDialogClose = this.handleDialogClose.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.onPositionSelect = this.onPositionSelect.bind(this);
        this.onFilterDrafted = this.onFilterDrafted.bind(this);
    }

    handlePlayerClick = (event) => {
        console.log(`click: ${event}`)
        this.setState({dialogOpen: true})
    }

    handleDialogClose = () => {
        this.setState({dialogOpen: false})
    }

    onSearch = (event) => {
        this.setState({searchText: event.currentTarget.value})
    }

    onPositionSelect = (event) => {
        console.log(`Filter Position: ${event}`)
        this.setState({positionFilter: event})
    }

    onFilterDrafted = (event) => {
        console.log(`Filter Drafted: ${event}`)
        this.setState({filterDrafted: event.currentTarget.checked})
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
            players = this.props.league.players.filter((player) => {
                let nameMatch = player._player.name.toLowerCase().includes(this.state.searchText.toLowerCase())
                
                let positionMatch = true
                if (this.state.positionFilter == "Hitters") {
                    positionMatch = player._player.pos.includes("C") 
                    || player._player.pos.includes("1B")
                    || player._player.pos.includes("2B")
                    || player._player.pos.includes("3B")
                    || player._player.pos.includes("SS")
                    || player._player.pos.includes("OF")
                    || player._player.pos.includes("LF")
                    || player._player.pos.includes("CF")
                    || player._player.pos.includes("RF")
                    || player._player.pos.includes("DH")
                } else if (this.state.positionFilter == "Pitchers") {
                    positionMatch = player._player.pos.includes("SP") 
                    || player._player.pos.includes("RP")
                } else if (this.state.positionFilter == "OF") {
                    positionMatch = player._player.pos.includes("OF")
                    || player._player.pos.includes("LF")
                    || player._player.pos.includes("CF")
                    || player._player.pos.includes("RF")
                } else if (this.state.positionFilter) {
                    positionMatch = player._player.pos.includes(this.state.positionFilter)
                }

                var showIfDrafted = true
                if (this.state.filterDrafted) {
                    showIfDrafted = !player._team
                }

                return nameMatch && positionMatch && showIfDrafted
            }).slice(0, 100)
        }
        

        return (
            <Container>
                <Row bsPrefix="row mb-2">
                    <Col md="4" xs="12">
                    <InputGroup >
                        <InputGroup.Prepend>
                            <InputGroup.Text><Search/></InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl aria-describedby="basic-addon1" onChangeCapture={this.onSearch}/>
                    </InputGroup>
                    </Col>
                    <Col md="4" xs="6">
                    <DropdownButton
                        drop="down"
                        variant="secondary"
                        title={this.state.positionFilter ? this.state.positionFilter : "Positions"}
                        id="input-group-dropdown-1"
                        onSelect={this.onPositionSelect}
                        block
                        >
                        <Dropdown.Item>All</Dropdown.Item>
                        <Dropdown.Item eventKey="Hitters">Hitters</Dropdown.Item>
                        <Dropdown.Item eventKey="Pitchers">Pitchers</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item eventKey="C">C</Dropdown.Item>
                        <Dropdown.Item eventKey="1B">1B</Dropdown.Item>
                        <Dropdown.Item eventKey="2B">2B</Dropdown.Item>
                        <Dropdown.Item eventKey="3B">3B</Dropdown.Item>
                        <Dropdown.Item eventKey="SS">SS</Dropdown.Item>
                        <Dropdown.Item eventKey="OF">OF</Dropdown.Item>
                        <Dropdown.Item eventKey="DH">DH</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item eventKey="SP">SP</Dropdown.Item>
                        <Dropdown.Item eventKey="RP">RP</Dropdown.Item>
                    </DropdownButton>
                    </Col>
                    <Col md="4" xs="6">
                    <Form.Check bsPrefix="form-check flex-fill mt-2" type="checkbox" label="Hide Drafted Players" onChangeCapture={this.onFilterDrafted}/>
                    </Col>
                </Row>            
                
                <Table responsive="sm" size="sm" striped hover>
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
                                <tr key={player._id} player-id={player._id} onClick={this.handlePlayerClick} class={player._team ? "bg-dark" : ""}>
                                    <td component="th" scope="row">{player._player.rank == Number.MAX_SAFE_INTEGER ? 'NA' : player._player.rank}</td>
                                    <td>{player._player.name}</td>
                                    <td>{player._player.pos}</td>
                                    <td>{player._player.team}</td>
                                </tr>
                            ))
                            : <div>Loading</div>
                        }
                    </tbody>
                </Table>

                <PlayersDialog open={this.state.dialogOpen} onClose={this.handleDialogClose}/>
            </Container>
        );
    }
}
 
export default PlayersTable;