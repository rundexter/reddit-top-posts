var request = require( 'request' );

module.exports = {
    /**
     * The main entry point for the Dexter module
     *
     * @param {AppStep} step Accessor for the configuration for the step using this module.  Use step.input('{key}') to retrieve input data.
     * @param {AppData} dexter Container for all data used in this workflow.
     */
    run: function(step, dexter) {
        var provider       = dexter.provider( 'reddit' );
        var client_id      = provider.credentials( 'client_id' );
        var client_secret  = provider.credentials( 'client_secret' );
        var access_token   = provider.credentials( 'access_token' );

        this.log( 'id = ' + client_id );
        this.log( 'secret = ' + client_secret );
        this.log( 'token = ' + access_token );

        return this.complete( { foo: 1 } );
    }
};
