(function () {
    document.addEventListener("DOMContentLoaded", function() {
        fetch('assets/snippets/header.html')
        .then(function (response) {
                // When the page is loaded convert it to text
                return response.text()
            })
                .then(function (html) {
                    // Initialize the DOM parser
                    var parser = new DOMParser();

                    // Parse the text
                    var doc = parser.parseFromString(html, "text/html");

                    // You can now even select part of that html as you would in the regular DOM
                    // Example:
                    var docArticle = doc.querySelector('header').innerHTML;

                    console.log(doc);
                    document.getElementById("header").innerHTML = docArticle
                })
                .catch(function (err) {
                    console.log('Failed to fetch page: ', err);
                });


        fetch('assets/snippets/footer.html')
        .then(function (response) {
                // When the page is loaded convert it to text
                return response.text()
            })
                .then(function (html) {
                    // Initialize the DOM parser
                    var parser = new DOMParser();

                    // Parse the text
                    var doc = parser.parseFromString(html, "text/html");

                    // You can now even select part of that html as you would in the regular DOM
                    // Example:
                    var docArticle = doc.querySelector('footer').innerHTML;

                    console.log(doc);
                    document.getElementById("footer").innerHTML = docArticle
                })
                .catch(function (err) {
                    console.log('Failed to fetch page: ', err);
                });


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
                    data-location="${dog.image}" 
                    src=${JSON.stringify(dog.image)} />
                `;
            }).join('');

            //  document.querySelector('#dogList').innerHTML = output;

            let addToList = document.createElement("div");
            addToList.innerHTML = output;
            document.querySelector('#dogList').appendChild(addToList);
        });

        let modal = document.getElementById("modalImageContainer");
        let closeButton = document.querySelector(".close-button");
        closeButton.addEventListener("click", toggleModal, false);

        function toggleModal() {
            modal.classList.toggle("show-modal");
        }

        let theParent = document.querySelector("#dogList");
        theParent.addEventListener("click", showLargeImage, false);

        function showLargeImage(e) {
            if (e.target !== e.currentTarget) {
                //let clickedItem = e.target.id;
                let clickedItem = e.target.getAttribute("data-location");
                let clickedItemIndex = e.target.getAttribute("id");

                // alert("Hello " + clickedItem);
                // alert("Hello " + clickedItemIndex);

                document.getElementById("modalImage").setAttribute('src', clickedItem);

                toggleModal();
            }
            e.stopPropagation();
        }
    }

})();

