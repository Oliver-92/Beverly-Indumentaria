// Muestra solo la categoría de productos seleccionada
document.getElementById('select-man-shop').addEventListener('click', function() {
    document.getElementById('man-shop').style.display = 'flex'; 
    document.getElementById('woman-shop').style.display = 'none'; 
});

document.getElementById('select-woman-shop').addEventListener('click', function() {
    document.getElementById('man-shop').style.display = 'none';  
    document.getElementById('woman-shop').style.display = 'flex'; 
});