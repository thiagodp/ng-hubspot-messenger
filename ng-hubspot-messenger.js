/* global angular, Messenger: true */

( function( angular ) {

'use strict';

/**
 * HubSpotMessenger
 *
 * @version	0.1
 *
 * @author	Thiago Delgado Pinto
 * @license	MIT 
 */
angular.module( 'ngHubSpotMessenger', [] )
	.provider( 'HubSpotMessenger', HubSpotMessenger )
	;
	
function HubSpotMessenger() {

	var _this = this;
	
	// private attributes -----------------------------------------------------

	_this._config = null;	// not used by default
	_this._options = null;	// not used by default
	
	// private methods --------------------------------------------------------
	
	_this._getset = function( attr, value ) {
		if ( value ) {
			_this[ attr ] = value;
		}
		return _this[ attr ];
	};	
	
	// public methods ---------------------------------------------------------

    _this.config = function( value ) {
		return _this._getset( '_config', value );
    };
	
	_this.options = function( value ) {
		return _this._getset( '_options', value );
    };
	
	// Useful CONFIG methods
	
	_this.locationToExtraClasses = function( location ) {
		var loc = location.toLowerCase();
		switch ( loc ) {
			case 'top-left'		: return 'messenger-on-top messenger-on-left';
			case 'top-right'	: return 'messenger-on-top messenger-on-right';
			case 'bottom-left'	: return 'messenger-on-bottom messenger-on-left';
			case 'bottom-right'	: return 'messenger-on-bottom messenger-on-right';
		}
		return '';
	};
	
	_this.useExtraClassesForLocation = function( location ) {
		_this._config = _this._config || {};
		_this._config.extraClasses = _this.locationToExtraClasses( location );
		return _this._config.extraClasses;
	};
	
	_this.toTopLeft = function() { return _this.useExtraClassesForLocation( 'top-left' ); };
	
	_this.toTopRight = function() { return _this.useExtraClassesForLocation( 'top-right' ); };
	
	_this.toBottomLeft = function() { return _this.useExtraClassesForLocation( 'bottom-left' ); };
	
	_this.toBottomRight = function() { return _this.useExtraClassesForLocation( 'bottom-right' ); };
	
	// ------------------------------------------------------------------------

	_this.$get = [ function() {		
		
		function messengerWithConfig( config ) {
			return Messenger( config );
		}
		
		function defaultMessenger() {
			return messengerWithConfig( _this.config() );
		}
		
		function post( options, useDefaultOptions ) {
			var defOpt = _this.options();
			var opt = options;
			if ( defOpt && useDefaultOptions ) {
				opt = angular.copy( defOpt ).concat( opt );
			}
			return defaultMessenger().post( opt );
		}
		
		function info( msg ) {
			return defaultMessenger().info( msg );
		}
		
		function success( msg ) {
			return defaultMessenger().success( msg );
		}
		
		function error( msg ) {
			return defaultMessenger().error( msg );
		}
		
        // public functions
		
        return {
			withConfig	: messengerWithConfig,
			def			: defaultMessenger,
			post		: post,
			info		: info,
			error		: error
        };
		
    } ];
	
} // function


} )( angular );