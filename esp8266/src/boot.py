# TODO: Connect to Wifi Network
# TODO: Connect to MQTT broker
# TODO: Setup MQTT Publisher
# TODO: Control motor using mqtt

import machine
import pca9685
import network, utime
from servo import Servos
from mqtt import MQTTClient

i2c = machine.I2C(scl=machine.Pin(5), sda=machine.Pin(4))
left_servos = Servos(i2c, address=0x40, degrees=180)
right_servos = Servos(i2c, address=0x41, degrees=180)


# Replace the following with your WIFI Credentials
SSID = "Solistice-14"
SSID_PASSWORD = "BALD1234"


def connect_to_wifi():
    sta_if = network.WLAN(network.STA_IF)
    if not sta_if.isconnected():
        print('connecting to network...')
        sta_if.active(True)
        sta_if.connect(SSID, SSID_PASSWORD)
        while not sta_if.isconnected():
            print("Attempting to connect....")
            utime.sleep(1)
    print('Connected! Network config:', sta_if.ifconfig())
    

def on_message(topic, msg):
    print("Received message: ", msg)
    print("Topic: ", topic)
    if msg == b"M1 0 20":
        left_servos.position(15, 20)
    else:
        print("Invalid message")

def on_connect():
    print("Connected to MQTT broker")
    client.subscribe("hexapod1")
    print("Subscribed to hexapod1")

client = MQTTClient("hexapod1", "192.168.100.14", port=1883)

def connect_to_mqtt():
    client.connect()
    client.set_callback(on_message)
    client.subscribe("/to-hexapod",qos=1)
    print("Connected to MQTT broker")

print("Connecting to your wifi...")
connect_to_wifi()
connect_to_mqtt()
