import { useState, useEffect } from 'react';
import { useRef } from 'react';
import * as Highcharts from 'highcharts';
import { HighchartsReact } from 'highcharts-react-official';
import PieChart from 'highcharts-react-official';

function Pie(props: any) {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  const [options, setOptions] = useState({
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Films',
    },
    tooltip: {
      valueSuffix: '%',
    },
    series: [
      {
        name: 'Percentage',
        colorByPoint: true,
        data: [{}],
      },
    ],
  });

  const updateOptions = (data: Array<object>) => {
    setOptions({
      ...options,
      series: [
        {
          ...options.series[0],
          data,
        },
      ],
    });
  };

  useEffect(() => {
    updateOptions(props.data);
    // console.log(props.data, 'props.data');
  }, [props.data]);

  return (
    <>
      <PieChart highcharts={Highcharts} options={options} ref={chartComponentRef} {...props} />
    </>
  );
}

export default Pie;
