import os


print('#####################################################################')
print('##                                                                 ##')
print('##                    PROJET DE PLANTE CONNECTÉE                   ##')
print('##                                                                 ##')
print('##                 Lancement du programme Node.js                  ##')
print('##                                                                 ##')
print('##          PROJET DÉVELOPPÉ PAR RAPHAEL VASSEUR ET JÉRÉMY ESCOBAR ##')
print('#####################################################################')
os.system("node main.js")



##### Solution non retenue #####
# Récupère les données de l'arduino via le port Série + faire une requête http vers un server node.js
# qui envoie les données vers la base de données

# import requests
# import json
# import serial
#
#
# with Serial(port="/dev/ttyACM0", baudrate=9600, timeout=3600) as port_serie:
#     if port_serie.isOpen():
#         while True:
#             ligne = port_serie.read_line()
#             url = "http://localhost:4000/data"
#             data = {'Temperature':24,'Luminosity':50,'Humidity':50,'Time':0}
#             headers = {'Content-type': 'application/json', 'Accept': 'text/plain'}
#             r = requests.post(url, data=json.dumps(data), headers=headers)