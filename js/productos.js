$(document).ready(function() {
    // Función para manejar el clic en el botón "Comprar"
    $("#btnComprar").click(function() {
        var totalText = $('#total').text();

        if ($("#cart").children().length > 0) {
        // Mostrar el total de la compra
        alert("Su total a pagar es : " + totalText);
        } 
        else {
        // Mostrar un mensaje si el carrito está vacío
        alert("Carro Vacio");
        }
    });

    // Función para manejar el clic en el botón "Agregar al Carrito" en cada tarjeta de producto
    $(".btnAgregarCarrito").click(function() {
        // Obtener la información del producto desde la tarjeta
        var cardProduct = $(this).closest(".card");
        var productName = cardProduct.find(".card-title").text();
        var productPriceText = cardProduct.find(".text-muted").text();
        var productPrice = parseFloat(productPriceText.replace("$", "").replace(".", ""));

        // Agregar el producto al carrito
        $("#cart").append("<li class='list-group-item'>" + productName + " - $" + productPrice.toLocaleString('es-CL') + " <button class='btn btn-sm btn-danger float-end remove-product'>Eliminar</button></li>");

        // Mostrar u ocultar el botón "Comprar" dependiendo de si hay productos en el carrito
        mostrarOcultarBotonComprar();
        // Recalcular el total de la compra
        recalcularTotalCompra();
    });

    // Función para manejar el clic en el botón "Eliminar" dentro del carrito
    $("#cart").on("click", ".remove-product", function() {
        // Obtener el precio del producto a eliminar
        var productPriceText = $(this).closest("li").text().match(/\$\d+(\.\d+)?/)[0];
        var productPrice = parseFloat(productPriceText.replace("$", "").replace(".", ""));

        // Eliminar el producto del carrito
        $(this).closest("li").remove();

        // Recalcular el total de la compra
        recalcularTotalCompra();
        // Mostrar u ocultar el botón "Comprar" dependiendo de si hay productos en el carrito
        mostrarOcultarBotonComprar();
    });

    // Función para manejar el clic en el botón de alternar el carrito
    $("#toggleCart").click(function() {
        $("#cartSidebar").toggle("slow");
    });

    // Función para recalcular el total de la compra
    function recalcularTotalCompra() {
        var total = 0;
        $("#cart").find("li").each(function() {
            var priceText = $(this).text().match(/\$\d+(\.\d+)?/)[0];
            var price = parseFloat(priceText.replace("$", "").replace(".", ""));
            total += price;
        });
        // Actualizar el texto del total de la compra en la interfaz
        $('#total').text("$" + total.toLocaleString('es-CL'));
    }

    // Función para mostrar u ocultar el botón "Comprar" dependiendo de si hay productos en el carrito
    function mostrarOcultarBotonComprar() {
        if ($("#cart").children().length > 0) {
            $("#btnComprar").show();
        } 
        else {
            $("#btnComprar").hide();
        }
    }
});
