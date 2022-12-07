$(document).ready(function() {
	let productItem = [{
			productName: "Camera",
			price: "900",
			photo: "camera.jpg"
		},
		{
			productName: "Hard Drive",
			price: "800",
			photo: "external-hard-drive.jpg"
		},
		{
			productName: "Macbook Air Pro",
			price: "1200",
			photo: "laptop.jpg"
		},
		{
			productName: "Rolex",
			price: "10000",
			photo: "watch.jpg"
		}];
	showProductGallery(productItem);
	showCartTable();
});

function addToCart(element) {
	let productParent = $(element).closest('div.product-item');

	let price = $(productParent).find('.price span').text();
	let productName = $(productParent).find('.productname').text();
	let quantity = $(productParent).find('.product-quantity').val();

	let cartItem = {
		productName: productName,
		price: price,
		quantity: quantity
	};
	let cartItemJSON = JSON.stringify(cartItem);

	let cartArray = new Array();
	if (localStorage.getItem('shopping-cart')) {
		cartArray = JSON.parse(localStorage.getItem('shopping-cart'));
	}
	cartArray.push(cartItemJSON);
	

	let cartJSON = JSON.stringify(cartArray);
	localStorage.setItem('shopping-cart', cartJSON);
	showCartTable();
}

function emptyCart() {
	if (localStorage.getItem('shopping-cart')) {
		localStorage.removeItem('shopping-cart');
		showCartTable();
	}
}

function showCartTable() {
	let cartRowHTML = "";
	let itemCount = 0;
	let grandTotal = 0;
	
	let price = 0;
	let quantity = 0;
	let subTotal = 0;
	
	if (localStorage.getItem('shopping-cart')) {
		let shoppingCart = JSON.parse(localStorage.getItem('shopping-cart'));
		itemCount = shoppingCart.length;
		shoppingCart.forEach(function(item) {
			let cartItem = JSON.parse(item);
			price = parseFloat(cartItem.price);
			quantity = parseInt(cartItem.quantity);
			subTotal = price * quantity
			grandTotal += subTotal;
			cartRowHTML += "<tr>" +
            "<td>" + cartItem.productName + "</td>" +
            "<td class='text-right'>$" + price.toFixed(2) + "</td>" +
            "<td class='text-right'>" + quantity + "</td>" +
            "<td class='text-right'>$" + subTotal.toFixed(2) + "</td>" +
            "</tr>";    
		});
	}
	
	$('#cartTableBody').html(cartRowHTML);
	$('#itemCount').text(itemCount);
	$('#totalAmount').text("$" + grandTotal.toFixed(2));
}


function removeCartItem(index) {
	if (localStorage.getItem('shopping-cart')) {
		let shoppingCart = JSON.parse(localStorage.getItem('shopping-cart'));
		localStorage.removeItem(shoppingCart[index]);
		showCartTable();
	}
}

function showProductGallery(product) {
	let productHTML = "";
	product.forEach(function(item) {
		productHTML += '<div class="product-item">'+
		'<img src="product-images/' + item.photo + '">'+
		'<div class="productname">' + item.productName + '</div>'+
		'<div class="price">$<span>' + item.price + '</span></div>'+
		'<div class="cart-action">'+
		'<input type="text" class="product-quantity" name="quantity" value="1" size="2" />'+
		'<input type="submit" value="Add to Cart" class="add-to-cart" onClick="addToCart(this)" />'+
		'</div>'+
		'</div>';
		"<tr>";
	});
	$('#product-item-container').html(productHTML);
/* 	let link = document.querySelector('.cart-action');
	let link1 = document.querySelector('add-to-cart');
	let href = document.querySelector('a');
	link.addEventListener('click', function (e) {
		let target = e.target;
		if (target.parentElement.className == link1) {
			img++;
		} 
	}) */
}