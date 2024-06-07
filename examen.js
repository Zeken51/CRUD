'use strict';


const dialog = document.querySelector("dialog");
const close_dialog = document.querySelector("#close-dialog");
const add_register = document.querySelector("#add-register");
const arrCatalogue = ["herramienta","material","liquido"];

function change_cat(art){
    let catalogue = "";

    if(art==="desarrmador"||art==="taladro"||art==="martillo"||art==="mazo"||art==="llave"){
        catalogue = "herramienta";
       }else if(art==="aceite"||art==="anticongelante"||art==="lubricante"||art==="pintura"){
        catalogue = "liquido";
       }else{
        catalogue = "otro";
    }

    return catalogue;

}

function addSku(){
    const art = document.getElementById("article").value;
    const price = document.getElementById("price").value;
    let catalogue = "";
    let list = localStorage.getItem("list");
    let inddex=-1;


   if(art==="desarrmador"||art==="taladro"||art==="martillo"||art==="mazo"||art==="llave"||art==="perica"){
    catalogue = "herramienta";
   }else if(art==="aceite"||art==="anticongelante"||art==="lubricante"||art==="pintura"){
    catalogue = "liquido";
   }else{
    catalogue = "otro";
   }

    
    if(list === null){
        list=[];
    }else{
        list=JSON.parse(list);
    }

    for (let index = 0; index < list.length; index++) {
        if(list[index].art===art){
            inddex=index;
            break;
        }
    }

    if(inddex===-1){
        list.push({art:art, price:price, catalogue:catalogue})
    }else{
        list[inddex].price=price;
    }

    localStorage.setItem("list",JSON.stringify(list));

    show_registers();
    clear_var();
    catalogue = "";
    dialog.close();

}

function show_registers(){

    let list = localStorage.getItem("list");
    let tableList = document.getElementById("tableContent");

    if(list === "[]"){
        tableList.innerHTML="<tr class='table-no-registers'><th colspan='4'>SIN REGISTROS</th></tr>";
    }else{
        list=JSON.parse(list);
        let table = "<tr class='table-id'><td>ID</td><td>Articulo</td><td>Precio</td><td>Catalogo</td><td>Accion</td><tr></span>"
        list.forEach(function(name,index){
            table+= "<tr class='table-registers'><td>"+(index+1)+"</td><td>"+name.art+"</td><td>"+name.price+"</td><td>"+name.catalogue+"</td><td><button class='button-delete' onclick='deleteArt("+index+")'>Eliminar</button> <button class='button-modify' onclick='updateArt("+index+")'>Modificar</button></td><tr>"
        });

        tableList.innerHTML=table;
    }

}

function clear_var(){
    document.getElementById("article").value = "";
    document.getElementById("price").value = "";
}

function updateArt(index){
    let list = JSON.parse(localStorage.getItem("list"));
    let name=list[index];
    const updateArt = prompt("Actualizar el nombre:",name.art);
    const updatePrice = prompt("Actualizar precio:",name.price);    


    if(updateArt != null && updatePrice != null){
        list[index].art=updateArt;
        list[index].price=updatePrice;
        list[index].catalogue = change_cat(list[index].art);
        localStorage.setItem("list",JSON.stringify(list));
        show_registers();
        clear_var();
    } 

}


function deleteArt(index){
    let list = JSON.parse(localStorage.getItem("list"));
    list.splice(index,1);
    localStorage.setItem("list",JSON.stringify(list));
    show_registers();
    clear_var();
}


add.addEventListener('click',function(){
    dialog.showModal();
});

close_dialog.addEventListener('click',function(){
    dialog.close();
});

show.addEventListener('click',show_registers);

add_register.addEventListener('click', addSku);