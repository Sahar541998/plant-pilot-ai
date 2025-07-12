import React, {useCallback, useEffect} from 'react';
import {View, Text, Image, Button} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {ImagePickerResult} from "expo-image-picker";

function UploadPlantImageFromGallery({navigation}: { navigation: any }) {

    const [image, setImage] = React.useState<ImagePickerResult>();

    const loadImage = useCallback(() => {
        (async () => {
            // Ask for permissions
            const {status} = await ImagePicker.requestCameraPermissionsAsync();
            if (status !== 'granted') {
                alert('Permission to access camera is required!');
                return;
            }

            // Open the camera (or use launchImageLibraryAsync for gallery)
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: 'images',
                allowsEditing: true,
                aspect: [4, 3],
                quality: 0.5,
            });

            if (!result.canceled) {
                console.log('Image URI:', result.assets[0].uri);
            }
            setImage(result);

        })();
    }, [])

    useEffect(() => {
        loadImage();
    }, [loadImage]);

    const imageUri = image?.assets?.[0]?.uri;

    return (
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            {!!imageUri ? (
                <>
                    <Image
                        source={{uri: imageUri}}
                        style={{width: 300, height: 400, borderRadius: 8}}
                        resizeMode="contain"
                    />
                    <Button
                        title="Analyze"
                        onPress={() => navigation.navigate('AnalyzeImage', {imageUri})}
                    />
                </>
            ) : (
                <Text>Loading Gallery...</Text>
            )}
        </View>
    )
}


export {UploadPlantImageFromGallery}