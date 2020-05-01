import React, { Component } from 'react'
import { Uploader, IconButton, Icon } from 'rsuite';
import styled from 'styled-components';

const AttachmentRow = styled.div`
    display: flex;
    margin: -0.5em 0 0 0;
    flex-direction: row;
    justify-items: space-between;
    align-items: center;
`

export default class BriefAttachmentUploader extends Component {

    handleUploadChange = async (files) => {
        const {uploadBriefAttachment, brief} = this.props;
        
        for (const file of files) {
            await uploadBriefAttachment(brief.id, file.blobFile);
        }

    }


    handleRemove = (brief_id, brief_attachment_id) => {
        const {deleteBriefAttachment} = this.props;
        deleteBriefAttachment(brief_id, brief_attachment_id);
    }

    getList = (attachments) => {
        return attachments.map(att => {
            return {
                name: att.file_name, 
                url: att.url,
                file_type: att.file_type,
                created_at: att.created_at,
            }
        })
    }

    
    render() {
        const {brief} = this.props;
        return (
            <Uploader 
                fileList={brief.attachments}
                autoUpload={false}
                onChange={this.handleUploadChange}
                removable={false}
                renderFileInfo={(file, fileElement) => {
                    return (
                      <AttachmentRow>
                        <span><a href={file.url} target="_blank">{file.file_name} ({file.file_type})</a> </span>
                        <IconButton style={{margin: '0 1em 0 1em'}} icon={<Icon icon="close"/>} onClick={() => this.handleRemove(file.brief_id, file.id)}/>
                      </AttachmentRow>
                    );
                  }}
            /> 
        )
    }
}
