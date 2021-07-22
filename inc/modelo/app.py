from flask import Flask, jsonify, request
import base64
from scraping import *
import json
from urllib.parse import urlparse
from flask_cors import CORS, cross_origin

app = Flask("__name__")
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
# import scraping as fl


@app.route('/ping/<string:product_name>')
@cross_origin()
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


@app.route('/cue/<string:url>')
@cross_origin()
def getProducts(url):
    v = url
    url_api1 = 'https://api.cuevana3.io/uptobox/api.php'
    api = "https://uptobox.com/api/link/info?fileCodes="

    myobj = {'h': v}
    x = requests.post(url_api1, data = myobj).text
    xx = json.loads(x)
    path_url = urlparse(xx["url"]).path[1:]
    if len(path_url) > 0: 
        re = requests.get(api+path_url).json()
        if 'file_name' not in re["data"]["list"][0]:
            xx["url"] = "undefine"
    return jsonify({"message": xx})

@app.route('/comprobar/<string:url>')
def getComprobar(url):
    api = "https://uptobox.com/api/link/info?fileCodes="
    path_url = url
    if len(path_url) > 0: 
        re = requests.get(api+path_url).json()
        # if re["data"]["list"][0]["file_name"]:
        return jsonify({"message": re})


@app.route('/prud/<string:product_name>')
def getProduct(product_name):
    productsFound = [product for product in products if product["name"] == product_name]
    if (len(productsFound) > 0):
        return jsonify({"product": productsFound[0]})
    return jsonify({"message": "product not found!"})


@app.route('/products', methods=["POST"])
def addProduct():
    new_product = {
        "name": request.json["name"],
        "price": request.json["price"],
        "quantity": request.json["quantity"]
    }
    products.append(new_product)
    return jsonify({"message": "Product Added Succesfully", "products": products})


@app.route('/products/<string:product_name>', methods=['PUT'])
def editPoduct(product_name):
    productFound = [product for product in products if product['name'] == product_name]
    if (len(productFound) > 0):
        productFound[0]['name'] = request.json["name"]
        productFound[0]['price'] = request.json["price"]
        productFound[0]["quantity"] = request.json["quantity"]
        
        return jsonify({
            "message": "Product Update!",
            "product": productFound[0]
        })
    return jsonify({"message": "Product No Found"})


@app.route('/products/<string:product_name>', methods=["DELETE"])
def deleteProduct(product_name):
    productsFound = [product for product in products if product['name'] == product_name]
    if (len(productsFound) > 0):
        products.remove(productsFound[0])
        return jsonify({"message": "Product Deleted", "product": products})
    return jsonify({"message": "Product No Found!"})


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
    host = requests.get("https://api.ipify.org/").text
    app.run(host=host, debug=True, port=4000, ssl_context='adhoc')