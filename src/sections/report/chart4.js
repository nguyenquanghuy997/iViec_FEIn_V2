import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useEffect } from "react";

export default function Chart({ data, total, id }) {
  useEffect(() => {
    var root = am5.Root.new(id || "chartdiv");

    root.setThemes([am5themes_Animated.new(root)]);

    var chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        innerRadius: 90,
        layout: root.verticalLayout,
      })
    );

    var series = chart.series.push(
      am5percent.PieSeries.new(root, {
        valueField: "size",
        categoryField: "sector",
        alignLabels: true,
      })
    );
    series
      .get("colors")
      .set("colors", [
        am5.color(0x2892de),
        am5.color(0x01b6a7),
        am5.color(0x0077b5),
        am5.color(0xc9d9e0),
      ]);
    series.slices.template.set("toggleKey", "none");
    series.data.setAll(data);

    series.appear(1000, 100);

    var label = root.tooltipContainer.children.push(
      am5.Label.new(root, {
        x: am5.p50,
        y: am5.percent(45),
        centerX: am5.p50,
        centerY: am5.p50,
        fill: am5.color(0x6d6f81),
        fontSize: 14,
        fontWeight: 700,
      })
    );
    var label1 = root.tooltipContainer.children.push(
      am5.Label.new(root, {
        x: am5.p50,
        y: am5.percent(52),
        centerX: am5.p50,
        centerY: am5.p50,
        fill: am5.color(0x6d6f81),
        fontSize: 32,
        fontWeight: 700,
      })
    );

    label1.set("text", total);
    label.set("text", "Tổng tin tuyển dụng");

    for (var i = 0; i < data.length; i++) {
      series.data.setIndex(i, data[i]);
    }

    return () => {
      root.dispose();
    };
  }, [JSON.stringify(data)]);

  return <div id={id || "chartdiv"} style={{ height: 350 }} />;
}
