var App = {
	db: null,
	initialize:function(){
		document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
	},
	//Metodo handler
	onDeviceReady:function(){
		//this.dataBase();
		this.insertValues();
	},
	dataBase:function(){		
		this.db = window.openDatabase("dbWhohit", "1.0", "dbWhohit", 1000000);
		App.db.transaction(function(tx){
			tx.executeSql('CREATE TABLE IF NOT EXISTS usuario (email,senha,nome,data_nascimento,cpf,endereco,bairro,cidade,estado)');
		});
	},
	insertValues:function(){
		document.getElementById('proximo').addEventListener('click', function(){
			var addDados = 'INSERT INTO usuario (email,senha,nome,data_nascimento,cpf,endereco,bairro,cidade,estado) VALUES ("' + document.getElementById('email').value + '","' + document.getElementById('senha').value + '","' + document.getElementById('nome').value +
					'","' + document.getElementById('data_nascimento').value + '","' + document.getElementById('cpf').value + '","' + document.getElementById('endereco').value + '","' + document.getElementById('bairro').value + '","' + document.getElementById('cidade').value + 
					'","' + document.getElementById('estado').value +'")';
			App.dataBase();
			App.db.transaction(function(tx){
				tx.executeSql(addDados);
			});
		}, false);
	}
	/*
		$(document).ready( function(){			
            document.addEventListener("deviceready", function () {
            	console.log("6");
                var db = window.openDatabase("dbWhohit", "1.0", "dbWhohit", 1000000);
                //var db = window.sqlitePlugin.openDatabase("dbWhohit", "1.0", "dbWhohit", 1000000);
                //db.transaction(populateDB, TxErrorCB);
            }, false); 
            console.log("2");
            function QuerySuccessCB(Tx, results) {            	
        		console.log("3");
                for(var i=0;i<results.rows.length;i++){
                	alert(".id = " + results.rows.item(i).id + " .data = "+results.rows.item(i).data);
            	}
            }
            function populateDB(tx) {
        		console.log("4");
                //tx.executeSql('DROP TABLE IF EXISTS usuario');
                tx.executeSql('CREATE TABLE IF NOT EXISTS usuario (email,senha,nome,data_nascimento,cpf,endereco,bairro,cidade,estado)');
                var test22 = 'INSERT INTO usuario (email,senha,nome,data_nascimento,cpf,endereco,bairro,cidade,estado) VALUES ("' + document.getElementById('email').value + '","' + document.getElementById('senha').value + '","' + document.getElementById('nome').value +
					'","' + document.getElementById('data_nascimento').value + '","' + document.getElementById('cpf').value + '","' + document.getElementById('endereco').value + '","' + document.getElementById('bairro').value + '","' + document.getElementById('cidade').value + 
					'","' + document.getElementById('estado').value +'")';
				tx.executeSql(test22);
                //tx.executeSql('INSERT INTO usuario (id, data) VALUES (2, "Second row")');
                //tx.executeSql('INSERT INTO usuario (email,senha,nome,data_nascimento,cpf,endereco,bairro,cidade,estado) VALUES (3, "Third one")');
                //tx.executeSql('SELECT * FROM usuario', [], QuerySuccessCB);
            }
            function TxErrorCB() {
        		console.log("5");
                console.log("Error processing SQL!");
            }           
        	console.log("7");
		});*/
}
App.initialize();
