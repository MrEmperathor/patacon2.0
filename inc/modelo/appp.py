from flask import Flask, jsonify, request
import base64
from scraping import *
import json
from urllib.parse import urlparse
# from flask_cors import CORS, cross_origin

app = Flask("__name__")
# cors = CORS(app)
# app.config['CORS_HEADERS'] = 'Content-Type'
# import scraping as fl


@app.route('/ping/<string:product_name>')
# @cross_origin()
def pingg(product_name):
    product_namee = base64.b64decode(product_name)
    r = App(product_namee)
    # print(r.datosSerie())
    (c,fara) = r.datosSerie()   #devuelve un json con enlaces de los capitulos
    data = {}
    sjson = {}
    for i in c:
        jenla = []
        for s in c[i]:      #iterando por temporadas
            jenla.append(r.postMovie(s))
        sjson[i] = jenla
    data["info"] = fara
    data["enlaces"] = sjson
    # print(data)
    return jsonify({"message": data})




if __name__ == '__main__':
    # host = "51.195.148.50"
    # server_name = app.config['SERVER_NAME']
    # if server_name and ':' in server_name:
    #     host, port = server_name.split(":")
    #     port = int(port)
    # else:
    #     port = 5000
    #     host = "localhost"
    # app.run(host=host, port=port)

    # host = "apitest.maxpeliculas.net"
    # host = requests.get("https://api.ipify.org/").text
    app.run(debug=True, port=5000)