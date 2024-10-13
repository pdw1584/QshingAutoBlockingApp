import { Text, SafeAreaView, View, Image, Alert, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";
import { useState, useEffect, useRef } from "react";
import * as MediaLibrary from "expo-media-library";

//아이콘 임시
const IconButton = ({ onPress, children }) => (
  <TouchableOpacity onPress={onPress} style={{ padding: 10 }}>
    <Text>{children}</Text>
  </TouchableOpacity>
);

export default function CameraApp() {
  const [isPermittedCamera, setIsPermittedCamera] = useState(false);
  const [cameraImage, setCameraImage] = useState(null);
  const cameraRef = useRef(null);

  const getCameraPermission = async () => {
    await MediaLibrary.requestPermissionsAsync();
    const cameraPermission = await Camera.requestPermissionsAsync();
    setIsPermittedCamera(cameraPermission.status === "granted");
  };

  const clearPicture = () => setCameraImage(null);

  const takePicture = async () => {
    if (cameraRef.current === null) return;
    try {
      const { uri } = await cameraRef.current.takePictureAsync();
      setCameraImage(uri);
    } catch (e) {
      console.log(e);
    }
  };

  const savePicture = async () => {
    if (!cameraImage) return;
    try {
      await MediaLibrary.createAssetAsync(cameraImage);
      Alert.alert("사진이 저장되었습니다!");
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getCameraPermission();
  }, []);

  if (!isPermittedCamera)
    return (
      <SafeAreaView>
        <Text>카메라 권한이 없습니다.</Text>
      </SafeAreaView>
    );

  return (
    <View style={styles.container}>
      {!cameraImage ? (
        <>
          <Camera style={styles.camera} ref={cameraRef} />
          <IconButton onPress={takePicture}>사진 찍기</IconButton>
        </>
      ) : (
        <>
          <Image source={{ uri: cameraImage }} style={styles.camera} />
          <View style={styles.buttonWrapper}>
            <IconButton onPress={clearPicture}>뒤로</IconButton>
            <IconButton onPress={savePicture}>저장하기</IconButton>
          </View>
        </>
      )}
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  camera: {
    width: 300,
    height: 400,
  },
  buttonWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
};
