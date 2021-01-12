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
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import Checkbox from "../../components/CustomCheckbox/CustomCheckbox.jsx";
import Button from "../../components/CustomButton/CustomButton.jsx";

export class Tasks extends Component {
  handleCheckbox = event => {
    const target = event.target;
    console.log(event.target);
    this.setState({
      [target.name]: target.checked
    });
  };
  render() {
    /*const edit = <Tooltip id="edit_tooltip">Edit Task</Tooltip>;
    const remove = <Tooltip id="remove_tooltip">Remove</Tooltip>;*/
    const tasks_title = [
      'XX',
      'XX'
    ];
    var tasks = [];
    var number;
    for (var i = 0; i < tasks_title.length; i++) {
      number = "checkbox" + i;
      tasks.push(
        <tr key={i}>
          <td>

          </td>
          <td>{tasks_title[i]}</td>
          <td className="td-actions text-right">

          </td>
        </tr>
      );
    }
    return <tbody>{tasks}</tbody>;
  }
}

export default Tasks;