//https://www.eclipse.org/paho/clients/js/

function LED1_On() {
	//alert("led on");
	console.log("led on");
	document.getElementById("sensor").innerHTML="led on";
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
	document.getElementById("sensor").innerHTML="led off";
}






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
    const separador=':';
    mensaje=message.payloadString;
    const mensajesep=mmensaje.split(':');
    if(mensaje.includes(separador)){
      document.getElementById("sensor").innerHTML=mensajesep[1];
      document.getElementById("sensor1").innerHTML=mensajesep[2];
      document.getElementById("recibido").innerHTML=mensajesep[0];
    }
    else if(message.payloadString=="ON"){
      console.log("Encendido");
    }
    else (message.payloadString=="'OFF'"){
      console.log("Apagado");
    }
    else{
      document.getElementById("recibido").innerHTML=payloadString;
    }

  }
  