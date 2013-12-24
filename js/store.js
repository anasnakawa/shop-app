/**
 * data store
 */

(function( app ) {

	// stringify / parse JSONs should happen here only
	var setItem = function( key, value ) {
		try {
			localStorage.setItem( key, JSON.stringify( value ) );
		} catch( e ) {
			console && console.error( 'could not set localStorage value for the key: ' + key + '\n message: ' + e.toString() );
		}
	}

	, getItem = function( key ) {
		var value;
		try {
			value = JSON.parse( localStorage.getItem( key ) );
		} catch( e ) {
			console && console.error( 'could not get localStorage value for the key: ' + key + '\n message: ' + e.toString() );
		}
		return value;
	}

	// encapsulate local storage to prevent failures
	app.data = function( key, value ) {
		if( !window.localStorage ) {
			return;
		}

		return value == null ? getItem( key ) : setItem( key, value );
	}

})( this.app = this.app || {} );

