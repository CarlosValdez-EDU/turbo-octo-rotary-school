import React from 'react';
import { ImageBackground } from 'react-native';

const Background = ({ children, imgBackground, backgroudStyle = styles.picture}) => {
    return (
      <ImageBackground style={backgroudStyle} source={imgBackground}>
        {children}
      </ImageBackground>
    );
}

const styles = {
  picture: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover'
  }
};

export { Background };