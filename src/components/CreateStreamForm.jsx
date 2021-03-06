import React from 'react'
import SchemaForm from "react-jsonschema-form";

class CreateStreamForm extends React.Component {
  constructor(props) {
    super(props);
    this.notifySubmit = props.notifySubmit

    const formData = {}

    const rtpSchema = {
      title: 'create stream',
      type: "object",
      properties: {
        permanent: {type: "boolean", title: "permanent", default: true},
        type: {type: "string", title: "type", enum:['rtp', 'live', 'ondemand', 'rtsp'], default: 'rtp'},
        admin_key: {type: "string", title: "admin_key"},
        id: {type: "integer", title: "id (optional, leave blank for random)"},
        name: {type: "string", title: "name (required, should match bot)"},
        description: {type: "string", title: "description (required, type of bot)"},
        secret: {type: "string", title: "secret (optional)"},
        pin: {type: "integer", title: "pin (optional)"},
        is_private: {type: "boolean", title: "is_private", default: false},
        video: {type: "boolean", title: "video", default: true},
        audio: {type: "boolean", title: "audio", default: false},
        data: {type: "boolean", title: "data", default: false},
      }
    }

    this.state = {
      rtpSchema,
      formData
    }
  }

  onChange = ({formData}, event) => {
    let rtpSchema = {...this.state.rtpSchema}
    //conditionally hide stuff 
    if (formData.video) {
      rtpSchema.properties = Object.assign(rtpSchema.properties, {
        videoport: {type: "integer", title: "videoport"},
        videortcport: {type: "integer", title: "videortcport"},
        videopt: {type: "integer", title: "videopt (payload type, e.g H264 is 96)"},
        videortpmap: {type: "string", title: "videortpmap (e.g H264/90000)"},
        videofmtp: {type: "string", title: "videofmtp (optional codec specific, e.g profile-level-id=42e01f;packetization-mode=1)"},
      })
    } else {
      rtpSchema.properties = Object.assign({},rtpSchema.properties)
    }
    
    this.setState({
      formData,
      rtpSchema
    })
  }

  onSubmit = ({formData}, event) => {
    this.notifySubmit(formData)
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <SchemaForm schema={this.state.rtpSchema}
        formData={this.state.formData}
        onChange={this.onChange}
        onSubmit={this.onSubmit} />
        </div>
    );
    }
}

export default CreateStreamForm