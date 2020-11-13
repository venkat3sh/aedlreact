import React from "react";
// Material UI Imports
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import NoteAddTwoTone from '@material-ui/icons/NoteAddTwoTone';
import Tooltip from '@material-ui/core/Tooltip';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
// Component Imports
// import InsertRecordButton from '../utils/InsertRecordButton'
// import ErrorAlert from '../utils/ErrorAlert'
// import JobID from '../config/JobID'
// import axios from 'axios'
// import { baseURL } from '../utils/BaseURL'

// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
// React Router Import
// import {withRouter} from 'react-router';

class RequestVulcanDialog extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false,
      password: "",
      error: false,
      errorMessage: "",
      submitError: "",
      sor_cds: [],
      selected_sor_cd: "",
      domain_cds: [],
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
      ownrshp_team: "",
      dropdown_options: {
        teams: [],
        destn_type_descs: [],
        db_type_descs: [],
        ctlg_nms: [],
        trgt_tbl_rfrsh_types: [],
        actv_flags: []
      }
    }
}

//   componentDidMount() {
//         let editedHeaders = this.props.headers.filter(header => header !== "tableData")
//         editedHeaders.forEach(header =>
//             this.setState({
//                 [header]: ""
//             })      
//         )

//         if (this.props.currentEnv === 'SIT'){
//             this.setState({
//                 destn_s3_bkt_nm: "antm-481935479534-ssm-sit-filetransfer"
//             })
//         } else if (this.props.currentEnv === 'DEV'){
//             this.setState({
//                 destn_s3_bkt_nm: "antm-481935479534-ssm-dev-filetransfer"
//             })
//         }

//         this.setState({
//             src_clmn_list_file_txt: "na",
//             delta_tbl_clmn_lst_txt: "na",
//             domain_cd: "",
//             sor_cd: "",
//             del_tbl_clmn_lst_txt: "na",
//             hdfs_delta_tbl_path_txt: "na",
//             hdfs_del_tbl_path_txt: "na",
//             tpt_instances_cnt: 0,
//         })

//         let url = `${baseURL}sor-cds?env=DEV`
//         fetch(url)
//         .then(response => response.json())
//         .then(result => {
//             this.setState({
//                 sor_cds: result
//             })
//         })
//         url = `${baseURL}domain-cds?env=DEV`
//         fetch(url)
//         .then(response => response.json())
//         .then(result => {
//             this.setState({
//                 domain_cds: result
//             })
//         })

//         url = `${baseURL}processing/return-job-params?env=DEV`
//         fetch(url)
//         .then(response => response.json())
//         .then(res => {
//             console.log(res)
//             this.setState({
//                 dropdown_options: {
//                     teams: res.ownrshp_team,
//                     db_type_descs: res.db_type_desc,
//                     ctlg_nms: res.ctlg_nm,
//                     trgt_tbl_rfrsh_types: res.trgt_tbl_rfrsh_type,
//                     destn_type_descs: res.destn_type_desc,
//                     actv_flags: res.actv_flag
//                 }
//             })
//         })
//     }

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
    let token = localStorage.getItem('AEDLDashboardToken')

    let destn_s3_obj_key = this.state.destn_s3_obj_key_focused === true ? destn_s3_obj_key : this.getDestnS3ObjKey()

    let newData = {
        db_type_desc: this.state.db_type_desc,
        src_sys_nm: this.state.sor_cd,
        ctlg_nm: this.state.ctlg_nm,
        schma_nm: this.state.schma_nm,
        src_tbl_nm: this.state.src_tbl_nm,
        src_clmn_list_file_txt: this.state.src_clmn_list_file_txt,
        delta_tbl_nm: this.state.delta_tbl_nm,
        delta_tbl_clmn_lst_txt: this.state.delta_tbl_clmn_lst_txt,
        del_tbl_nm: this.state.delta_tbl_nm,
        del_tbl_clm_lst_txt: this.state.del_tbl_clm_lst_txt,
        hdfs_delta_tbl_path_txt: this.state.hdfs_delta_tbl_path_txt,
        hdfs_del_tbl_path_txt: this.state.hdfs_del_tbl_path_txt,
        destn_s3_obj_key,
        destn_s3_bkt_nm: this.state.destn_s3_bkt_nm,
        destn_type_desc: this.state.destn_type_desc,
        tpt_instances_cnt: this.state.tpt_instances_cnt,
        trgt_tbl_rfrsh_type: this.state.trgt_tbl_rfrsh_type,
        actv_flag: "n",
        rqstr_id: this.state.rqstr_id,
        ownrshp_team: this.state.ownrshp_team
    }

    // let url = 'http://22.174.139.218/api/processing/add-record'
    // let url = `${baseURL}vulcan/metadata-request?env=${this.props.currentEnv}`
    return fetch('url', {
        method: 'post',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
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
            // this.props.updateOnInsert(result)
        }
    }).catch(err => {
        console.log(err)
    })
  }

  render() {
    // const { open } = this.props
    // let { headers } = this.props
    // headers = headers.filter(header => {
    //     if (header === "tableData") {
    //         return false
    //     } else if (header === "sor_cd") {
    //         return false
    //     } else if (header === "domain_cd") {
    //         return false
    //     }
    //     return true
    // })
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
            <FormControl className="form-control" variant="outlined" margin="normal" error={this.state.db_type_desc === ""}>
                <InputLabel id="demo-simple-select-label">db_type_desc</InputLabel>
                <Select 
                name="db_type_desc"
                value={this.state.db_type_desc}
                onChange={this.handleChanges} 
                displayEmpty 
                className="select-empty" 
                labelWidth={100}>
                {this.state.dropdown_options.db_type_descs.map(item => 
                    <MenuItem value={item}>
                        <em>{item}</em>
                    </MenuItem>
                )}
                </Select>
                {this.state.db_type_desc === "" ? (<FormHelperText>Must select a db_type_desc</FormHelperText>) : null}
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
                    <MenuItem value={domainCD.domain_cd.String}>
                        <em>{domainCD.domain_cd.String}</em>
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
                    <MenuItem value={sorCD.sor_cd.String} key={sorCD.sor_id.String}>
                        <em>{sorCD.sor_cd.String}</em>
                    </MenuItem>
                )}
                </Select>
                {this.state.sor_cd === "" ? (<FormHelperText>Must select a sor_cd</FormHelperText>) : null}
            </FormControl>
            <FormControl className="form-control" margin="normal" variant="outlined" error={this.state.ctlg_nm === ""}>
                <InputLabel id="demo-simple-select-label">ctlg_nm</InputLabel>
                <Select 
                name="ctlg_nm"
                value={this.state.ctlg_nm} 
                onChange={this.handleChanges} 
                displayEmpty 
                className="select-empty" 
                labelWidth={100}>
                {this.state.dropdown_options.ctlg_nms.map(item => 
                    <MenuItem value={item} key={item}>
                        <em>{item}</em>
                    </MenuItem>
                )}
                </Select>
                {this.state.ctlg_nm === "" ? (<FormHelperText>Must select a ctlg_nm</FormHelperText>) : null}
            </FormControl>
            <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            required
            disabled={false}
            name="schma_nm"
            label="schma_nm"
            type="schma_nm"
            id="schma_nm"
            value={this.state.schma_nm}
            onChange={this.handleChanges}
            error={this.state.schma_nm === ""}
            helperText={this.state.schma_nm === "" ? "Must have a schema name" : ""}
            />
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
            value={this.state.src_tbl_nm}
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
            value={this.state.src_clmn_list_file_txt}
            onChange={this.handleChanges}
            />
            <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            required
            disabled={false}
            name="delta_tbl_nm"
            label="delta_tbl_nm"
            type="delta_tbl_nm"
            id="delta_tbl_nm"
            value={this.state.delta_tbl_nm}
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
            value={this.state.delta_tbl_clmn_lst_txt}
            onChange={this.handleChanges}
            />
            <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            disabled={false}
            name="del_tbl_nm"
            label="del_tbl_nm"
            type="del_tbl_nm"
            id="del_tbl_nm"
            onFocus={ !this.state.del_tbl_nm_focused ? () => this.setState({
                del_tbl_nm: this.getDelTblNm(),
                del_tbl_nm_focused: true
            }) : null }
            value={this.state.del_tbl_nm_focused ? this.state.del_tbl_nm : this.getDelTblNm()}
            onChange={this.handleChanges}
            error={this.state.error}
            helperText={this.state.errorMessage}
            />
            <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            required
            disabled={false}
            name="del_tbl_clmn_lst_txt"
            label="del_tbl_clmn_lst_txt"
            type="del_tbl_clmn_lst_txt"
            id="del_tbl_clmn_lst_txt"
            value={this.state.del_tbl_clmn_lst_txt}
            onChange={this.handleChanges}
            />
             <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            required
            disabled={false}
            name="hdfs_delta_tbl_path_txt"
            label="hdfs_delta_tbl_path_txt"
            type="hdfs_delta_tbl_path_txt"
            id="hdfs_delta_tbl_path_txt"
            value={this.state.hdfs_delta_tbl_path_txt}
            onChange={this.handleChanges}
            />
            <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            required
            disabled={false}
            name="hdfs_del_tbl_path_txt"
            label="hdfs_del_tbl_path_txt"
            type="hdfs_del_tbl_path_txt"
            id="hdfs_del_tbl_path_txt"
            value={this.state.hdfs_del_tbl_path_txt}
            onChange={this.handleChanges}
            />
            <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            disabled={false}
            name="destn_s3_obj_key"
            label="destn_s3_obj_key"
            type="destn_s3_obj_key"
            id="destn_s3_obj_key"
            onFocus={ !this.state.destn_s3_obj_key_focused ? () => this.setState({
                destn_s3_obj_key: this.getDestnS3ObjKey(),
                destn_s3_obj_key_focused: true
            }) : null }
            value={this.state.destn_s3_obj_key_focused ? this.state.destn_s3_obj_key : this.getDestnS3ObjKey()}
            onChange={this.handleChanges}
            error={this.state.error}
            helperText={this.state.errorMessage}
            />
            <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            required
            disabled={false}
            name="destn_s3_bkt_nm"
            label="destn_s3_bkt_nm"
            type="destn_s3_bkt_nm"
            id="destn_s3_bkt_nm"
            value={this.state.destn_s3_bkt_nm}
            onChange={this.handleChanges}
            />
            <FormControl className="form-control" variant="outlined" margin="normal" error={this.state.db_type_desc === ""}>
                <InputLabel id="demo-simple-select-label">destn_type_desc</InputLabel>
                <Select 
                name="destn_type_desc"
                value={this.state.destn_type_desc}
                onChange={this.handleChanges} 
                displayEmpty 
                className="select-empty" 
                labelWidth={100}>
                {this.state.dropdown_options.destn_type_descs.map(item => 
                    <MenuItem value={item}>
                        <em>{item}</em>
                    </MenuItem>
                )}
                </Select>
                {this.state.destn_type_desc === "" ? (<FormHelperText>Must select a destn_type_desc</FormHelperText>) : null}
            </FormControl>
            <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            required
            disabled={false}
            name="tpt_instances_cnt"
            label="tpt_instances_cnt"
            type="tpt_instances_cnt"
            id="tpt_instances_cnt"
            value={this.state.tpt_instances_cnt}
            onChange={this.handleChanges}
            />
            <FormControl className="form-control" variant="outlined" margin="normal" error={this.state.db_type_desc === ""}>
                <InputLabel id="demo-simple-select-label">trgt_tbl_rfrsh_type</InputLabel>
                <Select 
                name="trgt_tbl_rfrsh_type"
                value={this.state.trgt_tbl_rfrsh_type}
                onChange={this.handleChanges} 
                displayEmpty 
                className="select-empty" 
                labelWidth={130}>
                {this.state.dropdown_options.trgt_tbl_rfrsh_types.map(item => 
                    <MenuItem value={item}>
                        <em>{item}</em>
                    </MenuItem>
                )}
                </Select>
                {this.state.trgt_tbl_rfrsh_type === "" ? (<FormHelperText>Must select a trgt_tbl_rfrsh_type</FormHelperText>) : null}
            </FormControl>  
        </>  
    return (
        <>
            <Dialog
                open="false"
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
                maxWidth="md"
            >
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
                {/* <DialogTitle id="form-dialog-title">Login</DialogTitle> */}
                <DialogContent>
                    <DialogContentText>
                        Create your new record.
                    </DialogContentText>
                    {FormFields}
                </DialogContent>
                
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button
                    variant="contained"
                    color="primary"
                    disabled={!this.state.sor_cd || !this.state.domain_cd || !this.state.ownrshp_team || !this.state.rqstr_id}
                    onClick={this.submitRecord}
                    >
                        Insert
                    </Button>
                </DialogActions>
            </Dialog>
        </>
        );
  }        
}

export default RequestVulcanDialog 