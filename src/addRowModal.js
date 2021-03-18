import React, { Component } from 'react';
import { Modal, Button, Form, FormGroup } from 'react-bootstrap'; 
import { Row, Column } from 'react-foundation';
import InputGroup from 'react-bootstrap/InputGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import 'font-awesome/css/font-awesome.css';

export class AddRowModal extends Component{
    state={
        rqstr_id: 'NA', 
        db_type_desc:'Hive', 
        src_sys_nm: 'NA',
        ctlg_nm: 'NA', 
        schma_nm:'NA', 
        src_tbl_nm: 'NA',
        src_clmn_list_file_txt: 'NA', 
        destn_s3_obj_key:'NA', 
        destn_s3_bkt_nm: 'NA',
        destn_type_desc: 'NA',
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
        ownrshp_team: 'NA',
        show: false,
        finalResult: []
    }
    handleShow = () =>{
        this.setState({show: true});
    }
    saveChanges = () =>{
        const src_tbl_nm= this.state.src_tbl_nm;
        if(src_tbl_nm.split(',')){
            const makeArr = src_tbl_nm.split(',');
            const finalResult =  makeArr.map(item =>{
                return {
                    src_tbl_nm:item, 
                    rqstr_id: this.state.rqstr_id, 
                    db_type_desc:this.state.db_type_desc,
                    src_sys_nm: this.state.src_sys_nm,
                    ctlg_nm: this.state.ctlg_nm, 
                    schma_nm:this.state.schma_nm, 
                    src_clmn_list_file_txt: this.state.src_clmn_list_file_txt, 
                    destn_s3_obj_key:this.state.destn_s3_obj_key, 
                    destn_s3_bkt_nm: this.state.destn_s3_bkt_nm,
                    destn_type_desc: this.state.destn_type_desc,
                    delta_tbl_nm: this.delta_tbl_nm,
                    delta_tbl_clmn_lst_txt: this.delta_tbl_clmn_lst_txt,
                    del_tbl_nm: this.del_tbl_nm,
                    del_tbl_clmn_lst_txt: this.del_tbl_clmn_lst_txt,
                    hdfs_delta_tbl_path_txt: this.hdfs_delta_tbl_path_txt,
                    hdfs_del_tbl_path_txt: this.hdfs_del_tbl_path_txt,
                    tpt_instances_cnt: this.tpt_instances_cnt,
                    trgt_tbl_rfrsh_type: this.trgt_tbl_rfrsh_type,
                    actv_flag: this.actv_flag,
                    creat_dtm: this.creat_dtm,
                    last_updt_dtm: this.last_updt_dtm,
                    ownrshp_team: this.ownrshp_team
                }
            });
            this.props.handleStateUpdate(finalResult);
        }else{
            this.props.handleStateUpdate([this.state]);
        }
        
        this.setState({show:false});
    }

    handleClose= () =>{
       this.setState({show:false})
    }

    maker = (e) =>{
        this.setState({ src_tbl_nm: e.target.value });
    }
    render() {
    return( 
        <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" >Vulcan Metadata</a>
                    <button className="btn btn-outline-success" type="submit" onClick={this.handleShow}>Add Metadata</button>
                </div>
        </nav>  
        {this.state.show && (
        <Modal show={this.state.show}>
            <Modal.Header closeButton>
                <Modal.Title>Vulcan Metadata</Modal.Title>            
            </Modal.Header>            
            <Modal.Body>
                <Form>

                    <Form.Group as={Row} controlId="formBasicReq">
                        <Form.Label column sm="6">Requester ID</Form.Label>                        
                        <Column sm="6">                        
                        <InputGroup hasValidation>                                                        
                            <Form.Control name="rqstr_id" type="text" aria-describedby="inputGroupPrepend" placeholder="Requester ID" 
                            onChange={e => this.setState({ rqstr_id: e.target.value })}/>  
                            <InputGroup.Prepend>
                                <InputGroup.Text>
                                    <div title="The entry creator"><FontAwesomeIcon icon={faInfoCircle} /></div>
                                    {/* <i class="fas fa-info-circle" title="Some text goes here"></i> */}
                                </InputGroup.Text>
                            </InputGroup.Prepend>                          
                        </InputGroup>
                        </Column>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formBasicDBDesc">
                        <Form.Label  column sm="6">DB Description</Form.Label>
                        <Column sm="6">
                        <InputGroup hasValidation>
                        <Form.Control name="db_type_desc" type="text" placeholder="DB Description" 
                        onChange={e => this.setState({ db_type_desc: e.target.value })}/>
                        <InputGroup.Prepend>
                                <InputGroup.Text>
                                    <div title="The type of the database (Hive,Teradata)"><FontAwesomeIcon icon={faInfoCircle} /></div>
                                </InputGroup.Text>
                            </InputGroup.Prepend>                          
                        </InputGroup>
                        </Column>                        
                    </Form.Group>
                    <Form.Group as={Row} controlId="formBasicSrcSys">
                        <Form.Label column sm="6">Source System</Form.Label>
                        <Column sm="6">
                        <InputGroup hasValidation>
                            <Form.Control name="src_sys_nm" placeholder="Source System"  as="select" onChange={e => this.setState({ src_sys_nm: e.target.value })}>
                                <option>Select</option>
                                <option>mbr</option>
                                <option>clm</option>
                                <option>prod</option>
                                <option>prov</option>
                                <option>coa</option>
                            </Form.Control>
                            <InputGroup.Prepend>
                                <InputGroup.Text>
                                    <div title="The name of the source system (cda , cii ,edw)"><FontAwesomeIcon icon={faInfoCircle} /></div>
                                    {/* <i class="fas fa-info-circle" title="Some text goes here"></i> */}
                                </InputGroup.Text>
                            </InputGroup.Prepend>                          
                        </InputGroup>
                        </Column>
                    </Form.Group> 
                    <Form.Group as={Row} controlId="formBasicCatlg">
                        <Form.Label column sm="6">Catalog Name</Form.Label>
                        <Column sm="6">
                        <InputGroup hasValidation>
                            <Form.Control name="ctlg_nm" placeholder="Source System"  as="select" onChange={e => this.setState({ ctlg_nm: e.target.value })}>
                                <option>Select</option>
                                <option>Teradata</option>
                                <option>Hive</option>                            
                            </Form.Control>
                            <InputGroup.Prepend>
                                <InputGroup.Text>
                                    <div title="The name of the metastore"><FontAwesomeIcon icon={faInfoCircle} /></div>
                                    {/* <i class="fas fa-info-circle" title="Some text goes here"></i> */}
                                </InputGroup.Text>
                            </InputGroup.Prepend>                          
                        </InputGroup>
                        </Column>
                    </Form.Group>                                       
                    <Form.Group as={Row} controlId="formBasicSchema">
                        <Form.Label  column sm="6">Schema Name</Form.Label>
                        <Column sm="6">
                        <InputGroup hasValidation>
                        <Form.Control name="schma_nm" type="text" placeholder="Schema Name" 
                        onChange={e => this.setState({ schma_nm: e.target.value })}/>
                        <InputGroup.Prepend>
                                <InputGroup.Text>
                                    <div title="The name of the database schema in which source table resides"><FontAwesomeIcon icon={faInfoCircle} /></div>
                                    {/* <i class="fas fa-info-circle" title="Some text goes here"></i> */}
                                </InputGroup.Text>
                            </InputGroup.Prepend>                          
                        </InputGroup>
                        </Column>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formBasicSourceTable">
                        <Form.Label  column sm="6">Source Table</Form.Label>
                        <Column sm="6">
                        <InputGroup hasValidation>
                        <Form.Control name="src_tbl_nm" type="text" placeholder="Source Table" 
                        onChange={e => this.setState({ src_tbl_nm: e.target.value })}/>
                        <InputGroup.Prepend>
                                <InputGroup.Text>
                                    <div title="The source table name"><FontAwesomeIcon icon={faInfoCircle} /></div>
                                </InputGroup.Text>
                            </InputGroup.Prepend>                          
                        </InputGroup>
                        </Column>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formBasicColList">
                        <Form.Label  column sm="6">Delta Table Name</Form.Label>
                        <Column sm="6">
                        <InputGroup hasValidation>
                        <Form.Control name="delta_tbl_nm" type="text" placeholder="Delta Table Name" 
                        onChange={e => this.setState({ delta_tbl_nm: e.target.value })}/>
                        <InputGroup.Prepend>
                                <InputGroup.Text>
                                    <div title="The name of the table containing the incremental records (can be the same as the source table)"><FontAwesomeIcon icon={faInfoCircle} /></div>
                                </InputGroup.Text>
                            </InputGroup.Prepend>                          
                        </InputGroup>
                        </Column>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formBasicColList">
                        <Form.Label  column sm="6">HDFS Delta Table Path Text</Form.Label>
                        <Column sm="6">
                        <InputGroup hasValidation>
                        <Form.Control name="hdfs_delta_tbl_path_txt" type="text" placeholder="HDFS Delta Table Path Text" 
                        onChange={e => this.setState({ hdfs_delta_tbl_path_txt: e.target.value })}/>
                        <InputGroup.Prepend>
                                <InputGroup.Text>
                                    <div title="The HDFS path of delta table in Hive"><FontAwesomeIcon icon={faInfoCircle} /></div>
                                </InputGroup.Text>
                            </InputGroup.Prepend>                          
                        </InputGroup>
                        </Column>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formBasicColList">
                        <Form.Label  column sm="6">HDFS Delete Table Path Text</Form.Label>
                        <Column sm="6">
                        <InputGroup hasValidation>
                        <Form.Control name="hdfs_del_tbl_path_txt" type="text" placeholder="HDFS Delete Table Path Text" 
                        onChange={e => this.setState({ hdfs_del_tbl_path_txt: e.target.value })}/>
                        <InputGroup.Prepend>
                                <InputGroup.Text>
                                    <div title="The HDFS path of delete table in Hive"><FontAwesomeIcon icon={faInfoCircle} /></div>
                                </InputGroup.Text>
                            </InputGroup.Prepend>                          
                        </InputGroup>
                        </Column>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formBasicDestObj">
                        <Form.Label  column sm="6">Destination S3 Object</Form.Label>
                        <Column sm="6">
                        <InputGroup hasValidation>
                        <Form.Control name="destn_s3_obj_key" type="text" placeholder="Destination S3 Object" 
                        onChange={e => this.setState({ destn_s3_obj_key: e.target.value })}/>
                        <InputGroup.Prepend>
                                <InputGroup.Text>
                                    <div title="The S3 object key"><FontAwesomeIcon icon={faInfoCircle} /></div>
                                </InputGroup.Text>
                            </InputGroup.Prepend>                          
                        </InputGroup>
                        </Column>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formBasicDestBucket">
                        <Form.Label  column sm="6">Destination S3 Bucket</Form.Label>
                        <Column sm="6">
                        <InputGroup hasValidation>
                        <Form.Control name="destn_s3_bkt_nm" type="text" placeholder="Destination Bucket" 
                        onChange={e => this.setState({ destn_s3_bkt_nm: e.target.value })}/>
                        <InputGroup.Prepend>
                                <InputGroup.Text>
                                    <div title="The S3 bucket name"><FontAwesomeIcon icon={faInfoCircle} /></div>
                                </InputGroup.Text>
                            </InputGroup.Prepend>                          
                        </InputGroup>
                        </Column>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formBasicDestDesc">
                        <Form.Label  column sm="6">Destination Type Desc</Form.Label>
                        <Column sm="6">
                        <InputGroup hasValidation>
                        <Form.Control name="destn_type_desc" type="text" placeholder="Destination Type Desc" 
                        onChange={e => this.setState({ destn_type_desc: e.target.value })}/>
                        <InputGroup.Prepend>
                                <InputGroup.Text>
                                    <div title="The destination type"><FontAwesomeIcon icon={faInfoCircle} /></div>
                                </InputGroup.Text>
                            </InputGroup.Prepend>                          
                        </InputGroup>
                        </Column>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formBasicDestDesc">
                        <Form.Label  column sm="6">Target Table Refresh Type</Form.Label>
                        <Column sm="6">
                        <InputGroup hasValidation>
                        <Form.Control name="trgt_tbl_rfrsh_type" type="text" placeholder="Target Table Refresh Type" 
                        onChange={e => this.setState({ trgt_tbl_rfrsh_type: e.target.value })}/>
                        <InputGroup.Prepend>
                                <InputGroup.Text>
                                    <div title="The mode of update of the target table (full refresh , delete etc)"><FontAwesomeIcon icon={faInfoCircle} /></div>
                                </InputGroup.Text>
                            </InputGroup.Prepend>                          
                        </InputGroup>
                        </Column>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formBasicDestDesc">
                        <Form.Label  column sm="6">Active Flag</Form.Label>
                        <Column sm="6">
                        <InputGroup hasValidation>
                        <Form.Control name="actv_flag" type="text" placeholder="Active Flag" 
                        onChange={e => this.setState({ actv_flag: e.target.value })}/>
                        <InputGroup.Prepend>
                                <InputGroup.Text>
                                    <div title="The flag indicating whether the table is still an active candidate for export"><FontAwesomeIcon icon={faInfoCircle} /></div>
                                </InputGroup.Text>
                            </InputGroup.Prepend>                          
                        </InputGroup>
                        </Column>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formBasicDestDesc">
                        <Form.Label  column sm="6">Created Time</Form.Label>
                        <Column sm="6">
                        <InputGroup hasValidation>
                        <Form.Control name="creat_dtm" type="text" placeholder="Created Time" 
                        onChange={e => this.setState({ creat_dtm: e.target.value })}/>
                        <InputGroup.Prepend>
                                <InputGroup.Text>
                                    <div title="The entry creation time"><FontAwesomeIcon icon={faInfoCircle} /></div>
                                </InputGroup.Text>
                            </InputGroup.Prepend>                          
                        </InputGroup>
                        </Column>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formBasicDestDesc">
                        <Form.Label  column sm="6">Last Updated Time</Form.Label>
                        <Column sm="6">
                        <InputGroup hasValidation>
                        <Form.Control name="last_updt_dtm" type="text" placeholder="Last Updated Time" 
                        onChange={e => this.setState({ last_updt_dtm: e.target.value })}/>
                        <InputGroup.Prepend>
                                <InputGroup.Text>
                                    <div title="The entry last updated time"><FontAwesomeIcon icon={faInfoCircle} /></div>
                                </InputGroup.Text>
                            </InputGroup.Prepend>                          
                        </InputGroup>
                        </Column>
                    </Form.Group>                    
                    <Form.Group as={Row} controlId="formBasicDestDesc">
                        <Form.Label  column sm="6">Ownership Team</Form.Label>
                        <Column sm="6">
                        <InputGroup hasValidation>
                        <Form.Control name="ownrshp_team" type="text" placeholder="Ownership Team" 
                        onChange={e => this.setState({ ownrshp_team: e.target.value })}/>
                        <InputGroup.Prepend>
                                <InputGroup.Text>
                                    <div title="The team owning the table"><FontAwesomeIcon icon={faInfoCircle} /></div>
                                </InputGroup.Text>
                            </InputGroup.Prepend>                          
                        </InputGroup>
                        </Column>
                    </Form.Group>                    
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={this.handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={this.saveChanges}>
                    Submit Record(s)
                </Button>
            </Modal.Footer>
        </Modal>)}
    </div>)
    }
}