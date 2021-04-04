/////////////////////////////////
// Generated with a lot of love//
// with TUNIOT FOR ESP32     //
// Website: Easycoding.tn      //
/////////////////////////////////
#include <WiFi.h>

void setup()
{
Serial.begin(9600);

  WiFi.disconnect();
  delay(3000);
  Serial.println("START");
  WiFi.softAP("ESP32_Network","123456789");
  Serial.println("The IP of the access point is");
  Serial.println((WiFi.softAPIP()));

}


void loop()
{

    Serial.println("The number of connected station:");
    Serial.println((WiFi.softAPgetStationNum()));
    delay(5000);

}
