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
var ssbFeed = require('ssb-feed')
var ssbKeys = require('ssb-keys')

// create the new feed
var alice = ssbFeed(sbot, ssbKeys.generate())

// Post to alice's feed
alice.publish({
  type: 'post',
  text: 'hello world, I am alice.'
}, function (err) { console.log(err) })

var hash = ssbKeys.hash(new Buffer('snehkoul', 'hex'))
console.log("hey"+ hash)
// var k = ssbKeys.createSync('./dhh.txt')
// console.log(k) /* => {
//   id: String,
//   public: String,
//   private: String
// }*/
var k = ssbKeys.generate()
// var authRequest = ssbKeys.createAuth(k, 'client')
// console.log(authRequest) /* => {
//   role: 'client',
//   ts: Number,
//   public: String,
//   signature: ...
// } */

// var obj = ssbKeys.signObj(k, hmac_key, { foo: 'bar' })
// console.log(obj) /* => {
//   foo: 'bar',
//   signature: ...
// } */
// ssbkeys.verifyObj(k, hmac_key, obj) // => true



// var ssbkeys = require('ssb-keys')

// ssbkeys.create(path, function(err, k) {
//   console.log(k) /* => {
//     id: String,
//     public: String,
//     private: String
//   }*/
// })

// ssbkeys.load(path, function(err, k) {
//   console.log(k) /* => {
//     id: String,
//     public: String,
//     private: String
//   }*/
// })

// var k = ssbkeys.createSync(path)
// console.log(k) /* => {
//   id: String,
//   public: String,
//   private: String
// }*/

// var k = ssbkeys.loadSync(path)
// console.log(k) /* => {
//   id: String,
//   public: String,
//   private: String
// }*/

// var k = ssbkeys.generate()
// console.log(k) /* => {
//   id: String,
//   public: String,
//   private: String
// }*/

// var hash = ssbkeys.hash(new Buffer('deadbeef', 'hex'))
// ssbkeys.isHash(hash) // => true

// var sig = ssbkeys.sign(k, hash)
// ssbkeys.verify(k.public, sig, hash) // => true

// var secret = new Buffer('deadbeef', 'hex')
// ssbkeys.hmac(secret, k.private) // => String

// var obj = ssbkeys.signObj(k, { foo: 'bar' })
// console.log(obj) /* => {
//   foo: 'bar',
//   signature: ...
// } */
// ssbkeys.verifyObj(k, obj) // => true

// var secret = new Buffer('deadbeef', 'hex')
// var obj = ssbkeys.signObjHmac(secret, { foo: 'bar' })
// console.log(obj) /* => {
//   foo: 'bar',
//   hmac: ...
// } */
// ssbkeys.verifyObjHmac(secret, obj) // => true

// var authRequest = ssbkeys.createAuth(k, 'client')
// console.log(authRequest) /* => {
//   role: 'client',
//   ts: Number,
//   public: String,
//   signature: ...
// } */