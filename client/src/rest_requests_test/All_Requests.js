import React from "react";
import User_PrintList from "./User_PrintList";
import User_Add from "./User_Add";
import User_Delete from "./User_Delete";
import Put from "./Unused_Put";
import Patch from "./User_Update";
import User_PrintSingleUser from "./User_PrintSingleUser";
import Place_PrintList from "./Place_PrintList";
import Place_Add from "./Place_Add";
import Place_Delete from "./Place_Delete";
import Place_Update from "./Place_Update";
import Place_PrintSinglePlace from "./Place_PrintSinglePlace";
import User_Actual from "./User_Actual";

export class All_Requests extends React.Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <div id={"DB-Tests"}>

                <div id={"User-DB-Eintragen-Tests"}>
                    <br/>
                    ----------------------------------------------------------------------------
                    <br/><br/>
                    <h2> USERS </h2>
                    <br/>
                    <h3>User Eintragen</h3>
                    <User_Actual/>
                </div>

                <div id={"User-DB-Tests"}>
                    <br/>
                    ----------------------------------------------------------------------------
                    <br/><br/>
                    <h2> USERS </h2>
                    <br/>
                    <h3>Einzelne User</h3>
                    <User_PrintSingleUser/>
                    <br/>
                    <h3>Userliste</h3>
                    <User_PrintList/>
                    <br/>
                    <h3>User anlegen</h3>
                    <User_Add></User_Add>
                    <br/>
                    <h3>Userdaten ändern</h3>
                    <Patch/>
                    <br/>
                    <h3>User löschen</h3>
                    <User_Delete/>
                </div>


                <div id={"Places-DB-Tests"}>
                    <br/>
                    ----------------------------------------------------------------------------
                    <br/><br/>
                    <h2> PLACES </h2>
                    <br/>
                    {/*<h3>0. Christians Single GET-Request</h3>*/}
                    <h3>Einzelne Orte</h3>
                    <Place_PrintSinglePlace/>
                    {/*<h3>1. Christians GET-Request</h3>*/}
                    <h3>Ortsliste</h3>
                    <Place_PrintList/>
                    {/*<h3>2. POST-Request</h3>*/}
                    <h3>Ort anlegen</h3>
                    <Place_Add/>
                    {/*<h3>3. Patch-Request</h3>*/}
                    <h3>Ortsdaten ändern</h3>
                    <Place_Update/>
                    {/*<h3>4. Delete-Request</h3>*/}
                    <h3>Ort löschen</h3>
                    <Place_Delete/>
                    <br/>
                    ----------------------------------------------------------------------------
                </div>



            </div>
        )
    }
}
