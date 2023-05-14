const params = Object.fromEntries(new URLSearchParams(window.location.search).entries())
const { name = '', days = 'null' } = params;

if (name.length > 0 && ! isNaN(days)) {
    const downloadLink = document.getElementById('download');
    downloadLink.style.removeProperty('display');

    document.getElementById('form').style.display = 'none';
    document.getElementById('new').style.removeProperty('display');
    document.getElementById('resultado').style.removeProperty('display');
    document.getElementById('texto').innerHTML = `${name.charAt(0).toUpperCase() + name.slice(1)} está há ${days} dias sem causar bugs.`

    html2canvas(document.getElementById('conteudo')).then(function(canvas) {
        downloadLink.href = canvas.toDataURL("image/png");
    });
}