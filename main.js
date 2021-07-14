    let text;
    let quill = new Quill('#editor', {
        modules: {
            toolbar: '#toolbar'
        },
        placeholder: 'Start writing here...',
        theme: 'snow'
    });

    function openNav() {
        document.getElementById("mySidenav").style.width = "100%";
    }

    function closeNav() {
        document.getElementById("mySidenav").style.width = "0";
    }

    $("#copyText").click(function() {
        text = getSelectionText();
        console.log(text);
        copyToClipboard(text);
        let x = document.getElementById("snackbar");
        x.className = "show";
        setTimeout(function() { x.className = x.className.replace("show", ""); }, 3000);
    });

    $("#shareWaText").click(function() {
        let textShare = quill.getText();
        window.open("https://wa.me/?text=" + encodeURI(textShare))
    });

    // $("#shareEmailText").click(function() {
    //     var textShare = quill.getText();
    //     window.open("mailto:self?body="+encodeURI(textShare),"_blank");
    // });

    $("#downloadText").click(function() {
        let text = quill.getText(),
            blob = new Blob([text], { type: 'text/plain' }),
            anchor = document.createElement('a');
        anchor.download = "note.txt";
        anchor.href = (window.webkitURL || window.URL).createObjectURL(blob);
        anchor.dataset.downloadurl = ['text/plain', anchor.download, anchor.href].join(':');
        anchor.click();
    });

    function copyToClipboard(element) {
        let $temp = $("<input>");
        $("body").append($temp);
        $temp.val(element).select();
        document.execCommand("copy");
        $temp.remove();
    }

    function getSelectionText() {
        let text = "";
        if (window.getSelection) {
            text = window.getSelection().toString();
        } else if (document.selection && document.selection.type != "Control") {
            text = document.selection.createRange().text;
        }
        return text;
    }
