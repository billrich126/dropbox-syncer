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
    height: 72
  },
  toggle: {
    /* center toggle -start */
    // position: 'relative',
    // marginLeft: '50%',
    // transform: 'translateX(-50%)',
    /* center toggle -end */
    width: 256,
    /* using margin: auto to center an inner div */
    margin: '36px auto'
  },
  fontIcons: {
    marginTop: 8
  },
  button: {
    width: 256,
    height: 55,
    marginTop: 36,
    marginBotton: 36
  },
  uploadButton: {
    display: 'none'
  },
  chip: {
    /* center chip */
    margin: '10px auto'
  },
  circularProgress: {
    position: 'absolute',
    top: 9,
    left: 108
  }
}

// Selection field options
const teamOptions = [
  <MenuItem key={'RHD'} value={'rhd'} primaryText='Rhythmic Dreams-rhd'/>,
  <MenuItem key={'FET'} value={'FET'} primaryText='Fitness Elite Training Center'/>,
  <MenuItem key={'NSA'} value={'NSA'} primaryText='New England Sports Academy'/>,
  <MenuItem key={'NER'} value={'NER'} primaryText='North-East Rhythmics'/>,
  <MenuItem key={'DRG'} value={'DRG'} primaryText='Dynamics Rhythmic Gymnastics'/>,
  <MenuItem key={'GOR'} value={'GOR'} primaryText='Golden Ray Phythmics'/>,
  <MenuItem key={'GYU'} value={'GYU'} primaryText='Gymnastics Unlimited'/>,
  <MenuItem key={'ISA'} value={'ISA'} primaryText='Isadora Rhythmics'/>,
  <MenuItem key={'MAT'} value={'MAT'} primaryText='MatchPoint NYC'/>,
  <MenuItem key={'CTR'} value={'CTR'} primaryText='CT Rhythmic Gymnastic Academy'/>,
  <MenuItem key={'GWA'} value={'GWA'} primaryText='Gymnastics World Academy'/>,
  <MenuItem key={'ISR'} value={'ISR'} primaryText='Inspiration School of Rhythmic Gymnastics'/>,
  <MenuItem key={'LIB'} value={'LIB'} primaryText='Liberty Academy of Rhythmic Gymnastics'/>,
  <MenuItem key={'MID'} value={'MID'} primaryText='Middlesex Gymnastics Academy'/>
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
  <MenuItem key={'hoop'} value={'hoop'} primaryText='hoop' />,
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
      <form  method='post' encType='multipart/form-data'>

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
          <div className='col-xs-12 col-sm-6'>
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
          <div className='col-xs-12 col-sm-6'>
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

        <div className='row'>
          <div className='col-xs-12'>
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
          <div className='col-xs-12 col-sm-6'>
            <TextField
              disabled={inProgress}
              style={styles.textField}
              hintText='First Name'
              value={this.state.firstName}
              errorText={!this.state.firstName? firstNameErrText : null}
              onChange={this.handleFirstNameChange}
              />
          </div>
          <div className='col-xs-12 col-sm-6'>
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
          <div className='col-xs-12 col-sm-6'>
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

            {this.state.files.length > 0?
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
              : null}
          </div>

          <div className='col-xs-12 col-sm-6'>
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
