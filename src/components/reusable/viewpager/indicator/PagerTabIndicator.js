/**
 * Created by tangzhibin on 16/5/11.
 */

'use strict'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, ViewPropTypes, TextPropTypes, Image, Text, TouchableOpacity } from 'react-native'
import IndicatorViewPager from '../IndicatorViewPager'
import { Icon } from 'react-native-elements';

export default class PagerTabIndicator extends Component {
    static propTypes = {
        ...ViewPropTypes,
        initialPage: PropTypes.number,
        pager: PropTypes.instanceOf(IndicatorViewPager),
        tabs: PropTypes.arrayOf(PropTypes.shape({
            text: PropTypes.string,
            iconSource: PropTypes.string,
            iconType: PropTypes.string,//
            iconClick: PropTypes.func,
            selectedIconSource: PropTypes.string
        })).isRequired,
        itemStyle: ViewPropTypes.style,//
        selectedItemStyle: ViewPropTypes.style,
        iconStyle: Text.propTypes.style,//
        selectedIconStyle: Text.propTypes.style,//
        textStyle: Text.propTypes.style,
        selectedTextStyle: Text.propTypes.style,
        changePageWithAnimation: PropTypes.bool,
    }

    static defaultProps = {
        tabs: [],
        changePageWithAnimation: true
    }

    state = {
        selectedIndex: this.props.initialPage
    }

    render() {
        let {
            tabs, pager, style, itemStyle, selectedItemStyle, iconStyle,
            selectedIconStyle, textStyle, selectedTextStyle, changePageWithAnimation
        } = this.props
        if (!tabs || tabs.length === 0) return null

        let tabsView = tabs.map((tab, index) => {
            let isSelected = this.state.selectedIndex === index
            return (
                <TouchableOpacity
                    style={[styles.itemContainer, isSelected ? selectedItemStyle : itemStyle]}
                    activeOpacity={0.6}
                    key={index}
                    onPress={() => {
                        if (!isSelected) {
                            if (this.props.changePageWithAnimation)
                                pager.setPage(index);
                            else pager.setPageWithoutAnimation(index);
                        }
                        tab.iconClick && tab.iconClick();//optional prop to call when tab is clicked
                    }}
                >
                    {
                        tab.iconSource && <Icon
                            name={tab.iconSource}
                            type={tab.iconType || 'feather'}
                            iconStyle={isSelected ? selectedIconStyle : iconStyle}
                        />
                    }
                    {tab.text &&
                        <Text
                            style={[isSelected ? styles.textSelected : styles.text, isSelected ? selectedTextStyle : textStyle]}
                        >
                            {tab.text}
                        </Text>}
                </TouchableOpacity>
            )
        })
        return (
            <View style={[styles.container, style]} >
                {tabsView}
            </View>
        )
    }

    onPageSelected(e) {
        this.setState({ selectedIndex: e.position })
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: "center",
        //borderTopWidth: 0.3,
        backgroundColor: '#F7F7F7'
    },
    itemContainer: {
        alignItems: 'center',
        //borderWidth: 1,
        flex: 1
    },
    image: {},
    text: {
        marginTop: 4,
        fontSize: 11,
        color: '#999999'
    },
    textSelected: {
        marginTop: 4,
        fontSize: 11,
        color: '#3584F6'
    }
})