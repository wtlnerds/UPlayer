import React ,{ Component } from "react";
import FSModule from "../../utils/file_system"

export default class TestSearch extends Component {
    constructor(props){
        super(props)
        this.state = {url: null}
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
                class="URL-input" placeholder="Video URL e.g. https://www.youtube.com/watch?v=MtN1YnoL46Q" />
                <button onClick = {() => this.download(this.state.url)} class="convert-button">Convert</button>
            </div>
        )
    }
}