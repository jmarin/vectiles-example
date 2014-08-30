var ocean50 = new ol.layer.Vector({
  source: new ol.source.TileVector({
    format: new ol.format.GeoJSON(),
    projection: 'EPSG:4326',
    tileGrid: new ol.tilegrid.XYZ({
      //maxZoom: 26
    }),
		url: 'http://localhost:8080/api/repos/naturalearth' +
        '/vectiles/master/ne_50m_ocean/{z}/{x}/{y}.geojson'
  }),
  style: new ol.style.Style({
    fill: new ol.style.Fill({
      color: '#e5ebeb'
    })
  })
});

var land50 = new ol.layer.Vector({
  source: new ol.source.TileVector({
    format: new ol.format.GeoJSON(),
    projection: 'EPSG:4326',
    tileGrid: new ol.tilegrid.XYZ({
      //maxZoom: 26
    }),
		url: 'http://localhost:8080/api/repos/naturalearth' +
        '/vectiles/master/ne_50m_land/{z}/{x}/{y}.geojson'
  }),
  style: new ol.style.Style({
    fill: new ol.style.Fill({
      color: '#FFFFF0'
    })
  })
});

var lakes50 = new ol.layer.Vector({
  source: new ol.source.TileVector({
    format: new ol.format.GeoJSON(),
    projection: 'EPSG:4326',
    tileGrid: new ol.tilegrid.XYZ({
      //maxZoom: 26
    }),
		url: 'http://localhost:8080/api/repos/naturalearth' +
        '/vectiles/master/ne_50m_lakes/{z}/{x}/{y}.geojson'
  }),
  style: new ol.style.Style({
    fill: new ol.style.Fill({
      color: '#EAEEEA'
    })
  })
});

var boundaries50 = new ol.layer.Vector({
  source: new ol.source.TileVector({
    format: new ol.format.GeoJSON(),
    projection: 'EPSG:4326',
    tileGrid: new ol.tilegrid.XYZ({
      //maxZoom: 26
    }),
		url: 'http://localhost:8080/api/repos/naturalearth' +
        '/vectiles/master/ne_50m_admin_0_boundary_lines_land/{z}/{x}/{y}.geojson'
  }),
  style: new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: '#E1E1E1',
		  width: 1
    })
  })
});

var styleCache = {};

var countriesLabels = new ol.layer.Vector({
  source: new ol.source.TileVector({
    format: new ol.format.GeoJSON(),
    projection: 'EPSG:4326',
    tileGrid: new ol.tilegrid.XYZ({
      //maxZoom: 26
    }),
		url: 'http://localhost:8080/api/repos/naturalearth' +
        '/vectiles/master/ne_50m_admin_0_countries/{z}/{x}/{y}.geojson'
  }),
 style: function(feature, resolution) {
	  //console.log(feature.get('sovereignt'));
    var text = resolution < 5000 ? feature.get('sovereignt') : ''; 
		if (!styleCache[text]) {
      styleCache[text] = [new ol.style.Style({
        text: new ol.style.Text({
          font: '12px Calibri,sans-serif',
          text: text,
          fill: new ol.style.Fill({
            color: '#000'
          }),
          stroke: new ol.style.Stroke({
            color: '#fff',
            width: 3
          })
        })
      })];
    }
    return styleCache[text];
  }
});




var statesProvinces = new ol.layer.Vector({
  source: new ol.source.TileVector({
    format: new ol.format.GeoJSON(),
    projection: 'EPSG:4326',
    tileGrid: new ol.tilegrid.XYZ({
      //maxZoom: 26
    }),
		url: 'http://localhost:8080/api/repos/naturalearth' +
        '/vectiles/master/ne_50m_admin_1_states_provinces_lines/{z}/{x}/{y}.geojson'
  }),
  style: new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: '#E8E8E8',
		  width: 0.6
    })
  })
});


function onMoveEnd(evt) {
  var map = evt.map;
	console.log('Resolution: ' + map.getView().getResolution());
}


var map = new ol.Map({
  target: 'map',
  layers: [	ocean50, land50, lakes50, boundaries50, statesProvinces ],
  view: new ol.View({
    center: ol.proj.transform([-77.0, 39.0], 'EPSG:4326', 'EPSG:3857'),
    zoom: 4
  })
});

//map.on('moveend', onMoveEnd);
