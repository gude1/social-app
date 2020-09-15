import React, { useState } from 'react';
import {
    responsiveHeight,
    responsiveWidth,
} from 'react-native-responsive-dimensions';
import { View, Text } from 'react-native';
import { useTheme } from '../assets/themes/index';
const { colors } = useTheme();
//file:///storage/emulated/0/DCIM/Facebook/FB_IMG_1583485615893.jpg
//file:///storage/emulated/0/Pictures/Instagram/IMG_20200612_085923_467.jpg
const RouterScreen = ({ componentId, photo }) => {
    return (
        <View style={{ flex: 1 }}>
            <Placeholder
                style={{
                    height: responsiveHeight(100),
                    backgroundColor: colors.border,
                }}
                Animation={Progressive}
            >
                <PlaceholderMedia
                    style={[

                        {
                            backgroundColor: colors.border,
                            width: responsiveWidth(100),
                            height: responsiveHeight(100),
                        },
                    ]}
                />
            </Placeholder>
        </View>
    )
};


export default RouterScreen;