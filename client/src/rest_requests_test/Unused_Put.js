// import React from 'react';
// import axios from 'axios';
// // Documentation axios: https://www.npmjs.com/package/axios#axios-api
//
// export default class Put extends React.Component {
//     state = {
//         userId: '',
//         mail: '',
//         feedback: '',
//     }
//
//     handleChangeId = event => {
//         this.setState({ userId: event.target.value });
//     }
//     handleChangeMail = event => {
//         this.setState({ mail: event.target.value });
//     }
//
//     handleSubmit = event => {
//         event.preventDefault();
//
//         const userMail = {
//             userId: this.state.userId,
//             mail: this.state.mail
//         };
//
//         // Put-Request
//         axios.put(`https://62f04fea-d91c-4309-a2de-3f459811c96c.mock.pstmn.io/putMail`, { userMail })
//             .then(res => {
//                 // Ergebnisbehandlung
//                 console.log(res);
//
//                 const feedback = res.data;
//                 this.setState({feedback: feedback.Message});
//                 console.log(this.state.feedback);
//             })
//             .catch(function (error) {
//                 // Fehlerbehandlung
//                 console.log(error);
//             })
//     }
//
//     render() {
//
//         // Inputfeld für Put-Request
//         return (
//             <div>
//                 <form onSubmit={this.handleSubmit}>
//                     <label>
//                         User Id:
//                         <input className={"ip-field"} type="text" name="userId" onChange={this.handleChangeId} />
//                     </label>
//                     <br />
//                     <label>
//                         E-Mail:
//                         <input className={"ip-field"} type="text" name="mail" onChange={this.handleChangeMail} />
//                     </label>
//                     <br />
//                     <p className={"fb-field"} type="text" name="feedback">{this.state.feedback}</p>
//                     <button type="submit">Add</button>
//                 </form>
//             </div>
//         )
//     }
// }
