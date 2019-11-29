/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {StyleSheet, View} from 'react-native';
const headFemale = require('./data/head_female.json');
import graphKeys from './config/graph';

import {
  StackedAreaChart,
  LineChart,
  Grid,
  YAxis,
  XAxis,
  BarChart,
  AreaChart,
} from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import * as scale from 'd3-scale';
import {Circle, Path, G} from 'react-native-svg';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headFemaleFilteredArray: [],
    };
  }

  componentDidMount() {
    this.getFilteredGraphList();
  }

  getFilteredGraphList = () => {
    let headFemaleFiltered = [];
    for (let i = 0; i < Object.keys(headFemale).length; i = i + 15) {
      headFemaleFiltered.push(headFemale[i]);
    }
    this.setState({headFemaleFilteredArray: headFemaleFiltered});
  };

  render() {
    const linedata = [50,100,200,300,250];
    const Decorator = ({x, y, data}) => {
      return data.map((value, index) => (
        <Circle
          key={index}
          cx={x(index)}
          cy={y(value)}
          r={4}
          stroke={'rgb(134, 65, 244)'}
          fill={'white'}
        />
      ));
    };

    const CustomGrid = ({x, y, linedata, ticks}) => (
      <G>
        {// Horizontal grid
        ticks.map(tick => (
          <Line
            key={tick}
            x1={'0%'}
            x2={'100%'}
            y1={y(tick)}
            y2={y(tick)}
            stroke={'rgba(0,0,0,0.2)'}
          />
        ))}
        {// Vertical grid
        linedata.map((_, index) => (
          <Line
            key={index}
            y1={'0%'}
            y2={'100%'}
            x1={x(index)}
            x2={x(index)}
            stroke={'rgba(0,0,0,0.2)'}
          />
        ))}
      </G>
    );

    const Line = ({line}) => <Path d={line} stroke={'red'} fill={'none'} />;
    const colors = [
      'rgb(255, 255, 255,0.8)',
      'rgb(231, 242, 244,0.8)',
      'rgb(215, 238, 242,0.8)',
      'rgb(198, 233, 240,0.8)',
      'rgb(215, 238, 242,0.8)',
      'rgb(231, 242, 244,0.8)',
      'rgb(241, 251, 253,0.8)',
    ];
    const keys = graphKeys;
    return (
      <>
        <View style={styles.container}>
          <StackedAreaChart
            style={styles.graph1}
            contentInset={{top: 10, bottom: 10}}
            data={this.state.headFemaleFilteredArray}
            keys={keys}
            colors={colors}
            curve={shape.curveNatural}
            showGrid={false}>
            <Grid />
          </StackedAreaChart>
          <YAxis
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: 400,
            }}
            data={StackedAreaChart.extractDataPoints(
              this.state.headFemaleFilteredArray,
              keys,
            )}
            contentInset={{top: 10, bottom: 10}}
            svg={{
              fontSize: 8,
              stroke: '#959BA2',
              // marginHorizontal:-10
            }}
          />
          <LineChart
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: 400,
              width: 380,
              zIndex: -1,
              opacity: 0.4,
            }}
            // numberOfTicks={100}
            // gridMin={ 50 }
            contentInset={{top: 10, bottom: 10}}
            data={linedata}
            svg={{
              stroke: '#7958C7',
              strokeWidth: 2,
              fontWeight: 'bold',
            }}>
            <Decorator />
            {/* <Grid /> */}
          </LineChart>
          <XAxis
            data={linedata}
            formatLabel={(value, index) => index + 1}
            style={{
              height: 440,
              right: 0,
              left: 0,
              bottom: 0,
              position: 'absolute',
              width:380,
            }}
            svg={{
              fontSize: 12,
              stroke: '#959BA2',
            }}
          />
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 8,
  },
  graph1: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 400,
    width: 390,
    flex: 1,
    // paddingVertical: 16,
  },
  graph2: {
    position: 'absolute',
    top: 0,
    left: 0,
    flex: 1,
    height: 400,
    width: 400,
  },
});

export default App;
