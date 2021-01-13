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

                    <GetTableEvents events={1} />

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
