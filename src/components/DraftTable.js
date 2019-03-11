import React, { Component } from 'react';
import PlayersDialog from './PlayerDialog'
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import InputGroup from 'react-bootstrap/InputGroup'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Search from 'react-feather/dist/icons/search';
import PlayerTable from './PlayerTable'

const columns = {
    rankings:   ['#', 'Name', 'Positions', 'Team'],
    hitting:    ['#', 'Name', 'Positions', 'Team', 'R', 'HR', 'RBI', 'AVG', 'SB'],
    pitching:   ['#', 'Name', 'Positions', 'Team', 'ERA', 'WHIP', 'K', 'W', 'S'],
};

const positions = {
    hitting:    ['C', '1B', '2B', '3B', 'SS', 'OF', 'CF', 'LF', 'RF', 'DH'],
    pitching:   ['SP', 'RP'],
    outfield:   ['OF', 'CF', 'LF', 'RF'],
}

const DisplayTypeEnum = {
    Ranking:    1,
    Hitting:    2,
    Pitching:   3,
}

class PlayersTable extends Component {
    state = {
        dialogOpen: false,
        dialogPlayer: null,
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

    handlePlayerClick = (player) => {
        this.setState({dialogOpen: true, dialogPlayer: player})
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

    render() {

        // TODO - Add pagination and show stats when pos filter selected

        var displayType = DisplayTypeEnum.Ranking
        var players = []
        var cols = columns.rankings;

        // TODO - When filtering by position, update ranking to reflect ranking within that position
        if (this.props.league) {
            players = this.props.league.players.filter((player) => {
                let nameMatch = player._player.name.toLowerCase().includes(this.state.searchText.toLowerCase())
                
                let positionMatch = true
                if (this.state.positionFilter === "Hitters") {
                    displayType = DisplayTypeEnum.Hitting
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
                } else if (this.state.positionFilter === "Pitchers") {
                    displayType = DisplayTypeEnum.Pitching
                    positionMatch = player._player.pos.includes("SP") 
                    || player._player.pos.includes("RP")
                } else if (this.state.positionFilter === "OF") {
                    displayType = DisplayTypeEnum.Hitting
                    positionMatch = player._player.pos.includes("OF")
                    || player._player.pos.includes("LF")
                    || player._player.pos.includes("CF")
                    || player._player.pos.includes("RF")
                } else if (this.state.positionFilter) {
                    if (positions.hitting.includes(this.state.positionFilter)) {
                        displayType = DisplayTypeEnum.Hitting
                    } else if (positions.pitching.includes(this.state.positionFilter)) {
                        displayType = DisplayTypeEnum.Pitching
                    }
                    positionMatch = player._player.pos.includes(this.state.positionFilter)
                }

                var showIfDrafted = true
                if (this.state.filterDrafted) {
                    showIfDrafted = !player._team
                }

                return nameMatch && positionMatch && showIfDrafted
            }).slice(0, 100)
        }
        
        if (this.state.positionFilter === "Hitters" || positions.hitting.includes(this.state.positionFilter)) {
            displayType = DisplayTypeEnum.Hitting
            cols = columns.hitting
        } else if (this.state.positionFilter === "Pitchers" || positions.pitching.includes(this.state.positionFilter)) {
            displayType = DisplayTypeEnum.Pitching
            cols = columns.pitching
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
                
                <PlayerTable cols={cols} players={players} displayType={displayType} handlePlayerClick={this.handlePlayerClick} />

                <PlayersDialog 
                open={this.state.dialogOpen} 
                onClose={this.handleDialogClose} 
                player={this.state.dialogPlayer} 
                teams={this.props.league ? this.props.league.teams : null}/>
            </Container>
        );
    }
}
 
export default PlayersTable;