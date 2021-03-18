import React, { Component, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/ag-theme-balham.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

import { AddRowModal } from './addRowModal';

class EditableGrid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columnDefs: [
                {headerName: 'Requester ID', editable: true, field: 'rqstr_id'},
                {headerName: 'DB Description', editable: true, field: 'db_type_desc'},
                {headerName: 'Source Name',field: 'src_sys_nm',editable: true},
                {headerName: 'Catalog',field: 'ctlg_nm',editable: true},
                {headerName: 'Schema',field: 'schma_nm',editable: true},
                {headerName: 'Source Table',field: 'src_tbl_nm',editable: true},
                {headerName: 'Column List Text',field: 'src_clmn_list_file_txt',editable: true},
                {headerName: 'Destination Object',field: 'destn_s3_obj_key',editable: true},
                {headerName: 'Destination S3 Bucket',field: 'destn_s3_bkt_nm',editable: true},
                {headerName: 'Destination Type Desc',field: 'destn_type_desc',editable: true},
                {headerName: 'Delta Table Name',field: 'delta_tbl_nm',editable: true},
                {headerName: 'Delta Table Column List',field: 'delta_tbl_clmn_lst_txt',editable: true},
                {headerName: 'Delete Table Name',field: 'del_tbl_nm',editable: true},
                {headerName: 'Delete Table Clumn List',field: 'del_tbl_clmn_lst_txt',editable: true},
                {headerName: 'HDFS Delta Table Path Text',field: 'hdfs_delta_tbl_path_txt',editable: true},
                {headerName: 'HDFS Delete Table Path Text',field: 'hdfs_del_tbl_path_txt',editable: true},
                {headerName: 'Instances Count',field: 'tpt_instances_cnt',editable: true},
                {headerName: 'Target Table Refresh Type',field: 'trgt_tbl_rfrsh_type',editable: true},
                {headerName: 'Active Flag',field: 'actv_flag',editable: true},
                {headerName: 'Created Date',field: 'creat_dtm',editable: true},
                {headerName: 'Last Updated Date',field: 'last_updt_dtm',editable: true}
            ],
            rowData:  [{
                rqstr_id: 'AG59563', 
                db_type_desc:'Hive', 
                src_sys_nm: 'mbr',
                ctlg_nm: 'AG59563', 
                schma_nm:'Schema3', 
                src_tbl_nm: 'Table 1',
                src_clmn_list_file_txt: 'NA', 
                destn_s3_obj_key:'NA', 
                destn_s3_bkt_nm: 'NA',
                destn_type_desc: 'S3',
                delta_tbl_nm: 'NA',
                delta_tbl_clmn_lst_txt: 'NA',
                del_tbl_nm: 'NA',
                del_tbl_clmn_lst_txt: 'NA',
                hdfs_delta_tbl_path_txt: 'NA',
                hdfs_del_tbl_path_txt: 'NA',
                tpt_instances_cnt:'NA',
                trgt_tbl_rfrsh_type: 'NA',
                actv_flag: 'NA',
                creat_dtm: 'NA',
                last_updt_dtm: 'NA',
                ownrshp_team: 'NA'
            }, {
                rqstr_id: 'AG59563', 
                db_type_desc:'Hive', 
                src_sys_nm: 'prod',
                ctlg_nm: 'TeradataDBC', 
                schma_nm:'Schema2', 
                src_tbl_nm: 'Table 2',
                src_clmn_list_file_txt: 'NA', 
                destn_s3_obj_key:'NA', 
                destn_s3_bkt_nm: 'NA',
                destn_type_desc: 'hdfs',
                delta_tbl_nm: 'NA',
                delta_tbl_clmn_lst_txt: 'NA',
                del_tbl_nm: 'NA',
                del_tbl_clmn_lst_txt: 'NA',
                hdfs_delta_tbl_path_txt: 'NA',
                hdfs_del_tbl_path_txt: 'NA',
                tpt_instances_cnt:'NA',
                trgt_tbl_rfrsh_type: 'NA',
                actv_flag: 'NA',
                creat_dtm: 'NA',
                last_updt_dtm: 'NA',
                ownrshp_team: 'NA'
            }, {
                rqstr_id: 'AG59563', 
                db_type_desc:'Teradata', 
                src_sys_nm: 'clm',
                ctlg_nm: 'Hive', 
                schma_nm:'Schema1', 
                src_tbl_nm: 'Table 3',
                src_clmn_list_file_txt: 'NA', 
                destn_s3_obj_key:'NA', 
                destn_s3_bkt_nm: 'NA',
                destn_type_desc: 'S3',
                delta_tbl_nm: 'NA',
                delta_tbl_clmn_lst_txt: 'NA',
                del_tbl_nm: 'NA',
                del_tbl_clmn_lst_txt: 'NA',
                hdfs_delta_tbl_path_txt: 'NA',
                hdfs_del_tbl_path_txt: 'NA',
                tpt_instances_cnt:'NA',
                trgt_tbl_rfrsh_type: 'NA',
                actv_flag: 'NA',
                creat_dtm: 'NA',
                last_updt_dtm: 'NA',
                ownrshp_team: 'NA'
            }]
            // frameworkComponents: {
            //     'numberFormatter': NumberFormatter,
            //     'numericCellEditor': NumericCellEditor,
            //     'rangeFilter': RangeFilter
            // }
        }
	}
	
	componentDidMount() {
		if (localStorage.getItem('AEDLDashboardToken')) {
		  this.props.history.push('/write-mode/vulcan/metadata')
		} 		
	  }

    handleStateUpdate =(values) =>{
        const rowData = [...this.state.rowData, ...values];
        this.setState({rowData: rowData});
        console.log(this.state);
    }

    render() {
       
        return (
            <div
                className="ag-theme-balham"
                style={{height: '400px', width: '100%'}}
            >
                <AddRowModal handleStateUpdate={this.handleStateUpdate}></AddRowModal>
                <AgGridReact
                    enableSorting={true}
                    enableFilter={true}
                    pagination={true}
                    columnDefs={this.state.columnDefs}
                    // frameworkComponents={this.state.frameworkComponents}
                    rowData={this.state.rowData}>
                </AgGridReact>    
                <div className="modal-footer">
                    <p className="mr-auto">
                        This grid is editable and we can edit here before generating csv. We can add metadata through Add Metada form and also we can add multiple records at once by providing comma seperated Source Table names.
                    </p>
                    {/* <button type="button" className="btn btn-primary mr-auto">Save changes</button> */}
                    <button type="button" className="btn btn-primary" data-dismiss="modal">Generate CSV</button>
                </div>                            
            </div>
        );
    }
}

export default EditableGrid;