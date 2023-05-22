
function encriptar(traduccion){

    // seleccionamos y removemos del id warning el atributo style, esto para dejarlo por defecto.
    document.querySelector("#warning").removeAttribute("style");

    // obtenemos el valor de nuestro textarea por medio del querySelector
    var textarea = document.querySelector("#texto");

    // capturamos el valor del textarea con la propiedad value para poder utilizar el texto a futuro.
    const texto = textarea.value;

    // instanciamos los demás id que faltan para manipularlos más adelante.
    var area_default = document.querySelector("#default");
    var area_result = document.querySelector("#result");
    var texto_out = document.querySelector("#texto_out");

    //  En esta condicion se comprueba si el texto esta vacio, y lo que se dice es que si el texto es diferente de vaciorealizar las siguientes sentencias.

    if (texto != ""){

        var out = "";

        for(var i=0; i < texto.length; i++){


            /* por la tabla de valores ASCII verificamos que si hay caracteres menores al valor de a=(98) 
            o mayores a z=(122) y que estos a su vez sean diferentes de vacio, si esto es asi se procede 
            a capturar el id warning de nuestro css y retornar la función tal y como esta quedo. */

            if(((texto[i] < 'a') || (texto[i] > 'z')) && (texto[i] != ' ')){
                document.querySelector("#warning").style.color = "red";
                document.querySelector("#warning").style.fontSize = "16px";
                return;

            /* en este condicional evaluamos que la cadena de caracteres no sean un espacio, 
            por eso comprobamos diciendo que si la longitud del texto es 1 y el texto es igual a 
            un espacio en blanco, se cumple esta primera condición por lo tal procederiamos a detener
            la función en este momento, de no ser el caso se ejecuta la siguient condición.
            

            texto.replace(/ /g, ""): Esto utiliza el método replace de JavaScript para reemplazar todos los 
            espacios en blanco en la cadena texto con una cadena vacía. La expresión / /g es una expresión 
            regular que encuentra todos los espacios en blanco en la cadena y el segundo argumento "" especifica 
            que deben ser reemplazados por una cadena vacía.
            
            || == "": Esto compara el resultado de la operación anterior con 
            una cadena vacía. Si la cadena original texto solo estaba compuesta por espacios en blanco, 
            entonces después de reemplazar todos los espacios por una cadena vacía, el resultado también 
            será una cadena vacía. Por lo tanto, la comparación == "" devuelve true.

            En resumen, la expresión se utiliza para verificar si una cadena texto contiene solo espacios en
            blanco, sin ningún otro carácter. Devolverá true si la cadena texto está compuesta únicamente por 
            espacios en blanco y false en caso contrario. Esto puede ser útil para validar o realizar algún 
            tipo de lógica basada en el contenido de la cadena de texto.*/

            } else if((texto.length == 1 && texto == " ") || texto.replace(/ /g, "") == ""){
                area_default.classList.remove("invisible");
                area_result.classList.add("invisible");
                return;

            }

            // var traduccion = {"a": "ai", 
            // "e": "enter", 
            // "i": "imes", "o": 
            // "ober", 
            // "u": "ufat"};

            if(texto[i] == 'a'){
                out += traduccion["a"] ;

            } else if(texto[i] == 'e'){
                out += traduccion["e"];

            } else if(texto[i] == 'i'){
                out += traduccion["i"]; 

            }   else if(texto[i] == 'o'){
                out += traduccion["o"]; 

            } else if(texto[i] == 'u'){
                out += traduccion["u"]; 

            } else{
                out += texto[i];
            }
        }

        /* una vex teniendo las anteiores codiciones listas, pasaremos a mostrar nuestro textarea */

        area_default.classList.add("invisible");
        area_result.classList.remove("invisible");
        texto_out.innerHTML = out;
    }

    return

}


function desencriptar(traduccion){

    document.querySelector("#warning").removeAttribute("style");
    var textarea = document.querySelector("#texto");
    var texto = textarea.value;
    var area_default = document.querySelector("#default");
    var area_result = document.querySelector("#result");
    var texto_out = document.querySelector("#texto_out");

    /* A continuación hacemos las validaciones para que el texto ingresado no est vacio, 
    o contenga simbolos o mayusculas */

    if (texto != ""){

        for(var i=0; i < texto.length; i++){

            if(((texto[i] < 'a') || (texto[i] > 'z')) && (texto[i] != ' ')){

                document.querySelector("#warning").style.color = "red";
                document.querySelector("#warning").style.fontSize = "16px";
                return;

            } else if((texto.length == 1 && texto == " ") || texto.replace(/ /g, "") == ""){

                area_default.classList.remove("invisible");
                area_result.classList.add("invisible");
                return;

            }
        }

        /* si lo anterior no se cumple colocaremos el texto que dice no hay ningun mensaje invisible por
        medio de la clase invisible, y el textarea que tiene el invisible por defecto pasara a ser visible */

        area_default.classList.add("invisible");
        area_result.classList.remove("invisible");


        /* ahora vamos a reasignar nuevos valores a texto por el metodo replace creamos una nueva regular 
        expresion o expresion regular, y a esta le asignamos dos valores, el primero es el texto que buscamos
        encontrar, la -g- que es el segundo valor dice que vamos a reemplazar todos los valores que haya
        y no solo el primero como el caso de la -i-, el tercer valor final es el valor que buscamos asignar*/

        texto = texto.replace(new RegExp(traduccion["a"], "g"), "a");
        texto = texto.replace(new RegExp(traduccion["e"], "g"), "e");
        texto = texto.replace(new RegExp(traduccion["i"], "g"), "i");
        texto = texto.replace(new RegExp(traduccion["o"], "g"), "o");
        texto = texto.replace(new RegExp(traduccion["u"], "g"), "u");


        /* por ultimo le decimos a nuestro textarea con id text_out que ya no sera el texto que tenieamos
        previamente encriptado si no que ahora estará desencriptado */
        texto_out.innerHTML = texto;

    }

    return
}



/* creamos la funcion clipboard o copiar  */
function clipboard(){

    /* ahora por medio de la api del navegador utilizamos la funcion de portapapeles
    o clibboard y escribimos texto que tengo como valor nuestro id text_out que en este 
    caso es el textarea que nos toma el valor que tiene */
    const texto_out = document.querySelector("#texto_out");
    navigator.clipboard.writeText(texto_out.value);

}

const enc = document.querySelector('#enc');
const des = document.querySelector('#des');
const copy = document.querySelector('#copiar');


//  definimos el objeto que tiene las traducciones de las encriptaciones
var traduccion = {"a": "ai", 
"e": "enter", 
"i": "imes", 
"o": "ober", 
"u": "ufat"};


/* ahora para cada funcion de boton creada anteriormente vamos a crear un evento que 
se llama, a cada evento se le asigna un nombre, en este caso es click, y a este mismo se le asigna una función
sin nombre, y pasamos con sentencias las funciones creadas anteiormente esto para que al darle el click al
determinado boton con el id enc, des o copy pase le que el evento dicta respectivamente. */
enc.addEventListener( 'click', function() {encriptar(traduccion);} );
des.addEventListener( 'click', function() {desencriptar(traduccion);} );
copy.addEventListener( 'click', function() {clipboard();} );