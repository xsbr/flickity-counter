/*!
 * Flickity counter v0.0.1
 * Enable slide counter for Flickity
 */

/*jshint browser: true, undef: true, unused: true, strict: true*/

( function( window, factory ) {
  // universal module definition
  /*jshint strict: false */ /*globals define, module, require */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( [
      'flickity/js/index',
    ], factory );
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      require('flickity')
    );
  } else {
    // browser global
    factory(
      window.Flickity
    );
  }

}( window, function factory( Flickity ) {

'use strict';

Flickity.createMethods.push('_createCounterDiv');
var proto = Flickity.prototype;

proto._createCounterDiv = function() {
  if ( !this.options.counter ) {
    return;
  }
  this.CounterDiv = new CounterDiv( this );
  this.on( 'activate', this.activateCounter );
};

proto.activateCounter = function() {
  this.CounterDiv.activate();
  this.on( 'deactivate', this.deactivateCounter );
}

proto.deactivateCounter = function() {
  this.CounterDiv.deactivate();
  this.off( 'deactivate', this.deactivateCounter );
}

// ----- Counter Div ----- //

function CounterDiv( flickity ) {
  this.parent = flickity;
  this.divisor = this.parent.options.counterDivisor || ' / ';
  this.create();
  this.disable();
}

CounterDiv.prototype.activate = function() {
  this.update();
  this.parent.on( 'select', this.update.bind( this ) );
  this.parent.element.appendChild( this.element );
}

CounterDiv.prototype.deactivate = function() {
  this.parent.element.removeChild( this.element );
}

CounterDiv.prototype.enable = function() {
  if(this.isEnabled) {
    return;
  }
  this.isEnabled = true;
  this.element.classList.remove('flickity-counter-disabled');
  this.element.classList.add('flickity-counter-enabled');
}

CounterDiv.prototype.disable = function() {
  if(this.isEnabled === false) {
    return;
  }
  this.isEnabled = false;
  this.element.classList.remove('flickity-counter-enabled');
  this.element.classList.add('flickity-counter-disabled');
}

CounterDiv.prototype.create = function() {
  var element = this.element = document.createElement('div');
  element.className = 'flickity-button flickity-counter';
};

CounterDiv.prototype.update = function() {
  var totalSlides = this.parent.slides.length;
  var currentSlide = this.parent.selectedIndex + 1;
  if( totalSlides > 1 ) {
    this.enable();
    this.element.innerHTML = currentSlide + this.divisor + totalSlides;
  } else {
    this.disable(); 
  }
}
    
Flickity.CounterDiv = CounterDiv;

return Flickity;

}));
