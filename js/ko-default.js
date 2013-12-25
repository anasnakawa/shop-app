// adding default value when initializing an observable
// for later resetting, preventing the observable from
// becoming undefined ( still you can set it to `null` )
//
// * **param:** value
//
// example:
// --------
// var username = ko.observable().default( 'guest' );
// username();              // 'guest'
// username( 'admin' );     // 'admin'
// username( undefined );   // 'guest'
// username( 'john doe' );  // 'john doe'
// username.reset();        // 'guest'
(function( ko ) {

  ko.observable.fn['default'] = function( value ) {
    // storeing default value
    this._defaultValue = value;

    // reset to default value
    this.reset = function() {
      this( this._defaultValue );
    };

    // initialized with undefined ?
    if( typeof this() === 'undefined' ) {
      this.reset();
    }

    // whenever value becomes undefined, reset it
    this.subscribe(function( newValue ) {
      if( typeof newValue === 'undefined' ) {
        this.reset();
      }
    });

    return this;
  }

})( ko );