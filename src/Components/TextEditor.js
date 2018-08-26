import React, { Component } from 'react';
import ReactQuill from 'react-quill';

class TextEditor extends Component {

    constructor(props) {
        super(props)
        this.modules = {
            toolbar: [
                [{ 'header': [1, 2, false] }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
                ['link', 'image'],
                ['clean']
            ],
        }

        this.formats = [
            'header',
            'bold', 'italic', 'underline', 'strike', 'blockquote',
            'list', 'bullet', 'indent',
            'link', 'image'
        ]
        this.state = { text: '' }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(value) {
        this.setState({ text: value })
    }

    render() {
        return (
            <ReactQuill
                defaultValue={this.props.value}
                onChange={this.props.handleChange}
                theme="snow"
                modules={this.modules}
                formats={this.formats}
                style={{
                    height: "375px",
                    marginBottom: "45px"
                }}
            />
        )
    }
}

export default TextEditor;