const d = document;
let $fragment = d.createDocumentFragment();
let $fragmentDetail = d.createDocumentFragment();

d.addEventListener("DOMContentLoaded", e => {

    let data = localStorage.getItem("data");
    data = JSON.parse(data);
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();



    console.log(data);
    d.querySelector(".place").textContent = data["place"];
    d.querySelector(".date-issue-text").textContent = data["date"];
    d.querySelector(".data__client__name").textContent = data["name"];
    let addZero = day < 10 ? "0" : "";
    d.querySelector(".date").textContent =
        `${addZero}${day}/${month}/${year}`;
    d.querySelector(".data__number").textContent = data["number"];
    d.querySelector(".data__subject").textContent = data["subject"];


    data["products"].forEach(product => {

        let $code = product["productCode"] || "----";
        let $amount = product["productAmount"];
        let $priceByUnity = product["productPriceByUnit"];
        let $discount = product["productDiscount"];
        let $increment = product["productIncrement"];
        let $priceFinal = product["productPriceFinal"];
        let $template = d.querySelector(".template-product-name").content;

        $template.querySelector(".name").textContent = product["productName"];

        product["productDetails"].forEach(detail => {

            let $detail = d.createElement("li");
            $detail.textContent = detail;
            $fragmentDetail.appendChild($detail);

        });

        $template.querySelector(".product__details").replaceChildren($fragmentDetail);

        let $clone = d.importNode($template, true);


        let $tableTr = d.createElement("tr");
        let $tdCode = d.createElement("td");
        let $tdAmount = d.createElement("td");
        let $tdPriceByUnity = d.createElement("td");
        let $tdDiscount = d.createElement("td");
        let $tdIncrement = d.createElement("td");
        let $tdPriceFinal = d.createElement("td");
        let $tdName = d.createElement("td");

        $tdCode.textContent = $code;
        $tdCode.classList.add("td-center");
        $tableTr.appendChild($tdCode);

        $tdAmount.textContent = $amount;
        $tdAmount.classList.add("td-center");
        $tableTr.appendChild($tdAmount);

        $tdName.appendChild($clone);
        $tableTr.appendChild($tdName);

        $tdPriceByUnity.textContent = $priceByUnity;
        $tdPriceByUnity.classList.add("td-center", "td-unity");
        $tableTr.appendChild($tdPriceByUnity);

        $tdDiscount.textContent = $discount;
        $tdDiscount.classList.add("td-center", "td-discount");
        $tableTr.appendChild($tdDiscount);

        $tdIncrement.textContent = $increment;
        $tableTr.appendChild($tdIncrement);
        $tdIncrement.classList.add("td-center", "td-increment");

        $tdPriceFinal.textContent = $priceFinal;
        $tdPriceFinal.classList.add("td-center", "td-final-price");
        // $tdPriceFinal.classList.add("td-center","td-increment");
        $tableTr.appendChild($tdPriceFinal)

        d.querySelector(".products__body").appendChild($tableTr);


    });

    let classToHidden = [".td-unity", ".td-discount", ".td-increment", ".td-final-price"];

    if (!data["showDiscountAndPrices"]) {
        classToHidden.forEach(cls => {

            d.querySelectorAll(cls).forEach(el => {
                el.classList.add("hidden-td");
            });
        })

    }

    d.querySelector(".total").textContent = `S/ ${parseFloat(data["total"]).toFixed(3)}`;

    d.querySelector(".igv__porcentage__value").textContent = `${data["valuesigv"]["porcentageIgv"]}%`;
    d.querySelector(".igv__total__value").textContent = `S/ ${parseFloat(data["valuesigv"]["valueIgv"]).toFixed(3)}`
    d.querySelector(".final__discount").textContent = `${data["valuesdiscountincrement"]["totalDiscount"]}%`
    d.querySelector(".final__increment").textContent = `${data["valuesdiscountincrement"]["totalIncrement"]}%`;
    d.querySelector(".total__value_with_igv").textContent = `S/ ${parseFloat(data["valuesigv"]["totalIgv"]).toFixed(3)}`;
    d.querySelector(".total__final__value").textContent = `S/ ${parseFloat(data["valuesdiscountincrement"]["totalDiscountIncrement"]).toFixed(3)}`;

});