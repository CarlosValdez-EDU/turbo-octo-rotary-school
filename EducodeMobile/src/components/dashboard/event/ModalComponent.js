'use strict';

import React, { Component } from "react";
import { connect } from "react-redux";
import { getEventData, setRewardReedemed, getEventReward } from "@actions/";
import {
  View,
  Text,
  Platform,
  Image,
  TouchableOpacity,
  ImageBackground,
  Clipboard,
  TextInput
} from "react-native";
import { Container, BasicText, Button } from "@components/common";
import Modal from "react-native-modal";
import Loc from "@components/common/Loc/Loc";
import GridView from "react-native-gridview";
import * as Progress from "react-native-progress";
import LottieView from "lottie-react-native";
import giftCard from "@assets/img/itunes-gift-card.png";
import coinImage from "@assets/icons/coins_color.png";
import copy from "@assets/icons/copy.png";
import _ from "lodash";
import slide_curves from "@assets/img/curve_left_right.png";
import slide_chara from "@assets/img/Slide_1_Chara.png";
import slide_lines from "@assets/img/Slide_4_lines.png";
import hamster from "@assets/img/hamster.png";
import fb from "@assets/img/fb.png";
import twitter from "@assets/img/tw.png";
import ProgressIndicator from "@components/common/ProgressIndicator";

const itemsPerRow = 2;

class ModalComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redeeming: false,
      copied: false,
      isDirtyData: false
    };

    this.copyToClipboard = this.copyToClipboard.bind(this);
    this.renderCopied = this.renderCopied.bind(this);
    this.shareSocialPressed = this.shareSocialPressed.bind(this);
    this.renderEventState = this.renderEventState.bind(this);
    this.onPressAction = this.onPressAction.bind(this);
  }

  copyToClipboard(code) {
    Clipboard.setString(code);
    this.setState({ copied: true });
  }

  renderCopied() {
    if (this.state.copied)
      return (
        <BasicText
          textKey={"dashboardScreen.eventRedeemClipboard"}
          textStyles={styles.textCodeCopied}
        />
      );
  }

  shareSocialPressed(social) {
    if (this.props.sharePressed) {
      this.setState({ redeeming: false, copied: false, isDirtyData: false });
      this.props.sharePressed(social);
    }
  }

  onPressAction() {
    if (this.props.onPress) {
      this.setState({ redeeming: false, copied: false, isDirtyData: false });
      this.props.onPress();
    }
  }

  renderBottomLayout(item) {
    if (item.name === "event1-shareapp-1") {
      return (
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={() => this.shareSocialPressed("facebook")}>
            <Image
              style={{
                width: 50,
                height: 50,
                resizeMode: "contain",
                margin: 10,
              }}
              source={fb}
            />
          </TouchableOpacity>


          <TouchableOpacity onPress={() => this.shareSocialPressed("twitter")}>
            <Image
              style={{
                width: 50,
                height: 50,
                resizeMode: "contain",
                margin: 10,
              }}
              source={twitter}
            />
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <Text
          style={{
            width: 40,
            fontSize: 14,
            color: "white",
            marginTop: 5,
            textAlign: "center"
          }}
        >{`${item.progress}/${item.goal}`}</Text>
      );
    }
  }

  renderEventState() {
    if (this.props.loading === true) {
      return (
        <View style={{ flex: 1, alignContent: "center", alignItems: "center" }}>
          <Container containerStyles={styles.containerLoaderStyle}>
            <ProgressIndicator styles={styles.loaderIndicatorStyle} />
          </Container>
        </View>
      );
    } else if (this.props.eventData.tasks.length > 0) {
      return (
        <View style={{ height: 300 }}>
          <BasicText
            textKey={"dashboardScreen.eventSubtitle"}
            textStyles={styles.titleText}
          />
          <GridView
            style={{ width: 700, paddingRight: 200, marginLeft: 30 }}
            data={this.props.eventData.tasks}
            dataSource={null}
            itemsPerRow={itemsPerRow}
            renderItem={(item, sectionID, rowID, itemIndex, itemID) => {
              return (
                <View style={{ flexDirection: "column", margin: 10 }}>
                  <BasicText
                    textStyles={{ fontSize: 15, color: "white", marginBottom: 15 }}
                    textKey={`eventData.event-1.${item.name}`}
                  />
                  <View style={{ flex: 1, flexDirection: "column" }}>
                    <View style={{ flex: 1 }}>
                      <Progress.Bar
                        progress={eval(item.progress / item.goal)}
                        width={null}
                        height={15}
                        color="white"
                        borderColor="white"
                        borderRadius={20}
                      />
                    </View>
                    {this.renderBottomLayout(item)}
                  </View>
                </View>
              );
            }}
          />
          {/* <BasicText
            textKey={"dashboardScreen.eventDescription"}
            textStyles={styles.subtitleText}
          /> */}
        </View>
      );
    }
  }

  renderEvent() {
    return (
      <View style={styles.modalContainer}>
        {/* <BasicText textKey={'dashboardScreen.eventSubtitle'} textStyles={styles.subtitleText} /> */}
        <View>
          <View
            style={{
              height: 200,
              flexDirection: "row",
              marginLeft: 17,
              marginRight: 30
            }}
          >
            <View style={styles.imageWaterMarkContainer}>
              <Image source={slide_curves} style={styles.waterMarkCurves} />
            </View>
            <View style={styles.hamsterImageContainer}>
              <Image source={hamster} style={styles.hamsterImage} />
            </View>
          </View>
          {this.renderEventState()}
        </View>
        <View style={styles.waterMarkLinesContainer}>
          <Image source={slide_lines} style={styles.waterMarkLines} />
        </View>
        <Button
          buttonStyles={styles.buttonClose}
          textStyle={styles.textButtonClose}
          onPress={() => this.onPressAction()}
        >
          {Loc.getInstance().TextFor("dashboardScreen.closeModal", this.props)}
        </Button>
      </View>
    );
  }

  renderRedeem() {
    return (
      <View
        style={[
          styles.modalContainer,
          { height: this.state.redeeming ? 700 : 400 }
        ]}
      >
        {this.state.redeeming
          ? this.renderRedeemScreenToWallet()
          : this.renderRedeemScreenToCoin()}
      </View>
    );
  }

  renderRedeemScreenOne() {
    const data = _.head(this.props.eventReward);
    return (
      <View
        style={{ borderRadius: 20, padding: 20, backgroundColor: "#047a7a" }}
      >
        <View style={styles.redeemContainer}>
          <View style={styles.informationContainer}>
            <View style={{ flex: 1, marginTop: 20 }}>
              <BasicText
                textKey={"dashboardScreen.eventRedeemTitle"}
                textStyles={styles.titleTextRedeem}
              />
              <BasicText
                textKey={"dashboardScreen.eventRedeemSubtitle"}
                textStyles={styles.subtitleTextRedeem}
              />
            </View>
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Button
                buttonStyles={styles.buttonRedeem}
                textStyle={styles.textButtonRedeem}
                onPress={() => {
                  this.setState({ redeeming: true });
                  this.newRedeemPressed(_.get(data, ["parentId"]));
                }}
              >
                {Loc.getInstance().TextFor(
                  "dashboardScreen.eventRedeemButton",
                  this.props
                )}
              </Button>
            </View>
          </View>
          <View style={{ flex: 0.8, margin: 10 }}>
            <LottieView
              style={{ flex: 1, marginBottom: 20 }}
              ref={animation => {
                this.animation = animation;
              }}
              source={require("@assets/animations/happyowl.json")}
              autoPlay
              loop={true}
            />
          </View>
        </View>
      </View>
    );
  }

  renderRedeemScreenTwo() {
    const data = _.head(this.props.eventReward);

    return (
      <View
        style={[
          styles.redeemContainer,
          { flexDirection: "column", margin: 30 }
        ]}
      >
        <ImageBackground source={giftCard} style={styles.cardImage}>
          <View style={styles.container}>
            <Text numberOfLines={1}>{data.gift.gift}</Text>
            <TouchableOpacity
              onPress={() => this.copyToClipboard(data.gift.gift)}
            >
              <Image source={copy} style={styles.copyImage} />
            </TouchableOpacity>
          </View>
        </ImageBackground>
        <View>
          {this.renderCopied()}
          <BasicText
            textKey={"dashboardScreen.eventRedeemTitle2"}
            textStyles={[styles.titleTextRedeem, { fontSize: 34 }]}
          />
          <BasicText
            textKey={"dashboardScreen.eventRedeemInstructions"}
            textStyles={[styles.informationTextRedeem, { fontFamily: 'Roboto-Bold', }]}
          />
          <BasicText
            textKey={"dashboardScreen.eventRedeemNotice"}
            textStyles={[styles.informationTextRedeem, { fontSize: 14 }]}
          />
          <BasicText
            textKey={"dashboardScreen.eventRedeemNote"}
            textStyles={[styles.informationTextRedeem, { fontFamily: 'Roboto-Bold', }]}
          />
        </View>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Button
            buttonStyles={[styles.buttonRedeem, { alignSelf: "center" }]}
            textStyle={styles.textButtonRedeem}
            onPress={() => this.redeemPressed(_.get(data, ["parentId"]))}
          >
            {Loc.getInstance().TextFor(
              "dashboardScreen.eventOKButton",
              this.props
            )}
          </Button>
        </View>
      </View>
    );
  }

  renderRedeemScreenToCoin() {
    return (
      <View
        style={{ borderRadius: 20, padding: 20, backgroundColor: "#047a7a" }}
      >
        <View style={styles.redeemContainer}>
          <View style={styles.informationContainer}>
            <View style={{ flex: 1, marginTop: 20 }}>
              <BasicText
                textKey={"dashboardScreen.eventRedeemTitle"}
                textStyles={styles.titleTextRedeem}
              />
              <BasicText
                textKey={"dashboardScreen.eventRedeemSubtitleCoin"}
                textStyles={styles.subtitleTextRedeem}
              />
            </View>
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Button
                buttonStyles={styles.buttonRedeem}
                textStyle={styles.textButtonRedeem}
              >
                {Loc.getInstance().TextFor(
                  "dashboardScreen.eventRedeemButtonCoin",
                  this.props
                )}
              </Button>
            </View>
          </View>
          <View style={{ flex: 0.8, margin: 10 }}>
            <LottieView
              style={{ flex: 1, marginBottom: 20 }}
              ref={animation => {
                this.animation = animation;
              }}
              source={require("@assets/animations/happyowl.json")}
              autoPlay
              loop={true}
            />
          </View>
        </View>
      </View>
    );
  }

  renderRedeemScreenToWallet() {
    return (
      <View
        style={[
          styles.redeemContainer,
          { flexDirection: "column", margin: 30 }
        ]}
      >
        <ImageBackground source={coinImage} style={styles.coinImageStyle}/>
        <View style={{alignItems:'center'}}>
          <BasicText
            textKey={"dashboardScreen.eventRedeemTitle2"}
            textStyles={[styles.titleTextRedeem, { fontSize: 34 }]}
          />
          <BasicText
            textKey={"dashboardScreen.eventRedeemTitleCoin"}
            textStyles={[styles.titleTextRedeemPac, { fontSize: 34 }]}
          />
          <TextInput placeholder= 'Wallet Adress' placeholderTextColor= 'gray' style={{ width:'60%', height:40, borderRadius: 20, label:"Walletfdfs", placeholderTextColor: 'red', padding:10, borderWidth:0.5, marginTop: 10}}/>
          <BasicText
            textKey={"dashboardScreen.eventRedeemInstructionsCoin"}
            textStyles={[styles.informationTextRedeem, { fontFamily: 'Roboto-Bold', }]}
          />
          <BasicText
            textKey={"dashboardScreen.eventRedeemNoteCoin"}
            textStyles={[styles.informationTextRedeem, { fontFamily: 'Roboto-Bold', }]}
          />
        </View>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Button
            buttonStyles={[styles.buttonRedeem, { alignSelf: "center" }]}
            textStyle={styles.textButtonRedeem}
          >
            {Loc.getInstance().TextFor(
              "dashboardScreen.eventButtonCoin",
              this.props
            )}
          </Button>
        </View>
      </View>
    );
  }

  newRedeemPressed = async parentId => {
    await this.props.setRewardReedemed(parentId);
    await this.props.getEventReward();
  };

  redeemPressed = parentId => {
    this.setState({ redeeming: false, copied: false, isDirtyData: false });
    // this.props.setRewardReedemed(parentId);
    this.props.onPress();
  };

  render() {
    if (this.props.visible && !this.state.isDirtyData) {
      this.props.getEventData();
      this.setState({ isDirtyData: true });
    }
    return (
      <Modal isVisible={this.props.visible} style={styles.modalMainContainer}>
        {this.props.eventReward != undefined &&
        this.props.eventReward.length > 0
          ? this.renderRedeem()
          : this.renderEvent()}
      </Modal>
    );
  }
}

const styles = {
  hamsterImageContainer: {
    width: "50%"
  },
  hamsterImage: {
    right: 0,
    top: 20,
    width: "70%",
    height: 200,
    position: "absolute",
    resizeMode: "stretch"
  },
  imageWaterMarkContainer: {
    width: "50%"
  },
  waterMarkCurves: {
    width: "50%",
    height: 150,
    left: -1,
    resizeMode: "stretch",
    // marginLeft: 17,
    marginTop: 13,
    position: "absolute"
  },
  waterMarkLinesContainer: {
    position: "absolute",
    right: 0,
    bottom: 0
  },
  waterMarkLines: {
    width: 340,
    height: 340,
    resizeMode: "contain"
  },
  modalMainContainer: {
    flex: 1,
    padding: 30,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  modalContainer: {
    borderRadius: 20,
    backgroundColor: "#047a7a",
    width: 700,
    height: 600,
    alignItems: "center",
    justifyContent: "space-between"
  },
  redeemContainer: {
    flexDirection: "row",
    borderRadius: 20,
    backgroundColor: "white",
    flex: 1,
    width: 640
  },
  informationContainer: {
    flex: 1,
    margin: 10,
    alignItems: "center"
  },
  titleText: {
    fontFamily: "Roboto-Medium",
    fontSize: 25,
    alignSelf: "flex-start",
    color: "white",
    marginLeft: 40,
    marginBottom: 10
  },
  subtitleText: {
    fontFamily: "Roboto-Medium",
    fontSize: 20,
    alignSelf: "flex-start",
    color: "white",
    marginLeft: 40,
    marginBottom: 10
  },
  textCodeCopied: {
    fontFamily: "Roboto-Medium",
    fontSize: 15,
    alignSelf: "center",
    color: "rgb(0,90,89)",
    marginTop: 5,
    textAlign: "center"
  },
  titleTextRedeem: {
    fontFamily: "Roboto-Medium",
    fontSize: 40,
    alignSelf: "center",
    color: "#707070",
    marginTop: 20,
    textAlign: "center"
  },
  titleTextRedeemPac:{
    fontFamily: "Roboto-Medium",
    fontSize: 40,
    alignSelf: "center",
    color: "#707070",
    marginTop: 5,
    textAlign: "center"
  },
  subtitleTextRedeem: {
    fontFamily: "Roboto-Medium",
    fontSize: 18,
    alignSelf: "center",
    color: "#707070",
    marginTop: 20,
    textAlign: "center"
  },
  buttonClose: {
    alignSelf: "flex-end",
    backgroundColor: "#09a7a7",
    borderRadius: 30,
    borderColor: "#09a7a7",
    width: 134,
    height: 40,
    borderWidth: 1,
    marginRight: 20,
    marginTop: 10,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 1
      },
      android: {
        elevation: 1
      }
    })
  },
  textButtonClose: {
    textAlign: "center",
    alignSelf: "center",
    color: "white",
    fontSize: 16,
    fontFamily: "Roboto-medium"
  },
  buttonRedeem: {
    backgroundColor: "#09a7a7",
    borderRadius: 30,
    borderColor: "#09a7a7",
    width: 250,
    height: 40,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 1
      },
      android: {
        elevation: 1
      }
    })
  },
  textButtonRedeem: {
    textAlign: "center",
    alignSelf: "center",
    color: "white",
    fontSize: 18,
    fontFamily: "Roboto-Medium"
  },
  container: {
    backgroundColor: "white",
    marginBottom: 20,
    height: 35,
    width: "70%",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    alignSelf: "center",
    padding: 10,
    ...Platform.select({
      ios: {
        shadowColor: "#808080",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 1
      },
      android: {
        elevation: 1
      }
    })
  },
  cardImage: {
    width: 300,
    height: 200,
    marginTop: 20,
    justifyContent: "flex-end",
    alignSelf: "center"
  },
  coinImageStyle:{
    width: 100,
    height: 90,
    marginTop: 20,
    justifyContent: "flex-end",
    alignSelf: "center",
    resizeMode: 'stretch',
  },
  copyImage: {
    height: 20,
    width: 20
  },
  informationTextRedeem: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    alignSelf: "center",
    color: "#707070",
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    textAlign: "center"
  },
  containerLoaderStyle: {
    height: 110,
    width: 110
  },
  loaderIndicatorStyle: {
    width: 100,
    height: 100,
    alignSelf: "center"
  }
};

const mapStateToProps = ({ event }) => {
  const { eventData, loading, eventReward } = event;
  return { eventData, loading, eventReward };
};

export default connect(
  mapStateToProps,
  {
    getEventData,
    setRewardReedemed,
    getEventReward
  }
)(ModalComponent);
