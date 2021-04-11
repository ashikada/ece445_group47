#include "WiFi.h"
#include "SPIFFS.h"
#include "ESPAsyncWebServer.h"

const char* ssid = "WAVLINK-N";
const char* password =  "Familydinner227";

AsyncWebServer server(80);

void setup(){
  Serial.begin(115200);

  if(!SPIFFS.begin()){
     Serial.println("An Error has occurred while mounting SPIFFS");
     return;
  }

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi..");
  }

  Serial.println(WiFi.localIP());

  // WiFi.disconnect();
  // delay(3000);
  // Serial.println("START");
  // WiFi.softAP("ESP32_Network","123456789");
  // Serial.println("The IP of the access point is");
  // Serial.println((WiFi.softAPIP()));

  server.on("/", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send(SPIFFS, "/master.html", "text/html");
  });

  server.on("/chip_img/7400.jpg", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send(SPIFFS, "/chip_img/7400.jpg", "image/jpg");
  });

 server.on("/master.js", HTTP_GET, [](AsyncWebServerRequest *request){
   request->send(SPIFFS, "/master.js", "text/javascript");
 });

  server.begin();
}

void loop(){}
