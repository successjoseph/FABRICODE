import ngrok
import time

ngrok.set_auth_token('2zGebsAPz54zWJv9j9NCrM0BX3n_3ox4xA2nJSUxyEycq81vG')
listener = ngrok.forward(8080)
print(listener.url())

try:
    while True:
        time.sleep(1)
except KeyboardInterrupt:
    print("Shutting down tunnel…")