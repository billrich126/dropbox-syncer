/**
 * Customized react Form element
 *
 * render the UI stuffs
 */


import React, {Component} from 'react'
import {SelectField, MenuItem, TextField, RaisedButton,
        FontIcon, Badge, IconButton, CircularProgress} from 'material-ui'
import UploadIcon from 'material-ui/svg-icons/file/cloud-upload'
import {purple100, amber500} from 'material-ui/styles/colors'

const styles = {
  customWidth: {
    width: 200
  },
  textField: {
    height: 72
  },
  button: {
    width: 256,
    height: 55,
    marginTop: 22,
    marginBotton: 22
  },
  uploadButton: {
    display: 'none'
  }
}

const levelOptions = [
  <MenuItem key={"level3"} value={3} primaryText="level 3" />,
  <MenuItem key={"level4"} value={4} primaryText="level 4" />,
  <MenuItem key={"level5"} value={5} primaryText="level 5" />,
  <MenuItem key={"level6"} value={6} primaryText="level 6" />,
  <MenuItem key={"level7"} value={7} primaryText="level 7" />,
  <MenuItem key={"level8"} value={8} primaryText="level 8" />,
  <MenuItem key={"level9"} value={9} primaryText="level 9" />,
  <MenuItem key={"level10"} value={10} primaryText="level 10" />
]
const apparatusOptions = [
  <MenuItem key={"ball"} value={"ball"} primaryText="ball" />,
  <MenuItem key={"rope"} value={"rope"} primaryText="rope" />,
  <MenuItem key={"clubs"} value={"clubs"} primaryText="clubs" />,
  <MenuItem key={"ribbon"} value={"ribbon"} primaryText="ribbon" />,
  <MenuItem key={"floor"} value={"floor"} primaryText="floor" />
]

export default class Form extends Component {
  constructor(props) {
    super(props)

    this.state = {
      level: null,
      apparatus: null,
      firstName: null,
      lastName: null,
      fileContents: [],
      chosenFile: null
    }

    this.handleLevelChange = this.handleLevelChange.bind(this)
    this.handleapparatusChange = this.handleapparatusChange.bind(this)
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this)
    this.handleLastNameChange = this.handleLastNameChange.bind(this)
    this.handleUpload = this.handleUpload.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleLevelChange(e, index, value) {
    this.setState({
      level: value
    })
  }
  handleapparatusChange(e, index, value) {
    this.setState({
      apparatus: value
    })
  }
  handleFirstNameChange(e) {
    this.setState({
      firstName: e.target.value
    })
  }
  handleLastNameChange(e) {
    this.setState({
      lastName: e.target.value
    })
  }
  handleUpload(e) {
    var files = e.target.files
    this.setState({
      fileContents: files,
      chosenFile: this.refs.uploader.value
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    const {onSubmit} = this.props
    onSubmit(this.state)
  }

  render() {
    const { levelErrText, apparatusErrText, firstNameErrText, lastNameErrText, fileUploadErrText, inProgress } = this.props
    const spinnerDisplay = inProgress? 'inline-block' : 'none'

    return (

      <form method="post" encType="multipart/form-data">

        <div className="row">
          <div className="col-xs-12 col-sm-6">
            <SelectField
              value={this.state.level}
              onChange={this.handleLevelChange}
              errorText={levelErrText}
              floatingLabelText="Level"
              >
              {levelOptions}
            </SelectField>
          </div>
          <div className="col-xs-12 col-sm-6">
            <SelectField
              value={this.state.apparatus}
              onChange={this.handleapparatusChange}
              errorText={apparatusErrText}
              floatingLabelText="Apparatus"
              >
              {apparatusOptions}
            </SelectField>
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12 col-sm-6">
            <TextField
              style={styles.textField}
              hintText="First Name"
              errorText={firstNameErrText}
              onChange={this.handleFirstNameChange}
              />
          </div>
          <div className="col-xs-12 col-sm-6">
            <TextField
              style={styles.textField}
              hintText="Last Name"
              errorText={lastNameErrText}
              onChange={this.handleLastNameChange}
              />
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12 col-sm-6">
            <RaisedButton
              style={styles.button}
              label={!this.state.chosenFile?
                  "Upload 📂" : this.state.chosenFile}
              labelPosition="before"
              default={true}
              containerElement="label"
              >
              <input
                ref="uploader"
                style={styles.uploadButton}
                type="file"
                accept="file_extension|audio/*"
                onChange={this.handleUpload} multiple/>
            </RaisedButton>
          </div>
          <div className="col-xs-12 col-sm-6">
            <RaisedButton
              style={styles.button}
              disabled={inProgress}
              label="submit"
              labelPosition="before"
              primary={true}
              containerElement="label"
              >
              <input type="submit" style={{display: 'none'}} onClick={this.handleSubmit} />
              <CircularProgress
                style={{display: spinnerDisplay, position: 'absolute', top: 9, left: 108}}
                color={amber500}
                />
            </RaisedButton>
          </div>
        </div>

      </form>
    )
  }
}
