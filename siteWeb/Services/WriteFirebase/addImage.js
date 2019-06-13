/**
 * Add image in Storage Firebase and return the download link
 * @param {document.getElementById('input')} element
 */
function addImage(element) {
    var file = element.files[0];
    var reader = new FileReader();
    return new Promise((resolve, reject) => {
        reader.onerror = function () {
            reader.abort();
            reject(new DOMException("Problem parsing input file."));
        };
        reader.onloadend = function () {
            if (file){
                var uploadTask = firebase.storage().ref('/image/' + file.name).putString(reader.result.replace("data:", "").replace(/^.*;base64,/, ""), 'base64');
            }
            else{
                resolve("https://lachroniquefacile.fr/wp-content/uploads/2018/07/%EF%BC%9F.png");
            }
            uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, snapshot => {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
            }, error => {
                // Error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                    case 'storage/unauthorized':
                        M.toast({ html: 'User doesn\'t have permission to access the object', classes: 'rounded' });
                        break;
                    case 'storage/canceled':
                        M.toast({ html: 'User canceled the upload', classes: 'rounded' });
                        break;
                    case 'storage/unknown':
                        M.toast({ html: 'Unknown error occurred, inspect error.serverResponse', classes: 'rounded' });
                        break;
                }
            }, () => {
                uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                    resolve(downloadURL);
                });
            });
        }
        if (!file){
            resolve("https://lachroniquefacile.fr/wp-content/uploads/2018/07/%EF%BC%9F.png");
        }
        reader.readAsDataURL(file);
    });
}
