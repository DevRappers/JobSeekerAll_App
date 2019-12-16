import React from 'react';
import { ScrollView, Text, View, Image } from 'react-native';
import { Card } from 'react-native-elements';
import { Grid } from '@ant-design/react-native';

export default ({ data }) => {
	return (
		<View style={[ { padding: 10 } ]}>
			<Grid
				data={data}
				columnNum={2}
				carouselMaxRow={10}
				onPress={(_el, index) => alert(index)}
				renderItem={(_el, index) => (
					<Card title={data[index].title}>
						<View>
							<Image
								style={{ height: 100, width: '100%', resizeMode: 'contain' }}
								source={{ uri: data[index].proImage }}
							/>
						</View>
					</Card>
				)}
				itemStyle={{
					marginBottom: 10
				}}
			>
				<Text>dd</Text>
			</Grid>
		</View>
	);
};
