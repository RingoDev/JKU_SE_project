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
import { Container, Row, Col, Table } from "react-bootstrap";

import Card from "../components/Card/Card.jsx";
import { thArray, tdArray } from "../variables/Variables.jsx";
import GetTableEvents from "../rest_requests/GetTableEvents";

export class TableList extends Component {
  render() {
    return (
      <div className="content">
        <Container fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Events"
                category="Hier finden Sie alle Events"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <Table striped hover>
                    <thead>
                      <tr>
                        {thArray.map((prop, key) => {
                          return <th key={key}>{prop}</th>;
                        })}
                      </tr>
                    </thead>

                    <GetTableEvents events={1}></GetTableEvents>

                  </Table>
                }
              />
            </Col>

          </Row>
        </Container>
      </div>
    );
  }
}

export default TableList;
