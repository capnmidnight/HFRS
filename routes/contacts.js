var express = require( "express" ),
    mysql = require( "mysql2" ),
    config = require( "../config" ),
    router = express.Router(),
    originTest = /^https?:\/\/(localhost|(www\.)?highlandfrs.com)(:\d+)?(\/|$)/,
    pool = mysql.createPool( config.database );


function accessControl ( req, res ) {
  var origin = req.headers.origin || req.headers.referer,
      allowed = originTest.test( origin );
  if ( allowed ) {
    res.header( 'Access-Control-Allow-Origin', origin );
    res.header( 'Access-Control-Allow-Methods', 'POST' );
    res.header( 'Access-Control-Allow-Headers', 'Content-Type' );
  }
  return allowed;
}

router.options( "/", function ( req, res ) {
  if ( !accessControl( req, res ) ) {
    res.sendStatus( 403 );
  }
  else {
    res.sendStatus( 200 );
  }
} );

router.post( "/", function ( req, res ) {
  if ( !accessControl( req, res ) ) {
    res.sendStatus( 403 );
  }
  else {
    pool.getConnection( function ( err, connection ) {
      if ( err ) {
        console.error( "L1", err );
        res.sendStatus( 500 );
      }
      else {
        connection.config.namedPlaceholders = true;
        connection.execute(
            "CALL `hfrs`.`insert_contact`(:name, :email, :phone, :company, :description, :records, :message, :contacton1, :contacton2, :contacton3, :starton);",
            req.body,
            function ( err, rows ) {
              if ( err ) {
                console.error( "L2", err );
                res.sendStatus( 500 );
              }
              else if ( rows.length > 0 ) {
                res.send( JSON.stringify( {
                  status: "success",
                  message: rows[0].contactID
                } ) );
                connection.release( );
              }
            } );
      }
    } );
  }
}
);

module.exports = router;
