import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useEffect } from "react";

export default function Chart({ data, id }) {
  useEffect(() => {
    var root = am5.Root.new(id || "chartdiv");

    root.setThemes([am5themes_Animated.new(root)]);

    var chart = root.container.children.push(
      am5percent.SlicedChart.new(root, {
        layout: root.verticalLayout,
      })
    );

    var series = chart.series.push(
      am5percent.FunnelSeries.new(root, {
        alignLabels: false,
        orientation: "horizontal",
        valueField: "value",
        categoryField: "category",
        legendLabelText: "{category}",
        legendValueText: "",
        bottomRatio: 1,
        paddingTop: 50,
        paddingBottom: 50,
      })
    );

    series
      .get("colors")
      .set("colors", [
        am5.color(0xcceae8),
        am5.color(0x99d5d0),
        am5.color(0x66c1b9),
        am5.color(0x33aca1),
        am5.color(0x00978a),
        am5.color(0x007168),
      ]);

    series.links.template.setAll({
      width: 0,
    });

    series.ticks.template.set("forceHidden", true);
    series.labels.template.setAll({
      fontSize: 25,
      fill: am5.color(0xffffff),
      text: "{value2}",
    });
    series.slices.template.set("tooltipText", "{category}: [bold]{value2}[/]");

    series.data.setAll(data);

    series.appear();

    var legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.p50,
        x: am5.p50,
        marginTop: 15,
        marginBottom: 15,
      })
    );
    legend.data.setAll(series.dataItems);

    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, [JSON.stringify(data)]);

  return <div id={id || "chartdiv"} style={{ height: 350 }} />;
}
