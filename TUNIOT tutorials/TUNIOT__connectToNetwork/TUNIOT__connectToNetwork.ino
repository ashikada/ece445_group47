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
  Serial.println("======= Program Start ======");
  WiFi.begin("WAVLINK-N","Familydinner227");
  while ((!(WiFi.status() == WL_CONNECTED))){
    Serial.print("...");
    delay(300);

  }
  Serial.println("====== I am connected! =======");
  Serial.println("Your IP is:");
  Serial.println((WiFi.localIP()));

}


void loop()
{


}
