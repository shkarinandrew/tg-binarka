import {
  ColorType,
  createChart,
  CreatePriceLineOptions,
  ISeriesApi,
  Time,
  UTCTimestamp,
} from 'lightweight-charts';
import moment from 'moment';
import { FC, memo, useEffect, useMemo, useRef } from 'react';

import { useCount, useDimensions, useGame } from '../../hooks';
import { generateTradingviewChartDataItem } from '../../utils/generateTradingviewChartDataItem';
import { DEFAULT_OPTIONS_LINE } from './TradingviewChart.config';

const { VITE_TIME_SECOND } = import.meta.env;

const TradingviewChart: FC = () => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const seriesRef = useRef<ISeriesApi<'Candlestick', Time> | null>(null);

  const { width } = useDimensions(chartContainerRef);
  const { updateCount } = useCount();
  const { start, end } = useGame();

  const height = useMemo(() => Math.round((window.innerHeight / 100) * 40), []);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // Create chart instance
    const chartInstance = createChart(chartContainerRef.current, {
      width: width,
      height: height,
      layout: {
        background: {
          type: ColorType.Solid,
          color: '#000',
        },
        textColor: '#e5e5e5',
      },
      grid: {
        vertLines: {
          color: '#8b8a8a',
        },
        horzLines: {
          color: '#8b8a8a',
        },
      },
    });

    // Add candlestick series
    const candleSeries = chartInstance.addCandlestickSeries({
      upColor: '#18d234',
      downColor: '#f44336',
      borderDownColor: '#f44336',
      borderUpColor: '#18d234ba',
      wickUpColor: 'transparent',
      wickDownColor: 'transparent',
    });
    seriesRef.current = candleSeries;

    candleSeries.setData([
      generateTradingviewChartDataItem(moment().unix() as UTCTimestamp),
    ]);

    // Add time scale
    const timeScale = chartInstance.timeScale();
    timeScale.applyOptions({
      timeVisible: true,
      secondsVisible: true,
    });

    // Update data in 1000ms
    const interval = setInterval(() => {
      const time = moment().unix() as UTCTimestamp;
      const lastData = candleSeries.data()[candleSeries.data().length - 1];

      if ('close' in lastData) {
        const data = generateTradingviewChartDataItem(time, lastData.close);
        updateCount(data.close);
        candleSeries.update(data);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!seriesRef.current) return;

    // Create start price line
    if (start && !end) {
      const startPriceLine: CreatePriceLineOptions = {
        ...DEFAULT_OPTIONS_LINE,
        price: start,
        color: '#8A8A8A',
        title: 'Start',
      };

      const priceLine = seriesRef.current.createPriceLine(startPriceLine);

      // Remove start price line
      setTimeout(() => {
        seriesRef.current?.removePriceLine(priceLine);
      }, VITE_TIME_SECOND * 1000 + 3000);
    }

    // Create end price line
    if (end) {
      const endPriceLine: CreatePriceLineOptions = {
        ...DEFAULT_OPTIONS_LINE,
        price: end,
        color: '#3d5cf7',
        title: 'End',
      };

      const priceLine = seriesRef.current.createPriceLine(endPriceLine);

      // Remove end price line
      setTimeout(() => {
        seriesRef.current?.removePriceLine(priceLine);
      }, 2000);
    }
  }, [end, start]);

  return <div ref={chartContainerRef} />;
};

export default memo(TradingviewChart);
