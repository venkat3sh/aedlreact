import React, { Component } from 'react'
// MaterialTable Imports
import MaterialTable, { MTableToolbar, MTableBodyRow }  from "material-table";
// Material UI Imports
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
// Component Imports
// import MetadataRequestDialog from '../../Edit/MetadataRequestDialog'
// import SuccessSnackbar from '../../utils/SuccessSnackbar'
// import UpdateDialog from '../../Edit/UpdateDialog'
// import DeleteDialog from '../../Edit/DeleteDialog'
// import CSVuploader from '../../utils/CSVuploader'

// Cross fetch for IE polyfill
// import fetch from 'cross-fetch'



class VulcanMetadata extends Component {

    constructor(props) {
        super(props)

        this.state = {
          dataObject: [],
          nameObj: {},
          snackbarIsOpen: false,
          responseMessage: '',
          openRequestDialog: false,
          openUpdateDialog: false,
          openDeleteDialog: false,
          rowData: null,
          deleteRecords: []
        }
        this.tableRef = React.createRef();
    }

    componentDidMount() {
      if (localStorage.getItem('AEDLDashboardToken')) {
        this.props.history.push('/write-mode/vulcan/metadata')
      } 

      this.getDataFromApi()
    }

    getDataFromApi = () => {
      let url = 'https://972nit0yw1.execute-api.us-east-2.amazonaws.com/prod/vlcnstaticmetadata'

        fetch(url, {
          method: 'get',   
          contentType: "application/json"     
        })
        .then(response => response.json())
        .then(result => {
        if (result.length === 0) {
          this.setState({
            emptySet: true
          })
        }
        this.setState({
          dataObject: result,
          recordCount: result.length
        })
      })
    }

    componentDidUpdate(prevProps) {
      // Typical usage (don't forget to compare props):
      if (this.props.currentEnv !== prevProps.currentEnv) {
        this.getDataFromApi();
      }
    }

    paginateSwitch = () => {
      this.setState({
        paging: !this.state.paging
      })
    }

    handleOpen = () => {
      this.setState({
          snackbarIsOpen: false,
          openRequestDialog: true
      })
    }

    updateOnInsert = (result) => {
      this.setState({
        snackbarIsOpen: true,
        responseMessage: result,
        openRequestDialog: false
      })
      this.getDataFromApi();
    }

    updateOnUpdate = (result) => {
      this.setState({
        snackbarIsOpen: true,
        responseMessage: result,
        openUpdateDialog: false
      })
      this.getDataFromApi();
    }

    updateOnDelete = (result) => {
      this.setState({
        snackbarIsOpen: true,
        responseMessage: result,
        openDeleteDialog: false
      })
      this.getDataFromApi();
    }

    closeRequestDialog = () => {
      this.setState({
        openRequestDialog: false,
      })
    }

    closeUpdateDialog = () => {
      this.setState({
        openUpdateDialog: false,
      })
    }

    closeDeleteDialog = () => {
      this.setState({
        openDeleteDialog: false,
      })
    }

    handleSnackbarClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      this.setState({
        snackbarIsOpen: false
      })
    };

    getCurrentDate = () => {
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth() + 1; //January is 0!

      var yyyy = today.getFullYear();
      if (dd < 10) {
        dd = '0' + dd;
      } 
      if (mm < 10) {
        mm = '0' + mm;
      } 
      today = dd + '/' + mm + '/' + yyyy;
      return today
    }

    render() {
        return (
        <Grid item xs={12}>
          <Paper>
            {this.state.emptySet === true || this.state.dataObject.length > 0 ? (
                  <>
                  <MaterialTable           
                    title={<h6 className="table-title">Vulcan Metadata</h6>}
                    tableRef={this.tableRef}
                    columns={[
                      {
                        title: "Meta ID",
                        field: "meta_id"         
                      }, {
                        title: "DB Type Desc",
                        field: "db_type_desc"
                      }, {
                        title: "Source System Name",
                        field: "src_sys_nm"
                      }, {
                        title: "Catalog Name",
                        field: "ctlg_nm"
                      }, {
                        title: "Schema Name",
                        field: "schma_nm"
                      }, {
                        title: "Source Table Name",
                        field: "src_tbl_nm"
                      }, { 
                        title: "Source Claim List File Text",
                        field: "src_clmn_list_file_txt"
                      }, {
                        title: "Delta Table Name",
                        field: "delta_tbl_nm"
                      }, {
                        title: "Delta Table Claim List Text",
                        field: "delta_tbl_clmn_lst_txt"
                      }, {
                        title: "Delete Table Name",
                        field: "del_tbl_nm"
                      }, {
                        title: "Delete Table Claim List Text",
                        field: "del_tbl_clmn_lst_txt"
                      }, {
                        title: "HDFS Delta Table Path Text",
                        field: "hdfs_delta_tbl_path_txt"
                      }, {
                        title: "HDFS Delete Table Path Text",
                        field: "hdfs_del_tbl_path_txt"
                      }, {
                        title: "Destination S3 Object Key",
                        field: "destn_s3_obj_key"
                      }, {
                        title: "Destination S3 Bucket Name",
                        field: "destn_s3_bkt_nm"
                      }, {
                        title: "Destination Type Desc",
                        field: "destn_type_desc"
                      }, {
                        title: "TPT Instances Count",
                        field: "tpt_instances_cnt"
                      }, {
                        title: "Target Table Refresh Type",
                        field: "trgt_tbl_rfrsh_type"
                      }, {
                        title: "Active Flag",
                        field: "actv_flag"
                      }, {
                        title: "Create Datetime",
                        field: "creat_dtm"
                      }, {
                        title: "Last Update Time",
                        field: "last_updt_dtm"
                      }, {
                        title: "Requester ID",
                        field: "rqstr_id"
                      }, {
                        title: "Ownership Team",
                        field: "ownrshp_team"
                      }
                    ]}
                    data={this.state.dataObject}
                    options={{
                        // exportButton: true,
                        // exportAllData: true,
                        // exportFileName: `vulcan-metadata-${this.getCurrentDate()}`,
                        // search: true,
                        paging: true,
                        pageSize: 15,
                        pageSizeOptions: [10, 15, 30, this.state.recordCount ? this.state.recordCount : 0],
                        filtering: true,
                        sorting: true,
                        addRowPosition: "first",
                        selection: true,                        
                        headerStyle: {
                          backgroundColor: '#0067A5',
                          color: 'white',
                          fontSize: '1rem',
                          fontWeight: 800,
                        }
                      }}
                    components={{
                      Toolbar: props => (
                        <div>
                          <MTableToolbar {...props} />
                            {
                              this.props.currentEnv === "DEV" ? (
                                <>
                                <div className="description-wrapper flex justify-space-between">
                                  <div className="left-panel">
                                    <h4 className="align-left med-size-text">Displaying all processing configuration data.</h4>
                                    <h4 className="align-left med-size-text">Returned <span style={{color: 'black', fontWeight: 'bold', fontSize: 20}}>{this.state.recordCount}</span> records</h4>
                                  </div>
                                  <div className="right-panel flex">
                                    <div>
                                      {/* <Tooltip title="Metadata Request" aria-label="request">
                                          <IconButton style={{backgroundColor: 'rgb(220, 0, 78)', color: 'white', marginBottom:10}} 
                                                      aria-label="Metadata Request" 
                                                      component="span" 
                                                      onClick={this.handleOpen}>
                                              <AddIcon />
                                          </IconButton>
                                      </Tooltip>
                                      <Typography variant="body2">
                                        Request Job Metadata
                                      </Typography> */}
                                    </div>
                                    {/* <div>
                                      <CSVuploader />
                                      <Typography variant="body2">
                                          Upload CSV
                                      </Typography>
                                    </div> */}
                                  </div>
                                </div>
                                {/* <MetadataRequestDialog 
                                  data={props.data} 
                                  buttonLabel="Add Record" 
                                  recordCount={this.state.recordCount} 
                                  headers={Object.keys(this.state.dataObject[0])}
                                  currentEnv={this.props.currentEnv}
                                  updateOnInsert={this.updateOnInsert}
                                  rowData={this.state.rowData}
                                  open={this.state.openRequestDialog}
                                  close={this.closeRequestDialog}
                                  />
                                <UpdateDialog 
                                  data={props.data} 
                                  buttonLabel="Add Record" 
                                  recordCount={this.state.recordCount} 
                                  headers={Object.keys(this.state.dataObject[0])}
                                  currentEnv={this.props.currentEnv}
                                  updateOnUpdate={this.updateOnUpdate}
                                  rowData={this.state.rowData}
                                  open={this.state.openUpdateDialog}
                                  close={this.closeUpdateDialog}
                                  request={true}
                                  />
                                <DeleteDialog 
                                  open={this.state.openDeleteDialog} 
                                  handleSnackbarClose={this.handleOpenDelete} 
                                  records={this.state.deleteRecords}
                                  close={this.closeDeleteDialog}
                                  currentEnv={this.props.currentEnv}
                                  updateOnDelete={this.updateOnDelete}
                                  request={true}
                                  /> */}
                                  </>
                              ) : (
                                <>
                                <div className="description-wrapper">
                                  <h4 className="align-left med-size-text">Displaying all processing configuration data.</h4>
                                  <h4 className="align-left med-size-text">Returned <span style={{color: 'black', fontWeight: 'bold', fontSize: 20}}>{this.state.recordCount}</span> records</h4>
                                  <div className="button-wrapper"></div>
                                </div>
                                </>
                              )
                            }
                        </div>
                      ),
                      Row: props => (
                        // <div className="hover">
                          <MTableBodyRow {...props} className="hover no-wrap"/>
                        // </div>
                      )
                    }}
                      
                    />
                    {/* <SuccessSnackbar 
                      open={this.state.snackbarIsOpen} 
                      handleSnackbarClose={this.handleSnackbarClose} 
                      responseMessage={this.state.responseMessage}
                      /> */}

                    </>
              ) : (
                <div style={{"padding": 40}}>
                    <CircularProgress color="primary" />
                </div>
              )}
            </Paper>
          </Grid>
        )
    }
}

export default VulcanMetadata