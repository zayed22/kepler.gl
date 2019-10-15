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

import {KeplerGlLayers} from 'layers';
const {H3Layer} = KeplerGlLayers;
import {DEFAULT_COLOR_UI} from 'layers/layer-factory';

export default `hex_id,value
89283082c2fffff,64
8928308288fffff,73
89283082c07ffff,65
89283082817ffff,74
89283082c3bffff,66
89283082883ffff,76
89283082c33ffff,43
89283082c23ffff,40
89283082887ffff,36
89283082ca7ffff,27
89283082cb3ffff,32
89283082c0bffff,26
89283082ca3ffff,19
89283082dcfffff,18
89283082d8fffff,1
89283095347ffff,3
89283095363ffff,2
8928309537bffff,4
89283082d93ffff,6
89283082d73ffff,1
8928309530bffff,1
8928309532bffff,1`;

export const dataId = 'h3-hex-id';

export const hexIdDataConfig = {
  dataId,
  config: {
    version: 'v1',
    config: {
      visState: {
        filters: [
          {
            dataId,
            id: 'byjasfp0u',
            name: 'value',
            type: 'range',
            value: [11.2, 28],
            enlarged: false,
            plotType: 'histogram',
            yAxis: null
          }
        ],
        layers: [
          {
            id: 'avlgol',
            type: 'hexagonId',
            config: {
              dataId,
              label: 'H3 Hexagon',
              color: [241, 92, 23],
              columns: {
                hex_id: 'hex_id'
              },
              isVisible: true,
              visConfig: {
                opacity: 0.8,
                colorRange: {
                  name: 'Global Warming',
                  type: 'sequential',
                  category: 'Uber',
                  colors: [
                    '#5A1846',
                    '#900C3F',
                    '#C70039',
                    '#E3611C',
                    '#F1920E',
                    '#FFC300'
                  ]
                },
                coverage: 1,
                sizeRange: [0, 500],
                coverageRange: [0, 1],
                elevationScale: 5
              },
              textLabel: [
                {
                  field: null,
                  color: [255, 255, 255],
                  size: 18,
                  offset: [0, 0],
                  anchor: 'start',
                  alignment: 'center'
                }
              ]
            },
            visualChannels: {
              colorField: {
                name: 'value',
                type: 'integer'
              },
              colorScale: 'quantile',
              sizeField: null,
              sizeScale: 'linear',
              coverageField: null,
              coverageScale: 'linear'
            }
          }
        ],
        interactionConfig: {
          tooltip: {
            fieldsToShow: {
              [dataId]: ['hex_id', 'value']
            },
            enabled: true
          },
          brush: {
            size: 0.5,
            enabled: false
          }
        },
        layerBlending: 'normal',
        splitMaps: []
      },
      mapStyle: {
        styleType: 'dark',
        topLayerGroups: {},
        visibleLayerGroups: {
          label: true,
          road: true,
          border: false,
          building: true,
          water: true,
          land: true,
          '3d building': false
        },
        mapStyles: {}
      }
    }
  }
};

export const mergedH3Layer = new H3Layer({
  id: 'avlgol'
});

mergedH3Layer.config = {
  dataId,
  label: 'H3 Hexagon',
  color: [241, 92, 23],
  columns: {
    hex_id: {
      value: 'hex_id',
      fieldIdx: 0
    }
  },
  isVisible: true,
  highlightColor: [252, 242, 26, 255],
  isConfigActive: false,
  colorField: {
    name: 'value',
    format: '',
    tableFieldIndex: 2,
    type: 'integer',
    id: 'value'
  },
  colorScale: 'quantile',
  colorDomain: [18, 19, 26, 27],
  sizeField: null,
  sizeDomain: [0, 1],
  sizeScale: 'linear',
  coverageField: null,
  coverageScale: 'linear',
  coverageDomain: [0, 1],
  visConfig: {
    opacity: 0.8,
    colorRange: {
      name: 'Global Warming',
      type: 'sequential',
      category: 'Uber',
      colors: ['#5A1846', '#900C3F', '#C70039', '#E3611C', '#F1920E', '#FFC300']
    },
    coverage: 1,
    sizeRange: [0, 500],
    coverageRange: [0, 1],
    elevationScale: 5
  },
  textLabel: [
    {
      field: null,
      color: [255, 255, 255],
      size: 18,
      offset: [0, 0],
      anchor: 'start',
      alignment: 'center'
    }
  ],
  colorUI: {
    color: DEFAULT_COLOR_UI,
    colorRange: DEFAULT_COLOR_UI
  },
  animation: {
    enabled: false
  }
};

export const mergedFilters = [
  {
    dataId,
    id: 'value',
    name: 'value',
    type: 'range',
    value: [11.2, 28],
    enlarged: false,
    freeze: true,
    plotType: 'histogram',
    yAxis: null,
    isAnimating: false,
    fieldIdx: 1,
    domain: [1, 76],
    step: 0.1,
    interval: null,
    histogram: ['Not tested'],
    enlargedHistogram: ['Not tested'],
    speed: 1,
    fieldType: 'integer',
    typeOptions: ['range'],
    fixedDomain: false,
    gpu: true,
    gpuChannel: 0
  }
];

export const expectedMergedDataset = {
  id: 'h3-hex-id',
  label: 'new dataset',
  color: 'dont test me',
  allData: [
    ['89283082c2fffff', 64],
    ['8928308288fffff', 73],
    ['89283082c07ffff', 65],
    ['89283082817ffff', 74],
    ['89283082c3bffff', 66],
    ['89283082883ffff', 76],
    ['89283082c33ffff', 43],
    ['89283082c23ffff', 40],
    ['89283082887ffff', 36],
    ['89283082ca7ffff', 27],
    ['89283082cb3ffff', 32],
    ['89283082c0bffff', 26],
    ['89283082ca3ffff', 19],
    ['89283082dcfffff', 18],
    ['89283082d8fffff', 1],
    ['89283095347ffff', 3],
    ['89283095363ffff', 2],
    ['8928309537bffff', 4],
    ['89283082d93ffff', 6],
    ['89283082d73ffff', 1],
    ['8928309530bffff', 1],
    ['8928309532bffff', 1]
  ],
  allIndexes: new Array(22).fill(0).map((d, i) => i),
  filteredIndex: new Array(22).fill(0).map((d, i) => i),
  filteredIndexForDomain: [9, 11, 12, 13],
  fieldPairs: [],
  fields: [
    {
      name: 'hex_id',
      format: '',
      tableFieldIndex: 1,
      type: 'string',
      id: 'hex_id'
    },
    {
      name: 'value',
      format: '',
      tableFieldIndex: 2,
      type: 'integer',
      id: 'value'
    }
  ],
  gpuFilter: {
    filterRange: [[11.2, 28], [0, 0], [0, 0], [0, 0]],
    filterValueUpdateTriggers: {
      gpuFilter_0: 'value',
      gpuFilter_1: null,
      gpuFilter_2: null,
      gpuFilter_3: null
    },
    filterValueAccessor: {
      inputs: [
        {data: ['89283082c33ffff', 43], index: 6}
      ],
      result: [43, 0, 0, 0]
    }
  },
  filterRecord: {
    dynamicDomain: [mergedFilters[0]],
    fixedDomain: [],
    cpu: [],
    gpu: [mergedFilters[0]]
  }
};
