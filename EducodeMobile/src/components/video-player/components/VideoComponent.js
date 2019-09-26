import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
    Text,
    StyleSheet,
    StatusBar,
    Dimensions,
    BackHandler,
    Animated,
    Image,
    Alert,
    View
} from 'react-native'
import VideoPlayer, { TextTrackType } from 'react-native-video'
import KeepAwake from 'react-native-keep-awake'
import Orientation from 'react-native-orientation'
import Icons from 'react-native-vector-icons/MaterialIcons'
import { Controls } from './'
import { checkSource } from './utils'
import { connect } from "react-redux";
import {
    showNextButton,
    completedVideo,
    saveCurrentVideoTime,
    videoProgressEnlapsed,
    savedCurrentTime,
    resetCurrentVideoTime
} from "@actions/";

const Win = Dimensions.get('window')
const backgroundColor = '#000'

const styles = StyleSheet.create({
    background: {
        backgroundColor,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 98
    },
    fullScreen: {
        ...StyleSheet.absoluteFillObject,
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        width: undefined,
        height: undefined,
        zIndex: 99
    },
    stylesVideo: {
        width: 600,
        height: 500
    }
})

const defaultTheme = {
    title: '#FFF',
    more: '#FFF',
    center: '#FFF',
    volume: '#FFF',
    scrubberThumb: '#FFF',
    scrubberBar: '#FFF',
    seconds: '#FFF',
    duration: '#FFF',
    progress: '#FFF',
    loading: '#FFF'
}

class Video extends Component {
    constructor(props) {

        const PROPORTION_16_9 = 0.5625;
        super(props)
        this.state = {
            paused: !props.autoPlay,
            muted: false,
            fullScreen: false,
            inlineHeight: Win.width * PROPORTION_16_9,
            loading: false,
            duration: 0,
            progress: 0,
            currentTime: 0,
            seeking: false,
            renderError: false,
            subtitlesEnabled: true,
            subtitled: true,
            subtitlesStatus: false,
            subtitleType: '',
            fullScreenStatus: false,
            TEST_TIME: 0
        }


        
        this.animInline = new Animated.Value(Win.width * PROPORTION_16_9)
        this.animFullscreen = new Animated.Value(Win.width * PROPORTION_16_9)

        const initial = Orientation.getInitialOrientation();
        if (initial === "PORTRAIT") {
            this.state.fullscreenStatus = false
        } else {
            this.state.fullscreenStatus = true
        }


        console.log(`GET BEFORE TO START THIS SCREEN THAT ALL:  ------------------------->   ${this.props.videoProgressEnlapsed}`);

    }

    componentDidMount() {
        Orientation.addOrientationListener(this._orientationDidChange);

        if (this.props.saveVideoTime === false){
            this.props.resetCurrentVideoTime();
        }
    }

    _orientationDidChange = orientation => {
        if (orientation === "LANDSCAPE") {
            this.setState({
                fullscreenStatus: true
            });
        } else {
            this.setState({
                fullscreenStatus: false
            });
        }
    };

    async componentWillUnmount() {
        Orientation.getOrientation((err, orientation) => {
            console.log(`Current Device Orientation: ${orientation}`);
        });

        Orientation.removeOrientationListener(this._orientationDidChange);

        this.setState({
            theTime: this.props.videoProgressEnlapsed
        })

        if(this.props.saveVideoTime === true){
            this.props.saveCurrentVideoTime(this.state.TEST_TIME);
        }
    }

    onErrorModalPressed = () => {
        this.props.hideErrorModalValidation();
    };

    onLoadStart() {

        this.setState({ paused: true, loading: true })
    }

    onLoad(data) {
        if (!this.state.loading) return
        this.props.onLoad(data)
        const { height, width } = data.naturalSize
        const ratio = height === 'undefined' && width === 'undefined' ?
            (9 / 16) : (height / width)
        const inlineHeight = this.props.lockRatio ?
            (Win.width / this.props.lockRatio)
            : (Win.width * ratio)
        this.setState({
            paused: !this.props.autoPlay,
            loading: false,
            inlineHeight,
            duration: data.duration
        }, () => {
            Animated.timing(this.animInline, { toValue: inlineHeight, duration: 200 }).start()
            this.props.onPlay(!this.state.paused)
            if (!this.state.paused) {
                KeepAwake.activate()
                if (this.props.fullScreenOnly) {
                    this.setState({ fullScreen: true }, () => {
                        this.props.onFullScreen(this.state.fullScreen)
                        // this.animToFullscreen(Win.height)
                        if (this.props.rotateToFullScreen) Orientation.lockToLandscape()
                    })
                }
            }
        })
    }

    onEnd() {
        this.props.completedVideo();
        this.props.onEnd()
        const { loop } = this.props
        if (!loop) this.pause()
        this.onSeekRelease(0)
        this.setState({ currentTime: 0 }, () => {
            if (!loop) this.controls.showControls()
        })
    }


    onSeekRelease(percent) {
        const seconds = percent * this.state.duration
        this.setState({ progress: percent, seeking: false }, () => {
            this.player.seek(seconds)
        })
    }

    onError(msg) {
        console.log('ERROR:::', msg);
        this.props.onError(msg)
        const { error } = this.props
        this.setState({ renderError: true }, () => {
            let type
            switch (true) {
                case error === false:
                    type = error
                    break
                case typeof error === 'object':
                    type = Alert.alert(error.title, error.message, error.button, error.options)
                    break
                default:
                    type = Alert.alert('Oops!', 'There was an error playing this video, please try again later.', [{ text: 'Close' }])
                    break
            }
            return type
        })
    }

    pause() {
        if (!this.state.paused) this.togglePlay()
    }

    play() {
        if (this.state.paused) this.togglePlay()
    }

    togglePlay() {
        this.setState({ paused: !this.state.paused }, () => {
            this.props.onPlay(!this.state.paused)
            Orientation.getOrientation((e, orientation) => {
                if (this.props.inlineOnly) return
                if (!this.state.paused) {
                    if (this.props.fullScreenOnly && !this.state.fullScreen) {
                        this.setState({ fullScreen: true }, () => {
                            this.props.onFullScreen(this.state.fullScreen)
                            const initialOrient = Orientation.getInitialOrientation()
                            const height = orientation !== initialOrient ?
                                Win.width : Win.height
                            // this.animToFullscreen(height)
                            if (this.props.rotateToFullScreen) Orientation.lockToLandscape()
                        })
                    }
                    KeepAwake.activate()
                } else {
                    KeepAwake.deactivate()
                }
            })
        })
    }

    toggleMute() {
        this.setState({ muted: !this.state.muted })
    }

    seek(percent) {
        const currentTime = percent * this.state.duration;
        console.log(`the main current time in seek(percent) ${currentTime}`)
        this.setState({ seeking: true, currentTime })
    }

    seekTo(seconds) {


        let percent = 0;
        if (seconds !== 0 && this.state.duration !== 0){
            percent = seconds / this.state.duration;
            if (seconds > this.state.duration) {
                throw new Error(`Current time (${seconds}) exceeded the duration ${this.state.duration}`)
                return false
            }
        }

        return this.onSeekRelease(percent);
    }

    progress(time) {
        const { currentTime } = time
        const progress = currentTime / this.state.duration

        const porcentage = ((0.75 * this.state.duration));

        if (time.currentTime >= porcentage) {
            this.props.showNextButton();
        } else {
            this.props.videoProgress = false;
        }

        if (!this.state.seeking) {
            this.setState({ progress, currentTime }, () => {
                this.props.onProgress(time)
            })
        }

        // this.props.saveCurrentVideoTime(time);
        this.setState({TEST_TIME: time});
    

    }

    renderError() {
        const { fullScreen } = this.state
        const inline = {
            height: this.animInline,
            alignSelf: 'stretch'
        }
        const textStyle = { color: 'white', padding: 10 }
        return (
            <Animated.View
                style={[styles.background, fullScreen ? styles.fullScreen : inline]}
            >
                <Text style={textStyle}>Retry</Text>
                <Icons
                    name="replay"
                    size={60}
                    color={this.props.theme}
                    onPress={() => this.setState({ renderError: false })}
                />
            </Animated.View>
        )
    }

    toggleSubtitles() {
        this.setState({
            subtitled: !this.state.subtitled
        });
    }

    renderPlayer() {
        const {
            fullScreen,
            paused,
            muted,
            loading,
            progress,
            duration,
            inlineHeight,
            currentTime,
            subtitlesEnabled,
        } = this.state

        const {
            url,
            loop,
            title,
            logo,
            rate,
            style,
            volume,
            placeholder,
            theme,
            onTimedMetadata,
            resizeMode,
            onMorePress,
            inlineOnly,
            playInBackground,
            playWhenInactive,
            captions,
            onEnd,
            textTracks,
            fullscreenStatus,
            styleVideo
        } = this.props

        // const inline = {
        //     height: inlineHeight,
        //     alignSelf: 'stretch'
        // }

        const inline = {
            height: 530,
            alignSelf: 'stretch'
        }

        const full = {
            height: inlineHeight,
            alignSelf: 'stretch'
        }


        const setTheme = {
            ...defaultTheme,
            ...theme
        }

        let typeSubtitles = (this.state.subtitled == true) ? 'language' : 'disabled';

        //validation of savedCurrentTime, if savedCurrentTime === true && this.state.duration !== 0 then seekTo else null

        if(this.props.videoProgressEnlapsed > 0  && this.props.savedCurrentTime === true && this.state.duration !== 0){
            console.log(`FROM renderPlayer mehtod ------> Going to the time: ${this.props.videoProgressEnlapsed}`);

            console.log(`---------------------  ${this.props.videoProgressEnlapsed}`);
            this.seekTo(this.props.videoProgressEnlapsed);
            this.props.resetCurrentVideoTime();
        } else {
            //null
        }

        return (
            <Animated.View>
                <VideoPlayer
                    {...checkSource(url)}
                    paused={paused}
                    repeat={loop}
                    style={(this.state.fullscreenStatus === true) ? inline : full}
                    ref={(ref) => { this.player = ref }}
                    rate={rate}
                    volume={volume}
                    textTracks={captions}
                    selectedTextTrack={{
                        type: typeSubtitles,
                        value: 'subtitle',
                        disabled: true,
                    }}
                    toggleSubtitles={this.state.subtitled}
                    muted={muted}
                    playInBackground={playInBackground}
                    playWhenInactive={playWhenInactive}
                    onLoadStart={() => this.onLoadStart()}
                    onLoad={e => this.onLoad(e)}
                    onProgress={e => this.progress(e)}
                    onEnd={() => this.onEnd()}
                    onError={e => this.onError(e)}
                    onTimedMetadata={e => onTimedMetadata(e)}
                />

                <Controls
                    ref={(ref) => { this.controls = ref }}
                    toggleSubtitles={() => this.toggleSubtitles()}
                    subtitlesEnabled={subtitlesEnabled}
                    toggleMute={() => this.toggleMute()}
                    toggleFS={() => this.toggleFS()}
                    togglePlay={() => this.togglePlay()}
                    paused={paused}
                    muted={muted}
                    subtitled={this.state.subtitled}
                    loading={loading}
                    onSeek={val => this.seek(val)}
                    onSeekRelease={pos => this.onSeekRelease(pos)}
                    progress={progress}
                    currentTime={currentTime}
                    duration={duration}
                    logo={logo}
                    title={title}
                    theme={setTheme}
                />
            </Animated.View>
        );


        
    }

    render() {
        if (this.state.renderError) return this.renderError()
        return this.renderPlayer()
    }
}

Video.propTypes = {
    url: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    placeholder: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    style: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.number
    ]),
    error: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.object
    ]),
    loop: PropTypes.bool,
    autoPlay: PropTypes.bool,
    inlineOnly: PropTypes.bool,
    fullScreenOnly: PropTypes.bool,
    playInBackground: PropTypes.bool,
    playWhenInactive: PropTypes.bool,
    rotateToFullScreen: PropTypes.bool,
    lockPortraitOnFsExit: PropTypes.bool,
    onEnd: PropTypes.func,
    onLoad: PropTypes.func,
    onPlay: PropTypes.func,
    onError: PropTypes.func,
    onProgress: PropTypes.func,
    onMorePress: PropTypes.func,
    onFullScreen: PropTypes.func,
    onTimedMetadata: PropTypes.func,
    rate: PropTypes.number,
    volume: PropTypes.number,
    lockRatio: PropTypes.number,
    logo: PropTypes.string,
    title: PropTypes.string,
    theme: PropTypes.object,
    resizeMode: PropTypes.string,
    toggleSubtitles: PropTypes.func.isRequired,
}

Video.defaultProps = {
    placeholder: undefined,
    style: {},
    error: true,
    loop: false,
    autoPlay: false,
    inlineOnly: false,
    fullScreenOnly: false,
    playInBackground: false,
    playWhenInactive: false,
    rotateToFullScreen: false,
    lockPortraitOnFsExit: false,
    onEnd: () => { },
    onLoad: () => { },
    onPlay: () => { },
    onError: () => { },
    onProgress: () => { },
    onMorePress: undefined,
    onFullScreen: () => { },
    onTimedMetadata: () => { },
    rate: 1,
    volume: 1,
    lockRatio: undefined,
    logo: undefined,
    title: '',
    theme: defaultTheme,
    resizeMode: 'contain'
}

const mapStateToProps = state => {
    const { locale } = state.i18n;
    const { user, appMode } = state.app;
    const {
        videoProgress,
        videoProgressEnlapsed,
        savedCurrentTime,
        saveVideoTime,
        showSubtitles
    } = state.course;
    const { userClasses } = state.dashboard;

    return {
        user,
        videoProgress,
        showSubtitles,
        videoProgressEnlapsed,
        savedCurrentTime,
        saveVideoTime
    };
};

export default connect(
    mapStateToProps,
    {
        showNextButton,
        completedVideo,
        saveCurrentVideoTime,
        videoProgressEnlapsed,
        savedCurrentTime,
        resetCurrentVideoTime
    }
)(Video);