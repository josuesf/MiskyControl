//----------- HTTP ------------------
var express = require("express");
var bodyParser = require("body-parser");
var multer = require('multer');
var http = require('http');
var app = express();
var server = http.createServer(app);
var sql = require("mssql");
var md5 = require('md5');
// Create connection to database
var dbConfig = {
	user: 'sa', // update me
	password: 'paleC0nsult0res', // update me
	server: 'localhost',
	database: 'PALERPmisky'
}
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(express.static('public'));
//----------- SOCKET IO -------------
var io = require('socket.io')(server);
var port = process.env.PORT || 5000;
var querystring = require('querystring');
server.listen(port, () => console.log('running by josuesf on ' + port));
//------------ EVENTS SOCKET IO ----------------------
io.sockets.on('connection', function (socket) {
	//------------- event login -----------------------
	socket.on('login_in', function (data) {
		var user = (data.user).toUpperCase();
		var password = md5(data.pass);
		executeStoreProc(null, socket, 'USP_PRI_USUARIO_TXPK', { user, password })
	});
});
//------------- EVENTS HTTP -----------------
var storage = multer.diskStorage({
	destination: function (req, file, callback) {
		callback(null, './public/uploads');
	},
	filename: function (req, file, callback) {
		callback(null, nombreImagen);
	}
});
var upload = multer({ storage: storage }).array('photo1', 2);
//Function to connect to database and execute query
var executeStoreProc = function (res, socket, store_procedure, usuario) {
	var dbConn = new sql.Connection(dbConfig);
	dbConn.connect(function (err) {
		if (err) {
			console.log("Error while connecting database :- " + err);
			if (res) {
				res.json({ respuesta: 'error' })
			} else
				socket.emit('login_ou', { estado: "0" });
		}
		else {
			// create Request object
			var request = new sql.Request(dbConn);
			request.input('Cod_Usuarios', sql.NVarChar, usuario.user)
			// query to the database
			request.execute(store_procedure, function (err, result) {
				dbConn.close()
				if (err) {
					console.log("Error while querying database :- " + err);
					if (res) {
						res.json({ respuesta: 'error' })
					} else
						socket.emit('login_ou', { estado: "0" });
				}
				else {
					usuarios_encontrados = result[0]
					if (usuarios_encontrados.length > 0) {
						if (usuarios_encontrados[0].Contrasena == usuario.password) {
							if (res) {
								res.json({ respuesta: 'ok', usuario: usuarios_encontrados[0] })
							} else {
								socket.emit('login_ou', { estado: "1" });
							}
						} else {
							if (res) {
								res.json({ respuesta: 'error' })
							} else
								socket.emit('login_ou', { estado: "0" });
						}
					} else {
						if (res) {
							res.json({ respuesta: 'error' })
						} else
							socket.emit('login_ou', { estado: "0" });
					}
				}
			});
		}
	});
}
var executeSP_GET_Categorias = function (res, store_procedure, param) {
	var dbConn = new sql.Connection(dbConfig);
	dbConn.connect(function (err) {
		if (err) {
			console.log("Error while connecting database :- " + err);
			res.json({ respuesta: 'error' })
		}
		else {
			// create Request object
			var request = new sql.Request(dbConn);
			// query to the database
			if (param) request.input('Cod_Categoria', sql.NVarChar, param)
			request.execute(store_procedure, function (err, result) {
				dbConn.close()
				if (err) {
					console.log("Error while querying database :- " + err);
					res.json({ respuesta: 'error' })

				}
				else {
					categorias = result[0]
					if (categorias.length > 0) {
						res.json({ respuesta: 'ok', categorias })
					} else {
						res.json({ respuesta: 'error' })
					}
				}
			});
		}
	});
}
var executeSP_GET_Productos = function (res, store_procedure, param) {
	var dbConn = new sql.Connection(dbConfig);
	dbConn.connect(function (err) {
		if (err) {
			console.log("Error while connecting database :- " + err);
			res.json({ respuesta: 'error' })
		}
		else {
			// create Request object
			var request = new sql.Request(dbConn);
			// query to the database
			if (param) request.input('Cod_Categoria', sql.NVarChar, param)
			request.execute(store_procedure, function (err, result) {
				dbConn.close()
				if (err) {
					console.log("Error while querying database :- " + err);
					res.json({ respuesta: 'error' })

				}
				else {
					productos = result[0]
					if (categorias.length > 0) {
						res.json({ respuesta: 'ok', productos })
					} else {
						res.json({ respuesta: 'error' })
					}
				}
			});
		}
	});
}
var executeSP_GET_Productos_By_Mesa = function (res, store_procedure, param) {
	var dbConn = new sql.Connection(dbConfig);
	dbConn.connect(function (err) {
		if (err) {
			console.log("Error while connecting database :- " + err);
			res.json({ respuesta: 'error' })
		}
		else {
			// create Request object
			var request = new sql.Request(dbConn);
			// query to the database
			request.input('Cod_Mesa', sql.NVarChar, param)
			request.execute(store_procedure, function (err, result) {
				dbConn.close()
				if (err) {
					console.log("Error while querying database :- " + err);
					res.json({ respuesta: 'error' })

				}
				else {
					productos_selec = result[0]
					res.json({ respuesta: 'ok', productos_selec })
				}
			});
		}
	});
}
var executeSP_GET_Mesas_Estado = function (res, store_procedure, param) {
	var dbConn = new sql.Connection(dbConfig);
	dbConn.connect(function (err) {
		if (err) {
			console.log("Error while connecting database :- " + err);
			res.json({ respuesta: 'error' })
		}
		else {
			var request = new sql.Request(dbConn);
			request.execute(store_procedure, function (err, result) {
				dbConn.close()
				if (err) {
					console.log("Error while querying database :- " + err);
					res.json({ respuesta: 'error' })
				}
				else {
					mesas = result[0]
					if (mesas.length > 0) {
						res.json({ respuesta: 'ok', mesas })
					} else {
						res.json({ respuesta: 'error' })
					}
				}
			});
		}
	});
}
var executeSP_Guardar_EstadoMesa = function (res, store_procedure, Cod_Mesa, Estado_Mesa, Cod_Vendedor) {
	var dbConn = new sql.Connection(dbConfig);
	dbConn.connect(function (err) {
		if (err) {
			console.log("Error while connecting database :- " + err);
			res.json({ respuesta: 'error' })
		}
		else {
			var request = new sql.Request(dbConn);
			request.input('Cod_Mesa', Cod_Mesa)
			request.input('Estado_Mesa', Estado_Mesa)
			request.input('Cod_Vendedor', Cod_Vendedor)
			console.log(Cod_Vendedor, Cod_Mesa, Estado_Mesa)
			request.execute(store_procedure, function (err, result) {
				dbConn.close()
				if (err) {
					console.log("Error while querying database :- " + err);
					res.json({ respuesta: 'error' })
				}
				else {
					console.log(result)
				}
			});
		}
	});
}
var executeSP_Guardar_Comanda = function (res, store_procedure, param) {
	var dbConn = new sql.Connection(dbConfig);
	dbConn.connect(function (err) {
		if (err) {
			console.log("Error while connecting database :- " + err);
			res.json({ respuesta: 'error' })
		}
		else {
			var request = new sql.Request(dbConn);
			request.input('Numero', param.Numero)
			request.input('Nom_Cliente', param.Nom_Cliente)
			request.input('Cod_Moneda', param.Cod_Moneda)
			request.input('Total', sql.Numeric(38, 2), param.Total)
			request.execute(store_procedure, function (err, result) {
				dbConn.close()
				if (err) {
					console.log("Error while querying database :- " + err);
					res.json({ respuesta: 'error' })
				}
				else {
					Numero = result[0][0].Numero
					//ImpresionNotaVenta(param, Numero)
					//Fin de Impresion
					executeSP_Guardar_EstadoMesa(res, 'USP_VIS_MESAS_GXEstado', param.Cod_Mesa, param.Estado_Mesa, param.Cod_Vendedor)
					executeSP_Guardar_Comanda_Detalle(res, 'USP_CAJ_COMPROBANTE_D_COMANDA_G', param.Productos, Numero, 0)
				}
			});
		}
	});
}
var executeSP_Guardar_Comanda_Detalle = function (res, store_procedure, productos, Numero, posicion) {
	var dbConn = new sql.Connection(dbConfig);
	dbConn.connect(function (err) {
		if (err) {
			console.log("Error while connecting database :- " + err);
			res.json({ respuesta: 'error' })
		}
		else {
			var request = new sql.Request(dbConn);
			request.input('Numero', Numero)
			request.input('id_Detalle', sql.Int, productos[posicion].Id_Detalle)
			request.input('Id_Producto', productos[posicion].Id_Producto)
			request.input('Cod_Almacen', productos[posicion].Cod_Almacen)
			request.input('Cantidad', productos[posicion].Cantidad)
			request.input('Descripcion', productos[posicion].Nom_Producto)
			request.input('PrecioUnitario', sql.Numeric(38, 6), productos[posicion].PrecioUnitario)
			request.input('Sub_Total', sql.Numeric(38, 2), parseFloat(productos[posicion].PrecioUnitario) * parseFloat(productos[posicion].Cantidad))
			request.input('Tipo', productos[posicion].Cod_TipoOperatividad)
			request.input('Obs_ComprobanteD', '')
			request.input('Cod_Mesa', productos[posicion].Cod_Mesa)
			request.input('Id_Referencia', sql.Int, productos[posicion].Id_Referencia || 0)
			request.input('Estado_Pedido', productos[posicion].Estado_Pedido)
			request.execute(store_procedure, function (err, result) {
				dbConn.close()
				if (err) {
					console.log("Error while querying database :- " + err);
					res.json({ respuesta: 'error' })
				}
				else {
					if (posicion + 1 == productos.length) {
						res.json({ respuesta: 'ok', Numero })
					} else {
						executeSP_Guardar_Comanda_Detalle(res, store_procedure, productos, Numero, posicion + 1)
					}

				}
			});
		}
	});
}

var executeSP_GET__DETALLE_Producto = function (res, store_procedure, param) {
	var dbConn = new sql.Connection(dbConfig);
	dbConn.connect(function (err) {
		if (err) {
			console.log("Error while connecting database :- " + err);
			res.json({ respuesta: 'error' })
		}
		else {
			// create Request object
			var request = new sql.Request(dbConn);
			// query to the database
			request.input('Id_Producto', sql.Int, param)
			request.execute(store_procedure, function (err, result) {
				dbConn.close()
				if (err) {
					console.log("Error while querying database :- " + err);
					res.json({ respuesta: 'error' })

				}
				else {
					productos_detalle = result[0]
					res.json({ respuesta: 'ok', productos_detalle })
				}
			});
		}
	});
}
var executeSP_GET_PRECIOS_PRODUCTO = function (res, store_procedure, param) {
	var dbConn = new sql.Connection(dbConfig);
	dbConn.connect(function (err) {
		if (err) {
			console.log("Error while connecting database :- " + err);
			res.json({ respuesta: 'error' })
		}
		else {
			// create Request object
			var request = new sql.Request(dbConn);
			// query to the database
			request.input('Id_Producto', sql.Int, param)
			request.execute(store_procedure, function (err, result) {
				dbConn.close()
				if (err) {
					console.log("Error while querying database :- " + err);
					res.json({ respuesta: 'error' })

				}
				else {
					precios = result[0]
					res.json({ respuesta: 'ok', precios })
				}
			});
		}
	});
}
var executeSP_LIBERAR_MESA = function (res, store_procedure, param) {
	var dbConn = new sql.Connection(dbConfig);
	dbConn.connect(function (err) {
		if (err) {
			console.log("Error while connecting database :- " + err);
			res.json({ respuesta: 'error' })
		}
		else {
			// create Request object
			var request = new sql.Request(dbConn);
			// query to the database
			request.input('Cod_Mesa', param.Cod_Mesa)
			request.input('Numero', param.Numero)
			request.execute(store_procedure, function (err, result) {
				dbConn.close()
				if (err) {
					console.log("Error while querying database :- " + err);
					res.json({ respuesta: 'error' })

				}
				else {
					resultado = result[0]
					executeSP_Guardar_EstadoMesa(res, 'USP_VIS_MESAS_GXEstado', resultado[0].Cod_Mesa, 'LIBRE', param.Cod_Vendedor)
					if (resultado.length > 0)
						res.json({
							respuesta: 'ok',
							Cod_Mesa: resultado[0].Cod_Mesa,
							Numero: resultado[0].Numero
						})
					else
						res.json({ respuesta: 'error' })
				}
			});
		}
	});
}
var executeSP_CANCELAR_PEDIDO_MESA = function (res, store_procedure, param) {
	var dbConn = new sql.Connection(dbConfig);
	dbConn.connect(function (err) {
		if (err) {
			console.log("Error while connecting database :- " + err);
			res.json({ respuesta: 'error' })
		}
		else {
			// create Request object
			var request = new sql.Request(dbConn);
			// query to the database
			request.input('Cod_Mesa', param.Cod_Mesa)
			request.input('Numero', param.Numero)
			request.execute(store_procedure, function (err, result) {
				dbConn.close()
				if (err) {
					console.log("Error while querying database :- " + err);
					res.json({ respuesta: 'error' })

				}
				else {
					res.json({
						respuesta: 'ok'
					})
				}
			});
		}
	});
}
function ImpresionComanda(param, Numero) {
	//Impresion de Comanda
	var printer = require("node-thermal-printer");
	printer.init({
		type: 'epson',
		interface: '//192.168.1.249/EPSON-TM-T20II',
		characterSet: 'SPAIN1',
	});
	//printer.setTypeFontB(); 
	printer.alignCenter()
	printer.bold(true);
	printer.setTextQuadArea();
	printer.println("MISKY")
	printer.bold(false);
	printer.setTextNormal();
	printer.drawLine();
	printer.println("Orden: " + Numero)
	printer.println("MESA : " + param.Cod_Mesa)
	printer.println("VENDEDOR : " + param.Cod_Vendedor)
	d = new Date()
	day = d.getDate(); month = d.getMonth() + 1; year = d.getFullYear()
	h = d.getHours(); m = d.getMinutes(); s = d.getSeconds()
	fecha_hora_actual = (day < 10 ? "0" + day : day) + "-" + (month < 10 ? "0" + month : month) + "-" + year + " " + (h < 10 ? "0" + h : h) + ":" + (m < 10 ? "0" + m : m) + ":" + (s < 10 ? "0" + s : s)

	printer.println(fecha_hora_actual)
	printer.newLine();
	printer.tableCustom([
		{ text: "Cant.", align: "LEFT", width: 0.15, bold: true },
		{ text: "Producto", align: "LEFT", width: 0.75, bold: true }
	]);

	printer.drawLine();
	printer.bold(false);

	for (i = 0; i < param.Productos.length; i++) {
		printer.tableCustom([
			{ text: param.Productos[i].Cantidad, align: "LEFT", width: 0.15 },
			{ text: param.Productos[i].Nom_Producto, align: "LEFT", width: 0.75 }
		]);
	}
	printer.cut();
	printer.execute(function (err) {
		if (err) {
			console.error("Print failed", err);
		} else {

			console.log("Print done");
		}
	});
}
function ImpresionNotaVenta(param, Numero) {
	//Impresion de Comanda
	var printer = require("node-thermal-printer");
	printer.init({
		type: 'epson',
		interface: '//192.168.1.249/EPSON-TM-T20II',
		characterSet: 'SPAIN1',
	});
	//printer.setTypeFontB(); 
	printer.alignCenter()
	printer.bold(true);
	printer.setTextQuadArea();
	printer.println("MISKY")
	printer.bold(false);
	printer.setTextNormal();
	printer.drawLine();
	printer.println("Orden: " + Numero)
	printer.println("MESA : " + param.Cod_Mesa)
	printer.println("VENDEDOR : " + param.Cod_Vendedor)
	d = new Date()
	day = d.getDate(); month = d.getMonth() + 1; year = d.getFullYear()
	h = d.getHours(); m = d.getMinutes(); s = d.getSeconds()
	fecha_hora_actual = (day < 10 ? "0" + day : day) + "-" + (month < 10 ? "0" + month : month) + "-" + year + " " + (h < 10 ? "0" + h : h) + ":" + (m < 10 ? "0" + m : m) + ":" + (s < 10 ? "0" + s : s)

	printer.println(fecha_hora_actual)
	printer.newLine();
	//Impresion de Nota de Venta
	printer.tableCustom([
		{ text: "Cant.", align: "LEFT", width: 0.15, bold: true },
		{ text: "Descripcion", align: "LEFT", width: 0.45, bold: true },
		{ text: "P.U", align: "LEFT", width: 0.10, bold: true },
		{ text: "SubT", align: "RIGHT", width: 0.25, bold: true }
	]);

	printer.drawLine();
	printer.bold(false);

	for (i = 0; i < param.Productos.length; i++) {
		//Impresion de Nota de Venta
		printer.tableCustom([
			{ text: param.Productos[i].Cantidad, align: "LEFT", width: 0.15 },
			{ text: param.Productos[i].Nom_Producto, align: "LEFT", width: 0.5 },
			{
				text: (param.Productos[i].PrecioUnitario).toFixed(2),
				align: "RIGHT", width: 0.15
			},
			{ text: (parseFloat(param.Productos[i].PrecioUnitario) * parseFloat(param.Productos[i].Cantidad)).toFixed(2), align: "RIGHT", width: 0.15 }
		]);
	}
	printer.drawLine();
	printer.alignRight();
	printer.println("Total: " + (param.Total).toFixed(2));
	printer.newLine();
	//printer.cut();
	printer.execute(function (err) {
		if (err) {
			console.error("Print failed", err);
		} else {

			console.log("Print done");
		}
	});
}
app.get('/', function (req, res) {
	res.send('running')
});
app.post('/api/photo', function (req, res) {
	upload(req, res, function (err) {
		if (err) {
			return res.end("Error uploading file." + err.message);
		}
		res.end("File is uploaded");
	});
});
app.post('/login_personal', function (req, res) {
	var user = (req.body.usuario).toUpperCase()
	var password = md5(req.body.password)
	executeStoreProc(res, null, 'USP_PRI_USUARIO_TXPK', { user, password })
})
app.post('/get_categorias_padre', function (req, res) {
	executeSP_GET_Categorias(res, 'USP_PRI_CATEGORIASPADRE', undefined)
})
app.post('/get_categorias_hijas', function (req, res) {
	var Cod_Categoria = req.body.Cod_Categoria
	executeSP_GET_Categorias(res, 'USP_PRI_CATEGORIASxCodCategoriaPadre', Cod_Categoria)
})
app.post('/get_categorias_todas', function (req, res) {
	executeSP_GET_Categorias(res, 'USP_PRI_CATEGORIASxTODAS', undefined)
})
app.post('/get_productos_by_categoria', function (req, res) {
	var Cod_Categoria = req.body.Cod_Categoria
	executeSP_GET_Productos(res, 'USP_PRI_PRODUCTOSxCodCategoria', Cod_Categoria)
})
app.post('/get_productos_todos', function (req, res) {
	executeSP_GET_Productos(res, 'USP_PRI_PRODUCTOSxTodos', undefined)
})
app.post('/get_mesas_estado', function (req, res) {
	executeSP_GET_Mesas_Estado(res, 'USP_VIS_MESAS_TT')
})
app.post('/hacer_pedido_sql', function (req, res) {
	const Cod_Mesa = req.body.Cod_Mesa
	const Productos = req.body.Productos
	const Cod_Moneda = req.body.Cod_Moneda
	const Numero = req.body.Numero
	const Nom_Cliente = req.body.Nom_Cliente
	const Total = req.body.Total
	const Estado_Mesa = req.body.Estado_Mesa
	const Cod_Vendedor = req.body.Cod_Vendedor

	executeSP_Guardar_Comanda(res, 'USP_CAJ_COMPROBANTE_PAGO_G_Comanda', { Cod_Mesa, Productos, Cod_Moneda, Numero, Nom_Cliente, Total, Cod_Vendedor, Estado_Mesa })


})
app.post('/confirmar_pedido_sql', function (req, res) {
	const Cod_Mesa = req.body.Cod_Mesa
	const Productos = req.body.Productos
	const Cod_Moneda = req.body.Cod_Moneda
	const Numero = req.body.Numero
	const Nom_Cliente = req.body.Nom_Cliente
	const Total = req.body.Total
	const Estado_Mesa = req.body.Estado_Mesa
	const Cod_Vendedor = req.body.Cod_Vendedor

	executeSP_Guardar_Comanda(res, 'USP_CAJ_COMPROBANTE_PAGO_G_Comanda', { Cod_Mesa, Productos, Cod_Moneda, Numero, Nom_Cliente, Total, Cod_Vendedor, Estado_Mesa })


})
app.post('/get_productos_by_mesa', function (req, res) {
	const Cod_Mesa = req.body.Cod_Mesa
	executeSP_GET_Productos_By_Mesa(res, 'USP_CAJ_COMANDA_TXCodMesa', Cod_Mesa)//USP_CAJ_COMPROBANTE_PAGO_TXCodMesa
})
app.post('/get_detalle_producto', function (req, res) {
	const Id_Producto = req.body.Id_Producto
	executeSP_GET__DETALLE_Producto(res, 'USP_PRI_PRODUCTO_DETALLE', Id_Producto)
})
app.post('/get_precios_producto', function (req, res) {
	const Id_Producto = req.body.Id_Producto
	executeSP_GET_PRECIOS_PRODUCTO(res, 'USP_PRI_PRODUCTOSxPrecios', Id_Producto)
})
app.post('/Liberar_Terminar_Mesa', function (req, res) {
	const Cod_Mesa = req.body.Cod_Mesa
	const Numero = req.body.Numero
	const Cod_Vendedor = req.body.Cod_Vendedor
	executeSP_LIBERAR_MESA(res, 'USP_CAJ_COMANDA_LIBERAR', {Cod_Mesa,Numero,Cod_Vendedor})
})
app.post('/Cancelar_Mesa_Pedido', function (req, res) {
	const Cod_Mesa = req.body.Cod_Mesa
	const Numero = req.body.Numero
	executeSP_CANCELAR_PEDIDO_MESA(res, 'USP_CAJ_COMANDA_CANCELAR_Pedido', {Cod_Mesa,Numero})
})




