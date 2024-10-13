import React from 'react';
import CameraPermission from './CameraPermission'; // 권한 확인 컴포넌트
import CameraApp from './CameraApp'; // 사진 촬영 컴포넌트
import { SafeAreaView, Button } from 'react-native';

export default function App() {
  const [showCameraApp, setShowCameraApp] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {!showCameraApp ? (
        <>
          <CameraPermission />
          <Button title="사진 찍기" onPress={() => setShowCameraApp(true)} />
        </>
      ) : (
        <CameraApp />
      )}
    </SafeAreaView>
  );
}
