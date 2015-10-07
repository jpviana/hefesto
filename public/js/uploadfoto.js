function loadImageFileAsURL()
{
    var filesSelected = document.getElementById("foto").files;
    if (filesSelected.length > 0) {  

        if(filesSelected[0].size < 10000000){
            
            var fileToLoad = filesSelected[0];

            var fileReader = new FileReader();

            fileReader.onload = function(fileLoadedEvent) 
            {   
                var dataUri = fileLoadedEvent.target.result;
                dataUri = dataUri.replace('data:base64,', 'data:image/jpg;base64,');
                imageToDataUri(dataUri, 400);
            };

            fileReader.readAsDataURL(fileToLoad);
        }else{
          alert("tamanho maximo passou");
        }
    }
}

function imageToDataUri(imagem, width) {

    canvas = document.createElement('canvas');
    canvas.width = width;
    var ctx = canvas.getContext('2d');

    var img = document.createElement('img');
    img.onload = function(){

        var height = (width * img.height)/img.width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);
       
        imagemBase64 = canvas.toDataURL();
        imagemBase64 = imagemBase64.replace('data:image/png;', 'data:image/jpeg;');
        setImageSrc(imagemBase64);
        $("#base64").val(imagemBase64);
    }
    img.src = imagem;
}

function setImageSrc(src){

    if(document.getElementById("imagemAtual")){
        document.getElementById("imagemAtual").src = src;
    }
}