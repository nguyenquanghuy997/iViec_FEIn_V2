import * as am5 from "@amcharts/amcharts5";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5xy from "@amcharts/amcharts5/xy";
import { useEffect } from "react";

export default function Chart({ id, data }) {
  useEffect(() => {
    var root = am5.Root.new(id || "chartdiv");

    root.setThemes([am5themes_Animated.new(root)]);

    var chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "panX",
        wheelY: "zoomX",
        layout: root.verticalLayout,
      })
    );

    var yRenderer = am5xy.AxisRendererY.new(root, {
      inversed: true,
      cellStartLocation: 0.1,
      cellEndLocation: 0.9,
      strokeOpacity: 0.1,
    });
    yRenderer.grid.template.set("forceHidden", true);

    var yAxis = chart.yAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "title",
        renderer: yRenderer,
      })
    );

    yAxis.data.setAll(data);

    var xRenderer = am5xy.AxisRendererX.new(root, {
      strokeOpacity: 0.1,
    });
    xRenderer.grid.template.set("forceHidden", true);

    var xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: xRenderer,
        min: 0,
      })
    );

    function createSeries(field, name) {
      var series = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name: name,
          xAxis: xAxis,
          yAxis: yAxis,
          valueXField: field,
          categoryYField: "title",
          sequencedInterpolation: true,
          tooltip: am5.Tooltip.new(root, {
            pointerOrientation: "vertical",
            labelText: "[Bold]{categoryY}[/]\n{valueX} ứng viên",
          }),
        })
      );

      series.columns.template.setAll({
        height: 37,
      });

      series.columns.template.adapters.add("fill", function (fill, target) {
        switch (target.dataItem.dataContext.title) {
          case "Cần tuyển":
            return am5.color(0x01b6a7);
          case "Ứng viên":
            return am5.color(0x01b6a7);
          case "Đã tuyển":
            return am5.color(0x2892de);
          case "Bị loại":
            return am5.color(0x6d6f81);
          default:
            return am5.color(0x6d6f81);
        }
      });

      series.columns.template.adapters.add("stroke", function (fill, target) {
        switch (target.dataItem.dataContext.title) {
          case "Cần tuyển":
            return am5.color(0x01b6a7);
          case "Ứng viên":
            return am5.color(0x01b6a7);
          case "Đã tuyển":
            return am5.color(0x2892de);
          case "Bị loại":
            return am5.color(0x6d6f81);
          default:
            return am5.color(0x6d6f81);
        }
      });

      series.bullets.push(function () {
        return am5.Bullet.new(root, {
          locationX: 1,
          locationY: 0.5,
          sprite: am5.Label.new(root, {
            centerY: am5.p50,
            text: "{valueX}",
            populateText: true,
          }),
        });
      });

      series.data.setAll(data);
      series.appear();

      return series;
    }

    createSeries("value", "Số lượng ứng viên");

    var cursor = chart.set(
      "cursor",
      am5xy.XYCursor.new(root, {
        behavior: "zoomY",
      })
    );
    cursor.lineY.set("forceHidden", true);
    cursor.lineX.set("forceHidden", true);

    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, [JSON.stringify(data)]);

  return <div id={id || "chartdiv"} style={{ height: 350 }} />;
}
