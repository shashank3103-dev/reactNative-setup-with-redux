import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
  ActivityIndicator,
  Platform,
} from 'react-native';
import {RTCView, mediaDevices, RTCPeerConnection} from 'react-native-webrtc';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useAppTheme} from '../../resources/ThemeContext';
import {FONTS} from '../../resources';
import CommonHeader from '../../components/header/CommonHeader';
import URLManager from '../../networkLayer/URLManager';

const LiveClassScreen = ({route, navigation}: any) => {
  const {roomId} = route.params;
  const theme = useAppTheme();
  console.log(roomId, '---');
  const [localStream, setLocalStream] = useState<any>(null);
  const [remoteStream, setRemoteStream] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const pc = useRef<any>(null);

  useEffect(() => {
    requestPermissions().then(granted => {
      if (granted) {
        joinSession();
      } else {
        Alert.alert('Permissions needed', 'Camera and microphone required.');
      }
    });

    return () => {
      endSession();
    };
  }, []);

  const requestPermissions = async () => {
    try {
      let camPerm, micPerm;

      if (Platform.OS === 'android') {
        camPerm = await request(PERMISSIONS.ANDROID.CAMERA);
        micPerm = await request(PERMISSIONS.ANDROID.RECORD_AUDIO);
      } else {
        camPerm = await request(PERMISSIONS.IOS.CAMERA);
        micPerm = await request(PERMISSIONS.IOS.MICROPHONE);
      }

      return camPerm === RESULTS.GRANTED && micPerm === RESULTS.GRANTED;
    } catch (e) {
      console.log('Permission error:', e);
      return false;
    }
  };
  /** 🔗 Call backend join API before starting WebRTC */
  const joinSession = async () => {
    try {
      let urlManager = new URLManager();
      const res = await urlManager.joinLiveSessionStudent(roomId); // 👉 create this in URLManager
      const json = await res.json();

      if (!json.ok && json.error) {
        Alert.alert('Error', json.error);
        setLoading(false);
        return;
      }

      console.log('Joined session:', json.message);
      startCall();
    } catch (err: any) {
      console.error('Join error:', err);
      Alert.alert('Error', err.message);
    } finally {
      setLoading(false);
    }
  };

  const endSession = async () => {
    try {
      let urlManager = new URLManager();
      const res = await urlManager.endLiveSessionStudent(roomId); // 👉 create this in URLManager
      const json = await res.json();

      if (!json.ok && json.error) {
        Alert.alert('Error', json.error);
        setLoading(false);
        return;
      }

      console.log('Joined session:', json.message);
      startCall();
    } catch (err: any) {
      console.error('Join error:', err);
      Alert.alert('Error', err.message);
    } finally {
      setLoading(false);
    }
  };
  const startCall = async () => {
    try {
      pc.current = new RTCPeerConnection({
        iceServers: [{urls: 'stun:stun.l.google.com:19302'}],
      });

      const stream = await mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });

      setLocalStream(stream);
      stream.getTracks().forEach(track => {
        pc.current?.addTrack(track, stream);
      });

      pc.current.ontrack = (event: any) => {
        if (event.streams && event.streams[0]) {
          setRemoteStream(event.streams[0]);
        }
      };

      // TODO: Add WebSocket signaling (send SDP offer/answer)
    } catch (err) {
      console.log('Error starting call:', err);
    }
  };

  const endCall = () => {
    if (pc.current) {
      pc.current.close();
      pc.current = null;
    }
    if (localStream) {
      localStream.getTracks().forEach((t: any) => t.stop());
      setLocalStream(null);
    }
    setRemoteStream(null);
    navigation.goBack();
  };

  if (loading) {
    return (
      <SafeAreaView
        style={[styles.container, {backgroundColor: theme.COLORS.background}]}>
        <CommonHeader title="Joining Live Class..." />
        <ActivityIndicator
          size="large"
          color={theme.COLORS.primary}
          style={{marginTop: 50}}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: '#000'}]}>
      <CommonHeader title={`Live Class`} />

      <View style={styles.videoContainer}>
        {/* Local Stream */}
        {localStream && (
          <RTCView
            streamURL={localStream.toURL()}
            style={styles.localVideo}
            objectFit="cover"
            mirror
          />
        )}

        {/* Remote Stream */}
        {remoteStream && (
          <RTCView
            streamURL={remoteStream.toURL()}
            style={styles.remoteVideo}
            objectFit="cover"
          />
        )}
      </View>

      {/* Bottom Controls */}
      <View style={styles.controls}>
        <TouchableOpacity
          style={[styles.controlButton, {backgroundColor: theme.COLORS.red}]}
          onPress={endSession}>
          <Icon name="call-end" size={28} color="#fff" />
          <Text style={[FONTS.body5, {color: '#fff'}]}>End</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LiveClassScreen;

const styles = StyleSheet.create({
  container: {flex: 1},
  videoContainer: {flex: 1, position: 'relative'},
  localVideo: {
    flex: 1,
    backgroundColor: '#000',
  },
  remoteVideo: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 120,
    height: 160,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 15,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  controlButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 30,
  },
});
