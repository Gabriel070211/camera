Webcam.attach('camera');
camera= document.getElementById("camera");
Webcam.set(
    {
        widht:350,
        height:300,
        image_format:'png',
        png_quality:90
        
    });

    function take_snapshot(){
        Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id= "self_image" src="'+data_uri+'">';
    });
    }

    console.log("ml5versao",ml5.version);
    classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/6maCUw72O/model.json',modelLoaded);

    function modelLoaded() {
        console.log("modelo carregado");
    }

    function check() {
        img=document.getElementById("self_image");
        classifier.classify(img,gotResult);

    }


    function gotResult(error,results) {
        if(error) {
            console.error(error);

        }
        else{
            console.log(results);
            result=results[0].confidence.toFixed(2);
            result=result*100;
            document.getElementById("result_object_name").innerHTML=results[0].label;
            document.getElementById("result_object_accuracy").innerHTML=result+"%";
        }
    }