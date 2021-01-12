/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from "react";
import ChartistGraph from "react-chartist";
import { Container, Row, Col } from "react-bootstrap";

import { Card } from "../components/Card/Card.jsx";
import { StatsCard } from "../components/StatsCard/StatsCard.jsx";
import { Tasks } from "../components/Tasks/Tasks.jsx";
import {
  dataPie,
  legendPie,
  dataSales,
  optionsSales,
  responsiveSales,
  legendSales,
  dataBar,
  optionsBar,
  responsiveBar,
  legendBar
} from "../variables/Variables.jsx";
import axios from "axios";
import GetTableEvents from "../rest_requests/GetTableEvents";

export class Dashboard extends Component {

  state = {
    events: [],
    counter: 0
  }

  componentDidMount() {

    /**
     * GetTableEvents-Request for all Events
     */
    axios.get(`http://localhost:3001/events/getEvents`)
        .then(res => {

          console.log(res);
          const events = res.data;

          this.setState({ events }); // Speichern in Array

        })
        .catch(function (error) {
          // Fehlerbehandlung - auch hier können Informationen mit Schlüsselwörtern gefiltert werden
          console.log(error + ' Fehler! Code: ' + error.staus);
        })

  }

  createLegend(json) {
    var legend = [];
    for (var i = 0; i < json["names"].length; i++) {
      var type = "fa fa-circle text-" + json["types"][i];
      legend.push(<i className={type} key={i} />);
      legend.push(" ");
      legend.push(json["names"][i]);
    }
    return legend;
  }
  render() {
    return (
      <div className="content">
        <Container fluid>
          <Row>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-server text-warning" />}
                statsText="Events"
                statsValue={this.state.events.length}

              />
            </Col>

          </Row>
          <Row>
            <Col md={6}>
              <Card
                  title="Next Events"
                  category="Upcoming"
                  content={
                    <div className="table-full-width">
                      <table className="table">
                        <GetTableEvents events={0} />
                      </table>
                    </div>
                  }
              />
            </Col>

          </Row>
        </Container>
      </div>
    );
  }
}

export default Dashboard;
