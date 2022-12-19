const d = document;
let $fragment = d.createDocumentFragment();

export const setProducts = (data = []) => {
    let $template = d.querySelector(".template-filter-product").content;

    data.forEach(el => {

        $template.querySelector(".filter__product__image").setAttribute("src", el.imagen);
        $template.querySelector(".filter__product__name").textContent = el.nombre;
        $template.querySelector(".filter__product__price").textContent = 
        `S/. ${el.precio}`;
        $template.querySelector(".product__link").setAttribute("href", el.link);

        let $clone = d.importNode($template, true);
        $fragment.appendChild($clone);

    });

    d.querySelector(".filter__products").replaceChildren($fragment);


}