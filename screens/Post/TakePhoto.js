import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Loader from '../../components/Loader';
import constants from '../../constants';
import { Camera } from 'expo-camera';
import { Platform } from '@unimodules/core';
import styles from '../../styles';

const View = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
`;

const UploadButton = styled.TouchableOpacity`
	width: 100px;
	height: 30px;
	position: absolute;
	right: 5px;
	top: 15px;
	background-color: ${styles.blueColor};
	justify-content: center;
	align-items: center;
	border-radius: 5px;
`;

const Text = styled.Text`
	color: white;
	font-weight: 600;
`;

const Icon = styled.View``;

const Button = styled.View`
	width: 80;
	height: 80;
	border-radius: 40px;
	border: 10px solid ${styles.lightGreyColor};
`;

export default ({ navigation }) => {
	const cameraRef = useRef();
	const [ canTakePhoto, setCanTakePhoto ] = useState(true);
	const [ loading, setLoading ] = useState(true);
	const [ hasPermission, setHasPermission ] = useState(false);
	const [ cameraType, setCameraType ] = useState(Camera.Constants.Type.back);
	const [ selected, setSelected ] = useState();
	const takePhoto = async () => {
		if (!canTakePhoto) {
			setCanTakePhoto(true);
			cameraRef.current.resumePreview();
			return;
		}
		try {
			setCanTakePhoto(false);
			cameraRef.current.pausePreview();
			const { uri } = await cameraRef.current.takePictureAsync({
				quality: 1
			});
			const asset = await MediaLibrary.createAssetAsync(uri);
			setSelected(asset);
		} catch (e) {
			console.log(e);
			setCanTakePhoto(true);
		}
	};
	const askPermission = async () => {
		try {
			const { status } = await Permissions.askAsync(Permissions.CAMERA);
			const rollstatus = await Permissions.askAsync(Permissions.CAMERA_ROLL);
			if (status === 'granted' && rollstatus.status === 'granted') {
				setHasPermission(true);
			}
		} catch (e) {
			console.log(e);
			hasPermission(false);
		} finally {
			setLoading(false);
		}
	};
	const toggleType = () => {
		if (cameraType === Camera.Constants.Type.front) {
			setCameraType(Camera.Constants.Type.back);
		} else {
			setCameraType(Camera.Constants.Type.front);
		}
	};

	const handleSelected = () => {
		const setChange = navigation.getParam('setChange');
		setChange(selected);
		navigation.goBack(null);
	};

	useEffect(() => {
		askPermission();
	}, []);
	return (
		<View>
			{loading ? (
				<Loader />
			) : hasPermission ? (
				<View>
					<Camera
						ref={cameraRef}
						type={cameraType}
						style={{
							justifyContent: 'flex-end',
							padding: 20,
							width: constants.width,
							height: constants.height / 2
						}}
					>
						<TouchableOpacity onPress={toggleType}>
							<Icon>
								<Ionicons
									name={Platform.OS === 'ios' ? 'ios-reverse-camera' : 'md-reverse-camera'}
									size={28}
									color={'white'}
								/>
							</Icon>
						</TouchableOpacity>
						{!canTakePhoto && (
							<UploadButton onPress={handleSelected}>
								<Text>선택</Text>
							</UploadButton>
						)}
					</Camera>
					<View>
						<TouchableOpacity onPress={takePhoto}>
							<Button />
						</TouchableOpacity>
					</View>
				</View>
			) : null}
		</View>
	);
};
