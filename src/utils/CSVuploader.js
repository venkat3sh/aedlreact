import React from 'react'
import IconButton from '@material-ui/core/IconButton';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import ErrorAlert from '../utils/ErrorAlert'
import Alert from '@material-ui/lab/Alert';
import axios from 'axios';

class CSVuploader extends React.Component {

    constructor(props){
        super(props)
        this.state={
            selectedFile: null,
            open: false,
            failedJobs: [],
            recordsInserted: null
        }
    }

    onFileChange = event => { 
        // Update the state 
        this.setState({
            selectedFile: event.target.files[0]
        })
      };
     
      // On file upload (click the upload button) 
    onFileUpload = () => { 
        // Create an object of formData 
        const formData = new FormData(); 
        // Update the formData object 
        formData.append("file", this.state.selectedFile)

        let url = 'https://972nit0yw1.execute-api.us-east-2.amazonaws.com/prod/genpresignedurl?file_name='+this.state.selectedFile.name
        axios.get(url, formData)
        .then(result => {
            axios.put(result.data, formData)
            .then(result => {
                if(result.status == 200){
                    this.props.updateOnInsert(this.state.selectedFile.name)
                    this.setState({
                        open: false
                    })
                } else {
                    console.log(result.statusText)
                }
            })
            // return fetch(result, {
            //     method: 'put',   
            //     headers: {
            //         'Content-Type': 'text/csv'
            //         },         
            //     params: this.state.selectedFile
            // })
        }).catch(err => {
            console.log(err)
        })



        // Request made to the backend api 
        // Send formData object 
        // const response = await axioos({
        //     method: 'GET',
        //     params: this.state.selectedFile,
        //     url: 'https://972nit0yw1.execute-api.us-east-2.amazonaws.com/prod/genpresignedurl'
        // });

        // const response = await axioos(response.data.uploadUrl, {
        //     method: 'PUT',
        //     body: formData
        // });
        // axios.post('https://972nit0yw1.execute-api.us-east-2.amazonaws.com/prod/genpresignedurl', formData)
        // .then(res => {
        //     console.log("RESPONSE WUZ ===>", res.data.success_msg)
        //     if (res.data.error_msg === null) {
        //         this.props.updateOnInsert(res.data)
        //     } else {
        //         this.setState({
        //             failedJobs: res.data.error_msg,
        //             recordsInserted: res.data.success_msg
        //         })
        //     }
        // })
        // .catch(err => console.log(err)) 
    }; 
    
    handleOpen = () => {
        this.setState({
            open: true
        })
    };

    handleClose = () => {
        this.setState({
            open: false
        })
      };

    
    render() {
        console.log("Currently, selected file is :", this.state.selectedFile)
        let ErrMsg = 
            <>
                <h3>These inserts failed as duplicate entries: </h3>
                {this.state.failedJobs.map(job => 
                    <p>{job}</p>
                )}
            </>

        return (
            <>
            <Dialog 
                onClose={this.handleClose} 
                aria-labelledby="simple-dialog-title" 
                open={this.state.open}
                >

                {/* <DialogTitle id="simple-dialog-title" centered></DialogTitle> */}
                <IconButton 
                    style={{backgroundColor: 'rgb(220, 0, 78)', color: 'white', margin: '0 auto 20px', width:50, height: 50}} 
                    aria-label="CSV Upload" 
                    // component="label" 
                    // onClick={this.handleOpen}
                    >
                    <CloudUploadIcon />
                </IconButton>
                <DialogContent>
                    <DialogContentText>
                        Your CSV file must be formatted correctly for this feature to work. <a href={`https://aedl-dashboard-dev.anthem.com/csv/${this.props.type}_request_template.csv`}>Click here</a> to download a template you can use for your records.
                    </DialogContentText>
                </DialogContent>
                <Button variant="outlined"><label for="upload-csv">Choose File</label></Button>
                <input type="file" name="csv" id="upload-csv" style={{display:'none'}} onChange={this.onFileChange}/>
                {this.state.selectedFile === null ? <p></p> : <p>{this.state.selectedFile.name}</p>}

                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button 
                    variant="contained" 
                    color="primary"
                    disabled={this.state.selectedFile === null ? true: false} 
                    onClick={this.onFileUpload}
                    >Upload</Button>
                </DialogActions>
            {
                this.state.recordsInserted 
                    ? (
                        <h4>{this.state.recordsInserted} successfully!</h4>
                    ) : (
                        null
                    )
            }    

            {
                this.state.failedJobs.length > 0 
                    ? (
                        <Alert 
                            severity="error"  
                            >
                            {ErrMsg}
                        </Alert>
                    ) : (
                        null
                    )
            }
            </Dialog>
                <IconButton 
                    style={{backgroundColor: 'rgb(220, 0, 78)', color: 'white', marginBottom:10}} 
                    aria-label="CSV Upload" 
                    component="label" 
                    onClick={this.handleOpen}
                    >
                    <CloudUploadIcon />
                    {/* <input 
                        type="file"
                        name="file" 
                        style={{display: "none"}}
                        onChange={this.onFileChange}
                        /> */}
                </IconButton>
            </>
        )
    }
}

export default CSVuploader
