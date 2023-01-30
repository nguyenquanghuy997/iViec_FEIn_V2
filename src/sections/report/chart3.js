import * as am5 from "@amcharts/amcharts5";
import * as am5locales_vi_VN from "@amcharts/amcharts5/locales/vi_VN";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5xy from "@amcharts/amcharts5/xy";
import moment from "moment";
import { useEffect } from "react";

export default function Chart({ data, id }) {
  useEffect(() => {
    var root = am5.Root.new(id || "chartdiv");

    root.locale = am5locales_vi_VN;

    root.setThemes([am5themes_Animated.new(root)]);

    var chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX: true,
      })
    );

    var cursor = chart.set(
      "cursor",
      am5xy.XYCursor.new(root, {
        behavior: "none",
      })
    );
    cursor.lineY.set("visible", false);

    var xRenderer = am5xy.AxisRendererX.new(root, { pan: "zoom" });
    xRenderer.grid.template.set("forceHidden", true);

    var xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        maxDeviation: 0.5,
        baseInterval: {
          timeUnit: "day",
          count: 1,
        },
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    var yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 1,
        renderer: am5xy.AxisRendererY.new(root, {
          pan: "zoom",
        }),
      })
    );
    var tooltip = am5.Tooltip.new(root, {
      getFillFromSprite: false,
      labelText: "{valueY}",
    });

    tooltip.get("background").setAll({
      fill: am5.color(0x01b6a7),
      fillOpacity: 0.8,
    });

    var series = chart.series.push(
      am5xy.SmoothedXLineSeries.new(root, {
        name: "Series",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "Value",
        valueXField: "Date",
        tooltip: tooltip,
        stroke: am5.color(0x01b6a7),
      })
    );

    series.fills.template.set(
      "fillGradient",
      am5.LinearGradient.new(root, {
        stops: [
          {
            opacity: 1,
            color: am5.color(0x01b6a7),
          },
          {
            opacity: 0.8,
            color: am5.color(0xffffff),
          },
        ],
      })
    );

    series.fills.template.setAll({
      visible: true,
      fillOpacity: 1,
    });

    series.data.setAll(
      Array.isArray(data)
        ? [...data].map((i) => ({ ...i, Date: moment(i.Date).valueOf() }))
        : []
    );

    series.appear(1000);
    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, [JSON.stringify(data)]);

  return <div id={id || "chartdiv"} style={{ height: 350 }} />;
}
