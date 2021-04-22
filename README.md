# Automated IC Chip Tester
### by Michael Ruscito, Alison Shikada, and Ryan Yoseph
Senior Design Project at the University of Illinois: Urbana-Champaign  
ECE 445; Spring 2021

### Files included:
- my-app folder
  - React app generated with [this tutorial to host both back and front end](https://awot.net/en/guide/tutorial.html#front-end)
  - Development through "npm start", is hosted on local WiFi with softAP commented out
  - Currently has:
    - Home Screen - can select chip to submit. Image will change dependent on selection. Submit goes to Output but no calculations done.
    - Output Screen - has a title and the same chip image as selected
- status{date}.png
-------------------------
- old_draft folder
  - INO, HTML, JS, and PNG files
  - data folder contains all relevant non-INO files
- tutorials
  - INO files based on youtube videos from [this playlist](https://youtube.com/playlist?list=PLfPtpZzK2Z_QO8snrdnRTTNtQvLw35Zfc)
  - uses [this web ide](http://easycoding.tn/esp32/demos/code/)
  - twoLedWebsite (INO file)
    - INO file based on [this tutorial](https://randomnerdtutorials.com/esp32-access-point-ap-web-server/)
    - interfaces with physical LEDs; communicates with server and ESP32 (inputs on site controls output on ESP32)
  - buttonOutputWebsite (INO file)
    - INO file based on [this tutorial](https://randomnerdtutorials.com/esp32-esp8266-web-server-physical-button/)
    - interfaces with 1 physical button and LED; communicates both inputs and outputs from ESP32 to web server
    - TODO: optimize the speed of website updates with [this Websocket tutorial](https://rntlab.com/question/full-tutorial-esp32-remote-control-with-websocket/) (similar to inturrupt-driven approach, rather than polling)
- UI draft for website output (PNG)
