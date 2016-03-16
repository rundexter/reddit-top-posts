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

        var api_base = 'https://oauth.reddit.com/api/v1';
        var user_agent = 'Dexter:' + dexter.app( 'id' ) + ':' + step.module( 'package' ).version + ' (by /u/friedo)';

        var options = {
            url:     api_base + '/me',
            headers: {
                'User-Agent': user_agent
            },
            auth: {
                bearer: access_token
            }
        }

        request.get( api_base + '/me', options, function( err, res, body ) {
            if ( err ) return this.fail( err );
            return this.complete( JSON.parse( body ) );
        } );
    }
};
