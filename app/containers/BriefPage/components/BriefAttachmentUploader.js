import React, { Component } from 'react'
import { Uploader, IconButton, Icon } from 'rsuite';
import styled from 'styled-components';
import RoleValidator from 'components/RoleValidator'

const AttachmentRow = styled.div`
    display: flex;
    ${props => props.hasMargin && 'margin: -0.5em 0 0 0;'}
    flex-direction: row;
    justify-items: space-between;
    align-items: center;
`

const UploaderValidator = styled(Uploader)`
    .rs-uploader-trigger {
        visibility: ${props => props.has_scope ? 'visible' : 'hidden'};
    }
`


export default class BriefAttachmentUploader extends Component {

    handleUploadChange = async (files) => {
        const {uploadBriefAttachment, brief} = this.props;

        const currentFile = files[0];
        const new_size = currentFile.blobFile.size + this.getCurrentStorage();

        if (new_size > brief.client.brief_attachment_limits) return alert('Limit exceeded please contact support@boozeboss.co to upgrade your plan');

        for (const file of files) {
            await uploadBriefAttachment(brief.id, file.blobFile);
        }

    }


    handleRemove = (brief_id, brief_attachment_id) => {
        const {deleteBriefAttachment} = this.props;
        deleteBriefAttachment(brief_id, brief_attachment_id);
    }

    getCurrentStorage = () => {
        const {brief} = this.props;
        
        const totalSize = brief.attachments
                .reduce((acc, curr) => {
                    return acc + curr.size;
                }, 0)

        return totalSize;
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
        const {brief, scope} = this.props;
        return (
            <UploaderValidator 
                has_scope={['BRAND'].indexOf(scope) > -1}
                fileList={brief.attachments}
                autoUpload={false}
                onChange={this.handleUploadChange}
                removable={false}
                renderFileInfo={(file, fileElement) => {
                    return (
                      <AttachmentRow hasMargin={scope === 'BRAND'}>
                        <span><a href={file.url} target="_blank">{file.file_name} ({file.file_type})</a> </span>
                        <RoleValidator
                            {...this.props}
                            scopes={['BRAND']}
                            roles={['OWNER', 'MANAGER']}
                        >
                            <IconButton style={{margin: '0 1em 0 1em'}} icon={<Icon icon="close"/>} onClick={() => this.handleRemove(file.brief_id, file.id)}/>
                        </RoleValidator>
                        
                      </AttachmentRow>
                    );
                  }}
            /> 
        )
    }
}
