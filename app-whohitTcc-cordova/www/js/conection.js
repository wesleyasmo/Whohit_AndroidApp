var App = {
	db: null,
	initialize:function(){
		document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
	},
	//Metodo handler
	onDeviceReady:function() {
	    this.createDatabase();
        document.getElementById('proximo').addEventListener('click', App.insertValues);
        document.getElementById('btnEntrar').addEventListener('click', App.newLogin);
    }
	,
    createDatabase: function(){
	    App.db = window.openDatabase("dbWhohit", "1.0", "dbWhohit", 1000000);
        this.db.transaction(function(tx){
            tx.executeSql('CREATE TABLE IF NOT EXISTS usuario (email,senha,nome,data_nascimento,cpf unique,endereco,bairro,cidade,estado)');
        });
    },
    newLogin:function(){
        App.db.transaction(function (tx){
            var ssql = "select * from usuario where email = '" + document.getElementById('loginUser').value + "' AND senha = '"+ document.getElementById('loginSenha').value +"'";
            alert(ssql);
            tx.executeSql(ssql, [], function (tx, result) {
                if(result.rows.length) {
                    document.getElementById('txtNome').value = result.rows[0].nome;
                    document.getElementById('txtEmail').value = result.rows[0].email;
                    document.getElementById('txtEndereco').value = result.rows[0].endereco;
                    document.getElementById('txtBairro').value = result.rows[0].bairro;
                    document.getElementById('txtCidade').value = result.rows[0].cidade;
                    document.getElementById('txtEstado').value = result.rows[0].estado;
                    console.log(result);
                    $.mobile.changePage("#pageHome");
                }
                else{
                    alert("A porra do login ou senha nao bate karalho");
                }
            });
        });
    },
	insertValues:function() {
	    var addDados = 'INSERT INTO usuario (email,senha,nome,data_nascimento,cpf,endereco,bairro,cidade,estado) VALUES ("' + document.getElementById('email').value + '","' + document.getElementById('senha').value + '","' + document.getElementById('nome').value +
            '","' + document.getElementById('data_nascimento').value + '","' + document.getElementById('cpf').value + '","' + document.getElementById('endereco').value + '","' + document.getElementById('bairro').value + '","' + document.getElementById('cidade').value +
            '","' + document.getElementById('estado').value + '")';
	    App.db.transaction(function (tx){
	        tx.executeSql(addDados);
            tx.executeSql("select * from usuario where cpf = '" + document.getElementById('cpf').value + "'", [], function (tx, result) {
                document.getElementById('txtNome').value = result.rows[0].nome;
                document.getElementById('txtEmail').value = result.rows[0].email;
                document.getElementById('txtEndereco').value = result.rows[0].endereco;
                document.getElementById('txtBairro').value = result.rows[0].bairro;
                document.getElementById('txtCidade').value = result.rows[0].cidade;
                document.getElementById('txtEstado').value = result.rows[0].estado;
                console.log(result);
            });
        });
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
