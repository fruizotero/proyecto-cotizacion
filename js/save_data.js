const d = document;

export const saveData = () => {


    let number = d.querySelector(".number").value;
    let place = d.querySelector(".place").textContent;
    let date = d.querySelector(".date").textContent;
    let name = d.querySelector(".name").value;
    let dni = d.querySelector(".dni").value;
    let to = d.querySelector(".to").value;
    let subject = d.querySelector(".subject").value;
    let phone = d.querySelector(".phone").value;
    let period = d.querySelector(".period").value;
    let products = d.querySelectorAll(".product");
    let total = d.querySelector(".total__value").value;
    let totalIgv=d.querySelector(".igv__total").value;
    let porcentageIgv=d.querySelector(".igv__porcentage").value;
    let valueIgv=d.querySelector(".igv__value").value;
    let totalDiscountIncrement=d.querySelector(".total-discount-increment").value;
    let totalDiscount = d.querySelector(".discount-final").value;
    let totalIncrement = d.querySelector(".increment-final").value;
    let showDiscountAndPrices = d.querySelector(".checkbox-extra").checked;

    let data = {
        number,
        place,
        date,
        name,
        dni,
        to,
        phone,
        period,
        subject,
        products: [],
        total,
        valuesigv: {
            totalIgv,
            porcentageIgv,
            valueIgv
        },
        valuesdiscountincrement:{
            totalDiscountIncrement,
            totalDiscount,
            totalIncrement
        },
        showDiscountAndPrices
    };


    products.forEach(element => {
        // let product = {};
        let productAmount = element.querySelector(".product__amount").value;
        let productName = element.querySelector(".product__name").value;
        let productPriceFinal = element.querySelector(".product__price").value;
        let productPriceByUnit=element.querySelector(".product__price").dataset.price;
        let productCode = element.querySelector(".product__code").value;
        let productDiscount = element.querySelector(".discount").value;
        let productIncrement = element.querySelector(".increment").value;
        let productDetails = []

        let $details = element.querySelectorAll(".product__detail");

        $details.forEach(detail => {

            productDetails.push(
                detail.querySelector(".product__detail__name").textContent
            )

        });

        let product = {
            productAmount,
            productName,
            productPriceFinal,
            productPriceByUnit,
            productCode,
            productDiscount,
            productIncrement,
            productDetails
        }

        data.products.push(product);

    });


localStorage.setItem("data", JSON.stringify(data));

}