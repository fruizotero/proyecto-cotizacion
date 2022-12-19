const d = document;
const $fragment = d.createDocumentFragment();


export const getDetails = (buttonClass = "", parentClass = "", classesToSearch = [], callback = () => { }) => {

    let parentElement;
    let valuesProduct = [];

    d.addEventListener("click", e => {
          
        if (e.target.matches(buttonClass)) {

            valuesProduct = [];

            parentElement = e.target.closest(parentClass);

            classesToSearch.forEach(cl => {
                valuesProduct.push(
                    parentElement.querySelector(cl).textContent
                )
            });
            setDetails(valuesProduct);
            callback();
        }


    });


    // return valuesProduct;

}

export const setDetails = (values) => {

    let $template = d.querySelector(".template-product").content;

    $template.querySelector(".product__name").value = values[0];
    $template.querySelector(".product__price").value = values[1].toLowerCase().replace("s/.", "").trim();
    $template.querySelector(".product__price").dataset.price = values[1].toLowerCase().replace("s/.", "").trim();


    let $clone = d.importNode($template, true);

    d.querySelector(".products").appendChild($clone);

}

export const setDetailProduct = (value, $parentElement) => {

    let $template = d.querySelector(".template-detail").content;

    $template.querySelector(".product__detail__name").textContent = value;

    let $clone = d.importNode($template, true);

    $parentElement.querySelector(".product__details").appendChild($clone);
}