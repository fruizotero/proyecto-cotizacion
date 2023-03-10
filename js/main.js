import { getDetails, setDetailProduct, setDetails } from '../js/set_details.js';
import { getData } from "../js/get_data.js";
import { setProducts } from "../js/set_filter_product.js";
import { saveData } from "../js/save_data.js";

const d = document;
const date = new Date();
const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
const paths = [
    "assets/data/deltron/deltron.json"
]
// const paths = [
//     "assets/data/loginstore/arma_tu_pc.json",
//     "assets/data/loginstore/celulares.json",
//     "assets/data/loginstore/computacion.json",
//     "assets/data/loginstore/gaming.json",
//     "assets/data/loginstore/monitores.json",
//     "assets/data/loginstore/tv_audio.json"
// ]

let dataElements;
let filterDataElements = [];

const sumTotal = () => {
    let prices = d.querySelectorAll(".product__price");
    let total = 0;

    if (prices.length === 0) return;

    prices.forEach(price => {
        console.log(parseFloat(price.value));
        total += parseFloat(price.value);

    });

    d.querySelector(".total__value").value = total;
    calcIGV();
}

const calcIGV = () => {

    let $porcentageIGV = d.querySelector(".igv__porcentage").value;
    let $igvValue = d.querySelector(".igv__value");
    let $igvTotal = d.querySelector(".igv__total");
    let $totalValue = d.querySelector(".total__value").value;

    let igv = (parseFloat($totalValue) * parseFloat($porcentageIGV)) / 100;
    $igvValue.value = igv.toFixed(3);
    $igvTotal.value = (parseFloat($totalValue) + igv).toFixed(3);

    d.querySelector(".total-discount-increment").value = (parseFloat($totalValue) + igv).toFixed(3);;

}

const validateNumber = (value) => {

    const regex1 = /[0-9]*/i;
    const str1 = value;


    let finalValue = str1.match(regex1);

    return finalValue[0];

}

const searchStrings = (string = "") => {


    let groupString = string.split(" ");
    filterDataElements = [];

    if (string === "") return;

    for (let index = 0; index < dataElements.length; index++) {

        Object.entries(dataElements[index]).forEach(entry => {
            let [key, value] = entry;

            let isInclude;
            for (let index = 0; index < groupString.length; index++) {

                isInclude = key.toLowerCase().includes(groupString[index]);

                if (!isInclude) return;
            }

            if (isInclude) {
                let newObj = { ...value };
                newObj.precio = parseFloat((newObj.precio.replace("S/.", "").trim()).replace(",", ""));
                // value.precio = parseFloat(value.precio.replace("S/.", "").trim());
                filterDataElements.push(newObj);
            }

        });
    }

    d.querySelector(".amount__items").textContent = filterDataElements.length

}

const orderByPrice = () => {

    filterDataElements.sort(function (a, b) { return a.precio - b.precio });

}
const orderByName = () => {
    filterDataElements.sort(function (a, b) {
        let x = a.nombre.toLowerCase();
        let y = b.nombre.toLowerCase();
        if (x < y) { return -1; }
        if (x > y) { return 1; }
        return 0;
    });
}

const actionMessage = (message = "") => {
    d.querySelector(".message").style.display = "block";
    d.querySelector(".message").textContent = message;
    setTimeout(() => {

        d.querySelector(".message").style.display = "none"
        // console.log("hola");
    }, 2000);
}

const moveScrollTop = () => {
    d.querySelector(".filter__products").scrollTop = 0;
}


d.addEventListener("DOMContentLoaded", async e => {

    getDetails(
        ".add_data", ".filter__product__details",
        [".filter__product__name",
            ".filter__product__price",
            ".filter__product__minicode"],
        sumTotal
    )

    d.querySelector(".date").textContent =
        `${date.getDate()} de ${months[date.getMonth()]} del ${date.getFullYear()}`;

    dataElements = await getData("", paths);

    // console.log(dataElements);

});

d.addEventListener("click", e => {

    // Producto empty

    if (e.target.matches(".product__empty")) {
        setDetails(["", "0"]);
        actionMessage("Se ha a??adido un nuevo producto")
    }


    //Producto
    let $product = e.target.closest(".product");
    console.log($product);

    if (e.target.matches(".add_data")) {
        actionMessage("Detalles A??adidos");
        d.querySelector(".filter").classList.remove("filter-show");
    }

    // Eliminar producto
    if (e.target.matches(".product__remove") ||
        e.target.matches(".product__remove *")) {

        let alert = window.confirm("??Seguro que deseas borrar el producto?");

        if (!alert) return;

        d.querySelector(".products").removeChild(e.target.closest(".product"));
        sumTotal();
        actionMessage("Se ha eliminado un producto")

    }

    // Mostrar detalles extra

    if (e.target.matches(".filter__product__container") || e.target.matches(".filter__product__container *")) {
        let $parent = e.target.closest(".filter__product");
        $parent.querySelector(".filter__product__details__extra").classList.add("show-details-extra");
    }

    // Cerrar dettale extra

    if (e.target.matches(".filter__product__extra__container") || 
    e.target.matches(".filter__product__extra__container *")) {

        let $parent = e.target.closest(".filter__product");
        $parent.querySelector(".filter__product__details__extra").classList.remove("show-details-extra");

    }

    // Descontar o incrementar porcentaje

    if (e.target.matches(".porcentage__button")) {
        let porcentageRadio = $product.querySelector('input[name="porcentage"]:checked').value;
        let porcentage = $product.querySelector(".porcentage__value").value;
        let porcentageInteger = parseInt(porcentage);
        let price = $product.querySelector(".product__price").value.trim();
        let priceInteger = parseInt(price);
        let operation;

        if (validateNumber(porcentage) === "")
            return;
        console.log("holaaa");
        if (porcentageRadio === "discount") {
            operation = priceInteger - ((priceInteger * porcentageInteger) / 100);
            $product.querySelector(".discount").value = porcentageInteger;
        } else {
            operation = priceInteger + ((priceInteger * porcentageInteger) / 100);
            $product.querySelector(".increment").value = porcentageInteger;
        }

        $product.querySelector(".product__price").value = operation.toFixed(3);

        operation = 0;
        sumTotal();
        actionMessage("Se ha aplicado un porcentaje al producto");
    }

    //

    // Detalles Extra

    if (e.target.matches(".product__add__details")) {
        $product.querySelector(".product__secondary").classList.toggle("product--none");
    }

    // A??adir detalle al producto

    if (e.target.matches(".add__button")) {
        let $detailValue = $product.querySelector(".add__name").value;

        if ($detailValue !== "") {
            setDetailProduct($detailValue, $product);
            $product.querySelector(".add__name").value = "";
        }
    }

    // Eliminar detalle

    if (e.target.matches(".remove__detail")) {
        let $element = e.target.closest(".product__detail");
        $product.querySelector(".product__details").removeChild($element);
    }


    // Descontar o incrementar porcentaje final

    if (e.target.matches(".porcentage__final-button")) {
        let porcentageRadio = d.querySelector('input[name="porcentage-final"]:checked').value;
        let porcentage = d.querySelector(".porcentage__final-value").value;
        let porcentageInteger = parseInt(porcentage);
        let total = d.querySelector(".igv__total").value.trim();
        let totalInteger = parseFloat(total);
        let operation;

        if (validateNumber(porcentage) === "")
            return;

        console.log(total);
        if (porcentageRadio === "discount") {
            operation = totalInteger - ((totalInteger * porcentageInteger) / 100);
            d.querySelector(".discount-final").value = porcentageInteger;
            console.log(operation);
        } else {
            operation = totalInteger + ((totalInteger * porcentageInteger) / 100);
            d.querySelector(".increment-final").value = porcentageInteger;
        }

        d.querySelector(".total-discount-increment").value = operation.toFixed(3);

        operation = 0;
        actionMessage("Se ha aplicado un porcentaje al Total")
        // calcIGV();
        // sumTotal();
    }

    // Search
    if (e.target.matches(".search__button")) {
        let stringToSearch = d.querySelector(".search__text").value.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        searchStrings(stringToSearch);
        setProducts(filterDataElements);
        d.querySelector("#checkbox-order").checked = false;
        moveScrollTop();
        // d.querySelector(".example").textContent=stringToSearch;
    }

    // Order by price

    if (e.target.matches("#checkbox-order")) {

        let order = e.target.checked.value;
        console.log(e.target.checked);
        if (e.target.checked) {
            orderByPrice();
            setProducts(filterDataElements)
        }
    }

    //Submit

    if (e.target.matches(".submit")) {

        saveData();

        window.open("pages/page_pdf.html")

    }

    //Mostrar filter

    if (e.target.matches(".button-mobile")) {

        d.querySelector(".filter").classList.add("filter-show");

    }

    //Close filter

    if (e.target.matches(".filter__close") || e.target.matches(".filter__close__image")) {
        d.querySelector(".filter").classList.remove("filter-show");
    }

});

d.addEventListener("keyup", e => {

    console.log(e);

    let $product = e.target.closest(".product");

    // Modificar precio del producto
    if (e.target.matches(".product__price")) {


        let price = e.target.value;

        e.target.value = validateNumber(price);
        e.target.dataset.price = e.target.value;


        sumTotal();
    }

    // Modifcar cantidad
    if (e.target.matches(".product__amount")) {

        let number = validateNumber(e.target.value)

        if (number !== "") {

            let amount = parseFloat(number);
            let valueProduct = parseFloat($product.querySelector(".product__price").dataset.price);

            $product.querySelector(".product__price").value = amount * valueProduct;
            sumTotal();
        }

    }

    // Search

    if (e.key === "Enter") {

        if (e.target.matches(".search__text")) {
            let stringToSearch = d.querySelector(".search__text").value.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            searchStrings(stringToSearch);
            // console.log(stringToSearch);
            setProducts(filterDataElements);
            d.querySelector("#checkbox-order").checked = false;
            moveScrollTop();
        }

    }

    // IGV porcentage

    if (e.target.matches(".igv__porcentage")) {
        calcIGV();
    }



});

