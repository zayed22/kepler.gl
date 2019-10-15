// Copyright (c) 2019 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import test from 'tape';
import sinon from 'sinon';

import {
  testCreateCases,
  testFormatLayerDataCases,
  testRenderLayerCases,
  preparedDataset,
  dataId,
  testRows,
  pointLayerMeta
} from 'test/helpers/layer-utils';

import HexagonLayer from 'layers/hexagon-layer/hexagon-layer';

const columns = {
  lat: 'lat',
  lng: 'lng'
};

test('#HexagonLayer -> constructor', t => {
  const TEST_CASES = {
    CREATE: [
      {
        props: {
          dataId: 'blue',
          isVisible: true,
          label: 'test hexagon layer'
        },
        test: layer => {
          t.ok(
            layer.config.dataId === 'blue',
            'HexagonLayer dataId should be correct'
          );
          t.ok(layer.type === 'hexagon', 'type should be hexagon');
          t.ok(layer.isAggregated === true, 'HexagonLayer is aggregated');
          t.ok(
            layer.config.label === 'test hexagon layer',
            'label should be correct'
          );
          t.ok(
            Object.keys(layer.columnPairs).length,
            'should have columnPairs'
          );
        }
      }
    ]
  };

  testCreateCases(t, HexagonLayer, TEST_CASES.CREATE);
  t.end();
});

test('#HexagonLayer -> formatLayerData', t => {
  const filteredIndex = [0, 1, 2, 4, 5, 7];

  const TEST_CASES = [
    {
      name: 'hexagon layer gps point.1',
      layer: {
        type: 'hexagon',
        id: 'test_layer_1',
        config: {
          dataId,
          label: 'some geometry file',
          columns,
          color: [1, 2, 3]
        }
      },
      datasets: {
        [dataId]: {
          ...preparedDataset,
          filteredIndex
        }
      },
      assert: result => {
        const {layerData, layer} = result;
        const expectedLayerData = {
          data: [0, 1, 4, 5, 7].map(index => ({
            data: testRows[index],
            index
          })),
          getColorValue: () => {},
          getElevationValue: () => {},
          getPosition: () => {}
        };

        t.deepEqual(
          Object.keys(layerData).sort(),
          Object.keys(expectedLayerData).sort(),
          'layerData should have 4 keys'
        );
        t.deepEqual(
          layerData.data,
          expectedLayerData.data,
          'should format correct hexagon layerData'
        );
        // test getPosition
        t.deepEqual(
          layerData.getPosition(layerData.data[0]),
          [testRows[0][2], testRows[0][1]],
          'getPosition should return correct position'
        );
        // test getColorValue  [1474071095000, 1474071608000]
        // 0: Null - 0
        // 1: 2016-09-17 00:10:56 1474071056000 - 0
        // 4: 2016-09-17 00:14:00 1474071240000 - 1
        // 5: 2016-09-17 00:15:01 1474071301000 - 1
        // 7: 2016-09-17 00:17:05 1474071425000 - 1
        t.equal(
          // assume all points fall into one bin
          layerData.getColorValue(expectedLayerData.data),
          3,
          'should return filtered point count'
        );
        t.equal(
          // assume all points fall into one bin
          layerData.getElevationValue(expectedLayerData.data),
          3,
          'should return filtered point count'
        );
        // test layer.meta
        t.deepEqual(
          layer.meta,
          pointLayerMeta,
          'should format correct grid layer meta'
        );
      }
    },
    {
      name: 'Hexagon layer gps point.2',
      layer: {
        type: 'hexagon',
        id: 'test_layer_2',
        config: {
          dataId,
          label: 'some geometry file',
          columns,
          color: [1, 2, 3],
          // color by types(string)
          colorField: {
            type: 'string',
            name: 'types'
          },
          // size by id(integer)
          sizeField: {
            type: 'real',
            name: 'trip_distance'
          }
        }
      },
      datasets: {
        [dataId]: {
          ...preparedDataset,
          filteredIndex
        }
      },
      assert: result => {
        const {layerData} = result;
        const expectedLayerData = {
          data: [0, 1, 4, 5, 7].map(index => ({
            data: testRows[index],
            index
          })),
          getColorValue: () => {},
          getElevationValue: () => {},
          getPosition: () => {}
        };

        t.deepEqual(
          Object.keys(layerData).sort(),
          Object.keys(expectedLayerData).sort(),
          'layerData should have 4 keys'
        );
        // test getColorValue aggregate by mode
        // 0: driver_analytics_0 - 0
        // 1: null  - 0
        // 4: driver_analytics - 1
        // 5: driver_analytics - 1
        // 7: driver_analytics - 1
        t.equal(
          // assume all points fall into one bin
          layerData.getColorValue(expectedLayerData.data),
          'driver_analytics',
          'should return filtered mode of (types)'
        );
        // test getColorValue aggregate by avg
        // 0: 1.59 - 0
        // 1: 2.38  - 0
        // 4: 2.37 - 1
        // 5: 7.13 - 1
        // 7: 11 - 1
        t.equal(
          // assume all points fall into one bin
          layerData.getElevationValue(expectedLayerData.data),
          (2.37 + 7.13 + 11) / 3,
          'should return filtered avg trip_distance'
        );
      }
    }
  ];

  testFormatLayerDataCases(t, HexagonLayer, TEST_CASES);
  t.end();
});

test.only('#HexagonLayer -> renderLayer', t => {
  const filteredIndex = [0, 1, 2, 4, 5, 7];
  const spyLayerCallbacks = sinon.spy();

  const TEST_CASES = [
    {
      name: 'Hexagon gps point.1',
      layer: {
        type: 'hexagon',
        id: 'test_layer_1',
        config: {
          dataId,
          label: 'some geometry file',
          columns,
          color: [1, 2, 3],
          visConfig: {
            worldUnitSize: 1,
            colorRange: {
              colors: ['#080808', '#090909', '#070707']
            }
          }
        }
      },
      datasets: {
        [dataId]: {
          ...preparedDataset,
          filteredIndex
        }
      },
      renderArgs: {
        layerCallbacks: {
          onSetLayerDomain: spyLayerCallbacks
        }
      },
      assert: (deckLayers, layer) => {
        t.equal(deckLayers.length, 3, 'Should create 1 deck.gl layer');
        const deckHexLayer = deckLayers[0];
        const {props, state} = deckHexLayer;
        console.log(state.aggregatorState.layerData.data)
        t.deepEqual(
          deckLayers.map(l => l.id),
          ['test_layer_1', 'test_layer_1-hexagon-cell'],
          'Should create 2 deck.gl layers'
        );

        const expectedProps = {
          coverage: layer.config.visConfig.coverage,
          radius: layer.config.visConfig.worldUnitSize * 1000,
          colorRange: [[8, 8, 8], [9, 9, 9], [7, 7, 7]],
          colorScale: layer.config.colorScale,
          sizeScale: layer.config.sizeScale,
          upperPercentile: layer.config.visConfig.percentile[1],
          lowerPercentile: layer.config.visConfig.percentile[0]
        };

        Object.keys(expectedProps).forEach(key => {
          t.deepEqual(
            props[key],
            expectedProps[key],
            `should have correct props.${key}`
          );
        });

        t.deepEqual(
          spyLayerCallbacks.args[0][0],
          [0, 2],
          'should call onSetLayerDomain with correct domain'
        );
      }
    }
  ];

  testRenderLayerCases(t, HexagonLayer, TEST_CASES);
  t.end();
});
