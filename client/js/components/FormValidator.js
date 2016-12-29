/**
 * Parent component(wrapper of) the Form component
 *
 * Perform 2 tasks
 *  1. form validation
 *  2. async upload user data & files to my Dropbox
 */

import React, {Component} from 'react'
import {FlatButton, Dialog} from 'material-ui'

import Form from './Form'
import upload from '../utils/upload'

const TEXT_FIELD_ERR_MSG = 'This field is required'
const FILE_UPLOAD_ERR_MSG = 'Audio file is required'

const styles = {
  fontFamily: 'Roboto Mono',
  marginLeft: 'auto',
  marginRight: 'auto',
  width: '75%'
}

export default class FormValidator extends Component {
  constructor(props) {
    super(props)

    this.state = {
      uploadSucceed: false,
      uploadStarted: false,
      open: false,
      levelErrText: null,
      apparatusErrText: null,
      firstNameErrText: null,
      lastNameErrText: null,
      fileUploadErrText: null
    }

    this._validateUserInput = this._validateUserInput.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  _validateUserInput(input) {
    const { level, apparatus, firstName, lastName, fileContents } = input

    var allValid = true

    if (!level) {
      this.setState({
        levelErrText: TEXT_FIELD_ERR_MSG
      })
      allValid = false
    } else {
      this.setState({
        levelErrText: null
      })
    }
    if (!apparatus) {
      this.setState({
        apparatusErrText: TEXT_FIELD_ERR_MSG
      })
      allValid = false
    } else {
      this.setState({
        apparatusErrText: null
      })
    }
    if (!firstName || !firstName.trim()) {
      this.setState({
        firstNameErrText: TEXT_FIELD_ERR_MSG
      })
      allValid = false
    } else {
      this.setState({
        firstNameErrText: null
      })
    }
    if (!lastName || !lastName.trim()) {
      this.setState({
        lastNameErrText: TEXT_FIELD_ERR_MSG
      })
      allValid = false
    } else {
      this.setState({
        lastNameErrText: null
      })
    }
    if (fileContents.length === 0) {
      this.setState({
        fileUploadErrText: FILE_UPLOAD_ERR_MSG
      })
      allValid = false
    } else {
      this.setState({
        fileUploadErrText: null
      })
    }

    return allValid
  }

  handleSubmit(data) {
    if (!this._validateUserInput(data)) {
      return
    }

    this.setState({
      uploadStarted: true
    })

    const { level, apparatus, firstName, lastName, fileContents } = data
    var self = this

    return new Promise((resolve, reject) => {
      const n = fileContents.length;

      let uploadAsynTasks = [...Array(n).keys()].map(x => {
        return upload(
          level, apparatus, firstName, lastName, fileContents[x]
        )
      })

      return Promise.all(uploadAsynTasks)
        .then(values => {
          resolve(values)
        })
        .catch(err => reject(err))
    })
    .then(resolve => {
      console.log(resolve)
      self.setState({
          open: true,
          uploadSucceed: true,
          uploadStarted: false
      })
    })
    .catch(rej => {
      console.log(rej)
      self.setState({
        open: true,
        uploadSucceed: false,
        uploadStarted: false
      })
    })
  }

  handleClose() {
    this.setState({
      open: false,
      uploadSucceed: false
    })
  }

  render() {
    const actions = this.state.uploadSucceed ?
      <FlatButton
        label='Ok ✔︎'
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
        />
        :
      <FlatButton
        label="I see"
        default={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
        />

    return(
      <div
        style={styles}
        >
        <Form
          levelErrText={this.state.levelErrText}
          apparatusErrText={this.state.apparatusErrText}
          firstNameErrText={this.state.firstNameErrText}
          lastNameErrText={this.state.lastNameErrText}
          fileUploadErrText={this.state.fileUploadErrText}
          onSubmit={this.handleSubmit}
          inProgress={this.state.uploadStarted}
          />

        <Dialog
          actions={actions}
          open={this.state.open}
          onRequestClose={this.handleClose}
          >
          {this.state.uploadSucceed? 'Thanks a lot, you are all set' : 'Ohoops, something went wrong :('}
        </Dialog>
      </div>
    )
  }
}
