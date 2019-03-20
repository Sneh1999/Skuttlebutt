/**
 * create an ssb-db instance and add a message to it.
 */

//create a secret-stack instance and add ssb-db, for persistence.
var createSbot = require('secret-stack')({}).use(require('ssb-db'))
var ssbFeed = require('ssb-feed')
var ssbKeys = require('ssb-keys')


var pull = require('pull-stream')
// create the db instance.
// Only one instance may be created at a time due to os locks on port and database files.

var sbot = createSbot(require('ssb-config'))

//your public key, the default key of this instance.

sbot.id

//or, called remotely

sbot.whoami(function (err, data) {
  console.log(data.id) //your id
})

// publish a message to default identity
//  - feed.add appends a message to your key's chain.
//  - the `type` attribute is required.

sbot.publish({ type: 'post', text: 'My First Post!' }, function (err, msg, hash) {
  // the message as it appears in the database:
  console.log(msg)

  // and its hash:
  console.log(hash)
})

// stream all messages for all keypairs.
pull(
    sbot.createUserStream({ id: '@CjZXkkK1U8Nqbr85SxX8OX7as5iUf1HBlayCyMOR/hc=.ed25519' }),
    pull.collect((err, msgs) =>{
      if (err)
       console.log(err)
      console.log(msgs)
    })
  )

// stream all messages for a particular keypair.
