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

#include <MCP23S17.h>

#ifdef __PIC32MX__
#include <DSPI.h>
DSPI0 SPI;
#else
#include <SPI.h>
#endif

const uint8_t chipSelect = 5; //  CS pin

MCP23S17 portEx(&SPI, chipSelect, 0);

//unsigned long vectorTime;

/* ZIF Pin    PortEx/ESP Pin            ZIF Pin    PortEx/ESP Pin
 *  1         port   0                    13        Decoder 00
 *  2         port   1                    14        port   8
 *  3         port   2                    15        port   9
 *  4         port   3  / Decoder 01      16        port   10
 *  5         port   4  / Decoder 10      17        port   11
 *  6         port   5                    18        port   12
 *  7         port   6                    19        port   13
 *  8         port   7                    20        port   14
 *  9         GPIO   32                   21        port   15
 *  10        GPIO   33                   22        GPIO   25
 *  11        GPIO   26                   23        GPIO   27
 *  12        GPIO   14                   24        GPIO   12
 *  
 *  Decoder Pins
 *  GPIO 2  GPIO 15
 */

#define decoderA 15
#define decoderB 2
#define chip1 0
#define chip2 1
#define chip3 2
#define chip4 3
#define chip5 4
#define chip6 5
#define chip7 6
#define chip8 7
#define chip9_esp 32
#define chip10_esp 33
#define chip11_esp 26
#define chip12_esp 14
//#define chip13
#define chip14 8
#define chip15 9
#define chip16 10
#define chip17 11
#define chip18 12
#define chip19 13
#define chip20 14
#define chip21 15
#define chip22_esp 25
#define chip23_esp 27
#define chip24_esp 12



bool test_7400() {
  //  Set 5V decoder pins
  pinMode(decoderB, OUTPUT);
  pinMode(decoderA, OUTPUT);
  digitalWrite(decoderB, LOW);
  digitalWrite(decoderA, LOW);
  //  set IC chip GND
  portEx.pinMode(chip7, OUTPUT);
  portEx.digitalWrite(chip7, LOW);

  //  set IC chip inputs (outputs on port expander)
  portEx.pinMode(chip1, OUTPUT);
  portEx.pinMode(chip2, OUTPUT);
  portEx.pinMode(chip4, OUTPUT);
  portEx.pinMode(chip5, OUTPUT);
  portEx.pinMode(chip18, OUTPUT); //  pin9
  portEx.pinMode(chip17, OUTPUT); //  pin10
  portEx.pinMode(chip15, OUTPUT); //  pin12
  portEx.pinMode(chip14, OUTPUT); //  pin13
  //  set IC chip outputs (inputs on port expander)
  portEx.pinMode(chip3, INPUT);
  portEx.pinMode(chip6, INPUT);
  portEx.pinMode(chip19, INPUT);  //  pin8
  portEx.pinMode(chip16, INPUT);  //  pin11

  //  test vectors
  portEx.writePort(0x0000);
  /*
  uint16_t output = portEx.readPort();
  //Serial.println(output);
  if (output != 0x2424) {
    return false;
  }
  */
  uint8_t output = portEx.digitalRead(chip3);
  Serial.println(output);
  if (output != 1) {
    Serial.println("Failed");
    return false;
  }
  Serial.println("Passed");
  output = portEx.digitalRead(chip6);
  if (output != 1) {
    return false;
  }
  output = portEx.digitalRead(chip19);
  if (output != 1) {
    return false;
  }
  output = portEx.digitalRead(chip16);
  if (output != 1) {
    return false;
  }

  return true;
}




void readChip(Request &req, Response &res){
  res.print(chipIdx);
  Serial.println(chipIdx);
  if (test_7400()) {
    Serial.println("True");
  } else {
    Serial.println("False");
  }
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
