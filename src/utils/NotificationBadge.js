import React, { Component } from 'react'
// Material UI Imports
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import NotificationsActiveTwoToneIcon from '@material-ui/icons/NotificationsActiveTwoTone';


export default class NotificationBadge extends Component {
    
    constructor(props) {
        super(props)

        this.state = {
            count: 0
        }
    }
    
    componentDidMount() {
        this.getDataFromApi()
    }

    getDataFromApi = () => {
        let url = ''
        fetch(url)
          .then(response => response.json())
          .then(result => {
              console.log(result)
          this.setState({
            count: result.count     
          })
        })
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.refresh !== prevProps.refresh) {
          this.getDataFromApi();
        }
      }

    render() {
        const count = this.state.count
        return (
            count > 0 ? (
                <IconButton color="inherit" style={{paddingLeft:0}}>
                    <Badge badgeContent={this.state.count} color="secondary">
                        <NotificationsActiveTwoToneIcon htmlColor="#0067A5"/>
                    </Badge>
                </IconButton>
            ) : (
                <NotificationsActiveTwoToneIcon htmlColor="#0067A5"/>
            )
        )
    }
}
