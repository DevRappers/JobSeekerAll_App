/*
	HobbyPost
	- 취미모임을 Grid형태로 보여줄때 안에 들어가는 카드형태의 Component
*/
import React from 'react';
import { Text, View, Image } from 'react-native';
import { Card } from 'react-native-elements';
import { Grid } from '@ant-design/react-native';

export default ({ data, navigation }) => {
	return (
		<View style={[ { padding: 5 } ]}>
			<Grid
				data={data}
				columnNum={2}
				carouselMaxRow={data.length}
				onPress={(_el, index) => {
					const {
						id,
						isMyHobby,
						area,
						title,
						proImage,
						caption,
						information,
						postsCount,
						commentCount,
						posts,
						comments
					} = data[index];
					navigation.navigate('HobbyDetail', {
						id,
						isMyHobby,
						area,
						title,
						proImage,
						caption,
						information,
						postsCount,
						commentCount,
						posts,
						comments
					});
				}}
				renderItem={(_el, index) => (
					<Card title={data[index].title}>
						<View>
							<Image
								resizeMode="cover"
								style={{ height: 90, width: '100%' }}
								source={{ uri: data[index].proImage }}
							/>
						</View>
					</Card>
				)}
				itemStyle={{
					marginBottom: 5
				}}
			>
				<Text>dd</Text>
			</Grid>
		</View>
	);
};
