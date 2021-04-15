/////////////////////////////////
// Generated with a lot of love//
// with TUNIOT FOR ESP32     //
// Website: Easycoding.tn      //
/////////////////////////////////
#include <WiFi.h>

WiFiServer server(80);

WiFiClient client;

void setup()
{
Serial.begin(9600);

  WiFi.disconnect();
  delay(3000);
  Serial.println("START");
  WiFi.softAP("ESP32_Network","123456789");
  Serial.println("The IP of the access point is");
  Serial.println((WiFi.softAPIP()));
  server.begin();

}


void loop()
{

    client = server.available();
    if (!client) { return; }
    while(!client.available()){  delay(1); }
    client.flush();
    client.println("HTTP/1.1 200 OK");
    client.println("Content-Type: text/html");
    client.println("");
    client.println("<!DOCTYPE HTML>");
    client.println("<html>");
    client.println("<head>");
      client.println("<title>ESP32 title tab</title>");
    client.println("</head>");
    client.println("<body>");
      client.println("<h1 style=""color:#ff0000"">");
      client.println("Welcome to my ESP32 Web Server");
      client.println("</h1>");
      client.println("<span style=""color:#000000;font-size:14px"">");
      client.println("Welcome to my Web server. It is running on an ESP32");
      client.println("</span>");
      client.println("<br>");
      client.println("<span style=""color:#006600;font-size:14px"">");
      client.println("The server is running since:");
      client.println("</span>");
      client.println("<span style=""color:#ff0000;font-size:20px"">");
      client.println((millis()/1000));
      client.println("</span>");
      client.println("<span style=""color:#006600;font-size:14px"">");
      client.println("seconds");
      client.println("</span>");
      client.println("<br>");
      client.println("<span style=""color:#000000;font-size:14px"">");
      client.println("The value of a touch sensor");
      client.println("</span>");
      client.println("<span style=""color:#000000;font-size:14px"">");
      client.println((touchRead(T0)));
      client.println("</span>");
    client.println("</body>");
    client.println("</html>");
    client.stop();
     delay(1);

}
