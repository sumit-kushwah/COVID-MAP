import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4geodata_continentsLow from "@amcharts/amcharts4-geodata/continentsLow";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import am4themes_dark from "@amcharts/amcharts4/themes/dark";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_dark);
am4core.useTheme(am4themes_animated);
am4core.options.autoDispose = true;

export function globePlotter(el: HTMLElement, mapdata: any) {
  let chart = am4core.create(el, am4maps.MapChart);
  let interfaceColors = new am4core.InterfaceColorSet();

  try {
      chart.geodata = am4geodata_worldLow;
  }
  catch (e) {
      chart.raiseCriticalError(new Error("Map geodata could not be loaded. Please download the latest <a href=\"https://www.amcharts.com/download/download-v4/\">amcharts geodata</a> and extract its contents into the same directory as your amCharts files."));
  }


  // let label: any = chart.createChild(am4core.Label)
  // label.text = "12 months (3/7/2019 data) rolling measles\nincidence per 1'000'000 total population. \n Bullet size uses logarithmic scale.";
  // label.fontSize = 12;
  // label.align = "left";
  // label.valign = "bottom"
  // label.fill = am4core.color("#927459");
  // label.background = new am4core.RoundedRectangle()
  // label.background.cornerRadius(10,10,10,10);
  // label.padding(10,10,10,10);
  // label.marginLeft = 30;
  // label.marginBottom = 30;
  // label.background.strokeOpacity = 0.3;
  // label.background.stroke =am4core.color("#927459");
  // label.background.fill = am4core.color("#f9e3ce");
  // label.background.fillOpacity = 0.6;

  // let dataSource = chart.createChild(am4core.TextLink)
  // dataSource.text = "Data source: RapidApi";
  // dataSource.fontSize = 12;
  // dataSource.align = "left";
  // dataSource.valign = "top"
  // dataSource.url = "https://www.who.int/immunization/monitoring_surveillance/burden/vpd/surveillance_type/active/measles_monthlydata/en/"
  // dataSource.urlTarget = "_blank";
  // dataSource.fill = am4core.color("#927459");
  // dataSource.padding(10,10,10,10);
  // dataSource.marginLeft = 30;
  // dataSource.marginTop = 30;

  // Set projection
  chart.projection = new am4maps.projections.Orthographic();
  chart.panBehavior = "rotateLongLat";
  chart.padding(20,20,20,20);

  // Add zoom control
  chart.zoomControl = new am4maps.ZoomControl();

  let homeButton = new am4core.Button();
  homeButton.events.on("hit", function(){
    chart.goHome();
  });

  homeButton.icon = new am4core.Sprite();
  homeButton.padding(7, 5, 7, 5);
  homeButton.width = 30;
  homeButton.icon.path = "M16,8 L14,8 L14,16 L10,16 L10,10 L6,10 L6,16 L2,16 L2,8 L0,8 L8,0 L16,8 Z M16,8";
  homeButton.marginBottom = 10;
  homeButton.parent = chart.zoomControl;
  homeButton.insertBefore(chart.zoomControl.plusButton);

  chart.backgroundSeries.mapPolygons.template.polygon.fill = am4core.color("#bfa58d");
  chart.backgroundSeries.mapPolygons.template.polygon.fillOpacity = 1;
  chart.deltaLongitude = 20;
  chart.deltaLatitude = -20;

  // limits vertical rotation
  chart.adapter.add("deltaLatitude", function(delatLatitude: any){
      return am4core.math.fitToRange(delatLatitude, -90, 90);
  })

  // Create map polygon series

  let shadowPolygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
  shadowPolygonSeries.geodata = am4geodata_continentsLow;

  try {
      shadowPolygonSeries.geodata = am4geodata_continentsLow;
  }
  catch (e) {
      shadowPolygonSeries.raiseCriticalError(new Error("Map geodata could not be loaded. Please download the latest <a href=\"https://www.amcharts.com/download/download-v4/\">amcharts geodata</a> and extract its contents into the same directory as your amCharts files."));
  }

  shadowPolygonSeries.useGeodata = true;
  shadowPolygonSeries.dx = 2;
  shadowPolygonSeries.dy = 2;
  shadowPolygonSeries.mapPolygons.template.fill = am4core.color("#000");
  shadowPolygonSeries.mapPolygons.template.fillOpacity = 0.2;
  shadowPolygonSeries.mapPolygons.template.strokeOpacity = 0;
  shadowPolygonSeries.fillOpacity = 0.1;
  shadowPolygonSeries.fill = am4core.color("#000");


  // Create map polygon series
  let polygonSeries: any = chart.series.push(new am4maps.MapPolygonSeries());
  polygonSeries.useGeodata = true;

  polygonSeries.calculateVisualCenter = true;
  polygonSeries.tooltip.background.fillOpacity = 0.2;
  polygonSeries.tooltip.background.cornerRadius = 20;

  let template = polygonSeries.mapPolygons.template;
  template.nonScalingStroke = true;
  template.fill = am4core.color("#f9e3ce");
  template.stroke = am4core.color("#e2c9b0");

  polygonSeries.calculateVisualCenter = true;
  template.propertyFields.id = "id";
  template.tooltipPosition = "fixed";
  template.fillOpacity = 1;

  template.events.on("over", function (event: any) {
    if (event.target.dummyData) {
      event.target.dummyData.isHover = true;
    }
  })
  template.events.on("out", function (event: any) {
    if (event.target.dummyData) {
      event.target.dummyData.isHover = false;
    }
  })

  let hs = polygonSeries.mapPolygons.template.states.create("hover");
  hs.properties.fillOpacity = 1;
  hs.properties.fill = am4core.color("#deb7ad");


  let graticuleSeries = chart.series.push(new am4maps.GraticuleSeries());
  graticuleSeries.mapLines.template.stroke = am4core.color("#fff");
  graticuleSeries.fitExtent = false;
  graticuleSeries.mapLines.template.strokeOpacity = 0.2;
  graticuleSeries.mapLines.template.stroke = am4core.color("#fff");


  let measelsSeries: any= chart.series.push(new am4maps.MapPolygonSeries())
  measelsSeries.tooltip.background.fillOpacity = 0;
  measelsSeries.tooltip.background.cornerRadius = 20;
  measelsSeries.tooltip.autoTextColor = false;
  measelsSeries.tooltip.label.fill = am4core.color("#000");
  measelsSeries.tooltip.dy = -5;

  let measelTemplate = measelsSeries.mapPolygons.template;
  measelTemplate.fill = am4core.color("#bf7569");
  measelTemplate.strokeOpacity = 0;
  measelTemplate.fillOpacity = 0.75;
  measelTemplate.tooltipPosition = "fixed";



  let hs2 = measelsSeries.mapPolygons.template.states.create("hover");
  hs2.properties.fillOpacity = 1;
  hs2.properties.fill = am4core.color("#86240c");

  polygonSeries.events.on("inited", function () {
    polygonSeries.mapPolygons.each(function (mapPolygon: any) {
      let count = data[mapPolygon.id];

      if (count > 0) {
        let polygon = measelsSeries.mapPolygons.create();
        polygon.multiPolygon = am4maps.getCircle(mapPolygon.visualLongitude, mapPolygon.visualLatitude, Math.max(0.2, Math.log(count) * Math.LN10 / 10));
        polygon.tooltipText = mapPolygon.dataItem.dataContext.name + ": " + count;
        mapPolygon.dummyData = polygon;
        polygon.events.on("over", function () {
          mapPolygon.isHover = true;
        })
        polygon.events.on("out", function () {
          mapPolygon.isHover = false;
        })
      }
      else {
        mapPolygon.tooltipText = mapPolygon.dataItem.dataContext.name + ": no data";
        mapPolygon.fillOpacity = 0.9;
      }

    })
  })


  let data: any = mapdata;
  return chart;
}

let continents = {
  "AF": 0,
  "AN": 1,
  "AS": 2,
  "EU": 3,
  "NA": 4,
  "OC": 5,
  "SA": 6
}

export function flatMapPlotter(el: HTMLElement, data: { id: string, value: number }[]) {
  let chart = am4core.create(el, am4maps.MapChart);
  chart.projection = new am4maps.projections.Miller();

  // Create map polygon series for world map
  let worldSeries = chart.series.push(new am4maps.MapPolygonSeries());
  worldSeries.useGeodata = true;
  worldSeries.geodata = am4geodata_worldLow;
  worldSeries.exclude = ["AQ"];

  worldSeries.heatRules.push({
    property: "fill",
    target: worldSeries.mapPolygons.template,
    min: chart.colors.getIndex(1).brighten(1),
    max: chart.colors.getIndex(1).brighten(-0.3),
  });

  let worldPolygon = worldSeries.mapPolygons.template;
  worldPolygon.tooltipText = "{name}: {value}";
  worldPolygon.nonScalingStroke = true;
  worldPolygon.strokeOpacity = 0.5;
  worldPolygon.fill = am4core.color("#eee");
  worldPolygon.propertyFields.fill = "color";

  let hs = worldPolygon.states.create("hover");
  hs.properties.fill = am4core.color("#3c5bdc");

  worldSeries.data = data;

  // Zoom control
  chart.zoomControl = new am4maps.ZoomControl();

  let homeButton = new am4core.Button();
  homeButton.events.on("hit", function() {
    worldSeries.show();
    chart.goHome();
  });

  homeButton.icon = new am4core.Sprite();
  homeButton.padding(7, 5, 7, 5);
  homeButton.width = 30;
  homeButton.icon.path = "M16,8 L14,8 L14,16 L10,16 L10,10 L6,10 L6,16 L2,16 L2,8 L0,8 L8,0 L16,8 Z M16,8";
  homeButton.marginBottom = 10;
  homeButton.parent = chart.zoomControl;
  homeButton.insertBefore(chart.zoomControl.plusButton);

  return chart;
}

export function barPlotter(el: HTMLElement, data: any) {
  let chart = am4core.create(el, am4charts.XYChart);
  chart.scrollbarX = new am4core.Scrollbar();

  // Add data
  console.log(data)
  data = data.sort((a:any, b:any) => { if ((a.value) > (b.value)) return -1; return 1 }).slice(0, 20);
  console.log(data);

  chart.data = data;

  // Create axes
  let categoryAxis: any= chart.xAxes.push(new am4charts.CategoryAxis());
  categoryAxis.dataFields.category = "country";
  categoryAxis.renderer.grid.template.location = 0;
  categoryAxis.renderer.minGridDistance = 30;
  categoryAxis.renderer.labels.template.horizontalCenter = "right";
  categoryAxis.renderer.labels.template.verticalCenter = "middle";
  categoryAxis.renderer.labels.template.rotation = 270;
  categoryAxis.tooltip.disabled = true;
  categoryAxis.renderer.minHeight = 110;

  let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
  valueAxis.renderer.minWidth = 50;

  // Create series
  let series:any = chart.series.push(new am4charts.ColumnSeries());
  series.sequencedInterpolation = true;
  series.dataFields.valueY = "value";
  series.dataFields.categoryX = "country";
  series.tooltipText = "[{categoryX}: bold]{valueY}[/]";
  series.columns.template.strokeWidth = 0;

  series.tooltip.pointerOrientation = "vertical";

  series.columns.template.column.cornerRadiusTopLeft = 10;
  series.columns.template.column.cornerRadiusTopRight = 10;
  series.columns.template.column.fillOpacity = 0.8;

  // on hover, make corner radiuses bigger
  let hoverState = series.columns.template.column.states.create("hover");
  hoverState.properties.cornerRadiusTopLeft = 0;
  hoverState.properties.cornerRadiusTopRight = 0;
  hoverState.properties.fillOpacity = 1;

  series.columns.template.adapter.add("fill", function(fill:any, target:any) {
    return chart.colors.getIndex(target.dataItem.index);
  });

  // Cursor
  chart.cursor = new am4charts.XYCursor();
  return chart;
}

export function neglectComma(value:any) {
  if (value == "N/A") {
    return 0;
  } else {
    return +value.replace(/,/g,'');
  }
}
