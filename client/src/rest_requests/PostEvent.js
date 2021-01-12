import React from 'react';
import axios from 'axios';
import {Col, Container, Row} from "react-bootstrap";
import {Card} from "../components/Card/Card";

const opencage = require('opencage-api-client');

export default class PostEvent extends React.Component {
    state = {
        name: '',
        lng: '',
        lat: '',
        desc: '',
        date: ''
    }



    handleChangeName = event => {
        this.setState({ name: event.target.value });
    }

    handleChangeAddress = event => {
        opencage.geocode({q: event.target.value, key: "cea7ad2df2d840af9721a1df325eb7b7"})
            .then(response => {
                console.log(response.results[0].geometry)
                const { lat, lng } = response.results[0].geometry;
                this.setState({lat: lat});
                this.setState({lng: lng});

            })
            .catch((error) => {
                console.log('error ' + error.message);
            })
        }


    handleChangeDesc = event => {
        this.setState({ desc: event.target.value });
    }

    handleChangeDate = event => {
        this.setState({ date: event.target.value });
    }


    handleSubmit = event => {
        event.preventDefault();

        const shortevent = {
            name: this.state.name,
            lng: this.state.lng,
            lat: this.state.lat,
            description: this.state.desc,
            date: this.state.date
        };

        const json = JSON.stringify(shortevent);
        console.log(json);
        console.log(shortevent);

        // PostEvent-Request
        axios.post(`http://localhost:3001/events/`,  json, {
            headers: {
                // Overwrite Axios's automatically set Content-Type
                'Content-Type': 'application/json'
            }})
            .then(res => {
                // Ergebnisbehandlung
                console.log(res);
                const feedback = res.data;
                this.setState({feedback: feedback.Message});
            })
            .catch(function (error) {
                // Fehlerbehandlung
                console.log(error);
            })
    }

    render() {

        // Inputfeld für PostEvent-Request
        return (
            <div>

                <Container fluid>
                    <Row>
                        <Col md={6}>
                            <Card
                                title="Create"
                                category="Create a new Event"
                                content={
                                    <div className="table-full-width">
                                        <div className="createArea">
                                            <form onSubmit={this.handleSubmit}>
                                                <div className="form-group row">
                                                    <label htmlFor="name" className="col-4 col-form-label">Event Name</label>
                                                    <div className="col-8">
                                                        <input id="name" name="name" type="text" className="form-control" onChange={this.handleChangeName} />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label htmlFor="lng" className="col-4 col-form-label">Address</label>
                                                    <div className="col-8">
                                                        <input id="address" name="address" type="text" className="form-control"  onChange={this.handleChangeAddress}/>
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label htmlFor="desc" className="col-4 col-form-label">Description</label>
                                                    <div className="col-8">
                                                        <input id="desc" name="desc" type="text" className="form-control"  onChange={this.handleChangeDesc}/>
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label htmlFor="date" className="col-4 col-form-label">Date</label>
                                                    <div className="col-8">
                                                        <input id="date" name="date" type="text" className="form-control"  onChange={this.handleChangeDate}/>
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <div className="offset-4 col-8">
                                                        <button name="submit" type="submit" className="btn btn-primary">Submit</button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                }
                            />
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
