import * as d3 from 'd3';
import { FC, useEffect, useMemo, useRef } from 'react';

import moment from 'moment';
import { END_RANDOM, START_RANDOM } from '../../../config';
import { ChartDataType } from '../Chart.interface';
import LineItem from '../LineItem';
import { MARGIN } from './LineChart.config';
import { LineChartProps } from './LineChart.interface';

const LineChart: FC<LineChartProps> = ({ width, height, data, start, end, isWin }) => {
  const yAxesRef = useRef(null);
  const xAxesRef = useRef(null);
  const boundsWidth = width - MARGIN.right;
  const boundsHeight = height - MARGIN.top * 2;

  const yScale = useMemo(() => {
    return d3.scaleLinear().domain([START_RANDOM, END_RANDOM]).range([boundsHeight, 0]);
  }, [height]);

  const xScale = useMemo(() => {
    const date = moment(Date.now());

    return d3
      .scaleLinear()
      .domain([date.unix(), date.add(19, 'second').unix()])
      .range([0, boundsWidth]);
  }, [data, width]);

  // Render the X axis using d3.js, not react
  useEffect(() => {
    const xSvgElement = d3.select(xAxesRef.current);
    xSvgElement.selectAll('*').remove();

    const xAxisGenerator = d3
      .axisTop(xScale)
      .tickSize(0)
      .tickFormat((d) => moment.unix(d.valueOf()).format('ss'));

    xSvgElement.append('g').call(xAxisGenerator);
  }, [xScale]);

  // Render the Y axis using d3.js, not react
  useEffect(() => {
    const ySvgElement = d3.select(yAxesRef.current);
    ySvgElement.selectAll('*').remove();

    const yAxisGenerator = d3
      .axisLeft(yScale)
      .ticks(5)
      .tickSize(0)
      .tickFormat((d) => d.toString());

    ySvgElement.append('g').call(yAxisGenerator);
  }, []);

  const lineBuilder = d3
    .line<ChartDataType>()
    .curve(d3.curveCardinal)
    .x((d) => xScale(d.date))
    .y((d) => yScale(d.count));

  const areaBuilder = d3
    .area<ChartDataType>()
    .curve(d3.curveCardinal)
    .x((d) => xScale(d.date))
    .y1((d) => yScale(d.count))
    .y0(yScale(START_RANDOM - 10));

  const linePath = lineBuilder(data);
  const areaPath = areaBuilder(data);

  const supportLinePath = lineBuilder(data.map((d) => ({ count: start, date: d.date })));
  const supportLinePathIsWin = lineBuilder(
    data.map((d) => ({ count: end, date: d.date })),
  );

  if (!linePath || !supportLinePath || !supportLinePathIsWin || !areaPath) {
    return null;
  }

  const colorIsWin = useMemo(() => {
    if (isWin === false) {
      return 'from-red/20';
    }

    if (isWin === true) {
      return 'from-green/20';
    }

    return '';
  }, [isWin]);

  return (
    <div>
      <svg width={width} height={height} className={`bg-gradient-to-b ${colorIsWin}`}>
        <defs>
          <linearGradient id='gradient' x1='0' x2='0' y1='0' y2='1'>
            <stop offset='0%' stopColor='#1d83ccca' />
            <stop offset='80%' stopColor='#1C1C1D' />
          </linearGradient>
        </defs>
        {/* first group is lines */}
        <g
          width={boundsWidth}
          height={boundsHeight}
          transform={`translate(${[0, MARGIN.top].join(',')})`}
        >
          <LineItem fill='url(#gradient)' path={areaPath} color={'transparent'} />
        </g>
        <g
          width={boundsWidth}
          height={boundsHeight}
          transform={`translate(${[0, MARGIN.top].join(',')})`}
        >
          <LineItem path={linePath} color={'#289BF6'} />
        </g>
        {/* Second is for the axes */}
        <g
          width={boundsWidth}
          height={boundsHeight}
          ref={yAxesRef}
          transform={`translate(${[width, MARGIN.top].join(',')})`}
        />
        <g
          width={boundsWidth}
          height={boundsHeight}
          ref={xAxesRef}
          transform={`translate(${[0, height].join(',')})`}
        />
        {/* support line start */}
        <g
          width={boundsWidth}
          height={boundsHeight}
          transform={`translate(${[0, MARGIN.top].join(',')})`}
        >
          <LineItem path={supportLinePath} color={'#8A8A8A'} />
        </g>
        {/* support line is win */}
        <g
          width={boundsWidth}
          height={boundsHeight}
          transform={`translate(${[0, MARGIN.top].join(',')})`}
        >
          <LineItem path={supportLinePathIsWin} color={isWin ? '#6CFB72' : '#FB6C6C'} />
        </g>
      </svg>
    </div>
  );
};

export default LineChart;
