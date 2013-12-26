/**
 * app main file
 */

(function( app ) {

	// model factory
	// -------------
	function Item( name, price, quantity ) {
		this.name = name ? name : '';
		this.price = price ? price : 0;
		this.quantity = quantity || 1;
	}
	
	// our main list items
	app.shoppingItems = ko.observableArray( app.data( 'shoppingList' ) || [] );
	app.totalPrice = ko.computed(function() {
		var total = 0;
		ko.unwrap( app.shoppingItems ).forEach(function( item, index ) {
			total = total + ( parseFloat( ko.unwrap( item.price ) ) * parseInt( ko.unwrap( item.quantity ) , 10 ) );
		});
		return total;
	});

	// store data whenever changed
	app.shoppingItems.subscribe(function( newValue ) {
		app.data( 'shoppingList', newValue );
	});

	// switchers
	app.isAddMode  = ko.observable(false);
	app.isEditMode = ko.observable(false);

	// temp
	app.tempName 		 = ko.observable().default('');
	app.tempPrice 		 = ko.observable().default(null);
	app.tempQuantity 	 = ko.observable().default(1);
	app.tempQuantityList = ko.utils.range(0, 50);

	// handlers
	// --------
	app.openAddMode = function( data, event ) {
		app.tempName.reset();
		app.tempPrice.reset();
		app.tempQuantity.reset();
		app.isAddMode(true);
	}

	app.toggleEditMode = function( data, event ) {
		app.isEditMode( !app.isEditMode() );
	}

	app.addItem = function( data, event ) {
		if( app.tempName() == '' ) {
			return;
		}
		app.isAddMode(false);
		app.shoppingItems.push( new Item( app.tempName(), app.tempPrice(), app.tempQuantity() ) );
	}

	app.removeItem = function( data, event ) {
		app.shoppingItems.remove( data );
		// when list goes empty, trun off edit mode
		!app.shoppingItems().length && app.isEditMode(false);
	}

	ko.applyBindings( app );

})( this.app = this.app || {} );