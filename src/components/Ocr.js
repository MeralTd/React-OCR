import React from "react";
import { createWorker } from "tesseract.js";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import styled from "styled-components";
import "../App.css";

const StyleApp = styled.div`
  color: ${(props) => props.theme.fontColor};
  background-color: ${(props) => props.theme.backgroundColor};
`;

const Text = styled.div`
  color: ${(props) => props.theme.fontColor};
`;

registerPlugin(FilePondPluginImagePreview);

class Ocr extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isProcessing: false,
      ocrText: "",
      pctg: "0.00",
    };
    this.pond = React.createRef();
    this.worker = React.createRef();
    this.updateProgressAndLog = this.updateProgressAndLog.bind(this);
  }

  async doOCR(file) {
    this.setState({
      isProcessing: true,
      ocrText: "",
      pctg: "0.00",
    });
    await this.worker.load();
    await this.worker.loadLanguage("eng");
    await this.worker.initialize("eng");
    const {
      data: { text },
    } = await this.worker.recognize(file.file);
    this.setState({
      isProcessing: false,
      ocrText: text,
    });
  }
  updateProgressAndLog(m) {
    var MAX_PARCENTAGE = 1;
    var DECIMAL_COUNT = 2;

    if (m.status === "recognizing text") {
      var pctg = (m.progress / MAX_PARCENTAGE) * 100;
      this.setState({
        pctg: pctg.toFixed(DECIMAL_COUNT),
      });
    }
  }
  componentDidMount() {
    this.worker = createWorker({
      logger: (m) => this.updateProgressAndLog(m),
    });
  }
  render() {
    return (
      <div className="App">
        <div className="container">
          <div style={{ marginTop: "5%" }} className="row">
            <Text>
              <p className="card-text">
                {"Bu proje, "}
                <a href="https://tesseract.projectnaptha.com/">Tesseract.js</a>
                {
                  " ve Optical Character Recognition(OCR) kullanarak görüntünüzü metne dönüştürmenize olanak tanıyan bir web sitesidir."
                }
              </p>
            </Text>
          </div>
          <div style={{ marginTop: "5%" }} className="row">
            <div className="col-md-6">
              <FilePond
                ref={(ref) => (this.pond = ref)}
                onaddfile={(err, file) => {
                  this.doOCR(file);
                }}
                onremovefile={(err, fiile) => {
                  this.setState({
                    ocrText: "",
                  });
                }}
              />
            </div>

            <div className="col-md-6">
              <StyleApp className="card">
                <h5 className="card-header">
                  <div
                    style={{ margin: "1%", textAlign: "left" }}
                    className="row"
                  >
                    <div className="col-md-12">
                      <i
                        className={
                          "fas fa-sync fa-2x " +
                          (this.state.isProcessing ? "fa-spin" : "")
                        }
                      ></i>{" "}
                      <span className="status-text">
                        {this.state.isProcessing
                          ? `Processing Image ( ${this.state.pctg} % )`
                          : "Parsed Text"}{" "}
                      </span>
                    </div>
                  </div>
                </h5>
                <div className="card-body">
                  <p className="card-text">
                    {this.state.isProcessing
                      ? "..........."
                      : this.state.ocrText.length === 0
                      ? "No Valid Text Found / Upload Image to Parse Text From Image"
                      : this.state.ocrText}
                  </p>
                </div>
                <div className="ocr-text"></div>
              </StyleApp>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Ocr;
