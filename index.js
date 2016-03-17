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
        var access_token   = provider.credentials( 'access_token' );

        /* this.log( 'token = ' + access_token ); */

        var input = function( name ) {
            return step.input( name ).first();
        }

        var subreddit      = input( 'subreddit' );
        var args = {
             t:       input( 't' ),
             before:  input( 'before' ),
             after:   input( 'after' ),
             count:   input( 'count' ),
             limit:   input( 'limit' ),
             show:    input( 'show' )
        };

        var api_base = 'https://oauth.reddit.com/';
        var user_agent = 'Dexter:' + dexter.app( 'id' ) + ':v0.0.1' + ' (by /u/friedo4)';

        var options = {
            url:     api_base + '/r/' + subreddit + '/top',
            qs:      args,
            headers: {
                'User-Agent': user_agent
            },
            auth: {
                bearer: access_token
            }
        }

        var self = this;
        request.get( options, function( err, res, body ) {
            var resdata = JSON.parse( body );

            if ( err || !resdata.data ) return self.fail( { 'error': err, 'body': body } );
            var results = [ ];
            resdata.data.children.forEach( function( child ) {
                results.push( {
                    id:             child.data.id,
                    author:         child.data.author,
                    created_utc:    child.data.created_utc,
                    domain:         child.data.domain,
                    permalink:      child.data.permalink,
                    score:          child.data.score,
                    title:          child.data.title,
                    selftext:       child.data.selftext,
                    url:            child.data.url
                })
            } );
            return self.complete( results );
        } );
    }
};
