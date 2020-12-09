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
import Container from 'react-bootstrap/Container'


export class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <Container fluid>

          <p className="copyright pull-right">
            &copy; {new Date().getFullYear()}{" "} MyEvents - Theme by {" "}
            <a href="http://www.creative-tim.com?ref=lbr-footer">
               Creative Tim
            </a>
            {" - "}Icons by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
          </p>
        </Container>
      </footer>
    );
  }
}

export default Footer;
