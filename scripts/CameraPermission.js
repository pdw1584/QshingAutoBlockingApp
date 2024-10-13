import { Text, SafeAreaView } from "react-native";
import { Camera } from "expo-camera";
import { useState, useEffect } from "react";
import * as MediaLibrary from "expo-media-library";

export default function CameraPermission() {
  const [isPermittedCamera, setIsPermittedCamera] = useState(false);

  //카메라용 권한 요청
  const getCameraPermission = async () => {
    await MediaLibrary.requestPermissionsAsync(); // 미디어 권한 요청
    const cameraPermission = await Camera.requestPermissionsAsync(); // 카메라 권한 요청
    setIsPermittedCamera(cameraPermission.status === "granted");
  };

  useEffect(() => {
    getCameraPermission();
  }, []);

  return (
    <SafeAreaView>
      {!isPermittedCamera ? (
        <Text>카메라 권한이 없습니다.</Text>
      ) : (
        <Text>카메라 권한이 있습니다.</Text>
      )}
    </SafeAreaView>
  );
}
