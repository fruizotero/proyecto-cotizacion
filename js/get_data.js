const d = document;
let data = [];
let dataWithoutAccents = [];

export const getData = async (path = "assets/data/loginstore/celulares.json", paths = []) => {

    try {

        for (let index = 0; index < paths.length; index++) {

            let resp = await fetch(paths[index]);

            let json = await resp.json();

            if (!resp.ok) throw { status: resp.status, statusText: resp.statusText }

            data.push(json);

        }

        data = data.flat();

        data.forEach(element => {

            Object.entries(element).forEach(entry => {

                let [key, value] = entry;

                let name = key.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

                let obj = {};
                obj[name] = value;

                dataWithoutAccents.push(obj)

            });

        });

        // console.log(dataWithoutAccents);
        return dataWithoutAccents;

    } catch (error) {
        console.log(error);
    }

}