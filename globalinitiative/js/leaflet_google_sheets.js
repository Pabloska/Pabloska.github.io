
var map;

var code = "1EXl0ZGn4RMBtim_c4zwA_te3VQgIquVywZlT_XKR0qo"

document.addEventListener('DOMContentLoaded',function(){
  map = L.map('map').setView([22, 11], 4);
  L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution: '&copy; Global Initiative | Pablo Gallego'
  }).addTo(map);
 var satellite  = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  }),

  arabic  = L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  });



// json object for layer switcher control basemaps
var baseLayers = {
		"Satellite": satellite,
		"Arabic ": arabic 
	};
// add layer groups to layer switcher control
var controlLayers = L.control.layers(baseLayers).addTo(map);
	
   var marker1 = {
    radius: 3,
    fillColor: "white",
    // color: "#fff",
    weight: 0,
    opacity: 1,
    fillOpacity: 0.8
  };
  
 var firefoxIcon = L.icon({
        iconUrl: 'https://globalinitiative.github.io/detention-centers/img/target_logo_1.png',
        iconSize: [11, 11], // size of the icon
        });
  
  Tabletop.init({ 
    key: code,
    callback: function(sheet, tabletop){ 
      for (var i in sheet){
        var place = sheet[i];
        L.marker([place.lat, place.lon], {icon: firefoxIcon})
          .addTo(map)
          .bindPopup(place.name)
      }
    },
    simpleSheet: true 
  })
  
 
 //routes JSON
 
 
		function onEachFeature(feature, layer) {
			var popupContent = "<p><img style='height:50px,' src="+''+" ></img></P>";

			if (feature.properties && feature.properties.popupContent) {
				popupContent += feature.properties.popupContent;
			}

			layer.bindPopup(popupContent);
		}


		
		
		
		var myStyle = {
		 "color": "red",
		 "dashArray": '',
		 "weight": 0.5,
		 "opacity": 0.1
		};

		
		
		
		L.geoJson(routes, {

			filter: function (feature, layer) {
				if (feature.properties) {
					// If the property "underConstruction" exists and is true, return false (don't render features under construction)
					return feature.properties.underConstruction !== undefined ? !feature.properties.underConstruction : true;
				}
				return false;
			},
			style: myStyle,
			onEachFeature: onEachFeature
		}).addTo(map);

	//labels//
 
 
  
})
