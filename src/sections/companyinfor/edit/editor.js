import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Component } from "react";

export default class Editor extends Component {
  render() {
    return <CKEditor {...this.props} editor={ClassicEditor} />;
  }
}
