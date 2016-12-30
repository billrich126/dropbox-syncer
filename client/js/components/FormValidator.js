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

const SELECT_FIELD_ERR_MSG = 'Selection is required'
const TEXT_FIELD_ERR_MSG = 'This field is required'
const FILE_UPLOAD_ERR_MSG = 'File upload is required'

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
      teamErrText: null,
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
    const { team, level, apparatus, isAthlete, firstName, lastName, files } = input

    var allValid = true

    // selection fields
    if (!team) {
      this.setState({
        teamErrText: SELECT_FIELD_ERR_MSG
      })
      allValid = false
    } else {
      this.setState({
        teamErrText: null
      })
    }
    if (!level) {
      this.setState({
        levelErrText: SELECT_FIELD_ERR_MSG
      })
      allValid = false
    } else {
      this.setState({
        levelErrText: null
      })
    }
    if (!apparatus) {
      this.setState({
        apparatusErrText: SELECT_FIELD_ERR_MSG
      })
      allValid = false
    } else {
      this.setState({
        apparatusErrText: null
      })
    }

    // text fieds
    if (isAthlete && (!firstName || !firstName.trim())) {
      this.setState({
        firstNameErrText: TEXT_FIELD_ERR_MSG
      })
      allValid = false
    } else {
      this.setState({
        firstNameErrText: null
      })
    }
    if (isAthlete && (!lastName || !lastName.trim())) {
      this.setState({
        lastNameErrText: TEXT_FIELD_ERR_MSG
      })
      allValid = false
    } else {
      this.setState({
        lastNameErrText: null
      })
    }

    // file upload
    if (files.length === 0) {
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
      return false
    }

    this.setState({
      uploadStarted: true
    })

    const { team, level, apparatus, firstName, lastName, files } = data
    var self = this

    return new Promise((resolve, reject) => {
      const n = files.length;

      let uploadAsynTasks = [...Array(n).keys()].map(x => {
        return upload(
          team, level, apparatus, firstName, lastName, files[x]
        )
      })

      return Promise.all(uploadAsynTasks)
        .then(values => {
          resolve(values)
        })
        .catch(err => reject(err))
    })
    .then(resolve => {
      self.setState({
          open: true,
          uploadSucceed: true,
          uploadStarted: false
      })
    })
    .catch(rej => {
      self.setState({
        open: true,
        uploadSucceed: false,
        uploadStarted: false
      })
    })

    return true
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
          teamErrText={this.state.teamErrText}
          levelErrText={this.state.levelErrText}
          apparatusErrText={this.state.apparatusErrText}
          firstNameErrText={this.state.firstNameErrText}
          lastNameErrText={this.state.lastNameErrText}
          fileUploadErrText={this.state.fileUploadErrText}
          onSubmit={this.handleSubmit}
          onUpload={this.handleUpload}
          inProgress={this.state.uploadStarted}
          />

        <Dialog
          actions={actions}
          open={this.state.open}
          onRequestClose={this.handleClose}
          >
          {this.state.uploadSucceed? 'Thanks a lot! 🎉🎉🎉🎉🎉' : 'Ohoops! Upload failed ☹️ follow the instructions please.'}
        </Dialog>
      </div>
    )
  }
}
