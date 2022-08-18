const findPlaceFromQuery = (google, address) =>
  new Promise((resolve, reject) => {
    const map = new google.maps.Map(document.getElementById('map'));
    const request = {
      query: address,
      fields: ['name', 'geometry'],
    };
    const service = new google.maps.places.PlacesService(map);
    service.findPlaceFromQuery(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        resolve({
          latitude: results[0].geometry.location.lat(),
          longitude: results[0].geometry.location.lng(),
        });
      } else reject(status);
    });
  });

export default findPlaceFromQuery;
