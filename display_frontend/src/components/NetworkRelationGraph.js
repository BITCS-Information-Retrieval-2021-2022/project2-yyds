import React from 'react';
import ReactECharts from 'echarts-for-react';

function NetworkRelationGraph (props) {
  const author = props.author;
  const coAuthors = author["coAuthors"].sort((a, b) => (b.copaperCount - a.copaperCount));
  const coAuthorsNum = coAuthors.length;
  const radiusOrigin = 100;
  const symbolSizeOrigin = 40;
  // coAuthor:
  // {
  //  "authorId": "123",
  //  "name": "Oren Bob",
  //  "copaperCount": 10,
  //  "citationCount": 150,
  //  "hIndex": 30
  // },
  const graph = {
    "nodes": [{
      "authorId": author["authorId"],
      "name": author["name"],
      "copaperCount": coAuthors.reduce((sum, a) => (sum + a.copaperCount), 0),    //collaboration times
      "citationCount": author["citationCount"],
      "hIndex": author["hIndex"],
    }, ...coAuthors],
    // "nodes": [
    //   {
    //     "id": 0,
    //     "name": "Myriel",
    //     "symbolSize": 19.12381,
    //     "x": -266.82776,
    //     "y": 299.6904,
    //     "value": 28.685715,
    //     "category": 0
    //   },
    //   {
    //     "id": 1,
    //     "name": "aushdf",
    //     "symbolSize": 39.12381,
    //     "x": -260.82776,
    //     "y": 290.6904,
    //     "value": 38.685715,
    //     "category": 0
    //   },
    // ],
    "links": [
      // {
      //   "source": "1",
      //   "target": "0"
      // },
    ],
    "categories": [
      {
        "name": author["name"]
      },
    ]
  };

  graph.nodes.forEach((node, index) => {
    node.label = {show: true};
    node.id = index;
    node.category = 0;
    node.value = node.copaperCount;   //number in caption
    node.symbolSize = (node.copaperCount / graph.nodes[0].copaperCount) * symbolSizeOrigin;  //decide the size
    if(index === 0){
      //coordinate system:
      //
      //    (0,0)    (1,0)    +X
      //    (0,1)
      //      +Y
      node.x = 0;
      node.y = 0;
    }
    else if(index >= 1){
      graph.links.push({"source": 0, "target": index});
      let degree = (Math.PI*2)/coAuthorsNum * (index-1);
      node.x = radiusOrigin * Math.sin(degree);
      node.y = - radiusOrigin * Math.cos(degree);
    }
  });

  const option = {
    // title: {
    //   text: 'Les Miserables',
    //   subtext: 'Default layout',
    //   top: 'bottom',
    //   left: 'right'
    // },
    tooltip: {},
    // legend: [
    //   {
    //     // selectedMode: 'single',
    //     data: graph.categories.map(function (a) {
    //       return a.name;
    //     })
    //   }
    // ],
    animationDuration: 1500,
    animationEasingUpdate: 'quinticInOut',
    series: [
      {
        name: 'copaperCount',
        type: 'graph',
        layout: 'none',
        data: graph.nodes,
        links: graph.links,
        categories: graph.categories,
        roam: true,
        label: {
          position: 'right',
          formatter: '{b}'
        },
        lineStyle: {
          color: 'source',
          curveness: 0.3
        },
        emphasis: {
          focus: 'adjacency',
          lineStyle: {
            width: 10
          }
        }
      }
    ]
  };

  return <ReactECharts
    option={option}
    style={{ height: '300px', width: '100%' }}
  />;
}

export default NetworkRelationGraph;
