const params = Object.fromEntries(new URLSearchParams(window.location.search).entries())
const { name = '', days = '' } = params;

if (name.length > 0 && ! isNaN(days) && days.length > 0) {
    const downloadLink = document.getElementById('download');
    downloadLink.style.removeProperty('display');
    const nome = name.charAt(0).toUpperCase() + name.slice(1);

    document.getElementById('form').style.display = 'none';
    document.getElementById('new').style.removeProperty('display');
    document.getElementById('resultado').style.removeProperty('display');
    document.getElementById('texto').innerHTML = `${nome} está há ${days} dias sem causar bugs.`
    document.getElementById('description').content = `Contador de dias sem ${nome.split(' ')[0]} quebrar a Produção.`;

    html2canvas(document.getElementById('conteudo')).then(function(canvas) {
        downloadLink.href = canvas.toDataURL("image/png");
        document.getElementById('thumb').content = downloadLink.href;
    });
}