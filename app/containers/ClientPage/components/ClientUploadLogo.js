import React, { Component } from 'react';
import { Uploader } from "rsuite";


export default class ClientUploadLogo extends Component {

    handleUploadChange = (files) => {
        const {clients, currentClient, uploadLogo} = this.props;
        const client = clients[currentClient]; 
        const file = files[0];
        uploadLogo(client.id, file.blobFile);
    }

    render() {
        return (
            <div>
                <Uploader
                    autoUpload={false}
                    fileListVisible={false}
                    onChange={this.handleUploadChange}
                    removable={false}
                /> 
            </div>
        )
    }
}
