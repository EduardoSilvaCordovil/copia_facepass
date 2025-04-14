var app = {
  initialize: function () {
    this.bindEvents();
  },

  bindEvents: function () {

  },

  capturePhoto: function () {

    navigator.camera.getPicture(onSuccess, onFail, {
      quality: 50,
      destinationType: Camera.DestinationType.DATA_URL,
      saveToPhotoAlbum: true
    });

    function onSuccess(imageData) {
      window.resolveLocalFileSystemURL(uri, (entry) => {
        let img = document.getElementById('fotoPreso');
        img.style.display = "block"
        img.src = "data:image/jpeg;base64," + ImageData;
      }, onFail);
    }

    function onFail(message) {
      alert('Failed because: ' + message);
    }

  }

};
