const sidebar = document.querySelector('#sidebar');

fetch('museos.geojson')
  .then(response => response.json())
  .then(data => {
    let html = '';
    data.features.forEach(el => {
      html += `<div class="sitio my-1 border" data-lng="${el.geometry.coordinates[0]}" data-lat="${el.geometry.coordinates[1]}">${el.properties.NOMBRE}</div>`;
      
    });
    sidebar.innerHTML = html;
    document.querySelectorAll('div.sitio').forEach((element) =>{
        console.log('clic')
        element.addEventListener('click',()=>{
            map.setView([element.dataset.lat,element.dataset.lng],17)
        })
    } )
  })
  .catch(error => console.error('Error al cargar el archivo GeoJSON:', error));



if(document.querySelector("#mapa")){

    var map = L.map('mapa').setView([36.7194, -4.4200], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);


    const museumIcon = L.icon({
        iconUrl: '../images/museum.png',
        iconSize: [38, 38],
        iconAnchor: [19, 38],
        popupAnchor: [0, -38]
      });
    
    
    fetch("museos.geojson")
    .then( response => {
            if(response.ok) return response.json();
        })
    .then( data => {
        data.features.forEach( (el)=>{
            let marker = L.marker( [el.geometry.coordinates[1],el.geometry.coordinates[0]], {icon:museumIcon} ).addTo(map);
            marker.addEventListener("click",()=>{
                map.setView([el.geometry.coordinates[1],el.geometry.coordinates[0]],17)

                if (!el.properties.URL){
                    Swal.fire({
                        title: el.properties.NOMBRE,
                        html: `Web no disponible`,
                        imageUrl: '../images/museum.png',
                        imageWidth: 60,
                        imageHeight: 60,
                        imageAlt: "Museo",
                    })
                } else {
                    Swal.fire({
                        title: el.properties.NOMBRE,
                        html: `<a href="${el.properties.URL}"> ${el.properties.URL} </a>`,
                        imageUrl: '../images/museum.png',
                        imageWidth: 60,
                        imageHeight: 60,
                        imageAlt: "Museo",
                    })
                }
            })
            
        })
    })
    .catch( err => console.log(err) ) 



}