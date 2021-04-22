#include <WiFi.h>
#include "aWOT.h"
#include "StaticFiles.h"

#define WIFI_SSID "WAVLINK-N"
#define WIFI_PASSWORD "Familydinner227"
#define LED_BUILTIN 2

WiFiServer server(80);
Application app;
bool ledOn;
char chipIdx;

void readChip(Request &req, Response &res){
  res.print(chipIdx);
  Serial.println(chipIdx);
}

void updateChip(Request &req, Response &res){
  chipIdx = (req.read());
  // digitalWrite(LED_BUILTIN, ledOn);
  return readChip(req, res);
}

void setup() {
  pinMode(LED_BUILTIN, OUTPUT);
  Serial.begin(115200);

  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println(WiFi.localIP());

  /*
  // To enable softAP
  WiFi.disconnect();
  delay(3000);
  Serial.println("START");
  WiFi.softAP("ESP32_Network","123456789");
  Serial.println("The IP of the access point is");
  Serial.println((WiFi.softAPIP()));
  */

  app.get("/chip", &readChip);
  app.put("/chip", &updateChip);
  app.use(staticFiles());

  server.begin();
}

void loop() {
  WiFiClient client = server.available();

  if (client.connected()) {
    app.process(&client);
  }
}