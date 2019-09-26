import * as KeyChain from 'react-native-keychain';




export function saveJWT(token){
    KeyChain.setGenericPassword("JWT", token)
    .then(function(){
        console.log('Saved successfully');
    });
}


export function getJWT(){
    KeyChain.getGenericPassword()
        .then(function(credentials){
            console.log('Credentials successfuly loaded for the user');
        })
        .catch(function(err){
           console.log('Keychain couldn\'t be accessed! Maybe no value set? '+err.message);
        });
}