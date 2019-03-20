import React ,{ Component } from "react";
import FSModule from "../../utils/file_system"

export default class TestSearch extends Component {
    constructor(props){
        super(props)
        this.state = {url: ''}
    }

    download (url) {
        FSModule.download(url)
    }

    updateInputValue(evt) {
        this.setState({
          url: evt.target.value
        });
    }

    render (){
        return (
            <div>
                <input value = {this.state.url}
                  onChange={evt => this.updateInputValue(evt)}
                />
                <button onClick = {() => this.download({url: this.state.url})}>Download</button>
            </div>
        )
    }
}
