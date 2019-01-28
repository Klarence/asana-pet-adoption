(function () {
    document.addEventListener("DOMContentLoaded", function() {
        loadDoc();
    });

    function loadDoc() {
        let data = {};

        function getJSON(path, callback) {

            let xhr = new XMLHttpRequest();                                         //Instantiate new request

            xhr.open('GET', path, true);                                            //prepare asynch GET request
            xhr.send();                                                             //send request

            xhr.onreadystatechange = function () {                                    //everytime ready state changes (0-4), check it
                if (xhr.readyState === 4) {                                         //if request finished & response ready (4)
                    if (xhr.status === 0 || xhr.status === 200) {                   //then if status OK (local file || server)
                        let data = JSON.parse(xhr.responseText);                    //parse the returned JSON string
                        if (callback) {
                            callback(data);
                        }
                    }
                }
            };
        }

        getJSON('assets/data/dogs.json', function (data) {
            // console.log(data);
            data = data.dogs;
            // console.log(data);

            let output = data.map((dog, index) => {
                // console.log(dog.image);
                return `
                    <img id="dog-${index}" 
                    src=${JSON.stringify(dog.image)} />
                `;
            });

            //  document.querySelector('#dogList').innerHTML = output;

            let addToList = document.createElement("div");
            addToList.innerHTML = output;
            document.querySelector('#dogList').appendChild(addToList);
        });
    }

})();

