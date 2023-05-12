const params = Object.fromEntries(new URLSearchParams(window.location.search).entries())
const { name = '', days = '' } = params;

if (name.length > 0 && ! isNaN(days)) {
    document.getElementById('form').style.display = 'none';
    document.getElementById('new').style.removeProperty('display');
    document.getElementById('canvas').style.removeProperty('display');
    document.getElementById('texto').innerHTML = `${name.charAt(0).toUpperCase() + name.slice(1)} está há ${days} dias sem causar bugs.`
}
