//https://www.eclipse.org/paho/clients/js/

var btn=document.getElementById('btn'), contador=0;
function cambio()
{ if (contador==0)
  {
  message = new Paho.MQTT.Message("ENCENDER");
  message.destinationName = "pasmayj@gmail.com/t2";
  client.send(message);
  contador=1;
  }
 else
  {
  message = new Paho.MQTT.Message("APAGAR");
  message.destinationName = "pasmayj@gmail.com/t2";
  client.send(message);
  contador=0;
  }
}

function LED1_On() {
  //alert("led on");
  console.log("led on");
  //document.getElementById("sensor").innerHTML="led on";
  message = new Paho.MQTT.Message("ON");
      message.destinationName = "pasmayj@gmail.com/t1";
      client.send(message);
  
}
function LED1_Off(){  
  //alert("led off");
  console.log("led off");
  message = new Paho.MQTT.Message("OFF");
      message.destinationName = "pasmayj@gmail.com/t1";
      client.send(message);
  //document.getElementById("sensor").innerHTML="led off";
}

//funcion para recibir datos:
//function HISTORIAL_S1(){
  //   console.log("led on");
  //document.getElementById("sensor").innerHTML=client.historial;
  //message = new Paho.MQTT.Message("ON");
    //message.destinationName = "pasmayj@gmail.com/t1";
     // client.send(message);
//}

//function HISTORIAL_S2(){
  //   console.log("led on");
  //document.getElementById("sensor").innerHTML=client.historial;
 // message = new Paho.MQTT.Message("ON");
   // message.destinationName = "pasmayj@gmail.com/t1";
     // client.send(message);
//}




// Create a client instance
  //client = new Paho.MQTT.Client("postman.cloudmqtt.com", 14970);
  
  client = new Paho.MQTT.Client("maqiatto.com", 8883, "web_" + parseInt(Math.random() * 100, 10));

  // set callback handlers
  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = onMessageArrived;
  var options = {
   useSSL: false,
    userName: "pasmayj@gmail.com",
    password: "sanjose1998",
    onSuccess:onConnect,
    onFailure:doFail
  }

  // connect the client
  client.connect(options);
   
  // called when the client connects
  function onConnect() {
    // Once a connection has been made, make a subscription and send a message.
    console.log("Conectado...");
  
    client.subscribe("pasmayj@gmail.com/t2");
    message = new Paho.MQTT.Message("Bievenido");
    message.destinationName = "pasmayj@gmail.com/t1";
    client.send(message);
  
  }

  function doFail(e){
    console.log(e);
  
  }

  // called when the client loses its connection
  function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost:"+responseObject.errorMessage);
    }
  }

  // called when a message arrives
  function onMessageArrived(message) {
    console.log("onMessageArrived:"+message.payloadString);
    var sms = message.payloadString.split(";")
    document.getElementById("sensor").innerHTML=sms[0];
    document.getElementById("sensor1").innerHTML=sms[1];
    //comando para poner el sensor desde esp32
    document.getElementById("sensor").innerHTML=message.payloadString;
    if(message.payloadString==='ENCENDER'){
     document.getElementById("imagen").src="https://previews.123rf.com/images/sarahdesign/sarahdesign1410/sarahdesign141002939/32951945-ilustraci%C3%B3n-del-bot%C3%B3n-de-encendido.jpg";
    } else if(message.payloadString==='APAGAR'){
      document.getElementById('imagen').src= "https://www.aboutespanol.com/thmb/mg6tbcWB-pPNw5v2M9Sc8RSd8F0=/735x0/PC-No-Se-Apaga-565ff7e13df78cedb09eea54.png";
      
    }
    if(message.payloadString==='ENCENDER'){
      document.getElementById("btn").innerHTML="Apagar";
    } else if(message.payloadString==='APAGAR'){
    document.getElementById("btn").innerHTML="Encender";
    }


  }
