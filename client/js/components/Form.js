/**
 * Customized react form element
 *
 * render the UI stuffs
 */

import React, {Component} from 'react'
import {SelectField, MenuItem, TextField,
        RaisedButton, CircularProgress, Toggle,
        List, Chip} from 'material-ui'
import ContentDel from 'material-ui/svg-icons/content/remove'
import {amber500, cyan500} from 'material-ui/styles/colors'

// Stylesheets(inline)
const styles = {
  selectField: {
    icon: {
      fill: cyan500,
    }
  },
  textField: {
  },
  toggle: {
    marginTop: 15,
    marginBottom: 15
  },
  fontIcons: {
    marginTop: 8
  },
  button: {
    width: 256,
    height: 55,
    marginTop: 22,
    marginBotton: 22
  },
  uploadButton: {
    display: 'none'
  },
  chip: {
    margin: 4
  },
  circularProgress: {
    position: 'absolute',
    top: 9,
    left: 108
  }
}

// Selection field options
const teamOptions = [
  <MenuItem key={'rhd'} value={'rhd'} primaryText='rhd' />
]
const levelOptions = [
  <MenuItem key={'level3'} value={3} primaryText='level 3' />,
  <MenuItem key={'level4'} value={4} primaryText='level 4' />,
  <MenuItem key={'level5'} value={5} primaryText='level 5' />,
  <MenuItem key={'level6'} value={6} primaryText='level 6' />,
  <MenuItem key={'level7'} value={7} primaryText='level 7' />,
  <MenuItem key={'level8'} value={8} primaryText='level 8' />,
  <MenuItem key={'level9'} value={9} primaryText='level 9' />,
  <MenuItem key={'level10'} value={10} primaryText='level 10' />
]
const apparatusOptions = [
  <MenuItem key={'ball'} value={'ball'} primaryText='ball' />,
  <MenuItem key={'rope'} value={'rope'} primaryText='rope' />,
  <MenuItem key={'clubs'} value={'clubs'} primaryText='clubs' />,
  <MenuItem key={'ribbon'} value={'ribbon'} primaryText='ribbon' />,
  <MenuItem key={'floor'} value={'floor'} primaryText='floor' />
]

export default class Form extends Component {
  constructor(props) {
    super(props)

    this.state = {
      team: undefined,
      level: undefined,
      apparatus: undefined,
      isAthlete: false,
      firstName: "",
      lastName: "",
      files: []
    }

    this.handleTeamChange = this.handleTeamChange.bind(this)
    this.handleLevelChange = this.handleLevelChange.bind(this)
    this.handleapparatusChange = this.handleapparatusChange.bind(this)
    this.handleAthleteToggle = this.handleAthleteToggle.bind(this)
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this)
    this.handleLastNameChange = this.handleLastNameChange.bind(this)
    this.handleUpload = this.handleUpload.bind(this)
    this.handleRequestDelete = this.handleRequestDelete.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleTeamChange(e, index, value) {
    this.setState({
      team: value
    })
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

  handleAthleteToggle() {
    this.setState({
      isAthlete: !this.state.isAthlete
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
    var curFiles = this.state.files
    var files = e.target.files

    // Single file chosen
    if (curFiles.length === 1 && files.length > 0) {
      this.setState({
        files: [...curFiles, files[0]]
      })
      return
    }
    // No file chosen
    if (files.length > 1) {
      this.setState({
        files: [files[0], files[1]]
      })
    } else if (files.length === 1) {
      this.setState({
        files: [files[0]]
      })
    }
  }

  handleRequestDelete(key) {
    this.setState({
      files: this.state.files.filter(file => file.name !== key)
    })
  }

  handleSubmit(e) {
    e.preventDefault()

    // prevent click when uploading
    if (this.props.inProgress) {
      return
    }
    // input validation failed
    if (!this.props.onSubmit(this.state)) {
      return
    }
    // reset state after request is sent
    this.setState({
      team: undefined,
      level: undefined,
      apparatus: undefined,
      isAthlete: false,
      firstName: "",
      lastName: "",
      files: []
    })
  }

  render() {
    const { teamErrText, levelErrText, apparatusErrText, firstNameErrText, lastNameErrText, fileUploadErrText, inProgress } = this.props
    const spinnerDisplay = inProgress? 'inline-block' : 'none'

    return (
      <form method='post' encType='multipart/form-data'>

        <div className='row'>
          <div className='col-xs-12'>
            <SelectField
              disabled={inProgress}
              value={this.state.team}
              onChange={this.handleTeamChange}
              errorText={!this.state.team? teamErrText:null}
              floatingLabelText='Team'
              style={styles.selectField}
              iconStyle={!inProgress? styles.selectField.icon : null}
              >
              {teamOptions}
            </SelectField>
          </div>
        </div>

        <div className='row'>
          <div className='col-xs-12 col-sm-3'>
            <SelectField
              disabled={inProgress}
              value={this.state.level}
              onChange={this.handleLevelChange}
              errorText={!this.state.level? levelErrText : null}
              floatingLabelText='Level'
              style={styles.selectField}
              iconStyle={!inProgress? styles.selectField.icon : null}
              >
              {levelOptions}
            </SelectField>
          </div>
          <div className='col-xs-12 col-sm-offset-3 col-sm-3'>
            <SelectField
              disabled={inProgress}
              value={this.state.apparatus}
              onChange={this.handleapparatusChange}
              errorText={!this.state.apparatus? apparatusErrText : null}
              floatingLabelText='Apparatus'
              style={styles.selectField}
              iconStyle={!inProgress? styles.selectField.icon : null}
              >
              {apparatusOptions}
            </SelectField>
          </div>
        </div>

        <div style={styles.toggle} className='row'>
          <div style={styles.toggle.box} className='col-xs-12 col-sm-6'>
            <Toggle
              disabled={inProgress}
              label='Athlete'
              style={styles.toggle}
              labelPosition='right'
              toggled={this.state.isAthlete}
              onToggle={this.handleAthleteToggle}
              />
          </div>
        </div>

        {this.state.isAthlete?
          <div className='row'>
            <div className='col-xs-12 col-sm-3'>
              <TextField
                disabled={inProgress}
                style={styles.textField}
                hintText='First Name'
                value={this.state.firstName}
                errorText={!this.state.firstName? firstNameErrText : null}
                onChange={this.handleFirstNameChange}
                />
            </div>
            <div className='col-xs-12 col-sm-offset-3 col-sm-3'>
              <TextField
                disabled={inProgress}
                style={styles.textField}
                hintText='Last Name'
                value={this.state.lastName}
                errorText={!this.state.lastName? lastNameErrText : null}
                onChange={this.handleLastNameChange}
                />
            </div>
          </div> : null
        }

        <div className='row'>
          <div className='col-xs-12 col-sm-3'>
            <RaisedButton
              disabled={inProgress || this.state.files.length === 2}
              style={styles.button}
              label={
                (fileUploadErrText && this.state.files.length === 0?
                  <i style={styles.fontIcons} className='material-icons md-36 red500'>error_outline</i>:
                  <i style={styles.fontIcons} className='material-icons md-36'>cloud_upload</i>
                )
              }
              labelPosition='before'
              default={true}
              containerElement='label'
              >
              <input
                ref='uploader'
                style={styles.uploadButton}
                type='file'
                accept='file_extension|audio/*'
                disabled={inProgress || this.state.files.length === 2}
                onChange={this.handleUpload} multiple/>
            </RaisedButton>
          </div>

         {this.state.files.length > 0?
          <div className='col-xs-12'>
            <List>
              {this.state.files.map((file, x)=>
                <Chip
                  key={x}
                  onRequestDelete={() => this.handleRequestDelete(file.name)}
                  style={styles.chip}
                 >
                 {file.name}
               </Chip>
              )}
            </List>
          </div> : null}

          <div className='col-xs-12  col-sm-offset-3 col-sm-3'>
            <RaisedButton
              disabled={inProgress}
              style={styles.button}
              // label={<i style={styles.fontIcons} className='material-icons md-36'>send</i>}
              label='submit'
              labelPosition='before'
              primary={true}
              containerElement='label'
              >
              <input
                type='submit'
                style={{display: 'none'}}
                onClick={this.handleSubmit}
                />
              <CircularProgress
                style={Object.assign({display: spinnerDisplay}, styles.circularProgress)}
                color={amber500}
                />
            </RaisedButton>
          </div>
        </div>
      </form>
    )
  }
}
