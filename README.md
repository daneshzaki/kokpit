<img src="https://raw.githubusercontent.com/daneshzaki/kokpit/main/images/icon.png" />
# Kokpit

Kokpit is a basic <a href="https://kafka.apache.org/">Kafka</a> client. It has features to automatically connect to a Kafka broker, create a topic on the fly, publish and subscribe messages from it. The UI is simple and intuitive. The consumer sees the messages on the topic it has subscribed to in the UI in real-time as they get published. 

<img src = "https://raw.githubusercontent.com/daneshzaki/kokpit/main/images/screenshot.png" />

Kokpit is built using <a href="https://kafka.js.org/">KafkaJS</a>, <a href="https://socket.io/">Socket.io</a> and <a href="http://electronjs.org/">ElectronJS</a>. KafkaJS provides the Kafka client logic, while Socket.io enables real time communication from Kafka topic to the UI. ElectronJS helps this to be a native desktop application. While releases for Windows are available, the code can be used to build it for other platforms.

<img src = "https://raw.githubusercontent.com/daneshzaki/kokpit/main/images/kokpitflow.png" />

For more details, please see this <a href="https://dzone.com/articles/building-a-simple-kafka-client-for-the-web-and-des">post</a>. The latest version is 0.3, available <a href="https://github.com/daneshzaki/kokpit/releases/tag/v0.3">here</a>.




