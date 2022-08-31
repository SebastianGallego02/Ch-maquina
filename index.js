class Variable {
    #nombre;
    #tipo;
    #valor;

    get getValor() {
        return this.#valor;
    }
    get getNombre() {
        return this.#nombre;
    }
    set setValor(valor) {
        this.#valor = valor;
    }
    constructor(nombre, tipo, valor) {
        this.#nombre = nombre;
        this.#tipo = tipo;
        this.#valor = valor;
    }

}
class Etiqueta {
    #nombreE;
    #posicion;

    get getNombreEtiqueta() {
        return this.#nombreE
    }
    get getPosicion() {
        return this.#posicion;
    }
    constructor(nombre, posicion) {
        this.#nombreE = nombre;
        this.#posicion = posicion;
    }
}


/**
 * Variables necesarias para la ejecución del programa
 */
let programasACorrer = new Array();
let memoria = new Array();
let acumulador = 0;
let totalmemoria = 0;
let iterador = 0;
let iteradorparaMemoria = 0;
let filas = new Array();
let programaCorriendo = new Array();
let listaVariables = new Array();
let listaEtiquetas = new Array();
let espacioDisponible = 90;
let indice = 0;
let indiceAuxiliar = 0;
let sbs = false;
let nombreProgramas = new Array();


memoria.push(acumulador);

/*Escuchador de eventos */
document.getElementById('memoryInput').addEventListener('change', crearTablaMemoria, false);
document.getElementById('kernelInput').addEventListener('change', asignarATablaKernel, false);
document.querySelector('#archivo1').addEventListener('change', leerArchivo, false);
document.getElementById('iniciar-ejecucion').addEventListener('click', iniciarEjecucion);
document.getElementById('sbs').addEventListener('click', stepByStep);
document.getElementById('ocultar-memoria').addEventListener('click', ocultarMemoria);
document.getElementById('mostrar-programas').addEventListener('click', crearTablaProgramas);
document.getElementById('kernelInput').addEventListener('change', asignarValorIterador, false);
document.getElementById('FCFS').addEventListener('click', FCFS);
document.getElementById('SJF-Ne').addEventListener('click', sjfNoExp);

/**
 * 
 * Función encargada de la ejecución del programa
 */
function operaciones(filas, indice) {
    for (indice; indice < filas.length; indice++) {
        let linea = filas[indice].split(' ');
        let palabraClave = linea[0];
        palabraClave = palabraClave.toLowerCase();

        switch (palabraClave) {
            /* case 'nueva':
                 nueva(linea);
                 break;*/
            case 'cargue':
                if(sbs === true){
                    alert("Carga la variable al acumulador");
                }
                cargue(linea[1]);
                break;
            case 'almacene':
                if(sbs === true){
                    alert("Guarda el valor del acumulador en la variable");
                }
                almacene(linea[1]);
                break;
            case 'lea':
                if(sbs === true){
                    alert("Lee una nueva entrada y la asigna a la variable indicada");
                }
                lea(linea[1]);
                break;
            case 'sume':
                if(sbs === true){
                    alert("Adiciona al acumulador el valor que haya en la variable");
                }
                sume(linea[1]);
                break;
            case 'reste':
                if(sbs === true){
                    alert("sustrae al acumulador el valor que haya en la variable");
                }
                reste(linea[1]);
                break;
            case 'multiplique':
                if(sbs === true){
                    alert("multiplica al acumulador por el valor que haya en la variable");
                }
                multiplique(linea[1]);
                break;
            case 'divida':
                if(sbs === true){
                    alert("divide al acumulador por el valor que haya en la variable");
                }
                divida(linea[1]);
                break;
            case 'potencia':
                if(sbs === true){
                    alert("Eleva al acumulador a la potencia que haya en el valor de la variable");
                }
                potencia(linea[1]);
                break;
            case 'modulo':
                if(sbs === true){
                    alert("Se obtiene el módulo del acumulador con el valor de la variable seleccionada");
                }
                modulo(linea[1]);
                break;
            case 'concatene':
                if(sbs === true){
                    alert("Se concatena el valor del acumulador con el valor de la variable seleccionada");
                }
                concatene(linea[1]);
                break;
            case 'elimine':
                if (sbs == 1) {
                    alert("Elimina cualquier aparicion de un conjunto de caracteres de la cadena que haya en el acumulador");
                }
                elimine(linea[1]);
                break;
            case 'extraiga':
                if (sbs == 1) {
                    alert("Se extrae los caracteres dados de la cadena que se encuentre en el acumulador");
                }
                extraiga(linea[1]);
                break;
            case 'y':
                if (sbs == 1) {
                    alert("Se hace una condición lógica AND con las variables seleccionadas");
                }
                y(linea);
                break;
            case 'o':
                if (sbs == 1) {
                    alert("Se hace una condición lógica OR con las variables seleccionadas");
                }
                o(linea);
                break;
            case 'no':
                if (sbs == 1) {
                    alert("Se hace una condición lógica not con las variables seleccionadas");
                }
                no(linea);
                break;
            case 'muestre':
                if (sbs == 1) {
                    alert("Se muestra por pantalla el valor de la variable seleccionada");
                }
                muestre(linea);
                break;
            case 'imprima':
                if (sbs == 1) {
                    alert("Se imprime el valor de la variable seleccionada");
                }
                imprima(linea);
                break;
            case 'retorne':
                if (sbs == 1) {
                    alert("Se finaliza la ejecución del programa actual \n y se da paso a el siguiente programa cargado en memoria. Además se reestablece el acumulador, se muestra por pantalla y se imprime en la impresora el valor final del acumulador.");
                }
                retorne();
                return;
                break;
            case 'vaya':
                if (sbs == 1) {
                    alert("Se redirije la ejecución de la máquina hacia la etiqueta dada");
                }
                vaya(linea[1]);
                break;
            case 'vayasi':
                if (sbs == 1) {
                    alert("Valida las condiciones, y determina a cual etiqueta debe ir");
                }
                indice = vayasi(linea) - 1;
                break;
            /*case 'etiqueta':
                 etiqueta(linea);
                 break;*/
            case 'xxx':
                if (sbs == 1) {
                    alert("Te insulta gratuitamente");
                }
                XXX();
                break;
            default:
                break;
        }
    }
}

/**
 * Funcion encargada de chequear la sintáxis en busca de errores para luego hacer correctamente su ejecución 
 * en caso de encontrar errores no ejecuta el programa
 * @param {*} filas (Las filas del programa corriendo)  
 * 
 */
function chequeoSintaxis(filas){
    
    let error = false;
    for (let i = 0; i < filas.length; i++) {

        let palabra = filas[i].split(" ");
        
        
        if (palabra[0] == "cargue" || palabra[0] == "pare" || palabra[0] == "itere" ||
            palabra[0] == "almacene" || palabra[0] == "nueva" || palabra[0] == "lea" ||
            palabra[0] == "sume" || palabra[0] == "reste" || palabra[0] == "multiplique" ||
            palabra[0] == "divida" || palabra[0] == "potencia" || palabra[0] == "modulo" ||
            palabra[0] == "concatene" || palabra[0] == "elimine" || palabra[0] == "extraiga" ||
            palabra[0] == "Y" || palabra[0] == "y" || palabra[0] == "o" || palabra[0] == "O" || palabra[0] == "no" || 
            palabra[0] == "NO"|| palabra[0] == "muestre" || palabra[0] == "imprima" || 
            palabra[0] == "vaya" || palabra[0] == "vayasi" || palabra[0] == "etiqueta" ||
             palabra[0] == "xxx" || palabra[0] == "retorne") {
        }
        else {
            if (palabra[0] == null || palabra[0] == "" || palabra[0] == '//' || palabra[0] == " ") {

            }
            else {
                alert("Error en la linea numero: " + i);
                error = true;
            }
        }
    }
    return error;
}
/**
 * 
 *  Función que sirve para inicializar en el programa primero las variable y etiquetas antes de pasar a la ejecución
 */
 function variableYEtiquetas(filas) {
    filas.forEach(e => {
        let linea = e.split(' ');
        let palabraClave = linea[0];
        switch (palabraClave) {
            case 'nueva':
                if(sbs === true){
                    alert("Se crea una nueva variable");
                }
                nueva(linea);
                break;
            case 'etiqueta':
                if(sbs === true){
                    alert("Se crea una nueva Etiqueta");
                }
                etiqueta(linea);
                break;
        }
    });
    crearTablaVariables();
    crearTablaEtiquetas();
    
    
    operaciones(filas, indice);

    for (j = iteradorparaMemoria; j < memoria.length; j++) {
        let celda = document.getElementById(j);
        if(memoria[j] instanceof Variable){
            celda.innerText = memoria[j].getNombre;
        }else if(memoria[j] instanceof Etiqueta){
            celda.innerText = memoria[j].getNombreEtiqueta;
        }else{
            celda.innerText = memoria[j];
        }
        iteradorparaMemoria += 1;
        
    } 
}

//funcion auxiliar
function asignarValorIterador() {
    iterador = Number(document.getElementById('kernelInput').value);
}

/**
 * Crea la tabla para la memoria
 */
function crearTablaMemoria() {

    let totalPos = document.getElementById('memoryInput').value; //Capacidad total de la memoria
    let tablaMemoria = document.getElementById('memoria');
    let cuerpoTabla = document.createElement('tbody');


    for (totalmemoria; totalmemoria < Number(totalPos); totalmemoria++) {
        let fila = document.createElement('tr');
        let td = document.createElement('td');

        td.innerText = totalmemoria;
        fila.appendChild(td);

        td = document.createElement('td');
        td.setAttribute('id', totalmemoria);
        fila.appendChild(td);

        cuerpoTabla.appendChild(fila);
    }
    tablaMemoria.appendChild(cuerpoTabla);
}

/**
 * Crea la tabla para las variables
 */
function crearTablaVariables(){
    let totalPos = listaVariables.length;
    let tablaVariable = document.getElementById('tabla-variables');
    let cuerpoTabla = document.createElement('tbody');

    for(pos = 0; pos < totalPos; pos++){
        let fila = document.createElement('tr');
        let celda = document.createElement('td');

        celda.innerText = (buscarPosicionVariable(listaVariables[pos]))-1;
        fila.appendChild(celda);

        celda = document.createElement('td');
        celda.innerText = listaVariables[pos].getNombre; //no sé
        fila.appendChild(celda);

        cuerpoTabla.appendChild(fila);
    }
    tablaVariable.appendChild(cuerpoTabla); 
}
/**
 * Crea la tabla para las etiquetas
 */
function crearTablaEtiquetas(){
    let totalPos = listaEtiquetas.length;
    let tablaEtiqueta = document.getElementById('tabla-etiquetas');
    let cuerpoTabla = document.createElement('tbody');

    for(posE = 0; posE < totalPos; posE++){
        let fila = document.createElement('tr');
        let celda = document.createElement('td');

        celda.innerText = (buscarPosicionEtiqueta(listaEtiquetas[posE]))-1;
        fila.appendChild(celda);

        celda = document.createElement('td');
        celda.innerText = listaEtiquetas[posE].getNombreEtiqueta; 
        fila.appendChild(celda);

        cuerpoTabla.appendChild(fila);
    }
    tablaEtiqueta.appendChild(cuerpoTabla); 
}

function crearTablaProgramas(){
    let totalPos = programasACorrer.length;
    let tablaProgramas = document.getElementById('tabla-programas');
    let cuerpoTabla = document.createElement('tbody');


    for(posp = 0; posp < totalPos; posp++){
        let fila = document.createElement('tr');
        let celda = document.createElement('td');

        celda.innerText = (posp + 1);
        fila.appendChild(celda);
        
        celda = document.createElement('td');
        celda.innerText = nombreProgramas[posp]; 
        fila.appendChild(celda);

        cuerpoTabla.appendChild(fila);
    }
    tablaProgramas.appendChild(cuerpoTabla);
    document.getElementById('mostrar-programas').setAttribute('hidden', '');
}

/**
 * 
 * Busca la posición de la variable para asignarlo en la tabla de varibles correspondiente
 */
function buscarPosicionVariable(objetoVariable){
    let posicion = 0;
    for (i = 0; i < memoria.length; i++) {
        posicion += 1;
        if (objetoVariable === memoria[i]) {
            return posicion;
        }
    }
}

/**
 * 
 * Busca la posición de la etiqueta para asignarlo en la tabla de etiquetas correspondiente
 */
function buscarPosicionEtiqueta(objetoEtiqueta){
    let posicion = 0;
    for (i = 0; i < memoria.length; i++) {
        posicion += 1;
        if (objetoEtiqueta === memoria[i]) {
            return posicion;
        }
    }
}

/**
 * Asigna el espacio escogido por el usuario al Kernel
 */
function asignarATablaKernel() {
    let totalker = document.getElementById('kernelInput').value;
    for (j = 1; j <= Number(totalker); j++) {
        let celda = document.getElementById(j);
        celda.innerText = '*CHSO v2022*';
        iteradorparaMemoria += 1;
        memoria.push("*CHSO v2022*");
    }
}
/**
 * Función que sirve para poner en memoria el programa a correr
 * a su vez envía una copia a "programaCorriendo", para luego hacer uso de él
 * 
 */
function asignarDatosAMemoria(datos) {
    datos.forEach(element => memoria.push(element));
    datos.forEach(element => programaCorriendo.push(element));
}

/*Lee el archivo y envía sus respectivas tareas  */
function leerArchivo(e) {
    const archivo = e.target.files[0];

    if (!archivo) {
        return;
    }
    const lector = new FileReader();
    lector.onload = function (e) {
        //se termina de cargar el archivo    
        const contenido = e.target.result;
        filas = contenido.split(/\r?\n|\r/);
        programasACorrer.push(filas);
        document.getElementById('kernelInput').setAttribute('hidden', '');
        document.getElementById('memoryInput').setAttribute('hidden', '');
        espacioDisponible = document.getElementById('memoryInput').value - document.getElementById('kernelInput').value;
        if(filas.length > espacioDisponible){
            alert('No hay espacio disponible');
            return;
        }
       
    }
    lector.readAsText(archivo);
    nombreProgramas.push(archivo.name);

}

function iniciarEjecucion(){

    for(ignite = 0; ignite < programasACorrer.length; ignite++){
        filas = programasACorrer[ignite];
        if(chequeoSintaxis(filas)){
            alert('sixtáxis errónea, por tanto no se ejecutará el programa');
            return;
        }
        if(filas.length > espacioDisponible){
            alert('No hay espacio disponible');
            return;
        }
      
        asignarDatosAMemoria(filas);
        variableYEtiquetas(filas); //Manda un array con cada posicion como una de las lineas leidas 

    }

}

/**
 * 
 * Crea una nueva variable (objeto) y lo pone en una linea de memoria y en listaVariables
 */
function nueva(linea) {

    let nuevaVariable;
    let tipo = linea[2].toUpperCase();
    switch (linea.length) {
        case 3:
            if (tipo === 'I' || tipo === 'R' || tipo === 'L') {
                nuevaVariable = new Variable(linea[1], tipo, 0);
            } else if (tipo === 'C') {
                nuevaVariable = new Variable(linea[1], tipo, '');
            } else {
                return;
            }
            memoria.push(nuevaVariable);
            listaVariables.push(nuevaVariable);
            break;
        case 4:
            if (tipo === 'I' || tipo === 'R' || tipo === 'L') {
                nuevaVariable = new Variable(linea[1], tipo, Number(linea[3]));
            } else {
                nuevaVariable = new Variable(linea[1], tipo, linea[3]);
            }
            memoria.push(nuevaVariable);
            listaVariables.push(nuevaVariable);
            break;
        default:
            nuevaVariable = new Variable(linea[1], tipo, linea[3]);
            for (i = 4; i < linea.length; i++) {
                nuevaVariable.setValor = nuevaVariable.getValor.concat(' ').concat(linea[i]);
            }
            memoria.push(nuevaVariable);
            listaVariables.push(nuevaVariable);
            break;
    }
}

/*Asigna al acumulador la variable que encuentre con el nombre que se le pase */
function cargue(nombreVariable) {

    for (i = 0; i < listaVariables.length; i++) {
        if (nombreVariable === listaVariables[i].getNombre) {

            acumulador = listaVariables[i].getValor;
            document.getElementById('acumulador-text').innerText = acumulador;
            memoria[0] = acumulador;
            document.getElementById("0").innerText = 'acumulador = '+ acumulador;
            return;
        }
    }
}

/**
 * 
 * Guarda en la varible indicada el valor que haya en el acumulador
 */
function almacene(nombreVariable) {
    for (i = 0; i < listaVariables.length; i++) {
        if (nombreVariable === listaVariables[i].getNombre) {
            listaVariables[i].setValor = acumulador;
            return;
        }
    }
}

/**
 * 
 * lee un valor ingresado por el usuario y lo asigna a la variable indicada
 */
function lea(nombreVariable) {
    let newVariable = parseInt(prompt("Ingrese el valor para la nueva variable: "));
    for (i = 0; i < listaVariables.length; i++) {
        if (nombreVariable === listaVariables[i].getNombre) {
            listaVariables[i].setValor = newVariable;
            return;
        }
    }
}

/**
 * suma el valor que haya en la variable indicada, al acumulador
 * 
 */
function sume(nombreVariable) {
    for (i = 0; i < listaVariables.length; i++) {
        if (nombreVariable === listaVariables[i].getNombre) {
            acumulador = acumulador + listaVariables[i].getValor;
            document.getElementById('acumulador-text').innerText = acumulador;
            document.getElementById("0").innerText = 'acumulador = '+ acumulador;
            return;
        }
    }
}
/**
 * 
 * resta el valor que haya en la variable indicada, al acumulador
 */
function reste(nombreVariable) {
    for (i = 0; i < listaVariables.length; i++) {
        if (nombreVariable === listaVariables[i].getNombre) {
            acumulador = acumulador - listaVariables[i].getValor;
            document.getElementById('acumulador-text').innerText = acumulador;
            document.getElementById("0").innerText = 'acumulador = '+ acumulador;
            console.log(acumulador);
            return;
        }
    }
}
/**
 * 
 * multiplica el valor que haya en la variable indicada, al acumulador
 */
function multiplique(nombreVariable) {
    for (i = 0; i < listaVariables.length; i++) {
        if (nombreVariable === listaVariables[i].getNombre) {
            acumulador = acumulador * listaVariables[i].getValor;
            document.getElementById('acumulador-text').innerText = acumulador;
            document.getElementById("0").innerText = 'acumulador = '+ acumulador;
            return;
        }
    }
}

/**
 * 
 * divide el valor que haya en la variable indicada, al acumulador
 */
function divida(nombreVariable) {
    for (i = 0; i < listaVariables.length; i++) {
        if (nombreVariable === listaVariables[i].getNombre) {
            if (memoria[i].getValor != 0) {
                acumulador = acumulador / listaVariables[i].getValor;
                document.getElementById('acumulador-text').innerText = acumulador;
                document.getElementById("0").innerText = 'acumulador = '+ acumulador;
                return;
            }
        }
    }
}
/**
 * 
 * eleva el acumulador al valor que haya en la variable indicada
 */
function potencia(nombreVariable) {
    for (i = 0; i < listaVariables.length; i++) {
        if (nombreVariable === listaVariables[i].getNombre) {
            acumulador = acumulador ^ listaVariables[i].getValor;
            document.getElementById('acumulador-text').innerText = acumulador;
            document.getElementById("0").innerText = 'acumulador = '+ acumulador;
            return;
        }
    }
}

/**
 * 
 * Saca el residuo de la división indicada por la variable y el acumulador
 */
function modulo(nombreVariable) {
    for (i = 0; i < memoria.length; i++) {
        if (nombreVariable === listaVariables[i].getNombre) {
            acumulador = acumulador % listaVariables[i].getValor;
            document.getElementById('acumulador-text').innerText = acumulador;
            document.getElementById("0").innerText = 'acumulador = '+ acumulador;
            console.log(acumulador);
            return;
        }
    }
}

/**
 * 
 * Concatena el valor que haya en la variable a lo que ya tenga el acumulador
 */
function concatene(nombreVariable) {
    for (i = 0; i < memoria.length; i++) {
        if (nombreVariable === listaVariables[i].getNombre) {
            acumulador = acumulador.concat(listaVariables[i].getValor);
            document.getElementById('acumulador-text').innerText = acumulador;
            document.getElementById("0").innerText = 'acumulador = '+ acumulador;
            return;
        }
    }
}

/**
 * 
 * Función que elimina cualquier aparición de una subcadena en la cadena que haya en el acumulador
 */
function elimine(nombreVariable) {
    let cadenaAEliminar = '';
    let cadenaFinal = '';
    let ocurrencias = 0;
    for (i = 0; i < listaVariables.length; i++) {

        if (nombreVariable === listaVariables[i].getNombre) {
            cadenaAEliminar = listaVariables[i].getValor;
            ocurrencias = contarOcurrencias(acumulador, cadenaAEliminar);
            cadenaFinal = acumulador.replace(cadenaAEliminar, '');

            for (j = 0; j <= ocurrencias; j++) {
                cadenaFinal = cadenaFinal.replace(cadenaAEliminar, '');
            }

            acumulador = cadenaFinal;
            document.getElementById('acumulador-text').innerText = acumulador;
            document.getElementById("0").innerText = 'acumulador = '+ acumulador;
            return;
        }
    }
}

/**
 * Función auxiliar para la función de "elimine()"
 */
function contarOcurrencias(texto, subcadena) {
    if (!subcadena.length) {
        return 0;
    }

    let resultado = subcadena.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    return (texto.match(new RegExp(resultado, 'gi')) || []).length;
}

function extraiga(nombreVariable) {
}

/**
 * 
 * Hace una operación lógica "and" entre dos variables y el resultado lo asigna a una tercera
 */
function y(linea) {
    let variable1;
    let variable2;
    let answerlogic;

    //Se buscan las variables
    listaVariables.forEach(e => {
        if (e.getNombre === linea[1]) {
            variable1 = e;
        } else if (e.getNombre == linea[2]) {
            variable2 = e;
        } else if (e.getNombre == linea[3]) {
            answerlogic = e;
        }
    });

   
    if(variable1.getValor == 1 && variable2.getValor == 1){
        answerlogic.setValor = 1;
    }else if(variable1.getValor == 0 && variable2.getValor == 1){
        answerlogic.setValor = 0;
    }else if(variable1.getValor == 1 && variable2.getValor == 0){
        answerlogic.setValor = 0;
    }else if(variable1.getValor == 0 && variable2.getValor == 0){
        answerlogic.setValor = 1;
    }
    return;
}

/**
 * 
 * Hace una operación lógica "or" entre dos variables y el resultado lo asigna a una tercera
 */
function o(linea) {
    let variable1;
    let variable2;
    let answerlogic;

    //Se buscan las variables
    listaVariables.forEach(e => {
        if (e.getNombre === linea[1]) {
            variable1 = e;
        } else if (e.getNombre == linea[2]) {
            variable2 = e;
        } else if (e.getNombre == linea[3]) {
            answerlogic = e;
        }
    });

    if(variable1.getValor == 1 || variable2.getValor == 1){
        answerlogic.setValor = 1;
    }else if(variable1.getValor == 0 || variable2.getValor == 1){
        answerlogic.setValor = 1;
    }else if(variable1.getValor == 1 || variable2.getValor == 0){
        answerlogic.setValor = 1;
    }else if(variable1.getValor == 0 || variable2.getValor == 0){
        answerlogic.setValor = 0;
    }

    
   
    return;
}

/**
 * 
 * Hace una operación lógica "not" entre dos variables y el resultado lo asigna a una tercera
 */
function no(linea) {
    let variable1;
    let variable2;
    

    //Se buscan las variables
    listaVariables.forEach(e => {
        if (e.getNombre === linea[1]) {
            variable1 = e;
        } else if (e.getNombre == linea[2]) {
            variable2 = e;
        }
    });
S
    if(variable1.getValor == 1){
        variable2.setValor = 0;
    }else{
        variable2.setValor = 1;
    }
    
    return;
}

/**
 * 
 * Muestra por pantalla lo que se le pida
 */
function muestre(linea) {
    let texto = "";
    for (i = 0; i < listaVariables.length; i++) {
        if (linea[1] === listaVariables[i].getNombre) {
            texto = document.getElementById('computador').textContent;
            texto += '\nLa variable: "'
            + listaVariables[i].getNombre + '" tiene valor de: "' 
            + listaVariables[i].getValor + '" \n';
            document.getElementById('computador').innerHTML = texto
            return;
        }else if(linea[1] === 'acumulador'){
            texto = document.getElementById('computador').textContent
            texto = '\nAcumulador: "'+ acumulador + '"\n';
            document.getElementById('computador').innerHTML = texto;
            return;
        }
    }
}

/**
 * 
 * Imprime lo que se le pida
 */
function imprima(linea) {
let texto = "";
    for (i = 0; i < listaVariables.length; i++) {
        if (linea[1] === listaVariables[i].getNombre) {
           texto = document.getElementById('impresora').textContent;
           texto += '\nLa variable: "'
            + listaVariables[i].getNombre + '" tiene valor de: "' 
            + listaVariables[i].getValor + '"\n';
            document.getElementById('impresora').innerHTML = texto;
            return;
        }else if(linea[1] === 'acumulador'){
            texto = document.getElementById('impresora').textContent
            texto += '\nAcumulador: "'+ acumulador +'"\n'
            document.getElementById('impresora').innerHTML = texto;
            return;
        }
    }

}

/**
 * 
 *  Regresa las variables usadas a un valor apto para comenzar a ejecutar un nuevo programa
 * y envía una alerta para saber que terminó el programa
 */
function retorne(){
    espacioDisponible -= programaCorriendo.length;
    programaCorriendo = [];
    listaVariables = [];
    listaEtiquetas = [];
    indice = 0;
    acumulador = undefined;

    alert('Fin del programa: "' + (ignite + 1) + '."');
    return;
}

/**
 * 
 * Función que envía al programa la instrucción indicada sin condición 
 */
function vaya(nombreEti) {
    for (i = 1; i < memoria.length; i++) {
        if (nombreEti === memoria[i].getNombreEtiqueta) {
            indice = (Number(memoria[i].getPosicion) - 1);
            
            return;
        }
    }
}

/**
 * 
 * Envía la ejecución del programa a la linea indicada en la etiqueta correspondiente, 
 * si el acumulador es > 0 entonces se va por la primera etiqueta
 * si el acumulador es < 0 entonces se va por la segunda etiqueta
 * si el acumulador es = 0 entonces sigue la ejecución en la instrucción siguiente
 *  
 */
function vayasi(linea) {
    if (acumulador > 0) {
        for (i = 0; i < programaCorriendo.length; i++) {
            if (linea[1] === listaEtiquetas[i].getNombreEtiqueta) {
                console.log(listaEtiquetas[i])
              indice = (Number(listaEtiquetas[i].getPosicion) - 1);
                return indice;
            }
        }
    } else if (acumulador < 0) {
        for (i = 1; i < programaCorriendo.length; i++) {
            if (linea[2] === listaEtiquetas[i].getNombreEtiqueta) {
                indice = (Number(listaEtiquetas[i].getPosicion) - 1);
               
                return indice;
            }
        }
    } else {
        let lineaAux = new Array();
        for (i = 1; i < programaCorriendo.length; i++) {
            lineaAux = programaCorriendo[i].split(' ');
            if (linea[0] === lineaAux[0] && linea[1] === lineaAux[1] && linea[2] === lineaAux[2]){
                indice = i + 1;
                return indice;
            }
    }
    }
}
/**
 * Esta función te regala un insulto bastante curioso por pantalla
 */
 function XXX() {
    let texto = "";

    texto = document.getElementById('computador').textContent;

            texto += 'バカ \n';
            document.getElementById('computador').innerHTML = texto;


}
/**
 * 
 * función que crea una etiqueta (tipo objeto Etiqueta) 
 */
function etiqueta(linea) {
    let etiqueta = new Etiqueta(linea[1], linea[2]);
    memoria.push(etiqueta);
    listaEtiquetas.push(etiqueta);
}

function ocultarMemoria(){
    
    let element = document.getElementById('memoria');
    let elementStyle = window.getComputedStyle(element);

    let elementVisibilidad = elementStyle.getPropertyValue('visibility');
    console.log(elementVisibilidad);
    if(elementVisibilidad == "visible"){
        document.getElementById('memoria').style.visibility = "hidden"; 
    }else{
        document.getElementById('memoria').style.visibility = "visible"; 
    }
}

/**
 * Función que muestra un mensaje cada que ejecuta una linea
 */
function stepByStep(){
    sbs = true;

    iniciarEjecucion();

}
/**
 * Algoritmo de planificación de procesos Shortest Job First (En su modalidad No expropiativa)
 */
function sjfNoExp(){

    programasACorrer.sort();

    iniciarEjecucion();
}
/**
 * Algoritmo de planificación de procesos que ejecuta el primero que llega, y así en sucesión.
 */
function FCFS() {
    iniciarEjecucion();
}
