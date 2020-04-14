import React, { Component } from "react";
import "./About.scss";

export class About extends Component {
  state = {
    html_response: ""
  };

  loadHtml(url, cb) {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
      if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
        cb(xmlHttp.responseText);
      }
    };
    xmlHttp.open("GET", url, true);
    xmlHttp.send(null);
  }

  get_about_html() {
    let url = "http://185.97.116.63:3000/data/about.html";
    this.loadHtml(url, (response) => {
      this.html_response = response;
      this.setState({ html_response: response });
    });
  }


  componentDidMount() {
    this.get_about_html();
  }

  render() {
    let state = this.state;
    return (
      <div className="content" dangerouslySetInnerHTML={{ __html: state.html_response }}>
      </div>
    );
  }

}
