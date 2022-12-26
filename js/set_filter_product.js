const d = document;
let $fragment = d.createDocumentFragment();

// "id": "HDDELL400AUUQ",
//             "link": "https://www.deltron.com.pe/modulos/productos/items/postsql.php?item_number=HDDELL400AUUQ",
//             "linkStock": "https://www.deltron.com.pe/modulos/productos/items/ctBuscador/templates/almacen_info.php?ItemId=HDDELL400AUUQ&ItemDesc=",
//             "idProduct": "",
//             "imagen": "https://imagenes.deltron.com.pe/images/productos/items/blanco.jpg",
//             "miniCode": " 345979",
//             "marca": "DELL - SERVIDORES",
//             "nombre": "2TB 7.2K RPM NLSAS 12GBPS",
//             "textDescription": "",
//             "precioDolares": "US $ 223.50",
//             "precio": "S/. 1,012.72"

export const setProducts = (data = []) => {
    let $template = d.querySelector(".template-filter-product").content;

    data.forEach(el => {

        $template.querySelector(".filter__product__image").setAttribute("src", el.imagen);
        // $template.querySelector(".filter__product__image").setAttribute("src", "#");
        $template.querySelector(".filter__product__name").textContent = el.nombre;
        $template.querySelector(".filter__product__price").textContent =
            `S/. ${el.precio}`;
        // console.log(el.miniCode.trim());
        $template.querySelector(".filter__product__minicode").textContent = el.miniCode.trim();

        $template.querySelector(".product__link").setAttribute("href", el.link);

        $template.querySelector(".filter__product__link__stock").setAttribute("href", el.linkStock);

        $template.querySelector(".filter__product__marca").textContent = el.marca;

        $template.querySelector(".filter__product__description").textContent=el.textDescription;

        //precioDolares
        $template.querySelector(".filter__product__price__dolar").textContent=el.precioDolares;

        let $clone = d.importNode($template, true);
        $fragment.appendChild($clone);

    });

    d.querySelector(".filter__products").replaceChildren($fragment);


}