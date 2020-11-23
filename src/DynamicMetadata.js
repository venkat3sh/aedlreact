import React from "react";
// Material UI Imports
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import NoteAddTwoTone from '@material-ui/icons/NoteAddTwoTone';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import SuccessSnackbar from './SuccessSnackbar';

class DynamicMetadata extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false,
      password: "",
      error: false,
      errorMessage: "",
      submitError: "",
      sor_cds: ["naic", "edl", "edw", "cdl", "cii"],
      selected_sor_cd: "",
      domain_cds: ["Domain Code 1", "Domain Code 2"],
      selected_domain_cd: "",
      environment: "sit",
      selected_prcsng_type: "ingest",
      selected_trgt_pltfrm: "redshift",
      selected_trgt_schma: "gzip",
      selected_load_type: "full",
      selected_unld_file_type: "gzip",
      selected_job_type: "glue",
      errorInvalidJSON: "",
      rqstr_id: "",
      domain_cd: "Domain Code 1",
      sor_cd: "cii", 
      ownrshp_team: "Team 1",
      dropdown_options: {
        teams: ["Team 1", "Team 2"],
      }
    }
}

  componentDidMount() {        
    this.setState({
        src_clmn_list_file_txt: "na",
        delta_tbl_clmn_lst_txt: "na",
        domain_cd: "Domain Code 1",
        sor_cd: "cii",            
        schma_nm: "Schema Name"
    })        
    }

  handleClose = () => {
    this.setState({
      password: "",
      error: false,
      errorMessage: "",
    });

    // this.props.close()
  };

  handleChanges = e => {
    e.preventDefault();
    if (e.target.name === "trgt_tbl_nm") {
        e.target.value = e.target.value.toLowerCase()
    }
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleAutoCompleteChanges = e => {
    e.preventDefault();


    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleDropdownChange = name => event => {
    this.setState({
      ...this.state,
      [name]: event.target.value,
    });
  };

  getSorID = cd => {
    let mine = this.state.sor_cds.find(obj => obj.sor_cd.String === cd)
    if (mine) {
      let paddedString = mine.sor_id.String.padStart(4, '0')
      return paddedString
    } else {
      return '{missing sor_cd}'
    }
  }

  getDomID = cd => {
    let mine = this.state.domain_cds.find(obj => obj.domain_cd.String === cd)
    if (mine) {
      let paddedString = mine.domain_id.String.padStart(2, '0')
      return paddedString
    } else {
      return '{missing domain_cd}'
    }
  }

  getBktByEnv = () => {
    if (this.state.header === "s3_inbnd_bkt") {
        if (this.state.environment === 'sit'){
            this.setState({
                s3_inbnd_bkt: "antm-481935479534-ssm-sit-filetransfer"
            })
        } else {
            this.setState({
                s3_inbnd_bkt: "{not sit}"
            })
        }}
  }

  handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({
      snackbarIsOpen: false
    })
  };
  
  getInbndKeyValue = () => {
    // console.log("firing inbound key value fx")
    let valueString = "inbound/"+ this.state.domain_cd + "/" + this.state.sor_cd + "/" + this.state.trgt_tbl_nm
    return valueString
  }

  getJobName = () => {
    // console.log("firing get job name fx")
    let valueString = this.state.prcsng_type + "-" + this.state.trgt_tbl_nm
    return valueString
  }

  getDelTblNm = () => {
    // console.log("firing get del tbl name fx")
    let valueString = this.state.src_tbl_nm + "_del"
    return valueString
  }

  getStgTblNm = () => {
    // console.log("firing get stg tbl name fx")
    let valueString = this.state.trgt_tbl_nm + "_stg"
    return valueString
  }

  getArchvKeyValue = () => {
    // console.log("firing get archv key value fx")
    let valueString = this.state.domain_cd +"/" + this.state.sor_cd + "/" + this.state.trgt_tbl_nm
    return valueString
  }
  
  getBkupKeyValue = () => {
    // console.log("firing get bkup key value fx")
    let valueString = this.state.domain_cd +"/" + this.state.sor_cd + "/" + this.state.trgt_tbl_nm
    return valueString
  }
  
  getCnsmptnKeyValue = () => {
    // console.log("firing get cnsmptn key value fx")
    let valueString = this.state.domain_cd +"/" + this.state.sor_cd + "/" + this.state.trgt_tbl_nm
    return valueString
  }

  isJson = (str) => {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
  }

  closeErrorAlert = () => {
      this.setState({
          submitError: ''
      })
  }

  getDestnS3ObjKey = () => {
    let valueString = "inbound/"+ this.state.domain_cd + "/" + this.state.sor_cd + "/" + this.state.src_tbl_nm
    return valueString
  }

  submitRecord = () => {

    let newData = {
        src_sys_nm: this.state.sor_cd,
        schma_nm: this.state.schma_nm,
        src_tbl_nm: this.state.src_tbl_nm,
        src_clmn_list_file_txt: this.state.src_clmn_list_file_txt,
        delta_tbl_clmn_lst_txt: this.state.delta_tbl_clmn_lst_txt,
        rqstr_id: this.state.rqstr_id,
        ownrshp_team: this.state.ownrshp_team
    }

    console.log(newData);
    let url = 'https://972nit0yw1.execute-api.us-east-2.amazonaws.com/prod/vlcanmetadadata'

    return fetch(url, {
        method: 'post',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(newData)
    })
    .then(response => response.json())
    .then(result => {
        console.log(result)
        if (result.error_msg) {
            this.setState({
                submitError: result.error_msg
            })
        } else {
            this.updateOnInsert(result)
        }
    }).catch(err => {
        console.log(err)
    })
  }

  updateOnInsert = (result) => {
    this.setState({
      snackbarIsOpen: true,
      responseMessage: result,
      openRequestDialog: false
    })
    // this.getDataFromApi();
  }

  render() {    
    let FormFields = 
        <>
            <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            disabled={false}
            name="rqstr_id"
            label="Anthem ID"
            type="rqstr_id"
            id="rqstr_id"
            value={this.state.rqstr_id}
            onChange={this.handleChanges}
            error={this.state.rqstr_id === ""}
            helperText="Must enter Anthem ID"
            />
            <FormControl className="form-control" variant="outlined" margin="normal" error={this.state.ownrshp_team === ""}>
                <InputLabel id="demo-simple-select-label">ownrshp_team</InputLabel>
                <Select 
                name="ownrshp_team"
                value={this.state.ownrshp_team}
                onChange={this.handleChanges} 
                displayEmpty 
                className="select-empty" 
                labelWidth={100}>
                {this.state.dropdown_options.teams.map(team => 
                    <MenuItem value={team}>
                        <em>{team}</em>
                    </MenuItem>
                )}
                </Select>
                {this.state.ownrshp_team === "" ? (<FormHelperText>Must select an ownerhsip team</FormHelperText>) : null}
            </FormControl>             
            <FormControl className="form-control" variant="outlined" margin="normal" error={this.state.domain_cd === ""}>
                <InputLabel id="demo-simple-select-label">domain_cd</InputLabel>
                <Select 
                name="domain_cd"
                value={this.state.domain_cd}
                onChange={this.handleChanges} 
                displayEmpty 
                className="select-empty" 
                labelWidth={100}>
                {this.state.domain_cds.map(domainCD => 
                    <MenuItem value={domainCD}>
                        <em>{domainCD}</em>
                    </MenuItem>
                )}
                </Select>
                {this.state.domain_cd === "" ? (<FormHelperText>Must select a domain_cd</FormHelperText>) : null}
            </FormControl>
            <FormControl className="form-control" margin="normal" variant="outlined" error={this.state.sor_cd === ""}>
                <InputLabel id="demo-simple-select-label">sor_cd</InputLabel>
                <Select 
                name="sor_cd"
                value={this.state.sor_cd} 
                onChange={this.handleChanges} 
                displayEmpty 
                className="select-empty" 
                labelWidth={100}>
                {this.state.sor_cds.map(sorCD => 
                    <MenuItem value={sorCD}>
                        <em>{sorCD}</em>
                    </MenuItem>
                )}
                </Select>
                {this.state.sor_cd === "" ? (<FormHelperText>Must select a sor_cd</FormHelperText>) : null}
            </FormControl>            
            <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            required
            disabled={false}
            name="src_tbl_nm"
            label="src_tbl_nm"
            type="src_tbl_nm"
            id="src_tbl_nm"
            value="Source Table Name"//{this.state.src_tbl_nm}
            onChange={this.handleChanges}
            error={this.state.src_tbl_nm === ""}
            helperText={this.state.src_tbl_nm === "" ? "Must have a source table name" : ""}
            />
           <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            required
            disabled={false}
            name="src_clmn_list_file_txt"
            label="src_clmn_list_file_txt"
            type="src_clmn_list_file_txt"
            id="src_clmn_list_file_txt"
            value="Columns List"//{this.state.src_clmn_list_file_txt}
            onChange={this.handleChanges}
            />            
             <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            required
            disabled={false}
            name="delta_tbl_clmn_lst_txt"
            label="delta_tbl_clmn_lst_txt"
            type="delta_tbl_clmn_lst_txt"
            id="delta_tbl_clmn_lst_txt"
            value="Delta Column list"//{this.state.delta_tbl_clmn_lst_txt}
            onChange={this.handleChanges}
            />             
        </>  
    return (
        <>            
                <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    margin: "20px 0"
                }}
                >
                    <Avatar style={{ backgroundColor: "rgb(220, 0, 78)" }} >
                        <NoteAddTwoTone />
                    </Avatar>
                </div>
                
                {FormFields}
                    <Button onClick={this.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button
                    variant="contained"
                    color="primary"
                    disabled={!this.state.src_tbl_nm || !this.state.sor_cd || !this.state.domain_cd || !this.state.ownrshp_team || !this.state.rqstr_id}
                    onClick={this.submitRecord}
                    >
                        Insert
                    </Button>
                <SuccessSnackbar 
                      open={this.state.snackbarIsOpen} 
                      handleSnackbarClose={this.handleSnackbarClose} 
                      responseMessage={this.state.responseMessage}
                      />
        </>
        );
  }        
}

export default DynamicMetadata 