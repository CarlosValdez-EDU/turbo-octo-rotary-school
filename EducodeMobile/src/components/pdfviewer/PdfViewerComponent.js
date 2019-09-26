import React, { Component } from "react";
import { connect } from "react-redux";
import { View, StatusBar } from "react-native";
import PDFView from "react-native-view-pdf";
import { Background } from "@components/common/";
import DHeader from "@components/common/DHeader";
import ProgressIndicator from "@components/common/ProgressIndicator";
import { getUserCertificate, clearCertificateData } from "@actions/";
import imgBackground from "@assets/img/green_base_image.png";

class PdfViewerComponent extends Component {
  constructor(props) {
    super(props);

    this._onSupportPress = this._onSupportPress.bind(this);
  }

  componentDidMount() {
    let classInfo = this.props.navigation.getParam("CERTIFICATE_CLASS_INFO");

    if (classInfo) {
      this.props.getUserCertificate(classInfo);
    }
  }

  componentWillUnmount() {
    this.props.clearCertificateData();
  }

  _onSupportPress() {
    this.props.navigation.push("DrawerSupport", {
      SHOW_BACK_BUTTON: true
    });
  }

  _renderMainContent() {
    if (this.props.isLoadingCertificate == true) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <ProgressIndicator styles={{ height: 150, width: 150 }} />
        </View>
      );
    } else {
      if (this.props.certificateData) {
        const resourceType = "base64";

        return (
          <View style={{ flex: 1, marginTop: 10 }}>
            <PDFView
              fadeInDuration={250.0}
              style={{ flex: 1, backgroundColor: "#ffffff" }}
              resourceType={resourceType}
              resource={this.props.certificateData}
              onError={error => console.log("Cannot render PDF", error)}
            />
          </View>
        );
      }
    }
  }

  render() {
    return (
      <Background imgBackground={imgBackground}>
        <StatusBar barStyle="light-content" />
        <DHeader
          textKey="certificateScreen.title"
          showBack={true}
          onPress={() => this._onSupportPress()}
        />
        {this._renderMainContent()}
      </Background>
    );
  }
}

const mapStateToProps = ({ certificate }) => {
  const { certificateData, isLoadingCertificate } = certificate;

  return {
    certificateData,
    isLoadingCertificate
  };
};

export default connect(
  mapStateToProps,
  {
    getUserCertificate,
    clearCertificateData
  }
)(PdfViewerComponent);
