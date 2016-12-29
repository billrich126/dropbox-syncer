/**
 * This file isn't used
 *
 * Basically, it does 2 things
 *  1. form input validation
 *  2. send ajax calls to my proxy server for safety concerns
 */


// import React, {Component} from 'react'
// import {FlatButton, Dialog} from 'material-ui'
// import Form from './Form'
//
// const TEXT_FIELD_ERR_MSG = 'This field is required'
// const FILE_UPLOAD_ERR_MSG = 'Audio file is required'
//
// const styles = {
//   fontFamily: 'Roboto Mono',
//   marginLeft: 'auto',
//   marginRight: 'auto',
//   width: '75%'
// }
//
// export default class FormWrapper extends Component {
//   constructor(props) {
//     super(props)
//
//     this.state = {
//       uploadSucceed: false,
//       open: false,
//       levelErrText: null,
//       apparatusErrText: null,
//       firstNameErrText: null,
//       lastNameErrText: null,
//       fileUploadErrText: null
//     }
//
//     this._validateUserInput = this._validateUserInput.bind(this)
//     this.handleSubmit = this.handleSubmit.bind(this)
//     this.handleClose = this.handleClose.bind(this)
//   }
//
//   _validateUserInput(input) {
//     const { level, apparatus, firstName, lastName, fileContents } = input
//
//     var allValid = true
//
//     if (!level) {
//       this.setState({
//         levelErrText: TEXT_FIELD_ERR_MSG
//       })
//       allValid = false
//     } else {
//       this.setState({
//         levelErrText: null
//       })
//     }
//     if (!apparatus) {
//       this.setState({
//         apparatusErrText: TEXT_FIELD_ERR_MSG
//       })
//       allValid = false
//     } else {
//       this.setState({
//         apparatusErrText: null
//       })
//     }
//     if (!firstName || !firstName.trim()) {
//       this.setState({
//         firstNameErrText: TEXT_FIELD_ERR_MSG
//       })
//       allValid = false
//     } else {
//       this.setState({
//         firstNameErrText: null
//       })
//     }
//     if (!lastName || !lastName.trim()) {
//       this.setState({
//         lastNameErrText: TEXT_FIELD_ERR_MSG
//       })
//       allValid = false
//     } else {
//       this.setState({
//         lastNameErrText: null
//       })
//     }
//     if (fileContents.length === 0) {
//       this.setState({
//         fileUploadErrText: FILE_UPLOAD_ERR_MSG
//       })
//       allValid = false
//     } else {
//       this.setState({
//         fileUploadErrText: null
//       })
//     }
//
//     return allValid
//   }
//
//   handleSubmit(data) {
//     if (!this._validateUserInput(data)) {
//       return
//     }
//
//     var xhr = new XMLHttpRequest()
//     xhr.open("POST", "/upload", true)
//     xhr.onreadystatechange = function() {
//       if (xhr.readyState === 4) {
//         this.setState({
//           open: true
//         })
//
//         var state = JSON.parse(xhr.responseText)
//         if (xhr.status === 200 || state.uploaded) {
//           this.setState({
//             uploadSucceed: true
//           })
//         } else {
//           this.setState({
//             uploadSucceed: false
//           })
//         }
//       }
//     }.bind(this)
//
//     var formData = new FormData()
//     for (let x = 0; x < data.fileContents; x++) {
//       formData.append(`fileContents${x}`, data.fileContents[x])
//     }
//     for (let prop of Object.keys(data)) {
//       formData.append(prop, data[prop])
//     }
//     // xhr.setRequestHeader('Content-type', 'multipart/form-data')
//     xhr.send(formData)
//   }
//
//   handleClose() {
//     this.setState({
//       open: false,
//       uploadSucceed: false
//     })
//   }
//
//   render() {
//     const actions =  this.state.uploadSucceed ?
//       <FlatButton
//         label='Ok ✔︎'
//         primary={true}
//         keyboardFocused={true}
//         onTouchTap={this.handleClose}
//         />
//         :
//       <FlatButton
//         label="I see"
//         default={true}
//         keyboardFocused={true}
//         onTouchTap={this.handleClose}
//         />
//
//     return(
//       <div
//         style={styles}
//         >
//         <Form
//           ref="myForm"
//           levelErrText={this.state.levelErrText}
//           apparatusErrText={this.state.apparatusErrText}
//           firstNameErrText={this.state.firstNameErrText}
//           lastNameErrText={this.state.lastNameErrText}
//           fileUploadErrText={this.state.fileUploadErrText}
//           onSubmit={this.handleSubmit}
//           />
//
//         <Dialog
//           actions={actions}
//           open={this.state.open}
//           onRequestClose={this.handleClose}
//           >
//           {this.state.uploadSucceed? 'Thanks a lot, you are all set' : 'Ohoops, something went wrong :('}
//         </Dialog>
//       </div>
//     )
//   }
// }
