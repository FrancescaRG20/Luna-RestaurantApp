import socket
import time
import argparse
### Checks if port is open to avoid docker-compose race condition ###

parser = argparse.ArgumentParser()
parser.add_argument('--service-name', required=True)
parser.add_argument('--ip', required=True)
parser.add_argument('--port', required=True)

args = parser.parse_args()
service_name = str(args.service_name)
port = int(args.port)
ip = str(args.ip)

while True:
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    result = sock.connect_ex((ip, port))
    if result == 0:
        print("{0} port {1} is now open. Executing startup script.".format(
            service_name, port))
        # adds one second of wait time as the script is not consistent in
        # solving the race condition if the databse was not properly shut down
        time.sleep(1)
        break
    else:
        print("{0} port {1} is not open yet, trying to reconnect...".format(
            service_name, port))
        time.sleep(3)
