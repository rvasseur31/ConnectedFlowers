// https://randomnerdtutorials.com/decoding-and-encoding-json-with-arduino-or-esp8266/
#include <ArduinoJson.h>

float getTemp(){
   int valeur = analogRead(0);  
   float tension = valeur * 5.0;
   tension /= 1024.0; 
   float temperature = ((tension * 1000) - 500) / 10;
   return temperature;
}

int getLum(){
    int val = analogRead(3);
    val = map(val, 6, 679, 0, 100);
    return val;
}

void sendData(){
  	StaticJsonBuffer<200> jsonBuffer;
  	JsonObject& root = jsonBuffer.createObject();
	root["Temperature"] = getTemp();
	root["Luminosity"] = getLum();
  	root["Humidity"] = 50;
  	root["Time"] = 0;
  	root.printTo(Serial);
  	Serial.println();	
}

void setup() {
  	Serial.begin(9600);
}

void loop() {
  	// Toutes les une heure, il envoie les données
  	sendData();
  	delay(3600000);
  	
}