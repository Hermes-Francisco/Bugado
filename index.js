const params = Object.fromEntries(new URLSearchParams(window.location.search).entries())
const { name = '', days = '', forget = false } = params;

if (forget) {
    document.cookie.split(';').forEach((cookie) => {
        if (cookie.length === 0) {
            return;
        }

        document.cookie = `${cookie}; max-age=-1`;
    });
}

if (name.length > 0 && ! isNaN(days) && days.length > 0) {
    const downloadLink = document.getElementById('download');
    downloadLink.style.removeProperty('display');
    const nome = name.charAt(0).toUpperCase() + name.slice(1);

    document.getElementById('form').style.display = 'none';
    document.getElementById('new').style.removeProperty('display');
    document.getElementById('resultado').style.removeProperty('display');
    document.getElementById('texto').innerHTML = `${nome} está há ${days} dias sem causar bugs.`
    document.getElementById('description').content = `Contador de dias sem ${nome.split(' ')[0]} quebrar a Produção.`;

    let newRecord = days;

    let cookies = getCookies();
    let expiration = 24*60*60*7;

    if(! cookies[nome]) {
        document.cookie = `${btoa(nome)}={"days":${days}}; max-age=${expiration}`;

        cookies = getCookies();
    }

    if (newRecord < cookies[nome].days) {
        newRecord = cookies[nome].days;
    }

    document.cookie = `${btoa(nome)}={"days":${newRecord}}; max-age=${expiration}`;
    document.getElementById('recorde').innerHTML = `O recorde atual é de ${newRecord}.`;

    html2canvas(document.getElementById('conteudo')).then(function(canvas) {
        downloadLink.href = canvas.toDataURL("image/png");
        document.getElementById('thumb').content = downloadLink.href;
    });
}

function getCookies() {
    cookies = {};

    document.cookie.split(';').forEach((cookie) => {
        if (cookie.length === 0) {
            return;
        }

        let [key, value] = cookie.split('={');

        value = JSON.parse(`{${value}`);

        cookies[atob(key)] = value;
    });

    return cookies;
}